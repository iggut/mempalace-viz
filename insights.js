/**
 * Derived analytics for MemPalace viz — rankings, graph summaries, insight strings.
 * Pure functions; deterministic given the same inputs.
 *
 * Hot path: canonical `edgesResolved` + `roomId` / `wingId` (see docs/frontend-heuristics.md).
 */

import { makeRoomId, parseRoomId } from './canonical.js';

/** @typedef {{ wing: string, room: string, key: string }} ResolvedRoom */

/**
 * Legacy endpoint resolution when graph endpoints are ambiguous strings (pre-canonical payloads).
 * @param {string|null|undefined} ref
 * @param {Record<string, Array<{ name: string, drawers?: number }>>} roomsData
 * @param {string|null} [hintWing]
 * @returns {ResolvedRoom|null}
 */
export function resolveTunnelEndpoint(ref, roomsData, hintWing = null) {
  if (ref == null || typeof ref !== 'string') return null;
  const s = ref.trim();
  if (!s) return null;

  const canonical = parseRoomId(s);
  if (canonical) {
    const { wingId, roomName } = canonical;
    if (roomsData[wingId]?.some((r) => r.name === roomName)) {
      return { wing: wingId, room: roomName, key: makeRoomId(wingId, roomName) };
    }
  }

  if (s.includes('/')) {
    const slash = s.indexOf('/');
    const wing = s.slice(0, slash);
    const room = s.slice(slash + 1);
    if (roomsData[wing]?.some((r) => r.name === room)) {
      return { wing, room, key: makeRoomId(wing, room) };
    }
    return null;
  }

  const matches = [];
  for (const [w, rooms] of Object.entries(roomsData || {})) {
    if (!Array.isArray(rooms)) continue;
    for (const r of rooms) {
      if (r.name === s) matches.push({ wing: w, room: s, key: `${w}/${s}` });
    }
  }
  if (matches.length === 0) return null;
  if (matches.length === 1) {
    const m = matches[0];
    return { ...m, key: makeRoomId(m.wing, m.room) };
  }
  if (hintWing && matches.some((m) => m.wing === hintWing)) {
    const m = matches.find((x) => x.wing === hintWing) || matches[0];
    return { ...m, key: makeRoomId(m.wing, m.room) };
  }
  const m = matches[0];
  return { ...m, key: makeRoomId(m.wing, m.room) };
}

/**
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges
 * @param {Record<string, unknown>} roomsData
 * @param {number|null} [apiUnresolvedCount] when set, prefer API count
 */
export function countEdgesWithUnresolvedEndpoints(graphEdges, roomsData, apiUnresolvedCount = null) {
  if (apiUnresolvedCount != null && typeof apiUnresolvedCount === 'number') return apiUnresolvedCount;
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const roomData = roomsData && typeof roomsData === 'object' ? roomsData : {};
  let n = 0;
  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomData, null);
    const toR = resolveTunnelEndpoint(e.to, roomData, e.wing || null);
    if (!fromR || !toR) n += 1;
  }
  return n;
}

/**
 * @param {Record<string, unknown>} roomsData
 * @param {Array<{ sourceRoomId: string, targetRoomId: string, sourceWingId: string, targetWingId: string }>} edgesResolved
 * @param {{ crossWingEdgeCount?: number, intraWingEdgeCount?: number, resolvedEdgeCount?: number }|null} graphSummary
 * @param {object|null} overviewStats
 */
