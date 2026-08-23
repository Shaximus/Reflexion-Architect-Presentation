import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import { ChevronDown } from "lucide-react";
import { ACCENT_HEX } from "@/presentation/engine/types";
import type { Entity, SceneTable } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

const VERDICT: Record<string, string> = {
  VERIFIED: "#3dcc6d",
  FILED: "#e4c36b",
  TESTABLE: "#00d4ff",
  TESTIMONY: "#9d4edd",
  DOCUMENTED: "#4ecdc4",
};

// Track whether the table region continues below the fold, so the affordance is
// shown instead of rows being silently clipped mid-presentation (same contract
// as the sidebar rail in ui/Inspector.tsx).
function useScrollOverflow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [atEnd, setAtEnd] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setOverflowing(el.scrollHeight > el.clientHeight + 2);
      setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const mo = new MutationObserver(update);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      mo.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);
  return { ref, overflowing, atEnd };
}

// Bottom fade + "More" pill, following the sidebar rail convention added in
// the legibility pass (Inspector.tsx). Rendered as a sibling of the scroll
// region inside a relative wrapper so it stays pinned while rows scroll.
function MoreRowsAffordance({ target }: { target: RefObject<HTMLDivElement | null> }) {
  return (
    <>
      <div className="rail-more-fade" aria-hidden />
      <button
        type="button"
        onClick={() =>
          target.current?.scrollBy({
            top: target.current.clientHeight * 0.6,
            behavior: "smooth",
          })
        }
        className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-gold/50 bg-void/90 px-3 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-gold uppercase hover:border-gold hover:bg-gold/10"
        aria-label="Scroll for more table rows"
      >
        More
        <ChevronDown className="size-3" />
      </button>
    </>
  );
}

export function DataTable({
  table,
  entities,
  selectedId,
  onSelect,
  present,
}: {
  table: SceneTable;
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  present?: boolean;
}) {
  const byLabel = new Map(entities.map((e) => [e.label, e]));
  const { ref, overflowing, atEnd } = useScrollOverflow();
  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-center">
      <div className="relative flex max-h-full min-h-0 flex-col">
        <div
          ref={ref}
          className="min-h-0 overflow-auto rounded-2xl border border-border bg-surface/80 shadow-[0_18px_60px_rgb(0_0_0/0.45)]"
        >
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-raised shadow-[0_1px_0_var(--color-border-strong)]">
              <tr>
                {table.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 font-mono text-xs font-medium tracking-[0.18em] text-crimson uppercase sm:px-5 short:py-2.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => {
                const ent = byLabel.get(row[0] ?? "") ?? entities[i];
                const selected = ent && selectedId === ent.id;
                const dim = Boolean(selectedId && !selected);
                const verdict = row[row.length - 1] ?? "";
                const vhex = VERDICT[verdict];
                return (
                  <tr
                    key={ent?.id ?? i}
                    className={cn(
                      "cursor-pointer border-b border-border/70 transition-[opacity,background-color] duration-300 last:border-b-0 odd:bg-white/[0.02] hover:bg-raised/80",
                      dim && "opacity-30",
                    )}
                    onClick={() => ent && onSelect(selected ? null : ent.id)}
                    style={
                      selected
                        ? {
                            background: "color-mix(in oklab, var(--color-crimson) 10%, transparent)",
                            boxShadow: `inset 3px 0 0 ${ent ? ACCENT_HEX[ent.accent] : "var(--color-crimson)"}`,
                          }
                        : undefined
                    }
                  >
                    {row.map((cell, j) => {
                      const isVerdict = j === row.length - 1 && Boolean(vhex);
                      return (
                        <td
                          key={`${i}-${j}`}
                          className={cn(
                            "px-4 align-middle leading-relaxed sm:px-5 short:leading-snug",
                            present
                              ? "py-3.5 text-[1.0625rem] short:py-2 short:text-[0.9375rem]"
                              : "py-3 text-base short:py-2 short:text-sm",
                            j === 0 && "font-medium text-fg",
                            j !== 0 && !isVerdict && "text-fg/85",
                            isVerdict && "whitespace-nowrap",
                          )}
                        >
                          {isVerdict ? (
                            <span
                              className="verdict-badge"
                              style={{ "--verdict": vhex } as CSSProperties}
                            >
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {overflowing && !atEnd && <MoreRowsAffordance target={ref} />}
      </div>
    </div>
  );
}

export function MappingTable({
  entities,
  selectedId,
  onSelect,
  leftHeader,
  rightHeader,
  present,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  leftHeader: string;
  rightHeader: string;
  present?: boolean;
}) {
  const rows = entities.filter((e) => e.group === "row");
  const { ref, overflowing, atEnd } = useScrollOverflow();
  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-center">
      <div className="relative flex max-h-full min-h-0 flex-col">
        <div
          ref={ref}
          className="flex min-h-0 flex-col overflow-auto rounded-2xl border border-border bg-surface/80 shadow-[0_18px_60px_rgb(0_0_0/0.45)]"
        >
          <div className="sticky top-0 z-10 grid shrink-0 grid-cols-2 gap-3 bg-raised px-5 py-3.5 shadow-[0_1px_0_var(--color-border-strong)] short:py-2.5">
            <div className="font-mono text-xs font-medium tracking-[0.18em] text-crimson uppercase">
              {leftHeader}
            </div>
            <div className="font-mono text-xs font-medium tracking-[0.18em] text-teal uppercase">
              {rightHeader}
            </div>
          </div>
          {rows.map((row) => {
            const selected = selectedId === row.id;
            const dim = Boolean(selectedId && !selected);
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => onSelect(selected ? null : row.id)}
                className={cn(
                  "grid shrink-0 grid-cols-2 gap-3 border-b border-border/70 px-5 text-left transition-[opacity,background-color] duration-300 last:border-b-0 odd:bg-white/[0.02]",
                  present ? "py-3.5 short:py-2" : "py-3 short:py-2",
                  dim && "opacity-30",
                  selected && "bg-crimson/10",
                )}
                style={{
                  borderLeft: selected
                    ? `3px solid ${ACCENT_HEX[row.accent]}`
                    : "3px solid transparent",
                }}
              >
                <span
                  className={cn(
                    "leading-relaxed font-medium text-fg short:leading-snug",
                    present
                      ? "text-[1.0625rem] short:text-[0.9375rem]"
                      : "text-base short:text-sm",
                  )}
                >
                  {row.label}
                </span>
                <span
                  className={cn(
                    "leading-relaxed text-fg/85 short:leading-snug",
                    present
                      ? "text-[1.0625rem] short:text-[0.9375rem]"
                      : "text-base short:text-sm",
                  )}
                >
                  {row.summary[0]}
                </span>
              </button>
            );
          })}
        </div>
        {overflowing && !atEnd && <MoreRowsAffordance target={ref} />}
      </div>
    </div>
  );
}
