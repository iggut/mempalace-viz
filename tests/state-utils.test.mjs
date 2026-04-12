import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePersistedNavigation, sanitizeNavigationAgainstData } from '../state-utils.js';

test('normalizePersistedNavigation coerces invalid view', () => {
  const n = normalizePersistedNavigation({ view: 'bogus', searchQuery: '  hi  ' });
  assert.equal(n.view, 'wings');
  assert.equal(n.searchQuery, '  hi  ');
});

test('sanitizeNavigationAgainstData clears stale wing', () => {
  const appState = {
    view: 'rooms',
    currentWing: 'gone',
    currentRoom: 'r',
    selected: { type: 'wing', name: 'gone', id: 'wing:gone' },
    pinned: true,
    hovered: null,
    searchQuery: '',
    filters: { visibleWings: null },
  };
  const dataBundle = {
    wingsData: { ok: 10 },
    roomsData: { ok: [{ name: 'r', drawers: 1 }] },
  };
  sanitizeNavigationAgainstData(appState, dataBundle);
  assert.equal(appState.currentWing, null);
  assert.equal(appState.selected, null);
  assert.equal(appState.pinned, false);
});