function buildGraphAnalyticsCanonical(roomsData, edgesResolved, graphSummary, overviewStats) {
  const roomData = roomsData && typeof roomsData === 'object' ? roomsData : {};
  const edges = Array.isArray(edgesResolved) ? edgesResolved : [];

  const pairKeys = new Set();
  const degreeByKey = new Map();
  const crossByKey = new Map();
  const intraByKey = new Map();
  const neighborsByKey = new Map();

  function addNeighbor(a, b) {
    if (!neighborsByKey.has(a)) neighborsByKey.set(a, new Set());
    neighborsByKey.get(a).add(b);
  }

  function bump(map, key, n = 1) {
    map.set(key, (map.get(key) || 0) + n);
  }

  let crossWingEdgeCount = 0;
  let intraWingEdgeCount = 0;

  for (const e of edges) {
    const a = e.sourceRoomId;
    const b = e.targetRoomId;
    if (!a || !b) continue;
    if (a === b) continue;

    const p = a < b ? `${a}||${b}` : `${b}||${a}`;
    if (pairKeys.has(p)) continue;
    pairKeys.add(p);

    bump(degreeByKey, a);
    bump(degreeByKey, b);

    const cross = e.sourceWingId !== e.targetWingId;
    if (cross) {
      crossWingEdgeCount += 1;
      bump(crossByKey, a);
      bump(crossByKey, b);
    } else {
      intraWingEdgeCount += 1;
      bump(intraByKey, a);
      bump(intraByKey, b);
    }

    addNeighbor(a, b);
    addNeighbor(b, a);
  }

  const endpointsSeen = new Set([...degreeByKey.keys()]);

  const roomKeysAll = new Set();
  for (const [w, rooms] of Object.entries(roomData)) {
    if (!Array.isArray(rooms)) continue;
    for (const r of rooms) {
      roomKeysAll.add(r.roomId || makeRoomId(w, r.name));
    }
  }

  const noTunnelRooms = [];
  for (const key of roomKeysAll) {
    if (!endpointsSeen.has(key)) noTunnelRooms.push(key);
  }

  let totalResolvedEdges = crossWingEdgeCount + intraWingEdgeCount;
  if (graphSummary && typeof graphSummary.resolvedEdgeCount === 'number') {
    totalResolvedEdges = graphSummary.resolvedEdgeCount;
  }

  const crossFraction =
    totalResolvedEdges > 0 ? crossWingEdgeCount / totalResolvedEdges : null;

  const byDegree = [...degreeByKey.entries()].sort((x, y) => y[1] - x[1]);

  let topConnectedRooms = byDegree.slice(0, 8).map(([key, deg]) => {
    const pr = parseRoomId(key);
    return {
      wing: pr?.wingId ?? key.split('/')[0],
      room: pr?.roomName ?? key.slice(key.indexOf('/') + 1),
      key,
      degree: deg,
    };
  });

  if (overviewStats?.topConnectedRooms?.length) {
    topConnectedRooms = overviewStats.topConnectedRooms.slice(0, 8).map((x) => ({
      wing: x.wingId,
      room: x.name,
      key: x.roomId,
      degree: x.degree,
    }));
  }

  const wingExternalTally = new Map();
  for (const e of edges) {
    if (e.sourceWingId === e.targetWingId) continue;
    bump(wingExternalTally, e.sourceWingId);
    bump(wingExternalTally, e.targetWingId);
  }
  const topCrossLinkedWings = [...wingExternalTally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([wing, count]) => ({ wing, crossEdges: count }));

  const medianDegree = medianOfMap(degreeByKey);

  const crossFromSummary =
    graphSummary && typeof graphSummary.crossWingEdgeCount === 'number' ? graphSummary.crossWingEdgeCount : null;
  const intraFromSummary =
    graphSummary && typeof graphSummary.intraWingEdgeCount === 'number' ? graphSummary.intraWingEdgeCount : null;

  return {
    edgeCount: edges.length,
    resolvedEdgeCount: totalResolvedEdges,
    crossWingEdgeCount: crossFromSummary ?? crossWingEdgeCount,
    intraWingEdgeCount: intraFromSummary ?? intraWingEdgeCount,
    byRelationshipType: graphSummary?.byType && typeof graphSummary.byType === 'object' ? { ...graphSummary.byType } : null,
    crossFraction,
    degreeByKey,
    crossByKey,
    intraByKey,
    neighborsByKey,
    topConnectedRooms,
    topCrossLinkedWings,
    roomsWithNoTunnels:
      typeof overviewStats?.roomsWithNoLinks === 'number' ? overviewStats.roomsWithNoLinks : noTunnelRooms.length,
    noTunnelRoomKeys: noTunnelRooms.slice(0, 50),
    medianRoomDegree: medianDegree,
    hasResolvableEdges: totalResolvedEdges > 0,
  };
}

/**
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges
 * @param {Record<string, unknown>} roomsData
 */
