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
 * Normalize camera distance for label budgeting: 0 = far (zoomed out), 1 = close (zoomed in).
 * @param {number} cameraDist — distance from camera to orbit target
 * @param {number} graphExtent — characteristic graph radius (max bbox half-extent or similar)
 */
export function normalizeCameraDistanceForLabels(cameraDist, graphExtent) {
  const ext = Math.max(12, graphExtent);
  const lo = ext * 0.85;
  const hi = ext * 4.2;
  const t = (cameraDist - lo) / (hi - lo);
  return Math.max(0, Math.min(1, t));
}

/**
 * Effective label count: fewer when zoomed out; tier scales the curve.
 * @param {number} baseBudget — from density metrics
 * @param {number} cameraDistanceNorm — see normalizeCameraDistanceForLabels
 * @param {number} densityTier
 */
export function effectiveLabelBudgetForCamera(baseBudget, cameraDistanceNorm, densityTier) {
  const b = Math.max(8, Math.floor(baseBudget));
  const tier = Math.max(0, Math.min(3, densityTier));
  const zoomIn = Math.max(0, Math.min(1, cameraDistanceNorm));
  // Zoomed out: stronger reduction on dense tiers
  const minFrac = 0.38 + tier * 0.06;
  const maxFrac = 1;
  const frac = minFrac + (maxFrac - minFrac) * zoomIn;
  return Math.max(8, Math.floor(b * frac));
}

/**
 * Sprite scale multiplier (applied to base sprite scale) — slightly larger when zoomed in.
 * @param {number} cameraDistanceNorm
 * @param {{ selected?: boolean, hovered?: boolean, pinned?: boolean }} role
 */
export function labelSpriteScaleMultiplier(cameraDistanceNorm, role = {}) {
  const z = Math.max(0, Math.min(1, cameraDistanceNorm));
  let m = 0.5 + z * 0.26;
  if (role.pinned) m *= 1.05;
  else if (role.selected) m *= 1.04;
  else if (role.hovered) m *= 1.025;
  return m;
}

/**
 * Extra opacity multiplier for label material (combined with search / focus elsewhere).
 * @param {number} cameraDistanceNorm
 * @param {{ selected?: boolean, hovered?: boolean, neighbor?: boolean }} role
 */
export function labelOpacityDistanceFactor(cameraDistanceNorm, role = {}) {
  const z = Math.max(0, Math.min(1, cameraDistanceNorm));
  let o = 0.32 + z * 0.34;
  if (role.selected) o = Math.max(o, 0.78);
  if (role.hovered) o = Math.max(o, 0.72);
  if (role.neighbor) o = Math.max(o, 0.44 + z * 0.22);
  return Math.max(0.2, Math.min(0.84, o));
}

/**
 * Canonical pointer release classification for select vs drag/pan.
 * @param {{
 *  maxMoveSq: number,
 *  cameraMovedSq: number,
 *  moveThresholdPx?: number,
 *  cameraMoveEpsSq?: number,
 *  cameraInteractionActive?: boolean,
 * }} p
 * @returns {{ shouldSelect: boolean, reason: 'click'|'pointer-drag'|'camera-drag'|'camera-interaction' }}
 */
export function classifyPointerRelease(p) {
  const moveThresholdPx = p.moveThresholdPx ?? 8;
  const cameraMoveEpsSq = p.cameraMoveEpsSq ?? 2.5e-5;
  if (p.cameraInteractionActive) {
    return { shouldSelect: false, reason: 'camera-interaction' };
  }
  const movedPx = Math.sqrt(Math.max(0, p.maxMoveSq || 0));
  if (movedPx > moveThresholdPx) {
    return { shouldSelect: false, reason: 'pointer-drag' };
  }
  if ((p.cameraMovedSq || 0) > cameraMoveEpsSq) {
    return { shouldSelect: false, reason: 'camera-drag' };
  }
  return { shouldSelect: true, reason: 'click' };
}

/**
 * Greedy rectangle overlap culling for label legibility in dense clusters.
 * @param {Array<{ id: string, x: number, y: number, w: number, h: number, priority: number }>} labels
 * @param {number} [paddingPx]
 * @returns {Set<string>}
 */
export function chooseNonOverlappingLabels(labels, paddingPx = 6) {
  const sorted = [...(labels || [])].sort((a, b) => b.priority - a.priority);
  /** @type {Array<{ x0: number, y0: number, x1: number, y1: number }>} */
  const boxes = [];
  const keep = new Set();
  for (const l of sorted) {
    const x0 = l.x - l.w * 0.5 - paddingPx;
    const y0 = l.y - l.h * 0.5 - paddingPx;
    const x1 = l.x + l.w * 0.5 + paddingPx;
    const y1 = l.y + l.h * 0.5 + paddingPx;
    const hit = boxes.some((b) => !(x1 < b.x0 || x0 > b.x1 || y1 < b.y0 || y0 > b.y1));
    if (hit) continue;
    boxes.push({ x0, y0, x1, y1 });
    keep.add(l.id);
  }
  return keep;
}

