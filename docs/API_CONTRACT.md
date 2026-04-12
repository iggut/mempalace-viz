# MemPalace Viz API — canonical data contract

This document describes the **enriched** HTTP API exposed by `server.js` for the 3D visualization. It is designed so the frontend can use **stable identifiers** and **explicit graph semantics** instead of inferring relationships from ambiguous strings.

## Version field

Responses that include canonical graph enrichment carry:

- `graphContractVersion: 2` — typed edges, merged sources, provenance (`graphMeta`). See **`docs/GRAPH_SEMANTICS.md`**.
- `graphContractVersion: 1` — still used for **`/api/taxonomy`** only (taxonomy-only payloads).

Legacy fields from the underlying MemPalace MCP tools are preserved where practical.

---

## Canonical identifiers

### `wingId`

- **Source of truth:** Wing keys as returned by `mempalace_list_wings` / taxonomy (Chroma `wing` metadata).
- **Stability:** Stable for a given palace database; not regenerated per session.
- **Format:** Opaque string (often `snake_case` or project names). Do not parse beyond equality.

### `roomId`

- **Format:** `${wingId}/${escapedRoomName}`
- **Uniqueness:** Globally unique across the palace: the same *display* room name in two wings yields two different `roomId`s.
- **Room names with `/`:** The slash is not used as a delimiter inside the room segment. Room names are escaped by replacing `/` with the Unicode character `∕` (U+2215 DIVISION SLASH) in the segment only. Use `parseRoomId()` / `makeRoomId()` in `canonical.js` — do not split on `/` naïvely.

### Display names

Human-readable `name` fields (`wing`/`room` strings from metadata) are **separate** from ids. UIs should label with `name`, navigate with `roomId` / `wingId`.

---

## `GET /api/taxonomy`

MCP `mempalace_get_taxonomy` plus enrichment.

| Field | Description |
| --- | --- |
| `taxonomy` | `wing → room → drawer count` (legacy tree) |
| `taxonomy` (root) | Same as before if MCP returned `{ taxonomy: ... }` |
| `wings` | Array of `{ wingId, name, drawerCount, roomCount, rooms }` |
| `rooms` | Flat array of `{ roomId, wingId, name, drawerCount }` |
| `roomsData` | `wingId → [{ name, drawers, roomId, wingId }]` — backward compatible with older `roomsData` consumers |

---

## `GET /api/rooms?wing=...`

| Field | Description |
| --- | --- |
| `wing`, `rooms` | Legacy MCP shape |
| `wingId` | Set when `wing=` query present |
| `roomsCanonical` | When `wing=` is set: array of `{ name, drawerCount, roomId, wingId }` |
| `_note` | When `wing` is omitted: explains that `roomsCanonical` is not populated (all-wings listing merges room names) |

---

## `GET /api/graph-stats`

Combines:

- `mempalace_graph_stats` (legacy summary: `total_rooms`, `tunnel_rooms`, `total_edges`, …)
- `mempalace_get_taxonomy`
- `mempalace_find_tunnels` (see MCP note below)

### Canonical graph arrays

| Field | Description |
| --- | --- |
| `edgesResolved` | **Tunnel** edges from `mempalace_find_tunnels`, resolved to taxonomy. Each edge includes `relationshipType`, optional `metadata`, plus `edgeId`, `sourceRoomId`, `targetRoomId`, `sourceWingId`, `targetWingId`, `crossWing`, `weight`. (No client-inferred adjacency.) |
| `edgesUnresolved` | Tunnel endpoints that could not be matched to taxonomy: `{ rawSource, rawTarget, reason, detail? }`. Typical `reason`: `missing_in_taxonomy`. |
| `summary` | `{ resolvedEdgeCount, unresolvedEdgeCount, crossWingEdgeCount, intraWingEdgeCount, byType }` — `byType` maps `relationshipType` → count. |
| `graphMeta` | `{ sources, truncatedSources, estimatedAvailable }` — see **`docs/GRAPH_SEMANTICS.md`**. |

**Tunnel resolution:** From Chroma via `find_tunnels`: room names that appear in **multiple wings**. For each unordered wing pair `(wa, wb)` on that room, one edge with `relationshipType: "tunnel"`.

`edgesInferred` may be present as an empty array for contract compatibility; the viz does not use inferred taxonomy adjacency.

### Legacy compatibility

| Field | Description |
| --- | --- |
| `tunnels` | Adjacency-style map: `fromRoomId → { toRoomId: targetWingId }` (includes merged edges for older consumers). |
| `legacyGraphEdges` | `{ from, to, wing, sourceRoomId, targetRoomId, relationshipType?, ... }[]` |
| `rooms` | Taxonomy rooms enriched with graph-derived fields where applicable: `neighborCount`, `crossWingNeighborCount`, `intraWingNeighborCount`, `isBridge`, `rankInWingByDrawers`. |

---

## `GET /api/overview`

Single bundle for dashboards (aggregates several MCP calls).

Includes: `status`, `wingsData`, `taxonomy`, `roomsData`, `wings`, `rooms`, `edgesResolved`, `edgesUnresolved`, `summary`, `graphMeta`, `stats`, `rawGraphStats`.

### `stats` (overview summary)

Server-computed rollups:

- `totalDrawers`, `totalWings`, `totalRooms`
- `resolvedEdgeCount`, `unresolvedEdgeCount`, `crossWingEdgeCount`, `intraWingEdgeCount`
- `byRelationshipType` — mirror of `summary.byType`
- `roomsWithNoLinks` — taxonomy rooms with no incident resolved edge (any type)
- `bridgeRoomCount` — rooms with ≥1 cross-wing edge
- `strongestIntraWingByTaxonomy` — wings ranked by `taxonomy_adjacency` edge count
- `topWingsByDrawers`, `topConnectedRooms`, `topCrossLinkedWings` (pairwise wing counts for **cross-wing** edges)

---

## MCP: `mempalace_find_tunnels` (upstream MemPalace)

Stock MemPalace returns a **JSON array** of tunnel room rows. The Python implementation caps that list (typically **50** rows). The viz HTTP API does **not** control upstream; it only receives the array.

**Viz-side heuristic:** `parseTunnelDiscoveryResult()` in `canonical.js` treats a plain array of length **50** as *possibly* truncated and sets `graphMeta.truncatedSources` / `completenessNotes` accordingly. Shorter arrays are treated as complete. Optional future forks may return an envelope `{ tunnels, truncated, … }`; the parser accepts that too.

---

## Migration notes

### Older clients

- Continue using `taxonomy` tree and `wings` drawer map.
- If you ignored `graphStats.tunnels` because it was empty: use `edgesResolved` / `summary` instead.
- String keys like `wing/room` should be replaced by `roomId` via `makeRoomId(wing, room)` for rooms whose names contain `/`.

### Frontend (`mempalace-viz`)

- `loadPalaceData()` loads `overviewBundle` and enriched `graph-stats`; `graph.graphMeta` and top-level `graphMeta` expose provenance (including completeness notes when the 50-row heuristic applies).
- `graphEdges` are derived from `edgesResolved` when present (`toLegacyGraphEdges` includes `relationshipType` when available).
- Analytics (`insights.js`) use `summary.byType` when present.

---

## Assumptions

- Taxonomy from `get_taxonomy` is the authority for which `(wing, room)` pairs exist.
- Tunnel row completeness relative to Chroma is only guaranteed when the MCP array has **fewer than 50** rows (or when an enriched MCP exposes explicit totals).
