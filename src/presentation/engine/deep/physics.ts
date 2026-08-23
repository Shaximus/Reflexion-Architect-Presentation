import type { Detail, SourceRef } from "../types";

/**
 * Deep-dive content records for the PHYSICS / COSMOLOGY corpus.
 *
 * Sources (all wording carried verbatim from the papers; where a source hedges,
 * the source's own hedge is carried — no external hedges added):
 *
 *  - CISI:  "The Cosmic Information Saturation Index (CISI): A Dimensionless Ratio of
 *           Entropy and Vacuum Energy Bridging Finite and Infinite at the Mirror of Λ and I"
 *           — Derek Charles Frangos. Zenodo DOI 10.5281/zenodo.15694393.
 *           Repo copy: attachments/The_Cosmic_Information_Saturation_Index.md
 *  - DIM:   "A Dimensionless Cosmological Model of Information Saturation, Dark Energy,
 *           and the Liminality of Recursive Entropy" (v1.1) — Derek Charles Frangos.
 *           Zenodo DOI 10.5281/zenodo.16756217.
 *           Repo copy: attachments/A_Dimensionless_Cosmological_Model_-_v1.1.md
 *  - BHU3:  "A Black Hole Cosmological Model with Age Gradient: Addressing JWST Anomalies,
 *           the Hubble Tension, and Cosmic Acceleration" — Curtis Kingsley (corresponding
 *           author and lead investigator) and Derek C. Frangos, August 17, 2025.
 *           Repo copy: attachments/A_Black_Hole_Universe_at_Information_Saturation_III__Proper_Time_Age_Gradient_and_JWST_Predictions_1.md
 *  - TRIN:  "The Λ Trinity: Geometry, Dynamics, and Thermodynamics at the Hubble Horizon"
 *           — Curtis Kingsley (corresponding author) and Derek C. Frangos, September 2025.
 *           Source: Lambda_trinity.pdf (13 pp).
 *
 * Line numbers in `section` fields refer to the repo markdown copies above.
 */

/** One deep-dive record: an entity id, the scene slug it merges into, its Detail, and its sources. */
export interface PhysicsDeepRecord {
  /** Entity id, `${scene}:${slug}` — same convention as eid() in ../types. */
  id: string;
  /** Scene slug whose DEEP entry this record belongs to. */
  scene: string;
  detail: Detail;
  sources: SourceRef[];
}

