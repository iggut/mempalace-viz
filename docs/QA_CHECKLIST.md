# MemPalace 3D — manual QA checklist

Short regression pass for the **shipped MCP-honest, explicit-only** 3D UI (`index.html` → `ui.js`; production: `dist/` after `npm run build`). Use before releases or after copy/routing/graph changes.

---

## 1. Shipped surface sanity

- [ ] Primary entry is **`index.html`** / Vite dev (not legacy `simple.html`, `final.html`, `dynamic.html`, `constellation.html`, etc.).
- [ ] If using **`server.js`**, know root **`/`** is **not** the main product — open **`/index.html`**, **`/viz`**, **`/3d`**, or **`/palace3d`** for the shipped app (see root `README.md`).
- [ ] After **`npm run build`**, spot-check **`dist/`** matches expectations (loads, same behavior as dev for one critical path).
- [ ] Marketing or docs do **not** present legacy HTML demos as the main MemPalace 3D product.

---

## 2. MCP-honest wording

- [ ] **Help / overview / route** text still says paths use **explicit MCP edges only** (no implied inference of missing links).
- [ ] Copy does **not** suggest **inferred** or client-added edges as shipped behavior.
- [ ] Copy does **not** imply **arbitrary graph persistence** through stock MCP (tunnel workflow = naming / MemPalace data, not ad-hoc link writes).
- [ ] **Footer:** **“KG stats (API)”** stays clearly **separate** from palace tunnel graph semantics (no wording that KG = 3D link graph).
- [ ] **`graph-guidance.js`** remains the behavioral source for route failures, disconnected detail, and “how connections work” (no softer claims elsewhere that contradict it).

---

## 3. Graph semantics

- [ ] **Graph view** loads with **explicit** `edgesResolved`-style data from the API; no fake edges appear when API returns none.
- [ ] **Disconnected** components / no-path situations read as **valid state**, not as crashes or “bugs.”
- [ ] **`no_path`** / **`no_edges`** messages stay **informational** (aligned with `routeFailureMessage` / `routeDisconnectedDetailLines` — calm, non-error tone).
- [ ] **Resolved edges** and **tunnel** explanations still match reality: tunnels = same room name across wings; viewer does not invent links.

---

## 4. Search / route / navigation

- [ ] **Search** still focuses the **3D scene** (rooms/wings) as expected.
- [ ] **Route** uses only **visible explicit edges** (respects filters — narrowing filters can remove paths).
- [ ] **Route stepping** / history behavior stays coherent when neighbors are missing (expect `neighborStepDisconnectedMessage`-style guidance, not silent failure).
- [ ] **Scene-first:** primary value remains the canvas; panels don’t steal the whole viewport.

---

## 5. Guidance UX

- [ ] **“How connections work”** (and related bullets) appears in **Graph** when palace data is OK (`shouldShowHowConnectionsExplainer`).
- [ ] **Tunnel workflow** card/guidance stays accurate when resolvable graph exists (`shouldShowTunnelWorkflowCard`).
- [ ] **Collapsible** guidance does not dominate the scene — can collapse / stays secondary to the 3D view.

---

## 6. Build / regression checks

- [ ] **`npm test`** passes.
- [ ] **`npm run build`** succeeds without errors.
- [ ] **Doc paths cited in UI** still exist (e.g. `docs/MCP_CONNECTION_CAPABILITIES.md`, and any other `docs/…` links in `index.html` / help).
- [ ] Optional: quick read of **`docs/GRAPH_SEMANTICS.md`** / **`docs/API_CONTRACT.md`** if graph-stats or copy changed.

---

## Quick smoke (2 min)

1. Open shipped app → Graph → confirm edges feel MCP-driven, not invented.  
2. Pick two rooms with no path → message is informational, explains explicit edges / filters / tunnels.  
3. Footer: KG line vs graph — wording still distinct.  
4. `npm test && npm run build`.
