/**
 * MemPalace viz API client — same contract as server.js routes.
 * Uses same-origin relative URLs when served from the Node server.
 */

import { normalizeWingsPayload, parseTaxonomyCanonical, toLegacyGraphEdges } from './canonical.js';

export { normalizeWingsPayload };

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

    const wingsData = normalizeWingsPayload(wingsRaw);
    const { taxonomy, roomsData, rooms, wings } = parseTaxonomyCanonical(taxonomyRaw);

    let graphEdges = [];
    if (graphStats?.edgesResolved?.length) {
      graphEdges = toLegacyGraphEdges(graphStats.edgesResolved);
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

    return {
      status,
      wingsData,
      roomsData,
      taxonomy,
      rooms,
      wings,
      graphStats,
      kgStats: kgResult && !kgResult.error ? kgResult : null,
      graphEdges,
      overviewBundle,
      error: null,
    };
  } catch (error) {
    return {
      status: null,
      wingsData: {},
      roomsData: {},
      taxonomy: {},
      rooms: [],
      wings: [],
      graphStats: null,
      kgStats: null,
      graphEdges: [],
      overviewBundle: null,
      error,
    };
  }
}
