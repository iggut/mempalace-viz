import assert from 'node:assert/strict';
import test from 'node:test';
import {
  countEdgesWithUnresolvedEndpoints,
  formatPct,
  ordinal,
  resolveTunnelEndpoint,
} from '../insights.js';

test('resolveTunnelEndpoint parses wing/room and resolves duplicate room with hint', () => {
  const rooms = {
    a: [{ name: 'r1', drawers: 1 }],
    b: [{ name: 'r1', drawers: 2 }],
  };
  assert.equal(resolveTunnelEndpoint('a/r1', rooms, null)?.wing, 'a');
  assert.equal(resolveTunnelEndpoint('r1', rooms, 'b')?.wing, 'b');
  assert.equal(resolveTunnelEndpoint('r1', rooms, null)?.wing, 'a');
});

test('countEdgesWithUnresolvedEndpoints counts bad endpoints', () => {
  const rooms = { w: [{ name: 'x', drawers: 1 }] };
  const edges = [
    { from: 'w/x', to: 'nope' },
    { from: 'w/x', to: 'w/x' },
  ];
  assert.equal(countEdgesWithUnresolvedEndpoints(edges, rooms), 1);
});

test('formatPct and ordinal', () => {
  assert.equal(formatPct(1, 4), '25.0');
  assert.equal(formatPct(1, 0), null);
  assert.equal(ordinal(11), '11th');
  assert.equal(ordinal(3), '3rd');
});
