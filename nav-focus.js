/**
 * Canonical navigation model — Wings / Rooms / Graph
 *
 * Exactly one structural level applies at a time (derived from `view` + `currentWing` +
 * `currentRoom`). Graph intra-view “Back” is separate: a stack of prior graph selections
 * (`graphFocusHistory` in ui.js), not tab order or inspector mode.
 *
 * | Canonical level | Meaning |
 * |-----------------|--------|
 * | `overview` | Wings tab: global palace overview. |
 * | `rooms_all` | Rooms tab, no wing filter — all rooms across wings. |
 * | `wing_scope` | Rooms tab, one wing’s orbit, no room as structural focus. |
 * | `room_scope` | Rooms tab, a room is the structural focus. |
 * | `graph_focus` | Graph tab: tunnel graph; selection changes can push focus history. |
 *
 * **Back (header / Esc / structural)** uses this model + graph focus depth:
 * - `overview`: no structural back.
 * - `rooms_*` / `wing_scope` / `room_scope`: one step toward shallower Rooms or Overview
 *   (see `peekRoomsBackAction`).
 * - `graph_focus`: Back pops `graphFocusHistory` only when depth > 0; never inferred from
 *   pinned state or inspector UI alone.
 *
 * **Overview** affordances (crumb, nav-scope) always call the same transition: full reset to
 * `overview` (see `goAllWings` in ui.js).
 */

/** @typedef {'overview'|'rooms_all'|'wing_scope'|'room_scope'|'graph_focus'} CanonicalNavLevel */

export const CANONICAL_NAV = {
  OVERVIEW: /** @type {const} */ ('overview'),
  ROOMS_ALL: /** @type {const} */ ('rooms_all'),
  WING_SCOPE: /** @type {const} */ ('wing_scope'),
  ROOM_SCOPE: /** @type {const} */ ('room_scope'),
  GRAPH_FOCUS: /** @type {const} */ ('graph_focus'),
};

/**
 * Single source of truth for “where am I?” in the palace navigator (tabs + scope).
 * @param {'wings'|'rooms'|'graph'} view
 * @param {string | null} currentWing
 * @param {string | null} currentRoom
 * @returns {CanonicalNavLevel}
 */
export function getCanonicalNavLevel(view, currentWing, currentRoom) {
  if (view === 'wings') return CANONICAL_NAV.OVERVIEW;
  if (view === 'graph') return CANONICAL_NAV.GRAPH_FOCUS;
  if (!currentWing && !currentRoom) return CANONICAL_NAV.ROOMS_ALL;
  if (currentWing && !currentRoom) return CANONICAL_NAV.WING_SCOPE;
  return CANONICAL_NAV.ROOM_SCOPE;
}

/**
 * @param {'wings'|'rooms'|'graph'} view
 * @param {number} graphFocusHistoryLength
 */
export function canNavigateBack(view, graphFocusHistoryLength) {
  if (view === 'rooms') return true;
  if (view === 'graph' && graphFocusHistoryLength > 0) return true;
  return false;
}

/**
 * Next structural back step in Rooms view only (Graph uses `peekNextBackAction`).
 * - `toWing`: room → wing orbit (still Rooms tab).
 * - `toOverview`: wing orbit alone → Wings overview (clears wing/room).
 * - `allRoomsToWings`: “all rooms” list → Wings overview.
 * @param {string | null} currentWing
 * @param {string | null} currentRoom
 * @returns {'toWing'|'toOverview'|'allRoomsToWings'}
 */
export function peekRoomsBackAction(currentWing, currentRoom) {
  if (currentRoom && currentWing) return 'toWing';
  if (currentWing) return 'toOverview';
  return 'allRoomsToWings';
}

/**
 * What the next Back will do (header button + Esc when `goBackOneLevel` runs), from state only.
 * @param {'wings'|'rooms'|'graph'} view
 * @param {string | null} currentWing
 * @param {string | null} currentRoom
 * @param {number} graphFocusHistoryLength
 * @returns {'none'|'graphFocusPop'|'toWing'|'toOverview'|'allRoomsToWings'}
 */
export function peekNextBackAction(view, currentWing, currentRoom, graphFocusHistoryLength) {
  if (view === 'graph') {
    return graphFocusHistoryLength > 0 ? 'graphFocusPop' : 'none';
  }
  if (view === 'wings') return 'none';
  return peekRoomsBackAction(currentWing, currentRoom);
}
