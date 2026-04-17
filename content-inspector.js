/**
 * Stored memory / drawer content — normalization and inspector HTML helpers.
 * Data comes from MCP `mempalace_list_drawers` and `mempalace_get_drawer` via HTTP.
 */

/**
 * @param {unknown} data — raw JSON from list_drawers
 * @returns {{ error?: string, items: Array<{ id: string, wing: string, room: string, preview: string }>, pageCount: number, limit: number, offset: number, hasMore: boolean }}
 */
export function normalizeListDrawersPayload(data) {
  if (!data || typeof data !== 'object') {
    return { error: 'Empty response from server.', items: [], pageCount: 0, limit: 20, offset: 0, hasMore: false };
  }
  if (data.error) {
    return { error: String(data.error), items: [], pageCount: 0, limit: 20, offset: 0, hasMore: false };
  }
  const drawers = Array.isArray(data.drawers) ? data.drawers : [];
  const items = drawers
    .map((d) => {
      const id = d.drawer_id != null ? String(d.drawer_id) : d.id != null ? String(d.id) : '';
      if (!id) return null;
      return {
        id,
        wing: d.wing != null ? String(d.wing) : '',
        room: d.room != null ? String(d.room) : '',
        preview: d.content_preview != null ? String(d.content_preview) : '',
      };
    })
    .filter(Boolean);
  const limit = typeof data.limit === 'number' && Number.isFinite(data.limit) ? data.limit : 20;
  const offset = typeof data.offset === 'number' && Number.isFinite(data.offset) ? data.offset : 0;
  const pageCount = typeof data.count === 'number' && Number.isFinite(data.count) ? data.count : items.length;
  const hasMore = items.length >= limit;
  return { items, pageCount, limit, offset, hasMore };
}

/**
 * @typedef {{ id: string, wing: string, room: string, preview: string }} DrawerListItem
 */

/**
 * Client-side filter + sort for the current list_drawers page (no extra API calls).
 * @param {DrawerListItem[]} items
 * @param {string} query
 * @param {string} sort — `server` | `id-asc` | `id-desc` | `preview-az` | `preview-za`
 * @returns {{ items: DrawerListItem[], totalOnPage: number, matched: number }}
 */
export function applyDrawerListView(items, query, sort) {
  const base = Array.isArray(items) ? items : [];
  const totalOnPage = base.length;
  const q = (query || '').trim().toLowerCase();
  let list = q
    ? base.filter((it) => {
        const hay = `${it.id} ${it.wing} ${it.room} ${it.preview}`.toLowerCase();
        return hay.includes(q);
      })
    : base.slice();

  const orderIndex = new Map(base.map((it, i) => [it.id, i]));

  if (sort === 'id-asc') {
    list.sort((a, b) => a.id.localeCompare(b.id));
  } else if (sort === 'id-desc') {
    list.sort((a, b) => b.id.localeCompare(a.id));
  } else if (sort === 'preview-az') {
    list.sort(
      (a, b) =>
        (a.preview || '').localeCompare(b.preview || '', undefined, { sensitivity: 'base' }) ||
        a.id.localeCompare(b.id),
    );
  } else if (sort === 'preview-za') {
    list.sort(
      (a, b) =>
        (b.preview || '').localeCompare(a.preview || '', undefined, { sensitivity: 'base' }) ||
        a.id.localeCompare(b.id),
    );
  } else {
    list.sort((a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));
  }

  return { items: list, totalOnPage, matched: list.length };
}

/**
 * Primary line for list cards: first line of preview, else a shortened id.
 * @param {string} id
 * @param {string} preview
 */
export function drawerCardHeadline(id, preview) {
  const p = (preview || '').trim();
  if (p) {
    const line = p.split(/\r?\n/)[0] || '';
    return line.length > 160 ? `${line.slice(0, 157)}…` : line;
  }
  const sid = (id || '').trim();
  if (!sid) return '(no id)';
  return sid.length > 56 ? `${sid.slice(0, 53)}…` : sid;
}

/**
 * Optional second line: remaining preview after the first line.
 * @param {string} preview
 */
export function drawerCardBodySnippet(preview) {
  const p = (preview || '').trim();
  if (!p) return '';
  const lines = p.split(/\r?\n/);
  if (lines.length < 2) return '';
  const rest = lines.slice(1).join('\n').trim();
  if (!rest) return '';
  return rest.length > 220 ? `${rest.slice(0, 217)}…` : rest;
}