function buildGraphAnalyticsLegacy(graphEdges, roomsData, graphSummary, overviewStats) {
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const roomData = roomsData && typeof roomsData === 'object' ? roomsData : {};

  const pairKeys = new Set();
  const degreeByKey = new Map();
  const crossByKey = new Map();
  const intraByKey = new Map();
  const neighborsByKey = new Map();

  function addNeighbor(a, b) {
    if (!neighborsByKey.has(a)) neighborsByKey.set(a, new Set());
    neighborsByKey.get(a).add(b);
  }

  function bump(map, key, n = 1) {
    map.set(key, (map.get(key) || 0) + n);
  }

  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomData, null);
    const toR = resolveTunnelEndpoint(e.to, roomData, e.wing || null);
    if (!fromR || !toR) continue;

    const a = fromR.key;
    const b = toR.key;
    if (a === b) continue;

    const p = a < b ? `${a}||${b}` : `${b}||${a}`;
    if (pairKeys.has(p)) continue;
    pairKeys.add(p);

    bump(degreeByKey, a);
    bump(degreeByKey, b);

    const cross = fromR.wing !== toR.wing;
    if (cross) {
      bump(crossByKey, a);
      bump(crossByKey, b);
    } else {
      bump(intraByKey, a);
      bump(intraByKey, b);
    }

    addNeighbor(a, b);
    addNeighbor(b, a);
  }

  const roomKeysAll = new Set();
  for (const [w, rooms] of Object.entries(roomData)) {
    if (!Array.isArray(rooms)) continue;
    for (const r of rooms) {
      roomKeysAll.add(makeRoomId(w, r.name));
    }
  }

  const noTunnelRooms = [];
  for (const key of roomKeysAll) {
    if (!degreeByKey.has(key)) noTunnelRooms.push(key);
  }

  let crossWingEdgeCount = 0;
  let intraWingEdgeCount = 0;
  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomData, null);
    const toR = resolveTunnelEndpoint(e.to, roomData, e.wing || null);
    if (!fromR || !toR) continue;
    if (fromR.wing !== toR.wing) crossWingEdgeCount += 1;
    else intraWingEdgeCount += 1;
  }

  const totalResolvedEdges = crossWingEdgeCount + intraWingEdgeCount;
  const crossFraction =
    totalResolvedEdges > 0 ? crossWingEdgeCount / totalResolvedEdges : null;

  const byDegree = [...degreeByKey.entries()].sort((x, y) => y[1] - x[1]);
  let topConnectedRooms = byDegree.slice(0, 8).map(([key, deg]) => {
    const pr = parseRoomId(key);
    return {
      wing: pr?.wingId ?? key.split('/')[0],
      room: pr?.roomName ?? key.slice(key.indexOf('/') + 1),
      key,
      degree: deg,
    };
  });

  if (overviewStats?.topConnectedRooms?.length) {
    topConnectedRooms = overviewStats.topConnectedRooms.slice(0, 8).map((x) => ({
      wing: x.wingId,
      room: x.name,
      key: x.roomId,
      degree: x.degree,
    }));
  }

  const wingExternalTally = new Map();
  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomData, null);
    const toR = resolveTunnelEndpoint(e.to, roomData, e.wing || null);
    if (!fromR || !toR || fromR.wing === toR.wing) continue;
    bump(wingExternalTally, fromR.wing);
    bump(wingExternalTally, toR.wing);
  }
  const topCrossLinkedWings = [...wingExternalTally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([wing, count]) => ({ wing, crossEdges: count }));

  const medianDegree = medianOfMap(degreeByKey);

  const crossFromSummary =
    graphSummary && typeof graphSummary.crossWingEdgeCount === 'number' ? graphSummary.crossWingEdgeCount : null;
  const intraFromSummary =
    graphSummary && typeof graphSummary.intraWingEdgeCount === 'number' ? graphSummary.intraWingEdgeCount : null;

  return {
    edgeCount: edges.length,
    resolvedEdgeCount: totalResolvedEdges,
    crossWingEdgeCount: crossFromSummary ?? crossWingEdgeCount,
    intraWingEdgeCount: intraFromSummary ?? intraWingEdgeCount,
    crossFraction,
    degreeByKey,
    crossByKey,
    intraByKey,
    neighborsByKey,
    topConnectedRooms,
    topCrossLinkedWings,
    roomsWithNoTunnels:
      typeof overviewStats?.roomsWithNoLinks === 'number' ? overviewStats.roomsWithNoLinks : noTunnelRooms.length,
    noTunnelRoomKeys: noTunnelRooms.slice(0, 50),
    medianRoomDegree: medianDegree,
    hasResolvableEdges: totalResolvedEdges > 0,
  };
}