/**
 * Wing id string for a room scene id `room:wing:name`, else null.
 * @param {string} nodeId
 */
export function wingIdFromSceneNodeId(nodeId) {
  if (!nodeId || !nodeId.startsWith('room:')) return null;
  const rest = nodeId.slice('room:'.length);
  const i = rest.indexOf(':');
  return i === -1 ? null : rest.slice(0, i);
}

/**
 * Wing id for label scoring when a wing or room is selected/hovered.
 * @param {string | null | undefined} sceneId
 */
export function focusWingIdFromSceneSelection(sceneId) {
  if (!sceneId) return null;
  if (sceneId.startsWith('room:')) return wingIdFromSceneNodeId(sceneId);
  if (sceneId.startsWith('wing:')) return sceneId.slice('wing:'.length);
  return null;
}

/**
 * Adjacency over canonical room node ids (undirected).
 * @param {Array<object>} edges
 * @param {Array<object>} nodeList
 * @param {(list: object[], edge: object, end: 'from'|'to') => object | null | undefined} findRoomNodeForEdge
 * @returns {Map<string, Set<string>>}
 */
export function buildGraphRoomNeighborMap(edges, nodeList, findRoomNodeForEdge) {
  /** @type {Map<string, Set<string>>} */
  const m = new Map();
  function add(a, b) {
    if (!a || !b || a === b) return;
    if (!m.has(a)) m.set(a, new Set());
    if (!m.has(b)) m.set(b, new Set());
    m.get(a).add(b);
    m.get(b).add(a);
  }
  for (const edge of edges || []) {
    const from = findRoomNodeForEdge(nodeList, edge, 'from');
    const to = findRoomNodeForEdge(nodeList, edge, 'to');
    const fid = graphSceneNodeIdForLayoutNode(from);
    const tid = graphSceneNodeIdForLayoutNode(to);
    if (fid?.startsWith('room:') && tid?.startsWith('room:')) add(fid, tid);
  }
  return m;
}

/**
 * Immediate graph neighbors of `focusId` (incident edges). Same-wing emphasis uses `focusWingId` in label scoring.
 * @param {string | null | undefined} focusId
 * @param {Map<string, Set<string>>} neighborMap
 */
export function neighborIdsForFocus(focusId, neighborMap) {
  const out = new Set();
  if (!focusId) return out;
  const nbr = neighborMap.get(focusId);
  if (nbr) nbr.forEach((id) => out.add(id));
  return out;
}

/**
 * Split selection vs secondary hover so graph emphasis stays anchored on the selection
 * while still previewing another node (incident edges + label priority use this).
 * @param {string | null | undefined} selectedId
 * @param {string | null | undefined} hoveredId
 * @returns {{ primaryId: string | null, secondaryHoverId: string | null }}
 */
export function splitGraphFocusIds(selectedId, hoveredId) {
  const primary = selectedId || hoveredId || null;
  const secondary =
    selectedId && hoveredId && hoveredId !== selectedId ? hoveredId : null;
  return { primaryId: primary, secondaryHoverId: secondary };
}

/**
 * Which rooms should receive label sprites: wings always labeled separately; rooms capped by score
 * with guaranteed coverage for connected (incident) rooms so bridges are not silently unlabeled.
 * @param {Array<{ id: string, baseScore: number, incidentFull?: number }>} entries
 * @param {{ nodeCount: number, labelBudget: number }} metrics
 * @returns {Set<string>} room node ids allowed to allocate a sprite
 */
export function buildGraphRoomLabelCandidateSet(entries, metrics) {
  const rooms = entries.filter((e) => e.id.startsWith('room:'));
  const maxSprites =
    metrics.nodeCount > 300
      ? metrics.labelBudget * 5
      : metrics.nodeCount > 160
        ? metrics.labelBudget * 4
        : rooms.length;

  const cap = Math.max(24, Math.min(rooms.length, maxSprites));
  const connected = rooms.filter((e) => (e.incidentFull || 0) > 0);
  const isolated = rooms.filter((e) => (e.incidentFull || 0) === 0);

  const scoreSort = (a, b) => b.baseScore - a.baseScore;
  connected.sort(scoreSort);
  isolated.sort(scoreSort);

  const chosen = [];
  for (const e of connected) {
    if (chosen.length >= cap) break;
    chosen.push(e.id);
  }
  for (const e of isolated) {
    if (chosen.length >= cap) break;
    chosen.push(e.id);
  }
  return new Set(chosen);
}

