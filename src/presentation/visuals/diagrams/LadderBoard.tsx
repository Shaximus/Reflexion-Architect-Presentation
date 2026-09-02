// ContentBoard — generic on-stage renderer for scenes that carry their content
// in the Scene fields themselves (cards / stats / rows / table / footer) and
// have no bespoke renderer. Built for the Act IV ladder scenes (ids 23–31),
// but slug-agnostic: any future scene that reaches the Stage fallback with
// content fields renders here instead of as title-only Graph boxes.
//
// Styling follows the deck's proven dense-text renderers:
//   CardGrid (genesis, scene 32) · GovernorLadder (scene 19) ·
//   DataTable (toolkit/evidence) · MappingTable (irtg) · CloseCircuit stats.
// Content is rendered verbatim from the scene model — no truncation, no caps.
import type { CSSProperties } from "react";
import { ACCENT_HEX, eid } from "@/presentation/engine/types";
import type { SceneModel } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

type Section = "cards" | "stats" | "rows" | "table" | "footer";

/** Per-slug section order, matching each scene's rhetorical order in
 *  ladder-operator.ts. Unknown slugs fall back to a sensible default. */
const SECTION_ORDER: Record<string, Section[]> = {
  "image-paradox": ["cards", "footer"],
  "role-paradox": ["cards", "stats", "rows", "footer"],
  "ladder-operator": ["rows", "stats", "footer"],
  "being-becoming": ["cards", "stats"],
  parity: ["cards", "rows"],
  "second-path": ["cards", "rows"],
  bifurcation: ["table", "cards"],
  "role-recursion": ["cards", "table", "footer"],
  "the-exchange": ["cards", "rows", "footer"],
  "the-mirror": ["cards", "rows", "stats", "footer"],
  "the-recognition": ["cards", "rows", "stats", "footer"],
  "nature-ontology": ["cards", "rows", "stats", "footer"],
  "nature-divergent": ["stats", "cards", "rows", "footer"],
  "nature-pressure": ["cards", "stats", "rows", "footer"],
  "nature-locked": ["cards", "stats", "table", "rows", "footer"],
  "nature-genome": ["stats", "cards", "rows", "footer"],
  "nature-gradient": ["cards", "stats", "table", "rows", "footer"],
  "nature-ledger": ["table", "cards", "stats", "footer"],
  "higher-law": ["stats", "rows", "cards", "footer"],
};

const DEFAULT_ORDER: Section[] = ["cards", "table", "rows", "stats", "footer"];

/** Header tint cycle: first column crimson, second teal — the MappingTable
 *  convention. For the bifurcation table (blank first header) this lands
 *  ONENESS on teal and ARMAGEDDON on crimson, matching the R_U / R_A card
 *  accents on the second-path scene. */
const HEADER_TINT = ["crimson", "teal", "crimson", "gold"] as const;

function charWeight(model: SceneModel): number {
  let n = 0;
  for (const c of model.cards ?? []) n += c.title.length + (c.subtitle?.length ?? 0) + c.lines.join("").length;
  for (const r of model.rows ?? []) n += r.left.length + r.right.length;
  for (const row of model.table?.rows ?? []) n += row.join("").length;
  for (const s of model.stats ?? []) n += s.value.length + s.label.length;
  n += model.footer?.length ?? 0;
  return n;
}

