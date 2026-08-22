export type Accent = "crimson" | "teal" | "gold" | "purple" | "green" | "cyan" | "ivory";

export type Renderer = "3d" | "diagram" | "hybrid";

export type Mode = "present" | "explore";

export type VisMode = "2d" | "3d";

export type CompareMode = "ab" | "a" | "b" | "diff";

export const ACCENT_HEX: Record<Accent, string> = {
  crimson: "#e94560",
  teal: "#4ecdc4",
  gold: "#e4c36b",
  purple: "#9d4edd",
  green: "#3dcc6d",
  cyan: "#00d4ff",
  ivory: "#f3efe6",
};

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

export interface SceneTable {
  headers: string[];
  rows: string[][];
}

/** Layer-1 content bible. Do not rewrite claims. */
export interface Scene {
  id: number;
  slug: string;
  act: string;
  title: string;
  kicker: string;
  quote?: string;
  attribution?: string;
  visual: string;
  camera: [number, number, number];
  cards?: SceneCard[];
  stats?: SceneStat[];
  rows?: SceneRow[];
  table?: SceneTable;
  footer?: string;
}

export interface Entity {
  id: string;
  label: string;
  subtitle?: string;
  role?: string;
  accent: Accent;
  summary: string[];
  group?: string;
}

export interface Edge {
  from: string;
  to: string;
  label: string;
}

export interface SourceRef {
  title: string;
  section?: string;
  excerpt: string;
  artifact?: string;
  why?: string;
}

export interface Detail {
  overview?: string;
  mechanism: string;
  structure?: string;
  causeEffect?: string[];
  examples?: string[];
  implications?: string[];
  residual?: string;
  currentStatus?: string;
  sections?: { heading: string; body: string }[];
}

export interface LayoutNode {
  id: string;
  x: number;
  y: number;
  r?: number;
}

export interface Step {
  id: string;
  label: string;
}

export interface SceneModel extends Scene {
  renderer: Renderer;
  preferredVis: VisMode;
  entities: Entity[];
  edges: Edge[];
  layout: LayoutNode[];
  details: Record<string, Detail>;
  sources: Record<string, SourceRef[]>;
  steps?: Step[];
  hint: string;
}

export function eid(slug: string, label: string) {
  return `${slug}:${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}
