// DIVERGENT MARGINS — Nature Ontology scene 01.
//
// Source: /home/shax/Documents/Research/nature_ontology/01_divergent_boundaries.md
// (2026-08-23). Every substantive claim there is tagged ESTABLISHED / CONTESTED /
// SPECULATIVE, and citations are tagged [VERIFIED] (DOI resolved + Crossref-checked
// on 2026-08-23) or [CLAIMED] (cited from memory, not verified). Those tags are
// carried forward here verbatim — nothing contested is laundered into established.
//
// The registered collision for this domain is COL_001
// (/home/shax/Apps/semantic_compiler/registry/correspondence.py), filed against
// mapping NAT_DIV_001 ("Separation is the generative act."). It is on the slide
// face by design: a slide that shows its own refutation is the only kind this
// deck ships.
import type { Detail, Scene, SourceRef } from "../types";

const SOURCE_DOC =
  "Nature Ontology 01 — Divergent Plate Boundaries (research/nature_ontology/01_divergent_boundaries.md)";

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-divergent",
  act: "The Laws",
  title: "DIVERGENT MARGINS",
  kicker:
    "Where two plates part, new planet forms — the majority of Earth's entire magma budget. And the ridge is not the engine.",
  quote: "The generative site is not the generative engine.",
  attribution:
    "COL_001, the registered collision against NAT_DIV_001 — on the slide face by design.",
  visual: "diagram",
  camera: [0, 0.6, 10.5],
  stats: [
    {
      value: "3.4 km²/yr",
      label:
        "new oceanic crust — matched by ~3.4 km²/yr destroyed at trenches (Rowley 2002, VERIFIED)",
      accent: "teal",
    },
    {
      value: "~20 km³/yr",
      label:
        "new igneous rock — the majority (~60–75%) of Earth's total magma production (Crisp 1984, VERIFIED)",
      accent: "cyan",
    },
    {
      value: "2,000 t/s",
      label:
        "≈ 6×10¹³ kg/yr of new crust, every second, for at least ~180 Myr (derived; inputs as cited)",
      accent: "gold",
    },
  ],
  cards: [
    {
      title: "Separation Creates",
      subtitle: "ESTABLISHED — the older literature calls these constructive plate margins",
      accent: "green",
      lines: [
        "The mantle rises because the plates part, and it melts because the pressure drops — decompression melting, not heating. Nothing warms the rock; opening the gap is sufficient. New crust freezes at the axis; the youngest material sits at the boundary and age increases with distance, a symmetric tape recorder of its own creation (Vine & Matthews 1963, VERIFIED). Separation is literally where new material forms.",
      ],
    },
    {
      title: "The Collision",
      subtitle: "COL_001 — filed against NAT_DIV_001: \"Separation is the generative act.\"",
      accent: "crimson",
      lines: [
        "Ridges are largely PASSIVE. Slab pull dominates the plate-driving force budget by roughly 10× — old, cold lithosphere sinking under its own weight is the engine (Forsyth & Uyeda 1975; Conrad & Lithgow-Bertelloni 2002, both VERIFIED). And area created is balanced by area destroyed: new crust, never net crust (Rowley 2002, VERIFIED). The generative site is not the generative engine.",
      ],
    },
    {
      title: "Control Case: Venus",
      subtitle: "The planet that kept its atmosphere and cooked under it",
      accent: "gold",
      lines: [
        "Stagnant lid: no ridge-trench network, no recycling. 92 bar CO₂ at 464 °C — no water, no weathering thermostat, no subduction return leg (ESTABLISHED). Honest complication: Venus IS volcanically active — Magellan caught a vent at Maat Mons changing shape (Herrick & Hensley 2023, VERIFIED). The control case is \"no sustained organized separation and recycling,\" not \"no activity.\"",
      ],
    },
    {
      title: "Control Case: Mars",
      subtitle: "The planet that lost its atmosphere to space",
      accent: "purple",
      lines: [
        "Dynamo dead by roughly 4 Ga (Acuña et al. 1999, VERIFIED). MAVEN measured ~66% of the planet's atmospheric argon stripped to space — argon is noble, so only escape removes it (Jakosky et al. 2017, VERIFIED). Honest complication: the no-field→stripping link is CONTESTED — Venus keeps 92 bar with no field. The timing coincidence on Mars is strong; the general principle is not settled.",
      ],
    },
    {
      title: "What Survives",
      subtitle: "COL_001 repair route — the qualified thesis, stronger for the qualification",
      accent: "teal",
      lines: [
        "Separation is the generative PHASE of a creation–destruction circulation; the cycle is the unit, not either pole. The one planet that kept circulating is the one with a thermostat, a persistent dynamo, an ocean, and a biosphere — a consistency observation on N=1, not a proof. A version that keeps the ridge and drops the trench misrepresents the physics.",
      ],
    },
  ],
  rows: [
    {
      left: "Slab pull",
      right:
        "~10¹³ N/m — the sinking of old, dense lithosphere dominates the driving budget (Forsyth & Uyeda 1975, VERIFIED; magnitudes: Turcotte & Schubert, textbook, CLAIMED)",
    },
    {
      left: "Ridge push",
      right:
        "~2–4×10¹² N/m — an order of magnitude smaller, and it is gravitational sliding off a hot, high ridge. Nothing at the ridge shoves.",
    },
    {
      left: "The ledger",
      right:
        "area created ≈ area destroyed, ~3.4 km²/yr each (Rowley 2002, VERIFIED). The constancy of that rate since 180 Ma is CONTESTED; the magnitude is agreed to within tens of percent.",
    },
  ],
  footer:
    "Every figure carries its source's own tag: VERIFIED = DOI resolved and Crossref-checked 2026-08-23; CLAIMED = cited from memory, unverified; CONTESTED = live debate. Nothing contested is presented as established.",
};

