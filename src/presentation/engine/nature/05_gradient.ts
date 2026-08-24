// THE GRADIENT — nature-ontology scene 05.
//
// Source of record: /home/shax/Documents/Research/nature_ontology/05_gradients_and_structure.md
// (research memo built to survive hostile physicist review; every claim carries an
// ESTABLISHED / CONTESTED / SPECULATIVE label, and those labels are preserved here).
//
// The load-bearing item on this slide is COL_005, the registered semantic collision
// from /home/shax/Apps/semantic_compiler/registry/correspondence.py (mapping GRAD_003):
// the two "gradients" are HOMONYMS. A thermodynamic gradient is a spatial difference
// in an intensive variable; a loss gradient is a derivative in parameter space.
// WGAN escapes the GAN gradient-zero by re-metrisation; nothing escapes Carnot.
//
// This scene also carries a correction: the self-nerf scene elsewhere in this deck
// cites Arjovsky & Bottou 2017 as though the CROSS-DOMAIN claim were theorem-backed
// ("a proved result, not a metaphor"). The theorem is real, conditional, and
// domain-local. The conditions are stated on the slide face — an unconditioned
// citation is the deck's attack surface in front of any physicist in the room.
import type { Detail, Scene, SourceRef } from "../types";

const RESEARCH = "05 — Gradients as the Precondition for Structure";
const RESEARCH_PATH =
  "/home/shax/Documents/Research/nature_ontology/05_gradients_and_structure.md";
const REGISTRY = "Semantic compiler correspondence registry — COL_005";
const REGISTRY_PATH = "/home/shax/Apps/semantic_compiler/registry/correspondence.py";

const research = (section: string, excerpt: string, why?: string): SourceRef => ({
  title: RESEARCH,
  section,
  excerpt,
  artifact: RESEARCH_PATH,
  why,
});

const registry = (section: string, excerpt: string, why?: string): SourceRef => ({
  title: REGISTRY,
  section,
  excerpt,
  artifact: REGISTRY_PATH,
  why,
});

