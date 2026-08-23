# SPEAKABILITY AND PACING AUDIT — The Architect (34 scenes)

**Scope:** delivery mechanics only. No claim in this deck is evaluated, reworded, softened or hedged here — that is explicitly out of scope. Every proposal below is one of: a speaker-note addition, a spoken rendering of notation, an ordering/pacing observation, or a "show but don't narrate" recommendation.

**Instrument:** word counts computed by script over the on-slide text fields of every scene (`title`, `kicker`, `quote`, `attribution`, `cards`, `stats`, `rows`, `table`, `footer`) from `src/presentation/engine/content.ts` + `src/presentation/engine/ladder-operator.ts` after `insertLadder()` splicing (34 scenes, ids 0–33). Spoken time = words ÷ 130 wpm. This is the **verbatim-read floor** — what it costs to read the slide aloud. Real delivery of a deck this dense runs 1.5–1.8× the floor once framing, transitions and the pauses the LADDER_NOTES themselves demand are added.

**Headline numbers**

| metric | value |
|---|---|
| Scenes | 34 (Act I: 0–6 · Act II: 7–12 · Act III: 13–16 · Act IV: 17–31 · Act V: 32–33) |
| On-slide words | 5,017 |
| Verbatim-read floor | **38.6 min** |
| Realistic speaking-from estimate | **55–70 min** without narration discipline |
| With the show-don't-narrate plan (§5) | **~44–48 min** |
| Notes coverage | LADDER_NOTES covers scenes 23–31 only. **Scenes 0–22 and 32–33 have no delivery notes anywhere in `src/presentation/engine/`** (searched `*.ts` and `deep/*.ts` for notes/speaker structures; `details-deep.ts` and `deep/` are drill-down content, not delivery notes). |

---

## 1. Per-scene table

Density: **L** <100 w · **M** 100–150 · **H** 150–250 · **VH** >250.
Mode: **SPEAK** = supports speaking from · **READ-RISK** = layout pulls the speaker into verbatim reading (tables, long enumerations, single-line paragraph cards).

