import { useDeck } from "@/presentation/engine/store";

const KEYS = [
  ["→ ←  or Space", "Next / previous scene"],
  ["Click a node / mesh", "Select it. Same ID in 2D and 3D."],
  ["V", "Toggle 3D world / 2D diagram"],
  ["E", "Toggle PRESENT / EXPLORE density"],
  ["X", "Explode nested shells (3D)"],
  ["Play Arc", "Character arcs: step the selected trajectory"],
  ["Drag in EXPLORE 3D", "Orbit. Click a relic to focus."],
  ["Deep Dive", "Layer 2 — mechanism, structure, residual"],
  ["Source", "Layer 3 — original wording from the corpus"],
  ["I", "Constellation jump map"],
  ["P", "Autoplay (~18s / scene)"],
  ["M", "Mute the drone"],
  ["H or ?", "This guide"],
  ["Esc", "Close menus and drawers"],
] as const;

export function Help() {
  const open = useDeck((s) => s.helpOpen);
  const toggle = useDeck((s) => s.toggleHelp);
  if (!open) return null;
  return (
    <div data-hud className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-void/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide">How to steer</h2>
          <button type="button" onClick={toggle} className="min-h-11 text-sm text-muted hover:text-fg">
            Close
          </button>
        </div>
        <p className="mb-5 text-base leading-relaxed text-muted">
          This is an explorable model of a system. 3D is embodied intuition. 2D is structural precision. Deep Dive is explanation. Source is provenance.
        </p>
        <ul className="space-y-3">
          {KEYS.map(([k, v]) => (
            <li key={k} className="flex gap-3 text-base">
              <span className="w-36 shrink-0 font-mono text-sm tracking-wide text-gold">{k}</span>
              <span className="text-fg/85">{v}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-dim">
          Sunday driver: arrows through the acts. Nested containers, Earth is the Game, Fusion, SHENRON, Referee, then Genesis.
        </p>
      </div>
    </div>
  );
}
