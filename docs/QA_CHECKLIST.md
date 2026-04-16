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
