/**
 * Canonical wing/room IDs and graph edge resolution for MemPalace viz.
 * Pure functions — safe in browser and Node.
 */

/** @typedef {{ wingId: string, name: string, drawerCount: number, roomCount: number, rooms?: unknown[] }} WingRecord */
/** @typedef {{ roomId: string, wingId: string, name: string, drawerCount: number }} RoomRecord */
/** @typedef {{ edgeId: string, sourceRoomId: string, targetRoomId: string, sourceWingId: string, targetWingId: string, crossWing: boolean, weight: number }} CanonicalEdge */

const SLASH_PLACEHOLDER = '\u2215'; // division slash — avoids collision with wing/room separator

/**
 * Stable wing identifier: MemPalace uses wing keys from Chroma as-is.
 * @param {string} wingKey
 */
export function canonicalWingId(wingKey) {
  return String(wingKey ?? '').trim() || 'unknown';
}

/**
 * Escape `/` in room names so roomId splits unambiguously.
 * @param {string} roomName
 */
export function escapeRoomSegment(roomName) {
  return String(roomName ?? '').replace(/\//g, SLASH_PLACEHOLDER);
}

export function unescapeRoomSegment(segment) {
  return String(segment ?? '').replace(new RegExp(SLASH_PLACEHOLDER, 'g'), '/');
}

/**
 * Globally unique room id: `wingId/roomName` (room segment escaped).
 * @param {string} wingId
 * @param {string} roomName
 */
export function makeRoomId(wingId, roomName) {
  return `${canonicalWingId(wingId)}/${escapeRoomSegment(roomName)}`;
}

/**
 * @param {string} roomId
 * @returns {{ wingId: string, roomName: string } | null}
 */
export function parseRoomId(roomId) {
  const s = String(roomId || '');
  const i = s.indexOf('/');
  if (i <= 0) return null;
  return {
    wingId: s.slice(0, i),
    roomName: unescapeRoomSegment(s.slice(i + 1)),
  };
}

/** Same rules as normalizeWingsPayload in api.js — shared for server + client */
export function normalizeWingsPayload(raw) {
  if (!raw || typeof raw !== 'object') return {};
  if (raw.wings && typeof raw.wings === 'object' && !Array.isArray(raw.wings)) {
    return { ...raw.wings };
  }
  const skip = new Set(['error', 'message', 'ok']);
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    if (skip.has(k)) continue;
    if (typeof v === 'number') out[k] = v;
  }
  return Object.keys(out).length ? out : {};
}

/**
 * Build taxonomy object + roomsData (wing → room rows) with canonical ids.
 * @param {object} taxonomyRaw — MCP shape `{ taxonomy: { wing: { room: count }}}` or legacy `{ wing: ... }`
 */
export function parseTaxonomyCanonical(taxonomyRaw) {
  let root = taxonomyRaw;
  if (root?.taxonomy && typeof root.taxonomy === 'object') {
    root = root.taxonomy;
  }
  if (typeof root === 'string') {
    try {
      root = JSON.parse(root);
    } catch {
      root = {};
    }
  }
  const taxonomy = root && typeof root === 'object' ? root : {};
  /** @type {Record<string, Array<{ name: string, drawers: number, roomId: string, wingId: string }>>} */
  const roomsData = {};
  /** @type {RoomRecord[]} */
  const rooms = [];
  /** @type {WingRecord[]} */
  const wings = [];

  for (const [wingKey, roomsObj] of Object.entries(taxonomy)) {
    const wingId = canonicalWingId(wingKey);
    if (!roomsData[wingId]) roomsData[wingId] = [];
    let wingDrawerCount = 0;
    let roomCount = 0;
    if (roomsObj && typeof roomsObj === 'object' && !Array.isArray(roomsObj)) {
      for (const [roomName, count] of Object.entries(roomsObj)) {
        const drawerCount = typeof count === 'number' ? count : 1;
        const roomId = makeRoomId(wingId, roomName);
        const row = {
          name: roomName,
          drawers: drawerCount,
          roomId,
          wingId,
        };
        roomsData[wingId].push(row);
        rooms.push({
          roomId,
          wingId,
          name: roomName,
          drawerCount,
        });
        wingDrawerCount += drawerCount;
        roomCount += 1;
      }
    }
    wings.push({
      wingId,
      name: wingId,
      drawerCount: wingDrawerCount,
      roomCount,
      rooms: roomsData[wingId],
    });
  }

  wings.sort((a, b) => b.drawerCount - a.drawerCount);
  rooms.sort((a, b) => b.drawerCount - a.drawerCount);

  return { taxonomy, roomsData, rooms, wings };
}

/**
 * @param {object} roomIndex — wing → roomName → true (from taxonomy)
 */
export function roomExistsInTaxonomy(roomIndex, wingId, roomName) {
  const w = roomIndex[wingId];
  return !!(w && Object.prototype.hasOwnProperty.call(w, roomName));
}

/**
 * Build wing/room nested index for existence checks.
 * @param {Record<string, Record<string, number>>} taxonomy
 */
