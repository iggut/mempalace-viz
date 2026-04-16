import { THREE, OrbitControls } from './three-runtime.js';

const API = '';
const SELF_STATE_COLORS = {
  builder: 0x4488ff,
  professional: 0x44ddff,
  founder: 0xffaa00,
  student: 0x44ff88,
  creative: 0xaa44ff,
  family: 0xff8844,
  personal: 0xff44aa,
  general: 0x8888aa,
};
const RELATION_COLORS = {
  mentions: 0x86efac,
  co_occurred: 0x8ca4ff,
  temporal_cluster: 0xf4c878,
  contradicts: 0xff4466,
};

let scene, camera, renderer, controls, raycaster, pointer;
let cameraTween = null;
let graphGroup, starfield;
let hoveredNode = null;
let selectedNode = null;
let nodes = [];
let links = [];
let nodeMap = {};
let sceneData = { crystals: [], entities: [], relations: [], last_scene: null };
let currentMode = 'constellation';
let showLinks = true;
let showLabels = true;
let autoRotate = false;
let graphSpread = 230;
let focusedIds = new Set();
let pinnedIds = new Set();
let activeActorFilters = new Set();
let activeWingFilters = new Set();
let activeRoomFilters = new Set();
let isolateFocus = false;
let expansionDepth = 1;
let timelineMode = false;
let panelDrag = null; let frameCount = 0;
let collapsedPanels = new Set();
let activeScene = null;
let activeSceneNodeIds = new Set();
let activeSceneLinkKeys = new Set();
let availableScope = { wings: [], actors: [] };
let selectedScopeWings = new Set();

class NodeManager {
    constructor() {
        this.activeNodes = new Map();
        this.inactiveNodes = new Set();
        this.cache = new Map();
    }

    updateGC() {
        const cameraFrustum = new THREE.Frustum();
        cameraFrustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

        // Remove nodes that left the frustum
        this.activeNodes.forEach((node, id) => {
            if (node.kind === 'crystal' && !_nodeInFrustum(node, cameraFrustum)) {
                this.invalidateNode(node);
            }
        });

        // Revive nodes that re-entered the frustum
        this.inactiveNodes.forEach((id) => {
            const cached = this.cache.get(id);
            if (cached) {
                const mockPos = new THREE.Vector3(cached.baseX, cached.baseY, cached.baseZ);
                const sphere = new THREE.Sphere(mockPos, cached.radius || 5);
                if (cameraFrustum.intersectsSphere(sphere)) {
                    this.reviveNode(id);
                }
            }
        });
    }

    invalidateNode(node) {
        this.activeNodes.delete(node.id);
        this.inactiveNodes.add(node.id);

        // Remove from global nodeMap and nodes array
        const globalIndex = nodes.findIndex(n => n.id === node.id);
        if (globalIndex !== -1) {
            nodes.splice(globalIndex, 1);
        }
        delete nodeMap[node.id];

        // Remove mesh from scene
        if (node.mesh.parent) {
            node.mesh.parent.remove(node.mesh);
        }

        // Remove associated links - lines are purely visual, don't populate links array
        links.forEach((link) => {
            if (link.source === node.id || link.target === node.id) {
                if (link.line && link.line.parent) {
                    link.line.parent.remove(link.line);
                }
                if (link.line) _disposeMesh(link.line);
            }
        });
        links = links.filter(link => link.source !== node.id && link.target !== node.id);

        // Keep data in memory
        this.cache.set(node.id, {
            kind: node.kind,
            data: node.data,
            baseX: node.baseX,
            baseY: node.baseY,
            baseZ: node.baseZ,
            radius: node.radius,
            mesh: node.mesh
        });

        _disposeMesh(node.mesh);
    }

    reviveNode(id) {
        const cached = this.cache.get(id);
        if (!cached) return null;

        this.inactiveNodes.delete(id);

        // Re-create or re-attach the mesh
        const mesh = cached.mesh;
        if (!mesh.parent) {
            graphGroup.add(mesh);
        }

        const nodeObj = {
            id: id,
            rawId: cached.data.id,
            kind: cached.kind,
            data: cached.data,
            label: cached.data.title || cached.data.summary || 'Crystal',
            mesh: mesh,
            baseX: cached.baseX,
            baseY: cached.baseY,
            baseZ: cached.baseZ,
            timelineY: computeTimelineY(cached.data, sceneData.crystals || []),
            wing: cached.data.wing,
            room: cached.data.room,
            actor: cached.data.actor || 'user',
            radius: cached.radius,
            visualType: mesh.geometry.type
        };

        // Restore to global state
        nodeMap[id] = nodeObj;
        nodes.push(nodeObj);
        this.activeNodes.set(id, nodeObj);

        return nodeObj;
    }

    reset() {
        this.activeNodes.clear();
        this.inactiveNodes.clear();
        this.cache.clear();
    }
}

const nodeManager = new NodeManager();

const REQUEST_PRIORITY = {
    CRITICAL: 10,
    HIGH: 7,
    MEDIUM: 3,
    LOW: 1
};

function prioritizeRequest(shape) {
    switch(shape) {
        case 'user.position':
        case 'camera.position':
            return REQUEST_PRIORITY.CRITICAL;
        case 'graph.data':
            return REQUEST_PRIORITY.HIGH;
        case 'mcp.server':
            return REQUEST_PRIORITY.MEDIUM;
        default:
            return REQUEST_PRIORITY.LOW;
    }
}

class SpatialGrid {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    insert(node) {
        const key = this._getKey(node.mesh.position);
        if (!this.grid.has(key)) {
            this.grid.set(key, new Set());
        }
        this.grid.get(key).add(node);
    }

    _getKey(pos) {
        const x = Math.floor(pos.x / this.cellSize);
        const y = Math.floor(pos.y / this.cellSize);
        const z = Math.floor(pos.z / this.cellSize);
        return `${x},${y},${z}`;
    }

    getNearby(position) {
        const nearby = new Set();
        const gx = Math.floor(position.x / this.cellSize);
        const gy = Math.floor(position.y / this.cellSize);
        const gz = Math.floor(position.z / this.cellSize);

        for (let x = gx - 1; x <= gx + 1; x++) {
            for (let y = gy - 1; y <= gy + 1; y++) {
                for (let z = gz - 1; z <= gz + 1; z++) {
                    const key = `${x},${y},${z}`;
                    if (this.grid.has(key)) {
                        this.grid.get(key).forEach(n => nearby.add(n));
                    }
                }
            }
        }
        return nearby;
    }
}

function _disposeMesh(mesh) {
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
        } else {
            mesh.material.dispose();
        }
    }
}

function _nodeInFrustum(node, frustum) {
    if (!node.mesh) return false;
    const sphere = new THREE.Sphere(node.mesh.position, node.radius || 5);
    return frustum.intersectsSphere(sphere);
}

function _calculateFrustum() {
    const frustum = new THREE.Frustum();
    const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(matrix);
    return frustum;
}
let selectedScopeRooms = new Set();
let labelSprites = [];
let labelDensity = 22;
let collapsedSections = new Set();
let initializedSectionCollapse = new Set();
let lastFrameTime = performance.now();

const canvas = document.getElementById('canvas');
const tooltip = document.getElementById('tooltip');
const minimap = document.getElementById('minimap');
const minimapCtx = minimap.getContext('2d');

init();

function toUnixSeconds(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.floor(value));
  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return Math.max(0, Math.floor(numeric));
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return Math.floor(parsed / 1000);
  }
  return fallback;
}