/**
 * @param {Record<string, unknown>} roomsData
 * @param {object} [ctx]
 * @param {Array} [ctx.edgesResolved]
 * @param {Array} [ctx.graphEdges] legacy `{ from, to, wing }` shapes
 * @param {object|null} [ctx.graphSummary] graph-stats `summary`
 * @param {object|null} [ctx.overviewStats] `/api/overview` stats
 */
export function buildGraphAnalytics(roomsData, ctx = {}) {
  const { edgesResolved, graphEdges, graphSummary = null, overviewStats = null } = ctx;
  if (edgesResolved?.length) {
    return buildGraphAnalyticsCanonical(roomsData, edgesResolved, graphSummary, overviewStats);
  }
  return buildGraphAnalyticsLegacy(graphEdges || [], roomsData, graphSummary, overviewStats);
}

function medianOfMap(map) {
  const vals = [...map.values()].sort((a, b) => a - b);
  if (!vals.length) return null;
  const mid = Math.floor(vals.length / 2);
  return vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
}

/**
 * @param {string} roomKey canonical `roomId`
 * @param {ReturnType<typeof buildGraphAnalytics>} ga
 */
export function getRoomGraphSlice(roomKey, ga) {
  if (!ga || !roomKey) return null;
  const deg = ga.degreeByKey.get(roomKey) ?? 0;
  const cross = ga.crossByKey.get(roomKey) ?? 0;
  const intra = ga.intraByKey.get(roomKey) ?? 0;
  const nbrs = ga.neighborsByKey.get(roomKey);
  const neighborKeys = nbrs ? [...nbrs] : [];
  const relatedRooms = neighborKeys.slice(0, 12).map((k) => {
    const pr = parseRoomId(k);
    const od = ga.degreeByKey.get(k) ?? 0;
    return {
      wing: pr?.wingId ?? k.split('/')[0],
      room: pr?.roomName ?? k.slice(k.indexOf('/') + 1),
      key: k,
      degree: od,
    };
  });
  relatedRooms.sort((a, b) => b.degree - a.degree);

  const neighborWings = new Map();
  for (const k of neighborKeys) {
    const w = parseRoomId(k)?.wingId;
    if (!w) continue;
    neighborWings.set(w, (neighborWings.get(w) || 0) + 1);
  }
  const topWings = [...neighborWings.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([wing, n]) => ({ wing, links: n }));

  return {
    degree: deg,
    crossWingLinks: cross,
    intraWingLinks: intra,
    medianDegree: ga.medianRoomDegree,
    relatedRooms: relatedRooms.slice(0, 8),
    relatedWings: topWings,
    isBridge: cross >= 1 && neighborKeys.length > 0,
  };
}

/**
 * @param {string} wingId
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges legacy
 * @param {Record<string, unknown>} roomsData
 * @param {Array|null} [edgesResolved] canonical edges when available
 */
export function getWingTunnelSlice(wingId, graphEdges, roomsData, edgesResolved = null) {
  if (edgesResolved?.length) {
    return getWingTunnelSliceCanonical(wingId, edgesResolved);
  }
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const externalWings = new Map();
  let touchCount = 0;

  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomsData, wingId);
    const toR = resolveTunnelEndpoint(e.to, roomsData, e.wing || null);
    if (!fromR || !toR) continue;
    if (fromR.wing === toR.wing) continue;
    if (fromR.wing !== wingId && toR.wing !== wingId) continue;

    touchCount += 1;
    const other = fromR.wing === wingId ? toR : fromR;
    externalWings.set(other.wing, (externalWings.get(other.wing) || 0) + 1);
  }

  const topExternal = [...externalWings.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w, n]) => ({ wing: w, edges: n }));

  const roomsInWing = new Map();
  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomsData, wingId);
    const toR = resolveTunnelEndpoint(e.to, roomsData, e.wing || null);
    if (!fromR || !toR) continue;
    if (fromR.wing === wingId && toR.wing !== wingId) {
      roomsInWing.set(fromR.key, (roomsInWing.get(fromR.key) || 0) + 1);
    }
    if (toR.wing === wingId && fromR.wing !== wingId) {
      roomsInWing.set(toR.key, (roomsInWing.get(toR.key) || 0) + 1);
    }
  }
  const topRoomsInternal = [...roomsInWing.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, n]) => {
      const pr = parseRoomId(key);
      return {
        wing: pr?.wingId ?? key.split('/')[0],
        room: pr?.roomName ?? key.slice(key.indexOf('/') + 1),
        key,
        crossEdges: n,
      };
    });

  return {
    crossWingTouches: touchCount,
    topExternalWings: topExternal,
    topRoomsByCrossWing: topRoomsInternal,
  };
}

