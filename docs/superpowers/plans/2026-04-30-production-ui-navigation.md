# Production UI Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the MemPalace Viz interface easier to navigate and more production-ready by adding a clean command dock over the 3D canvas, a focused full-canvas mode, clearer visual hierarchy, and helper-tested navigation labels.

**Architecture:** Keep the existing single-surface viewer and Three.js scene. Add a small pure helper module for UI model decisions, then wire it into `ui.js` and `index.html` without changing data semantics. Styling stays in `styles.css`; server whitelist must include any new frontend module.

**Tech Stack:** Vanilla JS ES modules, Three.js, Node built-in test runner, static Node server on port 8767.

---

### Task 1: Add pure UI production helper tests

**Files:**
- Create: `ui-production-helpers.js`
- Create: `tests/ui-production-helpers.test.mjs`

- [ ] **Step 1: Write failing tests**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanvasActionModel,
  describeNavigationMode,
  nextFocusPanelState,
  summarizeGraphDensity,
} from '../ui-production-helpers.js';

test('describeNavigationMode creates human-first location labels', () => {
  assert.deepEqual(describeNavigationMode({ view: 'wings' }), {
    eyebrow: 'Overview',
    title: 'All wings',
    hint: 'Start with domains, then drill into rooms or switch to the neural graph.',
  });
  assert.equal(describeNavigationMode({ view: 'rooms', currentWing: 'openclaw' }).title, 'Rooms in openclaw');
  assert.equal(describeNavigationMode({ view: 'graph', selected: { type: 'room', name: 'routing', wing: 'hermes' } }).title, 'routing');
});

test('buildCanvasActionModel exposes primary navigation without sidebar hunting', () => {
  const model = buildCanvasActionModel({ view: 'graph', selected: { type: 'room' }, panelsCollapsed: { left: false, right: true } });
  assert.deepEqual(model.viewIds, ['wings', 'rooms', 'graph']);
  assert.equal(model.primaryAction.id, 'show-inspector');
  assert.equal(model.focusAction.label, 'Focus canvas');
  assert.ok(model.shortcuts.some((s) => s.key === '⌘K'));
});

test('nextFocusPanelState toggles both panels predictably', () => {
  assert.deepEqual(nextFocusPanelState({ left: false, right: false }), { left: true, right: true });
  assert.deepEqual(nextFocusPanelState({ left: true, right: true }), { left: false, right: false });
  assert.deepEqual(nextFocusPanelState({ left: true, right: false }), { left: true, right: true });
});

test('summarizeGraphDensity gives compact production copy for crowded palaces', () => {
  const s = summarizeGraphDensity({ roomCount: 70, edgeCount: 420 });
  assert.equal(s.tone, 'dense');
  assert.match(s.label, /Dense graph/);
  assert.match(s.detail, /search/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/ui-production-helpers.test.mjs`
Expected: FAIL because `ui-production-helpers.js` does not exist yet.

### Task 2: Implement helper module and wire new module into static server

**Files:**
- Create: `ui-production-helpers.js`
- Modify: `server.js`

- [ ] **Step 1: Implement minimal helpers**

Export `describeNavigationMode`, `buildCanvasActionModel`, `nextFocusPanelState`, and `summarizeGraphDensity` with deterministic strings and no DOM dependencies.

- [ ] **Step 2: Add `/ui-production-helpers.js` to `STATIC_FILES` in `server.js`**

Keep the whitelist explicit so browser module imports do not 404.

- [ ] **Step 3: Run helper test**

Run: `node --test tests/ui-production-helpers.test.mjs`
Expected: PASS.

### Task 3: Add canvas command dock markup

**Files:**
- Modify: `index.html`
- Modify: `ui.js`

- [ ] **Step 1: Add dock shell inside `main.canvas-column`, before `#loading-overlay`**

Include:
- `#canvas-command-dock`
- `#canvas-location-eyebrow`, `#canvas-location-title`, `#canvas-location-hint`
- view buttons with `data-canvas-view`
- action buttons for structure search, semantic search, reset camera, labels, focus canvas, and inspector
- density text `#canvas-density-pill`

- [ ] **Step 2: Import helpers into `ui.js`**

Use the helpers to render title/hint/action labels. Keep all side effects in `ui.js`.

- [ ] **Step 3: Wire dock interactions**

`data-canvas-view` calls `applyView`; search buttons focus existing inputs; reset calls `sceneApi.resetCamera`; labels toggles `#toggle-labels`; focus canvas calls `nextFocusPanelState` and `setPanelCollapsed`; inspector opens the right panel.

### Task 4: Production visual cleanup CSS

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Style command dock as low-noise glass**

Dock should be top-center, readable, non-blocking, responsive, and have clear active view states.

- [ ] **Step 2: Improve panel and footer density**

Use stronger hierarchy for panel headers, cleaner spacing, less footer clutter at smaller widths, and stable mobile layout.

- [ ] **Step 3: Add responsive/focus states**

At narrow widths, dock wraps without covering the scene; focus-visible outlines remain obvious.

### Task 5: Verify and commit

**Files:**
- All changed files

- [ ] **Step 1: Run full tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: build exits 0. Existing Vite chunk warnings are acceptable.

- [ ] **Step 3: Run live browser smoke test**

Open `http://127.0.0.1:8767/`, verify:
- graph loads with no console errors
- command dock is visible and usable
- view buttons switch modes
- focus canvas collapses/restores panels
- search and semantic search shortcuts focus correct inputs

- [ ] **Step 4: Commit and push**

Commit message: `Improve production UI navigation`.
