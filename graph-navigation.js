/**
 * Pure helpers for graph focus history and neighbor stepping (UI + scene coordination).
 *
 * Route mode (see ui.js / graph-route.js): stepping along a computed path does **not** push
 * graph focus history — same idea as stepping search results (Alt+N/P). Manual room picks and
 * inspector navigation may still push history via their existing handlers.
 */

/**
 * @param {{ view: string, selected: object | null, pinned: boolean, currentWing: string | null, currentRoom: string | null }}[] stack
 * @param {{ view: string, selected: object | null, pinned: boolean, currentWing: string | null, currentRoom: string | null }} entry
 * @param {number} [maxDepth]
 * @returns {FocusHistoryEntry[]}
 */
export function pushFocusHistory(stack, entry, maxDepth = 8) {
  if (!entry || entry.view !== 'graph') return stack;
  stack.push(entry);
  while (stack.length > maxDepth) stack.shift();
  return stack;
}

/**
 * @param {FocusHistoryEntry[]} stack
 * @returns {FocusHistoryEntry | null}
 */
export function popFocusHistory(stack) {
  return stack.length ? stack.pop() : null;
}

/**
 * @param {string[]} sortedIds
 * @param {string} currentId
 * @param {number} delta — +1 or -1
 * @returns {string | null}
 */
export function stepRing(sortedIds, currentId, delta) {
  if (!sortedIds.length) return null;
  let ix = sortedIds.indexOf(currentId);
  if (ix === -1) ix = 0;
  const n = sortedIds.length;
  const next = (ix + delta + n * 16) % n;
  return sortedIds[next];
}

/**
 * Pick the next/previous room in an adjacency list while exploring from `selectedId`.
 * When `selectedId` is not among neighbors (focus room with its incident list), the first step lands on an endpoint of that list.
 * @param {string[]} sortedNeighborIds
 * @param {string} selectedId
 * @param {number} delta
 * @returns {string | null}
 */
export function stepAdjacentRoom(sortedNeighborIds, selectedId, delta) {
  const sorted = sortedNeighborIds;
  if (!sorted.length) return null;
  const ix = sorted.indexOf(selectedId);
  const n = sorted.length;
  if (ix === -1) {
    return delta >= 0 ? sorted[0] : sorted[n - 1];
  }
  return sorted[(ix + delta + n * 16) % n];
}

/**
 * Parse `room:wing:name` into parts (name may contain colons — only first wing delimiter split).
 * @param {string} sceneId
 * @returns {{ wing: string, room: string } | null}
 */
export function parseRoomSceneId(sceneId) {
  if (!sceneId || !sceneId.startsWith('room:')) return null;
  const rest = sceneId.slice('room:'.length);
  const i = rest.indexOf(':');
  if (i <= 0) return null;
  return { wing: rest.slice(0, i), room: rest.slice(i + 1) };
}

/**
 * Whether a graph search jump should push focus history before moving to `nextSceneId`.
 * Used with `firstNavInQuery` from the current search-query session (see ui.js).
 * @param {string | null | undefined} prevSelectedId
 * @param {string} nextSceneId
 * @param {boolean} firstNavInQuery
 */
export function shouldPushHistoryOnGraphSearchJump(prevSelectedId, nextSceneId, firstNavInQuery) {
  return !!(firstNavInQuery && prevSelectedId && nextSceneId && prevSelectedId !== nextSceneId);
}
