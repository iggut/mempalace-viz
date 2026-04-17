/**
 * MemPalace 3D — app state, navigation, inspector, persistence, scene sync.
 */
import {
  loadPalaceData,
  getApiBase,
  wingExists,
  roomExists,
  getPalaceCanonicalEdgesForView,
  getPalaceLegacyGraphEdgesForView,
  fetchSemanticSearch,
  fetchMcpToolsList,
  fetchPalaceTraverse,
  fetchListDrawers,
  fetchDrawerById,
  fetchKgQuery,
  fetchKgTimeline,
  fetchAaakSpec,
  fetchDiaryRead,
  fetchCheckDuplicate,
} from './api.js';
import { hoverTargetKey, shouldUpdateInspectorOnHover } from './ui-hover-policy.js';
import { makeRoomId, parseRoomId } from './canonical.js';
import {
  buildPalaceMiningModel,
  MINING_OVERLAY_MODES,
  weightsForMiningMode,
} from './data-mining.js';
import { createPalaceScene, wingColorFor } from './scene.js';
import {
  buildGraphAnalytics,
  buildOverviewModel,
  characterizeRoom,
  computeRoomIncidentSummary,
  computeWingEdgeTypeSummary,
  countEdgesWithUnresolvedEndpoints,
  countTotalRooms,
  formatPct,
  getRoomGraphSlice,
  getWingTunnelSlice,
  ordinal,
  rankRoomsInWingByDrawers,
  rankWingsByDrawers,
  rankWingsByRoomCount,
  sumDrawerCountsInWing,
  totalDrawersAcrossWings,
} from './insights.js';
import {
  GRAPH_REL_FILTERS_LS_KEY,
  buildGraphCompletenessHint,
  collectRelationshipTypesFromEdges,
  describeRoomRelationshipMix,
  filterEdgesByRelationshipTypes,
  formatRelationshipTypeCounts,
  getRelationshipTypeMeta,
  normalizeVisibleRelationshipTypes,
  parseSavedGraphRelFilters,
  sceneRelationshipFilterArg,
  summarizeVisibleGraphEdges,
} from './graph-relationships.js';
import { assertValidState, normalizePersistedNavigation, sanitizeNavigationAgainstData } from './state-utils.js';
import { canNavigateBack, peekRoomsBackAction } from './nav-focus.js';
import { devWarn, isDev } from './debug.js';
import {
  assertGraphBackInvariant,
  assertHeaderBackInvariant,
  assertNavScopeLevelInvariant,
} from './nav-dev-invariants.js';
import {
  parseRoomSceneId,
  popFocusHistory,
  pushFocusHistory,
  shouldPushHistoryOnGraphSearchJump,
  stepAdjacentRoom,
} from './graph-navigation.js';
import { buildSearchCatalog, normalizeSearchQuery, rankGraphSearch, stepWrapped } from './graph-search.js';
import {
  computeGraphRoute,
  DEFAULT_ROUTE_MODE,
  normalizeRouteMode,
  normalizeRouteStepIndex,
  roomIdFromSceneRoomId,
  ROUTE_MODE_META,
  ROUTE_MODES,
  sceneRoomIdFromRoomId,
  stepRouteIndex,
} from './graph-route.js';
import {
  summarizeGraphRoomNeighborhood,
  summarizeGraphWingNeighborhood,
} from './graph-workflow.js';
import {
  actionableWorkflowBullets,
  connectionsSectionNoExplicitEdgesLine,
  graphInspectorNoEdgesNoticeLines,
  graphInspectorUnresolvedEndpointsLines,
  graphToolbarPrimaryStatusLine,
  howConnectionsWorkBullets,
  knowledgeGraphStatsUnavailableLine,
  metricFootnoteGraphViewPrefix,
  neighborStepDisconnectedMessage,
  routeDisconnectedDetailLines,
  routeInspectorBasisLine,
  roomWithNoTunnelNeighborsGuidance,
  shouldShowHowConnectionsExplainer,
  shouldShowTunnelWorkflowCard,
} from './graph-guidance.js';
import {
  applyDrawerListView,
  buildRoomStoredContentSectionHtml,
  buildWingStoredContentSectionHtml,
  normalizeGetDrawerPayload,
  normalizeListDrawersPayload,
} from './content-inspector.js';

const LS_KEY = 'mempalace-viz-explorer-v1';
const ROUTE_MODE_LS_KEY = 'mempalace-viz-route-mode-v1';
const PANEL_STATE_KEY = 'mempalace-viz-panel-state-v1';
const MINING_OVERLAY_LS_KEY = 'mempalace-viz-mining-overlay-v1';

/** Enabled relationship types for graph view; normalized when palace data loads. */
let graphRelEnabledTypes = new Set();

/** @type {'off'|'hubs'|'activity'} */
let miningOverlayMode = 'off';

const VIEWS = [
  { id: 'wings', title: 'Wings', hint: 'High-level structure by domain or project.' },
  { id: 'rooms', title: 'Rooms', hint: 'Rooms within each wing, orbiting their parent.' },
  {
    id: 'graph',
    title: 'Graph',
    hint: 'How rooms connect (MCP links). Click a node first — then inspect, step links, or jump to folder layout in Rooms.',
  },
];

/** Canonical app state — single source of truth for navigation & selection */
const appState = {
  view: 'wings',
  hovered: null,
  selected: null,
  pinned: false,
  currentWing: null,
  currentRoom: null,
  searchQuery: '',
  filters: { visibleWings: null },
};

let sceneApi = null;
let dataBundle = null;
let lastGoodFetchedAt = null;
let searchDebounce = null;
let pendingPersist = null;
/** @type {HTMLElement | null} */
let helpFocusBefore = null;
let toastClearTimer = null;

/** @type {object[]} Graph focus stack (see `captureGraphFocusSnapshot`) */
const graphFocusHistory = [];

/**
 * Graph search (wings + rooms) — catalog rebuilt when palace data loads.
 * History: the first scene jump after the normalized query changes may push focus history once
 * (when replacing an existing graph selection). Stepping results (Alt+N/P, or list + Enter) does not
 * add further stack entries until the query changes. Manual node clicks use the normal graph path.
 */
let graphSearchCatalog = [];
/** @type {Array<{ sceneId: string, kind: string, label: string, sublabel: string, score: number }>} */
let graphSearchMatches = [];
let graphSearchResultIndex = 0;
/** False until the first jump to a result for the current query string (trimmed). */
let graphSearchFirstApplyDone = false;
let graphSearchLastQueryKey = '';

/** @type {Record<string, unknown>} Cached <code>mempalace_traverse</code> JSON by room name */
let traversePreviewByRoom = {};

/** Inspector: list/detail for drawers in the selected room (MCP list_drawers / get_drawer). */
const roomContentExplorer = {
  wing: null,
  room: null,
  offset: 0,
  limit: 12,
  listRaw: null,
  listLoading: false,
  listError: null,
  pane: 'list',
  detailDrawerId: null,
  detailRaw: null,
  detailLoading: false,
  detailError: null,
  /** Client-side filter for the current list page (debounced re-render). */
  listFilter: '',
  listSort: 'server',
  /** @type {'room' | null} */
  _restoreFilterFocus: null,
  _filterCaret: null,
};

/** Inspector: paginated sample across a wing (wing filter only). */
const wingContentExplorer = {
  wing: null,
  offset: 0,
  limit: 10,
  listRaw: null,
  listLoading: false,
  listError: null,
  pane: 'list',
  detailDrawerId: null,
  detailRaw: null,
  detailLoading: false,
  detailError: null,
  listFilter: '',
  listSort: 'server',
  /** @type {'wing' | null} */
  _restoreFilterFocus: null,
  _filterCaret: null,
};

/** @type {ReturnType<typeof setTimeout> | null} */
let storedContentFilterDebounce = null;

let semanticSearchDebounce = null;
/** @type {Array<{ wing: string, room: string, similarity: number, preview: string }>} */
let semanticSearchHits = [];

/** Dedupe hover-driven inspector refreshes (see `ui-hover-policy.js`). */
let lastInspectorHoverKey = '';

/**
 * Graph route (room → room) — 3D path highlight + inspector context.
 * History: route stepping does not push graph focus history (same rule as search result stepping).
 * Changing route start/target does not pop history.
 * Route modes (Shortest vs weighted) persist in localStorage; all routing uses only edges visible
 * under current relationship-type filters — see graph-route.js / recomputeGraphRoute.
 */
let graphRoute = {
  /** @type {string | null} */
  startSceneId: null,
  /** @type {string | null} */
  targetSceneId: null,
  /** @type {ReturnType<typeof computeGraphRoute> | null} */
  result: null,
  stepIndex: 0,
};

/** @type {string} */
let graphRouteMode = DEFAULT_ROUTE_MODE;

function loadRouteMode() {
  try {
    const raw = localStorage.getItem(ROUTE_MODE_LS_KEY);
    if (raw) return normalizeRouteMode(JSON.parse(raw));
  } catch {
    /* ignore */
  }
  return DEFAULT_ROUTE_MODE;
}

function persistRouteMode(mode) {
  try {
    localStorage.setItem(ROUTE_MODE_LS_KEY, JSON.stringify(normalizeRouteMode(mode)));
  } catch {
    /* ignore */
  }
}

graphRouteMode = loadRouteMode();

const $ = (id) => document.getElementById(id);

function isTypingTarget(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  return false;
}

function showToast(message, ms = 5200) {
  const host = $('toast-host');
  if (!host) return;
  clearTimeout(toastClearTimer);
  host.innerHTML = `<div class="toast" role="status">${escapeHtml(message)}</div>`;
  toastClearTimer = setTimeout(() => {
    host.innerHTML = '';
  }, ms);
}

function graphViewInspectorNotice(ctx) {
  if (appState.view !== 'graph') return '';
  const gs = dataBundle?.graphStats;
  const graph = dataBundle?.graph;
  const edges = dataBundle?.graph?.edgesResolved?.length ?? dataBundle?.graphEdges?.length ?? 0;
  const unresolvedApi = Array.isArray(graph?.edgesUnresolved)
    ? graph.edgesUnresolved.length
    : Array.isArray(gs?.edgesUnresolved)
      ? gs.edgesUnresolved.length
      : null;
  if (!edges) {
    const n = graphInspectorNoEdgesNoticeLines();
    return `<div class="inspect-card inspect-card--hint" role="status"><strong>${escapeHtml(n.title)}</strong><p class="inspect-muted inspect-muted--tight">${escapeHtml(n.body)}</p></div>`;
  }
  if (!ctx.ga?.hasResolvableEdges) {
    const unresolved =
      unresolvedApi != null
        ? unresolvedApi
        : countEdgesWithUnresolvedEndpoints(
            dataBundle?.graphEdges,
            dataBundle?.roomsData,
            graph?.edgesUnresolved?.length ?? null,
          );
    const n = graphInspectorUnresolvedEndpointsLines(edges, unresolved);
    return `<div class="inspect-card inspect-card--hint" role="status"><strong>${escapeHtml(n.title)}</strong><p class="inspect-muted inspect-muted--tight">${escapeHtml(n.body)}</p></div>`;
  }
  return '';
}

/** Collapsible MCP-honest guidance in Graph overview (compact; keeps scene primary). */
function graphGuidanceBlocksHtml(ctx) {
  const palaceOk = !!dataBundle && !dataBundle.error;
  if (
    !shouldShowHowConnectionsExplainer({
      viewIsGraph: appState.view === 'graph',
      palaceDataOk: palaceOk,
    })
  ) {
    return '';
  }
  const how = howConnectionsWorkBullets()
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join('');
  const showWorkflow = shouldShowTunnelWorkflowCard({
    viewIsGraph: appState.view === 'graph',
    hasResolvableGraph: !!ctx.ga?.hasResolvableEdges,
  });
  const workflow = showWorkflow
    ? actionableWorkflowBullets()
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join('')
    : '';
  return `
    <details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">How connections work</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${how}</ul>
    </details>
    ${
      showWorkflow
        ? `<details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">Tunnels &amp; refresh</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${workflow}</ul>
    </details>`
        : ''
    }`;
}

function shouldIgnoreHover() {
  return !!(appState.pinned && appState.selected);
}

function captureGraphFocusSnapshot() {
  return {
    view: 'graph',
    selected: appState.selected,
    pinned: appState.pinned,
    currentWing: appState.currentWing,
    currentRoom: appState.currentRoom,
  };
}

