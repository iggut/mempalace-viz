/**
 * MemPalace 3D — app state, navigation, inspector, persistence, scene sync.
 */
import { loadPalaceData, getApiBase, wingExists, roomExists } from './api.js';
import { makeRoomId } from './canonical.js';
import { createPalaceScene, wingColorFor } from './scene.js';
import {
  buildGraphAnalytics,
  buildOverviewModel,
  characterizeRoom,
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
import { assertValidState, normalizePersistedNavigation, sanitizeNavigationAgainstData } from './state-utils.js';
import { devWarn, isDev } from './debug.js';

const LS_KEY = 'mempalace-viz-explorer-v1';
const PANEL_STATE_KEY = 'mempalace-viz-panel-state-v1';

const VIEWS = [
  { id: 'wings', title: 'Wings', hint: 'High-level structure by domain or project.' },
  { id: 'rooms', title: 'Rooms', hint: 'Rooms within each wing, orbiting their parent.' },
  { id: 'graph', title: 'Graph', hint: 'Tunnel relationships across rooms.' },
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
let searchDebounce = null;
let pendingPersist = null;
/** @type {HTMLElement | null} */
let helpFocusBefore = null;
let toastClearTimer = null;

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
  const edges = dataBundle?.graphEdges?.length ?? 0;
  const unresolvedApi = Array.isArray(gs?.edgesUnresolved) ? gs.edgesUnresolved.length : null;
  if (!edges) {
    return `<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">No tunnel edges were returned from graph-stats. Wings and rooms may still appear if taxonomy is loaded.</p></div>`;
  }
  if (!ctx.ga?.hasResolvableEdges) {
    const unresolved =
      unresolvedApi != null
        ? unresolvedApi
        : countEdgesWithUnresolvedEndpoints(dataBundle?.graphEdges, dataBundle?.roomsData);
    return `<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Loaded ${edges} tunnel edge${edges === 1 ? '' : 's'}, but endpoints could not be fully matched to taxonomy rooms${unresolved ? ` (${unresolved} edge${unresolved === 1 ? '' : 's'} unresolved).` : '.'} Layout may be sparse.</p></div>`;
  }
  return '';
}

function shouldIgnoreHover() {
  return !!(appState.pinned && appState.selected);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]),
  );
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
  const graphEdges = dataBundle?.graphEdges || [];
  const gs = dataBundle?.graphStats;
  const kg = dataBundle?.kgStats;
  const overviewStats = dataBundle?.overviewBundle?.stats;

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
  if (gs?.summary?.resolvedEdgeCount != null) tunnelNodeCount = gs.summary.resolvedEdgeCount;
  else if (gs?.tunnels && typeof gs.tunnels === 'object') tunnelNodeCount = Object.keys(gs.tunnels).length;

  const graphEdgeCount =
    typeof gs?.summary?.resolvedEdgeCount === 'number' ? gs.summary.resolvedEdgeCount : graphEdges.length;
  const ga = buildGraphAnalytics(graphEdges, roomsData);
  const kgSummary = formatKgSummary(kg);
  const kgAvailable = !!(kg && typeof kg === 'object' && !kg.error);

  return {
    status: st,
    wingsData,
    roomsData,
    graphEdges,
    graphStats: gs,
    kgStats: kg,
    totalDrawers,
    wingCount,
    roomCount,
    tunnelNodeCount,
    graphEdgeCount,
    ga,
    kgAvailable,
    kgSummary,
    focusWing: appState.currentWing,
    overviewStats,
  };
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
  const kgLine = om.kgAvailable
    ? om.kgSummary || '—'
    : 'Knowledge graph statistics are unavailable from the current API.';
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
    `Palace scale: ${formatNum(om.totalDrawers)} drawers across ${formatNum(om.wingCount)} wings and ${formatNum(om.roomCount)} rooms.`,
    om.tunnelNodeCount
      ? `Tunnel index lists ${formatNum(om.tunnelNodeCount)} room keys and ${formatNum(om.graphEdgeCount)} directed edges.`
      : 'No tunnel index entries in graph-stats.',
    om.graphBlurb,
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${escapeHtml(om.viewHint)}</p>
        <p class="inspect-muted">${escapeHtml(palaceBlurb)}</p>
      </div>
      ${inspectSection(
        'Palace summary',
        `
        <div class="meta-block">
          ${metaRow('Total drawers', formatNum(om.totalDrawers))}
          ${metaRow('Wings', formatNum(om.wingCount))}
          ${metaRow('Rooms (taxonomy)', formatNum(om.roomCount))}
          ${metaRow('Tunnel edges (raw)', formatNum(om.graphEdgeCount))}
          ${metaRow('Cross-wing (resolved)', om.ga.hasResolvableEdges ? formatNum(om.crossWingEdges) : '—')}
          ${metaRow('Rooms with no tunnels', om.ga.hasResolvableEdges ? formatNum(om.roomsWithNoTunnels) : '—')}
        </div>
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(kgLine)}</p>
        `,
      )}
      ${inspectSection(
        'Largest wings',
        `<div class="inspect-rows">${topWings || '<p class="inspect-empty">No wing counts available.</p>'}</div>`,
      )}
      ${inspectSection(
        'Most connected rooms',
        topRooms || '<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>',
      )}
      ${inspectSection(
        'Most cross-linked wings',
        topCross || '<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>',
      )}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`;
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
      ? `This wing holds ${pctDrawers}% of all drawers and is the ${ordinal(dr.rank)} largest wing by drawer count.`
      : null,
    pctRooms != null && rr && roomN
      ? `It ranks ${ordinal(rr.rank)} among wings by room count (${pctRooms}% of all rooms).`
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  const tunnel = getWingTunnelSlice(wingName, graphEdges, roomsData);
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
      const key = `${wingName}/${r.name}`;
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
      ? '<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>'
      : `
      ${metaRow('Rooms listed', formatNum(roomN))}
      ${metaRow('Drawers (wing total)', formatNum(d))}
      ${avg != null ? metaRow('Avg drawers / room', avg) : ''}
      ${largest ? metaRow('Largest room', `${largest.name} (${formatNum(largest.drawers)})`) : ''}
      ${smallest && smallest.name !== largest?.name ? metaRow('Smallest room', `${smallest.name} (${formatNum(smallest.drawers)})`) : ''}
    `;

  const graphViewNote =
    appState.view === 'graph'
      ? '<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>'
      : '';

  return `
    <div class="inspect-stack">
      ${graphViewNote}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${escapeHtml(wingName)}</div>
        <p class="inspect-lead">${escapeHtml(sentence || 'Wing footprint in the palace.')}</p>
        ${pctDrawers != null ? `<div class="inspect-pct"><span>${pctDrawers}% of palace drawers</span>${pctBar(pctDrawers)}</div>` : ''}
      </div>
      ${inspectSection(
        'Summary',
        `
        <div class="meta-block">
          ${metaRow('Drawer count', formatNum(d))}
          ${metaRow('Rank by drawers', dr ? `${ordinal(dr.rank)} of ${wingDrawerRank.length}` : '—')}
          ${metaRow('Rooms', formatNum(roomN))}
          ${metaRow('Rank by room count', rr ? `${ordinal(rr.rank)} of ${roomRankList.length}` : '—')}
        </div>`,
      )}
      ${inspectSection('Structure', `<div class="meta-block">${structureExtra}</div>`)}
      ${inspectSection(
        'Connections',
        ga.hasResolvableEdges
          ? `${externalBlock || `<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>`}
             ${topByCross ? `<p class="inspect-micro">Rooms with cross-wing links</p><div class="inspect-rows">${topByCross}</div>` : ''}`
          : '<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>',
      )}
      ${inspectSection(
        'Related rooms',
        `<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${topByDrawers.join('')}</div>
         ${topByDeg ? `<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${topByDeg}</div>` : '<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`,
      )}
      ${inspectSection(
        'Health / graph insight',
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

  const wingTotal = Number(wingsData[wingName]) || 0;
  const sumInWing = sumDrawerCountsInWing(roomsData, wingName);
  const wingDen = sumInWing > 0 ? sumInWing : wingTotal;

  const ranked = rankRoomsInWingByDrawers(roomsData, wingName);
  const rr = ranked.find((r) => r.name === roomName);

  const pctWing = drawers != null && wingDen > 0 ? formatPct(drawers, wingDen) : null;
  const pctPalace = drawers != null && totalDrawers > 0 ? formatPct(drawers, totalDrawers) : null;

  const sentence = [
    rr && pctWing != null
      ? `This room is the ${ordinal(rr.rank)} largest in “${wingName}” by drawers and holds about ${pctWing}% of that wing’s drawers (by room list).`
      : null,
    pctPalace != null ? `It is ${pctPalace}% of the entire palace by drawers.` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const roomKey = makeRoomId(wingName, roomName);
  const slice = getRoomGraphSlice(roomKey, ga);
  const graphAvailable = ga.hasResolvableEdges;

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

  const relRooms = (slice?.relatedRooms || [])
    .filter((x) => !(x.wing === wingName && x.room === roomName))
    .slice(0, 6);

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
      ? 'Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.'
      : 'No bridge pattern detected (no cross-wing edges on this room).';

  const graphViewNote =
    appState.view === 'graph'
      ? '<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>'
      : '';

  return `
    <div class="inspect-stack">
      ${graphViewNote}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${escapeHtml(roomName)}</div>
        <p class="inspect-lead">${escapeHtml(sentence || 'Room in the palace taxonomy.')}</p>
        ${pctWing != null ? `<div class="inspect-pct"><span>${pctWing}% of wing drawers (room list)</span>${pctBar(pctWing)}</div>` : ''}
      </div>
      ${inspectSection(
        'Summary',
        `
        <div class="meta-block">
          ${metaRow('Parent wing', escapeHtml(wingName))}
          ${metaRow('Drawers', drawers != null ? formatNum(drawers) : '—')}
          ${metaRow('Share of palace', pctPalace != null ? `${pctPalace}%` : '—')}
        </div>`,
      )}
      ${inspectSection(
        'Position in wing',
        rooms.length
          ? `
        <div class="meta-block">
          ${metaRow('Rank in wing (by drawers)', rr ? `${ordinal(rr.rank)} of ${ranked.length}` : '—')}
          ${metaRow('Wing avg drawers / room', wingAvg != null ? wingAvg.toFixed(1) : '—')}
          ${metaRow('vs average', cmp)}
        </div>`
          : '<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>',
      )}
      ${inspectSection(
        'Connections',
        graphAvailable && slice
          ? `
        <div class="meta-block">
          ${metaRow('Tunnel degree', formatNum(slice.degree))}
          ${metaRow('Cross-wing links', formatNum(slice.crossWingLinks))}
          ${metaRow('Intra-wing links', formatNum(slice.intraWingLinks))}
          ${metaRow('Median degree (all rooms)', slice.medianDegree != null ? formatNum(slice.medianDegree) : '—')}
        </div>
        <p class="inspect-muted inspect-muted--tight">${escapeHtml(bridgeNote)}</p>
        ${relRoomRows ? `<p class="inspect-micro">Related rooms</p><div class="inspect-rows">${relRoomRows}</div>` : '<p class="inspect-empty">No tunnel neighbors found for this room.</p>'}
        ${relWingRows ? `<p class="inspect-micro">Related wings</p><div class="inspect-rows">${relWingRows}</div>` : ''}
        `
          : '<p class="inspect-empty">No tunnel relationships available for this room (unresolved graph or empty tunnels).</p>',
      )}
      ${inspectSection(
        'Insight',
        `<p class="insight-chip">${escapeHtml(insight.label)}</p><p class="inspect-muted inspect-muted--tight">${escapeHtml(insight.detail)}</p>`,
      )}
    </div>`;
}

function onInspectorClick(e) {
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
  appState.currentWing = wing;
  appState.currentRoom = room;
  appState.selected = {
    id: `room:${wing}:${room}`,
    type: 'room',
    name: room,
    wing,
    drawers: rm?.drawers,
  };
  appState.pinned = false;
  appState.view = 'rooms';
  sceneApi?.setView('rooms', wing);
  syncScenePresentation();
  sceneApi?.centerOnNodeId(`room:${wing}:${room}`);
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'rooms')?.hint || '';
  renderInspector();
  persistState();
}

function selectionFromUserData(ud) {
  if (!ud || ud.type === 'center' || !ud.id) return null;
  return {
    id: ud.id,
    type: ud.type,
    name: ud.name,
    wing: ud.wing,
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
        rotate: $('toggle-rotate')?.checked ?? true,
        motion: Number($('motion-range')?.value ?? 1),
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
  if (p.rotate !== undefined && $('toggle-rotate')) $('toggle-rotate').checked = !!p.rotate;
  if (p.motion !== undefined && $('motion-range')) $('motion-range').value = String(p.motion);
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

function syncScenePresentation() {
  sceneApi?.updatePresentation({
    searchQuery: appState.searchQuery,
    selectedId: appState.selected?.id ?? null,
    pinActive: appState.pinned,
  });
}

function setConnState(state, label) {
  const el = $('conn-status');
  if (!el) return;
  el.dataset.state = state;
  el.textContent = label;
}

function showLoading(show) {
  $('loading-overlay')?.classList.toggle('is-hidden', !show);
}

function showError(message, detail) {
  showLoading(true);
  const ov = $('loading-overlay');
  if (!ov) return;
  ov.innerHTML = `
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${escapeHtml(message)}</p>
      ${detail ? `<code>${escapeHtml(detail)}</code>` : ''}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `;
  $('err-retry')?.addEventListener('click', () => loadData(false));
}

function updateFooterContextLine(subject, ctx) {
  const el = $('metric-context');
  const wrap = $('metric-context-wrap');
  if (!el || !wrap) return;

  if (!subject || !ctx) {
    wrap.hidden = true;
    el.textContent = '';
    return;
  }

  wrap.hidden = false;
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
  const kg = dataBundle?.kgStats;
  const ctx = buildPalaceContext();
  const { wingsData, roomsData, totalDrawers, ga } = ctx;

  $('metric-drawers').textContent = formatNum(totalDrawers ?? 0);
  $('metric-wings').textContent = formatNum(Object.keys(wingsData).length);
  $('metric-rooms').textContent = formatNum(countTotalRooms(roomsData));

  let tunnels = 0;
  if (typeof gs?.summary?.resolvedEdgeCount === 'number') tunnels = gs.summary.resolvedEdgeCount;
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
    if (ga.hasResolvableEdges && topW && topR) {
      foot.textContent = `Most cross-linked wing: ${topW.wing} · Most connected room: ${topR.room} (${topR.wing})`;
    } else if (ga.hasResolvableEdges && topW) {
      foot.textContent = `Most cross-linked wing: ${topW.wing}`;
    } else {
      foot.textContent = 'Tunnel graph: resolve endpoints to see cross-wing stats.';
    }
  }

  if (kg && typeof kg === 'object' && !kg.error) {
    const parts = [];
    for (const [k, v] of Object.entries(kg)) {
      if (k === 'error') continue;
      if (typeof v === 'number') parts.push(`${k}: ${formatNum(v)}`);
      else if (typeof v === 'string') parts.push(`${k}: ${v}`);
    }
    $('metric-kg').textContent = parts.length ? parts.slice(0, 8).join(' · ') : '—';
  } else {
    $('metric-kg').textContent = '—';
  }

  updateFooterContextLine(appState.selected, ctx);
}

function filterLegendSearch(text, query) {
  if (!query.trim()) return true;
  return text.toLowerCase().includes(query.trim().toLowerCase());
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
    `<button type="button" class="crumb" data-crumb="root">All wings</button>`,
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

function goAllWings() {
  closeHelpIfOpen();
  appState.view = 'wings';
  appState.currentWing = null;
  appState.currentRoom = null;
  appState.selected = null;
  appState.pinned = false;
  sceneApi?.setView('wings', null);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'wings')?.hint || '';
  renderInspector();
  persistState();
}

function navigateToWing(wing) {
  closeHelpIfOpen();
  if (!dataBundle || !wingExists(dataBundle.wingsData, wing)) return;
  appState.currentWing = wing;
  appState.currentRoom = null;
  appState.view = 'rooms';
  appState.selected = null;
  appState.pinned = false;
  sceneApi?.setView('rooms', wing);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'rooms')?.hint || '';
  renderInspector();
  persistState();
}

function inspectorMode() {
  if (appState.pinned && appState.selected) return 'pinned';
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

function renderInspector() {
  const body = $('inspect-body');
  const mode = inspectorMode();
  const badge = $('inspect-mode-badge');
  if (badge) {
    const labels = {
      empty: 'Nothing selected',
      live: 'Live preview',
      selected: 'Selected',
      pinned: 'Pinned',
    };
    badge.textContent = labels[mode];
    badge.dataset.mode = mode;
  }

  let subject = null;
  if (mode === 'pinned' || mode === 'selected') subject = appState.selected;
  else if (mode === 'live') subject = appState.hovered;

  renderBreadcrumb();

  const ctx = buildPalaceContext();
  const graphNote = graphViewInspectorNotice(ctx);

  if (!subject || subject.type === 'center') {
    if (mode === 'empty') {
      body.innerHTML = graphNote + renderOverviewInspector(ctx);
    } else {
      body.innerHTML =
        graphNote +
        `
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`;
    }
    updateFooterContextLine(null, ctx);
    updatePinButton();
    return;
  }

  const t = subject;
  if (t.type === 'wing') {
    body.innerHTML = graphNote + renderWingInspector(ctx, t.name, mode);
  } else if (t.type === 'room') {
    body.innerHTML = graphNote + renderRoomInspector(ctx, t.wing, t.name, mode);
  } else {
    body.innerHTML = graphNote + `<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>`;
  }
  updateFooterContextLine(t, ctx);
  updatePinButton();
}

function metaRow(k, v) {
  return `<div class="meta-row"><span class="meta-k">${escapeHtml(k)}</span><span class="meta-v">${v}</span></div>`;
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
    return;
  }
  const title = data.name || data.label || 'Node';
  let sub = '';
  if (data.type === 'wing') sub = `Wing · ${formatNum(data.drawers)} drawers`;
  else if (data.type === 'room') sub = `Room in “${escapeHtml(data.wing)}”`;
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
  appState.view = view;
  if (view === 'wings') {
    appState.currentWing = null;
    appState.currentRoom = null;
  }
  const focusWing = view === 'rooms' ? appState.currentWing : null;
  sceneApi?.setView(view, focusWing);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === view)?.hint || '';
  renderInspector();
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
    appState.selected = sel;
    appState.pinned = true;
    syncScenePresentation();
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
  sceneApi = createPalaceScene(container, {
    onHover: (data, pos) => {
      if (shouldIgnoreHover()) {
        fillHoverCard(null);
        positionHoverCard(0, 0, false);
        return;
      }
      appState.hovered = data && data.type !== 'center' ? { ...data } : null;
      renderInspector();
      fillHoverCard(data);
      positionHoverCard(pos.x, pos.y, !!data && data.type !== 'center');
    },
    onClick: (data) => handleSceneClick(data),
  });
  sceneApi.init();
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

function wirePanelCollapse() {
  const main = $('app-main-grid');
  $('btn-collapse-left')?.addEventListener('click', () => {
    main?.classList.toggle('has-left-collapsed');
    $('panel-left')?.classList.toggle('panel--collapsed');
    const collapsed = main?.classList.contains('has-left-collapsed');
    $('btn-collapse-left')?.setAttribute('aria-expanded', String(!collapsed));
    persistPanelLayout();
  });
  $('btn-collapse-right')?.addEventListener('click', () => {
    main?.classList.toggle('has-right-collapsed');
    $('panel-right')?.classList.toggle('panel--collapsed');
    const collapsed = main?.classList.contains('has-right-collapsed');
    $('btn-collapse-right')?.setAttribute('aria-expanded', String(!collapsed));
    persistPanelLayout();
  });
}

function wireControls() {
  $('btn-refresh')?.addEventListener('click', () => loadData(true));

  $('btn-reset-cam')?.addEventListener('click', () => sceneApi?.resetCamera());
  $('btn-center')?.addEventListener('click', () => {
    if (appState.selected?.id) sceneApi?.centerOnNodeId(appState.selected.id);
    else sceneApi?.centerOnHovered();
  });

  $('btn-pin')?.addEventListener('click', () => togglePin());
  $('btn-clear-sel')?.addEventListener('click', () => clearSelection());

  $('toggle-rotate')?.addEventListener('change', (e) => {
    sceneApi?.setAutoRotate(e.target.checked);
    persistState();
  });
  $('toggle-labels')?.addEventListener('change', (e) => {
    sceneApi?.setLabelsVisible(e.target.checked);
    persistState();
  });
  const motionEl = $('motion-range');
  motionEl?.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    sceneApi?.setMotionIntensity(v);
    e.target.setAttribute('aria-valuenow', String(v));
    persistState();
  });
  if (motionEl) motionEl.setAttribute('aria-valuenow', motionEl.value);

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
      persistState();
    }, 120);
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

  window.addEventListener('keydown', (e) => {
    if (isTypingTarget(e.target) && e.key !== 'Escape') return;
    if (e.key === 'Escape') {
      const ho = $('help-overlay');
      if (ho?.classList.contains('is-open')) {
        closeHelpDialog();
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
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      $('search-wings')?.focus();
    }
    if (e.key === 'l' || e.key === 'L') {
      const cb = $('toggle-labels');
      if (cb) {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    }
    if (e.key === ' ') {
      e.preventDefault();
      const cb = $('toggle-rotate');
      if (cb) {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    }
  });

  if (!localStorage.getItem('mempalace-viz-onboarded')) {
    $('onboard-hint').hidden = false;
    localStorage.setItem('mempalace-viz-onboarded', '1');
  }

  if (
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches &&
    !localStorage.getItem(LS_KEY)
  ) {
    const tr = $('toggle-rotate');
    if (tr) {
      tr.checked = false;
      tr.dispatchEvent(new Event('change'));
    }
    if (motionEl) {
      motionEl.value = '0';
      motionEl.setAttribute('aria-valuenow', '0');
      sceneApi?.setMotionIntensity(0);
    }
  }
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
  setConnState('loading', 'Connecting…');
  const ov = $('loading-overlay');
  if (ov) {
    ov.innerHTML = `<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>`;
  }

  dataBundle = await loadPalaceData();

  if (dataBundle.error) {
    if (preserveContext && previousBundle && !previousBundle.error) {
      dataBundle = previousBundle;
      setConnState('stale', 'Offline (cached)');
      showToast('Refresh failed — showing last loaded data. Check the API and try again.');
      showLoading(false);
      renderInspector();
      return;
    }
    setConnState('error', 'Disconnected');
    showError(dataBundle.error.message || String(dataBundle.error), getApiBase() || '(same origin)');
    return;
  }

  setConnState('ok', 'Connected');
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
    graphEdges: dataBundle.graphEdges,
  });

  updateMetrics();
  renderLegend();

  const focusWing = appState.view === 'rooms' ? appState.currentWing : null;
  sceneApi?.setView(appState.view, focusWing);
  syncScenePresentation();

  sceneApi?.setAutoRotate($('toggle-rotate')?.checked ?? true);
  sceneApi?.setLabelsVisible($('toggle-labels')?.checked ?? true);
  sceneApi?.setMotionIntensity(Number($('motion-range')?.value ?? 1));

  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === appState.view)?.hint || '';

  if (!Object.keys(dataBundle.wingsData || {}).length) {
    $('view-helper-text').textContent = 'No wings returned — check MCP backend.';
  } else if (
    !dataBundle.roomsData ||
    !Object.keys(dataBundle.roomsData).some((w) => (dataBundle.roomsData[w] || []).length)
  ) {
    $('view-helper-text').textContent += ' · No rooms in taxonomy yet.';
  }

  if (isDev() && dataBundle.graphEdges?.length) {
    const u = countEdgesWithUnresolvedEndpoints(dataBundle.graphEdges, dataBundle.roomsData);
    if (u) devWarn(`${u} tunnel edge(s) have unresolved endpoints vs taxonomy`);
  }

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
}

function main() {
  buildViewButtons();
  setupScene();
  wireControls();
  wireInspectorDelegation();
  loadData(false);
}

main();
