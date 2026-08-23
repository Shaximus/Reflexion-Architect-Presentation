import { ACCENT_HEX, type Edge, type Entity, type LayoutNode } from "@/presentation/engine/types";

// Approximate average glyph advance in viewBox units per unit of font size.
// Used to convert a box width into a wrap column count so wrapped lines
// stay inside the box border instead of spilling past it.
const TITLE_ADVANCE = 0.62; // Cinzel 600, mixed case
const SUB_ADVANCE = 0.52; // Outfit
const SUB_FONT = 2.1;
const SUB_LINE_H = SUB_FONT * 1.32;
const MAX_SUB_LINES = 4;

interface FittedText {
  fontSize: number;
  lineH: number;
  title: string[];
  sub: string[] | null;
  subClipped: boolean;
  blockH: number;
}

/**
 * Fit a node's FULL title into a box `nw` wide. The title is never cut: it
 * wraps to as many lines as it needs, and the font steps down (to at most
 * 72% of base) only when that keeps the line count at three or fewer.
 * Subtitles wrap as well; past MAX_SUB_LINES they clip with an explicit
 * ellipsis, and the complete text stays reachable through the node's
 * <title> tooltip and aria-label. Nothing is ever silently dropped.
 */
function fitNodeText(
  label: string,
  subtitle: string | undefined,
  nw: number,
  baseFs: number,
): FittedText {
  const usable = Math.max(6, nw - 3);
  const candidates = [1, 0.85, 0.72].map((scale) => {
    const fs = baseFs * scale;
    const cols = Math.max(6, Math.floor(usable / (fs * TITLE_ADVANCE)));
    return { fs, lines: wrapText(label, cols) };
  });
  const chosen =
    candidates.find((c) => c.lines.length <= 3) ??
    candidates.reduce((a, b) => (b.lines.length < a.lines.length ? b : a));

  let sub: string[] | null = null;
  let subClipped = false;
  if (subtitle) {
    const cols = Math.max(8, Math.floor(usable / (SUB_FONT * SUB_ADVANCE)));
    sub = wrapText(subtitle, cols);
    if (sub.length > MAX_SUB_LINES) {
      sub = sub.slice(0, MAX_SUB_LINES);
      sub[MAX_SUB_LINES - 1] = `${sub[MAX_SUB_LINES - 1]} …`;
      subClipped = true;
    }
  }

  const lineH = chosen.fs * 1.32;
  const blockH = chosen.lines.length * lineH + (sub ? 1.0 + sub.length * SUB_LINE_H : 0);
  return { fontSize: chosen.fs, lineH, title: chosen.lines, sub, subClipped, blockH };
}

