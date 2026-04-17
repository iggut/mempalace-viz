import { getCanonicalNavLevel, peekNextBackAction } from './nav-focus.js';
import { devWarn, isDev } from './debug.js';

function warnInvariant(name, details) {
  devWarn('[nav-invariant]', name, details);
}

function boolFromDisabled(el) {
  return !!(el && el.disabled);
}

/**
 * Dev-only invariant: rendered nav-scope level should match canonical model.
 * @param {{
 *  view: 'wings'|'rooms'|'graph',
 *  currentWing: string|null,
 *  currentRoom: string|null,
 *  navScopeLevel: string|null,
 * }} input
 */
export function assertNavScopeLevelInvariant(input) {
  if (!isDev()) return;
  try {
    const canonical = getCanonicalNavLevel(input.view, input.currentWing, input.currentRoom);
    if (input.navScopeLevel !== canonical) {
      warnInvariant('nav_scope_level_mismatch', {
        canonical,
        rendered: input.navScopeLevel,
        view: input.view,
        currentWing: input.currentWing,
        currentRoom: input.currentRoom,
      });
    }
  } catch (err) {
    warnInvariant('nav_scope_level_check_failed', { error: err?.message || String(err) });
  }
}

/**
 * Dev-only invariant: header Back disabled/enabled should match canonical next-back action.
 * @param {{
 *  backBtn: HTMLButtonElement | null,
 *  view: 'wings'|'rooms'|'graph',
 *  currentWing: string|null,
 *  currentRoom: string|null,
 *  graphFocusHistoryLength: number,
 * }} input
 */
export function assertHeaderBackInvariant(input) {
  if (!isDev()) return;
  try {
    if (!input.backBtn) return;
    const nextBack = peekNextBackAction(
      input.view,
      input.currentWing,
      input.currentRoom,
      input.graphFocusHistoryLength,
    );
    const expectedDisabled = nextBack === 'none';
    const actualDisabled = boolFromDisabled(input.backBtn);
    if (expectedDisabled !== actualDisabled) {
      warnInvariant('header_back_state_mismatch', {
        nextBack,
        expectedDisabled,
        actualDisabled,
        view: input.view,
        currentWing: input.currentWing,
        currentRoom: input.currentRoom,
        graphFocusHistoryLength: input.graphFocusHistoryLength,
      });
    }
  } catch (err) {
    warnInvariant('header_back_check_failed', { error: err?.message || String(err) });
  }
}

/**
 * Dev-only invariant: graph strip Back reflects graph focus history availability.
 * @param {{
 *  graphBackBtn: HTMLButtonElement | null,
 *  graphFocusHistoryLength: number,
 *  view: 'wings'|'rooms'|'graph',
 * }} input
 */
export function assertGraphBackInvariant(input) {
  if (!isDev()) return;
  try {
    if (input.view !== 'graph' || !input.graphBackBtn) return;
    const expectedDisabled = input.graphFocusHistoryLength === 0;
    const actualDisabled = boolFromDisabled(input.graphBackBtn);
    if (expectedDisabled !== actualDisabled) {
      warnInvariant('graph_back_state_mismatch', {
        expectedDisabled,
        actualDisabled,
        graphFocusHistoryLength: input.graphFocusHistoryLength,
      });
    }
  } catch (err) {
    warnInvariant('graph_back_check_failed', { error: err?.message || String(err) });
  }
}