function processMemoryEntry(entry, index = 0) {
  if (!entry || typeof entry !== 'object') {
    console.warn('Invalid memory entry detected, skipping:', entry);
    return null;
  }

  const content = String(entry.content || entry.summary || entry.text || entry.title || '').trim();
  if (!content) {
    console.warn('Incomplete memory entry detected, missing content:', entry);
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const createdAt = toUnixSeconds(entry.created_at, now);
  const updatedAt = toUnixSeconds(entry.updated_at, createdAt);
  const numericId = Number(entry.id);
  const importance = Number(entry.importance_score);

  return {
    ...entry,
    id: Number.isFinite(numericId) && numericId > 0 ? Math.floor(numericId) : (createdAt + index + 1),
    content,
    title: String(entry.title || '').trim() || content.slice(0, 72),
    summary: String(entry.summary || '').trim() || content,
    text: String(entry.text || '').trim() || content,
    importance_score: Number.isFinite(importance) ? importance : 0,
    created_at: createdAt,
    updated_at: updatedAt,
    actor: entry.actor || 'user',
    wing: entry.wing || 'general',
    room: entry.room || 'memories',
    entities: Array.isArray(entry.entities) ? entry.entities.filter(Boolean) : [],
    self_state: entry.self_state || entry.wing || 'general',
  };
}

function normalizeSceneData(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};
  const crystals = (Array.isArray(source.crystals) ? source.crystals : [])
    .map((entry, index) => processMemoryEntry(entry, index))
    .filter(Boolean);
  const entities = (Array.isArray(source.entities) ? source.entities : [])
    .filter(entity => entity && typeof entity === 'object');
  const relations = (Array.isArray(source.relations) ? source.relations : [])
    .filter(relation => relation && typeof relation === 'object');

  return {
    ...source,
    crystals,
    entities,
    relations,
    wings: Array.isArray(source.wings) ? source.wings : [],
    last_scene: source.last_scene && typeof source.last_scene === 'object'
      ? {
          ...source.last_scene,
          crystals: (Array.isArray(source.last_scene.crystals) ? source.last_scene.crystals : [])
            .map((entry, index) => processMemoryEntry(entry, index))
            .filter(Boolean),
          entities: Array.isArray(source.last_scene.entities) ? source.last_scene.entities.filter(Boolean) : [],
        }
      : null,
  };
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05060b);
  scene.fog = new THREE.FogExp2(0x05060b, 0.0035);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 120, 260);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 4;
  controls.maxDistance = 2400;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 0.12;
  controls.target.set(0, 0, 0);
  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
  controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  graphGroup = new THREE.Group();
  scene.add(graphGroup);

  scene.add(new THREE.AmbientLight(0x7890aa, 1.35));
  const key = new THREE.PointLight(0x7dd3fc, 2.4, 1800);
  key.position.set(220, 260, 180);
  scene.add(key);
  const fill = new THREE.PointLight(0xc4b5fd, 1.6, 1400);
  fill.position.set(-240, -80, -140);
  scene.add(fill);

  createStarfield();
  setupUI();
  window.addEventListener('resize', onResize);
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('click', onClick);
  loadGraph();
  animate();
}

function createStarfield() {
  const geo = new THREE.BufferGeometry();
  const count = 3200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 2400;
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ size: 1.5, color: 0x5577aa, transparent: true, opacity: 0.7, sizeAttenuation: true });
  starfield = new THREE.Points(geo, mat);
  scene.add(starfield);
}

async function loadGraph(query) {
  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    selectedScopeWings.forEach(wing => params.append('wing', wing));
    selectedScopeRooms.forEach(room => params.append('room', room));
    const url = '/api/graph' + (params.toString() ? ('?' + params.toString()) : '');
    const response = await fetch(url);
    sceneData = normalizeSceneData(await response.json());
    buildGraph(sceneData);
    renderFilterChips();
    if (sceneData.last_scene) applyScene(sceneData.last_scene, { preserveSelection: true });
    else clearScene();
  } catch (error) {
    addMessage('system', 'Could not load graph: ' + error.message);
  }
}

async function loadScopeOverview() {
  try {
    const response = await fetch('/api/scope');
    availableScope = await response.json();
    renderScopeChips();
  } catch (error) {
    console.warn('scope load failed', error);
  }
}

let _buildId = 0;

