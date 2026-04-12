/**
 * Lightweight dev-only helpers. No-op in production builds when tree-shaken; safe at runtime.
 */
const IS_DEV =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) ||
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development');

/** @param {...unknown} args */
export function devLog(...args) {
  if (IS_DEV) console.log('[mempalace-viz]', ...args);
}

/** @param {...unknown} args */
export function devWarn(...args) {
  if (IS_DEV) console.warn('[mempalace-viz]', ...args);
}

export function isDev() {
  return !!IS_DEV;
}
