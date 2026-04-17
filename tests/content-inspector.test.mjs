import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applyDrawerListView,
  drawerCardHeadline,
  normalizeGetDrawerPayload,
  normalizeListDrawersPayload,
  storedListPageSummary,
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

test('applyDrawerListView filters by substring and preserves server order', () => {
  const items = [
    { id: 'b', wing: 'w', room: 'r1', preview: 'beta' },
    { id: 'a', wing: 'w', room: 'r2', preview: 'alpha' },
  ];
  const v = applyDrawerListView(items, 'alp', 'server');
  assert.equal(v.matched, 1);
  assert.equal(v.items[0].id, 'a');
});

test('applyDrawerListView sorts by id', () => {
  const items = [
    { id: 'z', wing: 'w', room: 'r', preview: 'z' },
    { id: 'a', wing: 'w', room: 'r', preview: 'a' },
  ];
  const asc = applyDrawerListView(items, '', 'id-asc');
  assert.deepEqual(asc.items.map((x) => x.id), ['a', 'z']);
  const desc = applyDrawerListView(items, '', 'id-desc');
  assert.deepEqual(desc.items.map((x) => x.id), ['z', 'a']);
});

test('drawerCardHeadline uses first preview line', () => {
  assert.equal(drawerCardHeadline('id', 'Hello\nWorld'), 'Hello');
});

test('storedListPageSummary describes slice position without claiming totals', () => {
  assert.equal(
    storedListPageSummary(0, 12, 12, false, true),
    'Storage page 1 · rows 1–12 · up to 12 per fetch · more in storage (Older →)',
  );
  assert.equal(
    storedListPageSummary(12, 12, 5, true, false),
    'Storage page 2 · rows 13–17 · up to 12 per fetch · last page in this list',
  );
  assert.equal(
    storedListPageSummary(0, 10, 3, false, false),
    'Storage page 1 · rows 1–3 · up to 10 per fetch · all rows on one page',
  );
});
