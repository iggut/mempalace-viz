# 🏛️ MemPalace Viz

> A local-first 3D visualization and control surface for MemPalace.

**MemPalace Viz** turns wings, rooms, drawers, tunnels, knowledge-graph reads, diary entries, and memory search into an explorable cognitive map.

It is a browser-based Three.js interface backed by a lightweight Node bridge to the MemPalace Python MCP server. Wings become regions. Rooms become memory loci. Explicit MCP/API tunnel links become navigable graph edges.

The core principle is simple:

> **Show what MemPalace actually knows. Do not invent hidden structure.**

---

## ✨ Highlights

### 3D cognitive map

Explore wings, rooms, and explicit tunnel links as a spatial memory graph.

### Canonical graph model

Uses stable `wingId` and `roomId` identifiers plus `edgesResolved` from the HTTP bridge instead of fragile display-name-only relationships.

### Explicit-edge truth model

The graph renders MCP/API edges only. Disconnected rooms are valid. Missing edges are not fabricated.

### Memory-aware panels

Browse palace structure, inspect graph context, search drawers semantically, check duplicates, read diary entries, and query knowledge-graph surfaces.

### Discovery overlays

Emphasize tunnel hubs and drawer recency metadata without mutating the underlying graph topology.

### Local-first bridge

`server.js` talks to `python -m mempalace.mcp_server` over stdio JSON-RPC and serves a browser UI over HTTP.

### Developer-friendly docs

API contracts, graph semantics, MCP capability notes, source audits, QA checklists, and changelog notes live under `docs/`.

---

## 🧭 What the viewer shows

MemPalace Viz has three main spatial views sharing one scene.

| View | Purpose |
| --- | --- |
| **Wings** | High-level cognitive regions of the palace. Sphere size reflects drawer counts. |
| **Rooms** | Memory loci grouped under wings with depth, drift, and local structure. |
| **Graph** | Rooms as nodes, with explicit MemPalace tunnel links as soft arcs. |

Interaction model:

- **Click** to select and frame.
- **Hover** to inspect.
- **Search/filter** to narrow structure or run semantic drawer search.
- **Route/focus tools** to highlight paths on the visible explicit graph.
- **Discovery overlays** to emphasize tunnel hubs or parseable recency metadata.

The right-hand Memory & Knowledge panel is intentionally separate from the tunnel graph. Knowledge-graph stats, diary reads, AAAK spec data, duplicate checks, and semantic search are related memory surfaces, but they do not become graph edges unless the MCP/API exposes them as graph relationships.

---

## 🧠 Graph truth model

The 3D graph is driven by explicit MemPalace MCP/API data.

### What counts as a graph edge?

Edges come from canonicalized API fields such as:

- `edgesResolved`
- `summary`
- `graphMeta`
- legacy compatibility fields derived from the same canonical source

With stock MemPalace, the primary graph edge type is:

| Relationship | Meaning |
| --- | --- |
| `tunnel` | A room name appearing in more than one wing, discovered through MemPalace tunnel tooling and resolved against taxonomy. |

### What does not count as a graph edge?

MemPalace Viz does **not** invent edges from:

- visual proximity
- taxonomy adjacency
- semantic search similarity
- diary references
- knowledge-graph stats
- drawer content
- room name guesses
- UI selection history

Disconnected components are a valid and expected state.

For deeper details, see:

- [`docs/GRAPH_SEMANTICS.md`](docs/GRAPH_SEMANTICS.md)
- [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md)
- [`docs/MCP_CONNECTION_CAPABILITIES.md`](docs/MCP_CONNECTION_CAPABILITIES.md)
- [`docs/DATA_MINING.md`](docs/DATA_MINING.md)

---

## 🏗️ Architecture

```text
┌────────────────────┐
│ Browser UI          │
│ index.html / ui.js  │
│ Three.js scene      │
└─────────┬──────────┘
          │ HTTP JSON
          ▼
┌────────────────────┐
│ server.js           │
│ Node API bridge     │
│ Static file server  │
└─────────┬──────────┘
          │ stdio JSON-RPC
          ▼
┌────────────────────┐
│ MemPalace MCP       │
│ python -m           │
│ mempalace.mcp_server│
└────────────────────┘
```

The bridge is intentionally thin:

- Spawns the MemPalace MCP server per request.
- Normalizes taxonomy and graph data through `canonical.js`.
- Serves the browser UI.
- Exposes selected MCP tools over HTTP.
- Keeps graph provenance visible through `graphMeta`.

---

## 🚀 Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the MemPalace Viz bridge

