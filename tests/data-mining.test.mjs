import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPalaceMiningModel,
  collectRecentTimesByRoom,
  normalizeActivityWeights,
  normalizeHubWeights,
  parseTunnelRecentToTime,
  weightsForMiningMode,
  MINING_OVERLAY_MODES,
} from '../data-mining.js';

test('parseTunnelRecentToTime accepts ISO strings', () => {
  const t = parseTunnelRecentToTime('2024-06-01T12:00:00.000Z');
  assert.equal(typeof t, 'number');
  assert.ok(Number.isFinite(t));
});

test('parseTunnelRecentToTime accepts YYYY-MM-DD prefix', () => {
  const t = parseTunnelRecentToTime('2024-06-01 extra text');
  assert.ok(Number.isFinite(t));
});

test('normalizeHubWeights scales by max degree', () => {
  const m = new Map([
    ['a/x', 2],
    ['b/y', 4],
  ]);
  const w = normalizeHubWeights(m);
  assert.equal(w['a/x'], 0.5);
  assert.equal(w['b/y'], 1);
});

test('normalizeActivityWeights spreads recency across rooms', () => {
  const map = new Map([
    ['a/x', 1000],
    ['b/y', 3000],
  ]);
  const w = normalizeActivityWeights(map);
  assert.ok(w['a/x'] < w['b/y']);
  assert.ok(w['a/x'] >= 0.2 && w['a/x'] <= 1);
  assert.ok(w['b/y'] >= 0.2 && w['b/y'] <= 1);
});

test('collectRecentTimesByRoom keeps max per room', () => {
  const edges = [
    {
      relationshipType: 'tunnel',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/b',
      metadata: { recent: '2024-06-01T12:00:00.000Z' },
    },
    {
      relationshipType: 'tunnel',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/c',
      metadata: { recent: '2025-06-01T12:00:00.000Z' },
    },
  ];
  const m = collectRecentTimesByRoom(edges);
  assert.ok(m.get('w/a') && m.get('w/b') && m.get('w/c'));
  assert.equal(m.get('w/a'), m.get('w/c'));
  assert.ok(m.get('w/a') > m.get('w/b'));
});

test('buildPalaceMiningModel wires hubs and activity', () => {
  const ga = {
    hasResolvableEdges: true,
    degreeByKey: new Map([
      ['w/a', 2],
      ['w/b', 1],
    ]),
  };
  const edgesResolved = [
    {
      relationshipType: 'tunnel',
      sourceRoomId: 'w/a',
      targetRoomId: 'w/b',
      metadata: { recent: '2024-06-01' },
    },
  ];
  const model = buildPalaceMiningModel({ edgesResolved, ga, graphMeta: null });
  assert.equal(model.hubByRoomId['w/a'], 1);
  assert.ok(model.hasActivitySignal);
  assert.ok(weightsForMiningMode(model, MINING_OVERLAY_MODES.HUBS)['w/a']);
});
