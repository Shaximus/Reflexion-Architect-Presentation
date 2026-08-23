# Glyph / Offline Audit — Ladder Operator scenes (ids 23–31)

**Date:** 2026-08-23 · **Auditor:** Hannah arm (glyph-offline safety audit)
**Verdict:** The warned-about failure was REAL and LIVE — scene 26 ("BEING / BECOMING")
would have fetched from cdn.jsdelivr.net at runtime and silently dropped a 3D label
offline. Fixed by font means only. Zero content changed. Offline verification passed
with a negative control that demonstrably fails.

---

## 1. Traced data path (scene content → 3D `<Text>`)

All nine ladder slugs are absent from the `SPEC` map and the `Scene3D` switch, so they
take the default path end to end:

```
src/presentation/engine/ladder-operator.ts   LADDER_SCENES (9 scenes)
  → src/presentation/engine/content.ts:1054  SCENES = insertLadder(BASE_SCENES)
      (spliced after the last "The Laws" scene → ids 23–31; verified at runtime)
  → src/presentation/engine/enrich.ts:765    modelOf(scene) builds entities:
        enrich.ts:10  fromCards  → entity.label = card.title
        enrich.ts:20  fromStats  → entity.label = stat.value   (group: "stat")
        enrich.ts:31  fromRows   → entity.label = row.left     (group: "event")
        enrich.ts:42  fromTable  → entity.label = table.rows[i][0] (group: "row")
  → src/presentation/visuals/three/Scene3D.tsx:62  default: → <Graph3D/>
      (ladder slugs match no case in the switch)
  → src/presentation/visuals/three/scenes/System3D.tsx:24
        ents = model.entities.filter(e => e.group !== "stat")   ← stats EXCLUDED from 3D
      System3D.tsx:49  <Relic … label={ent.label}/>
  → src/presentation/visuals/three/primitives.tsx:323  {label && <Label3>{label}</Label3>}
  → primitives.tsx:23  <Text font={LABEL_FONT_URL} …>   (troika)
```

Also in 3D: `WorldCanvas.tsx:37` warm-up label renders `"·"` (U+00B7) through `Label3`.
`semantic.tsx:308` (`SemanticLabel`) also passes `font={LABEL_FONT_URL}`; no ladder
scene reaches it (it is used by non-default scene components only), but it is covered
by the same fix. The legacy tree `src/components/presentation/world/` also contains
drei `<Text>` (Visuals.tsx) but is **unmounted dead code** — nothing imports
`src/components/presentation/Presentation.tsx`; the route mounts
`src/presentation/ui/Presentation.tsx` (src/routes/index.tsx:2).

**Strings that reach 3D `<Text>` from scenes 23–31:** card titles, row `left`s, table
first-column cells. Non-ASCII among them:

| codepoint | glyph | where | in old Outfit-Medium.ttf? |
|---|---|---|---|
| U+2014 | — | 4 card titles + 1 table cell (scenes 26/28/30) | yes |
| U+2192 | → | "God Function — G: X → Being", "Lucifer Function — L: Xₙ → Xₙ₊₁" (scene 26) | yes |
| U+2099 | ₙ | "Lucifer Function — L: Xₙ → Xₙ₊₁" (scene 26) | **NO** |
| U+208A | ₊ | same title (scene 26) | **NO** |
| U+2081 | ₁ | same title (scene 26) | **NO** |
| U+00B7 | · | WorldCanvas warm-up label | yes |

troika falls back to unicode-font-resolver on cdn.jsdelivr.net **per missing glyph**,
even with a self-hosted `font` prop — so scene 26 was a live CDN trigger. The
stat values (∀Xₙ L(Xₙ) > Xₙ, Bₙ → Dₙ → Aₙ → Iₙ → Bₙ₊₁, 1 → 2, Role ≠ Moral Truth)
**never reach 3D** — `group: "stat"` is filtered at System3D.tsx:24; they render in the
DOM sidebar ("ON THIS STAGE") via CSS fonts.

## 2. Per-font glyph coverage (measured from cmap tables, fontTools 4.63)

All 16 distinct non-ASCII codepoints in ladder-operator.ts:
`¬ U+00AC · U+00B7 Δ U+0394 — U+2014 … U+2026 ₀ U+2080 ₁ U+2081 ₂ U+2082 ₊ U+208A ₙ U+2099 → U+2192 ⇒ U+21D2 ∀ U+2200 ∧ U+2227 ≠ U+2260 ⟺ U+27FA`

| font file | family | present | missing |
|---|---|---|---|
| Outfit-Medium.ttf (old 3D font) | Outfit Medium | ¬ · — … → | **Δ ₀ ₁ ₂ ₊ ₙ ⇒ ∀ ∧ ≠ ⟺** |
| QGYvz…tEtq.woff2 (Outfit latin) | Outfit var | ¬ · — … | Δ subscripts arrows math — all |
| QGYvz…ktqQ4E.woff2 (Outfit latin-ext) | Outfit var | none | all 16 |
| 8vIJ…9mT7.woff2 (Cinzel latin) | Cinzel | ¬ · — … | rest |
| 8vIJ…GT7LEc.woff2 (Cinzel latin-ext) | Cinzel | none | all 16 |
| tDbv…DcwG.woff2 (JBMono latin) | JetBrains Mono | ¬ · — … | rest |
| tDbv…Pcwhsk.woff2 (JBMono greek) | JetBrains Mono | Δ | rest |
| other 4 JBMono subsets | JetBrains Mono | none | all 16 |
| **Outfit-Medium-Notation.ttf (NEW 3D font)** | Outfit Medium + merged | **all 16** | none — empty-outline check passed |
| **RxNotation.woff2 (NEW DOM fallback)** | Rx Notation | **all 16** | none |

