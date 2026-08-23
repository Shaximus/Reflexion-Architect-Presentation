# Suggestions — Physics deep-dive absorption (ALL OPTIONAL)

These are optional notes for whoever wires `src/presentation/engine/deep/physics.ts`
into the presentation, plus small wording observations from the source pass. None of
them change the content records; the records follow the sources exactly.

## Integration (optional)

- `physics.ts` exports two shapes: `PHYSICS_DEEP` (typed array of records) and
  `PHYSICS_DEEP_BY_SCENE` (the exact `Deep` `{details, sources}` shape used by `DEEP`
  in `details-deep.ts`). The owner of `details-deep.ts`/`enrich.ts` can merge with a
  one-line spread per scene. New records use the scene slug `physics`; remap the
  `scene`/id prefix if the scenes owner names the physics scene differently.
- One record targets the existing entity id `built:black-hole-cosmology` so the
  current "What I Built" node gains deep content with zero other changes.

## Wording observations for slide copy (optional)

1. **Redshift-drift comparison pairing.** In the brief, the pair quoted was
   ż(z=1) = −1.23×10⁻¹⁰/yr vs ΛCDM +6.5×10⁻¹¹/yr. In BHU III the +6.5×10⁻¹¹ figure is
   ΛCDM **at z = 3.6** (eq. 143, paired with BHC −1.8×10⁻¹⁰ at the same z), while the
   paper's own like-for-like z = 1 pair (Table 10) is −1.23×10⁻¹⁰ vs **+1.7×10⁻¹¹**.
   If a slide shows one pair, using either same-z pair keeps the comparison matched to
   the source tables. Both pairs are captured in the records with citations.
2. **"Enhancement" vs "suppression" at low ℓ.** BHU III Table 3 and the Outlook call
   the low-multipole CMB prediction an **enhancement** (ΔCℓ/Cℓ ~ 0.1 for ℓ < 20,
   CMB-S4 2029). If any slide currently says "suppression" for this line, matching the
   source's word avoids a mismatch an attentive audience member could catch. (The word
   "suppression" does appear in the papers, but for other quantities: void
   accelerations, structure growth/σ8, and the holographic dipole suppression.)
3. **Two definitions of C across the corpus.** The CISI/Dimensionless papers define
   C = (I×Λ)/3π with I ≈ 1.00×10^122; BHU III defines C ≡ I/I_max with
   I_max = 3.04×10^122 bits (its footnote notes an earlier 2.1×10^122 figure missing a
   ln 2 factor). Both give 0.91. If a slide shows one formula next to the other's
   numbers, keeping each formula with its own paper's numbers avoids apparent
   arithmetic mismatch.
4. **T_CMB digits.** Λ Trinity uses 2.725 K; BHU III's Method 2 uses the observed
   2.7255 ± 0.0006 K. Either is fine on a slide; citing the one that matches the
   derivation shown keeps it clean.
5. **Attribution line.** If a slide credits C = 0.91, the corpus supports "Derek
   Frangos (2025), CISI" for the index itself and "Kingsley & Frangos (2025)" for the
   black-hole-universe framework that uses it; the records include the exact bylines.

## Gaps noticed (optional, no action required)

- Λ Trinity contains visible `[TODO: …]` markers (e.g., "Derive exact holographic
  projection factor from first principles"). If that PDF is ever shown on screen,
  choosing pages without TODO markers may present better.
- The CISI paper's closing page includes the license notice and two price lines
  ("Price for Elon Musk…"). If the paper is handed out, the body-only pages may be
  the intended cut.
