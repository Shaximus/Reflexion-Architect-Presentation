import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { setDroneMuted, startDrone } from "./audio";
import { Intro } from "./Intro";
import { Overlay } from "./Overlay";
import { SCENE_COUNT } from "@/lib/presentation/scenes";
import { useDeck } from "@/lib/presentation/store";

const CanvasScene = lazy(() =>
  import("./world/CanvasScene").then((m) => ({ default: m.CanvasScene })),
);

const AUTOPLAY_SECONDS = 18;

function fromHud(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-hud]"));
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
  const toggleAutoplay = useDeck((s) => s.toggleAutoplay);
  const toggleIndex = useDeck((s) => s.toggleIndex);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const toggleMute = useDeck((s) => s.toggleMute);
  const setProgress = useDeck((s) => s.setProgress);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);
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
        if (helpOpen) toggleHelp();
        else if (indexOpen) toggleIndex();
        return;
      }
      if (e.key === "?" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        toggleHelp();
        return;
      }
      if (helpOpen || indexOpen) return;
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
  }, [entered, helpOpen, indexOpen, next, prev, toggleAutoplay, toggleHelp, toggleIndex, toggleMute]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (fromHud(e.target)) {
      touch.current = null;
      return;
    }
    const t = e.changedTouches[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
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
      className="relative h-dvh w-full overflow-hidden bg-void"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {mounted && (
        <div className="absolute inset-0 touch-none">
          <Suspense fallback={null}>
            <CanvasScene mobile={mobile} />
          </Suspense>
        </div>
      )}
      {entered ? <Overlay mobile={mobile} /> : <Intro onEnter={onEnter} />}
    </main>
  );
}