function buildGraph(data) {
  clearGraph();
  _buildId++;
  const currentBuildId = _buildId;
  const { wings = [], crystals = [], entities = [], relations = [] } = data;
  const wingNodes = {};
  const roomNodes = {};

  // 1. Create Core
  const centerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 2), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5, wireframe: true }));
  centerMesh.userData = { id: 'palace:center', kind: 'palace', label: 'MemPalace Core' };
  graphGroup.add(centerMesh);
  nodeMap[centerMesh.userData.id] = { id: centerMesh.userData.id, kind: 'palace', label: 'MemPalace Core', mesh: centerMesh, radius: 15 };
  nodes.push(nodeMap[centerMesh.userData.id]);

  // 2. Create Wings
  const wingList = wings.length ? wings.map(w => w.name || w) : Array.from(new Set(crystals.map(c => c.wing || 'general')));
  wingList.forEach((wingName, i) => {
    const angle = (i / Math.max(wingList.length, 1)) * Math.PI * 2, radius = graphSpread * (0.6 + (i % 3) * 0.1);
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius, y = (i - (wingList.length - 1) / 2) * 50;
    const color = SELF_STATE_COLORS[wingName] || 0xbbccff;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(14, 32, 32), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.7 }));
    mesh.position.set(x, y, z);
    mesh.userData = { id: 'wing:' + wingName, kind: 'wing', label: 'Wing: ' + wingName, wing: wingName };
    graphGroup.add(mesh);
    wingNodes[wingName] = { id: mesh.userData.id, kind: 'wing', label: mesh.userData.label, mesh, baseX: x, baseY: y, baseZ: z, wing: wingName, radius: 14 };
    nodes.push(wingNodes[wingName]);
    nodeMap[mesh.userData.id] = wingNodes[wingName];
    graphGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), mesh.position]), new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.2 })));
  });

  // 3. Create Rooms
  const roomsByWing = {};
  crystals.forEach(c => {
    const w = c.wing || 'general', r = c.room || 'memories';
    if (!roomsByWing[w]) roomsByWing[w] = new Set();
    roomsByWing[w].add(r);
  });
  Object.entries(roomsByWing).forEach(([wingName, roomsSet]) => {
    const wingNode = wingNodes[wingName];
    if (!wingNode) return;
    const rooms = Array.from(roomsSet);
    rooms.forEach((roomName, ri) => {
      const angle = (ri / Math.max(rooms.length, 1)) * Math.PI * 2, radius = 60 + (ri % 2) * 20;
      const x = wingNode.baseX + Math.cos(angle) * radius, z = wingNode.baseZ + Math.sin(angle) * radius, y = wingNode.baseY + Math.sin(ri) * 20;
      const color = wingNode.mesh.material.color.getHex();
      const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(8, 0), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2, transparent: true, opacity: 0.8 }));
      mesh.position.set(x, y, z);
      mesh.userData = { id: `room:${wingName}:${roomName}`, kind: 'room', label: 'Room: ' + roomName, wing: wingName, room: roomName };
      graphGroup.add(mesh);
      roomNodes[`${wingName}:${roomName}`] = { id: mesh.userData.id, kind: 'room', label: mesh.userData.label, mesh, baseX: x, baseY: y, baseZ: z, wing: wingName, room: roomName, radius: 8 };
      nodes.push(roomNodes[`${wingName}:${roomName}`]);
      nodeMap[mesh.userData.id] = roomNodes[`${wingName}:${roomName}`];
      graphGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([wingNode.mesh.position, mesh.position]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })));
    });
  });

  // 4. Lazy Load Crystals (in chunks)
  const CHUNK_SIZE = 40;
  const frustum = _calculateFrustum();

  const loadCrystalsChunk = (startIndex, buildId) => {
    if (buildId !== _buildId) return; // Early return if stale build

    const chunk = crystals.slice(startIndex, startIndex + CHUNK_SIZE);
    chunk.forEach((crystal, idx) => {
      if (buildId !== _buildId) return; // Check again before mutating state

      const ci = startIndex + idx;
      const roomKey = `${crystal.wing || "general"}:${crystal.room || "memories"}`;
      const roomNode = roomNodes[roomKey];
      if (!roomNode) return;

      const normalized = Math.max(0, Math.min(1, ((crystal.importance_score || 0) + 0.5) / 1.6));
      const angle = (ci / Math.max(crystals.length, 1)) * Math.PI * 2, radius = 25 + normalized * 15 + (ci % 3) * 5;
      const x = roomNode.baseX + Math.cos(angle) * radius, z = roomNode.baseZ + Math.sin(angle) * radius, y = roomNode.baseY + (normalized - 0.5) * 40 + Math.sin(ci * 1.5) * 10;
      const nodeRadius = 3.2 + normalized * 5.4 + ((crystal.entities || []).length * 0.12);

      // Frustum check for lazy loading
      const mockPos = new THREE.Vector3(x, timelineMode ? computeTimelineY(crystal, crystals) : y, z);
      const isVisible = frustum.containsPoint(mockPos);

      if (!isVisible && crystals.length > 100) {
        // Just store in cache if too many crystals and not visible
        nodeManager.cache.set('crystal:' + crystal.id, {
            id: 'crystal:' + crystal.id,
            kind: 'crystal',
            data: crystal,
            baseX: x, baseY: y, baseZ: z,
            radius: nodeRadius
        });
        return;
      }

      const color = crystal.actor === 'jupiter' ? 0xc4b5fd : crystal.actor === 'system' ? 0xf9a8d4 : crystal.actor === 'assistant' ? 0x93c5fd : (SELF_STATE_COLORS[crystal.self_state] || 0x7dd3fc);
      const mesh = new THREE.Mesh(pickCrystalGeometry(crystal, nodeRadius, ci), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.45 + normalized * 0.85, roughness: 0.24, metalness: 0.18, transparent: true, opacity: 0.92 }));
      mesh.position.copy(mockPos);
      mesh.userData = { id: 'crystal:' + crystal.id, kind: 'crystal', data: crystal, label: crystal.title || crystal.summary || ('Crystal #' + crystal.id) };
      graphGroup.add(mesh);

      const nodeObj = { id: mesh.userData.id, rawId: crystal.id, kind: 'crystal', data: crystal, label: mesh.userData.label, mesh, baseX: x, baseY: y, baseZ: z, timelineY: computeTimelineY(crystal, crystals), wing: crystal.wing, room: crystal.room, actor: crystal.actor || 'user', radius: nodeRadius, visualType: mesh.geometry.type };
      nodeMap[mesh.userData.id] = nodeObj;
      nodes.push(nodeObj);
      nodeManager.activeNodes.set(nodeObj.id, nodeObj);

      const roomToCrystalLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([roomNode.mesh.position, mesh.position]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 }));
      graphGroup.add(roomToCrystalLine);
      // Lines are purely visual - keep the line geometry but don't populate the links array for structural links
    });

    if (startIndex + CHUNK_SIZE < crystals.length) {
      requestAnimationFrame(() => loadCrystalsChunk(startIndex + CHUNK_SIZE, buildId));
    } else {
        if (buildId !== _buildId) return; // Final check before finalization

        // Build relations after all crystals are materialized
        buildRelations(relations, currentBuildId);

        // Finalize after all crystals (including those that might be revived later)
        resolveNodeCollisions();
        applyVisibilityMode();
        fitCameraToGraph();
        updateStats();
        drawMinimap();
    }
  };

  // 5. Create Entities
  entities.forEach((entity, index) => {
    const angle = (index / Math.max(entities.length, 1)) * Math.PI * 2, radiusOrbit = graphSpread * 0.35 + (index % 7) * 10;
    const x = Math.cos(angle) * radiusOrbit, z = Math.sin(angle) * radiusOrbit, y = ((index % 9) - 4) * 16, radius = 2.4 + Math.max(0.1, Math.min(1, entity.salience || 0.3)) * 4.2;
    const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(radius, 2), new THREE.MeshStandardMaterial({ color: 0x86efac, emissive: 0x86efac, emissiveIntensity: 0.8, roughness: 0.1, metalness: 0.5, transparent: true, opacity: 0.9 }));
    mesh.position.set(x, y, z);
    mesh.userData = { id: 'entity:' + entity.id, kind: 'entity', data: entity, label: entity.name };
    graphGroup.add(mesh);
    mesh.add(new THREE.Mesh(new THREE.SphereGeometry(radius * 1.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0x86efac, transparent: true, opacity: 0.1 })));
    nodeMap[mesh.userData.id] = { id: mesh.userData.id, rawId: entity.id, kind: 'entity', data: entity, label: entity.name, mesh, baseX: x, baseY: y, baseZ: z, radius, visualType: mesh.geometry.type };
    nodes.push(nodeMap[mesh.userData.id]);
  });

  // 6. Relations will be built after crystals are loaded (see buildRelations function)

  // Start chunked loading
  if (crystals.length > 0) {
      loadCrystalsChunk(0, currentBuildId);
  } else {
      buildRelations(relations, currentBuildId);
      resolveNodeCollisions();
      applyVisibilityMode();
      fitCameraToGraph();
      updateStats();
      drawMinimap();
  }
}

function buildRelations(relations, buildId) {
  if (buildId !== _buildId) return; // Prevent stale builds from creating relations

  relations.forEach(relation => {
    if (buildId !== _buildId) return; // Check again in loop

    const source = nodeMap[relation.source_type + ':' + relation.source_id], target = nodeMap[relation.target_type + ':' + relation.target_id];
    if (!source || !target) return;
    const color = RELATION_COLORS[relation.relation] || 0x8ca4ff;
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([source.mesh.position.clone(), target.mesh.position.clone()]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 + Math.min(0.3, (relation.weight || 0.5) * 0.22) }));
    line.userData = { key: source.id + '->' + target.id, relation: relation.relation };
    graphGroup.add(line);
    links.push({ key: line.userData.key, source: source.id, target: target.id, relation: relation.relation, weight: relation.weight || 0.5, line, phase: (Math.abs(relation.source_id + relation.target_id) % 100) / 100 });
  });
}

function pickCrystalGeometry(crystal, radius, index) {
  if (crystal.actor === 'jupiter') return new THREE.IcosahedronGeometry(radius * 1.02, 1);
  if (crystal.actor === 'system') return new THREE.OctahedronGeometry(radius * 1.06, 1);
  if ((crystal.entities || []).length >= 4) return new THREE.TorusKnotGeometry(radius * 0.6, radius * 0.2, 32, 8);
  return index % 3 === 0 ? new THREE.SphereGeometry(radius, 18, 14) : new THREE.IcosahedronGeometry(radius, 0);
}

function separationOffset(seed, axis = 0) {
  return Math.sin((seed + 1) * (axis * 17.13 + 11.73)) * 0.5;
}

