import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSearchCatalog,
  formatSublabel,
  normalizeSearchQuery,
  rankGraphSearch,
  scoreCatalogEntry,
  scoreMatch,
  stepWrapped,
} from '../graph-search.js';

test('normalizeSearchQuery', () => {
  assert.equal(normalizeSearchQuery('  Foo '), 'foo');
  assert.equal(normalizeSearchQuery(''), '');
});

test('scoreMatch ranks exact and prefix above substring', () => {
  assert.ok(scoreMatch('ab', 'ab') > scoreMatch('ab', 'cab'));
  assert.ok(scoreMatch('pre', 'prefix') > scoreMatch('pre', 'imprecise'));
});

test('scoreCatalogEntry prefers room name when both match', () => {
  const catalog = buildSearchCatalog(
    { w: [{ name: 'kitchen' }] },
    { w: 1 },
  );
  const room = catalog.find((c) => c.kind === 'room');
  assert.ok(room);
  const q = normalizeSearchQuery('kitchen');
  assert.ok(scoreCatalogEntry(room, q) >= 8000);
});

test('rankGraphSearch partial and ordering', () => {
  const catalog = buildSearchCatalog(
    {
      alpha: [{ name: 'notes' }, { name: 'projector' }],
      beta: [{ name: 'notes' }],
    },
    { alpha: 10, beta: 5 },
  );
  const r = rankGraphSearch(catalog, 'note');
  assert.ok(r.length >= 2);
  const top = r[0];
  assert.ok(top.label.toLowerCase().includes('note') || top.wingId?.includes('note'));
});

test('formatSublabel', () => {
  const catalog = buildSearchCatalog({ w: [{ name: 'r1' }] }, { w: 1 });
  const wing = catalog.find((c) => c.kind === 'wing');
  const room = catalog.find((c) => c.kind === 'room');
  assert.equal(formatSublabel(wing), 'Wing');
  assert.equal(formatSublabel(room), 'Room · w');
});

test('stepWrapped', () => {
  assert.equal(stepWrapped(0, 3, 1), 1);
  assert.equal(stepWrapped(2, 3, 1), 0);
  assert.equal(stepWrapped(0, 3, -1), 2);
});

test('rankGraphSearch dedupes by sceneId', () => {
  const catalog = buildSearchCatalog({ x: [{ name: 'a' }] }, { x: 1 });
  const r = rankGraphSearch(catalog, 'x');
  const ids = new Set(r.map((h) => h.sceneId));
  assert.equal(ids.size, r.length);
});
