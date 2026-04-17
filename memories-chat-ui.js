/**
 * Memories Chat — DOM controller (local LLM + grounded retrieval).
 */

import {
  clearMemoriesChatConfigStorage,
  loadMemoriesChatConfig,
  saveMemoriesChatConfig,
} from './memories-chat-config.js';
import {
  completeOpenAiChatWithStreamFallback,
  testOpenAiCompatibleConnection,
} from './memories-chat-llm.js';
import { buildOpenAiMessagesFromThread } from './memories-chat-prompt.js';
import {
  assessRetrievalEvidence,
  formatRetrievalContextForPrompt,
  retrieveMemoriesForChat,
} from './memories-chat-retrieval.js';
import { fetchDrawerById, fetchSemanticSearch } from './api.js';

const THREAD_SS_KEY = 'mempalace-viz-memories-chat-thread-v1';

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function $(id) {
  return document.getElementById(id);
}

/**
 * @param {import('./memories-chat-retrieval.js').RetrievedMemorySource} s
 */
export function buildQuoteFromMemorySource(s) {
  const wing = s.wing || '';
  const room = s.room || '';
  const loc = wing && room ? `${wing} / ${room}` : wing || room || 'Unknown location';
  const idLine = s.drawerId ? ` — drawer ${s.drawerId}` : '';
  const raw = (s.excerpt || s.contentForModel || '').trim();
  const ex = raw.slice(0, 2000);
  const quoted = ex
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n');
  return `[Memory evidence — ${loc}${idLine}]\n${quoted}\n\n`;
}

/**
 * @typedef {{
 *   navigateToRoom: (wing: string, room: string) => void,
 *   openDrawerInRoom: (drawerId: string, meta?: { wing?: string, room?: string }) => void,
 *   ensureInspectorVisible?: () => void,
 *   onModeChange?: (mode: 'explore' | 'memchat') => void,
 * }} MemoriesChatHooks
 */

/**
 * @param {MemoriesChatHooks} hooks
 */
