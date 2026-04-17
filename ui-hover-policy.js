/**
 * Pure helpers for hover-driven inspector updates — avoids full re-renders on every pointermove.
 */

/**
 * @param {{ id?: string, type?: string }|null|undefined} data
 * @returns {string}
 */
export function hoverTargetKey(data) {
  if (!data || data.type === 'center') return '';
  return data.id || '';
}

/**
 * @param {boolean} hasSelection
 * @param {string} prevKey
 * @param {string} nextKey
 * @returns {boolean}
 */
export function shouldUpdateInspectorOnHover(hasSelection, prevKey, nextKey) {
  if (hasSelection) return false;
  return prevKey !== nextKey;
}
