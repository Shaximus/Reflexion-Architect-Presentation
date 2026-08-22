import { useEffect, useRef, useState } from "react";
import { entityById, getModel, relatedTo } from "@/presentation/engine/enrich";
import { ARC_LANES, laneOf, stagesOfSelection } from "@/presentation/engine/arc-lanes";
import { useDeck } from "@/presentation/engine/store";
import { ACCENT_HEX, type CompareMode } from "@/presentation/engine/types";
import { cn } from "@/lib/utils";

const FUSION_MODES: { id: CompareMode; label: string }[] = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "ab", label: "A+B" },
  { id: "diff", label: "DIFF" },
];

export function Inspector({ mobile }: { mobile: boolean }) {
  const index = useDeck((s) => s.index);
  const selectedId = useDeck((s) => s.selectedEntityId);
  const selectEntity = useDeck((s) => s.selectEntity);
  const present = useDeck((s) => s.mode === "present");
  const visMode = useDeck((s) => s.visMode);
  const exploded = useDeck((s) => s.exploded);
  const compareMode = useDeck((s) => s.compareMode);
  const toggleExplode = useDeck((s) => s.toggleExplode);
  const toggleVis = useDeck((s) => s.toggleVis);
  const setCompare = useDeck((s) => s.setCompare);
  const openDetail = useDeck((s) => s.openDetail);
  const openSource = useDeck((s) => s.openSource);
  const setStep = useDeck((s) => s.setStep);
  const [playing, setPlaying] = useState(false);
  const playLane = useRef<string | null>(null);
  const model = getModel(index);
  const selected = entityById(model, selectedId);
  const rel = relatedTo(model, selectedId).filter((e) => e.label !== "then");
  const hasDetail = Boolean(selectedId && (model.details[selectedId] || selected));
  const hasSource = Boolean(selectedId && model.sources[selectedId]?.length);
  const fusion = model.slug === "fusion" || model.slug === "earth";
  const arcs = model.slug === "arcs";
  const arcStages = stagesOfSelection(selectedId);
  const arcLane = laneOf(selectedId);
  const stageEntities = arcs ? model.entities.filter((e) => e.group !== "stage") : model.entities;

  useEffect(() => {
    setPlaying(false);
  }, [index]);

  useEffect(() => {
    if (!playing || !arcs) return;
    const lane = ARC_LANES.find((l) => l.heroId === playLane.current) ?? ARC_LANES[0];
    if (!lane) return;
    const seq = [lane.heroId, ...lane.stages.map((s) => s.id), "arcs:curtis"];
    let i = 0;
    selectEntity(seq[0]!);
    setStep(0);
    const t = window.setInterval(() => {
      i += 1;
      if (i >= seq.length) {
        setPlaying(false);
        window.clearInterval(t);
        return;
      }
      selectEntity(seq[i]!);
      setStep(i);
    }, 1300);
    return () => window.clearInterval(t);
  }, [playing, arcs, selectEntity, setStep]);

  const startPlay = () => {
    const lane = typeof arcLane === "object" && arcLane ? arcLane : ARC_LANES[0];
    playLane.current = lane?.heroId ?? "arcs:neo";
    setPlaying(true);
  };

  const applyCompare = (m: CompareMode) => {
    setCompare(m);
    if (m === "a") {
      const id = model.entities.find((e) => e.id.includes("instinct"))?.id;
      if (id) selectEntity(id);
    } else if (m === "b") {
      const id = model.entities.find((e) => e.id.includes("ego"))?.id;
      if (id) selectEntity(id);
    } else {
      const id = model.entities.find((e) => e.id.includes("vegito") || e.id.includes("bridge"))?.id;
      if (id) selectEntity(id);
    }
  };

  const fusionButtons = fusion && (
    <div className="flex flex-wrap gap-1">
      {FUSION_MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => applyCompare(m.id)}
          className={cn(
            "min-h-11 rounded-full border px-3 font-mono text-xs tracking-[0.14em]",
            compareMode === m.id ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );

  const playButton = arcs && (
    <button type="button" onClick={startPlay} className="min-h-11 rounded-full border border-gold/40 px-4 text-sm text-gold">
      {playing ? "Playing…" : "Play Arc"}
    </button>
  );

  return (
    <aside
      data-hud
      className={cn(
        "flex min-h-0 flex-col overflow-y-auto border-border bg-void/80 p-4 backdrop-blur-md",
        mobile ? "rounded-t-2xl border-t" : "h-full rounded-2xl border",
      )}
      style={{ touchAction: "pan-y" }}
    >
      {!selected && (
        <div className="space-y-4">
          <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">Scene thesis</p>
          <p className="text-base leading-relaxed text-fg">{model.kicker}</p>
          {model.quote && (
            <blockquote>
              <p className="font-display text-lg text-crimson italic">“{model.quote}”</p>
              {model.attribution && <cite className="mt-2 block text-sm text-muted not-italic">{model.attribution}</cite>}
            </blockquote>
          )}
          <p className="text-sm leading-relaxed text-muted">{model.hint}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={toggleVis} className="min-h-11 rounded-full border border-gold/40 px-4 text-sm text-gold">
              {visMode === "3d" ? "Show 2D diagram" : "Show 3D world"}
            </button>
            {model.slug === "vm" && visMode === "3d" && (
              <button type="button" onClick={toggleExplode} className="min-h-11 rounded-full border border-border px-4 text-sm text-fg">
                {exploded ? "Reassemble" : "Explode view"}
              </button>
            )}
            {playButton}
          </div>
          {fusionButtons}
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.16em] text-dim uppercase">On this stage</p>
            {(present ? stageEntities.slice(0, 6) : stageEntities).map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => selectEntity(e.id)}
                className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface/70 px-3 py-2 text-left text-sm"
              >
                <span className="size-2 shrink-0 rounded-full" style={{ background: ACCENT_HEX[e.accent] }} />
                <span className="text-fg">{e.label}</span>
              </button>
            ))}
          </div>
          {model.footer && <p className="text-sm text-dim">{model.footer}</p>}
        </div>
      )}

      {selected && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: ACCENT_HEX[selected.accent] }}>
                Selected
              </p>
              <h2 className="mt-1 font-display text-xl tracking-wide text-fg">{selected.label}</h2>
              {selected.subtitle && <p className="mt-1 text-sm text-muted">{selected.subtitle}</p>}
            </div>
            <button type="button" onClick={() => selectEntity(null)} className="text-sm text-muted hover:text-fg">
              Clear
            </button>
          </div>
          <ul className="space-y-2 text-[0.9375rem] leading-relaxed text-fg/90">
            {(present ? selected.summary.slice(0, 2) : selected.summary).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {arcs && arcStages.length > 0 && (
            <div>
              <p className="mb-2 font-mono text-xs tracking-[0.16em] text-dim uppercase">Arc stages</p>
              <div className="flex flex-wrap gap-1">
                {arcStages.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => selectEntity(st.id)}
                    className={cn(
                      "min-h-11 rounded-full border px-3 text-sm",
                      selectedId === st.id ? "border-gold bg-gold/15 text-gold" : "border-border text-fg",
                    )}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {rel.length > 0 && (
            <div>
              <p className="mb-2 font-mono text-xs tracking-[0.16em] text-dim uppercase">Why connected</p>
              <ul className="space-y-2">
                {rel.map((e) => {
                  const otherId = e.from === selected.id ? e.to : e.from;
                  const other = entityById(model, otherId);
                  return (
                    <li key={`${e.from}-${e.to}`}>
                      <button
                        type="button"
                        onClick={() => selectEntity(otherId)}
                        className="text-left text-sm text-fg/85 hover:text-gold"
                      >
                        <span className="text-gold">{other?.label ?? otherId}</span>
                        <span className="text-muted"> — {e.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {fusionButtons}
          <div className="flex flex-wrap gap-2">
            {hasDetail && (
              <button
                type="button"
                onClick={openDetail}
                className="min-h-11 rounded-full border border-gold/50 bg-gold/10 px-4 text-sm text-gold"
              >
                Deep Dive
              </button>
            )}
            {hasSource && (
              <button
                type="button"
                onClick={openSource}
                className="min-h-11 rounded-full border border-border px-4 text-sm text-fg"
              >
                Source
              </button>
            )}
            {playButton}
            {model.slug === "vm" && visMode === "3d" && (
              <button type="button" onClick={toggleExplode} className="min-h-11 rounded-full border border-border px-4 text-sm text-fg">
                {exploded ? "Reassemble" : "Explode"}
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
