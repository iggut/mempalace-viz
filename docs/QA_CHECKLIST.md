# MemPalace Viz — manual QA checklist

Short regression pass before releases or after copy / routing / graph changes. The shipped surface is `index.html` → `ui.js` → `scene.js` (prod: `dist/` after `npm run build`).

---

## 1. Shell sanity

- [ ] `/`, `/index.html`, `/viz`, `/3d`, `/palace3d` all load the same viewer.
- [ ] `npm run build` succeeds; `dist/` loads and behaves like dev for one critical path.
- [ ] No stale demo HTMLs or `brain.js` referenced anywhere in code, docs, or nav.

## 2. MCP-honest wording

- [ ] Help / overview / route copy still says paths use **explicit MCP edges only**.
- [ ] Copy does **not** imply inferred or client-added edges.
- [ ] Copy does **not** imply arbitrary graph persistence via stock MCP.
- [ ] Footer: **"KG stats"** stays clearly separate from palace tunnel graph.
- [ ] **Discovery** copy labels derived analysis vs tunnel truth vs KG vs semantic search (`docs/DATA_MINING.md`).
- [ ] `graph-guidance.js` remains the behavioral source for route failure / disconnected / "how connections work" copy.

## 3. Graph semantics

- [ ] Graph view loads with explicit `edgesResolved`-style data; no fake edges when API returns none.
- [ ] Disconnected components / no-path read as valid, not errors.
- [ ] `no_path` / `no_edges` messages stay informational (from `routeFailureMessage` / `routeDisconnectedDetailLines`).
- [ ] Resolved edges and tunnel explanations match reality.

## 4. Search / route / navigation

- [ ] **Structure** search (`/`) focuses the 3D scene as expected.
- [ ] **Semantic** search returns drawer hits; clicking a result jumps to Graph when wing/room exists in taxonomy.
- [ ] **Memory lens** (`GET /api/kg-query`, diary, AAAK, duplicate-check) loads without breaking the scene; KG is not drawn as palace edges.
- [ ] Room inspector: **Palace traverse** returns JSON; **Tunnel metadata** shows halls/recent when MCP supplied them.
- [ ] **Discovery overlays**: default Off; hubs/recency tint **room emissive only** (no extra lines); Activity mode does nothing harmful when `recent` is missing or unparseable.
- [ ] Route uses only visible explicit edges (respects relationship filters).
- [ ] Route stepping / history coherent when neighbors are missing.
- [ ] Canvas stays primary; panels don't steal the viewport.

## 5. Visualization feel

- [ ] Wings / rooms render with organic drift, not a perfectly flat ring.
- [ ] Graph edges are curved (bezier arcs), not straight lines; tunnel links have a subtle opacity pulse (unless reduced motion).
- [ ] No "palace core" sphere at origin.
- [ ] Breathing emissive pulse is subtle; no jittery vertical bob.
- [ ] Auto-rotate is off by default.
- [ ] Clicking a node: the scale bump + emissive pulse are clearly visible (selection registers without ambiguity).
- [ ] Hover card: left rule color shifts between wing (blue) and room (teal).

### 5c. Premium spatial UI pass

- [ ] Overall shell reads as dark glass — panels feel layered, not like opaque slabs glued on top of the scene.
- [ ] Header is slim/translucent, tagline reads as secondary; brand does not dominate.
- [ ] Side panels have hairline borders, no all-caps "enterprise" header bars.
- [ ] Inspector cards/sections feel lighter; the hero card is subtly tinted, section chrome is quiet.
- [ ] Footer is translucent; metrics breathe without feeling like a status bar.
- [ ] Collapsed side panels show refined edge tabs (glass + subtle accent glow on hover).
- [ ] Buttons / chips / pills share a unified radius scale; no mismatched shapes.
- [ ] Canvas has a soft radial vignette that draws focus to the active cluster without crushing contrast.

### 5d. Relationship rendering (first-class)

- [ ] Default graph edges read as quiet luminous threads (additive glow, not flat wires).
- [ ] Hovering a node lifts its incident edges via a soft glow pass; neighbor edges get a lighter halo.
- [ ] Selecting a node makes its edges clearly the "active constellation" — glow pulses gently.
- [ ] Route mode: path edges glow stronger and a traveling pulse mote visibly moves along each segment.
- [ ] Cross-wing tunnel edges remain distinguishable from intra-wing tethers.
- [ ] Un-emphasized edges fade back politely when a focus is active; they never disappear entirely unless filtered.
- [ ] Selected node shows an elegant additive ring halo that breathes; it faces the camera as you orbit.
- [ ] Reduced-motion mode disables glow pulsing, route travel, and ring breath (still renders the glow statically).
- [ ] Dense graph: effects stay performant — no noticeable FPS drop when hovering across many rooms.

### 5b. Graph 3D — picking vs camera (regression)

- [ ] **Click** a node with minimal movement → selection + inspector update (intentional pick).
- [ ] **Drag / orbit** the camera (left button) → **no** selection on pointer release; hover may update during drag but release must not change selection.
- [ ] **Pan** (if enabled / right-drag or middle) → **no** accidental node selection on release.
- [ ] **Trackpad jitter**: two-finger scroll / pad noise stays below the mouse-class move threshold (~10px) for click-vs-drag; OrbitControls `start` still bumps the gesture budget so real drags suppress selection.
- [ ] **Dense graph / slow orbit**: labels stay readable (not oversized pills); overlapping clusters remain scannable; **slow orbit** should not swap which labels win overlap every frame (projected-position quantization + opacity bucketing + `lastKept` hysteresis).
- [ ] **Zoom** in and out: labels stay legible without dominating the frame (subtle chips, not billboards).
- [ ] **Graph Back / search / inspector-driven focus**: after the camera jumps without a pointer move, scene emphasis, inspector subject line, header/footer chrome, and hover card stay aligned (no stale hover on a node you are no longer over; pin mode still ignores live hover for the inspector body, but clears must apply).

## 6. Performance sanity

- [ ] Rapid mouse drag across the canvas: no visible hover lag or stutter.
- [ ] Collapsing / expanding side panels reflows the 3D canvas without a window resize.
- [ ] Window resize feels smooth (no sub-frame thrash).

## 7. Build / regression

- [ ] `npm test` passes.
- [ ] `npm run build` succeeds.
- [ ] Doc paths cited in the UI still exist (`docs/MCP_CONNECTION_CAPABILITIES.md`, etc).

## Quick smoke (2 min)

1. Open `/` → Graph → edges curve and feel MCP-driven.
2. Pick two rooms with no path → informational message.
3. Footer: KG line reads distinctly from graph stats.
4. `npm test && npm run build`.