/**
 * @param {unknown} data — raw JSON from get_drawer
 * @returns {{ error?: string, drawerId?: string, content?: string, wing?: string, room?: string, metadata?: Record<string, unknown> }}
 */
export function normalizeGetDrawerPayload(data) {
  if (!data || typeof data !== 'object') {
    return { error: 'Empty response from server.' };
  }
  if (data.error) {
    return { error: String(data.error) };
  }
  const content = data.content != null ? String(data.content) : '';
  const meta = data.metadata && typeof data.metadata === 'object' ? data.metadata : {};
  return {
    drawerId: data.drawer_id != null ? String(data.drawer_id) : undefined,
    content,
    wing: data.wing != null ? String(data.wing) : '',
    room: data.room != null ? String(data.room) : '',
    metadata: meta,
  };
}

const META_CHIP_KEYS = ['source_file', 'added_by', 'hall', 'created_at', 'updated_at', 'file_path'];

/**
 * @param {Record<string, unknown>} meta
 * @param {(s: string) => string} escapeHtml
 */
export function metadataChipsHtml(meta, escapeHtml) {
  if (!meta || typeof meta !== 'object') return '';
  const chips = [];
  for (const k of META_CHIP_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(meta, k)) continue;
    const v = meta[k];
    if (v == null || v === '') continue;
    const vs = typeof v === 'string' ? v : JSON.stringify(v);
    if (!vs.trim()) continue;
    chips.push(
      `<span class="content-chip" title="${escapeHtml(k)}">${escapeHtml(k)}: ${escapeHtml(vs.length > 80 ? `${vs.slice(0, 80)}…` : vs)}</span>`,
    );
  }
  for (const [k, v] of Object.entries(meta)) {
    if (META_CHIP_KEYS.includes(k)) continue;
    if (chips.length >= 8) break;
    if (v == null || typeof v === 'object') continue;
    const vs = String(v);
    if (!vs.trim()) continue;
    chips.push(`<span class="content-chip content-chip--extra">${escapeHtml(k)}: ${escapeHtml(vs.length > 60 ? `${vs.slice(0, 60)}…` : vs)}</span>`);
  }
  return chips.length ? `<div class="content-chips">${chips.join('')}</div>` : '';
}

/**
 * @param {(s: string) => string} escapeHtml
 * @param {string} current
 */
function sortSelectOptionsHtml(escapeHtml, current) {
  const pairs = [
    ['server', 'Page order'],
    ['id-asc', 'Drawer id (A→Z)'],
    ['id-desc', 'Drawer id (Z→A)'],
    ['preview-az', 'Preview (A→Z)'],
    ['preview-za', 'Preview (Z→A)'],
  ];
  return pairs
    .map(
      ([val, label]) =>
        `<option value="${escapeHtml(val)}"${val === current ? ' selected' : ''}>${escapeHtml(label)}</option>`,
    )
    .join('');
}

/**
 * @param {(s: string) => string} escapeHtml
 * @param {'content'|'wing'} which
 * @param {string} filterVal
 * @param {string} sortVal
 * @param {string} countLine — e.g. "Showing 4 of 12 on this page"
 */
function storedListToolbarHtml(escapeHtml, which, filterVal, sortVal, countLine) {
  const fid = which === 'content' ? 'content-stored-filter' : 'wing-stored-filter';
  const sid = which === 'content' ? 'content-stored-sort' : 'wing-stored-sort';
  return `<div class="content-stored-toolbar" role="group" aria-label="Filter and sort this page">
    <label class="visually-hidden" for="${fid}">Filter entries on this page</label>
    <input type="search" id="${fid}" class="content-stored-filter" placeholder="Filter this page…" value="${escapeHtml(filterVal)}" autocomplete="off" spellcheck="false" />
    <label class="visually-hidden" for="${sid}">Sort</label>
    <select id="${sid}" class="content-stored-sort">${sortSelectOptionsHtml(escapeHtml, sortVal)}</select>
    <span class="content-stored-toolbar__count inspect-micro" aria-live="polite">${escapeHtml(countLine)}</span>
  </div>`;
}

/**
 * @param {DrawerListItem} it
 * @param {(s: string) => string} escapeHtml
 * @param {'room'|'wing'} scope
 */
