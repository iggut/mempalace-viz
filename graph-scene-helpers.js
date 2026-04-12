/**
 * Pure helpers for MemPalace 3D graph view: layout tuning, density metrics,
 * label prioritization, edge emphasis, and camera framing math.
 */

/** @typedef {{ tier: number, nodeCount: number, edgeCount: number, wingCount: number, edgeDensity: number, labelBudget: number, fogDensity: number, adjacencyOpacityMult: number, globalEdgeOpacityMult: number, tunnelEmphasisMult: number, repelScale: number, attractScale: number, centerScale: number, wingCohesion: number, depthJitter: number, collisionMinDist: number, forceIterations: number }} GraphDensityMetrics */

/**
 * @param {number} nodeCount
 * @param {number} edgeCount
 * @param {number} wingCount
 * @returns {GraphDensityMetrics}
 */
export function computeDensityMetrics(nodeCount, edgeCount, wingCount) {
  const n = Math.max(1, nodeCount);
  const e = Math.max(0, edgeCount);
  const w = Math.max(1, wingCount);
  const edgeDensity = e / n;

  let tier = 0;
  if (n > 90 || edgeDensity > 2.8) tier = 3;
  else if (n > 48 || edgeDensity > 1.75) tier = 2;
  else if (n > 24 || edgeDensity > 1.05) tier = 1;

  const labelBudget = tier >= 3 ? 85 : tier >= 2 ? 130 : tier >= 1 ? 175 : 235;
  const fogDensity = 0.00155 + tier * 0.00042;
  const adjacencyOpacityMult = tier >= 2 ? 0.68 : tier >= 1 ? 0.82 : 1;
  const globalEdgeOpacityMult = tier >= 3 ? 0.74 : tier >= 2 ? 0.86 : 1;
  const tunnelEmphasisMult = tier >= 2 ? 1.08 : 1;

  const repelScale = 1 + tier * 0.22;
  const attractScale = 1 - tier * 0.04;
  const centerScale = 1 + tier * 0.12;
  const wingCohesion = 0.004 + tier * 0.0025;
  const depthJitter = 4 + tier * 5;
  const collisionMinDist = 2.1 + tier * 0.55;
  const forceIterations = 48 + tier * 14;

  return {
    tier,
    nodeCount: n,
    edgeCount: e,
    wingCount: w,
    edgeDensity,
    labelBudget,
    fogDensity,
    adjacencyOpacityMult,
    globalEdgeOpacityMult,
    tunnelEmphasisMult,
    repelScale,
    attractScale,
    centerScale,
    wingCohesion,
    depthJitter,
    collisionMinDist,
    forceIterations,
  };
}

/**
 * @param {GraphDensityMetrics} m
 * @returns {{ repelStrength: number, attractStrength: number, centerStrength: number, wingCohesion: number, iterations: number }}
 */
export function normalizeLayoutParams(m) {
  return {
    repelStrength: 88 * m.repelScale,
    attractStrength: 0.0115 * m.attractScale,
    centerStrength: 0.0052 * m.centerScale,
    wingCohesion: m.wingCohesion,
    iterations: m.forceIterations,
  };
}

/**
 * Deterministic hash for stable jitter per key.
 * @param {string} s
 * @returns {number} in [0, 1)
 */
