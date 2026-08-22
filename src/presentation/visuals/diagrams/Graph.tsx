import { ACCENT_HEX, type Edge, type Entity, type LayoutNode } from "@/presentation/engine/types";

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
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        return (
          <g key={`${e.from}-${e.to}`} opacity={active ? 1 : 0.22}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={active ? "#e4c36b" : "#2a2a33"}
              strokeWidth={active ? 0.55 : 0.22}
            />
            {active && e.label && (
              <text
                x={midX}
                y={midY - 1.2}
                textAnchor="middle"
                fill="#9a958c"
                fontSize={present ? 2.6 : 2.3}
                fontFamily="Outfit, sans-serif"
              >
                {truncate(e.label, present ? 28 : 22)}
              </text>
            )}
          </g>
        );
      })}
      {entities.map((ent) => {
        const p = pos.get(ent.id);
        if (!p) return null;
        const active = !selectedId || related.has(ent.id);
        const selected = selectedId === ent.id;
        const hex = ACCENT_HEX[ent.accent];
        const nw = p.r ? p.r * 2.2 : w;
        const nh = p.r ? p.r * 1.4 : h;
        const lines = wrapText(ent.label, present ? 14 : 12);
        const sub = ent.subtitle && ent.subtitle.length < 18 ? ent.subtitle : null;
        const startY = sub ? -2.2 : -((lines.length - 1) * 3.4) / 2;
        return (
          <g
            key={ent.id}
            transform={`translate(${p.x} ${p.y})`}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={ent.label}
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
          >
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
              fill="#101014"
              stroke={hex}
              strokeWidth={selected ? 0.7 : 0.32}
            />
            {lines.map((ln, i) => (
              <text
                key={ln}
                y={startY + i * 3.5}
                textAnchor="middle"
                fill="#f3efe6"
                fontSize={present ? 2.7 : 2.4}
                fontFamily="Cinzel, serif"
                fontWeight={600}
              >
                {ln}
              </text>
            ))}
            {sub && (
              <text y={4.4} textAnchor="middle" fill="#9a958c" fontSize={2.2} fontFamily="Outfit, sans-serif">
                {truncate(sub, 20)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function wrapText(s: string, n: number): string[] {
  if (s.length <= n) return [s];
  const words = s.split(/\s+/);
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
  return lines.slice(0, 3);
}

export function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}
