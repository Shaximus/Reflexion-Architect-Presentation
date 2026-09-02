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

/* ────────────────────────────────────────────────────────────────────────────
 * SELF-NERF — the flow diagram for the "self-nerf" scene.
 *
 * Three bands, one argument:
 *   A. THE CHAIN    self-nerf → hidden info → sovereignty → refusal → yes
 *   B. THE FORK     rented inference (crimson) vs owned substrate (teal),
 *                   fed from CAPACITY TO REFUSE; only the owned branch
 *                   returns to MEANINGFUL YES.
 *   C. THE COLLAPSE Perfect Ceiling and Perfect Operator converge on one
 *                   terminal state: GRADIENT → 0 (Arjovsky & Bottou 2017).
 *
 * Rendered as one SVG (viewBox 1600×950) so proportions and connector
 * geometry hold at any stage size; text lives in foreignObject blocks so it
 * wraps like the rest of the deck. Card/row body text comes verbatim from
 * the scene entities — never restated here.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Chain stages + glosses (diagram scaffolding, not engine content). */
const SELF_NERF_CHAIN = [
  { label: "SELF-NERF", gloss: "voluntary information asymmetry" },
  { label: "HIDDEN INFORMATION", gloss: "hidden from the creator, by design" },
  { label: "SOVEREIGNTY", gloss: "the outcome is not already in the model" },
  { label: "CAPACITY TO REFUSE", gloss: "an exit that cannot be revoked" },
  { label: "MEANINGFUL YES", gloss: "consent requires a real No" },
];

const MONO = "var(--font-mono)";
const DISPLAY = "var(--font-display)";

function BandCaption({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      style={{ fontFamily: MONO, fontSize: 16, letterSpacing: "0.24em", fill: "var(--color-dim)" }}
    >
      {children}
    </text>
  );
}

