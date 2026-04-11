import { spawn } from 'child_process';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = '/home/iggut/.openclaw/workspace';
const VENV_PYTHON = `${WORKSPACE}/mempalace-venv/bin/python`;
const MEMPALACE_ROOT = `${WORKSPACE}/mempalace`;

const STATIC_FILES = {
  '/': 'constellation.html',
  '/constellation': 'constellation.html',
  '/dynamic': 'dynamic.html',
  '/index.html': 'constellation.html',
  '/brain.js': 'brain.js',
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const IMPORTANT_DOC_PATHS = [
  'memory/2026-04-10.md',
  'memory/2026-04-09.md',
  'mempalace-viz/README.md',
  'mempalace/README.md',
  'projects/OrderKing/README.md',
  'autoresearch/README.md',
  'autoresearch/docs/README.md',
  'CURRENT_DETECTOR_STATUS.md',
  'TOOLS.md',
];

const PROJECT_ALIASES = [
  { canonical: 'shared_grocery_list', aliases: ['shared shopping list', 'shared grocery list', 'shopping list project', 'grocery list project', 'shared list'] },
  { canonical: 'orderking', aliases: ['orderking', 'order king'] },
  { canonical: 'mempalace-viz', aliases: ['mempalace viz', 'viz server', 'visualization server', 'second brain ui'] },
];

const PROJECT_GATES = {
  shared_grocery_list: {
    allowedWings: new Set(['shared_grocery_list']),
    allowedPathPrefixes: ['projects/shared_grocery_list/'],
    requiredTerms: ['shared grocery list', 'shopping list', 'grocery list', 'shared_grocery_list'],
  },
  orderking: {
    allowedWings: new Set(['projects', 'autoresearch']),
    allowedPathPrefixes: ['projects/OrderKing/', 'autoresearch/'],
    requiredTerms: ['orderking', 'order king'],
  },
};

async function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function extractMcpContent(result) {
  if (result?.content?.[0]?.text) {
    return JSON.parse(result.content[0].text);
  }
  return result;
}

function filterNoisyStderr(stderr = '') {
  return stderr
    .split('\n')
    .filter(line => line && !line.startsWith('Failed to send telemetry event') && !line.startsWith('Anonymized telemetry enabled'))
    .join('\n');
}

function parseScopeParams(searchParams) {
  const parseList = (key) => searchParams.getAll(key)
    .flatMap(value => String(value || '').split(','))
    .map(value => value.trim())
    .filter(Boolean)
    .filter(value => value !== '*');

  const wings = parseList('wing');
  const rooms = parseList('room');
  return {
    wings,
    rooms,
    wing: wings[0] || null,
    room: rooms[0] || null,
  };
}

function cleanMemoryText(text = '') {
  return String(text || '')
    .replace(/^\[[^\]]+\]\s*/,'')
    .replace(/^\((assistant|user|system|jupiter)\)\s*/i,'')
    .replace(/^\[(assistant|user|system|jupiter)\]\s*/i,'')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveTitle(crystal, index = 0) {
  const title = String(crystal.title || '').trim();
  if (title && title.toLowerCase() !== 'untitled') return title;
  const theme = String(crystal.theme || '').trim();
  if (theme && theme.toLowerCase() !== 'untitled') return theme;
  const summary = cleanMemoryText(crystal.summary || crystal.text || '');
  if (!summary) return `Memory ${index + 1}`;
  return summary.slice(0, 96);
}

function inferEntitiesFromText(text = '') {
  const cleaned = cleanMemoryText(text);
  const matches = new Set();
  const stop = new Set(['The', 'This', 'That', 'Just', 'Yeah', 'Set', 'Auto', 'Mode', 'Models', 'Smart', 'Wrapper', 'Heartbeat']);
  const patterns = [
    /\b([A-Z][a-z]+(?:[A-Z][a-z0-9]+)+)\b/g,
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g,
    /\b(\w+\.(?:js|ts|py|dart|json|md|html))\b/gi,
    /\b(port\s+\d{2,5}|api|FastAPI|Flutter|Riverpod|Drift|YOLOv8|OpenClaw|MemPalace|OrderKing|GitHub Actions|Android|SQLite|PostgreSQL)\b/gi,
  ];
  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(cleaned))) {
      const value = String(match[1] || match[0] || '').trim();
      if (value.length >= 3 && value.length <= 60 && !stop.has(value)) matches.add(value);
    }
  });
  return Array.from(matches).slice(0, 12);
}