function storedEntryCardInnerHtml(it, escapeHtml, scope) {
  const head = drawerCardHeadline(it.id, it.preview);
  const bodySnip = drawerCardBodySnippet(it.preview);
  const idShort = it.id.length > 44 ? `${it.id.slice(0, 41)}…` : it.id;
  const roomTag =
    scope === 'wing' && it.room
      ? `<span class="content-entry-card__room" title="Room">${escapeHtml(it.room)}</span>`
      : '';
  return `<span class="content-entry-card__headline">${escapeHtml(head)}</span>
    <span class="content-entry-card__idline"><code class="content-code content-code--drawer">${escapeHtml(idShort)}</code>${roomTag}</span>
    ${bodySnip ? `<span class="content-entry-card__snippet">${escapeHtml(bodySnip)}</span>` : ''}`;
}

/**
 * @param {object} opts
 * @param {(s: string) => string} opts.escapeHtml
 */
export function buildRoomStoredContentSectionHtml(opts) {
  const {
    escapeHtml,
    wingName,
    roomName,
    taxonomyDrawerCount,
    listLoading,
    listError,
    listRaw,
    pane,
    detailLoading,
    detailError,
    detailRaw,
    detailDrawerId,
    offset,
    limit,
    hasPrev,
    hasNext,
    listFilter = '',
    listSort = 'server',
    displayItems,
    detailNav,
  } = opts;

  const norm = normalizeListDrawersPayload(listRaw);
  const listErr = listError || norm.error;
  const det = detailRaw ? normalizeGetDrawerPayload(detailRaw) : null;
  const detailErr = detailError || det?.error;
  const rows = Array.isArray(displayItems) ? displayItems : norm.items;

  const contextLine = `<p class="inspect-muted inspect-muted--tight content-scope-line"><strong>Scope</strong> · wing <code class="content-code">${escapeHtml(wingName)}</code> · room <code class="content-code">${escapeHtml(roomName)}</code>${taxonomyDrawerCount != null ? ` · taxonomy lists <strong>${taxonomyDrawerCount}</strong> drawers here` : ''}.</p>`;

  const pager =
    pane === 'list' && !listLoading && !listErr && norm.items.length
      ? `<div class="content-pager btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-page" data-dir="-1" ${hasPrev ? '' : 'disabled'}>Newer</button>
          <span class="inspect-muted content-pager__stat">${escapeHtml(String(offset + 1))}–${escapeHtml(String(offset + norm.pageCount))}</span>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-page" data-dir="1" ${hasNext ? '' : 'disabled'}>Older</button>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-refresh">Refresh</button>
        </div>`
      : pane === 'list'
        ? `<div class="content-pager btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="room-refresh">Refresh</button></div>`
        : '';

  const nav = detailNav || {};
  const pos =
    nav.positionLabel != null && String(nav.positionLabel).trim()
      ? `<span class="content-detail-anchor__pos inspect-micro" aria-live="polite">${escapeHtml(String(nav.positionLabel))}</span>`
      : '';
  const idLine =
    detailDrawerId != null && String(detailDrawerId).trim()
      ? `<p class="content-detail-anchor__idline inspect-muted"><code class="content-code">${escapeHtml(String(detailDrawerId))}</code></p>`
      : '';

  let body = '';

  if (pane === 'detail') {
    body += `<header class="content-detail-anchor">
      <div class="content-detail-anchor__row">
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-back-list">← List</button>
        ${pos}
        <div class="content-detail-anchor__step">
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-detail-step" data-dir="-1" ${nav.hasPrev ? '' : 'disabled'} title="Previous entry on this page">↑ Prev</button>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-detail-step" data-dir="1" ${nav.hasNext ? '' : 'disabled'} title="Next entry on this page">Next ↓</button>
        </div>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="copy-detail" ${detailLoading || detailErr ? 'disabled' : ''}>Copy</button>
      </div>
      ${idLine}
    </header>`;

    if (detailLoading) {
      body += `<p class="inspect-muted content-detail-status">Loading full entry…</p>`;
    } else if (detailErr) {
      body += `<p class="inspect-empty">${escapeHtml(detailErr)}</p>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-retry-detail">Retry</button>`;
    } else if (det && !det.error && det.content != null) {
      body += metadataChipsHtml(det.metadata || {}, escapeHtml);
      body += `<div class="inspect-content-body inspect-content-body--detail" tabindex="0">${escapeHtml(det.content)}</div>`;
      const rawMeta = det.metadata && Object.keys(det.metadata).length;
      body += rawMeta
        ? `<details class="inspect-details content-raw-details"><summary class="inspect-section__title">Raw metadata &amp; debug</summary>
            <pre class="memory-lens__pre memory-lens__pre--compact">${escapeHtml(JSON.stringify(det.metadata, null, 2))}</pre>
          </details>`
        : '';
    } else {
      body += `<p class="inspect-empty">Could not read this entry.</p>`;
    }

    return `
      <section class="inspect-section inspect-section--stored" aria-label="Stored content">
        <h3 class="inspect-section__title">Stored content</h3>
        <div class="inspect-section__body inspect-section__body--stored">
          ${contextLine}
          ${body}
        </div>
      </section>`;
  }

  const countLine =
    !listLoading && !listErr && norm.items.length
      ? rows.length === norm.items.length
        ? `Showing ${rows.length} on this page`
        : `Showing ${rows.length} of ${norm.items.length} on this page (filtered)`
      : '';

  if (listLoading) {
    body += `<p class="inspect-muted">Loading memory entries from storage…</p>`;
  } else if (listErr) {
    body += `<p class="inspect-empty">${escapeHtml(listErr)}</p>
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-retry-list">Retry</button>`;
  } else if (!norm.items.length) {
    body += `<p class="inspect-empty">No memory entries are stored in this room yet.</p>
      <p class="inspect-muted inspect-muted--tight">If the palace has structure and links but nothing appears here, entries may live under different room labels, or storage may be empty for this room.</p>
      <div class="btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="room-refresh">Refresh</button></div>`;
  } else if (!rows.length) {
    body += `<p class="inspect-empty">No entries on this page match your filter.</p>
      <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-clear-filter">Clear filter</button>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-refresh">Refresh</button>
      </div>`;
  } else {
    body += `<p class="inspect-micro content-stored-hint">Memory entries in this room (paginated from storage). Filter and sort apply to the current page only.</p>
      ${storedListToolbarHtml(escapeHtml, 'content', listFilter, listSort, countLine)}
      <div class="content-entry-list" role="list">
        ${rows
          .map(
            (it) => `
          <button type="button" class="content-entry-card" role="listitem" data-content-action="room-open" data-drawer-id="${escapeHtml(it.id)}">
            ${storedEntryCardInnerHtml(it, escapeHtml, 'room')}
          </button>`,
          )
          .join('')}
      </div>`;
    body += pager;
  }

  if (!listLoading && listRaw && !listErr) {
    body += `<details class="inspect-details content-raw-details"><summary class="inspect-section__title">Raw list response</summary>
      <pre class="memory-lens__pre memory-lens__pre--compact">${escapeHtml(JSON.stringify(listRaw, null, 2))}</pre>
    </details>`;
  }

  return `
    <section class="inspect-section inspect-section--stored" aria-label="Stored content">
      <h3 class="inspect-section__title">Stored content</h3>
      <div class="inspect-section__body inspect-section__body--stored">
        ${contextLine}
        ${body}
      </div>
    </section>`;
}

