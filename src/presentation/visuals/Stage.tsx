import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { CardGrid } from "./diagrams/Cards";
import { Graph } from "./diagrams/Graph";
import { CharacterSheet, EarthBoard, FusionFields, LodPyramid, NestedShells, RefereeBoard } from "./diagrams/Specials";
import { CloseCircuit, PlanetRing, SundayBoard, TitleHero } from "./diagrams/Heroes";
import { AurisPipe, CascadeStack, EarLoop, EventPath, GateFlow, GovernorLadder, SelfNerfFlow, SequenceFlow } from "./diagrams/Flows";
import { DataTable, MappingTable } from "./diagrams/Tables";
import { ArcsMap } from "./diagrams/ArcsMap";
import { ContentBoard } from "./diagrams/LadderBoard";

const WorldCanvas = lazy(() => import("./three/WorldCanvas").then((m) => ({ default: m.WorldCanvas })));

/** Slugs with a bespoke case in the switch below. Anything else that carries
 *  content fields (cards / stats / rows / table) renders via ContentBoard —
 *  in BOTH vis modes — instead of falling back to title-only Graph boxes.
 *  (3D is bypassed for these scenes deliberately: the 3D label font has no
 *  subscript glyphs, and the Graph3D fallback shows no body text at all.) */
const ROUTED_SLUGS = new Set([
  "title", "character", "event", "vm", "fusion", "earth", "planets", "toolkit",
  "arcs", "built", "canon", "convergence", "ask", "evidence", "auris", "irtg",
  "sunday", "gate", "lod", "governor", "cascade", "ear", "referee", "genesis", "close",
  "self-nerf",
]);

function isContentFallback(model: { slug: string; cards?: unknown[]; stats?: unknown[]; rows?: unknown[]; table?: unknown }) {
  return (
    !ROUTED_SLUGS.has(model.slug) &&
    Boolean(model.cards?.length || model.stats?.length || model.rows?.length || model.table)
  );
}

function entityForStep(index: number, stepIndex: number) {
  const model = getModel(index);
  const step = model.steps?.[stepIndex];
  if (!step) return model.entities[stepIndex]?.id ?? null;
  return (
    model.entities.find(
      (e) => e.id.includes(step.id) || e.label.toLowerCase().includes(step.label.toLowerCase().split(" ")[0] ?? ""),
    )?.id ??
    model.entities[stepIndex]?.id ??
    null
  );
}

export function Stage({ index, compact }: { index: number; compact?: boolean }) {
  const vis = useDeck((s) => s.visMode);
  const model = getModel(index);
  const selectedId = useDeck((s) => s.selectedEntityId);
  const selectEntity = useDeck((s) => s.selectEntity);
  const present = useDeck((s) => s.mode === "present");
  const activeStep = useDeck((s) => s.activeStep);
  const setStep = useDeck((s) => s.setStep);

  const contentFallback = isContentFallback(model);

  if (vis === "3d" && !contentFallback) {
    return (
      <div data-stage className="h-full min-h-0 w-full">
        <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-sm tracking-wide text-dim">MOUNTING THE WORLD</div>}>
          <WorldCanvas mobile={compact} />
        </Suspense>
      </div>
    );
  }

  const onSelect = (id: string | null) => selectEntity(id);
  const onStep = (i: number) => {
    setStep(i);
    const id = entityForStep(index, i);
    if (id) selectEntity(id);
  };

  const graph = compact ? (
    <CardGrid
      entities={model.entities.filter((e) => e.group !== "stat")}
      selectedId={selectedId}
      onSelect={onSelect}
      present={present}
      columns={1}
    />
  ) : (
    <Graph
      entities={model.entities.filter((e) => e.group !== "stat" && e.group !== "row")}
      edges={model.edges}
      layout={model.layout}
      selectedId={selectedId}
      onSelect={onSelect}
      present={present}
    />
  );

  let visual: ReactNode;
  switch (model.slug) {
    case "title":
      visual = <TitleHero quote={model.quote} attribution={model.attribution} footer={model.footer} />;
      break;
    case "character":
      visual = <CharacterSheet entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} />;
      break;
    case "event":
      visual = (
        <EventPath
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          steps={model.steps}
          activeStep={activeStep}
          onStep={onStep}
        />
      );
      break;
    case "vm":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <NestedShells entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "fusion":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <FusionFields entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "earth":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <EarthBoard entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "planets":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <PlanetRing entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "toolkit":
      visual = model.table ? (
        <DataTable table={model.table} entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} />
      ) : (
        graph
      );
      break;
    case "arcs":
      visual = <ArcsMap selectedId={selectedId} onSelect={onSelect} present={present} compact={compact} />;
      break;
    case "built":
    case "canon":
    case "convergence":
      visual = graph;
      break;
    case "ask":
      visual = <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={2} />;
      break;
    case "evidence":
      visual = model.table ? (
        <DataTable table={model.table} entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} />
      ) : (
        graph
      );
      break;
    case "auris":
      visual = (
        <AurisPipe
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          steps={model.steps}
          activeStep={activeStep}
          onStep={onStep}
        />
      );
      break;
    case "irtg":
      visual = (
        <MappingTable
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          leftHeader="ITRTG mechanic"
          rightHeader="Curtis parallel"
          present={present}
        />
      );
      break;
    case "sunday":
      visual = <SundayBoard entities={model.entities} selectedId={selectedId} onSelect={onSelect} />;
      break;
    case "gate":
      visual = (
        <GateFlow
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          steps={model.steps}
          activeStep={activeStep}
          onStep={onStep}
        />
      );
      break;
    case "lod":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <LodPyramid entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "governor":
      visual = (
        <GovernorLadder
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          steps={model.steps}
          activeStep={activeStep}
          onStep={onStep}
        />
      );
      break;
    case "cascade":
      visual = <CascadeStack entities={model.entities} selectedId={selectedId} onSelect={onSelect} />;
      break;
    case "ear":
      visual = <EarLoop entities={model.entities} selectedId={selectedId} onSelect={onSelect} />;
      break;
    case "referee":
      visual = compact ? (
        <CardGrid entities={model.entities.filter((e) => e.group !== "row")} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <RefereeBoard entities={model.entities} selectedId={selectedId} onSelect={onSelect} />
      );
      break;
    case "genesis":
      visual = <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={3} />;
      break;
    case "self-nerf":
      visual = compact ? (
        <CardGrid entities={model.entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={1} />
      ) : (
        <SelfNerfFlow
          entities={model.entities}
          selectedId={selectedId}
          onSelect={onSelect}
          steps={model.steps}
          activeStep={activeStep}
          // The chain stages are diagram scaffolding, not entities — stepping
          // must not run entityForStep's fuzzy match against the fork cards.
          onStep={(i) => setStep(i)}
        />
      );
      break;
    case "close":
      visual = <CloseCircuit entities={model.entities} selectedId={selectedId} onSelect={onSelect} quote={model.quote} />;
      break;
    default:
      visual = contentFallback ? (
        <ContentBoard model={model} selectedId={selectedId} onSelect={onSelect} />
      ) : model.steps ? (
        <SequenceFlow entities={model.entities} selectedId={selectedId} onSelect={onSelect} steps={model.steps} activeStep={activeStep} />
      ) : (
        graph
      );
  }

  return (
    <div data-stage className="relative h-full min-h-0 w-full" onClick={() => onSelect(null)}>
      <div key={model.id} className="hud-enter h-full min-h-0" onClick={(e) => e.stopPropagation()}>
        {visual}
      </div>
    </div>
  );
}
