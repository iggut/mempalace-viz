/**
 * MemPalace 3D — UI shell, metrics, inspector, search, keyboard shortcuts.
 */
import { loadPalaceData, getApiBase } from './api.js';
import { createPalaceScene, wingColorFor } from './scene.js';

const VIEWS = [
  {
    id: 'wings',
    title: 'Wings',
    hint: 'High-level structure by domain or project.',
  },
  {
    id: 'rooms',
    title: 'Rooms',
    hint: 'Rooms within each wing, orbiting their parent.',
  },
  {
    id: 'graph',
    title: 'Graph',
    hint: 'Tunnel relationships across rooms.',
  },
];

let sceneApi = null;
let dataBundle = null;
let currentView = 'wings';
let pinned = null;
let lastHover = null;
let searchQuery = '';

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

function setConnState(state, label) {
  const el = $('conn-status');
  if (!el) return;
  el.dataset.state = state;
  el.textContent = label;
}

function showLoading(show) {
  const ov = $('loading-overlay');
  if (!ov) return;
  ov.classList.toggle('is-hidden', !show);
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
  $('err-retry')?.addEventListener('click', () => bootstrap());
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
  if (gs?.tunnels && typeof gs.tunnels === 'object') {
    tunnels = Object.keys(gs.tunnels).length;
  }
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
      const show = filterLegendSearch(`${wing} ${count}`, searchQuery);
      return `
      <div class="legend-item" data-wing="${escapeHtml(wing)}" style="${show ? '' : 'display:none'}">
        <span class="legend-color" style="background:${color}"></span>
        <span>${escapeHtml(wing)} · ${formatNum(count)} drawers</span>
      </div>`;
    })
    .join('');
}

function breadcrumbFrom(data) {
  if (!data || data.type === 'center') return 'All wings';
  if (data.type === 'wing') return `All wings <span>›</span> ${escapeHtml(data.name)}`;
  if (data.type === 'room') {
    return `All wings <span>›</span> ${escapeHtml(data.wing)} <span>›</span> ${escapeHtml(data.name)}`;
  }
  return 'All wings';
}

function renderInspector() {
  const bc = $('breadcrumb');
  const body = $('inspect-body');
  const t = pinned || lastHover;

  if (bc) bc.innerHTML = breadcrumbFrom(t);

  if (!t || t.type === 'center') {
    body.innerHTML = `
      <div class="empty-state">
        <strong>Nothing highlighted</strong>
        Hover the scene for a quick summary. Click a wing or room to pin details here.
        <p style="margin-top:10px;font-size:0.76rem;">Click empty space to clear a pin.</p>
      </div>`;
    return;
  }

  const typeLabel = t.type === 'wing' ? 'Wing' : t.type === 'room' ? 'Room' : 'Node';
  const isPinned =
    pinned &&
    pinned.type === t.type &&
    pinned.name === t.name &&
    (t.type !== 'room' || pinned.wing === t.wing);

  let rows = '';
  if (t.type === 'wing') {
    rows += metaRow('Drawers', formatNum(t.drawers));
  }
  if (t.type === 'room') {
    rows += metaRow('Wing', escapeHtml(t.wing));
    rows += metaRow('Drawers in room', formatNum(t.drawers));
  }

  body.innerHTML = `
    <div class="inspect-card">
      <span class="badge">${escapeHtml(typeLabel)}</span>
      <div class="inspect-title">${escapeHtml(t.name || t.label)}</div>
      ${rows ? `<div class="meta-block">${rows}</div>` : ''}
      ${isPinned ? '<p style="margin:10px 0 0;font-size:0.72rem;color:#64748b;">Pinned</p>' : '<p style="margin:10px 0 0;font-size:0.72rem;color:#64748b;">Live preview (hover)</p>'}
    </div>
  `;
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
    btn.classList.toggle('is-active', btn.getAttribute('data-view') === currentView);
  });
}

function applyView(view) {
  currentView = view;
  setActiveViewButtons();
  sceneApi?.setView(view);
  $('view-helper-text').textContent = VIEWS.find((v) => v.id === view)?.hint || '';
}

async function bootstrap() {
  showLoading(true);
  setConnState('loading', 'Connecting…');
  $('loading-overlay').innerHTML = `
    <div class="spinner"></div>
    <p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>
  `;

  dataBundle = await loadPalaceData();

  if (dataBundle.error) {
    setConnState('error', 'Disconnected');
    showError(dataBundle.error.message || String(dataBundle.error), getApiBase() || '(same origin)');
    return;
  }

  setConnState('ok', 'Connected');
  showLoading(false);

  sceneApi?.setData({
    wingsData: dataBundle.wingsData,
    roomsData: dataBundle.roomsData,
    graphEdges: dataBundle.graphEdges,
  });

  updateMetrics();
  renderLegend();
  renderInspector();

  applyView(currentView);

  if (!Object.keys(dataBundle.wingsData || {}).length) {
    $('view-helper-text').textContent = 'No wings returned — check MCP backend.';
  } else if (
    !dataBundle.roomsData ||
    !Object.keys(dataBundle.roomsData).some((w) => (dataBundle.roomsData[w] || []).length)
  ) {
    $('view-helper-text').textContent += ' · No rooms in taxonomy yet.';
  }
}

function setupScene() {
  const container = $('canvas-container');
  sceneApi = createPalaceScene(container, {
    onHover: (data, pos) => {
      lastHover = data;
      renderInspector();
      fillHoverCard(data);
      positionHoverCard(pos.x, pos.y, !!data && data.type !== 'center');
    },
    onClick: (data) => {
      if (!data || data.type === 'center') {
        pinned = null;
        lastHover = null;
        sceneApi?.clearPin();
        renderInspector();
        fillHoverCard(null);
        positionHoverCard(0, 0, false);
        return;
      }
      pinned = data;
      renderInspector();
    },
  });
  sceneApi.init();
}

function setupControls() {
  $('btn-refresh')?.addEventListener('click', () => bootstrap());

  $('btn-reset-cam')?.addEventListener('click', () => sceneApi?.resetCamera());
  $('btn-center')?.addEventListener('click', () => sceneApi?.centerOnSelection());

  $('toggle-rotate')?.addEventListener('change', (e) => {
    sceneApi?.setAutoRotate(e.target.checked);
  });
  $('toggle-labels')?.addEventListener('change', (e) => {
    sceneApi?.setLabelsVisible(e.target.checked);
  });
  $('motion-range')?.addEventListener('input', (e) => {
    sceneApi?.setMotionIntensity(Number(e.target.value));
  });

  VIEWS.forEach((v) => {
    document.querySelector(`[data-view="${v.id}"]`)?.addEventListener('click', () => applyView(v.id));
  });

  $('search-wings')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderLegend();
  });

  window.addEventListener('keydown', (e) => {
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

function main() {
  buildViewButtons();
  setupScene();
  setupControls();
  bootstrap();
}

main();
