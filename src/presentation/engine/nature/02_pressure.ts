// PRESSURE AND RELEASE — nature ontology scene 02 (volcanism).
//
// Source of record: /home/shax/Documents/Research/nature_ontology/02_volcanism_pressure_release.md
// (2026-08-23 research pass). Registered collision: COL_002 in
// /home/shax/Apps/semantic_compiler/registry/correspondence.py — carried on the
// slide face, not buried in a deep dive.
//
// Epistemic labels are carried verbatim from the source: ESTABLISHED / CONTESTED /
// SPECULATIVE / CLAIMED. Nothing is laundered upward. In particular:
//   - the 75%/90% repose statistic is ESTABLISHED as a POOLED pattern only, and its
//     attribution to NASEM 2017 is CLAIMED;
//   - Jellinek & DePaolo 2003 is ESTABLISHED as a model, CONTESTED in generality;
//   - Pinatubo's ~500-yr repose is CLAIMED in exact date, ESTABLISHED in order of
//     magnitude; the 17-20 Mt SO2 attribution to Bluth et al. 1992 is CLAIMED.
import type { Detail, Scene, SourceRef } from "../types";

const RESEARCH_DOC = "research/nature_ontology/02_volcanism_pressure_release.md";
const COLLISION_REGISTRY = "semantic_compiler/registry/correspondence.py";

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-pressure",
  act: "The Laws",
  title: "PRESSURE AND RELEASE",
  kicker:
    "Leak or detonate is decided by the release path — and the chamber wall fails at the same few MPa no matter how long the wait.",
  quote:
    "The question that decides eruption style is not \"how much gas?\" It is: can the gas leave the magma faster than the magma ascends?",
  attribution:
    "Cassidy, Manga, Cashman & Bachmann 2018 — a race between decompression and outgassing, not viscosity per se.",
  visual: "flow",
  camera: [0, 0.7, 11],
  cards: [
    {
      title: "The Race, Not The Viscosity",
      subtitle: "ESTABLISHED — the core mechanism",
      accent: "teal",
      lines: [
        "Basalt at 10–10² Pa·s lets bubbles decouple from the melt and leak continuously — the gradient bleeds off in thousands of small events. Hydrous rhyolite at 10⁴–10⁶ Pa·s traps gas in the parcel that made it: 4–6 wt% dissolved H₂O expands ~10²–10³-fold on decompression, the foam crosses the glass transition and shatters. Fragmentation inverts the medium — gas-with-particles — and the jet is Plinian. Same physics, two attractors, decided by outgassing efficiency (Cassidy et al. 2018; Papale 1999).",
      ],
    },
    {
      title: "COL_002: NO BANKED PRESSURE",
      subtitle: "The registered collision — translation vs domain",
      accent: "crimson",
      lines: [
        "Chamber walls fail at roughly FIXED in-situ tensile strength — 0.5–9 MPa, most commonly 2–4 MPa — regardless of repose (Gudmundsson 2012). A volcano cannot bank pressure by waiting. Global return times are memoryless (Papale 2018); the best predictor of the next VEI is the volcano's median past VEI, ~53% — not repose (Colosi & Brodsky 2022). What suppression stores is VOLUME and volatile chemical potential, not pressure. Repose correlates with size as common cause via path impedance, not as direct mechanism.",
      ],
    },
    {
      title: "The Pooled Pattern, Hedged",
      subtitle: "ESTABLISHED as a pooled statistic ONLY",
      accent: "gold",
      lines: [
        "~75% of VEI 5 and ~90% of VEI ≥6 eruptions were preceded by more than 100 years of repose (Simkin & Siebert 1994; statistic verified in secondary sources — its attribution to the NASEM 2017 report is CLAIMED). This is a POOLED statistic across the global catalog. It does not predict any individual system: per-volcano time- and size-predictable models perform poorly (Marzocchi & Bebbington 2012).",
      ],
    },
    {
      title: "The Compliance Trap",
      subtitle: "ESTABLISHED as a model, CONTESTED in generality",
      accent: "purple",
      lines: [
        "Jellinek & DePaolo 2003: the largest catastrophes come from systems whose chamber walls are too SOFT to fail early. Viscoelastic wall rock relaxes every small overpressure faster than it accumulates, so no small eruption ever happens — and caldera-scale volume assembles behind a wall that cannot hold a few MPa. Suppression via compliance, not strength. Compliance traps rather than releases.",
      ],
    },
  ],
  stats: [
    {
      value: "2-4 MPa",
      label:
        "commonest wall-failure band (full range 0.5-9 MPa) — set by rock tensile strength, not by waiting. Gudmundsson 2012",
      accent: "crimson",
    },
    {
      value: "~53%",
      label:
        "next-VEI prediction from the volcano's own median past VEI — the best single predictor; repose adds marginal skill. Colosi & Brodsky 2022",
      accent: "teal",
    },
    {
      value: "x100-1000",
      label:
        "volume expansion of dissolved H2O exsolving on decompression — the working fluid of every explosive eruption. Sparks 1978",
      accent: "gold",
    },
  ],
  rows: [
    {
      left: "Mount St Helens 1980",
      right:
        "123-yr repose. Vertical path blocked by a cold plug; gas-charged cryptodome bulged the north flank at 1.5–2.5 m/day. A M 5.1 quake released ~2.5 km³ of flank — decompression did the rest: lateral blast, 9-hr Plinian column, VEI 5. The trigger was removal of confinement, not a final pressure spike (Lipman & Mullineaux 1981).",
    },
    {
      left: "Pinatubo 1991",
      right:
        "~500-yr repose (exact date CLAIMED; order of magnitude ESTABLISHED). VEI 6, column 35–40 km, ~17–20 Mt SO₂ to the stratosphere (Bluth et al. 1992 — attribution CLAIMED), global cooling ~0.4–0.5 °C over ~2 years (McCormick et al. 1995). Half a millennium of silence stored a hydrous dacite body — volume and volatiles, at the same few-MPa threshold as everyone else.",
    },
  ],
  footer:
    "COL_002 stands OPEN in the collision registry: \"suppression stores pressure and pays it out later\" collides with the domain at one named contact point — what is stored is volume and volatile chemical potential, not pressure. Repair route: re-scope to accumulated mass at a constant release threshold, and never promise \"longer quiet means bigger blowup\" about any individual system.",
};

