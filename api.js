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

/**
 * Build an absolute URL for same-origin `/api/...` fetches. Required because
 * `new URL('/api/x')` without a base throws; `new URL('' + '/api/x')` also throws when base is empty.
 * @param {string} pathname - begins with `/`, e.g. `/api/search`
 */
export function createApiUrl(pathname) {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (typeof globalThis !== 'undefined' && globalThis.location?.origin) {
    return new URL(p, globalThis.location.origin);
  }
  const base = getApiBase();
  const origin = base && /^https?:\/\//i.test(base) ? base.replace(/\/$/, '') : 'http://localhost:8767';
  return new URL(p, origin);
}

async function fetchJson(url, { timeoutMs = 12000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error(`Request timed out after ${timeoutMs}ms`);
    throw error;
  } finally {
    clearTimeout(timer);
  }
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
  try {
    const u = createApiUrl('/api/rooms');
    u.searchParams.set('wing', wing);
    return await fetchJson(u.toString());
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
  const { fetchedAt, status, wingsRaw, taxonomyRaw, graphStats, kgResult, overviewBundle } = parts;

  const wingsData = normalizeWingsPayload(wingsRaw);
  const { taxonomy, roomsData, rooms, wings } = parseTaxonomyCanonical(taxonomyRaw);

  const graphContractVersion = overviewBundle?.graphContractVersion ?? graphStats?.graphContractVersion ?? null;
  if (graphContractVersion != null && graphContractVersion !== 2) {
    throw new Error(`Unsupported palace graph contract version: ${graphContractVersion}`);
  }

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
  const overviewStats = overviewBundle?.stats && typeof overviewBundle.stats === 'object' ? overviewBundle.stats : null;
  const graphMeta = graphStats?.graphMeta ?? overviewBundle?.graphMeta ?? null;

  return {
    status,
    fetchedAt: fetchedAt ?? overviewBundle?.fetchedAt ?? graphMeta?.fetchedAt ?? null,
    wingsData,
    taxonomy,
    roomsData,
    rooms,
    wings,
    graphStats,
    graphContractVersion,
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
/**
 * Official MCP `tools/list` (via HTTP bridge).
 * @returns {Promise<{ tools?: Array<{ name: string }> }|null>}
 */
export async function fetchMcpToolsList() {
  try {
    return await fetchJson(createApiUrl('/api/mcp-tools').toString());
  } catch {
    return null;
  }
}

/**
 * @param {string} query
 * @param {{ limit?: number, wing?: string, room?: string }} [opts]
 */
export async function fetchSemanticSearch(query, opts = {}) {
  const q = typeof query === 'string' ? query.trim() : '';
  if (!q) {
    return Promise.reject(new Error('Search query is empty.'));
  }
  let u;
  try {
    u = createApiUrl('/api/search');
  } catch (e) {
    return Promise.reject(new Error(`Invalid API URL: ${e?.message || e}`));
  }
  u.searchParams.set('query', q);
  if (opts.limit != null) u.searchParams.set('limit', String(opts.limit));
  if (opts.wing) u.searchParams.set('wing', opts.wing);
  if (opts.room) u.searchParams.set('room', opts.room);
  return fetchJson(u.toString(), { timeoutMs: 25000 });
}

/**
 * @param {string} startRoom — room **name** (MCP traverse uses palace graph room keys)
 * @param {number} [maxHops]
 */
export async function fetchPalaceTraverse(startRoom, maxHops = 2) {
  const u = createApiUrl('/api/traverse');
  u.searchParams.set('start_room', startRoom);
  u.searchParams.set('max_hops', String(maxHops));
  return fetchJson(u.toString(), { timeoutMs: 25000 });
}

/**
 * @param {string} entity
 * @param {{ as_of?: string, direction?: string }} [opts]
 */
export async function fetchKgQuery(entity, opts = {}) {
  const u = createApiUrl('/api/kg-query');
  u.searchParams.set('entity', entity);
  if (opts.as_of) u.searchParams.set('as_of', opts.as_of);
  if (opts.direction) u.searchParams.set('direction', opts.direction);
  return fetchJson(u.toString(), { timeoutMs: 25000 });
}

/** @param {string} [entity] — omit for full timeline */
export async function fetchKgTimeline(entity) {
  const u = createApiUrl('/api/kg-timeline');
  if (entity && entity.trim()) u.searchParams.set('entity', entity.trim());
  return fetchJson(u.toString(), { timeoutMs: 25000 });
}

export async function fetchAaakSpec() {
  return fetchJson(createApiUrl('/api/aaak-spec').toString(), { timeoutMs: 20000 });
}

/**
 * @param {{ agent?: string, last_n?: number }} [opts]
 */
export async function fetchDiaryRead(opts = {}) {
  const u = createApiUrl('/api/diary');
  if (opts.agent) u.searchParams.set('agent', opts.agent);
  if (opts.last_n != null) u.searchParams.set('last_n', String(opts.last_n));
  return fetchJson(u.toString(), { timeoutMs: 25000 });
}

/**
 * @param {string} content
 * @param {number} [threshold]
 */
export async function fetchCheckDuplicate(content, threshold = 0.9) {
  const res = await fetch(createApiUrl('/api/check-duplicate').toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ content, threshold }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function loadPalaceData() {
  try {
    const snapshot = await fetchJson(createApiUrl('/api/palace').toString());
    const graphStats = {
      graphContractVersion: snapshot.graphContractVersion,
      fetchedAt: snapshot.fetchedAt,
      ...(snapshot.graph || {}),
    };
    const overviewBundle = {
      graphContractVersion: snapshot.graphContractVersion,
      fetchedAt: snapshot.fetchedAt,
      graphMeta: snapshot.graph?.graphMeta ?? null,
      stats: snapshot.overviewStats ?? null,
    };

    return normalizePalaceBundle({
      fetchedAt: snapshot.fetchedAt,
      status: snapshot.status,
      wingsRaw: snapshot.wingsData,
      taxonomyRaw: { taxonomy: snapshot.taxonomy },
      graphStats,
      kgResult: snapshot.kgStats ?? null,
      overviewBundle,
    });
  } catch (error) {
    return {
      status: null,
      fetchedAt: null,
      wingsData: {},
      taxonomy: {},
      roomsData: {},
      rooms: [],
      wings: [],
      graphStats: null,
      graphContractVersion: null,
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
