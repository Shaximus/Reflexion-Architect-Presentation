import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Grid3x3,
  MoreHorizontal,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { setDroneMuted, startDrone } from "@/components/presentation/audio";
import { ACTS, SCENE_COUNT } from "@/presentation/engine/content";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Stage } from "@/presentation/visuals/Stage";
import { ActNavigator } from "./ActNavigator";
import { DetailDrawer } from "./DetailDrawer";
import { Help } from "./Help";
import { Inspector } from "./Inspector";
import { Intro } from "./Intro";
import { SourceDrawer } from "./SourceDrawer";

const AUTOPLAY_SECONDS = 18;

function fromHud(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-hud],[data-stage]"));
}

function StarWash() {
  return <div className="pointer-events-none absolute inset-0 void-stars" aria-hidden />;
}

export function Presentation() {
  const entered = useDeck((s) => s.entered);
  const enter = useDeck((s) => s.enter);
  const next = useDeck((s) => s.next);
  const prev = useDeck((s) => s.prev);
  const autoplay = useDeck((s) => s.autoplay);
  const index = useDeck((s) => s.index);
  const indexOpen = useDeck((s) => s.indexOpen);
  const helpOpen = useDeck((s) => s.helpOpen);
  const muted = useDeck((s) => s.muted);
  const mode = useDeck((s) => s.mode);
  const visMode = useDeck((s) => s.visMode);
  const detailOpen = useDeck((s) => s.detailOpen);
  const sourceOpen = useDeck((s) => s.sourceOpen);
  const moreOpen = useDeck((s) => s.moreOpen);
  const progress = useDeck((s) => s.progress);
  const toggleAutoplay = useDeck((s) => s.toggleAutoplay);
  const toggleIndex = useDeck((s) => s.toggleIndex);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const toggleMute = useDeck((s) => s.toggleMute);
  const toggleMode = useDeck((s) => s.toggleMode);
  const toggleVis = useDeck((s) => s.toggleVis);
  const toggleExplode = useDeck((s) => s.toggleExplode);
  const toggleMore = useDeck((s) => s.toggleMore);
  const closeDrawers = useDeck((s) => s.closeDrawers);
  const setProgress = useDeck((s) => s.setProgress);
  const [mobile, setMobile] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const model = getModel(index);
  const act = ACTS.find((a) => index >= a.range[0] && index <= a.range[1]);

  useEffect(() => {
    const w = window as unknown as { __setScene?: (n: number) => void };
    w.__setScene = (n: number) => useDeck.getState().setIndex(n);
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onEnter = useCallback(() => {
    startDrone();
    setDroneMuted(false);
    useDeck.setState({ muted: false });
    enter();
  }, [enter]);

  useEffect(() => {
    setDroneMuted(muted);
  }, [muted]);

  useEffect(() => {
    if (!entered || !autoplay) {
      setProgress(0);
      return;
    }
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      acc += dt;
      setProgress(Math.min(1, acc / AUTOPLAY_SECONDS));
      if (acc >= AUTOPLAY_SECONDS) {
        next();
        acc = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, entered, index, next, setProgress]);

  useEffect(() => {
    if (!entered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape") {
        if (detailOpen || sourceOpen) closeDrawers();
        else if (helpOpen) toggleHelp();
        else if (indexOpen) toggleIndex();
        else if (moreOpen) toggleMore();
        return;
      }
      if (e.key === "?" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        toggleHelp();
        return;
      }
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        toggleMode();
        return;
      }
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        toggleVis();
        return;
      }
      if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        toggleExplode();
        return;
      }
      if (helpOpen || indexOpen || detailOpen || sourceOpen) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        useDeck.getState().setIndex(0);
      } else if (e.key === "End") {
        useDeck.getState().setIndex(SCENE_COUNT - 1);
      } else if (e.key === "i" || e.key === "I") {
        toggleIndex();
      } else if (e.key === "p" || e.key === "P") {
        toggleAutoplay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    entered,
    helpOpen,
    indexOpen,
    detailOpen,
    sourceOpen,
    moreOpen,
    next,
    prev,
    toggleAutoplay,
    toggleHelp,
    toggleIndex,
    toggleMute,
    toggleMode,
    toggleVis,
    toggleExplode,
    toggleMore,
    closeDrawers,
  ]);

  const onTouchStart = (e: TouchEvent) => {
    if (fromHud(e.target)) {
      touch.current = null;
      return;
    }
    const t = e.changedTouches[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (fromHud(e.target)) return;
    const start = touch.current;
    const t = e.changedTouches[0];
    touch.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <main
      className="relative h-dvh w-full overflow-hidden bg-void text-fg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <StarWash />

      {!entered && <Intro onEnter={onEnter} />}

      {entered && (
        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <header className="flex shrink-0 items-start justify-between gap-3 px-4 pt-3 pb-2 sm:px-6 sm:pt-4">
            <div key={model.id} className="hud-enter min-w-0 max-w-[min(48rem,72%)]">
              <p className="font-mono text-xs tracking-[0.28em] text-gold uppercase">
                Act {act?.id ?? 1} · {model.act}
              </p>
              <h1 className="mt-1 font-display text-xl leading-tight font-semibold tracking-wide sm:text-3xl">{model.title}</h1>
              <p className="mt-1.5 max-w-xl text-sm text-muted italic sm:text-base">{model.kicker}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="font-mono text-sm tracking-[0.2em] text-gold tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(SCENE_COUNT).padStart(2, "0")}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-xs tracking-[0.16em] text-muted uppercase hover:border-gold hover:text-fg"
                  aria-label="Toggle present or explore"
                >
                  {mode}
                </button>
                <button
                  type="button"
                  onClick={toggleVis}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs tracking-[0.16em] text-gold uppercase hover:border-gold hover:text-fg"
                  aria-label="Toggle 3D or 2D visualization"
                >
                  {visMode}
                </button>
              </div>
            </div>
          </header>

          {mobile ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="h-[48%] min-h-[12rem] overflow-hidden px-3">
                <Stage index={index} compact />
              </div>
              <div className="min-h-0 flex-1 px-3 pt-2 pb-1">
                <Inspector mobile />
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 gap-4 px-5 pb-1">
              <div className="min-h-0 min-w-0 flex-[1.8]">
                <Stage index={index} />
              </div>
              <div className="w-[min(22rem,28%)] shrink-0">
                <Inspector mobile={false} />
              </div>
            </div>
          )}

          <nav
            data-hud
            className="relative z-10 flex shrink-0 items-center justify-center gap-2 px-3 pt-3 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-border">
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
            {!mobile && (
              <>
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
                  onClick={toggleMute}
                  className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={toggleIndex}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
              aria-label="Open scene index"
            >
              <Grid3x3 className="size-4" />
            </button>
            {mobile ? (
              <button
                type="button"
                onClick={toggleMore}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
                aria-label="More controls"
              >
                <MoreHorizontal className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleHelp}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/90 hover:border-gold"
                aria-label="Open navigation guide"
              >
                <CircleHelp className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="flex size-11 items-center justify-center rounded-full border border-crimson/60 bg-crimson/20 hover:bg-crimson/30"
              aria-label="Next scene"
            >
              <ChevronRight className="size-5" />
            </button>
          </nav>

          {moreOpen && mobile && (
            <div data-hud className="absolute right-3 bottom-20 z-20 w-44 rounded-2xl border border-border bg-surface p-2">
              <button type="button" onClick={toggleAutoplay} className="flex min-h-11 w-full items-center px-3 text-sm">
                {autoplay ? "Pause autoplay" : "Autoplay"}
              </button>
              <button type="button" onClick={toggleMute} className="flex min-h-11 w-full items-center px-3 text-sm">
                {muted ? "Unmute" : "Mute"}
              </button>
              <button type="button" onClick={toggleHelp} className="flex min-h-11 w-full items-center px-3 text-sm">
                How to steer
              </button>
              <button type="button" onClick={toggleMode} className="flex min-h-11 w-full items-center px-3 text-sm">
                Mode: {mode}
              </button>
              <button type="button" onClick={toggleVis} className="flex min-h-11 w-full items-center px-3 text-sm">
                View: {visMode}
              </button>
            </div>
          )}

          <ActNavigator />
          <Help />
          <DetailDrawer />
          <SourceDrawer />
        </div>
      )}
    </main>
  );
}
