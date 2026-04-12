/**
 * Room-to-room routing on canonical graph edges (3D viz): fewest-hop BFS and weighted modes.
 * Pure helpers — safe in browser and Node tests.
 * Routing uses whatever edges the caller passes (MCP tunnel edges only in normal viz loads).
 */
import { makeRoomId, parseRoomId, sceneRoomNodeIdFromRoomId } from './canonical.js';
import {
  collectRelationshipTypesFromEdges,
  filterEdgesByRelationshipTypes,
  getEdgeRelationshipType,
  sceneRelationshipFilterArg,
} from './graph-relationships.js';
import { routeFailureMessage } from './graph-guidance.js';
import { resolveTunnelEndpoint } from './insights.js';
import { parseRoomSceneId } from './graph-navigation.js';

/** @typedef {'shortest' | 'tunnel_preferred' | 'balanced' | 'adjacency_light'} RouteMode */

/** Ordered list for UI and persistence validation */
export const ROUTE_MODES = /** @type {const} */ (['shortest', 'tunnel_preferred', 'balanced', 'adjacency_light']);

export const DEFAULT_ROUTE_MODE = 'shortest';

export const ROUTE_MODE_META = {
  shortest: { label: 'Shortest', shortLabel: 'Shortest', hint: 'Fewest hops on visible edges (BFS).' },
  tunnel_preferred: {
    label: 'Tunnel-preferred',
    shortLabel: 'Tunnels',
    hint: 'Prefer explicit tunnel edges; may add hops vs shortest.',
  },
  balanced: {
    label: 'Balanced',
    shortLabel: 'Balanced',
    hint: 'Trade hop count vs edge-type cost (tunnel cheaper than adjacency).',
  },
  adjacency_light: {
    label: 'Adjacency-light',
    shortLabel: 'Adj-light',
    hint: 'Strongly avoid taxonomy_adjacency hops when alternatives exist.',
  },
};

/**
 * @param {unknown} raw
 * @returns {RouteMode}
 */
export function normalizeRouteMode(raw) {
  const s = String(raw || '').trim();
  if (ROUTE_MODES.includes(/** @type {RouteMode} */ (s))) return /** @type {RouteMode} */ (s);
  return DEFAULT_ROUTE_MODE;
}

/**
 * Integer costs — deterministic, explainable. Only relationship labels from graph edges.
 * @param {string} relationshipType
 * @param {RouteMode} mode
 */
