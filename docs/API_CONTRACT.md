# MemPalace Viz API — canonical data contract

This document describes the **enriched** HTTP API exposed by `server.js` for the 3D visualization. It is designed so the frontend can use **stable identifiers** and **explicit graph semantics** instead of inferring relationships from ambiguous strings.

## Version field

Responses that include canonical enrichment carry:

- `graphContractVersion: 1`

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
- `mempalace_find_tunnels`

### Canonical graph arrays

| Field | Description |
| --- | --- |
| `edgesResolved` | Tunnel edges fully resolved to taxonomy rooms. Each edge: `edgeId`, `sourceRoomId`, `targetRoomId`, `sourceWingId`, `targetWingId`, `crossWing`, `weight`. |
| `edgesUnresolved` | Endpoints that could not be matched to taxonomy: `{ rawSource, rawTarget, reason, detail? }`. Typical `reason`: `missing_in_taxonomy`. |
| `summary` | `{ resolvedEdgeCount, unresolvedEdgeCount, crossWingEdgeCount, intraWingEdgeCount }` |

**Resolution model:** Tunnels come from MemPalace `find_tunnels`: room names that appear in **multiple wings**. For each unordered wing pair `(wa, wb)` on that room, one canonical edge is emitted between `makeRoomId(wa, room)` and `makeRoomId(wb, room)`. Intra-wing-only tunnel edges are not produced by this source; `intraWingEdgeCount` is reserved for future edge sources.

### Legacy compatibility

| Field | Description |
| --- | --- |
| `tunnels` | Adjacency-style map: `fromRoomId → { toRoomId: targetWingId }` for consumers that expected a `tunnels` object (previously often empty). |
| `legacyGraphEdges` | `{ from, to, wing, sourceRoomId, targetRoomId, ... }[]` |
| `rooms` | Taxonomy rooms enriched with graph-derived fields where applicable: `neighborCount`, `crossWingNeighborCount`, `intraWingNeighborCount`, `isBridge`, `rankInWingByDrawers`. |

---

## `GET /api/overview`

Single bundle for dashboards (aggregates several MCP calls).

Includes: `status`, `wingsData`, `taxonomy`, `roomsData`, `wings`, `rooms`, `edgesResolved`, `edgesUnresolved`, `summary`, `stats`, `rawGraphStats`.

### `stats` (overview summary)

Server-computed rollups:

- `totalDrawers`, `totalWings`, `totalRooms`
- `resolvedEdgeCount`, `unresolvedEdgeCount`, `crossWingEdgeCount`, `intraWingEdgeCount`
- `roomsWithNoLinks` — taxonomy rooms with no incident resolved edge
- `topWingsByDrawers`, `topConnectedRooms`, `topCrossLinkedWings` (pairwise wing counts for cross-wing edges)

---

## Migration notes

### Older clients

- Continue using `taxonomy` tree and `wings` drawer map.
- If you ignored `graphStats.tunnels` because it was empty: use `edgesResolved` / `summary` instead.
- String keys like `wing/room` should be replaced by `roomId` via `makeRoomId(wing, room)` for rooms whose names contain `/`.

### Frontend (`mempalace-viz`)

- `loadPalaceData()` now loads `overviewBundle` and enriched `graph-stats`.
- `graphEdges` are derived from `edgesResolved` when present.
- Analytics (`insights.js`) resolve tunnel endpoints via `parseRoomId` for canonical ids.

---

## Assumptions

- Taxonomy from `get_taxonomy` is the authority for which `(wing, room)` pairs exist.
- `find_tunnels` is capped (e.g. top 50 tunnel rooms in MCP). Very large palaces may not list every tunnel in one response; counts are **consistent with that sample**, not necessarily global exhaustiveness.
