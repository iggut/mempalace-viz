/**
 * Three.js scene — wings / rooms / graph with focus, filter, and selection visuals.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeRoomId } from './canonical.js';

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

const CONFIG = {
  wingColors: {
    projects: '#8b9cf8',
    shared_grocery_list: '#6ee7b7',
    openclaw: '#94a3b8',
    default: '#fbbf24',
  },
  nodeSizes: {
    wingMin: 3,
    wingMax: 8,
    roomMin: 0.8,
    roomMax: 2.5,
  },
  spacing: {
    wingSeparation: 40,
    roomRadius: 15,
  },
  accent: {
    linkWing: 0x3d4454,
    linkGraph: 0x5b8cff,
    center: 0xe2e8f0,
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

  let currentView = 'wings';
  let roomsFocusWing = null;
  let motionIntensity = 1;
  let labelsVisible = true;
  let autoRotateUser = true;

  let hoveredMesh = null;
  let presentation = {
    searchQuery: '',
    hoveredId: null,
    selectedId: null,
    pinActive: false,
  };
  let prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const nodeRegistry = new Map();
  const labelByNodeId = new Map();

  const callbacks = {
    onHover: options.onHover || (() => {}),
    onClick: options.onClick || (() => {}),
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

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
    linkObjects.forEach(({ line }) => {
      scene.remove(line);
      disposeLine(line);
    });
    labelSprites.forEach(({ sprite }) => {
      scene.remove(sprite);
      sprite.material.map?.dispose();
      sprite.material.dispose();
    });
    nodes = [];
    linkObjects = [];
    labelSprites = [];
    nodeRegistry.clear();
    labelByNodeId.clear();
  }

  function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    for (let i = 0; i < 1800; i += 1) {
      starsVertices.push(
        THREE.MathUtils.randFloatSpread(380),
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(380),
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.45,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
  }

  function makeLabelSprite(text, color = '#e2e8f0') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pad = 16;
    ctx.font = '500 22px ui-sans-serif, system-ui, sans-serif';
    const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
    canvas.width = w;
    canvas.height = 44;
    ctx.font = '500 22px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(4, 4, w - 8, 36);
    ctx.fillStyle = color;
    ctx.fillText(text, pad, 28);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    const scale = 0.022 * w;
    sprite.scale.set(scale, 11, 1);
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
    });
    mesh.userData.nodeId = id;
  }

  function addLabelForNode(nodeId, text, x, y, z, color) {
    const sprite = makeLabelSprite(text, color);
    sprite.visible = labelsVisible;
    sprite.position.set(x, y + 2.2, z);
    scene.add(sprite);
    labelSprites.push({ sprite, nodeId });
    labelByNodeId.set(nodeId, sprite);
  }

  function createLink(from, to, colorHex, opacity = 0.28, meta = {}) {
    const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity,
    });
    const line = new THREE.Line(geometry, material);
    line.userData = meta;
    scene.add(line);
    linkObjects.push({ line, ...meta });
    return line;
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

    const glowGeometry = new THREE.SphereGeometry(size * 1.25, 24, 24);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    mesh.add(glow);

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

  function presentationEqual(a, b) {
    return (
      a.searchQuery === b.searchQuery &&
      a.hoveredId === b.hoveredId &&
      a.selectedId === b.selectedId &&
      a.pinActive === b.pinActive
    );
  }

  function syncVisualPresentation() {
    const q = (presentation.searchQuery || '').trim().toLowerCase();
    const hid = presentation.hoveredId;
    const sid = presentation.selectedId;
    const pin = presentation.pinActive;

    nodeRegistry.forEach((entry, id) => {
      const { mesh, data, baseOpacity, baseEmissive } = entry;
      const mat = mesh.material;
      if (!mat || mat.type === 'MeshBasicMaterial') return;

      const match = nodeMatchesSearch(data, q);
      let opacityMult = match ? 1 : 0.14;
      let emissiveMult = 1;

      if (id === hid) emissiveMult *= 1.45;
      if (id === sid) emissiveMult *= pin ? 1.85 : 1.65;
      if (id === sid && pin) opacityMult = Math.max(opacityMult, 0.85);

      mat.opacity = Math.min(1, baseOpacity * opacityMult);
      mat.emissiveIntensity = baseEmissive * emissiveMult;

      const emphasis = id === sid ? (pin ? 1.09 : 1.06) : id === hid ? 1.04 : 1;
      const dimScale = match ? 1 : 0.88;
      mesh.scale.setScalar(emphasis * dimScale);
    });

    labelByNodeId.forEach((sprite, id) => {
      const data = nodeRegistry.get(id)?.data;
      if (!data) return;
      const match = nodeMatchesSearch(data, q);
      sprite.material.opacity = match ? (id === sid ? 1 : 0.92) : 0.2;
    });

    linkObjects.forEach(({ line, fromId, toId, baseOpacity = 0.28 }) => {
      const mf = fromId ? nodeMatchesSearch(nodeRegistry.get(fromId)?.data || {}, q) : true;
      const mt = toId ? nodeMatchesSearch(nodeRegistry.get(toId)?.data || {}, q) : true;
      const show = !q || (mf && mt);
      line.material.opacity = show ? baseOpacity : baseOpacity * 0.12;
    });
  }

  function renderWingsView() {
    const wingNames = Object.keys(wingsData);
    if (!wingNames.length) return;

    const angleStep = (Math.PI * 2) / wingNames.length;
    const radius = CONFIG.spacing.wingSeparation / 2;

    wingNames.forEach((wing, i) => {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const drawerCount = wingsData[wing] || 1;
      const size = THREE.MathUtils.mapLinear(drawerCount, 1, 200, CONFIG.nodeSizes.wingMin, CONFIG.nodeSizes.wingMax);
      createWingNode(wing, x, 0, z, size);
      addLabelForNode(`wing:${wing}`, wing, x, 0, z, '#e2e8f0');
    });

    const centerGeometry = new THREE.SphereGeometry(1.1, 20, 20);
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.accent.center,
      emissive: 0x334155,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.55,
    });
    const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerNode);
    nodes.push({ mesh: centerNode, data: { name: 'Palace core', type: 'center' } });

    wingNames.forEach((wing, i) => {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      createLink([0, 0, 0], [x, 0, z], CONFIG.accent.linkWing, 0.22, {
        fromId: null,
        toId: `wing:${wing}`,
        baseOpacity: 0.22,
      });
    });

    tweenCamera(new THREE.Vector3(0, 36, 88), new THREE.Vector3(0, 0, 0));
  }

  /** Single-wing focus: wing at center, rooms in orbit. */
  function renderRoomsViewFocused(focusWing) {
    const rooms = roomsData[focusWing] || [];
    const wingSize = CONFIG.nodeSizes.wingMin + 1.2;
    createWingNode(focusWing, 0, 0, 0, wingSize);
    addLabelForNode(`wing:${focusWing}`, focusWing, 0, 0, 0, '#e2e8f0');

    const roomRadius = CONFIG.spacing.roomRadius;
    const n = Math.max(rooms.length, 1);
    const step = (Math.PI * 2) / n;

    rooms.forEach((room, i) => {
      const ang = i * step;
      const rx = Math.cos(ang) * roomRadius;
      const rz = Math.sin(ang) * roomRadius;
      const size = THREE.MathUtils.mapLinear(room.drawers || 1, 1, 80, CONFIG.nodeSizes.roomMin, CONFIG.nodeSizes.roomMax);
      createRoomNode(room.name, focusWing, rx, 0, rz, size);
      createLink([0, 0, 0], [rx, 0, rz], CONFIG.accent.linkWing, 0.22, {
        fromId: `wing:${focusWing}`,
        toId: `room:${focusWing}:${room.name}`,
        baseOpacity: 0.22,
      });
      addLabelForNode(`room:${focusWing}:${room.name}`, room.name, rx, 0, rz, '#94a3b8');
    });

    tweenCamera(new THREE.Vector3(0, 38, 72), new THREE.Vector3(0, 0, 0));
  }

  function renderRoomsViewAll() {
    const wingNames = Object.keys(roomsData);
    if (!wingNames.length) return;

    const wingAngleStep = (Math.PI * 2) / wingNames.length;
    const wingRadius = CONFIG.spacing.wingSeparation / 2;

    wingNames.forEach((wing, wingIdx) => {
      const wingAngle = wingIdx * wingAngleStep;
      const wingX = Math.cos(wingAngle) * wingRadius;
      const wingZ = Math.sin(wingAngle) * wingRadius;

      createWingNode(wing, wingX, 0, wingZ, CONFIG.nodeSizes.wingMin);
      addLabelForNode(`wing:${wing}`, wing, wingX, 0, wingZ, '#cbd5e1');

      const rooms = roomsData[wing] || [];
      const roomAngleStep = (Math.PI * 2) / Math.max(rooms.length, 1);
      const roomRadius = CONFIG.spacing.roomRadius;

      rooms.forEach((room, roomIdx) => {
        const roomAngle = wingAngle + roomIdx * roomAngleStep;
        const roomX = wingX + Math.cos(roomAngle) * roomRadius;
        const roomZ = wingZ + Math.sin(roomAngle) * roomRadius;
        const size = THREE.MathUtils.mapLinear(room.drawers || 1, 1, 80, CONFIG.nodeSizes.roomMin, CONFIG.nodeSizes.roomMax);
        createRoomNode(room.name, wing, roomX, 0, roomZ, size);
        createLink([wingX, 0, wingZ], [roomX, 0, roomZ], CONFIG.accent.linkWing, 0.18, {
          fromId: `wing:${wing}`,
          toId: `room:${wing}:${room.name}`,
          baseOpacity: 0.18,
        });
        addLabelForNode(`room:${wing}:${room.name}`, room.name, roomX, 0, roomZ, '#94a3b8');
      });
    });

    const centerGeometry = new THREE.SphereGeometry(1.1, 20, 20);
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.accent.center,
      emissive: 0x334155,
      emissiveIntensity: 0.35,
      metalness: 0.25,
      roughness: 0.45,
      transparent: true,
      opacity: 0.5,
    });
    const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerNode);
    nodes.push({ mesh: centerNode, data: { name: 'Palace core', type: 'center' } });

    wingNames.forEach((wing, i) => {
      const angle = i * wingAngleStep;
      createLink([0, 0, 0], [Math.cos(angle) * wingRadius, 0, Math.sin(angle) * wingRadius], CONFIG.accent.linkWing, 0.2, {
        baseOpacity: 0.2,
      });
    });

    tweenCamera(new THREE.Vector3(0, 52, 102), new THREE.Vector3(0, 0, 0));
  }

  function renderRoomsView() {
    if (roomsFocusWing && roomsData[roomsFocusWing]) {
      renderRoomsViewFocused(roomsFocusWing);
    } else {
      renderRoomsViewAll();
    }
  }

  function simulateForceLayout(nodeList, edges, iterations = 55) {
    const repelStrength = 95;
    const attractStrength = 0.012;
    const centerStrength = 0.006;

    for (let iter = 0; iter < iterations; iter += 1) {
      for (let i = 0; i < nodeList.length; i += 1) {
        for (let j = i + 1; j < nodeList.length; j += 1) {
          const dx = nodeList[i].x - nodeList[j].x;
          const dy = nodeList[i].y - nodeList[j].y;
          const dz = nodeList[i].z - nodeList[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
          const force = repelStrength / (dist * dist);

          nodeList[i].x += dx * force;
          nodeList[i].y += dy * force;
          nodeList[i].z += dz * force;
          nodeList[j].x -= dx * force;
          nodeList[j].y -= dy * force;
          nodeList[j].z -= dz * force;
        }
      }

      edges.forEach((edge) => {
        const from = findRoomNodeForEdge(nodeList, edge, 'from');
        const to = findRoomNodeForEdge(nodeList, edge, 'to');
        if (from && to) {
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const dz = to.z - from.z;
          from.x += dx * attractStrength;
          from.y += dy * attractStrength;
          from.z += dz * attractStrength;
          to.x -= dx * attractStrength;
          to.y -= dy * attractStrength;
          to.z -= dz * attractStrength;
        }
      });

      nodeList.forEach((node) => {
        node.x *= 1 - centerStrength;
        node.y *= 1 - centerStrength;
        node.z *= 1 - centerStrength;
      });
    }
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

    const labelBudget = prefersReducedMotion ? 120 : 220;
    const hideLabels = nodeList.length > labelBudget;

    simulateForceLayout(nodeList, graphEdges);

    nodeList.forEach((nodeData) => {
      const isWing = nodeData.type === 'wing';
      const size = isWing ? CONFIG.nodeSizes.wingMin + 0.4 : CONFIG.nodeSizes.roomMin + 0.2;
      if (isWing) {
        createWingNode(nodeData.name, nodeData.x, nodeData.y, nodeData.z, size);
        if (!hideLabels) addLabelForNode(`wing:${nodeData.name}`, nodeData.name, nodeData.x, nodeData.y, nodeData.z, '#cbd5e1');
      } else {
        createRoomNode(nodeData.name, nodeData.wing, nodeData.x, nodeData.y, nodeData.z, size);
        if (!hideLabels)
          addLabelForNode(
            `room:${nodeData.wing}:${nodeData.name}`,
            nodeData.name,
            nodeData.x,
            nodeData.y,
            nodeData.z,
            '#94a3b8',
          );
      }
    });

    graphEdges.forEach((edge) => {
      const fromNode = findRoomNodeForEdge(nodeList, edge, 'from');
      const toNode = findRoomNodeForEdge(nodeList, edge, 'to');
      if (fromNode && toNode) {
        const fid = fromNode.type === 'wing' ? `wing:${fromNode.name}` : `room:${fromNode.wing}:${fromNode.name}`;
        const tid = toNode.type === 'wing' ? `wing:${toNode.name}` : `room:${toNode.wing}:${toNode.name}`;
        createLink(
          [fromNode.x, fromNode.y, fromNode.z],
          [toNode.x, toNode.y, toNode.z],
          CONFIG.accent.linkGraph,
          0.38,
          { fromId: fid, toId: tid, baseOpacity: 0.38 },
        );
      }
    });

    tweenCamera(new THREE.Vector3(28, 42, 76), new THREE.Vector3(0, 0, 0));
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
    hoveredMesh = null;
    presentation.hoveredId = null;
    renderer.domElement.style.cursor = 'default';
    syncVisualPresentation();
    callbacks.onHover(null, { x: 0, y: 0 });
  }

  function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const meshes = nodes.map((n) => n.mesh).filter(Boolean);
    const intersects = raycaster.intersectObjects(meshes, true);

    for (let i = 0; i < intersects.length; i += 1) {
      let obj = intersects[i].object;
      while (obj && !obj.userData?.type) obj = obj.parent;
      if (obj && obj.userData?.type && obj.userData.type !== 'center') {
        const hid = obj.userData.id || null;
        const hoverChanged = hoveredMesh !== obj || presentation.hoveredId !== hid;
        hoveredMesh = obj;
        presentation.hoveredId = hid;
        renderer.domElement.style.cursor = 'pointer';
        if (hoverChanged) syncVisualPresentation();
        callbacks.onHover({ ...obj.userData }, { x: event.clientX, y: event.clientY });
        return;
      }
    }
    const wasHovering = presentation.hoveredId != null;
    hoveredMesh = null;
    presentation.hoveredId = null;
    renderer.domElement.style.cursor = 'default';
    if (wasHovering) syncVisualPresentation();
    callbacks.onHover(null, { x: event.clientX, y: event.clientY });
  }

  function onPointerClick() {
    if (!hoveredMesh) {
      callbacks.onClick(null);
      return;
    }
    const data = { ...hoveredMesh.userData };
    callbacks.onClick(data);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();

    const t = Date.now() * 0.001;
    const bob = prefersReducedMotion ? 0 : 0.42 * motionIntensity;
    const rot = prefersReducedMotion ? 0 : 0.006 * motionIntensity;

    nodes.forEach((node, i) => {
      if (!node.data || node.data.type === 'center') return;
      const offset = i * 0.37;
      const base = node.mesh.userData._baseY ?? 0;
      node.mesh.position.y = base + Math.sin(t * 0.9 + offset) * bob;
      node.mesh.rotation.y += rot;
    });

    renderer.render(scene, camera);
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f18);
    scene.fog = new THREE.FogExp2(0x0b0f18, 0.0026);

    camera = new THREE.PerspectiveCamera(58, container.clientWidth / container.clientHeight, 0.1, 1200);
    camera.position.set(0, 34, 90);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.maxPolarAngle = Math.PI * 0.495;

    const hemi = new THREE.HemisphereLight(0x64748b, 0x0f172a, 0.85);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xa5b4fc, 1.1);
    key.position.set(20, 40, 24);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x38bdf8, 0.35);
    fill.position.set(-24, 12, -18);
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
    renderer.domElement.addEventListener('click', onPointerClick);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    animate();
  }

  function resize() {
    if (!camera || !renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function setData(payload) {
    wingsData = payload.wingsData || {};
    roomsData = payload.roomsData || {};
    graphEdges = payload.graphEdges || [];
  }

  function resetCamera() {
    tweenCamera(new THREE.Vector3(0, 34, 90), new THREE.Vector3(0, 0, 0));
  }

  function centerOnNodeId(nodeId) {
    const entry = nodeRegistry.get(nodeId);
    if (!entry) return;
    const p = new THREE.Vector3();
    entry.mesh.getWorldPosition(p);
    const dir = camera.position.clone().sub(p).normalize();
    const dist = currentView === 'rooms' && roomsFocusWing ? 26 : 30;
    tweenCamera(p.clone().add(dir.multiplyScalar(dist)), p);
  }

  function centerOnHovered() {
    if (!hoveredMesh?.userData?.id) return;
    centerOnNodeId(hoveredMesh.userData.id);
  }

  function updatePresentation(patch) {
    const next = { ...presentation, ...patch };
    if (presentationEqual(presentation, next)) return;
    presentation = next;
    syncVisualPresentation();
  }

  function clearPin() {
    presentation.selectedId = null;
    syncVisualPresentation();
  }

  function dispose() {
    cancelAnimationFrame(animationId);
    if (cameraTween) cancelAnimationFrame(cameraTween);
    window.removeEventListener('resize', resize);
    if (renderer?.domElement) {
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onPointerClick);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
    }
    clearSceneContent();
    if (stars) {
      scene.remove(stars);
      stars.geometry.dispose();
      stars.material.dispose();
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
    clearPin,
    resize,
    dispose,
    getView: () => currentView,
    getFocusWing: () => roomsFocusWing,
    getHovered: () => (hoveredMesh ? { ...hoveredMesh.userData } : null),
    setCallbacks(c) {
      Object.assign(callbacks, c);
    },
  };
}
