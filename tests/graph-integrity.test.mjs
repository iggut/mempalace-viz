import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePalaceBundle, getPalaceCanonicalEdgesForView, getPalaceLegacyGraphEdgesForView } from '../api.js';
import { computeGraphRoute } from '../graph-route.js';

test('normalizePalaceBundle maps edgesResolved; edgesInferred ignored for graph edges list', () => {
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
  assert.equal(bundle.graphEdges.length, 1);
  assert.equal(bundle.graphEdges[0].relationshipType, 'tunnel');
});

test('getPalaceCanonicalEdgesForView uses edgesResolved only', () => {
  const graph = {
    edgesResolved: [{ sourceRoomId: 'a/x', targetRoomId: 'b/x', relationshipType: 'tunnel' }],
    edgesInferred: [{ sourceRoomId: 'a/y', targetRoomId: 'a/z', relationshipType: 'taxonomy_adjacency' }],
  };
  const merged = getPalaceCanonicalEdgesForView(graph);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].relationshipType, 'tunnel');
});

test('computeGraphRoute uses explicit_mcp_only', () => {
  const roomsData = { w: [{ name: 'a', drawers: 1 }, { name: 'b', drawers: 1 }] };
  const edges = [
    {
      edgeId: 'x',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/b',
      sourceWingId: 'w',
      targetWingId: 'w',
      relationshipType: 'tunnel',
    },
  ];
  const r = computeGraphRoute({
    graphEdges: edges,
    roomsData,
    enabledRelTypes: new Set(['tunnel']),
    availableRelTypes: ['tunnel'],
    startRoomId: 'w/a',
    endRoomId: 'w/b',
  });
  assert.equal(r.ok, true);
  assert.equal(r.routingBasis, 'explicit_mcp_only');
  assert.equal(r.inferredLayerEnabled, false);
});

test('getPalaceLegacyGraphEdgesForView mirrors canonical (resolved only)', () => {
  const graph = {
    edgesResolved: [{ sourceRoomId: 'a/x', targetRoomId: 'b/x', relationshipType: 'tunnel' }],
    edgesInferred: [{ sourceRoomId: 'a/y', targetRoomId: 'a/z', relationshipType: 'taxonomy_adjacency' }],
  };
  const leg = getPalaceLegacyGraphEdgesForView(graph);
  assert.equal(leg.length, 1);
});
