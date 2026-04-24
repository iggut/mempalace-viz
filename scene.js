/**
 * Three.js scene — wings / rooms / graph with focus, filter, and selection visuals.
 */
import { THREE, OrbitControls } from './three-runtime.js';
import { makeRoomId } from './canonical.js';
import { getEdgeRelationshipType, getStyleForRelationshipType } from './graph-relationships.js';
import {
  baseLabelScoreForGraphNode,
  buildGraphHighlightNodeIds,
  buildGraphRoomLabelCandidateSet,
  buildGraphRoomNeighborMap,
  computeDensityMetrics,
  chooseNonOverlappingLabels,
  classifyPointerRelease,
  computeGraphFocusCameraDistance,
  computeVisibleLabelIds,
  countGraphIncidentsByRoomNodeId,
  edgeEmphasisOpacityMult,
  graphEdgeHighlightMult,
  focusWingIdFromSceneSelection,
  framingTargetOffset,
  graphSceneNodeIdForLayoutNode,
  hash01,
  labelOpacityDistanceFactor,
  labelSpriteScaleMultiplier,
  maxRadiusFromFocus,
  neighborIdsForFocus,
  normalizeCameraDistanceForLabels,
  pointerMoveThresholdPx,
  runGraphForceLayout,
  seedWingClusteredLayout,
  separateGraphNodes,
  splitGraphFocusIds,
} from './graph-scene-helpers.js';
import { normalizeRouteStepIndex } from './graph-route.js';

/** @param {Array<{ type: string, wing?: string, name?: string }>} nodeList @param {object} edge @param {'from'|'to'} end */
function findRoomNodeForEdge(nodeList, edge, end) {
  const ref = end === 'from' ? edge.sourceRoomId || edge.from : edge.targetRoomId || edge.to;
  if (ref == null) return null;
  const s = String(ref);
  return nodeList.find((n) => {
    if (n.type !== 'room') return false;
    if (makeRoomId(n.wing, n.name) === s) return true;
    if (!s.includes('/') && n.name === s) return true;
    return `${n.wing}/${n.name}` === s;
  });
}

/**
 * Visual language: "cognitive landscape".
 * Colors lean warm-cool (thought vs. memory), layout is organic (shells with
 * vertical drift, not flat rings), edges are soft bezier arcs, and lighting
 * uses gentle emissive + multi-layer halo instead of hard specular.
 */
const CONFIG = {
  wingColors: {
    projects: '#8fa6ff',
    shared_grocery_list: '#7ce0b8',
    openclaw: '#a3b3c4',
    default: '#f4c878',
  },
  nodeSizes: {
    wingMin: 3.2,
    wingMax: 8.4,
    roomMin: 0.9,
    roomMax: 2.6,
  },
  spacing: {
    wingSeparation: 44,
    roomRadius: 16,
    verticalDrift: 6,
  },
  accent: {
    linkWing: 0x3a4256,
    linkGraph: 0x7aa3ff,
    center: 0x334155,
  },
  bg: {
    deep: 0x060912,
    fogDensity: 0.0022,
  },
};

export function nodeKeyFor(type, wing, name) {
  if (type === 'wing') return `wing:${wing || name}`;
  if (type === 'room') return `room:${wing}:${name}`;
  return `${type}:${wing}:${name}`;
}

function hashHue(name) {
  let h = 0;
  const s = String(name || '');
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function wingColorFor(name) {
  if (CONFIG.wingColors[name]) return CONFIG.wingColors[name];
  const hue = hashHue(name);
  return `hsl(${hue}, 52%, 68%)`;
}

function disposeMeshTree(mesh) {
  mesh.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
      else child.material.dispose();
    }
  });
}

  function disposeLine(line) {
    line.geometry?.dispose();
    line.material?.dispose();
  }

  function disposeLinkEntry(sceneRef, entry) {
    if (!entry) return;
    if (entry.line) {
      sceneRef.remove(entry.line);
      disposeLine(entry.line);
    }
    if (entry.glowLine) {
      sceneRef.remove(entry.glowLine);
      disposeLine(entry.glowLine);
    }
  }

