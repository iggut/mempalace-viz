/**
 * MCP-honest copy and display helpers for MemPalace 3D graph guidance.
 * Single source for route failures, disconnected guidance, and "how connections work" content.
 * Safe to import from graph-route.js (no browser-only APIs).
 */

/** @typedef {'missing_endpoint' | 'no_edges' | 'no_path' | 'id_map_failed' | 'bad_scene'} RouteFailureReason */

/**
 * Short message for toasts and computeGraphRoute `message` field.
 * @param {string} reason
 * @param {{ graphFilterNarrowed?: boolean }} [opts]
 */
export function routeFailureMessage(reason, opts = {}) {
  const graphFilterNarrowed = !!opts.graphFilterNarrowed;
  switch (reason) {
    case 'missing_endpoint':
      return 'Choose a start room and a target room.';
    case 'no_edges':
      if (graphFilterNarrowed) {
        return 'No edges match the current relationship filters — enable more types or reset filters. The graph shows only explicit MemPalace structure.';
      }
      return 'No graph edges in the current data. Refresh after MemPalace changes; this viewer does not add links.';
    case 'no_path':
      return 'No explicit MCP path exists between these rooms on the edges currently shown.';
    case 'id_map_failed':
      return 'Could not map route to scene nodes.';
    case 'bad_scene':
      return 'Could not resolve route endpoints.';
    default:
      return 'Route unavailable.';
  }
}

/**
 * Extra inspector lines when a route cannot be computed — calm, non-error tone.
 * Does not repeat the full `routeFailureMessage` (show that separately).
 * @param {string} reason
 * @param {{ graphFilterNarrowed?: boolean }} [opts]
 * @returns {string[]}
 */
export function routeDisconnectedDetailLines(reason, opts = {}) {
  const graphFilterNarrowed = !!opts.graphFilterNarrowed;
  if (reason === 'no_path') {
    const lines = [
      'This graph only shows explicit MemPalace tunnel structure from MCP — it does not invent missing links.',
    ];
    if (graphFilterNarrowed) {
      lines.push('Some edges may be hidden by your relationship filters — try widening them to reveal a path.');
    }
    lines.push('To create a tunnel in MemPalace, use the same room name in multiple wings, then refresh data here.');
    return lines;
  }
  if (reason === 'no_edges') {
    const lines = [
      'Routing needs at least one visible graph edge between rooms.',
    ];
    if (graphFilterNarrowed) {
      lines.push('Widen relationship filters so tunnel edges can appear, or reload after MemPalace updates.');
    } else {
      lines.push('Reload after MemPalace updates if you expect tunnels; stock MCP does not support arbitrary graph link writes.');
    }
    return lines;
  }
  return [];
}

/** Toast when stepping to a neighbor fails in graph view */
export function neighborStepDisconnectedMessage() {
  return 'No adjacent rooms on the visible edges — the graph may be disconnected here, or filters may hide links.';
}

/** Bullet list for "How connections work" explainer */
export function howConnectionsWorkBullets() {
  return [
    'Graph edges come from MemPalace MCP data (tunnel discovery), not from this viewer.',
    'A tunnel appears when the same room name exists in more than one wing.',
    'This visualization does not invent missing links.',
    'Stock MemPalace MCP does not support arbitrary room-to-room graph links or persisting custom cross-links.',
  ];
}

/** Practical workflow — drawers vs tunnels */
export function actionableWorkflowBullets() {
  return [
    'Want a new tunnel? Create or reuse the same room name in two wings using normal MemPalace workflows.',
    'Drawers can be added via MCP tools such as mempalace_add_drawer — that adds palace content, not arbitrary graph edges.',
    'After MemPalace data changes, use Refresh here to update the graph.',
  ];
}

/**
 * Show the collapsible explainer in Graph view overview (inspector) when palace data loaded.
 * @param {{ viewIsGraph?: boolean, palaceDataOk?: boolean }} ctx
 */
export function shouldShowHowConnectionsExplainer(ctx = {}) {
  return !!ctx.viewIsGraph && !!ctx.palaceDataOk;
}

/**
 * Optional extra card: when we have resolvable edges, emphasize tunnel = name reuse (not an error).
 * @param {{ viewIsGraph?: boolean, hasResolvableGraph?: boolean }} ctx
 */
export function shouldShowTunnelWorkflowCard(ctx = {}) {
  return !!ctx.viewIsGraph && !!ctx.hasResolvableGraph;
}

/**
 * Copy for graph inspector when graph-stats returned no edges (taxonomy may still load).
 */
export function graphInspectorNoEdgesNoticeLines() {
  return {
    title: 'Graph view',
    body:
      'No tunnel edges were returned from graph-stats. Wings and rooms can still appear from taxonomy. Edges come only from MemPalace tunnel discovery (mempalace_find_tunnels).',
  };
}

/**
 * Copy when edges exist but endpoints could not all be matched.
 */
/**
 * When a room has no tunnel neighbors but the graph loaded — valid disconnected state.
 */
export function roomWithNoTunnelNeighborsGuidance() {
  return 'No tunnel neighbors for this room in the current MCP graph — that is expected when there is no shared room name across wings. This viewer does not add links.';
}

/** Route inspector summary — first sentence (pairs with hops/mode lines in ui). */
export function routeInspectorBasisLine() {
  return 'Uses only explicit edges from MemPalace MCP data (what is visible in the scene).';
}

/** Footer metric footnote prefix in Graph view (prepended to contextual line). */
export function metricFootnoteGraphViewPrefix() {
  return 'Explicit MemPalace edges only — this viewer does not add or infer links.';
}

/**
 * Graph toolbar primary status: resolved edge count from MCP (may include tunnel, taxonomy_adjacency, etc.).
 * @param {{ resolvedFormatted: string, resolvedCount: number, visibleFormatted?: string, visibleCount?: number, graphFilterNarrowed?: boolean }} p
 */
export function graphToolbarPrimaryStatusLine(p) {
  const n = Number(p.resolvedCount);
  const plural = n === 1 ? '' : 's';
  const base = `${p.resolvedFormatted} resolved graph edge${plural} from MCP`;
  if (p.graphFilterNarrowed && p.visibleFormatted != null && p.visibleCount != null) {
    return `Visible: ${p.visibleFormatted} (filtered) · base ${base}`;
  }
  return base;
}

/** Overview inspector when kg-stats endpoint missing or errored — separate from palace tunnel graph. */
export function knowledgeGraphStatsUnavailableLine() {
  return 'Knowledge graph statistics are unavailable from the current API.';
}

/**
 * Connections section when graph/tunnel data missing for the room (not an error — valid empty state).
 */
export function connectionsSectionNoExplicitEdgesLine() {
  return 'No explicit edges for this room in the current MCP data — unresolved endpoints or no tunnels yet is a valid state.';
}

export function graphInspectorUnresolvedEndpointsLines(edgeCount, unresolvedCount) {
  const u = unresolvedCount != null ? unresolvedCount : 0;
  const plural = edgeCount === 1 ? '' : 's';
  const uPlural = u === 1 ? '' : 's';
  return {
    title: 'Graph view',
    body: `Loaded ${edgeCount} graph edge${plural}, but some endpoints could not be matched to taxonomy rooms${
      u ? ` (${u} edge${uPlural} unresolved)` : ''
    }. Layout may be sparse — this is a data alignment limitation, not a viewer bug.`,
  };
}
