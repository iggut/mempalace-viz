import assert from 'node:assert/strict';
import test from 'node:test';
import {
  completeOpenAiChatWithStreamFallback,
  consumeOpenAiSseChatStream,
  parseOpenAiChatSseLine,
} from '../memories-chat-llm.js';
import { buildQuoteFromMemorySource } from '../memories-chat-ui.js';

test('parseOpenAiChatSseLine extracts delta content', () => {
  const line =
    'data: {"choices":[{"delta":{"content":"Hello"},"index":0}]}';
  const p = parseOpenAiChatSseLine(line);
  assert.equal(p.kind, 'delta');
  assert.equal(p.text, 'Hello');
});

test('parseOpenAiChatSseLine handles [DONE]', () => {
  assert.equal(parseOpenAiChatSseLine('data: [DONE]').kind, 'done');
});

test('parseOpenAiChatSseLine skips comments and empty', () => {
  assert.equal(parseOpenAiChatSseLine(': ping').kind, 'skip');
  assert.equal(parseOpenAiChatSseLine('').kind, 'skip');
});

test('consumeOpenAiSseChatStream accumulates tokens', async () => {
  const enc = new TextEncoder();
  const chunk =
    'data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n' +
    'data: {"choices":[{"delta":{"content":" there"}}]}\n\n' +
    'data: [DONE]\n';
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode(chunk));
      controller.close();
    },
  });
  const ac = new AbortController();
  let deltas = '';
  const out = await consumeOpenAiSseChatStream(stream, ac.signal, (d, acc) => {
    deltas += d;
    assert.equal(acc, deltas);
  });
  assert.equal(out, 'Hi there');
});

test('completeOpenAiChatWithStreamFallback falls back to JSON when stream empty', async () => {
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls += 1;
    const u = String(url);
    if (u.includes('/chat/completions') && init?.body && String(init.body).includes('"stream":true')) {
      return {
        ok: true,
        status: 200,
        headers: new Headers([['content-type', 'text/event-stream']]),
        body: new ReadableStream({
          start(c) {
            c.close();
          },
        }),
      };
    }
    if (u.includes('/chat/completions')) {
      assert.equal(String(init.body).includes('"stream":true'), false);
      return {
        ok: true,
        status: 200,
        headers: new Headers([['content-type', 'application/json']]),
        text: async () =>
          JSON.stringify({
            choices: [{ message: { role: 'assistant', content: 'Fallback answer.' } }],
          }),
      };
    }
    throw new Error('unexpected url ' + u);
  };
  const r = await completeOpenAiChatWithStreamFallback({
    endpointInput: 'http://127.0.0.1:1/v1',
    messages: [{ role: 'user', content: 'x' }],
    timeoutMs: 5000,
    onDelta: () => {},
  });
  assert.equal(r.content, 'Fallback answer.');
  assert.equal(r.mode, 'json');
  assert.ok(calls >= 2);
});

test('buildQuoteFromMemorySource formats evidence block', () => {
  const q = buildQuoteFromMemorySource({
    wing: 'W',
    room: 'R',
    drawerId: 'd-1',
    excerpt: 'Line one\nLine two',
    similarity: 0.5,
  });
  assert.match(q, /Memory evidence — W \/ R — drawer d-1/);
  assert.match(q, /^> Line one/m);
  assert.match(q, /^> Line two/m);
});