function graphExploreStripHtml() {
  if (appState.view !== 'graph' || !appState.selected || appState.selected.type === 'center') return '';
  const id = appState.selected.id;
  const n = sceneApi?.getGraphNeighbors?.(id)?.length ?? 0;
  const hasNbr = n > 0;
  const rr = graphRoute.result;
  const routeOk = rr?.ok && rr.pathSceneIds?.length;
  const pathN = routeOk ? rr.pathSceneIds.length : 0;
  const hopLabel = routeOk ? `Hop ${normalizeRouteStepIndex(graphRoute.stepIndex, pathN) + 1} / ${pathN}` : '';
  const showRouteMode = appState.view === 'graph' && graphRoute.startSceneId;
  const modeChips = showRouteMode
    ? `<div class="graph-route-mode" role="group" aria-label="Route mode">${ROUTE_MODES.map((m) => {
        const on = graphRouteMode === m;
        const meta = ROUTE_MODE_META[m];
        return `<button type="button" class="route-mode-chip ${on ? 'is-on' : ''}" data-route-mode="${escapeHtml(
          m,
        )}" title="${escapeHtml(meta.hint)}">${escapeHtml(meta.shortLabel)}</button>`;
      }).join('')}</div>`
    : '';
  const compareHint =
    routeOk && rr.comparisonNote
      ? `<div class="graph-route-scroll-extra" role="note">${escapeHtml(rr.comparisonNote)}</div>`
      : '';

  const routeCompact =
    routeOk || showRouteMode
      ? `<div class="graph-route-compact" role="group" aria-label="${routeOk ? 'Route along highlighted path' : 'Route mode'}">
    ${modeChips}
    ${
      routeOk
        ? `<span class="graph-route-compact__status"><span class="graph-route-compact__hop">${escapeHtml(hopLabel)}</span><span class="graph-route-compact__sep" aria-hidden="true">·</span><span>${rr.hops} edge${
            rr.hops === 1 ? '' : 's'
          }</span><span class="graph-route-compact__sep" aria-hidden="true">·</span><span>${escapeHtml(
            ROUTE_MODE_META[graphRouteMode]?.shortLabel || graphRouteMode,
          )}</span></span>
    <span class="graph-route-compact__nav">
      <button type="button" class="btn btn--ghost btn--sm graph-route-compact__btn" data-graph-action="route-start" title="Jump to route start">Start</button>
      <button type="button" class="btn btn--ghost btn--sm graph-route-compact__btn" data-graph-action="route-prev" ${pathN > 1 ? '' : 'disabled'} title="Previous hop ([ when route active)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm graph-route-compact__btn" data-graph-action="route-next" ${pathN > 1 ? '' : 'disabled'} title="Next hop (] when route active)">▶</button>
      <button type="button" class="btn btn--ghost btn--sm graph-route-compact__btn" data-graph-action="route-end" title="Jump to route end">End</button>
      <button type="button" class="btn btn--ghost btn--sm graph-route-compact__btn" data-graph-action="route-clear" title="Clear route highlight">Clear</button>
    </span>`
        : `<span class="graph-route-compact__hint">Applies when you route to a target.</span>`
    }
  </div>`
      : '';

  const stepDisabled = hasNbr && !routeOk ? '' : 'disabled';
  const backDisabled = graphFocusHistory.length > 0 ? '' : 'disabled';
  const routeChromeBusy = !!(routeOk || showRouteMode);
  const chromeClass = `graph-inspector-chrome${routeChromeBusy ? ' graph-inspector-chrome--route-busy' : ''}`;
  /* Sticky chrome first so controls stay at the top of the strip; route comparison note follows and scrolls with body. */
  return `<div class="${chromeClass}">
    ${routeCompact}
    <div class="graph-focus-toolbar graph-focus-toolbar--compact" role="region" aria-label="Graph selection and navigation">
      <div class="graph-focus-toolbar__top">
        <div class="graph-focus-toolbar__identity">
          <span class="graph-focus-toolbar__title">Graph focus</span>
          <span class="graph-focus-toolbar__meta">${n} visible link${n === 1 ? '' : 's'}</span>
        </div>
        <div class="graph-focus-toolbar__tools">
          <button type="button" class="btn btn--graph-primary btn--sm" data-graph-action="frame-nbr" title="Fit the camera to this node and its visible edges (does not change selection)">Frame</button>
          <div class="graph-focus-toolbar__step" role="group" aria-label="Step along neighbor ring">
            <span class="graph-focus-toolbar__step-label">Step</span>
            <button type="button" class="btn btn--ghost btn--sm" data-graph-action="prev" ${stepDisabled} title="Previous neighbor on the ring ([)">◀</button>
            <button type="button" class="btn btn--ghost btn--sm" data-graph-action="next" ${stepDisabled} title="Next neighbor on the ring (])">▶</button>
          </div>
          <button type="button" class="btn btn--ghost btn--sm" data-graph-action="back" ${backDisabled} title="Restore the previous graph focus after a jump or neighbor step (U)">Back</button>
          <span class="graph-focus-toolbar__tools-gap" aria-hidden="true"></span>
          <button type="button" class="btn btn--ghost btn--sm graph-focus-toolbar__soft" data-graph-action="open-structure" title="Switch to Rooms view — same wing in taxonomy folder layout (structure, not tunnel topology)">Rooms tree</button>
          <button type="button" class="btn btn--ghost btn--sm graph-focus-toolbar__soft" data-graph-action="clear-focus" title="Clear selection and unlock the inspector — same as Clear in the toolbar">Clear</button>
        </div>
      </div>
      <details class="graph-focus-toolbar__legend-wrap">
        <summary class="graph-focus-toolbar__legend-summary">Shortcuts &amp; legend</summary>
        <ul class="graph-focus-toolbar__legend">
          <li><strong>Frame</strong> — camera only: fit this node and its drawn edges in view.</li>
          <li><strong>Step</strong> — move selection along the sorted neighbor ring ([ / ]); pushes focus history.</li>
          <li><strong>Back</strong> — undo the last graph focus change (stack), not camera-only.</li>
          <li><strong>Rooms tree</strong> — same wing in folder layout; leaves Graph view.</li>
          <li><strong>Clear</strong> — drop selection; inspector returns to overview / hover preview.</li>
        </ul>
      </details>
    </div>
  </div>${compareHint}`;
}

function graphFrameNeighborhood() {
  if (appState.view !== 'graph' || !appState.selected?.id) return;
  sceneApi?.centerOnNodeId(appState.selected.id);
}

/** Leave graph view while keeping the same wing/room — taxonomy (Rooms) vs relationship (Graph). */
function graphJumpToStructureView() {
  if (appState.view !== 'graph' || !appState.selected || appState.selected.type === 'center') return;
  const sel = appState.selected;
  closeHelpIfOpen();
  if (sel.type === 'room') {
    appState.currentWing = sel.wing;
    appState.currentRoom = sel.name;
    appState.pinned = false;
    applyView('rooms');
    sceneApi?.centerOnNodeId(sel.id);
    syncScenePresentation();
    showToast('Rooms view — folder-shaped layout for this wing. Press 3 for Graph again.', 5200);
    return;
  }
  if (sel.type === 'wing') {
    graphFocusHistory.length = 0;
    clearGraphRoute();
    navigateToWing(sel.name);
    showToast('Rooms view — folder-shaped layout for this wing. Press 3 for Graph again.', 5200);
  }
}

function graphStepNeighbor(delta) {
  if (appState.view !== 'graph' || !appState.selected?.id || !sceneApi?.getGraphNeighbors) return;
  const cur = appState.selected.id;
  const nbr = sceneApi.getGraphNeighbors(cur);
  const next = stepAdjacentRoom(nbr, cur, delta);
  if (!next) {
    showToast(neighborStepDisconnectedMessage());
    return;
  }
  if (next === cur) return;
  const pr = parseRoomSceneId(next);
  if (!pr || !dataBundle) return;
  if (!roomExists(dataBundle.roomsData, pr.wing, pr.room)) return;
  pushFocusHistory(graphFocusHistory, captureGraphFocusSnapshot());
  const rm = (dataBundle.roomsData[pr.wing] || []).find((r) => r.name === pr.room);
  appState.currentWing = pr.wing;
  appState.currentRoom = pr.room;
  appState.selected = {
    id: next,
    type: 'room',
    name: pr.room,
    wing: pr.wing,
    wingId: pr.wing,
    roomId: rm?.roomId || makeRoomId(pr.wing, pr.room),
    drawers: rm?.drawers,
  };
  appState.pinned = true;
  syncScenePresentation();
  sceneApi?.centerOnNodeId(next);
  renderInspector();
  persistState();
}

function graphFocusBack() {
  if (graphFocusHistory.length === 0) return;
  const prev = popFocusHistory(graphFocusHistory);
  if (!prev || prev.view !== 'graph' || !prev.selected?.id) {
    return;
  }
  appState.selected = prev.selected;
  appState.pinned = prev.pinned;
  appState.currentWing = prev.currentWing;
  appState.currentRoom = prev.currentRoom;
  syncScenePresentation();
  sceneApi?.centerOnNodeId(prev.selected.id);
  updateMetrics();
  updateGraphViewChrome();
  renderInspector();
  persistState();
}

function clearGraphRoute() {
  graphRoute = { startSceneId: null, targetSceneId: null, result: null, stepIndex: 0 };
  syncScenePresentation();
  renderInspector();
  persistState();
}

/**
 * Changing route mode recomputes the active route (if start+target set) and preserves hop index when possible.
 * Does not push graph focus history (same family as filter-driven recompute).
 */
function setGraphRouteMode(mode) {
  const next = normalizeRouteMode(mode);
  if (next === graphRouteMode) return;
  graphRouteMode = next;
  persistRouteMode(next);
  if (graphRoute.startSceneId && graphRoute.targetSceneId) {
    const prevStep = graphRoute.stepIndex;
    recomputeGraphRoute();
    const res = graphRoute.result;
    if (res?.ok && res.pathSceneIds?.length) {
      graphRoute.stepIndex = normalizeRouteStepIndex(prevStep, res.pathSceneIds.length);
      applyGraphRouteToSceneSelection();
      sceneApi?.centerOnNodeId(appState.selected?.id);
    } else {
      graphRoute.stepIndex = 0;
    }
    if (res && !res.ok) {
      showToast(res.message || 'No route for this mode.');
    }
  }
  syncScenePresentation();
  renderInspector();
}

function routePresentationPayload() {
  const r = graphRoute.result;
  if (r && r.ok && Array.isArray(r.pathSceneIds) && r.pathSceneIds.length) {
    const n = r.pathSceneIds.length;
    const step = normalizeRouteStepIndex(graphRoute.stepIndex, n);
    const bridgeSceneIds = (r.bridges || []).map((rid) => sceneRoomIdFromRoomId(rid)).filter(Boolean);
    return {
      active: true,
      pathSceneIds: r.pathSceneIds,
      stepIndex: step,
      segmentTypes: r.segmentTypes || [],
      bridgeSceneIds,
    };
  }
  return { active: false, pathSceneIds: [], stepIndex: 0, segmentTypes: [], bridgeSceneIds: [] };
}

function recomputeGraphRoute() {
  if (!dataBundle || appState.view !== 'graph') {
    graphRoute.result = null;
    return;
  }
  const start = graphRoute.startSceneId;
  const target = graphRoute.targetSceneId;
  if (!start || !target || !start.startsWith('room:') || !target.startsWith('room:')) {
    graphRoute.result = null;
    return;
  }
  const a = roomIdFromSceneRoomId(start);
  const b = roomIdFromSceneRoomId(target);
  if (!a || !b) {
    graphRoute.result = { ok: false, reason: 'bad_scene', message: 'Could not resolve route endpoints.' };
    return;
  }
  const avail = collectRelationshipTypesFromEdges(getPalaceLegacyGraphEdgesForView(dataBundle.graph));
  graphRoute.result = computeGraphRoute({
    graphEdges: getPalaceLegacyGraphEdgesForView(dataBundle.graph),
    roomsData: dataBundle.roomsData || {},
    enabledRelTypes: graphRelEnabledTypes,
    availableRelTypes: avail,
    startRoomId: a,
    endRoomId: b,
    routeMode: graphRouteMode,
  });
  if (graphRoute.result.ok && graphRoute.result.pathSceneIds?.length) {
    graphRoute.stepIndex = normalizeRouteStepIndex(graphRoute.stepIndex, graphRoute.result.pathSceneIds.length);
  } else {
    graphRoute.stepIndex = 0;
  }
}

function applyGraphRouteToSceneSelection() {
  const r = graphRoute.result;
  if (!r?.ok || !r.pathSceneIds?.length) return;
  const ix = normalizeRouteStepIndex(graphRoute.stepIndex, r.pathSceneIds.length);
  const sceneId = r.pathSceneIds[ix];
  const pr = parseRoomSceneId(sceneId);
  if (!pr || !dataBundle) return;
  const rm = (dataBundle.roomsData[pr.wing] || []).find((x) => x.name === pr.room);
  appState.currentWing = pr.wing;
  appState.currentRoom = pr.room;
  appState.selected = {
    id: sceneId,
    type: 'room',
    name: pr.room,
    wing: pr.wing,
    wingId: pr.wing,
    roomId: rm?.roomId || makeRoomId(pr.wing, pr.room),
    drawers: rm?.drawers,
  };
  appState.pinned = true;
}

function graphRouteSetStartFromSelection() {
  if (appState.view !== 'graph' || appState.selected?.type !== 'room' || !appState.selected?.id) {
    showToast('Select a room in Graph view first.');
    return;
  }
  graphRoute.startSceneId = appState.selected.id;
  if (graphRoute.targetSceneId) recomputeGraphRoute();
  else graphRoute.result = null;
  syncScenePresentation();
  renderInspector();
  persistState();
  showToast('Route start set — pick a target room or use search “Route”.');
}

function graphRouteSetTarget(sceneId) {
  if (appState.view !== 'graph') applyView('graph');
  if (!sceneId || !sceneId.startsWith('room:')) {
    showToast('Route target must be a room.');
    return;
  }
  if (!graphRoute.startSceneId) {
    showToast('Set a route start first (inspector: “Set as route start”).');
    return;
  }
  graphRoute.targetSceneId = sceneId;
  recomputeGraphRoute();
  const res = graphRoute.result;
  if (res && !res.ok) {
    showToast(res.message || 'No route found.');
  } else if (res?.ok) {
    graphRoute.stepIndex = 0;
    applyGraphRouteToSceneSelection();
    sceneApi?.centerOnNodeId(appState.selected?.id);
    showToast(
      `Route · ${res.hops} hop${res.hops === 1 ? '' : 's'} · ${ROUTE_MODE_META[graphRouteMode]?.shortLabel || graphRouteMode}`,
    );
  }
  syncScenePresentation();
  renderInspector();
  persistState();
}

function graphRouteStepHop(delta) {
  const r = graphRoute.result;
  if (!r?.ok || !r.pathSceneIds?.length) return;
  const n = r.pathSceneIds.length;
  graphRoute.stepIndex = stepRouteIndex(graphRoute.stepIndex, delta, n);
  applyGraphRouteToSceneSelection();
  syncScenePresentation();
  sceneApi?.centerOnNodeId(appState.selected?.id);
  renderInspector();
  persistState();
}

function graphRouteJumpEndpoint(which) {
  const r = graphRoute.result;
  if (!r?.ok || !r.pathSceneIds?.length) return;
  const n = r.pathSceneIds.length;
  graphRoute.stepIndex = which === 'end' ? n - 1 : 0;
  applyGraphRouteToSceneSelection();
  syncScenePresentation();
  sceneApi?.centerOnNodeId(appState.selected?.id);
  renderInspector();
  persistState();
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]),
  );
}

function formatRouteInspectorSummary(res) {
  if (!res?.ok) return '';
  const mix = formatRelationshipTypeCounts(res.typeCounts) || '—';
  const bridges = res.bridges || [];
  const br =
    bridges.length > 0
      ? `Bridge rooms (cross-wing connectors): ${bridges.map((id) => id.split('/').pop()).join(', ')}.`
      : 'No interior cross-wing bridge hops — path is short or stays within-wing.';
  const modeLabel = ROUTE_MODE_META[res.routeMode]?.label || res.routeMode;
  const costBit =
    res.routeMode !== 'shortest' && res.totalCost != null ? ` · weighted cost ${res.totalCost}` : '';
  const mixLine = res.mixSummary ? `${res.mixSummary} ` : '';
  const compare = res.comparisonNote ? ` ${res.comparisonNote}` : '';
  const basis = routeInspectorBasisLine();
  return `${basis} Mode: ${modeLabel}${costBit}. ${res.hops} hop(s) on visible edges. ${mixLine}Types: ${mix}. ${br}${compare}`;
}

function formatNum(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return Number(n).toLocaleString();
}

function formatKgSummary(kg) {
  if (!kg || typeof kg !== 'object') return null;
  const parts = [];
  for (const [k, v] of Object.entries(kg)) {
    if (k === 'error') continue;
    if (typeof v === 'number') parts.push(`${k}: ${formatNum(v)}`);
    else if (typeof v === 'string') parts.push(`${k}: ${v}`);
  }
  return parts.length ? parts.slice(0, 8).join(' · ') : null;
}

/** Single-flight derived context for inspector + footer (recalculate when data or state changes). */
function buildPalaceContext() {
  const st = dataBundle?.status;
  const wingsData = dataBundle?.wingsData || {};
  const roomsData = dataBundle?.roomsData || {};
  const gs = dataBundle?.graphStats;
  const graph = dataBundle?.graph;
  const edgesExplicit = graph?.edgesResolved?.length ? graph.edgesResolved : gs?.edgesResolved || [];
  const edgesForGraphView = getPalaceCanonicalEdgesForView(graph);
  const legacyEdgesForView = getPalaceLegacyGraphEdgesForView(graph);
  const kg = dataBundle?.kgStats;
  const overviewStats = dataBundle?.overviewStats ?? dataBundle?.overviewBundle?.stats;
  const graphMeta =
    dataBundle?.graphMeta ?? dataBundle?.graph?.graphMeta ?? gs?.graphMeta ?? dataBundle?.overviewBundle?.graphMeta;

  const totalDrawers =
    typeof st?.total_drawers === 'number'
      ? st.total_drawers
      : typeof overviewStats?.totalDrawers === 'number'
        ? overviewStats.totalDrawers
        : totalDrawersAcrossWings(wingsData);
  const wingCount =
    typeof overviewStats?.totalWings === 'number' ? overviewStats.totalWings : Object.keys(wingsData).length;
  const roomCount =
    typeof overviewStats?.totalRooms === 'number' ? overviewStats.totalRooms : countTotalRooms(roomsData);
  let tunnelNodeCount = 0;
  const summary = graph?.summary ?? gs?.summary;
  if (summary?.resolvedEdgeCount != null) tunnelNodeCount = summary.resolvedEdgeCount;
  else if (gs?.tunnels && typeof gs.tunnels === 'object') tunnelNodeCount = Object.keys(gs.tunnels).length;

  const graphEdgeCount =
    typeof summary?.resolvedEdgeCount === 'number' ? summary.resolvedEdgeCount : edgesExplicit.length;
  const gaPalace = buildGraphAnalytics(roomsData, {
    edgesResolved: edgesExplicit,
    graphEdges: getPalaceLegacyGraphEdgesForView(graph),
    graphSummary: summary ?? null,
    overviewStats: overviewStats ?? null,
  });
  const gaGraph = buildGraphAnalytics(roomsData, {
    edgesResolved: edgesForGraphView,
    graphEdges: legacyEdgesForView,
    graphSummary: null,
    overviewStats: null,
  });
  const ga = appState.view === 'graph' ? gaGraph : gaPalace;

  const kgSummary = formatKgSummary(kg);
  const kgAvailable = !!(kg && typeof kg === 'object' && !kg.error);

  const availableRelationshipTypes = collectRelationshipTypesFromEdges(legacyEdgesForView);
  const visibleGraphSummary = summarizeVisibleGraphEdges(edgesForGraphView, graphRelEnabledTypes);
  const graphFilterNarrowed = sceneRelationshipFilterArg(graphRelEnabledTypes, availableRelationshipTypes) !== null;

  return {
    status: st,
    wingsData,
    roomsData,
    graphEdges: legacyEdgesForView,
    graphStats: gs,
    edgesResolved: edgesForGraphView,
    edgesExplicit,
    kgStats: kg,
    totalDrawers,
    wingCount,
    roomCount,
    tunnelNodeCount,
    graphEdgeCount,
    ga,
    gaPalace,
    gaGraph,
    kgAvailable,
    kgSummary,
    focusWing: appState.currentWing,
    overviewStats,
    graphMeta,
    summary,
    availableRelationshipTypes,
    visibleGraphSummary,
    graphFilterNarrowed,
  };
}

function loadGraphRelFiltersBlob() {
  try {
    const raw = localStorage.getItem(GRAPH_REL_FILTERS_LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistGraphRelFilters(enabledSet) {
  try {
    localStorage.setItem(GRAPH_REL_FILTERS_LS_KEY, JSON.stringify({ enabledTypes: [...(enabledSet || [])] }));
  } catch {
    /* ignore */
  }
}

function syncGraphRelationshipFiltersWithData() {
  const legacy = getPalaceLegacyGraphEdgesForView(dataBundle?.graph);
  const available = collectRelationshipTypesFromEdges(legacy);
  const blob = loadGraphRelFiltersBlob();
  const saved = blob == null ? undefined : parseSavedGraphRelFilters(blob);
  graphRelEnabledTypes = normalizeVisibleRelationshipTypes(saved, available);
  persistGraphRelFilters(graphRelEnabledTypes);
  sceneApi?.setRelationshipFilters(sceneRelationshipFilterArg(graphRelEnabledTypes, available));
}

function toggleRelationshipType(type) {
  const available = collectRelationshipTypesFromEdges(getPalaceLegacyGraphEdgesForView(dataBundle?.graph));
  if (!type || !available.includes(type)) return;
  if (graphRelEnabledTypes.has(type)) graphRelEnabledTypes.delete(type);
  else graphRelEnabledTypes.add(type);
  persistGraphRelFilters(graphRelEnabledTypes);
  sceneApi?.setRelationshipFilters(sceneRelationshipFilterArg(graphRelEnabledTypes, available));
  if (graphRoute.startSceneId && graphRoute.targetSceneId) {
    recomputeGraphRoute();
    const res = graphRoute.result;
    if (res && !res.ok) {
      showToast(res.message || 'No route on current visible edges — adjust filters or clear route.');
    }
  }
  renderInspector();
  updateMetrics();
  updateGraphViewChrome();
  syncScenePresentation();
}

function updateGraphViewChrome() {
  const wrap = $('graph-view-extras');
  if (!wrap) return;
  const show = appState.view === 'graph' && !!dataBundle && !dataBundle.error;
  wrap.hidden = !show;
  if (!show) return;

  const ctx = buildPalaceContext();
  const avail = ctx.availableRelationshipTypes || [];

  const chips = $('graph-rel-chips');
  if (chips) {
    if (!avail.length) {
      chips.innerHTML =
        '<span class="inspect-muted">No relationship-typed edges in the current graph payload.</span>';
    } else {
      chips.innerHTML = avail
        .map((t) => {
          const meta = getRelationshipTypeMeta(t);
          const on = graphRelEnabledTypes.has(t);
          const swatch =
            t === 'tunnel' ? '#5b8cff' : t === 'taxonomy_adjacency' ? '#3dc9b8' : '#a78bfa';
          return `<button type="button" class="rel-chip ${on ? 'is-on' : ''}" data-rel-type="${escapeHtml(t)}" title="${escapeHtml(meta.description)}">
          <span class="rel-chip__swatch" style="background:${swatch}"></span>
          <span>${escapeHtml(meta.shortLabel)}</span>
        </button>`;
        })
        .join('');
    }
  }

  const statusEl = $('graph-status-pill');
  if (statusEl) {
    const narrowed = ctx.graphFilterNarrowed;
    const vis = ctx.visibleGraphSummary;
    const hint = buildGraphCompletenessHint(ctx.graphMeta, ctx.summary);
    const primary = graphToolbarPrimaryStatusLine({
      resolvedFormatted: formatNum(ctx.graphEdgeCount),
      resolvedCount: ctx.graphEdgeCount,
      visibleFormatted: formatNum(vis.visibleEdgeCount),
      visibleCount: vis.visibleEdgeCount,
      graphFilterNarrowed: narrowed,
    });
    statusEl.innerHTML = `<span class="graph-status-pill__primary">${escapeHtml(primary)}</span>${
      hint
        ? `<span class="graph-status-pill__hint">${escapeHtml(hint.length > 240 ? `${hint.slice(0, 240)}…` : hint)}</span>`
        : ''
    }`;
  }

  const legend = $('graph-legend-compact');
  if (legend) {
    legend.innerHTML = avail.length
      ? `<span class="graph-legend-compact__line">Colors match chips. <strong>Tunnel</strong> — cross-wing discovery. <strong>Same-wing order</strong> — taxonomy sequence (structure).</span>`
      : '';
  }
}

function inspectSection(title, inner, emptyMessage) {
  const body =
    inner && String(inner).trim()
      ? inner
      : `<p class="inspect-empty">${escapeHtml(emptyMessage || 'No data.')}</p>`;
  return `
    <section class="inspect-section">
      <h3 class="inspect-section__title">${escapeHtml(title)}</h3>
      <div class="inspect-section__body">${body}</div>
    </section>`;
}

function inspectDisclosure(title, summary, inner, emptyMessage, open = false) {
  const body =
    inner && String(inner).trim()
      ? inner
      : `<p class="inspect-empty">${escapeHtml(emptyMessage || 'No details available.')}</p>`;
  return `
    <section class="inspect-section">
      <details class="inspect-details"${open ? ' open' : ''}>
        <summary class="inspect-section__title">${escapeHtml(title)}${summary ? `<span class="inspect-section__meta">${escapeHtml(summary)}</span>` : ''}</summary>
        <div class="inspect-section__body">${body}</div>
      </details>
    </section>`;
}

function pctBar(pct) {
  if (pct == null || Number.isNaN(Number(pct))) return '';
  const w = Math.min(100, Math.max(0, Number(pct)));
  return `<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${w}%"></div></div>`;
}

function clickRow(label, sub, attrs) {
  const a = attrs || {};
  const data = Object.entries(a)
    .map(([k, v]) => ` data-${k}="${escapeHtml(String(v))}"`)
    .join('');
  return `<button type="button" class="inspect-row inspect-row--action"${data}>
    <span class="inspect-row__main">${escapeHtml(label)}</span>
    <span class="inspect-row__meta">${escapeHtml(sub)}</span>
  </button>`;
}

