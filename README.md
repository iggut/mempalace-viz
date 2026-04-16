# MemPalace

A three-dimensional cognitive map for your MemPalace — wings, rooms, and the explicit tunnel links between them, rendered as an organic landscape instead of a database diagram.

## What you see

- **Wings** — cognitive regions of the palace, placed on a shallow organic dome. Sphere size reflects drawer counts in the current view.
- **Rooms** — memory loci that orbit their wing with gentle vertical drift, so the composition has real depth instead of feeling like rings.
- **Graph** — rooms as nodes, explicit MemPalace tunnel links as soft bezier arcs. Layout is force-directed; focus and routing highlight paths on the visible graph only.

Three views (`1`, `2`, `3`) sharing one scene. Click to select and frame; hover to inspect; type to **filter structure** or run **semantic drawer search** (`mempalace_search`). **Discovery overlays** (Explore panel) optionally tint room nodes by tunnel-hub degree or drawer **recency metadata** from tunnel rows — emissive only, never extra edges. The right-hand **Memory & knowledge** panel exposes read-only KG, diary, AAAK spec, and duplicate-check — orthogonal to the tunnel graph and to Discovery analysis.

See `docs/DATA_MINING.md` for semantics and limitations.

## Graph truth model

The viewer renders exactly what the MemPalace MCP exposes — nothing is inferred client-side.

- **Edges** come from `edgesResolved` on the API (`/api/graph-stats`, `/api/overview`). With stock MemPalace those are **tunnel** edges from `mempalace_find_tunnels`: the same room name appearing in more than one wing, resolved against taxonomy.
- **Disconnected** rooms and components are a valid state. The viewer never invents missing links.
- **Stock MemPalace MCP** has no tool for persisting arbitrary user-defined graph edges between rooms. New connectivity comes from naming (same room in multiple wings), not from ad-hoc link editing here.
- **KG stats** (`/api/kg-stats`) describe MemPalace's separate SQLite knowledge-graph side. They are **not** the palace tunnel graph.

See `docs/GRAPH_SEMANTICS.md`, `docs/MCP_CONNECTION_CAPABILITIES.md`, `docs/API_CONTRACT.md`.

## Quick start

```bash
# 1. Start the API bridge (spawns the MemPalace Python MCP per request)
#    Optional: MEMPALACE_VIZ_DIARY_AGENT=my-agent — default label for /api/diary in the Memory panel
node server.js

# 2. In another terminal, run the dev UI (Vite on 3001, proxies /api to 8767)
npm install
npm run dev
```

The viewer is also served statically by `server.js` at `/`, `/viz`, `/3d`, or `/palace3d` (all equivalent).

Production build: `npm run build` emits `dist/`. Preview with `npm run preview`.

## Official MemPalace MCP server

This project is an **interface** to the real MemPalace Python MCP server from [MemPalace/mempalace](https://github.com/MemPalace/mempalace) (`python -m mempalace.mcp_server`). It is **local-first**; storage is **verbatim** text with **semantic** retrieval exposed in the viewer via **`/api/search`**. The shipped `mcp_server.py` registers a fixed set of named tools (see **`docs/MCP_CONNECTION_CAPABILITIES.md`**). Some public docs may list a different total tool count by version — your installed package is authoritative (`tools/list` or **`GET /api/mcp-tools`**).

The HTTP bridge exposes **read** tools for structure, tunnel graph, KG reads, semantic search, traverse, diary read, AAAK spec, and duplicate-check. **Write** tools (drawers, KG mutation, diary write) are **not** proxied — use an MCP client.

## Architecture

```
┌─────────────┐
│  Browser    │  Three.js cognitive-map viewer (ui.js → scene.js)
│  index.html │
└──────┬──────┘
       │ HTTP (JSON)
       ↓
┌─────────────┐
│  server.js  │  Node bridge, :8767 — stateless, spawns MCP per call
└──────┬──────┘
       │ stdio JSON-RPC
       ↓
┌─────────────┐
│ MemPalace   │  Python MCP (mempalace.mcp_server)
│ MCP Server  │
└─────────────┘
```

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/status` | Palace overview (totals, health) |
| `GET /api/wings` | Wings and drawer counts |
| `GET /api/rooms?wing=…` | Rooms under a wing |
| `GET /api/taxonomy` | Wing → room → drawer hierarchy with canonical ids |
| `GET /api/palace` | Full normalized snapshot (wings + taxonomy + graph + kg) |
| `GET /api/graph-stats` | Tunnel graph: `edgesResolved`, `summary`, `graphMeta` |
| `GET /api/overview` | Bundled palace + graph summary for the viewer |
| `GET /api/kg-stats` | Knowledge-graph statistics (separate from the palace tunnel graph) |
| `GET /api/mcp-tools` | Same as MCP `tools/list` (names + schemas) |
| `GET /api/search` | `mempalace_search` — semantic drawers |
| `GET /api/traverse` | `mempalace_traverse` — walk from a room name |
| `GET /api/kg-query` | `mempalace_kg_query` |
| `GET /api/kg-timeline` | `mempalace_kg_timeline` |
| `GET /api/aaak-spec` | `mempalace_get_aaak_spec` |
| `GET /api/diary` | `mempalace_diary_read` |
| `POST /api/check-duplicate` | `mempalace_check_duplicate` |

Full contract: `docs/API_CONTRACT.md`. Doc index: `docs/README.md`.

## Design language

- **Organic over mechanical.** Wings drift on a shallow dome instead of a flat ring; rooms cluster with small jitter; there is no "palace core" anchor sphere.
- **Depth through light.** A calm breathing pulse on emissive intensity, soft multi-layer halo per node, and warm-cool two-tone lighting replace harsh specular and vertical bob.
- **Edges as thought.** Quadratic-bezier arcs (arc height scales with distance) read as neural connections, not wire diagrams.
- **Atmosphere.** A two-layer nebula of "thought motes" sits behind the scene; exponential fog gives long-distance fall-off.
- **Minimal chrome.** The canvas is primary. Controls are one toggle (labels), one button (reset camera), one filter row per view.

All of this lives in `scene.js`'s `CONFIG` and the `render*View` functions — edit there.

## Tests

```bash
npm test
```

## Tech stack

- **Three.js** — rendering
- **Vanilla ES modules** — `ui.js` + helpers; production build via **Vite**
- **Node** — stateless API bridge

---

Made for MemPalace.
