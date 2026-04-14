import assert from 'node:assert/strict';
import test from 'node:test';
import { createHermesMemPalaceAdapter, parseMemPalaceResourceUri } from '../hermes-mempalace-adapter.js';

test('parseMemPalaceResourceUri supports legacy wing/room path', () => {
  const parsed = parseMemPalaceResourceUri('wing_user/room_preferences');
  assert.equal(parsed.kind, 'room-search');
  assert.equal(parsed.wing, 'wing_user');
  assert.equal(parsed.room, 'room_preferences');
  assert.equal(parsed.normalizedUri, 'mempalace://room?wing=wing_user&room=room_preferences');
});

test('parseMemPalaceResourceUri supports canonical search URI', () => {
  const parsed = parseMemPalaceResourceUri('mempalace://search?wing=wing_user&room=room_preferences&q=profile&limit=3');
  assert.equal(parsed.kind, 'room-search');
  assert.equal(parsed.wing, 'wing_user');
  assert.equal(parsed.room, 'room_preferences');
  assert.equal(parsed.query, 'profile');
  assert.equal(parsed.limit, 3);
});

test('adapter maps resources/list to taxonomy-derived resources', async () => {
  const calls = [];
  const adapter = createHermesMemPalaceAdapter({
    async callRpc(req) {
      calls.push(req);
      if (req.method === 'tools/call' && req.params?.name === 'mempalace_get_taxonomy') {
        return {
          jsonrpc: '2.0',
          id: req.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  taxonomy: {
                    wing_user: { room_preferences: 2 },
                  },
                }),
              },
            ],
          },
        };
      }
      throw new Error('Unexpected call');
    },
  });

  const resp = await adapter.handleRequest({
    jsonrpc: '2.0',
    id: 10,
    method: 'resources/list',
    params: {},
  });

  assert.equal(resp.id, 10);
  assert.ok(Array.isArray(resp.result.resources));
  assert.ok(
    resp.result.resources.some(
      (r) => r.uri === 'mempalace://room?wing=wing_user&room=room_preferences',
    ),
  );
  assert.ok(calls.some((c) => c.method === 'tools/call' && c.params?.name === 'mempalace_get_taxonomy'));
});

test('adapter maps resources/read legacy path to mempalace_search', async () => {
  const calls = [];
  const adapter = createHermesMemPalaceAdapter({
    defaultSearchQuery: 'fallback query',
    defaultSearchLimit: 5,
    async callRpc(req) {
      calls.push(req);
      if (req.method === 'tools/call' && req.params?.name === 'mempalace_search') {
        return {
          jsonrpc: '2.0',
          id: req.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  results: [{ wing: 'wing_user', room: 'room_preferences', text: 'prefers concise answers' }],
                }),
              },
            ],
          },
        };
      }
      throw new Error('Unexpected call');
    },
  });

  const resp = await adapter.handleRequest({
    jsonrpc: '2.0',
    id: 11,
    method: 'resources/read',
    params: { uri: 'wing_user/room_preferences' },
  });

  assert.equal(resp.id, 11);
  assert.equal(resp.result.contents[0].uri, 'mempalace://room?wing=wing_user&room=room_preferences');

  const call = calls.find((c) => c.method === 'tools/call' && c.params?.name === 'mempalace_search');
  assert.ok(call);
  assert.equal(call.params.arguments.wing, 'wing_user');
  assert.equal(call.params.arguments.room, 'room_preferences');
  assert.equal(call.params.arguments.query, 'fallback query');
  assert.equal(call.params.arguments.limit, 5);
});

test('adapter forwards initialize and adds resources capability', async () => {
  const adapter = createHermesMemPalaceAdapter({
    async callRpc(req) {
      return {
        jsonrpc: '2.0',
        id: req.id,
        result: {
          protocolVersion: '2025-11-25',
          capabilities: { tools: {} },
          serverInfo: { name: 'mempalace', version: '3.1.0' },
        },
      };
    },
  });

  const resp = await adapter.handleRequest({
    jsonrpc: '2.0',
    id: 12,
    method: 'initialize',
    params: { protocolVersion: '2025-11-25' },
  });

  assert.ok(resp.result.capabilities.tools);
  assert.ok(resp.result.capabilities.resources);
});
