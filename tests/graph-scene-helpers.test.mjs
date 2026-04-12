import test from 'node:test';
import assert from 'node:assert/strict';
import {
  baseLabelScoreForGraphNode,
  computeDensityMetrics,
  computeGraphFocusCameraDistance,
  computeVisibleLabelIds,
  countGraphIncidentsByRoomNodeId,
  edgeEmphasisOpacityMult,
  graphSceneNodeIdForLayoutNode,
  hash01,
  maxRadiusFromFocus,
  normalizeLayoutParams,
  separateGraphNodes,
} from '../graph-scene-helpers.js';

test('computeDensityMetrics tiers and monotonicity', () => {
  const sparse = computeDensityMetrics(10, 8, 3);
  const dense = computeDensityMetrics(100, 280, 20);
  assert.ok(sparse.tier <= dense.tier);
  assert.ok(sparse.labelBudget >= dense.labelBudget);
  assert.ok(sparse.fogDensity <= dense.fogDensity);
  assert.ok(dense.globalEdgeOpacityMult <= 1);
});

test('normalizeLayoutParams scales with tier', () => {
  const a = normalizeLayoutParams(computeDensityMetrics(20, 20, 4));
  const b = normalizeLayoutParams(computeDensityMetrics(120, 400, 15));
  assert.ok(b.repelStrength >= a.repelStrength);
  assert.ok(b.iterations >= a.iterations);
});

test('computeVisibleLabelIds prioritizes selection and hover', () => {
  const entries = [
    { id: 'a', baseScore: 10 },
    { id: 'b', baseScore: 900 },
    { id: 'c', baseScore: 50 },
  ];
  const s1 = computeVisibleLabelIds(entries, {
    selectedId: 'a',
    hoveredId: null,
    pinActive: false,
    budget: 2,
  });
  assert.ok(s1.has('a'));
  assert.ok(s1.has('b'));
  const s2 = computeVisibleLabelIds(entries, {
    selectedId: null,
    hoveredId: 'c',
    pinActive: false,
    budget: 2,
  });
  assert.ok(s2.has('c'));
});

test('baseLabelScoreForGraphNode', () => {
  const hi = baseLabelScoreForGraphNode({ type: 'room', incidentFull: 5, drawers: 10 });
  const lo = baseLabelScoreForGraphNode({ type: 'room', incidentFull: 0, drawers: 1 });
  assert.ok(hi > lo);
  assert.ok(baseLabelScoreForGraphNode({ type: 'wing', incidentFull: 0, drawers: 0 }) > lo);
});

test('edgeEmphasisOpacityMult', () => {
  const dim = edgeEmphasisOpacityMult({
    selectedId: 'x',
    hoveredId: null,
    fromId: 'a',
    toId: 'b',
    relationshipType: 'tunnel',
    densityTier: 2,
    isGraphRelationship: true,
  });
  assert.ok(dim < 1);
  const hi = edgeEmphasisOpacityMult({
    selectedId: 'x',
    hoveredId: null,
    fromId: 'x',
    toId: 'b',
    relationshipType: 'tunnel',
    densityTier: 2,
    isGraphRelationship: true,
  });
  assert.ok(hi > dim);
});

test('maxRadiusFromFocus', () => {
  const r = maxRadiusFromFocus(
    { x: 0, y: 0, z: 0 },
    [
      { x: 3, y: 4, z: 0 },
      { x: 0, y: 0, z: 0 },
    ],
  );
  assert.equal(r, 5);
});

test('computeGraphFocusCameraDistance clamps', () => {
  const d = computeGraphFocusCameraDistance(2, 58, 2);
  assert.ok(d >= 16 && d <= 240);
});

test('hash01 deterministic', () => {
  assert.equal(hash01('wing:a'), hash01('wing:a'));
  assert.notEqual(hash01('wing:a'), hash01('wing:b'));
});

test('separateGraphNodes pushes overlaps', () => {
  const nodes = [
    { x: 0, y: 0, z: 0 },
    { x: 0.1, y: 0, z: 0 },
  ];
  separateGraphNodes(nodes, 3, 14);
  const dx = nodes[0].x - nodes[1].x;
  const dist = Math.sqrt(dx * dx);
  assert.ok(dist >= 2.9);
});

test('countGraphIncidentsByRoomNodeId', () => {
  const nodeList = [
    { type: 'room', wing: 'w1', name: 'a', x: 0, y: 0, z: 0 },
    { type: 'room', wing: 'w1', name: 'b', x: 1, y: 0, z: 0 },
  ];
  const edges = [{ sourceRoomId: 'w1/a', targetRoomId: 'w1/b', relationshipType: 'taxonomy_adjacency' }];
  function findRoomNodeForEdge(list, edge, end) {
    const ref = end === 'from' ? edge.sourceRoomId : edge.targetRoomId;
    return list.find((n) => n.type === 'room' && `${n.wing}/${n.name}` === ref);
  }
  const m = countGraphIncidentsByRoomNodeId(nodeList, edges, findRoomNodeForEdge);
  assert.equal(m.get('room:w1:a'), 1);
  assert.equal(m.get('room:w1:b'), 1);
});

test('graphSceneNodeIdForLayoutNode', () => {
  assert.equal(graphSceneNodeIdForLayoutNode({ type: 'wing', name: 'w' }), 'wing:w');
  assert.equal(graphSceneNodeIdForLayoutNode({ type: 'room', wing: 'w', name: 'r' }), 'room:w:r');
});
