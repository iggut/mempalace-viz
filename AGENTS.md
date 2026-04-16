# Agent Instructions: MemPalace Viz

## Architecture
- **Frontend** (`index.html`): Three.js cognitive-map viewer. Orchestration in `ui.js`; scene + layout in `scene.js`.
- **Backend** (`server.js`): Node HTTP bridge on port **8767**. Spawns the MemPalace Python MCP server (`../mempalace-venv/bin/python -m mempalace.mcp_server`) per request. No REST state of its own.
- **Data shape**: `canonical.js` normalizes taxonomy + tunnel rows into `edgesResolved` / `graphMeta`. Frontend consumes via `api.js`.

## Shipped surfaces
- `/`, `/index.html`, `/viz`, `/3d`, `/palace3d` all serve the same viewer.
- API: `/api/status`, `/api/wings`, `/api/rooms`, `/api/taxonomy`, `/api/palace`, `/api/graph-stats`, `/api/overview`, `/api/kg-stats`.

## Key files
- `index.html` — shell (header / panels / footer).
- `ui.js` — app state, inspector, navigation, persistence.
- `scene.js` — Three.js scene, layout, interaction, motion.
- `graph-*.js` — relationships, routing, navigation, search helpers.
- `canonical.js` — server- and client-shared graph normalization.
- `insights.js` — analytics + summary panels.
- `api.js` — frontend API client + payload normalization.

## Dev tips
- Avoid hardcoded paths; use the `WORKSPACE`, `VENV_PYTHON`, `MEMPALACE_ROOT` env vars.
- `npm run dev` (Vite on **3001**) proxies `/api` to **8767**; `node server.js` also serves the app statically.
- `npm test` runs the logic suite. `npm run build` emits `dist/`.

## Common tasks
- **Visual tuning**: edit `CONFIG` and the render functions in `scene.js`.
- **New API route**: add a switch case in `server.js`, keep shapes canonical (`edgesResolved`, `graphMeta`, `wingId` / `roomId`).
- **Graph semantics changes**: update `canonical.js` *and* `docs/GRAPH_SEMANTICS.md`.

## What not to do
- Don't invent edges on the client. The 3D graph renders only `edgesResolved` from MCP tunnels — see `docs/GRAPH_SEMANTICS.md`.
- Don't add speculative demo flows; keep the viewer single-surface.
