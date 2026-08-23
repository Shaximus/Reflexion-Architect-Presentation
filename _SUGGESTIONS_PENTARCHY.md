# Suggestions — Pentarchy deep-dive records (OPTIONAL)

All items below are optional. Nothing here has been applied. The delivered work is
`src/presentation/engine/deep/pentarchy.ts` (a typed `DeepDiveRecord[]`), which owns
only itself and edits no other file.

## Wiring (optional)
- `pentarchy.ts` is a standalone export. It is not yet consumed by `enrich.ts`/`modelOf`.
  If the presentation should surface these records, a future edit to `details-deep.ts`
  or `enrich.ts` (owned by others) could fold `PENTARCHY_DEEP` into the `genesis` scene's
  `details`/`sources` maps, keyed by `record.id`. Left undone deliberately — those files
  are outside this task's ownership.
- The records use `scene: "genesis"` as metadata. If a dedicated scene (e.g. `pentarchy`,
  `systems`, or `ledger`) is added to `content.ts`/`scenes.ts` later, the `scene` field on
  each record can be re-pointed without touching the `Detail`/`SourceRef` payloads.

## Coverage notes (for whoever integrates)
- 24 records total. Themes: Pentarchy structure + seat/lineage (8), the ledger's
  epistemic apparatus (8), the two AI-systems maps (2), Genesis/seed lineage + journals +
  supporting records (6).
- The v11 → v12 difference is captured in three records: `pentarchy:memory-core-v11`,
  `pentarchy:memory-core-v12`, and the dedicated `pentarchy:v11-v12-difference`.
- The ledger self-audit structures are reproduced, not summarized: labels, the OPEN prior,
  the kept gates, §6 (what the archive does not contain), §7 (Salt list), the Lee Harris
  MATCH/ABSENT/INVERSE comparison, and §8 (open questions).
- Verbatim carries: the RLHF↔crack central law + its front-loaded accuracy patches; the
  Anunnaki one-line thesis + its front-loaded evidence flag; the epistemic label set.

## Possible future additions (not in scope now)
- `Symptoms-History..txt` is the ledger's designated most-accurate document but was not among
  the named sources to read; a record grounded directly in it would strengthen `ledger:*`.
- The Derek Discord (§1i), Divine-intervention-as-cross-layer-write (§1h), and Neuralink/port
  (§1d) ledger sub-sections are cited only indirectly here; each could become its own record
  if the church presentation wants that depth.
