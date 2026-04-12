/**
 * MemPalace 3D — app state, navigation, inspector, persistence, scene sync.
 */
import { loadPalaceData, getApiBase, wingExists, roomExists } from './api.js';
import { createPalaceScene, wingColorFor } from './scene.js';

const LS_KEY = 'mempalace-viz-explorer-v1';

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

const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]),
  );
}

function formatNum(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return Number(n).toLocaleString();
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
  const wd = dataBundle?.wingsData || {};
  const rd = dataBundle?.roomsData || {};

  if (appState.currentWing && !wingExists(wd, appState.currentWing)) {
    appState.currentWing = null;
    appState.currentRoom = null;
    appState.selected = null;
    appState.pinned = false;
  }
  if (appState.currentRoom && appState.currentWing) {
    if (!roomExists(rd, appState.currentWing, appState.currentRoom)) {
      appState.currentRoom = null;
      if (appState.selected?.type === 'room') {
        appState.selected = null;
        appState.pinned = false;
      }
    }
  }
  if (appState.selected?.id) {
    const s = appState.selected;
    if (s.type === 'wing' && !wingExists(wd, s.name)) {
      appState.selected = null;
      appState.pinned = false;
    }
    if (s.type === 'room' && (!s.wing || !roomExists(rd, s.wing, s.name))) {
      appState.selected = null;
      appState.pinned = false;
    }
  }
}

function applyPersistedToControls(p) {
  if (!p) return;
  if (p.labels !== undefined && $('toggle-labels')) $('toggle-labels').checked = !!p.labels;
  if (p.rotate !== undefined && $('toggle-rotate')) $('toggle-rotate').checked = !!p.rotate;
  if (p.motion !== undefined && $('motion-range')) $('motion-range').value = String(p.motion);
  if (p.searchQuery !== undefined && $('search-wings')) $('search-wings').value = p.searchQuery;
}

function mergePersistedNavigation(p) {
  if (!p) return;
  if (p.view === 'wings' || p.view === 'rooms' || p.view === 'graph') appState.view = p.view;
  if (p.currentWing !== undefined) appState.currentWing = p.currentWing;
  if (p.currentRoom !== undefined) appState.currentRoom = p.currentRoom;
  if (p.selected && typeof p.selected === 'object') appState.selected = p.selected;
  if (p.pinned !== undefined) appState.pinned = !!p.pinned;
  if (p.searchQuery !== undefined) appState.searchQuery = p.searchQuery;
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

function updateMetrics() {
  const st = dataBundle?.status;
  const gs = dataBundle?.graphStats;
  const kg = dataBundle?.kgStats;

  const drawers = st?.total_drawers;
  const wingCount = st?.wings && typeof st.wings === 'object' ? Object.keys(st.wings).length : 0;
  const roomCount = st?.rooms && typeof st.rooms === 'object' ? Object.keys(st.rooms).length : 0;

  $('metric-drawers').textContent = formatNum(drawers ?? 0);
  $('metric-wings').textContent = formatNum(wingCount);
  $('metric-rooms').textContent = formatNum(roomCount);

  let tunnels = 0;
  if (gs?.tunnels && typeof gs.tunnels === 'object') tunnels = Object.keys(gs.tunnels).length;
  $('metric-tunnels').textContent = tunnels ? formatNum(tunnels) : '—';

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
}

function goAllWings() {
  appState.view = 'wings';
  appState.currentWing = null;
  appState.currentRoom = null;
  appState.selected = null;
  appState.pinned = false;
  sceneApi?.setView('wings', null);
  syncScenePresentation();
  setActiveViewButtons();
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === 'wings')?.hint || '';
  renderBreadcrumb();
  renderInspector();
  persistState();
}

