# Canonical graph semantics (MemPalace viz)

## Contract version

- `graphContractVersion: 2` on **`/api/graph-stats`** and **`/api/overview`** (enriched graph).
- `graphContractVersion: 1` remains on **`/api/taxonomy`** (unchanged shape).

## Canonical edge object

Each undirected edge in `edgesResolved` includes:

| Field | Meaning |
| --- | --- |
| `edgeId` | Stable string; includes relationship suffix (e.g. `__tunnel`, `__taxonomy_adjacency`). |
| `sourceRoomId`, `targetRoomId` | Canonical `wingId/roomName` (room segment escaped). |
| `sourceWingId`, `targetWingId` | Wing ids. |
| `crossWing` | `true` if wings differ. |
| `weight` | Layout weight; tunnels use log-scaled drawer co-occurrence when available; taxonomy adjacency uses a light fixed weight. |
| `relationshipType` | See below. |
| `metadata` | Provenance and flags (`origin`, `inferred`, etc.). |

## Relationship types (real upstream / derivation)

| `relationshipType` | Origin | Explicit vs inferred |
| --- | --- | --- |
| `tunnel` | `mempalace_find_tunnels` / Chroma cross-wing room names | **Explicit** |
| `taxonomy_adjacency` | Per-wing consecutive pair in **sorted room name** order | **Inferred** (documented; not semantic similarity) |

No placeholder types are emitted.

## Summary block (`summary`)

In addition to `resolvedEdgeCount`, `unresolvedEdgeCount`, `crossWingEdgeCount`, `intraWingEdgeCount`:

- **`byType`**: counts per `relationshipType` (e.g. `{ "tunnel": 12, "taxonomy_adjacency": 40 }`).

Unresolved edges refer only to **tunnel** endpoints that could not be matched to taxonomy.

## Provenance (`graphMeta`)

Returned on graph-stats and overview:

```json
{
  "sources": ["mempalace_find_tunnels", "taxonomy_adjacency"],
  "truncatedSources": [
    { "source": "mempalace_find_tunnels", "limit": 50, "totalMatching": 120, "truncated": true }
  ],
  "estimatedAvailable": null
}
```

When MCP returns the full tunnel list without a limit, `truncatedSources` is empty.

## Overview stats (`/api/overview` → `stats`)

Rollups include:

- Existing totals and `topConnectedRooms` / `topCrossLinkedWings` (cross-wing uses tunnel edges only; taxonomy adjacency is same-wing).
- **`byRelationshipType`**: mirror of `summary.byType`.
- **`bridgeRoomCount`**: rooms with ≥1 cross-wing incident edge.
- **`strongestIntraWingByTaxonomy`**: wings ranked by count of `taxonomy_adjacency` edges.

## Migration from tunnel-only model

- Older clients that expect `mempalace_find_tunnels` to return a **bare array** must accept `{ tunnels, truncated, limit, total_matching }` from current MCP, or use the HTTP API which normalizes via `parseTunnelDiscoveryResult`.
- `edgeId` values gained a relationship suffix; do not parse beyond equality / display.
