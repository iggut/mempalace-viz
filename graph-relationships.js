/**
 * Relationship-type registry, graph filter normalization, and completeness helpers
 * for MemPalace 3D graph view.
 *
 * Filtering model (MemPalace 3D viz):
 * - Footer metrics and overview "Palace summary" rows that quote API totals (resolved edges,
 *   cross-wing from summary) stay GLOBAL — they describe the full graph payload.
 * - The 3D scene, graph relationship toggles, and inspector sections labeled "Visible" use edges
 *   filtered by the user's relationship-type toggles.
 * - When every type present in the payload is enabled, visible edge lists match the full list.
 */

/** localStorage key for relationship-type filter preferences */
export const GRAPH_REL_FILTERS_LS_KEY = 'mempalace-viz-graph-rel-filters-v1';

/**
 * User-facing copy and 3D style hints per known relationship type.
 * Unknown runtime types fall back to `unknown` styling in the scene.
 */
export const RELATIONSHIP_TYPES = {
  tunnel: {
    label: 'Tunnel',
    shortLabel: 'Tunnel',
    description:
      'Cross-wing link from tunnel discovery (`mempalace_find_tunnels`): same logical room in more than one wing.',
  },
  taxonomy_adjacency: {
    label: 'Taxonomy order',
    shortLabel: 'Same-wing order',
    description:
      'Rooms that sit next to each other in your taxonomy list within one wing — layout structure, not a tunnel hop.',
  },
  unknown: {
    label: 'Other',
    shortLabel: 'Other',
    description: 'Edges whose relationship type is not listed in the viewer registry.',
  },
};

/** @param {string} type */
export function getRelationshipTypeMeta(type) {
  const key = type && RELATIONSHIP_TYPES[type] ? type : 'unknown';
  return { type: key, ...RELATIONSHIP_TYPES[key] };
}

/**
 * @param {object} edge — canonical or legacy graph edge
 * @returns {string}
 */
export function getEdgeRelationshipType(edge) {
  if (!edge || typeof edge !== 'object') return 'tunnel';
  const rt = edge.relationshipType;
  if (typeof rt === 'string' && rt.trim()) return rt.trim();
  return 'tunnel';
}

/**
 * @param {Array<object>} edges
 * @returns {string[]}
 */
export function collectRelationshipTypesFromEdges(edges) {
  const s = new Set();
  for (const e of edges || []) {
    s.add(getEdgeRelationshipType(e));
  }
  return [...s].sort();
}

/**
 * Visual encoding for Three.js LineBasicMaterial (color, opacity). Line width is kept at 1;
 * WebGL line width is unreliable across platforms — differentiation is color + opacity.
 * @param {string} type
 */
export function getStyleForRelationshipType(type) {
  const t = type || 'tunnel';
  if (t === 'tunnel') {
    return { color: 0x38c6ff, opacity: 0.38 };
  }
  if (t === 'taxonomy_adjacency') {
    return { color: 0x5cf0c8, opacity: 0.3 };
  }
  if (t === 'unknown') {
    return { color: 0x8b9cc8, opacity: 0.28 };
  }
  return { color: 0xb794f6, opacity: 0.27 };
}

/**
 * Intersect saved enabled types with what exists in the current graph.
 * - `undefined` / missing prefs → all available types enabled.
 * - explicit empty array `[]` → none enabled (user hid every type).
 * - partial list → only those types (invalid ids dropped; if nothing left, none).
 * @param {string[]|null|undefined} savedEnabled
 * @param {string[]} availableTypes
 * @returns {Set<string>}
 */
export function normalizeVisibleRelationshipTypes(savedEnabled, availableTypes) {
  const avail = new Set(availableTypes || []);
  if (avail.size === 0) return new Set();

  if (savedEnabled === undefined || savedEnabled === null) {
    return new Set(avail);
  }
  if (Array.isArray(savedEnabled) && savedEnabled.length === 0) {
    return new Set();
  }

  const next = new Set();
  for (const x of savedEnabled) {
    if (typeof x === 'string' && avail.has(x)) next.add(x);
  }
  return next;
}

/**
 * @param {Array<object>} edges
 * @param {Set<string>} visibleTypes
 * @returns {object[]}
 */
/**
 * Argument for the Three.js scene: `null` means “no type filter” (all edges visible).
 * Empty `Set` means every type is hidden. A partial `Set` applies filtering.
 * When the enabled set matches every available type, returns `null` so newly added
 * relationship types in a future payload still appear until the user narrows filters again.
 * @param {Set<string>|null|undefined} enabledSet
 * @param {string[]} availableTypes
 * @returns {Set<string>|null}
 */
