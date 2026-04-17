import assert from 'node:assert/strict';
import test from 'node:test';
import {
  chatCompletionsUrl,
  clearMemoriesChatConfigStorage,
  defaultMemoriesChatConfig,
  loadMemoriesChatConfig,
  MEMORIES_CHAT_CONFIG_LS_KEY,
  normalizeOpenAiApiRoot,
  parseStoredMemoriesChatConfig,
  saveMemoriesChatConfig,
} from '../memories-chat-config.js';

test('normalizeOpenAiApiRoot handles trailing slash and /v1', () => {
  assert.deepEqual(normalizeOpenAiApiRoot('http://127.0.0.1:8080'), { ok: true, apiRoot: 'http://127.0.0.1:8080/v1' });
  assert.deepEqual(normalizeOpenAiApiRoot('http://127.0.0.1:8080/'), { ok: true, apiRoot: 'http://127.0.0.1:8080/v1' });
  assert.deepEqual(normalizeOpenAiApiRoot('http://127.0.0.1:8080/v1'), { ok: true, apiRoot: 'http://127.0.0.1:8080/v1' });
  assert.deepEqual(normalizeOpenAiApiRoot('http://127.0.0.1:8080/v1/'), { ok: true, apiRoot: 'http://127.0.0.1:8080/v1' });
});

test('normalizeOpenAiApiRoot rejects bad URLs', () => {
  assert.equal(normalizeOpenAiApiRoot('').ok, false);
  assert.equal(normalizeOpenAiApiRoot('not a url').ok, false);
  assert.equal(normalizeOpenAiApiRoot('ftp://x').ok, false);
});

test('chatCompletionsUrl appends single /chat/completions', () => {
  assert.equal(chatCompletionsUrl('http://127.0.0.1:1/v1'), 'http://127.0.0.1:1/v1/chat/completions');
});

test('save/load roundtrip for endpoint config (no key echo in assertion)', () => {
  const prevLs = globalThis.localStorage;
  const prev = prevLs?.getItem?.(MEMORIES_CHAT_CONFIG_LS_KEY);
  try {
    const store = new Map();
    globalThis.localStorage = {
      getItem(k) {
        return store.has(k) ? store.get(k) : null;
      },
      setItem(k, v) {
        store.set(k, v);
      },
      removeItem(k) {
        store.delete(k);
      },
    };
    saveMemoriesChatConfig({ endpoint: 'http://127.0.0.1:9/v1', apiKey: 'secret', model: 'm' });
    const loaded = loadMemoriesChatConfig();
    assert.equal(loaded.endpoint, 'http://127.0.0.1:9/v1');
    assert.equal(loaded.apiKey, 'secret');
    assert.equal(loaded.model, 'm');
    clearMemoriesChatConfigStorage();
    assert.deepEqual(loadMemoriesChatConfig(), defaultMemoriesChatConfig());
  } finally {
    globalThis.localStorage = prevLs;
    if (prev != null) prevLs?.setItem?.(MEMORIES_CHAT_CONFIG_LS_KEY, prev);
    else prevLs?.removeItem?.(MEMORIES_CHAT_CONFIG_LS_KEY);
  }
});

test('parseStoredMemoriesChatConfig tolerates partial shapes', () => {
  assert.deepEqual(parseStoredMemoriesChatConfig({ endpoint: 'x' }), {
    endpoint: 'x',
    apiKey: '',
    model: '',
  });
});
