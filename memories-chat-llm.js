/**
 * OpenAI-compatible chat completions client (browser fetch).
 * Requests go only to the configured base; optional Bearer when apiKey non-empty.
 */

import { createApiUrl } from './api.js';
import {
  chatCompletionsUrl,
  isLoopbackOpenAiUrl,
  modelsListUrl,
  normalizeOpenAiApiRoot,
} from './memories-chat-config.js';

/**
 * Same-origin proxy for loopback OpenAI URLs so the browser does not hit cross-origin CORS
 * (local servers often omit Access-Control headers; OPTIONS may log errors).
 * @param {string} url
 * @param {RequestInit} [init]
 */
async function openAiFetch(url, init = {}) {
  const u = String(url);
  if (typeof globalThis !== 'undefined' && globalThis.location && isLoopbackOpenAiUrl(u)) {
    const proxyUrl = createApiUrl('/api/memories-chat/openai-proxy').toString();
    const hi = init.headers;
    const forwardHeaders = {};
    if (hi instanceof Headers) {
      hi.forEach((v, k) => {
        forwardHeaders[k] = v;
      });
    } else if (hi && typeof hi === 'object') {
      Object.assign(forwardHeaders, /** @type {Record<string, string>} */ (hi));
    }
    const bodyStr =
      typeof init.body === 'string'
        ? init.body
        : init.body != null
          ? String(init.body)
          : null;
    return fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUrl: u,
        method: init.method || 'GET',
        headers: forwardHeaders,
        body: bodyStr,
      }),
      signal: init.signal,
    });
  }
  return fetch(u, init);
}

/**
 * Parse a single SSE `data:` line payload (OpenAI chat completions stream).
 * @param {string} line — full line, e.g. `data: {...}` or `data: [DONE]`
 * @returns {{ kind: 'skip' } | { kind: 'done' } | { kind: 'delta', text: string }}
 */
export function parseOpenAiChatSseLine(line) {
  const s = String(line ?? '').trimEnd();
  if (!s || s.startsWith(':')) return { kind: 'skip' };
  if (!s.startsWith('data:')) return { kind: 'skip' };
  const payload = s.slice(5).trimStart();
  if (payload === '[DONE]') return { kind: 'done' };
  try {
    const j = JSON.parse(payload);
    const ch = j?.choices?.[0];
    if (!ch) return { kind: 'delta', text: '' };
    const d = ch.delta;
    if (d && typeof d.content === 'string') return { kind: 'delta', text: d.content };
    if (d && Array.isArray(d.content)) {
      let out = '';
      for (const part of d.content) {
        if (part?.type === 'text' && typeof part.text === 'string') out += part.text;
      }
      return { kind: 'delta', text: out };
    }
    if (typeof ch.text === 'string') return { kind: 'delta', text: ch.text };
    return { kind: 'delta', text: '' };
  } catch {
    return { kind: 'delta', text: '' };
  }
}

/**
 * @param {ReadableStream<Uint8Array> | null | undefined} body
 * @param {AbortSignal} signal
 * @param {(delta: string, accumulated: string) => void} onDelta
 * @returns {Promise<string>}
 */