export function createPalaceScene(container, options = {}) {
  let scene;
  let camera;
  let renderer;
  let controls;
  let stars;
  let animationId = 0;
  let cameraTween = null;

  let wingsData = {};
  let roomsData = {};
  let graphEdges = [];

  let nodes = [];
  let linkObjects = [];
  let labelSprites = [];
  /** @type {Map<string, number>} room scene node id → incident graph edge count (full graph) */
  let graphRoomIncidentFull = new Map();
  /** @type {Array<{ id: string, baseScore: number }>} */
  let graphLabelEntries = [];
  /** @type {ReturnType<typeof computeDensityMetrics> | null} */
  let graphSceneMetrics = null;
  /** @type {{ position: THREE.Vector3, target: THREE.Vector3 } | null} */
  let graphDefaultCamera = null;
  /** @type {Map<string, Set<string>>} */
  let graphNeighborMap = new Map();
  /** @type {Set<string>} room/wing ids kept bright when focusing in graph view */
  let graphHighlightIds = new Set();
  /** @type {number} graph bbox extent for camera / label normalization */
  let graphSpatialExtent = 80;
  /** @type {string|null} */
  let lastFocusNodeId = null;
  let focusRepeatIndex = 0;
  /** @type {string[]} interaction-only labels (FIFO evict) */
  let dynamicLabelQueue = [];
  /** @type {Set<string>} prior frame overlap pass — mild hysteresis vs. greedy churn */
  let labelOverlapLastKept = new Set();
  /** @type {{ id: string, at: number } | null} brief emissive pulse on successful pick */
  let selectionPulse = null;
  let selectionPulseTimer = 0;

  let currentView = 'wings';
  let roomsFocusWing = null;
  let motionIntensity = 1;
  let labelsVisible = true;
  // Auto-rotate is OFF by default — calmer first impression, and the ambient
  // breath/pulse motion keeps the scene from feeling static.
  let autoRotateUser = false;

  /** @type {Array<{ sprite: THREE.Sprite, from: THREE.Vector3, to: THREE.Vector3, mid: THREE.Vector3, offset: number, color: THREE.Color }>} */
  let routePulses = [];
  /** @type {THREE.Mesh|null} additive-blended ring halo around the selected node */
  let selectionRing = null;
  let hoveredMesh = null;
  /** @type {{ active: boolean, pathSceneIds: string[], stepIndex: number, segmentTypes: string[], bridgeSceneIds: string[] }} */
  const defaultRoutePresentation = () => ({
    active: false,
    pathSceneIds: [],
    stepIndex: 0,
    segmentTypes: [],
    bridgeSceneIds: [],
  });

  let presentation = {
    searchQuery: '',
    hoveredId: null,
    selectedId: null,
    pinActive: false,
    /** @type {Set<string>|null} when null, all relationship types are shown */
    relationshipTypesVisible: null,
    route: defaultRoutePresentation(),
    /** Derived mining emphasis on room nodes — never draws extra graph edges */
    miningOverlay: { mode: 'off', weights: {} },
  };
  let prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const nodeRegistry = new Map();
  const labelByNodeId = new Map();

  const callbacks = {
    onHover: options.onHover || (() => {}),
    onClick: options.onClick || (() => {}),
    onBackgroundClick: options.onBackgroundClick || (() => {}),
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pendingPointerEvent = null;
  let pointerRafId = 0;
  let resizeRafId = 0;
  let resizeObserver = null;
  let lastResizeW = 0;
  let lastResizeH = 0;

  /** World-space squared; ignores float noise but catches real orbit/pan camera motion during the gesture. */
  const CAMERA_MOVE_EPS_SQ = 2.5e-5;

  const pointerGesture = {
    active: false,
    pointerId: -1,
    /** @type {string} */
    pointerType: 'mouse',
    startX: 0,
    startY: 0,
    maxMoveSq: 0,
    camPosStart: new THREE.Vector3(),
    targetStart: new THREE.Vector3(),
  };
  let cameraInteractionActive = false;
  let controlsStartHandler = null;
  let controlsEndHandler = null;
  let globalPointerEndAttached = false;

  function clearHoverState(clientX = 0, clientY = 0) {
    hoveredMesh = null;
    presentation.hoveredId = null;
    renderer.domElement.style.cursor = 'default';
    syncVisualPresentation();
    callbacks.onHover(null, { x: clientX, y: clientY });
  }

  function attachGlobalPointerEnd() {
    if (globalPointerEndAttached) return;
    document.addEventListener('pointerup', onGlobalPointerEnd, true);
    document.addEventListener('pointercancel', onGlobalPointerEnd, true);
    globalPointerEndAttached = true;
  }

  function detachGlobalPointerEnd() {
    if (!globalPointerEndAttached) return;
    document.removeEventListener('pointerup', onGlobalPointerEnd, true);
    document.removeEventListener('pointercancel', onGlobalPointerEnd, true);
    globalPointerEndAttached = false;
  }

  /**
   * @param {number} clientX
   * @param {number} clientY
   * @returns {import('three').Object3D | null} mesh with scene node userData, or null
   */
  function findHoveredNodeMeshAtClient(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const meshes = nodes.map((n) => n.mesh).filter(Boolean);
    const intersects = raycaster.intersectObjects(meshes, true);
    for (let i = 0; i < intersects.length; i += 1) {
      let obj = intersects[i].object;
      while (obj && !obj.userData?.type) obj = obj.parent;
      if (obj && obj.userData?.type && obj.userData.type !== 'center') return obj;
    }
    return null;
  }

  function tweenCamera(targetPos, lookAt, duration = 850) {
    const startPos = camera.position.clone();
    const startLook = controls.target.clone();
    const start = performance.now();
    if (cameraTween) cancelAnimationFrame(cameraTween);
    function step() {
      const t = Math.min((performance.now() - start) / duration, 1);
      const k = 1 - (1 - t) ** 3;
      camera.position.lerpVectors(startPos, targetPos, k);
      controls.target.lerpVectors(startLook, lookAt, k);
      controls.update();
      if (t < 1) cameraTween = requestAnimationFrame(step);
      else cameraTween = null;
    }
    cameraTween = requestAnimationFrame(step);
  }

  function clearSceneContent() {
    nodes.forEach(({ mesh }) => {
      scene.remove(mesh);
      disposeMeshTree(mesh);
    });
    linkObjects.forEach((entry) => disposeLinkEntry(scene, entry));
    routePulses.forEach((p) => {
      scene.remove(p.sprite);
      p.sprite.material.map?.dispose();
      p.sprite.material.dispose();
    });
    routePulses = [];
    if (selectionRing) {
      scene.remove(selectionRing);
      selectionRing.material?.dispose();
      selectionRing.geometry?.dispose();
      selectionRing = null;
    }
    labelSprites.forEach(({ sprite }) => {
      scene.remove(sprite);
      sprite.material.map?.dispose();
      sprite.material.dispose();
    });
    nodes = [];
    linkObjects = [];
    labelSprites = [];
    graphRoomIncidentFull = new Map();
    graphLabelEntries = [];
    graphSceneMetrics = null;
    graphDefaultCamera = null;
    graphNeighborMap = new Map();
    graphSpatialExtent = 80;
    lastFocusNodeId = null;
    focusRepeatIndex = 0;
    dynamicLabelQueue = [];
    selectionPulse = null;
    if (selectionPulseTimer) clearTimeout(selectionPulseTimer);
    selectionPulseTimer = 0;
    if (scene?.fog?.isFogExp2) scene.fog.density = CONFIG.bg.fogDensity;
    if (stars?.userData?.innerMat) stars.userData.innerMat.opacity = 0.38;
    if (stars?.userData?.outerMat) stars.userData.outerMat.opacity = 0.22;
    nodeRegistry.clear();
    labelByNodeId.clear();
    labelOverlapLastKept = new Set();
  }

  /**
   * Two-layer nebula: sparse inner "thought motes" close to the viewer and
   * a larger outer drift. This reads as cognitive atmosphere rather than a
   * literal starfield — fewer sharp specks, more depth.
   */
  function createStars() {
    const group = new THREE.Group();

    const inner = new THREE.BufferGeometry();
    const innerPts = [];
    for (let i = 0; i < 620; i += 1) {
      const r = 30 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      innerPts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.55,
        r * Math.sin(phi) * Math.sin(theta),
      );
    }
    inner.setAttribute('position', new THREE.Float32BufferAttribute(innerPts, 3));
    const innerMat = new THREE.PointsMaterial({
      color: 0xa8b5ff,
      size: 0.32,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const innerPoints = new THREE.Points(inner, innerMat);
    group.add(innerPoints);

    const outer = new THREE.BufferGeometry();
    const outerPts = [];
    for (let i = 0; i < 1200; i += 1) {
      outerPts.push(
        THREE.MathUtils.randFloatSpread(480),
        THREE.MathUtils.randFloatSpread(260),
        THREE.MathUtils.randFloatSpread(480),
      );
    }
    outer.setAttribute('position', new THREE.Float32BufferAttribute(outerPts, 3));
    const outerMat = new THREE.PointsMaterial({
      color: 0x6f7aa0,
      size: 0.55,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const outerPoints = new THREE.Points(outer, outerMat);
    group.add(outerPoints);

    scene.add(group);
    stars = group;
    stars.userData = { innerMat, outerMat };
  }

  /** World height of label sprites; must match `targetWorldHeight` in makeLabelSprite. */
  const LABEL_SPRITE_WORLD_HEIGHT = 1.46;
  /** Gap between sphere top and label bottom (sprite center is half height above that). */
  const LABEL_CLEARANCE_ABOVE_SPHERE = 0.16;

  function labelYAboveSphere(centerY, sphereRadius) {
    return centerY + sphereRadius + LABEL_CLEARANCE_ABOVE_SPHERE;
  }

  // Label sprites: rendered to an offscreen canvas at devicePixelRatio for crispness,
  // then scaled into world space while preserving the canvas's pixel aspect ratio.
  // FRAGILE: sprite world-scale MUST mirror canvas (cssW : cssH) or labels appear as
  // stretched blue blocks. See README/QA notes on label rendering.
  function makeLabelSprite(text, color = '#e8eaef') {
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const fontSize = 12;
    const padX = 7;
    const padY = 3;
    const fontDecl = `400 ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

    const measure = document.createElement('canvas').getContext('2d');
    measure.font = fontDecl;
    const textW = Math.ceil(measure.measureText(text).width);

    const cssW = textW + padX * 2;
    const cssH = fontSize + padY * 2;

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(cssW * dpr));
    canvas.height = Math.max(1, Math.round(cssH * dpr));

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const r = Math.min(5, cssH / 2);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(cssW - r, 0);
    ctx.quadraticCurveTo(cssW, 0, cssW, r);
    ctx.lineTo(cssW, cssH - r);
    ctx.quadraticCurveTo(cssW, cssH, cssW - r, cssH);
    ctx.lineTo(r, cssH);
    ctx.quadraticCurveTo(0, cssH, 0, cssH - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fillStyle = 'rgba(7, 10, 16, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(158, 174, 206, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = fontDecl;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(2, 3, 6, 0.5)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = color;
    ctx.fillText(text, padX, cssH / 2 + 0.5);
    ctx.shadowBlur = 0;

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.anisotropy = 4;
    tex.needsUpdate = true;

    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true });
    const sprite = new THREE.Sprite(mat);

    // World-space sprite size: pick a target world-height per label, then derive
    // width from the actual canvas aspect ratio so text is never stretched.
    const aspect = cssW / cssH;
    const sx = LABEL_SPRITE_WORLD_HEIGHT * aspect;
    const sy = LABEL_SPRITE_WORLD_HEIGHT;
    sprite.scale.set(sx, sy, 1);
    sprite.center.set(0.5, 0);
    sprite.userData.labelBaseScale = { x: sx, y: sy, z: 1 };
    sprite.userData.labelPixelSize = { w: cssW, h: cssH };
    sprite.renderOrder = 10;
    return sprite;
  }

  function registerNode(id, mesh, data) {
    const mainMat = mesh.material;
    nodeRegistry.set(id, {
      mesh,
      data,
      id,
      baseOpacity: mainMat.opacity,
      baseEmissive: mainMat.emissiveIntensity,
      baseScale: 1,
      presentationOpacity: 1,
    });
    mesh.userData.nodeId = id;
  }

  /**
   * @param {number} [sphereRadius] — mesh sphere radius; label sits above the surface. Omit only for legacy paths.
   */
  function addLabelForNode(nodeId, text, x, y, z, color, sphereRadius) {
    const sprite = makeLabelSprite(text, color);
    sprite.visible = labelsVisible;
    const lift =
      sphereRadius != null
        ? labelYAboveSphere(y, sphereRadius)
        : labelYAboveSphere(y, CONFIG.nodeSizes.roomMin + 0.2);
    sprite.position.set(x, lift, z);
    scene.add(sprite);
    labelSprites.push({ sprite, nodeId });
    labelByNodeId.set(nodeId, sprite);
  }

  const MAX_DYNAMIC_GRAPH_LABELS = 40;

  function removeLabelByNodeId(nodeId) {
    const idx = labelSprites.findIndex((x) => x.nodeId === nodeId);
    if (idx === -1) return;
    const { sprite } = labelSprites[idx];
    scene.remove(sprite);
    sprite.material.map?.dispose();
    sprite.material.dispose();
    labelSprites.splice(idx, 1);
    labelByNodeId.delete(nodeId);
    const qi = dynamicLabelQueue.indexOf(nodeId);
    if (qi >= 0) dynamicLabelQueue.splice(qi, 1);
  }

  function evictOneDisposableDynamicLabel() {
    for (let i = 0; i < dynamicLabelQueue.length; i += 1) {
      const id = dynamicLabelQueue[i];
      const prot =
        id === presentation.selectedId ||
        id === presentation.hoveredId ||
        (presentation.selectedId && neighborIdsForFocus(presentation.selectedId, graphNeighborMap).has(id)) ||
        (!presentation.selectedId &&
          presentation.hoveredId &&
          neighborIdsForFocus(presentation.hoveredId, graphNeighborMap).has(id));
      if (prot) continue;
      dynamicLabelQueue.splice(i, 1);
      removeLabelByNodeId(id);
      return true;
    }
    return false;
  }

  function ensureDynamicRoomLabel(nodeId) {
    if (labelByNodeId.has(nodeId)) return;
    const entry = nodeRegistry.get(nodeId);
    if (!entry?.data || entry.data.type !== 'room') return;
    while (dynamicLabelQueue.length >= MAX_DYNAMIC_GRAPH_LABELS) {
      if (!evictOneDisposableDynamicLabel()) break;
    }
    if (dynamicLabelQueue.length >= MAX_DYNAMIC_GRAPH_LABELS) return;
    const { mesh, data } = entry;
    const p = mesh.position;
    const r = entry.mesh.geometry?.parameters?.radius ?? CONFIG.nodeSizes.roomMin + 0.2;
    addLabelForNode(nodeId, data.name, p.x, p.y, p.z, '#94a3b8', r);
    dynamicLabelQueue.push(nodeId);
  }

  function applyGraphLabels() {
    if (currentView !== 'graph' || !graphLabelEntries.length || !camera) return;
    const camDist = camera.position.distanceTo(controls.target);
    const distNorm = normalizeCameraDistanceForLabels(camDist, graphSpatialExtent);
    const tier = graphSceneMetrics?.tier ?? 0;
    const budget = graphSceneMetrics?.labelBudget ?? 180;
    const sid = presentation.selectedId;
    const hid = presentation.hoveredId;
    const { primaryId } = splitGraphFocusIds(sid, hid);
    const neighborIds = primaryId ? neighborIdsForFocus(primaryId, graphNeighborMap) : new Set();
    const labelNeighborIds = graphHighlightIds.size > 0 ? graphHighlightIds : neighborIds;
    const focusWingId = focusWingIdFromSceneSelection(sid || hid);
    const showIds = computeVisibleLabelIds(graphLabelEntries, {
      selectedId: sid,
      hoveredId: hid,
      pinActive: presentation.pinActive,
      budget,
      neighborIds: labelNeighborIds,
      focusWingId,
      cameraDistanceNorm: distNorm,
      densityTier: tier,
    });
    const q = (presentation.searchQuery || '').trim().toLowerCase();
    for (const id of showIds) {
      if (id.startsWith('room:') && !labelByNodeId.has(id)) {
        ensureDynamicRoomLabel(id);
      }
    }
    /** @type {Array<{ id: string, x: number, y: number, w: number, h: number, priority: number }>} */
    const overlapCandidates = [];
    labelByNodeId.forEach((sprite, id) => {
      const data = nodeRegistry.get(id)?.data;
      if (!data) return;
      const match = nodeMatchesSearch(data, q);
      const allow = showIds.has(id);
      const role = {
        selected: id === sid,
        hovered: id === hid,
        pinned: !!(presentation.pinActive && id === sid),
        neighbor: neighborIds.has(id) || graphHighlightIds.has(id),
      };
      const scaleM = labelSpriteScaleMultiplier(distNorm, role);
      const bs = sprite.userData.labelBaseScale;
      if (bs) {
        sprite.scale.set(bs.x * scaleM, bs.y * scaleM, bs.z);
      }
      const opBase = match ? labelOpacityDistanceFactor(distNorm, role) : 0.12;
      sprite.material.opacity = opBase;
      sprite.visible = labelsVisible && allow;
      if (!sprite.visible) return;
      const px = sprite.userData.labelPixelSize;
      if (!px || !renderer || !camera) return;
      const p = sprite.position.clone().project(camera);
      if (p.z < -1 || p.z > 1) return;
      const x = ((p.x + 1) * 0.5) * renderer.domElement.clientWidth;
      const y = ((1 - p.y) * 0.5) * renderer.domElement.clientHeight;
      const w = (px.w || 42) * scaleM;
      const h = (px.h || 16) * scaleM;
      // Bucket opacity for overlap priority so slow orbit does not reorder borderline labels every frame.
      const opBucket = Math.round(opBase * 20) / 20;
      const priority = role.pinned
        ? 2_000_000
        : role.selected
          ? 1_000_000
          : role.hovered
            ? 800_000
            : role.neighbor
              ? 40_000
              : Math.floor(opBucket * 1000) + hash01(id) * 0.001;
      overlapCandidates.push({ id, x, y, w, h, priority });
    });
    const kept = chooseNonOverlappingLabels(overlapCandidates, 6, {
      quantizePx: 4,
      lastKept: labelOverlapLastKept,
    });
    labelOverlapLastKept = new Set(kept);
    labelByNodeId.forEach((sprite, id) => {
      if (sprite.visible && !kept.has(id)) sprite.visible = false;
    });
  }

  /**
   * Edges are soft bezier arcs, not straight lines. This reads as neural
   * connection rather than wire-diagram; arc height scales with distance
   * so long cross-wing edges bend visibly while short in-cluster links stay
   * close to straight.
   */
  function createLink(from, to, colorHex, opacity = 0.28, meta = {}) {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dist = a.distanceTo(b);
    const arc = Math.min(8, Math.max(0.6, dist * 0.18));
    mid.y += arc;
    const offset = Math.min(4, dist * 0.05);
    mid.x += offset * (Math.sign(b.z - a.z) || 1) * 0.2;

    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const segments = dist > 40 ? 24 : dist > 16 ? 16 : 10;
    const pts = curve.getPoints(segments);
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);

    const isGraphRel = !!meta.isGraphRelationship;
    // Graph relationship lines use additive blending so they read as luminous
    // threads in the dark scene. Structural wing tethers stay on normal blend
    // so they don't wash out behind rooms.
    const material = new THREE.LineBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: true,
      blending: isGraphRel ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const line = new THREE.Line(geometry, material);
    line.userData = { ...meta };
    scene.add(line);

    let glowLine = null;
    if (isGraphRel) {
      // Paired "glow" pass on the same curve — whitish tinted, additive,
      // and kept near-invisible at rest. syncVisualPresentation raises its
      // opacity for neighborhood / selection / route edges; animate() pulses
      // it softly so connected relationships feel alive.
      const glowGeom = new THREE.BufferGeometry().setFromPoints(pts);
      const tint = new THREE.Color(colorHex).lerp(new THREE.Color(0xffffff), 0.38);
      const glowMat = new THREE.LineBasicMaterial({
        color: tint,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });
      glowLine = new THREE.Line(glowGeom, glowMat);
      glowLine.renderOrder = 2;
      glowLine.userData = { isGlow: true, baseColorHex: colorHex };
      scene.add(glowLine);
    }

    const entry = { line, glowLine, curvePts: pts, ...meta };
    linkObjects.push(entry);
    return entry;
  }

  function createWingNode(wingName, x, y, z, size) {
    const colorStr = wingColorFor(wingName);
    const color = new THREE.Color(colorStr);
    const id = `wing:${wingName}`;

    const geometry = new THREE.SphereGeometry(size, 28, 28);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.22,
      metalness: 0.15,
      roughness: 0.45,
      transparent: true,
      opacity: 0.92,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.userData = {
      id,
      name: wingName,
      wingId: wingName,
      type: 'wing',
      drawers: wingsData[wingName],
      label: wingName,
      _baseY: y,
    };

    const glowInner = new THREE.Mesh(
      new THREE.SphereGeometry(size * 1.22, 24, 24),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    const glowOuter = new THREE.Mesh(
      new THREE.SphereGeometry(size * 1.7, 20, 20),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.045,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    mesh.add(glowInner);
    mesh.add(glowOuter);

    scene.add(mesh);
    nodes.push({ mesh, data: mesh.userData });
    registerNode(id, mesh, mesh.userData);
    return mesh;
  }

  function createRoomNode(roomName, wing, x, y, z, size) {
    const colorStr = wingColorFor(wing);
    const c = new THREE.Color(colorStr);
    c.offsetHSL(0, -0.05, -0.06);
    const id = `room:${wing}:${roomName}`;

    const geometry = new THREE.SphereGeometry(size, 20, 20);
    const material = new THREE.MeshStandardMaterial({
      color: c,
      emissive: c,
      emissiveIntensity: 0.18,
      metalness: 0.12,
      roughness: 0.5,
      transparent: true,
      opacity: 0.88,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    const row = (roomsData[wing] || []).find((r) => r.name === roomName);
    const roomId = row?.roomId || makeRoomId(wing, roomName);
    mesh.userData = {
      id,
      name: roomName,
      type: 'room',
      wing,
      wingId: wing,
      roomId,
      drawers: row?.drawers,
      label: roomName,
      _baseY: y,
    };

    scene.add(mesh);
    nodes.push({ mesh, data: mesh.userData });
    registerNode(id, mesh, mesh.userData);
    return mesh;
  }

  function nodeMatchesSearch(data, q) {
    if (!q) return true;
    const parts = [data.name, data.label, data.wing, data.type]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return parts.includes(q) || q.split(/\s+/).every((t) => t.length < 2 || parts.includes(t));
  }

  function relationshipSetKey(s) {
    if (s == null) return '';
    return [...s].sort().join('\0');
  }

  function routePresentationEqual(ra, rb) {
    const a = ra || defaultRoutePresentation();
    const b = rb || defaultRoutePresentation();
    if (!!a.active !== !!b.active) return false;
    if (!a.active) return true;
    if (a.stepIndex !== b.stepIndex) return false;
    const pa = (a.pathSceneIds || []).join('\0');
    const pb = (b.pathSceneIds || []).join('\0');
    if (pa !== pb) return false;
    const sa = (a.segmentTypes || []).join('\0');
    const sb = (b.segmentTypes || []).join('\0');
    if (sa !== sb) return false;
    const ba = (a.bridgeSceneIds || []).join('\0');
    const bb = (b.bridgeSceneIds || []).join('\0');
    return ba === bb;
  }

  function undirectedPairKey(a, b) {
    if (!a || !b) return '';
    return a < b ? `${a}\0${b}` : `${b}\0${a}`;
  }

  function miningOverlayEqual(ma, mb) {
    const a = ma && typeof ma === 'object' ? ma : { mode: 'off', weights: {} };
    const b = mb && typeof mb === 'object' ? mb : { mode: 'off', weights: {} };
    if (a.mode !== b.mode) return false;
    const wa = a.weights && typeof a.weights === 'object' ? a.weights : {};
    const wb = b.weights && typeof b.weights === 'object' ? b.weights : {};
    const ka = Object.keys(wa).sort();
    const kb = Object.keys(wb).sort();
    if (ka.length !== kb.length) return false;
    for (let i = 0; i < ka.length; i += 1) {
      if (ka[i] !== kb[i]) return false;
      if (wa[ka[i]] !== wb[kb[i]]) return false;
    }
    return true;
  }

  function presentationEqual(a, b) {
    return (
      a.searchQuery === b.searchQuery &&
      a.hoveredId === b.hoveredId &&
      a.selectedId === b.selectedId &&
      a.pinActive === b.pinActive &&
      relationshipSetKey(a.relationshipTypesVisible) === relationshipSetKey(b.relationshipTypesVisible) &&
      routePresentationEqual(a.route, b.route) &&
      miningOverlayEqual(a.miningOverlay, b.miningOverlay)
    );
  }

  function makePulseTexture() {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(200,220,255,0.65)');
    g.addColorStop(1, 'rgba(120,160,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  function rebuildRoutePulses() {
    // Clear previous pulses
    routePulses.forEach((p) => {
      scene.remove(p.sprite);
      p.sprite.material.map?.dispose();
      p.sprite.material.dispose();
    });
    routePulses = [];

    const route = presentation.route || defaultRoutePresentation();
    if (currentView !== 'graph' || !route.active || !Array.isArray(route.pathSceneIds)) return;
    if (route.pathSceneIds.length < 2) return;

    for (let i = 0; i < route.pathSceneIds.length - 1; i += 1) {
      const a = nodeRegistry.get(route.pathSceneIds[i]);
      const b = nodeRegistry.get(route.pathSceneIds[i + 1]);
      if (!a || !b) continue;
      const from = a.mesh.position.clone();
      const to = b.mesh.position.clone();
      const mid = from.clone().add(to).multiplyScalar(0.5);
      const dist = from.distanceTo(to);
      const arc = Math.min(8, Math.max(0.6, dist * 0.18));
      mid.y += arc;
      const offset = Math.min(4, dist * 0.05);
      mid.x += offset * (Math.sign(to.z - from.z) || 1) * 0.2;

      const tex = makePulseTexture();
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xbfd4ff,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(Math.max(0.9, Math.min(1.6, dist * 0.045)));
      sprite.renderOrder = 8;
      scene.add(sprite);
      routePulses.push({
        sprite,
        from,
        to,
        mid,
        offset: (i * 0.35) % 1,
        color: mat.color,
      });
    }
  }

  function rebuildSelectionRing() {
    if (selectionRing) {
      scene.remove(selectionRing);
      selectionRing.material?.dispose();
      selectionRing.geometry?.dispose();
      selectionRing = null;
    }
    const sid = presentation.selectedId;
    if (!sid) return;
    const entry = nodeRegistry.get(sid);
    if (!entry) return;
    const r = entry.mesh.geometry?.parameters?.radius ?? 1.2;
    const ringGeom = new THREE.RingGeometry(r * 1.42, r * 1.55, 48);
    const color = entry.mesh.material?.color
      ? entry.mesh.material.color.clone().lerp(new THREE.Color(0xffffff), 0.35)
      : new THREE.Color(0xbfd4ff);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.userData.baseScale = 1;
    // Make ring face the camera by updating in animate? For simplicity, use a
    // billboard-ish behavior via sprite-like update: attach as child so it
    // inherits node position, and orient toward camera each frame would be
    // ideal. Here we keep it flat and let the slight breath sell it.
    ring.position.copy(entry.mesh.position);
    ring.lookAt(0, 0, 0);
    scene.add(ring);
    selectionRing = ring;
  }

  function syncVisualPresentation() {
    const q = (presentation.searchQuery || '').trim().toLowerCase();
    const hid = presentation.hoveredId;
    const sid = presentation.selectedId;
    const pin = presentation.pinActive;
    const relVis = presentation.relationshipTypesVisible;
    const gTier = graphSceneMetrics?.tier ?? 0;

    const route = presentation.route || defaultRoutePresentation();
    const routeActive =
      currentView === 'graph' && route.active && Array.isArray(route.pathSceneIds) && route.pathSceneIds.length > 0;
    /** @type {Set<string>} */
    const routePairKeys = new Set();
    /** @type {Map<string, number>} pair key -> segment index for route.segmentTypes */
    const routePairToSegIx = new Map();
    if (routeActive) {
      const ids = route.pathSceneIds;
      for (let i = 0; i < ids.length - 1; i += 1) {
        routePairKeys.add(undirectedPairKey(ids[i], ids[i + 1]));
        routePairToSegIx.set(undirectedPairKey(ids[i], ids[i + 1]), i);
      }
    }
    const bridgeSceneSet = new Set(route.bridgeSceneIds || []);
    const stepSceneId =
      routeActive && route.pathSceneIds.length > 0
        ? route.pathSceneIds[normalizeRouteStepIndex(route.stepIndex, route.pathSceneIds.length)]
        : null;

    /** @type {Map<string, number>} */
    const visibleGraphIncidents = new Map();

    const gMult = graphSceneMetrics?.globalEdgeOpacityMult ?? 1;
    const adjMult = graphSceneMetrics?.adjacencyOpacityMult ?? 1;
    const tunnelEm = graphSceneMetrics?.tunnelEmphasisMult ?? 1;

    // Pre-compute the primary focus neighborhood once; used both for edge
    // glow layering and the downstream node emphasis pass below.
    const primaryFocusInfo = splitGraphFocusIds(sid, hid);
    graphHighlightIds = new Set();
    if (currentView === 'graph' && primaryFocusInfo.primaryId) {
      graphHighlightIds = buildGraphHighlightNodeIds(
        primaryFocusInfo.primaryId,
        graphNeighborMap,
        roomsData,
      );
    }
    const neighborFocusSet =
      primaryFocusInfo.primaryId && currentView === 'graph'
        ? neighborIdsForFocus(primaryFocusInfo.primaryId, graphNeighborMap)
        : null;
    const nbrFocusRef = { forEdges: neighborFocusSet };
    const nhActive =
      currentView === 'graph' &&
      graphHighlightIds.size > 0 &&
      !routeActive &&
      !!primaryFocusInfo.primaryId;

    linkObjects.forEach((lo) => {
      const {
        line,
        glowLine,
        fromId,
        toId,
        baseOpacity = 0.28,
        isGraphRelationship,
        relationshipType,
        styleColorHex,
      } = lo;
      const mf = fromId ? nodeMatchesSearch(nodeRegistry.get(fromId)?.data || {}, q) : true;
      const mt = toId ? nodeMatchesSearch(nodeRegistry.get(toId)?.data || {}, q) : true;
      const searchOk = !q || (mf && mt);

      let typeOk = true;
      if (isGraphRelationship && relVis != null) {
        const rt = relationshipType || 'tunnel';
        typeOk = relVis.has(rt);
      }

      if (glowLine) {
        glowLine.visible = false;
        glowLine.material.opacity = 0;
        glowLine.userData.glowAnimBase = 0;
      }

      if (!searchOk) {
        line.visible = true;
        line.material.opacity = baseOpacity * 0.12;
        if (isGraphRelationship) line.userData.opacityAnimBase = baseOpacity * 0.12;
        return;
      }
      if (isGraphRelationship && !typeOk) {
        line.visible = false;
        line.userData.opacityAnimBase = null;
        return;
      }
      line.visible = true;
      let op = baseOpacity;
      if (isGraphRelationship) {
        const rt = relationshipType || 'tunnel';
        if (rt === 'taxonomy_adjacency') op *= adjMult;
        if (rt === 'tunnel') op *= tunnelEm;
        op *= gMult;
        op *= edgeEmphasisOpacityMult({
          selectedId: sid,
          hoveredId: hid,
          fromId,
          toId,
          relationshipType: rt,
          densityTier: gTier,
          isGraphRelationship: true,
        });
        if (graphHighlightIds.size > 0 && !routeActive) {
          op *= graphEdgeHighlightMult(fromId, toId, graphHighlightIds, gTier);
        }
      }
      if (isGraphRelationship && line.geometry?.attributes?.position) {
        const pos = line.geometry.attributes.position;
        const midIx = Math.floor(pos.count / 2);
        const mid = new THREE.Vector3(pos.getX(midIx), pos.getY(midIx), pos.getZ(midIx));
        const edgeDist = camera.position.distanceTo(mid);
        const targetDist = camera.position.distanceTo(controls.target);
        const near = targetDist * 0.45;
        const far = targetDist * 1.85;
        const tDepth = THREE.MathUtils.clamp((edgeDist - near) / Math.max(1, far - near), 0, 1);
        const depthFade = 1 - tDepth * (gTier >= 2 ? 0.45 : 0.3);
        op *= depthFade;
      }
      if (routeActive && isGraphRelationship && fromId && toId) {
        const pk = undirectedPairKey(fromId, toId);
        const onRoute = routePairKeys.has(pk);
        const segIx = routePairToSegIx.get(pk);
        const segType =
          segIx != null && Array.isArray(route.segmentTypes) && route.segmentTypes[segIx]
            ? route.segmentTypes[segIx]
            : relationshipType || 'tunnel';
        const hex = styleColorHex ?? getStyleForRelationshipType(segType).color;
        const baseC = new THREE.Color(hex);
        if (onRoute) {
          op = Math.min(1, op * 1.44);
          baseC.lerp(new THREE.Color(0xffffff), 0.11);
          if (segType === 'tunnel') {
            baseC.lerp(new THREE.Color(0x5b8cff), 0.06);
            op = Math.min(1, op * 1.03);
          } else if (segType === 'taxonomy_adjacency') {
            baseC.lerp(new THREE.Color(0x3dc9b8), 0.05);
          }
        } else {
          op *= 0.24;
          baseC.multiplyScalar(0.72);
        }
        line.material.color.copy(baseC);
      } else if (isGraphRelationship && styleColorHex != null) {
        line.material.color.setHex(styleColorHex);
      }
      line.material.opacity = op;
      if (isGraphRelationship) {
        line.userData.opacityAnimBase = op;
        if (fromId) visibleGraphIncidents.set(fromId, (visibleGraphIncidents.get(fromId) || 0) + 1);
        if (toId) visibleGraphIncidents.set(toId, (visibleGraphIncidents.get(toId) || 0) + 1);
      }

      // Layered glow pass — makes relationship lines feel alive when a node
      // is hovered, selected, or on an active route. Quiet otherwise.
      if (glowLine && isGraphRelationship) {
        const touchesSid = sid && (fromId === sid || toId === sid);
        const touchesHid = hid && (fromId === hid || toId === hid);
        const nbr = nbrFocusRef?.forEdges;
        const neighborEdge =
          !touchesSid && !touchesHid && nbr && fromId && toId && (nbr.has(fromId) || nbr.has(toId));
        const bothInHighlight =
          nhActive &&
          fromId &&
          toId &&
          graphHighlightIds.has(fromId) &&
          graphHighlightIds.has(toId);
        let glowOp = 0;
        if (touchesSid) glowOp = 0.46;
        else if (touchesHid) glowOp = 0.28;
        else if (bothInHighlight) glowOp = 0.36;
        else if (neighborEdge) glowOp = 0.11;
        if (routeActive && fromId && toId) {
          const pk = undirectedPairKey(fromId, toId);
          if (routePairKeys.has(pk)) {
            glowOp = Math.max(glowOp, 0.5);
            if (stepSceneId && (fromId === stepSceneId || toId === stepSceneId)) {
              glowOp = 0.72;
            }
          } else {
            glowOp *= 0.28;
          }
        }
        // Respect search dimming — only fully quiet if primary line was already dim.
        if (q) glowOp *= 0.32;
        const hex = styleColorHex ?? (glowLine.userData?.baseColorHex ?? 0xffffff);
        const baseC = new THREE.Color(hex).lerp(new THREE.Color(0xffffff), 0.45);
        glowLine.material.color.copy(baseC);
        glowLine.material.opacity = glowOp;
        glowLine.visible = glowOp > 0.001;
        glowLine.userData.glowAnimBase = glowOp;
      }
    });

    const { primaryId } = primaryFocusInfo;
    const nbrFocus = neighborFocusSet;

    nodeRegistry.forEach((entry, id) => {
      const { mesh, data, baseOpacity, baseEmissive } = entry;
      const mat = mesh.material;
      if (!mat || mat.type === 'MeshBasicMaterial') return;

      const match = nodeMatchesSearch(data, q);
      let opacityMult = match ? 1 : 0.1;
      let emissiveMult = 1;

      if (selectionPulse && id === selectionPulse.id) {
        emissiveMult *= 1.22;
      }

      if (id === sid) {
        emissiveMult *= pin ? 1.88 : 1.68;
      } else if (id === hid) {
        emissiveMult *= sid ? 1.36 : 1.48;
      }
      if (id === sid && pin) opacityMult = Math.max(opacityMult, 0.88);
      else if (id === sid) opacityMult = Math.max(opacityMult, 0.82);

      const fullG = graphRoomIncidentFull.get(id) || 0;
      const visG = visibleGraphIncidents.get(id) || 0;
      if (data.type === 'room' && fullG > 0 && visG === 0 && currentView === 'graph') {
          opacityMult *= gTier >= 2 ? 0.22 : gTier >= 1 ? 0.28 : 0.34;
          emissiveMult *= gTier >= 2 ? 0.42 : 0.5;
      }

      if (nbrFocus && !nhActive) {
        if (nbrFocus.has(id)) {
          opacityMult = Math.max(opacityMult, gTier >= 2 ? 0.5 : 0.62);
          emissiveMult *= 1.06;
        }
        if (id === primaryId) {
          opacityMult = Math.max(opacityMult, pin && id === sid ? 0.94 : 0.88);
        }
      }

      if (nhActive) {
        if (graphHighlightIds.has(id)) {
          opacityMult = Math.max(opacityMult, gTier >= 2 ? 0.78 : 0.88);
          emissiveMult *= 1.06;
        } else {
          opacityMult *= gTier >= 2 ? 0.085 : 0.11;
          emissiveMult *= 0.28;
        }
      }

      let routeScale = 1;
      if (routeActive && data.type === 'room') {
        const pathSet = new Set(route.pathSceneIds);
        if (!pathSet.has(id)) {
          opacityMult *= 0.3;
          emissiveMult *= 0.68;
        } else {
          const p0 = route.pathSceneIds[0];
          const pLast = route.pathSceneIds[route.pathSceneIds.length - 1];
          if (id === p0) emissiveMult *= 1.1;
          if (id === pLast) emissiveMult *= 1.08;
          if (bridgeSceneSet.has(id) && id !== p0 && id !== pLast) {
            emissiveMult *= 1.06;
            routeScale = Math.max(routeScale, 1.03);
          }
          if (stepSceneId && id === stepSceneId) {
            emissiveMult *= 1.12;
            routeScale = 1.05;
          }
        }
      }

      const mining =
        presentation.miningOverlay && typeof presentation.miningOverlay === 'object'
          ? presentation.miningOverlay
          : { mode: 'off', weights: {} };
      const mMode = mining.mode || 'off';
      const mWeights = mining.weights && typeof mining.weights === 'object' ? mining.weights : {};
      if (mMode !== 'off' && data.type === 'room' && (currentView === 'graph' || currentView === 'rooms')) {
        const mw = mWeights[id];
        if (typeof mw === 'number' && mw > 0) {
          emissiveMult *= 1 + 0.24 * Math.min(1, mw);
        }
      }

      entry.presentationOpacity = Math.min(1, opacityMult);
      mat.opacity = Math.min(1, baseOpacity * opacityMult);
      const targetEmissive = baseEmissive * emissiveMult;
      mat.emissiveIntensity = targetEmissive;
      entry.presentationEmissive = targetEmissive;

      // Hover uses emissive/opacity only — scaling the sphere on hover caused visible twitch
      // and feedback with layout/raycast. Selection and route still get modest scale cues.
      const emphasis =
        id === sid
          ? pin
            ? 1.18
            : 1.14
          : id === hid
            ? 1
            : nhActive && graphHighlightIds.has(id)
              ? 1.05
              : nhActive && !graphHighlightIds.has(id)
                ? 0.86
                : nbrFocus?.has(id)
                  ? 1.02
                  : 1;
      const dimScale = match ? 1 : 0.88;
      mesh.scale.setScalar(emphasis * dimScale * routeScale);
    });

    if (routeActive && route.pathSceneIds.length) {
      route.pathSceneIds.forEach((rid) => {
        if (rid && rid.startsWith('room:')) ensureDynamicRoomLabel(rid);
      });
    }

    if (currentView === 'graph' && graphLabelEntries.length) {
      applyGraphLabels();
    } else {
      labelByNodeId.forEach((sprite, id) => {
        const data = nodeRegistry.get(id)?.data;
        if (!data) return;
        const match = nodeMatchesSearch(data, q);
        sprite.visible = labelsVisible;
        sprite.material.opacity = match ? (id === sid ? 0.98 : 0.82) : 0.16;
      });
    }
  }

  /**
   * Deterministic pseudo-noise from a string key — used so that each wing
   * gets a stable organic offset between runs (cognitive landmarks don't
   * wander every frame).
   */
  function stableNoise(key, seed = 0) {
    let h = seed | 0;
    const s = String(key);
    for (let i = 0; i < s.length; i += 1) h = (h * 131 + s.charCodeAt(i)) | 0;
    h = (h ^ (h >>> 13)) * 1274126177;
    return ((h & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  }

  /**
   * Wings are cognitive regions. Instead of a flat ring we place them on a
   * shallow dome with per-wing vertical drift — still readable top-down
   * but with real depth cues. No center "palace core" sphere; the wings
   * hold the composition on their own.
   */
  function renderWingsView() {
    const wingNames = Object.keys(wingsData);
    if (!wingNames.length) return;

    const angleStep = (Math.PI * 2) / wingNames.length;
    const radius = CONFIG.spacing.wingSeparation / 2;
    const drift = CONFIG.spacing.verticalDrift;

    wingNames.forEach((wing, i) => {
      const angle = i * angleStep + stableNoise(wing, 3) * 0.12;
      const jitter = 1 + stableNoise(wing, 7) * 0.08;
      const x = Math.cos(angle) * radius * jitter;
      const z = Math.sin(angle) * radius * jitter;
      const y = stableNoise(wing, 11) * drift;
      const drawerCount = wingsData[wing] || 1;
      const size = THREE.MathUtils.mapLinear(drawerCount, 1, 200, CONFIG.nodeSizes.wingMin, CONFIG.nodeSizes.wingMax);
      createWingNode(wing, x, y, z, size);
      addLabelForNode(`wing:${wing}`, wing, x, y, z, '#e8edf0', size);
    });

    // Soft neighbor tethers between adjacent wings on the dome — gives the
    // composition cohesion without inventing a central hub.
    for (let i = 0; i < wingNames.length; i += 1) {
      const a = wingNames[i];
      const b = wingNames[(i + 1) % wingNames.length];
      const na = nodeRegistry.get(`wing:${a}`);
      const nb = nodeRegistry.get(`wing:${b}`);
      if (!na || !nb) continue;
      const pa = na.mesh.position;
      const pb = nb.mesh.position;
      createLink([pa.x, pa.y, pa.z], [pb.x, pb.y, pb.z], CONFIG.accent.linkWing, 0.14, {
        fromId: `wing:${a}`,
        toId: `wing:${b}`,
        baseOpacity: 0.14,
      });
    }

    tweenCamera(new THREE.Vector3(0, 34, 92), new THREE.Vector3(0, 0, 0));
  }

  /** Focused wing: parent loci at origin, rooms drift in a 3D shell. */
  function renderRoomsViewFocused(focusWing) {
    const rooms = roomsData[focusWing] || [];
    const wingSize = CONFIG.nodeSizes.wingMin + 1.2;
    createWingNode(focusWing, 0, 0, 0, wingSize);
    addLabelForNode(`wing:${focusWing}`, focusWing, 0, 0, 0, '#e8edf0', wingSize);

    const roomRadius = CONFIG.spacing.roomRadius;
    const n = Math.max(rooms.length, 1);
    const step = (Math.PI * 2) / n;

    rooms.forEach((room, i) => {
      const key = `${focusWing}:${room.name}`;
      const ang = i * step + stableNoise(key, 5) * 0.09;
      const rJ = 1 + stableNoise(key, 9) * 0.1;
      const rx = Math.cos(ang) * roomRadius * rJ;
      const rz = Math.sin(ang) * roomRadius * rJ;
      const ry = stableNoise(key, 13) * 3.5;
      const size = THREE.MathUtils.mapLinear(room.drawers || 1, 1, 80, CONFIG.nodeSizes.roomMin, CONFIG.nodeSizes.roomMax);
      createRoomNode(room.name, focusWing, rx, ry, rz, size);
      createLink([0, 0, 0], [rx, ry, rz], CONFIG.accent.linkWing, 0.2, {
        fromId: `wing:${focusWing}`,
        toId: `room:${focusWing}:${room.name}`,
        baseOpacity: 0.2,
      });
      addLabelForNode(`room:${focusWing}:${room.name}`, room.name, rx, ry, rz, '#aab4c3', size);
    });

    tweenCamera(new THREE.Vector3(0, 36, 74), new THREE.Vector3(0, 0, 0));
  }

  /** Overview: all wings as regions, each with its room cluster. */
  function renderRoomsViewAll() {
    const wingNames = Object.keys(roomsData);
    if (!wingNames.length) return;

    const wingAngleStep = (Math.PI * 2) / wingNames.length;
    const wingRadius = CONFIG.spacing.wingSeparation / 2;
    const drift = CONFIG.spacing.verticalDrift;

    wingNames.forEach((wing, wingIdx) => {
      const wingAngle = wingIdx * wingAngleStep + stableNoise(wing, 3) * 0.1;
      const wJ = 1 + stableNoise(wing, 7) * 0.07;
      const wingX = Math.cos(wingAngle) * wingRadius * wJ;
      const wingZ = Math.sin(wingAngle) * wingRadius * wJ;
      const wingY = stableNoise(wing, 11) * drift;

      createWingNode(wing, wingX, wingY, wingZ, CONFIG.nodeSizes.wingMin);
      addLabelForNode(`wing:${wing}`, wing, wingX, wingY, wingZ, '#d6dde6', CONFIG.nodeSizes.wingMin);

      const rooms = roomsData[wing] || [];
      const roomAngleStep = (Math.PI * 2) / Math.max(rooms.length, 1);
      const roomRadius = CONFIG.spacing.roomRadius;

      rooms.forEach((room, roomIdx) => {
        const key = `${wing}:${room.name}`;
        const roomAngle = wingAngle + roomIdx * roomAngleStep + stableNoise(key, 5) * 0.12;
        const rJ = 1 + stableNoise(key, 9) * 0.1;
        const roomX = wingX + Math.cos(roomAngle) * roomRadius * rJ;
        const roomZ = wingZ + Math.sin(roomAngle) * roomRadius * rJ;
        const roomY = wingY + stableNoise(key, 13) * 2.8;
        const size = THREE.MathUtils.mapLinear(room.drawers || 1, 1, 80, CONFIG.nodeSizes.roomMin, CONFIG.nodeSizes.roomMax);
        createRoomNode(room.name, wing, roomX, roomY, roomZ, size);
        createLink([wingX, wingY, wingZ], [roomX, roomY, roomZ], CONFIG.accent.linkWing, 0.16, {
          fromId: `wing:${wing}`,
          toId: `room:${wing}:${room.name}`,
          baseOpacity: 0.16,
        });
        addLabelForNode(`room:${wing}:${room.name}`, room.name, roomX, roomY, roomZ, '#aab4c3', size);
      });
    });

    // Sparse dome tethers between neighboring wings.
    for (let i = 0; i < wingNames.length; i += 1) {
      const a = wingNames[i];
      const b = wingNames[(i + 1) % wingNames.length];
      const na = nodeRegistry.get(`wing:${a}`);
      const nb = nodeRegistry.get(`wing:${b}`);
      if (!na || !nb) continue;
      const pa = na.mesh.position;
      const pb = nb.mesh.position;
      createLink([pa.x, pa.y, pa.z], [pb.x, pb.y, pb.z], CONFIG.accent.linkWing, 0.1, {
        fromId: `wing:${a}`,
        toId: `wing:${b}`,
        baseOpacity: 0.1,
      });
    }

    tweenCamera(new THREE.Vector3(0, 50, 108), new THREE.Vector3(0, 0, 0));
  }

  function renderRoomsView() {
    if (roomsFocusWing && roomsData[roomsFocusWing]) {
      renderRoomsViewFocused(roomsFocusWing);
    } else {
      renderRoomsViewAll();
    }
  }

  /**
   * Stable wing ordering for layout seeds.
   * @param {string[]} keys
   */
  function sortedWingKeys(keys) {
    return [...keys].sort((a, b) => a.localeCompare(b));
  }

  function renderGraphView() {
    const allNodes = new Map();

    Object.keys(wingsData).forEach((wing) => {
      allNodes.set(wing, { name: wing, type: 'wing', wing, x: 0, y: 0, z: 0 });
    });

    Object.entries(roomsData).forEach(([wing, rooms]) => {
      rooms.forEach((room) => {
        allNodes.set(makeRoomId(wing, room.name), {
          name: room.name,
          type: 'room',
          wing,
          x: 0,
          y: 0,
          z: 0,
          drawers: room.drawers,
        });
      });
    });

    const nodeList = Array.from(allNodes.values());
    if (!nodeList.length) {
      const centerGeometry = new THREE.SphereGeometry(1.1, 16, 16);
      const centerMaterial = new THREE.MeshStandardMaterial({
        color: CONFIG.accent.center,
        emissive: 0x334155,
        emissiveIntensity: 0.25,
        metalness: 0.2,
        roughness: 0.5,
        transparent: true,
        opacity: 0.35,
      });
      const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
      scene.add(centerNode);
      nodes.push({ mesh: centerNode, data: { name: 'No graph data', type: 'center' } });
      tweenCamera(new THREE.Vector3(0, 28, 72), new THREE.Vector3(0, 0, 0));
      return;
    }

    const wingNames = sortedWingKeys(Object.keys(wingsData));
    graphRoomIncidentFull = countGraphIncidentsByRoomNodeId(nodeList, graphEdges, findRoomNodeForEdge);
    graphNeighborMap = buildGraphRoomNeighborMap(graphEdges, nodeList, findRoomNodeForEdge);

    graphSceneMetrics = computeDensityMetrics(
      nodeList.length,
      graphEdges.length,
      wingNames.length,
    );
    if (prefersReducedMotion) {
      graphSceneMetrics = {
        ...graphSceneMetrics,
        labelBudget: Math.min(graphSceneMetrics.labelBudget, 95),
      };
    }

    seedWingClusteredLayout(nodeList, wingNames, graphSceneMetrics);
    runGraphForceLayout(nodeList, graphEdges, graphSceneMetrics, findRoomNodeForEdge);

    // Ensure node sizes are set so collision radii match actual geometry.
    // Wings scale with drawer counts; rooms scale with their drawer counts.
    nodeList.forEach((n) => {
      if (n.type === 'wing') {
        const drawerCount = (wingsData && wingsData[n.name]) || 1;
        n.size = THREE.MathUtils.mapLinear(drawerCount, 1, 200, CONFIG.nodeSizes.wingMin, CONFIG.nodeSizes.wingMax);
      } else {
        n.size = THREE.MathUtils.mapLinear(n.drawers || 1, 1, 80, CONFIG.nodeSizes.roomMin, CONFIG.nodeSizes.roomMax);
      }
    });

    separateGraphNodes(nodeList, graphSceneMetrics.collisionMinDist, 12);

    if (scene.fog && scene.fog.isFogExp2) {
      scene.fog.density = graphSceneMetrics.fogDensity;
    }
    if (stars?.userData?.innerMat) {
      stars.userData.innerMat.opacity = Math.max(0.18, 0.38 - graphSceneMetrics.tier * 0.05);
    }
    if (stars?.userData?.outerMat) {
      stars.userData.outerMat.opacity = Math.max(0.1, 0.22 - graphSceneMetrics.tier * 0.04);
    }

    graphLabelEntries = nodeList.map((n) => {
      const id = n.type === 'wing' ? `wing:${n.name}` : `room:${n.wing}:${n.name}`;
      const incidentFull = graphRoomIncidentFull.get(id) || 0;
      return {
        id,
        incidentFull,
        baseScore: baseLabelScoreForGraphNode({
          type: n.type,
          incidentFull,
          drawers: n.drawers,
        }),
      };
    });

    const roomLabelAllow = buildGraphRoomLabelCandidateSet(graphLabelEntries, graphSceneMetrics);

    nodeList.forEach((nodeData) => {
      const isWing = nodeData.type === 'wing';
      const size = isWing ? CONFIG.nodeSizes.wingMin + 0.4 : CONFIG.nodeSizes.roomMin + 0.2;
      if (isWing) {
        createWingNode(nodeData.name, nodeData.x, nodeData.y, nodeData.z, size);
        addLabelForNode(`wing:${nodeData.name}`, nodeData.name, nodeData.x, nodeData.y, nodeData.z, '#cbd5e1', size);
      } else {
        const rid = `room:${nodeData.wing}:${nodeData.name}`;
        createRoomNode(nodeData.name, nodeData.wing, nodeData.x, nodeData.y, nodeData.z, size);
        if (roomLabelAllow.has(rid)) {
          addLabelForNode(rid, nodeData.name, nodeData.x, nodeData.y, nodeData.z, '#94a3b8', size);
        }
      }
    });

    graphEdges.forEach((edge) => {
      const fromNode = findRoomNodeForEdge(nodeList, edge, 'from');
      const toNode = findRoomNodeForEdge(nodeList, edge, 'to');
      if (fromNode && toNode) {
        const fid = graphSceneNodeIdForLayoutNode(fromNode);
        const tid = graphSceneNodeIdForLayoutNode(toNode);
        const rt = getEdgeRelationshipType(edge);
        const st = getStyleForRelationshipType(rt);
        createLink([fromNode.x, fromNode.y, fromNode.z], [toNode.x, toNode.y, toNode.z], st.color, st.opacity, {
          fromId: fid,
          toId: tid,
          baseOpacity: st.opacity,
          isGraphRelationship: true,
          relationshipType: rt,
          styleColorHex: st.color,
        });
      }
    });

    const box = new THREE.Box3();
    nodeList.forEach((n) => box.expandByPoint(new THREE.Vector3(n.x, n.y, n.z)));
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const extent = Math.max(size.x, size.y, size.z, 12);
    graphSpatialExtent = extent;
    const dist = computeGraphFocusCameraDistance(extent * 0.48, camera.fov, graphSceneMetrics.tier);
    const dir = new THREE.Vector3(0.35, 0.42, 1).normalize();
    const camPos = center.clone().add(dir.multiplyScalar(dist));
    graphDefaultCamera = { position: camPos.clone(), target: center.clone() };
    tweenCamera(camPos, center);
  }

  function applyViewSettings() {
    const isGraph = currentView === 'graph';
    const allowSpin = autoRotateUser && !isGraph && !prefersReducedMotion;
    controls.autoRotate = allowSpin;
    controls.autoRotateSpeed = 0.35 * (allowSpin ? 1 : 0);
  }

  function setView(view, focusWing = null) {
    currentView = view;
    roomsFocusWing = focusWing;
    clearSceneContent();
    hoveredMesh = null;
    presentation.hoveredId = null;
    applyViewSettings();

    if (view === 'wings') renderWingsView();
    else if (view === 'rooms') renderRoomsView();
    else if (view === 'graph') renderGraphView();

    syncVisualPresentation();
  }

  function onPointerLeave() {
    clearHoverState(0, 0);
  }

  function onPointerMove(event) {
    pendingPointerEvent = event;
    if (pointerRafId) return;
    pointerRafId = requestAnimationFrame(() => {
      pointerRafId = 0;
      const ev = pendingPointerEvent;
      pendingPointerEvent = null;
      if (ev) processPointerMove(ev);
    });
  }

  function processPointerMove(event) {
    if (cameraInteractionActive) return;
    if (pointerGesture.active && event.pointerId === pointerGesture.pointerId) {
      const dx = event.clientX - pointerGesture.startX;
      const dy = event.clientY - pointerGesture.startY;
      const d2 = dx * dx + dy * dy;
      if (d2 > pointerGesture.maxMoveSq) pointerGesture.maxMoveSq = d2;
    }

    const obj = findHoveredNodeMeshAtClient(event.clientX, event.clientY);
    if (obj) {
      const hid = obj.userData.id || null;
      const hoverChanged = hoveredMesh !== obj || presentation.hoveredId !== hid;
      hoveredMesh = obj;
      presentation.hoveredId = hid;
      renderer.domElement.style.cursor = 'pointer';
      if (hoverChanged) syncVisualPresentation();
      callbacks.onHover({ ...obj.userData }, { x: event.clientX, y: event.clientY });
      return;
    }
    const wasHovering = presentation.hoveredId != null;
    hoveredMesh = null;
    presentation.hoveredId = null;
    renderer.domElement.style.cursor = 'default';
    if (wasHovering) syncVisualPresentation();
    callbacks.onHover(null, { x: event.clientX, y: event.clientY });
  }

  function onPointerDown(event) {
    if (!camera || event.button !== 0) return;
    pointerGesture.active = true;
    pointerGesture.pointerId = event.pointerId;
    pointerGesture.pointerType = event.pointerType || 'mouse';
    pointerGesture.startX = event.clientX;
    pointerGesture.startY = event.clientY;
    pointerGesture.maxMoveSq = 0;
    pointerGesture.camPosStart.copy(camera.position);
    pointerGesture.targetStart.copy(controls.target);
    // Fresh press must not inherit stale hovered-id from a prior interaction.
    clearHoverState(event.clientX, event.clientY);
    attachGlobalPointerEnd();
  }

  function onGlobalPointerEnd(event) {
    if (!pointerGesture.active || event.pointerId !== pointerGesture.pointerId) return;
    detachGlobalPointerEnd();
    pointerGesture.active = false;
    if (event.type === 'pointercancel') return;
    if (event.button !== 0) return;

    const cameraMovedSq = Math.max(
      camera.position.distanceToSquared(pointerGesture.camPosStart),
      controls.target.distanceToSquared(pointerGesture.targetStart),
    );
    const release = classifyPointerRelease({
      maxMoveSq: pointerGesture.maxMoveSq,
      cameraMovedSq,
      moveThresholdPx: pointerMoveThresholdPx(pointerGesture.pointerType),
      pointerType: pointerGesture.pointerType,
      cameraMoveEpsSq: CAMERA_MOVE_EPS_SQ,
    });
    if (!release.shouldSelect) return;

    const pick = findHoveredNodeMeshAtClient(event.clientX, event.clientY);
    if (!pick) {
      selectionPulse = null;
      callbacks.onBackgroundClick();
      callbacks.onClick(null);
      return;
    }
    const data = { ...pick.userData };
    if (data.id && data.type !== 'center') {
      if (selectionPulseTimer) clearTimeout(selectionPulseTimer);
      selectionPulse = { id: data.id, at: performance.now() };
      syncVisualPresentation();
      selectionPulseTimer = setTimeout(() => {
        selectionPulseTimer = 0;
        selectionPulse = null;
        syncVisualPresentation();
      }, 260);
    }
    callbacks.onClick(data);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();

    // Calm breathing: subtle emissive pulse + slow rotation. No vertical
    // bob — it was reading as jitter and fought depth cues. Positions are
    // now stable; motion lives in light.
    const t = Date.now() * 0.001;
    const pulseAmp = prefersReducedMotion ? 0 : 0.045 * motionIntensity;
    const rot = prefersReducedMotion ? 0 : 0.004 * motionIntensity;

    nodes.forEach((node, i) => {
      if (!node.data || node.data.type === 'center') return;
      const offset = i * 0.31;
      const mat = node.mesh.material;
      if (mat && typeof mat.emissiveIntensity === 'number') {
        const entry = nodeRegistry.get(node.data.id);
        if (entry) {
          const target = entry.presentationEmissive ?? entry.baseEmissive;
          const breath = 1 + Math.sin(t * 0.55 + offset) * pulseAmp;
          mat.emissiveIntensity = target * breath;
        }
      }
      node.mesh.rotation.y += rot;
    });

    const gTier = graphSceneMetrics?.tier ?? 0;
    if (currentView === 'graph') {
      // Neighborhood contrast is handled in syncVisualPresentation; avoid
      // stacking distance-based dimming on top (it washed out the highlight).
      nodeRegistry.forEach((entry, id) => {
        const mat = entry.mesh.material;
        if (!mat || mat.type === 'MeshBasicMaterial') return;
        mat.opacity = Math.min(1, entry.baseOpacity * (entry.presentationOpacity ?? 1));
      });
      applyGraphLabels();
    }

    if (currentView === 'graph' && !prefersReducedMotion) {
      const lt = Date.now() * 0.001;
      linkObjects.forEach((lo) => {
        if (!lo.isGraphRelationship) return;
        if (lo.line?.material && lo.line.visible) {
          const base = lo.line.userData.opacityAnimBase;
          if (base != null) {
            const phase = (String(lo.fromId) + String(lo.toId)).length * 0.07;
            const wobble = 1 + Math.sin(lt * 0.78 + phase) * 0.028;
            lo.line.material.opacity = Math.min(1, base * wobble);
          }
        }
        // Soft bloom pulse on emphasized edges only — keeps neutral graph calm.
        if (lo.glowLine?.material && lo.glowLine.visible) {
          const gbase = lo.glowLine.userData.glowAnimBase ?? 0;
          if (gbase > 0.001) {
            const phase = (String(lo.fromId) + String(lo.toId)).length * 0.09;
            const pulse = 1 + Math.sin(lt * 1.4 + phase) * 0.2;
            lo.glowLine.material.opacity = Math.min(1, gbase * pulse);
          }
        }
      });

      // Route pulses — small additive motes travel from start toward end.
      if (routePulses.length) {
        const travelT = (lt * 0.35) % 1;
        routePulses.forEach((p) => {
          const t = (travelT + p.offset) % 1;
          // Quadratic bezier sample with the same mid we used when laying the line
          const one = 1 - t;
          const x = one * one * p.from.x + 2 * one * t * p.mid.x + t * t * p.to.x;
          const y = one * one * p.from.y + 2 * one * t * p.mid.y + t * t * p.to.y;
          const z = one * one * p.from.z + 2 * one * t * p.mid.z + t * t * p.to.z;
          p.sprite.position.set(x, y, z);
          const env = Math.sin(t * Math.PI); // fade in/out at ends
          p.sprite.material.opacity = 0.56 * env;
        });
      }
    }

    // Selection ring — face the camera and breathe softly so the focused
    // node is unmistakable without brute-force scaling.
    if (selectionRing) {
      selectionRing.quaternion.copy(camera.quaternion);
      if (!prefersReducedMotion) {
        const rt = Date.now() * 0.001;
        const breath = 1 + Math.sin(rt * 1.25) * 0.055;
        selectionRing.scale.setScalar(selectionRing.userData.baseScale * breath);
        selectionRing.material.opacity = 0.28 + Math.sin(rt * 1.25) * 0.05;
      }
    }

    renderer.render(scene, camera);
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.bg.deep);
    scene.fog = new THREE.FogExp2(CONFIG.bg.deep, CONFIG.bg.fogDensity);

    camera = new THREE.PerspectiveCamera(54, container.clientWidth / container.clientHeight, 0.1, 1400);
    camera.position.set(0, 32, 94);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.2;
    controls.minDistance = 8;
    controls.maxDistance = 420;
    controls.maxPolarAngle = Math.PI * 0.52;
    controlsStartHandler = () => {
      cameraInteractionActive = true;
      if (pointerGesture.active) {
        const t = pointerMoveThresholdPx(pointerGesture.pointerType);
        pointerGesture.maxMoveSq = Math.max(pointerGesture.maxMoveSq, t * t + 1);
      }
      clearHoverState();
    };
    controlsEndHandler = () => {
      requestAnimationFrame(() => {
        cameraInteractionActive = false;
      });
    };
    controls.addEventListener('start', controlsStartHandler);
    controls.addEventListener('end', controlsEndHandler);

    // Warm-cool two-tone lighting suggests cognitive depth without pushing
    // hard blue. Hemi is ambient ground-vs-sky; key is warm (thought side),
    // fill is cool (memory side).
    const hemi = new THREE.HemisphereLight(0x6d7b93, 0x0a0f1a, 0.78);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xf0d9b5, 0.95);
    key.position.set(24, 42, 26);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6aa0ff, 0.42);
    fill.position.set(-28, 14, -20);
    scene.add(fill);

    createStars();

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion = mq.matches;
      mq.addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
        applyViewSettings();
      });
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', scheduleResize);
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleResize);
      resizeObserver.observe(container);
    }

    animate();
  }

  function scheduleResize() {
    if (resizeRafId) return;
    resizeRafId = requestAnimationFrame(() => {
      resizeRafId = 0;
      resize();
    });
  }

  function resize() {
    if (!camera || !renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    if (w === lastResizeW && h === lastResizeH) return;
    lastResizeW = w;
    lastResizeH = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // FRAGILE: pass `true` (updateStyle) so the canvas' CSS size tracks the
    // container after side panels collapse/expand. With `false` the canvas
    // keeps stale inline width/height and visually overflows the column,
    // which used to look like a large dark-blue dead region on the right.
    renderer.setSize(w, h, true);
  }

  function setData(payload) {
    wingsData = payload.wingsData || {};
    roomsData = payload.roomsData || {};
    graphEdges = payload.graphEdges || [];
  }

  function resetCamera() {
    clearHoverState();
    if (currentView === 'graph' && graphDefaultCamera) {
      tweenCamera(graphDefaultCamera.position.clone(), graphDefaultCamera.target.clone());
      return;
    }
    tweenCamera(new THREE.Vector3(0, 32, 94), new THREE.Vector3(0, 0, 0));
  }

  function centerOnNodeId(nodeId) {
    const entry = nodeRegistry.get(nodeId);
    if (!entry) return;
    clearHoverState();
    const p = new THREE.Vector3();
    entry.mesh.getWorldPosition(p);

    if (currentView === 'graph' && graphSceneMetrics) {
      const neighborPts = [];
      linkObjects.forEach((lo) => {
        if (!lo.isGraphRelationship) return;
        let otherId = null;
        if (lo.fromId === nodeId) otherId = lo.toId;
        else if (lo.toId === nodeId) otherId = lo.fromId;
        if (!otherId) return;
        const other = nodeRegistry.get(otherId);
        if (other) neighborPts.push(other.mesh.position.clone());
      });
      const nc = neighborPts.length;
      const maxR = maxRadiusFromFocus(p, neighborPts.length ? neighborPts : [p.clone()]);
      const dist = computeGraphFocusCameraDistance(maxR, camera.fov, graphSceneMetrics.tier, {
        neighborCount: nc,
      });
      let dir = camera.position.clone().sub(p);
      if (dir.lengthSq() < 4) dir.set(32, 26, 72);
      dir.normalize();
      if (lastFocusNodeId === nodeId) focusRepeatIndex += 1;
      else {
        lastFocusNodeId = nodeId;
        focusRepeatIndex = 0;
      }
      const ext = Math.max(maxR * 2.4, graphSpatialExtent * 0.42, 28);
      const off = framingTargetOffset(ext, graphSceneMetrics.tier, focusRepeatIndex);
      const target = new THREE.Vector3(p.x + off.x, p.y + off.y, p.z + off.z);
      const dur = focusRepeatIndex > 0 ? 1020 : 880;
      tweenCamera(p.clone().add(dir.multiplyScalar(dist)), target, dur);
      return;
    }

    const dir = camera.position.clone().sub(p).normalize();
    const d0 = currentView === 'rooms' && roomsFocusWing ? 26 : 30;
    tweenCamera(p.clone().add(dir.multiplyScalar(d0)), p);
  }

  function centerOnHovered() {
    if (!hoveredMesh?.userData?.id) return;
    centerOnNodeId(hoveredMesh.userData.id);
  }

  /**
   * Brief emissive emphasis on a node (e.g. graph search jump) without simulating a click.
   * @param {string} nodeId
   * @param {number} [durationMs]
   */
  function pulseNodeEmphasis(nodeId, durationMs = 420) {
    if (!nodeId || !nodeRegistry.get(nodeId)) return;
    if (selectionPulseTimer) clearTimeout(selectionPulseTimer);
    selectionPulse = { id: nodeId, at: performance.now() };
    syncVisualPresentation();
    selectionPulseTimer = setTimeout(() => {
      selectionPulseTimer = 0;
      selectionPulse = null;
      syncVisualPresentation();
    }, durationMs);
  }

  function updatePresentation(patch) {
    const prevSel = presentation.selectedId;
    const next = { ...presentation, ...patch };
    if (patch.route !== undefined) {
      next.route = { ...defaultRoutePresentation(), ...patch.route };
    }
    if (patch.miningOverlay !== undefined) {
      const cur = presentation.miningOverlay && typeof presentation.miningOverlay === 'object' ? presentation.miningOverlay : {};
      const p = patch.miningOverlay && typeof patch.miningOverlay === 'object' ? patch.miningOverlay : {};
      next.miningOverlay = {
        mode: p.mode != null ? p.mode : cur.mode ?? 'off',
        weights: p.weights && typeof p.weights === 'object' ? p.weights : cur.weights ?? {},
      };
    }
    // Programmatic selection changes (Back, search jump, inspector) do not emit pointermove; clear stale hover
    // so scene emphasis and UI hover card stay aligned with the new focus (including clear-to-null).
    if (patch.selectedId !== undefined && patch.selectedId !== prevSel) {
      next.hoveredId = null;
      hoveredMesh = null;
      if (renderer?.domElement) renderer.domElement.style.cursor = 'default';
      callbacks.onHover(null, { x: 0, y: 0 });
    }
    if (presentationEqual(presentation, next)) return;
    const prevRoute = presentation.route || defaultRoutePresentation();
    const prevSelId = presentation.selectedId;
    presentation = next;
    const nextRoute = presentation.route || defaultRoutePresentation();
    const routeChanged = !routePresentationEqual(prevRoute, nextRoute);
    if (routeChanged) rebuildRoutePulses();
    if (prevSelId !== presentation.selectedId) rebuildSelectionRing();
    syncVisualPresentation();
  }

  /** @param {Set<string>|null} typesSet — null = show all relationship types */
  function setRelationshipFilters(typesSet) {
    updatePresentation({ relationshipTypesVisible: typesSet });
  }

  function clearPin() {
    presentation.selectedId = null;
    rebuildSelectionRing();
    syncVisualPresentation();
  }

  function dispose() {
    cancelAnimationFrame(animationId);
    if (cameraTween) cancelAnimationFrame(cameraTween);
    if (pointerRafId) cancelAnimationFrame(pointerRafId);
    if (resizeRafId) cancelAnimationFrame(resizeRafId);
    pendingPointerEvent = null;
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    window.removeEventListener('resize', scheduleResize);
    detachGlobalPointerEnd();
    if (renderer?.domElement) {
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
    }
    if (controls) {
      if (controlsStartHandler) controls.removeEventListener('start', controlsStartHandler);
      if (controlsEndHandler) controls.removeEventListener('end', controlsEndHandler);
    }
    clearSceneContent();
    if (selectionPulseTimer) clearTimeout(selectionPulseTimer);
    selectionPulseTimer = 0;
    if (stars) {
      scene.remove(stars);
      stars.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    renderer?.dispose();
    if (renderer?.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }

  return {
    init,
    setData,
    setView,
    updatePresentation,
    setAutoRotate(v) {
      autoRotateUser = v;
      applyViewSettings();
    },
    setMotionIntensity(v) {
      motionIntensity = Math.max(0, Math.min(2, v));
    },
    setLabelsVisible(v) {
      labelsVisible = !!v;
      if (labelsVisible && !labelSprites.length) {
        setView(currentView, roomsFocusWing);
        return;
      }
      labelSprites.forEach(({ sprite }) => {
        sprite.visible = labelsVisible;
      });
    },
    resetCamera,
    centerOnHovered,
    centerOnNodeId,
    pulseNodeEmphasis,
    clearPin,
    resize,
    dispose,
    getView: () => currentView,
    getFocusWing: () => roomsFocusWing,
    getHovered: () => (hoveredMesh ? { ...hoveredMesh.userData } : null),
    setCallbacks(c) {
      Object.assign(callbacks, c);
    },
    setRelationshipFilters,
    /** Sorted room graph neighbors for stepping UI (graph view). */
    getGraphNeighbors(nodeId) {
      if (currentView !== 'graph' || !nodeId) return [];
      const set = neighborIdsForFocus(nodeId, graphNeighborMap);
      return [...set].sort((a, b) => a.localeCompare(b));
    },
  };
}