export function buildTaxonomyRoomIndex(taxonomy) {
  /** @type {Record<string, Record<string, boolean>>} */
  const idx = {};
  for (const [w, rooms] of Object.entries(taxonomy || {})) {
    const wingId = canonicalWingId(w);
    if (!rooms || typeof rooms !== 'object') continue;
    if (!idx[wingId]) idx[wingId] = {};
    for (const roomName of Object.keys(rooms)) {
      idx[wingId][roomName] = true;
    }
  }
  return idx;
}

/**
 * Expand MemPalace `find_tunnels` entries into canonical undirected unique edges.
 * @param {Array<{ room?: string, wings?: string[] }>} tunnelRows
 * @param {Record<string, Record<string, number>>} taxonomy
 */
export function buildCanonicalEdgesFromTunnels(tunnelRows, taxonomy) {
  const roomIndex = buildTaxonomyRoomIndex(taxonomy);
  /** @type {CanonicalEdge[]} */
  const edgesResolved = [];
  /** @type {Array<{ rawSource: string, rawTarget: string, reason: string, detail?: string }>} */
  const edgesUnresolved = [];
  const seen = new Set();

  const list = Array.isArray(tunnelRows) ? tunnelRows : [];

  for (const row of list) {
    const roomName = row?.room;
    const wings = row?.wings;
    if (!roomName || !Array.isArray(wings) || wings.length < 2) continue;

    for (let i = 0; i < wings.length; i += 1) {
      for (let j = i + 1; j < wings.length; j += 1) {
        const wa = canonicalWingId(wings[i]);
        const wb = canonicalWingId(wings[j]);
        const ida = makeRoomId(wa, roomName);
        const idb = makeRoomId(wb, roomName);

        const okA = roomExistsInTaxonomy(roomIndex, wa, roomName);
        const okB = roomExistsInTaxonomy(roomIndex, wb, roomName);
        if (!okA || !okB) {
          edgesUnresolved.push({
            rawSource: `${wa}/${roomName}`,
            rawTarget: `${wb}/${roomName}`,
            reason: 'missing_in_taxonomy',
            detail: !okA && !okB ? 'both_endpoints' : !okA ? 'source' : 'target',
          });
          continue;
        }

        const stable = ida < idb ? [ida, idb, wa, wb] : [idb, ida, wb, wa];
        const [sId, tId, sW, tW] = stable;
        const pairKey = `${sId}||${tId}`;
        if (seen.has(pairKey)) continue;
        seen.add(pairKey);

        const weight = typeof row.count === 'number' && row.count > 0 ? Math.min(32, 1 + Math.log1p(row.count)) : 1;

        edgesResolved.push({
          edgeId: `${sId}__${tId}`,
          sourceRoomId: sId,
          targetRoomId: tId,
          sourceWingId: sW,
          targetWingId: tW,
          crossWing: sW !== tW,
          weight,
        });
      }
    }
  }

  let crossWingEdgeCount = 0;
  let intraWingEdgeCount = 0;
  for (const e of edgesResolved) {
    if (e.crossWing) crossWingEdgeCount += 1;
    else intraWingEdgeCount += 1;
  }

  return {
    edgesResolved,
    edgesUnresolved,
    summary: {
      resolvedEdgeCount: edgesResolved.length,
      unresolvedEdgeCount: edgesUnresolved.length,
      crossWingEdgeCount,
      intraWingEdgeCount,
    },
  };
}

/**
 * Derive legacy `{ from, to, wing }` edges for older layout code.
 * @param {CanonicalEdge[]} edgesResolved
 */
export function toLegacyGraphEdges(edgesResolved) {
  return edgesResolved.map((e) => ({
    from: e.sourceRoomId,
    to: e.targetRoomId,
    wing: e.sourceWingId,
    sourceRoomId: e.sourceRoomId,
    targetRoomId: e.targetRoomId,
    sourceWingId: e.sourceWingId,
    targetWingId: e.targetWingId,
    crossWing: e.crossWing,
    edgeId: e.edgeId,
  }));
}

/**
 * Neighbor and bridge metrics per roomId.
 * @param {CanonicalEdge[]} edgesResolved
 */
export function computeRoomGraphMetrics(edgesResolved) {
  /** @type {Map<string, { neighborCount: number, crossWingNeighborCount: number, intraWingNeighborCount: number, isBridge: boolean }>} */
  const byRoom = new Map();

  function bump(roomId, wingId, otherWingId) {
    if (!byRoom.has(roomId)) {
      byRoom.set(roomId, {
        neighborCount: 0,
        crossWingNeighborCount: 0,
        intraWingNeighborCount: 0,
        isBridge: false,
      });
    }
    const m = byRoom.get(roomId);
    m.neighborCount += 1;
    if (wingId !== otherWingId) {
      m.crossWingNeighborCount += 1;
      m.isBridge = true;
    } else {
      m.intraWingNeighborCount += 1;
    }
  }

  for (const e of edgesResolved) {
    bump(e.sourceRoomId, e.sourceWingId, e.targetWingId);
    bump(e.targetRoomId, e.targetWingId, e.sourceWingId);
  }

  return byRoom;
}

