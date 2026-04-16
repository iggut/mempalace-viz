# Changelog

Notable product changes. Newest first. Semver-ish; pre-1.0.

## Unreleased — release acceptance pass

**Resilience (`ui.js`)**

- `setupScene()` now wraps `createPalaceScene().init()` in try/catch. When WebGL is unavailable (disabled GPU, old browser, headless context), the loader is replaced by a clear error panel with retry instead of leaving a permanent spinner.

**Shell polish (`index.html`)**

- Added inline SVG favicon so tabs no longer 404 on `/favicon.ico`.
- Added `<meta name="description">` and `<meta name="theme-color">` for share previews and browser chrome.
- Removed the stale `unpkg.com/three@0.160.0` importmap — unused in the Vite-bundled build and a confusing network fingerprint in release artifacts.

**Repo hygiene**

- Deleted `mempalace-viz.service` (broken: used shell `&>` and `&` syntax inside `ExecStart`, which systemd does not parse through a shell) and `server.js.bak` (stale Apr 11 backup referencing removed `constellation.html`/`brain.js`).
- `restart-viz.sh` now derives its project directory from `$BASH_SOURCE` instead of a hardcoded `/home/iggut/…` path, matching `dev-server.sh` / `watch-server.sh` / `stop-viz.sh` / `status-viz.sh`.
- `dist/` is `.gitignore`d and untracked — build artifacts no longer live in source control.
- `docs/QA_CHECKLIST.md` section numbering is corrected (5 → 6 → 7).

## Previous unreleased — production hardening & interaction polish

**Interaction polish (`scene.js`)**

- Stronger selected/focused state: node emphasis scale bumped (selected 1.14 / pinned 1.18; hovered 1.08; neighbors 1.035) so the current focus reads confidently at a glance.
- Selection pulse extended 190ms → 260ms — the "you clicked this" emissive flash now registers without feeling sluggish.
- Hover card gets an accent-colored left rule that tints by node type (wing vs room), reducing ambiguity when the 3D state and inspector disagree.

**Performance / resilience (`scene.js`)**

- `pointermove` handler now coalesces into a single per-frame raycast via `requestAnimationFrame` (previously one raycast per pointer event — dozens/sec during fast drags).
- `resize` debounced into one rAF-batched update; `renderer.setSize(w, h, false)` avoids redundant CSS writes.
- Added a `ResizeObserver` on the canvas container so panel collapse/expand and layout reflows retarget the canvas without waiting for a window resize.
- Fixed empty-graph fallback sphere using undefined `CONFIG.accent.center` (was rendering white). Now a defined slate tone.

**Visual refinement (`styles.css`)**

- Text contrast nudged for legibility: `--text-muted` `#94a3b8` → `#a3b0c2`, `--text-dim` `#64748b` → `#74829a`, base `--text` slightly cooler.
- Hover card: tighter backdrop blur, faster fade (150ms → 120ms), wider max-width (280 → 300px).

## Earlier unreleased — product hardening pass

**Visualization redesign (`scene.js`)**

- Organic wing/room layout: shallow dome with deterministic per-node vertical drift (no more flat rings).
- Removed the decorative "palace core" center sphere; composition is carried by the wings themselves.
- Edges now render as soft quadratic-bezier arcs (arc height scales with distance) instead of straight lines.
- Two-layer nebula backdrop ("thought motes" + outer drift) replaces the flat starfield.
- Multi-layer halo (inner + additive outer) replaces the single glow shell.
- Warm-cool two-tone lighting (hemi + warm key + cool fill) replaces the all-blue scheme.
- Y-bob animation replaced by a calm breathing pulse on emissive intensity — no more jitter fighting depth.
- Auto-rotate default is OFF.
- Camera gets `minDistance` / `maxDistance` guards.

**UX streamline (`index.html`, `ui.js`)**

- Removed: auto-rotate toggle, motion-intensity slider, redundant "Center" button, onboard tip row, space-to-rotate shortcut, heuristic "first-visit onboarded" flag.
- Compressed header: one-line tagline, single connection pill + Refresh.
- Trimmed footer shortcut hint.

**Demo scaffolding removed**

- Deleted 6 exploratory HTML prototypes (`simple.html`, `fixed.html`, `final.html`, `nobuild.html`, `dynamic.html`, `constellation.html`) and their JS (`brain.js`).
- Deleted one-off shell helper `apply_viz_final.py`.
- Deleted 22 empty "TODO" stub modules (`actions.js`, `reducers.js`, `sagas.js`, `providers.js`, `hooks.js`, `contexts.js`, `context.js`, `effects.js`, `components.js`, `main.js`, `routes.js`, `selectors.js`, `stores.js`, `styles.js`, `utils.js`, `helpers.js`, `config.js`, `constants.js`, `visualization.js`, `high_level_synthesis.js`, `future_enhancements.js`, `implementation_summary.js`, `api_resume.js`, `hermes_resource_adapter.js`).
- Deleted unreferenced Hermes adapter shim (`hermes-mempalace-adapter.js`, `hermes-mempalace-wrapper.js`, `docs/HERMES_RESOURCE_ADAPTER.md`, and their tests).
- `server.js` trimmed by ~550 lines: removed `/api/graph`, `/api/scope`, `/api/search`, `/api/ingest`, `/api/resume`, `/api/chat` and their crystal/entity/chat helpers — endpoints only the deleted demos consumed.

**Correctness / routing**

- `/` now serves `index.html` (was `constellation.html`). No more "the app isn't at `/`" footnote.
- Static whitelist trimmed to the modules `ui.js` actually imports.

**Build / deps**

- Removed unused `react`, `react-dom`, `@react-three/drei`, `@react-three/fiber`, `d3-force`, `lodash.debounce` and their `@types` from `package.json`.

**Migration**

- If you bookmarked `http://localhost:8767/constellation` — that surface is gone; use `/`.
- Persisted UI state loses `rotate` / `motion` keys; they are silently ignored.
