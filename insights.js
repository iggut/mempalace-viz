/**
 * Derived analytics for MemPalace viz — rankings, graph summaries, insight strings.
 * Pure functions; deterministic given the same inputs.
 */

/** @typedef {{ wing: string, room: string, key: string }} ResolvedRoom */

/**
 * @param {string|null|undefined} ref
 * @param {Record<string, Array<{ name: string, drawers?: number }>>} roomsData
 * @param {string|null} [hintWing]
 * @returns {ResolvedRoom|null}
 */
export function resolveTunnelEndpoint(ref, roomsData, hintWing = null) {
  if (ref == null || typeof ref !== 'string') return null;
  const s = ref.trim();
  if (!s) return null;

  if (s.includes('/')) {
    const slash = s.indexOf('/');
    const wing = s.slice(0, slash);
    const room = s.slice(slash + 1);
    if (roomsData[wing]?.some((r) => r.name === room)) {
      return { wing, room, key: `${wing}/${room}` };
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
  if (matches.length === 1) return matches[0];
  if (hintWing && matches.some((m) => m.wing === hintWing)) {
    return matches.find((m) => m.wing === hintWing) || matches[0];
  }
  return matches[0];
}

/**
 * Count graph edges where at least one endpoint does not resolve to taxonomy (for diagnostics).
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges
 * @param {Record<string, unknown>} roomsData
 */
export function countEdgesWithUnresolvedEndpoints(graphEdges, roomsData) {
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
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges
 * @param {Record<string, unknown>} roomsData
 */
export function buildGraphAnalytics(graphEdges, roomsData) {
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const roomData = roomsData && typeof roomsData === 'object' ? roomsData : {};

  /** undirected unique pairs + per-endpoint stats */
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

  const endpointsSeen = new Set([...degreeByKey.keys()]);

  const roomKeysAll = new Set();
  for (const [w, rooms] of Object.entries(roomData)) {
    if (!Array.isArray(rooms)) continue;
    for (const r of rooms) {
      roomKeysAll.add(`${w}/${r.name}`);
    }
  }

  const noTunnelRooms = [];
  for (const key of roomKeysAll) {
    if (!endpointsSeen.has(key)) noTunnelRooms.push(key);
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
  const topConnectedRooms = byDegree.slice(0, 8).map(([key, deg]) => {
    const [w, room] = key.split('/');
    return { wing: w, room, key, degree: deg };
  });

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

  return {
    edgeCount: edges.length,
    resolvedEdgeCount: totalResolvedEdges,
    crossWingEdgeCount,
    intraWingEdgeCount,
    crossFraction,
    degreeByKey,
    crossByKey,
    intraByKey,
    neighborsByKey,
    topConnectedRooms,
    topCrossLinkedWings,
    roomsWithNoTunnels: noTunnelRooms.length,
    noTunnelRoomKeys: noTunnelRooms.slice(0, 50),
    medianRoomDegree: medianDegree,
    hasResolvableEdges: totalResolvedEdges > 0,
  };
}

function medianOfMap(map) {
  const vals = [...map.values()].sort((a, b) => a - b);
  if (!vals.length) return null;
  const mid = Math.floor(vals.length / 2);
  return vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
}

/**
 * @param {string} roomKey `wing/room`
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
    const [w, room] = k.split('/');
    const od = ga.degreeByKey.get(k) ?? 0;
    return { wing: w, room, key: k, degree: od };
  });
  relatedRooms.sort((a, b) => b.degree - a.degree);

  const neighborWings = new Map();
  for (const k of neighborKeys) {
    const [w] = k.split('/');
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
 * @param {string} wing
 * @param {Array<{ from: string, to: string, wing?: string }>} graphEdges
 * @param {Record<string, unknown>} roomsData
 */
export function getWingTunnelSlice(wing, graphEdges, roomsData) {
  const edges = Array.isArray(graphEdges) ? graphEdges : [];
  const externalWings = new Map();
  let touchCount = 0;

  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomsData, wing);
    const toR = resolveTunnelEndpoint(e.to, roomsData, e.wing || null);
    if (!fromR || !toR) continue;
    if (fromR.wing === toR.wing) continue;
    if (fromR.wing !== wing && toR.wing !== wing) continue;

    touchCount += 1;
    const other = fromR.wing === wing ? toR : fromR;
    externalWings.set(other.wing, (externalWings.get(other.wing) || 0) + 1);
  }

  const topExternal = [...externalWings.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w, n]) => ({ wing: w, edges: n }));

  const roomsInWing = new Map();
  for (const e of edges) {
    const fromR = resolveTunnelEndpoint(e.from, roomsData, wing);
    const toR = resolveTunnelEndpoint(e.to, roomsData, e.wing || null);
    if (!fromR || !toR) continue;
    if (fromR.wing === wing && toR.wing !== wing) {
      roomsInWing.set(fromR.key, (roomsInWing.get(fromR.key) || 0) + 1);
    }
    if (toR.wing === wing && fromR.wing !== wing) {
      roomsInWing.set(toR.key, (roomsInWing.get(toR.key) || 0) + 1);
    }
  }
  const topRoomsInternal = [...roomsInWing.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, n]) => {
      const [w, room] = key.split('/');
      return { wing: w, room, key, crossEdges: n };
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
    graph: 'Force-directed tunnel graph. Edges show MemPalace relationships between rooms.',
  };

  let graphBlurb = '';
  if (!ga.hasResolvableEdges && graphEdgeCount === 0) {
    graphBlurb = 'No tunnel edges loaded.';
  } else if (!ga.hasResolvableEdges) {
    graphBlurb =
      'Tunnel metadata is present but endpoints could not be matched to taxonomy rooms (check naming).';
  } else if (ga.crossFraction != null) {
    graphBlurb =
      ga.crossFraction >= 0.5
        ? 'Cross-wing connections dominate the resolved tunnel edges.'
        : 'Most resolved tunnel edges stay within the same wing.';
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
