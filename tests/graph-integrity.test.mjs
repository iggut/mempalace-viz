import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePalaceBundle, getPalaceCanonicalEdgesForView, getPalaceLegacyGraphEdgesForView } from '../api.js';
import { computeGraphRoute } from '../graph-route.js';

test('normalizePalaceBundle exposes edgesInferred separately from edgesResolved', () => {
  const bundle = normalizePalaceBundle({
    status: {},
    wingsRaw: {},
    taxonomyRaw: { taxonomy: {} },
    graphStats: {
      edgesResolved: [
        {
          edgeId: 't1',
          sourceRoomId: 'w/a',
          targetRoomId: 'w2/a',
          sourceWingId: 'w',
          targetWingId: 'w2',
          crossWing: true,
          relationshipType: 'tunnel',
        },
      ],
      edgesInferred: [
        {
          edgeId: 'i1',
          sourceRoomId: 'w/a',
          targetRoomId: 'w/b',
          sourceWingId: 'w',
          targetWingId: 'w',
          relationshipType: 'taxonomy_adjacency',
        },
      ],
      edgesUnresolved: [],
      summary: { resolvedEdgeCount: 1, byType: { tunnel: 1 } },
    },
    kgResult: null,
    overviewBundle: null,
  });
  assert.equal(bundle.graph.edgesResolved.length, 1);
  assert.equal(bundle.graph.edgesInferred.length, 1);
  assert.equal(bundle.graph.edgesResolved[0].relationshipType, 'tunnel');
  assert.equal(bundle.graph.edgesInferred[0].relationshipType, 'taxonomy_adjacency');
  assert.equal(bundle.graphEdges.length, 1);
  assert.equal(bundle.graphEdges[0].relationshipType, 'tunnel');
});

test('getPalaceCanonicalEdgesForView explicit-only mode never merges inferred edges', () => {
  const graph = {
    edgesResolved: [{ sourceRoomId: 'a/x', targetRoomId: 'b/x', relationshipType: 'tunnel' }],
    edgesInferred: [{ sourceRoomId: 'a/y', targetRoomId: 'a/z', relationshipType: 'taxonomy_adjacency' }],
  };
  const merged = getPalaceCanonicalEdgesForView(graph, false);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].relationshipType, 'tunnel');
});

test('getPalaceCanonicalEdgesForView merges when inferred layer opt-in is true', () => {
  const graph = {
    edgesResolved: [{ sourceRoomId: 'a/x', targetRoomId: 'b/x', relationshipType: 'tunnel' }],
    edgesInferred: [{ sourceRoomId: 'a/y', targetRoomId: 'a/z', relationshipType: 'taxonomy_adjacency' }],
  };
  const merged = getPalaceCanonicalEdgesForView(graph, true);
  assert.equal(merged.length, 2);
});

test('computeGraphRoute explicit-only mode labels routingBasis and no_path copy', () => {
  const roomsData = { w: [{ name: 'a', drawers: 1 }, { name: 'b', drawers: 1 }] };
  const edges = [
    {
      edgeId: 'x',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/b',
      sourceWingId: 'w',
      targetWingId: 'w',
      relationshipType: 'taxonomy_adjacency',
    },
  ];
  const r = computeGraphRoute({
    graphEdges: edges,
    roomsData,
    enabledRelTypes: new Set(['taxonomy_adjacency']),
    availableRelTypes: ['taxonomy_adjacency'],
    startRoomId: 'w/a',
    endRoomId: 'w/b',
    inferredLayerEnabled: false,
  });
  assert.equal(r.ok, true);
  assert.equal(r.routingBasis, 'explicit_mcp_only');
  assert.equal(r.inferredLayerEnabled, false);
  assert.equal(r.usesInferredSegments, true);
});

test('route summary flags inferred-assisted when path uses taxonomy_adjacency segments', () => {
  const roomsData = { w: [{ name: 'a', drawers: 1 }, { name: 'b', drawers: 1 }] };
  const edges = [
    {
      edgeId: 'x',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/b',
      sourceWingId: 'w',
      targetWingId: 'w',
      relationshipType: 'taxonomy_adjacency',
    },
  ];
  const r = computeGraphRoute({
    graphEdges: edges,
    roomsData,
    enabledRelTypes: new Set(['taxonomy_adjacency']),
    availableRelTypes: ['taxonomy_adjacency'],
    startRoomId: 'w/a',
    endRoomId: 'w/b',
    inferredLayerEnabled: true,
  });
  assert.equal(r.ok, true);
  assert.equal(r.routingBasis, 'explicit_plus_inferred');
  assert.equal(r.usesInferredSegments, true);
});

test('getPalaceLegacyGraphEdgesForView mirrors canonical merge rule', () => {
  const graph = {
    edgesResolved: [{ sourceRoomId: 'a/x', targetRoomId: 'b/x', relationshipType: 'tunnel' }],
    edgesInferred: [{ sourceRoomId: 'a/y', targetRoomId: 'a/z', relationshipType: 'taxonomy_adjacency' }],
  };
  const leg = getPalaceLegacyGraphEdgesForView(graph, false);
  assert.equal(leg.length, 1);
  const leg2 = getPalaceLegacyGraphEdgesForView(graph, true);
  assert.equal(leg2.length, 2);
});