function renderOverviewInspector(ctx) {
  const om = buildOverviewModel(ctx, appState.view);
  const edgeTypeLine =
    om.ga.byRelationshipType && Object.keys(om.ga.byRelationshipType).length
      ? Object.entries(om.ga.byRelationshipType)
          .map(([k, v]) => `${k}: ${formatNum(v)}`)
          .join(' · ')
      : '';
  const truncLine = ctx.graphMeta?.truncatedSources?.length
    ? ctx.graphMeta.truncatedSources
        .map((t) => {
          const known = t.totalMatching != null && t.totalMatching !== '' ? formatNum(t.totalMatching) : 'unknown';
          const inferred = t.inferred ? ' (heuristic)' : '';
          return `${t.source} limit ${formatNum(t.limit)} · ${known} rows reported${inferred}`;
        })
        .join('; ')
    : '';
  const completenessLine = (ctx.graphMeta?.completenessNotes || []).filter(Boolean).join(' ');
  const kgLine = om.kgAvailable ? om.kgSummary || '—' : knowledgeGraphStatsUnavailableLine();
  const topWings = om.largestWingsByDrawers
    .map(
      (r) =>
        clickRow(r.wing, `${formatNum(r.drawers)} drawers · #${r.rank}`, {
          'inspect-action': 'go-wing',
          wing: r.wing,
        }),
    )
    .join('');

  const topRooms = om.mostConnectedRooms.length
    ? om.mostConnectedRooms
        .map((r) =>
          clickRow(`${r.room}`, `${r.wing} · degree ${r.degree}`, {
            'inspect-action': 'select-room',
            wing: r.wing,
            room: r.room,
          }),
        )
        .join('')
    : '';

  const topCross = om.mostCrossLinkedWings.length
    ? om.mostCrossLinkedWings
        .map((x) =>
          clickRow(x.wing, `${formatNum(x.crossEdges)} cross-wing edges`, {
            'inspect-action': 'go-wing',
            wing: x.wing,
          }),
        )
        .join('')
    : '';

  const palaceBlurb = [
    `${formatNum(om.totalDrawers)} drawers across ${formatNum(om.wingCount)} wings and ${formatNum(om.roomCount)} rooms.`,
    om.tunnelNodeCount
      ? `${formatNum(om.graphEdgeCount)} resolved connections across the current relationship mix.`
      : 'No resolved connections in this snapshot yet.',
    om.graphBlurb,
  ]
    .filter(Boolean)
    .join(' ');

  const graphExplorerNote =
    appState.view === 'graph' && ctx.ga?.hasResolvableEdges && ctx.graphFilterNarrowed
      ? `<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${formatNum(ctx.visibleGraphSummary.visibleEdgeCount)} edges (${formatRelationshipTypeCounts(ctx.visibleGraphSummary.visibleByType) || '—'}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`
      : '';

  const graphOverviewWorkflow =
    appState.view === 'graph'
      ? `<div class="inspect-card inspect-card--hint graph-overview-workflow" role="region" aria-label="How to use graph view">
        <strong>Graph workflow</strong>
        <p class="inspect-muted inspect-muted--tight"><strong>Wings / Rooms</strong> — palace folder layout (where things live). <strong>Graph</strong> — how rooms link via MCP (relationships). Start by clicking a room or wing on the canvas; the inspector locks and the scene spotlights that neighborhood.</p>
        <p class="inspect-muted inspect-muted--tight">Then: step links with <kbd>[</kbd> <kbd>]</kbd>, back up with <kbd>U</kbd> or <strong>Back</strong>, or open <strong>Rooms tree</strong> after a selection to see the same wing in Rooms. <kbd>Esc</kbd> clears search first, then walks back navigation.</p>
      </div>`
      : '';

  return `
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${escapeHtml(om.viewHint)}</p>
        <p class="inspect-muted">${escapeHtml(palaceBlurb)}</p>
      </div>
      ${graphOverviewWorkflow}
      ${graphGuidanceBlocksHtml(ctx)}
      ${graphExplorerNote}
      ${inspectSection(
        'At a glance',
        `
        <div class="meta-block">
          ${metaRow('Drawers', formatNum(om.totalDrawers))}
          ${metaRow('Wings', formatNum(om.wingCount))}
          ${metaRow('Rooms', formatNum(om.roomCount))}
          ${metaRow('Resolved connections', formatNum(om.graphEdgeCount))}
          ${metaRow('Cross-wing links', om.ga.hasResolvableEdges ? formatNum(om.crossWingEdges) : '—')}
          ${metaRow('Rooms without links', om.ga.hasResolvableEdges ? formatNum(om.roomsWithNoTunnels) : '—')}
        </div>
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(kgLine)}</p>
        `,
      )}
      ${inspectSection(
        'Notable wings',
        `<div class="inspect-rows">${topWings || '<p class="inspect-empty">Wing sizing is unavailable in this snapshot.</p>'}</div>`,
      )}
      ${inspectSection(
        'Notable rooms',
        topRooms || '<p class="inspect-empty">No room-level links are available yet.</p>',
      )}
      ${inspectSection(
        'Cross-wing hotspots',
        topCross || '<p class="inspect-empty">No cross-wing links were resolved for this snapshot.</p>',
      )}
      ${renderDiscoverySectionOverview(ctx)}
      ${inspectDisclosure(
        'Data notes',
        'Source and completeness details',
        `
        <div class="meta-block">
          ${metaRow('Relationship mix', edgeTypeLine || '—')}
          ${metaRow('Upstream truncation', truncLine || 'none')}
        </div>
        ${completenessLine ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(completenessLine)}</p>` : '<p class="inspect-muted inspect-muted--tight">No completeness warnings were reported by upstream sources.</p>'}
        `,
      )}
      <div class="inspect-card inspect-card--hint">
        <strong>Navigate quickly</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views, click any wing or room to drill in, and Pin to keep this panel locked while you move.</p>
      </div>
    </div>`;
}

function renderDiscoverySectionOverview(ctx) {
  const model = buildPalaceMiningModel({
    edgesResolved: ctx.edgesExplicit,
    ga: ctx.gaPalace,
    graphMeta: ctx.graphMeta,
  });
  const topHubs = Object.entries(model.hubByRoomId)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k, w]) => {
      const pr = parseRoomId(k);
      if (!pr) return '';
      return clickRow(`${pr.roomName}`, `${(w * 100).toFixed(0)}% · ${pr.wingId}`, {
        'inspect-action': 'select-room',
        wing: pr.wingId,
        room: pr.roomName,
      });
    })
    .join('');
  const caveatItems = model.caveats.slice(0, 4);
  const caveatLines = caveatItems.map((c) => `<li>${escapeHtml(c)}</li>`).join('');
  return inspectSection(
    'Discovery signals',
    `<p class="inspect-muted inspect-muted--tight">Signals are derived from tunnel degree and optional tunnel-row <strong>recent</strong> timestamps. They highlight patterns only; they do not change graph truth.</p>
    <p class="inspect-micro">Highest hub emphasis</p>
    <div class="inspect-rows">${topHubs || '<p class="inspect-empty">No hub signal yet because no resolved links were found.</p>'}</div>
    <ul class="inspect-list-tight">${caveatLines || '<li class="inspect-muted">No provenance or metadata caveats were reported for this snapshot.</li>'}</ul>
    <p class="inspect-muted inspect-muted--tight">Enable <strong>Discovery overlays</strong> in Explore to tint rooms without changing structure.</p>`,
  );
}

function resetContentExplorers() {
  roomContentExplorer.wing = null;
  roomContentExplorer.room = null;
  roomContentExplorer.offset = 0;
  roomContentExplorer.listRaw = null;
  roomContentExplorer.listLoading = false;
  roomContentExplorer.listError = null;
  roomContentExplorer.pane = 'list';
  roomContentExplorer.detailDrawerId = null;
  roomContentExplorer.detailRaw = null;
  roomContentExplorer.detailLoading = false;
  roomContentExplorer.detailError = null;
  roomContentExplorer.listFilter = '';
  roomContentExplorer.listSort = 'server';
  roomContentExplorer._restoreFilterFocus = null;
  roomContentExplorer._filterCaret = null;
  wingContentExplorer.wing = null;
  wingContentExplorer.offset = 0;
  wingContentExplorer.listRaw = null;
  wingContentExplorer.listLoading = false;
  wingContentExplorer.listError = null;
  wingContentExplorer.pane = 'list';
  wingContentExplorer.detailDrawerId = null;
  wingContentExplorer.detailRaw = null;
  wingContentExplorer.detailLoading = false;
  wingContentExplorer.detailError = null;
  wingContentExplorer.listFilter = '';
  wingContentExplorer.listSort = 'server';
  wingContentExplorer._restoreFilterFocus = null;
  wingContentExplorer._filterCaret = null;
}

function ensureRoomContentExplorer(wing, room) {
  if (roomContentExplorer.wing === wing && roomContentExplorer.room === room) return;
  roomContentExplorer.wing = wing;
  roomContentExplorer.room = room;
  roomContentExplorer.offset = 0;
  roomContentExplorer.listRaw = null;
  roomContentExplorer.listLoading = false;
  roomContentExplorer.listError = null;
  roomContentExplorer.pane = 'list';
  roomContentExplorer.detailDrawerId = null;
  roomContentExplorer.detailRaw = null;
  roomContentExplorer.detailLoading = false;
  roomContentExplorer.detailError = null;
  roomContentExplorer.listFilter = '';
  roomContentExplorer.listSort = 'server';
}

function kickRoomListFetch() {
  if (!roomContentExplorer.wing || !roomContentExplorer.room) return;
  if (roomContentExplorer.pane !== 'list') return;
  if (roomContentExplorer.listLoading) return;
  if (roomContentExplorer.listRaw !== null) return;
  if (roomContentExplorer.listError) return;
  roomContentExplorer.listLoading = true;
  roomContentExplorer.listError = null;
  fetchListDrawers(roomContentExplorer.wing, roomContentExplorer.room, {
    limit: roomContentExplorer.limit,
    offset: roomContentExplorer.offset,
  })
    .then((raw) => {
      roomContentExplorer.listLoading = false;
      roomContentExplorer.listRaw = raw;
      renderInspector();
    })
    .catch((e) => {
      roomContentExplorer.listLoading = false;
      roomContentExplorer.listError = e?.message || String(e);
      renderInspector();
    });
}

function ensureWingContentExplorer(wing) {
  if (wingContentExplorer.wing === wing) return;
  wingContentExplorer.wing = wing;
  wingContentExplorer.offset = 0;
  wingContentExplorer.listRaw = null;
  wingContentExplorer.listLoading = false;
  wingContentExplorer.listError = null;
  wingContentExplorer.pane = 'list';
  wingContentExplorer.detailDrawerId = null;
  wingContentExplorer.detailRaw = null;
  wingContentExplorer.detailLoading = false;
  wingContentExplorer.detailError = null;
  wingContentExplorer.listFilter = '';
  wingContentExplorer.listSort = 'server';
}

function kickWingListFetch() {
  if (!wingContentExplorer.wing) return;
  if (wingContentExplorer.pane !== 'list') return;
  if (wingContentExplorer.listLoading) return;
  if (wingContentExplorer.listRaw !== null) return;
  if (wingContentExplorer.listError) return;
  wingContentExplorer.listLoading = true;
  wingContentExplorer.listError = null;
  fetchListDrawers(wingContentExplorer.wing, undefined, {
    limit: wingContentExplorer.limit,
    offset: wingContentExplorer.offset,
  })
    .then((raw) => {
      wingContentExplorer.listLoading = false;
      wingContentExplorer.listRaw = raw;
      renderInspector();
    })
    .catch((e) => {
      wingContentExplorer.listLoading = false;
      wingContentExplorer.listError = e?.message || String(e);
      renderInspector();
    });
}

function roomContentOpenDrawer(drawerId) {
  const id = typeof drawerId === 'string' ? drawerId.trim() : '';
  if (!id) return;
  roomContentExplorer.pane = 'detail';
  roomContentExplorer.detailDrawerId = id;
  roomContentExplorer.detailRaw = null;
  roomContentExplorer.detailLoading = true;
  roomContentExplorer.detailError = null;
  fetchDrawerById(id)
    .then((raw) => {
      roomContentExplorer.detailLoading = false;
      roomContentExplorer.detailRaw = raw;
      renderInspector();
    })
    .catch((e) => {
      roomContentExplorer.detailLoading = false;
      roomContentExplorer.detailError = e?.message || String(e);
      renderInspector();
    });
}

function roomContentBackToList() {
  roomContentExplorer.pane = 'list';
  roomContentExplorer.detailDrawerId = null;
  roomContentExplorer.detailRaw = null;
  roomContentExplorer.detailError = null;
  renderInspector();
}

function roomContentPaginate(dir) {
  const delta = Number(dir);
  if (!roomContentExplorer.wing || !roomContentExplorer.room) return;
  const next = Math.max(0, roomContentExplorer.offset + delta * roomContentExplorer.limit);
  if (next === roomContentExplorer.offset && delta < 0) return;
  roomContentExplorer.offset = next;
  roomContentExplorer.listRaw = null;
  roomContentExplorer.listError = null;
  kickRoomListFetch();
}

function roomContentRefreshList() {
  if (!roomContentExplorer.wing || !roomContentExplorer.room) return;
  roomContentExplorer.offset = 0;
  roomContentExplorer.listRaw = null;
  roomContentExplorer.listError = null;
  kickRoomListFetch();
}

function roomContentRetryDetail() {
  const id = roomContentExplorer.detailDrawerId;
  if (id) roomContentOpenDrawer(id);
}

function roomContentDetailStep(dir) {
  const delta = Number(dir);
  if (!Number.isFinite(delta) || delta === 0) return;
  const norm = normalizeListDrawersPayload(roomContentExplorer.listRaw);
  const view = applyDrawerListView(norm.items, roomContentExplorer.listFilter, roomContentExplorer.listSort);
  const id = roomContentExplorer.detailDrawerId;
  const idx = view.items.findIndex((x) => x.id === id);
  if (idx < 0) return;
  const nextIdx = idx + delta;
  if (nextIdx < 0 || nextIdx >= view.items.length) return;
  roomContentOpenDrawer(view.items[nextIdx].id);
}

function wingContentOpenDrawer(drawerId) {
  const id = typeof drawerId === 'string' ? drawerId.trim() : '';
  if (!id) return;
  wingContentExplorer.pane = 'detail';
  wingContentExplorer.detailDrawerId = id;
  wingContentExplorer.detailRaw = null;
  wingContentExplorer.detailLoading = true;
  wingContentExplorer.detailError = null;
  fetchDrawerById(id)
    .then((raw) => {
      wingContentExplorer.detailLoading = false;
      wingContentExplorer.detailRaw = raw;
      renderInspector();
    })
    .catch((e) => {
      wingContentExplorer.detailLoading = false;
      wingContentExplorer.detailError = e?.message || String(e);
      renderInspector();
    });
}

function wingContentBackToList() {
  wingContentExplorer.pane = 'list';
  wingContentExplorer.detailDrawerId = null;
  wingContentExplorer.detailRaw = null;
  wingContentExplorer.detailError = null;
  renderInspector();
}

function wingContentRetryDetail() {
  const id = wingContentExplorer.detailDrawerId;
  if (id) wingContentOpenDrawer(id);
}

function wingContentDetailStep(dir) {
  const delta = Number(dir);
  if (!Number.isFinite(delta) || delta === 0) return;
  const norm = normalizeListDrawersPayload(wingContentExplorer.listRaw);
  const view = applyDrawerListView(norm.items, wingContentExplorer.listFilter, wingContentExplorer.listSort);
  const id = wingContentExplorer.detailDrawerId;
  const idx = view.items.findIndex((x) => x.id === id);
  if (idx < 0) return;
  const nextIdx = idx + delta;
  if (nextIdx < 0 || nextIdx >= view.items.length) return;
  wingContentOpenDrawer(view.items[nextIdx].id);
}

function wingContentPaginate(dir) {
  const delta = Number(dir);
  if (!wingContentExplorer.wing) return;
  const next = Math.max(0, wingContentExplorer.offset + delta * wingContentExplorer.limit);
  if (next === wingContentExplorer.offset && delta < 0) return;
  wingContentExplorer.offset = next;
  wingContentExplorer.listRaw = null;
  wingContentExplorer.listError = null;
  kickWingListFetch();
}

function wingContentRefreshList() {
  if (!wingContentExplorer.wing) return;
  wingContentExplorer.offset = 0;
  wingContentExplorer.listRaw = null;
  wingContentExplorer.listError = null;
  kickWingListFetch();
}

function copyRoomDetailToClipboard() {
  const raw = roomContentExplorer.detailRaw;
  if (!raw) return;
  const n = normalizeGetDrawerPayload(raw);
  const text = n.content || '';
  if (!text) {
    showToast('Nothing to copy');
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied')).catch(() => showToast('Copy failed'));
  } else {
    showToast('Clipboard unavailable');
  }
}

function copyWingDetailToClipboard() {
  const raw = wingContentExplorer.detailRaw;
  if (!raw) return;
  const n = normalizeGetDrawerPayload(raw);
  const text = n.content || '';
  if (!text) {
    showToast('Nothing to copy');
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied')).catch(() => showToast('Copy failed'));
  } else {
    showToast('Clipboard unavailable');
  }
}

function renderWingInspector(ctx, wingName, _mode) {
  const { wingsData, roomsData, totalDrawers, ga, graphEdges } = ctx;
  const d = Number(wingsData[wingName]) || 0;
  const rooms = roomsData[wingName] || [];
  const roomN = rooms.length;
  const wingDrawerRank = rankWingsByDrawers(wingsData);
  const dr = wingDrawerRank.find((x) => x.wing === wingName);
  const roomRankList = rankWingsByRoomCount(roomsData);
  const rr = roomRankList.find((x) => x.wing === wingName);

  const pctDrawers = formatPct(d, totalDrawers);
  const totalRoomsAll = countTotalRooms(roomsData);
  const pctRooms = formatPct(roomN, totalRoomsAll);

  const sumRooms = sumDrawerCountsInWing(roomsData, wingName);
  const denom = sumRooms > 0 ? sumRooms : d;
  const avg = roomN ? (denom / roomN).toFixed(1) : null;

  const ranked = rankRoomsInWingByDrawers(roomsData, wingName);
  const largest = ranked[0];
  const smallest = ranked.length > 1 ? ranked[ranked.length - 1] : null;

  const sentence = [
    pctDrawers != null && dr
      ? `This wing contains ${pctDrawers}% of palace drawers and ranks ${ordinal(dr.rank)} by size.`
      : null,
    pctRooms != null && rr && roomN
      ? `${formatNum(roomN)} rooms are listed here (${pctRooms}% of all rooms, ${ordinal(rr.rank)} by room count).`
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  const tunnel = getWingTunnelSlice(wingName, graphEdges, roomsData, ctx.edgesExplicit);
  const edgesResolved = ctx.edgesResolved || [];
  const filteredForWing = filterEdgesByRelationshipTypes(edgesResolved, graphRelEnabledTypes);
  const wFull = computeWingEdgeTypeSummary(wingName, edgesResolved);
  const wVis = computeWingEdgeTypeSummary(wingName, filteredForWing);
  const wingRelNarrative = (() => {
    if (!ctx.graphFilterNarrowed || !ga.hasResolvableEdges) return '';
    const tf = wFull.byType.tunnel || 0;
    const tv = wVis.byType.tunnel || 0;
    if (tv > 0 && tf > 0 && tv < tf * 0.5)
      return 'With current filters, some cross-wing tunnel links in this wing are hidden.';
    if (wVis.crossWingTouches === 0 && tunnel.crossWingTouches > 0)
      return 'Cross-wing tunnel links are hidden by filters.';
    return '';
  })();

  const externalBlock =
    tunnel.crossWingTouches > 0
      ? `
      ${metaRow('Cross-wing tunnel touches', formatNum(tunnel.crossWingTouches))}
      <div class="inspect-rows">
        ${tunnel.topExternalWings
          .map((x) =>
            clickRow(x.wing, `${formatNum(x.edges)} edges`, { 'inspect-action': 'go-wing', wing: x.wing }),
          )
          .join('')}
      </div>`
      : '';

  const topByCross = tunnel.topRoomsByCrossWing
    .map((r) =>
      clickRow(r.room, `cross-wing ${formatNum(r.crossEdges)}`, {
        'inspect-action': 'select-room',
        wing: r.wing,
        room: r.room,
      }),
    )
    .join('');

  const topByDrawers = ranked.slice(0, 5).map((r) =>
    clickRow(r.name, `${formatNum(r.drawers)} drawers`, {
      'inspect-action': 'select-room',
      wing: wingName,
      room: r.name,
    }),
  );

  const byDegree = [...rooms]
    .map((r) => {
      const key = r.roomId || makeRoomId(wingName, r.name);
      const deg = ga.degreeByKey.get(key) ?? 0;
      return { ...r, deg };
    })
    .sort((a, b) => b.deg - a.deg)
    .slice(0, 5);
  const topByDeg = byDegree.length
    ? byDegree
        .map((r) =>
          clickRow(r.name, `degree ${r.deg}`, {
            'inspect-action': 'select-room',
            wing: wingName,
            room: r.name,
          }),
        )
        .join('')
    : '';

  const structureExtra =
    roomN === 0
      ? '<p class="inspect-empty">This wing is present, but room-level drawer details are not available.</p>'
      : `
      ${metaRow('Rooms listed', formatNum(roomN))}
      ${metaRow('Drawers (wing total)', formatNum(d))}
      ${avg != null ? metaRow('Avg drawers / room', avg) : ''}
      ${largest ? metaRow('Largest room', `${largest.name} (${formatNum(largest.drawers)})`) : ''}
      ${smallest && smallest.name !== largest?.name ? metaRow('Smallest room', `${smallest.name} (${formatNum(smallest.drawers)})`) : ''}
    `;

  const graphWingNeighborhoodSection =
    appState.view === 'graph' && ga.hasResolvableEdges
      ? (() => {
          const g = summarizeGraphWingNeighborhood({
            wVis,
            graphFilterNarrowed: ctx.graphFilterNarrowed,
            tunnelFull: tunnel,
          });
          return inspectSection(
            'Local neighborhood',
            `<div class="meta-block">
          ${metaRow('Cross-wing touches (visible)', formatNum(wVis.crossWingTouches))}
          ${metaRow('Relationship mix (visible)', formatRelationshipTypeCounts(wVis.byType) || '—')}
          ${ctx.graphFilterNarrowed ? metaRow('Relationship mix (global)', formatRelationshipTypeCounts(wFull.byType) || '—') : ''}
        </div>
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(g.roleLine)}</p>
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(g.shapeLine)}</p>
        ${g.mixLine ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(g.mixLine)}</p>` : ''}
        <p class="inspect-muted inspect-muted--tight">Drawer counts and ranks below are taxonomy (structure). Link counts are graph (relationships).</p>`,
          );
        })()
      : appState.view === 'graph'
        ? `<div class="inspect-card inspect-card--hint" role="status"><strong>Graph context</strong><p class="inspect-muted inspect-muted--tight">No resolvable edges in this snapshot — switch to Wings/Rooms for structure-only navigation.</p></div>`
        : '';

  const wingKeyRelTitle = appState.view === 'graph' ? 'Connections detail' : 'Key relationships';

  ensureWingContentExplorer(wingName);
  kickWingListFetch();
  const wingListNorm = normalizeListDrawersPayload(wingContentExplorer.listRaw);
  const wingView = applyDrawerListView(
    wingListNorm.items,
    wingContentExplorer.listFilter,
    wingContentExplorer.listSort,
  );
  let wingDetailNav = { positionLabel: '', hasPrev: false, hasNext: false };
  if (wingContentExplorer.pane === 'detail' && wingContentExplorer.detailDrawerId) {
    const idx = wingView.items.findIndex((x) => x.id === wingContentExplorer.detailDrawerId);
    wingDetailNav =
      idx >= 0
        ? {
            positionLabel: `${idx + 1} / ${wingView.items.length}`,
            hasPrev: idx > 0,
            hasNext: idx < wingView.items.length - 1,
          }
        : { positionLabel: '—', hasPrev: false, hasNext: false };
  }
  const wingStoredHtml = buildWingStoredContentSectionHtml({
    escapeHtml,
    wingName,
    listLoading: wingContentExplorer.listLoading,
    listError: wingContentExplorer.listError,
    listRaw: wingContentExplorer.listRaw,
    pane: wingContentExplorer.pane,
    detailLoading: wingContentExplorer.detailLoading,
    detailError: wingContentExplorer.detailError,
    detailRaw: wingContentExplorer.detailRaw,
    detailDrawerId: wingContentExplorer.detailDrawerId,
    offset: wingContentExplorer.offset,
    limit: wingContentExplorer.limit,
    hasPrev: wingContentExplorer.offset > 0,
    hasNext: wingListNorm.hasMore,
    listFilter: wingContentExplorer.listFilter,
    listSort: wingContentExplorer.listSort,
    displayItems: wingView.items,
    detailNav: wingDetailNav,
  });

  return `
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${escapeHtml(wingName)}</div>
        <p class="inspect-lead">${escapeHtml(sentence || 'Wing footprint in the palace.')}</p>
        ${pctDrawers != null ? `<div class="inspect-pct"><span>${pctDrawers}% of palace drawers</span>${pctBar(pctDrawers)}</div>` : ''}
      </div>
      ${wingStoredHtml}
      ${graphWingNeighborhoodSection}
      ${inspectSection(
        'Why it matters',
        `
        <div class="meta-block">
          ${metaRow('Drawers', formatNum(d))}
          ${metaRow('Size rank', dr ? `${ordinal(dr.rank)} of ${wingDrawerRank.length}` : '—')}
          ${metaRow('Rooms', formatNum(roomN))}
          ${metaRow('Room-count rank', rr ? `${ordinal(rr.rank)} of ${roomRankList.length}` : '—')}
        </div>`,
      )}
      ${inspectSection(
        wingKeyRelTitle,
        ga.hasResolvableEdges
          ? `<div class="meta-block">
          ${metaRow('Relationship mix', formatRelationshipTypeCounts(wFull.byType) || '—')}
          ${ctx.graphFilterNarrowed ? metaRow('Relationship mix (visible)', formatRelationshipTypeCounts(wVis.byType) || '—') : ''}
          ${ctx.graphFilterNarrowed ? metaRow('Cross-wing links (visible)', formatNum(wVis.crossWingTouches)) : ''}
        </div>
        ${wingRelNarrative ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(wingRelNarrative)}</p>` : ''}
        ${externalBlock || `<p class="inspect-empty">No cross-wing links touch this wing in the current graph.</p>`}
             ${topByCross ? `<p class="inspect-micro">Rooms with the most cross-wing links</p><div class="inspect-rows">${topByCross}</div>` : ''}`
          : '<p class="inspect-empty">No resolvable room links were found for this wing.</p>',
      )}
      ${inspectSection(
        'Top rooms',
        `<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${topByDrawers.join('')}</div>
         ${topByDeg ? `<p class="inspect-micro">Most connected by links</p><div class="inspect-rows">${topByDeg}</div>` : '<p class="inspect-empty">No connectivity ranking is available for rooms in this wing.</p>'}`,
      )}
      ${inspectSection('Useful stats', `<div class="meta-block">${structureExtra}</div>`)}
      ${inspectDisclosure(
        'Diagnostics',
        'Advanced structural note',
        `<p class="inspect-muted">${escapeHtml(
          ga.topCrossLinkedWings[0]?.wing === wingName
            ? 'This wing is among the most cross-linked in the tunnel graph.'
            : tunnel.crossWingTouches > 0
              ? 'Participates in cross-wing tunnels; see Connections for peers.'
              : roomN > 0
                ? 'No cross-wing tunnel edges touch this wing in the current graph.'
                : 'Add taxonomy rooms to compare structure.',
        )}</p>`,
      )}
    </div>`;
}

function renderRoomInspector(ctx, wingName, roomName, _mode) {
  const { wingsData, roomsData, totalDrawers, ga } = ctx;
  const rooms = roomsData[wingName] || [];
  const room = rooms.find((r) => r.name === roomName);
  const drawers = room ? Number(room.drawers) || 0 : null;

  ensureRoomContentExplorer(wingName, roomName);
  kickRoomListFetch();
  const roomListNorm = normalizeListDrawersPayload(roomContentExplorer.listRaw);
  const roomView = applyDrawerListView(
    roomListNorm.items,
    roomContentExplorer.listFilter,
    roomContentExplorer.listSort,
  );
  let roomDetailNav = { positionLabel: '', hasPrev: false, hasNext: false };
  if (roomContentExplorer.pane === 'detail' && roomContentExplorer.detailDrawerId) {
    const idx = roomView.items.findIndex((x) => x.id === roomContentExplorer.detailDrawerId);
    roomDetailNav =
      idx >= 0
        ? {
            positionLabel: `${idx + 1} / ${roomView.items.length}`,
            hasPrev: idx > 0,
            hasNext: idx < roomView.items.length - 1,
          }
        : { positionLabel: '—', hasPrev: false, hasNext: false };
  }
  const storedContentHtml = buildRoomStoredContentSectionHtml({
    escapeHtml,
    wingName,
    roomName,
    taxonomyDrawerCount: drawers,
    listLoading: roomContentExplorer.listLoading,
    listError: roomContentExplorer.listError,
    listRaw: roomContentExplorer.listRaw,
    pane: roomContentExplorer.pane,
    detailLoading: roomContentExplorer.detailLoading,
    detailError: roomContentExplorer.detailError,
    detailRaw: roomContentExplorer.detailRaw,
    detailDrawerId: roomContentExplorer.detailDrawerId,
    offset: roomContentExplorer.offset,
    limit: roomContentExplorer.limit,
    hasPrev: roomContentExplorer.offset > 0,
    hasNext: roomListNorm.hasMore,
    listFilter: roomContentExplorer.listFilter,
    listSort: roomContentExplorer.listSort,
    displayItems: roomView.items,
    detailNav: roomDetailNav,
  });

  const wingTotal = Number(wingsData[wingName]) || 0;
  const sumInWing = sumDrawerCountsInWing(roomsData, wingName);
  const wingDen = sumInWing > 0 ? sumInWing : wingTotal;

  const ranked = rankRoomsInWingByDrawers(roomsData, wingName);
  const rr = ranked.find((r) => r.name === roomName);

  const pctWing = drawers != null && wingDen > 0 ? formatPct(drawers, wingDen) : null;
  const pctPalace = drawers != null && totalDrawers > 0 ? formatPct(drawers, totalDrawers) : null;

  const sentence = [
    rr && pctWing != null
      ? `${roomName} is the ${ordinal(rr.rank)} largest room in ${wingName} and holds about ${pctWing}% of the wing's drawers.`
      : null,
    pctPalace != null ? `It accounts for ${pctPalace}% of the full palace.` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const roomKey = makeRoomId(wingName, roomName);
  const slice = getRoomGraphSlice(roomKey, ga);
  const graphAvailable = ga.hasResolvableEdges;
  const edgesResolved = ctx.edgesResolved || [];
  const filteredEdges = filterEdgesByRelationshipTypes(edgesResolved, graphRelEnabledTypes);
  const fullRoomInc = computeRoomIncidentSummary(roomKey, edgesResolved);
  const visRoomInc = computeRoomIncidentSummary(roomKey, filteredEdges);
  const relMixNote = describeRoomRelationshipMix(visRoomInc.byType, fullRoomInc.byType);

  const insight = characterizeRoom(
    {
      drawers: drawers ?? 0,
      wingRoomSum: wingDen,
      palaceTotal: totalDrawers,
    },
    slice,
    graphAvailable,
  );

  const wingAvg = wingDen > 0 && rooms.length ? wingDen / rooms.length : null;
  const cmp =
    drawers != null && wingAvg != null
      ? drawers >= wingAvg * 1.1
        ? 'Above wing average size'
        : drawers <= wingAvg * 0.9
          ? 'Below wing average size'
          : 'Near wing average size'
      : '—';

  const relatedRoomCandidates = (slice?.relatedRooms || []).filter(
    (x) => !(x.wing === wingName && x.room === roomName),
  );
  const relRooms = relatedRoomCandidates.slice(0, 6);
  const relRoomsGraphJump = appState.view === 'graph' ? relatedRoomCandidates.slice(0, 8) : [];

  const relRoomRows = relRooms.length
    ? relRooms
        .map((r) =>
          clickRow(`${r.room}`, `${r.wing} · deg ${r.degree}`, {
            'inspect-action': 'select-room',
            wing: r.wing,
            room: r.room,
          }),
        )
        .join('')
    : '';

  const graphNeighborJumpRows = relRoomsGraphJump.length
    ? relRoomsGraphJump
        .map((r) =>
          clickRow(`${r.room}`, `${r.wing} · ${r.degree} link${r.degree === 1 ? '' : 's'}`, {
            'inspect-action': 'select-room',
            wing: r.wing,
            room: r.room,
          }),
        )
        .join('')
    : '';

  const relWingRows = (slice?.relatedWings || [])
    .filter((w) => w.wing !== wingName)
    .slice(0, 6)
    .map((w) =>
      clickRow(w.wing, `${formatNum(w.links)} tunnel link${w.links === 1 ? '' : 's'}`, {
        'inspect-action': 'go-wing',
        wing: w.wing,
      }),
    )
    .join('');

  const bridgeNote =
    slice && slice.isBridge
      ? 'Acts as a bridge with at least one cross-wing link.'
      : 'No cross-wing bridge pattern is present for this room.';

  const tunnelMeta = collectTunnelRowMeta(roomKey, edgesResolved);
  const hasTunnelMeta =
    tunnelMeta.halls.length > 0 || !!tunnelMeta.recent || tunnelMeta.drawerCount != null;
  const tunnelMetaInner = hasTunnelMeta
    ? `
        <p class="inspect-micro">Tunnel row metadata (mempalace_find_tunnels)</p>
        <div class="meta-block">
          ${tunnelMeta.halls.length ? metaRow('Hall metadata (drawers)', escapeHtml(tunnelMeta.halls.join(', '))) : ''}
          ${tunnelMeta.recent ? metaRow('Most recent drawer date', escapeHtml(tunnelMeta.recent)) : ''}
          ${tunnelMeta.drawerCount != null ? metaRow('Drawers in this room name', formatNum(tunnelMeta.drawerCount)) : ''}
        </div>
        <p class="inspect-muted inspect-muted--tight">Hall fields come from drawer metadata when present; rendered edges still come only from tunnel discovery + taxonomy.</p>`
    : '';

  const miningModel = buildPalaceMiningModel({
    edgesResolved: ctx.edgesExplicit,
    ga: ctx.gaPalace,
    graphMeta: ctx.graphMeta,
  });
  const hubW = miningModel.hubByRoomId[roomKey];
  const actW = miningModel.activityByRoomId[roomKey];
  const miningInner =
    hubW != null || actW != null
      ? `<div class="meta-block">
          ${hubW != null ? metaRow('Hub emphasis', `${(hubW * 100).toFixed(0)}%`) : ''}
          ${actW != null ? metaRow('Recency emphasis', `${(actW * 100).toFixed(0)}%`) : ''}
        </div>
        ${actW != null ? '<p class="inspect-muted inspect-muted--tight">Recency is computed only for rooms with parseable tunnel-row <strong>recent</strong> values.</p>' : ''}
        <p class="inspect-muted inspect-muted--tight">Discovery signals affect overlays only; they never add links.</p>`
      : '<p class="inspect-empty">No derived discovery signal is available for this room in the current snapshot.</p>';
  const miningBlock = inspectDisclosure('Discovery signals', 'Derived overlays', miningInner);

  const traverseBlock = inspectDisclosure(
    'MCP traverse',
    'Query neighbors from MemPalace',
    `<p class="inspect-muted inspect-muted--tight">Uses <code>mempalace_traverse</code> with <code>start_room</code> = <strong>${escapeHtml(
      roomName,
    )}</strong> (room name key in palace graph).</p>
        <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
          <button type="button" class="btn btn--ghost btn--sm" data-mcp-action="traverse-room" data-room="${escapeHtml(
            roomName,
          )}">Load neighbors</button>
        </div>
        ${
          traversePreviewByRoom[roomName]
            ? `<pre class="memory-lens__pre memory-lens__pre--compact">${escapeHtml(
                JSON.stringify(traversePreviewByRoom[roomName], null, 2),
              )}</pre>`
            : ''
        }`,
  );

  const keyRelTitle = appState.view === 'graph' ? 'Connections detail' : 'Key relationships';

  const linkedJumpCount = relRoomsGraphJump.length;
  const linkedRowsClass =
    linkedJumpCount > 5
      ? 'inspect-rows inspect-rows--neighbor-jump inspect-rows--scrollcap'
      : 'inspect-rows inspect-rows--neighbor-jump';

  const graphLinkedRoomsSection =
    appState.view === 'graph' && graphNeighborJumpRows
      ? inspectSection(
          linkedJumpCount > 5 ? `Linked rooms (${linkedJumpCount})` : 'Linked rooms',
          `<p class="inspect-muted inspect-muted--tight">Strongest neighbors by link count on the visible graph — tap to focus (same as the 3D node).</p>
        <div class="${linkedRowsClass}">${graphNeighborJumpRows}</div>`,
        )
      : '';

  const graphLocalNeighborhoodSection =
    appState.view === 'graph' && graphAvailable && slice
      ? (() => {
          const g = summarizeGraphRoomNeighborhood({
            visRoomInc,
            fullRoomInc,
            slice,
            graphFilterNarrowed: ctx.graphFilterNarrowed,
          });
          const lines = [g.roleLine, g.balanceLine, g.medianLine, g.filterLine, g.dominantTypes ? `Dominant link types (visible): ${g.dominantTypes}` : ''].filter(
            Boolean,
          );
          return inspectSection(
            'Neighborhood shape',
            `<div class="meta-block">
          ${metaRow('Visible links (edges)', formatNum(visRoomInc.degree))}
          ${metaRow('Same-wing links', formatNum(visRoomInc.intraWingLinks))}
          ${metaRow('Cross-wing links', formatNum(visRoomInc.crossWingLinks))}
          ${ctx.graphFilterNarrowed ? metaRow('Links (global, unfiltered)', formatNum(fullRoomInc.degree)) : ''}
        </div>
        ${lines.map((l) => `<p class="inspect-muted inspect-muted--tight">${escapeHtml(l)}</p>`).join('')}
        ${
          graphNeighborJumpRows
            ? `<p class="inspect-muted inspect-muted--tight">Room shortcuts sit in <strong>Linked rooms</strong> below.</p>`
            : ''
        }`,
          );
        })()
      : appState.view === 'graph'
        ? `<div class="inspect-card inspect-card--hint" role="status"><strong>Graph context</strong><p class="inspect-muted inspect-muted--tight">${escapeHtml(connectionsSectionNoExplicitEdgesLine())}</p></div>`
        : '';

  const sceneRoomId = `room:${wingName}:${roomName}`;
  const startPr = graphRoute.startSceneId ? parseRoomSceneId(graphRoute.startSceneId) : null;
  const startLabel = startPr ? `${startPr.room} · ${startPr.wing}` : '—';
  const canRouteHere =
    graphAvailable && graphRoute.startSceneId && graphRoute.startSceneId !== sceneRoomId;
  const routeBlock =
    appState.view === 'graph' && graphAvailable
      ? inspectSection(
          'Route',
          `<div class="meta-block">
            ${metaRow('Route start', escapeHtml(startLabel))}
            ${metaRow(
              'Route target',
              graphRoute.targetSceneId
                ? escapeHtml(
                    (() => {
                      const t = parseRoomSceneId(graphRoute.targetSceneId);
                      return t ? `${t.room} · ${t.wing}` : graphRoute.targetSceneId;
                    })(),
                  )
                : '—',
            )}
          </div>
          <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="set-start">Set as route start</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="route-here" data-wing="${escapeHtml(
              wingName,
            )}" data-room="${escapeHtml(roomName)}" ${canRouteHere ? '' : 'disabled'} title="Compute route along visible edges (current mode)">Route to here</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="clear-route" ${
              graphRoute.startSceneId || graphRoute.targetSceneId ? '' : 'disabled'
            }>Clear route</button>
          </div>
          ${
            graphRoute.result?.ok
              ? `<p class="inspect-muted inspect-muted--tight" role="status">${escapeHtml(formatRouteInspectorSummary(graphRoute.result))}</p>`
              : ''
          }
          ${
            graphRoute.result && !graphRoute.result.ok
              ? `<div class="route-fail-guidance" role="status">
            <p class="inspect-muted inspect-muted--tight">${escapeHtml(graphRoute.result.message || '')}</p>
            ${routeDisconnectedDetailLines(String(graphRoute.result.reason || ''), {
              graphFilterNarrowed: graphRoute.result.graphFilterNarrowed ?? ctx.graphFilterNarrowed,
            })
              .map((line) => `<p class="inspect-muted inspect-muted--tight inspect-guidance-line">${escapeHtml(line)}</p>`)
              .join('')}
          </div>`
              : ''
          }`,
        )
      : '';

  return `
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${escapeHtml(roomName)}</div>
        <p class="inspect-lead">${escapeHtml(sentence || 'Room in the palace taxonomy.')}</p>
        ${pctWing != null ? `<div class="inspect-pct"><span>${pctWing}% of wing drawers (room list)</span>${pctBar(pctWing)}</div>` : ''}
      </div>
      ${storedContentHtml}
      ${graphLocalNeighborhoodSection}
      ${graphLinkedRoomsSection}
      ${routeBlock}
      ${inspectSection(
        'Key metadata',
        `
        <p class="inspect-micro">Taxonomy &amp; footprint</p>
        <div class="meta-block">
          ${metaRow('Wing', escapeHtml(wingName))}
          ${metaRow('Drawers (taxonomy count)', drawers != null ? formatNum(drawers) : '—')}
          ${metaRow('Share of palace', pctPalace != null ? `${pctPalace}%` : '—')}
        </div>
        ${
          rooms.length
            ? `<p class="inspect-micro">Size context</p>
        <div class="meta-block">
          ${metaRow('Rank in wing', rr ? `${ordinal(rr.rank)} of ${ranked.length}` : '—')}
          ${metaRow('Wing average drawers', wingAvg != null ? wingAvg.toFixed(1) : '—')}
          ${metaRow('Compared with wing average', cmp)}
        </div>`
            : '<p class="inspect-empty">Room-level drawer breakdown is not available for this wing.</p>'
        }`,
      )}
      ${inspectSection(
        keyRelTitle,
        graphAvailable && slice
          ? `
        <div class="meta-block">
          ${metaRow(ctx.graphFilterNarrowed ? 'Links (visible)' : 'Links', formatNum(visRoomInc.degree))}
          ${ctx.graphFilterNarrowed ? metaRow('Links (global)', formatNum(fullRoomInc.degree)) : ''}
          ${metaRow(ctx.graphFilterNarrowed ? 'Cross-wing links (visible)' : 'Cross-wing links', formatNum(visRoomInc.crossWingLinks))}
          ${ctx.graphFilterNarrowed ? metaRow('Cross-wing links (global)', formatNum(fullRoomInc.crossWingLinks)) : ''}
          ${metaRow(ctx.graphFilterNarrowed ? 'Intra-wing links (visible)' : 'Intra-wing links', formatNum(visRoomInc.intraWingLinks))}
          ${ctx.graphFilterNarrowed ? metaRow('Intra-wing links (global)', formatNum(fullRoomInc.intraWingLinks)) : ''}
          ${metaRow('Relationship mix', formatRelationshipTypeCounts(fullRoomInc.byType) || '—')}
          ${ctx.graphFilterNarrowed ? metaRow('Relationship mix (visible)', formatRelationshipTypeCounts(visRoomInc.byType) || '—') : ''}
          ${metaRow('Median links (all rooms)', slice.medianDegree != null ? formatNum(slice.medianDegree) : '—')}
        </div>
        ${relMixNote ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(relMixNote)}</p>` : ''}
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(bridgeNote)}</p>
        ${
          appState.view === 'graph'
            ? relRoomRows
              ? ''
              : `<p class="inspect-empty">No neighboring links were found for this room.</p>${
                  graphAvailable
                    ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(roomWithNoTunnelNeighborsGuidance())}</p>`
                    : ''
                }`
            : relRoomRows
              ? `<p class="inspect-micro">Closest related rooms</p><div class="inspect-rows">${relRoomRows}</div>`
              : `<p class="inspect-empty">No neighboring links were found for this room.</p>${
                  graphAvailable ? `<p class="inspect-muted inspect-muted--tight">${escapeHtml(roomWithNoTunnelNeighborsGuidance())}</p>` : ''
                }`
        }
        ${relWingRows ? `<p class="inspect-micro">Connected wings</p><div class="inspect-rows">${relWingRows}</div>` : ''}
        `
          : `<p class="inspect-empty">${escapeHtml(connectionsSectionNoExplicitEdgesLine())}</p>`,
      )}
      ${hasTunnelMeta ? inspectDisclosure('Tunnel metadata', 'Raw tunnel-row fields', tunnelMetaInner) : ''}
      ${miningBlock}
      ${traverseBlock}
      ${inspectSection(
        'Structural read',
        `<p class="insight-chip">${escapeHtml(insight.label)}</p><p class="inspect-muted inspect-muted--tight">${escapeHtml(insight.detail)}</p>`,
      )}
    </div>`;
}

