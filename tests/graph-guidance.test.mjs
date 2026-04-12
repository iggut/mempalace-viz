import assert from 'node:assert/strict';
import test from 'node:test';
import {
  actionableWorkflowBullets,
  graphInspectorNoEdgesNoticeLines,
  graphInspectorUnresolvedEndpointsLines,
  howConnectionsWorkBullets,
  neighborStepDisconnectedMessage,
  routeDisconnectedDetailLines,
  routeFailureMessage,
  roomWithNoTunnelNeighborsGuidance,
  shouldShowHowConnectionsExplainer,
  shouldShowTunnelWorkflowCard,
} from '../graph-guidance.js';

test('routeFailureMessage: no_path matches MCP-honest primary line', () => {
  const m = routeFailureMessage('no_path');
  assert.ok(m.includes('No explicit MCP path'));
  assert.ok(m.includes('edges currently shown'));
});

test('routeFailureMessage: no_edges distinguishes filter squeeze vs empty data', () => {
  const narrowed = routeFailureMessage('no_edges', { graphFilterNarrowed: true });
  assert.ok(narrowed.includes('filters'));
  const empty = routeFailureMessage('no_edges', { graphFilterNarrowed: false });
  assert.ok(empty.includes('No graph edges'));
  assert.ok(empty.includes('does not add'));
});

test('routeDisconnectedDetailLines: no_path explains tunnels and optional filters', () => {
  const base = routeDisconnectedDetailLines('no_path', { graphFilterNarrowed: false });
  assert.ok(base.length >= 2);
  assert.ok(base.some((l) => l.includes('explicit MemPalace')));
  assert.ok(base.some((l) => l.includes('same room name')));
  const filt = routeDisconnectedDetailLines('no_path', { graphFilterNarrowed: true });
  assert.ok(filt.some((l) => l.includes('filters')));
});

test('routeDisconnectedDetailLines: no_edges', () => {
  const a = routeDisconnectedDetailLines('no_edges', { graphFilterNarrowed: true });
  assert.ok(a.length >= 1);
  assert.ok(a.some((l) => l.includes('visible graph edge')));
  const b = routeDisconnectedDetailLines('no_edges', { graphFilterNarrowed: false });
  assert.ok(b.some((l) => l.includes('Reload') || l.includes('stock MCP')));
});

test('routeDisconnectedDetailLines: unknown reason is empty', () => {
  assert.deepEqual(routeDisconnectedDetailLines('missing_endpoint'), []);
});

test('howConnectionsWorkBullets covers MCP surface', () => {
  const b = howConnectionsWorkBullets();
  assert.ok(b.length >= 4);
  const t = b.join(' ');
  assert.ok(t.includes('MCP'));
  assert.ok(t.includes('invent'));
  assert.ok(t.includes('arbitrary'));
});

test('actionableWorkflowBullets mentions drawer tool and refresh', () => {
  const t = actionableWorkflowBullets().join(' ');
  assert.ok(t.includes('mempalace_add_drawer'));
  assert.ok(t.includes('Refresh'));
});

test('shouldShowHowConnectionsExplainer requires graph + data', () => {
  assert.equal(shouldShowHowConnectionsExplainer({ viewIsGraph: false, palaceDataOk: true }), false);
  assert.equal(shouldShowHowConnectionsExplainer({ viewIsGraph: true, palaceDataOk: false }), false);
  assert.equal(shouldShowHowConnectionsExplainer({ viewIsGraph: true, palaceDataOk: true }), true);
});

test('shouldShowTunnelWorkflowCard requires resolvable graph', () => {
  assert.equal(shouldShowTunnelWorkflowCard({ viewIsGraph: true, hasResolvableGraph: false }), false);
  assert.equal(shouldShowTunnelWorkflowCard({ viewIsGraph: true, hasResolvableGraph: true }), true);
});

test('graphInspector copy helpers', () => {
  const empty = graphInspectorNoEdgesNoticeLines();
  assert.ok(empty.body.includes('mempalace_find_tunnels'));
  const u = graphInspectorUnresolvedEndpointsLines(3, 1);
  assert.ok(u.body.includes('3'));
  assert.ok(u.body.includes('unresolved'));
});

test('neighborStepDisconnectedMessage and room guidance are non-error tone', () => {
  assert.ok(neighborStepDisconnectedMessage().includes('disconnected'));
  assert.ok(roomWithNoTunnelNeighborsGuidance().includes('expected'));
});
