# Legibility & Positioning Audit — The Architect (34 scenes)

**Audit date:** 2026-08-23, ~01:15. **Conditions:** live dev server (`npm run dev`, port 8080), Chromium via Playwright.
**Passes:** 1920×1080 in 3D and 2D modes (all 34 scenes each), 1280×720 in 3D and 2D modes (all 34 scenes each), intro screen both sizes, plus click-through probes of selected-entity state on scenes 23, 29, 30.
**Screenshots:** `/tmp/claude-1000/-home-shax-Projects-core-tech-PentaCLI-Hannah-Hannah6/25f900f5-3375-460d-851a-eb1183799dfe/scratchpad/shots/` — files `s1080-3d-NN.png`, `s1080-2d-NN.png`, `s720-3d-NN.png`, `s720-2d-NN.png` (NN = scene id 00–33), `probe-*.png`, machine diagnostics in `diagnostics.json`.
**Constraint honoured:** no source file was modified; no claim wording is questioned. All findings are layout/typography/structure facts.

Severity: **S1** breaks the presentation (invisible/clipped/truncated content, scrolling required) · **S2** visibly poor projected · **S3** polish.

---

## The one structural fact that drives most S1 findings

The nine scenes added for Act IV (ids 23–31, `ladder-operator.ts`) are routed through **generic fallbacks**, not through the purpose-built renderers the rest of the deck uses:

- `src/presentation/visuals/Stage.tsx:74` switches on `model.slug`. None of the nine new slugs (`image-paradox`, `role-paradox`, `ladder-operator`, `being-becoming`, `parity`, `second-path`, `bifurcation`, `role-recursion`, `higher-law`) has a case, so they all hit `default:` (Stage.tsx:223) → bare `Graph` (title-only boxes). The scenes' `visual` fields (`"diagram"`, `"flow"`, `"cards"`) are never consulted.
- Same in 3D: `src/presentation/visuals/three/Scene3D.tsx` default → `Graph3D` (`System3D.tsx:20`), unlabeled colored slabs with floating titles.
- `src/presentation/engine/enrich.ts:766` gives them the fallback spec `{ renderer: "diagram", hint: "Click a node." }` — no steps, no edges, no layout.

**Consequence:** every paragraph card body, both 2D tables, and all header semantics in scenes 23–31 are invisible on the stage. The only place body text appears is the 352 px right sidebar (`Inspector.tsx`), and only after the presenter clicks a node. Scene 32 (`genesis` → `CardGrid`) and scene 20 (`governor` → `GovernorLadder`) prove the deck already has renderers that display card bodies beautifully — the new scenes simply never route to them.

---

## Per-scene findings

Line refs: `C` = `src/presentation/engine/content.ts`, `L` = `src/presentation/engine/ladder-operator.ts`. Words = total scene text word count.