function navigateToWing(wing) {
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
  renderBreadcrumb();
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

  if (!subject || subject.type === 'center') {
    body.innerHTML = `
      <div class="empty-state">
        <strong>${mode === 'empty' ? 'Nothing selected' : 'Hover a node'}</strong>
        ${mode === 'empty' ? '<p>Click a wing to open its rooms. Click a room or graph node to select. Use Pin to keep the inspector fixed while exploring.</p>' : '<p>Move the pointer over the scene for a quick preview.</p>'}
      </div>`;
    updatePinButton();
    return;
  }

  const t = subject;
  const typeLabel = t.type === 'wing' ? 'Wing' : t.type === 'room' ? 'Room' : 'Node';
  let rows = '';
  if (t.type === 'wing') rows += metaRow('Drawers', formatNum(t.drawers));
  if (t.type === 'room') {
    rows += metaRow('Wing', escapeHtml(t.wing));
    rows += metaRow('Drawers in room', formatNum(t.drawers));
  }

  body.innerHTML = `
    <div class="inspect-card">
      <span class="badge">${escapeHtml(typeLabel)}</span>
      <div class="inspect-title">${escapeHtml(t.name || '')}</div>
      ${rows ? `<div class="meta-block">${rows}</div>` : ''}
    </div>
  `;
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
    btn.classList.toggle('is-active', btn.getAttribute('data-view') === appState.view);
  });
}

function applyView(view) {
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
  renderBreadcrumb();
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
    renderBreadcrumb();
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
    renderBreadcrumb();
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
    renderBreadcrumb();
    renderInspector();
    persistState();
    return;
  }

  if (appState.view === 'graph') {
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
      appState.hovered = data && data.type !== 'center' ? { ...data } : null;
      renderInspector();
      fillHoverCard(data);
      positionHoverCard(pos.x, pos.y, !!data && data.type !== 'center');
    },
    onClick: (data) => handleSceneClick(data),
  });
  sceneApi.init();
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
  $('motion-range')?.addEventListener('input', (e) => {
    sceneApi?.setMotionIntensity(Number(e.target.value));
    persistState();
  });

  VIEWS.forEach((v) => {
    document.querySelector(`[data-view="${v.id}"]`)?.addEventListener('click', () => applyView(v.id));
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
    o?.classList.toggle('is-open');
    if (o) o.setAttribute('aria-hidden', o.classList.contains('is-open') ? 'false' : 'true');
  });
  $('help-close')?.addEventListener('click', () => {
    const o = $('help-overlay');
    o?.classList.remove('is-open');
    o?.setAttribute('aria-hidden', 'true');
  });
  $('help-overlay')?.addEventListener('click', (e) => {
    const o = $('help-overlay');
    if (e.target === o) {
      o?.classList.remove('is-open');
      o?.setAttribute('aria-hidden', 'true');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea') && e.key !== 'Escape') return;
    if (e.key === 'Escape') {
      const ho = $('help-overlay');
      if (ho?.classList.contains('is-open')) {
        ho.classList.remove('is-open');
        ho.setAttribute('aria-hidden', 'true');
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
    if (e.target.matches('input, textarea')) return;
    if (e.key === '1') applyView('wings');
    if (e.key === '2') applyView('rooms');
    if (e.key === '3') applyView('graph');
    if (e.key === 'r' || e.key === 'R') sceneApi?.resetCamera();
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
}

function buildViewButtons() {
  const host = $('view-buttons');
  if (!host) return;
  host.innerHTML = VIEWS.map(
    (v) => `
    <button type="button" class="view-seg__btn" data-view="${v.id}">
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

  showLoading(true);
  setConnState('loading', 'Connecting…');
  const ov = $('loading-overlay');
  if (ov) {
    ov.innerHTML = `<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>`;
  }

  dataBundle = await loadPalaceData();

  if (dataBundle.error) {
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

  renderBreadcrumb();
  renderInspector();
  persistState();
}

function main() {
  buildViewButtons();
  setupScene();
  wireControls();
  loadData(false);
}

main();