export function Graph({
  entities,
  edges,
  layout,
  selectedId,
  onSelect,
  present,
}: {
  entities: Entity[];
  edges: Edge[];
  layout: LayoutNode[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  present?: boolean;
}) {
  const pos = new Map(layout.map((n) => [n.id, n]));
  const related = new Set<string>();
  if (selectedId) {
    related.add(selectedId);
    for (const e of edges) {
      if (e.from === selectedId) related.add(e.to);
      if (e.to === selectedId) related.add(e.from);
    }
  }

  const count = entities.length;
  const w = present ? (count <= 4 ? 28 : count <= 6 ? 24 : 21) : count <= 4 ? 26 : 22;
  const h = present ? (count <= 4 ? 18 : count <= 6 ? 15 : 13) : count <= 4 ? 16 : 13;

  // Cap the box width to the tightest horizontal pitch among rendered nodes
  // that share a row, so boxes cannot overlap when the layout grid was
  // computed over a different entity count than the one actually rendered.
  const rowsByY = new Map<number, number[]>();
  for (const ent of entities) {
    const p = pos.get(ent.id);
    if (!p) continue;
    const key = Math.round(p.y / 8);
    const xs = rowsByY.get(key) ?? [];
    xs.push(p.x);
    rowsByY.set(key, xs);
  }
  let pitch = Infinity;
  for (const xs of rowsByY.values()) {
    xs.sort((a, b) => a - b);
    for (let i = 1; i < xs.length; i++) {
      const d = xs[i]! - xs[i - 1]!;
      if (d > 0) pitch = Math.min(pitch, d);
    }
  }
  const boxW = Number.isFinite(pitch) ? Math.min(w, Math.max(12, pitch - 1.8)) : w;
  const baseFs = present ? 2.7 : 2.4;

  // Precompute every node's fitted text and box so both render passes and
  // the edge-label placement can see the true box extents.
  const nodes = entities.flatMap((ent) => {
    const p = pos.get(ent.id);
    if (!p) return [];
    const nw = p.r ? p.r * 2.2 : boxW;
    const fit = fitNodeText(ent.label, ent.subtitle, nw, baseFs);
    // The box grows to hold every line — text is never cut to fit the box.
    const nh = Math.max(p.r ? p.r * 1.4 : h, fit.blockH + 3.4);
    return [{ ent, p, nw, nh, fit }];
  });
  const rects = nodes.map((n) => ({
    x0: n.p.x - n.nw / 2,
    x1: n.p.x + n.nw / 2,
    y0: n.p.y - n.nh / 2,
    y1: n.p.y + n.nh / 2,
  }));

  const labelFs = present ? 2.6 : 2.3;
  // Find an anchor along the edge where the label clears every node box, so
  // labels neither hide behind boxes nor overprint node text. If no clear
  // spot exists the label still paints above the boxes (readable via its
  // dark halo) rather than vanishing beneath them.
  const placeLabel = (a: LayoutNode, b: LayoutNode, ei: number, shown: string) => {
    const wEst = shown.length * labelFs * 0.52 + 1;
    const baseT = [0.34, 0.62, 0.48][ei % 3]!;
    const baseDy = ei % 2 === 0 ? 0 : 1.9;
    const cands: [number, number][] = [
      [baseT, baseDy],
      [0.5, 0],
      [0.42, 0],
      [0.58, 0],
      [0.5, 2.6],
      [0.3, 0],
      [0.7, 0],
      [0.24, 0],
      [0.76, 0],
    ];
    for (const [t, dy] of cands) {
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t + dy;
      const ly = y - 1.2; // text baseline
      const clear = rects.every(
        (r) =>
          x + wEst / 2 < r.x0 ||
          x - wEst / 2 > r.x1 ||
          ly + 0.6 < r.y0 ||
          ly - labelFs > r.y1,
      );
      if (clear) return { x, y };
    }
    return { x: a.x + (b.x - a.x) * baseT, y: a.y + (b.y - a.y) * baseT + baseDy };
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Relationship graph"
      onClick={() => onSelect(null)}
    >
      {edges.map((e) => {
        const a = pos.get(e.from);
        const b = pos.get(e.to);
        if (!a || !b) return null;
        const active = !selectedId || (related.has(e.from) && related.has(e.to));
        return (
          <g
            key={`${e.from}-${e.to}`}
            opacity={active ? 1 : 0.22}
            style={{ transition: "opacity 0.3s ease" }}
          >
            <title>{e.label}</title>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={active ? "#e4c36b" : "#32323e"}
              strokeWidth={active ? 0.5 : 0.22}
              opacity={active ? 0.75 : 1}
            />
          </g>
        );
      })}
      {nodes.map(({ ent, p, nw, nh, fit }) => {
        const active = !selectedId || related.has(ent.id);
        const selected = selectedId === ent.id;
        const hex = ACCENT_HEX[ent.accent];
        const titleY0 = -fit.blockH / 2 + fit.lineH * 0.78;
        const subY0 = titleY0 + (fit.title.length - 1) * fit.lineH + 1.0 + SUB_LINE_H;
        const fullText = ent.subtitle ? `${ent.label} — ${ent.subtitle}` : ent.label;
        return (
          <g
            key={ent.id}
            transform={`translate(${p.x} ${p.y})`}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={fullText}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect(selected ? null : ent.id);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                onSelect(selected ? null : ent.id);
              }
            }}
            opacity={active ? 1 : 0.2}
            style={{ transition: "opacity 0.3s ease" }}
          >
            {/* Hover tooltip always carries the complete, unabridged text. */}
            <title>{fullText}</title>
            {selected && (
              <rect
                x={-nw / 2 - 1.1}
                y={-nh / 2 - 1.1}
                width={nw + 2.2}
                height={nh + 2.2}
                rx={2.4}
                fill="none"
                stroke={hex}
                strokeWidth={0.45}
                opacity={0.9}
              />
            )}
            <rect
              x={-nw / 2}
              y={-nh / 2}
              width={nw}
              height={nh}
              rx={1.8}
              fill="#111118"
              stroke={hex}
              strokeWidth={selected ? 0.7 : 0.32}
            />
            {fit.title.map((ln, i) => (
              <text
                key={`t${i}-${ln}`}
                y={titleY0 + i * fit.lineH}
                textAnchor="middle"
                fill="#f5f1e8"
                fontSize={fit.fontSize}
                fontFamily="Cinzel, serif"
                fontWeight={600}
              >
                {ln}
              </text>
            ))}
            {fit.sub?.map((ln, i) => (
              <text
                key={`s${i}-${ln}`}
                y={subY0 + i * SUB_LINE_H}
                textAnchor="middle"
                fill="#b7b1a5"
                fontSize={SUB_FONT}
                fontFamily="Outfit, sans-serif"
              >
                {ln}
              </text>
            ))}
          </g>
        );
      })}
      {/* Edge labels paint AFTER the node boxes so a box can never hide a
          label mid-word; the dark stroke halo keeps them readable over any
          fill. Truncation here is explicit (…) with the full label available
          on the edge's hover tooltip. */}
      {edges.map((e, ei) => {
        const a = pos.get(e.from);
        const b = pos.get(e.to);
        if (!a || !b || !e.label) return null;
        const active = !selectedId || (related.has(e.from) && related.has(e.to));
        if (!active) return null;
        const shown = truncate(e.label, present ? 28 : 22);
        const { x: midX, y: midY } = placeLabel(a, b, ei, shown);
        return (
          <text
            key={`label-${e.from}-${e.to}`}
            x={midX}
            y={midY - 1.2}
            textAnchor="middle"
            fill="#b7b1a5"
            fontSize={present ? 2.6 : 2.3}
            fontFamily="Outfit, sans-serif"
            stroke="#07070a"
            strokeWidth={0.85}
            paintOrder="stroke"
            strokeLinejoin="round"
            style={{ pointerEvents: "none" }}
          >
            {shown}
          </text>
        );
      })}
    </svg>
  );
}

/**
 * Wrap text into lines of at most ~n characters. Never drops lines — callers
 * that must bound height are responsible for making any cut explicit.
 * Words longer than n are hard-broken so a single token cannot overflow.
 */
export function wrapText(s: string, n: number): string[] {
  if (s.length <= n) return [s];
  const words = s
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((word) => {
      if (word.length <= n) return [word];
      const parts: string[] = [];
      for (let i = 0; i < word.length; i += n) parts.push(word.slice(i, i + n));
      return parts;
    });
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > n && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [s];
}

export function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}
