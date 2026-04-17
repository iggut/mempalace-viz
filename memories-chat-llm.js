/**
 * OpenAI-compatible chat completions client (browser fetch).
 * Requests go only to the configured base; optional Bearer when apiKey non-empty.
 */

import { chatCompletionsUrl, modelsListUrl, normalizeOpenAiApiRoot } from './memories-chat-config.js';

/**
 * @param {string} endpointInput — raw user endpoint field
 * @param {{ apiKey?: string, signal?: AbortSignal, timeoutMs?: number }} [opts]
 * @returns {Promise<{ ok: true, status: number, data?: unknown } | { ok: false, error: string }>}
 */
export async function testOpenAiCompatibleConnection(endpointInput, opts = {}) {
  const n = normalizeOpenAiApiRoot(endpointInput);
  if (!n.ok) return { ok: false, error: n.error };
  const url = modelsListUrl(n.apiRoot);
  const headers = { Accept: 'application/json' };
  const key = typeof opts.apiKey === 'string' ? opts.apiKey.trim() : '';
  if (key) headers.Authorization = `Bearer ${key}`;

  const controller = new AbortController();
  const timeoutMs = opts.timeoutMs ?? 12000;
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const signal = opts.signal ? combineAbortSignals(opts.signal, controller.signal) : controller.signal;
  try {
    const res = await fetch(url, { method: 'GET', headers, signal });
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    if (!res.ok) {
      return {
        ok: false,
        error: httpErrorLine(res.status, data),
      };
    }
    return { ok: true, status: res.status, data };
  } catch (e) {
    if (e?.name === 'AbortError') {
      return { ok: false, error: `Request timed out after ${timeoutMs}ms` };
    }
    return { ok: false, error: e?.message || String(e) };
  } finally {
    clearTimeout(t);
  }
}

/**
 * @param {AbortSignal} a
 * @param {AbortSignal} b
 */
export function combineAbortSignals(a, b) {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any === 'function') {
    return AbortSignal.any([a, b]);
  }
  const c = new AbortController();
  const onAbort = () => c.abort();
  if (a.aborted || b.aborted) {
    c.abort();
    return c.signal;
  }
  a.addEventListener('abort', onAbort);
  b.addEventListener('abort', onAbort);
  return c.signal;
}

/**
 * @param {number} status
 * @param {unknown} body
 */
function httpErrorLine(status, body) {
  if (body && typeof body === 'object' && body.error) {
    const e = body.error;
    const msg =
      typeof e === 'string'
        ? e
        : e?.message != null
          ? String(e.message)
          : JSON.stringify(e);
    return `HTTP ${status}: ${msg}`;
  }
  if (typeof body === 'string' && body.trim()) {
    const t = body.trim();
    return `HTTP ${status}: ${t.slice(0, 200)}${t.length > 200 ? '…' : ''}`;
  }
  return `HTTP ${status}`;
}

/**
 * @param {object} params
 * @param {string} params.endpointInput
 * @param {string} [params.apiKey]
 * @param {string} [params.model]
 * @param {Array<{ role: string, content: string }>} params.messages
 * @param {number} [params.temperature]
 * @param {number} [params.maxTokens]
 * @param {AbortSignal} [params.signal]
 * @param {number} [params.timeoutMs]
 * @returns {Promise<{ content: string, raw: unknown }>}
 */
export async function openAiChatCompletions({
  endpointInput,
  apiKey = '',
  model = '',
  messages,
  temperature = 0.25,
  maxTokens = 1200,
  signal,
  timeoutMs = 120000,
}) {
  const n = normalizeOpenAiApiRoot(endpointInput);
  if (!n.ok) throw new Error(n.error);
  const url = chatCompletionsUrl(n.apiRoot);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const key = typeof apiKey === 'string' ? apiKey.trim() : '';
  if (key) headers.Authorization = `Bearer ${key}`;

  const body = {
    model: model.trim() || undefined,
    messages,
    temperature: Number.isFinite(temperature) ? temperature : 0.25,
    max_tokens: Number.isFinite(maxTokens) ? maxTokens : 1200,
  };
  if (!body.model) delete body.model;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const merged = signal ? combineAbortSignals(signal, controller.signal) : controller.signal;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: merged,
    });
  } catch (e) {
    if (e?.name === 'AbortError') throw new Error(`Request timed out after ${timeoutMs}ms`);
    throw e;
  } finally {
    clearTimeout(t);
  }

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Unexpected non-JSON response (${res.status})`);
  }
  if (!res.ok) {
    throw new Error(httpErrorLine(res.status, json));
  }

  const content = extractAssistantContent(json);
  if (content == null) {
    throw new Error('Response missing assistant message content — check model and API shape.');
  }
  return { content, raw: json };
}

/**
 * @param {unknown} json
 * @returns {string | null}
 */
function extractAssistantContent(json) {
  if (!json || typeof json !== 'object') return null;
  const choices = /** @type {{ choices?: unknown[] }} */ (json).choices;
  if (!Array.isArray(choices) || !choices.length) return null;
  const msg = choices[0]?.message;
  if (msg && typeof msg === 'object' && typeof msg.content === 'string') return msg.content;
  const t = choices[0]?.text;
  if (typeof t === 'string') return t;
  return null;
}
