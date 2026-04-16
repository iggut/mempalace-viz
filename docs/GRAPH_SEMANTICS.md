# Canonical graph semantics (MemPalace viz)

**At a glance:** The 3D graph shows **explicit** MemPalace MCP/API edges (stock: **tunnels** — same room name across wings). The viewer **does not** infer or fabricate links. **Disconnected** components are valid. **KG** statistics are a **different** surface than this palace graph. **Stock MCP** does not support persisting arbitrary room-to-room graph edits. See the root `README.md` (Graph truth model) and `MCP_CONNECTION_CAPABILITIES.md`.

## Contract version

- `graphContractVersion: 2` on **`/api/graph-stats`** and **`/api/overview`** (enriched graph).
- `graphContractVersion: 1` remains on **`/api/taxonomy`** (unchanged shape).

## Canonical edge object

Each undirected edge in `edgesResolved` includes:

| Field | Meaning |
| --- | --- |
| `edgeId` | Stable string; includes relationship suffix (e.g. `__tunnel`). |
| `sourceRoomId`, `targetRoomId` | Canonical `wingId/roomName` (room segment escaped). |
| `sourceWingId`, `targetWingId` | Wing ids. |
| `crossWing` | `true` if wings differ. |
| `weight` | Layout weight; tunnels use log-scaled drawer co-occurrence when available. |
| `relationshipType` | See below. |
| `metadata` | Provenance and flags (`origin`, `inferred`, etc.). |

## Relationship types (real upstream / derivation)

| `relationshipType` | Origin |
| --- | --- |
| `tunnel` | `mempalace_find_tunnels` — same room name in multiple wings (Chroma metadata) |

**Stock** upstream emits **`tunnel`** edges for the palace graph. The `relationshipType` field is structured so a **fork** could add other explicit types without changing the viewer contract; this repo’s semantics describe what stock provides.

The viz **does not** emit `taxonomy_adjacency` or other inferred structural edges. `edgesInferred` is always empty from enriched routes (kept for schema compatibility).

## Summary block (`summary`)

In addition to `resolvedEdgeCount`, `unresolvedEdgeCount`, `crossWingEdgeCount`, `intraWingEdgeCount`:

- **`byType`**: counts per `relationshipType` (e.g. `{ "tunnel": 12 }`).

Unresolved edges refer only to **tunnel** endpoints that could not be matched to taxonomy.

## Provenance (`graphMeta`)

Returned on graph-stats and overview:

```json
{
  "sources": ["mempalace_find_tunnels"],
  "truncatedSources": [
    {
      "source": "mempalace_find_tunnels",
      "limit": 50,
      "totalMatching": null,
      "truncated": true,
      "inferred": true
    }
  ],
  "estimatedAvailable": null,
  "completenessNotes": [
    "Tunnel list from MCP has exactly 50 rows (upstream cap). More tunnel rooms may exist; total count is not exposed."
  ]
}
```

With **stock MemPalace**, MCP returns only a **bare array**. The viz layer sets `truncatedSources` / `completenessNotes` when the array length equals the known upstream cap (50) — a **heuristic**, not a proven total. If the array is shorter, we assume the list is complete. Forks may return explicit envelopes; those are passed through without the heuristic.

## Overview stats (`/api/overview` → `stats`)

Rollups include:

- Existing totals and `topConnectedRooms` / `topCrossLinkedWings` (cross-wing uses tunnel edges).
- **`byRelationshipType`**: mirror of `summary.byType`.
- **`bridgeRoomCount`**: rooms with ≥1 cross-wing incident edge.
- **`strongestIntraWingByTaxonomy`**: empty when no inferred adjacency is loaded (viz uses tunnel edges only).

## Migration from tunnel-only model

- Stock MemPalace MCP returns a **bare JSON array** of tunnel rows (capped at 50). The viz HTTP API normalizes via `parseTunnelDiscoveryResult` (including the 50-row heuristic). Optional envelopes from forks are still accepted.
- Upstream rows may include **`halls`**, **`recent`**, and **`count`** per room; `canonical.js` copies these into per-edge **`metadata`** (for inspector context). Edges remain pairwise **tunnel** links from shared room names across wings — halls are drawer metadata, not extra nodes.
- `edgeId` values include a relationship suffix; do not parse beyond equality / display.
