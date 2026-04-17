/**
 * Explicit navigation depth for Wings / Rooms / Graph focus (UI helpers).
 * Rooms view always has a backward step: room → wing orbit → wings overview (or all-rooms → wings).
 */

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
 * Describes what the next structural back action does in Rooms view (for tests / QA).
 * @param {string | null} currentWing
 * @param {string | null} currentRoom
 * @returns {'toWing'|'toOverview'|'allRoomsToWings'}
 */
export function peekRoomsBackAction(currentWing, currentRoom) {
  if (currentRoom && currentWing) return 'toWing';
  if (currentWing) return 'toOverview';
  return 'allRoomsToWings';
}