async function runTraverseForRoom(roomName) {
  try {
    const r = await fetchPalaceTraverse(roomName, 2);
    traversePreviewByRoom[roomName] = r;
    renderInspector();
  } catch (err) {
    showToast(err?.message || String(err));
  }
}

/** Focus graph on a semantic hit (wing + room must exist in taxonomy). */
function semanticSearchNavigate(wing, room) {
  closeHelpIfOpen();
  if (!dataBundle || !wingExists(dataBundle.wingsData, wing) || !roomExists(dataBundle.roomsData, wing, room)) {
    showToast('That result’s wing/room is not in the taxonomy snapshot — adjust MemPalace or refresh.');
    return;
  }
  if (appState.view !== 'graph') {
    applyView('graph');
  }
  selectRoomFromInspector(wing, room);
}

function wireSemanticSearch() {
  const input = $('semantic-search');
  const status = $('semantic-search-status');
  const list = $('semantic-search-results');
  if (!input) return;
  input.addEventListener('input', () => {
    clearTimeout(semanticSearchDebounce);
    semanticSearchDebounce = setTimeout(async () => {
      const q = input.value.trim();
      if (q.length < 2) {
        semanticSearchHits = [];
        if (list) list.innerHTML = '';
        if (status) status.textContent = '';
        return;
      }
      if (status) status.textContent = 'Searching…';
      try {
        const res = await fetchSemanticSearch(q, { limit: 8 });
        if (res.error) throw new Error(res.error);
        const hits = (res.results || []).map((r) => ({
          wing: r.wing,
          room: r.room,
          similarity: r.similarity,
          preview: String(r.text || '').slice(0, 220),
        }));
        semanticSearchHits = hits;
        if (list) {
          list.innerHTML = hits
            .map(
              (h, i) => `
            <li><button type="button" class="semantic-hit" data-semantic-ix="${i}">
              <span class="semantic-hit__title">${escapeHtml(h.wing)} / ${escapeHtml(h.room)}</span>
              <span class="semantic-hit__meta">${(Number(h.similarity) * 100).toFixed(1)}% match</span>
              <span class="semantic-hit__snippet">${escapeHtml(h.preview)}</span>
            </button></li>`,
            )
            .join('');
        }
        if (status) status.textContent = `${hits.length} result(s)`;
      } catch (err) {
        if (status) status.textContent = err?.message || String(err);
        semanticSearchHits = [];
        if (list) list.innerHTML = '';
      }
    }, 420);
  });
  list?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-semantic-ix]');
    if (!b) return;
    const ix = Number(b.getAttribute('data-semantic-ix'));
    const h = semanticSearchHits[ix];
    if (!h) return;
    semanticSearchNavigate(h.wing, h.room);
  });
}

