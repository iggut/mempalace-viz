/**
 * MemPalace Viz — Node bridge to the Python MemPalace MCP server.
 *
 * Exposes palace data and all official MCP tools over HTTP:
 *   GET  /api/status, /api/wings, /api/rooms, /api/taxonomy,
 *       /api/palace, /api/graph-stats, /api/overview, /api/kg-stats,
 *       /api/mcp-tools, /api/search, /api/traverse, /api/kg-query,
 *       /api/kg-timeline, /api/aaak-spec, /api/diary,
 *       /api/list-drawers, /api/drawer,
 *       /api/find-tunnels, /api/list-tunnels, /api/follow-tunnels,
 *   POST /api/check-duplicate, /api/create-tunnel, /api/delete-tunnel,
 *        /api/kg-add, /api/kg-invalidate, /api/add-drawer,
 *        /api/delete-drawer, /api/update-drawer, /api/diary-write,
 *        /api/hook-settings, /api/memories-filed-away, /api/reconnect,
 *        /api/memories-chat/openai-proxy (loopback OpenAI-compatible proxy)
 *
 * Every request spawns `mempalace.mcp_server` as a short-lived child process
 * via the venv Python. Palace snapshots fan out MCP calls in parallel and
 * normalize them through `canonical.js` (edgesResolved, graphMeta, etc).
 */
import { spawn } from 'child_process';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join, extname, resolve, sep } from 'path';
import { promises as fs } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { isLoopbackOpenAiUrl } from './memories-chat-config.js';
import {
  parseTaxonomyCanonical,
  buildEnrichedGraphFromTaxonomyAndTunnels,
  toLegacyGraphEdges,
  normalizeWingsPayload,
  buildOverviewSummary,
  enrichRoomsWithGraphMetrics,
  computeRoomGraphMetrics,
  enrichRoomsListPayload,
} from './canonical.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = process.env.WORKSPACE || join(__dirname, '..');
const VENV_PYTHON = process.env.VENV_PYTHON || join(WORKSPACE, 'mempalace-venv/bin/python');
const MEMPALACE_ROOT = process.env.MEMPALACE_ROOT || join(WORKSPACE, 'mempalace');

/**
 * Static file map. `/` and the aliases all serve the shipped viewer. Only
 * modules actually imported by `ui.js` are whitelisted.
 */
const STATIC_FILES = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/viz': 'index.html',
  '/3d': 'index.html',
  '/palace3d': 'index.html',
  /** Legacy bookmarks / stale processes that still expect the old entry file. */
  '/constellation': 'constellation.html',
  '/constellation.html': 'constellation.html',
  '/styles.css': 'styles.css',
  '/ui.js': 'ui.js',
  '/scene.js': 'scene.js',
  '/api.js': 'api.js',
  '/insights.js': 'insights.js',
  '/data-mining.js': 'data-mining.js',
  '/canonical.js': 'canonical.js',
  '/graph-guidance.js': 'graph-guidance.js',
  '/graph-navigation.js': 'graph-navigation.js',
  '/graph-relationships.js': 'graph-relationships.js',
  '/graph-route.js': 'graph-route.js',
  '/graph-scene-helpers.js': 'graph-scene-helpers.js',
  '/graph-search.js': 'graph-search.js',
  '/graph-workflow.js': 'graph-workflow.js',
  '/state-utils.js': 'state-utils.js',
  '/nav-focus.js': 'nav-focus.js',
  '/nav-dev-invariants.js': 'nav-dev-invariants.js',
  '/debug.js': 'debug.js',
  '/three-runtime.js': 'three-runtime.js',
  '/ui-hover-policy.js': 'ui-hover-policy.js',
  '/ui-production-helpers.js': 'ui-production-helpers.js',
  '/content-inspector.js': 'content-inspector.js',
  '/memories-chat-ui.js': 'memories-chat-ui.js',
  '/memories-chat-config.js': 'memories-chat-config.js',
  '/memories-chat-llm.js': 'memories-chat-llm.js',
  '/memories-chat-prompt.js': 'memories-chat-prompt.js',
  '/memories-chat-retrieval.js': 'memories-chat-retrieval.js',
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

