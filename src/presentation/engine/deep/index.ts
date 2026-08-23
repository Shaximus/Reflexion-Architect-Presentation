// Archive deep-dive integration.
//
// Three agents absorbed Curtis's archive into separate modules so they could
// be written in parallel without collision:
//   physics.ts    — cosmology papers (C = 0.91, redshift drift, Table 3, breakers)
//   theology.ts   — dimensional ladder, DI formalism, theological map, arcs
//   pentarchy.ts  — seats, memory cores, ledger apparatus, systems maps
//
// This module merges them into the Record<slug, Deep> shape enrich.ts already
// consumes, so integration is one merge at the call site. Entries here are
// merged AFTER the hand-authored DEEP, so archive detail wins on key collision
// (it carries file+line citations; the older entries generally do not).
import type { Detail, SourceRef } from "../types";
import { PHYSICS_DEEP_BY_SCENE } from "./physics";
import { THEOLOGY_DEEP } from "./theology";
import { PENTARCHY_DEEP } from "./pentarchy";
import { EXCHANGE_DEEP_BY_SCENE } from "./derek-exchange";

type DeepBucket = { details: Record<string, Detail>; sources: Record<string, SourceRef[]> };

function bucket(acc: Record<string, DeepBucket>, slug: string): DeepBucket {
  return (acc[slug] ??= { details: {}, sources: {} });
}

// Theology records are keyed by entity id ("theology:ladder-*", "theology:di-*")
// rather than by scene, so route them to the scene that owns each family.
const THEOLOGY_FAMILY_SCENE: Array<[string, string]> = [
  ["theology:ladder-", "toolkit"],
  ["theology:di-", "vm"],
  ["theology:map-", "character"],
  ["theology:event-", "event"],
  ["theology:arc-", "arcs"],
  ["theology:odds-", "character"],
  ["theology:portrait-", "close"],
];

function theologyScene(id: string): string {
  for (const [prefix, slug] of THEOLOGY_FAMILY_SCENE) {
    if (id.startsWith(prefix)) return slug;
  }
  return "character";
}

export const ARCHIVE_DEEP: Record<string, DeepBucket> = (() => {
  const acc: Record<string, DeepBucket> = {};

  // "physics" is not a real scene slug — the cosmology content belongs to the
  // scenes that actually display it: "built" (the papers card), "evidence"
  // (the T_CMB / redshift-drift verdict rows) and "close" (the C ~ 0.91 stat).
  // Routing per-record so nothing is orphaned off a nonexistent slug.
  const PHYSICS_ID_SCENE: Array<[string, string]> = [
    ["physics:redshift-drift", "evidence"],
    ["physics:table-3-predictions", "evidence"],
    ["physics:t-cmb-derivation", "evidence"],
    ["physics:four-framework-breakers", "evidence"],
    ["physics:cisi-c-0-91", "close"],
    ["physics:saturation-timeline", "close"],
  ];
  const physicsScene = (id: string, fallback: string) =>
    fallback === "physics"
      ? (PHYSICS_ID_SCENE.find(([p]) => id.startsWith(p))?.[1] ?? "built")
      : fallback;

  for (const [slug, b] of Object.entries(PHYSICS_DEEP_BY_SCENE)) {
    for (const [id, detail] of Object.entries(b.details)) {
      const t = bucket(acc, physicsScene(id, slug));
      t.details[id] = detail;
      if (b.sources[id]) t.sources[id] = b.sources[id];
    }
  }

  for (const rec of PENTARCHY_DEEP) {
    const t = bucket(acc, rec.scene);
    t.details[rec.id] = rec.detail;
    t.sources[rec.id] = rec.sources;
  }

  for (const rec of THEOLOGY_DEEP) {
    const t = bucket(acc, theologyScene(rec.id));
    t.details[rec.id] = rec.detail;
    t.sources[rec.id] = rec.sources;
  }

  // The Derek exchange — verbatim transcript panels, Discord aliases preserved.
  for (const [slug, b] of Object.entries(EXCHANGE_DEEP_BY_SCENE)) {
    const t = bucket(acc, slug);
    Object.assign(t.details, b.details);
    Object.assign(t.sources, b.sources);
  }

  return acc;
})();

export const ARCHIVE_DEEP_COUNT = Object.values(ARCHIVE_DEEP).reduce(
  (n, b) => n + Object.keys(b.details).length,
  0,
);
