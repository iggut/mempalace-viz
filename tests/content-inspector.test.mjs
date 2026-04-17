import assert from 'node:assert/strict';
import test from 'node:test';
import {
  normalizeGetDrawerPayload,
  normalizeListDrawersPayload,
} from '../content-inspector.js';

test('normalizeListDrawersPayload maps drawers and hasMore when page is full', () => {
  const n = normalizeListDrawersPayload({
    drawers: [
      { drawer_id: 'a1', wing: 'w', room: 'r', content_preview: 'hello' },
      { drawer_id: 'a2', wing: 'w', room: 'r', content_preview: 'x'.repeat(200) },
    ],
    count: 2,
    limit: 2,
    offset: 0,
  });
  assert.equal(n.items.length, 2);
  assert.equal(n.items[0].id, 'a1');
  assert.equal(n.hasMore, true);
  assert.equal(n.offset, 0);
});

test('normalizeListDrawersPayload hasMore false when short page', () => {
  const n = normalizeListDrawersPayload({
    drawers: [{ drawer_id: 'z', wing: 'w', room: 'r', content_preview: 'one' }],
    count: 1,
    limit: 12,
    offset: 0,
  });
  assert.equal(n.hasMore, false);
});

test('normalizeListDrawersPayload surfaces upstream error', () => {
  const n = normalizeListDrawersPayload({ error: 'no palace' });
  assert.ok(n.error?.includes('no palace'));
  assert.equal(n.items.length, 0);
});

test('normalizeGetDrawerPayload returns content and metadata', () => {
  const n = normalizeGetDrawerPayload({
    drawer_id: 'd1',
    content: 'Body text',
    wing: 'projects',
    room: 'notes',
    metadata: { source_file: 'a.md', wing: 'projects' },
  });
  assert.equal(n.content, 'Body text');
  assert.equal(n.wing, 'projects');
  assert.equal(n.metadata?.source_file, 'a.md');
});

test('normalizeGetDrawerPayload maps error field', () => {
  const n = normalizeGetDrawerPayload({ error: 'missing' });
  assert.equal(n.error, 'missing');
});
