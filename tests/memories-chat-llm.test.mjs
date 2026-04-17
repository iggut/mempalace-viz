import assert from 'node:assert/strict';
import test from 'node:test';
import { openAiChatCompletions, testOpenAiCompatibleConnection } from '../memories-chat-llm.js';

test('testOpenAiCompatibleConnection uses /models and optional Bearer', async () => {
  /** @type {RequestInit | null} */
  let lastInit = null;
  /** @type {string | null} */
  let lastUrl = null;
  globalThis.fetch = async (url, init) => {
    lastUrl = String(url);
    lastInit = init;
    return {
      ok: true,
      status: 200,
      text: async () => '{"data":[]}',
    };
  };
  const r = await testOpenAiCompatibleConnection('http://127.0.0.1:1/v1', { apiKey: 'k' });
  assert.equal(r.ok, true);
  assert.match(lastUrl, /\/v1\/models$/);
  assert.equal(lastInit?.headers?.Authorization, 'Bearer k');
});

test('openAiChatCompletions posts to chat/completions and parses message content', async () => {
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /\/v1\/chat\/completions$/);
    assert.equal(init.method, 'POST');
    const body = JSON.parse(String(init.body));
    assert.ok(Array.isArray(body.messages));
    assert.equal(body.messages[0].role, 'user');
    return {
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          choices: [{ message: { role: 'assistant', content: 'Hello from model.' } }],
        }),
    };
  };
  const out = await openAiChatCompletions({
    endpointInput: 'http://127.0.0.1:1',
    messages: [{ role: 'user', content: 'Hi' }],
    timeoutMs: 5000,
  });
  assert.equal(out.content, 'Hello from model.');
});

test('openAiChatCompletions omits Authorization when api key blank', async () => {
  /** @type {Headers | Record<string, string> | undefined} */
  let headers;
  globalThis.fetch = async (_url, init) => {
    headers = init.headers;
    return { ok: false, status: 401, text: async () => '{"error":{"message":"nope"}}' };
  };
  await assert.rejects(
    () =>
      openAiChatCompletions({
        endpointInput: 'http://127.0.0.1:1/v1',
        apiKey: '   ',
        messages: [{ role: 'user', content: 'x' }],
        timeoutMs: 3000,
      }),
    /401/,
  );
  const h = headers;
  const auth =
    h && typeof h.get === 'function'
      ? h.get('Authorization')
      : h && typeof h === 'object'
        ? /** @type {Record<string, string>} */ (h).Authorization
        : undefined;
  assert.equal(auth, undefined);
});