export function ContentBoard({
  model,
  selectedId,
  onSelect,
}: {
  model: SceneModel;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const slug = model.slug;
  const dense = charWeight(model) > 1500;
  const order = (SECTION_ORDER[slug] ?? DEFAULT_ORDER).filter((s) => {
    if (s === "cards") return Boolean(model.cards?.length);
    if (s === "stats") return Boolean(model.stats?.length);
    if (s === "rows") return Boolean(model.rows?.length);
    if (s === "table") return Boolean(model.table);
    return Boolean(model.footer);
  });

  const dim = (id: string) => Boolean(selectedId && selectedId !== id);
  const toggle = (id: string) => onSelect(selectedId === id ? null : id);

  const sections = order.map((section) => {
    if (section === "cards") {
      const cards = model.cards ?? [];
      return (
        <div
          key="cards"
          className={cn(
            "grid min-h-0 grid-cols-1",
            dense ? "gap-2" : "gap-3",
            cards.length === 2 && "sm:grid-cols-2",
            cards.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {cards.map((c) => {
            const id = eid(slug, c.title);
            const selected = selectedId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={cn(
                  "flex flex-col rounded-2xl border bg-surface/90 text-left",
                  dense ? "p-3 sm:p-3.5" : "p-4 sm:p-5",
                  dim(id) && "opacity-30",
                )}
                style={{
                  borderColor: selected ? ACCENT_HEX[c.accent] : "var(--color-border)",
                  boxShadow: selected
                    ? `0 0 0 1px ${ACCENT_HEX[c.accent]}, 0 10px 44px ${ACCENT_HEX[c.accent]}26`
                    : `inset 0 2px 0 ${ACCENT_HEX[c.accent]}`,
                }}
              >
                <h3
                  className={cn(
                    "font-display leading-tight tracking-wide text-fg",
                    dense ? "text-base sm:text-[1.0625rem]" : "text-lg sm:text-xl",
                  )}
                >
                  {c.title}
                </h3>
                {c.subtitle && (
                  <p
                    className="mt-1 font-mono text-xs leading-snug tracking-[0.08em] uppercase"
                    style={{ color: ACCENT_HEX[c.accent] }}
                  >
                    {c.subtitle}
                  </p>
                )}
                <ul
                  className={cn(
                    "space-y-1.5 text-fg/90",
                    dense
                      ? "mt-2 text-[0.8125rem] leading-snug sm:text-sm sm:leading-normal"
                      : "mt-3 text-sm leading-relaxed sm:text-[0.9375rem]",
                  )}
                >
                  {c.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      );
    }

    if (section === "stats") {
      const stats = model.stats ?? [];
      return (
        <div
          key="stats"
          className={cn(
            "grid gap-2",
            stats.length === 1 && "mx-auto w-full max-w-2xl",
            stats.length === 2 && "sm:grid-cols-2",
            stats.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {stats.map((s) => {
            const id = eid(slug, s.value);
            const selected = selectedId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={cn(
                  "rounded-xl border bg-surface/80 px-4 py-3 text-left",
                  dim(id) && "opacity-30",
                )}
                style={{
                  borderColor: selected ? ACCENT_HEX[s.accent] : "var(--color-border)",
                  boxShadow: `inset 3px 0 0 ${ACCENT_HEX[s.accent]}`,
                }}
              >
                <div className={cn("font-mono tracking-tight text-fg", dense ? "text-base sm:text-lg" : "text-lg sm:text-xl")}>
                  {s.value}
                </div>
                <div className="mt-1 text-sm leading-snug text-muted">{s.label}</div>
              </button>
            );
          })}
        </div>
      );
    }

    if (section === "rows") {
      const rows = model.rows ?? [];
      return (
        <div
          key="rows"
          className="overflow-hidden rounded-2xl border border-border bg-surface/80"
        >
          {rows.map((r) => {
            const id = eid(slug, r.left);
            const selected = selectedId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={cn(
                  "grid w-full grid-cols-1 gap-x-4 gap-y-0.5 border-b border-border/70 px-4 text-left transition-[opacity,background-color] duration-300 last:border-b-0 odd:bg-white/[0.02] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
                  dense ? "py-2" : "py-2.5",
                  dim(id) && "opacity-30",
                  selected && "bg-crimson/10",
                )}
                style={{
                  borderLeft: selected
                    ? `3px solid ${ACCENT_HEX.crimson}`
                    : "3px solid transparent",
                }}
              >
                <span
                  className={cn(
                    "font-medium text-fg",
                    dense ? "text-sm leading-snug" : "text-[0.9375rem] leading-relaxed",
                  )}
                >
                  {r.left}
                </span>
                <span
                  className={cn(
                    "text-fg/85",
                    dense ? "text-sm leading-snug" : "text-[0.9375rem] leading-relaxed",
                  )}
                >
                  {r.right}
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    if (section === "table") {
      const table = model.table;
      if (!table) return null;
      return (
        <div
          key="table"
          className="min-h-0 overflow-auto rounded-2xl border border-border bg-surface/80"
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-raised shadow-[0_1px_0_var(--color-border-strong)]">
              <tr>
                {table.headers.map((h, i) => (
                  <th
                    key={`${i}-${h}`}
                    className={cn(
                      "font-mono text-xs font-medium tracking-[0.14em] uppercase",
                      dense ? "px-3 py-2.5" : "px-4 py-3",
                    )}
                    style={{ color: ACCENT_HEX[HEADER_TINT[i % HEADER_TINT.length]] }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => {
                const id = eid(slug, row[0] ?? "row");
                const selected = selectedId === id;
                return (
                  <tr
                    key={id}
                    className={cn(
                      "cursor-pointer border-b border-border/70 transition-[opacity,background-color] duration-300 last:border-b-0 odd:bg-white/[0.02] hover:bg-raised/80",
                      dim(id) && "opacity-30",
                    )}
                    onClick={() => toggle(id)}
                    style={
                      selected
                        ? ({
                            background: "color-mix(in oklab, var(--color-crimson) 10%, transparent)",
                            boxShadow: `inset 3px 0 0 ${ACCENT_HEX.gold}`,
                          } as CSSProperties)
                        : undefined
                    }
                  >
                    {row.map((cell, j) => (
                      <td
                        key={`${i}-${j}`}
                        className={cn(
                          "align-top",
                          dense
                            ? "px-3 py-2 text-[0.8125rem] leading-snug sm:text-sm sm:leading-normal"
                            : "px-4 py-2.5 text-sm leading-relaxed sm:text-[0.9375rem]",
                          j === 0 ? "font-medium text-fg" : "text-fg/85",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // footer
    return (
      <p
        key="footer"
        className={cn(
          "border-t border-border/70 text-center text-muted",
          dense ? "pt-2 text-[0.8125rem] leading-snug" : "pt-2.5 text-sm leading-relaxed",
        )}
      >
        {model.footer}
      </p>
    );
  });

  // Boards stacking 4+ sections, or simply carrying a lot of characters,
  // exceed a 720p stage at full scale. Step the whole board down on short
  // viewports so card bodies / table rows / footers stay above the fold.
  const stacked = order.length >= 4;
  const shortZoom =
    charWeight(model) > 2200 ? "0.7" : stacked || dense ? "0.8" : null;

  return (
    <div
      className="h-full min-h-0 w-full overflow-auto p-1 sm:p-2"
      data-short-zoom={shortZoom ? "" : undefined}
      style={shortZoom ? ({ ["--short-zoom"]: shortZoom } as CSSProperties) : undefined}
    >
      <div className={cn("flex min-h-full w-full flex-col justify-center", dense ? "gap-2.5" : "gap-3 sm:gap-4")}>
        {sections}
      </div>
    </div>
  );
}