function wireMemoryLens() {
  $('btn-kg-query')?.addEventListener('click', async () => {
    const entity = $('kg-entity-input')?.value?.trim();
    const out = $('kg-output');
    if (!entity) {
      if (out) out.textContent = 'Enter an entity name.';
      return;
    }
    if (out) out.textContent = 'Loading…';
    try {
      const r = await fetchKgQuery(entity, {});
      if (out) out.textContent = JSON.stringify(r, null, 2);
    } catch (err) {
      if (out) out.textContent = err?.message || String(err);
    }
  });
  $('btn-kg-timeline')?.addEventListener('click', async () => {
    const entity = $('kg-entity-input')?.value?.trim();
    const out = $('kg-output');
    if (out) out.textContent = 'Loading…';
    try {
      const r = await fetchKgTimeline(entity || undefined);
      if (out) out.textContent = JSON.stringify(r, null, 2);
    } catch (err) {
      if (out) out.textContent = err?.message || String(err);
    }
  });
  $('btn-diary-refresh')?.addEventListener('click', async () => {
    const agent = $('diary-agent-input')?.value?.trim() || 'viewer';
    const out = $('diary-output');
    if (out) out.textContent = 'Loading…';
    try {
      const r = await fetchDiaryRead({ agent, last_n: 6 });
      if (out) out.textContent = JSON.stringify(r, null, 2);
    } catch (err) {
      if (out) out.textContent = err?.message || String(err);
    }
  });
  $('btn-aaak-spec')?.addEventListener('click', async () => {
    const pre = $('aaak-output');
    if (!pre) return;
    pre.hidden = false;
    pre.textContent = 'Loading…';
    try {
      const r = await fetchAaakSpec();
      const text = typeof r?.aaak_spec === 'string' ? r.aaak_spec : JSON.stringify(r, null, 2);
      pre.textContent = text;
    } catch (err) {
      pre.textContent = err?.message || String(err);
    }
  });
  $('btn-dup-check')?.addEventListener('click', async () => {
    const ta = $('dup-check-input');
    const out = $('dup-output');
    const content = ta?.value?.trim() || '';
    if (!content || !out) return;
    out.textContent = 'Checking…';
    try {
      const r = await fetchCheckDuplicate(content);
      out.textContent = JSON.stringify(r, null, 2);
    } catch (err) {
      out.textContent = err?.message || String(err);
    }
  });
}

function onInspectorClick(e) {
  const modeBtn = e.target.closest('[data-route-mode]');
  if (modeBtn) {
    const m = modeBtn.getAttribute('data-route-mode');
    if (m) setGraphRouteMode(m);
    return;
  }
  const r = e.target.closest('[data-route-action]');
  if (r) {
    const ra = r.getAttribute('data-route-action');
    if (ra === 'set-start') graphRouteSetStartFromSelection();
    else if (ra === 'route-here') {
      const w = r.getAttribute('data-wing');
      const rm = r.getAttribute('data-room');
      if (w && rm) graphRouteSetTarget(`room:${w}:${rm}`);
    } else if (ra === 'clear-route') clearGraphRoute();
    return;
  }
  const mcp = e.target.closest('[data-mcp-action]');
  if (mcp) {
    const act = mcp.getAttribute('data-mcp-action');
    if (act === 'traverse-room') {
      const rm = mcp.getAttribute('data-room');
      if (rm) runTraverseForRoom(rm);
    }
    return;
  }
  const contentAct = e.target.closest('[data-content-action]');
  if (contentAct) {
    const act = contentAct.getAttribute('data-content-action');
    if (act === 'room-open') {
      const id = contentAct.getAttribute('data-drawer-id');
      if (id) roomContentOpenDrawer(id);
      return;
    }
    if (act === 'room-back-list') {
      roomContentBackToList();
      return;
    }
    if (act === 'room-page') {
      roomContentPaginate(contentAct.getAttribute('data-dir'));
      return;
    }
    if (act === 'room-refresh' || act === 'room-retry-list') {
      roomContentRefreshList();
      return;
    }
    if (act === 'room-retry-detail') {
      roomContentRetryDetail();
      return;
    }
    if (act === 'copy-detail') {
      copyRoomDetailToClipboard();
      return;
    }
    if (act === 'room-detail-step') {
      roomContentDetailStep(contentAct.getAttribute('data-dir'));
      return;
    }
    if (act === 'room-clear-filter') {
      roomContentExplorer.listFilter = '';
      renderInspector();
      return;
    }
    if (act === 'wing-open') {
      const wid = contentAct.getAttribute('data-drawer-id');
      if (wid) wingContentOpenDrawer(wid);
      return;
    }
    if (act === 'wing-back-list') {
      wingContentBackToList();
      return;
    }
    if (act === 'wing-detail-step') {
      wingContentDetailStep(contentAct.getAttribute('data-dir'));
      return;
    }
    if (act === 'wing-copy-detail') {
      copyWingDetailToClipboard();
      return;
    }
    if (act === 'wing-retry-detail') {
      wingContentRetryDetail();
      return;
    }
    if (act === 'wing-clear-filter') {
      wingContentExplorer.listFilter = '';
      renderInspector();
      return;
    }
    if (act === 'wing-page') {
      wingContentPaginate(contentAct.getAttribute('data-dir'));
      return;
    }
    if (act === 'wing-refresh' || act === 'wing-retry-list') {
      wingContentRefreshList();
      return;
    }
    return;
  }
  const g = e.target.closest('[data-graph-action]');
  if (g) {
    const act = g.getAttribute('data-graph-action');
    if (act === 'frame-nbr') graphFrameNeighborhood();
    else if (act === 'open-structure') graphJumpToStructureView();
    else if (act === 'clear-focus') clearSelection();
    else if (act === 'next') graphStepNeighbor(1);
    else if (act === 'prev') graphStepNeighbor(-1);
    else if (act === 'back') graphFocusBack();
    else if (act === 'route-start') graphRouteJumpEndpoint('start');
    else if (act === 'route-end') graphRouteJumpEndpoint('end');
    else if (act === 'route-prev') graphRouteStepHop(-1);
    else if (act === 'route-next') graphRouteStepHop(1);
    else if (act === 'route-clear') clearGraphRoute();
    return;
  }
  const btn = e.target.closest('[data-inspect-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-inspect-action');
  const wing = btn.getAttribute('data-wing');
  const room = btn.getAttribute('data-room');
  if (action === 'go-wing' && wing) {
    navigateToWing(wing);
    return;
  }
  if (action === 'select-room' && wing && room) {
    selectRoomFromInspector(wing, room);
  }
}

function selectRoomFromInspector(wing, room) {
  closeHelpIfOpen();
  if (!dataBundle || !wingExists(dataBundle.wingsData, wing) || !roomExists(dataBundle.roomsData, wing, room)) {
    return;
  }
  const rd = dataBundle.roomsData[wing];
  const rm = Array.isArray(rd) ? rd.find((r) => r.name === room) : null;
  const id = `room:${wing}:${room}`;

  if (appState.view === 'graph') {
    if (appState.selected?.id && appState.selected.id !== id) {
      pushFocusHistory(graphFocusHistory, captureGraphFocusSnapshot());
    }
    appState.currentWing = wing;
    appState.currentRoom = room;
    appState.selected = {
      id,
      type: 'room',
      name: room,
      wing,
      wingId: wing,
      roomId: rm?.roomId || makeRoomId(wing, room),
      drawers: rm?.drawers,
    };
    appState.pinned = true;
    syncScenePresentation();
    sceneApi?.centerOnNodeId(id);
    updateMetrics();
    renderInspector();
    persistState();
    return;
  }

  appState.currentWing = wing;
  appState.currentRoom = room;
  appState.selected = {
    id,
    type: 'room',
    name: room,
    wing,
    wingId: wing,
    roomId: rm?.roomId || makeRoomId(wing, room),
    drawers: rm?.drawers,
  };
  appState.pinned = false;
  appState.view = 'rooms';
  sceneApi?.setView('rooms', wing);
  syncScenePresentation();
  sceneApi?.centerOnNodeId(id);
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'rooms')?.hint || '';
  updateSearchModeCopy();
  updateGraphViewChrome();
  updateMetrics();
  renderInspector();
  persistState();
}

function selectionFromUserData(ud) {
  if (!ud || ud.type === 'center' || !ud.id) return null;
  const wingId = ud.wingId ?? ud.wing;
  const roomId =
    ud.roomId ?? (ud.type === 'room' && wingId && ud.name != null ? makeRoomId(wingId, ud.name) : null);
  return {
    id: ud.id,
    type: ud.type,
    name: ud.name,
    wing: wingId,
    wingId,
    roomId,
    drawers: ud.drawers,
  };
}

function loadPersisted() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistState() {
  clearTimeout(pendingPersist);
  pendingPersist = setTimeout(() => {
    try {
      const raw = {
        view: appState.view,
        currentWing: appState.currentWing,
        currentRoom: appState.currentRoom,
        selected: appState.selected,
        pinned: appState.pinned,
        searchQuery: appState.searchQuery,
        labels: $('toggle-labels')?.checked ?? true,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(raw));
    } catch {
      /* ignore quota */
    }
  }, 200);
}

function validateStateAgainstData() {
  if (!dataBundle) return;
  sanitizeNavigationAgainstData(appState, dataBundle);
}

function applyPersistedToControls(p) {
  if (!p) return;
  if (p.labels !== undefined && $('toggle-labels')) $('toggle-labels').checked = !!p.labels;
  if (p.searchQuery !== undefined && $('search-wings')) $('search-wings').value = p.searchQuery;
}

function mergePersistedNavigation(p) {
  if (p == null) return;
  const n = normalizePersistedNavigation(p);
  appState.view = n.view;
  appState.currentWing = n.currentWing;
  appState.currentRoom = n.currentRoom;
  appState.selected = n.selected;
  appState.pinned = n.pinned;
  appState.searchQuery = n.searchQuery;
}

function miningSceneWeightsFromRoomWeights(roomWeights) {
  const out = {};
  for (const [roomId, w] of Object.entries(roomWeights || {})) {
    if (typeof w !== 'number' || w <= 0) continue;
    const pr = parseRoomId(roomId);
    if (!pr) continue;
    out[`room:${pr.wingId}:${pr.roomName}`] = w;
  }
  return out;
}

