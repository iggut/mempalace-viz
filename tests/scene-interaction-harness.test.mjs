import test from 'node:test';
import assert from 'node:assert/strict';
import { chooseNonOverlappingLabels } from '../graph-scene-helpers.js';
import { createSceneInteractionHarness } from '../scene-interaction-harness.js';

function createCallbacksRecorder() {
  const clicks = [];
  const hovers = [];
  const backgroundClicks = [];
  return {
    onClick(payload) {
      clicks.push(payload);
    },
    onHover(payload, point) {
      hovers.push({ payload, point });
    },
    onBackgroundClick() {
      backgroundClicks.push(true);
    },
    state: { clicks, hovers, backgroundClicks },
  };
}

test('drag/orbit/pan releases never trigger selection', () => {
  const cb = createCallbacksRecorder();
  const h = createSceneInteractionHarness({
    onClick: cb.onClick,
    onHover: cb.onHover,
    onBackgroundClick: cb.onBackgroundClick,
    pickAtClient: () => ({ id: 'room:w:a', type: 'room' }),
    hoverAtClient: () => ({ id: 'room:w:a', type: 'room' }),
  });

  // Mouse drag should suppress select.
  h.pointerDown({ pointerId: 1, button: 0, clientX: 0, clientY: 0 });
  h.pointerMove({ pointerId: 1, clientX: 32, clientY: 0 });
  h.globalPointerEnd({ type: 'pointerup', pointerId: 1, button: 0, clientX: 32, clientY: 0 });
  assert.equal(cb.state.clicks.length, 0);

  // Trackpad-style tiny pointer movement plus camera drift should suppress select.
  h.pointerDown({ pointerId: 2, button: 0, clientX: 10, clientY: 10 });
  h.pointerMove({ pointerId: 2, clientX: 11, clientY: 11 });
  h.setCameraMovedSq(0.5);
  h.globalPointerEnd({ type: 'pointerup', pointerId: 2, button: 0, clientX: 11, clientY: 11 });
  assert.equal(cb.state.clicks.length, 0);

  // Touch-style jitter while controls actively interacting should suppress select.
  h.pointerDown({ pointerId: 3, button: 0, clientX: 15, clientY: 15 });
  h.controlsStart();
  h.pointerMove({ pointerId: 3, clientX: 17, clientY: 14 });
  h.globalPointerEnd({ type: 'pointerup', pointerId: 3, button: 0, clientX: 17, clientY: 14 });
  h.controlsEnd();
  assert.equal(cb.state.clicks.length, 0);
});

test('intentional clicks still trigger selection reliably', () => {
  const cb = createCallbacksRecorder();
  const h = createSceneInteractionHarness({
    onClick: cb.onClick,
    onHover: cb.onHover,
    onBackgroundClick: cb.onBackgroundClick,
    pickAtClient: () => ({ id: 'room:w:b', type: 'room' }),
    hoverAtClient: () => ({ id: 'room:w:b', type: 'room' }),
  });

  h.pointerDown({ pointerId: 21, button: 0, clientX: 30, clientY: 30 });
  h.pointerMove({ pointerId: 21, clientX: 33, clientY: 31 });
  h.globalPointerEnd({ type: 'pointerup', pointerId: 21, button: 0, clientX: 33, clientY: 31 });

  assert.equal(cb.state.clicks.length, 1);
  assert.deepEqual(cb.state.clicks[0], { id: 'room:w:b', type: 'room' });
  assert.equal(cb.state.backgroundClicks.length, 0);
});

test('hover is cleared when camera interaction begins', () => {
  const cb = createCallbacksRecorder();
  const h = createSceneInteractionHarness({
    onClick: cb.onClick,
    onHover: cb.onHover,
    onBackgroundClick: cb.onBackgroundClick,
    pickAtClient: () => null,
    hoverAtClient: () => ({ id: 'room:w:c', type: 'room' }),
  });

  h.pointerMove({ pointerId: 4, clientX: 100, clientY: 120 });
  assert.equal(h.getState().hoveredId, 'room:w:c');
  h.controlsStart();
  assert.equal(h.getState().hoveredId, null);
  assert.equal(cb.state.hovers.at(-1).payload, null);
});

test('selected/hovered/high-priority labels survive overlap culling', () => {
  const kept = chooseNonOverlappingLabels([
    { id: 'selected', x: 100, y: 100, w: 80, h: 18, priority: 1_000_000 },
    { id: 'hovered', x: 105, y: 102, w: 80, h: 18, priority: 800_000 },
    { id: 'high-priority', x: 110, y: 98, w: 80, h: 18, priority: 400_000 },
    { id: 'normal-a', x: 106, y: 100, w: 80, h: 18, priority: 50 },
    { id: 'normal-b', x: 112, y: 99, w: 80, h: 18, priority: 40 },
  ]);

  assert.ok(kept.has('selected'));
  assert.ok(!kept.has('normal-a'));
  assert.ok(!kept.has('normal-b'));
});