export const PHYSICS_DEEP: PhysicsDeepRecord[] = [
  // ————————————————————————————————————————————————————————————————————————
  // C = (I × Λ) / 3π ≈ 0.91 — the index and its full calculation chain
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:cisi-c-0-91",
    scene: "physics",
    detail: {
      overview:
        "The Cosmic Information Saturation Index (CISI): C = (I × Λ) / (3π), where I is the universe's estimated information content (~10^122) and Λ is the cosmological constant in Planck units (~8.57×10⁻¹²²). For ΛCDM parameters, C ≈ 0.91 — the universe is closely, but not fully, saturated with information. Dark energy is interpreted as the residual pressure of a cosmos verging on full informational saturation.",
      mechanism:
        "Full calculation chain: C = (I × Λ) / (3π) = (1.00×10^122 × 8.57×10⁻¹²²) / (3π) = 8.57 / (3π) ≈ 8.57 / 9.4248 ≈ 0.91. Inputs: I ≈ 1.00×10^122 (consistent with horizon entropy estimates); Λ ≈ 8.57×10⁻¹²² (from Planck 2018 H₀ and Ω_Λ).",
      structure:
        "The Planck 2018 anchor: H₀ ≈ 67.3 km/s/Mpc and Ωₘ ≈ 0.315 imply Ω_Λ ≈ 0.685, so ρ_Λ = (Ω_Λ·3H₀²)/(8πG). In reduced Planck units (c=G=ℏ=1) this gives dimensionless Λ ≈ 8.57×10⁻¹²². The factor 3π is chosen so that if I equaled the full de Sitter horizon entropy 3π/Λ, then C would equal unity (full saturation).",
      causeEffect: [
        "The universe's actual information content is close to (but not quite at) the holographic limit set by Λ.",
        "Had I = S_horizon ≈ 2.6×10^122 been taken instead, the resulting C ≈ 2.4 would exceed the physical saturation bound implied by the de Sitter horizon, suggesting an unphysical or inconsistent model.",
        "The 9% deficit from full saturation may have multiple physical interpretations: (1) a consequence of the universe's finite age; (2) additional entropy contributions not captured by current horizon calculations; (3) a signature of quantum gravitational degrees of freedom near the saturation limit; or (4) if I is held fixed, Λ may be the dynamic variable gradually increasing over time.",
        "Within this framework, acceleration is not anomalous: it reflects the universe thermodynamically striving toward informational saturation, with Λ rising to close the gap toward C = 1.",
      ],
      implications: [
        "Crucially, this value is not a free parameter, but rather a prediction following from ΛCDM cosmology and the holographic principle (Bousso, 2002; Lloyd, 2002).",
        "This reframes the so-called cosmological constant problem, not as a mystery of unexplained smallness, but as a reflection of near-saturation in the universe's information budget. Λ is not unnaturally small, but precisely tuned to yield a universe just shy of maximal informational capacity.",
        "If C = 1 represents a critical information saturation point, it may signify a phase transition in the structure of spacetime itself.",
      ],
      residual:
        "The paper's own scope statement: CISI is not proposed as a theory of everything, nor is it derived from a Lagrangian or fundamental field model. It is presented as a simple, dimensionless ratio, phenomenological in form, that captures a striking numerical harmony between quantum informational limits and vacuum energy density.",
      currentStatus:
        "C ≈ 0.91 stands as a striking quantitative declaration about our universe (CISI, Final Reflections). Authorship of the CISI paper: Derek Charles Frangos, Independent Researcher, Charleston, SC — sole author.",
    },
    sources: [
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Abstract (attachments/The_Cosmic_Information_Saturation_Index.md:17-31)",
        excerpt:
          "We introduce the Cosmic Information Saturation Index (CISI), a dimensionless ratio defined as C = (I × Λ) / (3π) where I is the universe's estimated information content (~10^122) and Λ is the cosmological constant in Planck units (~8.57×10^-122). … For ΛCDM parameters, we find C ≈ 0.91, suggesting the universe is closely, but not fully, saturated with information. … We interpret dark energy as the residual pressure of a cosmos verging on full informational saturation.",
        why: "The index definition, both inputs, and the 0.91 headline in the paper's own words.",
      },
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Calculation of CISI for the Observable Universe (attachments/The_Cosmic_Information_Saturation_Index.md:187-205)",
        excerpt:
          "C = (I × Λ) / (3π) = (1.00×10^122 × 8.57×10^(-122)) / (3π) = (8.57 × 10^(122−122)) / (3π) = 8.57 / (3π) ≈ 8.57 / 9.4248 ≈ 0.91. Hence C ≈ 0.91 for the observable universe given these numbers. … (Had we taken I = S_horizon ≈ 2.6×10^122, the resulting C ≈ 2.4 would exceed the physical saturation bound implied by the de Sitter horizon, suggesting an unphysical or inconsistent model.)",
        why: "The complete arithmetic chain, digit for digit.",
      },
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Theoretical Foundation — Planck 2018 anchor (attachments/The_Cosmic_Information_Saturation_Index.md:132-137)",
        excerpt:
          "According to Planck 2018, the Hubble constant and density parameters are H₀ ≈ 67.3 km/s/Mpc and Ωₘ ≈ 0.315 (Planck Collaboration, 2018). This implies Ω_Λ ≈ 0.685, so that the vacuum energy density is ρ_Λ = (Ω_Λ·3H₀²)/(8πG). In reduced Planck units where c=G=ℏ=1, this gives a dimensionless Λ ≈ 8.57×10^(-122).",
        why: "The exact Planck 2018 values behind Λ = 8.57×10⁻¹²².",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // The three convergent justifications for I ≈ 10^122
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:three-justifications-for-i",
    scene: "physics",
    detail: {
      overview:
        "The value I ≈ 10^122 is not an assumption but a convergence point drawn from three distinct yet compatible frameworks: gravitational thermodynamics (Bekenstein-Hawking), quantum computation (Lloyd 2002), and holographic limits (Bousso).",
      mechanism:
        "First — thermodynamic: the Bekenstein-Hawking entropy of the cosmic event horizon in a Λ-dominated universe is S = A/4. For horizon radius R = √(3/Λ), the area is A = 4πR² = 12π/Λ, so S = A/4 = 3π/Λ. When Λ ≈ 10⁻¹²², this yields S ≈ 10^122 — a direct match for the estimated entropy of the observable universe.",
      structure:
        "Second — computational: Seth Lloyd (2002) independently calculated the maximum number of operations the universe could have performed since the Big Bang, constrained by the Margolus-Levitin bound and Planck-scale limits. His result: I ≈ 10^122 bits of information, encoded through all quantum interactions to date. (The Dimensionless model restates it: a Universe of ~10^80 particles with ~10^17 seconds of time could perform ~10^122 computational operations.)",
      causeEffect: [
        "Third — holographic: the holographic principle, grounded in black hole thermodynamics and later extended by Bousso, asserts that the maximum entropy within a volume is determined not by its volume but by the surface area enclosing it, scaled by the Planck area. Applied to the cosmological horizon, this principle also reveals an entropy bound near 10^122 bits.",
        "Each of these frameworks converge independently on the same order of magnitude. Their agreement reinforces I ≈ 10^122 as a physically meaningful upper bound on current universal information.",
        "This convergence is unlikely to be coincidental and reflects a deep structural symmetry in the laws of nature. In this way, I and Λ form a mirrored pair: one encoding the universe's informational content, the other its vacuum structure.",
      ],
      examples: [
        "Dimensionless model form of the Bekenstein bound: S ≤ A / (4 ln 2) ≈ 10^122 dimensionless bits.",
        "For a de Sitter horizon with Λ ≈ 8.57×10⁻¹²², the associated entropy is S_horizon = 3π/Λ ≈ 1.10×10^122 in Planck units, setting the maximal theoretical information bound for our universe. The adopted I ≈ 1×10^122 lies below the full de Sitter bound, representing accessible rather than maximal entropy.",
      ],
      residual:
        "On 3π: normalizing CISI by 3π ensures that C = 1 corresponds exactly to a universe that has fully saturated its de Sitter entropy bound. 3π is not just a constant; it is a thermodynamic mirror that sets the upper scale for cosmic information saturation, derived directly from Einstein's field equations and their thermodynamic interpretation. The Dimensionless model cites Gibbons-Hawking (1977): S = 3π / Λ.",
    },
    sources: [
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "On the Selection of I, Λ, and 3π (attachments/The_Cosmic_Information_Saturation_Index.md:85-128)",
        excerpt:
          "The value I ≈ 10^122 is not an assumption but a convergence point drawn from three distinct yet compatible frameworks. … Each of these frameworks (gravitational thermodynamics, quantum computation, and holographic limits) converge independently on the same order of magnitude. … This convergence is unlikely to be coincidental and reflects a deep structural symmetry in the laws of nature.",
        why: "The triple-convergence argument in full.",
      },
      {
        title: "A Dimensionless Cosmological Model (v1.1)",
        section: "Theoretical Justification and the Selection of (I), (Λ), and 3π (attachments/A_Dimensionless_Cosmological_Model_-_v1.1.md:41-87)",
        excerpt:
          "S ≤ A / (4 ln 2) ≈ 10^122 dimensionless bits. This value represents the upper limit of the current observable Universe's informational storage capacity, and is consistent with approximations by Lloyd (2002), who calculated that a Universe of ~10^80 particles with ~10^17 seconds of time could perform ~10^122 computational operations. … Gibbons-Hawking (1977) showed that the entropy of a given space is proportional to the horizon area: S = 3π / Λ.",
        why: "The second paper's independent statement of the same bounds, with the Gibbons-Hawking citation for 3π.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Black hole limit: C_BH = Λ, and recursive cosmology
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:black-hole-limit-c-equals-lambda",
    scene: "physics",
    detail: {
      overview:
        "In the black hole limit the index reduces to simply Λ. Assuming the black hole entropy I_BH = 3π: C_BH = (I_BH × Λ)/(3π) = (3π × Λ)/(3π) = Λ. This provides an alternate operational definition of Λ: the limiting value of C in isolated gravitational systems.",
      mechanism:
        "Numerically, Λ (in Planck units) is ~8.6×10⁻¹²², so C_BH ≈ 8.6×10⁻¹²². This extreme smallness contrasts sharply with the near-unity value found for the observable universe, reflecting that a single black hole's information is insignificant compared to the entire cosmic horizon. This implies that a black hole is a maximally compressed mirror of spacetime's entropy.",
      structure:
        "Dimensionless model extension: for a saturated black hole, I_BH = 3π / Λ and C_BH = Λ. This result, C = Λ, empirically defines a black hole as equivalent to dark energy. It also describes a black hole as a fully saturated informational unit, or bit, containing its maximum entropy in direct proportion to the vacuum properties of the Universe.",
      causeEffect: [
        "At complete and total cosmic saturation, when I_total ≈ 1.10×10^122 dimensionless bits (the theorized maximum for a pure de Sitter geometry, as opposed to the current estimate of the observable Universe which is ~10^122), the Universe may contain up to N_BH ≈ 1.10×10^122 black holes, each holding the values C = Λ and Ψ = 0.",
        "This redefines black holes as informational foundations. When C = 1 universally, each black hole acts as its own recursive system, generating new entropic domains.",
        "U(n) ≈ (1.10×10^122)^n — U(n) defines the number of entropy generated Universes in the n-th cosmogenic cycle.",
      ],
      implications: [
        "Λ Trinity restatement: at complete saturation, the universe fragments into ~10^122 Planck-scale black holes: N_BH = I_max/ln 2 ≈ 10^122. This represents maximum entropy and recursive potential. Each black hole potentially seeds a new universe, creating exponential branching.",
      ],
      residual:
        "Supporting evidence named by the source: black holes show a scale invariant encoding capacity; recent observations of universal scale rotation suggest conserved angular momentum, potentially preserved across black hole collapse and reformation; quantum bounce models also support the idea that black holes can expand into new universes.",
    },
    sources: [
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Black Hole Application (attachments/The_Cosmic_Information_Saturation_Index.md:248-274)",
        excerpt:
          "C_BH = (I_BH × Λ)/(3π) = (3π × Λ)/(3π) = Λ. In other words, for a black hole, the CISI equals Λ exactly. … This implies that a black hole is a maximally compressed mirror of spacetime's entropy.",
      },
      {
        title: "A Dimensionless Cosmological Model (v1.1)",
        section: "Black Hole Limits and Recursive Cosmology (attachments/A_Dimensionless_Cosmological_Model_-_v1.1.md:264-302)",
        excerpt:
          "This result, C = Λ, empirically defines a black hole as equivalent to dark energy. … The Universe may contain up to: N_BH ≈ 1.10 × 10^122 black holes. … U(n) ≈ (1.10 x 10^122)^n. U(n) defines the number of entropy generated Universes in the n-th cosmogenic cycle.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // The four named framework-breakers (Dimensionless model, Falsifiability)
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:four-framework-breakers",
    scene: "physics",
    detail: {
      overview:
        "This model is explicitly falsifiable. The Dimensionless model names four conditions, any one of which breaks the framework.",
      mechanism:
        "Breaker 1 — any C > 1: If the dimensionless ratio between (I) and (Λ) offered in the CISI framework ever produces C > 1, the framework collapses on itself, and implies that the Universe can extend beyond its entropy boundary (S_max = 3π / Λ).",
      structure:
        "Breaker 2 — rising gradients near saturation: If any of the informational gradients within the redefined term (Ψ) is empirically shown to increase over time as C approaches 1, the core symmetry Ψ=0 ↔ C=1 completely fails, which would undermine the convergence towards informational saturation and equilibrium.",
      causeEffect: [
        "Breaker 3 — information beyond the de Sitter maximum: The recursive cosmogenic equation U(n) ≈ (1.10×10^122)^n assumes saturation at the now known and empirical entropy limit. If (I) is ever measured to exceed ~1.10×10^122 bits, this model would also break.",
        "Breaker 4 — growing anisotropies: If large scale cosmic anisotropies (like preferred direction in acceleration, or CMB dipole flows) grow rather than shrink over time, informational flattening is invalidated.",
      ],
      examples: [
        "Testable predictions listed alongside the breakers: CMB flattening over time (flux and anisotropies should decrease); vacuum energy may exhibit residual decay; the flux of a slowly rotating Universe having a diminishing anisotropic signal would confirm a trend towards saturation.",
      ],
      residual:
        "Ψ is defined as Ψ(C) = α(dS/dt) + β(ΔSh) + γ(F) + δ(ΔI/Δx) + ε(S_max − I): entropy production rate, changes in horizon entropy, flux of information at cosmic boundaries, local informational gradient, and distance from the de Sitter maximum, with α–ε real and positive coupling constants.",
      currentStatus:
        "Boundary condition in force: Ψ=0 ↔ C=1. As C approaches 1, Ψ approaches zero — all informational gradients, flux, and entropy output dissipate as saturation is achieved.",
    },
    sources: [
      {
        title: "A Dimensionless Cosmological Model (v1.1)",
        section: "Falsifiability and Predictions (attachments/A_Dimensionless_Cosmological_Model_-_v1.1.md:317-345)",
        excerpt:
          "This model is explicitly falsifiable. If the dimensionless ratio between (I) and (Λ) offered in the CISI framework ever produces C > 1, the framework collapses on itself … If any of the informational gradients within the redefined term (Ψ) is empirically shown to increase over time as C approaches 1, the core symmetry Ψ=0↔C=1 completely fails … If (I) is ever measured to exceed ~1.10 x 10^122 bits, this model would also break. If large scale cosmic anisotropies … grow rather than shrink over time, informational flattening is invalidated.",
        why: "All four framework-breakers, in the author's own falsification language.",
      },
      {
        title: "A Dimensionless Cosmological Model (v1.1)",
        section: "A Derived Boundary Condition Equation (attachments/A_Dimensionless_Cosmological_Model_-_v1.1.md:116-135)",
        excerpt:
          "Ψ(C) = α(dS/dt) + β(ΔSh) + γ(F) + δ(ΔI/Δx) + ε(S_max − I). … As C approaches 1, we observe Ψ approaching zero. Ψ approaching zero is to say that all informational gradients, flux, and entropy output dissipate as saturation is achieved.",
        why: "Defines the Ψ whose behavior breaker 2 tests.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Redshift drift: the definitive, sign-based test
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:redshift-drift",
    scene: "physics",
    detail: {
      overview:
        "The redshift drift — the change in an object's redshift over time — provides the most definitive test because our model and ΛCDM make predictions with opposite signs. Prediction: ż(z=1) = −1.23×10⁻¹⁰ yr⁻¹. At z=1 ΛCDM predicts +1.7×10⁻¹¹ yr⁻¹ (Table 10). At z=3.6 the pair is ż_ΛCDM = +6.5×10⁻¹¹ yr⁻¹ (positive) vs ż_BHC = −1.8×10⁻¹⁰ yr⁻¹ (negative).",
      mechanism:
        "Why the SIGN is the discriminant: our model predicts galaxies become less redshifted over time due to the age gradient, whereas ΛCDM predicts they become more redshifted due to accelerating expansion. This opposite sign makes the test unambiguous — no amount of parameter tuning can reconcile the predictions. Λ Trinity states the binary bluntly: ANY negative drift falsifies ΛCDM; positive drift falsifies our framework; no parameter adjustments can change the sign.",
      structure:
        "The number's derivation (Appendix C, LTB null geodesics): ż = (1+z)H₀ − H(z) − (∂ₜR′/√(1+2E))Δr. At z=1: (1+z)H₀ = 140 km/s/Mpc; H(z=1) ≈ 108 km/s/Mpc; gradient term ≈ 152 km/s/Mpc (from numerical integration). ż = 140 − 108 − 152 = −120 km/s/Mpc = −1.23×10⁻¹⁰ yr⁻¹. Error propagation gives ż(z=1) = −1.23 +0.5/−0.5 ×10⁻¹⁰ yr⁻¹. For the bang-time gradient with t′_B(r) < 0 (older at periphery), ∂ₜR′ < 0: this negative contribution dominates, leading to negative redshift drift.",
      causeEffect: [
        "First measurement already exists: ESPRESSO on the VLT, Lyman-α forest of QSO J0529–4351 at z = 3.2–3.9, ż_obs = (−0.47 ± 1.15)×10⁻⁷ yr⁻¹ over a 0.875 yr baseline — precision ±7 m/s/yr, improving as t^(−3/2); required precision ~1 cm/s/yr over 10 years.",
        "Timeline: 2025–2030 ESPRESSO accumulates a 5-year baseline, reaching 2 cm/s/yr precision; 2030–2035 the Extremely Large Telescope's ANDES/HIRES instrument begins observations with roughly three times better sensitivity; 2035–2040 a 10-year baseline achieves 1 cm/s/yr precision, enabling a definitive detection of the drift's sign.",
        "The stop date: 'By 2040 we expect unambiguous confirmation or falsification of our framework through this single measurement.'",
      ],
      implications: [
        "Within 15 years, the Extremely Large Telescope will measure redshift drift. If it finds the positive drift predicted by ΛCDM, our framework is falsified. If it finds negative drift, it will constitute one of the most profound discoveries in the history of cosmology.",
      ],
      currentStatus:
        "Instrument and date as stated in Table 3: ELT-HIRES (2035). Table 8: Redshift drift at z = 1 — Unmeasured — Decision Date 2035–2040 — Facility ELT-HIRES. The ELT's HIRES spectrograph will achieve the required precision of ~1 cm/s/yr by 2035–2040.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§8.1 Redshift Drift: The Definitive Test (attachments/…III…_1.md:2223-2265)",
        excerpt:
          "ż_ΛCDM(z = 3.6) = +6.5 × 10⁻¹¹ yr⁻¹ (positive), ż_BHC(z = 3.6) = −1.8 × 10⁻¹⁰ yr⁻¹ (negative). Our model predicts galaxies become less redshifted over time due to the age gradient, whereas ΛCDM predicts they become more redshifted due to accelerating expansion. This opposite sign makes the test unambiguous—no amount of parameter tuning can reconcile the predictions. … By 2040 we expect unambiguous confirmation or falsification of our framework through this single measurement.",
        why: "The sign-discriminant argument, the z=3.6 comparison pair, the ESPRESSO/ELT timeline, and the 2040 stop date.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Appendix C.4 Numerical Calculation at z = 1 (attachments/…III…_1.md:3549-3580)",
        excerpt:
          "ż = 140 − 108 − 152 = −120 km/s/Mpc = −1.23 × 10⁻¹⁰ yr⁻¹. … ż(z = 1) = −1.23 +0.5/−0.5 × 10⁻¹⁰ yr⁻¹.",
        why: "The actual derivation of the headline number from LTB null geodesics, with its error bar.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Table 10 (attachments/…III…_1.md:3207-3216)",
        excerpt:
          "ż at z = 1 (yr⁻¹): Our Model −1.23 × 10⁻¹⁰; ΛCDM +1.7 × 10⁻¹¹; Difference: Opposite sign.",
        why: "The like-for-like z=1 comparison the paper itself tabulates.",
      },
      {
        title: "The Λ Trinity",
        section: "§6.2 The Decisive Test: Redshift Drift (Lambda_trinity.pdf p.10, eq. 46)",
        excerpt:
          "ż = −1.23 × 10⁻¹⁰ yr⁻¹ at z = 1. This is opposite in sign to ΛCDM's positive drift prediction. The measurement, achievable with ELT/ANDES by 2035, provides a binary test: ANY negative drift falsifies ΛCDM. Positive drift falsifies our framework. No parameter adjustments can change the sign.",
        why: "The binary-test framing in the later paper's own boxed statement.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Table 3: the full falsifiable-prediction slate with instruments and dates
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:table-3-predictions",
    scene: "physics",
    detail: {
      overview:
        "Table 3 — Falsifiable Predictions of the Black Hole Cosmology Framework: five observables, each with a stated prediction, instrument, and test date. 'These arise without adjustable parameters and provide decisive tests of the framework.'",
      mechanism:
        "Redshift drift at z = 1: ż = −1.23×10⁻¹⁰ yr⁻¹ — ELT-HIRES (2035). Void acceleration: a_void < 0.1 a_filament — Euclid (2030). Stellar populations at z = 7: Dₙ4000 > 1.5 — JWST (ongoing). Galaxy spin prediction: δp ~ 0.3 — Euclid/Roman (2026+). CMB low-ℓ enhancement: ΔCℓ/Cℓ ~ 0.1 for ℓ < 20 — CMB-S4 (2029).",
      structure:
        "Void test in full (§8.4): in standard cosmology, voids and dense regions should show the same dark energy signature. In our model, voids lack the mass concentrations that create local time dilation effects, so they should show no acceleration signature. Specifically: a_app(void) < 0.1 a_app(filament). This factor-of-ten difference in apparent acceleration between voids and filaments would be unmistakable in the data from upcoming surveys.",
      causeEffect: [
        "Table 8 falsification timeline: JWST Dₙ4000 at z=7 — ~1.4 (tentative) — 2025 (Cycle 3) — JWST/NIRSpec. Galaxy spin dipole — Untested — 2026+ — Euclid/Roman. kSZ power at ℓ=3000 — < 3.0 µK² — 2025 — Simons Observatory. Hubble dipole — < 0.5% (Planck) — 2026+ — LSST/Rubin. High-z metallicity — Hints of enrichment — 2025–2027 — JWST/NIRSpec. Void acceleration — Untested — 2028 — Euclid+Roman. Redshift drift at z=1 — Unmeasured — 2035–2040 — ELT-HIRES.",
        "Summary sentence (Acknowledgments/Outlook): the model predicts a negative redshift drift of ż = −1.23×10⁻¹⁰ yr⁻¹ at z = 1 (opposite to ΛCDM), suppressed accelerations in cosmic voids (< 10% of filament values), enhanced stellar populations at z > 7 with Dₙ4000 > 1.5, a modest galaxy spin prediction (δp ~ 0.3), and a low-ℓ CMB power enhancement of order 10%.",
      ],
      implications: [
        "Each test in this timeline provides an independent falsification opportunity. The framework survives only if all observations align with predictions. This aggressive falsifiability distinguishes our model from theories with adjustable parameters that can accommodate any observation.",
        "Ultimately, the next generation of observatories—JWST, the Extremely Large Telescope, Euclid, Roman, the Vera Rubin Observatory and CMB-S4—will decide the fate of this model.",
      ],
      residual:
        "Additional Hubble-dipole prediction (§8.3): using the offset r_Earth/R_h ≈ 0.05, the predicted Hubble diagram dipole anisotropy is δH/H = 0.028 cos θ — a 2.8% variation, consistent with the Planck 2020 reanalysis of Pantheon+ (2.8% ± 0.5%), versus the < 0.5% isotropy level in standard cosmology.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Table 3 (attachments/…III…_1.md:1073-1080)",
        excerpt:
          "Redshift drift at z = 1: ż = −1.23 × 10⁻¹⁰ yr⁻¹ — ELT-HIRES (2035). Void acceleration: a_void < 0.1 a_filament — Euclid (2030). Stellar populations at z = 7: Dₙ4000 > 1.5 — JWST (ongoing). Galaxy spin prediction: δp ∼ 0.3 — Euclid/Roman (2026+). CMB low-ℓ enhancement: ΔCℓ/Cℓ ∼ 0.1 for ℓ < 20 — CMB-S4 (2029).",
        why: "The complete prediction slate exactly as tabulated, with instruments and dates.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§8.4 Void Signatures (attachments/…III…_1.md:2358-2368)",
        excerpt:
          "a_app(void) < 0.1 a_app(filament). This factor-of-ten difference in apparent acceleration between voids and filaments would be unmistakable in the data from upcoming surveys.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Table 8: Timeline for falsification tests (attachments/…III…_1.md:2948-2977)",
        excerpt:
          "Void acceleration — Untested — 2028 — Euclid+Roman. Redshift drift at z = 1 — Unmeasured — 2035–2040 — ELT-HIRES. … Each test in this timeline provides an independent falsification opportunity. The framework survives only if all observations align with predictions.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Dn4000 > 1.5 at z = 7 — the derivation and the 2025 data point
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:dn4000-derivation",
    scene: "physics",
    detail: {
      overview:
        "The 4000Å break strength Dₙ4000 distinguishes evolved from young stellar populations. Prediction: Dₙ4000(z = 7) > 1.5. Standard cosmology predicts Dₙ4000 ~ 1.0 at this redshift — the model's value is 50% higher (Table 10).",
      mechanism:
        "Empirical calibration: Dₙ4000(τ, Z) = Dₙ4000_base(τ) × (1 + 0.3 log₁₀(Z/Z_⊙)), with Dₙ4000_base = 1.6 + 0.2 log₁₀(τ/Gyr) for τ > 1.0 Gyr. At z = 7 the age gradient gives τ = 3.3 Gyr: Dₙ4000_base = 1.6 + 0.2 log₁₀(3.3) = 1.6 + 0.2 × 0.52 = 1.70. Including metallicity effects: Dₙ4000(z = 7) > 1.5.",
      causeEffect: [
        "The age input comes from the bang-time function: at z = 7, our model age is 3.30 Gyr vs the standard 0.77 Gyr (age ratio 4.29, Table 4).",
        "Observed so far: JADES Deep Field shows tentative Dₙ4000 ~ 1.4 at z = 7.5, consistent with our prediction of Dₙ4000 > 1.5 for evolved populations.",
        "Model vs 2025 data (Model Predictions vs. Latest Observations table): Dₙ(4000) at z = 7.3 — BHC prediction 1.20–1.30; 2025 data 1.25 ± 0.02. Stellar age at z = 7.3 — predicted 120 ± 20 Myr; measured 120 ± 30 Myr.",
      ],
      implications: [
        "Near-term tests from JWST provide crucial early validation. The detection of evolved stellar populations (Dₙ4000 > 1.5) and near-solar metallicities at z > 7 would strongly support our age gradient hypothesis. These measurements are ongoing, with definitive results expected by 2025–2027.",
      ],
      residual:
        "Companion metallicity prediction: Z(z = 10) = 0.48 Z_⊙ in our model vs 0.049 Z_⊙ in ΛCDM — factor 10 (Table 10). Λ Trinity cites JADES-GS-z14-1 at z = 13.86 showing Z/Z_⊙ = 0.05 ± 0.02, requiring multiple stellar generations impossible in ΛCDM's 300 Myr but natural with our 3.8+ Gyr.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§5.2.1 The Dₙ4000 Spectral Break (attachments/…III…_1.md:1549-1581)",
        excerpt:
          "At z = 7 with τ = 3.3 Gyr: Dₙ4000_base = 1.6 + 0.2 log₁₀(3.3) = 1.6 + 0.2 × 0.52 = 1.70. Including metallicity effects: Dₙ4000(z = 7) > 1.5. Standard cosmology predicts Dₙ4000 ∼ 1.0 at this redshift.",
        why: "The full numeric derivation of the > 1.5 prediction.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "JWST Discoveries Supporting the Model (attachments/…III…_1.md:2737-2738)",
        excerpt:
          "JADES Deep Field: Shows tentative Dₙ4000 ∼ 1.4 at z = 7.5, consistent with our prediction of Dₙ4000 > 1.5 for evolved populations.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // The age gradient itself — bang-time function and the JWST resolution
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:age-gradient",
    scene: "physics",
    detail: {
      overview:
        "The observable universe exists within the interior of a black hole with Schwarzschild radius r_s = c/H₀ = 1.32×10²⁶ meters, precisely equal to the Hubble radius. Different regions crossed the event horizon at different times, creating an age gradient formalized by the bang-time function tB(r) = t₀ − (c/H₀) arcsin(H₀r/c).",
      mechanism:
        "Derivation chain: critical density ρ_c = 3H₀²/(8πG) = 9.2×10⁻²⁷ kg/m³ → total mass within the Hubble radius M = (4π/3)ρ_c R_h³ = 8.87×10⁵² kg → Schwarzschild radius r_s = 2GM/c² = c/H₀ = 1.32×10²⁶ m. 'This precisely equals the Hubble radius, a coincidence too profound to ignore.' The bang-time function is derived from Vaidya critical-accretion boundary conditions, yielding E(r) = −½κr² with κ = H₀²/c² — 'not a fitted parameter but emerges from the physics of critical accretion.'",
      structure:
        "Proper time at redshift z: τ(z) = t₀ − tB(r(z)) = (c/H₀) arcsin(H₀r(z)/c). For z = 10, numerical integration of the null geodesic yields r(z=10) ≈ 0.27R_h: τ(z=10) = 14.0 Gyr × 0.274 rad = 3.8 ± 0.4 Gyr, versus τ_ΛCDM(z=10) = 0.48 Gyr.",
      causeEffect: [
        "Key Result: at z = 10, galaxies in our model have experienced nearly 8 times more evolution time than standard cosmology predicts. This factor completely explains JWST's 'impossible' galaxies.",
        "Table 4 (Standard Age → Our Model Age, Gyr): z=1: 5.82 → 2.17; z=2: 3.25 → 2.58; z=5: 1.20 → 3.05; z=7: 0.77 → 3.30; z=10: 0.48 → 3.8; z=15: 0.27 → 4.25; z=20: 0.18 → 4.53.",
        "While we near the center have experienced approximately 13.8 billion years since crossing the horizon, regions at r = 0.95R_h have experienced over 17 billion years.",
      ],
      examples: [
        "The JWST anomalies the gradient addresses: GN-z11 at z = 10.6 and JADES-GS-z14-0 at z = 14.3 show stellar masses exceeding 10⁹ M_⊙ when the universe was less than 500 million years old; NIRSpec metallicities reaching 20–50% solar; JADES-GS-z13-0 at z = 13.2 hosts a hundred-million-solar-mass black hole at a supposed 320 million years.",
      ],
      residual:
        "The paper's own stated assumptions: dust domination, spherical symmetry with small perturbations, and Earth's position approximately 5% off-center. 'These assumptions introduce uncertainties that must be considered when comparing predictions to observations. Alternative explanations for the observational tensions remain viable and require careful discrimination through future data.'",
      currentStatus:
        "Uncertainty: δtB(r) ≈ ±0.2 tB(r), from r₀ = (0.5 ± 0.1)R_h. Earlier drafts incorrectly stated r ≈ 0.75R_h for z=10 (which would give τ ≈ 11.9 Gyr); the correct comoving coordinate is r ≈ 0.27R_h — correction noted in the paper itself.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§2.1 The Schwarzschild Radius of the Universe (attachments/…III…_1.md:592-640)",
        excerpt:
          "r_s = 2GM_universe/c² = 2G × (c³/2GH₀)/c² = c/H₀ = 1.32 × 10²⁶ m. This precisely equals the Hubble radius, a coincidence too profound to ignore.",
        why: "The three-step derivation the whole framework rests on.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§2.3 Bang-Time Function / §5.1 Predicted Ages (attachments/…III…_1.md:720-751, 1499-1543)",
        excerpt:
          "tB(r) = t₀ − (c/H₀) arcsin(H₀r/c). … τ(z = 10) = (c/H₀) arcsin(0.27) = 14.0 Gyr × 0.274 rad = 3.8 ± 0.4 Gyr. … Key Result: At z = 10, galaxies in our model have experienced nearly 8 times more evolution time than standard cosmology predicts. This factor completely explains JWST's \"impossible\" galaxies.",
        why: "The age-gradient formula and the 3.8 vs 0.48 Gyr headline comparison.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Dark energy decomposition: Λ_geom (78%) + Λ_info (22%) = Λ_obs
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:dark-energy-decomposition",
    scene: "physics",
    detail: {
      overview:
        "The observed cosmological constant Λ_obs = 1.105×10⁻⁵² m⁻² emerges from two distinct but complementary physical mechanisms: geometric curvature of the black hole interior, Λ_geom = 1.5(H₀/c)² = 8.589×10⁻⁵³ m⁻² (78%), plus information saturation at C = 0.91, Λ_info = 2.461×10⁻⁵³ m⁻² (22%).",
      mechanism:
        "Λ_geom = 3κ/2 with κ = H₀²/c² from the LTB energy function E(r) = −½κr². Numerically: (3/2) × (2.27×10⁻¹⁸ / 3×10⁸)² = (3/2) × 5.73×10⁻⁵³ = 8.589×10⁻⁵³ m⁻². Λ_info = (c⁴k²_info/8πG)(1/3π)[1 − exp(−3πC/ln 2)] evaluated at C = 0.91 gives 2.461×10⁻⁵³ m⁻². Sum: Λ_eff = 1.105×10⁻⁵² m⁻², matching Λ_obs = (1.105 ± 0.02)×10⁻⁵² m⁻² within uncertainties.",
      structure:
        "Λ Trinity's Lambert-W route to the 22%: the information component arises from the Lambert W solution to vacuum saturation, I_vac e^(I_vac/I_max) = I_max, yielding I_vac = 0.567 I_max — Λ_info = 0.567 × Λ_crit = 2.461×10⁻⁵³ m⁻² (22%).",
      causeEffect: [
        "This decomposition represents our framework's central achievement: explaining what dark energy is (geometry plus information) and why it has its observed value (fundamental limits of both).",
        "The crucial point is that we obtain the correct magnitude from pure geometry, without any fine-tuning or free parameters.",
        "Even if the information contribution were absent, the geometric term alone (Λ_geom = 8.589×10⁻⁵³ m⁻²) would reproduce the majority of the observed cosmic acceleration.",
      ],
      implications: [
        "The 120-order-of-magnitude discrepancy between quantum field theory predictions and observations dissolves when we recognize that we're not calculating vacuum energy in flat space but within an information-saturated black hole where quantum corrections are regulated by the holographic bound.",
        "The universe must simultaneously be a black hole (explaining the geometric component) and an information-saturated system (explaining the informational component) for the physics to work out correctly.",
      ],
      currentStatus:
        "Table 2 decomposition: Geometric 3κ̃ = 1.5 → 8.6×10⁻⁵³ m⁻² (78%); Quantum field 0.428 → 2.45×10⁻⁵³ m⁻² (22%); Total observed 1.928 (H₀/c)² → 1.105×10⁻⁵² m⁻² (100%); Information saturation C = 0.91; Master parameter κ̃ = 0.5.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§2.4–2.5 Dual Origin / Definition 27 (attachments/…III…_1.md:768-855)",
        excerpt:
          "Λ_geom = 8.589 × 10⁻⁵³ m⁻² (78%) arises from LTB spacetime curvature. Λ_info = 2.461 × 10⁻⁵³ m⁻² (22%) emerges from information saturation. … Λ_eff = Λ_geom + Λ_info = 1.105 × 10⁻⁵² m⁻². … This decomposition represents our framework's central achievement: explaining what dark energy is (geometry plus information) and why it has its observed value (fundamental limits of both).",
        why: "The decomposition with all three numbers and both percentages.",
      },
      {
        title: "The Λ Trinity",
        section: "§5.2 Connection to the 78%-22% Split (Lambda_trinity.pdf p.9, eqs. 42-44)",
        excerpt:
          "Λ_geom = 1.5(H₀/c)² = 8.589 × 10⁻⁵³ m⁻² (78%). Λ_info = 0.567 × Λ_crit = 2.461 × 10⁻⁵³ m⁻² (22%). The information component arises from the Lambert W solution to vacuum saturation: I_vac e^(I_vac/I_max) = I_max, yielding I_vac = 0.567 I_max.",
        why: "The Lambert-W origin of the 22% figure.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // T_CMB = 2.725 K — both derivations
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:t-cmb-derivation",
    scene: "physics",
    detail: {
      overview:
        "The CMB temperature is derived rather than merely measured. Λ Trinity: the CMB emerges as Hawking radiation amplified by information saturation — T_CMB = T_H exp[C · Ξ(C) · I[r]] = 2.725 K. BHU III Method 2 runs the inference in reverse: from horizon thermodynamics with an information correction, the observed T_CMB = 2.7255 ± 0.0006 K yields C = 0.908 ± 0.015.",
      mechanism:
        "Λ Trinity amplification chain: the Gibbons-Hawking temperature of the cosmic horizon is T_H = ℏH₀/(2πk_B) = 2.269×10⁻³⁰ K. The observed CMB temperature exceeds this by the factor T_CMB/T_H = 2.725 / 2.269×10⁻³⁰ = 1.36×10³⁰. From the information saturation framework this amplification emerges as T_CMB = T_H exp[C · Ξ(C) · I[r]], where C = 0.91 is the information saturation index, Ξ(C) = 70 is the effective amplification factor, and I[r] = arcsin(H₀r/c) ≈ 1.143 at the quantum extremal surface. This gives T_CMB = 2.269×10⁻³⁰ × e⁶⁹ = 2.725 K.",
      structure:
        "BHU III Method 2 (CMB Temperature from Horizon Thermodynamics): T_CMB = (ℏc³ / 8πk_B GM) (1 − C²)^(1/4). Using the observed T_CMB = 2.7255 ± 0.0006 K and solving for C gives C = √(1 − (8πk_B G M T⁴_CMB/ℏc³)) = 0.908 ± 0.015 — one of five independent derivations that all yield C = 0.91 ± 0.02.",
      implications: [
        "The five convergent methods (BHU III §17): quantum decoherence enhancement (C = 0.905), CMB temperature from horizon thermodynamics (C = 0.908 ± 0.015), structure formation suppression / S8 (C = 0.90 ± 0.03), dark energy decomposition (C = 0.91 ± 0.02), black hole entropy scaling (C = 0.91 ± 0.02). 'Taken together, these results suggest that information saturation is a fundamental constant of nature rather than a free parameter.'",
        "The twelve-method table (Table 5) spans 30 orders of magnitude in scale, weighted mean 0.915 ± 0.030; the canonical eight methods give C̄ = 0.919 ± 0.020.",
      ],
      residual:
        "Scale note carried from the source: 'The value appears optimal for complexity: below C ~ 0.7, information effects would be too weak to prevent gravitational collapse. Above C ~ 0.95, quantum decoherence would be so rapid that complex quantum processes required for chemistry and biology could not occur.'",
    },
    sources: [
      {
        title: "The Λ Trinity",
        section: "§5.1 The Amplification Mechanism (Lambda_trinity.pdf pp.8-9, eqs. 38-41)",
        excerpt:
          "T_H = ℏH₀/(2πk_B) = 2.269 × 10⁻³⁰ K. … T_CMB/T_H = 2.725/(2.269 × 10⁻³⁰) = 1.36 × 10³⁰. … T_CMB = T_H exp[C · Ξ(C) · I[r]] where C = 0.91 is the information saturation index, Ξ(C) = 70 is the effective amplification factor, I[r] = arcsin(H₀r/c) ≈ 1.143 at the quantum extremal surface. This gives: T_CMB = 2.269 × 10⁻³⁰ × e⁶⁹ = 2.725 K.",
        why: "The forward derivation producing 2.725 K from horizon temperature plus saturation.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§17.2 Method 2: CMB Temperature from Horizon Thermodynamics (attachments/…III…_1.md:4397-4407)",
        excerpt:
          "T_CMB = (ℏc³/8πk_B GM)(1 − C²)^(1/4). Using the observed T_CMB = 2.7255 ± 0.0006 K and solving for C gives C = 0.908 ± 0.015.",
        why: "The reverse derivation: observed temperature → saturation index.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Saturation timeline ~47.5–49.6 Gyr — WITH the source's own speculative flag
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:saturation-timeline",
    scene: "physics",
    detail: {
      overview:
        "Projected Saturation Timeline ¹ — 'A tentative extrapolation based on current Λ dynamics and the CISI framework.' The source's own footnote ¹ reads, verbatim: 'Speculative, offered within the conceptual framing of the CISI hypothesis.' Both growth models land at ~47–50 billion years to full saturation (C = 1).",
      mechanism:
        "Target: assuming the total information content I ≈ 10^122 remains fixed, Λ would need to rise approximately 9.92% to reach saturation: Λ_target = 3π/10^122 ≈ 9.42×10⁻¹²². Given the current Λ ≈ 8.57×10⁻¹²², the required increase is ΔΛ ≈ (9.42 − 8.57)×10⁻¹²² = 0.85×10⁻¹²² = 8.5×10⁻¹²³.",
      structure:
        "Linear Growth Model — the assumption, in the source's own conditional: 'If we assume an effective Λ increase of ~1% over the last 5 billion years (since the onset of dark energy domination), we estimate the rate of change as dΛ/dt ≈ (0.01 × Λ)/(5×10⁹ years).' Then t_saturation ≈ (0.0992/0.01) × (5×10⁹ years) ≈ 49.6 billion years.",
      causeEffect: [
        "Exponential Growth Model: Λ(t) = Λ₀ × e^(r×t), with r = ln(1.01)/5 Gyr ≈ 0.000398 Gyr⁻¹, gives t ≈ (1/0.000398) × ln(9.42/8.57) ≈ 47.5 billion years.",
        "'This again yields a timeline of ~47–50 billion years before full saturation, consistent with cosmological expectations of asymptotic de Sitter expansion.'",
      ],
      implications: [
        "Interpretation, as the source states it: 'If this framework is valid, the accelerating expansion of the universe may not be an anomaly, but rather a thermodynamic flow: a drive toward full entropy saturation. In this view, Λ is not strictly constant, but may evolve subtly as the universe ascends toward the upper informational limit imposed by the de Sitter horizon.'",
        "Informational Cosmogenesis ¹ (same speculative flag): 'the moment C = 1 may signify not an endpoint, but a fluctuating portal … In this view, the Big Bang was not a beginning, but an apotheosis: the hiss of a prior cycle reaching full capacity. … Perhaps the universe is not expanding toward heat death, but toward the incubation conditions of its next birth.'",
      ],
      residual:
        "The hedge belongs to the author and is carried verbatim: both the Projected Saturation Timeline and Informational Cosmogenesis sections carry footnote ¹ — 'Speculative, offered within the conceptual framing of the CISI hypothesis.' The ~1%-per-5-Gyr Λ-increase rate is stated as an assumption ('If we assume…'), and the paper elsewhere notes: 'such a dynamic coupling between Λ and I has not yet been observed in nature, and current cosmological measurements continue to support Λ ≈ 8.57×10⁻¹²².'",
    },
    sources: [
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Projected Saturation Timeline ¹ (attachments/The_Cosmic_Information_Saturation_Index.md:345-399, footnote at line 491)",
        excerpt:
          "Λ_target = 3π / 10^122 ≈ 9.42 × 10^−122 … ΔΛ ≈ (9.42 − 8.57) × 10^−122 = 0.85 × 10^−122 = 8.5 × 10^−123. … If we assume an effective Λ increase of ~1% over the last 5 billion years … t_saturation ≈ 49.6 billion years. … [exponential model] t ≈ 47.5 billion years. … ¹ Speculative, offered within the conceptual framing of the CISI hypothesis.",
        why: "The full arithmetic of both models AND the author's own speculative footnote, kept attached.",
      },
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Calculation of CISI — Λ/I coupling caveat (attachments/The_Cosmic_Information_Saturation_Index.md:207-212)",
        excerpt:
          "However, such a dynamic coupling between Λ and I has not yet been observed in nature, and current cosmological measurements continue to support Λ ≈ 8.57×10^(-122).",
        why: "The author's own caveat on the rising-Λ mechanism the timeline depends on.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // The Λ Trinity — three equivalent faces of Lambda
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:lambda-trinity",
    scene: "physics",
    detail: {
      overview:
        "The cosmological constant Λ admits three equivalent mathematical expressions through geometry (Λ = 3/L² with de Sitter radius L), dynamics (Λ = 3H²/c² via Friedmann), and thermodynamics (Λ = 3πk_B/(S·L_P²) from horizon entropy). 'These are not merely related—they are the same phenomenon viewed through different mathematical lenses.'",
      mechanism:
        "The Fundamental Trinity (boxed, eqs. 13-15): Geometric: Λ = R/4 = 3/L². Dynamical: Λ = 3H²/c². Thermodynamic: Λ = 3πk_B/(S·L_P²) = 12π²k_B²T²/(ℏ²c²). Each perspective yields the same value — 1.105×10⁻⁵² m⁻² — through distinct derivations.",
      structure:
        "The engine underneath is Padmanabhan's holographic equipartition at the apparent (Hubble) horizon: dV/dt = L_P²(N_sur − εN_bulk), with surface degrees N_sur = A/L_P² and bulk degrees N_bulk = 2|E|/(k_BT). This postulate directly yields the acceleration equation ä/a = −(4πG/3)(ρ + 3p). De Sitter equilibrium corresponds to N_sur = N_bulk, revealing dark energy as horizon thermodynamics reaching equipartition.",
      causeEffect: [
        "At equilibrium N_sur = N_bulk ⇒ dV/dt = 0 ⇒ H = constant. 'De Sitter space represents holographic equilibrium where surface and bulk information are balanced. The cosmological constant is not a mysterious vacuum energy but the natural equilibrium scale.'",
        "The universe's acceleration toward this state is its approach to information equilibrium.",
      ],
      implications: [
        "Resolution of cosmological puzzles claimed by the trinity framework: the cosmological constant problem (Λ emerges from horizon dynamics without fine-tuning); the coincidence problem (we observe acceleration because we exist when C ≈ 0.91); the Hubble tension (position-dependent expansion rates from the LTB metric); JWST's impossible galaxies (the age gradient provides necessary evolution time); the 120 orders of magnitude puzzle (natural consequence of information saturation).",
        "'The factor of 2 that naturally emerges in calculations is not an error to be corrected but the signature of holographic projection.'",
      ],
      residual:
        "Cross-checks named in the paper: the same equations follow from applying the first law dE = TdS + WdV at the apparent horizon (Cai & Kim 2005); Jacobson's Clausius relation derivation shows Einstein's equation is itself an equation of state.",
      currentStatus:
        "Curtis Kingsley (corresponding author) and Derek C. Frangos, September 2025. Λ Trinity builds on the previous results: r_s = r_h = c/H₀ = 1.32×10²⁶ m; the 78%/22% decomposition; the LTB age gradient; and 'The CMB emerges as Hawking radiation amplified by information saturation.'",
    },
    sources: [
      {
        title: "The Λ Trinity",
        section: "Abstract + The Fundamental Trinity box (Lambda_trinity.pdf pp.1, 4, eqs. 13-15)",
        excerpt:
          "The cosmological constant Λ admits three equivalent mathematical expressions through geometry (Λ = 3/L² with de Sitter radius L), dynamics (Λ = 3H²/c² via Friedmann), and thermodynamics (Λ = 3πk_B/(S·L_P²) from horizon entropy). … These are not merely related—they are the same phenomenon viewed through different mathematical lenses.",
      },
      {
        title: "The Λ Trinity",
        section: "§3 Holographic Equipartition (Lambda_trinity.pdf pp.4-6, eqs. 16-31)",
        excerpt:
          "dV/dt = L_P²(N_sur − εN_bulk) … N_sur = N_bulk ⇒ dV/dt = 0 ⇒ H = constant. De Sitter space represents holographic equilibrium where surface and bulk information are balanced. The universe's acceleration toward this state is its approach to information equilibrium.",
        why: "The Padmanabhan mechanism from which the three faces are derived.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Scope, methodology and explicit non-claims (the papers' own boundary)
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:scope-and-non-claims",
    scene: "physics",
    detail: {
      overview:
        "BHU III opens with an explicit scope statement and closes with an explicit non-claims list — the boundary the authors themselves drew around the physics.",
      mechanism:
        "Scope and Methodology (verbatim): 'This paper presents a cosmological framework based solely on established physical principles: the Einstein field equations, the holographic principle, and the thermodynamics of horizons. All conclusions derive from these well-tested theories and from observational data. Predictions are stated in forms that can be tested through astronomical observations within the next decade.'",
      structure:
        "'We explicitly do not address questions of consciousness, observation-dependent reality, or anthropic fine-tuning beyond standard cosmological considerations. While the framework may inspire philosophical discussions about the nature of time and information, such speculations are outside the scope of this work. Any future explorations of these topics will be clearly delineated as philosophical extensions, not physical requirements of the model.'",
      causeEffect: [
        "What We Explicitly Do Not Claim (§14.3): does not require consciousness or observers to function; makes no claims about information creating reality; does not invoke anthropic selection principles; requires no new fundamental physics beyond GR and QFT; makes no philosophical claims about the nature of time or existence.",
        "Framework compatibility: preserves ΛCDM's successful pillars — CMB acoustic peaks, BAO, and BBN — while matching late-time distances (Λ_eff = 1.105×10⁻⁵² m⁻²) and slightly relieving weak-lensing tension via σ8 freeze-out; definitive separation from ΛCDM comes from the opposite-sign redshift drift at z = 1.",
      ],
      residual:
        "'Even if ultimately falsified, this exploration enriches our understanding of general relativity's implications for cosmology and highlights the importance of questioning fundamental assumptions when faced with persistent observational tensions.'",
      currentStatus:
        "Data availability: all code, data, and supplementary materials at https://github.com/Pallyman/Black_Hole_Cosmology, including the Mathematica verification notebook.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Scope and Methodology (attachments/…III…_1.md:83-95)",
        excerpt:
          "This paper presents a cosmological framework based solely on established physical principles: the Einstein field equations, the holographic principle, and the thermodynamics of horizons. … We explicitly do not address questions of consciousness, observation-dependent reality, or anthropic fine-tuning beyond standard cosmological considerations.",
        why: "The authors' own epistemic boundary, stated up front.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "§14.3 What We Explicitly Do Not Claim (attachments/…III…_1.md:3138-3148)",
        excerpt:
          "Does not require consciousness or observers to function. Makes no claims about information creating reality. Does not invoke anthropic selection principles. Requires no new fundamental physics beyond GR and QFT. Makes no philosophical claims about the nature of time or existence.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Authorship attribution — exactly as the sources state it
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "physics:authorship",
    scene: "physics",
    detail: {
      overview:
        "Authorship exactly as printed on the papers. The C = 0.91 index (CISI) and the Dimensionless Cosmological Model are single-author works by Derek Charles Frangos. The Black Hole Universe III paper and The Λ Trinity are co-authored, with Curtis Kingsley as corresponding author.",
      mechanism:
        "CISI paper byline: 'Derek Charles Frangos, Independent Researcher | Charleston, SC' — sole author; © Derek Charles Frangos, 2025; Zenodo DOI 10.5281/zenodo.15694393. Dimensionless Model v1.1 byline: 'Derek Charles Frangos, Independent Researcher | Charleston, SC' — sole author; Zenodo DOI 10.5281/zenodo.16756217. The corpus therefore attributes C = (I×Λ)/3π ≈ 0.91 to Derek Frangos solo.",
      structure:
        "BHU III byline: 'Curtis Kingsley¹,* and Derek C. Frangos². ¹Independent Researcher, Edmonton, Alberta, Canada, curtis.kingsley@live.ca. ²Independent Researcher, Cosmic Information Theory. *Corresponding author and lead investigator. August 17, 2025.' Citation line: 'Kingsley, C., & Frangos, D.C. (2025).' Λ Trinity byline: 'Curtis Kingsley¹,* and Derek C. Frangos². *Corresponding author. September 2025.'",
      causeEffect: [
        "Series lineage cited inside BHU III: [15] Frangos, D.C. (2025), A Dimensionless Cosmological Model … Zenodo 10.5281/zenodo.16756217; [16] Kingsley, C., & Frangos, D. (2025), A Black Hole Universe at Information Saturation II: Proper-Time Age Gradient and JWST Predictions, Zenodo 10.5281/zenodo.16895313; [14] Kingsley, C. (2025), The Holographic Bound as the Entanglement Entropy of the Cosmos, Zenodo 10.5281/zenodo.16887738 — a Kingsley solo paper.",
        "The dimensionless master parameter κ̃ = 0.5 is named in BHU III Appendix J.4 as 'The Kingsley Curve.'",
      ],
      residual:
        "License lines as printed: CISI and Dimensionless Model — © Derek Charles Frangos, 2025, CC-BY-NC 4.0. BHU III — © 2025 Curtis Kingsley and Derek C. Frangos. All rights reserved. Licensed CC BY 4.0. Correspondence: curtis.kingsley@live.ca.",
    },
    sources: [
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Byline + license (attachments/The_Cosmic_Information_Saturation_Index.md:7-13, 494-499)",
        excerpt:
          "Derek Charles Frangos. Independent Researcher | Charleston, SC. … © Derek Charles Frangos, 2025.",
        why: "C = 0.91's origin paper is Frangos solo.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Byline (attachments/…III…_1.md:6-20) + citation block (:4592-4600)",
        excerpt:
          "Curtis Kingsley¹,* and Derek C. Frangos² … *Corresponding author and lead investigator. August 17, 2025. … Citation: Kingsley, C., & Frangos, D.C. (2025).",
        why: "The co-authored papers put Kingsley first as corresponding author and lead investigator.",
      },
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Reference [14] (attachments/…III…_1.md:4476-4478)",
        excerpt:
          "Kingsley, C. (2025). The Holographic Bound as the Entanglement Entropy of the Cosmos. Zenodo. DOI: 10.5281/zenodo.16887738.",
        why: "Kingsley's solo entry in the series.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————————————
  // Enrichment of the existing "built" scene entity
  // ————————————————————————————————————————————————————————————————————————
  {
    id: "built:black-hole-cosmology",
    scene: "built",
    detail: {
      overview:
        "Information-theoretic cosmology, published as a series on Zenodo. C = (I×Λ)/3π ≈ 0.91 (Frangos). The observable universe as the interior of a black hole with r_s = c/H₀ = 1.32×10²⁶ m (Kingsley & Frangos). Dark energy decomposed: Λ_geom 78% + Λ_info 22% = 1.105×10⁻⁵² m⁻². T_CMB = 2.725 K derived from horizon thermodynamics plus saturation. Age gradient: 3.8 ± 0.4 Gyr at z = 10 vs ΛCDM's 0.48 Gyr — nearly 8× more evolution time, addressing JWST's 'impossible' galaxies.",
      mechanism:
        "The definitive test is redshift drift: ż(z=1) = −1.23×10⁻¹⁰ yr⁻¹, opposite in sign to ΛCDM's positive drift. ANY negative drift falsifies ΛCDM; positive drift falsifies this framework; no parameter adjustments can change the sign. Measured by ELT-HIRES/ANDES, decision window 2035–2040; 'By 2040 we expect unambiguous confirmation or falsification of our framework through this single measurement.'",
      structure:
        "Full Table 3 slate: redshift drift (ELT-HIRES 2035); void acceleration a_void < 0.1 a_filament (Euclid 2030); Dₙ4000 > 1.5 at z=7 (JWST ongoing, vs ΛCDM ~1.0); galaxy spin δp ~ 0.3 (Euclid/Roman 2026+); CMB low-ℓ enhancement ΔCℓ/Cℓ ~ 0.1 for ℓ < 20 (CMB-S4 2029).",
      causeEffect: [
        "Named framework-breakers (Dimensionless model): any C > 1 collapses the framework; Ψ gradients rising as C→1 breaks the core symmetry; I measured above ~1.10×10^122 bits breaks the recursion equation; growing large-scale anisotropies invalidate informational flattening.",
        "Saturation timeline: ~47.5–49.6 Gyr to C = 1 — flagged by its own author as 'Speculative, offered within the conceptual framing of the CISI hypothesis,' resting on an assumed ~1% Λ increase over the last 5 Gyr.",
      ],
      residual:
        "The papers' own scope: 'We explicitly do not address questions of consciousness, observation-dependent reality, or anthropic fine-tuning.' The framework 'requires no new fundamental physics beyond GR and QFT.' See the physics:* deep records for every derivation and citation.",
      currentStatus:
        "Zenodo series live (DOIs 15694393, 16756217, 16895313, 16887738). Code and Mathematica verification at github.com/Pallyman/Black_Hole_Cosmology. Redshift-drift prediction outstanding; decision by 2040.",
    },
    sources: [
      {
        title: "A Black Hole Cosmological Model with Age Gradient (BHU III)",
        section: "Abstract (attachments/…III…_1.md:22-81)",
        excerpt:
          "The framework makes definitive, falsifiable predictions including negative redshift drift ż = −1.23 × 10⁻¹⁰ yr⁻¹ at z = 1 (opposite in sign to ΛCDM's positive drift), observable with next-generation spectroscopy by 2035. … At redshift z = 10, this gradient provides 3.82 ± 0.4 billion years of evolution time compared to standard cosmology's 0.48 billion years.",
        why: "One paragraph carrying the age gradient, the JWST resolution, and the decisive prediction.",
      },
      {
        title: "The Cosmic Information Saturation Index (CISI)",
        section: "Abstract (attachments/The_Cosmic_Information_Saturation_Index.md:17-31)",
        excerpt:
          "For ΛCDM parameters, we find C ≈ 0.91, suggesting the universe is closely, but not fully, saturated with information.",
      },
    ],
  },
];

/**
 * The same records reshaped to the exact `Deep` structure used by DEEP in
 * ../details-deep.ts ({ details, sources } keyed by scene slug), so a scene's
 * entry can be merged with a spread — integration requires no reshaping.
 */
export const PHYSICS_DEEP_BY_SCENE: Record<
  string,
  { details: Record<string, Detail>; sources: Record<string, SourceRef[]> }
> = PHYSICS_DEEP.reduce(
  (acc, rec) => {
    const bucket = (acc[rec.scene] ??= { details: {}, sources: {} });
    bucket.details[rec.id] = rec.detail;
    bucket.sources[rec.id] = rec.sources;
    return acc;
  },
  {} as Record<string, { details: Record<string, Detail>; sources: Record<string, SourceRef[]> }>,
);