function getMiningPresentationPayload() {
  if (miningOverlayMode === 'off' || !dataBundle) {
    return { mode: 'off', weights: {} };
  }
  const ctx = buildPalaceContext();
  const model = buildPalaceMiningModel({
    edgesResolved: ctx.edgesExplicit,
    ga: ctx.gaPalace,
    graphMeta: ctx.graphMeta,
  });
  const raw = weightsForMiningMode(model, miningOverlayMode);
  return { mode: miningOverlayMode, weights: miningSceneWeightsFromRoomWeights(raw) };
}

function syncScenePresentation() {
  sceneApi?.updatePresentation({
    searchQuery: appState.searchQuery,
    selectedId: appState.selected?.id ?? null,
    pinActive: appState.pinned,
    route: routePresentationPayload(),
    miningOverlay: getMiningPresentationPayload(),
  });
}

function loadMiningOverlayFromStorage() {
  try {
    const v = localStorage.getItem(MINING_OVERLAY_LS_KEY);
    if (v === MINING_OVERLAY_MODES.HUBS || v === MINING_OVERLAY_MODES.ACTIVITY || v === MINING_OVERLAY_MODES.OFF) {
      miningOverlayMode = v;
    }
  } catch {
    /* ignore */
  }
  const sel = document.querySelector(`input[name="mining-mode"][value="${miningOverlayMode}"]`);
  if (sel) sel.checked = true;
  updateMiningOverlayHint();
}

/** Mode-specific copy for Explore — keeps tunnel-connectivity vs metadata boundaries explicit. */
function updateMiningOverlayHint() {
  const el = $('mining-mode-hint');
  if (!el) return;
  if (miningOverlayMode === MINING_OVERLAY_MODES.OFF) {
    el.innerHTML =
      'Overlays off. When enabled, tints apply to room nodes in Graph/Rooms only; tunnel lines are unchanged. Does not add edges or change tunnel truth.';
  } else if (miningOverlayMode === MINING_OVERLAY_MODES.HUBS) {
    el.innerHTML =
      'Tunnel hubs: emphasis from <strong>tunnel connectivity</strong> — normalized degree on resolved tunnel edges (how many tunnels meet each room).';
  } else {
    el.innerHTML =
      'Drawer recency: parseable <code>recent</code> on tunnel rows only; rooms without dated metadata are omitted, so the heatmap may be incomplete.';
  }
}

function persistMiningOverlayMode() {
  try {
    localStorage.setItem(MINING_OVERLAY_LS_KEY, miningOverlayMode);
  } catch {
    /* ignore */
  }
}

function setConnState(state, label, detail = '') {
  const el = $('conn-status');
  if (!el) return;
  el.dataset.state = state;
  el.textContent = label;
  const detailEl = $('conn-detail');
  if (detailEl) detailEl.textContent = detail;
}

function formatRelativeRefreshTime(iso) {
  if (!iso) return '';
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return '';
  const deltaSec = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (deltaSec < 5) return 'just now';
  if (deltaSec < 60) return `${deltaSec}s ago`;
  if (deltaSec < 3600) return `${Math.floor(deltaSec / 60)}m ago`;
  return `${Math.floor(deltaSec / 3600)}h ago`;
}

function updateBusyState(show) {
  $('app-main-grid')?.setAttribute('aria-busy', String(!!show));
  $('inspect-body')?.setAttribute('aria-busy', String(!!show));
}

function updateSearchModeCopy() {
  const label = $('search-wings-label');
  const input = $('search-wings');
  const hint = $('search-mode-hint');
  if (!label || !input || !hint) return;
  const graphMode = appState.view === 'graph';
  label.textContent = graphMode ? 'Find graph nodes' : 'Filter wings and rooms';
  input.placeholder = graphMode ? 'Find a room or wing in Graph…' : 'Filter wings and rooms…';
  hint.innerHTML = graphMode
    ? 'Graph view: <kbd>Enter</kbd> frames the active match · <kbd>Alt+N</kbd> / <kbd>Alt+P</kbd> steps through results.'
    : 'Wings/Rooms view: filters the explorer and dims non-matching nodes.';
}

function setPanelInteractiveState(panelId, bodyId, collapsed) {
  $(panelId)?.setAttribute('aria-hidden', String(!!collapsed));
  const body = $(bodyId);
  if (!body) return;
  body.hidden = !!collapsed;
  if ('inert' in body) body.inert = !!collapsed;
}

function showLoading(show) {
  updateBusyState(show);
  $('loading-overlay')?.classList.toggle('is-hidden', !show);
}

function showError(message, detail, { kind = 'data' } = {}) {
  showLoading(true);
  const ov = $('loading-overlay');
  if (!ov) return;
  const heading = kind === 'scene' ? 'Unable to start the 3D scene' : 'Unable to load data';
  const hint =
    kind === 'scene'
      ? `
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Try a modern browser with GPU acceleration enabled, or reload once the environment changes.</p>`
      : `
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>`;
  ov.innerHTML = `
    <div class="err-box">
      <strong>${escapeHtml(heading)}</strong>
      <p>${escapeHtml(message)}</p>
      ${detail ? `<code>${escapeHtml(detail)}</code>` : ''}
      ${hint}
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `;
  $('err-retry')?.addEventListener('click', () => {
    if (kind === 'scene') window.location.reload();
    else loadData(false);
  });
}

/**
 * Locked selection only — not hover preview — so the footer does not reflow when
 * mousing over the canvas with nothing selected.
 */
function footerFocusSubjectForMetrics() {
  const s = appState.selected;
  if (!s || s.type === 'center') return null;
  if (s.type === 'wing' || s.type === 'room') return s;
  return null;
}

function updateFooterContextLine(subject, ctx) {
  const el = $('metric-context');
  const wrap = $('metric-context-wrap');
  if (!el || !wrap) return;

  const idle = !subject || !ctx;
  wrap.classList.toggle('metric--context--idle', idle);

  if (idle) {
    el.textContent = '—';
    return;
  }

  if (subject.type === 'wing') {
    const dr = rankWingsByDrawers(ctx.wingsData).find((x) => x.wing === subject.name);
    el.textContent = dr ? `Selected wing · ${ordinal(dr.rank)} by drawers` : 'Selected wing';
    return;
  }
  if (subject.type === 'room') {
    const rk = rankRoomsInWingByDrawers(ctx.roomsData, subject.wing).find((r) => r.name === subject.name);
    el.textContent = rk ? `Selected room · ${ordinal(rk.rank)} in ${subject.wing}` : 'Selected room';
  }
}

function updateMetrics() {
  const st = dataBundle?.status;
  const gs = dataBundle?.graphStats;
  const graph = dataBundle?.graph;
  const summary = graph?.summary ?? gs?.summary;
  const kg = dataBundle?.kgStats;
  const ctx = buildPalaceContext();
  const { wingsData, roomsData, totalDrawers, gaPalace, overviewStats } = ctx;
  const ga = gaPalace;

  $('metric-drawers').textContent = formatNum(totalDrawers ?? 0);
  $('metric-wings').textContent = formatNum(
    typeof overviewStats?.totalWings === 'number' ? overviewStats.totalWings : Object.keys(wingsData).length,
  );
  $('metric-rooms').textContent = formatNum(
    typeof overviewStats?.totalRooms === 'number' ? overviewStats.totalRooms : countTotalRooms(roomsData),
  );

  let tunnels = 0;
  if (typeof summary?.resolvedEdgeCount === 'number') tunnels = summary.resolvedEdgeCount;
  else if (gs?.tunnels && typeof gs.tunnels === 'object') tunnels = Object.keys(gs.tunnels).length;
  $('metric-tunnels').textContent = tunnels ? formatNum(tunnels) : '—';

  const crossEl = $('metric-cross');
  if (crossEl) {
    crossEl.textContent = ga.hasResolvableEdges ? formatNum(ga.crossWingEdgeCount) : '—';
  }

  const foot = $('metric-footnote');
  if (foot) {
    const topW = ga.topCrossLinkedWings[0];
    const topR = ga.topConnectedRooms[0];
    let line = '';
    if (ga.hasResolvableEdges && topW && topR) {
      line = `Most cross-linked wing: ${topW.wing} · Most connected room: ${topR.room} (${topR.wing})`;
    } else if (ga.hasResolvableEdges && topW) {
      line = `Most cross-linked wing: ${topW.wing}`;
    } else {
      line = 'Tunnel graph: resolve endpoints to see cross-wing stats.';
    }
    if (appState.view === 'graph') {
      line = `${metricFootnoteGraphViewPrefix()} · ${line}`;
    }
    if (appState.view === 'graph' && ctx.graphFilterNarrowed) {
      line = `Visible ${formatNum(ctx.visibleGraphSummary.visibleEdgeCount)} edges · ${line}`;
    }
    foot.textContent = line;
  }

  const refreshedEl = $('metric-refreshed');
  if (refreshedEl) refreshedEl.textContent = formatRelativeRefreshTime(dataBundle?.fetchedAt || lastGoodFetchedAt) || '—';

  updateFooterContextLine(footerFocusSubjectForMetrics(), ctx);
}

function filterLegendSearch(text, query) {
  if (!query.trim()) return true;
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

function rebuildGraphSearchCatalog() {
  if (!dataBundle?.roomsData || !dataBundle?.wingsData) {
    graphSearchCatalog = [];
    return;
  }
  graphSearchCatalog = buildSearchCatalog(dataBundle.roomsData, dataBundle.wingsData);
}

function graphSearchQueryKey() {
  return normalizeSearchQuery(appState.searchQuery);
}

function refreshGraphSearchMatches() {
  const key = graphSearchQueryKey();
  if (key !== graphSearchLastQueryKey) {
    graphSearchLastQueryKey = key;
    graphSearchFirstApplyDone = false;
    graphSearchResultIndex = 0;
  }
  graphSearchMatches = rankGraphSearch(graphSearchCatalog, appState.searchQuery);
  if (graphSearchResultIndex >= graphSearchMatches.length) {
    graphSearchResultIndex = Math.max(0, graphSearchMatches.length - 1);
  }
  renderGraphSearchPanel();
}

function renderGraphSearchPanel() {
  const panel = $('graph-search-panel');
  const meta = $('graph-search-meta');
  const list = $('graph-search-list');
  const empty = $('graph-search-empty');
  const nav = $('graph-search-nav');
  if (!panel || !meta || !list) return;

  const q = appState.searchQuery.trim();
  if (!q) {
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  const n = graphSearchMatches.length;
  const showNav = n > 1;
  if (nav) nav.hidden = !showNav;

  if (!n) {
    empty.hidden = false;
    list.innerHTML = '';
    meta.textContent = 'No matches';
    return;
  }

  empty.hidden = true;
  const cur = Math.min(graphSearchResultIndex, n - 1);
  const totalLabel = n > 12 ? ` · ${n} total` : '';
  meta.textContent = `Result ${cur + 1} of ${n}${totalLabel}`;

  const maxRows = 12;
  let start = 0;
  if (n > maxRows) {
    start = Math.min(Math.max(0, cur - 5), Math.max(0, n - maxRows));
  }
  const slice = graphSearchMatches.slice(start, start + maxRows);
  list.innerHTML = slice
    .map((hit, i) => {
      const ix = start + i;
      const active = ix === cur;
      const routeBtn =
        hit.kind === 'room'
          ? `<button type="button" class="btn btn--ghost btn--sm graph-search-hit__route" data-graph-route-to="${ix}" title="Use as route target (needs route start)">Route</button>`
          : '';
      return `<li class="graph-search-hit-row">
        <button type="button" class="graph-search-hit ${active ? 'is-active' : ''}" data-graph-hit-ix="${ix}" role="option" aria-selected="${active ? 'true' : 'false'}">
          <span class="graph-search-hit__label">${escapeHtml(hit.label)}</span>
          <span class="graph-search-hit__sub">${escapeHtml(hit.sublabel)}</span>
        </button>
        ${routeBtn}
      </li>`;
    })
    .join('');

  if (n > maxRows) {
    list.insertAdjacentHTML(
      'beforeend',
      `<li class="graph-search-more"><span class="inspect-muted">Scroll list with ↑↓ · Alt+N / Alt+P for all ${n} matches</span></li>`,
    );
  }
}

function updateGraphSearchFirstUseHint() {
  const hint = $('graph-search-first-hint');
  if (!hint) return;
  const show =
    appState.view === 'graph' && !sessionStorage.getItem('mempalace-graph-search-hint') && !!dataBundle && !dataBundle.error;
  hint.hidden = !show;
}

function dismissGraphSearchFirstUseHint() {
  sessionStorage.setItem('mempalace-graph-search-hint', '1');
  const hint = $('graph-search-first-hint');
  if (hint) hint.hidden = true;
}

function clearGraphSearchQuery() {
  appState.searchQuery = '';
  const inp = $('search-wings');
  if (inp) inp.value = '';
  graphSearchMatches = [];
  graphSearchResultIndex = 0;
  graphSearchFirstApplyDone = false;
  graphSearchLastQueryKey = '';
  syncScenePresentation();
  renderLegend();
  renderGraphSearchPanel();
  persistState();
}

/**
 * Jump the 3D graph to a wing or room by scene id (`wing:` / `room:`).
 * @param {string} sceneId
 */
function applyGraphSearchResult(sceneId) {
  closeHelpIfOpen();
  if (!dataBundle || !sceneId) return;

  const firstNavInQuery = !graphSearchFirstApplyDone;

  if (sceneId.startsWith('wing:')) {
    const wingName = sceneId.slice('wing:'.length);
    if (!wingExists(dataBundle.wingsData, wingName)) return;
    if (appState.view !== 'graph') applyView('graph');
    if (
      appState.view === 'graph' &&
      shouldPushHistoryOnGraphSearchJump(appState.selected?.id, sceneId, firstNavInQuery)
    ) {
      pushFocusHistory(graphFocusHistory, captureGraphFocusSnapshot());
    }
    graphSearchFirstApplyDone = true;
    appState.currentWing = wingName;
    appState.currentRoom = null;
    appState.selected = {
      id: sceneId,
      type: 'wing',
      name: wingName,
      wing: wingName,
      wingId: wingName,
      drawers: dataBundle.wingsData[wingName],
    };
    appState.pinned = true;
    syncScenePresentation();
    sceneApi?.centerOnNodeId(sceneId);
    sceneApi?.pulseNodeEmphasis(sceneId);
    updateMetrics();
    renderInspector();
    renderGraphSearchPanel();
    persistState();
    dismissGraphSearchFirstUseHint();
    return;
  }

  const pr = parseRoomSceneId(sceneId);
  if (!pr || !roomExists(dataBundle.roomsData, pr.wing, pr.room)) return;
  const rd = dataBundle.roomsData[pr.wing];
  const rm = Array.isArray(rd) ? rd.find((r) => r.name === pr.room) : null;

  if (appState.view !== 'graph') applyView('graph');
  if (
    appState.view === 'graph' &&
    shouldPushHistoryOnGraphSearchJump(appState.selected?.id, sceneId, firstNavInQuery)
  ) {
    pushFocusHistory(graphFocusHistory, captureGraphFocusSnapshot());
  }
  graphSearchFirstApplyDone = true;
  appState.currentWing = pr.wing;
  appState.currentRoom = pr.room;
  appState.selected = {
    id: sceneId,
    type: 'room',
    name: pr.room,
    wing: pr.wing,
    wingId: pr.wing,
    roomId: rm?.roomId || makeRoomId(pr.wing, pr.room),
    drawers: rm?.drawers,
  };
  appState.pinned = true;
  syncScenePresentation();
  sceneApi?.centerOnNodeId(sceneId);
  sceneApi?.pulseNodeEmphasis(sceneId);
  updateMetrics();
  renderInspector();
  renderGraphSearchPanel();
  persistState();
  dismissGraphSearchFirstUseHint();
}

function graphSearchApplyStep(delta) {
  if (graphSearchMatches.length < 2) return;
  graphSearchResultIndex = stepWrapped(graphSearchResultIndex, graphSearchMatches.length, delta);
  applyGraphSearchResult(graphSearchMatches[graphSearchResultIndex].sceneId);
}

function focusGraphSearchInput() {
  dismissGraphSearchFirstUseHint();
  $('search-wings')?.focus();
}

function renderLegend() {
  const host = $('legend-host');
  if (!host) return;

  const st = dataBundle?.status;
  const wings = st?.wings && typeof st.wings === 'object' ? st.wings : dataBundle?.wingsData || {};
  const entries = Object.entries(wings);
  if (!entries.length) {
    host.innerHTML = '<div class="empty-state" style="padding:8px;">No wing data yet.</div>';
    return;
  }

  host.innerHTML = entries
    .map(([wing, count]) => {
      const color = wingColorFor(wing);
      const show = filterLegendSearch(`${wing} ${count}`, appState.searchQuery);
      return `
      <div class="legend-item" data-wing="${escapeHtml(wing)}" style="${show ? '' : 'display:none'}">
        <span class="legend-color" style="background:${color}"></span>
        <span>${escapeHtml(wing)} · ${formatNum(count)} drawers</span>
      </div>`;
    })
    .join('');
}

function wireBreadcrumbRoving(container) {
  const nav = container.querySelector('.breadcrumb-nav');
  if (!nav) return;
  const buttons = [...nav.querySelectorAll('.crumb')];
  if (!buttons.length) return;
  buttons.forEach((b, i) => {
    b.setAttribute('aria-posinset', String(i + 1));
    b.setAttribute('aria-setsize', String(buttons.length));
    b.tabIndex = i === 0 ? 0 : -1;
  });
  const prev = nav._bcKey;
  if (prev) nav.removeEventListener('keydown', prev);
  nav._bcKey = (e) => {
    const ix = buttons.indexOf(document.activeElement);
    if (ix < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const n = (ix + 1) % buttons.length;
      buttons.forEach((x, j) => {
        x.tabIndex = j === n ? 0 : -1;
      });
      buttons[n].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = (ix - 1 + buttons.length) % buttons.length;
      buttons.forEach((x, j) => {
        x.tabIndex = j === n ? 0 : -1;
      });
      buttons[n].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons.forEach((x, j) => {
        x.tabIndex = j === 0 ? 0 : -1;
      });
      buttons[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = buttons.length - 1;
      buttons.forEach((x, j) => {
        x.tabIndex = j === last ? 0 : -1;
      });
      buttons[last].focus();
    }
  };
  nav.addEventListener('keydown', nav._bcKey);
}

function renderBreadcrumb() {
  const el = $('breadcrumb');
  if (!el) return;

  const parts = [
    `<button type="button" class="crumb" data-crumb="root">Overview</button>`,
  ];
  if (appState.currentWing) {
    parts.push(`<span class="crumb-sep" aria-hidden="true">›</span>`);
    parts.push(
      `<button type="button" class="crumb" data-crumb="wing" data-wing="${escapeHtml(appState.currentWing)}">${escapeHtml(appState.currentWing)}</button>`,
    );
  }
  if (appState.currentRoom && appState.currentWing) {
    parts.push(`<span class="crumb-sep" aria-hidden="true">›</span>`);
    parts.push(
      `<button type="button" class="crumb" data-crumb="room" data-wing="${escapeHtml(appState.currentWing)}" data-room="${escapeHtml(appState.currentRoom)}">${escapeHtml(appState.currentRoom)}</button>`,
    );
  }
  el.innerHTML = `<nav class="breadcrumb-nav" aria-label="Palace location">${parts.join('')}</nav>`;

  el.querySelector('[data-crumb="root"]')?.addEventListener('click', () => goAllWings());
  el.querySelector('[data-crumb="wing"]')?.addEventListener('click', (e) => {
    const wing = e.currentTarget.getAttribute('data-wing');
    if (wing) navigateToWing(wing);
  });
  el.querySelector('[data-crumb="room"]')?.addEventListener('click', (e) => {
    const room = e.currentTarget.getAttribute('data-room');
    const wing = e.currentTarget.getAttribute('data-wing');
    if (room && wing && appState.currentWing === wing && appState.currentRoom === room) {
      const id = `room:${wing}:${room}`;
      sceneApi?.centerOnNodeId(id);
    }
  });
  wireBreadcrumbRoving(el);
}

/**
 * Rooms view only: undo one level of structural focus (room → wing orbit → wings overview).
 * Does not reset camera unless scene centering does; separate from Reset camera (R).
 * Canonical levels and back semantics: `nav-focus.js` (`peekRoomsBackAction`, `peekNextBackAction`).
 */
function goBackStructuralFocusRooms() {
  closeHelpIfOpen();
  if (appState.view !== 'rooms') return false;
  const action = peekRoomsBackAction(appState.currentWing, appState.currentRoom);
  if (action === 'toWing') {
    const wing = appState.currentWing;
    if (!wing || !dataBundle || !wingExists(dataBundle.wingsData, wing)) return false;
    appState.currentRoom = null;
    appState.selected = {
      id: `wing:${wing}`,
      type: 'wing',
      name: wing,
      wingId: wing,
      drawers: dataBundle.wingsData[wing],
    };
    appState.pinned = false;
    sceneApi?.setView('rooms', wing);
    syncScenePresentation();
    sceneApi?.centerOnNodeId(`wing:${wing}`);
    renderInspector();
    persistState();
    return true;
  }
  goAllWings();
  return true;
}

/**
 * Header Back, Esc (when it applies), and graph strip Back / U use this — driven by
 * `appState` + `graphFocusHistory`, not inspector mode or pin alone.
 * @returns {boolean} true if navigation state changed
 */
function goBackOneLevel() {
  if (appState.view === 'rooms') {
    return goBackStructuralFocusRooms();
  }
  if (appState.view === 'graph' && graphFocusHistory.length > 0) {
    graphFocusBack();
    return true;
  }
  return false;
}

/** Renders nav-scope crumbs + Back enabled state; mirrors `getCanonicalNavLevel` / `peekNextBackAction` in `nav-focus.js`. */
function updateNavScope() {
  const backBtn = $('btn-nav-back');
  const crumbsEl = $('nav-scope-crumbs');
  if (!backBtn || !crumbsEl) return;

  const canBack = canNavigateBack(appState.view, graphFocusHistory.length);
  backBtn.disabled = !canBack;
  backBtn.setAttribute('aria-disabled', canBack ? 'false' : 'true');

  const overviewBtn =
    '<button type="button" class="nav-scope__crumb" data-nav-scope="overview">Overview</button>';
  const sep = '<span class="nav-scope__sep" aria-hidden="true">/</span>';

  if (appState.view === 'wings') {
    crumbsEl.dataset.navLevel = 'overview';
    crumbsEl.innerHTML = `<div class="nav-scope__crumbs-inner"><span class="nav-scope__here">Overview</span><span class="nav-scope__muted"> · Wings</span></div>`;
    assertNavScopeLevelInvariant({
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      navScopeLevel: crumbsEl.dataset.navLevel || null,
    });
    assertHeaderBackInvariant({
      backBtn,
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      graphFocusHistoryLength: graphFocusHistory.length,
    });
    return;
  }

  if (appState.view === 'rooms') {
    const parts = [overviewBtn];
    if (!appState.currentWing && !appState.currentRoom) {
      parts.push(sep, `<span class="nav-scope__here">Rooms (all wings)</span>`);
    } else if (appState.currentWing && !appState.currentRoom) {
      parts.push(sep, `<span class="nav-scope__here">${escapeHtml(appState.currentWing)}</span><span class="nav-scope__muted"> · Wing</span>`);
    } else if (appState.currentWing && appState.currentRoom) {
      parts.push(
        sep,
        `<button type="button" class="nav-scope__crumb" data-nav-scope="wing" data-wing="${escapeHtml(appState.currentWing)}">${escapeHtml(appState.currentWing)}</button>`,
        sep,
        `<span class="nav-scope__here">${escapeHtml(appState.currentRoom)}</span><span class="nav-scope__muted"> · Room</span>`,
      );
    }
    if (!appState.currentWing && !appState.currentRoom) crumbsEl.dataset.navLevel = 'rooms_all';
    else if (appState.currentWing && !appState.currentRoom) crumbsEl.dataset.navLevel = 'wing_scope';
    else crumbsEl.dataset.navLevel = 'room_scope';
    crumbsEl.innerHTML = `<div class="nav-scope__crumbs-inner" aria-label="Location">${parts.join('')}</div>`;
    assertNavScopeLevelInvariant({
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      navScopeLevel: crumbsEl.dataset.navLevel || null,
    });
    assertHeaderBackInvariant({
      backBtn,
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      graphFocusHistoryLength: graphFocusHistory.length,
    });
    return;
  }

  if (appState.view === 'graph') {
    crumbsEl.dataset.navLevel = 'graph_focus';
    const parts = [overviewBtn, sep, `<span class="nav-scope__muted">Graph</span>`];
    if (appState.currentWing) {
      parts.push(sep, `<span class="nav-scope__crumb--text">${escapeHtml(appState.currentWing)}</span>`);
    }
    if (appState.currentRoom) {
      parts.push(sep, `<span class="nav-scope__crumb--text">${escapeHtml(appState.currentRoom)}</span>`);
    }
    crumbsEl.innerHTML = `<div class="nav-scope__crumbs-inner" aria-label="Location">${parts.join('')}</div>`;
    assertNavScopeLevelInvariant({
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      navScopeLevel: crumbsEl.dataset.navLevel || null,
    });
    assertHeaderBackInvariant({
      backBtn,
      view: appState.view,
      currentWing: appState.currentWing,
      currentRoom: appState.currentRoom,
      graphFocusHistoryLength: graphFocusHistory.length,
    });
  }
}

function wireNavScope() {
  const scope = $('nav-scope');
  if (!scope || scope._navScopeWired) return;
  scope._navScopeWired = true;
  scope.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-nav-scope]');
    if (!btn) return;
    const kind = btn.getAttribute('data-nav-scope');
    if (kind === 'overview') {
      goAllWings();
      return;
    }
    if (kind === 'wing') {
      const wing = btn.getAttribute('data-wing');
      if (wing && dataBundle && wingExists(dataBundle.wingsData, wing)) navigateToWing(wing);
    }
  });
  $('btn-nav-back')?.addEventListener('click', () => {
    if ($('btn-nav-back')?.disabled) return;
    goBackOneLevel();
  });
}

