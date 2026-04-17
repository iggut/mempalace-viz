import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assessRetrievalEvidence,
  formatRetrievalContextForPrompt,
  retrieveMemoriesForChat,
} from '../memories-chat-retrieval.js';

test('retrieveMemoriesForChat returns empty when search has no results', async () => {
  const r = await retrieveMemoriesForChat({
    query: 'zzz',
    fetchSemanticSearch: async () => ({ results: [] }),
    fetchDrawerById: async () => ({}),
  });
  assert.equal(r.sources.length, 0);
  assert.equal(r.retrievalNote, null);
});

test('retrieveMemoriesForChat maps drawer fetch into contentForModel', async () => {
  const r = await retrieveMemoriesForChat({
    query: 'q',
    fetchSemanticSearch: async () => ({
      results: [
        {
          wing: 'W',
          room: 'R',
          text: 'preview',
          similarity: 0.9,
          drawer_id: 'd1',
        },
      ],
    }),
    fetchDrawerById: async (id) => {
      assert.equal(id, 'd1');
      return { drawer_id: 'd1', wing: 'W', room: 'R', content: 'full body text' };
    },
    maxDrawerFetches: 5,
  });
  assert.equal(r.sources.length, 1);
  assert.equal(r.sources[0].drawerId, 'd1');
  assert.equal(r.sources[0].contentForModel, 'full body text');
});

test('retrieveMemoriesForChat surfaces MCP-style error string', async () => {
  const r = await retrieveMemoriesForChat({
    query: 'q',
    fetchSemanticSearch: async () => ({ error: 'upstream failed' }),
    fetchDrawerById: async () => ({}),
  });
  assert.equal(r.sources.length, 0);
  assert.equal(r.retrievalNote, 'upstream failed');
});

test('formatRetrievalContextForPrompt lists memories', () => {
  const block = formatRetrievalContextForPrompt([
    { wing: 'A', room: 'B', drawerId: 'x', excerpt: 'e', similarity: 1, contentForModel: 'body' },
  ]);
  assert.match(block, /Memory 1/);
  assert.match(block, /A \/ B/);
  assert.match(block, /body/);
});

test('assessRetrievalEvidence flags sparse and weak matches', () => {
  const thin = assessRetrievalEvidence([
    { wing: 'W', room: 'R', drawerId: 'a', excerpt: 'x', similarity: 0.2 },
  ]);
  assert.equal(thin.sparse, true);
  assert.equal(thin.weakMatch, true);
  assert.equal(thin.showBanner, true);

  const strong = assessRetrievalEvidence([
    { wing: 'W', room: 'R', drawerId: 'a', excerpt: 'x', similarity: 0.9 },
    { wing: 'W', room: 'R2', drawerId: 'b', excerpt: 'y', similarity: 0.85 },
    { wing: 'W', room: 'R3', drawerId: 'c', excerpt: 'z', similarity: 0.8 },
  ]);
  assert.equal(strong.sparse, false);
  assert.equal(strong.weakMatch, false);
  assert.equal(strong.showBanner, false);
});
