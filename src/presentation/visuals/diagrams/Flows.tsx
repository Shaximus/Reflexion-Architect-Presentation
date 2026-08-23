import { ACCENT_HEX, type Entity, type Step } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";
import { StepStrip } from "./Cards";

export function SequenceFlow({
  entities,
  selectedId,
  onSelect,
  steps,
  activeStep,
  onStep,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  steps?: Step[];
  activeStep: number;
  onStep?: (i: number) => void;
}) {
  const pipe = entities.filter((e) => e.group !== "stat");
  const nodes = steps?.length
    ? steps.map((s, i) => {
        const match =
          entities.find(
            (e) =>
              e.id.includes(s.id) ||
              e.label.toLowerCase().includes(s.label.toLowerCase().split(" ")[0] ?? ""),
          ) ?? pipe[i];
        return {
          id: match?.id,
          label: s.label,
          sub: match?.subtitle,
          accent: match?.accent ?? ("gold" as const),
        };
      })
    : pipe.map((e) => ({ id: e.id, label: e.label, sub: e.subtitle, accent: e.accent }));
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      <div className="flex min-h-0 flex-1 items-stretch gap-2 overflow-x-auto">
        {nodes.map((n, i) => {
          const selected = selectedId === n.id || activeStep === i;
          const dim = Boolean(selectedId && n.id !== selectedId && activeStep !== i);
          return (
            <div key={`${n.label}-${i}`} className="flex min-w-[7.5rem] flex-1 items-stretch gap-2">
              <button
                type="button"
                onClick={() => {
                  if (n.id) onSelect(n.id);
                  onStep?.(i);
                }}
                className={cn(
                  "flex w-full flex-col justify-center rounded-2xl border bg-surface/90 px-3 py-4 text-left",
                  dim && "opacity-30",
                )}
                style={{
                  borderColor: selected
                    ? ACCENT_HEX[n.accent as keyof typeof ACCENT_HEX]
                    : "var(--color-border)",
                }}
              >
                <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-display text-base tracking-wide sm:text-lg">
                  {n.label}
                </div>
                {n.sub && <div className="mt-1 text-sm text-muted">{n.sub}</div>}
              </button>
              {i < nodes.length - 1 && (
                <div className="hidden w-4 shrink-0 items-center text-gold sm:flex" aria-hidden>
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
      {steps && steps.length > 0 && (
        <StepStrip steps={steps} activeStep={activeStep} onStep={(i) => onStep?.(i)} />
      )}
    </div>
  );
}

export function EventPath({
  entities,
  selectedId,
  onSelect,
  steps,
  activeStep,
  onStep,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  steps?: Step[];
  activeStep: number;
  onStep?: (i: number) => void;
}) {
  const phases = entities.filter((e) => e.group !== "stat");
  const stats = entities.filter((e) => e.group === "stat");
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
        {phases.map((p, i) => {
          const selected = selectedId === p.id || activeStep === i;
          const dim = Boolean(selectedId && !selected);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onSelect(selected && selectedId === p.id ? null : p.id);
                onStep?.(i);
              }}
              className={cn(
                "flex flex-col rounded-2xl border bg-surface/90 p-4 text-left",
                dim && "opacity-30",
              )}
              style={{ borderColor: selected ? ACCENT_HEX[p.accent] : "var(--color-border)" }}
            >
              <div className="font-mono text-xs tracking-widest text-gold uppercase">{p.label}</div>
              <p className="mt-3 text-sm leading-relaxed text-fg/90 sm:text-base">{p.summary[0]}</p>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
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
              <div className="font-mono text-sm tracking-wide text-fg">{s.label}</div>
              <div className="mt-1 text-sm text-muted">{s.subtitle}</div>
            </button>
          );
        })}
      </div>
      {steps && <StepStrip steps={steps} activeStep={activeStep} onStep={(i) => onStep?.(i)} />}
    </div>
  );
}

export function CascadeStack({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const order = ["strategic", "tactical", "deterministic", "doctrine"];
  const items = order
    .map((k) => entities.find((e) => e.id.includes(k)))
    .filter(Boolean) as Entity[];
  const list = items.length ? items : entities;
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-3 p-2">
      {list.map((e, i) => {
        const selected = selectedId === e.id;
        const dim = Boolean(selectedId && !selected);
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => onSelect(selected ? null : e.id)}
            className={cn(
              "flex flex-col rounded-2xl border bg-surface/90 px-5 py-4 text-left",
              dim && "opacity-30",
            )}
            style={{
              borderColor: selected ? ACCENT_HEX[e.accent] : "var(--color-border)",
              marginInline: `${i * 4}%`,
            }}
          >
            <div className="font-mono text-xs tracking-[0.18em] text-gold uppercase">
              {i === 0 ? "reason here" : i === list.length - 1 ? "packet" : "then execute lower"}
            </div>
            <div className="mt-1 font-display text-xl tracking-wide">{e.label}</div>
            <p className="mt-2 text-base leading-relaxed text-fg/85">{e.summary[0]}</p>
          </button>
        );
      })}
    </div>
  );
}