/** Deep-dive id, computed per the shared contract — never hand-written. */
const did = (title: string) =>
  "nature-gradient:" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-gradient",
  act: "The Laws",
  title: "THE GRADIENT",
  kicker:
    "Two sciences, one word — and the registered collision that keeps this deck honest.",
  quote: "WGAN escapes the GAN gradient-zero by re-metrisation. Nothing escapes Carnot.",
  attribution:
    "COL_005, registered collision — thermodynamic gradient-zero is ontological; GAN gradient-zero is epistemic.",
  visual: "diagram",
  camera: [0, 0.65, 10.5],
  cards: [
    {
      title: "THE COLLISION - COL_005",
      subtitle: "the two \"gradients\" are homonyms",
      accent: "crimson",
      lines: [
        "A thermodynamic gradient is a spatial difference in an intensive physical variable — ∇T, Tₕ − Tc. A loss gradient is a derivative of an objective in parameter space — ∇θL. Different objects, different spaces, different laws; the shared word licenses nothing, and any argument that slides between them on the strength of it is an equivocation. Registered as COL_005 so it can never be committed silently again — and the valences invert: in a GAN, zero difference is the SUCCESS condition.",
      ],
    },
    {
      title: "THE PHYSICS - ESTABLISHED",
      subtitle: "and it needs nothing contested",
      accent: "teal",
      lines: [
        "Carnot 1824: η = 1 − Tc/Tₕ. At Tc = Tₕ, exactly zero — not small, zero. An ocean of energy at uniform temperature does no work; what is consumed is the difference, never the inventory. Structure has a finite threshold: Bénard convection begins only above Ra_c = 1707.76 (rigid–rigid; Rayleigh 1916, Chandrasekhar 1961). Earth runs on one photon gradient — ~900 mW m⁻² K⁻¹ of entropy production, a ~22.6× photon-entropy amplification (Stephens & O'Brien 1993; Ozawa et al. 2003).",
      ],
    },
    {
      title: "THE THEOREM, CONDITIONS ATTACHED",
      subtitle: "Arjovsky & Bottou 2017, Thm 2.4 — CONDITIONAL",
      accent: "gold",
      lines: [
        "The vanishing-gradient bound holds IF the real and generated distributions have disjoint or non-aligned low-dimensional supports AND the generator uses the original saturating loss. Then, near an optimal discriminator, ‖∇θL‖ < Mε/(1−ε) → 0. Overlapping full-dimensional densities void it, and WGAN restores informative gradients for the very same distributions. Quoted without its conditions, this theorem is the deck's attack surface — so the conditions live on this slide, not in a footnote.",
      ],
    },
    {
      title: "WHAT SURVIVES",
      subtitle: "the licensed strength, exactly",
      accent: "purple",
      lines: [
        "A structural analogy, independently instantiated in each domain: no resolvable difference signal means no directed improvement. True in thermodynamics for thermodynamic reasons (Carnot); true in GANs for measure-theoretic reasons (Thm 2.4). No theorem derives one from the other, and none is claimed. The exact phrase to use under fire: structurally analogous, not the same object.",
      ],
    },
  ],
  stats: [
    {
      value: "eta = 1 - Tc/Th",
      label: "Carnot 1824 — exactly zero at Tc = Th. No difference, no work. ESTABLISHED.",
      accent: "teal",
    },
    {
      value: "COL_005",
      label:
        "registered collision — \"gradient\" names two objects; ontological zero vs epistemic zero",
      accent: "crimson",
    },
    {
      value: "Ra_c = 1707.76",
      label:
        "Benard onset, rigid-rigid — structure needs a sufficient gradient, not merely a nonzero one",
      accent: "gold",
    },
  ],
  table: {
    headers: ["", "THERMODYNAMIC GRADIENT", "LOSS GRADIENT"],
    rows: [
      [
        "Object",
        "Spatial difference in an intensive variable: ∇T, ∇μ, Tₕ − Tc",
        "Derivative of a scalar objective w.r.t. parameters: ∇θL",
      ],
      [
        "Governing law",
        "Second law: σ = Σ JᵢXᵢ ≥ 0, always (Onsager 1931)",
        "No conservation law, no second law — not even a gradient flow of one potential (Mescheder et al. 2017)",
      ],
      [
        "Zero means",
        "Equilibrium: a genuine terminal state, invariant under redescription",
        "A stationary point of THIS objective under THIS metric — possibly an artifact of the chosen divergence",
      ],
      [
        "Escapable?",
        "No. η = 1 − Tc/Tₕ is metric-independent physics",
        "Yes. WGAN restores gradients for identical distributions by changing the metric (Arjovsky, Chintala & Bottou 2017)",
      ],
      [
        "Valence of zero",
        "Death of every difference-fed structure",
        "ℙ_g = ℙ_r is the GAN's SUCCESS condition — the valences invert",
      ],
    ],
  },
  rows: [
    {
      left: "Correction on the record",
      right:
        "Where this deck elsewhere cites Arjovsky & Bottou 2017 as if the cross-domain claim were theorem-backed (\"a proved result, not a metaphor\"), that overstates it. The theorem is real, conditional, and lives entirely inside the GAN. The bridge between domains is an analogy, carried at analogy strength.",
    },
    {
      left: "Concession 1 - gravity",
      right:
        "\"Maximum entropy = uniformity\" FAILS for self-gravitating systems — clumping increases entropy (Penrose 1979; Wallace 2010). The general form: equilibrium = no exploitable difference, whatever the spatial configuration looks like.",
    },
    {
      left: "Concession 2 - MEP",
      right:
        "Maximum entropy production is CONTESTED, not a settled variational principle — the flagship derivation is invalidated (Grinstein & Linsker 2007) and no selection theorem exists (Landauer 1975). Nothing on this slide depends on it.",
    },
  ],
  footer:
    "ESTABLISHED where marked, and only there. \"The adversarial gradient is load-bearing\" is a theorem inside the GAN under its stated assumptions — and a structural analogy everywhere else. Structurally analogous, not the same object.",
};

