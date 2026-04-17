/**
 * Task-oriented copy and summaries for Graph view — testable without the DOM.
 */

import { formatRelationshipTypeCounts } from './graph-relationships.js';

/**
 * @param {object} p
 * @param {{ degree: number, crossWingLinks: number, intraWingLinks: number, byType: Record<string, number> }} p.visRoomInc
 * @param {{ degree: number }} p.fullRoomInc
 * @param {{ medianDegree?: number|null, relatedRooms?: Array<{ wing: string, room: string, degree: number }> }|null} p.slice
 * @param {boolean} p.graphFilterNarrowed
 */
export function summarizeGraphRoomNeighborhood(p) {
  const { visRoomInc, fullRoomInc, slice, graphFilterNarrowed } = p;
  const deg = visRoomInc?.degree ?? 0;
  const vCross = visRoomInc?.crossWingLinks ?? 0;
  const vIntra = visRoomInc?.intraWingLinks ?? 0;
  const med = slice?.medianDegree;

  const roleLine =
    deg === 0
      ? 'Room node — no visible edges on this node with the current link-type filters.'
      : `Room node — ${deg} visible edge${deg === 1 ? '' : 's'} to other rooms (lines on the canvas).`;

  let balanceLine = '';
  if (deg > 0) {
    if (vCross > vIntra * 1.25) {
      balanceLine =
        'Cross-wing links dominate here — this room is mainly a tunnel bridge between wings (same room name in different wings).';
    } else if (vIntra > vCross * 1.25) {
      balanceLine =
        'Same-wing links dominate — mostly taxonomy-order edges within one wing, not cross-wing hops.';
    } else {
      balanceLine = 'Mix of cross-wing tunnels and same-wing ordering — compare wings in the list below.';
    }
  }

  let medianLine = '';
  if (deg > 0 && med != null && Number.isFinite(med)) {
    if (deg > med * 1.2) medianLine = `More connected than most rooms (median degree ${med}).`;
    else if (deg < med * 0.85) medianLine = `Sparser than typical rooms (median degree ${med}).`;
    else medianLine = `Near typical connectivity (median degree ${med}).`;
  }

  let filterLine = '';
  if (graphFilterNarrowed && fullRoomInc && visRoomInc && fullRoomInc.degree > visRoomInc.degree) {
    filterLine =
      'Filters hide some edge types — “visible” counts match the scene; global totals stay in Connections detail below.';
  } else if (graphFilterNarrowed) {
    filterLine = 'Link-type filters are on — counts below match what the scene draws.';
  }

  const dominantTypes =
    deg > 0 ? formatRelationshipTypeCounts(visRoomInc.byType || {}, 4) : '';

  const topNeighbors = (slice?.relatedRooms || [])
    .slice(0, 3)
    .map((r) => `${r.room} (${r.wing})`)
    .filter(Boolean);

  return {
    roleLine,
    balanceLine,
    medianLine,
    filterLine,
    dominantTypes,
    topNeighbors,
  };
}

/**
 * @param {object} p
 * @param {{ byType: Record<string, number>, crossWingTouches: number }} p.wVis
 * @param {boolean} p.graphFilterNarrowed
 * @param {{ crossWingTouches: number }} p.tunnelFull
 */
export function summarizeGraphWingNeighborhood(p) {
  const { wVis, graphFilterNarrowed, tunnelFull } = p;
  const crossV = wVis?.crossWingTouches ?? 0;
  const crossF = tunnelFull?.crossWingTouches ?? 0;
  const typeStr = formatRelationshipTypeCounts(wVis?.byType || {}, 5);

  const roleLine = `Wing node — edges are aggregated from rooms in this wing (layout is not the folder tree).`;

  let shapeLine = '';
  if (crossV === 0) {
    shapeLine = 'No cross-wing tunnel edges touch this wing on visible link types.';
  } else if (crossF > 0 && crossV < crossF * 0.5 && graphFilterNarrowed) {
    shapeLine =
      'Some cross-wing links may be hidden by filters — widen link types to see the full wing footprint.';
  } else {
    shapeLine = `Cross-wing tunnel activity touches this wing (${crossV} visible edge${crossV === 1 ? '' : 's'}).`;
  }

  return {
    roleLine,
    shapeLine,
    mixLine: typeStr ? `Visible relationship mix: ${typeStr}.` : '',
  };
}
