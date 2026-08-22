import { create } from "zustand";
import { SCENE_COUNT } from "./scenes";

function wrap(n: number) {
  return ((n % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT;
}

interface DeckState {
  index: number;
  entered: boolean;
  autoplay: boolean;
  indexOpen: boolean;
  helpOpen: boolean;
  muted: boolean;
  progress: number;
  focus: string | null;
  setIndex: (n: number) => void;
  next: () => void;
  prev: () => void;
  enter: () => void;
  toggleAutoplay: () => void;
  toggleIndex: () => void;
  toggleHelp: () => void;
  toggleMute: () => void;
  setProgress: (p: number) => void;
  setFocus: (k: string | null) => void;
}

export const useDeck = create<DeckState>((set, get) => ({
  index: 0,
  entered: false,
  autoplay: false,
  indexOpen: false,
  helpOpen: false,
  muted: true,
  progress: 0,
  focus: null,
  setIndex: (n) => {
    const index = wrap(n);
    set({ index, indexOpen: false, helpOpen: false, progress: 0, focus: null });
    try {
      localStorage.setItem("architect.scene", String(index));
    } catch {
      /* ignore */
    }
  },
  next: () => get().setIndex(get().index + 1),
  prev: () => get().setIndex(get().index - 1),
  enter: () => {
    set({ entered: true, index: 0, progress: 0, focus: null, helpOpen: false });
  },
  toggleAutoplay: () => set({ autoplay: !get().autoplay, progress: 0 }),
  toggleIndex: () => set({ indexOpen: !get().indexOpen, helpOpen: false }),
  toggleHelp: () => set({ helpOpen: !get().helpOpen, indexOpen: false }),
  toggleMute: () => set({ muted: !get().muted }),
  setProgress: (p) => set({ progress: p }),
  setFocus: (k) => set({ focus: k }),
}));
