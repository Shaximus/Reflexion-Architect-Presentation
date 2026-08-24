// THE RETAINED GENOME — nature-ontology scene 04.
//
// Source: /home/shax/Documents/Research/nature_ontology/04_endosymbiosis_speciation.md
// (research synthesis, 2026-08-23; 14 load-bearing citations verified against
// publisher records this session, marked [v] there; unverified details carry
// CLAIMED labels, which are preserved here — do not strip them).
//
// Registered collision: COL_004 (semantic_compiler/registry/correspondence.py),
// against mapping BIO_ENDO_001. The collision appears ON the slide face at full
// weight, by design: the non-sovereignty inventory is the strongest thing on the
// slide precisely because it undercuts the easy reading. The registry note is
// explicit — BIO_ENDO_001 is deliberately the lowest-confidence mapping in its
// set (0.35) BECAUSE its surface appeal is the highest.
//
// Epistemic labels carried inline: ESTABLISHED / CONTESTED / CLAIMED. Citations
// are author/year, real, from the source's reference index.
import type { Detail, Scene, SourceRef } from "../types";

const SRC = (section: string, excerpt: string, why?: string): SourceRef => ({
  title: "04_endosymbiosis_speciation.md — nature-ontology research corpus",
  section,
  excerpt,
  why,
});

const REG = (excerpt: string, why?: string): SourceRef => ({
  title: "semantic_compiler/registry/correspondence.py — COL_004",
  section: "Collision COL_004 (mapping BIO_ENDO_001)",
  excerpt,
  why,
});

export const SCENE: Omit<Scene, "id"> = {
  slug: "nature-genome",
  act: "The Laws",
  title: "THE RETAINED GENOME",
  kicker:
    "Two billion years inside another cell, and the absorbed party still carries its own genome. What that proves — and what it strictly does not.",
  quote: "Lineage-with-interests, not agent-with-authority.",
  attribution:
    "The maximum defensible reading of the retained genome — the source's verdict on its own thesis, after the collision.",
  visual: "cards",
  camera: [0, 0.65, 10.5],
  stats: [
    {
      value: "16,569 bp · 37 genes",
      label:
        "human mtDNA: 13 protein + 22 tRNA + 2 rRNA, own circular chromosome, bacterial-type ribosomes (Anderson et al. 1981)",
      accent: "teal",
    },
    {
      value: "13 / 1,136 = 1.1%",
      label:
        "share of its own proteome the mitochondrion encodes — MitoCarta3.0 (Rath et al. 2021; DOI CLAIMED)",
      accent: "crimson",
    },
    {
      value: "0",
      label:
        "the genome can go to zero: Monocercomonoides has no mitochondrion of any kind (Karnkowska et al. 2016)",
      accent: "gold",
    },
  ],
  cards: [
    {
      title: "THE FINDING",
      subtitle: "Integration did not require erasure",
      accent: "teal",
      lines: [
        "Human mtDNA: 16,569 bp, 37 genes — 13 protein, 22 tRNA, 2 rRNA — on its own circular chromosome, translated on bacterial-type ribosomes, retained after roughly two billion years inside another cell (Anderson et al. 1981). The dating caveat travels with the number: ~2 Gyr is the upper end of a CONTESTED 1.5–2.0 Gyr range. Jakobid mitochondria retain up to 97 genes — *Reclinomonas americana*, a eubacterial genome in miniature (Lang et al. 1997). And in cryptophytes and chlorarachniophytes the engulfed alga's own NUCLEUS is still present: the *Guillardia theta* nucleomorph, 551 kb on 3 chromosomes (Douglas et al. 2001) — a residual nucleus persisting through two nested unions.",
      ],
    },
    {
      title: "COL_004: NOT SOVEREIGN",
      subtitle: "The registered collision — given full weight",
      accent: "crimson",
      lines: [
        "Claim under test: integration preserves the sovereignty of the integrated party. The domain says no — in any agentive sense, mitochondria are not sovereign. They cannot replicate their own genome (POLG, the mtDNA polymerase, is nuclear-encoded). They cannot build their own ribosomes (all ~80 mitoribosomal proteins are imported). They encode 13 of 1,136 mitochondrial proteome members — 1.1% (MitoCarta3.0). Their fission, fusion and destruction (mitophagy) are executed by the host.",
        "Over 98–99% of the ancestral gene endowment was lost or transferred to the nucleus, and the transfer is ONGOING — measured at 1 in 16,000 tobacco pollen grains (Huang et al. 2003). *Monocercomonoides* proves the genome can go to zero (Karnkowska et al. 2016). What persists is a policed inheritance channel, not an agent with authority.",
      ],
    },
    {
      title: "WHAT SURVIVES",
      subtitle: "The defensible remainder",
      accent: "gold",
      lines: [
        "Erasure is not OBLIGATORY. Sister lineages that could erase the genome did — hydrogenosomes, mitosomes, *Monocercomonoides* — and the main line did not, across ~2 billion years. And the retained lineage carries genuinely divergent evolutionary interests: cytoplasmic male sterility in plants is a mitochondrial-encoded trait that sterilizes pollen against the nuclear genome's interest, answered by nuclear restorer genes in an ongoing molecular arms race; selfish heteroplasmic mtDNA variants outreplicate wild-type while harming the organism. No agency, no authority — but real, measurable, conflicting interests that the host must actively suppress. Lineage-with-interests, not agent-with-authority.",
      ],
    },
  ],
  rows: [
    {
      left: "Separation",
      right:
        "New species require a barrier to gene flow. Geography is the commonest way to get one — not the requirement itself: phenology, host choice, soil, depth and ploidy also serve (the credible sympatric cases all ride one of these).",
    },
    {
      left: "Union",
      right:
        "Union ALSO creates novelty: allopolyploidy — a new species born from a merger, instantly isolated from both parents — accounts for ~15% of angiosperm speciation events (Wood et al. 2009; figure taxon-specific, CLAIMED).",
    },
    {
      left: "Barrier removal",
      right:
        "Great American Biotic Interchange: the Isthmus of Panama removed the barrier and the endemic South American fauna collapsed. Pattern ESTABLISHED; causal mechanism CONTESTED — natives were already declining pre-contact (Carrillo et al. 2020), and the closure date itself is disputed (O'Dea et al. 2016 vs Montes et al. 2015).",
    },
    {
      left: "Boundary failure",
      right:
        "Lake Victoria eutrophication degraded the color signals maintaining assortative mating — species fused back together, speciation in reverse (Seehausen et al. 1997). The lake's wider radiation story is CONTESTED in its causal details; the reversal is the direct observation.",
    },
  ],
  footer:
    "Novelty requires a boundary; splitting is the commonest way to get one; merging works only when it creates one. — the corrected law, standing after the collision.",
};

