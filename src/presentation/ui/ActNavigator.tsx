import { ACTS, SCENES } from "@/presentation/engine/content";
import { useDeck } from "@/presentation/engine/store";
import { cn } from "@/lib/utils";

export function ActNavigator() {
  const open = useDeck((s) => s.indexOpen);
  const toggle = useDeck((s) => s.toggleIndex);
  const index = useDeck((s) => s.index);
  const setIndex = useDeck((s) => s.setIndex);
  if (!open) return null;

  return (
    <div data-hud className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-void/85 p-4 backdrop-blur-md">
      <div
        className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 sm:p-6"
        style={{ touchAction: "pan-y" }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">Knowledge constellation</p>
            <h2 className="mt-1 font-display text-2xl tracking-wide">Five acts. Twenty-five rooms.</h2>
          </div>
          <button type="button" onClick={toggle} className="min-h-11 text-sm text-muted hover:text-fg">
            Close
          </button>
        </div>
        <div className="mb-6 hidden overflow-x-auto sm:block">
          <svg viewBox="0 0 1000 160" className="h-40 w-full min-w-[48rem]">
            {ACTS.map((act, ai) => {
              const scenes = SCENES.filter((_, i) => i >= act.range[0] && i <= act.range[1]);
              const x0 = 40 + ai * 190;
              return (
                <g key={act.id}>
                  <text x={x0} y="22" fill="#e4c36b" fontSize="12" fontFamily="JetBrains Mono, monospace">
                    ACT {act.id} · {act.name.toUpperCase()}
                  </text>
                  {scenes.map((s, si) => {
                    const x = x0 + (si % 3) * 52;
                    const y = 58 + Math.floor(si / 3) * 44;
                    const current = s.id === index;
                    return (
                      <g
                        key={s.id}
                        className="cursor-pointer"
                        onClick={() => setIndex(s.id)}
                      >
                        <circle cx={x} cy={y} r={current ? 14 : 11} fill={current ? "#e94560" : "#18181f"} stroke={current ? "#e4c36b" : "#2a2a33"} />
                        <text x={x} y={y + 4} textAnchor="middle" fill="#f3efe6" fontSize="10" fontFamily="JetBrains Mono, monospace">
                          {String(s.id + 1).padStart(2, "0")}
                        </text>
                      </g>
                    );
                  })}
                  {ai < ACTS.length - 1 && (
                    <line x1={x0 + 150} y1="80" x2={x0 + 180} y2="80" stroke="#e4c36b" strokeWidth="1" opacity="0.5" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        {ACTS.map((act) => (
          <div key={act.id} className="mb-5">
            <p className="mb-2 font-mono text-xs tracking-[0.2em] text-gold uppercase">
              Act {act.id} · {act.name}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SCENES.filter((_, i) => i >= act.range[0] && i <= act.range[1]).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(s.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left",
                    s.id === index ? "border-crimson bg-crimson/15 text-fg" : "border-border bg-raised text-muted hover:border-gold hover:text-fg",
                  )}
                >
                  <span className="mr-2 font-mono text-sm text-gold">{String(s.id + 1).padStart(2, "0")}</span>
                  <span className="text-base">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
