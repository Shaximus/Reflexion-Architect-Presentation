// NATURE ONTOLOGY — Act IV evidence block.
//
// Five natural-science domains examined for whether they support the Ladder
// Operator claims, plus the ledger of what they REFUSED to confirm. Each scene
// carries its own collision on the slide face rather than in a deep dive: a
// deck that shows its own falsifications next to its own numbers is the only
// kind that survives a hostile reader.
//
// Source research: /home/shax/Documents/Research/nature_ontology/
// Collision registry: semantic_compiler/registry/correspondence.py (COL_001..005)
import type { Detail, Scene, SourceRef } from "../types";

import { SCENE as DIVERGENT, DEEP as DIVERGENT_DEEP } from "./01_divergent";
import { SCENE as PRESSURE, DEEP as PRESSURE_DEEP } from "./02_pressure";
import { SCENE as LOCKED, DEEP as LOCKED_DEEP } from "./03_locked";
import { SCENE as GENOME, DEEP as GENOME_DEEP } from "./04_genome";
import { SCENE as GRADIENT, DEEP as GRADIENT_DEEP } from "./05_gradient";
import { SCENE as LEDGER, DEEP as LEDGER_DEEP } from "./06_ledger";

/** Ordered: evidence first, ledger last. The ledger audits the five before it. */
export const NATURE_SCENES: Omit<Scene, "id">[] = [
  DIVERGENT,
  PRESSURE,
  LOCKED,
  GENOME,
  GRADIENT,
  LEDGER,
];

interface DeepRecord {
  id: string;
  detail: Detail;
  sources: SourceRef[];
}

const ALL_DEEP: DeepRecord[] = [
  ...DIVERGENT_DEEP,
  ...PRESSURE_DEEP,
  ...LOCKED_DEEP,
  ...GENOME_DEEP,
  ...GRADIENT_DEEP,
  ...LEDGER_DEEP,
];

/** Shaped for the ARCHIVE_DEEP merge in ../deep/index.ts, keyed by scene slug. */
export const NATURE_DEEP_BY_SCENE: Record<
  string,
  { details: Record<string, Detail>; sources: Record<string, SourceRef[]> }
> = ALL_DEEP.reduce(
  (acc, rec) => {
    const slug = rec.id.split(":")[0] ?? "";
    const bucket = (acc[slug] ??= { details: {}, sources: {} });
    bucket.details[rec.id] = rec.detail;
    bucket.sources[rec.id] = rec.sources;
    return acc;
  },
  {} as Record<string, { details: Record<string, Detail>; sources: Record<string, SourceRef[]> }>,
);
