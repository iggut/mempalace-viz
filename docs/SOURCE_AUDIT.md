# Relationship sources — audit (MemPalace viz phase)

This is a concise map of **where graph-related relationship data comes from** in the MemPalace stack, as of this enrichment phase.

## Chroma palace (`palace_graph.py` + MCP)

| Source | Explicit / inferred | Caps / gaps | Cost |
| --- | --- | --- | --- |
| **`build_graph` → tunnel rooms** | Explicit: same `room` name appears in **≥2 wings** (Chroma metadata) | Upstream **`find_tunnels` returns at most 50 rows** (`palace_graph.py`). The viz HTTP API **does not** patch MemPalace; it **heuristically** flags possible truncation when the MCP JSON array has length 50. | One full collection scan in batches (1000 rows); linear in drawer count. |
| **`mempalace_graph_stats`** | Summary over the same graph (room counts, tunnel room count, hall edges list length) | Does not list every tunnel row; use `find_tunnels` for rows. | Same scan as `build_graph`. |
| **`mempalace_get_taxonomy`** | Explicit hierarchy: wing → room → drawer count | Taxonomy is authoritative for **which** `(wing, room)` pairs exist for resolution. | MCP/Chroma read. |

## Viz HTTP API (`server.js` + `canonical.js`)

| Source | Explicit / inferred | Notes |
| --- | --- | --- |
| **Tunnel edges** | Explicit (Chroma-backed) | `relationshipType: "tunnel"`, `metadata.origin: "mempalace_find_tunnels"`. |
| **Taxonomy adjacency** | *(removed from viz)* | Was a client-side heuristic; the 3D graph now uses **tunnel edges only** from MCP. |

## Not used for room–room graph (yet)

| Source | Why |
| --- | --- |
| **SQLite knowledge graph (`mempalace_kg_*`)** | Entity/triple graph; not keyed to palace `wing`/`room` IDs in a way that yields stable room–room edges without extra projection. Surfaced read-only via `/api/kg-stats` for footer stats. |

## Cheap vs expensive

- **Cheap at query time:** merging precomputed tunnel rows with taxonomy for **endpoint resolution** in Node (pure CPU). No inferred taxonomy-adjacency edges are added to the shipped graph.
- **Expensive:** full Chroma metadata sweep (`build_graph`) — unavoidable for complete tunnel discovery unless MemPalace adds an index.