/** Single-segment paths only; must stay under `__dirname` (no `..`). */
const STATIC_ROOT_EXT = new Set(['.js', '.css', '.html', '.json']);

/** Small LRU for stable payloads (wings list). */
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return null;
    const v = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, v);
    return v;
  }
  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    while (this.cache.size > this.maxSize) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
  }
  has(key) { return this.cache.has(key); }
  delete(key) { this.cache.delete(key); }
}

const wingsCache = new LRUCache(4);

/**
 * RPC to MCP — each call spawns its own Python process (parallel).
 * @param {string} method e.g. `tools/call`, `tools/list`
 * @param {object} params method params
 */
function rpcMcp(method, params = {}, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const reqBody = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    });

    const proc = spawn(VENV_PYTHON, ['-m', 'mempalace.mcp_server'], {
      cwd: MEMPALACE_ROOT,
      env: { ...process.env, PYTHONPATH: MEMPALACE_ROOT },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    const timeoutId = setTimeout(() => {
      try { proc.kill(); } catch { /* ignore */ }
      const err = new Error(`MCP server timeout: ${method} (${timeout / 1000}s)`);
      err.stdout = stdout;
      err.stderr = stderr;
      console.error(`[MCP Timeout] ${method}: ${stderr}`);
      reject(err);
    }, timeout);

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('error', (err) => {
      clearTimeout(timeoutId);
      console.error(`[MCP Process Error] ${method}:`, err);
      reject(err);
    });

    proc.on('exit', (code) => {
      clearTimeout(timeoutId);
      if (code !== 0 && code !== null) {
        const err = new Error(`MCP server exited with code ${code} for ${method}`);
        err.stdout = stdout;
        err.stderr = stderr;
        console.error(`[MCP Exit Error] ${method} (code ${code})`);
        return reject(err);
      }
      try {
        if (!stdout.trim()) throw new Error('MCP server returned empty stdout');
        const response = JSON.parse(stdout);
        if (response.error) return reject(new Error(response.error.message || 'MCP Error'));
        resolve(response.result);
      } catch (e) {
        console.error(`[MCP Parse Error] ${method}: "${stdout.slice(0, 200)}..."`, e);
        reject(e);
      }
    });

    proc.stdin.write(reqBody);
    proc.stdin.end();
  });
}

/**
 * Spawn `mempalace.mcp_server` for one tool call. Unwraps `content[0].text` JSON.
 */
async function callMcp(toolName, params = {}, timeout = 30000) {
  const result = await rpcMcp('tools/call', { name: toolName, arguments: params }, timeout);
  if (result && Array.isArray(result.content)) {
    const text = result.content.find((c) => c.type === 'text');
    if (text) {
      try { return JSON.parse(text.text); }
      catch { return text.text; }
    }
  }
  return result;
}

async function callStatusMcp(timeout = 30000) {
  try {
    return await callMcp('mempalace_status', { verbose: true }, timeout);
  } catch {
    return callMcp('mempalace_status', {}, timeout);
  }
}

/** Official tool catalog (same as MCP `tools/list`). */
async function listMcpTools(timeout = 30000) {
  return rpcMcp('tools/list', {}, timeout);
}

/**
 * Fan-out MCP calls and compose the canonical palace snapshot used by
 * `/api/palace`, `/api/graph-stats`, `/api/overview`.
 */