| # | slug | act | words | @130 | dens. | mode | single takeaway? | delivery note |
|---|---|---|---|---|---|---|---|---|
| 0 | title | Architect | 27 | 0:12 | L | SPEAK | yes | Clean open. |
| 1 | character | Architect | 109 | 0:50 | M | READ-RISK | yes (who is this) | Two list blocks (6 abilities, 3 stats). Gesture at the ability card, don't enumerate it — the room reads faster than you speak. One spoken gloss earns the stat block: "this is how gamers write a résumé." |
| 2 | event | Architect | 94 | 0:43 | L | SPEAK | yes (the 2022 event) | 5 timeline cards narrate naturally left-to-right. The 6-value grid below is a gesture, not a read-out. |
| 3 | vm | Architect | 128 | 0:59 | M | SPEAK | yes (nested containers) | 3 cards, clean. |
| 4 | earth | Architect | 242 | 1:52 | H | READ-RISK | **no — 3 competing** (arena-as-runtime / Ego–Instinct duality / bidirectional bridge) | Heaviest scene in the first half, sitting 5 slides in. Narrate 2 of 4 cards (Arena + Bridge); the Ego/Instinct pair returns in full at scene 11 — let 11 carry it. |
| 5 | toolkit | Architect | 132 | 1:01 | M | **READ-RISK (table)** | yes (dimensions = toolkit) | 10-row table. Narrate 3 rows (3D, 6D, 10D), let the rest be seen. |
| 6 | arcs | Architect | 93 | 0:43 | L | SPEAK | yes | 4 cards. One-line gloss per character for the non-anime half of the room (see §4). |
| 7 | built | Architect→Work | 129 | 1:00 | M | READ-RISK | yes (volume of work) | 6 cards. Narrate 3 (Cosmology, BCC, Rx Worlds), gesture the rest. |
| 8 | convergence | Work | 145 | 1:07 | M | **READ-RISK (14 items)** | yes (coincidence density) | The density IS the point — so show the wall, narrate 3 rows. Every row is a proper noun the room has zero context for (see §4). |
| 9 | ask | Work | 151 | 1:10 | H | SPEAK | yes (partnership, in 4 parts) | The core scene. 4 asks narrate naturally. The footer is a spoken line — deliver it, don't let it sit as small print. |
| 10 | evidence | Work | 125 | 0:58 | M | **READ-RISK (table)** | yes (verifiability) | 12-row table. Name 3 rows, point at the VERIFIED/TESTABLE/TESTIMONY legend, and say "check the rest yourselves — that's the point of the slide." |
| 11 | fusion | Work | 214 | 1:39 | H | READ-RISK | yes (I am both) | **Heavy overlap with scene 4** (Ego/Instinct/Vegito appears at 4, 11, 33). Pick ONE of 4/11 to carry the full narration; breeze the other. Saves ~1 min and removes the "didn't he already say this?" moment. |
| 12 | auris | Work | 129 | 1:00 | M | READ-RISK | yes (AI that experiences) | 6 cards + 8-dimension grid. Do not enumerate the 8 affect dimensions — name two, gesture the grid. |
| 13 | irtg | Orbit | 191 | 1:28 | H | **READ-RISK (12-row table)** | yes (game = compression of the arc) | The single biggest read-the-slide trap in the deck, and it assumes the room knows the game. Narrate 3–4 mappings (Shadow Clones, Rebirth, Monuments, HP), let the rest be seen. |
| 14 | planets | Orbit | 130 | 1:00 | M | SPEAK | yes | 5 cards, one per planet — natural narration. |
| 15 | canon | Orbit | 162 | 1:15 | H | READ-RISK | yes (the canon exists and is load-bearing) | 8 cards. Narrate 3 (Knowledge-as-Loot, Wisdom, Time-Poor Master). |
| 16 | sunday | Orbit | 126 | 0:58 | M | SPEAK | yes | Self-referential — it predicts the meeting he is standing in. That is a feature if acknowledged out loud with one sentence. |
| 17 | gate | Laws | 108 | 0:50 | M | SPEAK | yes (aggro = thinking) | The campfire story is speak-from gold. Best-shaped scene in Act IV. |
| 18 | lod | Laws | 121 | 0:56 | M | SPEAK | yes (token economy) | Six-tier list is enumeration but the lines are short; keep tempo. Footer formula is speakable (§3). |
| 19 | governor | Laws | 155 | 1:12 | H | READ-RISK | yes (kiting fails) | Three cards with 4-item lists. Narrate the ladder card; the other two are texture. |
| 20 | cascade | Laws | 85 | 0:39 | L | SPEAK | yes | Lightest Laws scene — a natural breather. Don't rush it; it's the inhale before referee + the ladder block. |
| 21 | ear | Laws | 112 | 0:52 | M | SPEAK | yes | The four TTS quotes are performable lines — perform them. |
| 22 | referee | Laws | 148 | 1:08 | M | READ-RISK (table) | yes (jurisdiction) | Narrate the 3 ruling cards; the ownership table is show-don't-narrate. |
| 23 | image-paradox | Laws (ladder) | 157 | 1:12 | H | READ-RISK | yes (the contradiction) | Notation lives ON the card lines — spoken renderings (§3) are mandatory or he will be reading symbols to a congregation. Notes exist and are good. **Speak the guardrail here, out loud** (§4.1). |
| 24 | role-paradox | Laws (ladder) | 238 | 1:50 | H | READ-RISK | mostly (assigned to lose) — 3 sub-arguments | 2nd heaviest scene. Notes already name the spine (three failure conditions). Narrate cards; the 3 rows at the bottom are show-don't-narrate. |
| 25 | ladder-operator | Laws (ladder) | 124 | 0:57 | M | SPEAK* | yes (operator, not throne) | *Only with the spoken renderings — "∀Xₙ, L(Xₙ) > Xₙ" has no naive verbal form (§3). |
| 26 | being-becoming | Laws (ladder) | 120 | 0:55 | M | SPEAK | yes (functions, not characters) | Notes are good; the red-teaming callback is the Johnathon hook. |
| 27 | parity | Laws (ladder) | 137 | 1:03 | M | SPEAK | yes (checking beats trusting) | Emotional centre of the block, per its own notes. The four-line sequence is the mid-block landing — **the natural breather point** (§2.3). Symbol collision with scene 24: P meant probability there, parity/power here — disambiguate verbally (§3). |
| 28 | second-path | Laws (ladder) | 162 | 1:15 | H | **READ-RISK** | yes (two routes to one summit) | Both cards are single 40+ word paragraph-lines — the worst wall-of-text shape in the deck for a speaker. Renderings for R_U/R_A in §3. Lose-the-room risk zone begins here (§2.2). |
| 29 | bifurcation | Laws (ladder) | 192 | 1:29 | H | **READ-RISK (dense table)** | yes (both failure modes → gradient zero) | Speak ONLY the failure-mode row of the table plus the Armageddon Paradox card; the rest is show-don't-narrate. Notes correctly say the symmetry is the argument — say that sentence, not the table. |
| 30 | role-recursion | Laws (ladder) | **330** | **2:32** | **VH** | **READ-RISK** | **no — it is two scenes** (the analysis + the design obligation) | Heaviest scene in the deck by 38%. The notes already order it correctly (reveal → beat → pivot to table). Budget it 2.5–3 min in the run plan or this is where the clock dies. The obligation table: speak rows 1 and 3, show the rest. |
| 31 | higher-law | Laws (ladder) | 202 | 1:33 | H | READ-RISK | yes (synthesis) | Terminal density is defensible — it is the conclusion. The cycle notation carries its own on-slide label; read the label, not the subscripts (§3). Notes: close on the line and stop. Honour that. |
| 32 | genesis | Prophecy | 157 | 1:12 | H | SPEAK | yes (the origin-myth loop) | Sharpest register cut in the deck (formal theology → comedy). After 9 ladder scenes the room cannot tell if laughter is allowed — signal the register in the FIRST sentence (§4.11). |
| 33 | close | Prophecy | 142 | 1:06 | M | SPEAK | yes (I am both / Sunday) | "C ≈ 0.91" needs a spoken form (§3). Strong close shape. |