// ---------------------------------------------------------------------------
// Deep dives. Ids are COMPUTED from titles with the contract formula — never
// hand-written — so they cannot drift from the record titles.
// ---------------------------------------------------------------------------

const did = (title: string): string =>
  "nature-pressure:" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const SRC = (section: string, excerpt: string, why?: string): SourceRef => ({
  title: "Volcanism: Pressure Accumulation, Release Regimes, and What Suppression Does",
  section,
  excerpt,
  artifact: RESEARCH_DOC,
  why,
});

interface DeepRecord {
  title: string;
  detail: Detail;
  sources: SourceRef[];
}

const RECORDS: DeepRecord[] = [
  {
    title: "The Race, Not The Viscosity",
    detail: {
      overview:
        "Eruption style — gentle leak or Plinian detonation — is decided by whether exsolving gas can escape the magma faster than decompression liberates it. Viscosity is the strongest single lever on that race, but it is not the decision itself. ESTABLISHED.",
      mechanism:
        "Low-viscosity basalt (10–10² Pa·s): bubbles nucleate, decouple, rise through the melt, coalesce and escape at the vent — the volatile gradient is dissipated continuously, in small increments, at low energy per event. High-viscosity hydrous rhyolite (10⁴–10⁶ Pa·s; 10⁹–10¹² Pa·s degassed): bubble rise velocity is effectively zero, so the system ascends closed. Decompression does work on a foam climbing toward the packing limit (~75–80 vol%); when the strain rate demanded by expansion exceeds the melt's structural relaxation rate, the magma crosses the glass transition as a solid and shatters (Papale 1999; Spieler et al. 2004). Fragmentation inverts the medium from liquid-with-bubbles to gas-with-particles, and the stored expansion energy leaves as one continuous jet.",
      causeEffect: [
        "Slow ascent -> gas escapes through permeable bubble networks (percolation at ~60-70 vol% vesicularity; Eichelberger et al. 1986; Klug & Cashman 1996) -> magma loses its driving gas -> stalls as plug/dome or extrudes effusively.",
        "Fast ascent -> no time to outgas -> fragmentation -> explosive. Same magma, two attractors (Woods & Koyaguchi 1994; Melnik & Sparks 1999).",
        "4-6 wt% dissolved H2O at ~200 MPa storage falls to ~0.1 wt% at atmospheric pressure; the exsolved difference as steam occupies hundreds to ~1000 times the melt volume that released it — the working fluid of every explosive eruption (Sparks 1978; Cashman & Sparks 2013).",
      ],
      residual:
        "Viscosity is not destiny, and the source says so explicitly: obsidian flows are degassed rhyolite erupting effusively (Eichelberger et al. 1986; Cordón Caulle 2011-12 did both from one vent), and basalt that ascends too fast to outgas goes Plinian (Etna 122 BCE, Tarawera 1886). The controlling variable is gas retention along the path (Cassidy et al. 2018).",
      currentStatus:
        "ESTABLISHED — standard, uncontroversial volcanology; the organising synthesis is Cassidy, Manga, Cashman & Bachmann 2018, Nature Communications 9:2839.",
    },
    sources: [
      SRC(
        "Section 2.2",
        "The question that decides eruption style is not \"how much gas?\" but \"can the gas leave the magma faster than the magma ascends?\" — a race between decompression rate and outgassing rate.",
        "The mechanism, stated exactly, with the primary citations (Gonnermann & Manga 2007; Cassidy et al. 2018; Woods & Koyaguchi 1994).",
      ),
      SRC(
        "Section 2.1",
        "Melt viscosity: basalt ~10-10² Pa·s; rhyolite/dacite ~10⁴-10⁶ Pa·s hydrous, 10⁹-10¹² Pa·s degassed. Typical dissolved H₂O pre-eruptive: rhyolite ~4-6 wt% at ~200 MPa storage.",
        "The load-bearing numbers on the slide face.",
      ),
    ],
  },
  {
    title: "COL_002: No Banked Pressure",
    detail: {
      overview:
        "The registered collision between the translation layer and the domain. Translation claim: \"Suppression stores pressure and pays it out later.\" Domain finding: chamber walls fail at roughly fixed in-situ tensile strength regardless of repose, so pressure cannot be banked by waiting. Status: OPEN; resolution authority: the translator.",
      mechanism:
        "A chamber wall fails in tension when internal excess pressure exceeds the in-situ tensile strength of the host rock: 0.5-9 MPa, most commonly 2-4 MPa, from hydraulic-fracture measurements in drill holes to ~9 km depth worldwide (Gudmundsson 2012). The wall is a fuse rated at a few MPa. A 500-year-quiet system is not at 500x the pressure of a 1-year-quiet system; both fail within the same narrow band. What varies over orders of magnitude is how much eruptible, gas-charged VOLUME sits behind the fuse when it blows.",
      causeEffect: [
        "Global eruption return times are approximately exponential — memoryless (Papale 2018). Elapsed quiet time carries no information about when or how big, at the global scale. A literal pressure-banking model predicts the opposite and is falsified.",
        "The best single predictor of a volcano's next VEI is the median VEI of its own past eruptions, ~53% accuracy — volcanoes have persistent styles; repose adds marginal skill (Colosi & Brodsky 2022, trained on the full GVP catalog).",
        "The repose-magnitude correlation that DOES exist pooled across volcanoes is a common-cause structure: high release-path impedance simultaneously causes infrequent eruption, accumulation of large gas-charged volume, and violent release. Repose is a symptom of impedance, not a mechanism.",
      ],
      implications: [
        "What suppression stores is volume and volatile chemical potential energy — mass and dissolved gas — not pressure. The release threshold is constant.",
        "The registered repair route: re-scope the translation to accumulated MASS and volatiles at a constant threshold, common cause rather than direct mechanism. The analogy may not promise \"longer quiet means bigger blowup\" about any individual system.",
      ],
      residual:
        "CONTESTED at the per-volcano scale: some individual closed systems do show renewal-like behaviour (Papale 2018 caveat, Marzocchi & Bebbington 2012). The falsification is of the naive global claim, and the source is explicit that anyone quoting it to say \"pressure builds for 500 years\" is misquoting it.",
      currentStatus:
        "Collision COL_002, mapping VOLC_001, status OPEN in the semantic-compiler collision registry. A collision is not a rejection: the compiler surfaces it; the translator repairs, re-scopes, or accepts the cost.",
    },
    sources: [
      {
        title: "Correspondence Gate and Collision Registry — COL_002",
        section: "DEFAULT_COLLISIONS",
        excerpt:
          "contact_point: \"what is stored is volume and volatile chemical potential, not pressure\" — Chamber walls fail at roughly fixed in-situ tensile strength (0.5-9 MPa, commonly 2-4 MPa) regardless of repose, so pressure cannot be banked by waiting.",
        artifact: COLLISION_REGISTRY,
        why: "The registered collision this slide carries on its face.",
      },
      SRC(
        "Section 1.2",
        "A magmatic system cannot store arbitrarily large pressure by waiting longer. The wall is a fuse rated at a few MPa. Long repose does not mean high pressure at failure; failure pressure is roughly constant.",
        "The single most important consequence for the thesis, per the source itself.",
      ),
      SRC(
        "Section 4.2",
        "Global return times are approximately exponential — i.e., memoryless (Papale 2018). The best single predictor of the next VEI is the median VEI of the volcano's own past eruptions (~53% accuracy) — volcanoes have persistent styles; repose interval adds marginal skill (Colosi & Brodsky 2022).",
        "The two quantitative legs of the collision.",
      ),
    ],
  },
  {
    title: "The Pooled Pattern, Hedged",
    detail: {
      overview:
        "The pattern that does hold — stated with its limitation attached, because dropping the limitation converts a true pooled statistic into a false per-volcano prediction.",
      structure:
        "Across the global catalog, ~75% of VEI 5 and ~90% of VEI >=6 eruptions were preceded by apparent repose longer than 100 years (tabulated from the Smithsonian catalog since Simkin & Siebert 1994). Passarelli & Brodsky 2012: across 34 well-documented eruptions, repose correlates positively with erupted volume, run-up time, and silica content. Magnitude-frequency is a power law over at least six orders of magnitude (Papale 2018; Mason, Pyle & Oppenheimer 2004).",
      implications: [
        "ESTABLISHED as a pooled statistical pattern: the largest events come almost exclusively from long-quiet systems.",
        "NOT a per-volcano predictor: a minority of volcanoes show weak time- or volume-predictability; most show neither cleanly (Marzocchi & Bebbington 2012). The pooled pattern exists because path impedance causes both long repose and large magnitude — it predicts nothing about any individual system.",
      ],
      residual:
        "Label carried from the source: the statistic itself was verified as quoted in secondary sources during the research pass; its attribution to the NASEM 2017 consensus report (DOI: 10.17226/24650) is CLAIMED, not independently verified. Passarelli & Brodsky's N of 34 is the sample-size caveat the source flags.",
      currentStatus:
        "ESTABLISHED (pooled) + ESTABLISHED negative finding (per-volcano). Both must travel together.",
    },
    sources: [
      SRC(
        "Section 4.1",
        "~75% of VEI 5 and ~90% of VEI >=6 eruptions were preceded by apparent repose longer than 100 years (statistic verified as quoted in secondary sources; attribution to the NASEM 2017 report: CLAIMED).",
        "The pooled pattern, with its CLAIMED attribution label intact.",
      ),
      SRC(
        "Section 4.2",
        "Per-volcano time-predictable and size-predictable models perform poorly. Marzocchi & Bebbington (2012): a minority of volcanoes show weak time- or volume-predictability; most show neither cleanly.",
        "The limitation that must ride on the slide.",
      ),
    ],
  },
  {
    title: "The Compliance Trap",
    detail: {
      overview:
        "The sharp twist: the largest catastrophes come from systems whose chamber walls are too SOFT to fail early. Suppression via compliance, not strength.",
      mechanism:
        "Jellinek & DePaolo 2003 asked why eruptible rhyolite accumulates for 10⁵-10⁶ years instead of leaking out continuously. Around large, hot, long-lived chambers the wall rock is viscoelastic and relaxes overpressure faster than it accumulates — the wall CANNOT hold the few MPa needed to open a dike. Small releases are absorbed by ductile deformation until a caldera-scale volume (~10²-10³ km³) exists, at which point buoyancy of the accumulated mush body, not overpressure, ruptures the roof (Caricchi et al. 2014).",
      implications: [
        "The system is not strongly sealed; it is too accommodating to fail early. Absence of small events is itself the enabling condition for the largest event class.",
        "The eventual trigger (buoyancy) is a different mechanism from the one being absorbed (overpressure) — the store is released by a door the accumulation never knocked on.",
      ],
      residual:
        "Label carried from the source: ESTABLISHED as a model, CONTESTED in generality. It is an end-member for the largest silicic systems, not a general law of volcanoes — any transfer inherits that narrowness (residual recorded on mapping VOLC_003).",
      currentStatus:
        "ESTABLISHED as a model (Jellinek & DePaolo 2003, Bull. Volcanol. 65:363-381; Caricchi et al. 2014, Nature Geoscience 7:126-130), CONTESTED in generality.",
    },
    sources: [
      SRC(
        "Section 1.3",
        "The wall rock is viscoelastic and relaxes overpressure faster than it accumulates — the wall cannot hold the few MPa needed to open a dike. The system is not \"strongly sealed\"; it is too accommodating to fail early. The suppression mechanism is compliance, not strength.",
        "The Jellinek-DePaolo subtlety, verbatim in substance.",
      ),
    ],
  },
  {
    title: "Mount St Helens 1980",
    detail: {
      overview:
        "The blocked-path case with instrumented precursors. Repose 123 years (last activity 1857). VEI 5, ~1 km³ bulk tephra, 57 dead. ESTABLISHED (Lipman & Mullineaux, eds., 1981, USGS Professional Paper 1250).",
      mechanism:
        "Magma could not open a vertical path through the cold plug of the edifice, so a cryptodome of gas-charged dacite intruded the north flank, bulging it outward at ~1.5-2.5 m/day over two months of measured precursors. At 08:32 PDT on 18 May, a M 5.1 earthquake released the oversteepened flank: a ~2.5 km³ debris avalanche — the largest in recorded history — uncorked the cryptodome and hydrothermal system. Decompression from confinement to atmospheric pressure in seconds drove a lateral blast that devastated ~600 km² in minutes, followed by a 9-hour Plinian phase with a ~24 km column.",
      implications: [
        "The release path was chosen by the weakest structural element — the flank — not the designed vent.",
        "The trigger was removal of confinement by an unrelated event, not a final pressure spike. The source calls this an anti-prediction lesson, not a scheduling lesson: suppressed systems fail along the weakest available surface at a trigger unrelated to the store.",
        "The precursor was visible where instrumented: the bulge was measured daily.",
      ],
      residual:
        "The hostile-review answer is carried with the case: the trigger was gravitational, but the blast was not — the avalanche removed confinement from a store emplaced BECAUSE the vertical path was blocked. Dressing it up as pure landslide and as pure pressure-parable both fail.",
      currentStatus: "ESTABLISHED throughout (USGS PP 1250).",
    },
    sources: [
      SRC(
        "Section 3.2",
        "A cryptodome of gas-charged dacite intruded the north flank, bulging it outward at ~1.5-2.5 m/day... a M 5.1 earthquake released the oversteepened flank: ~2.5 km³ debris avalanche... VEI 5, ~1 km³ bulk tephra, 57 dead.",
        "The numbers on the slide row.",
      ),
      SRC(
        "Section 8, A5",
        "The avalanche removed confinement from a gas-charged cryptodome emplaced because the vertical path was blocked; decompression did the rest. Suppressed systems fail along the weakest available surface at a trigger unrelated to the store.",
        "The hostile-review defence of the case's reading.",
      ),
    ],
  },
  {
    title: "Pinatubo 1991",
    detail: {
      overview:
        "The long-quiet case. Repose ~500 years (exact date ~1450 CE: CLAIMED; order of magnitude: ESTABLISHED). VEI 6 — the second-largest eruption of the 20th century, from a volcano that three months earlier was not on most hazard maps as an imminent threat. ESTABLISHED (Newhall & Punongbayan, eds., 1996, Fire and Mud).",
      structure:
        "~8.4-10.4 km³ bulk deposits (~4-5 km³ dense-rock equivalent); column 35-40 km; ~17-20 Mt SO₂ to the stratosphere (Bluth et al. 1992 — attribution CLAIMED); global surface cooling ~0.4-0.5 °C over the following ~2 years (McCormick, Thomason & Trepte 1995).",
      implications: [
        "Half a millennium of silence assembled a large hydrous dacite body — the store was volume and volatiles, not pressure; the failure threshold was the same few MPa as every other chamber.",
        "Read against COL_002: Pinatubo is the pooled pattern's poster case AND the reason the per-volcano hedge matters — nothing about the 500 years predicted 1991 until months-scale unrest began.",
      ],
      residual:
        "Two CLAIMED labels ride on this case and are preserved: the exact ~1450 CE date of the prior eruptive period, and the attribution of the SO₂ figure to Bluth et al. 1992. The cooling figure is stated as ~0.4-0.5 °C per McCormick et al. 1995 — the round \"-0.5 °C\" quoted elsewhere is the top of that range.",
      currentStatus: "ESTABLISHED in outline and magnitude; CLAIMED on the two flagged attributions.",
    },
    sources: [
      SRC(
        "Section 3.2",
        "Repose: ~500 years (CLAIMED for the exact date, ESTABLISHED for order of magnitude). VEI 6: ~8.4-10.4 km³ bulk deposits, column 35-40 km, ~17-20 Mt SO₂ (Bluth et al. 1992 — attribution CLAIMED), global cooling ~0.4-0.5 °C (McCormick, Thomason & Trepte 1995).",
        "The numbers on the slide row, with their labels.",
      ),
    ],
  },
];

export const DEEP: { id: string; detail: Detail; sources: SourceRef[] }[] = RECORDS.map(
  (r) => ({ id: did(r.title), detail: r.detail, sources: r.sources }),
);
