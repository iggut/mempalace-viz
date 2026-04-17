import assert from 'node:assert/strict';
import test from 'node:test';
import { summarizeGraphRoomNeighborhood, summarizeGraphWingNeighborhood } from '../graph-workflow.js';

test('summarizeGraphRoomNeighborhood describes cross-wing dominant case', () => {
  const r = summarizeGraphRoomNeighborhood({
    visRoomInc: {
      degree: 8,
      crossWingLinks: 7,
      intraWingLinks: 1,
      byType: { tunnel: 7, taxonomy_adjacency: 1 },
    },
    fullRoomInc: { degree: 8 },
    slice: { medianDegree: 3, relatedRooms: [{ wing: 'A', room: 'r1', degree: 5 }] },
    graphFilterNarrowed: false,
  });
  assert.ok(r.roleLine.includes('8 visible edge'));
  assert.ok(r.balanceLine.includes('Cross-wing'));
  assert.ok(r.medianLine.includes('median degree 3'));
});

test('summarizeGraphRoomNeighborhood handles zero edges', () => {
  const r = summarizeGraphRoomNeighborhood({
    visRoomInc: { degree: 0, crossWingLinks: 0, intraWingLinks: 0, byType: {} },
    fullRoomInc: { degree: 0 },
    slice: { medianDegree: 2, relatedRooms: [] },
    graphFilterNarrowed: true,
  });
  assert.ok(r.roleLine.includes('no visible edges'));
});

test('summarizeGraphWingNeighborhood notes filters when cross-wing hidden', () => {
  const r = summarizeGraphWingNeighborhood({
    wVis: { byType: { tunnel: 1 }, crossWingTouches: 1 },
    graphFilterNarrowed: true,
    tunnelFull: { crossWingTouches: 10 },
  });
  assert.ok(r.shapeLine.includes('filters') || r.shapeLine.includes('Cross-wing'));
});

test('summarizeGraphRoomNeighborhood adds filter line when counts diverge under filters', () => {
  const r = summarizeGraphRoomNeighborhood({
    visRoomInc: { degree: 2, crossWingLinks: 1, intraWingLinks: 1, byType: { tunnel: 2 } },
    fullRoomInc: { degree: 12 },
    slice: { medianDegree: 4, relatedRooms: [] },
    graphFilterNarrowed: true,
  });
  assert.ok(r.filterLine.includes('Filters hide'));
});
