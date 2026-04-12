/**
 * Pure helpers for persisted navigation state validation and snapshots.
 */
import { wingExists, roomExists } from './api.js';

const VIEWS = new Set(['wings', 'rooms', 'graph']);

/**
 * @param {unknown} raw
 * @returns {object|null}
 */
export function safeParsePersisted(raw) {
  if (raw == null || typeof raw !== 'object') return null;
  return raw;
}

/**
 * Coerce persisted blob to safe navigation fields (does not require live API data).
 * @param {unknown} p
 */
export function normalizePersistedNavigation(p) {
  const o = safeParsePersisted(p);
  if (!o) {
    return {
      view: 'wings',
      currentWing: null,
      currentRoom: null,
      selected: null,
      pinned: false,
      searchQuery: '',
      labels: undefined,
      rotate: undefined,
      motion: undefined,
    };
  }
  const view = VIEWS.has(o.view) ? o.view : 'wings';
  return {
    view,
    currentWing: typeof o.currentWing === 'string' ? o.currentWing : o.currentWing ?? null,
    currentRoom: typeof o.currentRoom === 'string' ? o.currentRoom : o.currentRoom ?? null,
    selected: o.selected && typeof o.selected === 'object' ? o.selected : null,
    pinned: !!o.pinned,
    searchQuery: typeof o.searchQuery === 'string' ? o.searchQuery : '',
    labels: o.labels,
    rotate: o.rotate,
    motion: o.motion,
  };
}

/**
 * Drop invalid wing/room references against loaded data.
 * @param {object} appState - mutable
 * @param {{ wingsData: object, roomsData: object }} dataBundle
 */
export function sanitizeNavigationAgainstData(appState, dataBundle) {
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
  if (appState.pinned && !appState.selected) {
    appState.pinned = false;
  }
}

/**
 * @param {object} appState
 * @param {{ wingsData?: object, roomsData?: object, graphEdges?: unknown[] }} dataBundle
 * @param {{ assert?: (cond: boolean, msg?: string) => void }} [opts]
 */
export function assertValidState(appState, dataBundle, opts = {}) {
  const assert = opts.assert || (() => {});
  assert(VIEWS.has(appState.view), 'view must be wings|rooms|graph');
  if (appState.currentWing) {
    assert(wingExists(dataBundle?.wingsData, appState.currentWing), 'currentWing must exist in wingsData');
  }
  if (appState.currentRoom && appState.currentWing) {
    assert(roomExists(dataBundle?.roomsData, appState.currentWing, appState.currentRoom), 'currentRoom must exist');
  }
  if (appState.selected?.type === 'wing') {
    assert(wingExists(dataBundle?.wingsData, appState.selected.name), 'selected wing must exist');
  }
  if (appState.selected?.type === 'room') {
    assert(
      roomExists(dataBundle?.roomsData, appState.selected.wing, appState.selected.name),
      'selected room must exist',
    );
  }
  if (appState.pinned) {
    assert(!!appState.selected, 'pinned requires selection');
  }
}
