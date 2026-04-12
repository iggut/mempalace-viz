/**
 * MemPalace viz API client — same contract as server.js routes.
 * Uses same-origin relative URLs when served from the Node server.
 */

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

/** Normalize /api/wings payload to { wingName: drawerCount } */
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

export function parseTaxonomy(taxonomyRaw) {
  let taxonomy = taxonomyRaw;
  if (typeof taxonomy === 'string') {
    try {
      taxonomy = JSON.parse(taxonomy);
    } catch {
      taxonomy = {};
    }
  }
  const roomsData = {};
  Object.entries(taxonomy || {}).forEach(([wing, rooms]) => {
    if (!roomsData[wing]) roomsData[wing] = [];
    if (rooms && typeof rooms === 'object' && !Array.isArray(rooms)) {
      Object.entries(rooms).forEach(([room, count]) => {
        roomsData[wing].push({
          name: room,
          drawers: typeof count === 'number' ? count : 1,
        });
      });
    }
  });
  return { taxonomy: taxonomy || {}, roomsData };
}

/**
 * Load all viz endpoints in parallel. kg-stats is optional.
 * @returns {{ status: object, wingsData: object, roomsData: object, taxonomy: object, graphStats: object, kgStats: object|null, error: Error|null }}
 */
export async function loadPalaceData() {
  const base = getApiBase();
  const prefix = `${base}/api`;
  try {
    const [status, wingsRaw, taxonomyRaw, graphStats, kgResult] = await Promise.all([
      fetchJson(`${prefix}/status`),
      fetchJson(`${prefix}/wings`),
      fetchJson(`${prefix}/taxonomy`),
      fetchJson(`${prefix}/graph-stats`),
      fetchJson(`${prefix}/kg-stats`).catch(() => null),
    ]);

    const wingsData = normalizeWingsPayload(wingsRaw);
    const { taxonomy, roomsData } = parseTaxonomy(taxonomyRaw);

    let graphEdges = [];
    if (graphStats?.tunnels && typeof graphStats.tunnels === 'object') {
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
      graphStats,
      kgStats: kgResult && !kgResult.error ? kgResult : null,
      graphEdges,
      error: null,
    };
  } catch (error) {
    return {
      status: null,
      wingsData: {},
      roomsData: {},
      taxonomy: {},
      graphStats: null,
      kgStats: null,
      graphEdges: [],
      error,
    };
  }
}