| id | slug | words | sev | findings |
|----|------|-------|-----|----------|
| 0 | title | 27 | — | Clean at both sizes (`s1080-3d-00`). |
| 1 | character | 109 | S3 | 3D: CLASS panel overlaps CHA bar slightly; sidebar stat buttons show raw values ("5,000,000+", "3 Patents") without context. Clean otherwise. C33–61. |
| 2 | event | 94 | S3 | 3D timeline clean (`s1080-3d-02`). 720p: sidebar needs 70 px scroll (footerless scene, only hint/quote hidden partially). C63–108. |
| 3 | vm | 128 | S3 | 3D shells clean. 720p sidebar +67 px scroll. C109–143. |
| 4 | earth | 242 | S2 | Highest word count outside the new act. 2D EarthBoard shows only card titles+subtitles — all 16 body lines (C158–198) are click-only. 720p sidebar +111 px scroll. Fine at 1080. |
| 5 | toolkit | 132 | S3 | 3D orbit: "5D" sphere label half-hidden behind the central white orb (`s1080-3d-05`). 2D table is excellent — this is the scene to present in 2D. C211–225. |
| 6 | arcs | 93 | **S1 (720) / S2 (1080)** | 2D ArcsMap overflows its container vertically: at 1080 the CURTIS lane is cut mid-band (its stage chips and the 2022-threshold band clipped, `s1080-2d-06`); at 720 the JIN-WOO lane annotation collides with the CURTIS heading and rows clip mid-card (`s720-2d-06`). Sidebar scrolls at both sizes (+26 px @1080, +177 px @720) — "2022" and "SUNG JIN-WOO" buttons below fold at 720. Content lives in `arc-lanes.ts`; container is the issue, not the text. |
| 7 | built | 129 | — | 3D constellation clean (`s1080-3d-07`). BCC Engine slab is title-above-box like all Relics — bodies click-only (C272–330), acceptable here since 6 nodes carry the message. |
| 8 | convergence | 145 | S2 | 2D graph: edge labels collide with node boxes — "mapped" cut by the January-2026 box, "extraction"/"same day" strike through The Signals / May-2026 boxes (`s1080-2d-08`). The 8 dated rows' right-hand content (C341–348) never renders on stage (subtitle >18 chars is dropped by `Graph.tsx:93`); dates alone show. |
| 9 | ask | 151 | S3 | 2D CardGrid shows only first 2 of 4 lines per card (present-mode cap); lines 3–4 of each ask (C382–414) click-only. Layout itself clean. 720p sidebar +28 px. |
| 10 | evidence | 125 | S3 | 2D table excellent; VERDICT pills end at ~1250 px leaving a dead right margin (S3). Footer legend (C444) only in sidebar. 720p sidebar +21 px. |
| 11 | fusion | 214 | S3 | 2D FusionFields: "Ultra Instinct — The Sky" title wraps with "Sky" jammed against the subtitle line (`s1080-2d-11`). All card bodies (C461–495, up to 124 chars/line) click-only. 720p sidebar +27 px. |
| 12 | auris | 129 | S2 | 3D: label pile-up at stack centre — "Novelty", "SOMATIC", "Dominance" overprint each other; "AUDIO" caption clipped by the waveform (`s1080-3d-12`). 2D AurisPipe is the safe mode. C507–555. |
| 13 | irtg | 191 | S3 | 2D mapping table renders all 12 rows cleanly at 1080 (`s1080-2d-13`). 720p: sidebar +138 px scroll. Table itself still fits at 720. C566–581. |
| 14 | planets | 130 | S3 | 3D ring clean. Card bodies incl. patent number (C599–623) click-only. 720p sidebar +110 px. |
| 15 | canon | 162 | S2 | 2D graph: three edge labels sliced by node boxes — "→ mo…" behind Wisdom System, "…ted u…" behind Command Ascension, "…s audi…" behind Auris (`s1080-2d-15`). Labels are load-bearing law-names (enrich.ts:477–483). 720p sidebar +110 px. |
| 16 | sunday | 126 | S3 | 2D SundayBoard is one of the strongest layouts in the deck (`s1080-2d-16`). SUN-3 label (C731, 55 chars) fits. 720p sidebar +62 px. |
| 17 | gate | 108 | S3 | Clean in both modes; card bodies (C746–770) click-only but the 3-step flow reads. |
| 18 | lod | 121 | S3 | 2D pyramid excellent (`s1080-2d-18`). "Six Tiers" card's 6 lines (C787–794) click-only. 720p sidebar +93 px. |
| 19 | governor | 155 | — | 2D GovernorLadder is the best dense-text layout in the deck — 4 state chips + 3 full-body cards, everything visible (`s1080-2d-19`). Model for fixing scenes 23–31. |
| 20 | cascade | 85 | S3 | 2D stack clean; Doctrine Packet card shows 1 of its 3 lines (C878–883). |
| 21 | ear | 112 | S3 | Clean at 1080. 720p: kicker (C892, 93 chars) renders as a single >90-char line — the only measured >90 cpl body-text offender. |
| 22 | referee | 148 | S3 | 2D RefereeBoard clean. The LAYER/OWNS table (C952–960) does not render as a table anywhere; rows appear only as sidebar buttons ("Grok / Apex Intelligence" etc.) with the OWNS column click-only. 720p sidebar +86 px. |
| **23** | **image-paradox** | 157 | **S1** | **Stage shows three empty rectangles** (titles floating above blank boxes in 3D; three outlined title-only boxes in 2D — `s1080-3d-23`, `s1080-2d-23`). The scene's entire argument — the three formal card bodies at L41 (210 chars), L48 (199 chars), L55 (213 chars) — renders nowhere on stage. Bodies appear only in the 352 px sidebar after clicking (probe-23-selected.png): a 210-char paragraph in a rail sized for ~40 chars/line, 4 lines of 15 px text at 9 m viewing distance. Bottom two-thirds of the stage is dead. GUARDRAIL footer (L22–24, 172 chars) sidebar-only. Math `I(C₂,C₁) ∧ S(C₁) ⇒ S(C₂)` renders via system-font fallback in HTML (see glyph section). |
| **24** | **role-paradox** | 238 | **S1** | Card title **"When Improvement Becomes Pointless" (L79) renders as "When Improvement Becomes" — "Pointless" is silently deleted** by the 3-line cap in `Graph.tsx:185` (`wrapText().slice(0,3)`), inverting the title's reading. Stat "Role ≠ Moral Truth" (L93) sidebar-only, ≠ in fallback face. All three card bodies (L75: 244 chars; L82: 156; L89: 213) invisible on stage. The three rows (L95–97) render as title-only boxes; their right-hand text never displays (>18-char subtitles dropped). Footer (L99, 172 chars) sidebar-only. Six boxes cluster in the left half; right half of stage empty. |
| **25** | **ladder-operator** | 124 | **S1/S2** | The two stats that ARE the scene — `∀Xₙ  L(Xₙ) > Xₙ` (L117) and `1 → 2` → `X₀ → X₁ → X₂ → …` (L118) — never render on stage (stats are filtered from Graph and Graph3D). They appear only as sidebar buttons. The four rows' right-hand content (L111–114, incl. the operator definition `L(Xₙ) → Xₙ₊₁ …`) is invisible; the stage shows four boxes reading "Static reading / Operator reading / Terminal sovereign / The invariant" with nothing else (`s1080-2d-25`). Phantom-gap layout: one box floats top-right alone because the two invisible stats occupy grid slots (enrich.ts:756 layout computed over 6 entities, 4 rendered). |
| **26** | **being-becoming** | 120 | **S1** | **Literal tofu in 3D:** the floating label renders "Lucifer Function — L: X□ → X□□□" — subscripts ₙ ₊ ₁ (L138) are .notdef boxes in the troika label font (`s1080-3d-26`; `three/font.ts:17` Outfit-Medium.ttf has no subscript glyphs, and troika has no fallback chain offline). Card bodies (L135, L140, L145 — up to 193 chars) invisible on stage. Compressed-law stat (L148) sidebar-only. Top-heavy 2D: 3 boxes on one row, lower two-thirds dead. |
| **27** | **parity** | 137 | **S1** | 2D node text overflows its boxes: "You told me everything was One." spills past both box borders; **"I became capable of rejecting your answer completely." (L181) renders as "I became capable of rejecting your" — truncated mid-clause** by the 3-line cap, and still overflows the box (`s1080-2d-27`). The four-line emotional sequence (L179–182) loses its right-column glosses except "sovereignty" (only subtitle <18 chars). Card bodies (L163: 226 chars; L168: 167; L173–175 incl. `AuthenticOneness(A,B) ⇒ …`) invisible on stage. Attribution `P(L) = P(G)` (L156) sidebar-only. Huge dead band mid-stage. |
| **28** | **second-path** | 162 | **S1** | The two long card subtitles that define the paths (L197, L205 — 61 and 63 chars) are dropped everywhere on stage (>18-char cutoff). The two card bodies — the longest strings in the deck (L200: 261 chars; L208: 240 chars) — invisible on stage; sidebar-only after click. Dual-Vision attribution `D(L) ⟺ Model(R_U) ∧ Model(R_A)` (L191) sidebar-only, glyphs in fallback face. Five title-only boxes + dead right half (`s1080-2d-28`). Scene's `visual: "cards"` is ignored (Stage.tsx routes by slug). |
| **29** | **bifurcation** | 192 | **S1** | **The 4-column comparison table (L227–235) — the scene's core — never renders as a table anywhere.** DataTable is only reachable for slugs `toolkit`/`evidence` (Stage.tsx:121,139). On stage: two title-only boxes on an empty field (`s1080-2d-29`). Worse, `enrich.ts:47` (`fromTable` → `subtitle: row.slice(1).join("  ·  ")`) **concatenates the ONENESS column and the ARMAGEDDON column into one undifferentiated string** — probe-29-engine.png shows "Synthesis · trust · … · collective memory · Adversarial training · red teaming · …" as a single list, erasing the two-regimes distinction; headers "ONENESS R_U" / "ARMAGEDDON R_A" (L228) are discarded entirely (`fromTable` never reads `headers`). Card bodies (L240: 225 chars; L245: 193) invisible on stage. |
| **30** | **role-recursion** | 330 | **S1** | Densest scene in the deck (330 words) and the most broken. (a) 2D: the three card boxes **physically overlap** and the first title clips to "Armageddon A…" at the box edge (`s1080-2d-30`; cause: `Graph.tsx:29` computes box width from the 3 rendered cards (w=28) while `enrich.ts:761` spaced the grid for 7 entities (dx=24) — boxes wider than the pitch). (b) 3D: seven slabs with colliding, mutually-overprinting long labels; the hero/villain row-text overlaps "The Wound Underneath" and clips mid-sentence (`s1080-3d-30`). (c) **Sidebar overflows even at 1920×1080** — scrollHeight 1019 vs 865 (+154 px): the last stage button clips mid-label ("What happens when the mob realises it is…") and the footer (L290–291) is entirely below the fold; at 720p overflow is +306 px, only 3 of 7 buttons visible (`s720-2d-30`). (d) The obligation TABLE (L281–289) never renders as a table; its four rows surface only as sidebar buttons whose IN-THE-ARENA column is click-only. (e) Card bodies (L263: 287 chars; L270: 260; L277: 233) invisible on stage. |
| **31** | **higher-law** | 202 | **S1/S2** | The ascension-cycle stats — `Bₙ → Dₙ → Aₙ → Iₙ → Bₙ₊₁` and `Bₙ₊₁ > Bₙ` (L303–304) — never render on stage; sidebar-only, subscripts in fallback face (would tofu in 3D if they did render). The 5-step causal chain rows (L306–312) render as five title-only boxes; only "Parity" keeps its gloss ("creates choice" is the sole subtitle <18 chars) — inconsistent hierarchy, the other four look mute (`s1080-2d-31`). "Reconciliation" text overflows its box on both sides. Card bodies (L318: 259 chars; L325: 250) invisible on stage. Combined footer (L329: "There is always another rung. · " + 172-char GUARDRAIL) sidebar-only, +147 px sidebar scroll at 720. Top row shows 2 boxes + 2 phantom gaps (invisible stats hold grid slots). |
| 32 | genesis | 157 | S3 | 2D CardGrid works: full bodies visible (`s1080-2d-32`) — proof the deck can render the ladder scenes properly. Cards are ~80 % empty below their 2–4 lines; big dead zone bottom half (S3 vertical balance). 720p sidebar +95 px. C963–1002. |
| 33 | close | 142 | S3 | 2D CloseCircuit strong: quote banner, 3 stat tiles, 3 full-body cards (`s1080-2d-33`). Stat `C ≈ 0.91` (C1046) renders fine in HTML. Cards ~70 % empty below content (S3). 720p sidebar +98 px. |

