import { createHermesMemPalaceAdapter } from './hermes-mempalace-adapter.js';

/**
 * Concrete Hermes-facing wrapper for tool-only MemPalace MCP servers.
 *
 * Designed to be easy to attach regardless of Hermes transport class naming:
 * - `handleRequest(request)`
 * - `onRequest(request)` alias
 * - `request(request)` alias
 * - helpers: `readResource(uri, id?)`, `listResources(id?)`
 *
 * @param {{
 *  sendJsonRpc: (request: any) => Promise<any>,
 *  defaultSearchQuery?: string,
 *  defaultSearchLimit?: number,
 * }} options
 */
export function createHermesMemPalaceWrapper(options) {
  const sendJsonRpc = options?.sendJsonRpc;
  if (typeof sendJsonRpc !== 'function') {
    throw new Error('createHermesMemPalaceWrapper requires sendJsonRpc(request)');
  }

  const adapter = createHermesMemPalaceAdapter({
    callRpc: sendJsonRpc,
    defaultSearchQuery: options?.defaultSearchQuery,
    defaultSearchLimit: options?.defaultSearchLimit,
  });

  async function handleRequest(request) {
    return adapter.handleRequest(request);
  }

  async function readResource(uri, id = Date.now()) {
    return handleRequest({
      jsonrpc: '2.0',
      id,
      method: 'resources/read',
      params: { uri },
    });
  }

  async function listResources(id = Date.now()) {
    return handleRequest({
      jsonrpc: '2.0',
      id,
      method: 'resources/list',
      params: {},
    });
  }

  return {
    handleRequest,
    onRequest: handleRequest,
    request: handleRequest,
    readResource,
    listResources,
  };
}

