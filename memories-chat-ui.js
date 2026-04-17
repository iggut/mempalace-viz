/**
 * Memories Chat — DOM controller (local LLM + grounded retrieval).
 */

import {
  clearMemoriesChatConfigStorage,
  loadMemoriesChatConfig,
  saveMemoriesChatConfig,
} from './memories-chat-config.js';
import { openAiChatCompletions, testOpenAiCompatibleConnection } from './memories-chat-llm.js';
import { buildOpenAiMessagesFromThread } from './memories-chat-prompt.js';
import {
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
 * @typedef {{
 *   navigateToRoom: (wing: string, room: string) => void,
 *   openDrawerInRoom: (drawerId: string) => void,
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

  /** @type {Array<{ role: string, content: string, sources?: unknown, error?: string }>} */
  let thread = loadThread();

  /** @type {AbortController | null} */
  let activeSend = null;

  function setMode(next) {
    mode = next;
    const isExplore = next === 'explore';
    exploreBtn.setAttribute('aria-selected', isExplore ? 'true' : 'false');
    memBtn.setAttribute('aria-selected', isExplore ? 'false' : 'true');
    explorePane.hidden = !isExplore;
    memPane.hidden = isExplore;
    if (titleEl) titleEl.textContent = isExplore ? 'Explore' : 'Memory chat';
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

  function renderSourcesBlock(sources) {
    if (!Array.isArray(sources) || !sources.length) {
      return '<p class="memchat-sources-empty">No source excerpts attached.</p>';
    }
    return `<ul class="memchat-sources-list">
      ${sources
        .map((s, i) => {
          const wing = s.wing || '';
          const room = s.room || '';
          const did = s.drawerId ? String(s.drawerId) : '';
          const ex = escapeHtml((s.excerpt || '').slice(0, 360));
          const sim =
            typeof s.similarity === 'number' && Number.isFinite(s.similarity)
              ? `${(s.similarity * 100).toFixed(1)}%`
              : '—';
          const loc = wing && room ? `${escapeHtml(wing)} / ${escapeHtml(room)}` : escapeHtml(wing || room || '—');
          return `<li class="memchat-source-card">
            <div class="memchat-source-card__meta">
              <span class="memchat-source-card__loc">${loc}</span>
              <span class="memchat-source-card__sim">${escapeHtml(sim)} match</span>
            </div>
            ${did ? `<div class="memchat-source-card__id"><code>${escapeHtml(did)}</code></div>` : ''}
            <p class="memchat-source-card__excerpt">${ex}${(s.excerpt || '').length > 360 ? '…' : ''}</p>
            <div class="memchat-source-card__actions">
              ${
                wing && room
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-jump-room" data-wing="${escapeHtml(wing)}" data-room="${escapeHtml(room)}">Jump to room</button>`
                  : ''
              }
              ${
                did
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-open-drawer" data-drawer-id="${escapeHtml(did)}">Open drawer</button>`
                  : ''
              }
            </div>
          </li>`;
        })
        .join('')}
    </ul>`;
  }

  function renderMessages() {
    if (!messagesEl) return;
    messagesEl.innerHTML = thread
      .map((m) => {
        if (m.role === 'user') {
          return `<div class="memchat-msg memchat-msg--user" role="article"><div class="memchat-msg__bubble">${escapeHtml(m.content)}</div></div>`;
        }
        if (m.role === 'assistant') {
          const err = m.error ? `<div class="memchat-msg__err">${escapeHtml(m.error)}</div>` : '';
          const body = m.content
            ? `<div class="memchat-msg__bubble memchat-msg__bubble--assistant">${escapeHtml(m.content)}</div>`
            : '';
          const src =
            m.sources && !m.error
              ? `<div class="memchat-msg__sources"><div class="memchat-msg__sources-title">Supporting memories</div>${renderSourcesBlock(m.sources)}</div>`
              : '';
          return `<div class="memchat-msg memchat-msg--assistant" role="article">${err}${body}${src}</div>`;
        }
        return '';
      })
      .join('');
    messagesEl.scrollTop = messagesEl.scrollHeight;
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
      if (id) {
        hooks.ensureInspectorVisible?.();
        hooks.openDrawerInRoom(id);
      }
    }
  });

  clearBtn?.addEventListener('click', () => {
    if (activeSend) activeSend.abort();
    activeSend = null;
    thread = [];
    persistThread();
    renderMessages();
    if (sendStatusEl) sendStatusEl.textContent = '';
    sendBtn.disabled = false;
    stopBtn.disabled = true;
  });

  stopBtn?.addEventListener('click', () => {
    if (activeSend) activeSend.abort();
    activeSend = null;
    if (sendStatusEl) sendStatusEl.textContent = 'Stopped.';
    sendBtn.disabled = false;
    stopBtn.disabled = true;
  });

  async function send() {
    const text = inputEl.value.trim();
    if (!text) return;

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
    if (sendStatusEl) sendStatusEl.textContent = 'Retrieving memories…';

    const ac = new AbortController();
    activeSend = ac;

    const retrieval = await retrieveMemoriesForChat({
      query: text,
      fetchSemanticSearch,
      fetchDrawerById,
      semanticLimit: 12,
      maxDrawerFetches: 5,
    });

    if (ac.signal.aborted) return;

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

    try {
      const { content } = await openAiChatCompletions({
        endpointInput: cfg.endpoint,
        apiKey: cfg.apiKey,
        model: cfg.model,
        messages,
        temperature: 0.25,
        maxTokens: 1400,
        signal: ac.signal,
        timeoutMs: 120000,
      });
      if (ac.signal.aborted) return;
      thread.push({
        role: 'assistant',
        content,
        sources: retrieval.sources,
      });
    } catch (e) {
      if (e?.name === 'AbortError') {
        if (sendStatusEl) sendStatusEl.textContent = 'Stopped.';
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
    }

    persistThread();
    renderMessages();
    sendBtn.disabled = false;
    stopBtn.disabled = true;
    if (sendStatusEl) sendStatusEl.textContent = '';
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