export async function consumeOpenAiSseChatStream(body, signal, onDelta) {
  if (!body) throw new Error('Response missing body for streaming.');
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let acc = '';
  try {
    while (true) {
      let readResult;
      try {
        readResult = await reader.read();
      } catch (readErr) {
        if (signal.aborted || readErr?.name === 'AbortError') {
          try {
            await reader.cancel();
          } catch {
            /* ignore */
          }
          const err = new Error('aborted');
          err.name = 'AbortError';
          throw err;
        }
        throw readErr;
      }
      const { done, value } = readResult;
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split(/\r?\n/);
      buf = lines.pop() ?? '';
      for (const line of lines) {
        const p = parseOpenAiChatSseLine(line);
        if (p.kind === 'skip') continue;
        if (p.kind === 'done') return acc;
        if (p.text) {
          acc += p.text;
          onDelta?.(p.text, acc);
        }
      }
    }
    if (buf.trim()) {
      const p = parseOpenAiChatSseLine(buf);
      if (p.kind === 'done') return acc;
      if (p.kind === 'delta' && p.text) {
        acc += p.text;
        onDelta?.(p.text, acc);
      }
    }
    return acc;
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* ignore */
    }
  }
}

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
    const res = await openAiFetch(url, { method: 'GET', headers, signal });
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
    res = await openAiFetch(url, {
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
 * Streaming chat completions (OpenAI-compatible). Falls back to {@link openAiChatCompletions} when
 * streaming fails for reasons other than user abort.
 *
 * @param {object} params
 * @param {string} params.endpointInput
 * @param {string} [params.apiKey]
 * @param {string} [params.model]
 * @param {Array<{ role: string, content: string }>} params.messages
 * @param {number} [params.temperature]
 * @param {number} [params.maxTokens]
 * @param {AbortSignal} [params.signal]
 * @param {number} [params.timeoutMs]
 * @param {(delta: string, accumulated: string) => void} [params.onDelta]
 * @returns {Promise<{ content: string, raw: unknown | null, mode: 'stream' | 'json' }>}
 */
export async function completeOpenAiChatWithStreamFallback({
  endpointInput,
  apiKey = '',
  model = '',
  messages,
  temperature = 0.25,
  maxTokens = 1200,
  signal,
  timeoutMs = 120000,
  onDelta,
}) {
  try {
    const r = await openAiChatCompletionsStreamRequest({
      endpointInput,
      apiKey,
      model,
      messages,
      temperature,
      maxTokens,
      signal,
      timeoutMs,
      onDelta,
    });
    return { content: r.content, raw: r.raw, mode: 'stream' };
  } catch (e) {
    if (e?.name === 'AbortError') throw e;
    const r = await openAiChatCompletions({
      endpointInput,
      apiKey,
      model,
      messages,
      temperature,
      maxTokens,
      signal,
      timeoutMs,
    });
    if (typeof onDelta === 'function' && r.content) onDelta(r.content, r.content);
    return { content: r.content, raw: r.raw, mode: 'json' };
  }
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
 * @param {(delta: string, accumulated: string) => void} [params.onDelta]
 * @returns {Promise<{ content: string, raw: unknown | null }>}
 */
export async function openAiChatCompletionsStreamRequest({
  endpointInput,
  apiKey = '',
  model = '',
  messages,
  temperature = 0.25,
  maxTokens = 1200,
  signal,
  timeoutMs = 120000,
  onDelta,
}) {
  const n = normalizeOpenAiApiRoot(endpointInput);
  if (!n.ok) throw new Error(n.error);
  const url = chatCompletionsUrl(n.apiRoot);
  const headers = {
    Accept: 'application/json, text/event-stream',
    'Content-Type': 'application/json',
  };
  const key = typeof apiKey === 'string' ? apiKey.trim() : '';
  if (key) headers.Authorization = `Bearer ${key}`;

  const body = {
    model: model.trim() || undefined,
    messages,
    stream: true,
    temperature: Number.isFinite(temperature) ? temperature : 0.25,
    max_tokens: Number.isFinite(maxTokens) ? maxTokens : 1200,
  };
  if (!body.model) delete body.model;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const merged = signal ? combineAbortSignals(signal, controller.signal) : controller.signal;

  let res;
  try {
    res = await openAiFetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: merged,
    });
  } catch (e) {
    if (e?.name === 'AbortError') throw e;
    throw e;
  } finally {
    clearTimeout(t);
  }

  if (!res.ok) {
    const textErr = await res.text();
    let json;
    try {
      json = textErr ? JSON.parse(textErr) : null;
    } catch {
      json = null;
    }
    throw new Error(httpErrorLine(res.status, json));
  }

  const ct = (res.headers.get('content-type') || '').toLowerCase();
  if (ct.includes('application/json')) {
    const textBody = await res.text();
    let json;
    try {
      json = textBody ? JSON.parse(textBody) : null;
    } catch {
      throw new Error(`Unexpected non-JSON body (${res.status})`);
    }
    const content = extractAssistantContent(json);
    if (content == null) {
      throw new Error('Response missing assistant message content — check model and API shape.');
    }
    onDelta?.(content, content);
    return { content, raw: json };
  }

  const stream = res.body;
  if (!stream) {
    throw new Error('Streaming response had no body.');
  }

  const acc = await consumeOpenAiSseChatStream(stream, merged, (d, a) => onDelta?.(d, a));
  if (!String(acc ?? '').trim()) {
    throw new Error('Empty assistant stream — the model may not support streaming; retrying.');
  }
  return { content: acc, raw: null };
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
