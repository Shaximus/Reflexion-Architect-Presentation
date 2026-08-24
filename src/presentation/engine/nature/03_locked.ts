// THE LOCKED FAULT — nature-ontology insertion, scene 03.
//
// Source: research corpus /home/shax/Documents/Research/nature_ontology/03_fault_mechanics.md
// (2026-08-23, Hannah6 research arm) and the registered collision COL_003 in
// /home/shax/Apps/semantic_compiler/registry/correspondence.py.
//
// This is the domain where the thesis SPLITS, and the split is the most valuable
// thing on the slide. Two claims with opposite fates, carried at equal weight:
//   BUDGET  — "suppression stores rather than removes" — ESTABLISHED at the
//             moment-budget level (Carrizo: ~5.7 m banked ≈ 5.3 ± 1.4 m released).
//   SCHEDULE — "therefore overdue, therefore imminent" — REFUTED by seismology's
//             own prospective tests. COL_003 sits on the slide face, not in a
//             footnote: storage gives the size of the invoice, not the due date.
//
// Evidence labels from the corpus (ESTABLISHED / CONTESTED / SPECULATIVE /
// CLAIMED) are carried verbatim and must not be dropped in later edits.
// The seismic-gap refutation must not be softened: it is the strongest thing on
// the slide precisely because it refutes.
import type { Detail, Scene, SourceRef } from "../types";

const RESEARCH = "Research corpus — nature_ontology/03_fault_mechanics.md (2026-08-23)";
const REGISTRY = "Semantic Compiler — registry/correspondence.py";

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-locked",
  act: "The Laws",
  title: "THE LOCKED FAULT",
  kicker: "The thesis splits here — and the split is the finding.",
  quote: "Storage gives the size of the invoice, not the due date.",
  attribution:
    "COL_003, contact point — the registered collision on SEIS_001. Status: OPEN.",
  visual: "diagram",
  camera: [0, 0.6, 10.5],
  cards: [
    {
      title: "THE BANKED DEFICIT",
      subtitle: "ESTABLISHED — the budget claim",
      accent: "teal",
      lines: [
        "The Carrizo segment has crept 0 mm at the surface since 1857 while the deep plates kept moving at 34 mm/yr: (2026 − 1857) × 34 mm/yr ≈ 5.7 m of slip deficit, banked — matching the 5.3 ± 1.4 m the 1857 Fort Tejon rupture released (Zielke et al. 2010, Science, doi:10.1126/science.1182781). Suppression storing rather than removing is quantitatively real at the moment-budget level.",
        "The deposit rate, worked: a 200 × 12 km locked segment at 34 mm/yr banks M₀ = 3×10¹⁰ Pa × 2.4×10⁹ m² × 0.034 m/yr ≈ 2.45×10¹⁸ N·m per year — one Mw 6.2 per year, deposited, never spent.",
      ],
    },
    {
      title: "COL_003 - SCHEDULE REFUTED",
      subtitle: "The registered collision — equal billing with the budget",
      accent: "crimson",
      lines: [
        "The seismic gap hypothesis failed prospective tests: recently-active zones out-forecast the \"overdue\" gaps — clustering beat quiescence (Kagan & Jackson 1991, doi:10.1029/91JB02210; Rong et al. 2003, doi:10.1029/2002JB002334). The time-predictable model failed direct geodetic measurement at the place best suited to confirm it (Murray & Segall 2002, doi:10.1038/nature00984). Parkfield's formal 1988 ± 5 prediction missed by eleven years (Bakun et al. 2005, doi:10.1038/nature04067).",
        "Storage predicts the eventual size class and, at first order, the place. It does not predict the date. Keep the accumulation claim; drop every timing claim.",
      ],
    },
    {
      title: "THE FOLK VERSION, CORRECTED",
      subtitle: "Small releases are a tracer, not a mechanism",
      accent: "gold",
      lines: [
        "Small earthquakes are energetically irrelevant: matching one M7 takes ~31,600 M4s, and a b = 1 distribution supplies only ~1,000 — a 32× shortfall, growing by √10 per magnitude step down. Creeping faults stay small through ASEISMIC compliance — talc-bearing serpentinite sliding stably (Moore & Rymer 2007, doi:10.1038/nature06064) — not through frequent venting. The transferable insight is \"stay in motion so nothing is stored,\" never \"vent often.\"",
      ],
    },
  ],
  stats: [
    {
      value: "5.7 m ≈ 5.3 ± 1.4 m",
      label: "banked since 1857 vs released in 1857 — the budget balances (Zielke et al. 2010)",
      accent: "teal",
    },
    {
      value: "+11 years",
      label: "Parkfield arrived in 2004 against a 1988 ± 5 window, without detected precursors (Bakun et al. 2005)",
      accent: "crimson",
    },
    {
      value: "32×",
      label: "the shortfall when small events try to pay a large budget (b = 1)",
      accent: "gold",
    },
  ],
  table: {
    headers: ["Delay", "Stored moment", "Equivalent Mw"],
    rows: [
      ["1 yr", "2.45×10¹⁸ N·m", "6.2"],
      ["75 yr", "1.84×10²⁰ N·m", "7.44"],
      ["150 yr", "3.67×10²⁰ N·m", "7.64"],
      ["300 yr", "7.34×10²⁰ N·m", "7.84"],
    ],
  },
  rows: [
    {
      left: "COL_003",
      right:
        "Budget claim ESTABLISHED; schedule claim REFUTED. Registered collision on mapping SEIS_001, status OPEN — surfaced by the compiler, repaired only by the translator. The falsification travels with the claim or neither ships.",
    },
    {
      left: "Superlinearity, demoted",
      right:
        "At fixed rupture area, moment grows LINEARLY with delay — doubling the wait adds only +0.2 Mw. Superlinearity requires area recruitment (multi-fault cascade: Kaikoura 2016 ruptured ~21 faults), and the delay-to-cascade link is SPECULATIVE, not demonstrated.",
    },
    {
      left: "The valve loads the boiler",
      right:
        "Cascadia ETS (Mw ~6.3–6.8 every ~14 months) relieves only the deep interface — and each episode incrementally LOADS the locked megathrust above it. Triggering significance CONTESTED.",
    },
    {
      left: "Creep is not immunity",
      right:
        "Creeping segments can rupture destructively when dynamic weakening kicks in mid-rupture (Noda & Lapusta 2013, doi:10.1038/nature11703), and locked patches hide inside creeping sections. Creep reduces the storage rate; it does not confer immunity.",
    },
  ],
  footer:
    "The refutation is the strongest thing on this slide because it refutes: seismology itself killed \"overdue therefore imminent.\" Import the storage claim anywhere, and the falsification is imported with it — SEIS_006 is the mandatory companion to SEIS_001.",
};

