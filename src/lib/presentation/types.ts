export type Accent = "crimson" | "teal" | "gold" | "purple" | "green" | "cyan" | "ivory";

export type VisualKind =
  | "title"
  | "character"
  | "timeline"
  | "nested"
  | "earth"
  | "toolkit"
  | "arcs"
  | "built"
  | "convergence"
  | "ask"
  | "evidence"
  | "fusion"
  | "auris"
  | "mapping"
  | "planets"
  | "canon"
  | "sunday"
  | "gate"
  | "lod"
  | "governor"
  | "cascade"
  | "ear"
  | "referee"
  | "genesis"
  | "close";

export interface SceneCard {
  title: string;
  subtitle?: string;
  accent: Accent;
  lines: string[];
}

export interface SceneStat {
  value: string;
  label: string;
  accent: Accent;
}

export interface SceneRow {
  left: string;
  right: string;
}

export interface Scene {
  id: number;
  slug: string;
  act: string;
  title: string;
  kicker: string;
  quote?: string;
  attribution?: string;
  visual: VisualKind;
  camera: [number, number, number];
  cards?: SceneCard[];
  stats?: SceneStat[];
  rows?: SceneRow[];
  table?: { headers: string[]; rows: string[][] };
  footer?: string;
}

export const ACCENT_HEX: Record<Accent, string> = {
  crimson: "#e94560",
  teal: "#4ecdc4",
  gold: "#e4c36b",
  purple: "#9d4edd",
  green: "#3dcc6d",
  cyan: "#00d4ff",
  ivory: "#f3efe6",
};

export function isBottomHeavy(scene: Scene) {
  return Boolean(scene.table);
}

export function hasBriefingBody(scene: Scene) {
  return Boolean(scene.cards?.length || scene.stats?.length || scene.rows?.length || scene.table);
}
