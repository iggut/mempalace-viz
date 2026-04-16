import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePalaceBundle } from '../api.js';

test('normalizePalaceBundle exposes graph.edgesResolved and overviewStats', () => {
  const bundle = normalizePalaceBundle({
    status: { total_drawers: 10 },
    wingsRaw: { projects: 10 },
    taxonomyRaw: { taxonomy: { projects: { roomA: 5 } } },
    graphStats: {
      edgesResolved: [
        {
          edgeId: 'e1',
          sourceRoomId: 'projects/roomA',
          targetRoomId: 'other/roomB',
          sourceWingId: 'projects',
          targetWingId: 'other',
          crossWing: true,
          weight: 1,
        },
      ],
      edgesUnresolved: [],
      summary: { resolvedEdgeCount: 1, crossWingEdgeCount: 1, intraWingEdgeCount: 0 },
    },
    kgResult: null,
    overviewBundle: {
      stats: {
        totalDrawers: 10,
        totalWings: 1,
        totalRooms: 1,
        resolvedEdgeCount: 1,
      },
    },
  });

  assert.equal(bundle.graph.edgesResolved.length, 1);
  assert.equal(bundle.graph.summary.resolvedEdgeCount, 1);
  assert.equal(bundle.overviewStats.totalRooms, 1);
  assert.equal(bundle.graphEdges.length, 1);
  assert.equal(bundle.graphEdges[0].sourceRoomId, 'projects/roomA');
});

test('normalizePalaceBundle falls back to tunnels when no edgesResolved', () => {
  const bundle = normalizePalaceBundle({
    status: {},
    wingsRaw: {},
    taxonomyRaw: { taxonomy: {} },
    graphStats: {
      tunnels: {
        'w/x': { 'w/y': 'w' },
      },
    },
    kgResult: null,
    overviewBundle: null,
  });

  assert.equal(bundle.graph.edgesResolved.length, 0);
  assert.equal(bundle.graphEdges.length, 1);
  assert.equal(bundle.graphEdges[0].from, 'w/x');
});

test('normalizePalaceBundle preserves fetchedAt and contract version', () => {
  const bundle = normalizePalaceBundle({
    fetchedAt: '2026-04-16T08:00:00.000Z',
    status: {},
    wingsRaw: {},
    taxonomyRaw: { taxonomy: {} },
    graphStats: {
      graphContractVersion: 2,
      edgesResolved: [],
      edgesUnresolved: [],
      summary: { resolvedEdgeCount: 0 },
    },
    kgResult: null,
    overviewBundle: { graphContractVersion: 2, stats: {} },
  });

  assert.equal(bundle.fetchedAt, '2026-04-16T08:00:00.000Z');
  assert.equal(bundle.graphContractVersion, 2);
});

test('normalizePalaceBundle rejects unsupported graph contract versions', () => {
  assert.throws(
    () =>
      normalizePalaceBundle({
        status: {},
        wingsRaw: {},
        taxonomyRaw: { taxonomy: {} },
        graphStats: {
          graphContractVersion: 1,
          edgesResolved: [],
          edgesUnresolved: [],
          summary: { resolvedEdgeCount: 0 },
        },
        kgResult: null,
        overviewBundle: null,
      }),
    /Unsupported palace graph contract version/,
  );
});