export function edgeCostForRelationshipType(relationshipType, mode) {
  const rt = relationshipType || 'tunnel';
  const m = normalizeRouteMode(mode);
  if (m === 'shortest') return 1;
  if (m === 'tunnel_preferred') {
    if (rt === 'tunnel') return 2;
    if (rt === 'taxonomy_adjacency') return 10;
    return 4;
  }
  if (m === 'balanced') {
    if (rt === 'tunnel') return 3;
    if (rt === 'taxonomy_adjacency') return 7;
    return 4;
  }
  if (m === 'adjacency_light') {
    if (rt === 'tunnel') return 2;
    if (rt === 'taxonomy_adjacency') return 14;
    return 3;
  }
  return 4;
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
export function pathsEqualRoomIds(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * @param {object} edge
 * @param {Record<string, Array<{ name: string }>>} roomsData
 * @returns {{ a: string, b: string } | null} canonical room ids `wingId/roomName`
 */
export function canonicalRoomPairFromEdge(edge, roomsData) {
  if (!edge || typeof edge !== 'object') return null;
  if (edge.sourceRoomId && edge.targetRoomId) {
    return { a: String(edge.sourceRoomId), b: String(edge.targetRoomId) };
  }
  if (edge.from == null || edge.to == null) return null;
  const fromR = resolveTunnelEndpoint(String(edge.from), roomsData, null);
  const toR = resolveTunnelEndpoint(String(edge.to), roomsData, edge.wing || null);
  if (!fromR || !toR) return null;
  return { a: fromR.key, b: toR.key };
}

/**
 * Same edges + filters as the 3D graph scene uses for link visibility.
 * @param {object[]} graphEdges
 * @param {Set<string>} enabledRelTypes — graphRelEnabledTypes from UI
 * @param {string[]} availableTypes — from collectRelationshipTypesFromEdges(graphEdges)
 */
export function getRoutingEdgesLikeScene(graphEdges, enabledRelTypes, availableTypes) {
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const avail = availableTypes?.length ? availableTypes : collectRelationshipTypesFromEdges(edges);
  const arg = sceneRelationshipFilterArg(enabledRelTypes, avail);
  if (arg == null) return edges;
  if (arg.size === 0) return [];
  return filterEdgesByRelationshipTypes(edges, arg);
}

function undirectedPairKey(a, b) {
  return a < b ? `${a}\0${b}` : `${b}\0${a}`;
}

/**
 * Undirected multi-graph adjacency: roomId -> sorted unique neighbors with edge meta.
 * Parallel edges collapse to one entry: lowest `edgeKey` wins (legacy deterministic tie-break).
 * @param {object[]} edges
 * @param {Record<string, unknown>} roomsData
 * @returns {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string }>>}
 */
export function buildRoomAdjacency(edges, roomsData) {
  /** @type {Map<string, Map<string, { relationshipType: string, edgeKey: string }>>} */
  const best = new Map();

  function addUndirected(a, b, relationshipType, edgeKey) {
    if (!a || !b || a === b) return;
    if (!best.has(a)) best.set(a, new Map());
    if (!best.has(b)) best.set(b, new Map());
    const prevA = best.get(a).get(b);
    if (!prevA || edgeKey < prevA.edgeKey) {
      best.get(a).set(b, { relationshipType, edgeKey });
      best.get(b).set(a, { relationshipType, edgeKey });
    }
  }

  for (let i = 0; i < edges.length; i += 1) {
    const edge = edges[i];
    const pair = canonicalRoomPairFromEdge(edge, roomsData);
    if (!pair) continue;
    const rt = getEdgeRelationshipType(edge);
    const eid = edge.edgeId != null ? String(edge.edgeId) : `legacy:${i}`;
    addUndirected(pair.a, pair.b, rt, eid);
  }

  /** @type {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string }>>} */
  const out = new Map();
  best.forEach((m, from) => {
    const arr = [...m.entries()]
      .map(([to, meta]) => ({ to, relationshipType: meta.relationshipType, edgeKey: meta.edgeKey }))
      .sort((x, y) => x.to.localeCompare(y.to));
    out.set(from, arr);
  });
  return out;
}

/**
 * One edge per undirected room pair: minimum weighted cost for this route mode, with deterministic ties.
 * @param {object[]} edges — already filtered like the scene
 * @param {Record<string, unknown>} roomsData
 * @param {RouteMode} routeMode
 * @returns {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string, cost: number }>>}
 */
export function buildMinCostAdjacencyForMode(edges, roomsData, routeMode) {
  const mode = normalizeRouteMode(routeMode);
  /** @type {Map<string, { a: string, b: string, relationshipType: string, edgeKey: string, cost: number }>} */
  const bestByPair = new Map();

  function better(prev, next) {
    if (!prev) return next;
    if (next.cost < prev.cost) return next;
    if (next.cost > prev.cost) return prev;
    const rtCmp = prev.relationshipType.localeCompare(next.relationshipType);
    if (rtCmp !== 0) return rtCmp < 0 ? prev : next;
    return prev.edgeKey <= next.edgeKey ? prev : next;
  }

  for (let i = 0; i < edges.length; i += 1) {
    const edge = edges[i];
    const pair = canonicalRoomPairFromEdge(edge, roomsData);
    if (!pair) continue;
    const rt = getEdgeRelationshipType(edge);
    const eid = edge.edgeId != null ? String(edge.edgeId) : `legacy:${i}`;
    const cost = edgeCostForRelationshipType(rt, mode);
    const cand = { a: pair.a, b: pair.b, relationshipType: rt, edgeKey: eid, cost };
    const pk = undirectedPairKey(pair.a, pair.b);
    bestByPair.set(pk, better(bestByPair.get(pk), cand));
  }

  /** @type {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string, cost: number }>>} */
  const out = new Map();
  bestByPair.forEach((e) => {
    if (!out.has(e.a)) out.set(e.a, []);
    if (!out.has(e.b)) out.set(e.b, []);
    out.get(e.a).push({ to: e.b, relationshipType: e.relationshipType, edgeKey: e.edgeKey, cost: e.cost });
    out.get(e.b).push({ to: e.a, relationshipType: e.relationshipType, edgeKey: e.edgeKey, cost: e.cost });
  });
  out.forEach((arr) => {
    arr.sort((x, y) => x.to.localeCompare(y.to));
  });
  return out;
}

/**
 * @param {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string }>>} adj
 * @param {string} startRoomId
 * @param {string} endRoomId
 * @returns {{ pathRoomIds: string[], segmentTypes: string[], segmentEdgeKeys: string[] } | null}
 */
export function shortestRoomPath(adj, startRoomId, endRoomId) {
  const start = String(startRoomId);
  const end = String(endRoomId);
  if (!adj.has(start) || !adj.has(end)) return null;
  if (start === end) {
    return { pathRoomIds: [start], segmentTypes: [], segmentEdgeKeys: [] };
  }

  /** @type {Map<string, { prev: string | null, relationshipType: string, edgeKey: string }>} */
  const parent = new Map();
  parent.set(start, { prev: null, relationshipType: '', edgeKey: '' });

  const queue = [start];
  const visited = new Set([start]);

  while (queue.length) {
    const u = queue.shift();
    const nbrs = adj.get(u);
    if (!nbrs) continue;
    for (const { to, relationshipType, edgeKey } of nbrs) {
      if (visited.has(to)) continue;
      visited.add(to);
      parent.set(to, { prev: u, relationshipType, edgeKey });
      if (to === end) {
        return reconstructPath(parent, start, end);
      }
      queue.push(to);
    }
  }
  return null;
}

/**
 * @param {Map<string, Array<{ to: string, relationshipType: string, edgeKey: string, cost: number }>>} adj
 * @param {string} startRoomId
 * @param {string} endRoomId
 * @returns {{ pathRoomIds: string[], segmentTypes: string[], segmentEdgeKeys: string[], totalCost: number } | null}
 */
export function dijkstraRoomPath(adj, startRoomId, endRoomId) {
  const start = String(startRoomId);
  const end = String(endRoomId);
  if (!adj.has(start) || !adj.has(end)) return null;
  if (start === end) {
    return { pathRoomIds: [start], segmentTypes: [], segmentEdgeKeys: [], totalCost: 0 };
  }

  const INF = Number.MAX_SAFE_INTEGER;
  const nodes = [...adj.keys()];
  const dist = new Map();
  const hops = new Map();
  /** @type {Map<string, string | null>} immediate predecessor for tie-breaking */
  const pred = new Map();
  /** @type {Map<string, { prev: string | null, relationshipType: string, edgeKey: string }>} */
  const parent = new Map();

  for (const k of nodes) {
    dist.set(k, INF);
    hops.set(k, INF);
    pred.set(k, null);
  }
  dist.set(start, 0);
  hops.set(start, 0);
  parent.set(start, { prev: null, relationshipType: '', edgeKey: '' });

  const visited = new Set();

  while (visited.size < nodes.length) {
    let u = null;
    let bestD = INF;
    let bestH = INF;
    for (const node of nodes) {
      if (visited.has(node)) continue;
      const d = dist.get(node);
      const h = hops.get(node);
      if (d === INF) continue;
      if (u == null || d < bestD || (d === bestD && h < bestH) || (d === bestD && h === bestH && node < u)) {
        u = node;
        bestD = d;
        bestH = h;
      }
    }
    if (u == null || bestD === INF) break;
    visited.add(u);
    if (u === end) break;

    const nbrs = adj.get(u);
    if (!nbrs) continue;
    for (const { to, relationshipType, edgeKey, cost } of nbrs) {
      const alt = dist.get(u) + cost;
      const altH = hops.get(u) + 1;
      const curD = dist.get(to);
      const curH = hops.get(to);
      let accept = false;
      if (alt < curD) accept = true;
      else if (alt === curD && altH < curH) accept = true;
      else if (alt === curD && altH === curH && u < (pred.get(to) || '\uffff')) accept = true;

      if (accept) {
        dist.set(to, alt);
        hops.set(to, altH);
        pred.set(to, u);
        parent.set(to, { prev: u, relationshipType, edgeKey });
      }
    }
  }

  if (dist.get(end) === INF) return null;
  const raw = reconstructPath(parent, start, end);
  if (!raw) return null;
  return { ...raw, totalCost: dist.get(end) };
}

/**
 * @param {Map<string, { prev: string | null, relationshipType: string, edgeKey: string }>} parent
 */
function reconstructPath(parent, start, end) {
  /** @type {string[]} */
  const nodes = [];
  let cur = end;
  while (true) {
    nodes.push(cur);
    if (cur === start) break;
    const info = parent.get(cur);
    if (!info?.prev) return null;
    cur = info.prev;
  }
  nodes.reverse();

  /** @type {string[]} */
  const segmentTypes = [];
  /** @type {string[]} */
  const segmentEdgeKeys = [];
  for (let i = 1; i < nodes.length; i += 1) {
    const info = parent.get(nodes[i]);
    if (!info) return null;
    segmentTypes.push(info.relationshipType || 'tunnel');
    segmentEdgeKeys.push(info.edgeKey || '');
  }
  return { pathRoomIds: nodes, segmentTypes, segmentEdgeKeys };
}

/**
 * @param {string} roomId
 * @returns {string | null}
 */
export function sceneRoomIdFromRoomId(roomId) {
  return sceneRoomNodeIdFromRoomId(roomId);
}

/**
 * @param {string} sceneId `room:wing:roomName`
 */
export function roomIdFromSceneRoomId(sceneId) {
  const p = parseRoomSceneId(sceneId);
  if (!p) return null;
  return makeRoomId(p.wing, p.room);
}

/**
 * @param {string[]} pathRoomIds
 * @returns {string[]} interior nodes that sit between wings (cross-wing connectors)
 */
export function bridgeRoomIdsAlongPath(pathRoomIds) {
  if (!pathRoomIds || pathRoomIds.length <= 2) return [];
  /** @type {string[]} */
  const out = [];
  for (let i = 1; i < pathRoomIds.length - 1; i += 1) {
    const prev = parseRoomId(pathRoomIds[i - 1]);
    const mid = parseRoomId(pathRoomIds[i]);
    const next = parseRoomId(pathRoomIds[i + 1]);
    if (!prev || !mid || !next) continue;
    if (prev.wingId !== mid.wingId || mid.wingId !== next.wingId) {
      out.push(pathRoomIds[i]);
    }
  }
  return out;
}

/**
 * @param {string[]} segmentTypes
 * @returns {Record<string, number>}
 */
export function countTypesAlongRoute(segmentTypes) {
  /** @type {Record<string, number>} */
  const by = {};
  for (const t of segmentTypes || []) {
    const k = t || 'tunnel';
    by[k] = (by[k] || 0) + 1;
  }
  return by;
}

/**
 * @param {string[]} segmentTypes
 * @returns {string}
 */
export function summarizeRouteEdgeMix(segmentTypes) {
  const n = segmentTypes?.length ?? 0;
  if (!n) return '';
  const c = countTypesAlongRoute(segmentTypes);
  const tun = c.tunnel || 0;
  const adj = c.taxonomy_adjacency || 0;
  let other = 0;
  for (const [k, v] of Object.entries(c)) {
    if (k !== 'tunnel' && k !== 'taxonomy_adjacency') other += v;
  }
  if (tun === n) return 'Edge mix: all tunnel.';
  if (adj === n) return 'Edge mix: all taxonomy_adjacency.';
  if (!other) return `Edge mix: ${tun} tunnel, ${adj} adjacency.`;
  return `Edge mix: ${tun} tunnel, ${adj} adjacency, ${other} other.`;
}

/**
 * Whether some all-tunnel path exists on the current visible edge set (same endpoints).
 * @param {object[]} routingEdges
 * @param {Record<string, unknown>} roomsData
 * @param {string} startRoomId
 * @param {string} endRoomId
 */
export function tunnelOnlyPathExists(routingEdges, roomsData, startRoomId, endRoomId) {
  const tunnelEdges = (routingEdges || []).filter((e) => getEdgeRelationshipType(e) === 'tunnel');
  if (!tunnelEdges.length) return false;
  const adj = buildRoomAdjacency(tunnelEdges, roomsData);
  return !!shortestRoomPath(adj, startRoomId, endRoomId);
}

/**
 * @param {RouteMode} mode
 * @param {{ pathRoomIds: string[] } | null} chosen
 * @param {{ pathRoomIds: string[] } | null} shortest
 * @param {object} opts
 * @param {boolean} opts.tunnelOnlyPossible
 * @param {string[]} opts.segmentTypes
 */
export function buildRouteComparisonNote(mode, chosen, shortest, opts = {}) {
  const m = normalizeRouteMode(mode);
  const tunnelOnlyPossible = !!opts.tunnelOnlyPossible;
  const segmentTypes = opts.segmentTypes || [];

  if (!chosen || !shortest) return null;
  if (m === 'shortest') return 'Fewest-hop path (reference mode).';

  const same = pathsEqualRoomIds(chosen.pathRoomIds, shortest.pathRoomIds);
  const ch = Math.max(0, chosen.pathRoomIds.length - 1);
  const sh = Math.max(0, shortest.pathRoomIds.length - 1);
  const parts = [];

  if (same) {
    parts.push('Same path as Shortest (fewest hops).');
  } else if (ch > sh) {
    parts.push(`Adds ${ch - sh} hop(s) vs Shortest to satisfy ${ROUTE_MODE_META[m].shortLabel} scoring.`);
  } else if (ch < sh) {
    parts.push(`Uses ${sh - ch} fewer hop(s) than Shortest (unusual — check parallel edges).`);
  } else {
    parts.push('Same hop count as Shortest but a different path — tie-break or parallel edges.');
  }

  const allTunnelSeg = segmentTypes.length > 0 && segmentTypes.every((t) => (t || 'tunnel') === 'tunnel');
  if (m === 'tunnel_preferred' || m === 'adjacency_light') {
    if (!tunnelOnlyPossible && !allTunnelSeg) {
      parts.push('No tunnel-only route under current filters — path mixes edge types as needed.');
    } else if (tunnelOnlyPossible && allTunnelSeg) {
      parts.push('Tunnel-only path is available; this route uses tunnel edges.');
    }
  }

  return parts.join(' ');
}

/**
 * @param {object} opts
 * @param {object[]} opts.graphEdges
 * @param {Record<string, unknown>} opts.roomsData
 * @param {Set<string>} opts.enabledRelTypes
 * @param {string[]} opts.availableRelTypes
 * @param {string} opts.startRoomId
 * @param {string} opts.endRoomId
 * @param {RouteMode} [opts.routeMode]
 */
export function computeGraphRoute(opts) {
  const {
    graphEdges = [],
    roomsData = {},
    enabledRelTypes,
    availableRelTypes,
    startRoomId,
    endRoomId,
    routeMode: routeModeRaw,
  } = opts || {};
  const routeMode = normalizeRouteMode(routeModeRaw);
  const start = String(startRoomId || '');
  const end = String(endRoomId || '');
  if (!start || !end) {
    return { ok: false, reason: 'missing_endpoint', message: routeFailureMessage('missing_endpoint') };
  }
  const avail = availableRelTypes?.length
    ? availableRelTypes
    : collectRelationshipTypesFromEdges(graphEdges);
  const filterArg = sceneRelationshipFilterArg(enabledRelTypes, avail);
  const graphFilterNarrowed = filterArg !== null;
  const rawEdgeCount = Array.isArray(graphEdges) ? graphEdges.length : 0;
  const routingEdges = getRoutingEdgesLikeScene(graphEdges, enabledRelTypes, avail);
  if (!routingEdges.length) {
    return {
      ok: false,
      reason: 'no_edges',
      message: routeFailureMessage('no_edges', { graphFilterNarrowed: rawEdgeCount > 0 }),
      routingBasis: 'explicit_mcp_only',
      inferredLayerEnabled: false,
      graphFilterNarrowed,
    };
  }
  const adjBfs = buildRoomAdjacency(routingEdges, roomsData);
  const refShortest = shortestRoomPath(adjBfs, start, end);
  if (!refShortest) {
    return {
      ok: false,
      reason: 'no_path',
      message: routeFailureMessage('no_path'),
      routingBasis: 'explicit_mcp_only',
      inferredLayerEnabled: false,
      graphFilterNarrowed,
    };
  }

  let sp;
  let totalCost = null;
  if (routeMode === 'shortest') {
    sp = refShortest;
  } else {
    const adjW = buildMinCostAdjacencyForMode(routingEdges, roomsData, routeMode);
    const w = dijkstraRoomPath(adjW, start, end);
    sp = w;
    totalCost = w ? w.totalCost : null;
    if (!sp) {
      return {
        ok: false,
        reason: 'no_path',
        message: routeFailureMessage('no_path'),
        routingBasis: 'explicit_mcp_only',
        inferredLayerEnabled: false,
        graphFilterNarrowed,
      };
    }
  }

  const pathSceneIds = sp.pathRoomIds.map((rid) => sceneRoomNodeIdFromRoomId(rid)).filter(Boolean);
  if (pathSceneIds.length !== sp.pathRoomIds.length) {
    return {
      ok: false,
      reason: 'id_map_failed',
      message: routeFailureMessage('id_map_failed'),
      graphFilterNarrowed,
    };
  }

  const hops = Math.max(0, sp.pathRoomIds.length - 1);
  const refHops = Math.max(0, refShortest.pathRoomIds.length - 1);
  const differsFromShortest = !pathsEqualRoomIds(sp.pathRoomIds, refShortest.pathRoomIds);
  const tunnelOnlyPossible = tunnelOnlyPathExists(routingEdges, roomsData, start, end);

  const comparisonNote = buildRouteComparisonNote(routeMode, sp, refShortest, {
    tunnelOnlyPossible,
    segmentTypes: sp.segmentTypes,
  });

  const mixSummary = summarizeRouteEdgeMix(sp.segmentTypes);
  const usesInferredSegments = (sp.segmentTypes || []).some((t) => (t || '') === 'taxonomy_adjacency');

  return {
    ok: true,
    pathRoomIds: sp.pathRoomIds,
    pathSceneIds,
    segmentTypes: sp.segmentTypes,
    segmentEdgeKeys: sp.segmentEdgeKeys,
    hops,
    bridges: bridgeRoomIdsAlongPath(sp.pathRoomIds),
    typeCounts: countTypesAlongRoute(sp.segmentTypes),
    routeMode,
    totalCost,
    referenceShortestHops: refHops,
    differsFromShortest,
    comparisonNote,
    mixSummary,
    tunnelOnlyPathExists: tunnelOnlyPossible,
    inferredLayerEnabled: false,
    usesInferredSegments,
    routingBasis: 'explicit_mcp_only',
    graphFilterNarrowed,
  };
}

/**
 * @param {number} stepIndex
 * @param {number} delta
 * @param {number} pathLen scene nodes count
 */
export function stepRouteIndex(stepIndex, delta, pathLen) {
  if (pathLen <= 0) return 0;
  const max = pathLen - 1;
  let i = Number(stepIndex) || 0;
  i = Math.max(0, Math.min(max, i));
  const n = pathLen;
  const next = (i + delta + n * 32) % n;
  return next;
}

/**
 * @param {number | string | null | undefined} stepIndex
 * @param {number} pathLen
 */
export function normalizeRouteStepIndex(stepIndex, pathLen) {
  if (!pathLen || pathLen < 1) return 0;
  let i = Math.floor(Number(stepIndex));
  if (!Number.isFinite(i)) i = 0;
  if (i < 0) i = 0;
  if (i > pathLen - 1) i = pathLen - 1;
  return i;
}
