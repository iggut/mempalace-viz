const DEFAULT_SEARCH_QUERY = 'recent important memories decisions learnings preferences';
const DEFAULT_SEARCH_LIMIT = 8;

/**
 * Parse tool response payload from MemPalace MCP.
 * The server wraps JSON into `result.content[0].text`.
 * @param {any} rpcResponse
 * @returns {any}
 */
function parseToolResultPayload(rpcResponse) {
  const text = rpcResponse?.result?.content?.[0]?.text;
  if (typeof text !== 'string') return rpcResponse?.result ?? null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Parse resource URI/path into actionable MemPalace request info.
 * Supports:
 * - `wing_user/room_preferences` (legacy path)
 * - `mempalace://room?wing=wing_user&room=room_preferences`
 * - `mempalace://search?wing=...&room=...&q=...&limit=...`
 * - `mempalace://status`
 * - `mempalace://taxonomy`
 * - `mempalace://kg/stats`
 *
 * @param {string} inputUri
 * @returns {{
 *   kind: 'room-search'|'status'|'taxonomy'|'kg-stats',
 *   wing?: string,
 *   room?: string,
 *   query?: string,
 *   limit?: number,
 *   normalizedUri: string,
 * }}
 */
export function parseMemPalaceResourceUri(inputUri) {
  const raw = String(inputUri || '').trim();
  if (!raw) throw new Error('Missing resource URI');

  // Legacy room path: wing/room
  if (!raw.includes('://')) {
    const parts = raw.split('/').map((x) => x.trim()).filter(Boolean);
    if (parts.length === 2) {
      const [wing, room] = parts;
      return {
        kind: 'room-search',
        wing,
        room,
        query: DEFAULT_SEARCH_QUERY,
        limit: DEFAULT_SEARCH_LIMIT,
        normalizedUri: `mempalace://room?wing=${encodeURIComponent(wing)}&room=${encodeURIComponent(room)}`,
      };
    }
    throw new Error(`Unsupported legacy resource path: "${raw}"`);
  }

  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid URI: "${raw}"`);
  }

  if (url.protocol !== 'mempalace:') throw new Error(`Unsupported protocol: "${url.protocol}"`);

  const host = url.hostname;
  const path = url.pathname.replace(/^\/+/, '');
  const route = [host, path].filter(Boolean).join('/');

  if (route === 'status') {
    return { kind: 'status', normalizedUri: 'mempalace://status' };
  }
  if (route === 'taxonomy') {
    return { kind: 'taxonomy', normalizedUri: 'mempalace://taxonomy' };
  }
  if (route === 'kg/stats') {
    return { kind: 'kg-stats', normalizedUri: 'mempalace://kg/stats' };
  }
  if (host === 'room' || host === 'search') {
    const wing = url.searchParams.get('wing') || undefined;
    const room = url.searchParams.get('room') || undefined;
    const query = url.searchParams.get('q') || DEFAULT_SEARCH_QUERY;
    const limit = Number.parseInt(url.searchParams.get('limit') || `${DEFAULT_SEARCH_LIMIT}`, 10);
    if (!wing || !room) {
      throw new Error(`Room/search URI must include wing and room: "${raw}"`);
    }
    return {
      kind: 'room-search',
      wing,
      room,
      query,
      limit: Number.isFinite(limit) && limit > 0 ? limit : DEFAULT_SEARCH_LIMIT,
      normalizedUri: `mempalace://room?wing=${encodeURIComponent(wing)}&room=${encodeURIComponent(room)}`,
    };
  }

  throw new Error(`Unsupported resource URI: "${raw}"`);
}

/**
 * Create a transport adapter so Hermes can use resources/* against
 * tool-only MemPalace MCP servers.
 *
 * @param {{
 *  callRpc: (req: any) => Promise<any>,
 *  defaultSearchQuery?: string,
 *  defaultSearchLimit?: number,
 * }} options
 */
