import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildGraphAnalytics,
  computeRoomIncidentSummary,
  computeWingEdgeTypeSummary,
  countEdgesWithUnresolvedEndpoints,
  formatPct,
  ordinal,
  resolveTunnelEndpoint,
} from '../insights.js';

test('resolveTunnelEndpoint parses wing/room and resolves duplicate room with hint', () => {
  const rooms = {
    a: [{ name: 'r1', drawers: 1 }],
    b: [{ name: 'r1', drawers: 2 }],
  };
  assert.equal(resolveTunnelEndpoint('a/r1', rooms, null)?.wing, 'a');
  assert.equal(resolveTunnelEndpoint('r1', rooms, 'b')?.wing, 'b');
  assert.equal(resolveTunnelEndpoint('r1', rooms, null)?.wing, 'a');
});

test('countEdgesWithUnresolvedEndpoints counts bad endpoints', () => {
  const rooms = { w: [{ name: 'x', drawers: 1 }] };
  const edges = [
    { from: 'w/x', to: 'nope' },
    { from: 'w/x', to: 'w/x' },
  ];
  assert.equal(countEdgesWithUnresolvedEndpoints(edges, rooms), 1);
});

test('countEdgesWithUnresolvedEndpoints prefers API unresolved count', () => {
  const rooms = {};
  const edges = [{ from: 'a', to: 'b' }];
  assert.equal(countEdgesWithUnresolvedEndpoints(edges, rooms, 7), 7);
});

test('buildGraphAnalytics exposes byRelationshipType from graph summary', () => {
  const roomsData = { w: [{ name: 'a', drawers: 1, roomId: 'w/a', wingId: 'w' }] };
  const ga = buildGraphAnalytics(roomsData, {
    edgesResolved: [
      {
        sourceRoomId: 'w/a',
        targetRoomId: 'w/b',
        sourceWingId: 'w',
        targetWingId: 'w',
        relationshipType: 'taxonomy_adjacency',
      },
    ],
    graphSummary: {
      resolvedEdgeCount: 1,
      crossWingEdgeCount: 0,
      intraWingEdgeCount: 1,
      byType: { taxonomy_adjacency: 1 },
    },
  });
  assert.equal(ga.byRelationshipType.taxonomy_adjacency, 1);
});

test('buildGraphAnalytics uses canonical edgesResolved without legacy resolution', () => {
  const roomsData = {
    w1: [{ name: 'a', drawers: 1, roomId: 'w1/a', wingId: 'w1' }],
    w2: [{ name: 'b', drawers: 1, roomId: 'w2/b', wingId: 'w2' }],
  };
  const edgesResolved = [
    {
      sourceRoomId: 'w1/a',
      targetRoomId: 'w2/b',
      sourceWingId: 'w1',
      targetWingId: 'w2',
    },
  ];
  const ga = buildGraphAnalytics(roomsData, {
    edgesResolved,
    graphSummary: { resolvedEdgeCount: 1, crossWingEdgeCount: 1, intraWingEdgeCount: 0 },
  });
  assert.equal(ga.hasResolvableEdges, true);
  assert.equal(ga.crossWingEdgeCount, 1);
  assert.equal(ga.degreeByKey.get('w1/a'), 1);
  assert.equal(ga.degreeByKey.get('w2/b'), 1);
});

test('buildGraphAnalytics legacy path when edgesResolved empty', () => {
  const roomsData = {
    w: [{ name: 'x', drawers: 1 }],
  };
  const graphEdges = [{ from: 'nope/a', to: 'nope/b', wing: 'w' }];
  const ga = buildGraphAnalytics(roomsData, { graphEdges });
  assert.equal(ga.hasResolvableEdges, false);
});

test('formatPct and ordinal', () => {
  assert.equal(formatPct(1, 4), '25.0');
  assert.equal(formatPct(1, 0), null);
  assert.equal(ordinal(11), '11th');
  assert.equal(ordinal(3), '3rd');
});

test('computeRoomIncidentSummary counts by type and cross-wing', () => {
  const edges = [
    {
      sourceRoomId: 'w/a',
      targetRoomId: 'w2/b',
      sourceWingId: 'w',
      targetWingId: 'w2',
      relationshipType: 'tunnel',
    },
    {
      sourceRoomId: 'w/a',
      targetRoomId: 'w/c',
      sourceWingId: 'w',
      targetWingId: 'w',
      relationshipType: 'taxonomy_adjacency',
    },
  ];
  const s = computeRoomIncidentSummary('w/a', edges);
  assert.equal(s.degree, 2);
  assert.equal(s.crossWingLinks, 1);
  assert.equal(s.intraWingLinks, 1);
  assert.equal(s.byType.tunnel, 1);
  assert.equal(s.byType.taxonomy_adjacency, 1);
});

test('computeWingEdgeTypeSummary aggregates edges touching wing', () => {
  const edges = [
    {
      sourceRoomId: 'w/a',
      targetRoomId: 'w2/b',
      sourceWingId: 'w',
      targetWingId: 'w2',
      relationshipType: 'tunnel',
    },
  ];
  const s = computeWingEdgeTypeSummary('w', edges);
  assert.equal(s.byType.tunnel, 1);
  assert.equal(s.crossWingTouches, 1);
});