function resolveNodeCollisions() {
  if (nodes.length < 2) return;

  const startTime = performance.now();
  const MAX_TIME = 16; // Max 16ms for collision resolution per frame

  for (let pass = 0; pass < 3; pass++) {
    let moved = false;
    const grid = new SpatialGrid(50);
    nodes.forEach(node => grid.insert(node));

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const nearby = grid.getNearby(a.mesh.position);

      nearby.forEach(b => {
        if (a === b) return;
        const dx = b.mesh.position.x - a.mesh.position.x;
        const dy = b.mesh.position.y - a.mesh.position.y;
        const dz = b.mesh.position.z - a.mesh.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;
        const minDistance = (a.radius || 3) + (b.radius || 3) + (a.kind === b.kind ? 3.2 : 4.6);

        if (distance < minDistance) {
          const push = (minDistance - distance) * 0.5;
          const nx = dx / distance;
          const ny = dy / distance;
          const nz = dz / distance;

          a.mesh.position.x -= nx * push;
          a.mesh.position.y -= ny * push * 0.65;
          a.mesh.position.z -= nz * push;
          b.mesh.position.x += nx * push;
          b.mesh.position.y += ny * push * 0.65;
          b.mesh.position.z += nz * push;
          moved = true;
        }
      });

      if (performance.now() - startTime > MAX_TIME) break;
    }
    if (!moved || performance.now() - startTime > MAX_TIME) break;
  }

  nodes.forEach((node) => {
    node.baseX = node.mesh.position.x;
    if (!timelineMode) node.baseY = node.mesh.position.y;
    node.baseZ = node.mesh.position.z;
  });
}

function computeTimelineY(crystal, crystals) {
  const times = crystals.map(c => c.created_at || 0).filter(Boolean);
  if (!times.length || !crystal.created_at) return crystal.baseY || 0;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  if (maxTime <= minTime) return crystal.baseY || 0;
  const ratio = (crystal.created_at - minTime) / (maxTime - minTime);
  return (ratio - 0.5) * 320;
}

function clearGraph() {
  labelSprites.forEach(sprite => graphGroup.remove(sprite));
  labelSprites = [];
  while (graphGroup.children.length) {
    const child = graphGroup.children[0];
    graphGroup.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  }
  nodes = [];
  links = [];
  nodeMap = {};
  hoveredNode = null;
  selectedNode = null;
  nodeManager.reset();
}

function passesFilters(node) {
  if (node.kind !== 'crystal') return currentMode !== 'crystals' || false;
  if (currentMode === 'entities') return false;
  if (activeActorFilters.size && !activeActorFilters.has(node.actor || 'user')) return false;
  if (activeWingFilters.size && !activeWingFilters.has(node.wing || 'general')) return false;
  if (activeRoomFilters.size && !activeRoomFilters.has(node.room || 'memories')) return false;
  return true;
}

function applyVisibilityMode() {
  nodes.forEach(node => {
    let visible = true;
    if (currentMode === 'crystals') visible = node.kind === 'crystal' && passesFilters(node);
    else if (currentMode === 'entities') visible = node.kind === 'entity';
    else visible = node.kind === 'entity' ? true : passesFilters(node);
    if (isolateFocus && selectedNode && focusedIds.size && !focusedIds.has(node.id) && !pinnedIds.has(node.id)) visible = false;
    node.mesh.visible = visible;
  });
  links.forEach(link => {
    const source = nodeMap[link.source];
    const target = nodeMap[link.target];
    link.line.visible = showLinks && source && target && source.mesh.visible && target.mesh.visible;
    if (link.line.visible) {
      link.line.geometry.setFromPoints([source.mesh.position, target.mesh.position]);
    }
  });
  syncLabels();
  updateStats();
}

function fitCameraToGraph() {
  const box = new THREE.Box3().setFromObject(graphGroup);
  if (!isFinite(box.min.x)) return;
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();
  controls.target.copy(center);
  camera.position.copy(center.clone().add(new THREE.Vector3(size * 0.35, size * 0.22, size * 0.5)));
  controls.update();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh), false);
  if (intersects.length) {
    hoveredNode = nodes.find(n => n.mesh === intersects[0].object) || null;
    renderer.domElement.style.cursor = 'pointer';
    showTooltip(event, hoveredNode);
  } else {
    hoveredNode = null;
    renderer.domElement.style.cursor = 'default';
    tooltip.style.display = 'none';
  }
}

function showTooltip(event, node) {
  if (!node) return;
  tooltip.style.display = 'block';
  tooltip.style.left = (event.clientX + 16) + 'px';
  tooltip.style.top = (event.clientY - 10) + 'px';
  if (node.kind === 'crystal') {
    tooltip.innerHTML = '<div class="tooltip-title">' + escapeHtml(node.label) + '</div><div>' + escapeHtml((node.data.summary || node.data.text || '').slice(0, 140)) + '</div>';
  } else {
    tooltip.innerHTML = '<div class="tooltip-title">' + escapeHtml(node.label) + '</div><div>Entity node bridging related crystals.</div>';
  }
}

function onClick(event) {
  if (!hoveredNode) return;
  selectNode(hoveredNode, { pin: !!event?.shiftKey });
}

function selectNode(node, options = {}) {
  selectedNode = node;
  if (options.pin) pinnedIds.add(node.id);

  if (node.kind === 'wing') {
    selectedScopeWings.clear();
    selectedScopeWings.add(node.wing);
    loadGraph().then(() => {
      updateSceneBanner('Wing focus', node.wing);
      setOrbitDistance(120, node.mesh.position.clone());
    });
  } else if (node.kind === 'room') {
    selectedScopeWings.clear();
    selectedScopeWings.add(node.wing);
    selectedScopeRooms.clear();
    selectedScopeRooms.add(node.room);
    loadGraph().then(() => {
      updateSceneBanner('Room focus', node.wing + ' • ' + node.room);
      setOrbitDistance(60, node.mesh.position.clone());
    });
  } else {
    focusedIds = computeNeighborhood(node.id, expansionDepth);
    pinnedIds.forEach(id => focusedIds.add(id));
    renderInspector(node);
    updateSceneBanner(node.kind === 'crystal' ? 'Crystal focus' : 'Entity focus', trimLabel(node.label, 56) + ' • ' + expansionDepth + ' hop');
    if (node.kind === 'entity') setOrbitDistance(34, node.mesh.position.clone());
    else setOrbitDistance(isolateFocus ? 18 : 28, node.mesh.position.clone());
  }
  controls.target.copy(node.mesh.position);
  applyVisibilityMode();
}

function setOrbitDistance(distance, focusPoint) {
  const focus = focusPoint || controls.target;
  const dir = camera.position.clone().sub(focus).normalize();
  const targetPos = focus.clone().add(dir.multiplyScalar(distance));
  tweenCamera(targetPos, focus.clone());
}

function computeNeighborhood(startId, depth) {
  const visited = new Set([startId]);
  let frontier = [startId];
  for (let step = 0; step < depth; step++) {
    const next = [];
    frontier.forEach(id => {
      links.forEach(link => {
        let neighbor = null;
        if (link.source === id) neighbor = link.target;
        else if (link.target === id) neighbor = link.source;
        if (neighbor && !visited.has(neighbor)) {
          visited.add(neighbor);
          next.push(neighbor);
        }
      });
    });
    frontier = next;
    if (!frontier.length) break;
  }
  return visited;
}

function clearFocus() {
  selectedNode = null;
  focusedIds = new Set();
  renderInspector(null);
  renderPinTray();
  fitCameraToGraph();
  applyVisibilityMode();
}

function clearScene() {
  activeScene = null;
  activeSceneNodeIds = new Set();
  activeSceneLinkKeys = new Set();
  renderScenePanel();
}

function applyScene(scene, options = {}) {
  clearScene();
  if (!scene) return;
  activeScene = scene;
  const crystals = scene.crystals || [];
  const entities = new Set(scene.entities || []);
  crystals.forEach(crystal => {
    activeSceneNodeIds.add('crystal:' + crystal.id);
    (crystal.entities || []).forEach(entity => entities.add(entity));
  });
  nodes.forEach(node => {
    if (node.kind === 'entity' && entities.has(node.label)) activeSceneNodeIds.add(node.id);
  });
  links.forEach(link => {
    if (activeSceneNodeIds.has(link.source) && activeSceneNodeIds.has(link.target)) activeSceneLinkKeys.add(link.key);
  });
  if (!options.preserveSelection && crystals.length) {
    const first = nodeMap['crystal:' + crystals[0].id];
    if (first) selectNode(first);
  }
  renderScenePanel();
}