function goAllWings() {
  closeHelpIfOpen();
  graphFocusHistory.length = 0;
  resetContentExplorers();
  appState.view = 'wings';
  appState.currentWing = null;
  appState.currentRoom = null;
  appState.selected = null;
  appState.pinned = false;
  lastInspectorHoverKey = '';
  sceneApi?.setView('wings', null);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'wings')?.hint || '';
  updateSearchModeCopy();
  updateGraphViewChrome();
  updateMetrics();
  renderInspector();
  persistState();
}

function navigateToWing(wing) {
  closeHelpIfOpen();
  if (!dataBundle || !wingExists(dataBundle.wingsData, wing)) return;
  resetContentExplorers();
  appState.currentWing = wing;
  appState.currentRoom = null;
  appState.view = 'rooms';
  appState.selected = null;
  appState.pinned = false;
  lastInspectorHoverKey = '';
  sceneApi?.setView('rooms', wing);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'rooms')?.hint || '';
  updateSearchModeCopy();
  updateGraphViewChrome();
  updateMetrics();
  renderInspector();
  persistState();
}

function inspectorMode() {
  if (appState.pinned && appState.selected) {
    if (appState.view === 'graph') return 'graphFocus';
    return 'pinned';
  }
  if (appState.selected) return 'selected';
  if (appState.hovered) return 'live';
  return 'empty';
}

function updatePinButton() {
  const b = $('btn-pin');
  if (!b) return;
  b.textContent = appState.pinned ? 'Unpin' : 'Pin';
  b.disabled = !appState.selected;
}

function restoreStoredContentFilterFocus(inspectorBody) {
  if (!inspectorBody) return;
  if (roomContentExplorer._restoreFilterFocus === 'room') {
    const el = inspectorBody.querySelector('#content-stored-filter');
    if (el) {
      el.focus();
      const pos = roomContentExplorer._filterCaret;
      if (typeof pos === 'number') {
        try {
          el.setSelectionRange(pos, pos);
        } catch {
          /* ignore */
        }
      }
    }
    roomContentExplorer._restoreFilterFocus = null;
  } else if (wingContentExplorer._restoreFilterFocus === 'wing') {
    const el = inspectorBody.querySelector('#wing-stored-filter');
    if (el) {
      el.focus();
      const pos = wingContentExplorer._filterCaret;
      if (typeof pos === 'number') {
        try {
          el.setSelectionRange(pos, pos);
        } catch {
          /* ignore */
        }
      }
    }
    wingContentExplorer._restoreFilterFocus = null;
  }
}

function scheduleStoredFilterRender() {
  clearTimeout(storedContentFilterDebounce);
  storedContentFilterDebounce = setTimeout(() => {
    storedContentFilterDebounce = null;
    renderInspector();
  }, 200);
}

function renderInspector() {
  const body = $('inspect-body');
  const mode = inspectorMode();
  const badge = $('inspect-mode-badge');
  if (badge) {
    const labels = {
      empty: 'Overview',
      live: 'Preview',
      selected: 'Selected',
      pinned: 'Pinned context',
      graphFocus: 'Graph focus',
    };
    badge.textContent = labels[mode];
    badge.dataset.mode = mode;
  }

  let subject = null;
  if (mode === 'pinned' || mode === 'selected') subject = appState.selected;
  else if (mode === 'live') subject = appState.hovered;

  renderBreadcrumb();
  updateNavScope();

  const ctx = buildPalaceContext();
  const graphNote = graphViewInspectorNotice(ctx);

  if (!subject || subject.type === 'center') {
    if (mode === 'empty') {
      body.innerHTML = graphExploreStripHtml() + graphNote + renderOverviewInspector(ctx);
    } else {
      body.innerHTML =
        graphExploreStripHtml() +
        graphNote +
        `
        <div class="empty-state">
          <strong>Choose a place to inspect</strong>
          <p>Hover for a quick preview, or select a wing or room to lock a full readout.</p>
        </div>`;
    }
    updateFooterContextLine(footerFocusSubjectForMetrics(), ctx);
    assertGraphBackInvariant({
      graphBackBtn: body.querySelector('[data-graph-action="back"]'),
      graphFocusHistoryLength: graphFocusHistory.length,
      view: appState.view,
    });
    restoreStoredContentFilterFocus(body);
    updatePinButton();
    return;
  }

  const t = subject;
  const strip = graphExploreStripHtml();
  if (t.type === 'wing') {
    body.innerHTML = strip + graphNote + renderWingInspector(ctx, t.name, mode);
  } else if (t.type === 'room') {
    body.innerHTML = strip + graphNote + renderRoomInspector(ctx, t.wing, t.name, mode);
  } else {
    body.innerHTML = strip + graphNote + `<div class="inspect-card"><p class="inspect-muted">This selection type is not supported in the inspector yet.</p></div>`;
  }
  updateFooterContextLine(footerFocusSubjectForMetrics(), ctx);
  assertGraphBackInvariant({
    graphBackBtn: body.querySelector('[data-graph-action="back"]'),
    graphFocusHistoryLength: graphFocusHistory.length,
    view: appState.view,
  });
  restoreStoredContentFilterFocus(body);
  updatePinButton();
}

function metaRow(k, v) {
  return `<div class="meta-row"><span class="meta-k">${escapeHtml(k)}</span><span class="meta-v">${v}</span></div>`;
}

/**
 * Halls / recency from MCP tunnel rows, attached to canonical edges (see canonical.js).
 * @param {string} roomKey canonical `wingId/roomName`
 * @param {unknown[]} edgesResolved
 */
function collectTunnelRowMeta(roomKey, edgesResolved) {
  const halls = new Set();
  let recent = '';
  let drawerCount = null;
  for (const e of edgesResolved || []) {
    if (e.relationshipType !== 'tunnel') continue;
    if (e.sourceRoomId !== roomKey && e.targetRoomId !== roomKey) continue;
    const m = e.metadata || {};
    if (Array.isArray(m.halls)) m.halls.forEach((h) => halls.add(String(h)));
    if (typeof m.recent === 'string' && m.recent) recent = m.recent;
    if (typeof m.drawerCountInTunnelRoom === 'number') drawerCount = m.drawerCountInTunnelRoom;
  }
  return { halls: [...halls], recent, drawerCount };
}

function positionHoverCard(clientX, clientY, visible) {
  const card = $('hover-card');
  if (!card) return;
  if (!visible) {
    card.classList.remove('is-visible');
    return;
  }
  const pad = 16;
  const w = card.offsetWidth || 240;
  const h = card.offsetHeight || 80;
  let x = clientX + pad;
  let y = clientY + pad;
  if (x + w > window.innerWidth - 8) x = clientX - w - pad;
  if (y + h > window.innerHeight - 8) y = window.innerHeight - h - 8;
  card.style.left = `${Math.max(8, x)}px`;
  card.style.top = `${Math.max(8, y)}px`;
  card.classList.add('is-visible');
}

function fillHoverCard(data) {
  const card = $('hover-card');
  if (!card) return;
  if (!data || data.type === 'center') {
    card.classList.remove('is-visible');
    card.removeAttribute('data-node-type');
    return;
  }
  const title = data.name || data.label || 'Node';
  let sub = '';
  if (data.type === 'wing') sub = `Wing · ${formatNum(data.drawers)} drawers`;
  else if (data.type === 'room') sub = `Room in “${escapeHtml(data.wing)}”`;
  card.setAttribute('data-node-type', data.type || '');
  card.innerHTML = `<div class="hc-title">${escapeHtml(title)}</div><div class="hc-sub">${sub}</div>`;
}

function setActiveViewButtons() {
  document.querySelectorAll('[data-view]').forEach((btn) => {
    const active = btn.getAttribute('data-view') === appState.view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.tabIndex = active ? 0 : -1;
  });
}

function closeHelpDialog() {
  const o = $('help-overlay');
  if (!o) return;
  o.classList.remove('is-open');
  o.setAttribute('aria-hidden', 'true');
  helpFocusBefore?.focus?.();
  helpFocusBefore = null;
}

function openHelpDialog() {
  const o = $('help-overlay');
  const dlg = $('help-dialog');
  if (!o || !dlg) return;
  helpFocusBefore = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  o.classList.add('is-open');
  o.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    $('help-close')?.focus();
  });
}

function closeHelpIfOpen() {
  const o = $('help-overlay');
  if (o?.classList.contains('is-open')) closeHelpDialog();
}

function applyView(view) {
  closeHelpIfOpen();
  if (appState.view === 'graph' && view !== 'graph') {
    graphFocusHistory.length = 0;
    clearGraphRoute();
  }
  lastInspectorHoverKey = '';
  appState.view = view;
  if (view === 'wings') {
    appState.currentWing = null;
    appState.currentRoom = null;
  }
  if (view === 'graph' && !sessionStorage.getItem('mempalace-graph-enter-hint')) {
    sessionStorage.setItem('mempalace-graph-enter-hint', '1');
    showToast(
      'Graph shows how rooms link (not the folder tree). First: click any node — inspector locks, scene spotlights neighbors. [ ] step links · U back · “Rooms tree” for taxonomy · 1–2 for structure views.',
      9600,
    );
  }
  const focusWing = view === 'rooms' ? appState.currentWing : null;
  sceneApi?.setView(view, focusWing);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === view)?.hint || '';
  updateSearchModeCopy();
  updateGraphViewChrome();
  updateMetrics();
  renderInspector();
  updateGraphSearchFirstUseHint();
  refreshGraphSearchMatches();
  persistState();
}

function togglePin() {
  if (!appState.selected) return;
  appState.pinned = !appState.pinned;
  syncScenePresentation();
  renderInspector();
  persistState();
}

function clearSelection() {
  appState.selected = null;
  appState.currentRoom = null;
  appState.pinned = false;
  lastInspectorHoverKey = '';
  resetContentExplorers();
  syncScenePresentation();
  renderInspector();
  persistState();
}

function handleSceneClick(ud) {
  if (!ud || ud.type === 'center') {
    appState.hovered = null;
    if (!appState.pinned) {
      appState.selected = null;
      appState.currentRoom = null;
      lastInspectorHoverKey = '';
    }
    syncScenePresentation();
    renderInspector();
    persistState();
    return;
  }

  const sel = selectionFromUserData(ud);
  appState.hovered = null;

  if (appState.view === 'wings' && ud.type === 'wing') {
    appState.currentWing = ud.name;
    appState.currentRoom = null;
    appState.selected = sel;
    appState.pinned = false;
    appState.view = 'rooms';
    sceneApi?.setView('rooms', ud.name);
    syncScenePresentation();
    setActiveViewButtons();
    $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'rooms')?.hint || '';
  updateSearchModeCopy();
    updateGraphViewChrome();
    updateMetrics();
    renderInspector();
    persistState();
    return;
  }

  if (appState.view === 'rooms' && ud.type === 'wing') {
    if (appState.currentWing === ud.name) {
      sceneApi?.centerOnNodeId(ud.id);
      appState.selected = sel;
      appState.pinned = false;
    } else {
      appState.currentWing = ud.name;
      appState.currentRoom = null;
      appState.selected = sel;
      appState.pinned = false;
      sceneApi?.setView('rooms', ud.name);
      syncScenePresentation();
    }
    renderInspector();
    persistState();
    return;
  }

  if (appState.view === 'rooms' && ud.type === 'room') {
    appState.currentWing = ud.wing;
    appState.currentRoom = ud.name;
    appState.selected = sel;
    appState.pinned = false;
    sceneApi?.setView('rooms', appState.currentWing);
    syncScenePresentation();
    sceneApi?.centerOnNodeId(ud.id);
    renderInspector();
    persistState();
    return;
  }

  if (appState.view === 'graph') {
    if (!sel) return;
    if (sel.id && appState.selected?.id && appState.selected.id !== sel.id) {
      pushFocusHistory(graphFocusHistory, captureGraphFocusSnapshot());
    }
    appState.selected = sel;
    if (sel.type === 'room') {
      appState.currentWing = sel.wing;
      appState.currentRoom = sel.name;
    } else if (sel.type === 'wing') {
      appState.currentWing = sel.name;
      appState.currentRoom = null;
    }
    appState.pinned = true;
    syncScenePresentation();
    sceneApi?.centerOnNodeId(sel.id);
    renderInspector();
    persistState();
    return;
  }

  appState.selected = sel;
  appState.pinned = false;
  syncScenePresentation();
  renderInspector();
  persistState();
}

