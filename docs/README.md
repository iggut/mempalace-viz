# Documentation index

Concise references for MemPalace Viz. Product behavior lives in the root `README.md`; these files go deeper on data contracts and semantics.

| Doc | Contents |
| --- | --- |
| [**API_CONTRACT.md**](API_CONTRACT.md) | HTTP API fields, canonical ids (`wingId`, `roomId`), `graph-stats` / `overview`, MCP notes |
| [**GRAPH_SEMANTICS.md**](GRAPH_SEMANTICS.md) | `edgesResolved`, relationship types, `graphMeta`, summary stats |
| [**MCP_CONNECTION_CAPABILITIES.md**](MCP_CONNECTION_CAPABILITIES.md) | What stock MCP reads/writes; **no** arbitrary persisted palace graph links |
| [**SOURCE_AUDIT.md**](SOURCE_AUDIT.md) | Where tunnel vs KG vs other data comes from |
| [**frontend-heuristics.md**](frontend-heuristics.md) | Canonical-first frontend paths, legacy fallbacks |
| [**QA_CHECKLIST.md**](QA_CHECKLIST.md) | Short manual regression pass before releases |
| [**CHANGELOG.md**](CHANGELOG.md) | Notable product changes |

**Terminology (aligned with UI copy):**

- **Explicit MCP/API edges** — Rows from MemPalace tools, normalized to `edgesResolved` (stock: **tunnels**).
- **Resolved edges** — Endpoints matched to taxonomy; appear in the 3D graph.
- **Tunnels** — Same **room name** in **≥2 wings** (upstream discovery).
- **KG stats** — Knowledge graph aggregates; **not** the palace tunnel graph.
- **Route / path** — Shortest path on **visible** explicit edges in Graph view; may be absent if disconnected or filtered.