function renderScenePanel() {
  const body = document.getElementById('sceneBody');
  if (!body) return;
  if (!activeScene) {
    body.innerHTML = '<div class="inspect-empty">No active recall scene yet.</div>';
    return;
  }
  const crystals = activeScene.crystals || [];
  const entities = activeScene.entities || [];
  const lines = [];
  lines.push('<div class="scene-story"><strong>Scene story</strong><br>' + escapeHtml(buildSceneStory(activeScene)) + '</div>');
  lines.push('<div class="meta-grid" style="margin-top:10px;">' +
    '<div class="meta-card"><div class="meta-label">Crystals</div><div>' + crystals.length + '</div></div>' +
    '<div class="meta-card"><div class="meta-label">Entities</div><div>' + entities.length + '</div></div>' +
  '</div>');
  if (crystals.length) {
    lines.push('<div class="meta-label">Key memories</div>');
    lines.push('<div class="scene-list">' + crystals.slice(0, 4).map(crystal => {
      const title = trimLabel(crystal.title || crystal.summary || 'Memory', 48);
      const meta = [crystal.wing, crystal.room].filter(Boolean).join(' • ');
      const summary = trimLabel(cleanMemoryText(crystal.summary || crystal.text || ''), 120);
      return '<div class="scene-item">' +
        '<div class="scene-item-title">' + escapeHtml(title) + '</div>' +
        '<div class="scene-item-meta">' + escapeHtml(meta) + '</div>' +
        '<div class="scene-item-summary">' + escapeHtml(summary) + '</div>' +
      '</div>';
    }).join('') + '</div>');
  }
  body.innerHTML = lines.join('');
}

function buildSceneStory(scene) {
  const crystals = scene.crystals || [];
  if (!crystals.length) return scene.scene_narrative || 'No active recall scene.';
  const top = crystals[0];
  const wings = Array.from(new Set(crystals.map(crystal => crystal.wing).filter(Boolean)));
  const rooms = Array.from(new Set(crystals.map(crystal => crystal.room).filter(Boolean)));
  const actors = Array.from(new Set(crystals.map(crystal => crystal.actor).filter(Boolean)));
  const lead = trimLabel(top.title || top.summary || 'memory', 72);
  const pieces = ['This scene centers on ' + lead + '.'];
  if (wings.length) pieces.push('It spans ' + wings.join(', ') + '.');
  if (rooms.length <= 3 && rooms.length) pieces.push('Most signals sit in ' + rooms.join(', ') + '.');
  if (actors.length) pieces.push('Voices present: ' + actors.join(', ') + '.');
  return pieces.join(' ');
}

function updateStats() {
  const stats = sceneData.stats || {};
  document.getElementById('statCrystals').textContent = String(stats.crystals || sceneData.crystals.length || 0);
  document.getElementById('statEntities').textContent = String(stats.entities || sceneData.entities.length || 0);
  document.getElementById('statLinks').textContent = String(stats.links || sceneData.relations.length || 0);
  document.getElementById('statWings').textContent = String(stats.wings || new Set((sceneData.crystals || []).map(c => c.wing || 'general')).size);
  document.getElementById('statDrawers').textContent = String((sceneData.crystals || []).length);
}

function makeTextSprite(text, color = '#dbe5ff') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '24px sans-serif';
  const width = Math.ceil(ctx.measureText(text).width) + 24;
  canvas.width = width;
  canvas.height = 48;
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(5,8,16,0.82)';
  ctx.roundRect?.(0, 0, width, 48, 14);
  ctx.fillRect(0, 6, width, 36);
  ctx.fillStyle = color;
  ctx.fillText(text, 12, 31);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(width * 0.18, 8.2, 1);
  return sprite;
}

function syncLabels() {
  labelSprites.forEach(sprite => graphGroup.remove(sprite));
  labelSprites = [];
  if (!showLabels) return;
  const visibleNodes = nodes
    .filter(node => node.mesh.visible)
    .sort((a, b) => ((b.data?.importance_score || b.data?.salience || 0) - (a.data?.importance_score || a.data?.salience || 0)))
    .slice(0, labelDensity);
  visibleNodes.forEach((node) => {
    if (node.kind === 'entity' && !activeSceneNodeIds.has(node.id) && !focusedIds.has(node.id)) return;
    const sprite = makeTextSprite(trimLabel(node.label, node.kind === 'entity' ? 16 : 24), node.kind === 'entity' ? '#b7f5c9' : '#dbe5ff');
    sprite.position.copy(node.mesh.position.clone().add(new THREE.Vector3(0, node.kind === 'entity' ? 5.5 : 8.5, 0)));
    graphGroup.add(sprite);
    labelSprites.push(sprite);
  });
}

function drawMinimap() {
  minimapCtx.clearRect(0, 0, minimap.width, minimap.height);
  minimapCtx.fillStyle = 'rgba(6,8,14,0.92)';
  minimapCtx.fillRect(0, 0, minimap.width, minimap.height);
  const visibleNodes = nodes.filter(n => n.mesh.visible);
  if (!visibleNodes.length) return;
  const xs = visibleNodes.map(n => n.mesh.position.x);
  const zs = visibleNodes.map(n => n.mesh.position.z);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
  const spanX = Math.max(40, maxX - minX);
  const spanZ = Math.max(40, maxZ - minZ);
  visibleNodes.forEach(node => {
    const x = 12 + ((node.mesh.position.x - minX) / spanX) * (minimap.width - 24);
    const y = 12 + ((node.mesh.position.z - minZ) / spanZ) * (minimap.height - 24);
    minimapCtx.fillStyle = node.kind === 'entity' ? 'rgba(134,239,172,0.8)' : 'rgba(125,211,252,0.9)';
    minimapCtx.beginPath();
    minimapCtx.arc(x, y, node.kind === 'entity' ? 2 : 3, 0, Math.PI * 2);
    minimapCtx.fill();
  });
}

