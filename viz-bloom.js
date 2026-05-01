/**
 * Screen-space bloom preference for the Three.js scene.
 * Default: on for typical desktops; off when we infer a constrained device (saved choice overrides).
 */

export const BLOOM_PREF_LS_KEY = 'mempalace-viz-bloom-v1';

/** @returns {boolean} */
export function inferLowTierGpu() {
  if (typeof navigator === 'undefined') return false;
  const dm = navigator.deviceMemory;
  if (typeof dm === 'number' && dm <= 4) return true;
  const hc = navigator.hardwareConcurrency;
  if (typeof hc === 'number' && hc <= 4) return true;
  const ua = navigator.userAgent || '';
  if (/Android|iPhone|iPad|iPod/i.test(ua)) {
    if (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 900px)').matches) return true;
  }
  return false;
}

/** @returns {boolean|null} null = no explicit user choice */
export function readBloomStored() {
  try {
    const v = localStorage.getItem(BLOOM_PREF_LS_KEY);
    if (v === '1') return true;
    if (v === '0') return false;
  } catch {
    /* private mode / quota */
  }
  return null;
}

/** @param {boolean} enabled */
export function writeBloomStored(enabled) {
  try {
    localStorage.setItem(BLOOM_PREF_LS_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore */
  }
}

/** Default when nothing is stored: bloom on except on inferred low-tier devices. */
export function defaultBloomEnabled() {
  return !inferLowTierGpu();
}

/** Effective bloom for first paint (stored wins over default). */
export function effectiveBloomEnabled() {
  const s = readBloomStored();
  if (s !== null) return s;
  return defaultBloomEnabled();
}
