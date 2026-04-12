# Relationship sources — audit (MemPalace viz phase)

This is a concise map of **where graph-related relationship data comes from** in the MemPalace stack, as of this enrichment phase.

## Chroma palace (`palace_graph.py` + MCP)

| Source | Explicit / inferred | Caps / gaps | Cost |
| --- | --- | --- | --- |
| **`build_graph` → tunnel rooms** | Explicit: same `room` name appears in **≥2 wings** (Chroma metadata) | Previously the **tunnel list** was sliced to 50 in `find_tunnels`; the full graph scan was already uncapped. MCP now returns an **envelope** with `truncated` / `limit` / `total_matching` when a `limit` is applied. | One full collection scan in batches (1000 rows); linear in drawer count. |
| **`mempalace_graph_stats`** | Summary over the same graph (room counts, tunnel room count, hall edges list length) | Does not list every tunnel row; use `find_tunnels` for rows. | Same scan as `build_graph`. |
| **`mempalace_get_taxonomy`** | Explicit hierarchy: wing → room → drawer count | Taxonomy is authoritative for **which** `(wing, room)` pairs exist for resolution. | MCP/Chroma read. |

## Viz HTTP API (`server.js` + `canonical.js`)

| Source | Explicit / inferred | Notes |
| --- | --- | --- |
| **Tunnel edges** | Explicit (Chroma-backed) | `relationshipType: "tunnel"`, `metadata.origin: "mempalace_find_tunnels"`. |
| **Taxonomy adjacency** | **Inferred** | Same wing, consecutive rooms when **sorted by room name** — structural, not topical. `relationshipType: "taxonomy_adjacency"`, `metadata.inferred: true`. |

## Not used for room–room graph (yet)

| Source | Why |
| --- | --- |
| **SQLite knowledge graph (`mempalace_kg_*`)** | Entity/triple graph; not keyed to palace `wing`/`room` IDs in a way that yields stable room–room edges without extra projection. |
| **`/api/graph` (search crystals)** | Synthetic co-occurrence for ambient graph; separate from canonical palace graph. |

## Cheap vs expensive

- **Cheap at query time:** merging precomputed tunnel rows + taxonomy adjacency in Node (pure CPU).
- **Expensive:** full Chroma metadata sweep (`build_graph`) — unavoidable for complete tunnel discovery unless MemPalace adds an index.
