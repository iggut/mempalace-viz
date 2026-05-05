import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCanonicalEdgesFromTunnels,
  buildEnrichedGraphFromTaxonomyAndTunnels,
  buildOverviewSummary,
  LEGACY_MCP_TUNNEL_ROW_CAP,
  makeRoomId,
  parseRoomId,
  parseTaxonomyCanonical,
  parseTunnelDiscoveryResult,
  sceneRoomNodeIdFromRoomId,
  toLegacyGraphEdges,
} from '../canonical.js';

test('makeRoomId and parseRoomId round-trip with slash in room name', () => {
  const id = makeRoomId('w', 'a/b');
  assert.equal(id.includes('w/'), true);
  const p = parseRoomId(id);
  assert.equal(p.wingId, 'w');
  assert.equal(p.roomName, 'a/b');
});

test('sceneRoomNodeIdFromRoomId maps canonical id to scene registry id', () => {
  assert.equal(sceneRoomNodeIdFromRoomId('wing1/roomX'), 'room:wing1:roomX');
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
  assert.equal(edgesResolved[0].relationshipType, 'tunnel');
  assert.equal(summary.resolvedEdgeCount, 1);
  assert.equal(summary.unresolvedEdgeCount, 0);
  assert.equal(summary.byType.tunnel, 1);
  const legacy = toLegacyGraphEdges(edgesResolved);
  assert.equal(legacy[0].from, makeRoomId('wing_a', 'shared'));
  assert.equal(legacy[0].to, makeRoomId('wing_b', 'shared'));
});

test('buildCanonicalEdgesFromTunnels copies halls and recent into edge metadata', () => {
  const taxonomy = {
    wing_a: { shared: 2 },
    wing_b: { shared: 1 },
  };
  const tunnels = [
    {
      room: 'shared',
      wings: ['wing_a', 'wing_b'],
      count: 4,
      halls: ['north'],
      recent: '2026-04-01',
    },
  ];
  const { edgesResolved } = buildCanonicalEdgesFromTunnels(tunnels, taxonomy);
  assert.equal(edgesResolved.length, 1);
  const m = edgesResolved[0].metadata || {};
  assert.deepEqual(m.halls, ['north']);
  assert.equal(m.recent, '2026-04-01');
  assert.equal(m.drawerCountInTunnelRoom, 4);
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

test('parseTunnelDiscoveryResult accepts legacy array or envelope', () => {
  const a = parseTunnelDiscoveryResult([{ room: 'x', wings: ['a', 'b'] }]);
  assert.equal(a.tunnels.length, 1);
  assert.equal(a.truncated, false);
  assert.equal(a.totalMatching, 1);
  const b = parseTunnelDiscoveryResult({
    tunnels: [{ room: 'y', wings: ['a', 'b'] }],
    truncated: true,
    limit: 50,
    total_matching: 99,
  });
  assert.equal(b.truncated, true);
  assert.equal(b.totalMatching, 99);
});

test('parseTunnelDiscoveryResult infers possible MCP cap when array length is 50', () => {
  const rows = Array.from({ length: LEGACY_MCP_TUNNEL_ROW_CAP }, (_, i) => ({
    room: `r${i}`,
    wings: ['w1', 'w2'],
  }));
  const p = parseTunnelDiscoveryResult(rows);
  assert.equal(p.truncated, true);
  assert.equal(p.limit, LEGACY_MCP_TUNNEL_ROW_CAP);
  assert.equal(p.totalMatching, null);
  assert.equal(p.truncationHeuristic, 'legacy_mcp_row_cap');
});

test('buildEnrichedGraphFromTaxonomyAndTunnels exposes tunnels only (no inferred adjacency)', () => {
  const taxonomyRaw = {
    taxonomy: {
      wing_a: { shared: 1, z: 1 },
      wing_b: { shared: 1 },
    },
  };
  const tunnels = [{ room: 'shared', wings: ['wing_a', 'wing_b'], count: 2 }];
  const g = buildEnrichedGraphFromTaxonomyAndTunnels(taxonomyRaw, tunnels);
  assert.ok(g.summary.byType.tunnel >= 1);
  assert.equal(g.summary.byType.taxonomy_adjacency, undefined);
  assert.equal(g.summaryInferred.resolvedEdgeCount, 0);
  assert.ok(g.edgesResolved.length >= 1);
  assert.equal(g.edgesInferred.length, 0);
  assert.ok(g.graphMeta.sources.includes('mempalace_find_tunnels'));
  assert.equal(g.graphMeta.inferredLayer, undefined);
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