export function initMemoriesChat(hooks) {
  const exploreBtn = $('btn-panel-left-explore');
  const memBtn = $('btn-panel-left-memchat');
  const explorePane = $('panel-left-explore-pane');
  const memPane = $('panel-left-memchat-pane');
  const titleEl = $('panel-left-title');

  const endpointEl = $('memchat-endpoint');
  const apiKeyEl = $('memchat-apikey');
  const modelEl = $('memchat-model');
  const testBtn = $('memchat-test');
  const saveCfgBtn = $('memchat-save-config');
  const resetCfgBtn = $('memchat-reset-config');
  const cfgStatusEl = $('memchat-config-status');

  const messagesEl = $('memchat-messages');
  const inputEl = $('memchat-input');
  const sendBtn = $('memchat-send');
  const stopBtn = $('memchat-stop');
  const clearBtn = $('memchat-clear');
  const sendStatusEl = $('memchat-send-status');

  if (
    !exploreBtn ||
    !memBtn ||
    !explorePane ||
    !memPane ||
    !messagesEl ||
    !inputEl ||
    !sendBtn
  ) {
    return;
  }

  /** @type {'explore' | 'memchat'} */
  let mode = 'explore';

  /** @type {Array<{ role: string, content: string, sources?: unknown[], error?: string, partial?: boolean }>} */
  let thread = loadThread();

  /** @type {AbortController | null} */
  let activeSend = null;

  /** @type {{ content: string, sources: Array<Record<string, unknown>> } | null} */
  let streamingAssistant = null;

  /** @type {number | null} */
  let streamRaf = null;

  /** @type {ReturnType<typeof setInterval> | null} */
  let streamStatusInterval = null;

  /** @type {ReturnType<typeof setTimeout> | null} */
  let completionStatusTimer = null;

  let stickToBottom = true;
  messagesEl.addEventListener(
    'scroll',
    () => {
      const el = messagesEl;
      stickToBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 96;
    },
    { passive: true },
  );

  function setMode(next) {
    mode = next;
    const isExplore = next === 'explore';
    exploreBtn.setAttribute('aria-selected', isExplore ? 'true' : 'false');
    memBtn.setAttribute('aria-selected', isExplore ? 'false' : 'true');
    explorePane.hidden = !isExplore;
    memPane.hidden = isExplore;
    if (titleEl) titleEl.textContent = isExplore ? 'Explore' : 'Chat with memories';
    hooks.onModeChange?.(next);
  }

  exploreBtn.addEventListener('click', () => setMode('explore'));
  memBtn.addEventListener('click', () => setMode('memchat'));

  function loadFormFromStorage() {
    const c = loadMemoriesChatConfig();
    if (endpointEl) endpointEl.value = c.endpoint || '';
    if (apiKeyEl) apiKeyEl.value = c.apiKey || '';
    if (modelEl) modelEl.value = c.model || '';
  }

  function readFormConfig() {
    return {
      endpoint: endpointEl?.value?.trim() ?? '',
      apiKey: apiKeyEl?.value ?? '',
      model: modelEl?.value?.trim() ?? '',
    };
  }

  loadFormFromStorage();

  saveCfgBtn?.addEventListener('click', () => {
    saveMemoriesChatConfig(readFormConfig());
    if (cfgStatusEl) cfgStatusEl.textContent = 'Saved locally in this browser.';
  });

  resetCfgBtn?.addEventListener('click', () => {
    clearMemoriesChatConfigStorage();
    if (endpointEl) endpointEl.value = '';
    if (apiKeyEl) apiKeyEl.value = '';
    if (modelEl) modelEl.value = '';
    if (cfgStatusEl) cfgStatusEl.textContent = 'Configuration cleared.';
  });

  testBtn?.addEventListener('click', async () => {
    const { endpoint, apiKey } = readFormConfig();
    if (cfgStatusEl) cfgStatusEl.textContent = 'Testing…';
    const r = await testOpenAiCompatibleConnection(endpoint, { apiKey, timeoutMs: 12000 });
    if (cfgStatusEl) {
      cfgStatusEl.textContent = r.ok ? 'Connection OK (models endpoint responded).' : r.error;
    }
  });

  function loadThread() {
    try {
      const raw = sessionStorage.getItem(THREAD_SS_KEY);
      if (!raw) return [];
      const j = JSON.parse(raw);
      return Array.isArray(j) ? j : [];
    } catch {
      return [];
    }
  }

  function persistThread() {
    try {
      sessionStorage.setItem(THREAD_SS_KEY, JSON.stringify(thread));
    } catch {
      /* ignore */
    }
  }

  function maybeScrollToBottom() {
    if (!stickToBottom) return;
    const el = messagesEl;
    el.scrollTop = el.scrollHeight;
    requestAnimationFrame(() => {
      if (!stickToBottom) return;
      el.scrollTop = el.scrollHeight;
      const anchor = $('memchat-stream-anchor');
      if (anchor && stickToBottom) {
        anchor.scrollIntoView({ block: 'end', behavior: 'instant' });
      }
    });
  }

  function stopStreamStatusTicker() {
    if (streamStatusInterval != null) {
      clearInterval(streamStatusInterval);
      streamStatusInterval = null;
    }
  }

  function startStreamStatusTicker() {
    stopStreamStatusTicker();
    streamStatusInterval = setInterval(() => {
      if (!sendStatusEl || !streamingAssistant) return;
      const len = streamingAssistant.content.length;
      const n = len >= 1000 ? `${(len / 1000).toFixed(1)}k` : String(len);
      sendStatusEl.textContent = `Generating answer… ${n} chars`;
    }, 480);
  }

  function scheduleCompletionStatus(message, clearAfterMs = 0) {
    if (completionStatusTimer != null) {
      clearTimeout(completionStatusTimer);
      completionStatusTimer = null;
    }
    if (sendStatusEl) sendStatusEl.textContent = message;
    if (clearAfterMs > 0 && sendStatusEl) {
      completionStatusTimer = setTimeout(() => {
        completionStatusTimer = null;
        if (sendStatusEl) sendStatusEl.textContent = '';
      }, clearAfterMs);
    }
  }

  function flushStreamingDom() {
    if (streamRaf != null) {
      cancelAnimationFrame(streamRaf);
      streamRaf = null;
    }
    const el = $('memchat-streaming-text');
    if (el && streamingAssistant) {
      el.textContent = streamingAssistant.content;
    }
    maybeScrollToBottom();
  }

  function scheduleStreamingDomUpdate() {
    if (streamRaf != null) return;
    streamRaf = requestAnimationFrame(() => {
      streamRaf = null;
      flushStreamingDom();
    });
  }

  /**
   * @param {ReturnType<typeof assessRetrievalEvidence>} trust
   */
  function renderTrustBanner(trust) {
    if (!trust.showBanner) return '';
    const parts = [];
    if (trust.sparse) {
      parts.push('Few drawers matched — the model only saw limited evidence.');
    }
    if (trust.maxSimilarity != null && trust.weakMatch) {
      parts.push(
        `Best match score is ${(trust.maxSimilarity * 100).toFixed(0)}% (weak). Treat the answer as tentative.`,
      );
    } else if (trust.maxSimilarity == null && trust.sparse && trust.count > 1) {
      parts.push('Similarity scores were missing; spot-check in the palace if unsure.');
    }
    const body = parts.length ? parts.join(' ') : 'Retrieval looks thin — double-check important claims.';
    return `<div class="memchat-trust-banner" role="status"><span class="memchat-trust-banner__label">Retrieval note</span> ${escapeHtml(body)}</div>`;
  }

  /**
   * @param {import('./memories-chat-retrieval.js').RetrievedMemorySource[]} sources
   * @param {number} msgIdx — index in thread, or -1 for in-flight stream
   */
  function renderSourcesBlock(sources, msgIdx) {
    if (!Array.isArray(sources) || !sources.length) {
      return '<p class="memchat-sources-empty">No evidence excerpts for this turn.</p>';
    }
    const trust = assessRetrievalEvidence(sources);
    const banner = renderTrustBanner(trust);
    return `${banner}<ul class="memchat-sources-list" aria-label="Evidence excerpts">
      ${sources
        .map((s, i) => {
          const wing = s.wing || '';
          const room = s.room || '';
          const did = s.drawerId ? String(s.drawerId) : '';
          const ex = escapeHtml((s.excerpt || '').slice(0, 360));
          const long = (s.excerpt || '').length > 360;
          const simNum = typeof s.similarity === 'number' && Number.isFinite(s.similarity) ? s.similarity : null;
          const sim =
            simNum != null
              ? `${(simNum * 100).toFixed(1)}%`
              : '—';
          const low = simNum != null && simNum < 0.35;
          const loc = wing && room ? `${escapeHtml(wing)} / ${escapeHtml(room)}` : escapeHtml(wing || room || '—');
          const cardCls = `memchat-source-card${low ? ' memchat-source-card--low' : ''}`;
          return `<li class="${cardCls}">
            <div class="memchat-source-card__head">
              <span class="memchat-source-card__rank" aria-hidden="true">${i + 1}</span>
              <div class="memchat-source-card__head-text">
                <div class="memchat-source-card__meta">
                  <span class="memchat-source-card__loc">${loc}</span>
                  <span class="memchat-source-card__sim${low ? ' memchat-source-card__sim--low' : ''}">${escapeHtml(sim)} match</span>
                </div>
                ${did ? `<div class="memchat-source-card__id"><code>${escapeHtml(did)}</code></div>` : ''}
              </div>
            </div>
            <p class="memchat-source-card__excerpt">${ex}${long ? '…' : ''}</p>
            <div class="memchat-source-card__actions">
              ${
                wing && room
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-jump-room" data-wing="${escapeHtml(wing)}" data-room="${escapeHtml(room)}">Jump to room</button>`
                  : ''
              }
              ${
                did
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-open-drawer" data-drawer-id="${escapeHtml(did)}" data-wing="${escapeHtml(wing)}" data-room="${escapeHtml(room)}">Open drawer</button>`
                  : ''
              }
              <button type="button" class="btn btn--ghost btn--sm memchat-quote" data-msg-idx="${msgIdx}" data-src-idx="${i}" title="Insert quoted excerpt at cursor. Shift+click: new paragraph before quote.">Insert quote</button>
            </div>
          </li>`;
        })
        .join('')}
    </ul>`;
  }

  function renderEvidenceSection(sources, msgIdx) {
    const inner = renderSourcesBlock(sources, msgIdx);
    return `<section class="memchat-evidence" aria-label="Evidence for this turn">
      <div class="memchat-evidence__head">
        <span class="memchat-evidence__title">Evidence for this turn</span>
        <span class="memchat-evidence__hint">Retrieved from your palace; not model text</span>
      </div>
      <div class="memchat-evidence__body">${inner}</div>
    </section>`;
  }

  /**
   * @param {boolean} streaming
   * @param {boolean} [partial]
   */
  function renderAnswerHeading(streaming, partial) {
    const badge = streaming
      ? '<span class="memchat-live-pill" aria-live="polite"><span class="memchat-live-pill__dot" aria-hidden="true"></span> Generating</span>'
      : partial
        ? '<span class="memchat-partial-pill">Stopped mid-answer</span>'
        : '';
    return `<div class="memchat-answer-head">
      <span class="memchat-answer-head__label">Answer</span>
      ${badge}
    </div>`;
  }

  function renderMessages() {
    if (!messagesEl) return;
    messagesEl.setAttribute('aria-busy', streamingAssistant ? 'true' : 'false');
    const html = thread
      .map((m, mi) => {
        if (m.role === 'user') {
          return `<div class="memchat-msg memchat-msg--user" role="article"><div class="memchat-msg__bubble">${escapeHtml(m.content)}</div></div>`;
        }
        if (m.role === 'assistant') {
          const err = m.error ? `<div class="memchat-msg__err">${escapeHtml(m.error)}</div>` : '';
          if (m.error) {
            return `<div class="memchat-msg memchat-msg--assistant" role="article">${err}</div>`;
          }
          const partial = Boolean(m.partial);
          const head = renderAnswerHeading(false, partial);
          const body = m.content
            ? `<div class="memchat-msg__bubble memchat-msg__bubble--assistant">${escapeHtml(m.content)}</div>`
            : '';
          const src = m.sources ? renderEvidenceSection(m.sources, mi) : '';
          return `<div class="memchat-msg memchat-msg--assistant" role="article">${head}${body}${src}</div>`;
        }
        return '';
      })
      .join('');

    const streamBlock =
      streamingAssistant != null
        ? `<div class="memchat-msg memchat-msg--assistant memchat-msg--streaming" role="article" aria-busy="true">
            ${renderAnswerHeading(true, false)}
            <div class="memchat-msg__bubble memchat-msg__bubble--assistant memchat-msg__bubble--streaming">
              <span id="memchat-streaming-text" class="memchat-streaming-text"></span><span class="memchat-streaming-caret" aria-hidden="true">▍</span>
              <span id="memchat-stream-anchor" class="memchat-stream-anchor" aria-hidden="true"></span>
            </div>
            ${renderEvidenceSection(streamingAssistant.sources, -1)}
          </div>`
        : '';

    messagesEl.innerHTML = html + streamBlock;
    flushStreamingDom();
    maybeScrollToBottom();
  }

  messagesEl.addEventListener('click', (e) => {
    const jr = e.target.closest('.memchat-jump-room');
    if (jr) {
      const wing = jr.getAttribute('data-wing') || '';
      const room = jr.getAttribute('data-room') || '';
      if (wing && room) {
        hooks.ensureInspectorVisible?.();
        hooks.navigateToRoom(wing, room);
      }
      return;
    }
    const od = e.target.closest('.memchat-open-drawer');
    if (od) {
      const id = od.getAttribute('data-drawer-id') || '';
      const wing = od.getAttribute('data-wing') || '';
      const room = od.getAttribute('data-room') || '';
      if (id) {
        hooks.ensureInspectorVisible?.();
        hooks.openDrawerInRoom(id, { wing: wing || undefined, room: room || undefined });
      }
      return;
    }
    const q = e.target.closest('.memchat-quote');
    if (q) {
      const mi = Number(q.getAttribute('data-msg-idx'));
      const si = Number(q.getAttribute('data-src-idx'));
      const list =
        mi === -1 && streamingAssistant?.sources
          ? streamingAssistant.sources
          : Number.isFinite(mi) && thread[mi]?.sources
            ? thread[mi].sources
            : null;
      if (!list || !Number.isFinite(si) || !list[si]) return;
      const quote = buildQuoteFromMemorySource(/** @type {any} */ (list[si]));
      const ta = inputEl;
      const start = ta.selectionStart ?? ta.value.length;
      const end = ta.selectionEnd ?? ta.value.length;
      const before = ta.value.slice(0, start);
      const after = ta.value.slice(end);
      let prefix = '';
      if (e.shiftKey) {
        prefix = before.length > 0 && !before.endsWith('\n\n') ? '\n\n' : '';
      } else if (before.length > 0 && !before.endsWith('\n')) {
        prefix = '\n';
      }
      const inserted = prefix + quote;
      ta.value = before + inserted + after;
      const caret = start + inserted.length;
      ta.selectionStart = ta.selectionEnd = caret;
      ta.focus();
    }
  });

  clearBtn?.addEventListener('click', () => {
    stopStreamStatusTicker();
    if (completionStatusTimer != null) {
      clearTimeout(completionStatusTimer);
      completionStatusTimer = null;
    }
    if (activeSend) activeSend.abort();
    activeSend = null;
    streamingAssistant = null;
    thread = [];
    persistThread();
    renderMessages();
    if (sendStatusEl) sendStatusEl.textContent = '';
    sendBtn.disabled = false;
    stopBtn.disabled = true;
  });

  stopBtn?.addEventListener('click', () => {
    if (activeSend) activeSend.abort();
  });

  async function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    stopStreamStatusTicker();
    if (completionStatusTimer != null) {
      clearTimeout(completionStatusTimer);
      completionStatusTimer = null;
    }

    const cfg = readFormConfig();
    if (!cfg.endpoint.trim()) {
      thread.push({
        role: 'assistant',
        content: '',
        error: 'Add a local endpoint under Local model settings (e.g. http://127.0.0.1:1234/v1).',
      });
      renderMessages();
      persistThread();
      return;
    }

    thread.push({ role: 'user', content: text });
    inputEl.value = '';
    persistThread();
    renderMessages();

    sendBtn.disabled = true;
    stopBtn.disabled = false;
    if (sendStatusEl) sendStatusEl.textContent = 'Retrieving evidence…';

    const ac = new AbortController();
    activeSend = ac;

    const retrieval = await retrieveMemoriesForChat({
      query: text,
      fetchSemanticSearch,
      fetchDrawerById,
      semanticLimit: 12,
      maxDrawerFetches: 5,
    });

    if (ac.signal.aborted) {
      sendBtn.disabled = false;
      stopBtn.disabled = true;
      activeSend = null;
      if (sendStatusEl) sendStatusEl.textContent = '';
      return;
    }

    if (retrieval.retrievalNote) {
      thread.push({
        role: 'assistant',
        content: '',
        error: `Retrieval failed: ${retrieval.retrievalNote}`,
      });
      persistThread();
      renderMessages();
      sendBtn.disabled = false;
      stopBtn.disabled = true;
      if (sendStatusEl) sendStatusEl.textContent = '';
      activeSend = null;
      return;
    }

    if (!retrieval.sources.length) {
      thread.push({
        role: 'assistant',
        content:
          'No matching memories were found for this query in your palace (semantic search returned no drawers). Try different keywords, or verify MemPalace MCP search is working.',
        sources: [],
      });
      persistThread();
      renderMessages();
      sendBtn.disabled = false;
      stopBtn.disabled = true;
      if (sendStatusEl) sendStatusEl.textContent = '';
      activeSend = null;
      return;
    }

    if (sendStatusEl) sendStatusEl.textContent = 'Generating answer…';

    const evidence = formatRetrievalContextForPrompt(retrieval.sources);
    const messages = buildOpenAiMessagesFromThread(thread, evidence);

    streamingAssistant = { content: '', sources: retrieval.sources };
    renderMessages();
    startStreamStatusTicker();

    try {
      const r = await completeOpenAiChatWithStreamFallback({
        endpointInput: cfg.endpoint,
        apiKey: cfg.apiKey,
        model: cfg.model,
        messages,
        temperature: 0.25,
        maxTokens: 1400,
        signal: ac.signal,
        timeoutMs: 120000,
        onDelta: (_d, accumulated) => {
          if (streamingAssistant) {
            streamingAssistant.content = accumulated;
            scheduleStreamingDomUpdate();
          }
        },
      });
      stopStreamStatusTicker();
      thread.push({
        role: 'assistant',
        content: r.content,
        sources: retrieval.sources,
      });
      streamingAssistant = null;
      if (r.mode === 'json') {
        scheduleCompletionStatus('Answer received (non-streaming).', 2800);
      } else if (sendStatusEl) {
        sendStatusEl.textContent = '';
      }
    } catch (e) {
      stopStreamStatusTicker();
      if (e?.name === 'AbortError') {
        const partial = streamingAssistant?.content?.trim() ?? '';
        streamingAssistant = null;
        if (partial) {
          thread.push({
            role: 'assistant',
            content: partial,
            sources: retrieval.sources,
            partial: true,
          });
        }
        scheduleCompletionStatus('Stopped — partial answer saved.', 3200);
        persistThread();
        renderMessages();
        sendBtn.disabled = false;
        stopBtn.disabled = true;
        activeSend = null;
        return;
      }
      thread.push({
        role: 'assistant',
        content: '',
        error: e?.message || String(e),
      });
      streamingAssistant = null;
      if (sendStatusEl) sendStatusEl.textContent = '';
    }

    persistThread();
    renderMessages();
    sendBtn.disabled = false;
    stopBtn.disabled = true;
    if (!streamingAssistant && sendStatusEl) {
      const pending = (sendStatusEl.textContent || '').trim();
      if (!pending || pending === 'Generating answer…') sendStatusEl.textContent = '';
    }
    activeSend = null;
  }

  sendBtn.addEventListener('click', () => send());
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  renderMessages();
}
