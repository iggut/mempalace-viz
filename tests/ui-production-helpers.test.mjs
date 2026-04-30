import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanvasActionModel,
  buildRoomUsefulDataSummary,
  buildWingUsefulDataSummary,
  compactFooterMetricIds,
  shouldAutoCollapseInspector,
  subjectForInspectorMode,
  usefulDataActionsForView,
  describeNavigationMode,
  nextFocusPanelState,
  summarizeGraphDensity,
} from '../ui-production-helpers.js';

test('describeNavigationMode creates human-first location labels', () => {
  assert.deepEqual(describeNavigationMode({ view: 'wings' }), {
    eyebrow: 'Overview',
    title: 'All wings',
    hint: 'Start with Find, Browse, or Graph hubs.',
  });
  assert.equal(describeNavigationMode({ view: 'rooms', currentWing: 'openclaw' }).title, 'Rooms in openclaw');
  assert.equal(
    describeNavigationMode({ view: 'graph', selected: { type: 'room', name: 'routing', wing: 'hermes' } }).title,
    'routing',
  );
});

test('buildCanvasActionModel exposes primary navigation without sidebar hunting', () => {
  const model = buildCanvasActionModel({
    view: 'graph',
    selected: { type: 'room' },
    panelsCollapsed: { left: false, right: true },
  });
  assert.deepEqual(model.viewIds, ['wings', 'rooms', 'graph']);
  assert.equal(model.primaryAction.id, 'show-details');
  assert.equal(model.focusAction.label, 'Focus canvas');
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
  assert.match(s.detail, /Find|search/i);
});


test('buildCanvasActionModel keeps the dock compact and context-primary', () => {
  assert.deepEqual(
    buildCanvasActionModel({ view: 'wings', selected: null, panelsCollapsed: { left: false, right: false } }).primaryAction,
    { id: 'focus-search', label: 'Find' },
  );
  assert.deepEqual(
    buildCanvasActionModel({ view: 'graph', selected: { type: 'room' }, panelsCollapsed: { left: false, right: false } }).primaryAction,
    { id: 'show-details', label: 'Show details' },
  );
  assert.deepEqual(
    buildCanvasActionModel({ view: 'graph', selected: null, panelsCollapsed: { left: true, right: true } }).primaryAction,
    { id: 'show-panels', label: 'Show panels' },
  );
  const model = buildCanvasActionModel({ view: 'rooms', selected: null });
  assert.deepEqual(model.secondaryActions.map((a) => a.id), ['reset-camera']);
  assert.equal(model.shortcuts.length, 0);
});

test('summarizeGraphDensity is quiet unless graph is active or dense', () => {
  assert.equal(summarizeGraphDensity({ roomCount: 8, edgeCount: 10 }).visible, false);
  assert.deepEqual(summarizeGraphDensity({ roomCount: 30, edgeCount: 100 }), {
    visible: true,
    tone: 'active',
    label: 'Active graph',
    detail: 'Use Find or click a node to narrow the scene.',
  });
});

test('buildRoomUsefulDataSummary prioritizes location, counts, signals, and actions', () => {
  const summary = buildRoomUsefulDataSummary({
    wingName: 'hermes',
    roomName: 'routing',
    drawers: 12,
    visibleDegree: 5,
    totalDegree: 8,
    crossWingLinks: 2,
    recent: '2026-04-28',
    topDrawerPreviews: ['first useful note', 'second useful note'],
    graphAvailable: true,
  });
  assert.equal(summary.title, 'routing');
  assert.equal(summary.location, 'hermes / routing');
  assert.deepEqual(summary.metrics.slice(0, 3), [
    { label: 'Drawers', value: '12' },
    { label: 'Visible links', value: '5' },
    { label: 'Cross-wing', value: '2' },
  ]);
  assert.deepEqual(summary.signals, ['8 total tunnel links', 'Recent: 2026-04-28']);
  assert.deepEqual(summary.previews, ['first useful note', 'second useful note']);
  assert.deepEqual(summary.actions.map((a) => a.id), ['open-drawers', 'show-neighbors', 'route-from-here', 'search-in-room']);
});

test('buildWingUsefulDataSummary surfaces useful wing data first', () => {
  const summary = buildWingUsefulDataSummary({
    wingName: 'hermes',
    drawerCount: 44,
    roomCount: 6,
    topRooms: [
      { name: 'routing', drawers: 18 },
      { name: 'mcp', drawers: 11 },
    ],
    bridgeRooms: [{ name: 'routing', degree: 4 }],
    graphAvailable: true,
  });
  assert.equal(summary.title, 'hermes');
  assert.deepEqual(summary.metrics, [
    { label: 'Rooms', value: '6' },
    { label: 'Drawers', value: '44' },
    { label: 'Bridge rooms', value: '1' },
  ]);
  assert.deepEqual(summary.topRooms, ['routing (18)', 'mcp (11)']);
  assert.deepEqual(summary.signals, ['Bridge: routing (4 links)']);
  assert.deepEqual(summary.actions.map((a) => a.id), ['open-rooms', 'show-graph-focus', 'search-within-wing']);
});


test('usefulDataActionsForView hides graph-only room actions outside graph', () => {
  const summary = buildRoomUsefulDataSummary({ wingName: 'w', roomName: 'r', graphAvailable: true });
  assert.deepEqual(usefulDataActionsForView(summary, { view: 'rooms' }).map((a) => a.id), [
    'open-drawers',
    'search-in-room',
  ]);
  assert.deepEqual(usefulDataActionsForView(summary, { view: 'graph' }).map((a) => a.id), [
    'open-drawers',
    'show-neighbors',
    'route-from-here',
    'search-in-room',
  ]);
});

test('compactFooterMetricIds reduces footer below 800px', () => {
  assert.deepEqual(compactFooterMetricIds(799), ['drawers', 'rooms', 'edges']);
  assert.deepEqual(compactFooterMetricIds(800), ['drawers', 'wings', 'rooms', 'edges', 'focus']);
});

test('shouldAutoCollapseInspector only collapses empty inspector under 900px', () => {
  assert.equal(shouldAutoCollapseInspector({ width: 899, selected: null }), true);
  assert.equal(shouldAutoCollapseInspector({ width: 899, selected: { type: 'room' } }), false);
  assert.equal(shouldAutoCollapseInspector({ width: 900, selected: null }), false);
});


test('subjectForInspectorMode keeps pinned graph focus inspectable', () => {
  const selected = { type: 'room', name: 'testing' };
  assert.equal(subjectForInspectorMode({ mode: 'graphFocus', selected, hovered: null }), selected);
  assert.equal(subjectForInspectorMode({ mode: 'live', selected: null, hovered: { type: 'wing' } }).type, 'wing');
  assert.equal(subjectForInspectorMode({ mode: 'empty', selected, hovered: null }), null);
});
