/**
 * Room-to-room shortest path on canonical graph edges (3D viz route mode).
 * Pure helpers — safe in browser and Node tests.
 */
import { makeRoomId, parseRoomId, sceneRoomNodeIdFromRoomId } from './canonical.js';
import {
  collectRelationshipTypesFromEdges,
  filterEdgesByRelationshipTypes,
  getEdgeRelationshipType,
  sceneRelationshipFilterArg,
} from './graph-relationships.js';
import { resolveTunnelEndpoint } from './insights.js';
import { parseRoomSceneId } from './graph-navigation.js';

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

/**
 * Undirected multi-graph adjacency: roomId -> sorted unique neighbors with edge meta.
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
 * @param {object} opts
 * @param {object[]} opts.graphEdges
 * @param {Record<string, unknown>} opts.roomsData
 * @param {Set<string>} opts.enabledRelTypes
 * @param {string[]} opts.availableRelTypes
 * @param {string} opts.startRoomId
 * @param {string} opts.endRoomId
 */
export function computeGraphRoute(opts) {
  const {
    graphEdges = [],
    roomsData = {},
    enabledRelTypes,
    availableRelTypes,
    startRoomId,
    endRoomId,
  } = opts || {};
  const start = String(startRoomId || '');
  const end = String(endRoomId || '');
  if (!start || !end) {
    return { ok: false, reason: 'missing_endpoint', message: 'Choose a start room and a target room.' };
  }
  const avail = availableRelTypes?.length
    ? availableRelTypes
    : collectRelationshipTypesFromEdges(graphEdges);
  const routingEdges = getRoutingEdgesLikeScene(graphEdges, enabledRelTypes, avail);
  if (!routingEdges.length) {
    return {
      ok: false,
      reason: 'no_edges',
      message: 'No graph edges match the current relationship filters — widen filters or refresh data.',
    };
  }
  const adj = buildRoomAdjacency(routingEdges, roomsData);
  const sp = shortestRoomPath(adj, start, end);
  if (!sp) {
    return {
      ok: false,
      reason: 'no_path',
      message: 'No route through visible edges — try enabling more relationship types or pick different rooms.',
    };
  }
  const pathSceneIds = sp.pathRoomIds.map((rid) => sceneRoomNodeIdFromRoomId(rid)).filter(Boolean);
  if (pathSceneIds.length !== sp.pathRoomIds.length) {
    return { ok: false, reason: 'id_map_failed', message: 'Could not map route to scene nodes.' };
  }
  return {
    ok: true,
    pathRoomIds: sp.pathRoomIds,
    pathSceneIds,
    segmentTypes: sp.segmentTypes,
    segmentEdgeKeys: sp.segmentEdgeKeys,
    hops: Math.max(0, sp.pathRoomIds.length - 1),
    bridges: bridgeRoomIdsAlongPath(sp.pathRoomIds),
    typeCounts: countTypesAlongRoute(sp.segmentTypes),
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
