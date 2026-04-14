import assert from 'node:assert/strict';
import test from 'node:test';
import { createHermesMemPalaceWrapper } from '../hermes-mempalace-wrapper.js';

test('wrapper exposes Hermes-friendly request aliases', async () => {
  const wrapper = createHermesMemPalaceWrapper({
    async sendJsonRpc(request) {
      if (request.method === 'initialize') {
        return {
          jsonrpc: '2.0',
          id: request.id,
          result: {
            protocolVersion: '2025-11-25',
            capabilities: { tools: {} },
            serverInfo: { name: 'mempalace', version: '3.1.0' },
          },
        };
      }
      throw new Error('Unexpected request');
    },
  });

  assert.equal(typeof wrapper.handleRequest, 'function');
  assert.equal(wrapper.onRequest, wrapper.handleRequest);
  assert.equal(wrapper.request, wrapper.handleRequest);

  const resp = await wrapper.onRequest({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: { protocolVersion: '2025-11-25' },
  });

  assert.ok(resp.result.capabilities.resources);
});

test('wrapper readResource maps to mempalace_search via adapter', async () => {
  const calls = [];
  const wrapper = createHermesMemPalaceWrapper({
    defaultSearchQuery: 'profile lookup',
    defaultSearchLimit: 3,
    async sendJsonRpc(request) {
      calls.push(request);
      if (request.method === 'tools/call' && request.params?.name === 'mempalace_search') {
        return {
          jsonrpc: '2.0',
          id: request.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  results: [{ wing: 'wing_user', room: 'room_preferences', text: 'prefers short answers' }],
                }),
              },
            ],
          },
        };
      }
      throw new Error('Unexpected request');
    },
  });

  const resp = await wrapper.readResource('wing_user/room_preferences', 2);
  assert.equal(resp.id, 2);
  assert.equal(resp.result.contents[0].uri, 'mempalace://room?wing=wing_user&room=room_preferences');

  const searchCall = calls.find((c) => c.method === 'tools/call');
  assert.equal(searchCall.params.arguments.query, 'profile lookup');
  assert.equal(searchCall.params.arguments.limit, 3);
});

test('wrapper listResources maps to taxonomy-backed resources/list', async () => {
  const wrapper = createHermesMemPalaceWrapper({
    async sendJsonRpc(request) {
      if (request.method === 'tools/call' && request.params?.name === 'mempalace_get_taxonomy') {
        return {
          jsonrpc: '2.0',
          id: request.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  taxonomy: {
                    wing_user: { room_preferences: 1 },
                  },
                }),
              },
            ],
          },
        };
      }
      throw new Error('Unexpected request');
    },
  });

  const resp = await wrapper.listResources(3);
  assert.equal(resp.id, 3);
  assert.ok(
    resp.result.resources.some(
      (r) => r.uri === 'mempalace://room?wing=wing_user&room=room_preferences',
    ),
  );
});
