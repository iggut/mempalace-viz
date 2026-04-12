import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCanonicalEdgesFromTunnels,
  buildOverviewSummary,
  makeRoomId,
  parseRoomId,
  parseTaxonomyCanonical,
  toLegacyGraphEdges,
} from '../canonical.js';

test('makeRoomId and parseRoomId round-trip with slash in room name', () => {
  const id = makeRoomId('w', 'a/b');
  assert.equal(id.includes('w/'), true);
  const p = parseRoomId(id);
  assert.equal(p.wingId, 'w');
  assert.equal(p.roomName, 'a/b');
});

test('buildCanonicalEdgesFromTunnels emits resolved cross-wing edges', () => {
  const taxonomy = {
    wing_a: { shared: 2 },
    wing_b: { shared: 1 },
  };
  const tunnels = [{ room: 'shared', wings: ['wing_a', 'wing_b'], count: 3 }];
  const { edgesResolved, edgesUnresolved, summary } = buildCanonicalEdgesFromTunnels(tunnels, taxonomy);
  assert.equal(edgesUnresolved.length, 0);
  assert.equal(edgesResolved.length, 1);
  assert.equal(edgesResolved[0].crossWing, true);
  assert.equal(summary.resolvedEdgeCount, 1);
  assert.equal(summary.unresolvedEdgeCount, 0);
  const legacy = toLegacyGraphEdges(edgesResolved);
  assert.equal(legacy[0].from, makeRoomId('wing_a', 'shared'));
  assert.equal(legacy[0].to, makeRoomId('wing_b', 'shared'));
});

test('buildCanonicalEdgesFromTunnels marks missing taxonomy as unresolved', () => {
  const taxonomy = { wing_a: { only_here: 1 } };
  const tunnels = [{ room: 'shared', wings: ['wing_a', 'wing_b'], count: 1 }];
  const { edgesResolved, edgesUnresolved } = buildCanonicalEdgesFromTunnels(tunnels, taxonomy);
  assert.equal(edgesResolved.length, 0);
  assert.equal(edgesUnresolved.length, 1);
  assert.equal(edgesUnresolved[0].reason, 'missing_in_taxonomy');
});

test('parseTaxonomyCanonical attaches roomId and wingId', () => {
  const raw = { taxonomy: { w1: { r1: 5 } } };
  const { roomsData, rooms, wings } = parseTaxonomyCanonical(raw);
  assert.equal(roomsData.w1[0].roomId, 'w1/r1');
  assert.equal(roomsData.w1[0].wingId, 'w1');
  assert.equal(rooms.some((x) => x.roomId === 'w1/r1'), true);
  assert.equal(wings.find((x) => x.wingId === 'w1')?.roomCount, 1);
});

test('buildOverviewSummary aggregates counts', () => {
  const wingsData = { a: 10, b: 5 };
  const rooms = [
    { roomId: 'a/r1', wingId: 'a', name: 'r1', drawerCount: 10 },
    { roomId: 'b/r2', wingId: 'b', name: 'r2', drawerCount: 5 },
  ];
  const edges = [
    {
      edgeId: 'x',
      sourceRoomId: 'a/r1',
      targetRoomId: 'b/r2',
      sourceWingId: 'a',
      targetWingId: 'b',
      crossWing: true,
      weight: 1,
    },
  ];
  const summary = {
    resolvedEdgeCount: 1,
    unresolvedEdgeCount: 0,
    crossWingEdgeCount: 1,
    intraWingEdgeCount: 0,
  };
  const o = buildOverviewSummary(wingsData, rooms, edges, summary, { total_drawers: 15 });
  assert.equal(o.totalDrawers, 15);
  assert.equal(o.totalRooms, 2);
  assert.equal(o.roomsWithNoLinks, 0);
  assert.equal(o.resolvedEdgeCount, 1);
});
