# MemPalace MCP — capabilities vs this viewer

**Source of truth:** the MemPalace Python package (`python -m mempalace.mcp_server`), JSON-RPC over stdio — see the official repo [MemPalace/mempalace](https://github.com/MemPalace/mempalace) (`mempalace/mcp_server.py`). Marketing or docs that list a different **tool count** than your installed package should be resolved with `tools/list` on **your** server; the stock `TOOLS` registry in upstream `mcp_server.py` defines **19** named tools.

This viewer uses a **stateless HTTP bridge** (`server.js`) that spawns the MCP server per request. It exposes **read** palace structure and tunnel topology for the 3D view, plus **additional read tools** for discovery (semantic search, traverse, KG reads, diary read, AAAK spec) and a **duplicate-check** helper. **Write** tools (drawer add/delete, KG add/invalidate, diary write) are **not** proxied — use an MCP client for mutations.

## 1. Capability coverage matrix

| MCP tool (official) | HTTP / UI | Notes |
| --- | --- | --- |
| `mempalace_status` | Yes — `/api/status`, `/api/palace`, `/api/overview` | Opaque JSON; UI uses counts where applicable. |
| `mempalace_list_wings` | Yes — `/api/wings` | Cached briefly. |
| `mempalace_list_rooms` | Yes — `/api/rooms?wing=` | Matches MCP `wing` param. |
| `mempalace_get_taxonomy` | Yes — `/api/taxonomy`, snapshots | Canonical ids in `canonical.js`. |
| `mempalace_find_tunnels` | Yes — snapshots | **Rendered tunnel edges** = `edgesResolved` from tunnel rows + taxonomy. Bridge calls **without** wing filters (full list, capped at 50 rows upstream). |
| `mempalace_graph_stats` | Yes — `rawGraphStats` in snapshots | **`total_edges` ≠** rendered tunnel-pair count — see below. |
| `mempalace_kg_stats` | Yes — `/api/kg-stats`, snapshots | Optional; failure → `null`. |
| `mempalace_search` | Yes — `GET /api/search` | **Semantic search** in the left panel; results jump to wing/room in Graph when taxonomy matches. |
| `mempalace_check_duplicate` | Yes — `POST /api/check-duplicate` | **Memory lens** panel — optional filing aid; not part of the 3D scene. |
| `mempalace_get_aaak_spec` | Yes — `GET /api/aaak-spec` | Memory lens — AAAK text. |
| `mempalace_traverse` | Yes — `GET /api/traverse` | Room inspector **“Palace traverse”** + same API. Uses **room name** as `start_room` (palace graph keys). |
| `mempalace_kg_query` | Yes — `GET /api/kg-query` | Memory lens — **not** merged into tunnel topology. |
| `mempalace_kg_add` | No | Write — use MCP. |
| `mempalace_kg_invalidate` | No | Write — use MCP. |
| `mempalace_kg_timeline` | Yes — `GET /api/kg-timeline` | Memory lens. |
| `mempalace_add_drawer` | No | Write — referenced in guidance copy only. |
| `mempalace_delete_drawer` | No | Write — use MCP. |
| `mempalace_diary_write` | No | Write — use MCP. |
| `mempalace_diary_read` | Yes — `GET /api/diary` | Memory lens (`MEMPALACE_VIZ_DIARY_AGENT` env for default agent label). |

**Introspection:** `GET /api/mcp-tools` returns the same payload as MCP `tools/list` (official names + schemas).

### Important: `mempalace_graph_stats` vs `mempalace_find_tunnels`

Upstream `palace_graph.graph_stats()` sets `total_edges` from an internal **edges** list whose rows are emitted per `(wing_a, wing_b, **hall**)` when **hall** metadata is present on drawers. If your palace has cross-wing tunnel **rooms** (same room name in ≥2 wings) but drawers lack `hall` metadata, **`total_edges` can be 0** while `tunnel_rooms` and `find_tunnels` are still non-empty. The viz **graph** uses **`find_tunnels` + taxonomy**, not `total_edges`, for `edgesResolved`. Treat `rawGraphStats` as an upstream summary field, not as the canonical edge count for the 3D graph.

### Tunnel row shape

`mempalace_find_tunnels` returns objects such as `{ room, wings, halls, count, recent }`. The viewer builds pairwise edges from `room` + `wings` (+ `count` for weight). **`halls` / `recent` / drawer count** are copied into per-edge `metadata` for inspector context where present — they describe **drawer metadata**, not extra graph nodes.

## 2. Graph-related capabilities (summary)

| Role | MCP tool |
| --- | --- |
| Structure | `mempalace_get_taxonomy`, `mempalace_list_wings`, `mempalace_list_rooms` |
| Tunnel edges (viz graph) | `mempalace_find_tunnels` |
| Aggregate stats (informational) | `mempalace_graph_stats` |
| KG (separate from palace tunnel graph) | `mempalace_kg_stats`, `mempalace_kg_query`, `mempalace_kg_timeline` |

Tunnel **edges** in the viz are built from `find_tunnels` + taxonomy resolution (`canonical.js`). They are **not** arbitrary user-drawn links between any two rooms.

## 3. Writes in stock MCP

| Tool | Purpose |
| --- | --- |
| `mempalace_add_drawer` | File verbatim content into a wing/room. |
| `mempalace_delete_drawer` | Remove a drawer by id. |
| `mempalace_kg_add` / `mempalace_kg_invalidate` | KG mutation. |
| `mempalace_diary_write` | Agent diary. |

There is **no** MCP tool in stock `mcp_server.py` to persist an arbitrary `(wing A, room X) → (wing B, room Y)` graph edge. New tunnel-like structure appears when the **same room name** exists under **multiple wings** (see upstream `palace_graph.py` / Chroma metadata).

## 4. Viz behavior

- The 3D graph uses **MCP-backed tunnel edges only** (plus taxonomy for endpoints). **No** client-side inferred adjacency layer is added to `edgesResolved` (stock path).
- **Semantic search**, **traverse**, **KG**, and **diary** panels surface **orthogonal** official data — they do **not** add fake edges to the palace graph.
- **Connection authoring** that persisted arbitrary links through MCP would require a **new upstream MemPalace API**; the viz cannot invent that while staying faithful to the server.
