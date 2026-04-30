/**
 * Pure production UI helpers for the MemPalace viewer.
 * No DOM access here: keep navigation copy and panel toggles testable.
 */

const VIEW_IDS = ['wings', 'rooms', 'graph'];

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function describeNavigationMode({ view = 'wings', currentWing = '', currentRoom = '', selected = null } = {}) {
  const wing = clean(currentWing || selected?.wing || selected?.wingId);
  const room = clean(currentRoom || selected?.name);

  if (view === 'graph') {
    if (selected?.type === 'room' && room) {
      return {
        eyebrow: wing ? `Graph focus · ${wing}` : 'Graph focus',
        title: room,
        hint: 'Neural connections are live here — step links, route between rooms, or open the same room in the Rooms tree.',
      };
    }
    if (selected?.type === 'wing' && clean(selected.name)) {
      return {
        eyebrow: 'Graph focus',
        title: clean(selected.name),
        hint: 'This wing is highlighted in the relationship graph. Select a connected room to inspect its neighborhood.',
      };
    }
    return {
      eyebrow: 'Neural graph',
      title: 'Connected rooms',
      hint: 'Search or click a node to focus; electrical pulses show explicit MemPalace tunnels and relationships.',
    };
  }

  if (view === 'rooms') {
    if (wing && room) {
      return {
        eyebrow: `Rooms · ${wing}`,
        title: room,
        hint: 'Inspect stored drawers for this room, or jump back to the graph to see relationship context.',
      };
    }
    if (wing) {
      return {
        eyebrow: 'Rooms',
        title: `Rooms in ${wing}`,
        hint: 'Choose a room to inspect its stored drawers, tunnel context, and knowledge tools.',
      };
    }
    return {
      eyebrow: 'Rooms',
      title: 'All rooms',
      hint: 'Browse rooms by wing, then select one to inspect its stored content.',
    };
  }

  return {
    eyebrow: 'Overview',
    title: 'All wings',
    hint: 'Start with domains, then drill into rooms or switch to the neural graph.',
  };
}

export function summarizeGraphDensity({ roomCount = 0, edgeCount = 0 } = {}) {
  const rooms = Math.max(0, Number(roomCount) || 0);
  const edges = Math.max(0, Number(edgeCount) || 0);
  if (rooms >= 60 || edges >= 240) {
    return {
      tone: 'dense',
      label: 'Dense graph',
      detail: 'Use search, focus canvas, and relationship filters to reduce visual noise.',
    };
  }
  if (rooms >= 24 || edges >= 80) {
    return {
      tone: 'active',
      label: 'Active graph',
      detail: 'Click a node to spotlight neighbors, or route between connected rooms.',
    };
  }
  return {
    tone: 'calm',
    label: 'Calm graph',
    detail: 'Explore directly by clicking wings, rooms, and tunnel links.',
  };
}

export function nextFocusPanelState({ left = false, right = false } = {}) {
  const bothCollapsed = !!left && !!right;
  if (bothCollapsed) return { left: false, right: false };
  return { left: true, right: true };
}

export function buildCanvasActionModel({ view = 'wings', selected = null, panelsCollapsed = {} } = {}) {
  const rightCollapsed = !!panelsCollapsed.right;
  const hasSelection = !!selected && selected.type !== 'center';
  const primaryAction = rightCollapsed
    ? { id: 'show-inspector', label: hasSelection ? 'Show selection' : 'Show inspector' }
    : { id: 'focus-search', label: view === 'graph' ? 'Find node' : 'Filter' };

  return {
    viewIds: [...VIEW_IDS],
    primaryAction,
    focusAction: {
      id: 'focus-canvas',
      label: panelsCollapsed.left && panelsCollapsed.right ? 'Show panels' : 'Focus canvas',
    },
    shortcuts: [
      { key: '/', label: 'Find structure' },
      { key: '⌘K', label: 'Semantic search' },
      { key: 'R', label: 'Reset camera' },
      { key: 'Esc', label: 'Back' },
    ],
  };
}
