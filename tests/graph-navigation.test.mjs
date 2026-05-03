import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseRoomSceneId,
  popFocusHistory,
  pushFocusHistory,
  shouldPushHistoryOnGraphSearchJump,
  stepAdjacentRoom,
} from '../graph-navigation.js';

test('parseRoomSceneId', () => {
  assert.deepEqual(parseRoomSceneId('room:alpha:beta'), { wing: 'alpha', room: 'beta' });
  assert.deepEqual(parseRoomSceneId('room:w:a:b'), { wing: 'w', room: 'a:b' });
  assert.equal(parseRoomSceneId('wing:x'), null);
});

test('pushFocusHistory and popFocusHistory', () => {
  const stack = [];
  pushFocusHistory(stack, { view: 'wings', selected: null, pinned: false, currentWing: null, currentRoom: null });
  assert.equal(stack.length, 0);
  const snap = { view: 'graph', selected: { id: 'room:a:b' }, pinned: true, currentWing: 'a', currentRoom: 'b' };
  pushFocusHistory(stack, snap);
  assert.equal(stack.length, 1);
  assert.deepEqual(popFocusHistory(stack), snap);
  assert.equal(stack.length, 0);
});

test('stepAdjacentRoom from outside the ring', () => {
  const nbr = ['room:w:a', 'room:w:b'];
  assert.equal(stepAdjacentRoom(nbr, 'room:w:home', 1), 'room:w:a');
  assert.equal(stepAdjacentRoom(nbr, 'room:w:home', -1), 'room:w:b');
  assert.equal(stepAdjacentRoom(nbr, 'room:w:a', 1), 'room:w:b');
});

test('stepAdjacentRoom large delta bounds', () => {
  const nbr = ['a', 'b', 'c'];
  // n=3, 16*n = 48.
  // ix of 'a' is 0.
  // 0 + (-50) + 48 = -2. -2 % 3 = -2 in JS.
  // This should ideally wrap correctly.
  assert.equal(stepAdjacentRoom(nbr, 'a', 1), 'b');
  assert.equal(stepAdjacentRoom(nbr, 'a', -1), 'c');
  assert.equal(stepAdjacentRoom(nbr, 'a', -3), 'a');
  assert.equal(stepAdjacentRoom(nbr, 'a', -50), 'b'); // (-50 % 3) is -2, wrap to 1 ('b')
});

test('shouldPushHistoryOnGraphSearchJump', () => {
  assert.equal(shouldPushHistoryOnGraphSearchJump('room:a:b', 'room:a:c', true), true);
  assert.equal(shouldPushHistoryOnGraphSearchJump('room:a:b', 'room:a:b', true), false);
  assert.equal(shouldPushHistoryOnGraphSearchJump(null, 'room:a:c', true), false);
  assert.equal(shouldPushHistoryOnGraphSearchJump('room:a:b', 'room:a:c', false), false);
});
