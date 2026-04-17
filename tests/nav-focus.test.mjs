import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { canNavigateBack, peekRoomsBackAction } from '../nav-focus.js';

describe('nav-focus', () => {
  it('canNavigateBack: rooms view always allows back', () => {
    assert.equal(canNavigateBack('rooms', 0), true);
  });

  it('canNavigateBack: wings view never allows back', () => {
    assert.equal(canNavigateBack('wings', 0), false);
  });

  it('canNavigateBack: graph view allows back only with focus history', () => {
    assert.equal(canNavigateBack('graph', 0), false);
    assert.equal(canNavigateBack('graph', 1), true);
  });

  it('peekRoomsBackAction describes depth', () => {
    assert.equal(peekRoomsBackAction(null, null), 'allRoomsToWings');
    assert.equal(peekRoomsBackAction('w', null), 'toOverview');
    assert.equal(peekRoomsBackAction('w', 'r'), 'toWing');
  });
});
