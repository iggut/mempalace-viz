import test from 'node:test';
import assert from 'node:assert/strict';
import {
  baseLabelScoreForGraphNode,
  buildGraphHighlightNodeIds,
  buildGraphRoomLabelCandidateSet,
  buildGraphRoomNeighborMap,
  chooseNonOverlappingLabels,
  classifyPointerRelease,
  computeDensityMetrics,
  computeGraphFocusCameraDistance,
  graphNodeVisualSize,
  computeVisibleLabelIds,
  countGraphIncidentsByRoomNodeId,
  edgeEmphasisOpacityMult,
  effectiveLabelBudgetForCamera,
  focusNodeDistanceDimMult,
  focusWingIdFromSceneSelection,
  framingTargetOffset,
  graphEdgeHighlightMult,
  graphSceneNodeIdForLayoutNode,
  labelOpacityDistanceFactor,
  labelSpriteScaleMultiplier,
  neighborIdsForFocus,
  normalizeCameraDistanceForLabels,
  hash01,
  maxRadiusFromFocus,
  pointerMoveThresholdPx,
  normalizeLayoutParams,
  separateGraphNodes,
  splitGraphFocusIds,
} from '../graph-scene-helpers.js';

test('computeDensityMetrics tiers and monotonicity', () => {
  const sparse = computeDensityMetrics(10, 8, 3);
  const dense = computeDensityMetrics(100, 280, 20);
  assert.ok(sparse.tier <= dense.tier);
  assert.ok(sparse.labelBudget >= dense.labelBudget);
  assert.ok(sparse.fogDensity <= dense.fogDensity);
  assert.ok(dense.globalEdgeOpacityMult <= 1);
});

test('computeDensityMetrics adds an ultra-dense production tier for huge palaces', () => {
  const dense = computeDensityMetrics(180, 420, 24);
  const huge = computeDensityMetrics(720, 1800, 72);
  assert.equal(huge.tier, 4);
  assert.ok(huge.labelBudget < dense.labelBudget);
  assert.ok(huge.collisionMinDist > dense.collisionMinDist);
  assert.ok(huge.forceIterations > dense.forceIterations);
  assert.ok(huge.globalEdgeOpacityMult < dense.globalEdgeOpacityMult);
});

