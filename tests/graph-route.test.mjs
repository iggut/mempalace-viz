import assert from 'node:assert/strict';
import test from 'node:test';
import { makeRoomId } from '../canonical.js';
import {
  bridgeRoomIdsAlongPath,
  buildMinCostAdjacencyForMode,
  buildRouteComparisonNote,
  buildRoomAdjacency,
  canonicalRoomPairFromEdge,
  computeGraphRoute,
  countTypesAlongRoute,
  dijkstraRoomPath,
  edgeCostForRelationshipType,
  getRoutingEdgesLikeScene,
  normalizeRouteMode,
  normalizeRouteStepIndex,
  pathsEqualRoomIds,
  roomIdFromSceneRoomId,
  shortestRoomPath,
  stepRouteIndex,
  summarizeRouteEdgeMix,
  tunnelOnlyPathExists,
} from '../graph-route.js';

const roomsData = {
  w1: [{ name: 'a', drawers: 1 }, { name: 'b', drawers: 1 }],
  w2: [{ name: 'a', drawers: 1 }, { name: 'c', drawers: 1 }],
};

const A = makeRoomId('w1', 'a');
const B = makeRoomId('w1', 'b');
const C = makeRoomId('w2', 'c');

const edges = [
  {
    edgeId: 'e1',
    sourceRoomId: A,
    targetRoomId: B,
    sourceWingId: 'w1',
    targetWingId: 'w1',
    relationshipType: 'taxonomy_adjacency',
  },
  {
    edgeId: 'e2',
    sourceRoomId: B,
    targetRoomId: C,
    sourceWingId: 'w1',
    targetWingId: 'w2',
    crossWing: true,
    relationshipType: 'tunnel',
  },
];

test('canonicalRoomPairFromEdge uses resolved ids', () => {
  const p = canonicalRoomPairFromEdge(edges[0], roomsData);
  assert.equal(p.a, A);
  assert.equal(p.b, B);
});

test('shortestRoomPath is deterministic fewest-hop', () => {
  const adj = buildRoomAdjacency(edges, roomsData);
  const sp = shortestRoomPath(adj, A, C);
  assert(sp);
  assert.deepEqual(sp.pathRoomIds, [A, B, C]);
  assert.equal(sp.segmentTypes.length, 2);
});

test('shortestRoomPath returns null when disconnected', () => {
  const adj = buildRoomAdjacency(edges, roomsData);
  assert.equal(shortestRoomPath(adj, A, makeRoomId('w2', 'a')), null);
});