/**
 * @param {Array<{ id: string, baseScore: number }>} entries
 * @param {{
 *   selectedId: string | null,
 *   hoveredId: string | null,
 *   pinActive: boolean,
 *   budget: number,
 *   neighborIds?: Set<string> | null,
 *   focusWingId?: string | null,
 *   cameraDistanceNorm?: number,
 *   densityTier?: number,
 * }} opts
 * @returns {Set<string>}
 */
export function computeVisibleLabelIds(entries, opts) {
  const {
    selectedId,
    hoveredId,
    pinActive,
    budget,
    neighborIds = null,
    focusWingId = null,
    cameraDistanceNorm = 0.55,
    densityTier = 0,
  } = opts;

  const eff = effectiveLabelBudgetForCamera(budget, cameraDistanceNorm, densityTier);
  const cap = Math.max(8, Math.floor(eff));
  const tier = Math.max(0, Math.min(3, densityTier));

  const neighborBoost = 3500 + tier * 220;
  const wingBoost = 1200 + tier * 80;

  const scored = entries.map(({ id, baseScore }) => {
    let s = baseScore;
    if (id === selectedId) s += 1e6;
    if (pinActive && id === selectedId) s += 2e5;
    if (id === hoveredId) s += 5e5;
    if (neighborIds && neighborIds.has(id)) s += neighborBoost;
    if (focusWingId && wingIdFromSceneNodeId(id) === focusWingId) s += wingBoost;
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

  const { primaryId, secondaryHoverId } = splitGraphFocusIds(selectedId, hoveredId);
  const incidentPrimary = primaryId && (fromId === primaryId || toId === primaryId);
  const incidentSecondary =
    secondaryHoverId && (fromId === secondaryHoverId || toId === secondaryHoverId);
  const tunnel = relationshipType === 'tunnel';
  const tier = Math.max(0, Math.min(3, densityTier));

  if (primaryId) {
    if (incidentPrimary) return tunnel ? 1.24 : 1.06;
    // Preview edges for a different hovered node while a selection is pinned
    if (incidentSecondary) {
      const sec = tunnel ? 0.88 : 0.78;
      return sec * (tier >= 2 ? 0.92 : 1);
    }
    const nonIncident = tier >= 3 ? 0.36 : tier >= 2 ? 0.4 : tier >= 1 ? 0.52 : 0.68;
    return nonIncident;
  }

  if (tier >= 3) return tunnel ? 0.92 : 0.78;
  return 1;
}

/**
 * Extra multiplier for node opacity from distance to focus (used with selection-based focus point).
 * Tier 0 stays closer to 1; dense tiers allow deeper falloff.
 * @param {number} distanceFromFocus
 * @param {number} tier
 * @param {{ isNeighbor?: boolean, focusActive?: boolean }} [ctx]
 */
export function focusNodeDistanceDimMult(distanceFromFocus, tier, ctx = {}) {
  const { isNeighbor = false, focusActive = false } = ctx;
  if (!focusActive) return 1;
  const tierClamped = Math.max(0, Math.min(3, tier));
  const start = 38 + tierClamped * 18;
  const span = 155 + tierClamped * 35;
  let m = 1.05 - (distanceFromFocus - start) / span;
  if (isNeighbor) m = 0.55 + m * 0.45;
  m = Math.max(tierClamped === 0 ? 0.58 : 0.34, Math.min(1.08, m));
  return m;
}

/**
 * Small world-space offset for orbit target to avoid dead-center flattening and aid depth read.
 * @param {number} extent
 * @param {number} tier
 * @param {number} [repeatIndex]
 */
export function framingTargetOffset(extent, tier, repeatIndex = 0) {
  const e = Math.max(8, extent);
  const t = Math.max(0, Math.min(3, tier));
  const h = hash01(`frame|${repeatIndex}`);
  const up = e * (0.028 + t * 0.006);
  const side = e * (0.045 + t * 0.008) * (h - 0.5) * 2;
  return { x: side, y: up, z: -side * 0.4 };
}

/**
 * @param {number} maxNeighborRadius
 * @param {number} fovDeg
 * @param {number} tier
 * @param {{ neighborCount?: number }} [opts] — when >0, pull camera slightly farther to keep neighbors in frame
 * @returns {number} suggested camera distance from focus point
 */
export function computeGraphFocusCameraDistance(maxNeighborRadius, fovDeg, tier, opts = {}) {
  const fov = (fovDeg * Math.PI) / 180;
  const nc = Math.max(0, opts.neighborCount || 0);
  const margin = 1.28 + tier * 0.06 + Math.min(0.14, nc * 0.018);
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