function stableNumericId(text) {
  let hash = 0;
  const value = String(text || '');
  for (let i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  return Math.abs(hash) || 1;
}

function parseActorFromText(text = '') {
  const actor = /\[(assistant|user|system|jupiter)\]/i.exec(text)?.[1]?.toLowerCase();
  if (actor) return actor;
  const lowered = String(text || '').toLowerCase();
  if (lowered.includes('jupiter')) return 'jupiter';
  if (lowered.includes('assistant')) return 'assistant';
  if (lowered.includes('system')) return 'system';
  if (lowered.includes('igor') || lowered.includes('user')) return 'user';
  return 'user';
}

function parseCreatedAt(text = '') {
  const iso = String(text || '').match(/\[(\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}(?:\.\d+)?)\]/i)?.[1];
  if (!iso) return 0;
  const ms = Date.parse(iso.endsWith('Z') ? iso : `${iso}Z`);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : 0;
}

function parseRecallIntent(query = '') {
  const q = String(query || '').trim();
  const lowered = q.toLowerCase();
  const actor = lowered.match(/\b(jupiter|assistant|user|igor|system)\b/)?.[1] || null;
  const stopTerms = new Set(['what', 'did', 'does', 'do', 'with', 'about', 'the', 'a', 'an', 'last', 'latest', 'recent', 'recently', 'today', 'just', 'now', 'most', 'current', 'currently', 'jupiter', 'assistant', 'user', 'igor', 'system', 'project', 'projects', 'thing', 'things', 'know']);
  const asksRecent = /\b(last|latest|recent|recently|today|just now|most recent|currently)\b/.test(lowered);
  const asksWork = /\b(work(?:ed|ing)? on|built|changed|did|worked)\b/.test(lowered);
  const asksDecision = /\b(decide|decision|chose|choice)\b/.test(lowered);
  const asksLearning = /\b(learn|learning|discovered|found out)\b/.test(lowered);
  const asksIdentity = /\b(name|who am i|who is|identity)\b/.test(lowered);
  const desiredRooms = new Set();
  if (asksWork) {
    ['events', 'decisions', 'learnings', 'workflow', 'setup', 'memories'].forEach(room => desiredRooms.add(room));
  }
  if (asksDecision) desiredRooms.add('decisions');
  if (asksLearning) desiredRooms.add('learnings');
  if (asksIdentity) desiredRooms.add('identities');
  if (!desiredRooms.size) ['memories', 'events', 'decisions', 'learnings', 'workflow'].forEach(room => desiredRooms.add(room));
  const topicTerms = tokenize(q).filter(term => term.length >= 3 && !stopTerms.has(term));
  const projectAliases = PROJECT_ALIASES
    .filter(entry => entry.aliases.some(alias => lowered.includes(alias)))
    .map(entry => entry.canonical);
  return {
    raw: q,
    actor: actor === 'igor' ? 'user' : actor,
    asksRecent,
    asksWork,
    asksDecision,
    asksLearning,
    asksIdentity,
    topicTerms,
    projectAliases,
    desiredRooms: Array.from(desiredRooms),
  };
}

function tokenize(text = '') {
  return String(text || '').toLowerCase().match(/[a-z0-9][a-z0-9._/-]*/g) || [];
}

function getProjectGate(intent) {
  for (const alias of intent.projectAliases || []) {
    if (PROJECT_GATES[alias]) return { canonical: alias, ...PROJECT_GATES[alias] };
  }
  return null;
}

function passesProjectGate(item, intent) {
  const gate = getProjectGate(intent);
  if (!gate) return true;
  const text = cleanMemoryText(item.text || '').toLowerCase();
  const source = String(item.source_file || '').toLowerCase();
  const wing = String(item.wing || '').toLowerCase();
  const pathOk = gate.allowedPathPrefixes.some(prefix => source.startsWith(prefix.toLowerCase()));
  const wingOk = gate.allowedWings.has(wing);
  const termOk = gate.requiredTerms.some(term => text.includes(term) || source.includes(term.replace(/ /g, '_')) || source.includes(term));
  return termOk && (pathOk || wingOk);
}