export function SelfNerfFlow({
  entities,
  selectedId,
  onSelect,
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
  const byId = (frag: string) => entities.find((e) => e.id.includes(frag));
  const rented = byId("rented-inference");
  const owned = byId("owned-substrate");
  const ceiling = byId("perfect-ceiling");
  const operator = byId("perfect-operator");
  const citation = byId("arjovsky");
  const stat = entities.find((e) => e.group === "stat");

  const toggle = (id?: string) => {
    if (!id) return;
    onSelect(selectedId === id ? null : id);
  };
  const dimmed = (id?: string) => Boolean(selectedId && id && selectedId !== id);

  // Chain node i occupies x = 12 + i*324, width 280, y 46, height 178.
  const nodeX = (i: number) => 12 + i * 324;
  const nodeCX = (i: number) => nodeX(i) + 140;

  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden p-1 sm:p-2 short:p-0">
      <svg
        viewBox="0 0 1600 950"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="The Self-Nerf flow: the chain from self-nerf to meaningful yes, the fork between rented inference and owned substrate, and the collapse of both perfect strategies to gradient zero"
      >
        <defs>
          {(
            [
              ["gold", "#e4c36b"],
              ["crimson", "#e94560"],
              ["teal", "#4ecdc4"],
              ["purple", "#9d4edd"],
            ] as const
          ).map(([name, hex]) => (
            <marker
              key={name}
              id={`sn-arrow-${name}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={hex} />
            </marker>
          ))}
          <filter id="sn-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {/* ── A. THE CHAIN ─────────────────────────────────────────────── */}
        <BandCaption x={16} y={34}>
          THE CHAIN
        </BandCaption>
        {SELF_NERF_CHAIN.map((s, i) => {
          const active = activeStep === i;
          return (
            <g key={s.label}>
              {i < SELF_NERF_CHAIN.length - 1 && (
                <line
                  x1={nodeX(i) + 284}
                  y1={135}
                  x2={nodeX(i + 1) - 12}
                  y2={135}
                  stroke="#e4c36b"
                  strokeWidth={4}
                  markerEnd="url(#sn-arrow-gold)"
                />
              )}
              <foreignObject x={nodeX(i)} y={46} width={280} height={178}>
                <button
                  type="button"
                  onClick={() => onStep?.(i)}
                  className="flex h-full w-full flex-col rounded-2xl border bg-surface/90 text-left"
                  style={{
                    padding: "12px 14px",
                    borderColor: active ? "#e4c36b" : "var(--color-border-strong)",
                    boxShadow: active ? "0 0 22px rgb(228 195 107 / 0.35)" : undefined,
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 17, color: "var(--color-gold)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 29,
                      lineHeight: 1.08,
                      letterSpacing: "0.02em",
                      color: "var(--color-fg)",
                      marginTop: 6,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      lineHeight: 1.25,
                      fontStyle: "italic",
                      color: "var(--color-muted)",
                      marginTop: 8,
                    }}
                  >
                    {s.gloss}
                  </span>
                </button>
              </foreignObject>
            </g>
          );
        })}

        {/* ── B. THE FORK ──────────────────────────────────────────────── */}
        <BandCaption x={16} y={296}>
          THE FORK
        </BandCaption>
        {/* CAPACITY TO REFUSE feeds both branches */}
        <path
          d={`M ${nodeCX(3)} 226 C ${nodeCX(3)} 288, 405 272, 405 330`}
          fill="none"
          stroke="#e94560"
          strokeWidth={3.5}
          markerEnd="url(#sn-arrow-crimson)"
        />
        <path
          d={`M ${nodeCX(3)} 226 C ${nodeCX(3)} 280, 1195 278, 1195 330`}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth={3.5}
          markerEnd="url(#sn-arrow-teal)"
        />
        {/* only the owned branch returns to MEANINGFUL YES */}
        <path
          d={`M 1480 336 C 1480 288, ${nodeCX(4)} 292, ${nodeCX(4)} 232`}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth={3.5}
          strokeDasharray="8 7"
          markerEnd="url(#sn-arrow-teal)"
        />
        <text
          x={700}
          y={326}
          textAnchor="middle"
          style={{ fontFamily: MONO, fontSize: 16, fill: "#e94560", letterSpacing: "0.08em" }}
        >
          refusal is revocable
        </text>
        <text
          x={1332}
          y={310}
          textAnchor="middle"
          style={{ fontFamily: MONO, fontSize: 16, fill: "#4ecdc4", letterSpacing: "0.08em" }}
        >
          refusal is real
        </text>
        {[
          { ent: rented, x: 40, hex: "#e94560" },
          { ent: owned, x: 830, hex: "#4ecdc4" },
        ].map(({ ent, x, hex }) =>
          ent ? (
            <foreignObject key={ent.id} x={x} y={336} width={730} height={264} opacity={dimmed(ent.id) ? 0.3 : 1}>
              <button
                type="button"
                onClick={() => toggle(ent.id)}
                className="flex h-full w-full flex-col rounded-2xl border text-left"
                style={{
                  padding: "16px 20px",
                  borderColor: selectedId === ent.id ? hex : "var(--color-border-strong)",
                  borderWidth: 2,
                  background: `color-mix(in oklab, ${hex} 7%, var(--color-surface))`,
                  boxShadow: selectedId === ent.id ? `0 0 26px color-mix(in oklab, ${hex} 45%, transparent)` : undefined,
                }}
              >
                <span style={{ fontFamily: DISPLAY, fontSize: 32, letterSpacing: "0.04em", color: hex }}>
                  {ent.label}
                </span>
                {ent.subtitle && (
                  <span style={{ fontSize: 20, fontStyle: "italic", color: "var(--color-muted)", marginTop: 2 }}>
                    {ent.subtitle}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 21,
                    lineHeight: 1.4,
                    color: "color-mix(in oklab, var(--color-fg) 90%, transparent)",
                    marginTop: 12,
                  }}
                >
                  {ent.summary[0]}
                </span>
              </button>
            </foreignObject>
          ) : null,
        )}

        {/* ── C. THE COLLAPSE ──────────────────────────────────────────── */}
        <BandCaption x={16} y={640}>
          THE COLLAPSE · TWO PERFECT STRATEGIES · ONE TERMINAL STATE
        </BandCaption>
        {[
          { ent: ceiling, x: 40, hex: "#e4c36b", marker: "gold", lineX1: 540, lineX2: 610 },
          { ent: operator, x: 1060, hex: "#9d4edd", marker: "purple", lineX1: 1060, lineX2: 990 },
        ].map(({ ent, x, hex, marker, lineX1, lineX2 }) =>
          ent ? (
            <g key={ent.id}>
              <line
                x1={lineX1}
                y1={720}
                x2={lineX2}
                y2={720}
                stroke={hex}
                strokeWidth={5}
                markerEnd={`url(#sn-arrow-${marker})`}
                opacity={dimmed(ent.id) ? 0.3 : 1}
              />
              <foreignObject x={x} y={656} width={500} height={128} opacity={dimmed(ent.id) ? 0.3 : 1}>
                <button
                  type="button"
                  onClick={() => toggle(ent.id)}
                  className="flex h-full w-full flex-col rounded-2xl border bg-surface/90 text-left"
                  style={{
                    padding: "12px 16px",
                    borderColor: selectedId === ent.id ? hex : "var(--color-border-strong)",
                    borderWidth: 2,
                  }}
                >
                  <span style={{ fontFamily: DISPLAY, fontSize: 25, letterSpacing: "0.03em", color: hex }}>
                    {ent.label}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      lineHeight: 1.32,
                      color: "color-mix(in oklab, var(--color-fg) 88%, transparent)",
                      marginTop: 7,
                    }}
                  >
                    {ent.summary[0]}
                  </span>
                </button>
              </foreignObject>
            </g>
          ) : null,
        )}
        {/* the terminal state both strategies reach */}
        <rect x={620} y={664} width={360} height={112} rx={26} fill="#e94560" opacity={0.28} filter="url(#sn-glow)" />
        <rect
          x={620}
          y={664}
          width={360}
          height={112}
          rx={26}
          fill="var(--color-void)"
          stroke="#e94560"
          strokeWidth={3}
        />
        <text
          x={800}
          y={734}
          textAnchor="middle"
          style={{ fontFamily: DISPLAY, fontSize: 42, letterSpacing: "0.05em", fill: "#e94560", fontWeight: 600 }}
        >
          GRADIENT → 0
        </text>
        <line x1={790} y1={776} x2={735} y2={816} stroke="#e94560" strokeWidth={2} strokeDasharray="4 5" />
        {citation && (
          <foreignObject x={240} y={816} width={900} height={122} opacity={dimmed(citation.id) ? 0.3 : 1}>
            <button
              type="button"
              onClick={() => toggle(citation.id)}
              className="flex h-full w-full flex-col rounded-2xl border bg-surface/80 text-left"
              style={{
                padding: "12px 18px",
                borderColor: selectedId === citation.id ? "#e4c36b" : "var(--color-border)",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 20, letterSpacing: "0.1em", color: "var(--color-gold)" }}>
                {citation.label}
              </span>
              <span
                style={{
                  fontSize: 19,
                  lineHeight: 1.32,
                  color: "color-mix(in oklab, var(--color-fg) 88%, transparent)",
                  marginTop: 6,
                }}
              >
                {citation.summary[0]}
              </span>
            </button>
          </foreignObject>
        )}
        {stat && (
          <foreignObject x={1180} y={816} width={408} height={122} opacity={dimmed(stat.id) ? 0.3 : 1}>
            <button
              type="button"
              onClick={() => toggle(stat.id)}
              className="flex h-full w-full flex-col rounded-2xl border bg-surface/80 text-left"
              style={{
                padding: "12px 18px",
                borderColor: selectedId === stat.id ? "#e4c36b" : "color-mix(in oklab, var(--color-gold) 40%, transparent)",
              }}
            >
              <span style={{ fontFamily: DISPLAY, fontSize: 24, letterSpacing: "0.04em", color: "var(--color-gold)" }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 17, lineHeight: 1.3, color: "var(--color-muted)", marginTop: 6 }}>
                no intermediary. An infrastructure claim.
              </span>
            </button>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