function animate() {
  requestAnimationFrame(animate); frameCount++; if (frameCount % 60 === 0) nodeManager.updateGC();
  const now = performance.now();
  const dt = Math.min(0.033, Math.max(0.001, (now - lastFrameTime) / 1000));
  lastFrameTime = now;
  controls.autoRotate = autoRotate;
  controls.update();
  const time = now * 0.001;
  nodes.forEach(node => {
    const isFocused = focusedIds.size && focusedIds.has(node.id);
    const isPinned = pinnedIds.has(node.id);
    const isScene = activeSceneNodeIds.has(node.id);
    const nodeImportance = Number(node.data?.importance_score || 0);
    const baseEmissive = node.kind === 'entity' ? 0.55 : 0.45 + Math.min(0.85, nodeImportance * 0.4);
    const pulse = isScene ? (0.25 + 0.18 * Math.sin(time * 3.2)) : 0;
    const rotationSpeed = node.kind === 'entity' ? 0.18 : 0.09;
    node.mesh.rotation.y += dt * rotationSpeed;
    node.mesh.rotation.x += dt * (node.visualType?.includes('Icosa') ? 0.07 : 0.04);
    node.mesh.material.emissiveIntensity = baseEmissive + pulse + (isFocused || isPinned ? 0.22 : 0);
    const orbitBob = node.kind === 'entity' ? 0.22 : 0.34;
    node.mesh.position.y = (timelineMode ? (node.timelineY ?? node.baseY) : node.baseY) + Math.sin(time * (0.75 + ((node.rawId || 1) % 5) * 0.11) + (node.rawId || 0)) * orbitBob;
    const baseScale = (isScene ? 1.02 + 0.015 * Math.sin(time * 2.1) : 1) + (isFocused ? 0.03 : 0);
    const growthMultiplier = node.growthScale !== undefined ? node.growthScale : 1;
    node.mesh.scale.setScalar(baseScale * growthMultiplier);
  });
  links.forEach(link => {
    if (!link.line.visible) return;
    const source = nodeMap[link.source];
    const target = nodeMap[link.target];
    if (source && target) {
      if (source.mesh.matrixWorldNeedsUpdate || target.mesh.matrixWorldNeedsUpdate || timelineMode) {
        link.line.geometry.setFromPoints([source.mesh.position, target.mesh.position]);
      }
      const strength = Math.max(0.08, Math.min(1, link.weight || 0.3));
      const travel = (time * (0.035 + strength * 0.11) + link.phase) % 1;
      if (link.pulse) {
        const pulseVisible = link.animated && (!focusedIds.size || (focusedIds.has(link.source) && focusedIds.has(link.target)) || activeSceneLinkKeys.has(link.key));
        link.pulse.visible = pulseVisible;
        if (pulseVisible) {
          link.pulse.position.lerpVectors(source.mesh.position, target.mesh.position, travel);
          link.pulse.material.opacity = activeSceneLinkKeys.has(link.key) ? 0.85 : (0.18 + strength * 0.28);
        }
      }
      link.line.material.opacity = activeSceneLinkKeys.has(link.key)
        ? 0.9
        : (focusedIds.size && focusedIds.has(link.source) && focusedIds.has(link.target) ? 0.65 : 0.24);
    }
  });
  drawMinimap();
  renderer.render(scene, camera);
}

function renderInspector(node) {
  const body = document.getElementById('inspectBody');
  if (!node) { body.innerHTML = '<div class="inspect-empty">Click a crystal or entity to inspect it here.</div>'; return; }
  if (node.kind === 'crystal') {
    const crystal = node.data, fullText = crystal.text || crystal.summary || '';
    body.innerHTML = `<div class="inspect-header-large"><strong>${escapeHtml(node.label)}</strong></div><div class="inspect-content-scrollable">${escapeHtml(fullText).replace(/\n/g, '<br>')}</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Actor</div><div>${escapeHtml(crystal.actor || 'user')}</div></div><div class="meta-card"><div class="meta-label">Importance</div><div>${Number(crystal.importance_score || 0).toFixed(3)}</div></div><div class="meta-card"><div class="meta-label">Wing</div><div>${escapeHtml(crystal.wing || 'general')}</div></div><div class="meta-card"><div class="meta-label">Room</div><div>${escapeHtml(crystal.room || 'memories')}</div></div></div>${crystal.created_at ? `<div class="meta-label">Created</div><div class="meta-time">${escapeHtml(new Date(crystal.created_at * 1000).toLocaleString())}</div>` : ''}<div class="meta-label" style="margin-top:10px;">Entities</div><div class="pill-row">${(crystal.entities || []).map(e => `<span class="pill">${escapeHtml(e)}</span>`).join('') || '<span class="inspect-empty">None</span>'}</div>`;
  } else if (node.kind === 'wing' || node.kind === 'room') {
    body.innerHTML = `<div><strong>${escapeHtml(node.label)}</strong></div><div style="margin-top:8px;">${node.kind === 'wing' ? '📂 Wing level structure' : '🚪 Room level cluster'}</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Type</div><div>${node.kind}</div></div><div class="meta-card"><div class="meta-label">Wing</div><div>${escapeHtml(node.wing)}</div></div>${node.room ? `<div class="meta-card"><div class="meta-label">Room</div><div>${escapeHtml(node.room)}</div></div>` : ''}</div>`;
  } else {
    const entity = node.data;
    body.innerHTML = `<div><strong>${escapeHtml(node.label)}</strong></div><div style="margin-top:6px;color:rgba(255,255,255,0.7);">Entity node bridging related crystals.</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Mentions</div><div>${entity.mention_count || 0}</div></div><div class="meta-card"><div class="meta-label">Salience</div><div>${Number(entity.salience || 0).toFixed(2)}</div></div></div>`;
  }
}

function renderFilterChips() {
  const actors = Array.from(new Set((sceneData.crystals || []).map(c => c.actor || 'user')));
  const wings = Array.from(new Set((sceneData.crystals || []).map(c => c.wing || 'general')));
  const rooms = Array.from(new Set((sceneData.crystals || []).map(c => c.room || 'memories')));
  renderChipSet('actorFilters', actors, activeActorFilters, value => {
    if (activeActorFilters.has(value)) activeActorFilters.delete(value); else activeActorFilters.add(value);
    applyVisibilityMode();
  });
  renderChipSet('wingFilters', wings, activeWingFilters, value => {
    if (activeWingFilters.has(value)) activeWingFilters.delete(value); else activeWingFilters.add(value);
    applyVisibilityMode();
  });
  renderChipSet('roomFilters', rooms, activeRoomFilters, value => {
    if (activeRoomFilters.has(value)) activeRoomFilters.delete(value); else activeRoomFilters.add(value);
    applyVisibilityMode();
  });
  renderPinTray();
  renderScenePanel();
  updateScopeSummary();
  syncSectionCollapse('actorFilters', actors.length);
  syncSectionCollapse('wingFilters', wings.length);
  syncSectionCollapse('roomFilters', rooms.length);
}

function renderScopeChips() {
  const wingContainer = document.getElementById('scopeWingFilters');
  const roomContainer = document.getElementById('scopeRoomFilters');
  if (!wingContainer || !roomContainer) return;
  wingContainer.innerHTML = '';
  roomContainer.innerHTML = '';

  (availableScope.wings || []).forEach(entry => {
    const button = document.createElement('button');
    button.className = 'chip' + (selectedScopeWings.has(entry.wing) ? ' active' : '');
    button.textContent = `${entry.wing} (${entry.count})`;
    button.onclick = async () => {
      if (selectedScopeWings.has(entry.wing)) selectedScopeWings.delete(entry.wing); else selectedScopeWings.add(entry.wing);
      clearScene();
      renderScopeChips();
      await loadGraph();
      updateSceneBanner('Ambient graph', 'browsing ' + getSelectedScopeSummary());
    };
    wingContainer.appendChild(button);
  });

  const visibleRooms = (availableScope.wings || [])
    .filter(entry => !selectedScopeWings.size || selectedScopeWings.has(entry.wing))
    .flatMap(entry => entry.rooms || []);

  visibleRooms.forEach(entry => {
    const key = entry.room;
    const button = document.createElement('button');
    button.className = 'chip' + (selectedScopeRooms.has(key) ? ' active' : '');
    button.textContent = `${key} (${entry.count})`;
    button.onclick = async () => {
      if (selectedScopeRooms.has(key)) selectedScopeRooms.delete(key); else selectedScopeRooms.add(key);
      clearScene();
      renderScopeChips();
      await loadGraph();
      updateSceneBanner('Ambient graph', 'browsing ' + getSelectedScopeSummary());
    };
    roomContainer.appendChild(button);
  });

  syncSectionCollapse('scopeWingFilters', (availableScope.wings || []).length);
  syncSectionCollapse('scopeRoomFilters', visibleRooms.length);
}

function syncSectionCollapse(sectionKey, count) {
  const section = document.querySelector(`[data-section-key="${sectionKey}"]`);
  const toggle = document.querySelector(`[data-section-toggle="${sectionKey}"]`);
  if (!section || !toggle) return;
  const shouldBeCollapsible = count > 3;
  toggle.hidden = !shouldBeCollapsible;
  if (!shouldBeCollapsible) {
    section.classList.remove('collapsed');
    collapsedSections.delete(sectionKey);
    initializedSectionCollapse.add(sectionKey);
    return;
  }
  if (!initializedSectionCollapse.has(sectionKey) && count >= 4) {
    collapsedSections.add(sectionKey);
    initializedSectionCollapse.add(sectionKey);
  }
  const isCollapsed = collapsedSections.has(sectionKey);
  section.classList.toggle('collapsed', isCollapsed);
  toggle.textContent = isCollapsed ? 'Show' : 'Hide';
}