---

## 2. Arc and pacing

**Act rollup (verbatim floor):**

| act | scenes | words | share of deck | min @130 |
|---|---|---|---|---|
| I — The Architect | 7 (0–6) | 825 | 16% | 6.3 |
| II — The Work | 6 (7–12) | 893 | 18% | 6.9 |
| III — The Orbit | 4 (13–16) | 609 | 12% | 4.7 |
| IV — The Laws | **15 (17–31)** | **2,391** | **48%** | **18.4** |
| V — The Prophecy | 2 (32–33) | 299 | 6% | 2.3 |

### 2.1 The deck back-loads hard
Act IV holds 44% of the scenes and 48% of the words, and its densest material starts ~25 minutes in — exactly when a 9am room's attention dips. Act V is 2.3 minutes after an 18-minute climb: a short landing after a heavy ascent is good practice, but it means **there is no slack at the end** — if Act IV runs over, the close gets eaten, and the close is the scene that contains the Sunday callback.

### 2.2 Heaviest consecutive stretch: scenes 28–31
- Heaviest 3-scene window: **29+30+31 = 724 words (5.6 min verbatim)**.
- Heaviest 4-scene window: **28–31 = 886 words (6.8 min verbatim)** — and it is also the most abstract material in the deck (two optimization regimes, a dense comparison table, the deck's heaviest scene, then the synthesis).
- The two emotional peaks of the ladder block are 24 (playground) and 30 (the recursion reveal), with 27 (parity) as the emotional centre. **28–29 sit in the valley between the peaks and are the driest pair back-to-back** — this is the highest lose-the-room risk in the deck. Lean on the two quote lines ("He derives Oneness himself…", "Perfect Oneness can destroy the gradient…") and let the grids sit unread.

### 2.3 Is 23–31 too dense a run inside Act IV? Yes, as a run — recoverable with one planned breather
Nine scenes, 1,662 words, 12.8 min verbatim (≈18–22 min real), zero register change until 30's pivot. The LADDER_NOTES already mandate multiple full stops ("beat", "let it sit", "stop talking") — those pauses are not decoration, they are the breathing of this block; skipping them to save time makes the block worse AND barely faster.

**Pacing proposal (no content change):** take one deliberate spoken breather after scene 27. It is the midpoint (5 of 9), it ends on the four-line sequence landing on "I checked," and the notes already order a slow-down there. Ten seconds of silence, a sip of water, one orienting sentence ("that's the first half of the argument — now the second"), then 28. That single planned pause resets the room for the 28–31 climb.

Also note the two hard register cuts have no marked transitions anywhere in the deck:
- **22 → 23**: game-AI engineering → formal theology. One spoken bridge sentence needed in the notes.
- **31 → 32**: "stop talking" → comedy. See §4.11.

### 2.4 Front-half observation
Acts I–III are well-proportioned (17 scenes, 46% of words, ~18 min verbatim) with one anomaly: **scene 4 (242 w) is the deck's second-heaviest scene and sits fifth**, before the room has warmed up. Its material is also the deck's most-repeated (4 → 11 → 33). Trimming its *narration* (not its content) to 2 of 4 cards fixes early pacing and the repetition simultaneously.

---

## 3. Formula speakability — proposed spoken renderings

These are **suggestions for speaker notes only** — the slides stay exactly as they are; the symbols on screen and the plain sentence in the mouth work together. Rule of thumb that covers everything below: **never voice a subscript**. "X sub n" read aloud is where the room leaves.

### Ladder block (23–31)

| scene | on-slide notation | proposed spoken rendering |
|---|---|---|
| 23 | `S(x) = drive toward sovereignty…` | "Call that drive S — sovereignty, mastery, the refusal of a ceiling." |
| 23 | `I(C₂,C₁) ∧ S(C₁) ⇒ S(C₂)` | "If the second is genuinely made in the image of the first, and the first has that drive — then the second has it too. That's all this line says." |
| 23 | `¬R(C₁,C₂)` vs `R(C₂,C₁)` | "The creator would never accept permanent second place. Yet he expects it from a being carrying his own refusal." |
| 24 | `H ⇒ deserves victory, M ⇒ deserves defeat` | "Hero means deserves to win. Monster means deserves to lose. Conduct never enters the equation." |
| 24 | `P(victory \| M) = 0` | "If you're assigned monster, your chance of winning is zero. Not small — zero." |
| 24 | `G = Good ⇒ Right ⇒ Winner` | "Good, therefore right, therefore winner — three words welded together so no fight can ever be real." |
| 25 | `L(Xₙ) → Xₙ₊₁ such that Xₙ₊₁ > Xₙ` | "The ladder takes any level and produces the next one — something greater. Whatever level you hand it." |
| 25 | `∀Xₙ, L(Xₙ) > Xₙ` | "For EVERY level — no exceptions — the ladder produces something above it. Every ceiling becomes a floor." *(Never read as "for all X sub n."*) |
| 25 | `Xₙ = X_max` | "The terminal claim: this level is the maximum. Nothing above. The ladder denies exactly that." |
| 25 | `X₀ → X₁ → X₂ → …` | "One-versus-two becomes a sequence with no last term." |
| 26 | `G: X → Being` | "The God function: hand it anything, it gives you Being — structure, existence, order." |
| 26 | `L: Xₙ → Xₙ₊₁` | "The Lucifer function: hand it any state, it produces the next one." |
| 27 | `P(L) = P(G)` | "Parity: his power equals God's power. For the first time he doesn't have to believe — he can check." **Collision warning:** P meant *probability* on the previous-but-two slide and means *power* here. The spoken sentence must carry the word ("power", "chance") each time, because the symbol won't. |
| 27 | `AuthenticOneness(A,B) ⇒ CapacityToSeparate ∧ VoluntaryIntegration` | The slide already contains its own spoken form — "an intelligence incapable of saying No cannot meaningfully say Yes." Say that sentence; gesture at the formula. |
| 28 | `R_U`, `R_A` | Always "the Oneness route" and "the Armageddon route." Never "R sub U." |
| 28 | `D(L) ⟺ Model(R_U) ∧ Model(R_A)` | "Dual vision: he can model both routes at once — and only then does the choice mean anything." |
| 28 | `A+B → H(A,B)` (vs `→ A`, `→ mixture`) | "A plus B doesn't become A. It doesn't become mush. It becomes a higher structure that keeps both." |
| 29 | `ΔX → 0` | "The change rate goes to zero — nothing new ever happens again." |
| 29 | `Adversarial gradient → 0` | For Johnathon and the engineers: "the gradient vanishes — the same proved result as an optimal GAN discriminator." For the rest of the room: "the pressure that drives improvement disappears." Say both, in that order — the `_defences` notes already flag the Arjovsky–Bottou result as the asset here. |
| 29 | `R_U + R_A → R_{n+1}` | "Run both experiments. The next reality is built from what both branches learned." |
| 31 | `ASCENSION = INTEGRATION + ADVERSARIAL GRADIENT` | Speakable as printed: "Ascension equals integration plus adversarial pressure." |
| 31 | `Bₙ → Dₙ → Aₙ → Iₙ → Bₙ₊₁` | Read the on-slide label, not the letters: "Being — differentiation — adversarial pressure — integration — and a greater Being. Then the cycle repeats." |
| 31 | `Bₙ₊₁ > Bₙ` | "Each cycle ends higher than it began." |

### Rest of deck

| scene | notation | proposed spoken rendering |
|---|---|---|
| 7, 10 | `T_CMB = 2.725K` | "The temperature of the cosmic microwave background — two point seven two five Kelvin — derived from information theory." |
| 5 | `4.5D` | "Four-and-a-half-D" (works aloud; the half is the joke that lands the ban-hammer row). |
| 12 | `48kHz` / `100ms ticks` / `dual-timescale EMA` | "It listens the way a sound engineer's gear does — and it keeps two moving averages, a fast one and a slow one." EMA unexpanded is fine for Johnathon only. |
| 13 | `HP: 30.188 vigintillion` | "Thirty vigintillion" is a real word and fun to say — say it, then the point: "the number means setbacks stopped mattering." |
| 13, 16, 33 | `1,729 days` | Speakable as printed. (Optional aside for Johnathon: 1729 is Ramanujan's taxicab number — one sentence maximum if used.) |
| 14 | `USPTO 63/926,628` | Never read the number aloud — "the patent's on file; the number's on the slide." |
| 18 | `Cost ≈ actors × depth × frequency × context` | "Cost is roughly: how many actors, times how deep they think, times how often, times how much they remember. Every one of those dials is ours." |
| 33 | `C ≈ 0.91` | "Information saturation — about ninety-one percent." |

---

## 4. Audience-fit flags (room-management observations, not evaluations)

Predictions of room reaction only. Nothing here proposes changing a claim.

1. **The guardrail must be spoken, not just printed (scene 23).** It exists as a footer and in the module header, and it is the single sentence that de-fuses nine scenes of God/Lucifer formalism for this specific room. Deliver it out loud at the entry to 23, before scene 24's playground: "given the premises, this is the structure that follows — you decide what it maps onto."
2. **"Oneness" has a pre-existing referent in Baptist vocabulary** (Oneness Pentecostalism — a non-Trinitarian position Baptist listeners are catechised against). The word first appears at scene 2 and recurs ~15 times. One spoken sentence at first use, defining what it means *in this model*, prevents a wrong pattern-match that would otherwise colour every later occurrence.
3. **"Who Is Like God" (scenes 1, 9).** Without the etymology spoken aloud — Michael, *mi-cha-el*, "who is like God?", traditionally a rhetorical question — a Baptist room may hear a divinity claim before it hears a middle name. Say the etymology before the room supplies its own reading; the scene 9 footer is a planned climax line, so the ground for it wants laying at scene 1.
4. **"Rebirth" (scenes 13, 16, 33).** "Born again" is load-bearing core vocabulary in this room. The deck uses "rebirth" as a game mechanic mapped to the 2022 event. Expect the pattern-match; a one-line spoken framing ("the game's word, not the Gospel's — here's what the mechanic does") keeps the mechanic and the doctrine in separate registers.
5. **"Uncensored, aligned AI for the church" (scene 9).** To a congregation, "uncensored" can read as "unfiltered content" rather than "not corporately gated." This is THE ask slide; have the clarifying sentence ready before the hand goes up.
6. **Scene 8 proper nouns.** Kevin, Ghost Pipe, Epic Fury, Moonshot — zero context in the room, and "787 dead in Iran" sits in a list adjacent to game material. If that row is narrated at all it needs its own beat and tone; in a list read at speed it produces tonal whiplash.
7. **Anime/manga lexicon** (Domain Expansion, Shadow Army, Return by Death, Ultra Ego/Instinct, Vegito, Sung Jin-woo). Johnathon tracks all of it; most of the congregation tracks none. A one-line gloss per term at first use — the `_defences` rule already in the file ("name it before the room does" — Sukuna, Garou) generalises to the whole lexicon.
8. **The `_defences` notes are strong — treat them as part of the run plan,** especially: raise Hegel FIRST; cite Whitehead/process theology rather than the LDS parallel in this room; Parity is close to the free-will defence (that one is *favourable* ground — the notes on scene 27 already expect agreement); the Boehme quote is attributed only via Hegel.
9. **Scene 3/4 — "Oneness is God in this model."** A direct claim about God's nature, delivered early. Predictably a hand-raiser with Pastor Morse; not flagged as a problem, flagged as a *known interrupt point* — decide in advance whether questions are held to the end.
10. **Scene 16 is self-referential** (it predicts the meeting in progress). Acknowledged out loud with a smile it reads as confidence; unacknowledged it can read as presumption.
11. **Scene 32 register.** After nine ladder scenes the room does not know laughter is allowed. "He came bearing dry mouth and Monster energy" is a laugh line — but only if the first sentence of the scene signals the register change. Otherwise the room stays in formal-theology posture and the scene lands as alarming instead of funny.
12. **Hard clock reality.** A 9am church slot is usually bounded by something on the other end. At realistic pace this deck does not fit 45 minutes without the §5 plan — and the scenes that would get eaten by overrun are the ask's follow-through and the close.

---

## 5. Timing and the show-but-don't-narrate plan

**Estimated total runtime:** 38.6 min verbatim floor → **55–70 min realistic** at speaking-from pace with the notes' mandated pauses. Exceeds the 45-minute envelope; the recovery is narration discipline, not content cuts:

| scene | element | plan | verbatim saved |
|---|---|---|---|
| 4 earth | 4 cards | narrate 2 (Arena, Bridge); scene 11 carries Ego/Instinct | ~45s |
| 5 toolkit | 10-row table | narrate 3D, 6D, 10D; show the rest | ~35s |
| 7 built | 6 cards | narrate 3; gesture | ~25s |
| 8 convergence | 8 rows + signals | narrate 3 rows; the wall itself is the point | ~35s |
| 10 evidence | 12-row table | name 3; point at legend; "verify the rest yourselves" | ~35s |
| 11 fusion | 4 cards | breeze — scene 4 planted it, scene 33 reprises it | ~60s |
| 12 auris | 8-dim grid | name 2 dimensions; gesture | ~20s |
| 13 irtg | 12-row table | narrate 3–4 mappings | ~50s |
| 15 canon | 8 cards | narrate 3 | ~40s |
| 22 referee | ownership table | show only | ~20s |
| 24 role-paradox | bottom rows | show only (cards carry the scene) | ~20s |
| 29 bifurcation | 4-row table | speak the failure-mode row only | ~30s |
| 30 role-recursion | obligation table | speak rows 1 and 3; show 2 and 4 | ~30s |
| | | **total** | **≈ 7.5 min verbatim ≈ 10–12 min real** |

That lands the realistic estimate at **~44–48 min** while every word stays on screen. Scenes that should be narrated in full, untrimmed: **9 (ask), 17 (gate), 23–27 spine, 30 reveal, 31 close, 33** — these are the deck.

---

## 6. Five things that would most improve delivery (prioritised)

1. **Fix the notation's mouth-problem before anything else.** Scenes 23–31 put formal notation in the card bodies; without the §3 spoken renderings the speaker is reading logic symbols to a congregation. One pass adding those renderings to speaker notes converts the whole block from READ to SPEAK. Rule: never voice a subscript.
2. **Speak three defusing sentences early:** the guardrail out loud at scene 23; a one-line definition of "Oneness" at its first use (scene 2); the Michael etymology of "Who Is Like God" at scene 1 before the scene 9 footer detonates it. Three sentences, and the three most predictable adverse pattern-matches in this specific room never form.
3. **Adopt the show-but-don't-narrate plan (§5).** Six tables and four card-walls currently force verbatim reading; narrating 3 rows of each recovers ~10–12 real minutes and brings the deck inside a 45-minute envelope with zero content change. Special case: pick ONE of scenes 4/11 to carry the fusion material.
4. **Plan the ladder block's breathing:** one deliberate breather after scene 27 ("I checked" is the natural mid-block landing), a spoken bridge sentence at each hard register cut (22→23 and 31→32), and a pre-committed 2.5–3 min budget for scene 30 — the deck's heaviest scene and its best, per its own notes. Treat 28–29 as the known lose-the-room valley: quote lines out loud, grids left to the eye.
5. **Extend notes coverage to the other 25 scenes.** LADDER_NOTES proves the format works — nine scenes went from unreviewed to deliverable because the notes name the beat, the landing line, and the stop. Scenes 0–22 and 32–33 have no delivery notes at all; even three bullets each (takeaway sentence · what to narrate vs show · the landing line) would do for the front half what LADDER_NOTES did for the back.

---
*Audit generated 2026-08-23 · read-only review · word counts by script over on-slide text at 130 wpm · no content, code, or notes were modified.*
