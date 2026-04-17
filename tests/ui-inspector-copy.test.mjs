import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const uiSourcePath = new URL('../ui.js', import.meta.url);

async function readUiSource() {
  return readFile(uiSourcePath, 'utf8');
}

test('overview inspector keeps scan-first section order and labels', async () => {
  const src = await readUiSource();
  const idxAtAGlance = src.indexOf("'At a glance'");
  const idxNotableWings = src.indexOf("'Notable wings'");
  const idxNotableRooms = src.indexOf("'Notable rooms'");
  const idxCrossWing = src.indexOf("'Cross-wing hotspots'");
  const idxDataNotes = src.indexOf("'Data notes'");

  assert.ok(idxAtAGlance > 0);
  assert.ok(idxNotableWings > idxAtAGlance);
  assert.ok(idxNotableRooms > idxNotableWings);
  assert.ok(idxCrossWing > idxNotableRooms);
  assert.ok(idxDataNotes > idxCrossWing);
});

test('wing and room inspectors expose usefulness-first section names', async () => {
  const src = await readUiSource();
  assert.ok(src.includes("'Why it matters'"));
  assert.ok(src.includes("'Key relationships'"));
  assert.ok(src.includes("'Top rooms'"));
  assert.ok(src.includes("'Useful stats'"));
  assert.ok(src.includes("'Position'"));
  assert.ok(src.includes("'Structural read'"));
});

test('empty and low-data states use curated concise phrasing', async () => {
  const src = await readUiSource();
  assert.ok(src.includes('Choose a place to inspect'));
  assert.ok(src.includes('No room-level links are available yet.'));
  assert.ok(src.includes('No neighboring links were found for this room.'));
  assert.ok(src.includes('No cross-wing links were resolved for this snapshot.'));
});

test('terminology favors user-facing language over debug phrasing', async () => {
  const src = await readUiSource();
  assert.ok(src.includes('Resolved connections'));
  assert.ok(src.includes('Relationship mix'));
  assert.ok(!src.includes('Structural readout (tunnels)'));
  assert.ok(!src.includes('Most connected rooms'));
});

test('graph mode exposes task-oriented workflow copy and structure jump', async () => {
  const src = await readUiSource();
  assert.ok(src.includes('Local neighborhood'));
  assert.ok(src.includes('Connections detail'));
  assert.ok(src.includes('graph-selection-workflow'));
  assert.ok(src.includes('Wing / room layout'));
  assert.ok(src.includes('graphJumpToStructureView'));
  assert.ok(src.includes('Graph workflow'));
  assert.ok(src.includes('summarizeGraphRoomNeighborhood'));
});
