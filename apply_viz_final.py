import re

def replace_function_block(content, func_name, new_implementation):
    # Find the start of the function
    # It can be "function name(" or "window.name =" or "window.name = function("
    patterns = [
        r'function\s+' + func_name + r'\s*\(',
        r'window\.' + func_name + r'\s*=\s*function\s*\(',
        r'window\.' + func_name + r'\s*=\s*'
    ]

    start_idx = -1
    for p in patterns:
        match = re.search(p, content)
        if match:
            start_idx = match.start()
            break

    if start_idx == -1:
        print(f"ERROR: Could not find function {func_name}")
        return content

    # Find the matching closing brace
    brace_start = content.find('{', start_idx)
    if brace_start == -1:
        print(f"ERROR: No opening brace for {func_name}")
        return content

    brace_count = 1
    end_idx = -1
    for i in range(brace_start + 1, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1

        if brace_count == 0:
            end_idx = i + 1
            break

    if end_idx == -1:
        print(f"ERROR: Could not find closing brace for {func_name}")
        return content

    return content[:start_idx] + new_implementation + content[end_idx:]

with open('brain.js', 'r') as f:
    content = f.read()

# 1. Add globals
content = content.replace('let scene, camera, renderer, controls, raycaster, pointer;',
                          'let scene, camera, renderer, controls, raycaster, pointer;\nlet cameraTween = null;')

# 2. buildGraph
content = replace_function_block(content, 'buildGraph', """function buildGraph(data) {
  clearGraph();
  const crystals = data.crystals || [];
  const entities = data.entities || [];
  const relations = data.relations || [];

  // Core Palace Center
  const centerGeo = new THREE.IcosahedronGeometry(15, 2);
  const centerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5, wireframe: true });
  const centerMesh = new THREE.Mesh(centerGeo, centerMat);
  centerMesh.userData = { id: 'palace:center', kind: 'palace', label: 'MemPalace Core' };
  graphGroup.add(centerMesh);
  nodeMap[centerMesh.userData.id] = { id: centerMesh.userData.id, kind: 'palace', label: 'MemPalace Core', mesh: centerMesh, radius: 15 };
  nodes.push(nodeMap[centerMesh.userData.id]);

  const wings = Array.from(new Set(crystals.map(c => c.wing || 'general')));
  const wingNodes = {};
  const roomNodes = {};

  // Create Wing nodes
  wings.forEach((wingName, i) => {
    const angle = (i / Math.max(wings.length, 1)) * Math.PI * 2;
    const radius = graphSpread * (0.6 + (i % 3) * 0.1);
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius, y = (i - (wings.length - 1) / 2) * 50;
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

  // Create Room nodes
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

  // Create Crystal nodes
  crystals.forEach((crystal, ci) => {
    const roomKey = `${crystal.wing || "general"}:${crystal.room || "memories"}`;
    const roomNode = roomNodes[roomKey];
    if (!roomNode) return;
    const normalized = Math.max(0, Math.min(1, ((crystal.importance_score || 0) + 0.5) / 1.6));
    const angle = (ci / Math.max(crystals.length, 1)) * Math.PI * 2, radius = 25 + normalized * 15 + (ci % 3) * 5;
    const x = roomNode.baseX + Math.cos(angle) * radius, z = roomNode.baseZ + Math.sin(angle) * radius, y = roomNode.baseY + (normalized - 0.5) * 40 + Math.sin(ci * 1.5) * 10;
    const nodeRadius = 3.2 + normalized * 5.4 + ((crystal.entities || []).length * 0.12);
    const color = crystal.actor === 'jupiter' ? 0xc4b5fd : crystal.actor === 'system' ? 0xf9a8d4 : crystal.actor === 'assistant' ? 0x93c5fd : (SELF_STATE_COLORS[crystal.self_state] || 0x7dd3fc);
    const mesh = new THREE.Mesh(pickCrystalGeometry(crystal, nodeRadius, ci), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.45 + normalized * 0.85, roughness: 0.24, metalness: 0.18, transparent: true, opacity: 0.92 }));
    mesh.position.set(x, timelineMode ? computeTimelineY(crystal, crystals) : y, z);
    mesh.userData = { id: 'crystal:' + crystal.id, kind: 'crystal', data: crystal, label: crystal.title || crystal.summary || ('Crystal #' + crystal.id) };
    graphGroup.add(mesh);
    nodeMap[mesh.userData.id] = { id: mesh.userData.id, rawId: crystal.id, kind: 'crystal', data: crystal, label: mesh.userData.label, mesh, baseX: x, baseY: y, baseZ: z, timelineY: computeTimelineY(crystal, crystals), wing: crystal.wing, room: crystal.room, actor: crystal.actor || 'user', radius: nodeRadius, visualType: mesh.geometry.type };
    nodes.push(nodeMap[mesh.userData.id]);
    graphGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([roomNode.mesh.position, mesh.position]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 })));
  });

  // Entity nodes
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

  relations.forEach(relation => {
    const source = nodeMap[relation.source_type + ':' + relation.source_id], target = nodeMap[relation.target_type + ':' + relation.target_id];
    if (!source || !target) return;
    const color = RELATION_COLORS[relation.relation] || 0x8ca4ff;
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([source.mesh.position.clone(), target.mesh.position.clone()]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 + Math.min(0.3, (relation.weight || 0.5) * 0.22) }));
    line.userData = { key: source.id + '->' + target.id, relation: relation.relation };
    graphGroup.add(line);
    links.push({ key: line.userData.key, source: source.id, target: target.id, relation: relation.relation, weight: relation.weight || 0.5, line, phase: (Math.abs(relation.source_id + relation.target_id) % 100) / 100 });
  });

  resolveNodeCollisions();
  applyVisibilityMode();
  fitCameraToGraph();
  updateStats();
  drawMinimap();
}""")

# 3. pickCrystalGeometry
content = replace_function_block(content, 'pickCrystalGeometry', """function pickCrystalGeometry(crystal, radius, index) {
  if (crystal.actor === 'jupiter') return new THREE.IcosahedronGeometry(radius * 1.02, 1);
  if (crystal.actor === 'system') return new THREE.OctahedronGeometry(radius * 1.06, 1);
  if ((crystal.entities || []).length >= 4) return new THREE.TorusKnotGeometry(radius * 0.6, radius * 0.2, 32, 8);
  return index % 3 === 0 ? new THREE.SphereGeometry(radius, 18, 14) : new THREE.IcosahedronGeometry(radius, 0);
}""")

# 4. selectNode
content = replace_function_block(content, 'selectNode', """function selectNode(node, options = {}) {
  selectedNode = node;
  if (options.pin) pinnedIds.add(node.id);
  if (node.kind === 'wing') {
    selectedScopeWings.clear(); selectedScopeWings.add(node.wing);
    loadGraph().then(() => {
      updateSceneBanner('Wing focus', node.wing);
      setOrbitDistance(120, node.mesh.position.clone());
    });
  } else if (node.kind === 'room') {
    selectedScopeWings.clear(); selectedScopeWings.add(node.wing);
    selectedScopeRooms.clear(); selectedScopeRooms.add(node.room);
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
}""")

# 5. setOrbitDistance
content = replace_function_block(content, 'setOrbitDistance', """function setOrbitDistance(distance, focusPoint) {
  const focus = focusPoint || controls.target;
  const dir = camera.position.clone().sub(focus).normalize();
  const targetPos = focus.clone().add(dir.multiplyScalar(distance));
  tweenCamera(targetPos, focus.clone());
}""")

# 6. renderInspector
content = replace_function_block(content, 'renderInspector', """function renderInspector(node) {
  const body = document.getElementById('inspectBody');
  if (!node) { body.innerHTML = '<div class="inspect-empty">Click a crystal or entity to inspect it here.</div>'; return; }
  if (node.kind === 'crystal') {
    const crystal = node.data, fullText = crystal.text || crystal.summary || '';
    body.innerHTML = `<div class="inspect-header-large"><strong>${escapeHtml(node.label)}</strong></div><div class="inspect-content-scrollable">${escapeHtml(fullText).replace(/\\n/g, '<br>')}</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Actor</div><div>${escapeHtml(crystal.actor || 'user')}</div></div><div class="meta-card"><div class="meta-label">Importance</div><div>${Number(crystal.importance_score || 0).toFixed(3)}</div></div><div class="meta-card"><div class="meta-label">Wing</div><div>${escapeHtml(crystal.wing || 'general')}</div></div><div class="meta-card"><div class="meta-label">Room</div><div>${escapeHtml(crystal.room || 'memories')}</div></div></div>${crystal.created_at ? `<div class="meta-label">Created</div><div class="meta-time">${escapeHtml(new Date(crystal.created_at * 1000).toLocaleString())}</div>` : ''}<div class="meta-label" style="margin-top:10px;">Entities</div><div class="pill-row">${(crystal.entities || []).map(e => `<span class="pill">${escapeHtml(e)}</span>`).join('') || '<span class="inspect-empty">None</span>'}</div>`;
  } else if (node.kind === 'wing' || node.kind === 'room') {
    body.innerHTML = `<div><strong>${escapeHtml(node.label)}</strong></div><div style="margin-top:8px;">${node.kind === 'wing' ? '📂 Wing level structure' : '🚪 Room level cluster'}</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Type</div><div>${node.kind}</div></div><div class="meta-card"><div class="meta-label">Wing</div><div>${escapeHtml(node.wing)}</div></div>${node.room ? `<div class="meta-card"><div class="meta-label">Room</div><div>${escapeHtml(node.room)}</div></div>` : ''}</div>`;
  } else {
    const entity = node.data;
    body.innerHTML = `<div><strong>${escapeHtml(node.label)}</strong></div><div style="margin-top:6px;color:rgba(255,255,255,0.7);">Entity node bridging related crystals.</div><div class="meta-grid"><div class="meta-card"><div class="meta-label">Mentions</div><div>${entity.mention_count || 0}</div></div><div class="meta-card"><div class="meta-label">Salience</div><div>${Number(entity.salience || 0).toFixed(2)}</div></div></div>`;
  }
}""")

# 7. window.setCameraPreset
content = replace_function_block(content, 'setCameraPreset', """window.setCameraPreset = function(mode) {
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
}""")

# 8. window.resetCamera
content = replace_function_block(content, 'resetCamera', """window.resetCamera = function() {
  clearFocus();
  const targetPos = new THREE.Vector3(0, 120, 260);
  const targetLookAt = new THREE.Vector3(0, 0, 0);
  tweenCamera(targetPos, targetLookAt);
  updateSceneBanner('Ambient graph', 'camera reset');
}""")

# 9. Additions at the end
content += """
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
"""

with open('brain.js', 'w') as f:
    f.write(content)

# --- CONSTELLATION.HTML ---
with open('constellation.html', 'r') as f:
    html = f.read()

styles = """
    .inspect-header-large { font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
    .inspect-content-scrollable {
      max-height: 300px; overflow-y: auto; background: rgba(0,0,0,0.2);
      padding: 10px; border-radius: 8px; font-size: 14px; line-height: 1.5;
      color: rgba(255,255,255,0.9); margin-bottom: 15px;
      scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent;
    }
    .meta-time { font-size: 12px; color: rgba(255,255,255,0.6); }
"""
html = html.replace('</style>', styles + '</style>')
html = html.replace('<button class="btn" onclick="resetCamera()">🎯 Reset camera</button>',
                    '<button class="btn" onclick="resetCamera()">🎯 Reset camera</button>\n        <button class="btn" onclick="playTemporalGrowth()">⏳ Play Growth</button>')

with open('constellation.html', 'w') as f:
    f.write(html)