---

## Cross-cutting findings

### G1 — Unrendered-glyph risk (S1 confirmed in 3D, S2 latent in HTML)
- **Confirmed tofu:** 3D troika labels use `/fonts/Outfit-Medium.ttf` only (`three/font.ts:17`, deliberately offline-safe, no CDN fallback). Outfit has **no subscript glyphs**: scene 26's 3D label shows `X□ → X□□□` for `Xₙ → Xₙ₊₁` (`s1080-3d-26`). Any ladder string containing ₙ ₊ ₀ ₁ ₂ that reaches a 3D label will tofu. `→` does exist in Outfit (renders).
- **Latent HTML risk:** the self-hosted webfont subsets (`src/styles.css:9–77`) cover only latin + latin-ext + U+2000-206F (+↑↓−∕). They do **not** cover ∀ (U+2200), ∧ (U+2227), ¬ (U+00AC is covered), ≠ (U+2260), ⇒ (U+21D2), ⟺ (U+27FA), → (U+2192), ↔, ≈, or subscripts (U+2080-209F). Every math glyph in the sidebar is therefore rendered by the OS fallback font. On this Linux audit box they render (DejaVu), with a visible face mismatch (subscripts drop to a serif-ish face inside Outfit text — see `s1080-2d-26` sidebar). **On the presentation laptop this is untested**; a Windows/macOS fallback will usually cover ∀∧≠⇒→ but subscript coverage varies by font stack. Affected strings: L41, L48, L111–118, L138, L148, L156, L174, L191, L303–304; also C1046 (`C ≈ 0.91`). Note `document.fonts.check()` returned true for all — that check cannot fail for fallback-covered chars and proves nothing; the screenshots are the evidence.

