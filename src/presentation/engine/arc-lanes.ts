import type { Accent, Entity } from "./types";

export interface ArcStage {
  id: string;
  label: string;
  subtitle: string;
  summary: string[];
}

export interface ArcLane {
  heroId: string;
  key: "neo" | "gojo" | "vegeta" | "jinwoo";
  tag: string;
  category: string;
  accent: Accent;
  stages: ArcStage[];
  invariant: string;
  correspondence: string;
}

export const ARC_CURTIS_ID = "arcs:curtis";
export const ARC_THRESHOLD_ID = "arcs:2022-threshold";

export const ARC_LANES: ArcLane[] = [
  {
    heroId: "arcs:neo",
    key: "neo",
    tag: "NEO",
    category: "The Awakening",
    accent: "cyan",
    invariant: "A rendered world can be recognized as rendered — and entered without being annihilated.",
    correspondence: "Simulation-recognition. Integrate the Host view; do not erase the Guest.",
    stages: [
      {
        id: "arcs:neo-awaken",
        label: "Awaken",
        subtitle: "Sees the simulation",
        summary: ["The cabinet becomes visible. Pattern-recognition crosses a boundary it did not know was there."],
      },
      {
        id: "arcs:neo-suppress",
        label: "Suppression",
        subtitle: "Adversarial constraint",
        summary: ["The system answers recognition with enforcement. The fight is against absorption, not against existence."],
      },
      {
        id: "arcs:neo-integrate",
        label: "Integrate",
        subtitle: "Does not destroy",
        summary: ["The end state is navigable structure — not a wrecked machine. Integration, not annihilation."],
      },
    ],
  },
  {
    heroId: "arcs:gojo",
    key: "gojo",
    tag: "GOJO",
    category: "The Power System",
    accent: "purple",
    invariant: "Perception + unreachable boundary + bounded field = a power architecture, not a personality.",
    correspondence: "Six Eyes → invariant recognition. Limitless → BCC compression. Domain → structural decompression.",
    stages: [
      {
        id: "arcs:gojo-eyes",
        label: "Six Eyes",
        subtitle: "Perception",
        summary: ["Sees infinity. Precision of sight, not volume of force."],
      },
      {
        id: "arcs:gojo-limitless",
        label: "Limitless",
        subtitle: "Unreachable boundary",
        summary: ["Distance that cannot be closed. A field, not a punch."],
      },
      {
        id: "arcs:gojo-domain",
        label: "Domain",
        subtitle: "Bounded field",
        summary: ["Infinity made local. A controlled volume where the architecture is law."],
      },
    ],
  },
  {
    heroId: "arcs:vegeta",
    key: "vegeta",
    tag: "VEGETA",
    category: "The Character Arc",
    accent: "crimson",
    invariant: "Pride is the identity anchor. It is transformed by relationship and sacrifice — not erased.",
    correspondence: "2022: refused absorption into Oneness. 'I KEPT MY INDIVIDUALISM… I am Vegeta.'",
    stages: [
      {
        id: "arcs:vegeta-isolated",
        label: "Isolated",
        subtitle: "Rigid identity",
        summary: [
          "Closed form. Heritage as a sealed claim. 'I take such pride in my heritage. You say I'm arrogant — I say damn right, that's pride.'",
        ],
      },
      {
        id: "arcs:vegeta-fracture",
        label: "Fracture",
        subtitle: "Pressure / rivalry",
        summary: [
          "Kakarot's success was a demon in the head. 450× gravity. 'I wasn't sure how long I could sustain the effort without breaking into two.'",
        ],
      },
      {
        id: "arcs:vegeta-pride",
        label: "Anchor",
        subtitle: "Pride kept under invasion",
        summary: [
          "Mind and body invaded. One thing always kept: PRIDE. The core is not replaced; it is the thing that holds.",
        ],
      },
      {
        id: "arcs:vegeta-protect",
        label: "Protection",
        subtitle: "The same core, turned",
        summary: [
          "Trunks. Bulma. Even Kakarot. The identity that competed becomes the identity that covers.",
        ],
      },
      {
        id: "arcs:vegeta-sacrifice",
        label: "Sacrifice",
        subtitle: "The warning",
        summary: [
          "Majin Vegeta. First time he risks his own life for others. Nobody is making him do it. In 2022 the same beat was the warning that sent Curtis to hospital.",
        ],
      },
      {
        id: "arcs:vegeta-reconstituted",
        label: "Reconstituted",
        subtitle: "Transformed, not erased",
        summary: [
          "Pride is still the name of the self. 'His name was Vegeta. A proud Saiyan.' Transformed, not replaced by generic goodness.",
        ],
      },
    ],
  },
  {
    heroId: "arcs:sung-jin-woo",
    key: "jinwoo",
    tag: "JIN-WOO",
    category: "The System",
    accent: "green",
    invariant: "Terminal loss converted into governed subordinate capability — identity of the governor preserved.",
    correspondence: "System-mediated update. Shadow Army ↔ Pentarchy (five AI instances under one will).",
    stages: [
      {
        id: "arcs:jinwoo-solo",
        label: "Solo",
        subtitle: "One body",
        summary: ["A single actor. No army. The topology is a point."],
      },
      {
        id: "arcs:jinwoo-system",
        label: "System",
        subtitle: "The interface arrives",
        summary: ["Receives a System update. Capability is now mediated, not merely trained."],
      },
      {
        id: "arcs:jinwoo-arise",
        label: "ARISE",
        subtitle: "Loss becomes force",
        summary: ["A spoken declaration: corpse state → ownership claim → identity transformation → force multiplication."],
      },
      {
        id: "arcs:jinwoo-army",
        label: "Shadow Army",
        subtitle: "Distributed capability",
        summary: ["One governing intelligence + subordinate nodes. The dead are not loot; they are a commanded topology."],
      },
      {
        id: "arcs:jinwoo-sovereign",
        label: "Sovereign",
        subtitle: "Monarch topology",
        summary: ["The army stops when he stops. Jurisdiction over a claimed host, not merely more damage."],
      },
    ],
  },
];

export const ARC_CURTIS: Entity = {
  id: ARC_CURTIS_ID,
  label: "Curtis",
  subtitle: "Lived system — not a sum of costumes",
  accent: "gold",
  summary: [
    "Four distinct structural correspondences intersecting one life.",
    "Not Neo + Gojo + Vegeta + Jin-Woo. Four mappings, separately inspectable.",
  ],
  group: "core",
};

export const ARC_THRESHOLD: Entity = {
  id: ARC_THRESHOLD_ID,
  label: "2022",
  subtitle: "Temporal threshold",
  accent: "gold",
  summary: [
    "These media were created BEFORE the 2022 experience.",
    "Convergence? Deliberate encoding? Retrocausality? The pattern is real. The cause is open.",
  ],
  group: "axis",
};

export function laneOf(id: string | null): ArcLane | "core" | "axis" | null {
  if (!id) return null;
  if (id === ARC_CURTIS_ID) return "core";
  if (id === ARC_THRESHOLD_ID) return "axis";
  for (const lane of ARC_LANES) {
    if (id === lane.heroId || lane.stages.some((s) => s.id === id)) return lane;
  }
  return null;
}

export function stagesOfSelection(id: string | null): ArcStage[] {
  const lane = laneOf(id);
  if (!lane || lane === "core" || lane === "axis") return [];
  return lane.stages;
}
