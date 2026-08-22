import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Earth3D, Fusion3D, Lod3D, Nested3D, Planets3D, Title3D, Toolkit3D } from "./scenes/Spatial3D";
import { Auris3D, Built3D, Canon3D, Cascade3D, Convergence3D, Ear3D, Gate3D, Governor3D, Graph3D, Referee3D } from "./scenes/System3D";
import { Ask3D, Character3D, Close3D, Event3D, Evidence3D, Genesis3D, Mapping3D, Sunday3D } from "./scenes/Narrative3D";
import { Arcs3D } from "./scenes/Arcs3D";

export function Scene3D() {
  const index = useDeck((s) => s.index);
  const slug = getModel(index).slug;
  switch (slug) {
    case "title":
      return <Title3D />;
    case "character":
      return <Character3D />;
    case "event":
      return <Event3D />;
    case "vm":
      return <Nested3D />;
    case "earth":
      return <Earth3D />;
    case "toolkit":
      return <Toolkit3D />;
    case "arcs":
      return <Arcs3D />;
    case "built":
      return <Built3D />;
    case "canon":
      return <Canon3D />;
    case "convergence":
      return <Convergence3D />;
    case "ask":
      return <Ask3D />;
    case "evidence":
      return <Evidence3D />;
    case "fusion":
      return <Fusion3D />;
    case "auris":
      return <Auris3D />;
    case "irtg":
      return <Mapping3D />;
    case "planets":
      return <Planets3D />;
    case "sunday":
      return <Sunday3D />;
    case "gate":
      return <Gate3D />;
    case "lod":
      return <Lod3D />;
    case "governor":
      return <Governor3D />;
    case "cascade":
      return <Cascade3D />;
    case "ear":
      return <Ear3D />;
    case "referee":
      return <Referee3D />;
    case "genesis":
      return <Genesis3D />;
    case "close":
      return <Close3D />;
    default:
      return <Graph3D />;
  }
}