/**
 * @param {object} opts
 * @param {(s: string) => string} opts.escapeHtml
 */
export function buildWingStoredContentSectionHtml(opts) {
  const {
    escapeHtml,
    wingName,
    listLoading,
    listError,
    listRaw,
    pane,
    detailLoading,
    detailError,
    detailRaw,
    detailDrawerId,
    offset,
    limit,
    hasPrev,
    hasNext,
    listFilter = '',
    listSort = 'server',
    displayItems,
    detailNav,
  } = opts;

  const norm = normalizeListDrawersPayload(listRaw);
  const listErr = listError || norm.error;
  const det = detailRaw ? normalizeGetDrawerPayload(detailRaw) : null;
  const detailErr = detailError || det?.error;
  const rows = Array.isArray(displayItems) ? displayItems : norm.items;

  const contextLine = `<p class="inspect-muted inspect-muted--tight content-scope-line"><strong>Scope</strong> · entire wing <code class="content-code">${escapeHtml(wingName)}</code> (all rooms). Open a single room for a focused list.</p>`;

  const pager =
    pane === 'list' && !listLoading && !listErr && norm.items.length
      ? `<div class="content-pager btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-page" data-dir="-1" ${hasPrev ? '' : 'disabled'}>Newer</button>
          <span class="inspect-muted content-pager__stat">${escapeHtml(String(offset + 1))}–${escapeHtml(String(offset + norm.pageCount))}</span>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-page" data-dir="1" ${hasNext ? '' : 'disabled'}>Older</button>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button>
        </div>`
      : pane === 'list'
        ? `<div class="content-pager btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button></div>`
        : '';

  const nav = detailNav || {};
  const pos =
    nav.positionLabel != null && String(nav.positionLabel).trim()
      ? `<span class="content-detail-anchor__pos inspect-micro" aria-live="polite">${escapeHtml(String(nav.positionLabel))}</span>`
      : '';
  const idLine =
    detailDrawerId != null && String(detailDrawerId).trim()
      ? `<p class="content-detail-anchor__idline inspect-muted"><code class="content-code">${escapeHtml(String(detailDrawerId))}</code></p>`
      : '';

  let body = '';

  if (pane === 'detail') {
    body += `<header class="content-detail-anchor">
      <div class="content-detail-anchor__row">
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-back-list">← Sample list</button>
        ${pos}
        <div class="content-detail-anchor__step">
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-detail-step" data-dir="-1" ${nav.hasPrev ? '' : 'disabled'} title="Previous entry on this page">↑ Prev</button>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-detail-step" data-dir="1" ${nav.hasNext ? '' : 'disabled'} title="Next entry on this page">Next ↓</button>
        </div>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-copy-detail" ${detailLoading || detailErr ? 'disabled' : ''}>Copy</button>
      </div>
      ${idLine}
    </header>`;

    if (detailLoading) {
      body += `<p class="inspect-muted content-detail-status">Loading full entry…</p>`;
    } else if (detailErr) {
      body += `<p class="inspect-empty">${escapeHtml(detailErr)}</p>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-retry-detail">Retry</button>`;
    } else if (det && !det.error && det.content != null) {
      body += metadataChipsHtml(det.metadata || {}, escapeHtml);
      body += `<div class="inspect-content-body inspect-content-body--detail" tabindex="0">${escapeHtml(det.content)}</div>`;
      const rawMeta = det.metadata && Object.keys(det.metadata).length;
      body += rawMeta
        ? `<details class="inspect-details content-raw-details"><summary class="inspect-section__title">Raw metadata &amp; debug</summary>
            <pre class="memory-lens__pre memory-lens__pre--compact">${escapeHtml(JSON.stringify(det.metadata, null, 2))}</pre>
          </details>`
        : '';
    } else {
      body += `<p class="inspect-empty">Could not read this entry.</p>`;
    }

    return `
      <section class="inspect-section inspect-section--stored" aria-label="Stored memories in wing">
        <h3 class="inspect-section__title">Stored memories (wing sample)</h3>
        <div class="inspect-section__body inspect-section__body--stored">
          ${contextLine}
          ${body}
        </div>
      </section>`;
  }

  const countLine =
    !listLoading && !listErr && norm.items.length
      ? rows.length === norm.items.length
        ? `Showing ${rows.length} on this page`
        : `Showing ${rows.length} of ${norm.items.length} on this page (filtered)`
      : '';

  if (listLoading) {
    body += `<p class="inspect-muted">Loading a sample of memory entries across this wing…</p>`;
  } else if (listErr) {
    body += `<p class="inspect-empty">${escapeHtml(listErr)}</p>
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-retry-list">Retry</button>`;
  } else if (!norm.items.length) {
    body += `<p class="inspect-empty">No drawers were returned for this wing — storage may be empty or filtered out.</p>
      <p class="inspect-muted inspect-muted--tight">Pick a room under this wing to see entries targeted to that room.</p>
      <div class="btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button></div>`;
  } else if (!rows.length) {
    body += `<p class="inspect-empty">No entries on this page match your filter.</p>
      <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-clear-filter">Clear filter</button>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button>
      </div>`;
  } else {
    body += `<p class="inspect-micro content-stored-hint">Sample of drawers across this wing (paginated). Tap a row to read the full entry. Filter and sort apply to the current page only.</p>
      ${storedListToolbarHtml(escapeHtml, 'wing', listFilter, listSort, countLine)}
      <div class="content-entry-list" role="list">
        ${rows
          .map(
            (it) => `
          <button type="button" class="content-entry-card" role="listitem" data-content-action="wing-open" data-drawer-id="${escapeHtml(it.id)}">
            ${storedEntryCardInnerHtml(it, escapeHtml, 'wing')}
          </button>`,
          )
          .join('')}
      </div>`;
    body += pager;
  }

  return `
    <section class="inspect-section inspect-section--stored" aria-label="Stored memories in wing">
      <h3 class="inspect-section__title">Stored memories (wing sample)</h3>
      <div class="inspect-section__body inspect-section__body--stored">
        ${contextLine}
        ${body}
      </div>
    </section>`;
}
