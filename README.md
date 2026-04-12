# MemPalace 3D Visualization

A **3D** MemPalace viewer: wings, rooms, and the **palace tunnel graph** rendered in Three.js with orbit controls, search, graph routing, and an inspector. The experience is scene-first (not a flat dashboard).

## Shipped UI (source of truth for the product)

The maintained app is:

| Surface | Role |
| --- | --- |
| **`index.html`** | Primary HTML shell |
| **`ui.js`** | Application entry (module) |
| **`graph-guidance.js`** | MCP-honest copy for routes, disconnections, and “how connections work” |
| **`dist/`** | Production build (`npm run build`) — same app, bundled assets |

Serve the app over HTTP with the API (see Quick start). For development, `npm run dev` (Vite) is typical; for static hosting, use `dist/` after a build or the root files if your server maps them.

**Not** the primary product: other `*.html` files in the repo (`simple.html`, `final.html`, `dynamic.html`, `fixed.html`, `nobuild.html`, `constellation.html`, …) are **legacy or experimental** demos and prototypes. They are kept for reference only; do not treat them as the main entry point.

## What you see in 3D

- **Wings** — All wings laid out in the scene; sphere size reflects drawer counts in context.
- **Rooms** — Rooms orbit their wing; same scaling idea.
- **Graph** — Force-directed layout of **rooms as nodes** and **explicit palace edges** as links. Camera and framing are 3D; route highlighting and neighbor stepping operate on the visible graph in the scene.

Search, route, and graph exploration are **driven by data from the MemPalace HTTP API** (which wraps MCP). They do not add edges client-side.

## Graph truth model

- **Edges you see** come from **explicit MemPalace MCP/API relationship data** exposed as `edgesResolved` (and related fields). With **stock** MemPalace, those are **tunnel** edges from `mempalace_find_tunnels`.
- **Tunnels** mean the **same room name appears in more than one wing**; the server resolves endpoints against taxonomy. The viewer **does not invent** missing room-to-room links.
- **Disconnected** graphs (rooms or components with no path on current edges) are **valid** and expected when the palace has no tunnels or filters hide edges.
- **Stock MemPalace MCP does not** expose a tool to **persist arbitrary** user-defined graph links between arbitrary rooms. New tunnel-like structure in data comes from **naming** (same room name across wings), not from ad-hoc link editing in this UI.
- **KG stats** (`/api/kg-stats`, footer “KG stats (API)”) are **separate** from the palace tunnel graph: they describe the SQLite knowledge-graph side of MemPalace, not the 3D palace link view.

Details: **`docs/GRAPH_SEMANTICS.md`**, **`docs/MCP_CONNECTION_CAPABILITIES.md`**, **`docs/API_CONTRACT.md`**.

## Quick start

### 1. Start the API bridge

```bash
cd /path/to/mempalace-viz
node server.js
```

Default: `http://localhost:8767` (API under `/api/…`, CORS enabled for local dev).

**Important:** On this server, **`/`** serves **`constellation.html`** (a separate demo). The shipped **MemPalace 3D** app is at **`/index.html`**, **`/viz`**, **`/3d`**, or **`/palace3d`** — not the site root.

### 2. Run the UI

**Development (recommended):**

```bash
npm install
npm run dev
```

Opens the Vite dev server (see `vite.config.ts`; default port **3001**). The client in `api.js` targets the API at **`http://localhost:8767`** by default.

You can also open the same **`index.html`** bundle via **`node server.js`** at **`http://localhost:8767/viz`** (static files are whitelisted for the shipped modules).

**Production build:**

```bash
npm run build
```

Output: **`dist/`**. Serve `dist/` with any static server **and** run `server.js` for API routes, or use your own deployment layout.

**Static preview of `dist/`** (after build):

```bash
npm run preview
```

## Architecture

```
┌─────────────┐
│  Browser    │  Three.js 3D scene (ui.js / dist bundle)
│  index.html │
└──────┬──────┘
       │ HTTP (JSON)
       ↓
┌─────────────┐
│  server.js  │  Node bridge
└──────┬──────┘
       │ MCP
       ↓
┌─────────────┐
│ MemPalace   │  Python MCP server
│ MCP Server  │
└─────────────┘
```

## API (high level)

| Endpoint | Purpose |
| --- | --- |
| `GET /api/status` | Palace overview |
| `GET /api/wings` | Wings and drawer counts |
| `GET /api/rooms?wing=…` | Rooms in a wing |
| `GET /api/taxonomy` | Hierarchy with canonical ids |
| `GET /api/graph-stats` | Tunnel graph: `edgesResolved`, `edgesUnresolved`, `summary`, `graphMeta`, legacy `tunnels` |
| `GET /api/overview` | Bundled palace + graph summary |
| `GET /api/kg-stats` | Knowledge graph statistics (**not** the palace tunnel graph) |

Full contract: **`docs/API_CONTRACT.md`**. Doc index: **`docs/README.md`**.

## Configuration (visuals)

Scene layout and colors are defined in **`scene.js`** (`CONFIG`), not in `index.html`. Adjust there if you change sphere sizes, colors, or spacing.

## Tests

```bash
npm test
```

## Tech stack

- **Three.js** — 3D rendering  
- **Vanilla ES modules** — `ui.js` + helpers; production build via **Vite**  
- **Node** — `server.js` API bridge  

---

Made for MemPalace.