test('computeGraphRoute handles no_path', () => {
  const r = computeGraphRoute({
    graphEdges: edges,
    roomsData,
    enabledRelTypes: new Set(['taxonomy_adjacency']),
    availableRelTypes: ['taxonomy_adjacency', 'tunnel'],
    startRoomId: A,
    endRoomId: C,
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'no_path');
});

test('computeGraphRoute includes routeMode and comparison for shortest', () => {
  const r = computeGraphRoute({
    graphEdges: edges,
    roomsData,
    enabledRelTypes: new Set(['taxonomy_adjacency', 'tunnel']),
    availableRelTypes: ['taxonomy_adjacency', 'tunnel'],
    startRoomId: A,
    endRoomId: C,
    routeMode: 'shortest',
  });
  assert.equal(r.ok, true);
  assert.equal(r.routeMode, 'shortest');
  assert.equal(r.referenceShortestHops, r.hops);
  assert.equal(r.differsFromShortest, false);
  assert.ok(String(r.comparisonNote || '').includes('Fewest-hop'));
});

test('getRoutingEdgesLikeScene respects filter', () => {
  const avail = ['taxonomy_adjacency', 'tunnel'];
  const onlyTun = getRoutingEdgesLikeScene(edges, new Set(['tunnel']), avail);
  assert.equal(onlyTun.length, 1);
});

test('normalizeRouteMode and edgeCostForRelationshipType', () => {
  assert.equal(normalizeRouteMode('bad'), 'shortest');
  assert.equal(normalizeRouteMode('tunnel_preferred'), 'tunnel_preferred');
  assert.equal(edgeCostForRelationshipType('tunnel', 'shortest'), 1);
  assert.ok(edgeCostForRelationshipType('taxonomy_adjacency', 'tunnel_preferred') > edgeCostForRelationshipType('tunnel', 'tunnel_preferred'));
});

test('normalizeRouteStepIndex and stepRouteIndex', () => {
  assert.equal(normalizeRouteStepIndex(99, 3), 2);
  assert.equal(stepRouteIndex(0, 1, 3), 1);
  assert.equal(stepRouteIndex(2, 1, 3), 0);
});

test('roomIdFromSceneRoomId', () => {
  assert.equal(roomIdFromSceneRoomId('room:w1:a'), A);
  assert.equal(roomIdFromSceneRoomId('wing:w1'), null);
});

test('bridgeRoomIdsAlongPath', () => {
  const ids = bridgeRoomIdsAlongPath([A, B, C]);
  assert.ok(ids.includes(B));
});

test('countTypesAlongRoute', () => {
  const c = countTypesAlongRoute(['tunnel', 'tunnel', 'taxonomy_adjacency']);
  assert.equal(c.tunnel, 2);
  assert.equal(c.taxonomy_adjacency, 1);
});

test('summarizeRouteEdgeMix', () => {
  assert.ok(summarizeRouteEdgeMix(['tunnel', 'taxonomy_adjacency']).includes('tunnel'));
});

test('pathsEqualRoomIds', () => {
  assert.equal(pathsEqualRoomIds([A, B], [A, B]), true);
  assert.equal(pathsEqualRoomIds([A, B], [A, C]), false);
});

test('tunnel-preferred can differ from fewest-hop on weighted tradeoff', () => {
  const richRooms = {
    w1: [
      { name: 'a', drawers: 1 },
      { name: 'x', drawers: 1 },
      { name: 'y', drawers: 1 },
      { name: 'b', drawers: 1 },
      { name: 'z', drawers: 1 },
    ],
  };
  const ra = makeRoomId('w1', 'a');
  const rx = makeRoomId('w1', 'x');
  const ry = makeRoomId('w1', 'y');
  const rb = makeRoomId('w1', 'b');
  const rz = makeRoomId('w1', 'z');
  const richEdges = [
    { edgeId: 'p1', sourceRoomId: ra, targetRoomId: rx, relationshipType: 'tunnel' },
    { edgeId: 'p2', sourceRoomId: rx, targetRoomId: ry, relationshipType: 'tunnel' },
    { edgeId: 'p3', sourceRoomId: ry, targetRoomId: rb, relationshipType: 'tunnel' },
    { edgeId: 'p4', sourceRoomId: ra, targetRoomId: rz, relationshipType: 'taxonomy_adjacency' },
    { edgeId: 'p5', sourceRoomId: rz, targetRoomId: rb, relationshipType: 'tunnel' },
  ];
  const shortest = computeGraphRoute({
    graphEdges: richEdges,
    roomsData: richRooms,
    enabledRelTypes: new Set(['tunnel', 'taxonomy_adjacency']),
    availableRelTypes: ['tunnel', 'taxonomy_adjacency'],
    startRoomId: ra,
    endRoomId: rb,
    routeMode: 'shortest',
  });
  const tunPref = computeGraphRoute({
    graphEdges: richEdges,
    roomsData: richRooms,
    enabledRelTypes: new Set(['tunnel', 'taxonomy_adjacency']),
    availableRelTypes: ['tunnel', 'taxonomy_adjacency'],
    startRoomId: ra,
    endRoomId: rb,
    routeMode: 'tunnel_preferred',
  });
  assert.equal(shortest.ok, true);
  assert.equal(tunPref.ok, true);
  assert.deepEqual(shortest.pathRoomIds, [ra, rz, rb]);
  assert.deepEqual(tunPref.pathRoomIds, [ra, rx, ry, rb]);
  assert.equal(tunPref.differsFromShortest, true);
  assert.ok(tunPref.totalCost != null && tunPref.totalCost < 20);
});

test('dijkstra deterministic tie-break prefers smaller predecessor id when cost and hops tie', () => {
  const rdata = {
    w1: [
      { name: 'a', drawers: 1 },
      { name: 'b', drawers: 1 },
      { name: 'c', drawers: 1 },
      { name: 'd', drawers: 1 },
    ],
  };
  const ra = makeRoomId('w1', 'a');
  const rb = makeRoomId('w1', 'b');
  const rc = makeRoomId('w1', 'c');
  const rd = makeRoomId('w1', 'd');
  const diamondEdges = [
    { edgeId: 'd1', sourceRoomId: ra, targetRoomId: rb, relationshipType: 'tunnel' },
    { edgeId: 'd2', sourceRoomId: rb, targetRoomId: rd, relationshipType: 'tunnel' },
    { edgeId: 'd3', sourceRoomId: ra, targetRoomId: rc, relationshipType: 'tunnel' },
    { edgeId: 'd4', sourceRoomId: rc, targetRoomId: rd, relationshipType: 'tunnel' },
  ];
  const adj = buildMinCostAdjacencyForMode(diamondEdges, rdata, 'tunnel_preferred');
  const p = dijkstraRoomPath(adj, ra, rd);
  assert(p);
  assert.deepEqual(p.pathRoomIds, [ra, rb, rd]);
});

test('tunnelOnlyPathExists is false when no tunnel edges', () => {
  const onlyAdj = [
    { edgeId: 'o1', sourceRoomId: A, targetRoomId: B, relationshipType: 'taxonomy_adjacency' },
  ];
  assert.equal(tunnelOnlyPathExists(onlyAdj, roomsData, A, B), false);
});

test('buildRouteComparisonNote when paths match', () => {
  const note = buildRouteComparisonNote(
    'balanced',
    { pathRoomIds: [A, B] },
    { pathRoomIds: [A, B] },
    { tunnelOnlyPossible: true, segmentTypes: ['tunnel'] },
  );
  assert.ok(note && note.includes('Same path'));
});
