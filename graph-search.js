/**
 * Pure graph search ranking for wings and rooms (canonical scene IDs, display names in UI).
 *
 * History / navigation semantics are implemented in ui.js; this module stays side-effect free.
 *
 * Intended rules (see ui.js `graphSearch*` state):
 * - The first scene jump after a new query may push graph focus history once when replacing
 *   an existing graph selection (same as clicking another node). Empty selection → no push.
 * - Stepping through search results (next/prev) does not push additional history entries.
 * - Manual clicks after a search use the normal graph click handler (may push when the node changes).
 * - Clearing the search field does not pop focus history.
 */

/**
 * @param {string} q
 * @returns {string}
 */
export function normalizeSearchQuery(q) {
  return String(q ?? '')
    .trim()
    .toLowerCase();
}

/**
 * Score a single text field against the normalized query.
 * Exact and prefix matches outrank loose substring matches.
 * @param {string} queryNorm
 * @param {string} text
 * @returns {number}
 */
export function scoreMatch(queryNorm, text) {
  if (!queryNorm) return 0;
  const t = String(text ?? '').toLowerCase();
  if (!t) return 0;
  if (t === queryNorm) return 10000;
  if (t.startsWith(queryNorm)) return 8200 - Math.min(queryNorm.length, 40);
  const idx = t.indexOf(queryNorm);
  if (idx >= 0) return 5200 - Math.min(idx, 200);
  const words = queryNorm.split(/\s+/).filter((w) => w.length > 1);
  if (words.length < 2) return 0;
  let sum = 0;
  let first = Infinity;
  for (const w of words) {
    const j = t.indexOf(w);
    if (j < 0) return 0;
    sum += 400;
    first = Math.min(first, j);
  }
  return 3000 - Math.min(first, 200) + Math.min(sum, 800);
}

/**
 * @param {Record<string, Array<{ name: string }>>} roomsData
 * @param {Record<string, number>} wingsData
 * @returns {SearchCatalogEntry[]}
 */
export function buildSearchCatalog(roomsData, wingsData) {
  /** @type {Map<string, SearchCatalogEntry>} */
  const byWing = new Map();
  const wings = new Set([...Object.keys(roomsData || {}), ...Object.keys(wingsData || {})]);
  for (const wingId of wings) {
    byWing.set(wingId, {
      kind: 'wing',
      sceneId: `wing:${wingId}`,
      wingId,
      label: wingId,
    });
  }
  /** @type {SearchCatalogEntry[]} */
  const out = [...byWing.values()];
  for (const wingId of wings) {
    const rooms = roomsData[wingId] || [];
    for (const r of rooms) {
      if (!r || r.name == null) continue;
      out.push({
        kind: 'room',
        sceneId: `room:${wingId}:${r.name}`,
        wingId,
        roomName: r.name,
        label: r.name,
      });
    }
  }
  return out;
}

/**
 * @typedef {{ kind: 'wing', sceneId: string, wingId: string, label: string }} WingEntry
 * @typedef {{ kind: 'room', sceneId: string, wingId: string, roomName: string, label: string }} RoomEntry
 * @typedef {WingEntry | RoomEntry} SearchCatalogEntry
 * @typedef {SearchCatalogEntry & { score: number, sublabel: string }} RankedSearchHit
 */

/**
 * @param {SearchCatalogEntry} c
 */
export function formatSublabel(c) {
  if (c.kind === 'wing') return 'Wing';
  return `Room · ${c.wingId}`;
}

/**
 * @param {SearchCatalogEntry} c
 * @param {string} queryNorm
 * @returns {number}
 */
export function scoreCatalogEntry(c, queryNorm) {
  if (!queryNorm) return 0;
  if (c.kind === 'wing') {
    return scoreMatch(queryNorm, c.wingId);
  }
  const roomS = scoreMatch(queryNorm, c.roomName);
  const wingS = scoreMatch(queryNorm, c.wingId);
  return Math.max(roomS, wingS * 0.94);
}

/**
 * Rank catalog entries; dedupes by sceneId keeping the best score.
 * @param {SearchCatalogEntry[]} catalog
 * @param {string} queryRaw
 * @returns {RankedSearchHit[]}
 */
export function rankGraphSearch(catalog, queryRaw) {
  const queryNorm = normalizeSearchQuery(queryRaw);
  if (!queryNorm || !catalog.length) return [];

  /** @type {Map<string, RankedSearchHit>} */
  const best = new Map();
  for (const c of catalog) {
    const score = scoreCatalogEntry(c, queryNorm);
    if (score <= 0) continue;
    const sublabel = formatSublabel(c);
    const hit = { ...c, score, sublabel };
    const prev = best.get(c.sceneId);
    if (!prev || hit.score > prev.score) best.set(c.sceneId, hit);
  }
  return [...best.values()].sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
}

/**
 * Next / previous index on a ring.
 * @param {number} index
 * @param {number} length
 * @param {number} delta +1 or -1
 */
export function stepWrapped(index, length, delta) {
  if (length <= 0) return 0;
  return (index + delta + length * 64) % length;
}