export const DEEP: { id: string; detail: Detail; sources: SourceRef[] }[] = [
  {
    id: did("The Collision - COL_005"),
    detail: {
      overview:
        "COL_005 is this domain's registered semantic collision: the word \"gradient\" names two different mathematical objects, and the deck's cross-domain rhetoric was leaning on the shared word. The collision is surfaced on the slide face precisely so it cannot be committed silently.",
      mechanism:
        "A thermodynamic gradient is a spatial difference in an intensive variable — ∇T, ∇μ, Tₕ − Tc — driving a flux of a conserved quantity, governed by σ = Σ JᵢXᵢ ≥ 0 (Onsager 1931). A loss gradient is ∇θL, a derivative of a scalar objective in abstract parameter space: nothing is conserved, no second law applies, and GAN dynamics are not even a gradient flow of one potential (Mescheder, Nowozin & Geiger 2017).",
      structure:
        "The registry's named contact point: thermodynamic gradient-zero is ONTOLOGICAL, GAN gradient-zero is EPISTEMIC. At GAN gradient-zero under Thm 2.4, ℙ_g ≠ ℙ_r still — a real difference exists; the Jensen–Shannon lens simply cannot resolve it into a direction. At thermodynamic equilibrium the difference itself is gone, under any description.",
      causeEffect: [
        "Same word, two objects → any argument sliding between them is an equivocation, and is scored as such",
        "Change the divergence (WGAN) → gradients return for the identical distributions (Arjovsky, Chintala & Bottou 2017)",
        "No re-metrisation extracts work from a single reservoir → Carnot's zero is metric-independent physics",
        "ℙ_g = ℙ_r is the GAN's objective → the valences invert: thermodynamic zero-difference is death, GAN zero-difference is success",
      ],
      implications: [
        "Repair route, per the registry: state the relation as \"structurally analogous, not the same object\" — no resolvable difference signal means no directed improvement, instantiated independently in each domain",
        "Do not cite the GAN theorem as proof of the cross-domain claim — that is the exact move the collision exists to block",
      ],
      residual:
        "The translation claim under repair — \"total victory and heat death are the same terminal state: gradient zero\" — survives only at heuristic-metaphor strength (mapping GRAD_003, confidence 0.35), never as physics.",
      currentStatus:
        "Registered as COL_005 against mapping GRAD_003 in the semantic compiler correspondence registry; this slide is the collision made public.",
    },
    sources: [
      registry(
        "COL_005 — domain_finding",
        "The two 'gradients' are homonyms — a spatial difference in an intensive variable versus a derivative in parameter space. WGAN escapes the GAN gradient-zero by re-metrisation; nothing escapes Carnot. Arjovsky & Bottou Thm 2.4 is conditional on disjoint or non-aligned low-dimensional supports and the saturating loss. In a GAN, zero difference is the SUCCESS condition — the valences invert.",
        "The registered collision, verbatim — the most important object on this slide.",
      ),
      research(
        "§6.1",
        "Verdict: homonym, not identity. The word 'gradient' is doing double duty for two mathematically distinct objects… Any argument that slides from one to the other on the strength of the shared word is an equivocation and should be scored as such.",
        "The research ruling the collision encodes.",
      ),
    ],
  },

  {
    id: did("The Physics, Established"),
    detail: {
      overview:
        "The physical thesis holds as physics and needs nothing contested: work extraction requires an intensive difference; persistent local order requires throughput that degrades such a difference; at gradient zero, structures that live on the gradient end. ESTABLISHED throughout, with the gravity caveat on \"uniformity\" and no reliance on MEP.",
      sections: [
        {
          heading: "Carnot 1824 — difference, not inventory",
          body:
            "η = 1 − Tc/Tₕ. At Tₕ = 600 K, Tc = 300 K: η = 0.50. At 310 K over 300 K: η ≈ 0.032. At Tₕ = Tc: exactly zero — an ocean of thermal energy at uniform temperature can do no work at all. This is the Kelvin–Planck statement in one formula: a single reservoir, one temperature, no difference, yields zero work by law regardless of how much energy it contains. Extractable work is a property of a gradient, not of an energy inventory.",
        },
        {
          heading: "Bénard convection — the threshold behaviour is the point",
          body:
            "Ra_c = 1707.76 for rigid–rigid boundaries; 657.51 = 27π⁴/4 for free–free; 1100.65 for rigid–free (Rayleigh 1916; Chandrasekhar 1961) — among the most precisely verified bifurcations in physics. Structure does not appear gradually as the gradient grows from zero: below a finite critical gradient there is none at all, and at ΔT = 0 the ordered state is not merely absent but impossible. A sufficient gradient is a precondition, not a convenience.",
        },
        {
          heading: "Earth and life — the numbers",
          body:
            "Earth absorbs solar photons at a radiation temperature of ~5760 K and re-emits the same power at ~255 K: a ~22.6× entropy amplification per unit energy, with global entropy production of order 900 mW m⁻² K⁻¹ (Stephens & O'Brien 1993, measured from ERBE satellite data; Ozawa et al. 2003, review). A resting human dissipating ~100 W at ~310 K exports ~0.3 W K⁻¹ — back-of-envelope, M0-class, robust to an order of magnitude. Cut the throughput and the structure decays on the timescale of its slowest maintenance process: it is over, not paused — a Bénard cell at ΔT = 0. Life engineers its entropy export persistently; it never violates, bends, or locally suspends the second law, and no serious formulation ever claimed it did.",
        },
      ],
      residual:
        "The Prigogine programme's generality is criticised (minimum-entropy-production is near-equilibrium-only; Keizer & Fox 1974; Landauer 1975; Anderson & Stein 1987). What is kept is the criticism-proof core: threshold-gated, throughput-sustained order is bankable physics; a general variational theory of self-organisation is not.",
      currentStatus: "ESTABLISHED — textbook physics and measured values only.",
    },
    sources: [
      research(
        "§1.2",
        "Tₕ = Tc: η = 0. Exactly zero. Not small — zero. An ocean of thermal energy at uniform temperature can do no work at all.",
        "The cleanest statement in physics that work is a property of a gradient.",
      ),
      research(
        "§2.2",
        "Critical values (linear stability analysis): Ra_c = 1707.76 for rigid–rigid boundaries; Ra_c = 657.51 = 27/4 π⁴ for free–free; Ra_c = 1100.65 for rigid–free.",
      ),
      research(
        "§3.3",
        "Earth absorbs solar photons with radiation temperature ≈ 5760 K and re-emits the same power at ≈ 255 K… entropy out exceeds entropy in by roughly the temperature ratio 5760/255 ≈ 22.6 per unit energy… global entropy production of the Earth system is of order 1 W m⁻² K⁻¹ (≈ 900 mW m⁻² K⁻¹).",
      ),
    ],
  },

  {
    id: did("The Theorem, Conditions Attached"),
    detail: {
      overview:
        "The GAN vanishing-gradient result is real, theorem-backed, and CONDITIONAL. It must be quoted with its assumptions or not at all — the research verified the theorem statements against the full text of Arjovsky & Bottou 2017 (arXiv:1701.04862).",
      mechanism:
        "Theorem 2.4: under the support conditions of Thm 2.1 (disjoint compact supports) or Thm 2.2 (continuous distributions on non-aligned manifolds of less than full dimension), with the ORIGINAL saturating generator loss E_z[log(1 − D(g_θ(z)))] and bounded Jacobians (norm ≤ M), if ‖D − D*‖ < ε then ‖∇θ E_z[log(1 − D(g_θ(z)))]‖₂ < Mε/(1−ε) → 0 as ε → 0. As the discriminator approaches optimality, the generator's training gradient vanishes.",
      structure:
        "Both conditions are load-bearing. (i) Support geometry: disjoint or non-aligned low-dimensional supports — the paper's lemmas show non-alignment is the generic case for manifolds, and natural-image-like data plausibly concentrates near low-dimensional manifolds, which is the paper's own motivation. (ii) The loss: the original saturating objective. Overlapping full-dimensional densities void the theorem — the JS gradient need not vanish there.",
      causeEffect: [
        "Disjoint or non-aligned low-dimensional supports → a smooth optimal discriminator exists with accuracy 1 and zero input-gradient on both supports (Thms 2.1/2.2)",
        "Original saturating loss + near-optimal discriminator → generator gradient bounded by Mε/(1−ε), vanishing at optimality (Thm 2.4)",
        "The −log D \"fix\" → updates follow a centred Cauchy distribution — infinite mean and variance — and the asymmetric objective formally drives mode collapse (Thms 2.5–2.6)",
        "Replace Jensen–Shannon with Wasserstein-1 (WGAN) → continuous, informative gradients for the very same distributions (Arjovsky, Chintala & Bottou 2017)",
      ],
      implications: [
        "Prohibited overstatement 1: \"GAN training obeys thermodynamics\" — the proof is measure theory plus calculus; no physical entropy is involved",
        "Prohibited overstatement 2: \"an optimal discriminator always kills learning\" — the result is conditional on the support geometry and the loss",
        "Prohibited overstatement 3: \"the zero-gradient state is fundamental\" — it is a property of the chosen divergence, removed by re-metrisation; no analogue of beating Carnot exists",
      ],
      residual:
        "Within its assumptions, \"the adversarial gradient is load-bearing\" is a theorem for this specific system — not a metaphor. Outside them, it is not a theorem about anything.",
      currentStatus:
        "ESTABLISHED as scoped (research §6.3): a theorem under stated assumptions; overstatement beyond those assumptions is prohibited by the source document itself.",
    },
    sources: [
      research(
        "§5.1",
        "Theorem 2.4 (vanishing gradients). Under the conditions of Thm 2.1 or 2.2, if ‖D − D*‖ < ε and the relevant Jacobians are bounded (norm ≤ M), then ‖∇θ E_z[log(1 − D(g_θ(z)))]‖₂ < Mε/(1−ε) → 0.",
        "The theorem with its assumptions, verified against the paper's full text.",
      ),
      research(
        "§5.2",
        "Not \"an optimal discriminator always kills learning.\" The result is conditional on (i) disjoint or lower-dimensional, non-aligned supports and (ii) the original saturating loss… If the distributions overlap with full-dimensional density, the JS gradient need not vanish.",
        "The guard rails — what may not be claimed.",
      ),
    ],
  },

  {
    id: did("What Survives"),
    detail: {
      overview:
        "Strip both systems to their shared skeleton and a real, non-punning commonality remains — a structural analogy at the level of dynamical-systems form, true in each domain for that domain's own reasons. It is not one law with two instances.",
      mechanism:
        "The shared skeleton, verbatim from the research: in both systems, directed change is driven by a first-order difference between the current state and a reference; when that difference is zero — or is rendered invisible to the system's update mechanism — directed change stops, and any structure whose persistence requires ongoing directed change decays or freezes.",
      examples: [
        "Heat engine: reference = cold reservoir; difference = Tₕ − Tc; at zero, work output is zero (Carnot 1824)",
        "Dissipative structure: difference = imposed gradient (Ra ∝ ΔT); below threshold or at zero, the pattern cannot exist (Chandrasekhar 1961)",
        "Organism: difference = free-energy gap between intake and waste heat; at zero throughput, decay to equilibrium (Schrödinger 1944, corrected by his own Note to Ch. 6; Boltzmann 1886)",
        "GAN generator (original loss, stated supports): difference = the discriminator-visible discrepancy between ℙ_g and ℙ_r; when the lens saturates, improvement stops (Arjovsky & Bottou 2017, Thm 2.4)",
      ],
      implications: [
        "Convergent instantiation is the honest strength claim; identity is not available — no theorem derives Thm 2.4 from the second law or vice versa, and none is claimed",
        "Where the analogy earns its keep: a design heuristic independently evidenced in both domains — maintain a resolvable difference signal, and monitor for the two dual failure signatures: flat signal, and signal exploited by collapse",
        "\"Monopoly ~ heat death\" inherits only this skeleton — SPECULATIVE, filed as heuristic metaphor at confidence 0.35 (GRAD_003), with its residual mismatches attached",
      ],
      residual:
        "The valence inversion is logged as a residual mismatch, not smoothed over: the two domains coincide only at ℙ_g = ℙ_r — the GAN's SUCCESS condition, where the thermodynamic reading would say death. The GAN case is about signal visibility, not signal existence: a real difference persists; the chosen divergence cannot resolve it into a direction.",
      currentStatus:
        "The exact wording to use under fire: \"structurally analogous, not the same object.\" (Research ruling §6.3: \"these are the same phenomenon\" is REJECTED.)",
    },
    sources: [
      research(
        "§6.2",
        "In both systems, directed change is driven by a first-order difference between the current state and a reference; when that difference is zero — or is rendered invisible to the system's update mechanism — directed change stops, and any structure whose persistence requires ongoing directed change decays or freezes.",
        "The defensible structural core, verbatim.",
      ),
      research(
        "§6.3",
        "\"These are the same phenomenon\": REJECTED. They are structurally analogous but not the same object — the exact wording to use under fire.",
      ),
    ],
  },

  {
    id: did("Concession 1: Gravity"),
    detail: {
      overview:
        "Two objections a hostile physicist will raise, conceded on the slide before anyone raises them. Conceding first is the defence: both were pre-loaded by the research, and neither costs the thesis anything.",
      sections: [
        {
          heading: "Gravity breaks the uniformity slogan",
          body:
            "\"Maximum entropy = spatial uniformity\" FAILS when self-gravity dominates: such systems have negative heat capacity, clumping INCREASES entropy, and the high-entropy end state is collapsed objects — a solar-mass black hole holds ~10⁷⁷ k_B against ~10⁵⁸ k_B for the Sun (Penrose 1979; Wallace 2010). The corrected general statement: equilibrium = zero remaining exploitable difference / vanishing thermodynamic forces, whatever the spatial configuration looks like. The caveat itself is ESTABLISHED; the detailed cosmological end state is CONTESTED cosmology, and nothing on this slide depends on it — every laboratory instance here is non-gravitating.",
        },
        {
          heading: "MEP is contested, and nothing here leans on it",
          body:
            "Maximum entropy production claims driven systems select the steady state of maximum entropy production. For: Paltridge's climate fits are real and striking (Paltridge 1975, 1978); Dewar attempted a derivation from Jaynesian inference (Dewar 2003, 2005). Against: the flagship derivation is invalidated (Grinstein & Linsker 2007); Dewar himself reframed MEP as a conditional inference algorithm, explicitly not a physical law (Dewar 2009); no selection theorem exists for far-from-equilibrium steady states (Landauer 1975); and claimed successes dissolve on kinetic analysis (Ross, Corlan & Müller 2012). Ruling: CONTESTED — a sometimes-striking heuristic without a derivation, not a law. The thesis needs only the second law, Carnot, and the existence of throughput-sustained structures — all ESTABLISHED.",
        },
      ],
      implications: [
        "Any downstream rhetoric of the form \"systems evolve to maximise throughput / dissipation\" inherits CONTESTED status automatically",
        "The correct defence at both points is concession, not argument — the thesis was built so that neither concession touches it",
      ],
      currentStatus:
        "Both concessions are carried on the slide face, labelled at their true strength: the gravity caveat ESTABLISHED, MEP CONTESTED.",
    },
    sources: [
      research(
        "§1.4",
        "When self-gravity dominates, the identification \"maximum entropy = spatial uniformity\" fails… The corrected general statement is: equilibrium = zero remaining free energy / vanishing thermodynamic forces, whatever the spatial configuration looks like.",
        "The concession, raised by the research before any reviewer could.",
      ),
      research(
        "§4.3",
        "MEP is CONTESTED — a sometimes-striking heuristic without a derivation, not a law… the correct defence is concession: nothing in the core thesis depends on MEP.",
      ),
    ],
  },

  {
    id: did("Correction on the record"),
    detail: {
      overview:
        "Elsewhere in this deck, the self-nerf scene cites Arjovsky & Bottou 2017 in a cross-domain frame — \"winning completely deletes the thing that made winning mean anything — a proved result, not a metaphor.\" The research shows that formulation overstates what the theorem licenses, and this scene corrects it publicly.",
      mechanism:
        "What the theorem proves: for GAN generators, under disjoint or non-aligned low-dimensional supports and the original saturating loss, the training gradient vanishes as the discriminator approaches optimality. What the deck line implied: that total victory destroying the gradient is theorem-backed wherever the deck invokes it — thrones, monopolies, terminal states. The theorem does not travel: it is domain-local, conditional, and divergence-dependent.",
      causeEffect: [
        "The theorem is domain-local → it says nothing about any system that is not a GAN under its stated assumptions",
        "It is conditional → overlapping full-dimensional densities void it, and WGAN removes the pathology for identical distributions by changing the metric",
        "\"A proved result\" is therefore true of the GAN statement and false of the cross-domain statement — the two must not share a citation",
        "The honest cross-domain strength is convergent instantiation of one structural skeleton: no resolvable difference signal, no directed improvement — evidenced independently in each domain, derived in neither from the other",
      ],
      implications: [
        "The correction protects the argument rather than weakening it: \"total victory kills the gradient\" survives at full strength as a structural claim with independent support in each domain — and no physicist in the room can take it away by attacking an overstated citation",
        "Per COL_005's repair route: do not cite the GAN theorem as proof of the cross-domain claim — state the relation as \"structurally analogous, not the same object\"",
      ],
      residual:
        "What still stands from the self-nerf scene: \"adversarial gradient → 0\" as the shared terminal SHAPE is sound at analogy strength; within the GAN, under its assumptions, it remains a genuine theorem. Only the implication that the theorem crosses domains is withdrawn.",
      currentStatus:
        "Corrected on this slide's face: the theorem is quoted with its conditions, the bridge is labelled a structural analogy, and the collision that caught the error is displayed rather than buried.",
    },
    sources: [
      registry(
        "COL_005 — repair_route",
        "State as 'structurally analogous, not the same object': no resolvable difference signal means no directed improvement, instantiated independently in each domain. Do not cite the GAN theorem as proof of the cross-domain claim.",
        "The registered repair this scene executes.",
      ),
      research(
        "Bottom line, item 2",
        "The GAN result is real and theorem-backed but conditional… Quote it with its assumptions or not at all.",
        "The rule the earlier slide broke and this slide follows.",
      ),
    ],
  },
];