test('graphNodeVisualSize shrinks dense room glyphs while preserving hubs', () => {
  const sparse = computeDensityMetrics(40, 30, 4);
  const huge = computeDensityMetrics(720, 1800, 72);
  const quietRoom = graphNodeVisualSize({ type: 'room', drawers: 2, incidentFull: 0 }, huge);
  const hubRoom = graphNodeVisualSize({ type: 'room', drawers: 120, incidentFull: 28 }, huge);
  const sparseRoom = graphNodeVisualSize({ type: 'room', drawers: 2, incidentFull: 0 }, sparse);
  assert.ok(quietRoom < sparseRoom);
  assert.ok(hubRoom > quietRoom);
  assert.ok(hubRoom <= 1.35);
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

test('buildGraphHighlightNodeIds includes wing and neighbors', () => {
  const edges = [{ sourceRoomId: 'w/a', targetRoomId: 'w/b', relationshipType: 'tunnel' }];
  const nodeList = [
    { type: 'room', wing: 'w', name: 'a', x: 0, y: 0, z: 0 },
    { type: 'room', wing: 'w', name: 'b', x: 1, y: 0, z: 0 },
  ];
  const m = buildGraphRoomNeighborMap(edges, nodeList, (list, edge, end) => {
    const ref = end === 'from' ? edge.sourceRoomId : edge.targetRoomId;
    return nodeList.find((n) => n.type === 'room' && `${n.wing}/${n.name}` === ref);
  });
  const roomsData = { w: [{ name: 'a' }, { name: 'b' }] };
  const h = buildGraphHighlightNodeIds('room:w:a', m, roomsData);
  assert.ok(h.has('room:w:a'));
  assert.ok(h.has('room:w:b'));
  assert.ok(h.has('wing:w'));
});

test('graphEdgeHighlightMult tiers inside vs outside', () => {
  const ids = new Set(['room:w:a', 'room:w:b']);
  assert.equal(graphEdgeHighlightMult('room:w:a', 'room:w:b', ids, 1), 1);
  assert.ok(graphEdgeHighlightMult('room:w:a', 'room:x:z', ids, 1) < 1);
  assert.ok(graphEdgeHighlightMult('room:x:y', 'room:x:z', ids, 2) < 0.1);
});

test('splitGraphFocusIds secondary hover', () => {
  assert.deepEqual(splitGraphFocusIds('a', 'b'), { primaryId: 'a', secondaryHoverId: 'b' });
  assert.deepEqual(splitGraphFocusIds(null, 'b'), { primaryId: 'b', secondaryHoverId: null });
  assert.deepEqual(splitGraphFocusIds('a', 'a'), { primaryId: 'a', secondaryHoverId: null });
});

test('edgeEmphasisOpacityMult secondary hover preview', () => {
  const primary = edgeEmphasisOpacityMult({
    selectedId: 'sel',
    hoveredId: 'hov',
    fromId: 'sel',
    toId: 'b',
    relationshipType: 'tunnel',
    densityTier: 1,
    isGraphRelationship: true,
  });
  const secondary = edgeEmphasisOpacityMult({
    selectedId: 'sel',
    hoveredId: 'hov',
    fromId: 'hov',
    toId: 'c',
    relationshipType: 'tunnel',
    densityTier: 1,
    isGraphRelationship: true,
  });
  const dim = edgeEmphasisOpacityMult({
    selectedId: 'sel',
    hoveredId: 'hov',
    fromId: 'z',
    toId: 'q',
    relationshipType: 'tunnel',
    densityTier: 1,
    isGraphRelationship: true,
  });
  assert.ok(secondary > dim);
  assert.ok(primary > secondary);
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

test('separateGraphNodes breaks perfectly coincident dense nodes deterministically', () => {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: `n${i}`,
    x: 0,
    y: 0,
    z: 0,
    type: 'room',
    size: 0.72,
  }));
  separateGraphNodes(nodes, 4.4, 24);
  let minDist = Infinity;
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dz = nodes[i].z - nodes[j].z;
      minDist = Math.min(minDist, Math.sqrt(dx * dx + dy * dy + dz * dz));
    }
  }
  assert.ok(minDist > 2.9);
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

test('normalizeCameraDistanceForLabels is clamped', () => {
  assert.equal(normalizeCameraDistanceForLabels(10, 40), 0);
  assert.ok(normalizeCameraDistanceForLabels(120, 40) > 0.5);
  assert.equal(normalizeCameraDistanceForLabels(500, 40), 1);
});

test('effectiveLabelBudgetForCamera drops when zoomed out', () => {
  const b = 130;
  const zoomedIn = effectiveLabelBudgetForCamera(b, 0.95, 2);
  const zoomedOut = effectiveLabelBudgetForCamera(b, 0.08, 2);
  assert.ok(zoomedIn >= zoomedOut);
  assert.ok(zoomedOut >= 8);
});

test('computeVisibleLabelIds promotes neighbors and wing context', () => {
  const entries = [
    { id: 'room:w:a', baseScore: 100 },
    { id: 'room:w:b', baseScore: 120 },
    { id: 'room:x:c', baseScore: 200 },
  ];
  const neighbors = new Set(['room:w:b']);
  const withN = computeVisibleLabelIds(entries, {
    selectedId: 'room:w:a',
    hoveredId: null,
    pinActive: false,
    budget: 130,
    neighborIds: neighbors,
    focusWingId: 'w',
    cameraDistanceNorm: 0.9,
    densityTier: 1,
  });
  assert.ok(withN.has('room:w:a'));
  assert.ok(withN.has('room:w:b'));
});

test('neighborIdsForFocus is immediate edges only', () => {
  const m = new Map([
    ['room:w:a', new Set(['room:w:b'])],
    ['room:w:b', new Set(['room:w:a', 'room:x:c'])],
  ]);
  const n = neighborIdsForFocus('room:w:a', m);
  assert.ok(n.has('room:w:b'));
  assert.equal(n.size, 1);
});

test('buildGraphRoomNeighborMap', () => {
  const nodeList = [
    { type: 'room', wing: 'w1', name: 'a', x: 0, y: 0, z: 0 },
    { type: 'room', wing: 'w1', name: 'b', x: 1, y: 0, z: 0 },
  ];
  const edges = [{ sourceRoomId: 'w1/a', targetRoomId: 'w1/b', relationshipType: 'taxonomy_adjacency' }];
  function findRoomNodeForEdge(list, edge, end) {
    const ref = end === 'from' ? edge.sourceRoomId : edge.targetRoomId;
    return list.find((n) => n.type === 'room' && `${n.wing}/${n.name}` === ref);
  }
  const map = buildGraphRoomNeighborMap(edges, nodeList, findRoomNodeForEdge);
  assert.ok(map.get('room:w1:a').has('room:w1:b'));
});

test('buildGraphRoomLabelCandidateSet prefers connected rooms', () => {
  const metrics = computeDensityMetrics(80, 100, 5);
  const entries = [
    { id: 'room:w:a', baseScore: 10, incidentFull: 0 },
    { id: 'room:w:b', baseScore: 5, incidentFull: 3 },
  ];
  const set = buildGraphRoomLabelCandidateSet(entries, metrics);
  assert.ok(set.has('room:w:b'));
});

test('focusNodeDistanceDimMult is neutral without focus', () => {
  assert.equal(focusNodeDistanceDimMult(500, 2, { focusActive: false }), 1);
});

test('focusNodeDistanceDimMult favors neighbors when focused', () => {
  const far = focusNodeDistanceDimMult(180, 2, { focusActive: true, isNeighbor: false });
  const nearN = focusNodeDistanceDimMult(180, 2, { focusActive: true, isNeighbor: true });
  assert.ok(nearN >= far);
});

test('labelSpriteScaleMultiplier and labelOpacityDistanceFactor', () => {
  assert.ok(labelSpriteScaleMultiplier(0.2, { selected: true }) > labelSpriteScaleMultiplier(0.2, {}));
  assert.ok(labelOpacityDistanceFactor(0.9, { neighbor: true }) >= labelOpacityDistanceFactor(0.2, { neighbor: true }));
});

test('classifyPointerRelease handles click, drag, pan and jitter tolerance', () => {
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 9,
      cameraMovedSq: 0,
      moveThresholdPx: 8,
      cameraMoveEpsSq: 0.001,
      cameraInteractionActive: false,
    }).shouldSelect,
    true,
  );
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 144,
      cameraMovedSq: 0,
      moveThresholdPx: 8,
      cameraMoveEpsSq: 0.001,
      cameraInteractionActive: false,
    }).reason,
    'pointer-drag',
  );
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 4,
      cameraMovedSq: 0.1,
      moveThresholdPx: 8,
      cameraMoveEpsSq: 0.001,
      cameraInteractionActive: false,
    }).reason,
    'camera-drag',
  );
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 4,
      cameraMovedSq: 0,
      moveThresholdPx: 8,
      cameraMoveEpsSq: 0.001,
      cameraInteractionActive: true,
    }).shouldSelect,
    true,
  );
});