/**
 * @param {string} wingId
 * @param {Array<{ sourceRoomId: string, targetRoomId: string, sourceWingId: string, targetWingId: string }>} edgesResolved
 */
function getWingTunnelSliceCanonical(wingId, edgesResolved) {
  const externalWings = new Map();
  let touchCount = 0;

  for (const e of edgesResolved) {
    if (e.sourceWingId === e.targetWingId) continue;
    if (e.sourceWingId !== wingId && e.targetWingId !== wingId) continue;
    touchCount += 1;
    const other = e.sourceWingId === wingId ? e.targetWingId : e.sourceWingId;
    externalWings.set(other, (externalWings.get(other) || 0) + 1);
  }

  const topExternal = [...externalWings.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w, n]) => ({ wing: w, edges: n }));

  const roomsInWing = new Map();
  for (const e of edgesResolved) {
    if (e.sourceWingId === e.targetWingId) continue;
    if (e.sourceWingId === wingId && e.targetWingId !== wingId) {
      roomsInWing.set(e.sourceRoomId, (roomsInWing.get(e.sourceRoomId) || 0) + 1);
    }
    if (e.targetWingId === wingId && e.sourceWingId !== wingId) {
      roomsInWing.set(e.targetRoomId, (roomsInWing.get(e.targetRoomId) || 0) + 1);
    }
  }
  const topRoomsInternal = [...roomsInWing.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, n]) => {
      const pr = parseRoomId(key);
      return {
        wing: pr?.wingId ?? key.split('/')[0],
        room: pr?.roomName ?? key.slice(key.indexOf('/') + 1),
        key,
        crossEdges: n,
      };
    });

  return {
    crossWingTouches: touchCount,
    topExternalWings: topExternal,
    topRoomsByCrossWing: topRoomsInternal,
  };
}

export function countTotalRooms(roomsData) {
  let n = 0;
  for (const rooms of Object.values(roomsData || {})) {
    if (Array.isArray(rooms)) n += rooms.length;
  }
  return n;
}

export function sumDrawerCountsInWing(roomsData, wing) {
  const rooms = roomsData?.[wing];
  if (!Array.isArray(rooms)) return 0;
  return rooms.reduce((a, r) => a + (Number(r.drawers) || 0), 0);
}

export function totalDrawersAcrossWings(wingsData) {
  let t = 0;
  for (const v of Object.values(wingsData || {})) {
    if (typeof v === 'number') t += v;
  }
  return t;
}

export function rankWingsByDrawers(wingsData) {
  const entries = Object.entries(wingsData || {}).filter(([, v]) => typeof v === 'number');
  entries.sort((a, b) => b[1] - a[1]);
  return entries.map(([wing, drawers], i) => ({ wing, rank: i + 1, drawers }));
}

export function rankWingsByRoomCount(roomsData) {
  const counts = Object.entries(roomsData || {}).map(([wing, rooms]) => ({
    wing,
    roomCount: Array.isArray(rooms) ? rooms.length : 0,
  }));
  counts.sort((a, b) => b.roomCount - a.roomCount);
  return counts.map((c, i) => ({ ...c, rank: i + 1 }));
}

export function rankRoomsInWingByDrawers(roomsData, wing) {
  const rooms = roomsData?.[wing];
  if (!Array.isArray(rooms)) return [];
  const sorted = [...rooms].sort((a, b) => (b.drawers || 0) - (a.drawers || 0));
  return sorted.map((r, i) => ({ ...r, rank: i + 1 }));
}

export function ordinal(n) {
  const k = n % 10;
  const j = n % 100;
  if (j >= 11 && j <= 13) return `${n}th`;
  if (k === 1) return `${n}st`;
  if (k === 2) return `${n}nd`;
  if (k === 3) return `${n}rd`;
  return `${n}th`;
}

export function formatPct(part, whole, digits = 1) {
  if (whole == null || whole <= 0 || part == null) return null;
  return (100 * (Number(part) / whole)).toFixed(digits);
}

