import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOOM_PREF_LS_KEY,
  readBloomStored,
  writeBloomStored,
  effectiveBloomEnabled,
  defaultBloomEnabled,
} from '../viz-bloom.js';

function withMockLocalStorage(run) {
  const bag = /** @type {Record<string, string>} */ ({});
  const prev = globalThis.localStorage;
  globalThis.localStorage = {
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(bag, k) ? bag[k] : null;
    },
    setItem(k, v) {
      bag[k] = String(v);
    },
    removeItem(k) {
      delete bag[k];
    },
    clear() {
      for (const k of Object.keys(bag)) delete bag[k];
    },
  };
  try {
    return run(bag);
  } finally {
    globalThis.localStorage = prev;
  }
}

test('BLOOM_PREF_LS_KEY is stable', () => {
  assert.equal(BLOOM_PREF_LS_KEY, 'mempalace-viz-bloom-v1');
});

test('readBloomStored / writeBloomStored round-trip', () => {
  withMockLocalStorage(() => {
    assert.equal(readBloomStored(), null);
    writeBloomStored(true);
    assert.equal(readBloomStored(), true);
    writeBloomStored(false);
    assert.equal(readBloomStored(), false);
  });
});

test('effectiveBloomEnabled uses stored value when set', () => {
  withMockLocalStorage(() => {
    writeBloomStored(true);
    assert.equal(effectiveBloomEnabled(), true);
    writeBloomStored(false);
    assert.equal(effectiveBloomEnabled(), false);
  });
});

test('effectiveBloomEnabled falls back to default when unset', () => {
  withMockLocalStorage((bag) => {
    delete bag[BLOOM_PREF_LS_KEY];
    const d = defaultBloomEnabled();
    assert.equal(typeof d, 'boolean');
    assert.equal(effectiveBloomEnabled(), d);
  });
});