### G2 — Present-mode sidebar scrolling (S1 where flagged)
`Inspector.tsx:121` (`overflow-y-auto`) means overflow is silently hidden. Machine-measured overflow (scrollHeight − clientHeight):
- **1920×1080:** scene 6 (+26 px), scene 30 (+154 px — footer and last rows unreachable without scrolling mid-presentation).
- **1280×720:** 25 of 34 scenes overflow: 2 (+70), 3 (+67), 4 (+111), 5 (+65), 6 (+177), 9 (+28), 10 (+21), 11 (+27), 12 (+24), 13 (+138), 14 (+110), 15 (+110), 16 (+62), 18 (+93), 22 (+86), 23 (+30), 24 (+160), 25 (+96), 27 (+64), 29 (+141), 30 (+306), 31 (+147), 32 (+95), 33 (+98). Anything below the fold (usually the scene footer and later "On this stage" buttons) is invisible on a 720p projector.

### G3 — Silent truncation in the 2D Graph renderer
`Graph.tsx:185` caps node titles at 3 wrapped lines with **no ellipsis** (words silently vanish: scenes 24, 27); `Graph.tsx:93` drops any node subtitle ≥18 chars (all ladder row/table content); `Graph.tsx:78` truncates edge labels at 22–28 chars; wrapped lines up to ~20 chars exceed the 21–28-unit box width → text spills borders (27, 31) and boxes can overlap when visible-node count ≠ layout count (30).

