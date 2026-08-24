// THE COLLISION LEDGER — nature block, scene 06. The honesty instrument.
//
// This is the deck auditing itself in public: five named points of contact where
// a translation and its target domain disagree, reproduced faithfully from the
// compiler's own collision registry. Nothing here is softened. Nothing is added.
//
// Source of record: /home/shax/Apps/semantic_compiler/registry/correspondence.py
//   — DEFAULT_COLLISIONS (COL_001 … COL_005), read 2026-08-23.
// Rule of record:   /home/shax/Apps/semantic_compiler/registry/rules.py
//   — GLOBAL_LAWS["correspondence_before_disanalogy"], quoted verbatim below.
// Numbers behind each collision: /home/shax/Documents/Research/nature_ontology/01–05.
//
// Every collision is OPEN with resolution_authority: "translator". The compiler
// surfaces collisions; it does not demote a translation on its own authority.
import type { Detail, Scene, SourceRef } from "../types";

// The operative clause of the global law, verbatim from rules.py.
const RULE_VERBATIM =
  "A disanalogy may only be asserted between CORRESPONDING elements of a " +
  "mapping. Before rejecting a mapping because the target lacks a property, " +
  "verify that the source's corresponding element has it. A property present " +
  "in one part of the source and absent from an unrelated part of the target " +
  "is not a defect in the mapping. Where source and target disagree at a " +
  "nameable point of contact, record a COLLISION for the translator to repair; " +
  "the compiler surfaces collisions and does not demote a translation on its " +
  "own authority.";

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-ledger",
  act: "The Laws",
  title: "THE COLLISION LEDGER",
  kicker:
    "Five claims. Five independent domains. Five named points where they refused to agree — kept on the books, in public.",
  quote:
    "A disanalogy may only be asserted between CORRESPONDING elements of a mapping. Before rejecting a mapping because the target lacks a property, verify that the source's corresponding element has it.",
  attribution:
    "correspondence_before_disanalogy — Non-Negotiable Global Law, Reflexion Semantic Compiler v2.0.0",
  visual: "flow",
  camera: [0, 0.7, 11.5],
  table: {
    headers: ["COLLISION", "THE CLAIM AS MADE", "WHAT THE DOMAIN FOUND", "THE CONTACT POINT"],
    rows: [
      [
        "COL_001 NAT_DIV_001",
        "Separation is the generative act.",
        "Divergent boundaries do create new crust — ~3.4 km²/yr, ~20 km³/yr, ~2,000 tonnes/second, the majority of Earth's magma budget. But ridges are largely passive: slab pull dominates the plate-driving force budget by roughly 10×, and area created is balanced by area destroyed.",
        "The generative SITE is not the generative ENGINE.",
      ],
      [
        "COL_002 VOLC_001",
        "Suppression stores pressure and pays it out later.",
        "Chamber walls fail at roughly fixed in-situ tensile strength (0.5–9 MPa, commonly 2–4 MPa) regardless of repose, so pressure cannot be banked by waiting. Global return times are memoryless; the best predictor of next VEI is the volcano's median past VEI (~53%), not repose.",
        "What is stored is volume and volatile chemical potential, not pressure.",
      ],
      [
        "COL_003 SEIS_001",
        "A boundary that refuses to move pays out later, larger.",
        "The BUDGET claim is established — Carrizo has banked ~5.7 m of slip deficit since 1857 at 34 mm/yr, matching the 5.3 ± 1.4 m that 1857 released. The SCHEDULE claim is refuted — the seismic gap hypothesis failed prospective tests; recently-active zones out-forecast overdue gaps. At fixed rupture area, moment grows only LINEARLY with delay.",
        "Storage gives the size of the invoice, not the due date.",
      ],
      [
        "COL_004 BIO_ENDO_001",
        "Integration preserves the sovereignty of the integrated party.",
        "Mitochondria retain a genome (human: 16,569 bp, 37 genes) after ~2 Gyr, but cannot replicate it (POLG is nuclear), cannot build their own ribosomes, encode 13 of 1,136 proteome members (1.1%), and undergo host-executed fission, fusion and mitophagy. Monocercomonoides shows the genome can go to zero.",
        "What persists is a policed inheritance channel, not an agent with authority.",
      ],
      [
        "COL_005 GRAD_003",
        "Total victory and heat death are the same terminal state: gradient zero.",
        "The two 'gradients' are homonyms — a spatial difference in an intensive variable versus a derivative in parameter space. WGAN escapes the GAN gradient-zero by re-metrisation; nothing escapes Carnot. Arjovsky & Bottou Thm 2.4 is conditional on disjoint or non-aligned low-dimensional supports and the saturating loss. In a GAN, zero difference is the SUCCESS condition — the valences invert.",
        "Thermodynamic gradient-zero is ontological; GAN gradient-zero is epistemic.",
      ],
    ],
  },
  cards: [
    {
      title: "The Rule That Produced This Ledger",
      subtitle: "correspondence_before_disanalogy — quoted, not paraphrased",
      accent: "gold",
      lines: [RULE_VERBATIM],
    },
    {
      title: "Every Row Is OPEN",
      subtitle: 'status: "OPEN" · resolution_authority: "translator"',
      accent: "teal",
      lines: [
        "A collision is NOT a rejection. All five carry status OPEN and resolution_authority \"translator\": the compiler surfaces the disagreement and names where the two accounts touch; the translator holds the authority to repair it, re-scope the claim, or accept the cost. The compiler does not demote a translation on its own authority — and none of these five demote a mapping.",
      ],
    },
  ],
  stats: [
    { value: "5 OPEN", label: "collisions on the books — none softened, none resolved by fiat", accent: "crimson" },
    { value: "0 DEMOTED", label: "the compiler surfaces; the translator rules", accent: "cyan" },
  ],
  footer:
    "A framework that cannot name where it fails is not a framework. These five are what five independent domains refused to confirm.",
};

