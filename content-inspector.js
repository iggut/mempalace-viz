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
    offset,
    limit,
    hasPrev,
    hasNext,
  } = opts;

  const norm = normalizeListDrawersPayload(listRaw);
  const listErr = listError || norm.error;
  const det = detailRaw ? normalizeGetDrawerPayload(detailRaw) : null;
  const detailErr = detailError || det?.error;

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

  let body = '';

  if (pane === 'detail') {
    body += `<div class="content-detail-nav btn-row" style="margin-bottom:8px;flex-wrap:wrap;gap:6px">
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-back-list">← Entries in this room</button>
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="copy-detail" ${detailLoading || detailErr ? 'disabled' : ''}>Copy text</button>
    </div>`;

    if (detailLoading) {
      body += `<p class="inspect-muted">Loading full entry…</p>`;
    } else if (detailErr) {
      body += `<p class="inspect-empty">${escapeHtml(detailErr)}</p>
        <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-retry-detail">Retry</button>`;
    } else if (det && !det.error && det.content != null) {
      body += metadataChipsHtml(det.metadata || {}, escapeHtml);
      body += `<div class="inspect-content-body" tabindex="0">${escapeHtml(det.content)}</div>`;
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

  if (listLoading) {
    body += `<p class="inspect-muted">Loading memory entries from storage…</p>`;
  } else if (listErr) {
    body += `<p class="inspect-empty">${escapeHtml(listErr)}</p>
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="room-retry-list">Retry</button>`;
  } else if (!norm.items.length) {
    body += `<p class="inspect-empty">No memory entries are stored in this room yet, or nothing matched this filter.</p>
      <p class="inspect-muted inspect-muted--tight">If the palace has structure and links but nothing appears here, entries may live under different room labels, or storage may be empty for this room.</p>
      <div class="btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="room-refresh">Refresh</button></div>`;
  } else {
    body += `<p class="inspect-micro">Entries (newest page first may vary by store — use pagination to browse)</p>
      <div class="content-entry-list">
        ${norm.items
          .map(
            (it) => `
          <button type="button" class="content-entry-card" data-content-action="room-open" data-drawer-id="${escapeHtml(it.id)}">
            <span class="content-entry-card__text">${escapeHtml(it.preview || '(no preview)')}</span>
            <span class="content-entry-card__meta">${escapeHtml(it.wing)} · ${escapeHtml(it.room)}</span>
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
    offset,
    limit,
    hasPrev,
    hasNext,
  } = opts;

  const norm = normalizeListDrawersPayload(listRaw);
  const listErr = listError || norm.error;

  const contextLine = `<p class="inspect-muted inspect-muted--tight content-scope-line"><strong>Scope</strong> · entire wing <code class="content-code">${escapeHtml(wingName)}</code> (all rooms). Open a single room for a focused list.</p>`;

  const pager =
    !listLoading && !listErr && norm.items.length
      ? `<div class="content-pager btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-page" data-dir="-1" ${hasPrev ? '' : 'disabled'}>Newer</button>
          <span class="inspect-muted content-pager__stat">${escapeHtml(String(offset + 1))}–${escapeHtml(String(offset + norm.pageCount))}</span>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-page" data-dir="1" ${hasNext ? '' : 'disabled'}>Older</button>
          <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button>
        </div>`
      : `<div class="content-pager btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button></div>`;

  let body = '';
  if (listLoading) {
    body += `<p class="inspect-muted">Loading a sample of memory entries across this wing…</p>`;
  } else if (listErr) {
    body += `<p class="inspect-empty">${escapeHtml(listErr)}</p>
      <button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-retry-list">Retry</button>`;
  } else if (!norm.items.length) {
    body += `<p class="inspect-empty">No drawers were returned for this wing — storage may be empty or filtered out.</p>
      <p class="inspect-muted inspect-muted--tight">Pick a room under this wing to see entries targeted to that room.</p>
      <div class="btn-row" style="margin-top:8px"><button type="button" class="btn btn--ghost btn--sm" data-content-action="wing-refresh">Refresh</button></div>`;
  } else {
    body += `<p class="inspect-micro">Sample of drawers in this wing (paginated)</p>
      <div class="content-entry-list">
        ${norm.items
          .map(
            (it) => `
          <div class="content-entry-card content-entry-card--static">
            <span class="content-entry-card__text">${escapeHtml(it.preview || '(no preview)')}</span>
            <span class="content-entry-card__meta">${escapeHtml(it.wing)} · ${escapeHtml(it.room)}</span>
          </div>`,
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