const SRC = (
  title: string,
  section: string,
  excerpt: string,
  why?: string,
): SourceRef => ({ title, section, excerpt, artifact: SOURCE_DOC, why });

export const DEEP: { id: string; detail: Detail; sources: SourceRef[] }[] = [
  {
    // eid("nature-divergent", "Separation Creates") — computed, not guessed.
    id: "nature-divergent:separation-creates",
    detail: {
      overview:
        "Divergent boundaries are literally where new lithosphere is made. Roughly 3.4 km² of new oceanic crust per year, ~20 km³/yr of new igneous rock, ~6×10¹³ kg/yr — about two thousand tonnes of new crust every second, the majority of Earth's total magmatic output. That part of the thesis is textbook fact, not metaphor.",
      mechanism:
        "At a mid-ocean ridge the asthenospheric mantle rises to fill the opening gap. Ascent is fast enough to be nearly adiabatic, so the rising peridotite crosses its solidus and partially melts — decompression melting: the rock melts because the pressure drops, not because anything heats it (standard treatment: McKenzie & Bickle 1988, CLAIMED). The basaltic melt segregates, rises, and freezes into the three-layer oceanic crust — pillow lavas over sheeted dikes over gabbro (Penrose ophiolite model, 1972 conference consensus, CLAIMED). Typical thickness: 7.1 ± 0.8 km away from hotspots (White, McKenzie & O'Nions 1992, VERIFIED).",
      structure:
        "The global ridge system is ~65,000 km long (commonly quoted 60,000–80,000 km). Spreading rate is the master variable: ultraslow ridges (Gakkel, ~6–14 mm/yr) expose mantle peridotite and form a distinct ridge class (Dick, Lin & Schouten 2003, VERIFIED); the Mid-Atlantic Ridge spreads ~20–25 mm/yr — about as fast as fingernails grow; the East Pacific Rise reaches ~140–150 mm/yr, the fastest present-day spreading (MORVEL: DeMets, Gordon & Argus 2010, VERIFIED; age grid: Müller et al. 2008, VERIFIED). Consistency check: 3.4 km²/yr over ~65,000 km implies a mean full rate of ~52 mm/yr — squarely between MAR and EPR, as it should be.",
      causeEffect: [
        "New crust cools through the Curie temperature and locks in the geomagnetic field direction; field reversals therefore write symmetric magnetic stripes on both flanks — the seafloor as a two-track tape recorder (Vine & Matthews 1963, VERIFIED; Morley's independent, rejected 1963 submission is history of science, CLAIMED).",
        "The calibrated stripe record converts the ocean floor into a readable age map: area-weighted mean crustal age only ~60–65 Myr; essentially nothing in situ older than ~180 Ma (Müller et al. 2008, VERIFIED). A claim of ~340 Ma crust in the Herodotus Basin exists (Granot 2016, CLAIMED) and is CONTESTED.",
        "Oceanic crust is young because it is continuously created and continuously destroyed — the generative boundary produces ephemeral, recycled material. Continents preserve rock to ~4.0 Ga.",
      ],
      examples: [
        "Continental rifting is the in-progress case: the East African Rift opens at ~6–7 mm/yr near Afar, decreasing southward (Stamps et al. 2008, VERIFIED). In September 2005 the Dabbahu segment opened up to 8 m along a 60 km dyke in about two weeks — decades of budget spent in one magmatic episode (Wright et al. 2006, VERIFIED).",
        "Afar's three arms display consecutive stages of one process: continental rift (Main Ethiopian Rift) → proto-ocean (Red Sea, organized spreading since ~5 Ma in the south; Bosworth et al. 2005, CLAIMED) → mature basin (Atlantic, ~180 Myr).",
        "Most rifts fail: aulacogens — failed arms like the Reelfoot Rift and Benue Trough — vastly outnumber successful ocean basins. Separation attempts vastly outnumber separations (ESTABLISHED as a class).",
      ],
      residual:
        "The mass budget is a derived figure from cited ranges (3.4 km²/yr × 6.5–7.1 km thickness × 2.9–3.0 t/m³ ≈ 20–24 km³/yr ≈ 60 Gt/yr ≈ 1.9×10⁶ kg/s). The headline numbers are order-of-magnitude anchors, which is all the argument requires. Rowley's claim that production has been CONSTANT since 180 Ma is separately CONTESTED — competing reconstructions vary by tens of percent; this deck uses only the magnitude, never the constancy.",
    },
    sources: [
      SRC(
        "Rowley 2002, GSA Bulletin 114, 927-933 [VERIFIED]",
        "§1.4 The mass/area budget",
        "~3.4 km²/yr created, matched by ~3.4 km²/yr subducted; approximately steady over the last 180 Myr — the constancy claim is CONTESTED.",
        "doi:10.1130/0016-7606(2002)114<0927:ROPCAD>2.0.CO;2 — the area budget, both legs.",
      ),
      SRC(
        "Crisp 1984, JVGR 20, 177-211 [VERIFIED]",
        "§1.4",
        "Ocean-ridge magmatism is of order 20 km³/yr and constitutes the clear majority (~60–75%) of Earth's total magma production.",
        "doi:10.1016/0377-0273(84)90039-8 — the standard global magma-budget compilation.",
      ),
      SRC(
        "White, McKenzie & O'Nions 1992, JGR 97 [VERIFIED]",
        "§1.1",
        "Typical oceanic crustal thickness: 7.1 ± 0.8 km away from hotspots and fracture zones.",
        "doi:10.1029/92JB01749 — the thickness input to the volume/mass derivation.",
      ),
      SRC(
        "Vine & Matthews 1963, Nature 199, 947-949 [VERIFIED]",
        "§1.3 Magnetic striping",
        "Symmetric stripes of alternating magnetic polarity on either side of the ridge axis — the single most decisive confirmation of seafloor spreading.",
        "doi:10.1038/199947a0",
      ),
      SRC(
        "Wright et al. 2006, Nature 442, 291-294 [VERIFIED]",
        "§2.1 East African Rift",
        "The Dabbahu segment opened by up to 8 m along a 60 km dyke in about two weeks.",
        "doi:10.1038/nature04978 — rifting is episodic, not smooth.",
      ),
    ],
  },

  {
    // eid("nature-divergent", "The Collision") — computed, not guessed.
    id: "nature-divergent:the-collision",
    detail: {
      overview:
        "COL_001, the registered collision in the semantic compiler's correspondence registry, filed against mapping NAT_DIV_001. Translation claim under test: \"Separation is the generative act.\" Domain finding: divergent boundaries do create new crust — ~3.4 km²/yr, ~20 km³/yr, ~2,000 tonnes/second, the majority of Earth's magma budget. But ridges are largely passive: slab pull dominates the plate-driving force budget by roughly 10×, and area created is balanced by area destroyed.",
      mechanism:
        "Torque-balance analysis shows plate speed correlates with the fraction of plate boundary that is subducting slab, and with little else: slab-related forces dominate the driving budget (Forsyth & Uyeda 1975, VERIFIED). Modern global models attribute the large majority of driving power to the negative buoyancy of subducted lithosphere, via direct slab pull and slab-driven mantle flow (Conrad & Lithgow-Bertelloni 2002, VERIFIED). Order of magnitude: slab pull ~10¹³ N/m; ridge push ~2–4×10¹² N/m (Turcotte & Schubert, textbook values, CLAIMED).",
      causeEffect: [
        "Correction 1 (ESTABLISHED): \"ridge push\" is not magma pushing plates apart. It is gravitational sliding — the ridge stands high because it is hot and buoyant, and the plate slides down that gentle slope. Nothing at the ridge shoves.",
        "Correction 2 (ESTABLISHED): ridge upwelling is predominantly passive. The mantle rises because the plates part; away from hotspot-influenced sections (Iceland is the acknowledged exception), the ridge is where the hole opens, not where the engine sits.",
        "Conservation (ESTABLISHED): on a constant-radius Earth, area created ≈ area destroyed. Separation creates new crust, not net crust. The one genuine net-growth channel — continental crust accumulation — runs through the CONVERGENT limb, via arc magmatism above subduction zones.",
      ],
      implications: [
        "Contact point: the generative SITE is not the generative ENGINE. The ridge is where creation happens (true); it is not why plates move (false). Old, cold, dense lithosphere sinking under its own weight is the main engine; new crust at the ridge is the system's accommodation of that pull.",
        "Repair route (from the registry): re-scope to \"separation is the generative phase of a creation-destruction circulation. The cycle is the unit, not either pole\" — which the translation's own higher law already asserts.",
        "The source's analogy layer encodes the same discipline: NAT_DIV_004 (\"generative separation funded by retirement elsewhere\") exists to carry exactly this point, and the source rules that NAT_DIV_001 must always ship with NAT_DIV_004. Quoting the ridge without the trench cherry-picks the physics.",
      ],
      residual:
        "The analogy layer itself is SPECULATIVE by its own declaration — nothing in it exceeds STRUCTURAL_ANALOGY, confidence 0.40–0.60, and none of it is evidence for the geology; the dependency runs strictly the other way.",
      currentStatus:
        "Registered as COL_001 in /home/shax/Apps/semantic_compiler/registry/correspondence.py; evidence pointer: research/nature_ontology/01_divergent_boundaries.md.",
    },
    sources: [
      SRC(
        "Forsyth & Uyeda 1975, GJI 43, 163-200 [VERIFIED]",
        "§3.2 Slab pull vs ridge push",
        "Plate speed correlates with the fraction of plate boundary that is subducting slab, and with little else: slab-related forces dominate the driving budget.",
        "doi:10.1111/j.1365-246X.1975.tb00631.x — the classic torque-balance result.",
      ),
      SRC(
        "Conrad & Lithgow-Bertelloni 2002, Science 298, 207-209 [VERIFIED]",
        "§3.2",
        "The large majority of driving power comes from the negative buoyancy of subducted lithosphere, via both direct slab pull and slab suction.",
        "doi:10.1126/science.1074161",
      ),
      {
        title: "COL_001 — semantic_compiler/registry/correspondence.py",
        section: "collision_id COL_001, mapping_id NAT_DIV_001",
        excerpt:
          "Contact point: \"the generative SITE is not the generative ENGINE.\" Repair route: \"Re-scope to: separation is the generative phase of a creation-destruction circulation. The cycle is the unit, not either pole.\"",
        artifact: "/home/shax/Apps/semantic_compiler/registry/correspondence.py",
        why: "The registered collision this slide exists to display rather than bury.",
      },
    ],
  },

  {
    // eid("nature-divergent", "Control Case: Venus") — computed, not guessed.
    id: "nature-divergent:control-case-venus",
    detail: {
      overview:
        "The negative control, branch one: a planet that differentiated early and then stopped separating and recycling at the surface — and kept its atmosphere, and cooked under it. Surface ~464 °C, 92 bar CO₂, H₂SO₄ clouds: hot enough to melt lead, pressure equivalent to ~900 m ocean depth (ESTABLISHED).",
      structure:
        "Magellan radar mapping shows no global ridge-trench network, no transform system, no magnetic-striping equivalent (ESTABLISHED). Venus is in a one-plate stagnant-lid or episodically overturning regime — WHICH of those two is CONTESTED (episodic catastrophic resurfacing vs steadier equilibrium resurfacing is a live debate; regime modeling per Solomatov & Moresi and successors, CLAIMED).",
      causeEffect: [
        "The crater clock: ~1,000 impact craters, spatially indistinguishable from random and mostly unmodified, give a mean surface age of a few hundred Myr (observation ESTABLISHED, interpretation CONTESTED; Strom, Schaber & Dawson 1994, VERIFIED). If the episodic reading is right, the alternative to continuous recycling is storing heat under a lid and periodically destroying the entire surface — planetary deferred maintenance.",
        "No thermostat (mechanism ESTABLISHED): no liquid water means no carbonate-silicate weathering sink, and no subduction means no return leg for crustal carbon anyway. Earth and Venus hold comparable carbon inventories — Earth's ~60–90 bar equivalent is locked in limestone BECAUSE the cycle runs (Sleep & Zahnle 2001, CLAIMED). Venus's water is gone: D/H ~100–150× Earth's, the isotopic fingerprint of escaping at least an ocean (Donahue et al. 1982, CLAIMED).",
        "No dynamo, plausibly BECAUSE no plate tectonics (CONTESTED but well-argued): without plate tectonics refrigerating the mantle, core heat flux falls below the adiabatic threshold and the dynamo shuts down (Nimmo 2002, VERIFIED). If correct, a direct causal chain from \"no surface recycling\" to \"no field.\"",
      ],
      implications: [
        "Honest complication, on the slide by design: Venus is not geologically dead. Magellan images eight months apart show a vent at Maat Mons changing shape and apparently filling with lava — active volcanism (Herrick & Hensley 2023, VERIFIED). Some coronae show evidence of localized plume-induced subduction (Davaille, Smrekar & Tomlinson 2017, VERIFIED).",
        "The control case is therefore \"no sustained, organized plate separation and recycling\" — NOT \"no activity.\" Venus differentiates locally and abortively; it never sustains the cycle.",
      ],
      residual:
        "Earth-vs-Venus is N=1 vs N=1. The control-case logic is far weaker than a real controlled experiment and must not be quoted as experimental proof. Venus's stagnation may also trace to losing its water — a contingent external history, meaning the cause may be circumstance, not structure.",
    },
    sources: [
      SRC(
        "Strom, Schaber & Dawson 1994, JGR Planets 99 [VERIFIED]",
        "§4.1 The crater clock",
        "~1,000 impact craters, spatially indistinguishable from random and mostly unmodified — motivating the global-resurfacing hypothesis. Interpretation CONTESTED.",
        "doi:10.1029/94JE00388",
      ),
      SRC(
        "Nimmo 2002, Geology 30, 987-990 [VERIFIED]",
        "§4.1 — 'Why does Venus lack a magnetic field?'",
        "Without plate tectonics to refrigerate the mantle, core heat flux falls below the adiabatic threshold and the dynamo shuts down. CONTESTED but well-argued.",
        "doi:10.1130/0091-7613(2002)030<0987:WDVLAM>2.0.CO;2",
      ),
      SRC(
        "Herrick & Hensley 2023, Science 379, 1205-1208 [VERIFIED]",
        "§4.1 — honest nuance",
        "A vent at Maat Mons changed shape between Magellan passes eight months apart, apparently filling with lava — active volcanism on Venus.",
        "doi:10.1126/science.abm7735 — the complication the slide carries rather than hides.",
      ),
      SRC(
        "Davaille, Smrekar & Tomlinson 2017, Nature Geoscience 10 [VERIFIED]",
        "§4.1",
        "Experimental and observational evidence for plume-induced subduction on Venus — localized, abortive differentiation without a sustained cycle.",
        "doi:10.1038/ngeo2928",
      ),
    ],
  },

  {
    // eid("nature-divergent", "Control Case: Mars") — computed, not guessed.
    id: "nature-divergent:control-case-mars",
    detail: {
      overview:
        "The negative control, branch two: early activity, then arrest — and the atmosphere lost to space. Mars differentiated early (core, mantle, crust), ran a dynamo for its first few hundred Myr, and then stopped.",
      structure:
        "Mars Global Surveyor found intense remanent crustal magnetization over the ancient southern highlands — requiring an early core dynamo — while the giant impact basins Hellas and Argyre (~4.0–3.9 Ga) are unmagnetized, bracketing dynamo death at roughly 4.1–3.9 Ga (Acuña et al. 1999, VERIFIED; timing refinement Lillis et al. 2008, CLAIMED). Whether Mars ever had true plate tectonics is CONTESTED: the magnetization is organized in quasi-linear bands reminiscent of seafloor stripes (Connerney et al., CLAIMED) and an early plate-recycling phase has been seriously proposed (Sleep 1994, CLAIMED), but the consensus is only \"early mobile/active, then stagnant lid.\"",
      causeEffect: [
        "Atmospheric stripping, measured not inferred (ESTABLISHED): MAVEN's ³⁸Ar/³⁶Ar measurement shows ~66% of the planet's atmospheric argon has been lost to space by pick-up-ion sputtering — argon, being noble, can only be removed by escape, making it the clean tracer (Jakosky et al. 2017, VERIFIED).",
        "Integrated loss: present-day escape is of order a few kg/s, but scaling to the young Sun's far higher EUV and solar-wind flux implies at least ~0.5–1 bar CO₂-equivalent lost — most of an early atmosphere thick enough for liquid surface water (Jakosky et al. 2018, VERIFIED).",
        "The proposed chain: small planet → fast interior cooling → dynamo dies ~4 Ga → no magnetospheric obstacle → sputtering proceeds → atmosphere thins → greenhouse collapses → surface water lost. The first and last links are well evidenced.",
      ],
      implications: [
        "The middle link — \"no field, therefore stripping\" — is genuinely CONTESTED: Venus retains 92 bar with no field, and some modeling argues an intrinsic field does not necessarily reduce net escape (Gunell et al. 2018, CLAIMED). State it as the source does: the timing coincidence on Mars is strong; the general principle is not settled.",
        "Not perfectly dead either: InSight recorded hundreds of marsquakes concentrated at Cerberus Fossae — residual, localized tectonism (Giardini et al. 2020, CLAIMED). Arrested, not inert.",
      ],
      residual:
        "Both control planets are degraded in exactly the regulatory dimensions the cycle provides — thermostat, dynamo, volatile retention — however the field question resolves. But what they lack is the WHOLE cycle (separation AND subduction AND volatile recycling), not merely the separation step. The control case supports the circulation claim, not a ridge-alone claim.",
    },
    sources: [
      SRC(
        "Acuña et al. 1999, Science 284, 790-793 [VERIFIED]",
        "§4.2 — the dynamo bracket",
        "Intense remanent magnetization over the ancient southern highlands; the unmagnetized Hellas and Argyre basins bracket dynamo death at roughly 4.1–3.9 Ga.",
        "doi:10.1126/science.284.5415.790",
      ),
      SRC(
        "Jakosky et al. 2017, Science 355, 1408-1410 [VERIFIED]",
        "§4.2 — stripping, measured",
        "~66% of the planet's atmospheric argon has been lost to space by pick-up-ion sputtering — argon, being noble, can only be removed by escape.",
        "doi:10.1126/science.aai7721 — a measurement, not an inference.",
      ),
      SRC(
        "Jakosky et al. 2018, Icarus 315, 146-157 [VERIFIED]",
        "§4.2 — integrated loss",
        "Scaling to the young Sun's EUV/solar-wind flux implies integrated losses of at least ~0.5–1 bar CO₂-equivalent.",
        "doi:10.1016/j.icarus.2018.05.030",
      ),
      SRC(
        "Gunell et al. 2018, A&A 614, L3 [CLAIMED]",
        "§4.2 — the contested middle link",
        "Why an intrinsic magnetic field does not protect a planet against atmospheric escape — the no-field→stripping link is CONTESTED, and Venus keeps 92 bar with no field.",
        "Cited from the source's reference list as CLAIMED; not independently verified.",
      ),
    ],
  },

  {
    // eid("nature-divergent", "What Survives") — computed, not guessed.
    id: "nature-divergent:what-survives",
    detail: {
      overview:
        "The source's executive verdict on its own thesis: SUPPORTED WITH MAJOR QUALIFICATIONS. The unqualified version — separation as the productive force — does not survive a hostile reading. The qualified version does, and is stronger for it: separation is the generative phase of a coupled creation–destruction circulation, and planets that lack the circulation stagnate.",
      mechanism:
        "The circulation is what couples to habitability. The carbonate-silicate thermostat (Walker, Hays & Kasting 1981, VERIFIED) has plausibly held Earth in the liquid-water window for ~4 Gyr against a Sun brightening ~30% — but its return leg is tectonic: seafloor carbonate must be subducted and re-emitted through volcanism on ~10⁸ yr timescales or the feedback dies at the cold wall. Weathering is the sink; plate recycling is the source. And the continents themselves — the phosphorus supply for life — are built by the CONVERGENT limb, arc magmatism above subduction zones. Divergence alone builds basalt; it takes the full cycle to build and re-expose continents.",
      implications: [
        "Whether plate tectonics is NECESSARY for complex life is CONTESTED, honestly: the Rare Earth position (Ward & Brownlee 2000, CLAIMED) bundles thermostat, continents, nutrients and field into a near-prerequisite; modern stagnant-lid modeling finds one-plate Earth-sized planets can stay habitable for 1–5 Gyr (Foley & Smye 2018; Tosi et al. 2017, both VERIFIED). The source lands on: helpful and sufficient-ish on N=1 evidence; necessity NOT established.",
        "The Wilson cycle is the frame at the largest scale (Wilson 1966, VERIFIED): rift → ocean → closure → collision → rift again, often along the old suture. Neither the merged nor the split state is terminal.",
        "One temptation is explicitly forbidden by the source: do not quote it as \"Rodinia's breakup caused the Cambrian explosion.\" The correlation is real; causation is NOT established; the lag from main breakup to radiation is 150–200 Myr, and the best-documented nutrient pulse (the Transgondwanan Supermountain; Squire et al. 2006, VERIFIED) came from a COLLISION, not a breakup. Separation reorganized the stage; the play's causes remain under litigation (Smith & Harper 2013, VERIFIED).",
      ],
      residual:
        "Everything below the source's analogy line is SPECULATIVE by its own declaration — six IsomorphismMapping records, confidence 0.40–0.60, nothing above STRUCTURAL_ANALOGY, every one carrying mandatory residual mismatches. The meta-note is the honest summary: \"separation is where creation happens\" — yes, ESTABLISHED. \"Separation is the productive force\" — no; the force budget says the circulation is pulled by the departure of the old. Systems that stop circulating (Venus, Mars) lose their regulators.",
      currentStatus:
        "Verdict carried unmodified from the source document. COL_001's repair route and the source's own qualified thesis are the same sentence: the cycle is the unit, not either pole.",
    },
    sources: [
      SRC(
        "Walker, Hays & Kasting 1981, JGR 86, 9776-9782 [VERIFIED]",
        "§5.1 The carbonate-silicate thermostat",
        "A negative feedback with a response time of order 10⁵–10⁶ yr that has plausibly kept Earth's surface within the liquid-water window for ~4 Gyr — with a tectonic return leg.",
        "doi:10.1029/JC086iC10p09776",
      ),
      SRC(
        "Foley & Smye 2018, Astrobiology 18, 873-896 [VERIFIED]",
        "§5.3 — the anti-necessity result",
        "Earth-sized stagnant-lid planets can sustain volcanic outgassing, a functioning (if weaker) weathering feedback, and habitable climates for 1–5 Gyr.",
        "doi:10.1089/ast.2017.1695 — why necessity is NOT claimed.",
      ),
      SRC(
        "Wilson 1966, Nature 211, 676-681 [VERIFIED]",
        "§6.1 — 'Did the Atlantic Close and then Re-Open?'",
        "The generalized Wilson cycle: rift → ocean → closure → collision → rift again, often along the old suture.",
        "doi:10.1038/211676a0",
      ),
      SRC(
        "Smith & Harper 2013, Science 341, 1355-1356 [VERIFIED]",
        "§6.2 — Rodinia and the Cambrian",
        "The synthesis position is explicitly multi-causal: tectonics sets the stage rather than pulls one lever. Causation is NOT established.",
        "doi:10.1126/science.1239450 — the guard against quoting correlation as cause.",
      ),
    ],
  },
];