export function EarLoop({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const items = entities.filter((e) => e.group !== "stat");
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-3 p-2">
      <p className="text-center font-mono text-xs tracking-[0.2em] text-gold uppercase">
        closed loop — each node is a teammate
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((e, i) => {
          const selected = selectedId === e.id;
          const dim = Boolean(selectedId && !selected);
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => onSelect(selected ? null : e.id)}
              className={cn(
                "flex flex-col rounded-2xl border bg-surface/90 p-5 text-left",
                dim && "opacity-30",
              )}
              style={{ borderColor: selected ? ACCENT_HEX[e.accent] : "var(--color-border)" }}
            >
              <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 font-display text-lg tracking-wide">{e.label}</div>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg/90 sm:text-base">
                {e.summary.map((line) => (
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

export function GovernorLadder({
  entities,
  selectedId,
  onSelect,
  steps,
  activeStep,
  onStep,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  steps?: Step[];
  activeStep: number;
  onStep?: (i: number) => void;
}) {
  const rungs = steps?.length
    ? steps
    : [
        { id: "normal", label: "Normal engagement" },
        { id: "chase", label: "Repetitive chase" },
        { id: "leash", label: "Leash exploit" },
        { id: "none", label: "No valuable interaction" },
      ];
  const cards = entities.filter((e) => e.group !== "stat");
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {rungs.map((r, i) => {
          const selected = activeStep === i;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onStep?.(i)}
              className="rounded-2xl border px-3 py-4 text-left"
              style={{
                borderColor: selected ? "#e94560" : "var(--color-border)",
                opacity: 1 - i * 0.08,
              }}
            >
              <div className="font-mono text-xs text-gold">STATE {i + 1}</div>
              <div className="mt-1 font-display text-base sm:text-lg">{r.label}</div>
              <p className="mt-2 text-sm text-muted">
                {i === 0
                  ? "full tactical reasoning"
                  : i === 1
                    ? "cached plan + cheap nav"
                    : i === 2
                      ? "bounded anti-kite"
                      : "disengage · fortify"}
              </p>
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
              <div className="font-display text-lg tracking-wide">{c.label}</div>
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

export function AurisPipe({
  entities,
  selectedId,
  onSelect,
  steps,
  activeStep,
  onStep,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  steps?: Step[];
  activeStep: number;
  onStep?: (i: number) => void;
}) {
  const pipe = entities.filter((e) => e.group !== "stat");
  const stats = entities.filter((e) => e.group === "stat");
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
        {pipe.map((p, i) => {
          const selected = selectedId === p.id || activeStep === i;
          const dim = Boolean(selectedId && !selected);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onSelect(selected && selectedId === p.id ? null : p.id);
                onStep?.(i);
              }}
              className={cn(
                "flex flex-col rounded-2xl border bg-surface/90 p-3 text-left",
                dim && "opacity-30",
              )}
              style={{ borderColor: selected ? ACCENT_HEX[p.accent] : "var(--color-border)" }}
            >
              <div className="font-mono text-xs text-gold">{p.label}</div>
              {p.subtitle && <div className="mt-1 text-sm text-muted">{p.subtitle}</div>}
              <p className="mt-2 text-sm leading-relaxed text-fg/85">{p.summary[0]}</p>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
              <div className="font-mono text-sm text-fg">{s.label}</div>
              <div className="mt-1 text-sm text-muted">{s.subtitle}</div>
            </button>
          );
        })}
      </div>
      {steps && <StepStrip steps={steps} activeStep={activeStep} onStep={(i) => onStep?.(i)} />}
    </div>
  );
}

export function GateFlow({
  entities,
  selectedId,
  onSelect,
  steps,
  activeStep,
  onStep,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  steps?: Step[];
  activeStep: number;
  onStep?: (i: number) => void;
}) {
  const cards = entities.filter((e) => e.group !== "stat");
  const map = [0, 0, 1, 2, 2];
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      {steps && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {steps.map((s, i) => {
            const selected = activeStep === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onStep?.(i);
                  const card = cards[map[i] ?? 0];
                  if (card) onSelect(card.id);
                }}
                className="rounded-2xl border bg-surface/90 px-3 py-4 text-left"
                style={{ borderColor: selected ? "#e4c36b" : "var(--color-border)" }}
              >
                <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-display text-base sm:text-lg">{s.label}</div>
              </button>
            );
          })}
        </div>
      )}
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
              <div className="font-display text-lg tracking-wide">{c.label}</div>
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
