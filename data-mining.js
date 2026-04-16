/**
 * Data mining for MemPalace viz — deterministic, MCP-aligned signals only.
 *
 * - Uses resolved tunnel edges + graph analytics (degree), optional tunnel-row metadata (`recent`),
 *   and graph provenance (`graphMeta`). Does not invent relationships or KG facts.
 * - Overlays and inspector copy must label these as *derived* / *analysis*, never as tunnel truth.
 */

/** @typedef {'off'|'hubs'|'activity'} MiningOverlayMode */

export const MINING_OVERLAY_MODES = /** @type {const} */ ({
  OFF: 'off',
  HUBS: 'hubs',
  ACTIVITY: 'activity',
});

/**
 * Parse MCP tunnel row `recent` into epoch ms when unambiguous.
 * @param {unknown} value
 * @returns {number|null}
 */
export function parseTunnelRecentToTime(value) {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  const full = Date.parse(s);
  if (Number.isFinite(full)) return full;
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m) {
    const t = Date.parse(m[1]);
    if (Number.isFinite(t)) return t;
  }
  return null;
}

/**
 * Per-room max recent timestamp from tunnel edge metadata (canonical edges only).
 * @param {Array<{ relationshipType?: string, sourceRoomId?: string, targetRoomId?: string, metadata?: Record<string, unknown> }>} edgesResolved
 * @returns {Map<string, number>}
 */
export function collectRecentTimesByRoom(edgesResolved) {
  /** @type {Map<string, number>} */
  const best = new Map();
  for (const e of edgesResolved || []) {
    if (e?.relationshipType !== 'tunnel') continue;
    const t = parseTunnelRecentToTime(e.metadata?.recent);
    if (t == null) continue;
    for (const rid of [e.sourceRoomId, e.targetRoomId]) {
      if (!rid) continue;
      const prev = best.get(rid);
      if (prev == null || t > prev) best.set(rid, t);
    }
  }
  return best;
}

/**
 * Map recent timestamps to 0–1 weights (newer → higher), stable when multiple rooms.
 * @param {Map<string, number>} recentByRoom
 * @returns {Record<string, number>}
 */
export function normalizeActivityWeights(recentByRoom) {
  const entries = [...recentByRoom.entries()];
  if (!entries.length) return {};
  const times = entries.map(([, t]) => t);
  const oldest = Math.min(...times);
  const newest = Math.max(...times);
  const span = Math.max(1, newest - oldest);
  /** @type {Record<string, number>} */
  const out = {};
  for (const [roomId, t] of entries) {
    out[roomId] = 0.2 + 0.8 * ((t - oldest) / span);
  }
  return out;
}

/**
 * Degree-based hub emphasis 0–1 from graph analytics degree map.
 * @param {Map<string, number>|undefined} degreeByKey
 * @returns {Record<string, number>}
 */
export function normalizeHubWeights(degreeByKey) {
  if (!degreeByKey || !degreeByKey.size) return {};
  let maxD = 0;
  for (const [, d] of degreeByKey) {
    if (d > maxD) maxD = d;
  }
  if (maxD <= 0) return {};
  /** @type {Record<string, number>} */
  const out = {};
  for (const [k, d] of degreeByKey) {
    out[k] = d / maxD;
  }
  return out;
}

/**
 * @param {object} input
 * @param {Array} [input.edgesResolved] canonical tunnel edges
 * @param {{ degreeByKey?: Map<string, number>, hasResolvableEdges?: boolean }|null} [input.ga] from `buildGraphAnalytics`
 * @param {object|null} [input.graphMeta]
 */
export function buildPalaceMiningModel(input) {
  const { edgesResolved = [], ga = null, graphMeta = null } = input || {};
  const recentByRoom = collectRecentTimesByRoom(edgesResolved);
  const activityByRoomId = normalizeActivityWeights(recentByRoom);
  const hubByRoomId = normalizeHubWeights(ga?.degreeByKey);

  /** @type {string[]} */
  const caveats = [];
  if (graphMeta?.completenessNotes?.length) {
    caveats.push(...graphMeta.completenessNotes.filter(Boolean));
  }
  if (!ga?.hasResolvableEdges) {
    caveats.push('No resolvable tunnel edges; hub ranking is unavailable.');
  }
  if (!Object.keys(activityByRoomId).length) {
    caveats.push(
      'No parseable drawer “recent” timestamps in tunnel metadata; activity overlay needs dated tunnel rows.',
    );
  }

  return {
    hubByRoomId,
    activityByRoomId,
    hasActivitySignal: Object.keys(activityByRoomId).length > 0,
    hasHubSignal: Object.keys(hubByRoomId).length > 0,
    caveats,
  };
}

/**
 * Pick weight record for overlay mode.
 * @param {ReturnType<typeof buildPalaceMiningModel>} model
 * @param {MiningOverlayMode} mode
 */
export function weightsForMiningMode(model, mode) {
  if (mode === MINING_OVERLAY_MODES.HUBS) return model.hubByRoomId;
  if (mode === MINING_OVERLAY_MODES.ACTIVITY) return model.activityByRoomId;
  return {};
}
