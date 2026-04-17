import assert from 'node:assert/strict';
import test from 'node:test';
import { buildOpenAiMessagesFromThread } from '../memories-chat-prompt.js';

test('buildOpenAiMessagesFromThread adds evidence to latest user turn', () => {
  const msgs = buildOpenAiMessagesFromThread([{ role: 'user', content: 'What about X?' }], 'snippet A');
  assert.equal(msgs.length, 2);
  assert.equal(msgs[0].role, 'system');
  assert.equal(msgs[1].role, 'user');
  assert.match(msgs[1].content, /Retrieved memories/);
  assert.match(msgs[1].content, /snippet A/);
  assert.match(msgs[1].content, /What about X/);
});

test('buildOpenAiMessagesFromThread includes prior turns without re-embedding old evidence', () => {
  const msgs = buildOpenAiMessagesFromThread(
    [
      { role: 'user', content: 'first' },
      { role: 'assistant', content: 'ans' },
      { role: 'user', content: 'follow-up' },
    ],
    'new evidence',
  );
  assert.equal(msgs.filter((m) => m.role === 'user').length, 2);
  assert.equal(msgs[msgs.length - 1].content.includes('follow-up'), true);
  assert.equal(msgs[msgs.length - 1].content.includes('new evidence'), true);
});

test('buildOpenAiMessagesFromThread skips failed assistant turns', () => {
  const msgs = buildOpenAiMessagesFromThread(
    [
      { role: 'user', content: 'q' },
      { role: 'assistant', content: '', error: 'bad' },
      { role: 'user', content: 'q2' },
    ],
    'ev',
  );
  const asst = msgs.filter((m) => m.role === 'assistant');
  assert.equal(asst.length, 0);
});