/**
 * Deterministic room-level insight from drawers + graph slice.
 * @param {{ drawers?: number, wingRoomSum?: number, palaceTotal?: number }} size
 * @param {{ degree: number, crossWingLinks: number, intraWingLinks: number, medianDegree?: number|null }} graph
 */
export function characterizeRoom(
  { drawers = 0, wingRoomSum, palaceTotal },
  graph,
  graphAvailable,
) {
  const deg = graph?.degree ?? 0;
  const cross = graph?.crossWingLinks ?? 0;
  const intra = graph?.intraWingLinks ?? 0;
  const med = graph?.medianDegree ?? null;

  const large = wingRoomSum > 0 && drawers >= wingRoomSum * 0.2;
  const small = wingRoomSum > 0 && drawers <= wingRoomSum * 0.05 && drawers > 0;
  const highDeg = med != null && deg >= med * 2 && deg >= 2;
  const lowDeg = deg === 0;

  if (!graphAvailable) {
    return {
      label: 'Tunnel graph unavailable',
      detail: 'No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty.',
    };
  }
  if (lowDeg) {
    return {
      label: 'Isolated room',
      detail: 'This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints).',
    };
  }
  if (cross >= 2 && highDeg) {
    return { label: 'Dense cross-wing connector', detail: 'High tunnel degree with multiple cross-wing links.' };
  }
  if (cross >= 1 && highDeg) {
    return { label: 'Highly connected hub', detail: 'Above-average tunnel degree with cross-wing reach.' };
  }
  if (cross >= 1 && intra <= 1) {
    return { label: 'Cross-wing bridge', detail: 'Most links span outside this wing.' };
  }
  if (large && deg <= (med || 1)) {
    return { label: 'Large but weakly connected', detail: 'Many drawers relative to the wing, few tunnel links.' };
  }
  if (small && highDeg) {
    return { label: 'Small but structurally important', detail: 'Fewer drawers than peers, but high connectivity.' };
  }
  if (highDeg) {
    return { label: 'Highly connected hub', detail: med != null ? `Degree ${deg} vs median ${med}.` : `Degree ${deg}.` };
  }
  if (palaceTotal > 0 && drawers / palaceTotal >= 0.08 && deg < 2) {
    return { label: 'Major archive, few tunnels', detail: 'Large share of palace drawers with sparse tunnels.' };
  }
  return { label: 'Balanced footprint', detail: 'Typical size and connectivity for this palace.' };
}

/**
 * @param {object} ctx
 * @param {string} viewId
 */
export function buildOverviewModel(ctx, viewId) {
  const {
    totalDrawers,
    wingCount,
    roomCount,
    tunnelNodeCount,
    graphEdgeCount,
    kgAvailable,
    kgSummary,
    ga,
    wingsData,
  } = ctx;

  const largestWingsByDrawers = rankWingsByDrawers(wingsData).slice(0, 5);

  const viewHints = {
    wings: 'Wing spheres are sized by drawer count. Click a wing to open its rooms.',
    rooms: ctx.focusWing
      ? `Focused on “${ctx.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`
      : 'Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.',
    graph: 'Force-directed graph. Edges combine tunnel links and same-wing taxonomy adjacency.',
  };

  let graphBlurb = '';
  if (!ga.hasResolvableEdges && graphEdgeCount === 0) {
    graphBlurb = 'No graph edges loaded.';
  } else if (!ga.hasResolvableEdges) {
    graphBlurb =
      'Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).';
  } else if (ga.crossFraction != null) {
    graphBlurb =
      ga.crossFraction >= 0.5
        ? 'Cross-wing tunnel links account for a large share of resolved graph edges.'
        : 'Resolved edges mix same-wing taxonomy adjacency with cross-wing tunnels.';
  }

  return {
    totalDrawers,
    wingCount,
    roomCount,
    tunnelNodeCount,
    graphEdgeCount,
    crossWingEdges: ga.crossWingEdgeCount,
    kgAvailable,
    kgSummary,
    largestWingsByDrawers,
    mostConnectedRooms: ga.topConnectedRooms.slice(0, 5),
    mostCrossLinkedWings: ga.topCrossLinkedWings.slice(0, 5),
    roomsWithNoTunnels: ga.roomsWithNoTunnels,
    viewHint: viewHints[viewId] || viewHints.wings,
    graphBlurb,
    ga,
  };
}