/**
 * Attach neighbor metrics and rank within wing.
 * @param {RoomRecord[]} rooms
 * @param {Map<string, { neighborCount: number, crossWingNeighborCount: number, intraWingNeighborCount: number, isBridge: boolean }>} metrics
 */
export function enrichRoomsWithGraphMetrics(rooms, metrics) {
  const byWing = new Map();
  for (const r of rooms) {
    if (!byWing.has(r.wingId)) byWing.set(r.wingId, []);
    byWing.get(r.wingId).push(r);
  }
  for (const [, list] of byWing) {
    list.sort((a, b) => b.drawerCount - a.drawerCount);
    list.forEach((r, i) => {
      r.rankInWingByDrawers = i + 1;
    });
  }

  return rooms.map((r) => {
    const m = metrics.get(r.roomId);
    return {
      ...r,
      neighborCount: m?.neighborCount ?? 0,
      crossWingNeighborCount: m?.crossWingNeighborCount ?? 0,
      intraWingNeighborCount: m?.intraWingNeighborCount ?? 0,
      isBridge: m?.isBridge ?? false,
    };
  });
}

/**
 * @param {Record<string, number>} wingsData
 * @param {RoomRecord[]} rooms
 * @param {CanonicalEdge[]} edgesResolved
 * @param {{ resolvedEdgeCount: number, unresolvedEdgeCount: number, crossWingEdgeCount: number, intraWingEdgeCount: number }} graphSummary
 * @param {{ total_drawers?: number }} [status]
 */
/**
 * Enrich MCP `mempalace_list_rooms` JSON with canonical ids (wing filter required for stable ids).
 * @param {object} mcpResult — `{ wing, rooms: { roomName: count } }`
 * @param {string | null} wingParam — query param `wing`
 */
export function enrichRoomsListPayload(mcpResult, wingParam) {
  const rooms = mcpResult?.rooms || {};
  const wing = wingParam || null;
  const out = {
    ...mcpResult,
    wingId: wing ? canonicalWingId(wing) : null,
    roomsCanonical: null,
    _note: null,
  };
  if (!wing) {
    out._note = 'roomsCanonical is only populated when wing= is set (all-wings response merges names).';
    return out;
  }
  const wingId = canonicalWingId(wing);
  out.roomsCanonical = Object.entries(rooms).map(([name, count]) => ({
    name,
    drawerCount: typeof count === 'number' ? count : 1,
    roomId: makeRoomId(wingId, name),
    wingId,
  }));
  return out;
}

export function buildOverviewSummary(wingsData, rooms, edgesResolved, graphSummary, status = {}) {
  const totalDrawers =
    typeof status.total_drawers === 'number'
      ? status.total_drawers
      : Object.values(wingsData || {}).reduce((a, v) => a + (typeof v === 'number' ? v : 0), 0);

  const wingCount = Object.keys(wingsData || {}).length;
  const roomCount = rooms.length;

  const metrics = computeRoomGraphMetrics(edgesResolved);
  const withDeg = rooms.map((r) => ({
    roomId: r.roomId,
    wingId: r.wingId,
    name: r.name,
    degree: metrics.get(r.roomId)?.neighborCount ?? 0,
  }));
  const topConnectedRooms = [...withDeg].sort((a, b) => b.degree - a.degree).slice(0, 12);

  const wingPairs = new Map();
  for (const e of edgesResolved) {
    if (!e.crossWing) continue;
    const a = e.sourceWingId;
    const b = e.targetWingId;
    const key = a < b ? `${a}||${b}` : `${b}||${a}`;
    wingPairs.set(key, (wingPairs.get(key) || 0) + 1);
  }
  const topCrossLinkedWings = [...wingPairs.entries()]
    .sort((x, y) => y[1] - x[1])
    .slice(0, 12)
    .map(([key, n]) => {
      const [w1, w2] = key.split('||');
      return { wingA: w1, wingB: w2, crossWingEdges: n };
    });

  const topWingsByDrawers = Object.entries(wingsData || {})
    .filter(([, v]) => typeof v === 'number')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([wing, drawers], i) => ({ wing, drawers, rank: i + 1 }));

  const roomIdsInGraph = new Set();
  for (const e of edgesResolved) {
    roomIdsInGraph.add(e.sourceRoomId);
    roomIdsInGraph.add(e.targetRoomId);
  }
  const roomsWithNoLinks = rooms.filter((r) => !roomIdsInGraph.has(r.roomId)).length;

  return {
    totalDrawers,
    totalWings: wingCount,
    totalRooms: roomCount,
    resolvedEdgeCount: graphSummary.resolvedEdgeCount,
    unresolvedEdgeCount: graphSummary.unresolvedEdgeCount,
    crossWingEdgeCount: graphSummary.crossWingEdgeCount,
    intraWingEdgeCount: graphSummary.intraWingEdgeCount,
    roomsWithNoLinks,
    topWingsByDrawers,
    topConnectedRooms,
    topCrossLinkedWings,
  };
}