function setupScene() {
  const container = $('canvas-container');
  try {
    sceneApi = createPalaceScene(container, {
      onHover: (data, pos) => {
        const px = pos && typeof pos.x === 'number' ? pos.x : 0;
        const py = pos && typeof pos.y === 'number' ? pos.y : 0;
        if (!data || data.type === 'center') {
          appState.hovered = null;
          fillHoverCard(null);
          positionHoverCard(0, 0, false);
          const nextKey = '';
          if (shouldUpdateInspectorOnHover(!!appState.selected, lastInspectorHoverKey, nextKey)) {
            lastInspectorHoverKey = nextKey;
            renderInspector();
          }
          return;
        }
        if (shouldIgnoreHover()) {
          fillHoverCard(null);
          positionHoverCard(0, 0, false);
          return;
        }
        appState.hovered = { ...data };
        const hk = hoverTargetKey(data);
        if (appState.selected) {
          fillHoverCard(data);
          positionHoverCard(px, py, true);
          return;
        }
        if (shouldUpdateInspectorOnHover(false, lastInspectorHoverKey, hk)) {
          lastInspectorHoverKey = hk;
          renderInspector();
        }
        fillHoverCard(data);
        positionHoverCard(px, py, true);
      },
      onClick: (data) => handleSceneClick(data),
      onBackgroundClick: () => {
        const wrap = $('canvas-container');
        wrap?.classList.add('canvas-bg-dismiss');
        setTimeout(() => wrap?.classList.remove('canvas-bg-dismiss'), 160);
      },
    });
    sceneApi.init();
    return true;
  } catch (error) {
    sceneApi = null;
    const detail = error?.message || String(error);
    showError(
      'The 3D scene could not start. Your browser may not support WebGL, or GPU acceleration is disabled.',
      detail,
      { kind: 'scene' },
    );
    return false;
  }
}

function wireHelpFocusTrap() {
  const o = $('help-overlay');
  if (!o || o._trapWired) return;
  o._trapWired = true;
  o.addEventListener('keydown', (e) => {
    if (!o.classList.contains('is-open') || e.key !== 'Tab') return;
    const focusables = [...o.querySelectorAll('button, [href], input, select, textarea')].filter(
      (el) => !el.hasAttribute('disabled'),
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

function syncPanelRestoreVisibility(leftCollapsed, rightCollapsed) {
  const restoreLeft = $('panel-restore-left');
  const restoreRight = $('panel-restore-right');
  if (restoreLeft) restoreLeft.hidden = !leftCollapsed;
  if (restoreRight) restoreRight.hidden = !rightCollapsed;
}

function setPanelCollapsed(side, collapsed) {
  const main = $('app-main-grid');
  if (!main) return;
  if (side === 'left') {
    main.classList.toggle('has-left-collapsed', collapsed);
    $('panel-left')?.classList.toggle('panel--collapsed', collapsed);
    $('btn-collapse-left')?.setAttribute('aria-expanded', String(!collapsed));
    setPanelInteractiveState('panel-left', 'panel-left-body', collapsed);
  } else {
    main.classList.toggle('has-right-collapsed', collapsed);
    $('panel-right')?.classList.toggle('panel--collapsed', collapsed);
    $('btn-collapse-right')?.setAttribute('aria-expanded', String(!collapsed));
    setPanelInteractiveState('panel-right', 'panel-right-body', collapsed);
  }
  const leftCollapsed = main.classList.contains('has-left-collapsed');
  const rightCollapsed = main.classList.contains('has-right-collapsed');
  syncPanelRestoreVisibility(leftCollapsed, rightCollapsed);
  persistPanelLayout();
  // Tell the renderer the canvas may have a new size; ResizeObserver usually
  // catches this, but call explicitly so the camera aspect updates immediately.
  try { sceneApi?.resize?.(); } catch { /* ignore */ }
  if (!collapsed) {
    const focusTarget = side === 'left' ? $('btn-collapse-left') : $('btn-collapse-right');
    focusTarget?.focus?.({ preventScroll: true });
  }
}

function applyPanelLayoutFromStorage() {
  let leftCollapsed = false;
  let rightCollapsed = false;
  try {
    const raw = localStorage.getItem(PANEL_STATE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      leftCollapsed = !!p.leftCollapsed;
      rightCollapsed = !!p.rightCollapsed;
    }
  } catch {
    /* ignore */
  }
  const main = $('app-main-grid');
  const pl = $('panel-left');
  const pr = $('panel-right');
  main?.classList.toggle('has-left-collapsed', leftCollapsed);
  main?.classList.toggle('has-right-collapsed', rightCollapsed);
  pl?.classList.toggle('panel--collapsed', leftCollapsed);
  pr?.classList.toggle('panel--collapsed', rightCollapsed);
  $('btn-collapse-left')?.setAttribute('aria-expanded', String(!leftCollapsed));
  $('btn-collapse-right')?.setAttribute('aria-expanded', String(!rightCollapsed));
  setPanelInteractiveState('panel-left', 'panel-left-body', leftCollapsed);
  setPanelInteractiveState('panel-right', 'panel-right-body', rightCollapsed);
  syncPanelRestoreVisibility(leftCollapsed, rightCollapsed);
}

function persistPanelLayout() {
  const main = $('app-main-grid');
  try {
    localStorage.setItem(
      PANEL_STATE_KEY,
      JSON.stringify({
        leftCollapsed: main?.classList.contains('has-left-collapsed') ?? false,
        rightCollapsed: main?.classList.contains('has-right-collapsed') ?? false,
      }),
    );
  } catch {
    /* ignore */
  }
}

function wireMiningOverlay() {
  document.querySelectorAll('input[name="mining-mode"]').forEach((el) => {
    el.addEventListener('change', (e) => {
      const t = e.target;
      if (t && t.type === 'radio' && t.name === 'mining-mode' && t.checked) {
        miningOverlayMode = /** @type {'off'|'hubs'|'activity'} */ (t.value);
        persistMiningOverlayMode();
        updateMiningOverlayHint();
        syncScenePresentation();
      }
    });
  });
}

function wirePanelCollapse() {
  const main = $('app-main-grid');
  $('btn-collapse-left')?.addEventListener('click', () => {
    const collapsed = !main?.classList.contains('has-left-collapsed');
    setPanelCollapsed('left', collapsed);
  });
  $('btn-collapse-right')?.addEventListener('click', () => {
    const collapsed = !main?.classList.contains('has-right-collapsed');
    setPanelCollapsed('right', collapsed);
  });
  // Edge restore handles — always-visible affordance when a panel is collapsed.
  $('panel-restore-left')?.addEventListener('click', () => setPanelCollapsed('left', false));
  $('panel-restore-right')?.addEventListener('click', () => setPanelCollapsed('right', false));
}

function wireControls() {
  $('btn-refresh')?.addEventListener('click', () => loadData(true));

  $('btn-reset-cam')?.addEventListener('click', () => sceneApi?.resetCamera());

  $('btn-pin')?.addEventListener('click', () => togglePin());
  $('btn-clear-sel')?.addEventListener('click', () => clearSelection());

  $('toggle-labels')?.addEventListener('change', (e) => {
    sceneApi?.setLabelsVisible(e.target.checked);
    persistState();
  });

  VIEWS.forEach((v) => {
    document.querySelector(`[data-view="${v.id}"]`)?.addEventListener('click', () => applyView(v.id));
  });

  const viewHost = $('view-buttons');
  viewHost?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const tabs = [...document.querySelectorAll('[data-view]')];
    if (!tabs.length) return;
    const ix = tabs.findIndex((b) => b.getAttribute('data-view') === appState.view);
    if (ix < 0) return;
    e.preventDefault();
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const n = (ix + delta + tabs.length) % tabs.length;
    applyView(tabs[n].getAttribute('data-view'));
    tabs[n].focus();
  });

  $('search-wings')?.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      appState.searchQuery = e.target.value;
      syncScenePresentation();
      renderLegend();
      refreshGraphSearchMatches();
      persistState();
    }, 120);
  });

  $('search-wings')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && graphSearchMatches.length > 0) {
      e.preventDefault();
      applyGraphSearchResult(graphSearchMatches[graphSearchResultIndex].sceneId);
      return;
    }
    if (!graphSearchMatches.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      graphSearchResultIndex = stepWrapped(graphSearchResultIndex, graphSearchMatches.length, 1);
      renderGraphSearchPanel();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      graphSearchResultIndex = stepWrapped(graphSearchResultIndex, graphSearchMatches.length, -1);
      renderGraphSearchPanel();
    }
  });

  $('graph-search-panel')?.addEventListener('click', (e) => {
    const rt = e.target.closest('[data-graph-route-to]');
    if (rt) {
      const ix = Number(rt.getAttribute('data-graph-route-to'));
      if (Number.isNaN(ix) || !graphSearchMatches[ix]) return;
      const hit = graphSearchMatches[ix];
      if (hit.kind !== 'room') return;
      graphRouteSetTarget(hit.sceneId);
      dismissGraphSearchFirstUseHint();
      return;
    }
    const b = e.target.closest('[data-graph-search-step]');
    if (b) {
      const d = Number(b.getAttribute('data-graph-search-step'));
      if (d === 1 || d === -1) graphSearchApplyStep(d);
      return;
    }
    const hit = e.target.closest('[data-graph-hit-ix]');
    if (!hit) return;
    const ix = Number(hit.getAttribute('data-graph-hit-ix'));
    if (Number.isNaN(ix) || !graphSearchMatches[ix]) return;
    graphSearchResultIndex = ix;
    applyGraphSearchResult(graphSearchMatches[ix].sceneId);
  });

  $('btn-help')?.addEventListener('click', () => {
    const o = $('help-overlay');
    if (o?.classList.contains('is-open')) closeHelpDialog();
    else openHelpDialog();
  });
  $('help-close')?.addEventListener('click', () => closeHelpDialog());
  $('help-overlay')?.addEventListener('click', (e) => {
    const o = $('help-overlay');
    if (e.target === o) closeHelpDialog();
  });

  wireHelpFocusTrap();
  applyPanelLayoutFromStorage();
  wirePanelCollapse();
  wireSemanticSearch();
  wireMemoryLens();
  wireMiningOverlay();

  $('graph-view-extras')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-rel-type]');
    if (!btn) return;
    const t = btn.getAttribute('data-rel-type');
    if (t) toggleRelationshipType(t);
  });

  wireNavScope();

  window.addEventListener('keydown', (e) => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'n' || e.key === 'N' || e.key === 'p' || e.key === 'P')) {
      if (appState.view === 'graph' && graphSearchMatches.length > 1) {
        e.preventDefault();
        graphSearchApplyStep(e.key === 'n' || e.key === 'N' ? 1 : -1);
        return;
      }
    }
    if (isTypingTarget(e.target) && e.key !== 'Escape') return;
    if (e.key === 'Escape') {
      const ho = $('help-overlay');
      if (ho?.classList.contains('is-open')) {
        closeHelpDialog();
        return;
      }
      if (appState.searchQuery.trim()) {
        e.preventDefault();
        clearGraphSearchQuery();
        return;
      }
      if (goBackOneLevel()) {
        e.preventDefault();
        return;
      }
      if (appState.pinned) {
        appState.pinned = false;
        syncScenePresentation();
        renderInspector();
        persistState();
      } else if (appState.selected) {
        clearSelection();
      }
      return;
    }
    if (isTypingTarget(e.target)) return;
    if (e.key === '1') applyView('wings');
    if (e.key === '2') applyView('rooms');
    if (e.key === '3') applyView('graph');
    if (e.key === 'r' || e.key === 'R') sceneApi?.resetCamera();
    if (appState.view === 'graph' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const routeLive = graphRoute.result?.ok && graphRoute.result.pathSceneIds?.length > 1;
      if (e.key === '[') {
        e.preventDefault();
        if (routeLive) graphRouteStepHop(-1);
        else graphStepNeighbor(-1);
      }
      if (e.key === ']') {
        e.preventDefault();
        if (routeLive) graphRouteStepHop(1);
        else graphStepNeighbor(1);
      }
      if (e.key === 'u' || e.key === 'U') {
        if (graphFocusHistory.length === 0) return;
        e.preventDefault();
        graphFocusBack();
      }
    }
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      focusGraphSearchInput();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      $('semantic-search')?.focus();
    }
    if (e.key === 'l' || e.key === 'L') {
      const cb = $('toggle-labels');
      if (cb) {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    }
  });
}

function buildViewButtons() {
  const host = $('view-buttons');
  if (!host) return;
  host.innerHTML = VIEWS.map(
    (v) => `
    <button type="button" class="view-seg__btn" data-view="${v.id}" role="tab" aria-selected="${
      v.id === appState.view ? 'true' : 'false'
    }" tabindex="${v.id === appState.view ? 0 : -1}">
      <strong>${escapeHtml(v.title)}</strong>
      <span class="view-seg__hint">${escapeHtml(v.hint)}</span>
    </button>`,
  ).join('');
}

async function loadData(preserveContext) {
  const snapshot = preserveContext
    ? {
        view: appState.view,
        currentWing: appState.currentWing,
        currentRoom: appState.currentRoom,
        selected: appState.selected,
        pinned: appState.pinned,
        searchQuery: appState.searchQuery,
      }
    : null;

  const previousBundle = dataBundle;

  showLoading(true);
  setConnState(
    'loading',
    'Connecting…',
    preserveContext && lastGoodFetchedAt
      ? `Refreshing snapshot from ${formatRelativeRefreshTime(lastGoodFetchedAt)} while keeping the current scene visible.`
      : 'Loading the latest palace snapshot.',
  );
  const ov = $('loading-overlay');
  if (ov) {
    ov.innerHTML = `<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>`;
  }

  dataBundle = await loadPalaceData();

  if (dataBundle.error) {
    if (preserveContext && previousBundle && !previousBundle.error) {
      dataBundle = previousBundle;
      setConnState(
        'stale',
        'Offline (cached)',
        lastGoodFetchedAt ? `Last successful snapshot: ${formatRelativeRefreshTime(lastGoodFetchedAt)}.` : 'Showing previously loaded data.',
      );
      showToast('Refresh failed — showing last loaded data. Check the API and try again.');
      showLoading(false);
      renderInspector();
      return;
    }
    setConnState('error', 'Disconnected', 'Unable to reach the MemPalace API bridge.');
    showError(dataBundle.error.message || String(dataBundle.error), getApiBase() || '(same origin)');
    return;
  }

  lastGoodFetchedAt = dataBundle.fetchedAt || new Date().toISOString();
  resetContentExplorers();
  setConnState('ok', 'Connected', `Last refresh ${formatRelativeRefreshTime(lastGoodFetchedAt)}.`);
  fetchMcpToolsList()
    .then((r) => {
      const n = r?.tools?.length;
      const detailEl = $('conn-detail');
      if (n && detailEl) {
        detailEl.textContent = `Last refresh ${formatRelativeRefreshTime(lastGoodFetchedAt)} · official MCP lists ${n} tools.`;
      }
    })
    .catch(() => {});
  showLoading(false);

  if (!preserveContext) {
    const persisted = loadPersisted();
    mergePersistedNavigation(persisted);
    applyPersistedToControls(persisted);
  }

  validateStateAgainstData();

  if (preserveContext && snapshot) {
    if (snapshot.currentWing && wingExists(dataBundle.wingsData, snapshot.currentWing)) {
      appState.currentWing = snapshot.currentWing;
    } else {
      appState.currentWing = null;
      appState.currentRoom = null;
    }
    if (
      snapshot.currentRoom &&
      appState.currentWing &&
      roomExists(dataBundle.roomsData, appState.currentWing, snapshot.currentRoom)
    ) {
      appState.currentRoom = snapshot.currentRoom;
    } else {
      appState.currentRoom = null;
    }
    appState.view = snapshot.view;
    if (snapshot.selected?.id) {
      const s = snapshot.selected;
      if (s.type === 'wing' && wingExists(dataBundle.wingsData, s.name)) appState.selected = s;
      else if (s.type === 'room' && s.wing && roomExists(dataBundle.roomsData, s.wing, s.name)) appState.selected = s;
      else appState.selected = null;
    } else {
      appState.selected = null;
    }
    appState.pinned = snapshot.pinned && !!appState.selected;
    appState.searchQuery = snapshot.searchQuery ?? appState.searchQuery;
    $('search-wings').value = appState.searchQuery;
  }

  validateStateAgainstData();

  sceneApi?.setData({
    wingsData: dataBundle.wingsData,
    roomsData: dataBundle.roomsData,
    graphEdges: getPalaceLegacyGraphEdgesForView(dataBundle.graph),
  });

  updateMetrics();
  renderLegend();

  const focusWing = appState.view === 'rooms' ? appState.currentWing : null;
  sceneApi?.setView(appState.view, focusWing);
  syncGraphRelationshipFiltersWithData();
  if (graphRoute.startSceneId && graphRoute.targetSceneId) {
    recomputeGraphRoute();
  }
  syncScenePresentation();

  sceneApi?.setLabelsVisible($('toggle-labels')?.checked ?? true);

  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === appState.view)?.hint || '';
  updateSearchModeCopy();

  if (!Object.keys(dataBundle.wingsData || {}).length) {
    $('view-helper-text').textContent = 'No wings returned — check MCP backend.';
  } else if (
    !dataBundle.roomsData ||
    !Object.keys(dataBundle.roomsData).some((w) => (dataBundle.roomsData[w] || []).length)
  ) {
    $('view-helper-text').textContent += ' · No rooms in taxonomy yet.';
  }

  if (isDev() && dataBundle.graphEdges?.length) {
    const u = countEdgesWithUnresolvedEndpoints(
      dataBundle.graphEdges,
      dataBundle.roomsData,
      dataBundle.graph?.edgesUnresolved?.length ?? null,
    );
    if (u) devWarn(`${u} tunnel edge(s) have unresolved endpoints vs taxonomy`);
  }

  updateGraphViewChrome();
  rebuildGraphSearchCatalog();
  graphSearchLastQueryKey = '';
  refreshGraphSearchMatches();
  updateGraphSearchFirstUseHint();
  renderInspector();
  persistState();

  if (isDev()) {
    try {
      assertValidState(appState, dataBundle, {
        assert(cond, msg) {
          if (!cond) devWarn('assertValidState:', msg);
        },
      });
    } catch {
      /* ignore */
    }
  }
}

function wireInspectorDelegation() {
  const body = $('inspect-body');
  if (!body || body._delegationWired) return;
  body._delegationWired = true;
  body.addEventListener('click', onInspectorClick);
  body.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.id === 'content-stored-filter') {
      roomContentExplorer.listFilter = t.value;
      roomContentExplorer._restoreFilterFocus = 'room';
      roomContentExplorer._filterCaret = t.selectionStart;
      scheduleStoredFilterRender();
    } else if (t.id === 'wing-stored-filter') {
      wingContentExplorer.listFilter = t.value;
      wingContentExplorer._restoreFilterFocus = 'wing';
      wingContentExplorer._filterCaret = t.selectionStart;
      scheduleStoredFilterRender();
    }
  });
  body.addEventListener('change', (e) => {
    const t = e.target;
    if (t instanceof HTMLSelectElement && t.id === 'content-stored-sort') {
      roomContentExplorer.listSort = t.value;
      renderInspector();
    } else if (t instanceof HTMLSelectElement && t.id === 'wing-stored-sort') {
      wingContentExplorer.listSort = t.value;
      renderInspector();
    }
  });
}

function main() {
  buildViewButtons();
  const sceneReady = setupScene();
  if (!sceneReady) return;
  loadMiningOverlayFromStorage();
  wireControls();
  wireInspectorDelegation();
  updateSearchModeCopy();
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && dataBundle && !dataBundle.error) loadData(true);
  });
  loadData(false);
}

main();
