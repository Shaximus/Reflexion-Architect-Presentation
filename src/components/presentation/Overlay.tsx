import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Grid3x3,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ACTS, SCENES, SCENE_COUNT } from "@/lib/presentation/scenes";
import { useDeck } from "@/lib/presentation/store";
import { cn } from "@/lib/utils";
import { hasBriefingBody, isBottomHeavy, type Accent, type Scene } from "@/lib/presentation/types";

const ACCENT_CLASS: Record<Accent, string> = {
  crimson: "border-crimson/50 text-crimson",
  teal: "border-teal/50 text-teal",
  gold: "border-gold/50 text-gold",
  purple: "border-purple/50 text-purple",
  green: "border-green/50 text-green",
  cyan: "border-cyan/50 text-cyan",
  ivory: "border-fg/30 text-fg",
};

const KEYS = [
  ["→ ←  or swipe", "Next / previous scene"],
  ["Space", "Next scene"],
  ["Home / End", "First / last"],
  ["Click a relic", "Open its briefing"],
  ["I", "Constellation jump map"],
  ["P", "Autoplay (~18s / scene)"],
  ["M", "Mute the drone"],
  ["H or ?", "This guide"],
  ["Esc", "Close menus"],
] as const;

function Cards({ scene }: { scene: Scene }) {
  const focus = useDeck((s) => s.focus);
  const setFocus = useDeck((s) => s.setFocus);
  if (!scene.cards?.length) return null;
  return (
    <div className="grid gap-2">
      {scene.cards.map((card) => {
        const open = !focus || focus === card.title;
        return (
          <button
            type="button"
            key={card.title}
            onClick={() => setFocus(focus === card.title ? null : card.title)}
            className={cn(
              "rounded-[var(--radius-card)] border bg-raised/85 px-3 py-2 text-left backdrop-blur-md",
              ACCENT_CLASS[card.accent],
              focus === card.title && "ring-1 ring-gold",
            )}
          >
            <h3 className="font-display text-[11px] font-semibold tracking-[0.16em] uppercase">{card.title}</h3>
            {card.subtitle && <p className="mt-0.5 text-[10px] text-muted">{card.subtitle}</p>}
            {open ? (
              <ul className="mt-1.5 space-y-0.5">
                {card.lines.map((line) => (
                  <li key={line} className="text-[11px] leading-snug text-fg/85">
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 line-clamp-2 text-[11px] text-fg/70">{card.lines[0]}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Stats({ scene }: { scene: Scene }) {
  const focus = useDeck((s) => s.focus);
  const setFocus = useDeck((s) => s.setFocus);
  if (!scene.stats?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-2">
      {scene.stats.map((s) => (
        <button
          type="button"
          key={s.value + s.label}
          onClick={() => setFocus(focus === s.value ? null : s.value)}
          className={cn(
            "rounded-[var(--radius-card)] border bg-surface/80 px-3 py-2 text-left",
            ACCENT_CLASS[s.accent],
            focus === s.value && "ring-1 ring-gold",
          )}
        >
          <div className="font-mono text-sm tracking-tight">{s.value}</div>
          <div className="text-[10px] text-muted">{s.label}</div>
        </button>
      ))}
    </div>
  );
}

function Table({ scene }: { scene: Scene }) {
  const focus = useDeck((s) => s.focus);
  const setFocus = useDeck((s) => s.setFocus);
  if (!scene.table) return null;
  return (
    <div className="overflow-auto rounded-[var(--radius-card)] border border-border bg-surface/85">
      <table className="w-full min-w-[28rem] border-collapse text-left font-mono text-[10px]">
        <thead>
          <tr className="border-b border-crimson/40 text-crimson">
            {scene.table.headers.map((h) => (
              <th key={h} className="px-2 py-1.5 font-semibold tracking-[0.12em]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scene.table.rows.map((row, i) => {
            const key = row[0] ?? String(i);
            return (
              <tr
                key={key}
                className={cn(
                  "cursor-pointer border-b border-border/60 text-fg/80 hover:bg-raised/80",
                  focus === key && "bg-crimson/10",
                )}
                onClick={() => setFocus(focus === key ? null : key)}
              >
                {row.map((cell, j) => (
                  <td key={j} className={cn("px-2 py-1", j === 0 && "text-crimson")}>
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

function Rows({ scene }: { scene: Scene }) {
  const focus = useDeck((s) => s.focus);
  const setFocus = useDeck((s) => s.setFocus);
  if (!scene.rows?.length) return null;
  return (
    <div className="space-y-1">
      {scene.rows.map((r) => (
        <button
          type="button"
          key={r.left}
          onClick={() => setFocus(focus === r.left ? null : r.left)}
          className={cn(
            "flex w-full gap-3 border-b border-border/50 py-1 text-left text-[11px]",
            focus === r.left && "text-gold",
          )}
        >
          <span className="w-28 shrink-0 font-mono text-crimson">{r.left}</span>
          <span className="text-fg/80">{r.right}</span>
        </button>
      ))}
    </div>
  );
}

function Briefing({ scene, includeQuote }: { scene: Scene; includeQuote: boolean }) {
  return (
    <div className="space-y-2">
      {includeQuote && scene.quote && (
        <blockquote>
          <p className="font-display text-sm text-crimson italic sm:text-base">“{scene.quote}”</p>
          {scene.attribution && <cite className="mt-1 block text-[10px] text-dim not-italic">{scene.attribution}</cite>}
        </blockquote>
      )}
      <Cards scene={scene} />
      <Stats scene={scene} />
      <Rows scene={scene} />
      <Table scene={scene} />
      {scene.footer && <p className="text-[10px] tracking-wide text-dim">{scene.footer}</p>}
    </div>
  );
}

export function Overlay({ mobile }: { mobile: boolean }) {
  const index = useDeck((s) => s.index);
  const autoplay = useDeck((s) => s.autoplay);
  const muted = useDeck((s) => s.muted);
  const indexOpen = useDeck((s) => s.indexOpen);
  const helpOpen = useDeck((s) => s.helpOpen);
  const progress = useDeck((s) => s.progress);
  const next = useDeck((s) => s.next);
  const prev = useDeck((s) => s.prev);
  const toggleAutoplay = useDeck((s) => s.toggleAutoplay);
  const toggleIndex = useDeck((s) => s.toggleIndex);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const toggleMute = useDeck((s) => s.toggleMute);
  const setIndex = useDeck((s) => s.setIndex);
  const scene = SCENES[index] ?? SCENES[0];
  const bottomHeavy = isBottomHeavy(scene);
  const body = hasBriefingBody(scene);
  const showRail = body && !bottomHeavy && !mobile;
  const showSheet = body && (bottomHeavy || mobile);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-fg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void via-void/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent" />
      <div key={scene.id} className="scene-flash pointer-events-none absolute inset-0" />

      <header className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-3 sm:px-6 sm:pt-4">
        <div key={scene.id} className="hud-enter max-w-[min(42rem,72%)]">
          <p className="font-mono text-[10px] tracking-[0.28em] text-gold uppercase">
            Act {ACTS.find((a) => index >= a.range[0] && index <= a.range[1])?.id ?? 1} · {scene.act}
          </p>
          <h1 className="mt-1 font-display text-xl leading-none font-semibold tracking-wide sm:text-3xl">{scene.title}</h1>
          <p className="mt-1.5 max-w-lg text-[11px] text-muted italic sm:text-xs">{scene.kicker}</p>
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-gold tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(SCENE_COUNT).padStart(2, "0")}
        </div>
      </header>

      {showRail && (
        <aside
          data-hud
          className="pointer-events-auto absolute top-24 right-5 bottom-24 w-[min(24rem,30vw)] overflow-y-auto rounded-xl border border-border/70 bg-void/55 p-3 backdrop-blur-md"
          style={{ touchAction: "pan-y" }}
        >
          <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-dim uppercase">Click a relic or a card</p>
          <Briefing scene={scene} includeQuote />
        </aside>
      )}

      {showSheet && (
        <aside
          data-hud
          className="pointer-events-auto absolute inset-x-3 bottom-20 max-h-[28vh] overflow-y-auto rounded-xl border border-border/70 bg-void/70 p-3 backdrop-blur-md sm:inset-x-6"
          style={{ touchAction: "pan-y" }}
        >
          <Briefing scene={scene} includeQuote />
        </aside>
      )}

      {!body && scene.quote && (
        <div className="hud-enter absolute bottom-24 left-5 max-w-xl sm:left-8">
          <p className="font-display text-base text-crimson italic sm:text-xl">“{scene.quote}”</p>
          {scene.attribution && <p className="mt-1.5 text-[11px] text-dim">{scene.attribution}</p>}
          {scene.footer && <p className="mt-2 text-[10px] tracking-wide text-dim">{scene.footer}</p>}
        </div>
      )}

      <nav
        data-hud
        className="pointer-events-auto absolute inset-x-0 bottom-[max(0.4rem,env(safe-area-inset-bottom))] flex items-center justify-center gap-2 px-3"
      >
        <div className="absolute inset-x-8 -top-2 h-px bg-border">
          <div className="h-px bg-gold" style={{ width: `${((index + progress) / SCENE_COUNT) * 100}%` }} />
        </div>
        <button
          type="button"
          onClick={prev}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
          aria-label="Previous scene"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={toggleAutoplay}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
          aria-label={autoplay ? "Pause autoplay" : "Play autoplay"}
        >
          {autoplay ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          onClick={toggleIndex}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
          aria-label="Open scene index"
        >
          <Grid3x3 className="size-4" />
        </button>
        <button
          type="button"
          onClick={toggleHelp}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
          aria-label="Open navigation guide"
        >
          <CircleHelp className="size-4" />
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
        <button
          type="button"
          onClick={next}
          className="flex size-11 items-center justify-center rounded-full border border-crimson/60 bg-crimson/20 hover:bg-crimson/30"
          aria-label="Next scene"
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>

      {indexOpen && (
        <div data-hud className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-void/80 p-4 backdrop-blur-md">
          <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-surface p-4" style={{ touchAction: "pan-y" }}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg tracking-wide">Constellation</h2>
              <button type="button" onClick={toggleIndex} className="text-sm text-muted hover:text-fg">
                Close
              </button>
            </div>
            {ACTS.map((act) => (
              <div key={act.id} className="mb-4">
                <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                  Act {act.id} · {act.name}
                </p>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {SCENES.filter((_, i) => i >= act.range[0] && i <= act.range[1]).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setIndex(s.id)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-left text-xs",
                        s.id === index
                          ? "border-crimson bg-crimson/15 text-fg"
                          : "border-border bg-raised text-muted hover:border-gold hover:text-fg",
                      )}
                    >
                      <span className="mr-2 font-mono text-gold">{String(s.id + 1).padStart(2, "0")}</span>
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {helpOpen && (
        <div data-hud className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-void/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg tracking-wide">How to steer</h2>
              <button type="button" onClick={toggleHelp} className="text-sm text-muted hover:text-fg">
                Close
              </button>
            </div>
            <p className="mb-4 text-sm text-muted">
              This is a 25-scene 3D briefing, not a slideshow. Glowing relics on the stage are live — click them to open the matching card.
            </p>
            <ul className="space-y-2">
              {KEYS.map(([k, v]) => (
                <li key={k} className="flex gap-3 text-[13px]">
                  <span className="w-36 shrink-0 font-mono text-[11px] tracking-wide text-gold">{k}</span>
                  <span className="text-fg/85">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-dim">
              Sunday driver: arrows through the acts. Nested containers, Earth is the Game, Fusion, Three Suns, then Genesis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
