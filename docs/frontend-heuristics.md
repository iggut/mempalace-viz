# MemPalace viz — frontend identity and heuristics

This note tracks **what was removed**, **what remains**, and **why**, after the canonical `wingId` / `roomId` / `edgesResolved` API contract.

## Canonical-first path (default)

- **Wing identity:** `wingId` (object keys in `wingsData` / `roomsData` are wing ids).
- **Room identity:** `roomId` = `makeRoomId(wingId, roomName)` with `/` in room names escaped (see `canonical.js`).
- **Graph:** `graph.edgesResolved` from `/api/graph-stats` (and mirrored in `dataBundle.graph`). Analytics and layout prefer these edges.
- **Counts / overview:** `dataBundle.overviewStats` from `/api/overview` when available; `graph.summary` for tunnel totals.

Legacy-shaped **`graphEdges`** (`from` / `to` / `wing`) is still produced for compatibility and for the force-layout path, but it is **derived from** `edgesResolved` when present.

## Removed or demoted

- **Primary analytics via `resolveTunnelEndpoint` on every edge** — replaced by a canonical iterator over `edgesResolved` when the array is non-empty.
- **Ad hoc `wing/name` string as the main graph key** — replaced by `roomId` in `degreeByKey` / neighbors (display still uses wing + room name via `parseRoomId`).
- **Duplicated overview math** — top connected rooms and room-without-link counts can come from `overviewStats` when the overview endpoint ran.

## Heuristics that remain (compatibility)

| Heuristic | Where | Why |
|-----------|--------|-----|
| `resolveTunnelEndpoint` | `insights.js` | Legacy payloads: endpoints are plain room names or ambiguous strings; need hint-wing and duplicate-name disambiguation. |
| `findRoomNodeForEdge` fallbacks | `scene.js` | Old tunnel rows may use bare room names or `wing/room` without full canonical parity with taxonomy rows. |
| `toLegacyGraphEdges` | `api.js` / `canonical.js` | Feeds existing consumers that expect `from`/`to`; avoids duplicating layout glue. |
| **Tunnel adjacency fallback** in `normalizePalaceBundle` | `api.js` | When `edgesResolved` is empty but `graphStats.tunnels` exists (stale or alternate server). |

## Backend improvements that would remove more client code

- Guarantee `edgesResolved` whenever tunnels exist (so the `tunnels`-only branch rarely runs).
- Single overview+graph bundle endpoint to avoid duplicating MCP calls client-side (optional).

## Tests

Targeted tests live under `tests/` for canonical IDs, `normalizePalaceBundle`, and graph analytics (canonical + legacy).
