/**
 * MemPalace viz API client — same contract as server.js routes.
 * Uses same-origin relative URLs when served from the Node server.
 */

import { normalizeWingsPayload, parseTaxonomyCanonical, toLegacyGraphEdges } from './canonical.js';

export { normalizeWingsPayload };

/**
 * Canonical edges for graph/routing: explicit MCP tunnel edges only (`edgesResolved`).
 * @param {{ edgesResolved?: unknown[] }|null|undefined} graph
 */
export function getPalaceCanonicalEdgesForView(graph) {
  const ex = Array.isArray(graph?.edgesResolved) ? graph.edgesResolved : [];
  return ex;
}

/**
 * Legacy-shaped graph edges for the scene and route helpers.
 */
export function getPalaceLegacyGraphEdgesForView(graph) {
  return toLegacyGraphEdges(getPalaceCanonicalEdgesForView(graph));
}

export function getApiBase() {
  if (typeof window !== 'undefined' && window.location?.protocol && window.location.protocol !== 'file:') {
    return '';
  }
  return 'http://localhost:8767';
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Parse taxonomy payload into wing → rooms with canonical `roomId` / `wingId` on each row.
 * @returns {{ taxonomy: object, roomsData: object, rooms: Array, wings: Array }}
 */
export function parseTaxonomy(taxonomyRaw) {
  return parseTaxonomyCanonical(taxonomyRaw);
}

/** Optional: fetch room list for a wing from `/api/rooms?wing=`. */
export async function fetchRoomsForWing(wing) {
  if (!wing) return null;
  const base = getApiBase();
  try {
    return await fetchJson(`${base}/api/rooms?wing=${encodeURIComponent(wing)}`);
  } catch {
    return null;
  }
}

/** Return true if wing exists in loaded wings data. */
export function wingExists(wingsData, wing) {
  return !!(wingsData && typeof wingsData === 'object' && wing in wingsData);
}

/** Return true if room exists under wing in roomsData map. */
export function roomExists(roomsData, wing, room) {
  const rooms = roomsData?.[wing];
  if (!Array.isArray(rooms)) return false;
  return rooms.some((r) => r.name === room);
}

/**
 * Look up a room row by canonical roomId across wings.
 * @param {Record<string, Array<{ name: string, roomId?: string, wingId?: string }>>} roomsData
 * @param {string} roomId
 */
export function findRoomRowByRoomId(roomsData, roomId) {
  if (!roomId || !roomsData) return null;
  for (const rooms of Object.values(roomsData)) {
    if (!Array.isArray(rooms)) continue;
    const hit = rooms.find((r) => r.roomId === roomId);
    if (hit) return hit;
  }
  return null;
}

/**
 * Normalize parallel API responses into one stable frontend bundle.
 * Canonical fields live under `graph.*` and `overviewStats`; `graphEdges` stays as the
 * legacy-shaped list used by older call sites (derived from `edgesResolved` when present).
 *
 * @param {object} parts
 * @returns {object}
 */
export function normalizePalaceBundle(parts) {
  const { status, wingsRaw, taxonomyRaw, graphStats, kgResult, overviewBundle } = parts;

  const wingsData = normalizeWingsPayload(wingsRaw);
  const { taxonomy, roomsData, rooms, wings } = parseTaxonomyCanonical(taxonomyRaw);

  const edgesResolved = Array.isArray(graphStats?.edgesResolved) ? graphStats.edgesResolved : [];
  const edgesInferred = Array.isArray(graphStats?.edgesInferred) ? graphStats.edgesInferred : [];
  const edgesUnresolved = Array.isArray(graphStats?.edgesUnresolved) ? graphStats.edgesUnresolved : [];
  const summary = graphStats?.summary && typeof graphStats.summary === 'object' ? graphStats.summary : null;
  const summaryInferred =
    graphStats?.summaryInferred && typeof graphStats.summaryInferred === 'object' ? graphStats.summaryInferred : null;

  /** @type {Array<{ from: string, to: string, wing?: string, sourceRoomId?: string, targetRoomId?: string }>} */
  let graphEdges = [];
  if (edgesResolved.length) {
    graphEdges = toLegacyGraphEdges(edgesResolved);
  } else if (graphStats?.legacyGraphEdges?.length) {
    graphEdges = graphStats.legacyGraphEdges;
  } else if (graphStats?.tunnels && typeof graphStats.tunnels === 'object') {
    graphEdges = Object.entries(graphStats.tunnels).flatMap(([room, connections]) =>
      Object.entries(connections || {}).map(([connectedRoom, wing]) => ({
        from: room,
        to: connectedRoom,
        wing,
      })),
    );
  }

  const kgStats = kgResult && !kgResult.error ? kgResult : null;

  const overviewStats =
    overviewBundle?.stats && typeof overviewBundle.stats === 'object' ? overviewBundle.stats : null;

  const graphMeta = graphStats?.graphMeta ?? overviewBundle?.graphMeta ?? null;

  return {
    status,
    wingsData,
    taxonomy,
    roomsData,
    rooms,
    wings,
    graphStats,
    graph: {
      edgesResolved,
      edgesInferred,
      edgesUnresolved,
      summary,
      summaryInferred,
      graphMeta,
    },
    graphEdges,
    overviewBundle,
    overviewStats,
    graphMeta,
    kgStats,
    error: null,
  };
}

/**
 * Load all viz endpoints in parallel. kg-stats is optional; overview is optional.
 * @returns {Promise<object>}
 */
export async function loadPalaceData() {
  const base = getApiBase();
  const prefix = `${base}/api`;
  try {
    const [status, wingsRaw, taxonomyRaw, graphStats, kgResult, overviewBundle] = await Promise.all([
      fetchJson(`${prefix}/status`),
      fetchJson(`${prefix}/wings`),
      fetchJson(`${prefix}/taxonomy`),
      fetchJson(`${prefix}/graph-stats`),
      fetchJson(`${prefix}/kg-stats`).catch(() => null),
      fetchJson(`${prefix}/overview`).catch(() => null),
    ]);

    return normalizePalaceBundle({ status, wingsRaw, taxonomyRaw, graphStats, kgResult, overviewBundle });
  } catch (error) {
    return {
      status: null,
      wingsData: {},
      taxonomy: {},
      roomsData: {},
      rooms: [],
      wings: [],
      graphStats: null,
      graph: { edgesResolved: [], edgesInferred: [], edgesUnresolved: [], summary: null, summaryInferred: null, graphMeta: null },
      graphEdges: [],
      overviewBundle: null,
      overviewStats: null,
      graphMeta: null,
      kgStats: null,
      error,
    };
  }
}
