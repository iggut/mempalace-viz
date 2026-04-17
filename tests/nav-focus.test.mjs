import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANONICAL_NAV,
  canNavigateBack,
  getCanonicalNavLevel,
  peekNextBackAction,
  peekRoomsBackAction,
} from '../nav-focus.js';

describe('nav-focus', () => {
  describe('getCanonicalNavLevel', () => {
    it('maps tabs + wing/room to a single canonical level', () => {
      assert.equal(getCanonicalNavLevel('wings', null, null), CANONICAL_NAV.OVERVIEW);
      assert.equal(getCanonicalNavLevel('wings', 'W', null), CANONICAL_NAV.OVERVIEW);
      assert.equal(getCanonicalNavLevel('rooms', null, null), CANONICAL_NAV.ROOMS_ALL);
      assert.equal(getCanonicalNavLevel('rooms', 'W', null), CANONICAL_NAV.WING_SCOPE);
      assert.equal(getCanonicalNavLevel('rooms', 'W', 'R'), CANONICAL_NAV.ROOM_SCOPE);
      assert.equal(getCanonicalNavLevel('graph', null, null), CANONICAL_NAV.GRAPH_FOCUS);
      assert.equal(getCanonicalNavLevel('graph', 'W', 'R'), CANONICAL_NAV.GRAPH_FOCUS);
    });
  });

  describe('canNavigateBack', () => {
    it('rooms view always allows structural back', () => {
      assert.equal(canNavigateBack('rooms', 0), true);
    });

    it('wings overview never allows back', () => {
      assert.equal(canNavigateBack('wings', 0), false);
    });

    it('graph view allows back only when focus history has depth', () => {
      assert.equal(canNavigateBack('graph', 0), false);
      assert.equal(canNavigateBack('graph', 1), true);
    });
  });

  describe('peekRoomsBackAction', () => {
    it('describes rooms depth', () => {
      assert.equal(peekRoomsBackAction(null, null), 'allRoomsToWings');
      assert.equal(peekRoomsBackAction('w', null), 'toOverview');
      assert.equal(peekRoomsBackAction('w', 'r'), 'toWing');
    });
  });

  describe('peekNextBackAction — mixed transitions', () => {
    it('room_scope → graph tab: no graph history until intra-graph moves (back disabled at depth 0)', () => {
      assert.equal(peekNextBackAction('graph', 'W', 'R', 0), 'none');
      assert.equal(canNavigateBack('graph', 0), false);
    });

    it('room → graph → back pops focus when history exists', () => {
      assert.equal(peekNextBackAction('graph', 'W', 'R', 1), 'graphFocusPop');
      assert.equal(canNavigateBack('graph', 1), true);
    });

    it('room → tabs: structural back is still rooms-shaped after returning to Rooms', () => {
      assert.equal(getCanonicalNavLevel('rooms', 'W', 'R'), CANONICAL_NAV.ROOM_SCOPE);
      assert.equal(peekNextBackAction('rooms', 'W', 'R', 0), 'toWing');
    });

    it('room → overview crumb equivalence: next back from room is not overview in one step', () => {
      assert.equal(peekNextBackAction('rooms', 'W', 'R', 0), 'toWing');
      assert.equal(peekNextBackAction('rooms', 'W', null, 0), 'toOverview');
    });

    it('all rooms → back goes to wings overview (single step)', () => {
      assert.equal(peekNextBackAction('rooms', null, null, 0), 'allRoomsToWings');
    });

    it('graph focus history exhausted → back action none', () => {
      assert.equal(peekNextBackAction('graph', 'W', 'R', 0), 'none');
      assert.equal(canNavigateBack('graph', 0), false);
    });
  });
});
