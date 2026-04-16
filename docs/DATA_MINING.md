# Data mining layer (MemPalace viz)

This document defines what “data mining” means in the viewer, which official MCP/bridge sources feed it, and how it stays semantically distinct from palace topology and the knowledge graph.

## Product definition

**Data mining** here is **deterministic analysis** of already-fetched MemPalace data: tunnel edges, tunnel-row metadata, graph analytics (degree), and provenance notes. It produces **inspector copy** and **optional 3D emissive overlays** on room nodes. It does **not** create edges, infer topical similarity between wings, or claim KG facts.

## Source audit

| Source | Role | Mining use | Trust / caveats |
| --- | --- | --- | --- |
| `mempalace_find_tunnels` → `edgesResolved` | Structural truth for tunnels | Degree, hub ranking, cross-wing patterns | Truth for **which rooms share a tunnel**; row cap may truncate (`graphMeta`). |
| Tunnel row `halls`, `recent`, `count` | Copied to edge `metadata` in `canonical.js` | Recency overlay when `recent` parses as a date; inspector tunnel metadata | `recent` is **drawer metadata**, not a graph event. Unparseable strings → no recency score. |
| `graphMeta` / `completenessNotes` | Provenance | Caveats in Discovery section | Heuristic when list hits upstream cap — honest uncertainty. |
| `mempalace_graph_stats` | Separate aggregate stats | Not used as graph truth (per product rules); mining uses `edgesResolved` from snapshot | Do not treat `total_edges` etc. as replacing tunnels. |
| `mempalace_kg_stats`, KG query/timeline | KG | **Out of scope** for mining overlays | Use Memory & knowledge panel; distinct layer. |
| `mempalace_search` | Semantic retrieval | **Out of scope** for overlays; hint text clarifies relevance ≠ tunnels | Rankings are search relevance, not structural. |
| `mempalace_diary_read`, AAAK | Text protocols | **Out of scope** for mining | Context tools only. |
| `mempalace_check_duplicate` | Content similarity | **Out of scope** for automatic overlays | User-invoked; not merged into graph. |

**Semantically dangerous if misused:** treating search hits, KG triples, or degree-derived hub scores as **official tunnel edges** — the UI labels categories and uses separate visuals for overlays (emissive only, no extra lines).

## Surfaces shipped

1. **Inspector — Discovery (derived)** (overview): caveats, top tunnel hubs (normalized degree), pointer to overlays.
2. **Inspector — Discovery signals (derived)** (room): hub % and recency % when computable.
3. **Explore — Discovery overlays** (collapsible): Off / Tunnel hubs / Drawer recency — adjusts **emissive intensity** on room nodes in Graph and Rooms views only; tunnel lines unchanged.
4. **Copy fixes**: semantic search hint; Memory & knowledge lead; “Structural readout (tunnels)” wing section; “Structural insight (taxonomy + tunnels)” room section.

## Semantic boundary rules

| Layer | Meaning | UI cues |
| --- | --- | --- |
| Palace topology | `edgesResolved` tunnels | Blue tunnel lines; graph legend; relationship chips |
| KG / diary / etc. | MCP read tools | Memory & knowledge panel; `pre` outputs |
| Mined / derived | Degree, recency-from-metadata | “Discovery” / “derived” labels; purple-tinted Explore card; emissive-only overlays |
| Search relevance | `mempalace_search` scores | Stated in semantic search hint |

## Intentionally deferred

- Thematic / embedding clustering (no client-side embeddings; no invented topics).
- Cross-wing “affinity” as edges — only **structural** tunnel graph is drawn.
- Timeline “bursts” from KG without explicit user query.
- Automatic duplicate surfacing as graph links.

## QA

See `docs/QA_CHECKLIST.md` — verify overlays off by default, no extra edges, and Activity mode harmless when `recent` is absent or unparseable.
