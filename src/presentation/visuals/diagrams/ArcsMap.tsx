import { ARC_CURTIS_ID, ARC_LANES, ARC_THRESHOLD_ID, laneOf } from "@/presentation/engine/arc-lanes";
import { ACCENT_HEX } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

export function ArcsMap({
  selectedId,
  onSelect,
  present,
  compact,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  present?: boolean;
  compact?: boolean;
}) {
  const laneSel = laneOf(selectedId);
  const all = !selectedId || laneSel === "core" || laneSel === "axis";

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-auto p-1 sm:gap-3 sm:p-2" onClick={() => onSelect(null)}>
      <div className="flex items-center gap-2 px-1" onClick={(e) => e.stopPropagation()}>
        <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">Media exists</span>
        <button
          type="button"
          onClick={() => onSelect(selectedId === ARC_THRESHOLD_ID ? null : ARC_THRESHOLD_ID)}
          className={cn(
            "min-h-11 rounded-full border px-4 font-mono text-xs tracking-[0.2em] uppercase",
            selectedId === ARC_THRESHOLD_ID ? "border-gold bg-gold/15 text-gold" : "border-gold/40 text-gold",
          )}
        >
          2022
        </button>
        <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">Lived experience</span>
      </div>

      <div className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-1" : "grid-cols-1")}>
        {ARC_LANES.map((lane) => {
          const color = ACCENT_HEX[lane.accent];
          const mine = typeof laneSel === "object" && laneSel?.heroId === lane.heroId;
          const dim = Boolean(selectedId && !all && !mine);
          return (
            <div
              key={lane.heroId}
              className={cn("rounded-2xl border bg-surface/80 px-3 py-3 transition-opacity sm:px-4 sm:py-4", dim && "opacity-30")}
              style={{ borderColor: mine ? color : "var(--color-border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="flex w-full items-baseline justify-between gap-3 text-left" onClick={() => onSelect(selectedId === lane.heroId ? null : lane.heroId)}>
                <span className="font-display text-lg tracking-wide" style={{ color }}>
                  {lane.tag}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{lane.category}</span>
              </button>
              <div className="mt-3 flex flex-wrap items-center gap-1">
                {lane.stages.map((st, i) => {
                  const on = selectedId === st.id || selectedId === lane.heroId;
                  return (
                    <div key={st.id} className="flex items-center gap-1">
                      {i > 0 && <span className="h-px w-4 shrink-0 bg-border sm:w-6" style={{ background: on ? color : undefined }} />}
                      <button
                        type="button"
                        onClick={() => onSelect(selectedId === st.id ? lane.heroId : st.id)}
                        className={cn(
                          "flex min-h-11 min-w-[4.6rem] flex-col items-center justify-center rounded-xl border px-2 py-1.5",
                          selectedId === st.id ? "bg-raised" : "bg-void/60",
                        )}
                        style={{ borderColor: selectedId === st.id ? color : "var(--color-border)" }}
                      >
                        <span className="font-mono text-[10px] tracking-wide text-fg">{st.label}</span>
                        {!present && !compact && <span className="mt-0.5 text-[10px] text-dim">{st.subtitle}</span>}
                      </button>
                    </div>
                  );
                })}
                <span className="mx-1 h-px w-5 shrink-0 bg-gold/50" />
                <span className="hidden max-w-[14rem] text-[11px] leading-snug text-muted sm:block">{lane.invariant}</span>
              </div>
              {(!present || mine) && (
                <p className="mt-2 text-sm text-fg/85">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-gold uppercase">Curtis · </span>
                  {lane.correspondence}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(selectedId === ARC_CURTIS_ID ? null : ARC_CURTIS_ID);
        }}
        className={cn(
          "flex min-h-12 items-center justify-between rounded-2xl border px-4 text-left",
          selectedId === ARC_CURTIS_ID ? "border-gold bg-gold/10" : "border-border bg-surface/80",
        )}
      >
        <span className="font-display text-lg tracking-wide text-gold">CURTIS</span>
        <span className="max-w-[70%] text-right text-sm text-muted">
          Distinct correspondences intersecting one lived system — not a fusion of costumes.
        </span>
      </button>
    </div>
  );
}
