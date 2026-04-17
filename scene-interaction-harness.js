import { classifyPointerRelease, pointerMoveThresholdPx } from './graph-scene-helpers.js';

/**
 * Lightweight deterministic harness for scene-like pointer interactions.
 * It mirrors the release gating semantics used by `scene.js` callbacks.
 */
export function createSceneInteractionHarness(options = {}) {
  const callbacks = {
    onHover: options.onHover || (() => {}),
    onClick: options.onClick || (() => {}),
    onBackgroundClick: options.onBackgroundClick || (() => {}),
  };
  const pickAtClient = options.pickAtClient || (() => null);
  const hoverAtClient = options.hoverAtClient || (() => null);

  const moveThresholdPx = options.moveThresholdPx;
  const cameraMoveEpsSq = options.cameraMoveEpsSq ?? 2.5e-5;

  const pointerGesture = {
    active: false,
    pointerId: -1,
    pointerType: 'mouse',
    startX: 0,
    startY: 0,
    maxMoveSq: 0,
  };

  let hovered = null;
  let hoveredId = null;
  let cameraInteractionActive = false;
  let cameraMovedSq = 0;

  function clearHover(clientX = 0, clientY = 0) {
    hovered = null;
    hoveredId = null;
    callbacks.onHover(null, { x: clientX, y: clientY });
  }

  function pointerDown(event) {
    if (!event || event.button !== 0) return;
    pointerGesture.active = true;
    pointerGesture.pointerId = event.pointerId;
    pointerGesture.pointerType = event.pointerType || 'mouse';
    pointerGesture.startX = event.clientX;
    pointerGesture.startY = event.clientY;
    pointerGesture.maxMoveSq = 0;
    clearHover(event.clientX, event.clientY);
  }

  function pointerMove(event) {
    if (!event) return;
    if (pointerGesture.active && event.pointerId === pointerGesture.pointerId) {
      const dx = event.clientX - pointerGesture.startX;
      const dy = event.clientY - pointerGesture.startY;
      const d2 = dx * dx + dy * dy;
      if (d2 > pointerGesture.maxMoveSq) pointerGesture.maxMoveSq = d2;
    }
    if (cameraInteractionActive) return;
    const next = hoverAtClient(event.clientX, event.clientY);
    if (next) {
      hovered = next;
      hoveredId = next.id || null;
      callbacks.onHover({ ...next }, { x: event.clientX, y: event.clientY });
      return;
    }
    clearHover(event.clientX, event.clientY);
  }

  function controlsStart() {
    cameraInteractionActive = true;
    if (pointerGesture.active) {
      const t = moveThresholdPx ?? pointerMoveThresholdPx(pointerGesture.pointerType);
      pointerGesture.maxMoveSq = Math.max(pointerGesture.maxMoveSq, t * t + 1);
    }
    clearHover();
  }

  function controlsEnd() {
    cameraInteractionActive = false;
  }

  function globalPointerEnd(event) {
    if (!pointerGesture.active || !event || event.pointerId !== pointerGesture.pointerId) return;
    pointerGesture.active = false;
    if (event.type === 'pointercancel' || event.button !== 0) return;

    const release = classifyPointerRelease({
      maxMoveSq: pointerGesture.maxMoveSq,
      cameraMovedSq,
      moveThresholdPx,
      pointerType: pointerGesture.pointerType,
      cameraMoveEpsSq,
      cameraInteractionActive,
    });
    cameraMovedSq = 0;
    if (!release.shouldSelect) return;

    const pick = pickAtClient(event.clientX, event.clientY);
    if (!pick) {
      callbacks.onBackgroundClick();
      callbacks.onClick(null);
      return;
    }
    callbacks.onClick({ ...pick });
  }

  function setCameraMovedSq(next) {
    cameraMovedSq = Math.max(0, Number(next) || 0);
  }

  function getState() {
    return {
      hovered: hovered ? { ...hovered } : null,
      hoveredId,
      cameraInteractionActive,
      pointerActive: pointerGesture.active,
      pointerId: pointerGesture.pointerId,
      maxMoveSq: pointerGesture.maxMoveSq,
    };
  }

  return {
    pointerDown,
    pointerMove,
    controlsStart,
    controlsEnd,
    globalPointerEnd,
    setCameraMovedSq,
    getState,
    clearHover,
  };
}