```bash
node server.js
```

By default, `server.js` expects a workspace layout similar to:

```text
<workspace>/
  mempalace/
  mempalace-venv/
```

You can override paths with environment variables:

```bash
WORKSPACE=/path/to/workspace \
MEMPALACE_ROOT=/path/to/mempalace \
VENV_PYTHON=/path/to/venv/bin/python \
node server.js
```

Optional diary agent label:

```bash
MEMPALACE_VIZ_DIARY_AGENT=my-agent node server.js
```

### 3. Start the dev UI

In another terminal:

```bash
npm run dev
```

The Vite dev server proxies API calls to the Node bridge.

### 4. Open the viewer

Common local entry points:

```text
http://localhost:3001
http://localhost:8767
http://localhost:8767/viz
http://localhost:8767/3d
http://localhost:8767/palace3d
```

---

## 📦 Production build

```bash
npm run build
```

The build output is written to:

```text
dist/
```

Preview the production bundle with:

```bash
npm run preview
```

---

## 🧪 Tests

```bash
npm test
```

Tests use Node’s built-in test runner and cover key frontend/helper behavior.

---

## 🔌 HTTP API surface

The HTTP bridge exposes palace structure, graph data, MCP passthrough reads, mutation routes, and local LLM proxy support.

### Core palace and graph

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/status` | Palace status and health metadata. |
| `GET` | `/api/wings` | Wings and drawer counts. |
| `GET` | `/api/rooms?wing=...` | Rooms for a wing. |
| `GET` | `/api/taxonomy` | Wing → room → drawer hierarchy with canonical IDs. |
| `GET` | `/api/palace` | Full normalized palace snapshot. |
| `GET` | `/api/graph-stats` | Canonical tunnel graph with `edgesResolved`, `summary`, and `graphMeta`. |
| `GET` | `/api/overview` | Bundled palace, graph, status, and summary stats. |
| `GET` | `/api/kg-stats` | Knowledge-graph statistics, separate from the palace graph. |
| `GET` | `/api/mcp-tools` | MCP `tools/list` catalog. |

### Search, traversal, diary, and inspection

| Method | Endpoint | MCP tool |
| --- | --- | --- |
| `GET` | `/api/search` | `mempalace_search` |
| `GET` | `/api/traverse` | `mempalace_traverse` |
| `GET` | `/api/kg-query` | `mempalace_kg_query` |
| `GET` | `/api/kg-timeline` | `mempalace_kg_timeline` |
| `GET` | `/api/aaak-spec` | `mempalace_get_aaak_spec` |
| `GET` | `/api/diary` | `mempalace_diary_read` |
| `POST` | `/api/check-duplicate` | `mempalace_check_duplicate` |
| `GET` | `/api/list-drawers` | `mempalace_list_drawers` |
| `GET` | `/api/drawer` | `mempalace_get_drawer` |

### Tunnel management

| Method | Endpoint | MCP tool |
| --- | --- | --- |
| `GET` | `/api/find-tunnels` | `mempalace_find_tunnels` |
| `GET` | `/api/list-tunnels` | `mempalace_list_tunnels` |
| `GET` | `/api/follow-tunnels` | `mempalace_follow_tunnels` |
| `POST` | `/api/create-tunnel` | `mempalace_create_tunnel` |
| `POST` | `/api/delete-tunnel` | `mempalace_delete_tunnel` |

### Mutation and maintenance

| Method | Endpoint | MCP tool |
| --- | --- | --- |
| `POST` | `/api/kg-add` | `mempalace_kg_add` |
| `POST` | `/api/kg-invalidate` | `mempalace_kg_invalidate` |
| `POST` | `/api/add-drawer` | `mempalace_add_drawer` |
| `POST` | `/api/delete-drawer` | `mempalace_delete_drawer` |
| `POST` | `/api/update-drawer` | `mempalace_update_drawer` |
| `POST` | `/api/diary-write` | `mempalace_diary_write` |
| `POST` | `/api/hook-settings` | `mempalace_hook_settings` |
| `GET` | `/api/memories-filed-away` | `mempalace_memories_filed_away` |
| `GET` | `/api/reconnect` | `mempalace_reconnect` |

### Local OpenAI-compatible proxy

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/memories-chat/openai-proxy` | Browser-safe proxy for loopback OpenAI-compatible LLM endpoints. |

Full route and payload details live in [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md).

---

## 🧩 Key source files