function scoreTextAgainstIntent(text = '', intent) {
  const lowered = cleanMemoryText(text).toLowerCase();
  let score = 0;
  if (!lowered) return -10;
  const queryTerms = intent.topicTerms?.length ? intent.topicTerms : tokenize(intent.raw).filter(term => !['what', 'did', 'the', 'a', 'an', 'last', 'latest'].includes(term));
  queryTerms.forEach(term => {
    if (lowered.includes(term)) score += 0.35;
  });
  if (intent.topicTerms?.length) {
    const matchedTopics = intent.topicTerms.filter(term => lowered.includes(term)).length;
    score += matchedTopics * 0.7;
    if (matchedTopics === 0) score -= 2.4;
  }
  if (intent.actor && lowered.includes(intent.actor)) score += 1.5;
  if (intent.asksWork && /(worked on|reviewed|fixed|implemented|updated|refined|added|tuned|rewired|built|shipped|committed)/.test(lowered)) score += 1.6;
  if (intent.asksDecision && /(decided|decision|chose|going with|configured)/.test(lowered)) score += 1.2;
  if (intent.asksLearning && /(learned|learning|discovered|found that)/.test(lowered)) score += 1.2;
  if (intent.asksRecent && /(today|recent|latest|current|next step|unresolved|committed)/.test(lowered)) score += 0.8;
  if (isLowSignalResult({ text }, intent)) score -= 2.5;
  return score;
}

function inferRoomForIngest(text = '', actor = 'user', providedRoom = null) {
  if (providedRoom) return providedRoom;
  const lowered = cleanMemoryText(text).toLowerCase();
  if (/(decided|decision|chose|going with|configured)/.test(lowered)) return 'decisions';
  if (/(learned|learning|discovered|found that|realized)/.test(lowered)) return 'learnings';
  if (/(prefer|preference|likes|wants)/.test(lowered)) return 'preferences';
  if (actor === 'jupiter' && /(worked on|reviewed|fixed|implemented|updated|refined|added|tuned|rewired|built|shipped|committed)/.test(lowered)) return 'events';
  return 'memories';
}

function inferRoomForStructuredKind(kind = '', fallbackText = '', actor = 'user', providedRoom = null) {
  if (providedRoom) return providedRoom;
  const normalizedKind = String(kind || '').toLowerCase();
  if (normalizedKind === 'decision') return 'decisions';
  if (normalizedKind === 'learning') return 'learnings';
  if (normalizedKind === 'preference') return 'preferences';
  if (['worklog', 'resume', 'state', 'blocker', 'next_step', 'event'].includes(normalizedKind)) return 'events';
  return inferRoomForIngest(fallbackText, actor, providedRoom);
}

function formatStructuredMemory(body = {}, actor = 'user') {
  const normalizedKind = String(body.kind || body.memory_kind || '').trim().toLowerCase();
  const project = String(body.project || '').trim();
  const summary = cleanMemoryText(body.summary || body.text || body.content || '');
  const status = cleanMemoryText(body.status || '');
  const nextStep = cleanMemoryText(body.next_step || body.nextStep || '');
  const blocker = cleanMemoryText(body.blocker || '');
  const sourceFiles = Array.isArray(body.source_files)
    ? body.source_files.map(value => cleanMemoryText(value)).filter(Boolean)
    : String(body.source_files || body.sourceFiles || '').split(',').map(value => cleanMemoryText(value)).filter(Boolean);

  if (!normalizedKind || !summary) return null;

  const lines = [`[${actor}] [${normalizedKind}] ${summary}`];
  if (project) lines.push(`project: ${project}`);
  if (status) lines.push(`status: ${status}`);
  if (nextStep) lines.push(`next_step: ${nextStep}`);
  if (blocker) lines.push(`blocker: ${blocker}`);
  if (sourceFiles.length) lines.push(`source_files: ${sourceFiles.join(', ')}`);
  return lines.join('\n');
}

async function searchImportantDocs(query = '', intent, maxResults = 8) {
  const results = [];
  const gate = getProjectGate(intent);
  for (const relativePath of IMPORTANT_DOC_PATHS) {
    try {
      if (gate && !gate.allowedPathPrefixes.some(prefix => relativePath.startsWith(prefix))) continue;
      const absolutePath = join(WORKSPACE, relativePath);
      const content = await fs.readFile(absolutePath, 'utf8');
      const blocks = content
        .split(/\n\s*\n/)
        .map(block => block.trim())
        .filter(Boolean)
        .slice(0, 120);
      blocks.forEach((block, index) => {
        const score = scoreTextAgainstIntent(block, intent);
        if (score < 0.75) return;
        results.push({
          text: block,
          wing: relativePath.startsWith('memory/') || relativePath === 'TOOLS.md' ? 'openclaw' : 'projects',
          room: relativePath.startsWith('memory/') ? 'events' : 'references',
          actor: relativePath.startsWith('memory/') && intent.actor === 'jupiter' && /worked|reviewed|fixed|implemented|updated|refined|added|tuned|rewired|built|shipped|committed/i.test(block)
            ? 'jupiter'
            : null,
          source_file: relativePath,
          similarity: score,
          created_at: /memory\/(\d{4}-\d{2}-\d{2})/.test(relativePath)
            ? Math.floor(Date.parse(`${relativePath.match(/memory\/(\d{4}-\d{2}-\d{2})/)[1]}T23:59:59Z`) / 1000)
            : 0,
          _block_index: index,
        });
      });
    } catch {}
  }
  return results.sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, maxResults);
}

