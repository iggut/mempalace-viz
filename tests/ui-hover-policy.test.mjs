import assert from 'node:assert/strict';
import test from 'node:test';
import { hoverTargetKey, shouldUpdateInspectorOnHover } from '../ui-hover-policy.js';

test('hoverTargetKey is stable for scene picks', () => {
  assert.equal(hoverTargetKey(null), '');
  assert.equal(hoverTargetKey({ type: 'center' }), '');
  assert.equal(hoverTargetKey({ type: 'room', id: 'room:a:b' }), 'room:a:b');
});

test('shouldUpdateInspectorOnHover skips when a selection owns the inspector', () => {
  assert.equal(shouldUpdateInspectorOnHover(true, 'a', 'b'), false);
});

test('shouldUpdateInspectorOnHover runs only when hover identity changes', () => {
  assert.equal(shouldUpdateInspectorOnHover(false, '', 'room:x'), true);
  assert.equal(shouldUpdateInspectorOnHover(false, 'room:x', 'room:x'), false);
  assert.equal(shouldUpdateInspectorOnHover(false, 'room:x', ''), true);
});
