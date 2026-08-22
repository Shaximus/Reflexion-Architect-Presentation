import { create } from "zustand";
import { SCENE_COUNT } from "./content";
import type { CompareMode, Mode, VisMode } from "./types";

function wrap(n: number) {
  return ((n % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT;
}

function readVis(): VisMode {
  try {
    const v = localStorage.getItem("architect.vis");
    if (v === "2d" || v === "3d") return v;
  } catch {
    /* ignore */
  }
  return "3d";
}

interface DeckState {
  index: number;
  entered: boolean;
  autoplay: boolean;
  indexOpen: boolean;
  helpOpen: boolean;
  muted: boolean;
  progress: number;
  mode: Mode;
  visMode: VisMode;
  exploded: boolean;
  compareMode: CompareMode;
  lookAt: [number, number, number] | null;
  selectedEntityId: string | null;
  detailOpen: boolean;
  sourceOpen: boolean;
  activeStep: number;
  moreOpen: boolean;
  setIndex: (n: number) => void;
  next: () => void;
  prev: () => void;
  enter: () => void;
  toggleAutoplay: () => void;
  toggleIndex: () => void;
  toggleHelp: () => void;
  toggleMute: () => void;
  toggleMode: () => void;
  toggleVis: () => void;
  setVis: (v: VisMode) => void;
  toggleExplode: () => void;
  setCompare: (m: CompareMode) => void;
  setLookAt: (p: [number, number, number] | null) => void;
  setProgress: (p: number) => void;
  selectEntity: (id: string | null) => void;
  openDetail: () => void;
  openSource: () => void;
  closeDrawers: () => void;
  setStep: (n: number) => void;
  toggleMore: () => void;
}

const resetView = {
  indexOpen: false,
  helpOpen: false,
  selectedEntityId: null as string | null,
  detailOpen: false,
  sourceOpen: false,
  activeStep: 0,
  moreOpen: false,
  exploded: false,
  compareMode: "ab" as CompareMode,
  lookAt: null as [number, number, number] | null,
  progress: 0,
};

export const useDeck = create<DeckState>((set, get) => ({
  index: 0,
  entered: false,
  autoplay: false,
  indexOpen: false,
  helpOpen: false,
  muted: true,
  progress: 0,
  mode: "present",
  visMode: "3d",
  exploded: false,
  compareMode: "ab",
  lookAt: null,
  selectedEntityId: null,
  detailOpen: false,
  sourceOpen: false,
  activeStep: 0,
  moreOpen: false,
  setIndex: (n) => {
    const index = wrap(n);
    set({ index, ...resetView });
    try {
      localStorage.setItem("architect.scene", String(index));
    } catch {
      /* ignore */
    }
  },
  next: () => get().setIndex(get().index + 1),
  prev: () => get().setIndex(get().index - 1),
  enter: () => set({ entered: true, index: 0, visMode: readVis(), ...resetView }),
  toggleAutoplay: () => set({ autoplay: !get().autoplay, progress: 0 }),
  toggleIndex: () => set({ indexOpen: !get().indexOpen, helpOpen: false, moreOpen: false }),
  toggleHelp: () => set({ helpOpen: !get().helpOpen, indexOpen: false, moreOpen: false }),
  toggleMute: () => set({ muted: !get().muted }),
  toggleMode: () =>
    set({
      mode: get().mode === "present" ? "explore" : "present",
      detailOpen: false,
      sourceOpen: false,
    }),
  toggleVis: () => {
    const visMode = get().visMode === "3d" ? "2d" : "3d";
    set({ visMode });
    try {
      localStorage.setItem("architect.vis", visMode);
    } catch {
      /* ignore */
    }
  },
  setVis: (visMode) => {
    set({ visMode });
    try {
      localStorage.setItem("architect.vis", visMode);
    } catch {
      /* ignore */
    }
  },
  toggleExplode: () => set({ exploded: !get().exploded }),
  setCompare: (compareMode) => set({ compareMode }),
  setLookAt: (lookAt) => set({ lookAt }),
  setProgress: (p) => set({ progress: p }),
  selectEntity: (id) =>
    set({
      selectedEntityId: id,
      lookAt: id ? get().lookAt : null,
      detailOpen: false,
      sourceOpen: false,
    }),
  openDetail: () => set({ detailOpen: true, sourceOpen: false }),
  openSource: () => set({ sourceOpen: true, detailOpen: false }),
  closeDrawers: () => set({ detailOpen: false, sourceOpen: false }),
  setStep: (n) => set({ activeStep: n }),
  toggleMore: () => set({ moreOpen: !get().moreOpen }),
}));
