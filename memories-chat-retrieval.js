/**
 * Grounds Memories Chat in MemPalace via official `mempalace_search` + optional drawer bodies.
 */

import { normalizeGetDrawerPayload } from './content-inspector.js';

/**
 * @typedef {{
 *   wing: string,
 *   room: string,
 *   drawerId: string | null,
 *   excerpt: string,
 *   similarity: number,
 *   contentForModel?: string,
 * }} RetrievedMemorySource
 */

/**
 * @param {unknown} row
 * @returns {string | null}
 */
function pickDrawerId(row) {
  if (!row || typeof row !== 'object') return null;
  const o = /** @type {Record<string, unknown>} */ (row);
  const candidates = [o.drawer_id, o.drawerId, o.drawerID, o.id];
  for (const c of candidates) {
    if (c != null && String(c).trim()) {
      const s = String(c).trim();
      if (s && s !== '[object Object]') return s;
    }
  }
  return null;
}

/**
 * @param {unknown} row
 */
function normalizeSearchRow(row) {
  if (!row || typeof row !== 'object') return null;
  const o = /** @type {Record<string, unknown>} */ (row);
  const wing = o.wing != null ? String(o.wing) : '';
  const room = o.room != null ? String(o.room) : '';
  const text =
    o.text != null
      ? String(o.text)
      : o.content_preview != null
        ? String(o.content_preview)
        : o.preview != null
          ? String(o.preview)
          : '';
  const similarity = Number(o.similarity ?? o.score ?? 0);
  const drawerId = pickDrawerId(o);
  return {
    wing,
    room,
    excerpt: text.slice(0, 4000),
    similarity: Number.isFinite(similarity) ? similarity : 0,
    drawerId,
  };
}

/**
 * @param {{
 *   query: string,
 *   fetchSemanticSearch: (q: string, opts?: object) => Promise<unknown>,
 *   fetchDrawerById: (id: string) => Promise<unknown>,
 *   semanticLimit?: number,
 *   maxDrawerFetches?: number,
 *   maxCharsPerDrawer?: number,
 * }} opts
 * @returns {Promise<{ sources: RetrievedMemorySource[], retrievalNote?: string }>}
 */
export async function retrieveMemoriesForChat({
  query,
  fetchSemanticSearch,
  fetchDrawerById,
  semanticLimit = 12,
  maxDrawerFetches = 5,
  maxCharsPerDrawer = 3500,
}) {
  const q = String(query ?? '').trim();
  if (!q) {
    return { sources: [], retrievalNote: 'Empty query.' };
  }

  let res;
  try {
    res = await fetchSemanticSearch(q, { limit: semanticLimit });
  } catch (e) {
    return {
      sources: [],
      retrievalNote: e?.message || String(e),
    };
  }

  if (!res || typeof res !== 'object') {
    return { sources: [], retrievalNote: 'Unexpected search response.' };
  }
  const err = /** @type {{ error?: string }} */ (res).error;
  if (err) {
    return { sources: [], retrievalNote: String(err) };
  }

  const rows = /** @type {{ results?: unknown[] }} */ (res).results;
  if (!Array.isArray(rows) || rows.length === 0) {
    return { sources: [], retrievalNote: null };
  }

  /** @type {RetrievedMemorySource[]} */
  const sources = [];
  const seen = new Set();
  for (const row of rows) {
    const n = normalizeSearchRow(row);
    if (!n) continue;
    const key = n.drawerId ? `d:${n.drawerId}` : `t:${n.wing}|${n.room}|${n.excerpt.slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({
      wing: n.wing,
      room: n.room,
      drawerId: n.drawerId,
      excerpt: n.excerpt,
      similarity: n.similarity,
    });
  }

  let fetchCount = 0;
  for (const s of sources) {
    if (!s.drawerId || fetchCount >= maxDrawerFetches) continue;
    fetchCount += 1;
    try {
      const raw = await fetchDrawerById(s.drawerId);
      const norm = normalizeGetDrawerPayload(raw);
      if (norm.error || !norm.content) {
        s.contentForModel = s.excerpt;
        continue;
      }
      const body = norm.content.trim();
      s.contentForModel =
        body.length > maxCharsPerDrawer ? `${body.slice(0, maxCharsPerDrawer)}…` : body;
    } catch {
      s.contentForModel = s.excerpt;
    }
  }

  for (const s of sources) {
    if (!s.contentForModel) s.contentForModel = s.excerpt;
  }

  return { sources, retrievalNote: null };
}

/**
 * Builds a single user-visible block for the model (no secrets).
 * @param {RetrievedMemorySource[]} sources
 */
export function formatRetrievalContextForPrompt(sources) {
  if (!sources.length) return '(No retrieved memories matched this query.)';
  return sources
    .map((s, i) => {
      const loc =
        s.wing && s.room
          ? `${s.wing} / ${s.room}`
          : s.wing || s.room || 'Unknown location';
      const idLine = s.drawerId ? `Drawer id: ${s.drawerId}\n` : '';
      const body = s.contentForModel || s.excerpt;
      return `--- Memory ${i + 1} (${loc}) ---\n${idLine}${body}`;
    })
    .join('\n\n');
}
