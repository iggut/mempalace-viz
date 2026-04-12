import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGraphCompletenessHint,
  collectRelationshipTypesFromEdges,
  countEdgesByType,
  describeRoomRelationshipMix,
  filterEdgesByRelationshipTypes,
  formatRelationshipTypeCounts,
  getEdgeRelationshipType,
  getRelationshipTypeMeta,
  getStyleForRelationshipType,
  normalizeVisibleRelationshipTypes,
  parseSavedGraphRelFilters,
  sceneRelationshipFilterArg,
  summarizeVisibleGraphEdges,
} from '../graph-relationships.js';

test('getEdgeRelationshipType defaults and canonical', () => {
  assert.equal(getEdgeRelationshipType({}), 'tunnel');
  assert.equal(getEdgeRelationshipType({ relationshipType: 'taxonomy_adjacency' }), 'taxonomy_adjacency');
});

test('collectRelationshipTypesFromEdges sorts', () => {
  const edges = [
    { relationshipType: 'tunnel' },
    { relationshipType: 'taxonomy_adjacency' },
    { from: 'a', to: 'b' },
  ];
  const types = collectRelationshipTypesFromEdges(edges);
  assert.deepEqual(types, [...types].sort());
  assert.equal(types.length, 2);
  assert.ok(types.includes('tunnel'));
  assert.ok(types.includes('taxonomy_adjacency'));
});

test('normalizeVisibleRelationshipTypes', () => {
  const avail = ['tunnel', 'taxonomy_adjacency'];
  assert.deepEqual([...normalizeVisibleRelationshipTypes(undefined, avail)].sort(), [...avail].sort());
  assert.deepEqual([...normalizeVisibleRelationshipTypes(null, avail)].sort(), [...avail].sort());
  assert.deepEqual([...normalizeVisibleRelationshipTypes([], avail)], []);
  assert.deepEqual([...normalizeVisibleRelationshipTypes(['tunnel'], avail)], ['tunnel']);
  assert.deepEqual([...normalizeVisibleRelationshipTypes(['bogus'], avail)], []);
});

test('sceneRelationshipFilterArg', () => {
  const avail = ['tunnel', 'taxonomy_adjacency'];
  assert.equal(sceneRelationshipFilterArg(new Set(avail), avail), null);
  assert.deepEqual([...sceneRelationshipFilterArg(new Set(), avail)], []);
  assert.deepEqual([...sceneRelationshipFilterArg(new Set(['tunnel']), avail)].sort(), ['tunnel']);
});

test('filterEdgesByRelationshipTypes and summarizeVisibleGraphEdges', () => {
  const edges = [
    { sourceRoomId: 'a', targetRoomId: 'b', relationshipType: 'tunnel' },
    { sourceRoomId: 'a', targetRoomId: 'c', relationshipType: 'taxonomy_adjacency' },
  ];
  const vis = new Set(['tunnel']);
  const f = filterEdgesByRelationshipTypes(edges, vis);
  assert.equal(f.length, 1);
  const sum = summarizeVisibleGraphEdges(edges, vis);
  assert.equal(sum.visibleEdgeCount, 1);
  assert.equal(sum.visibleByType.tunnel, 1);
});

test('countEdgesByType', () => {
  assert.deepEqual(countEdgesByType([{ relationshipType: 'tunnel' }, { relationshipType: 'tunnel' }]), {
    tunnel: 2,
  });
});

test('getRelationshipTypeMeta unknown', () => {
  const m = getRelationshipTypeMeta('future_type');
  assert.equal(m.type, 'unknown');
});

test('getStyleForRelationshipType returns numeric color', () => {
  const t = getStyleForRelationshipType('tunnel');
  assert.equal(typeof t.color, 'number');
  assert.ok(t.opacity > 0 && t.opacity <= 1);
});

test('formatRelationshipTypeCounts', () => {
  const s = formatRelationshipTypeCounts({ tunnel: 2, taxonomy_adjacency: 1 });
  assert.match(s, /tunnel/);
  assert.match(s, /adjacency/);
});

test('describeRoomRelationshipMix', () => {
  const a = describeRoomRelationshipMix({ tunnel: 0, taxonomy_adjacency: 2 }, { tunnel: 3, taxonomy_adjacency: 2 });
  assert.ok(a && a.includes('adjacency'));
  const b = describeRoomRelationshipMix({ tunnel: 2 }, { tunnel: 2, taxonomy_adjacency: 4 });
  assert.ok(b && b.includes('tunnel'));
});

test('parseSavedGraphRelFilters', () => {
  assert.equal(parseSavedGraphRelFilters(null), null);
  assert.deepEqual(parseSavedGraphRelFilters({ enabledTypes: ['tunnel'] }), ['tunnel']);
});

test('buildGraphCompletenessHint includes sources and types', () => {
  const hint = buildGraphCompletenessHint(
    { sources: ['mempalace_find_tunnels'], truncatedSources: [], completenessNotes: [] },
    { byType: { tunnel: 1 } },
  );
  assert.match(hint, /Sources/);
  assert.match(hint, /tunnel/);
});