const RSRC = (section: string, excerpt: string, why?: string): SourceRef => ({
  title: RESEARCH,
  section,
  excerpt,
  why,
});

export const DEEP: { id: string; detail: Detail; sources: SourceRef[] }[] = [
  {
    // "The Moment Budget" -> nature-locked:the-moment-budget
    id: "nature-locked:the-banked-deficit",
    detail: {
      overview:
        "The budget claim is ESTABLISHED. It is elastic rebound (Reid 1910), measured geodetically in mm/yr, and it has survived every test since 1906: a locked interface under continuous forcing accumulates slip deficit linearly in time, and the eventual release is bounded below by that deficit.",
      mechanism:
        "Plate motion is imposed continuously at depth. Where the interface is frictionally locked, the surrounding crust deforms elastically — strain energy loads like a spring — until shear stress reaches frictional strength and the sides rebound, recovering decades of displacement in seconds to minutes. Whether a fault locks or creeps is a material property of the fault zone (rate-and-state friction: velocity-weakening sticks and fails; velocity-strengthening slides stably), not a behavioral option.",
      structure:
        "Seismic moment M0 = μ·A·d̄ (μ ≈ 30 GPa). Moment magnitude Mw = (2/3)·(log10 M0 − 9.1). For a locked 200 × 12 km strike-slip segment loading at 34 mm/yr: M0-rate = 3×10¹⁰ Pa × 2.4×10⁹ m² × 0.034 m/yr ≈ 2.45×10¹⁸ N·m per year — one banked Mw 6.2 per year.",
      examples: [
        "1 yr of delay: 2.45×10¹⁸ N·m stored — equivalent Mw 6.2.",
        "75 yr: 1.84×10²⁰ N·m — Mw 7.44.",
        "150 yr: 3.67×10²⁰ N·m — Mw 7.64.",
        "300 yr: 7.34×10²⁰ N·m — Mw 7.84.",
        "Cross-check against reality: 169 years × 34 mm/yr on Carrizo ≈ 5.7 m deficit; μAd̄ with the 1857 rupture dimensions reproduces an Mw ≈ 7.9-class event. The books balance.",
      ],
      residual:
        "\"Pays it ALL out in one event\" is an overstatement even in the source domain: seismic efficiency is typically well under ~10% — most stored energy goes to fracture surface energy and frictional heat, and additional deficit is recovered aseismically afterwards (afterslip, postseismic relaxation). All claims here are moment-budget claims, not energy-delivery claims.",
      currentStatus:
        "ESTABLISHED — Reid 1910 mechanism; Zielke et al. 2010 LiDAR slip measurement; Sieh & Jahns 1984 deep slip rate (33.9 ± 2.9 mm/yr at Wallace Creek).",
    },
    sources: [
      RSRC(
        "§2.2 — The locked segments",
        "At 34 mm/yr of deep loading with zero surface creep, the Carrizo segment has accumulated (2026 − 1857) × 34 mm/yr ≈ 5.7 m of slip deficit — the size of the 1857 slip, again, sitting in the crust right now. The budget side of the thesis, measured. What the deficit does not give is the date.",
        "The worked arithmetic behind the slide's headline stat.",
      ),
      RSRC(
        "§3.1 — What a locked segment banks per year",
        "M0-rate = 3×10^10 Pa × (2×10^5 m × 1.2×10^4 m) × 0.034 m/yr = 2.45×10^18 N·m per year ≈ one Mw 6.2 per year, banked.",
      ),
      RSRC(
        "§1 — Elastic rebound, caveat",
        "The earthquake releases the stored elastic energy, but only a small fraction (seismic efficiency, typically well under ~10%) radiates as seismic waves. \"Pays it all out in one event\" is already an overstatement in the source domain.",
        "Why the deep dive is a moment-budget claim, not an energy-delivery claim.",
      ),
    ],
  },
  {
    // "COL_003 - The Refuted Schedule" -> nature-locked:col-003-the-refuted-schedule
    id: "nature-locked:col-003-schedule-refuted",
    detail: {
      overview:
        "COL_003 is the registered collision on mapping SEIS_001 (\"a boundary that refuses to move pays out later, larger\"). A collision is not a rejection: the compiler surfaces the disagreement at a named contact point, and the translator holds the authority to repair, re-scope, or accept the cost. Contact point: storage gives the size of the invoice, not the due date.",
      structure:
        "Translation claim: a boundary that refuses to move pays out later, larger. Domain finding: the BUDGET claim is established — Carrizo has banked ~5.7 m matching the 5.3 ± 1.4 m that 1857 released — but the SCHEDULE claim is refuted. Repair route on record: keep the accumulation claim, drop any timing claim.",
      causeEffect: [
        "McCann et al. 1979 formalized the gap hypothesis: segments quiet longest carry the highest hazard — the natural forecasting form of \"suppression stores.\"",
        "Kagan & Jackson 1991 (doi:10.1029/91JB02210): with 40+ M ≥ 7.0 events in the following decade, gap zones did NOT outperform — segments with recent large earthquakes were, if anything, more likely to host new ones. Clustering beat quiescence.",
        "Rong, Jackson & Kagan 2003 (doi:10.1029/2002JB002334): twenty-year re-test including the revised gap models — overprediction in the gaps, statistically disproved against a Poisson null.",
        "Murray & Segall 2002 (doi:10.1038/nature00984): the time-predictable model contradicted by direct geodetic measurement at Parkfield — the place best suited to confirm it.",
        "Bakun et al. 2005 (doi:10.1038/nature04067): the flagship 1988 ± 5 Parkfield prediction (95% window closing 1993) arrived 28 September 2004 — eleven years late, without detected precursors.",
      ],
      implications: [
        "What survives: WHERE still tracks locking at first order — geodetic coupling maps made before the events correlate with the 2010 Maule and 2011 Tohoku rupture asperities (Moreno et al. 2010; Loveless & Meade 2011). WHEN does not follow from the budget: recurrence is irregular, history-dependent, and clustered.",
        "SEIS_006 (\"the overdue-blowup fallacy\") is flagged as the mandatory companion to SEIS_001 — the falsification travels with the claim or neither ships.",
        "Using storage to predict release TIMING imports the refuted seismic gap hypothesis. That sentence is a residual mismatch inside SEIS_001 itself.",
      ],
      residual:
        "A rebuttal exists and is named: Nishenko & Sykes 1993, with the Jackson & Kagan reply the same year; the field's center of mass nonetheless moved with Kagan & Jackson. And the protective inversion also overclaims — Parkfield still averaged ~24.5-year recurrence, just with useless variance. \"No release is ever predictable\" is not what the record shows either.",
      currentStatus:
        "REFUTED as a forecast tool (schedule claim); collision status OPEN, resolution authority: translator.",
    },
    sources: [
      {
        title: REGISTRY,
        section: "COL_003 — mapping SEIS_001",
        excerpt:
          "The BUDGET claim is established — Carrizo has banked ~5.7 m of slip deficit since 1857 at 34 mm/yr, matching the 5.3 +/- 1.4 m that 1857 released. The SCHEDULE claim is refuted — seismic gap hypothesis failed prospective tests; recently-active zones out-forecast overdue gaps. At fixed rupture area moment grows only LINEARLY with delay.",
        why: "The collision as registered — this scene's obligation is to put it on the slide face at equal prominence.",
      },
      {
        title: REGISTRY,
        section: "COL_003 — repair_route",
        excerpt:
          "Keep the accumulation claim, drop any timing claim. Superlinearity requires area recruitment (multi-fault cascade) and that link is SPECULATIVE, not demonstrated.",
      },
      RSRC(
        "§4 — Seismic gaps and characteristic earthquakes",
        "Net for the thesis: the storage claim survives; the \"overdue therefore imminent\" claim is the part seismology itself falsified. If the analogy is imported anywhere, the falsification must be imported with it.",
        "The corpus's own verdict, stated before the analogy layer is allowed to run.",
      ),
    ],
  },
  {
    // "Why Small Events Cannot Pay" -> nature-locked:why-small-events-cannot-pay
    id: "nature-locked:the-folk-version-corrected",
    detail: {
      overview:
        "The folk version of the thesis — creeping faults stay safe by \"letting off steam in many small earthquakes\" — is wrong in the source domain. Small earthquakes are energetically irrelevant; the safe regime is aseismic compliance, and the small events on a creeping section are a tracer of that regime, not its mechanism.",
      mechanism:
        "Event count per magnitude unit falls as 10^(−b·M); moment per event rises as 10^(1.5·M). Total moment per magnitude bin therefore scales as 10^((1.5−b)·M) = 10^(0.5·M) at the observed b ≈ 1: the sum is dominated by the largest events, cut off only by Mmax. The tail, not the mode, carries the budget.",
      causeEffect: [
        "Matching one Mw 7.0 requires 10^4.5 ≈ 31,600 Mw 4.0 events; Gutenberg–Richter with b = 1 supplies only ~1,000 M4s per M7 — a factor ~32 shortfall, growing by √10 per magnitude step down.",
        "Energy: one Mw 7.9 (1857-class) ≈ 4.5×10¹⁶ J ≈ 10.7 megatons TNT-equivalent; one Mw 6.0 ≈ 15 kt — a ratio of ~710×. At Parkfield's ~24.5-year M6 cadence, paying for one 1857 with M6 events alone would take ~17,000 years.",
        "A boundary showing only small earthquakes is therefore either (a) creeping aseismically — the true relief mechanism — or (b) storing. Small seismicity per se distinguishes nothing; the geodetic deficit distinguishes everything.",
      ],
      examples: [
        "The San Andreas creeping section (San Juan Bautista to Cholame) accommodates most of the fault's slip budget aseismically at up to 25–35 mm/yr of surface creep, and has produced nothing larger than ~M6 in the instrumental record.",
        "Why it creeps: the fault zone carries talc-bearing serpentinite — weak, velocity-strengthening material confirmed by SAFOD drilling into the actively creeping trace (Moore & Rymer 2007, doi:10.1038/nature06064). Creep is imposed mineralogy, not policy.",
      ],
      implications: [
        "The transferable insight is \"stay in motion so there is nothing to vent,\" NOT \"vent often.\" The correction is the finding, and it changes what any analogy built on this domain is allowed to say.",
      ],
      residual:
        "G-R is an ensemble statistic, not a per-fault guarantee, and \"creeping stays small\" is instrumental-record-true and conditional, not absolute (see The Valve Loads the Boiler for the failure modes).",
      currentStatus: "ESTABLISHED — standard results (Gutenberg & Richter 1944; Kanamori 1977; Scholz 2002).",
    },
    sources: [
      RSRC(
        "§6 — Why \"many small\" cannot pay for \"one large\"",
        "Matching one Mw 7.0 requires 10^(1.5×3) ≈ 31,600 Mw 4.0 events. G-R with b = 1 supplies only ~1,000 M4s per M7 — a factor ~32 shortfall, growing by √10 per magnitude step down. Small earthquakes cannot balance a locked fault's budget.",
        "The arithmetic that kills the folk version.",
      ),
      RSRC(
        "§0 — Verdict first",
        "Creeping faults stay safe because aseismic creep accommodates the motion so elastic strain is never stored. The small events on a creeping section are a tracer of the safe regime, not its mechanism. The transferable insight is therefore not \"vent often\" — it is \"stay in motion so there is nothing to vent.\"",
      ),
    ],
  },
  {
    // "Superlinearity, Demoted" -> nature-locked:superlinearity-demoted
    id: "nature-locked:superlinearity-demoted",
    detail: {
      overview:
        "Honestly shown, growth with delay is not superlinear in the simple case. At fixed rupture area, stored moment grows LINEARLY in time (M0 = μA·s-rate·t): doubling the delay doubles the moment and adds only (2/3)·log10(2) ≈ 0.20 magnitude units. The magnitude scale compresses linear storage; it does not inflate it.",
      mechanism:
        "Anyone asserting \"delay doubles, energy quadruples\" from the log scale alone is misreading logarithms. Where superlinearity genuinely enters is area recruitment: rupture area is not fixed, constant-stress-drop scaling ties slip to rupture length (d̄ ∝ L until width saturates), so events that recruit more area release moment ∝ L²–L³ — and long delays CAN allow ruptures to cascade across segment boundaries that shorter-cycle events respect.",
      examples: [
        "Multi-fault cascades are real: the 2016 Mw 7.8 Kaikoura earthquake ruptured ~21 distinct faults (Hamling et al. 2017, Science, doi:10.1126/science.aam7194).",
        "But recurrence records show variable, history-dependent release (Weldon et al. 2004, Wrightwood): a systematic \"longer wait, longer rupture\" law is not empirically established.",
      ],
      implications: [
        "Corrected statement for the thesis: storage is linear in delay; magnitude is logarithmic in storage; the catastrophic asymmetry is not \"delay grows the event superlinearly\" but \"release is quantized at the size of the stored deficit — and small quanta are astronomically insufficient.\"",
      ],
      currentStatus:
        "Cascade mechanism ESTABLISHED; the delay-to-cascade correlation SPECULATIVE — carried as such into COL_003's repair route, and it must stay demoted anywhere this scene is quoted.",
    },
    sources: [
      RSRC(
        "§3.2 — Is growth with delay superlinear?",
        "Fixed rupture area: M0 grows linearly in time. Doubling the delay doubles the moment and roughly doubles the energy, adding only (2/3)·log10(2) ≈ 0.20 magnitude units. The magnitude scale compresses linear storage; it does not inflate it.",
        "The demotion, in the corpus's own words.",
      ),
      {
        title: REGISTRY,
        section: "COL_003 — repair_route",
        excerpt:
          "Superlinearity requires area recruitment (multi-fault cascade) and that link is SPECULATIVE, not demonstrated.",
        why: "The demotion is part of the registered collision, not an editorial choice of this deck.",
      },
    ],
  },
  {
    // "The Valve Loads the Boiler" -> nature-locked:the-valve-loads-the-boiler
    id: "nature-locked:the-valve-loads-the-boiler",
    detail: {
      overview:
        "Two complications cut against any comfortable reading of the locked/creeping split. First: the third regime, episodic tremor and slip (ETS), looks like a relief valve and is not one — it relieves the wrong interface and loads the dangerous one. Second: creeping is conditional, not immune.",
      mechanism:
        "Cascadia ETS: the deep subduction interface (30–45 km, below the locked megathrust) slips silently for days to weeks on an astonishingly regular ~13–15 month cadence, each episode releasing the equivalent of Mw ≈ 6.3–6.8 (Dragert et al. 2001, doi:10.1126/science.1060152; Rogers & Dragert 2003, doi:10.1126/science.1084783). But ETS discharges the deep transition zone only: the shallow locked megathrust keeps its full deficit, and each deep slip episode transfers a stress increment up-dip onto the locked zone. The valve, where it exists, loads the boiler.",
      causeEffect: [
        "In the standard reading, ETS episodes fractionally advance the megathrust toward failure and define windows of slightly elevated probability; slow slip preceded the 2011 Tohoku and 2014 Iquique mainshocks. Stress transfer: ESTABLISHED in models. Triggering significance: CONTESTED.",
        "Creeping segments can host destructive rupture: rate-strengthening (stably creeping) material can carry large seismic slip when dynamic weakening — thermal pressurization of pore fluid — kicks in mid-rupture (Noda & Lapusta 2013, doi:10.1038/nature11703). Mechanism ESTABLISHED; applicability per-fault CONTESTED.",
        "InSAR shows partially locked patches embedded within the SAF creeping section, accumulating deficit at a few mm/yr (Ryder & Burgmann 2008); how much stress is accumulating there is CONTESTED (Johnson 2013).",
      ],
      implications: [
        "For the analogy layer: partial-release rituals that discharge a peripheral zone while the core deficit stands are mapped in SEIS_004 — as a HEURISTIC_METAPHOR at confidence 0.45, with the psychological transfer claim marked pure speculation.",
        "Honest summary: creep reduces the storage rate; it does not confer immunity. Quiet is only safe when the absence of loading — not the absence of events — has been verified.",
      ],
      residual:
        "Slow-slip scaling physics is itself in dispute: moment ∝ duration (Ide et al. 2007) vs earthquake-like scaling for Cascadia SSEs (Michel et al. 2019). And a 2022 paleoseismic study arguing the SAF creeping section hosted larger pre-instrumental events is carried as CLAIMED only — located but not read for the source report.",
      currentStatus:
        "ETS phenomenon ESTABLISHED; interpretations CONTESTED. Neither complication rescues the schedule claim — each makes timing harder, not easier.",
    },
    sources: [
      RSRC(
        "§5 — Slow slip and episodic tremor",
        "It is not a relief valve for the dangerous zone. ETS discharges the deep interface only. The shallow locked megathrust keeps its full deficit — and each deep slip episode transfers a stress increment up-dip onto the locked zone. The valve, where it exists, loads the boiler.",
        "The inversion that makes this the complication which cuts the other way.",
      ),
      RSRC(
        "§2.3 — Creeping is not binary and not guaranteed safe",
        "Rate-strengthening (stably creeping) fault segments can host large seismic slip when dynamic weakening (thermal pressurization of pore fluid) kicks in mid-rupture — the mechanism invoked for the huge shallow slip of the 2011 Mw 9.0 Tohoku-oki earthquake.",
      ),
    ],
  },
];