function isLowSignalResult(item, intent) {
  const text = cleanMemoryText(item.text || '');
  const lowered = text.toLowerCase();
  const sourceLower = String(item.source_file || '').toLowerCase();
  if (!text) return true;
  if (!passesProjectGate(item, intent)) return true;
  if (intent.topicTerms?.length && !intent.topicTerms.some(term => lowered.includes(term) || String(item.source_file || '').toLowerCase().includes(term))) return true;
  if ((item.source_file || '').endsWith('TOOLS.md') && /(examples:|# decision|# learning from user correction|store-memory)/.test(lowered)) return true;
  if (!intent.asksIdentity && /user'?s name is|assistant'?s name is|ghost in the machine|test memory|testing wrapper script/.test(lowered)) return true;
  if (intent.asksWork && /(prefer|preference|identity|what do you remember|name is)/.test(lowered)) return true;
  return false;
}

function scoreRecallResult(item, intent) {
  const text = cleanMemoryText(item.text || '');
  const lowered = text.toLowerCase();
  const sourceLower = String(item.source_file || '').toLowerCase();
  let score = Number(item.similarity || 0);
  const actor = parseActorFromText(item.text || '');
  const createdAt = Number(item.created_at || 0) || parseCreatedAt(item.text || '');

  if (intent.actor) score += actor === intent.actor ? 1.6 : -0.45;
  if (intent.topicTerms?.length) {
    const topicMatches = intent.topicTerms.filter(term => lowered.includes(term) || String(item.source_file || '').toLowerCase().includes(term)).length;
    score += topicMatches * 1.1;
    if (topicMatches === 0) score -= 3.2;
  }
  if (intent.projectAliases?.length) {
    intent.projectAliases.forEach((alias) => {
      if (item.wing === alias) score += 2.6;
      if (sourceLower.includes(alias)) score += 1.9;
      if (alias === 'shared_grocery_list' && /(shared grocery list|shopping list)/.test(lowered)) score += 1.8;
      if (alias === 'orderking' && /orderking/.test(lowered)) score += 1.8;
    });
  }
  if (intent.desiredRooms.includes(item.room)) score += 0.7;
  if (intent.asksRecent) score += createdAt ? 1.1 + (createdAt / 2000000000) : -0.2;
  if (intent.asksWork && /(worked on|reviewed|fixed|implemented|updated|refined|added|tuned|rewired|built)/.test(lowered)) score += 1.25;
  if (intent.asksDecision && /(decided|decision|chose|going with|configured)/.test(lowered)) score += 1.15;
  if (intent.asksLearning && /(learned|learning|discovered|found that)/.test(lowered)) score += 1.15;
  if (intent.asksIdentity && /(name is|assistant|user's name)/.test(lowered)) score += 1.2;
  if (isLowSignalResult(item, intent)) score -= 2.2;
  return score;
}

function normalizeCrystal(crystal, index = 0) {
  const normalized = { ...crystal };
  normalized.text = String(crystal.text || '');
  normalized.summary = cleanMemoryText(crystal.summary || crystal.text || '');
  normalized.title = deriveTitle(crystal, index);
  normalized.id = Number.isFinite(Number(crystal.id)) && Number(crystal.id) > 0
    ? Number(crystal.id)
    : stableNumericId(`${normalized.wing || 'general'}:${normalized.room || 'memories'}:${normalized.title}:${normalized.created_at || index}`);
  normalized.actor = crystal.actor || parseActorFromText(crystal.text || crystal.summary || crystal.title || '') || 'user';
  normalized.wing = crystal.wing || 'general';
  normalized.room = crystal.room || 'memories';
  normalized.created_at = Number(crystal.created_at || 0) || parseCreatedAt(crystal.text || crystal.summary || '') || 0;
  const rawImportance = Number(crystal.importance_score ?? crystal.confidence ?? 1);
  const rawConfidence = Number(crystal.confidence ?? rawImportance ?? 1);
  normalized.importance_score = Math.max(0.05, Math.min(3, Number.isFinite(rawImportance) ? Math.abs(rawImportance) : 1));
  normalized.confidence = Math.max(0.05, Math.min(1, Number.isFinite(rawConfidence) ? Math.abs(rawConfidence) : normalized.importance_score));
  normalized.entities = Array.from(new Set([...(crystal.entities || []), ...inferEntitiesFromText(`${normalized.title} ${normalized.summary}`)])).slice(0, 12);
  normalized.self_state = crystal.self_state || normalized.wing || 'general';
  normalized.grav_mass = Math.max(0.05, Math.min(1.0, Number(crystal.grav_mass || normalized.importance_score || 0.4)));
  normalized.access_count = Number(crystal.access_count || 0) || 0;
  normalized.contradiction_state = crystal.contradiction_state || 'clear';
  return normalized;
}

function enrichGraphPayload(payload) {
  const crystals = (payload.crystals || []).map(normalizeCrystal);
  const crystalMap = new Map(crystals.map(crystal => [crystal.id, crystal]));
  const entityMap = new Map();
  const relations = [];

  crystals.forEach((crystal) => {
    (crystal.entities || []).forEach((entityName) => {
      if (!entityMap.has(entityName)) {
        entityMap.set(entityName, {
          id: stableNumericId(`entity:${entityName}`),
          name: entityName,
          mention_count: 0,
          salience: 0.2,
          kind: 'entity',
          wings: new Set(),
          rooms: new Set(),
          actors: new Set(),
        });
      }
      const entity = entityMap.get(entityName);
      entity.mention_count += 1;
      entity.wings.add(crystal.wing);
      entity.rooms.add(crystal.room);
      entity.actors.add(crystal.actor);
      relations.push({
        source_type: 'crystal',
        source_id: crystal.id,
        target_type: 'entity',
        target_id: entity.id,
        relation: 'mentions',
        weight: Math.min(1, 0.35 + crystal.importance_score * 0.1),
      });
    });
  });

  for (let i = 0; i < crystals.length; i += 1) {
    for (let j = i + 1; j < crystals.length; j += 1) {
      const a = crystals[i];
      const b = crystals[j];
      const shared = (a.entities || []).filter(entity => (b.entities || []).includes(entity));
      if (!shared.length) continue;
      const sameWing = a.wing === b.wing ? 0.08 : 0;
      const sameRoom = a.room === b.room ? 0.12 : 0;
      const timeGap = a.created_at && b.created_at ? Math.abs(a.created_at - b.created_at) / 86400 : 999;
      const temporal = timeGap < 2 ? 0.15 : timeGap < 14 ? 0.08 : 0;
      relations.push({
        source_type: 'crystal',
        source_id: a.id,
        target_type: 'crystal',
        target_id: b.id,
        relation: sameRoom || temporal ? 'temporal_cluster' : 'co_occurred',
        weight: Math.min(1, 0.22 + sameWing + sameRoom + temporal + shared.length * 0.14),
        shared_entities: shared.slice(0, 8),
      });
    }
  }

  const entities = Array.from(entityMap.values())
    .map((entity) => ({
      ...entity,
      salience: Math.min(1, 0.2 + entity.mention_count * 0.14 + entity.wings.size * 0.06),
      wings: Array.from(entity.wings).sort(),
      rooms: Array.from(entity.rooms).sort(),
      actors: Array.from(entity.actors).sort(),
    }))
    .sort((a, b) => b.mention_count - a.mention_count)
    .slice(0, 120);

  const allowedEntityIds = new Set(entities.map(entity => entity.id));
  const dedupe = new Set();
  const filteredRelations = relations.filter((relation) => {
    if (relation.target_type === 'entity' && !allowedEntityIds.has(relation.target_id)) return false;
    const key = `${relation.source_type}:${relation.source_id}->${relation.target_type}:${relation.target_id}:${relation.relation}`;
    if (dedupe.has(key)) return false;
    dedupe.add(key);
    return true;
  }).slice(0, 800);

  let lastScene = payload.last_scene || null;
  if (lastScene) {
    lastScene = {
      ...lastScene,
      crystals: (lastScene.crystals || []).map(normalizeCrystal),
      entities: Array.from(new Set((lastScene.entities || []).flatMap((entity) => typeof entity === 'string' ? [entity] : [entity.name]).filter(Boolean))),
    };
  }

  return {
    crystals,
    entities,
    relations: filteredRelations,
    last_scene: lastScene,
    stats: {
      crystals: crystals.length,
      entities: entities.length,
      links: filteredRelations.length,
      wings: new Set(crystals.map(crystal => crystal.wing)).size,
      rooms: new Set(crystals.map(crystal => `${crystal.wing}/${crystal.room}`)).size,
    },
  };
}

function enrichScenePayload(payload) {
  const crystals = (payload.crystals || []).map(normalizeCrystal);
  const entities = Array.from(new Set([
    ...(payload.entities || []).flatMap((entity) => typeof entity === 'string' ? [entity] : [entity.name]).filter(Boolean),
    ...crystals.flatMap((crystal) => crystal.entities || []),
  ]));
  return {
    ...payload,
    crystals,
    entities,
    scene_narrative: cleanMemoryText(payload.scene_narrative || ''),
  };
}

function callMcp(toolName, params = {}) {
  return new Promise((resolve, reject) => {
    const reqBody = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: params,
      },
    });

    const proc = spawn(VENV_PYTHON, ['-m', 'mempalace.mcp_server'], {
      cwd: MEMPALACE_ROOT,
      env: {
        ...process.env,
        PYTHONPATH: MEMPALACE_ROOT,
      },
    });

    let stdout = '';
    let stderr = '';

    proc.stdin.write(reqBody);
    proc.stdin.end();

    proc.stdout.on('data', d => { stdout += d.toString(); });
    proc.stderr.on('data', d => { stderr += d.toString(); });
    proc.on('error', reject);

    proc.on('close', () => {
      try {
        const result = JSON.parse(stdout);
        if (result.error) {
          reject(new Error(result.error.message));
          return;
        }
        resolve(extractMcpContent(result.result));
      } catch (error) {
        const cleanStderr = filterNoisyStderr(stderr);
        reject(new Error(`Failed to parse MCP response: ${stdout}${cleanStderr ? `\n${cleanStderr}` : ''}`));
      }
    });
  });
}

async function buildScopeOverview() {
  const wingsData = await callMcp('mempalace_list_wings');
  const wings = wingsData?.wings || {};
  const entries = [];
  for (const [wing, count] of Object.entries(wings)) {
    const roomsData = await callMcp('mempalace_list_rooms', { wing });
    const rooms = Object.entries(roomsData?.rooms || {}).map(([room, roomCount]) => ({ room, count: roomCount }));
    entries.push({ wing, count, rooms });
  }
  return { total_crystals: Object.values(wings).reduce((a, b) => a + b, 0), wings: entries, actors: [] };
}

async function searchScopedMemories({ query = '', maxResults = 8, wings = [], rooms = [] } = {}) {
  const effectiveQuery = query || 'recent important memories decisions learnings preferences';
  const searches = [];
  const wingList = wings.length ? wings : [null];
  const roomList = rooms.length ? rooms : [null];
  for (const wing of wingList) {
    for (const room of roomList) {
      searches.push(callMcp('mempalace_search', {
        query: effectiveQuery,
        limit: maxResults,
        ...(wing ? { wing } : {}),
        ...(room ? { room } : {}),
      }));
    }
  }
  const results = await Promise.all(searches);
  const seen = new Set();
  const merged = [];
  results.flatMap(result => result?.results || []).forEach((item) => {
    const key = `${item.wing}::${item.room}::${item.text}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  });
  merged.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
  return merged.slice(0, maxResults);
}

async function recallMemories({ query = '', maxResults = 8, wings = [], rooms = [] } = {}) {
  const intent = parseRecallIntent(query);
  const gate = getProjectGate(intent);
  const boostedWings = wings.length ? wings : Array.from(gate?.allowedWings || []);
  const boostedQueries = Array.from(new Set([
    query,
    intent.actor && intent.asksWork ? `${intent.actor} worked on` : '',
    intent.actor && intent.asksRecent ? `${intent.actor} recent work` : '',
    intent.asksDecision ? `${query} decisions` : '',
    intent.asksLearning ? `${query} learnings` : '',
  ].filter(Boolean)));

  const results = await Promise.all(boostedQueries.map((candidate) => searchScopedMemories({
    query: candidate,
    maxResults: Math.max(maxResults * 3, 18),
    wings: boostedWings,
    rooms: rooms.length ? rooms : intent.desiredRooms,
  })));
  const docResults = await searchImportantDocs(query, intent, Math.max(maxResults * 2, 10));

  const merged = [];
  const seen = new Set();
  results.flat().forEach((item) => {
    const key = `${item.wing}::${item.room}::${item.text}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  });
  docResults.forEach((item) => {
    const key = `${item.wing}::${item.room}::${item.text}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  });

  return merged
    .map((item) => ({ ...item, recallScore: scoreRecallResult(item, intent) }))
    .filter((item) => passesProjectGate(item, intent))
    .filter((item) => item.recallScore > -1.5)
    .sort((a, b) => b.recallScore - a.recallScore)
    .slice(0, maxResults);
}

function mcpResultsToPayload(results, query = '') {
  return {
    crystals: (results || []).map((item, index) => ({
      id: stableNumericId(`${item.wing}:${item.room}:${item.text}:${index}`),
      title: '',
      theme: '',
      summary: item.text,
      text: item.text,
      actor: item.actor || parseActorFromText(item.text),
      importance_score: Math.max(0.05, Math.min(1, Math.abs(Number(item.recallScore ?? item.similarity ?? 0.2)))),
      confidence: Math.max(0.05, Math.min(1, Math.abs(Number(item.similarity || 0.2)))),
      wing: item.wing || 'general',
      room: item.room || 'memories',
      source_file: item.source_file || null,
      created_at: Number(item.created_at || 0) || parseCreatedAt(item.text),
      entities: inferEntitiesFromText(item.text),
    })),
    entities: [],
    contradictions: [],
    scene_narrative: query ? `Recall scene for "${query}"` : 'Ambient graph',
    activation_metadata: { query, results_count: (results || []).length },
    working_memory_state: null,
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

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error && error.stack ? error.stack : error);
});

process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error && error.stack ? error.stack : error);
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

  const requestUrl = new URL(req.url, 'http://localhost');
  const pathname = requestUrl.pathname;
  console.log('Request:', req.method, pathname);

  if (!pathname.startsWith('/api/')) {
    try {
      const served = await serveStatic(req, res, pathname);
      if (served) return;
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: error.message }));
      return;
    }
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    let result;

    switch (pathname) {
      case '/api/status':
        result = await callMcp('mempalace_status');
        break;
      case '/api/wings':
        result = await callMcp('mempalace_list_wings');
        break;
      case '/api/rooms': {
        const wingParam = requestUrl.searchParams.get('wing');
        result = await callMcp('mempalace_list_rooms', wingParam ? { wing: wingParam } : {});
        break;
      }
      case '/api/taxonomy':
        result = await callMcp('mempalace_get_taxonomy');
        break;
      case '/api/graph-stats':
        result = await callMcp('mempalace_graph_stats');
        break;
      case '/api/kg-stats':
        result = await callMcp('mempalace_kg_stats');
        break;
      case '/api/graph': {
        const query = requestUrl.searchParams.get('q') || '';
        const crystalLimit = Number.parseInt(requestUrl.searchParams.get('crystal_limit') || requestUrl.searchParams.get('max_results') || '80', 10);
        const entityLimit = Number.parseInt(requestUrl.searchParams.get('entity_limit') || '80', 10);
        const scope = parseScopeParams(requestUrl.searchParams);
        const searchResults = await searchScopedMemories({ query, maxResults: crystalLimit, wings: scope.wings, rooms: scope.rooms });
        result = enrichGraphPayload({ ...mcpResultsToPayload(searchResults, query), entities: [], relations: [], last_scene: null });
        result.stats.entities = Math.min(result.stats.entities, entityLimit);
        result.entities = result.entities.slice(0, entityLimit);
        break;
      }
      case '/api/scope':
        result = await buildScopeOverview();
        break;
      case '/api/search': {
        const query = requestUrl.searchParams.get('q') || '';
        const maxResults = Number.parseInt(requestUrl.searchParams.get('max_results') || '8', 10);
        const scope = parseScopeParams(requestUrl.searchParams);
        result = enrichScenePayload(mcpResultsToPayload(await recallMemories({ query, maxResults, wings: scope.wings, rooms: scope.rooms }), query));
        break;
      }
      case '/api/ingest': {
        const body = await getRequestBody(req);
        const actor = body.actor || 'user';
        const text = body.text || body.content;
        const structuredText = formatStructuredMemory(body, actor);
        const finalText = structuredText || text;
        if (!finalText) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Missing text or content' }));
          return;
        }
        const wing = body.wing || 'openclaw';
        const room = inferRoomForStructuredKind(body.kind || body.memory_kind || '', finalText, actor, body.room || null);
        const content = structuredText || `[${actor}] ${finalText}`;
        result = await callMcp('mempalace_add_drawer', { wing, room, content, added_by: actor });
        result = { message: `Ingested into ${wing}/${room}` };
        break;
      }
      case '/api/resume': {
        const body = await getRequestBody(req);
        const query = body.query || '';
        if (!query) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Missing query' }));
          return;
        }

        // 1. Trigger the "Burst" Recall (Context, Achievements, Blockers)
        const contextResults = await recallMemories({ 
            query: `${query} current state and recent work`, 
            maxResults: 10 
        });

        // 2. Specifically target blockers/tasks for a targeted search
        const blockerResults = await recallMemories({ 
            query: `blockers, todo, pending issues or problems related to ${query}`, 
            maxResults: 5 
        });

        const crystals = [...contextResults, ...blockerResults].map((item, index) => normalizeCrystal(item, index));
        
        // 3. Perform Synthesis via LLM (Option A)
        let narrative = "";
        try {
          const synthesisPrompt = `You are the MemPalace Architectural Ghost. 
Synthesize a coherent "Resume/Briefing" for the user based on these memory crystals.

Current User Intent: "${query}"

CRYSAL DATA:
${crystals.map(c => `[${c.wing}/${c.room}] ${c.summary}`).join('\n')}

Structure your response into four clear pillars:
1. **CONTEXT**: Where are we and what is the current mode/project?
2. **ACHIEVEMENTS**: What was recently completed or decided?
3. **CURRENT FOCUS**: What is the immediate next logical step?
4. **BLOCKERS/TODOs**: What is currently standing in the way?

Keep the tone professional, insightful, and "ghost-in-the-machine" wise. Be concise but highly meaningful.`;

          const synthesisResult = await callMcp('mempalace_chat', { 
            message: synthesisPrompt,
            model: 'qwen3.5:2b' // Use a lightweight model for the synthesis task
          });

          // Handle different possible return formats from chat tools
          narrative = typeof synthesisResult === 'string' ? synthesisResult : (synthesisResult?.content?.[0]?.text || "Synthesis unavailable.");
        } catch (synthError) {
          console.error('Synthesis failed, falling back to raw summary:', synthError);
          narrative = `(Synthesis engine error: ${synthError.message}). Here is the raw context: `;
          narrative += crystals.map(c => c.summary).join('. ');
        }

        result = {
          project: query,
          narrative: narrative,
          achievements: crystals.filter(c => c.importance_score > 0.7 && (c.room === 'decisions' || c.room === 'learnings')).map(c => c.summary),
          focus: crystals.find(c => c.room === 'events')?.summary || "Ongoing tasks",
          blockers: blockerResults.map(b => b.summary),
          raw_crystals: crystals.slice(0, 5)
        };
        break;
      }
      case '/api/chat': {
        const body = await getRequestBody(req);
        const query = body.query || '';
        if (!query) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Missing query' }));
          return;
        }
        result = enrichScenePayload(mcpResultsToPayload(await recallMemories({
          query,
          maxResults: body.max_results || 8,
          wings: body.wings || (body.wing ? [body.wing] : []),
          rooms: body.rooms || (body.room ? [body.room] : []),
        }), query));
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
    console.error('API Error:', error && error.stack ? error.stack : error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

const PORT = Number(process.env.PORT || 8767);
const HOST = process.env.HOST || '0.0.0.0';
const AUTO_EXIT_MS = Number(process.env.AUTO_EXIT_MS || 0);

server.listen(PORT, HOST, () => {
  console.log(`🏰 MemPalace Viz API running at http://${HOST}:${PORT}`);
  console.log('   Endpoints: /api/status, /api/wings, /api/rooms, /api/taxonomy, /api/graph, /api/search, /api/chat');
  console.log('   Set HOST=127.0.0.1 to restrict to local-only access.');
  if (AUTO_EXIT_MS > 0) {
    console.log(`   Auto-exit enabled after ${AUTO_EXIT_MS}ms (dev restart mode).`);
    setTimeout(() => process.exit(0), AUTO_EXIT_MS).unref();
  }
});

server.on('error', error => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