| File | Role |
| --- | --- |
| `server.js` | Node HTTP bridge and static server. |
| `index.html` | Main shipped viewer. |
| `ui.js` | UI orchestration and view state. |
| `scene.js` | Three.js scene, rendering, layout, and lighting. |
| `canonical.js` | Canonical IDs, taxonomy normalization, and graph enrichment. |
| `graph-guidance.js` | Shared UI copy for graph truth and route status. |
| `graph-navigation.js` | View/focus navigation helpers. |
| `graph-relationships.js` | Graph relationship utilities. |
| `graph-route.js` | Route/path helpers. |
| `graph-search.js` | Search helpers. |
| `data-mining.js` | Discovery overlays and non-topological analysis. |
| `content-inspector.js` | Drawer/content inspection helpers. |
| `memories-chat-*` | Memory chat UI, prompts, retrieval, and local LLM config. |

---

## 📚 Documentation

| Doc | Contents |
| --- | --- |
| [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) | HTTP API fields, canonical IDs, graph stats, overview payloads, and MCP route mapping. |
| [`docs/GRAPH_SEMANTICS.md`](docs/GRAPH_SEMANTICS.md) | `edgesResolved`, relationship types, provenance, and graph completeness notes. |
| [`docs/MCP_CONNECTION_CAPABILITIES.md`](docs/MCP_CONNECTION_CAPABILITIES.md) | MCP tool coverage and bridge capability matrix. |
| [`docs/SOURCE_AUDIT.md`](docs/SOURCE_AUDIT.md) | Where tunnel, KG, drawer, and other data comes from. |
| [`docs/DATA_MINING.md`](docs/DATA_MINING.md) | Discovery overlays, hub/recency analysis, and limitations. |
| [`docs/frontend-heuristics.md`](docs/frontend-heuristics.md) | Canonical-first frontend paths and fallback behavior. |
| [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md) | Manual regression checklist. |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Notable product changes. |

---

## 🎨 Design language

MemPalace Viz favors a calm, cognitive, organic visual system.

### Organic over mechanical

Wings and rooms form a spatial memory landscape rather than a flat database diagram.

### Edges as thought

Tunnel links render as soft arcs, emphasizing cognitive connection over rigid wiring.

### Depth through light

Halo layers, fog, emissive breathing, and warm/cool lighting create readable depth without clutter.

### Minimal chrome

The canvas remains primary. Panels and controls explain rather than dominate.

### Truthful visualization

Discovery and search can emphasize nodes, but they do not rewrite topology.

---

## 🛠️ Tech stack

- **Three.js** — 3D rendering.
- **Vanilla ES modules** — frontend structure.
- **Vite** — development server and production bundling.
- **Node.js** — local HTTP bridge.
- **MemPalace MCP** — palace storage, search, graph, diary, and KG tooling.

---

## ⚠️ Notes and limitations

- The viewer depends on the installed MemPalace MCP server. Your local package is authoritative for available tools.
- Stock tunnel discovery may be capped upstream. The viz exposes completeness notes through `graphMeta` when truncation is suspected.
- KG stats are not the same thing as the palace tunnel graph.
- Semantic search results are content evidence, not graph edges.
- Drawer reads are content-only unless separate MCP graph/tunnel tools expose a relationship.
- Local LLM proxying is intended for loopback OpenAI-compatible endpoints.

---

## ✅ Release checklist

Before publishing or merging larger UI/API changes:

```bash
npm install
npm test
npm run build
node server.js
```

Then manually verify:

- Viewer loads from `/`, `/viz`, `/3d`, and `/palace3d`.
- `/api/status` returns a healthy palace response.
- `/api/overview` includes `edgesResolved`, `summary`, and `graphMeta`.
- Graph view does not invent edges for disconnected rooms.
- Drawer search and drawer inspection still work.
- Memory & Knowledge panel surfaces remain separate from graph topology.
- Local LLM proxy only targets allowed loopback endpoints.

See [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md) for the full manual pass.

---

## 🗺️ Project status

MemPalace Viz is an active local-first visualization layer for MemPalace. It is optimized for development, inspection, and personal memory-system workflows rather than hosted multi-user deployment.

---

## 🤝 Contributing

This project is currently structured around a local MemPalace workflow. Contributions should preserve the core graph contract:

1. Prefer canonical IDs over display-string parsing.
2. Keep graph edges explicit and provenance-backed.
3. Do not mix KG, search, or diary data into topology unless the API contract says so.
4. Keep UI copy aligned with graph semantics.
5. Update docs when endpoint behavior changes.

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

<p align="center">
  <strong>Made for MemPalace.</strong><br />
  A cognitive map for memory systems that should remain honest about what they know.
</p>
