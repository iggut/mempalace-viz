import assert from 'node:assert/strict';
import test from 'node:test';
import { makeRoomId } from '../canonical.js';
import {
  bridgeRoomIdsAlongPath,
  buildRoomAdjacency,
  canonicalRoomPairFromEdge,
  computeGraphRoute,
  countTypesAlongRoute,
  getRoutingEdgesLikeScene,
  normalizeRouteStepIndex,
  roomIdFromSceneRoomId,
  shortestRoomPath,
  stepRouteIndex,
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

test('getRoutingEdgesLikeScene respects filter', () => {
  const avail = ['taxonomy_adjacency', 'tunnel'];
  const onlyTun = getRoutingEdgesLikeScene(edges, new Set(['tunnel']), avail);
  assert.equal(onlyTun.length, 1);
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
