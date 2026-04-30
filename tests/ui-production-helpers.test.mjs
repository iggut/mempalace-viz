import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanvasActionModel,
  describeNavigationMode,
  nextFocusPanelState,
  summarizeGraphDensity,
} from '../ui-production-helpers.js';

test('describeNavigationMode creates human-first location labels', () => {
  assert.deepEqual(describeNavigationMode({ view: 'wings' }), {
    eyebrow: 'Overview',
    title: 'All wings',
    hint: 'Start with domains, then drill into rooms or switch to the neural graph.',
  });
  assert.equal(describeNavigationMode({ view: 'rooms', currentWing: 'openclaw' }).title, 'Rooms in openclaw');
  assert.equal(
    describeNavigationMode({ view: 'graph', selected: { type: 'room', name: 'routing', wing: 'hermes' } }).title,
    'routing',
  );
});

test('buildCanvasActionModel exposes primary navigation without sidebar hunting', () => {
  const model = buildCanvasActionModel({
    view: 'graph',
    selected: { type: 'room' },
    panelsCollapsed: { left: false, right: true },
  });
  assert.deepEqual(model.viewIds, ['wings', 'rooms', 'graph']);
  assert.equal(model.primaryAction.id, 'show-inspector');
  assert.equal(model.focusAction.label, 'Focus canvas');
  assert.ok(model.shortcuts.some((s) => s.key === '⌘K'));
});

test('nextFocusPanelState toggles both panels predictably', () => {
  assert.deepEqual(nextFocusPanelState({ left: false, right: false }), { left: true, right: true });
  assert.deepEqual(nextFocusPanelState({ left: true, right: true }), { left: false, right: false });
  assert.deepEqual(nextFocusPanelState({ left: true, right: false }), { left: true, right: true });
});

test('summarizeGraphDensity gives compact production copy for crowded palaces', () => {
  const s = summarizeGraphDensity({ roomCount: 70, edgeCount: 420 });
  assert.equal(s.tone, 'dense');
  assert.match(s.label, /Dense graph/);
  assert.match(s.detail, /search/i);
});
