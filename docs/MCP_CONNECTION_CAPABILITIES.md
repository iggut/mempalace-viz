# MemPalace MCP — graph-related capabilities (read-only fork)

This summarizes **stock** `mempalace` MCP tools as used by the viz HTTP API. **The viz does not modify MemPalace.**

The **primary shipped client** is the 3D app (`index.html`, `ui.js`, `graph-guidance.js`, `dist/`). It reflects these capabilities in routing copy and graph behavior.

## Graph structure exposed to the viz

| MCP tool | Role |
| --- | --- |
| `mempalace_get_taxonomy` | Authoritative wing → room → drawer counts (room identity for graph nodes). |
| `mempalace_find_tunnels` | Rows used to derive **tunnel** edges: same **room name** appearing in **≥2 wings** (Chroma metadata scan). |
| `mempalace_graph_stats` | Aggregate stats over the palace graph (counts, etc.). |

Tunnel **edges** in the viz are built from `find_tunnels` + taxonomy resolution (`canonical.js`). They are **not** arbitrary user-drawn links between any two rooms.

## Writes available in stock MCP (no room–room link API)

| Tool | Purpose |
| --- | --- |
| `mempalace_add_drawer` | File content into a wing/room. |
| `mempalace_delete_drawer` | Remove a drawer by id. |

There is **no** MCP tool to persist an arbitrary `(wing A, room X) → (wing B, room Y)` graph edge. The only **data-model** way new tunnel-like structure appears in `find_tunnels` is for the **same room name** to exist under **multiple wings** (see upstream `palace_graph.py` / Chroma metadata).

Other write tools (`mempalace_kg_*`, diary, etc.) target the **SQLite knowledge graph** or diaries — not the palace room–room tunnel graph used by this 3D view.

## Viz behavior

- The graph uses **MCP-backed tunnel edges only** (plus taxonomy for endpoints). **No** client-side inferred adjacency or synthetic graph layer.
- **Connection authoring** that persisted arbitrary links through MCP would require a **new upstream MemPalace API**; the viz cannot invent that while staying faithful to the server.