export function createHermesMemPalaceAdapter(options) {
  const callRpc = options?.callRpc;
  if (typeof callRpc !== 'function') {
    throw new Error('createHermesMemPalaceAdapter requires a callRpc(request) function');
  }

  let idCounter = 100000;
  const nextId = () => ++idCounter;

  const defaultSearchQuery = String(options?.defaultSearchQuery || DEFAULT_SEARCH_QUERY);
  const defaultSearchLimit =
    Number.isFinite(options?.defaultSearchLimit) && options.defaultSearchLimit > 0
      ? Math.floor(options.defaultSearchLimit)
      : DEFAULT_SEARCH_LIMIT;

  async function callTool(name, args = {}) {
    const resp = await callRpc({
      jsonrpc: '2.0',
      id: nextId(),
      method: 'tools/call',
      params: { name, arguments: args },
    });
    if (resp?.error) {
      throw new Error(resp.error?.message || `Tool call failed: ${name}`);
    }
    return parseToolResultPayload(resp);
  }

  async function handleResourcesList(request) {
    const taxonomy = await callTool('mempalace_get_taxonomy', {});
    const tree = taxonomy?.taxonomy && typeof taxonomy.taxonomy === 'object' ? taxonomy.taxonomy : {};
    const resources = [
      {
        uri: 'mempalace://status',
        name: 'MemPalace Status',
        description: 'Overall palace status (drawer, wing, and room counts).',
        mimeType: 'application/json',
      },
      {
        uri: 'mempalace://taxonomy',
        name: 'MemPalace Taxonomy',
        description: 'Wing → room hierarchy and drawer counts.',
        mimeType: 'application/json',
      },
      {
        uri: 'mempalace://kg/stats',
        name: 'MemPalace Knowledge Graph Stats',
        description: 'Knowledge graph stats from mempalace_kg_stats.',
        mimeType: 'application/json',
      },
    ];

    for (const [wing, rooms] of Object.entries(tree)) {
      if (!rooms || typeof rooms !== 'object') continue;
      for (const [room, count] of Object.entries(rooms)) {
        resources.push({
          uri: `mempalace://room?wing=${encodeURIComponent(wing)}&room=${encodeURIComponent(room)}`,
          name: `${wing}/${room}`,
          description: `Room-backed semantic view. drawers=${count}`,
          mimeType: 'application/json',
        });
      }
    }

    return {
      jsonrpc: '2.0',
      id: request.id,
      result: { resources },
    };
  }

  async function handleResourcesRead(request) {
    const uri = request?.params?.uri;
    let parsed;
    try {
      parsed = parseMemPalaceResourceUri(uri);
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: { code: -32602, message: error.message },
      };
    }

    // Allow caller-configured defaults if URI did not explicitly set q/limit.
    if (parsed.kind === 'room-search') {
      if (!request?.params?.uri?.includes('q=')) parsed.query = defaultSearchQuery;
      if (!request?.params?.uri?.includes('limit=')) parsed.limit = defaultSearchLimit;
    }

    let payload;
    if (parsed.kind === 'status') {
      payload = await callTool('mempalace_status', {});
    } else if (parsed.kind === 'taxonomy') {
      payload = await callTool('mempalace_get_taxonomy', {});
    } else if (parsed.kind === 'kg-stats') {
      payload = await callTool('mempalace_kg_stats', {});
    } else {
      payload = await callTool('mempalace_search', {
        query: parsed.query,
        limit: parsed.limit,
        wing: parsed.wing,
        room: parsed.room,
      });
    }

    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        contents: [
          {
            uri: parsed.normalizedUri,
            mimeType: 'application/json',
            text: JSON.stringify(payload, null, 2),
          },
        ],
      },
    };
  }

  async function handleRequest(request) {
    const method = request?.method;

    // Forward initialize, but advertise resources capability because this
    // adapter provides resources/list + resources/read.
    if (method === 'initialize') {
      const upstream = await callRpc(request);
      if (upstream?.result?.capabilities && !upstream.result.capabilities.resources) {
        upstream.result.capabilities.resources = {};
      }
      return upstream;
    }

    if (method === 'resources/list') {
      return handleResourcesList(request);
    }
    if (method === 'resources/read') {
      return handleResourcesRead(request);
    }

    return callRpc(request);
  }

  return { handleRequest, parseMemPalaceResourceUri };
}