function renderChipSet(containerId, values, activeSet, onToggle) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  values.forEach(value => {
    const button = document.createElement('button');
    button.className = 'chip' + (activeSet.has(value) ? ' active' : '');
    button.textContent = value;
    button.onclick = () => { onToggle(value); renderFilterChips(); };
    container.appendChild(button);
  });
}

function renderPinTray() {
  const tray = document.getElementById('pinTray');
  tray.innerHTML = '';
  if (!pinnedIds.size) {
    tray.innerHTML = '<span class="hint">Shift-click focus nodes to keep them pinned here.</span>';
    return;
  }
  Array.from(pinnedIds).forEach(id => {
    const node = nodeMap[id];
    if (!node) return;
    const button = document.createElement('button');
    button.className = 'chip active';
    button.textContent = trimLabel(node.label, 18) + ' ×';
    button.onclick = () => {
      pinnedIds.delete(id);
      focusedIds.delete(id);
      renderPinTray();
      applyVisibilityMode();
    };
    tray.appendChild(button);
  });
}

function addMessage(role, text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message ' + role;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function getSelectedScopeSummary() {
  const wings = Array.from(selectedScopeWings);
  const rooms = Array.from(selectedScopeRooms);
  if (!wings.length && !rooms.length) return 'full memory field';
  const parts = [];
  if (wings.length) parts.push(wings.join(', '));
  if (rooms.length) parts.push('rooms: ' + rooms.join(', '));
  return parts.join(' • ');
}

function updateScopeSummary() {
  const el = document.getElementById('scopeSummary');
  if (el) el.textContent = 'Scope: ' + getSelectedScopeSummary();
}

function formatCrystalTitle(crystal, index) {
  const title = (crystal.title || '').trim();
  if (title && title.toLowerCase() !== 'untitled') return title;
  const summary = (crystal.summary || crystal.text || '').trim();
  if (!summary) return 'Memory ' + (index + 1);
  return trimLabel(summary.replace(/\s+/g, ' '), 72);
}

function cleanMemoryText(text) {
  return String(text || '')
    .replace(/^\[[^\]]+\]\s*/,'')
    .replace(/^\((assistant|user|system)\)\s*/i,'')
    .replace(/^\[(user|assistant|system)\]\s*/i,'')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarizeRecall(result, query) {
  const crystals = (result.crystals || []).filter(Boolean);
  if (!crystals.length) return 'I couldn\'t find anything solid for that yet.';
  const lines = [];
  lines.push('Here\'s what I found for "' + query + '":');
  crystals.slice(0, 5).forEach((crystal, index) => {
    const title = formatCrystalTitle(crystal, index);
    const meta = [];
    if (crystal.wing) meta.push(crystal.wing);
    if (crystal.room) meta.push(crystal.room);
    if (crystal.actor) meta.push(crystal.actor);
    const summary = cleanMemoryText(crystal.summary || crystal.text || '');
    lines.push((index + 1) + '. ' + title + (meta.length ? ' (' + meta.join(' • ') + ')' : ''));
    if (summary && summary.toLowerCase() !== title.toLowerCase() && !summary.startsWith('{')) {
      lines.push('   ' + trimLabel(summary, 140));
    }
  });
  if (crystals.length > 5) lines.push('…and ' + (crystals.length - 5) + ' more related memories.');
  return lines.join('\n');
}

window.reloadGraph = function() {
  loadGraph();
  updateSceneBanner('Ambient graph', 'reloading ' + getSelectedScopeSummary());
};
window.sendMessage = async function() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  addMessage('user', message);
  input.value = '';
  try {
    addMessage('system', 'Recalling scene...');
    const response = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: message, max_results: 8, wings: Array.from(selectedScopeWings), rooms: Array.from(selectedScopeRooms) })
    });
    const result = await response.json();
    if (result.error) throw new Error(result.error);
    addMessage('assistant', summarizeRecall(result, message));
    updateSceneBanner('Recall scene', trimLabel(message, 60) + ' • ' + getSelectedScopeSummary());
    applyScene(result);
  } catch (error) {
    addMessage('assistant', 'Error: ' + error.message);
  }
};
window.ingestMemory = async function() {
  const text = document.getElementById('ingestText').value.trim();
  if (!text) return;
  try {
    const payload = {
      text,
      actor: document.getElementById('ingestActor').value,
      importance: Number(document.getElementById('ingestImportance').value),
      kind: document.getElementById('ingestKind').value,
      project: document.getElementById('ingestProject').value.trim(),
      status: document.getElementById('ingestStatus').value.trim(),
      next_step: document.getElementById('ingestNextStep').value.trim(),
      blocker: document.getElementById('ingestBlocker').value.trim(),
      source_files: document.getElementById('ingestSources').value.trim(),
    };
    const response = await fetch('/api/ingest', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result.error) throw new Error(result.error);
    addMessage('system', result.message || ('Ingested crystal #' + result.crystal_id));
    document.getElementById('ingestText').value = '';
    document.getElementById('ingestStatus').value = '';
    document.getElementById('ingestNextStep').value = '';
    document.getElementById('ingestBlocker').value = '';
    document.getElementById('ingestSources').value = '';
    loadGraph();
  } catch (error) {
    addMessage('assistant', 'Ingest failed: ' + error.message);
  }
};
window.analyzeSalience = function() {
  const text = document.getElementById('ingestText').value.trim();
  if (!text) return;
  const words = text.toLowerCase().split(/\s+/);
  const emotional = ['love','hate','excited','frustrated','happy','sad'].filter(w => words.includes(w)).length;
  const practical = ['project','task','goal','deadline','work','build'].filter(w => words.includes(w)).length;
  addMessage('system', 'Quick salience check, emotional=' + emotional + ', practical=' + practical + ', chars=' + text.length);
};
window.setMode = function(mode) {
  currentMode = mode;
  ['modeConstellation','modeCrystals','modeEntities'].forEach(id => document.getElementById(id).classList.remove('active'));
  if (mode === 'constellation') document.getElementById('modeConstellation').classList.add('active');
  if (mode === 'crystals') document.getElementById('modeCrystals').classList.add('active');
  if (mode === 'entities') document.getElementById('modeEntities').classList.add('active');
  applyVisibilityMode();
  updateSceneBanner(mode === 'constellation' ? 'Mixed graph' : (mode === 'crystals' ? 'Crystal mode' : 'Entity mode'), 'view changed');
};
window.toggleLinks = function() {
  showLinks = !showLinks;
  document.getElementById('linkBtn').textContent = 'Links: ' + (showLinks ? 'ON' : 'OFF');
  applyVisibilityMode();
};
window.toggleLabels = function() {
  showLabels = !showLabels;
  document.getElementById('labelBtn').textContent = 'Labels: ' + (showLabels ? 'ON' : 'OFF');
  syncLabels();
};
window.toggleRotate = function() {
  autoRotate = !autoRotate;
  document.getElementById('rotateBtn').textContent = 'Rotate: ' + (autoRotate ? 'ON' : 'OFF');
};
window.toggleIsolation = function() {
  isolateFocus = !isolateFocus;
  document.getElementById('isolateBtn').textContent = 'Isolation: ' + (isolateFocus ? 'ON' : 'OFF');
  applyVisibilityMode();
};
window.expandNeighborhood = function() {
  expansionDepth = expansionDepth === 1 ? 2 : 1;
  document.getElementById('expandBtn').textContent = 'Expand: ' + expansionDepth + ' hop';
  if (selectedNode) selectNode(selectedNode);
  else updateSceneBanner('Ambient graph', 'neighborhood depth set to ' + expansionDepth + ' hop');
};
window.toggleTimelineMode = function() {
  timelineMode = !timelineMode;
  document.getElementById('timelineBtn').textContent = 'Timeline: ' + (timelineMode ? 'ON' : 'OFF');
  loadGraph();
  updateSceneBanner(timelineMode ? 'Timeline mode' : 'Ambient graph', timelineMode ? 'memory time mapped vertically' : 'browsing full memory field');
};
window.setCameraPreset = function(mode) {
  if (mode === 'ambient') {
    tweenCamera(new THREE.Vector3(0, 400, 800), new THREE.Vector3(0, 0, 0));
  } else if (mode === 'focus') {
    if (selectedNode) {
      const dir = camera.position.clone().sub(selectedNode.mesh.position).normalize();
      tweenCamera(selectedNode.mesh.position.clone().add(dir.multiplyScalar(22)), selectedNode.mesh.position.clone());
    } else { setOrbitDistance(22); }
  } else if (mode === 'timeline') {
    timelineMode = true; document.getElementById('timelineBtn').textContent = 'Timeline: ON'; loadGraph();
    tweenCamera(new THREE.Vector3(300, 100, 300), new THREE.Vector3(0, 0, 0));
  }
};
window.resetCamera = function() {
  clearFocus();
  const targetPos = new THREE.Vector3(0, 120, 260);
  const targetLookAt = new THREE.Vector3(0, 0, 0);
  tweenCamera(targetPos, targetLookAt);
  updateSceneBanner('Ambient graph', 'camera reset');
};
window.setSpread = function(value) {
  graphSpread = Number(value);
  loadGraph();
};
window.setLabelDensity = function(value) {
  labelDensity = Number(value);
  syncLabels();
};
window.clearFocusAndBanner = function() {
  clearFocus();
  updateSceneBanner('Ambient graph', 'browsing ' + getSelectedScopeSummary());
};

