/**
 * MemPalace Viz — Node bridge to the Python MemPalace MCP server.
 *
 * Exposes the palace data needed by the 3D viewer:
 *   GET /api/status, /api/wings, /api/rooms, /api/taxonomy,
 *       /api/palace, /api/graph-stats, /api/overview, /api/kg-stats
 *
 * Every request spawns `mempalace.mcp_server` as a short-lived child process
 * via the venv Python. Palace snapshots fan out MCP calls in parallel and
 * normalize them through `canonical.js` (edgesResolved, graphMeta, etc).
 */
import { spawn } from 'child_process';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { promises as fs } from 'fs';
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
  '/styles.css': 'styles.css',
  '/ui.js': 'ui.js',
  '/scene.js': 'scene.js',
  '/api.js': 'api.js',
  '/insights.js': 'insights.js',
  '/canonical.js': 'canonical.js',
  '/graph-guidance.js': 'graph-guidance.js',
  '/graph-navigation.js': 'graph-navigation.js',
  '/graph-relationships.js': 'graph-relationships.js',
  '/graph-route.js': 'graph-route.js',
  '/graph-scene-helpers.js': 'graph-scene-helpers.js',
  '/graph-search.js': 'graph-search.js',
  '/state-utils.js': 'state-utils.js',
  '/debug.js': 'debug.js',
  '/three-runtime.js': 'three-runtime.js',
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

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
 * Spawn `mempalace.mcp_server` for one tool call. The Python server speaks
 * JSON-RPC over stdio and wraps results in `content[0].text`; we unwrap.
 */
function callMcp(toolName, params = {}, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const reqBody = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: params },
    });

    const proc = spawn(VENV_PYTHON, ['-m', 'mempalace.mcp_server'], {
      cwd: MEMPALACE_ROOT,
      env: { ...process.env, PYTHONPATH: MEMPALACE_ROOT },
    });

    let stdout = '';
    let stderr = '';

    const timeoutId = setTimeout(() => {
      try { proc.kill(); } catch { /* ignore */ }
      const err = new Error(`MCP server timeout: ${toolName} (${timeout / 1000}s)`);
      err.stdout = stdout;
      err.stderr = stderr;
      console.error(`[MCP Timeout] ${toolName}: ${stderr}`);
      reject(err);
    }, timeout);

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('error', (err) => {
      clearTimeout(timeoutId);
      console.error(`[MCP Process Error] ${toolName}:`, err);
      reject(err);
    });

    proc.on('exit', (code) => {
      clearTimeout(timeoutId);
      if (code !== 0 && code !== null) {
        const err = new Error(`MCP server exited with code ${code} for ${toolName}`);
        err.stdout = stdout;
        err.stderr = stderr;
        console.error(`[MCP Exit Error] ${toolName} (code ${code}): ${stderr}`);
        return reject(err);
      }
      try {
        if (!stdout.trim()) throw new Error('MCP server returned empty stdout');
        const response = JSON.parse(stdout);
        if (response.error) return reject(new Error(response.error.message || 'MCP Error'));
        const result = response.result;
        if (result && Array.isArray(result.content)) {
          const text = result.content.find((c) => c.type === 'text');
          if (text) {
            try { return resolve(JSON.parse(text.text)); }
            catch { return resolve(text.text); }
          }
        }
        resolve(result);
      } catch (e) {
        console.error(`[MCP Parse Error] ${toolName}: "${stdout.slice(0, 200)}..."`, e);
        reject(e);
      }
    });

    proc.stdin.write(reqBody);
    proc.stdin.end();
  });
}

/**
 * Fan-out MCP calls and compose the canonical palace snapshot used by
 * `/api/palace`, `/api/graph-stats`, `/api/overview`.
 */
async function buildPalaceSnapshot() {
  const fetchedAt = new Date().toISOString();
  const [status, wingsRaw, taxonomyRaw, tunnelsResult, rawGraphStats, kgStats] = await Promise.all([
    callMcp('mempalace_status'),
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
  if (!mapped) return false;
  const filePath = join(__dirname, mapped);
  const content = await fs.readFile(filePath);
  res.writeHead(200, { 'Content-Type': MIME_TYPES[extname(filePath)] || 'text/plain; charset=utf-8' });
  res.end(content);
  return true;
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error?.stack || error);
});
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error?.stack || error);
});

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, 'http://localhost');
  const pathname = requestUrl.pathname;

  if (!pathname.startsWith('/api/')) {
    try {
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

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    let result;

    switch (pathname) {
      case '/api/status':
        result = await callMcp('mempalace_status');
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
  console.log('  API:    /api/status, /api/wings, /api/rooms, /api/taxonomy,');
  console.log('          /api/palace, /api/graph-stats, /api/overview, /api/kg-stats');
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