export function hash01(s) {
  let h = 2166136261;
  const str = String(s || '');
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

/**
 * Seed 3D positions: wing nodes on a horizontal ring with vertical spread;
 * room nodes in clusters around their wing centers with depth variation.
 * Mutates `nodeList` items with `{ x, y, z, type, wing, name }`.
 * @param {Array<{ type: string, wing?: string, name?: string, x: number, y: number, z: number }>} nodeList
 * @param {string[]} wingNamesSorted
 * @param {GraphDensityMetrics} metrics
 */
export function seedWingClusteredLayout(nodeList, wingNamesSorted, metrics) {
  const nW = Math.max(1, wingNamesSorted.length);
  const baseRing = 26 + Math.min(48, nodeList.length * 0.35);
  const verticalSpread = 7 + metrics.tier * 2.2;
  const clusterR = 9 + metrics.tier * 1.8;

  const wingCenter = new Map();
  wingNamesSorted.forEach((wing, wi) => {
    const angle = (wi / nW) * Math.PI * 2;
    const ringR = baseRing * (1 + (wi % 5) * 0.04);
    const x = Math.cos(angle) * ringR;
    const z = Math.sin(angle) * ringR;
    const y = ((wi + 0.5) / nW - 0.5) * verticalSpread * 2.2;
    wingCenter.set(wing, { x, y, z });
  });

  const roomsByWing = new Map();
  nodeList.forEach((node) => {
    if (node.type === 'room' && node.wing) {
      const arr = roomsByWing.get(node.wing) || [];
      arr.push(node);
      roomsByWing.set(node.wing, arr);
    }
  });

  wingNamesSorted.forEach((wing) => {
    const rooms = roomsByWing.get(wing) || [];
    const wc = wingCenter.get(wing) || { x: 0, y: 0, z: 0 };
    const nr = Math.max(rooms.length, 1);
    rooms.forEach((room, ri) => {
      const local = (ri / nr) * Math.PI * 2;
      const h = hash01(`${wing}|${room.name}|${ri}`);
      const h2 = hash01(`${room.name}|z`);
      const rr = clusterR * (0.45 + 0.55 * h);
      const lift = (h2 - 0.5) * metrics.depthJitter;
      room.x = wc.x + Math.cos(local) * rr;
      room.y = wc.y + Math.sin(local * 1.7) * rr * 0.42 + lift;
      room.z = wc.z + Math.sin(local) * rr;
    });
  });

  nodeList.forEach((node) => {
    if (node.type === 'wing') {
      const wc = wingCenter.get(node.name) || { x: 0, y: 0, z: 0 };
      const h = hash01(`wing|${node.name}`);
      node.x = wc.x * 0.22 + (h - 0.5) * 3;
      node.y = wc.y + (h - 0.5) * 4;
      node.z = wc.z * 0.22 + (hash01(`${node.name}z`) - 0.5) * 3;
    }
  });
}

/**
 * @param {Array<{ x: number, y: number, z: number, type?: string, wing?: string, name?: string }>} nodeList
 * @param {Array<object>} edges
 * @param {GraphDensityMetrics} metrics
 * @param {(list: typeof nodeList, edge: object, end: 'from'|'to') => object | null | undefined} findRoomNodeForEdge
 */
export function runGraphForceLayout(nodeList, edges, metrics, findRoomNodeForEdge) {
  const lp = normalizeLayoutParams(metrics);
  const { repelStrength, attractStrength, centerStrength, wingCohesion, iterations } = lp;

  const wingAnchor = new Map();
  nodeList.forEach((n) => {
    if (n.type === 'wing' && n.name) wingAnchor.set(n.name, n);
  });

  for (let iter = 0; iter < iterations; iter += 1) {
    for (let i = 0; i < nodeList.length; i += 1) {
      for (let j = i + 1; j < nodeList.length; j += 1) {
        const dx = nodeList[i].x - nodeList[j].x;
        const dy = nodeList[i].y - nodeList[j].y;
        const dz = nodeList[i].z - nodeList[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.12;
        let force = repelStrength / (dist * dist);
        const wi = nodeList[i].wing;
        const wj = nodeList[j].wing;
        if (wi && wj && wi !== wj) force *= 1.12;
        nodeList[i].x += dx * force;
        nodeList[i].y += dy * force;
        nodeList[i].z += dz * force;
        nodeList[j].x -= dx * force;
        nodeList[j].y -= dy * force;
        nodeList[j].z -= dz * force;
      }
    }

    edges.forEach((edge) => {
      const from = findRoomNodeForEdge(nodeList, edge, 'from');
      const to = findRoomNodeForEdge(nodeList, edge, 'to');
      if (from && to) {
        let dx = to.x - from.x;
        let dy = to.y - from.y;
        let dz = to.z - from.z;
        let att = attractStrength;
        if (from.wing && to.wing && from.wing !== to.wing) att *= 1.15;
        from.x += dx * att;
        from.y += dy * att;
        from.z += dz * att;
        to.x -= dx * att;
        to.y -= dy * att;
        to.z -= dz * att;
      }
    });

    nodeList.forEach((node) => {
      if (node.type === 'room' && node.wing) {
        const wn = wingAnchor.get(node.wing);
        if (wn) {
          node.x += (wn.x - node.x) * wingCohesion;
          node.y += (wn.y - node.y) * wingCohesion;
          node.z += (wn.z - node.z) * wingCohesion;
        }
      }
      node.x *= 1 - centerStrength;
      node.y *= 1 - centerStrength;
      node.z *= 1 - centerStrength;
    });
  }
}

/**
 * Push apart nodes closer than `minDist` (simple iterative projection).
 * @param {Array<{ x: number, y: number, z: number }>} nodeList
 * @param {number} minDist
 * @param {number} [passes]
 */
export function separateGraphNodes(nodeList, minDist, passes = 10) {
  for (let p = 0; p < passes; p += 1) {
    for (let i = 0; i < nodeList.length; i += 1) {
      for (let j = i + 1; j < nodeList.length; j += 1) {
        const a = nodeList[i];
        const b = nodeList[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let dz = a.z - b.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-8;
        if (dist < minDist) {
          const push = (minDist - dist) * 0.52;
          const nx = dx / dist;
          const ny = dy / dist;
          const nz = dz / dist;
          a.x += nx * push;
          a.y += ny * push;
          a.z += nz * push;
          b.x -= nx * push;
          b.y -= ny * push;
          b.z -= nz * push;
        }
      }
    }
  }
}

/**
 * @param {Array<{ id: string, baseScore: number }>} entries
 * @param {{ selectedId: string | null, hoveredId: string | null, pinActive: boolean, budget: number }} opts
 * @returns {Set<string>}
 */
export function computeVisibleLabelIds(entries, opts) {
  const { selectedId, hoveredId, pinActive, budget } = opts;
  const cap = Math.max(8, Math.floor(budget));
  const scored = entries.map(({ id, baseScore }) => {
    let s = baseScore;
    if (id === selectedId) s += 1e6;
    if (pinActive && id === selectedId) s += 2e5;
    if (id === hoveredId) s += 5e5;
    return { id, score: s };
  });
  scored.sort((a, b) => b.score - a.score);
  return new Set(scored.slice(0, cap).map((x) => x.id));
}

/**
 * @param {{ type: string, incidentFull?: number, drawers?: number }} node
 * @returns {number}
 */
export function baseLabelScoreForGraphNode(node) {
  const inc = Math.min(220, (node.incidentFull || 0) * 24);
  const dr = Math.min(100, (node.drawers || 0) * 1.8);
  const wingBoost = node.type === 'wing' ? 45 : 0;
  return 20 + inc + dr + wingBoost;
}

/**
 * Edge opacity multiplier for selection / hover emphasis (deterministic).
 * @param {object} p
 * @param {string|null|undefined} p.selectedId
 * @param {string|null|undefined} p.hoveredId
 * @param {string|null|undefined} p.fromId
 * @param {string|null|undefined} p.toId
 * @param {string} p.relationshipType
 * @param {number} p.densityTier
 * @param {boolean} p.isGraphRelationship
 * @returns {number} multiplier in (0, 1.35]
 */
export function edgeEmphasisOpacityMult(p) {
  const { selectedId, hoveredId, fromId, toId, relationshipType, densityTier, isGraphRelationship } = p;
  if (!isGraphRelationship) return 1;

  const focusId = selectedId || hoveredId;
  const incident = focusId && (fromId === focusId || toId === focusId);
  const tunnel = relationshipType === 'tunnel';

  if (focusId) {
    if (incident) return tunnel ? 1.22 : 1.05;
    return densityTier >= 2 ? 0.38 : densityTier >= 1 ? 0.52 : 0.62;
  }

  if (densityTier >= 3) return tunnel ? 0.92 : 0.78;
  return 1;
}

/**
 * @param {number} maxNeighborRadius
 * @param {number} fovDeg
 * @param {number} tier
 * @returns {number} suggested camera distance from focus point
 */
export function computeGraphFocusCameraDistance(maxNeighborRadius, fovDeg, tier) {
  const fov = (fovDeg * Math.PI) / 180;
  const margin = 1.28 + tier * 0.06;
  const r = Math.max(4, maxNeighborRadius);
  const dist = (r * margin) / Math.tan(fov / 2);
  const minD = 16 + tier * 4;
  const maxD = 240;
  return Math.min(maxD, Math.max(minD, dist));
}

/**
 * @param {{ x: number, y: number, z: number }} focus
 * @param {Array<{ x: number, y: number, z: number }>} neighborPoints
 * @returns {number}
 */
export function maxRadiusFromFocus(focus, neighborPoints) {
  let maxR = 0;
  for (const p of neighborPoints) {
    const dx = p.x - focus.x;
    const dy = p.y - focus.y;
    const dz = p.z - focus.z;
    maxR = Math.max(maxR, Math.sqrt(dx * dx + dy * dy + dz * dz));
  }
  return maxR;
}

/**
 * Scene node ids for graph endpoints (matches scene.js createLink metadata).
 * @param {{ type: string, wing?: string, name?: string } | null | undefined} n
 * @returns {string | null}
 */
export function graphSceneNodeIdForLayoutNode(n) {
  if (!n) return null;
  if (n.type === 'wing' && n.name) return `wing:${n.name}`;
  if (n.type === 'room' && n.wing && n.name) return `room:${n.wing}:${n.name}`;
  return null;
}

/**
 * @param {Array<object>} nodeList
 * @param {Array<object>} edges
 * @param {(list: object[], edge: object, end: 'from'|'to') => object | null | undefined} findRoomNodeForEdge
 * @returns {Map<string, number>}
 */
export function countGraphIncidentsByRoomNodeId(nodeList, edges, findRoomNodeForEdge) {
  /** @type {Map<string, number>} */
  const m = new Map();
  for (const edge of edges || []) {
    const from = findRoomNodeForEdge(nodeList, edge, 'from');
    const to = findRoomNodeForEdge(nodeList, edge, 'to');
    const fid = graphSceneNodeIdForLayoutNode(from);
    const tid = graphSceneNodeIdForLayoutNode(to);
    if (fid?.startsWith('room:')) m.set(fid, (m.get(fid) || 0) + 1);
    if (tid?.startsWith('room:')) m.set(tid, (m.get(tid) || 0) + 1);
  }
  return m;
}