function setupUI() {
  addMessage('system', 'WebGL graph ready.');
  setupPanelDragging();
  loadScopeOverview();
  renderScenePanel();
  updateScopeSummary();
  document.getElementById('rotateBtn').textContent = 'Rotate: OFF';
}

function persistPanelPositions() {
  const state = {};
  document.querySelectorAll('.draggable-panel').forEach(panel => {
    state[panel.id] = {
      left: panel.style.left || '',
      top: panel.style.top || '',
      right: panel.style.right || '',
      bottom: panel.style.bottom || '',
      collapsed: panel.classList.contains('collapsed'),
    };
  });
  state.__sections = Array.from(collapsedSections);
  state.__sectionsInitialized = Array.from(initializedSectionCollapse);
  try { localStorage.setItem('mempalace.panelPositions', JSON.stringify(state)); } catch (e) {}
}

function setPanelCollapsed(panel, collapsed) {
  if (!panel) return;
  panel.classList.toggle('collapsed', collapsed);
  const button = panel.querySelector('[data-panel-toggle]');
  if (button) {
    button.textContent = collapsed ? '+' : '−';
    button.setAttribute('aria-label', collapsed ? 'Expand panel' : 'Collapse panel');
    button.title = collapsed ? 'Expand panel' : 'Collapse panel';
  }
  if (collapsed) collapsedPanels.add(panel.id);
  else collapsedPanels.delete(panel.id);
}

function restorePanelPositions() {
  try {
    const raw = localStorage.getItem('mempalace.panelPositions');
    if (!raw) return;
    const state = JSON.parse(raw);
    collapsedSections = new Set(state.__sections || []);
    initializedSectionCollapse = new Set(state.__sectionsInitialized || []);
    document.querySelectorAll('.draggable-panel').forEach(panel => {
      const saved = state[panel.id];
      if (!saved) return;
      panel.style.left = saved.left || '';
      panel.style.top = saved.top || '';
      panel.style.right = saved.right || '';
      panel.style.bottom = saved.bottom || '';
      setPanelCollapsed(panel, !!saved.collapsed);
    });
  } catch (e) {}
}

function setupPanelDragging() {
  restorePanelPositions();
  document.querySelectorAll('[data-section-toggle]').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const key = toggle.getAttribute('data-section-toggle');
      if (collapsedSections.has(key)) collapsedSections.delete(key);
      else collapsedSections.add(key);
      const container = document.getElementById(key);
      syncSectionCollapse(key, container?.children.length || 0);
      persistPanelPositions();
    });
  });
  document.querySelectorAll('.draggable-panel').forEach(panel => {
    const handle = panel.querySelector('.panel-header');
    const toggle = panel.querySelector('[data-panel-toggle]');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPanelCollapsed(panel, !panel.classList.contains('collapsed'));
        persistPanelPositions();
      });
    }
    if (!handle) return;
    handle.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('[data-panel-toggle]')) return;
      const rect = panel.getBoundingClientRect();
      panelDrag = {
        panel,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      panel.style.left = rect.left + 'px';
      panel.style.top = rect.top + 'px';
      panel.classList.add('dragging');
      e.preventDefault();
      e.stopPropagation();
    });
  });

  window.addEventListener('mousemove', (e) => {
    if (!panelDrag) return;
    panelDrag.panel.style.left = Math.max(8, e.clientX - panelDrag.offsetX) + 'px';
    panelDrag.panel.style.top = Math.max(8, e.clientY - panelDrag.offsetY) + 'px';
  });

  window.addEventListener('mouseup', () => {
    if (!panelDrag) return;
    panelDrag.panel.classList.remove('dragging');
    persistPanelPositions();
    panelDrag = null;
  });
}
function updateSceneBanner(title, subtitle) {
  document.getElementById('sceneBanner').innerHTML = '<strong>' + escapeHtml(title) + '</strong> • ' + escapeHtml(subtitle);
}
function trimLabel(text, max) { return !text ? '' : (text.length > max ? text.slice(0, max - 1) + '…' : text); }
function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function tweenCamera(targetPos, targetLookAt, duration = 1200) {
  const startPos = camera.position.clone();
  const startLookAt = controls.target.clone();
  const startTime = performance.now();
  if (cameraTween) cancelAnimationFrame(cameraTween);
  function update() {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const t = 1 - Math.pow(1 - progress, 3);
    camera.position.lerpVectors(startPos, targetPos, t);
    controls.target.lerpVectors(startLookAt, targetLookAt, t);
    controls.update();
    if (progress < 1) cameraTween = requestAnimationFrame(update);
    else cameraTween = null;
  }
  cameraTween = requestAnimationFrame(update);
}

async function playTemporalGrowth() {
  const crystalNodes = nodes.filter(n => n.kind === 'crystal').sort((a, b) => (a.data.created_at || 0) - (b.data.created_at || 0));
  crystalNodes.forEach(n => n.mesh.scale.setScalar(0.0001));
  updateSceneBanner('Temporal Growth', 'Playing memory sequence...');
  for (let node of crystalNodes) {
    const startTime = performance.now();
    await new Promise(resolve => {
      function animateGrowth() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / 400, 1);
        const t = 1 - Math.pow(1 - progress, 3);
        node.mesh.scale.setScalar(Math.max(0.0001, t));
        if (progress < 1) requestAnimationFrame(animateGrowth);
        else resolve();
      }
      requestAnimationFrame(animateGrowth);
    });
    await new Promise(r => setTimeout(r, 100));
  }
  updateSceneBanner('Growth Complete', crystalNodes.length + ' memories sequenced');
}
window.playTemporalGrowth = playTemporalGrowth;