import { ACCENT_HEX, type Accent, type Entity } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

export function CardGrid({
  entities,
  selectedId,
  onSelect,
  present,
  columns,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  present?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const items = entities.filter((e) => e.group !== "stat" && e.group !== "row");
  const cols = columns ?? (items.length <= 3 ? (items.length === 1 ? 1 : 1) : 2);
  return (
    <div
      className={cn(
        "grid h-full min-h-0 gap-3 overflow-auto p-1 sm:gap-4 sm:p-2",
        cols === 3 && "sm:grid-cols-3",
        cols === 2 && "sm:grid-cols-2",
        cols === 1 && "grid-cols-1",
        items.length >= 4 && cols === 1 && "sm:grid-cols-2",
      )}
    >
      {items.map((c) => {
        const selected = selectedId === c.id;
        const dim = Boolean(selectedId && !selected);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(selected ? null : c.id)}
            className={cn(
              "flex min-h-[7.5rem] flex-col rounded-2xl border bg-surface/90 p-4 text-left transition-opacity sm:min-h-[9rem] sm:p-5",
              dim && "opacity-25",
            )}
            style={{ borderColor: selected ? ACCENT_HEX[c.accent] : "var(--color-border)" }}
          >
            <AccentKicker accent={c.accent}>{c.subtitle ?? c.role ?? c.accent}</AccentKicker>
            <h3 className="mt-1 font-display text-lg leading-tight tracking-wide text-fg sm:text-xl">{c.label}</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg/90 sm:text-base">
              {(present ? c.summary.slice(0, 2) : c.summary).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}

export function StatStrip({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const stats = entities.filter((e) => e.group === "stat");
  if (!stats.length) return null;
  return (
    <div className={cn("grid gap-2", stats.length >= 5 ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-3")}>
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
            <div className="font-mono text-base tracking-tight text-fg tabular-nums sm:text-lg">{s.label}</div>
            <div className="mt-1 text-sm text-muted">{s.subtitle}</div>
          </button>
        );
      })}
    </div>
  );
}

export function AccentKicker({ accent, children }: { accent: Accent; children: string }) {
  return (
    <span className="font-mono text-xs tracking-[0.18em] uppercase" style={{ color: ACCENT_HEX[accent] }}>
      {children}
    </span>
  );
}

export function StepStrip({
  steps,
  activeStep,
  onStep,
}: {
  steps: { id: string; label: string }[];
  activeStep: number;
  onStep: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onStep(i)}
          className={cn(
            "min-h-10 rounded-full border px-3 text-sm",
            i === activeStep ? "border-gold bg-gold/15 text-fg" : "border-border bg-surface/80 text-muted",
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