test('chooseNonOverlappingLabels keeps highest-priority labels in dense clusters', () => {
  const keep = chooseNonOverlappingLabels([
    { id: 'selected', x: 100, y: 100, w: 60, h: 16, priority: 1000 },
    { id: 'nearby-a', x: 112, y: 102, w: 58, h: 16, priority: 300 },
    { id: 'nearby-b', x: 128, y: 104, w: 58, h: 16, priority: 250 },
    { id: 'far', x: 260, y: 220, w: 58, h: 16, priority: 100 },
  ]);
  assert.ok(keep.has('selected'));
  assert.ok(keep.has('far'));
  assert.ok(!keep.has('nearby-a') || !keep.has('nearby-b'));
});

test('chooseNonOverlappingLabels tie-breaks equal priority by id (stable)', () => {
  const k = chooseNonOverlappingLabels(
    [
      { id: 'z-last', x: 100, y: 100, w: 50, h: 16, priority: 500 },
      { id: 'a-first', x: 104, y: 100, w: 50, h: 16, priority: 500 },
    ],
    6,
  );
  assert.ok(k.has('a-first'));
  assert.ok(!k.has('z-last'));
});

test('chooseNonOverlappingLabels lastKept gives mild continuity preference', () => {
  const last = new Set(['z-last']);
  const k = chooseNonOverlappingLabels(
    [
      { id: 'z-last', x: 100, y: 100, w: 50, h: 16, priority: 500 },
      { id: 'a-first', x: 104, y: 100, w: 50, h: 16, priority: 500 },
    ],
    6,
    { lastKept: last },
  );
  assert.ok(k.has('z-last'));
  assert.ok(!k.has('a-first'));
});

test('pointerMoveThresholdPx by pointer type', () => {
  assert.equal(pointerMoveThresholdPx('touch'), 12);
  assert.equal(pointerMoveThresholdPx('pen'), 10);
  assert.equal(pointerMoveThresholdPx('mouse'), 10);
  assert.equal(pointerMoveThresholdPx(undefined), 10);
});

test('classifyPointerRelease uses pointer type when moveThresholdPx omitted', () => {
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 13 * 13,
      cameraMovedSq: 0,
      pointerType: 'touch',
      cameraInteractionActive: false,
    }).reason,
    'pointer-drag',
  );
  assert.equal(
    classifyPointerRelease({
      maxMoveSq: 8 * 8,
      cameraMovedSq: 0,
      pointerType: 'mouse',
      cameraInteractionActive: false,
    }).shouldSelect,
    true,
  );
});

test('focusWingIdFromSceneSelection', () => {
  assert.equal(focusWingIdFromSceneSelection('room:mywing:rname'), 'mywing');
  assert.equal(focusWingIdFromSceneSelection('wing:projects'), 'projects');
});

test('framingTargetOffset is stable', () => {
  const a = framingTargetOffset(100, 2, 0);
  const b = framingTargetOffset(100, 2, 0);
  assert.equal(a.x, b.x);
  assert.ok(Math.abs(a.y) > 0);
});

test('computeGraphFocusCameraDistance uses neighborCount', () => {
  const base = computeGraphFocusCameraDistance(30, 58, 2);
  const wider = computeGraphFocusCameraDistance(30, 58, 2, { neighborCount: 12 });
  assert.ok(wider >= base);
});