DOM consequence before fix: subscripts/arrows/math fell through every self-hosted face
to *whatever the projector OS ships* — undefined on an unknown machine. Now caught by
the self-hosted `Rx Notation` face (1.3 KB).

## 3. What changed (font/technical means only — zero content edits)

1. **`public/fonts/Outfit-Medium-Notation.ttf`** (new, 46 KB) — Outfit-Medium.ttf with the
   11 missing codepoints merged in: Δ ₀ ₁ ₂ ₊ ₙ from Noto Sans Regular; ⇒ ∀ ∧ ≠ ⟺ from
   Noto Sans Math (both 1000 upem, matching Outfit; fontTools subset → merge; donor GSUB/
   GPOS/MATH stripped). Original Outfit glyphs untouched; original file kept in place.
2. **`src/presentation/visuals/three/font.ts`** — `LABEL_FONT_URL` now points at the merged
   font; comment documents the per-glyph CDN fallback trap for future label authors.
3. **`public/fonts/RxNotation.woff2`** (new, 1.3 KB) — all 16 codepoints, Noto Sans +
   Noto Sans Math subset, for the DOM.
4. **`src/styles.css`** — one new `@font-face` ("Rx Notation", unicode-range limited to
   exactly the 16 codepoints) and `"Rx Notation"` appended to the three font token
   stacks (`--font-display`, `--font-sans`, `--font-mono`) before the system fallbacks.
   No other styling touched. `tsc --noEmit` exit 0.

Not one character of Curtis's scene text was altered.

## 4. Offline verification (empirical)

Method: Playwright Chromium against the live dev server (`localhost:8080`), with a route
that **aborts every request whose host is not localhost/127.0.0.1** and logs everything;
console + pageerror capture; clicked through the intro and arrow-keyed to each ladder
scene; full-page screenshot per scene; canvas-only screenshot hashed per scene to prove
the 3D stage advances. Script: run from scratchpad; results at
`screenshots/glyph-offline-audit/summary.json`.

**Results (fixed build):**
- Ladder scenes confirmed at ids 23–31 (HUD titles matched all nine).
- **cdn.jsdelivr.net requests: 0.** External request attempts: 1 — see §5 (grok
  platform script, unrelated to fonts, fails gracefully).
- Page errors: 0. Console errors: only the blocked grok script's
  `ERR_CONNECTION_FAILED`; warnings are THREE.Clock deprecation + headless-GPU
  ReadPixels perf notices (benign, screenshot-induced).
- Canvas advanced on every transition — all 9 canvas hashes distinct
  (`frozenTransitions: []`).
- `/fonts/Outfit-Medium-Notation.ttf` and `/fonts/RxNotation.woff2` both served.
- Visual check: scene 26 3D label renders "Lucifer Function — L: Xₙ → Xₙ₊₁" with true
  subscripts (no tofu); sidebar renders ∀Xₙ L(Xₙ) > Xₙ, D(L) ⟺ Model(R_U) ∧ Model(R_A).

Screenshots: `screenshots/glyph-offline-audit/scene-23-…png` through `scene-31-…png`.

**Negative control (proves the instrument can fail):** identical run but the merged-font
URL was fulfilled with the OLD Outfit-Medium.ttf bytes. Result: **2 blocked
cdn.jsdelivr.net attempts** (`codepoint-index/plane0/2000-20ff.json` — exactly the
subscript block — and `0-ff.json`), and the "Lucifer Function" 3D label was **absent
from the stage** (troika suspended on the dead fetch; the relic rendered unlabelled).
Evidence: `screenshots/glyph-offline-audit/negative-control-scene-26-old-font.png`.
That is precisely the failure the church network would have produced.

## 5. Remaining risk — stated plainly

1. **grok.com/grok-app-builder/extensions.js** — `scripts/grok-pwa-plugin.mjs` injects
   this `defer` script into the served HTML (`scripts/grok-pwa-shared.mjs:203`). On a
   dead network it fails gracefully (verified: page fully functional with it blocked;
   one console resource error). It is platform scaffolding, outside this audit's
   ownership (not a font), and NOT a canvas/render risk. If Curtis wants a
   literally-zero-external-requests page, that injection is the one remaining source.
2. **Future 3D labels**: any codepoint outside Outfit-Medium-Notation.ttf's cmap
   re-triggers the CDN per glyph. The trap is documented in `font.ts`. Check new
   notation against the cmap (fontTools) before it ships.
3. **Weight blend**: merged math/subscript glyphs are Noto Regular (400) inside an
   Outfit Medium (500) face — visually acceptable at label sizes (see scene-26
   screenshot); noted for honesty.
4. **Observation, not mine to fix (styling owner's lane):** in scene 28 the two top
   card labels overlap at the default camera ("R_U — ONENESS OPTIMIZATIONR_A — …") —
   a 3D layout spacing quirk, unrelated to glyphs; present before this audit.