### G4 — Table semantics destroyed in fallback path
`enrich.ts:42–52` reduces any `scene.table` to entities where `label = row[0]`, `summary = row.slice(1)`, `subtitle = cells joined by "·"`, **headers discarded**. Harmless for toolkit/evidence (which route to `DataTable`), destructive for bifurcation (L227) and role-recursion (L281) which have no DataTable route: opposing columns merge into one list (probe-29-engine.png).

### G5 — Density (speaker-reads-a-wall risk)
Word counts ≥200: scene 30 (330 — also the most visually broken), 4 (242), 24 (238), 11 (214), 31 (202); near: 29 (192), 13 (191). For 4, 11, 13 the built renderers cope (bodies click-gated or tabular). For 24, 29, 30, 31 the density lands in a 352 px sidebar or nowhere.

### G6 — Reading order / hierarchy on ladder scenes
On scenes 23–31 the eye lands: title → kicker → **three glowing empty boxes** → sidebar. The stage (72 % of the width) carries near-zero information, while quote, attribution, footer, stats, and bodies all compete inside the one narrow rail with 4 type styles stacked (thesis, crimson quote, muted attribution, dim footer). In selected state the quote/kicker vanish and the rail is ~65 % empty below one paragraph (probe-23-selected.png). Hierarchy inside the rail is fine; the stage/rail information balance is inverted.

### G7 — 720p-only breakages
- Scene 6 (arcs): lane collision + clipping (S1 at 720; S2 at 1080 — CURTIS band already clipped there).
- Scene 21: kicker exceeds 90 chars/line (measured >90 cpl, the only body-text CPL offender; at 1080 `max-w-2xl` keeps kickers ≈72 chars).
- Sidebar overflow generalises (G2 list).
- Scene 30 box overlap becomes title-clipping overlap (`s720-2d-30`).
No scene requires *page* scrolling at either size (`h-dvh overflow-hidden` holds); all overflow is inside the stage container or the sidebar.

---

## Prioritised fix list (typographic/structural only — zero wording changes)

