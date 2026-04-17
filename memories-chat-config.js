/**
 * Local OpenAI-compatible LLM settings for Memories Chat — persisted in localStorage.
 * API keys are never logged by this module.
 */

export const MEMORIES_CHAT_CONFIG_LS_KEY = 'mempalace-viz-memories-chat-config-v1';

/** @typedef {{ endpoint: string, apiKey: string, model: string }} MemoriesChatConfig */

export function defaultMemoriesChatConfig() {
  return { endpoint: '', apiKey: '', model: '' };
}

/**
 * Parse and normalize user-entered base URL to an OpenAI-style `/v1` API root.
 * @param {string} raw
 * @returns {{ ok: true, apiRoot: string } | { ok: false, error: string }}
 */
export function normalizeOpenAiApiRoot(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return { ok: false, error: 'Endpoint is empty.' };
  let u;
  try {
    u = new URL(s);
  } catch {
    return { ok: false, error: 'Invalid URL — check the format (e.g. http://127.0.0.1:1234/v1).' };
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    return { ok: false, error: 'Only http and https URLs are supported.' };
  }
  if (!u.hostname) {
    return { ok: false, error: 'Missing host in URL.' };
  }
  let path = u.pathname.replace(/\/+$/, '');
  if (path === '' || path === '/') {
    return { ok: true, apiRoot: `${u.origin}/v1` };
  }
  if (/\/v1$/i.test(path)) {
    return { ok: true, apiRoot: `${u.origin}${path}` };
  }
  return { ok: true, apiRoot: `${u.origin}${path}/v1` };
}

/**
 * Full URL for `POST .../chat/completions`.
 * @param {string} apiRoot — from `normalizeOpenAiApiRoot`
 */
export function chatCompletionsUrl(apiRoot) {
  const base = String(apiRoot || '').replace(/\/+$/, '');
  return `${base}/chat/completions`;
}

/**
 * `GET .../models` — common probe for OpenAI-compatible servers.
 */
export function modelsListUrl(apiRoot) {
  const base = String(apiRoot || '').replace(/\/+$/, '');
  return `${base}/models`;
}

/**
 * @param {unknown} raw
 * @returns {MemoriesChatConfig}
 */
export function parseStoredMemoriesChatConfig(raw) {
  const d = defaultMemoriesChatConfig();
  if (!raw || typeof raw !== 'object') return d;
  const o = /** @type {Record<string, unknown>} */ (raw);
  return {
    endpoint: typeof o.endpoint === 'string' ? o.endpoint : d.endpoint,
    apiKey: typeof o.apiKey === 'string' ? o.apiKey : d.apiKey,
    model: typeof o.model === 'string' ? o.model : d.model,
  };
}

/** @returns {MemoriesChatConfig} */
export function loadMemoriesChatConfig() {
  if (typeof localStorage === 'undefined') return defaultMemoriesChatConfig();
  try {
    const s = localStorage.getItem(MEMORIES_CHAT_CONFIG_LS_KEY);
    if (!s) return defaultMemoriesChatConfig();
    return parseStoredMemoriesChatConfig(JSON.parse(s));
  } catch {
    return defaultMemoriesChatConfig();
  }
}

/** @param {MemoriesChatConfig} config */
export function saveMemoriesChatConfig(config) {
  if (typeof localStorage === 'undefined') return;
  const c = parseStoredMemoriesChatConfig(config);
  localStorage.setItem(MEMORIES_CHAT_CONFIG_LS_KEY, JSON.stringify(c));
}

export function clearMemoriesChatConfigStorage() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(MEMORIES_CHAT_CONFIG_LS_KEY);
}
