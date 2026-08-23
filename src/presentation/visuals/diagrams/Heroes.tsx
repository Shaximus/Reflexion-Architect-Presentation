import { ACCENT_HEX, type Entity } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

function truncatePlanet(label: string) {
  const name = label.replace(/^Earthlike \d+ — /, "");
  return name.length > 16 ? `${name.slice(0, 15)}…` : name;
}

export function TitleHero({
  quote,
  attribution,
  footer,
}: {
  quote?: string;
  attribution?: string;
  footer?: string;
}) {
  return (
    <div className="relative flex h-full min-h-[18rem] items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle
          cx="50"
          cy="48"
          r="44"
          fill="none"
          stroke="#e4c36b"
          strokeWidth="0.35"
          opacity="0.55"
        />
        <circle
          cx="50"
          cy="48"
          r="32"
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="0.32"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="48"
          r="20"
          fill="none"
          stroke="#e94560"
          strokeWidth="0.45"
          opacity="0.8"
        />
        <circle cx="50" cy="48" r="1.8" fill="#e94560" opacity="0.45" />
      </svg>
      <div className="relative z-10 max-w-3xl px-4 text-center">
        {quote && (
          <p className="font-display text-2xl leading-snug text-crimson italic sm:text-4xl lg:text-5xl">
            “{quote}”
          </p>
        )}
        {attribution && <p className="mt-4 text-base text-muted sm:text-lg">{attribution}</p>}
        {footer && (
          <p className="mt-6 font-mono text-xs tracking-[0.22em] text-gold uppercase">{footer}</p>
        )}
      </div>
    </div>
  );
}

export function PlanetRing({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const worlds = entities.filter((e) => e.group !== "stat" && !e.id.includes("solar-system"));
  const core = entities.find((e) => e.id.includes("solar-system"));
  const n = worlds.length || 1;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      <circle cx="50" cy="48" r="22" fill="none" stroke="#32323e" strokeWidth="0.3" />
      <g
        className={core ? "cursor-pointer" : undefined}
        onClick={(ev) => {
          ev.stopPropagation();
          if (core) onSelect(selectedId === core.id ? null : core.id);
        }}
      >
        <circle cx="50" cy="48" r={selectedId === core?.id ? 6 : 4.4} fill="#e4c36b" />
        <text
          x="50"
          y="49.2"
          textAnchor="middle"
          fill="#07070a"
          fontSize="2.1"
          fontFamily="Cinzel, serif"
        >
          NEXT
        </text>
      </g>
      {worlds.map((e, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = 50 + Math.cos(ang) * 32;
        const y = 48 + Math.sin(ang) * 32;
        const selected = selectedId === e.id;
        const dim = Boolean(selectedId && !selected);
        const hex = ACCENT_HEX[e.accent];
        return (
          <g
            key={e.id}
            className="cursor-pointer"
            opacity={dim ? 0.18 : 1}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect(selected ? null : e.id);
            }}
          >
            <line
              x1="50"
              y1="48"
              x2={x}
              y2={y}
              stroke={hex}
              strokeWidth={selected ? 0.55 : 0.22}
              opacity={0.7}
            />
            <circle
              cx={x}
              cy={y}
              r={selected ? 7.4 : 6.4}
              fill="#111118"
              stroke={hex}
              strokeWidth={selected ? 0.7 : 0.35}
            />
            <text
              x={x}
              y={y + (y < 48 ? -9.2 : 11.2)}
              textAnchor="middle"
              fill="#f5f1e8"
              fontSize="2.4"
              fontFamily="Cinzel, serif"
            >
              {truncatePlanet(e.label)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SundayBoard({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const suns = entities.filter((e) => e.group === "stat");
  const phases = entities.filter((e) => e.group !== "stat");
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-auto p-1 sm:p-2">
      <div className="grid grid-cols-3 gap-3">
        {suns.map((s) => {
          const selected = selectedId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(selected ? null : s.id)}
              className="rounded-full border px-3 py-6 text-center sm:py-8"
              style={{
                borderColor: selected ? ACCENT_HEX[s.accent] : "var(--color-border)",
                background: `${ACCENT_HEX[s.accent]}14`,
              }}
            >
              <div className="font-display text-lg tracking-wide text-fg sm:text-2xl">
                {s.label}
              </div>
              <div className="mt-2 text-sm text-muted">{s.subtitle}</div>
            </button>
          );
        })}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
        {phases.map((p, i) => {
          const selected = selectedId === p.id;
          const dim = Boolean(selectedId && !selected);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(selected ? null : p.id)}
              className={cn(
                "flex flex-col rounded-2xl border bg-surface/85 p-4 text-left",
                dim && "opacity-30",
              )}
              style={{ borderColor: selected ? ACCENT_HEX[p.accent] : "var(--color-border)" }}
            >
              <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 font-display text-base tracking-wide sm:text-lg">{p.label}</div>
              {p.subtitle && <div className="mt-1 text-sm text-muted">{p.subtitle}</div>}
              <p className="mt-2 text-sm leading-relaxed text-fg/85">{p.summary[0]}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CloseCircuit({
  entities,
  selectedId,
  onSelect,
  quote,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  quote?: string;
}) {
  const stats = entities.filter((e) => e.group === "stat");
  const cards = entities.filter((e) => e.group !== "stat");
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-auto p-1 sm:p-2">
      {quote && (
        <p className="text-center font-display text-xl text-crimson italic sm:text-3xl">
          “{quote}”
        </p>
      )}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => {
          const selected = selectedId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(selected ? null : s.id)}
              className="rounded-xl border bg-surface/80 px-3 py-3 text-left"
              style={{ borderColor: selected ? ACCENT_HEX[s.accent] : "var(--color-border)" }}
            >
              <div className="font-mono text-lg text-fg sm:text-2xl">{s.label}</div>
              <div className="mt-1 text-sm text-muted">{s.subtitle}</div>
            </button>
          );
        })}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((c) => {
          const selected = selectedId === c.id;
          const dim = Boolean(selectedId && !selected);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(selected ? null : c.id)}
              className={cn(
                "flex flex-col rounded-2xl border bg-surface/90 p-4 text-left",
                dim && "opacity-30",
              )}
              style={{ borderColor: selected ? ACCENT_HEX[c.accent] : "var(--color-border)" }}
            >
              <h3 className="font-display text-lg tracking-wide">{c.label}</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg/90 sm:text-base">
                {c.summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
