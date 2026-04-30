/**
 * Pure production UI helpers for the MemPalace viewer.
 * No DOM access here: keep navigation copy and panel toggles testable.
 */

const VIEW_IDS = ['wings', 'rooms', 'graph'];

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function fmt(value) {
  if (value == null || value === '') return '—';
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString() : String(value);
}

export function describeNavigationMode({ view = 'wings', currentWing = '', currentRoom = '', selected = null } = {}) {
  const wing = clean(currentWing || selected?.wing || selected?.wingId);
  const room = clean(currentRoom || selected?.name);

  if (view === 'graph') {
    if (selected?.type === 'room' && room) {
      return {
        eyebrow: wing ? `Graph · ${wing}` : 'Graph',
        title: room,
        hint: 'Explicit tunnel graph. Click neighbors or inspect useful data.',
      };
    }
    if (selected?.type === 'wing' && clean(selected.name)) {
      return {
        eyebrow: 'Graph',
        title: clean(selected.name),
        hint: 'Wing focus. Select a room to see useful data.',
      };
    }
    return {
      eyebrow: 'Graph',
      title: 'Connected rooms',
      hint: 'Find or click a node to focus.',
    };
  }

  if (view === 'rooms') {
    if (wing && room) {
      return {
        eyebrow: `Rooms · ${wing}`,
        title: room,
        hint: 'Stored drawers, neighbors, and next actions.',
      };
    }
    if (wing) {
      return {
        eyebrow: 'Rooms',
        title: `Rooms in ${wing}`,
        hint: 'Choose a room to inspect its useful data.',
      };
    }
    return {
      eyebrow: 'Rooms',
      title: 'All rooms',
      hint: 'Browse rooms by wing.',
    };
  }

  return {
    eyebrow: 'Overview',
    title: 'All wings',
    hint: 'Start with Find, Browse, or Graph hubs.',
  };
}

export function summarizeGraphDensity({ roomCount = 0, edgeCount = 0 } = {}) {
  const rooms = Math.max(0, Number(roomCount) || 0);
  const edges = Math.max(0, Number(edgeCount) || 0);
  if (rooms >= 60 || edges >= 240) {
    return {
      visible: true,
      tone: 'dense',
      label: 'Dense graph',
      detail: 'Find or focus canvas to reduce noise.',
    };
  }
  if (rooms >= 24 || edges >= 80) {
    return {
      visible: true,
      tone: 'active',
      label: 'Active graph',
      detail: 'Use Find or click a node to narrow the scene.',
    };
  }
  return {
    visible: false,
    tone: 'calm',
    label: 'Calm graph',
    detail: '',
  };
}

export function nextFocusPanelState({ left = false, right = false } = {}) {
  const bothCollapsed = !!left && !!right;
  if (bothCollapsed) return { left: false, right: false };
  return { left: true, right: true };
}

export function buildCanvasActionModel({ view = 'wings', selected = null, panelsCollapsed = {} } = {}) {
  const bothCollapsed = !!panelsCollapsed.left && !!panelsCollapsed.right;
  const hasSelection = !!selected && selected.type !== 'center';
  let primaryAction;
  if (bothCollapsed) primaryAction = { id: 'show-panels', label: 'Show panels' };
  else if (hasSelection) primaryAction = { id: 'show-details', label: 'Show details' };
  else primaryAction = { id: 'focus-search', label: 'Find' };

  return {
    viewIds: [...VIEW_IDS],
    primaryAction,
    focusAction: {
      id: 'focus-canvas',
      label: bothCollapsed ? 'Show panels' : 'Focus canvas',
    },
    secondaryActions: [{ id: 'reset-camera', label: 'Reset' }],
    shortcuts: [],
  };
}

export function usefulDataActionsForView(summary = {}, { view = 'wings' } = {}) {
  return (summary.actions || []).filter((action) => {
    if ((action.id === 'show-neighbors' || action.id === 'route-from-here') && view !== 'graph') return false;
    return true;
  });
}

export function compactFooterMetricIds(width) {
  const w = Number(width) || 0;
  if (w > 0 && w < 800) return ['drawers', 'rooms', 'edges'];
  return ['drawers', 'wings', 'rooms', 'edges', 'focus'];
}

export function shouldAutoCollapseInspector({ width = 0, selected = null } = {}) {
  const w = Number(width) || 0;
  return w > 0 && w < 900 && (!selected || selected.type === 'center');
}

export function subjectForInspectorMode({ mode = 'empty', selected = null, hovered = null } = {}) {
  if (mode === 'pinned' || mode === 'selected' || mode === 'graphFocus') return selected;
  if (mode === 'live') return hovered;
  return null;
}

export function buildRoomUsefulDataSummary({
  wingName = '',
  roomName = '',
  drawers = null,
  visibleDegree = 0,
  totalDegree = null,
  crossWingLinks = 0,
  recent = '',
  topDrawerPreviews = [],
  graphAvailable = false,
} = {}) {
  const metrics = [
    { label: 'Drawers', value: fmt(drawers) },
    { label: graphAvailable ? 'Visible links' : 'Links', value: fmt(visibleDegree) },
    { label: 'Cross-wing', value: fmt(crossWingLinks) },
  ];
  const signals = [];
  if (totalDegree != null && Number(totalDegree) !== Number(visibleDegree)) signals.push(`${fmt(totalDegree)} total tunnel links`);
  if (recent) signals.push(`Recent: ${recent}`);
  return {
    kind: 'Room',
    title: clean(roomName) || 'Room',
    location: clean(wingName) && clean(roomName) ? `${clean(wingName)} / ${clean(roomName)}` : clean(wingName),
    metrics,
    signals,
    previews: (topDrawerPreviews || []).filter(Boolean).slice(0, 3),
    actions: [
      { id: 'open-drawers', label: 'Open drawers' },
      { id: 'show-neighbors', label: 'Show neighbors' },
      { id: 'route-from-here', label: 'Route from here' },
      { id: 'search-in-room', label: 'Search memories' },
    ],
  };
}

export function buildWingUsefulDataSummary({
  wingName = '',
  drawerCount = null,
  roomCount = 0,
  topRooms = [],
  bridgeRooms = [],
  graphAvailable = false,
} = {}) {
  const bridges = (bridgeRooms || []).filter(Boolean);
  return {
    kind: 'Wing',
    title: clean(wingName) || 'Wing',
    location: clean(wingName),
    metrics: [
      { label: 'Rooms', value: fmt(roomCount) },
      { label: 'Drawers', value: fmt(drawerCount) },
      { label: 'Bridge rooms', value: graphAvailable ? fmt(bridges.length) : '—' },
    ],
    topRooms: (topRooms || []).slice(0, 5).map((r) => `${r.name} (${fmt(r.drawers)})`),
    signals: bridges.slice(0, 3).map((r) => `Bridge: ${r.name} (${fmt(r.degree)} links)`),
    actions: [
      { id: 'open-rooms', label: 'Open rooms' },
      { id: 'show-graph-focus', label: 'Show graph focus' },
      { id: 'search-within-wing', label: 'Find in wing' },
    ],
  };
}
