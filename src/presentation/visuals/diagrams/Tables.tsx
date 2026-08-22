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
  return (
    <div className="flex h-full min-h-0 flex-col overflow-auto rounded-2xl border border-border bg-surface/80">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 bg-raised">
          <tr className="border-b border-crimson/40">
            {table.headers.map((h) => (
              <th key={h} className="px-3 py-3 font-mono text-xs tracking-[0.16em] text-crimson uppercase sm:px-4">
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
                className={cn("cursor-pointer border-b border-border/70 hover:bg-raised/80", dim && "opacity-25")}
                onClick={() => ent && onSelect(selected ? null : ent.id)}
                style={selected ? { background: "color-mix(in oklab, var(--color-crimson) 10%, transparent)" } : undefined}
              >
                {row.map((cell, j) => (
                  <td
                    key={`${i}-${j}`}
                    className={cn(
                      "px-3 py-2.5 align-top leading-relaxed sm:px-4",
                      present ? "text-base" : "text-sm sm:text-base",
                      j === 0 && "font-medium text-fg",
                      j !== 0 && "text-fg/85",
                    )}
                    style={j === row.length - 1 && vhex ? { color: vhex } : undefined}
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
  return (
    <div className="flex h-full min-h-0 flex-col overflow-auto rounded-2xl border border-border bg-surface/80">
      <div className="sticky top-0 grid grid-cols-2 border-b border-border bg-raised px-4 py-3">
        <div className="font-display text-sm tracking-wide text-crimson sm:text-base">{leftHeader}</div>
        <div className="font-display text-sm tracking-wide text-teal sm:text-base">{rightHeader}</div>
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
              "grid grid-cols-2 gap-3 border-b border-border/70 px-4 py-3 text-left",
              dim && "opacity-25",
              selected && "bg-crimson/10",
            )}
            style={{ borderLeft: selected ? `3px solid ${ACCENT_HEX[row.accent]}` : "3px solid transparent" }}
          >
            <span className={cn("leading-relaxed text-fg", present ? "text-base" : "text-sm sm:text-base")}>{row.label}</span>
            <span className={cn("leading-relaxed text-fg/85", present ? "text-base" : "text-sm sm:text-base")}>
              {row.summary[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