async function buildPalaceSnapshot() {
  const fetchedAt = new Date().toISOString();
  const [status, wingsRaw, taxonomyRaw, tunnelsResult, rawGraphStats, kgStats] = await Promise.all([
    callStatusMcp(),
    callMcp('mempalace_list_wings'),
    callMcp('mempalace_get_taxonomy'),
    callMcp('mempalace_find_tunnels'),
    callMcp('mempalace_graph_stats'),
    callMcp('mempalace_kg_stats').catch(() => null),
  ]);

  const wingsData = normalizeWingsPayload(wingsRaw);
  const enriched = buildEnrichedGraphFromTaxonomyAndTunnels(taxonomyRaw, tunnelsResult);
  const { taxonomy, rooms, wings, roomsData, edgesResolved, edgesInferred, edgesUnresolved, summary, graphMeta } = enriched;
  const stats = buildOverviewSummary(wingsData, rooms, edgesResolved, summary, status, edgesInferred);
  const metrics = computeRoomGraphMetrics(edgesResolved);
  const roomsEnriched = enrichRoomsWithGraphMetrics(rooms, metrics);
  const legacyGraphEdges = toLegacyGraphEdges(edgesResolved);
  const tunnelsAdj = {};
  for (const e of legacyGraphEdges) {
    if (!tunnelsAdj[e.from]) tunnelsAdj[e.from] = {};
    tunnelsAdj[e.from][e.to] = e.targetWingId;
  }

  return {
    graphContractVersion: 2,
    fetchedAt,
    status,
    wingsData,
    taxonomy,
    roomsData,
    wings,
    rooms,
    graph: {
      rooms: roomsEnriched,
      edgesResolved,
      edgesInferred,
      edgesUnresolved,
      summary,
      summaryInferred: enriched.summaryInferred,
      graphMeta: {
        ...(graphMeta && typeof graphMeta === 'object' ? graphMeta : {}),
        fetchedAt,
      },
      legacyGraphEdges,
      tunnels: tunnelsAdj,
      rawGraphStats,
    },
    overviewStats: stats,
    kgStats,
  };
}

async function serveStatic(req, res, pathname) {
  const mapped = STATIC_FILES[pathname];
  let filePath;
  if (mapped) {
    filePath = join(__dirname, mapped);
  } else {
    const name = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    if (!name || name.includes('/') || name.includes('..')) return false;
    const ext = extname(name);
    if (!STATIC_ROOT_EXT.has(ext)) return false;
    const root = resolve(__dirname);
    filePath = resolve(__dirname, name);
    if (filePath !== root && !filePath.startsWith(root + sep)) return false;
    try {
      const st = await fs.stat(filePath);
      if (!st.isFile()) return false;
    } catch {
      return false;
    }
  }
  const content = await fs.readFile(filePath);
  res.writeHead(200, { 'Content-Type': MIME_TYPES[extname(filePath)] || 'text/plain; charset=utf-8' });
  res.end(content);
  return true;
}