// ---------------------------------------------------------------------------
// Deep dives — one per collision, plus the rule itself.
// Ids are COMPUTED from titles per the shared contract, never hand-written.
// ---------------------------------------------------------------------------

const did = (title: string): string =>
  "nature-ledger:" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const REGISTRY_SRC = (collision: string, excerpt: string, why?: string): SourceRef => ({
  title: "semantic_compiler/registry/correspondence.py",
  section: `DEFAULT_COLLISIONS — ${collision}`,
  excerpt,
  why,
});

interface LedgerDeep {
  id: string;
  detail: Detail;
  sources: SourceRef[];
}

const entry = (title: string, detail: Detail, sources: SourceRef[]): LedgerDeep => ({
  id: did(title),
  detail,
  sources,
});

export const DEEP: LedgerDeep[] = [
  entry(
    "The Rule That Produced This Ledger",
    {
      overview:
        "The ledger exists because of a categorical error found in how mappings were being REJECTED, not in how they were built. A mapping could be killed by naming any property the target lacks, without checking whether the source's corresponding element has that property either. By that method any mapping in the registry can be destroyed, because every target lacks something some part of the source has.",
      mechanism:
        "The worked failure case (NEG_015, black-hole containment family, 2026-08-22): the mapping was rejected because 'privilege escalation is a directed act by an agent, and a black hole has no agency.' But in the source, agency belongs to the escaping PROCESS, not to the sandbox — and the sandbox has no agency either. The rejection compared the target's container against the source's actor: non-corresponding elements. A disanalogy is only informative between elements that actually correspond.",
      structure:
        "The second defect the rule repairs: the compiler had exactly one verdict available for disagreement — REJECT. But the compiler is not the translator. Where a translation and its target domain disagree at a nameable point of contact, that is a COLLISION: surfaced for repair by the translator, not demoted on the compiler's own authority. A collision that cannot name where the two accounts touch is not admissible — contact_point is mandatory.",
      implications: [
        "Rejections remain available, and remain correct, for mappings that fail on their own terms between CORRESPONDING elements — NEG_015 as finally recorded survives this gate.",
        "Only four collision states exist: OPEN, REPAIRED, ACCEPTED_COST, WITHDRAWN. Every entry in this ledger is OPEN.",
        "A disanalogy whose source element also lacks the property is a SHARED ABSENCE — a feature of the mapping, not a defect in it — and does not reduce the mapping's confidence.",
      ],
      currentStatus:
        "Enforced in code: validate_disanalogy() warns on unnamed elements, non-corresponding pairs, and shared absences; Collision.__post_init__ rejects any collision without a named contact_point.",
    },
    [
      {
        title: "semantic_compiler/registry/rules.py",
        section: 'GLOBAL_LAWS["correspondence_before_disanalogy"]',
        excerpt: RULE_VERBATIM,
        why: "The law, verbatim. The ledger is this rule executing.",
      },
      REGISTRY_SRC(
        "module docstring",
        "A disanalogy is only informative between elements that actually correspond.",
        "The one-sentence version of the gate.",
      ),
    ],
  ),

  entry(
    "COL_001 NAT_DIV_001",
    {
      overview:
        "Mapping NAT_DIV_001. Claim as made: 'Separation is the generative act.' The geology confirms the site and refutes the engine: divergent boundaries literally create new lithosphere — ~3.4 km² of new oceanic crust per year, ~20 km³/yr of new igneous rock, roughly two thousand tonnes per second, the majority of Earth's magma budget — but ridges are largely passive.",
      mechanism:
        "Torque-balance analysis shows plate speed correlates with the fraction of boundary that is subducting slab, and little else. Slab pull potential is ~10¹³ N/m against ridge push at ~2–4×10¹² N/m — roughly 10× — and 'ridge push' is not magma pushing plates apart but gravitational sliding. The mantle upwells at ridges BECAUSE the plates part; the generative site is funded by loss elsewhere in the circulation. And on a constant-radius Earth, area created is balanced by area destroyed: new crust, not net crust.",
      residual:
        "Contact point, verbatim: 'the generative SITE is not the generative ENGINE'.",
      currentStatus:
        "OPEN. Repair route on file: re-scope to 'separation is the generative phase of a creation-destruction circulation. The cycle is the unit, not either pole — which the translation's own higher law already asserts.'",
    },
    [
      REGISTRY_SRC(
        "COL_001",
        "Divergent boundaries do create new crust — ~3.4 km^2/yr, ~20 km^3/yr, ~2,000 tonnes/second, the majority of Earth's magma budget. But ridges are largely passive: slab pull dominates the plate-driving force budget by roughly 10x, and area created is balanced by area destroyed.",
        "domain_finding, verbatim.",
      ),
      {
        title: "research/nature_ontology/01_divergent_boundaries.md",
        section: "§3.2 Slab pull vs ridge push",
        excerpt:
          "Slab pull potential ~10¹³ N/m; ridge push ~2–4×10¹² N/m — an order of magnitude smaller. … the generative site (the ridge) is powered mostly by the destructive site (the trench). (Forsyth & Uyeda 1975; Conrad & Lithgow-Bertelloni 2002 — both DOI-verified.)",
        why: "The numbers behind the finding.",
      },
    ],
  ),

  entry(
    "COL_002 VOLC_001",
    {
      overview:
        "Mapping VOLC_001. Claim as made: 'Suppression stores pressure and pays it out later.' The volcanology refutes the stored quantity: chamber walls fail at roughly fixed in-situ tensile strength — 0.5–9 MPa, most commonly 2–4 MPa — regardless of repose. A 500-year-quiet system is not at 500× the pressure of a 1-year-quiet system; both fail within the same narrow band. Pressure cannot be banked by waiting.",
      mechanism:
        "Global eruption return times are approximately exponential — memoryless: elapsed quiet carries no information about when or how big. The best single predictor of the next VEI is the volcano's median past VEI (~53% accuracy); repose adds marginal skill. What long-quiet systems do accumulate is eruptible VOLUME and dissolved-volatile chemical potential, behind a fuse whose rating never changes.",
      residual:
        "Contact point, verbatim: 'what is stored is volume and volatile chemical potential, not pressure'.",
      currentStatus:
        "OPEN. Repair route on file: suppressed throughput accumulates MASS and dissolved volatiles; the release threshold is constant. Common cause (path impedance) rather than direct mechanism — the analogy may not promise 'longer quiet means bigger blowup' about any individual system.",
    },
    [
      REGISTRY_SRC(
        "COL_002",
        "Chamber walls fail at roughly fixed in-situ tensile strength (0.5-9 MPa, commonly 2-4 MPa) regardless of repose, so pressure cannot be banked by waiting. Global return times are memoryless; the best predictor of next VEI is the volcano's median past VEI (~53%), not repose.",
        "domain_finding, verbatim.",
      ),
      {
        title: "research/nature_ontology/02_volcanism_pressure_release.md",
        section: "§1.2 and §4.2",
        excerpt:
          "In-situ tensile strength of crustal host rock: 0.5–9 MPa, most commonly 2–4 MPa (Gudmundsson 2012). Global return times are approximately exponential — i.e., memoryless (Papale 2018). The best single predictor of the next VEI is the median VEI of the volcano's own past eruptions (~53% accuracy) (Colosi & Brodsky 2022).",
        why: "The numbers behind the finding.",
      },
    ],
  ),

  entry(
    "COL_003 SEIS_001",
    {
      overview:
        "Mapping SEIS_001. Claim as made: 'A boundary that refuses to move pays out later, larger.' The seismology splits it in two and rules each half separately. The BUDGET half is established: the Carrizo segment, locked since 1857, has banked (2026 − 1857) × 34 mm/yr ≈ 5.7 m of slip deficit — the size of the 1857 slip (5.3 ± 1.4 m, LiDAR-measured), again, sitting in the crust right now.",
      mechanism:
        "The SCHEDULE half is refuted: the seismic gap hypothesis failed prospective statistical tests (Kagan & Jackson 1991; Rong, Jackson & Kagan 2003) — recently-active zones out-forecast 'overdue' gaps, and clustering beat quiescence. And the arithmetic caps the folk version: at fixed rupture area, moment grows only LINEARLY with delay — doubling the wait adds ~0.2 magnitude units. Superlinearity requires area recruitment (multi-fault cascade), and that link is SPECULATIVE, not demonstrated.",
      residual:
        "Contact point, verbatim: 'storage gives the size of the invoice, not the due date'.",
      currentStatus:
        "OPEN. Repair route on file: keep the accumulation claim, drop any timing claim.",
    },
    [
      REGISTRY_SRC(
        "COL_003",
        "The BUDGET claim is established — Carrizo has banked ~5.7 m of slip deficit since 1857 at 34 mm/yr, matching the 5.3 +/- 1.4 m that 1857 released. The SCHEDULE claim is refuted — seismic gap hypothesis failed prospective tests; recently-active zones out-forecast overdue gaps. At fixed rupture area moment grows only LINEARLY with delay.",
        "domain_finding, verbatim.",
      ),
      {
        title: "research/nature_ontology/03_fault_mechanics.md",
        section: "§0 Verdict and §3.2",
        excerpt:
          "Storage tells you the size of the eventual invoice, not the due date. … Fixed rupture area: M0 grows linearly in time; doubling the delay adds only (2/3)·log10(2) ≈ 0.20 magnitude units. (Zielke et al. 2010, doi:10.1126/science.1182781; Kagan & Jackson 1991, doi:10.1029/91JB02210.)",
        why: "The numbers behind the finding.",
      },
    ],
  ),

  entry(
    "COL_004 BIO_ENDO_001",
    {
      overview:
        "Mapping BIO_ENDO_001. Claim as made: 'Integration preserves the sovereignty of the integrated party.' The biology grants the existence proof and strips the agency: mitochondria retain a genome — human: 16,569 bp, 37 genes — after roughly two billion years inside the host. That lineage was never absorbed into the host chromosome set. Erasure was possible; it did not happen in the main line.",
      mechanism:
        "But the retained genome has lost the genome's context of autonomy. It cannot replicate itself — POLG, the mitochondrial DNA polymerase, is nuclear-encoded. It cannot build its own ribosomes. It encodes 13 of the 1,136 proteins in its own proteome — 1.1%; the other ~99% are imported through host-controlled channels. Fission, fusion and mitophagy — shape, number, and death — are host-executed. And Monocercomonoides shows the genome can go to zero: at least one eukaryote erased the organelle entirely.",
      residual:
        "Contact point, verbatim: 'what persists is a policed inheritance channel, not an agent with authority'.",
      currentStatus:
        "OPEN. Repair route on file: integration need not ERASE lineage, and retained lineage can carry divergent interests (cytoplasmic male sterility, selfish heteroplasmy). Sovereignty-as-agency is not supported; lineage-with-interests is.",
    },
    [
      REGISTRY_SRC(
        "COL_004",
        "Mitochondria retain a genome (human: 16,569 bp, 37 genes) after ~2 Gyr, but cannot replicate it (POLG is nuclear), cannot build their own ribosomes, encode 13 of 1,136 proteome members (1.1%), and undergo host-executed fission, fusion and mitophagy. Monocercomonoides shows the genome can go to zero.",
        "domain_finding, verbatim.",
      ),
      {
        title: "research/nature_ontology/04_endosymbiosis_speciation.md",
        section: "§0 The strongest objection, first",
        excerpt:
          "The human mitochondrial proteome comprises 1,136 genes in MitoCarta3.0; mtDNA encodes 13 of those proteins — 1.1%. … the oxymonad Monocercomonoides has no detectable mitochondrion of any kind (Karnkowska et al. 2016). Identity persists as lineage-with-interests, not as agent-with-authority.",
        why: "The numbers behind the finding.",
      },
    ],
  ),

  entry(
    "COL_005 GRAD_003",
    {
      overview:
        "Mapping GRAD_003. Claim as made: 'Total victory and heat death are the same terminal state: gradient zero.' The physics rules the two 'gradients' homonyms — a spatial difference in an intensive variable (thermodynamics) versus a derivative in parameter space (optimization). The word is doing double duty for two mathematically distinct objects, and any argument that slides between them on the strength of the shared word is an equivocation.",
      mechanism:
        "The decisive asymmetry: WGAN escapes the GAN gradient-zero by re-metrisation — replacing the Jensen–Shannon divergence with the Wasserstein-1 metric restores informative gradients for the very same distributions. Nothing escapes Carnot; η = 1 − Tc/Th is metric-independent physics. Arjovsky & Bottou Thm 2.4 is conditional — disjoint or non-aligned low-dimensional supports, the saturating loss — and in a GAN, zero difference (Pg = Pr) is the SUCCESS condition. In thermodynamics zero difference is death. The valences invert.",
      residual:
        "Contact point, verbatim: 'thermodynamic gradient-zero is ontological; GAN gradient-zero is epistemic'.",
      currentStatus:
        "OPEN. Repair route on file: state as 'structurally analogous, not the same object' — no resolvable difference signal means no directed improvement, instantiated independently in each domain. Do not cite the GAN theorem as proof of the cross-domain claim.",
    },
    [
      REGISTRY_SRC(
        "COL_005",
        "The two 'gradients' are homonyms — a spatial difference in an intensive variable versus a derivative in parameter space. WGAN escapes the GAN gradient-zero by re-metrisation; nothing escapes Carnot. Arjovsky & Bottou Thm 2.4 is conditional on disjoint or non-aligned low-dimensional supports and the saturating loss. In a GAN, zero difference is the SUCCESS condition — the valences invert.",
        "domain_finding, verbatim.",
      ),
      {
        title: "research/nature_ontology/05_gradients_and_structure.md",
        section: "§6 Verdict: homonym, not identity",
        excerpt:
          "Thermodynamic gradient-zero is ontological (the difference is gone); GAN gradient-zero is epistemic (the difference is invisible to the chosen measurement). These converge only in the degenerate case Pg = Pr — which is the GAN's success condition, not its failure mode. (Carnot 1824; Arjovsky & Bottou 2017, arXiv:1701.04862, Thm 2.4; WGAN: arXiv:1701.07875.)",
        why: "The numbers and theorems behind the finding.",
      },
    ],
  ),
];
