# MemPalace Viz — backlog

Tracked improvements and known issues from a repo pass (architecture, docs, tooling). Not all items are bugs; many are hygiene or optional hardening.

---

## Portability and scripts

- **Document or unify shell helpers.** Several scripts (`restart-viz.sh`, `stop-viz.sh`, `status-viz.sh`, `watch-server.sh`) exist; a one-line mention in the README table is enough once behavior is consistent.

---

## CI and quality gates

- **No CI workflow** — Add `.github/workflows/` (or equivalent) to run `npm test` and `npm run build` on push/PR.
- **`package.json` engines** — Optionally declare `"engines": { "node": ">=20" }` (or your minimum) so contributors know what you support.
- **Lint/format** — No ESLint/Prettier; optional for consistency on large JS surface (`ui.js`, `scene.js`).
- **Automate a slice of `docs/QA_CHECKLIST.md`** — Smoke script or Playwright that loads `/`, hits `/api/status`, and checks for fatal console errors.

---

## Dependencies

- **Three.js** — Pinned at `^0.160.0`; bumping requires a quick visual/regression pass (materials, addons paths, import map in `index.html`).

---

## Product / architecture notes

- **Per-request MCP spawn** — By design (`server.js`); fine for local use. If latency becomes painful, document or prototype a long-lived MCP subprocess with request multiplexing (larger change).
- **Security posture** — Memories Chat proxy is loopback-oriented; keep README limitation accurate if you ever widen allowed hosts.
- **`constellation.html`** — Redirect only; safe to remove eventually if nothing links to it, or keep as a bookmark alias.

---

## Nice-to-have

- **Typecheck** — TypeScript is a devDependency but the app is plain JS; either add gradual `.ts` for critical modules or drop TS from devDeps if unused.
- **Coverage** — `node --test` can report coverage on newer Node versions; optional for critical paths (`canonical.js`, `api.js`).

---

## Resolved / intentionally out of scope

- **Invented graph edges** — Correctly avoided per `GRAPH_SEMANTICS.md`; no change needed.
- **KG vs tunnel graph** — Separation is documented; keep emphasizing in UI copy.

---

## Done

- **2026-04-30** — `start.sh`: use `SCRIPT_DIR`, `HOST`/`PORT` env (like `dev-server.sh`), portable `node` invocation; guard `fuser`/`ss` when missing.
- **2026-04-30** — `docs/README.md`: MCP capabilities blurb now mentions POST mutation routes and points to `API_CONTRACT.md`.
- **2026-04-30** — `AGENTS.md`: added pointer to full HTTP inventory (`README`, `API_CONTRACT`, `server.js` header).

When you close an item, delete it or move it under **Done** with a date so this file stays trustworthy.