function sanitizeOpenAiForwardHeaders(h) {
  if (!h || typeof h !== 'object') return {};
  const out = {};
  const allow = new Set(['accept', 'authorization', 'content-type']);
  for (const [k, v] of Object.entries(h)) {
    if (typeof k === 'string' && typeof v === 'string' && allow.has(k.toLowerCase())) {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Browser-safe fetch to loopback OpenAI-compatible servers (avoids cross-origin CORS).
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {() => Promise<unknown>} readJsonBody
 */
async function handleOpenAiProxy(req, res, readJsonBody) {
  let body;
  try {
    body = await readJsonBody();
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    return;
  }
  const targetUrl = typeof body.targetUrl === 'string' ? body.targetUrl.trim() : '';
  const method = body.method === 'POST' || body.method === 'GET' ? body.method : null;
  if (!method || !isLoopbackOpenAiUrl(targetUrl)) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Invalid or disallowed target (loopback http(s) only).' }));
    return;
  }
  const headers = sanitizeOpenAiForwardHeaders(body.headers);
  const rawBody = typeof body.body === 'string' ? body.body : undefined;

  const ac = new AbortController();
  const onClose = () => ac.abort();
  req.on('close', onClose);

  try {
    const upstream = await fetch(targetUrl, {
      method,
      headers,
      body: method === 'POST' ? rawBody : undefined,
      signal: ac.signal,
    });

    const outHeaders = /** @type {Record<string, string>} */ ({});
    const ct = upstream.headers.get('content-type');
    if (ct) outHeaders['Content-Type'] = ct;

    res.writeHead(upstream.status, outHeaders);
    if (upstream.body) {
      await pipeline(Readable.fromWeb(upstream.body), res);
    } else {
      res.end();
    }
  } catch (e) {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: e?.message || 'Upstream request failed' }));
    } else {
      try {
        res.end();
      } catch {
        /* ignore */
      }
    }
  } finally {
    req.removeListener('close', onClose);
  }
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error?.stack || error);
});
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error?.stack || error);
});

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  async function readJsonBody() {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (c) => {
        data += c;
        if (data.length > 2_000_000) {
          reject(new Error('Body too large'));
        }
      });
      req.on('end', () => {
        try {
          resolve(data.trim() ? JSON.parse(data) : {});
        } catch (e) {
          reject(e);
        }
      });
      req.on('error', reject);
    });
  }

  const requestUrl = new URL(req.url, 'http://localhost');
  const pathname = requestUrl.pathname;

  if (!pathname.startsWith('/api/')) {
    try {
      // Serve node_modules for importmap resolution
      if (pathname.startsWith('/node_modules/')) {
        const nmPath = pathname.replace('/node_modules/', '');
        const allowedModules = ['three/']; // whitelist
        if (allowedModules.some(m => nmPath.startsWith(m))) {
          const filePath = join(__dirname, 'node_modules', nmPath);
          const content = await fs.readFile(filePath);
          res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
          res.end(content);
          return;
        }
      }
      const served = await serveStatic(req, res, pathname);
      if (served) return;
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Not found' }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  if (pathname === '/api/memories-chat/openai-proxy' && req.method === 'POST') {
    await handleOpenAiProxy(req, res, readJsonBody);
    return;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    let result;

    // --- POST handlers (must come before the GET-only guard) ---
    if (pathname === '/api/check-duplicate' && req.method === 'POST') {
      const body = await readJsonBody();
      const content = typeof body.content === 'string' ? body.content : '';
      if (!content.trim()) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Missing content' }));
        return;
      }
      result = await callMcp('mempalace_check_duplicate', {
        content,
        threshold: typeof body.threshold === 'number' ? body.threshold : 0.9,
      });
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/create-tunnel' && req.method === 'POST') {
      const body = await readJsonBody();
      const sourceWing = typeof body.source_wing === 'string' ? body.source_wing : '';
      const sourceRoom = typeof body.source_room === 'string' ? body.source_room : '';
      const targetWing = typeof body.target_wing === 'string' ? body.target_wing : '';
      const targetRoom = typeof body.target_room === 'string' ? body.target_room : '';
      if (!sourceWing || !sourceRoom || !targetWing || !targetRoom) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'source_wing, source_room, target_wing, target_room required' }));
        return;
      }
      result = await callMcp('mempalace_create_tunnel', {
        source_wing: sourceWing,
        source_room: sourceRoom,
        target_wing: targetWing,
        target_room: targetRoom,
        label: typeof body.label === 'string' ? body.label : undefined,
        source_drawer_id: typeof body.source_drawer_id === 'string' ? body.source_drawer_id : undefined,
        target_drawer_id: typeof body.target_drawer_id === 'string' ? body.target_drawer_id : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/delete-tunnel' && req.method === 'POST') {
      const body = await readJsonBody();
      const tunnelId = typeof body.tunnel_id === 'string' ? body.tunnel_id : '';
      if (!tunnelId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'tunnel_id required' }));
        return;
      }
      result = await callMcp('mempalace_delete_tunnel', { tunnel_id: tunnelId }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/kg-add' && req.method === 'POST') {
      const body = await readJsonBody();
      const subject = typeof body.subject === 'string' ? body.subject : '';
      const predicate = typeof body.predicate === 'string' ? body.predicate : '';
      const object = typeof body.object === 'string' ? body.object : '';
      if (!subject || !predicate || !object) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'subject, predicate, object required' }));
        return;
      }
      result = await callMcp('mempalace_kg_add', {
        subject,
        predicate,
        object,
        valid_from: typeof body.valid_from === 'string' ? body.valid_from : undefined,
        source_closet: typeof body.source_closet === 'string' ? body.source_closet : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/kg-invalidate' && req.method === 'POST') {
      const body = await readJsonBody();
      const subject = typeof body.subject === 'string' ? body.subject : '';
      const predicate = typeof body.predicate === 'string' ? body.predicate : '';
      const object = typeof body.object === 'string' ? body.object : '';
      if (!subject || !predicate || !object) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'subject, predicate, object required' }));
        return;
      }
      result = await callMcp('mempalace_kg_invalidate', {
        subject,
        predicate,
        object,
        ended: typeof body.ended === 'string' ? body.ended : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/add-drawer' && req.method === 'POST') {
      const body = await readJsonBody();
      const wing = typeof body.wing === 'string' ? body.wing : '';
      const room = typeof body.room === 'string' ? body.room : '';
      const content = typeof body.content === 'string' ? body.content : '';
      if (!wing || !room || !content) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'wing, room, content required' }));
        return;
      }
      result = await callMcp('mempalace_add_drawer', {
        wing,
        room,
        content,
        source_file: typeof body.source_file === 'string' ? body.source_file : undefined,
        added_by: typeof body.added_by === 'string' ? body.added_by : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/delete-drawer' && req.method === 'POST') {
      const body = await readJsonBody();
      const drawerId = typeof body.drawer_id === 'string' ? body.drawer_id : '';
      if (!drawerId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'drawer_id required' }));
        return;
      }
      result = await callMcp('mempalace_delete_drawer', { drawer_id: drawerId }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/update-drawer' && req.method === 'POST') {
      const body = await readJsonBody();
      const drawerId = typeof body.drawer_id === 'string' ? body.drawer_id : '';
      if (!drawerId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'drawer_id required' }));
        return;
      }
      result = await callMcp('mempalace_update_drawer', {
        drawer_id: drawerId,
        content: typeof body.content === 'string' ? body.content : undefined,
        wing: typeof body.wing === 'string' ? body.wing : undefined,
        room: typeof body.room === 'string' ? body.room : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/diary-write' && req.method === 'POST') {
      const body = await readJsonBody();
      const agentName = typeof body.agent_name === 'string' ? body.agent_name : '';
      const entry = typeof body.entry === 'string' ? body.entry : '';
      if (!agentName || !entry) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'agent_name and entry required' }));
        return;
      }
      result = await callMcp('mempalace_diary_write', {
        agent_name: agentName,
        entry,
        topic: typeof body.topic === 'string' ? body.topic : undefined,
      }, 20000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/hook-settings' && req.method === 'POST') {
      const body = await readJsonBody();
      const silentSave = typeof body.silent_save === 'boolean' ? body.silent_save : undefined;
      const desktopToast = typeof body.desktop_toast === 'boolean' ? body.desktop_toast : undefined;
      result = await callMcp('mempalace_hook_settings', {
        ...(silentSave !== undefined && { silent_save: silentSave }),
        ...(desktopToast !== undefined && { desktop_toast: desktopToast }),
      }, 10000);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    if (req.method !== 'GET') {
      res.writeHead(405);
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    switch (pathname) {
      case '/api/status':
        result = await callStatusMcp();
        break;

      case '/api/wings': {
        const cacheKey = 'wings-static';
        if (wingsCache.has(cacheKey)) {
          result = wingsCache.get(cacheKey);
        } else {
          result = await callMcp('mempalace_list_wings');
          wingsCache.set(cacheKey, result);
        }
        break;
      }

      case '/api/rooms': {
        const wingParam = requestUrl.searchParams.get('wing');
        result = await callMcp('mempalace_list_rooms', wingParam ? { wing: wingParam } : {});
        result = enrichRoomsListPayload(result, wingParam);
        break;
      }

      case '/api/taxonomy': {
        const raw = await callMcp('mempalace_get_taxonomy');
        const enriched = parseTaxonomyCanonical(raw);
        result = {
          ...raw,
          graphContractVersion: 1,
          taxonomy: enriched.taxonomy,
          wings: enriched.wings,
          rooms: enriched.rooms,
          roomsData: enriched.roomsData,
        };
        break;
      }

      case '/api/palace':
        result = await buildPalaceSnapshot();
        break;

      case '/api/graph-stats': {
        const snapshot = await buildPalaceSnapshot();
        result = {
          graphContractVersion: snapshot.graphContractVersion,
          fetchedAt: snapshot.fetchedAt,
          ...snapshot.graph.rawGraphStats,
          rooms: snapshot.graph.rooms,
          edgesResolved: snapshot.graph.edgesResolved,
          edgesInferred: snapshot.graph.edgesInferred,
          edgesUnresolved: snapshot.graph.edgesUnresolved,
          summary: snapshot.graph.summary,
          summaryInferred: snapshot.graph.summaryInferred,
          graphMeta: snapshot.graph.graphMeta,
          legacyGraphEdges: snapshot.graph.legacyGraphEdges,
          tunnels: snapshot.graph.tunnels,
        };
        break;
      }

      case '/api/overview': {
        const snapshot = await buildPalaceSnapshot();
        result = {
          graphContractVersion: snapshot.graphContractVersion,
          fetchedAt: snapshot.fetchedAt,
          status: snapshot.status,
          wingsData: snapshot.wingsData,
          taxonomy: snapshot.taxonomy,
          roomsData: snapshot.roomsData,
          wings: snapshot.wings,
          rooms: snapshot.rooms,
          edgesResolved: snapshot.graph.edgesResolved,
          edgesInferred: snapshot.graph.edgesInferred,
          edgesUnresolved: snapshot.graph.edgesUnresolved,
          summary: snapshot.graph.summary,
          summaryInferred: snapshot.graph.summaryInferred,
          graphMeta: snapshot.graph.graphMeta,
          stats: snapshot.overviewStats,
          rawGraphStats: snapshot.graph.rawGraphStats,
        };
        break;
      }

      case '/api/kg-stats':
        result = await callMcp('mempalace_kg_stats');
        break;

      case '/api/mcp-tools':
        result = await listMcpTools();
        break;

      case '/api/search': {
        const q = (requestUrl.searchParams.get('query') || '').trim();
        if (!q) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'query parameter required' }));
          return;
        }
        const limit = Math.min(24, Math.max(1, Number(requestUrl.searchParams.get('limit') || 8)));
        const wing = requestUrl.searchParams.get('wing') || undefined;
        const room = requestUrl.searchParams.get('room') || undefined;
        const context = requestUrl.searchParams.get('context') || undefined;
        result = await callMcp(
          'mempalace_search',
          { query: q, limit, wing, room, context },
          20000,
        );
        break;
      }

      case '/api/traverse': {
        const startRoom = (requestUrl.searchParams.get('start_room') || '').trim();
        if (!startRoom) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'start_room parameter required' }));
          return;
        }
        const maxHops = Math.min(6, Math.max(1, Number(requestUrl.searchParams.get('max_hops') || 2)));
        result = await callMcp('mempalace_traverse', { start_room: startRoom, max_hops: maxHops }, 20000);
        break;
      }

      case '/api/kg-query': {
        const entity = (requestUrl.searchParams.get('entity') || '').trim();
        if (!entity) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'entity parameter required' }));
          return;
        }
        const asOf = requestUrl.searchParams.get('as_of') || undefined;
        const direction = requestUrl.searchParams.get('direction') || 'both';
        result = await callMcp('mempalace_kg_query', { entity, as_of: asOf, direction }, 20000);
        break;
      }

      case '/api/kg-timeline': {
        const entity = requestUrl.searchParams.get('entity')?.trim() || undefined;
        result = await callMcp('mempalace_kg_timeline', entity ? { entity } : {}, 20000);
        break;
      }

      case '/api/aaak-spec':
        result = await callMcp('mempalace_get_aaak_spec');
        break;

      case '/api/list-drawers': {
        const wingLd = requestUrl.searchParams.get('wing')?.trim() || undefined;
        const roomLd = requestUrl.searchParams.get('room')?.trim() || undefined;
        const limitLd = Math.min(100, Math.max(1, Number(requestUrl.searchParams.get('limit') || 20)));
        const offsetLd = Math.max(0, Number(requestUrl.searchParams.get('offset') || 0));
        const args = { limit: limitLd, offset: offsetLd };
        if (wingLd) args.wing = wingLd;
        if (roomLd) args.room = roomLd;
        result = await callMcp('mempalace_list_drawers', args, 25000);
        break;
      }

      case '/api/drawer': {
        const did = (requestUrl.searchParams.get('id') || '').trim();
        if (!did) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'id parameter required' }));
          return;
        }
        result = await callMcp('mempalace_get_drawer', { drawer_id: did }, 25000);
        break;
      }

      case '/api/diary': {
        const agentName =
          requestUrl.searchParams.get('agent')?.trim() ||
          process.env.MEMPALACE_VIZ_DIARY_AGENT ||
          'viewer';
        const lastN = Math.min(40, Math.max(1, Number(requestUrl.searchParams.get('last_n') || 6)));
        result = await callMcp('mempalace_diary_read', { agent_name: agentName, last_n: lastN }, 20000);
        break;
      }

      // --- Tunnel management (GET) ---
      case '/api/find-tunnels': {
        const wingA = requestUrl.searchParams.get('wing_a')?.trim() || undefined;
        const wingB = requestUrl.searchParams.get('wing_b')?.trim() || undefined;
        result = await callMcp('mempalace_find_tunnels', { ...(wingA && { wing_a: wingA }), ...(wingB && { wing_b: wingB }) }, 20000);
        break;
      }

      case '/api/list-tunnels': {
        const wing = requestUrl.searchParams.get('wing')?.trim() || undefined;
        result = await callMcp('mempalace_list_tunnels', wing ? { wing } : {}, 20000);
        break;
      }

      case '/api/follow-tunnels': {
        const wing = requestUrl.searchParams.get('wing')?.trim() || '';
        const room = requestUrl.searchParams.get('room')?.trim() || '';
        if (!wing || !room) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'wing and room parameters required' }));
          return;
        }
        result = await callMcp('mempalace_follow_tunnels', { wing, room }, 20000);
        break;
      }

      // --- Memories filed away (GET) ---
      case '/api/memories-filed-away': {
        result = await callMcp('mempalace_memories_filed_away', {}, 10000);
        break;
      }

      // --- Reconnect (GET) ---
      case '/api/reconnect': {
        result = await callMcp('mempalace_reconnect', {}, 10000);
        break;
      }

      default:
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error('API Error:', error?.stack || error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

const PORT = Number(process.env.PORT || 8767);
const HOST = process.env.HOST || '0.0.0.0';
const AUTO_EXIT_MS = Number(process.env.AUTO_EXIT_MS || 0);

server.listen(PORT, HOST, () => {
  console.log(`MemPalace Viz API running at http://${HOST}:${PORT}`);
  console.log('  Static: /, /viz, /3d, /palace3d  →  index.html');
  console.log('  API (GET):  /api/status, /api/wings, /api/rooms, /api/taxonomy,');
  console.log('          /api/palace, /api/graph-stats, /api/overview, /api/kg-stats,');
  console.log('          /api/mcp-tools, /api/search, /api/traverse, /api/kg-query,');
  console.log('          /api/kg-timeline, /api/aaak-spec, /api/diary, /api/list-drawers, /api/drawer,');
  console.log('          /api/find-tunnels, /api/list-tunnels, /api/follow-tunnels,');
  console.log('          /api/memories-filed-away, /api/reconnect');
  console.log('  API (POST): /api/check-duplicate, /api/create-tunnel, /api/delete-tunnel,');
  console.log('          /api/kg-add, /api/kg-invalidate, /api/add-drawer,');
  console.log('          /api/delete-drawer, /api/update-drawer, /api/diary-write,');
  console.log('          /api/hook-settings, /api/memories-chat/openai-proxy');
  console.log('  Set HOST=127.0.0.1 to restrict to local-only access.');
  if (AUTO_EXIT_MS > 0) {
    console.log(`  Auto-exit enabled after ${AUTO_EXIT_MS}ms (dev restart mode).`);
    setTimeout(() => process.exit(0), AUTO_EXIT_MS).unref();
  }
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
