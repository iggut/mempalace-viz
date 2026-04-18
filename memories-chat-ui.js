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
const MEMCHAT_CARD_LS_KEY = 'mempalace-viz-memchat-card-layout-v1';

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
  const memchatCard = $('memchat-card');
  const memchatCardDrag = $('memchat-card-drag');
  const memchatCardCollapse = $('memchat-card-collapse');
  const memchatCardResize = $('memchat-card-resize');

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

  /** @type {Array<{ role: string, content: string, sources?: unknown[], error?: string, partial?: boolean, completionMode?: 'stream' | 'json' }>} */
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

  /** @type {ReturnType<typeof setTimeout> | null} */
  let composeHintTimer = null;

  /** @type {number} */
  let streamStartedAt = 0;

  const composeHintEl = $('memchat-compose-hint');

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
    if (memchatCard) memchatCard.hidden = isExplore;
    if (titleEl) titleEl.textContent = isExplore ? 'Explore' : 'Chat with memories';
    hooks.onModeChange?.(next);
  }

  function loadMemchatCardLayout() {
    if (typeof localStorage === 'undefined' || !memchatCard) return;
    try {
      const raw = localStorage.getItem(MEMCHAT_CARD_LS_KEY);
      if (!raw) return;
      const j = JSON.parse(raw);
      if (typeof j.left === 'number' && typeof j.top === 'number') {
        memchatCard.style.setProperty('--memchat-card-left', `${j.left}px`);
        memchatCard.style.setProperty('--memchat-card-top', `${j.top}px`);
      }
      if (typeof j.width === 'number' && j.width > 0) {
        memchatCard.style.setProperty('--memchat-card-width', `${j.width}px`);
      }
      if (typeof j.height === 'number' && j.height > 0) {
        memchatCard.style.setProperty('--memchat-card-height', `${j.height}px`);
      }
      if (j.collapsed === true) {
        memchatCard.classList.add('memchat-card--collapsed');
        if (memchatCardCollapse) {
          memchatCardCollapse.setAttribute('aria-expanded', 'false');
          memchatCardCollapse.textContent = '+';
        }
      }
    } catch {
      /* ignore */
    }
  }

  function saveMemchatCardLayout() {
    if (typeof localStorage === 'undefined' || !memchatCard) return;
    const leftVar = memchatCard.style.getPropertyValue('--memchat-card-left').trim();
    const topVar = memchatCard.style.getPropertyValue('--memchat-card-top').trim();
    const r = memchatCard.getBoundingClientRect();
    const left = leftVar ? parseFloat(leftVar) : r.left;
    const top = topVar ? parseFloat(topVar) : r.top;
    const collapsed = memchatCard.classList.contains('memchat-card--collapsed');
    const wVar = memchatCard.style.getPropertyValue('--memchat-card-width').trim();
    const hVar = memchatCard.style.getPropertyValue('--memchat-card-height').trim();
    const width = wVar ? parseFloat(wVar) : r.width;
    const height = hVar ? parseFloat(hVar) : r.height;
    try {
      localStorage.setItem(
        MEMCHAT_CARD_LS_KEY,
        JSON.stringify({ left, top, collapsed, width, height }),
      );
    } catch {
      /* ignore */
    }
  }

  /** @type {{ ox: number, oy: number } | null} */
  let memchatDrag = null;

  const MEMCHAT_MIN_W = 280;
  const MEMCHAT_MIN_H = 240;
  const MEMCHAT_PAD = 8;

  function clampMemchatCardBounds() {
    if (!memchatCard) return;
    const rect = memchatCard.getBoundingClientRect();
    let w = parseFloat(memchatCard.style.getPropertyValue('--memchat-card-width')) || rect.width;
    let h = parseFloat(memchatCard.style.getPropertyValue('--memchat-card-height')) || rect.height;
    const maxW = window.innerWidth - MEMCHAT_PAD * 2;
    const maxH = window.innerHeight - MEMCHAT_PAD * 2;
    w = Math.max(MEMCHAT_MIN_W, Math.min(w, maxW));
    h = Math.max(MEMCHAT_MIN_H, Math.min(h, maxH));
    memchatCard.style.setProperty('--memchat-card-width', `${w}px`);
    memchatCard.style.setProperty('--memchat-card-height', `${h}px`);

    let left = parseFloat(memchatCard.style.getPropertyValue('--memchat-card-left')) || rect.left;
    let top = parseFloat(memchatCard.style.getPropertyValue('--memchat-card-top')) || rect.top;
    left = Math.max(MEMCHAT_PAD, Math.min(left, window.innerWidth - w - MEMCHAT_PAD));
    top = Math.max(MEMCHAT_PAD, Math.min(top, window.innerHeight - h - MEMCHAT_PAD));
    memchatCard.style.setProperty('--memchat-card-left', `${left}px`);
    memchatCard.style.setProperty('--memchat-card-top', `${top}px`);
  }

  loadMemchatCardLayout();
  clampMemchatCardBounds();

  memchatCardDrag?.addEventListener('pointerdown', (e) => {
    if (!memchatCard || e.button !== 0) return;
    e.preventDefault();
    const rect = memchatCard.getBoundingClientRect();
    memchatDrag = { ox: e.clientX - rect.left, oy: e.clientY - rect.top };
    memchatCard.classList.add('memchat-card--dragging');
    try {
      memchatCardDrag.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  });

  memchatCardDrag?.addEventListener('pointermove', (e) => {
    if (!memchatDrag || !memchatCard) return;
    let left = e.clientX - memchatDrag.ox;
    let top = e.clientY - memchatDrag.oy;
    const w = memchatCard.offsetWidth;
    const h = memchatCard.offsetHeight;
    left = Math.max(MEMCHAT_PAD, Math.min(left, window.innerWidth - w - MEMCHAT_PAD));
    top = Math.max(MEMCHAT_PAD, Math.min(top, window.innerHeight - h - MEMCHAT_PAD));
    memchatCard.style.setProperty('--memchat-card-left', `${left}px`);
    memchatCard.style.setProperty('--memchat-card-top', `${top}px`);
  });

  function endMemchatDrag() {
    if (!memchatDrag) return;
    memchatDrag = null;
    memchatCard?.classList.remove('memchat-card--dragging');
    saveMemchatCardLayout();
  }

  memchatCardDrag?.addEventListener('pointerup', endMemchatDrag);
  memchatCardDrag?.addEventListener('pointercancel', endMemchatDrag);

  /** @type {{ startX: number, startY: number, startW: number, startH: number } | null} */
  let memchatResize = null;

  memchatCardResize?.addEventListener('pointerdown', (e) => {
    if (!memchatCard || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = memchatCard.getBoundingClientRect();
    memchatResize = {
      startX: e.clientX,
      startY: e.clientY,
      startW: rect.width,
      startH: rect.height,
    };
    memchatCard.classList.add('memchat-card--resizing');
    try {
      memchatCardResize.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  });

  memchatCardResize?.addEventListener('pointermove', (e) => {
    if (!memchatResize || !memchatCard) return;
    const dw = e.clientX - memchatResize.startX;
    const dh = e.clientY - memchatResize.startY;
    const maxW = window.innerWidth - MEMCHAT_PAD * 2;
    const maxH = window.innerHeight - MEMCHAT_PAD * 2;
    let w = memchatResize.startW + dw;
    let h = memchatResize.startH + dh;
    w = Math.max(MEMCHAT_MIN_W, Math.min(w, maxW));
    h = Math.max(MEMCHAT_MIN_H, Math.min(h, maxH));
    memchatCard.style.setProperty('--memchat-card-width', `${w}px`);
    memchatCard.style.setProperty('--memchat-card-height', `${h}px`);
    clampMemchatCardBounds();
  });

  function endMemchatResize() {
    if (!memchatResize) return;
    memchatResize = null;
    memchatCard?.classList.remove('memchat-card--resizing');
    saveMemchatCardLayout();
  }

  memchatCardResize?.addEventListener('pointerup', endMemchatResize);
  memchatCardResize?.addEventListener('pointercancel', endMemchatResize);

  memchatCardCollapse?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!memchatCard) return;
    memchatCard.classList.toggle('memchat-card--collapsed');
    const collapsed = memchatCard.classList.contains('memchat-card--collapsed');
    memchatCardCollapse.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    memchatCardCollapse.textContent = collapsed ? '+' : '−';
    saveMemchatCardLayout();
  });

  window.addEventListener('resize', () => {
    clampMemchatCardBounds();
    saveMemchatCardLayout();
  });

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
    streamStartedAt = Date.now();
    streamStatusInterval = setInterval(() => {
      if (!sendStatusEl || !streamingAssistant) return;
      const len = streamingAssistant.content.length;
      const elapsed = Date.now() - streamStartedAt;
      const longGen = len >= 900 || elapsed >= 2800;
      if (!longGen) {
        sendStatusEl.textContent = 'Generating answer…';
        return;
      }
      const n = len >= 1000 ? `${(len / 1000).toFixed(1)}k` : String(len);
      sendStatusEl.textContent = `Still writing… ${n} chars`;
    }, 520);
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
      parts.push('Only a couple of drawers matched this search, so the model had little to go on.');
    }
    if (trust.maxSimilarity != null && trust.weakMatch) {
      parts.push(
        `The closest snippet is only about ${(trust.maxSimilarity * 100).toFixed(0)}% similar — verify anything important in the palace.`,
      );
    } else if (trust.maxSimilarity == null && trust.sparse && trust.count > 1) {
      parts.push('Search did not report similarity scores; spot-check in the palace if unsure.');
    }
    const body = parts.length ? parts.join(' ') : 'Evidence is thin for this question — double-check important claims.';
    return `<div class="memchat-trust-banner" role="status"><span class="memchat-trust-banner__label">Retrieval note</span> ${escapeHtml(body)}</div>`;
  }

  /**
   * @param {number | null} simNum
   */
  function similarityHuman(simNum) {
    if (simNum == null || !Number.isFinite(simNum)) return { text: '—', low: false };
    if (simNum >= 0.55) return { text: 'Strong match', low: false };
    if (simNum >= 0.35) return { text: 'Fair match', low: false };
    return { text: 'Weak match', low: true };
  }

  /**
   * @param {string} ex
   */
  function excerptHeadline(ex) {
    const t = String(ex ?? '').trim();
    if (!t) return 'Snippet';
    const line = t.split('\n').find((l) => l.trim()) || t;
    const one = line.trim();
    if (one.length <= 80) return one;
    return `${one.slice(0, 77)}…`;
  }

  /**
   * @param {import('./memories-chat-retrieval.js').RetrievedMemorySource[]} sources
   * @param {number} msgIdx — index in thread, or -1 for in-flight stream
   */
  function renderSourcesBlock(sources, msgIdx) {
    if (!Array.isArray(sources) || !sources.length) {
      return '<p class="memchat-sources-empty">No snippets were attached to this turn.</p>';
    }
    const trust = assessRetrievalEvidence(sources);
    const banner = renderTrustBanner(trust);
    return `${banner}<ul class="memchat-sources-list" aria-label="Supporting memories">
      ${sources
        .map((s, i) => {
          const wing = s.wing || '';
          const room = s.room || '';
          const did = s.drawerId ? String(s.drawerId) : '';
          const rawEx = s.excerpt || '';
          const ex = escapeHtml(rawEx.slice(0, 360));
          const long = rawEx.length > 360;
          const simNum = typeof s.similarity === 'number' && Number.isFinite(s.similarity) ? s.similarity : null;
          const sim = similarityHuman(simNum);
          const low = sim.low;
          const loc = wing && room ? `${escapeHtml(wing)} · ${escapeHtml(room)}` : escapeHtml(wing || room || '—');
          const headline = escapeHtml(excerptHeadline(rawEx));
          const cardCls = `memchat-source-card${low ? ' memchat-source-card--low' : ''}`;
          return `<li class="${cardCls}">
            <div class="memchat-source-card__head">
              <div class="memchat-source-card__head-text">
                <div class="memchat-source-card__title">${headline}</div>
                <div class="memchat-source-card__meta">
                  <span class="memchat-source-card__loc">${loc}</span>
                  <span class="memchat-source-card__sim${low ? ' memchat-source-card__sim--low' : ''}" title="Search similarity">${escapeHtml(sim.text)}</span>
                </div>
                ${did ? `<div class="memchat-source-card__id"><span class="memchat-source-card__id-label">Drawer</span> <code>${escapeHtml(did)}</code></div>` : ''}
              </div>
            </div>
            <p class="memchat-source-card__excerpt">${ex}${long ? '…' : ''}</p>
            <div class="memchat-source-card__actions">
              ${
                wing && room
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-jump-room" data-wing="${escapeHtml(wing)}" data-room="${escapeHtml(room)}">Open in map</button>`
                  : ''
              }
              ${
                did
                  ? `<button type="button" class="btn btn--ghost btn--sm memchat-open-drawer" data-drawer-id="${escapeHtml(did)}" data-wing="${escapeHtml(wing)}" data-room="${escapeHtml(room)}">Open drawer</button>`
                  : ''
              }
              <button type="button" class="btn btn--ghost btn--sm memchat-quote" data-msg-idx="${msgIdx}" data-src-idx="${i}" title="Insert quoted excerpt at cursor. Shift+click: new paragraph before quote.">Quote in message</button>
            </div>
          </li>`;
        })
        .join('')}
    </ul>`;
  }

  function renderEvidenceSection(sources, msgIdx) {
    const inner = renderSourcesBlock(sources, msgIdx);
    return `<section class="memchat-evidence" aria-label="Supporting memories for this turn">
      <div class="memchat-evidence__head">
        <span class="memchat-evidence__title">Supporting memories</span>
        <span class="memchat-evidence__hint">Excerpts from your palace the model was allowed to read</span>
      </div>
      <div class="memchat-evidence__body">${inner}</div>
    </section>`;
  }

  /**
   * @param {boolean} streaming
   * @param {boolean} [partial]
   * @param {{ contentLen?: number, completionMode?: 'stream' | 'json' }} [meta]
   */
  function renderAnswerHeading(streaming, partial, meta = {}) {
    const { contentLen = 0, completionMode } = meta;
    const longAnswer = contentLen >= 520;
    const showJsonNote = completionMode === 'json' && contentLen >= 240;
    const badge = streaming
      ? '<span class="memchat-live-pill" aria-live="polite"><span class="memchat-live-pill__dot" aria-hidden="true"></span> Generating</span>'
      : partial
        ? '<span class="memchat-partial-pill">Stopped mid-answer</span>'
        : '';
    const showQuietMeta = !streaming && !partial && (longAnswer || showJsonNote);
    const quietMeta = showQuietMeta
      ? `<div class="memchat-answer-meta" aria-hidden="false">
            ${longAnswer ? '<span class="memchat-answer-meta__chip memchat-answer-meta__chip--done">Finished</span>' : ''}
            ${showJsonNote ? '<span class="memchat-answer-meta__chip memchat-answer-meta__chip--fallback" title="Server returned a full message instead of a token stream">Non-streaming response</span>' : ''}
          </div>`
      : '';
    return `<div class="memchat-answer-head">
      <span class="memchat-answer-head__label">Answer</span>
      ${badge}
      ${quietMeta}
    </div>`;
  }

  /**
   * @param {string} content
   * @param {number} turnNum
   */
  function renderUserMessage(content, turnNum) {
    return `<div class="memchat-msg memchat-msg--user" role="article">
      <div class="memchat-msg__skim">
        <span class="memchat-msg__skim-label">Question</span>
        <span class="memchat-msg__skim-num" aria-label="Turn ${turnNum}">#${turnNum}</span>
      </div>
      <div class="memchat-msg__bubble">${escapeHtml(content)}</div>
    </div>`;
  }

  /**
   * @param {typeof thread[0]} m
   * @param {number} mi
   */
  function renderAssistantMessageHtml(m, mi) {
    const err = m.error ? `<div class="memchat-msg__err">${escapeHtml(m.error)}</div>` : '';
    if (m.error) {
      return `<div class="memchat-msg memchat-msg--assistant memchat-msg--assistant-error" role="article">${err}</div>`;
    }
    const partial = Boolean(m.partial);
    const contentLen = (m.content || '').length;
    const head = renderAnswerHeading(false, partial, {
      contentLen,
      completionMode: m.completionMode,
    });
    const body = m.content
      ? `<div class="memchat-msg__bubble memchat-msg__bubble--assistant${partial ? ' memchat-msg__bubble--partial' : ''}">${escapeHtml(m.content)}</div>`
      : '';
    const src =
      Array.isArray(m.sources) && m.sources.length ? renderEvidenceSection(m.sources, mi) : '';
    return `<div class="memchat-msg memchat-msg--assistant${partial ? ' memchat-msg--partial' : ''}" role="article">${head}${body}${src}</div>`;
  }

  function renderStreamingAssistantHtml() {
    if (!streamingAssistant) return '';
    return `<div class="memchat-msg memchat-msg--assistant memchat-msg--streaming" role="article" aria-busy="true">
            ${renderAnswerHeading(true, false)}
            <div class="memchat-msg__bubble memchat-msg__bubble--assistant memchat-msg__bubble--streaming">
              <span id="memchat-streaming-text" class="memchat-streaming-text"></span><span class="memchat-streaming-caret" aria-hidden="true">▍</span>
              <span id="memchat-stream-anchor" class="memchat-stream-anchor" aria-hidden="true"></span>
            </div>
            ${renderEvidenceSection(streamingAssistant.sources, -1)}
          </div>`;
  }

  /**
   * @param {number} turnNum
   * @param {string | null} userContent
   * @param {typeof thread[0] | null} assistantMsg
   * @param {number} assistantIdx
   * @param {boolean} withStream
   */
  function renderTurnBlock(turnNum, userContent, assistantMsg, assistantIdx, withStream) {
    const trust =
      assistantMsg?.sources && Array.isArray(assistantMsg.sources)
        ? assessRetrievalEvidence(assistantMsg.sources)
        : streamingAssistant?.sources
          ? assessRetrievalEvidence(streamingAssistant.sources)
          : null;
    const weak = trust?.showBanner;
    const turnClass = `memchat-turn${weak ? ' memchat-turn--weak' : ''}`;
    const assistantHtml = withStream
      ? renderStreamingAssistantHtml()
      : assistantMsg
        ? renderAssistantMessageHtml(assistantMsg, assistantIdx)
        : '';
    return `<div class="${turnClass}" data-memchat-turn="${turnNum}">
      <div class="memchat-turn__rail" aria-hidden="true"></div>
      <div class="memchat-turn__body">
        ${userContent != null ? renderUserMessage(userContent, turnNum) : ''}
        ${assistantHtml}
      </div>
    </div>`;
  }

  function renderThreadHtml() {
    const chunks = [];
    let turnNum = 0;
    let i = 0;
    while (i < thread.length) {
      const m = thread[i];
      if (m.role === 'user') {
        turnNum += 1;
        const u = m.content;
        const pendingStream =
          Boolean(streamingAssistant) && i === thread.length - 1 && m.role === 'user';
        if (pendingStream) {
          chunks.push(renderTurnBlock(turnNum, u, null, -1, true));
          i += 1;
          break;
        }
        const next = thread[i + 1];
        if (next && next.role === 'assistant') {
          chunks.push(renderTurnBlock(turnNum, u, next, i + 1, false));
          i += 2;
        } else {
          chunks.push(renderTurnBlock(turnNum, u, null, -1, false));
          i += 1;
        }
      } else {
        turnNum += 1;
        chunks.push(renderTurnBlock(turnNum, null, m, i, false));
        i += 1;
      }
    }
    return chunks.join('');
  }

  function renderMessages() {
    if (!messagesEl) return;
    messagesEl.setAttribute('aria-busy', streamingAssistant ? 'true' : 'false');
    const html = renderThreadHtml();
    messagesEl.innerHTML = html;
    flushStreamingDom();
    maybeScrollToBottom();
  }

  function showComposeHint(text, clearAfterMs = 4200) {
    if (composeHintTimer != null) {
      clearTimeout(composeHintTimer);
      composeHintTimer = null;
    }
    if (composeHintEl) {
      composeHintEl.hidden = false;
      composeHintEl.textContent = text;
    }
    composeHintTimer = setTimeout(() => {
      composeHintTimer = null;
      if (composeHintEl) {
        composeHintEl.textContent = '';
        composeHintEl.hidden = true;
      }
    }, clearAfterMs);
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
      showComposeHint('Quote added — add a follow-up question below, or edit the quote first.');
    }
  });

  clearBtn?.addEventListener('click', () => {
    stopStreamStatusTicker();
    if (composeHintTimer != null) {
      clearTimeout(composeHintTimer);
      composeHintTimer = null;
    }
    if (composeHintEl) {
      composeHintEl.textContent = '';
      composeHintEl.hidden = true;
    }
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
    if (composeHintTimer != null) {
      clearTimeout(composeHintTimer);
      composeHintTimer = null;
    }
    if (composeHintEl) {
      composeHintEl.textContent = '';
      composeHintEl.hidden = true;
    }
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
        completionMode: r.mode === 'json' ? 'json' : 'stream',
      });
      streamingAssistant = null;
      if (r.mode === 'json' && r.content.length >= 400) {
        scheduleCompletionStatus('Full reply (non-streaming).', 2200);
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
        scheduleCompletionStatus('Partial answer saved.', 2600);
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