**P0 — the ladder section is currently a row of empty boxes (fixes 9 × S1)**
1. Route scenes 23–31 to content-bearing renderers instead of the Graph fallback: either add slug cases in `Stage.tsx:74ff` (and `Scene3D.tsx`) or honour the existing `scene.visual` field ("cards" → `CardGrid` as used by genesis at Stage.tsx:218; "diagram"/"flow" → a GovernorLadder/CardGrid-style layout as at Stage.tsx:193). Scene 19 (governor) and scene 32 (genesis) are in-repo proof both patterns display full card bodies well.
2. Give `bifurcation` (L227) and `role-recursion` (L281) a real table route (reuse `DataTable`, Stage.tsx:122) so the 4-column comparison and the obligation table render with their headers. This also fixes the column-merging corruption (G4) without touching a word.
3. Render stats on the ladder scenes (they carry the formal law): `DataTable`-style stat strip or the stat tiles used by scene 33 (`CloseCircuit`). Today `∀Xₙ L(Xₙ) > Xₙ`, `Bₙ → Dₙ → …` never reach the stage.

**P1 — truncation and clipping**
4. `Graph.tsx:185`: raise/remove the 3-line cap or add ellipsis + auto-shrink so no title silently loses words ("Pointless", "answer completely.", "Armageddon AS"). Widen node boxes (or wrap at box-width-aware char count) so wrapped lines stop spilling borders (scenes 27, 30, 31).
5. Fix the box-width/pitch mismatch that overlaps boxes on scene 30: compute `defaultLayout` (enrich.ts:756) over the same filtered entity set Graph renders, or derive `w` from layout pitch.
6. Sidebar overflow (G2): at minimum for scene 30 at 1080 — the footer must be visible without scrolling. Structural options: move scene `footer` out of the scroll region, tighten rail vertical rhythm, or cap "On this stage" list with an explicit "+N more" affordance instead of silent clip. Re-verify the 720 list afterwards.
7. Scene 6 ArcsMap: make lanes fit the container at 1080 and 720 (scale rows or internal scroll-free compaction) — CURTIS band is clipped at 1080, colliding at 720.

**P2 — glyph safety before Sunday**
8. 3D tofu (scene 26 label, and any future 3D use of ladder strings): either supply a troika font containing subscripts (e.g. a DejaVu/Noto Sans Math .ttf alongside Outfit for label use) or keep math strings off 3D labels (routing fix #1 largely does this).
9. HTML math glyphs currently depend on the presentation laptop's OS fallback (G1). Zero-risk structural fix: add one self-hosted math-capable face (subset of Noto Sans Math / DejaVu covering U+2190-22FF, U+2070-209F, U+27F0-27FF) at the end of the body font stack in `styles.css`. **At minimum: open scenes 25–28 and 31 on the actual presentation laptop before 9 am Sunday and look at ∀ ⇒ ⟺ ∧ ≠ ₙ ₊ ₁.**
10. Edge-label/box collisions on scenes 8 and 15 (labels sliced mid-word behind node boxes): raise label z-order with the existing paint-order stroke, or offset anchors clear of boxes.

**P3 — polish**
11. Scene 5 "5D" label occluded by central orb (3D).
12. Scene 12 3D centre label pile-up (Novelty/SOMATIC/Dominance overprint; AUDIO clipped) — 2D mode is clean; either fix offsets or prefer 2D for this scene.
13. Scene 11 "Ultra Instinct — The Sky" title/subtitle crowding in FusionFields.
14. Scene 21 kicker at 720 exceeds 90 chars/line — tighten the kicker max-width at small heights.
15. Genesis/close cards ~70–80 % empty below content — vertical centring or tighter card height would balance the bottom half.
16. Consider setting `preferredVis` per ladder scene once routed (they default to "3d" via enrich.ts:798); note the deck also *persists* the last-used vis mode in localStorage, so the presenter should confirm the intended mode per scene during rehearsal.

**Presenter-facing note (no code):** in present mode, card bodies only ever appear after clicking a node, and only the first 2 summary lines for multi-line cards (`Inspector.tsx:204`). For scenes 4, 9, 11, 20 the click-through is part of the design; for 23–31 it is currently the *only* path to the entire argument.

---

*Machine evidence: `diagnostics.json` in the shots directory holds per-scene overflow measurements (aside scrollHeight/clientHeight, horizontal-overflow element list, >90-cpl measurements) for all four passes, plus per-scene word counts. Console/page errors during all passes: zero.*
