# MemPalace MCP — capabilities vs this viewer

**Source of truth:** the MemPalace Python package (`python -m mempalace.mcp_server`), JSON-RPC over stdio — see the official repo [MemPalace/mempalace](https://github.com/MemPalace/mempalace) (`mempalace/mcp_server.py`). Marketing or docs that list a different **tool count** than your installed package should be resolved with `tools/list` on **your** server; the stock `TOOLS` registry in current upstream `mcp_server.py` defines **19** named tools.

This viewer is a **read-only HTTP façade** over a subset of those tools. It does **not** replace Claude Code / MCP clients for search, writes, diaries, or KG mutation.

## 1. Capability coverage matrix

| MCP tool (official) | Used by `server.js` / viz | Notes |
| --- | --- | --- |
| `mempalace_status` | Yes (`/api/status`, `/api/palace`, `/api/overview`) | Includes `protocol` and `aaak_dialect` (memory protocol + AAAK spec text); passed through as opaque JSON — UI does not parse them. |
| `mempalace_list_wings` | Yes | Cached briefly for `/api/wings`. |
| `mempalace_list_rooms` | Yes | `/api/rooms` — optional `wing` query matches MCP `wing` param. |
| `mempalace_get_taxonomy` | Yes | Canonical ids layered in `canonical.js`. |
| `mempalace_find_tunnels` | Yes | **Tunnel graph edges** are derived here + taxonomy (`canonical.js`). Optional `wing_a` / `wing_b` filters exist upstream; the bridge calls **without** filters (full list, capped at 50 rows). |
| `mempalace_graph_stats` | Yes | Included in snapshots as `rawGraphStats`. See **Important:** below — `total_edges` is **not** the same as tunnel-pair edges from `find_tunnels`. |
| `mempalace_kg_stats` | Yes | `/api/kg-stats` and `/api/palace`; optional — failures become `null` (empty KG is valid). |
| `mempalace_search` | No | Scoped semantic retrieval; out of scope for the 3D viewer (no search UI). |
| `mempalace_check_duplicate` | No | Write-prep helper; out of scope. |
| `mempalace_get_aaak_spec` | No | Agents load AAAK via MCP directly; viz does not surface it. |
| `mempalace_traverse` | No | Cross-wing walk from a room; could enrich navigation in a future version; not used. |
| `mempalace_kg_query` | No | Temporal KG reads; **not** merged into the palace room graph (different substrate). |
| `mempalace_kg_add` | No | Write. |
| `mempalace_kg_invalidate` | No | Write. |
| `mempalace_kg_timeline` | No | KG timeline; not surfaced. |
| `mempalace_add_drawer` | No | Write — referenced in UI copy only. |
| `mempalace_delete_drawer` | No | Write. |
| `mempalace_diary_write` | No | Write. |
| `mempalace_diary_read` | No | Read — out of scope for this visualization. |

### Important: `mempalace_graph_stats` vs `mempalace_find_tunnels`

Upstream `palace_graph.graph_stats()` sets `total_edges` from an internal **edges** list whose rows are emitted per `(wing_a, wing_b, **hall**)` when **hall** metadata is present on drawers. If your palace has cross-wing tunnel **rooms** (same room name in ≥2 wings) but drawers lack `hall` metadata, **`total_edges` can be 0** while `tunnel_rooms` and `find_tunnels` are still non-empty. The viz **graph** uses **`find_tunnels` + taxonomy**, not `total_edges`, for `edgesResolved`. Treat `rawGraphStats` as an upstream summary field, not as the canonical edge count for the 3D graph.

### Tunnel row shape

`mempalace_find_tunnels` returns objects such as `{ room, wings, halls, count, recent }`. The viewer builds pairwise edges from `room` + `wings` (+ `count` for weight). It does **not** currently attach `halls` / `recent` to edge `metadata` (could be a future enhancement).

## 2. Graph-related capabilities (summary)

| Role | MCP tool |
| --- | --- |
| Structure | `mempalace_get_taxonomy`, `mempalace_list_wings`, `mempalace_list_rooms` |
| Tunnel edges (viz graph) | `mempalace_find_tunnels` |
| Aggregate stats (informational) | `mempalace_graph_stats` |
| KG (separate from palace tunnel graph) | `mempalace_kg_stats` only |

Tunnel **edges** in the viz are built from `find_tunnels` + taxonomy resolution (`canonical.js`). They are **not** arbitrary user-drawn links between any two rooms.

## 3. Writes in stock MCP

| Tool | Purpose |
| --- | --- |
| `mempalace_add_drawer` | File verbatim content into a wing/room. |
| `mempalace_delete_drawer` | Remove a drawer by id. |

There is **no** MCP tool in stock `mcp_server.py` to persist an arbitrary `(wing A, room X) → (wing B, room Y)` graph edge. New tunnel-like structure appears when the **same room name** exists under **multiple wings** (see upstream `palace_graph.py` / Chroma metadata).

Other tools (`mempalace_kg_*`, diary, search) target the **KG**, **diaries**, or **retrieval** — not the palace room–room tunnel graph used by this 3D view.

## 4. Viz behavior (unchanged)

- The graph uses **MCP-backed tunnel edges only** (plus taxonomy for endpoints). **No** client-side inferred adjacency layer is added to `edgesResolved` (stock path).
- **Connection authoring** that persisted arbitrary links through MCP would require a **new upstream MemPalace API**; the viz cannot invent that while staying faithful to the server.