export function sceneRelationshipFilterArg(enabledSet, availableTypes) {
  const avail = [...(availableTypes || [])].sort();
  if (avail.length === 0) return null;
  if (!enabledSet || enabledSet.size === 0) return new Set();
  const coversAll = enabledSet.size === avail.length && avail.every((t) => enabledSet.has(t));
  return coversAll ? null : enabledSet;
}

export function filterEdgesByRelationshipTypes(edges, visibleTypes) {
  if (!visibleTypes || visibleTypes.size === 0) return [];
  const out = [];
  for (const e of edges || []) {
    if (visibleTypes.has(getEdgeRelationshipType(e))) out.push(e);
  }
  return out;
}

/**
 * @param {Array<object>} edges
 * @returns {Record<string, number>}
 */
export function countEdgesByType(edges) {
  /** @type {Record<string, number>} */
  const byType = {};
  for (const e of edges || []) {
    const t = getEdgeRelationshipType(e);
    byType[t] = (byType[t] || 0) + 1;
  }
  return byType;
}

/**
 * @param {Array<object>} edgesResolved
 * @param {Set<string>} visibleTypes
 */
export function summarizeVisibleGraphEdges(edgesResolved, visibleTypes) {
  const filtered = filterEdgesByRelationshipTypes(edgesResolved, visibleTypes);
  return {
    visibleEdgeCount: filtered.length,
    visibleByType: countEdgesByType(filtered),
    visibleEdges: filtered,
  };
}

/**
 * @param {unknown} raw — parsed localStorage JSON
 * @returns {string[]|null}
 */
export function parseSavedGraphRelFilters(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const en = raw.enabledTypes;
  if (!Array.isArray(en)) return null;
  return en.filter((x) => typeof x === 'string');
}

/**
 * Compact provenance / truncation hint for graph toolbar or inspector.
 * @param {object|null|undefined} graphMeta
 * @param {{ byType?: Record<string, number> }|null|undefined} summary
 */
export function buildGraphCompletenessHint(graphMeta, summary) {
  const parts = [];
  const sources = graphMeta?.sources;
  if (Array.isArray(sources) && sources.length) {
    parts.push(`Sources: ${sources.join(', ')}`);
  }
  const trunc = graphMeta?.truncatedSources;
  if (Array.isArray(trunc) && trunc.some((t) => t?.truncated)) {
    parts.push('Some sources may be truncated upstream — tunnel list can be incomplete.');
  }
  const notes = (graphMeta?.completenessNotes || []).filter(Boolean);
  if (notes.length) parts.push(notes[0]);

  const bt = summary?.byType && typeof summary.byType === 'object' ? summary.byType : null;
  if (bt && Object.keys(bt).length) {
    const typeLine = Object.entries(bt)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' · ');
    parts.push(`Types in payload: ${typeLine}`);
  }

  return parts.filter(Boolean).join(' ');
}

/**
 * Short label for inspector sentences, e.g. "3 tunnel · 2 adjacency"
 * @param {Record<string, number>} byType
 * @param {number} [maxTypes]
 */
export function formatRelationshipTypeCounts(byType, maxTypes = 6) {
  if (!byType || typeof byType !== 'object') return '';
  const entries = Object.entries(byType)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  if (!entries.length) return '';
  const slice = entries.slice(0, maxTypes);
  return slice
    .map(([t, n]) => {
      const m = getRelationshipTypeMeta(t);
      return `${n} ${m.shortLabel.toLowerCase()}`;
    })
    .join(' · ');
}

/**
 * One-line narrative for a room's visible vs global relationship mix.
 * @param {Record<string, number>} visibleByType
 * @param {Record<string, number>} globalByType
 */
export function describeRoomRelationshipMix(visibleByType, globalByType) {
  const vTot = Object.values(visibleByType || {}).reduce((a, b) => a + b, 0);
  const gTot = Object.values(globalByType || {}).reduce((a, b) => a + b, 0);
  if (gTot === 0) return null;
  const tunnelV = visibleByType?.tunnel || 0;
  const tunnelG = globalByType?.tunnel || 0;

  if (vTot === 0 && gTot > 0) {
    return 'No visible links with current filters; totals above are global.';
  }
  if (tunnelV > 0 && tunnelG > 0 && tunnelV >= vTot * 0.85) {
    return 'Visible links here are tunnel connections (MCP-backed).';
  }
  return null;
}