// Deep-dive ids computed as "nature-genome:" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").
export const DEEP: { id: string; detail: Detail; sources: SourceRef[] }[] = [
  {
    // title: "The Retained Genome"
    id: "nature-genome:the-finding",
    detail: {
      overview:
        "The most consequential merger in the history of life — an alphaproteobacterium absorbed into an archaeal host — produced a composite in which the absorbed party still carries its own genome roughly two billion years later. Retention, not erasure, is the observed end-state of the deepest known integration. ESTABLISHED; the ~2 Gyr figure is the upper end of a CONTESTED 1.5–2.0 Gyr dating range.",
      structure:
        "Human mtDNA (Anderson et al. 1981, the Cambridge Reference Sequence): 16,569 bp, circular, double-stranded; 37 genes — 13 protein-coding (all hydrophobic core subunits of oxidative phosphorylation), 22 tRNAs, 2 rRNAs; hundreds to thousands of copies per cell; a deviant genetic code (UGA = Trp); maternal inheritance through a germline bottleneck. The mitoribosome is bacterial-type — live pharmacology, not a curiosity: chloramphenicol bone-marrow suppression, linezolid lactic acidosis, and aminoglycoside ototoxicity via the m.1555A>G 12S rRNA variant all follow from the organelle's bacterial ancestry (Prezant et al. 1993; details CLAIMED).",
      examples: [
        "Jakobid protists hold the record for retained genes: *Reclinomonas americana* mtDNA is 69,034 bp with 97 genes, operon-like clusters, Shine–Dalgarno-like motifs, and a four-subunit bacterial-type RNA polymerase — 'an ancestral mitochondrial DNA resembling a eubacterial genome in miniature' (Lang et al. 1997).",
        "The retained count spans 3 protein genes (*Plasmodium falciparum*) through 13 (human) to ~66 (jakobids) — every aerobic eukaryote keeps a set, and largely the same set.",
        "Cryptophyte and chlorarachniophyte nucleomorphs are a RESIDUAL NUCLEUS of a eukaryotic alga engulfed whole: *Guillardia theta*'s nucleomorph is 551 kb on 3 chromosomes, the most gene-dense eukaryotic genome known at sequencing, down to ~30 genes for plastid-located proteins (Douglas et al. 2001). One *Guillardia* cell runs four genomes in nested compartments.",
        "The independent replicate: *Paulinella chromatophora* acquired a cyanobacterial endosymbiont ~90–140 Ma and is mid-integration now — chromatophore genome already reduced ~3-fold, transfer to the host nucleus underway (Nowack et al. 2008; figures CLAIMED). The reduction ratchet is reproducible and directional.",
      ],
      implications: [
        "Why those genes stayed is explained by physics and control theory, not negotiation: the hydrophobicity constraint (multi-spanning membrane proteins mis-route to the ER if made in the cytosol — Björkholm et al. 2015, experimental) and CoRR, co-location for redox regulation (Allen 2015). Both CONTESTED as exclusive explanations; compatible as constraints.",
        "Honest reading of the nucleomorph — do not romanticize: it is erasure caught in the act. Most secondary-plastid lineages completed the deletion; the two nucleomorph lineages are stalled, not defended.",
      ],
      residual:
        "Retention is functional residue under physical and regulatory constraint — not a symbiont defending an identity. That distinction is the whole scene.",
    },
    sources: [
      SRC(
        "§1.2 — the human mitochondrial genome",
        "size 16,569 bp, circular, double-stranded · total genes 37 · protein-coding 13 · tRNA genes 22 · rRNA genes 2",
        "Anderson et al. 1981, Nature 290:457-465, DOI verified against publisher records in the source session.",
      ),
      SRC(
        "§1.3 — the migration ledger",
        "*Reclinomonas americana* mtDNA is 69,034 bp with 97 genes total, including operon-like clusters, Shine-Dalgarno-like motifs, and a four-subunit bacterial-type RNA polymerase (Lang et al. 1997).",
      ),
      SRC(
        "§2.2 — secondary endosymbiosis and the nucleomorph",
        "nucleomorph genome of 551 kb on 3 chromosomes — the most gene-dense eukaryotic genome known at sequencing (Douglas et al. 2001, 'The highly reduced genome of an enslaved algal nucleus').",
        "The sharpest exhibit: a residual nucleus surviving two nested unions — reported together with its counter-reading (a stalled deletion).",
      ),
    ],
  },

  {
    // title: "COL_004: The Non-Sovereignty Inventory"
    id: "nature-genome:col-004-not-sovereign",
    detail: {
      overview:
        "COL_004 is this domain's registered collision: the translation claim 'integration preserves the sovereignty of the integrated party' fails on contact with the biology. The full inventory of what the mitochondrion does NOT control — every item ESTABLISHED — is the strongest content on the slide, because it undercuts the easy reading of the retained genome.",
      structure:
        "The eight-point inventory: (1) it cannot copy its own genome — POLG, TWINKLE, mtSSB, TFAM are all nuclear-encoded and imported; (2) it cannot transcribe unaided — POLRMT and its factors are nuclear; (3) it cannot build its own ribosomes — mtDNA contributes only the 2 rRNAs and 22 tRNAs, all ~80 mitoribosomal proteins are imported; (4) ~99% of its proteome arrives through host-controlled channels — 13 of 1,136 MitoCarta3.0 members are mtDNA-encoded, 1.1%, and the TOM/TIM import machinery is itself nuclear-encoded; (5) fission (DRP1), fusion (MFN1/2, OPA1) and mitophagy (PINK1/Parkin) are host-executed; (6) no independent reproduction and no exit option — copy number host-regulated, inheritance through a host-imposed bottleneck; (7) gene flow was massive and essentially one-way, and continues — chloroplast DNA reaches the tobacco nucleus in ~1 in 16,000 pollen grains (Huang et al. 2003), human NUMTs still insert de novo (Wei et al. 2022; rate CLAIMED); (8) retention is contingent, not principled — hydrogenosomes and mitosomes shed the genome, and *Monocercomonoides* shed the organelle entirely (Karnkowska et al. 2016).",
      causeEffect: [
        "From a few thousand ancestral genes to 13-66 retained protein genes: >98-99% of the ancestral coding capacity lost or transferred in every eukaryotic lineage.",
        "The host controls the door, the doorframe, and nearly everything that walks through it — on any agentive definition, mitochondrial sovereignty = 0.",
        "Lineages that could erase the genome, did. Whatever kept it in place in the main line, it was not an inviolable right of the absorbed party.",
      ],
      currentStatus:
        "Registered in the correspondence registry with contact point 'what persists is a policed inheritance channel, not an agent with authority' and repair route: re-scope to lineage-with-interests. The parent mapping BIO_ENDO_001 is deliberately the lowest-confidence mapping in its set (0.35) BECAUSE its surface appeal is the highest; the inventory is its negative control.",
      residual:
        "The source's own instruction: if only one residual mismatch from this file survives compression, it should be the agency mismatch. Any use of the retained-genome image that implies the absorbed party kept agency has left the supported region.",
    },
    sources: [
      REG(
        "Mitochondria retain a genome (human: 16,569 bp, 37 genes) after ~2 Gyr, but cannot replicate it (POLG is nuclear), cannot build their own ribosomes, encode 13 of 1,136 proteome members (1.1%), and undergo host-executed fission, fusion and mitophagy. Monocercomonoides shows the genome can go to zero.",
        "The registered domain_finding, quoted verbatim from the registry.",
      ),
      SRC(
        "§0 — the strongest objection, first",
        "Every item in this list is ESTABLISHED. ... The host controls the door, the doorframe, and nearly everything that walks through it.",
        "The source leads with the attack on its own thesis by design; the slide does the same.",
      ),
      SRC(
        "§0 item 7 / §1.3",
        "chloroplast DNA reaches the tobacco nucleus in ~1 in 16,000 pollen grains (Huang, Ayliffe & Timmis 2003, Nature 422:72-76).",
        "Transfer is ongoing and measured — verified citation in the source session.",
      ),
    ],
  },

  {
    // title: "Lineage with Interests"
    id: "nature-genome:what-survives",
    detail: {
      overview:
        "What honestly survives the collision: not sovereignty, not agency — three narrower and still remarkable facts. An unbroken, physically separate genetic lineage; a separate inheritance channel the host must actively police; and occasionally divergent evolutionary interests the host must actively suppress. The source's defensible phrase: lineage-with-interests, not agent-with-authority.",
      mechanism:
        "Because mtDNA is maternally transmitted, variants that sabotage male function can spread even against the organism's interest. Cytoplasmic male sterility (CMS) in plants is a mitochondrial-encoded trait that sterilizes pollen production; nuclear restorer-of-fertility (Rf) genes evolve to suppress it — a documented, ongoing molecular arms race used commercially in hybrid seed production (Hanson & Bentolila 2004; Chase 2007; DOIs CLAIMED). ESTABLISHED. Likewise, selfish heteroplasmic mtDNA deletion variants outreplicate wild-type within cells despite harming the organism — ESTABLISHED in model systems.",
      implications: [
        "Uniparental inheritance itself is interpretable as host-side conflict suppression (Cosmides & Tooby 1981; CONTESTED in detail, mainstream as a framework). The separate channel is not tolerated — it is policed.",
        "Erasure is not OBLIGATORY: the existence proof stands. Total genomic erasure is not a necessary condition of even the deepest known integration — provided the claim is stated without agentive language.",
        "The composite may even depend on the retained fragment: Lane & Martin 2010 argue eukaryotic complexity was energetically enabled by local genomic control of bioenergetic membranes — CONTESTED (Lynch & Marinov 2015 dispute the energetics); report as an open dispute, not settled support.",
      ],
      residual:
        "The mitochondrion has no agency, but the mitochondrial genome still has evolutionary interests not identical to the host's — and the composite requires active conflict suppression to hold together (Burt & Trivers 2006). That is the full extent of the surviving 'identity', and it is measurable.",
    },
    sources: [
      SRC(
        "§0, closing — what honestly survives",
        "Identity persists as lineage-with-interests, not as agent-with-authority. That is the maximum defensible version of thesis A.",
      ),
      SRC(
        "§3.2 — the defensible remainder",
        "cytoplasmic male sterility (CMS) in plants is a mitochondrial-encoded trait that sterilizes pollen production, against the nuclear genome's interest, and nuclear restorer-of-fertility (Rf) genes evolve to suppress it — a documented, ongoing molecular arms race.",
        "The closest thing to residual 'self': conflicting interests, requiring standing suppression machinery.",
      ),
      REG(
        "Re-scope to: integration need not ERASE lineage, and retained lineage can carry divergent interests (cytoplasmic male sterility, selfish heteroplasmy). Sovereignty-as-agency is not supported; lineage-with-interests is.",
        "The registry's repair_route — the sanctioned re-scoped claim, verbatim.",
      ),
    ],
  },

  {
    // title: "Novelty Requires a Boundary"
    id: "nature-genome:separation",
    detail: {
      overview:
        "The speciation half of the finding, amended twice by the evidence. Original claim: novelty requires separation. Corrected claim: novelty requires a BARRIER TO GENE FLOW — geography is the commonest way to get one, not the requirement itself — and union also generates novelty, but only when the merged product immediately acquires its own boundary against reabsorption.",
      mechanism:
        "Allopatric speciation is the predominant, best-documented mode (Coyne & Orr 2004; ESTABLISHED). The Bateson-Dobzhansky-Muller model supplies the mechanism: two isolated populations each fix changes that are fine on their own background; the combination, never tested by selection, fails in hybrids. Separation manufactures incompatibility without either lineage passing through a low-fitness state.",
      examples: [
        "Non-geographic barriers carry the credible sympatric cases: *Howea* palms on Lord Howe Island diverged on a flowering-time disjunction correlated with soil type (Savolainen et al. 2006; challenged in correspondence, supported by later genomics — CONTESTED but leaning established, and probably the single best case).",
        "*Rhagoletis pomonella*, the textbook 'sympatric speciation in progress', runs on host choice — but its diapause-timing inversions originated in ALLOPATRY ~1.57 Ma (Feder et al. 2003). Sympatric divergence, powered by allopatric raw material. Both halves ESTABLISHED.",
        "Union creating novelty: allopolyploid speciation — hybridize, double the genome, and the polyploid is instantly reproductively isolated from both parents. ~15% of angiosperm speciation events (Wood et al. 2009; figure taxon-specific, CLAIMED); documented origins under 100 years old (*Tragopogon mirus/miscellus*). ESTABLISHED as a phenomenon.",
        "Eukaryogenesis itself is the extreme case: the largest single generation of biological novelty known came from a fusion, not a split — and succeeded by becoming a new reproductive unit, i.e. by acquiring its own boundary.",
      ],
      implications: [
        "Ring species — the graded continuum made visible — turn out to contain historical allopatric interruptions in both flagship cases (*Ensatina*, greenish warbler; Alcaide et al. 2014). CONTESTED as unbroken rings; the continuum stands, and the breaks STRENGTHEN the barrier requirement.",
        "The synthesis, labeled by the source as interpretation (SPECULATIVE at the framing level, components ESTABLISHED): separation multiplies variants within a level; union occasionally creates new levels or kinds. Both engines run on the same precondition — insulation from reabsorption.",
      ],
      currentStatus:
        "Corrected law: novelty requires a boundary; splitting is the commonest way to get one; merging works only when it creates one.",
    },
    sources: [
      SRC(
        "§4.4 / §7 — thesis B, amended",
        "novelty requires a boundary; splitting is the commonest way to get one; merging works only when it creates one.",
        "The corrected form of the thesis, stated in the source's consolidated verdicts.",
      ),
      SRC(
        "§4.4 — novelty by union",
        "Estimated ~15% of angiosperm speciation events and ~31% in ferns involve polyploidy (Wood et al. 2009; DOI CLAIMED).",
        "The frequency figure carries its CLAIMED flag; the phenomenon itself is ESTABLISHED.",
      ),
      SRC(
        "§4.3 — Rhagoletis, both halves",
        "the diapause-timing inversion polymorphisms fueling the host shift originated in allopatry — a Mexican-highland isolate ~1.57 Ma (Feder et al. 2003). Sympatric divergence, powered by allopatric raw material.",
      ),
    ],
  },

  {
    // title: "The Control: Boundary Removal"
    id: "nature-genome:barrier-removal",
    detail: {
      overview:
        "If the boundary is the active ingredient, removing it should collapse distinctness. The control experiment ran twice — once at continental scale over millions of years, once inside a single lake within living memory. Both times the boundary's removal did what the law predicts. Both are CONTESTED in their causal details, and the slide says so.",
      sections: [
        {
          heading: "Great American Biotic Interchange — barrier removal at continental scale",
          body:
            "South America evolved an endemic fauna in ~60 Myr of island isolation: sparassodont metatherian carnivores, notoungulates, litopterns, glyptodonts, ground sloths, terror birds. The Isthmus of Panama removed the barrier — conventional closure ~2.8 Ma (O'Dea et al. 2016), with a rival school arguing for substantial connection by 13–15 Ma (Montes et al. 2015): the date itself is CONTESTED, quote the dispute. Outcome: faunas mixed both ways, but asymmetrically — northern immigrants radiated spectacularly in the south (roughly half of South American mammal genera now derive from immigrant lineages; figure approximate), while the southern endemics named above are all extinct. Causal mechanism CONTESTED: quantitative fossil work indicates elevated pre- and syn-interchange extinction among the natives left the space the immigrants filled (Carrillo et al. 2020) — this was not simply competitive superiority on contact, and late-Pleistocene losses overlap megafaunal/human factors.",
        },
        {
          heading: "Lake Victoria — boundary failure in real time",
          body:
            "Eutrophication increased turbidity and degraded the color signals maintaining assortative mating among haplochromine cichlids; hybridization followed and species distinctions collapsed — speciation in reverse (Seehausen, van Alphen & Witte 1997). When the isolating boundary fails, the species fuse. The reversal is the direct observation; the lake's wider radiation story is CONTESTED on multiple axes — the age of the radiation (post-desiccation ~15,000 yr vs older refugia lineages), whether within-lake divergence is sympatric at all (sensory drive along depth/turbidity gradients, micro-allopatry included; Seehausen et al. 2008), and the hybrid-swarm fuel from ancient riverine admixture (Meier et al. 2017; CLAIMED).",
        },
      ],
      causeEffect: [
        "Isolation built unique faunas; barrier removal ended the production of that uniqueness and coincided with its loss.",
        "Mixing is not only destruction: the interchange also seeded a genuine new radiation (sigmodontine rodents, ~400 living species; count approximate, CLAIMED), and Lake Victoria's radiation was itself fueled by an ancient admixture event — union supplying variation that separation then sorted.",
        "The boundary is informational, not only physical: degrading only the discrimination signal (water clarity) sufficed to reverse divergence.",
      ],
      residual:
        "Both controls carry contested causal details and are presented as pattern-level evidence only. The pattern is consistent both times: the boundary, not the entities, maintains the distinctness — and it requires continuous maintenance.",
    },
    sources: [
      SRC(
        "§5.2 — the Great American Biotic Interchange",
        "the asymmetry was not simply 'northern competitive superiority upon contact.' Quantitative fossil analysis indicates elevated pre- and syn-interchange extinction among South American natives left ecological space that northern immigrants filled (Carrillo et al. 2020). CONTESTED mechanism, ESTABLISHED pattern.",
        "The control's causal nuance, stated before a hostile reviewer demands it.",
      ),
      SRC(
        "§4.3 — the reverse experiment",
        "eutrophication of Lake Victoria increased turbidity, degraded the color signals maintaining assortative mating, and drove hybridization and collapse of species distinctions — 'speciation in reverse' (Seehausen, van Alphen & Witte 1997). When the isolating boundary fails, the species fuse.",
        "The single most direct empirical support for the boundary law.",
      ),
      SRC(
        "§5.2 — the dating dispute",
        "Conventional closure date ~2.8 Ma (O'Dea et al. 2016); a rival school argues for substantial land connection by the middle Miocene, 13-15 Ma (Montes et al. 2015). CONTESTED — quote the dispute, not one side.",
      ),
    ],
  },
];
