import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ACCENT_HEX } from "@/presentation/engine/types";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Beam, EnergyRing, FlowPacket, GlowOrb, Label3, OrbitMotes, Relic, VolumetricCloud, Waveform, layoutTo3 } from "../primitives";

function relatedSet(edges: { from: string; to: string }[], selected: string | null) {
  const related = new Set<string>();
  if (!selected) return related;
  related.add(selected);
  for (const e of edges) {
    if (e.from === selected) related.add(e.to);
    if (e.to === selected) related.add(e.from);
  }
  return related;
}

export function Graph3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const ents = model.entities.filter((e) => e.group !== "stat");
  const pos = useMemo(() => {
    const m = new Map<string, [number, number, number]>();
    for (const n of model.layout) m.set(n.id, layoutTo3(n, 0.11));
    if (m.size === 0) {
      ents.forEach((e, i) => {
        const a = (i / Math.max(ents.length, 1)) * Math.PI * 2;
        m.set(e.id, [Math.cos(a) * 3.2, Math.sin(a) * 1.6, 0]);
      });
    }
    return m;
  }, [model.layout, ents]);
  const related = relatedSet(model.edges, selected);
  return (
    <group>
      {model.edges.map((e) => {
        const a = pos.get(e.from);
        const b = pos.get(e.to);
        if (!a || !b) return null;
        const on = !selected || (related.has(e.from) && related.has(e.to));
        return <Beam key={`${e.from}-${e.to}`} from={a} to={b} color="#e4c36b" radius={0.028} dim={!on} />;
      })}
      {ents.map((ent) => {
        const p = pos.get(ent.id);
        if (!p) return null;
        return <Relic key={ent.id} id={ent.id} color={ACCENT_HEX[ent.accent]} position={p} kind="box" size={[1.9, 1.05, 0.16]} label={ent.label} />;
      })}
    </group>
  );
}

const BUILT_POS: Record<string, [number, number, number]> = {
  "built:rx-worlds": [0, 2.2, 0],
  "built:semantic-compiler": [0, 0.2, 0],
  "built:bcc-engine": [-3.15, 0.05, 1.15],
  "built:auris": [3.15, 0.05, 1.15],
  "built:black-hole-cosmology": [-2.55, -1.95, -0.7],
  "built:death-star": [2.55, -1.95, -0.7],
};

function builtKind(id: string): "orb" | "box" | "icosa" | "octa" {
  if (id.includes("rx-worlds")) return "octa";
  if (id.includes("compiler")) return "icosa";
  if (id.includes("bcc")) return "box";
  if (id.includes("death")) return "icosa";
  return "orb";
}

export function Built3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const ents = model.entities.filter((e) => e.group !== "stat");
  const related = relatedSet(model.edges, selected);
  const packetPts = useMemo(() => {
    const a = BUILT_POS["built:semantic-compiler"];
    const b = BUILT_POS["built:rx-worlds"];
    const c = BUILT_POS["built:auris"];
    return a && b && c ? [a, b, c] : [];
  }, []);
  return (
    <group>
      {model.edges.map((e) => {
        const a = BUILT_POS[e.from];
        const b = BUILT_POS[e.to];
        if (!a || !b) return null;
        const on = !selected || (related.has(e.from) && related.has(e.to));
        return <Beam key={`${e.from}-${e.to}`} from={a} to={b} color="#e4c36b" radius={0.032} dim={!on} />;
      })}
      {ents.map((ent) => {
        const p = BUILT_POS[ent.id] ?? [0, 0, 0];
        const kind = builtKind(ent.id);
        const radius = ent.id.includes("rx-worlds") ? 0.62 : ent.id.includes("compiler") ? 0.55 : 0.42;
        return (
          <Relic
            key={ent.id}
            id={ent.id}
            color={ACCENT_HEX[ent.accent]}
            position={p}
            kind={kind}
            radius={radius}
            size={kind === "box" ? [1.45, 1.05, 1.05] : undefined}
            label={ent.label}
          />
        );
      })}
      {packetPts.length > 1 && <FlowPacket points={packetPts} />}
      <EnergyRing radius={3.6} tube={0.012} color="#e4c36b" opacity={0.22} rotation={[0.7, 0.2, 0]} />
    </group>
  );
}

export function Convergence3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const events = model.entities.filter((e) => e.group === "event" || (!e.group && e.id.includes("convergence") && !e.id.includes("signals")));
  const signals = model.entities.find((e) => e.id.includes("signals"));
  const pos = useMemo(() => {
    const m = new Map<string, [number, number, number]>();
    events.forEach((e, i) => {
      const t = events.length <= 1 ? 0 : i / (events.length - 1);
      const lane = (i % 3) - 1;
      const spread = 2.4 * (1 - t * 0.82);
      m.set(e.id, [(t - 0.5) * 8.4, lane * spread * 0.55, (1 - t) * 2.4 - 0.6]);
    });
    if (signals) m.set(signals.id, [4.4, 0, -0.4]);
    return m;
  }, [events, signals]);
  const related = relatedSet(model.edges, selected);
  const path = useMemo(() => events.map((e) => pos.get(e.id)!).filter(Boolean), [events, pos]);
  return (
    <group>
      {events.map((e, i) => {
        const p = pos.get(e.id);
        if (!p) return null;
        const next = events[i + 1];
        const np = next ? pos.get(next.id) : pos.get(signals?.id ?? "");
        return (
          <group key={e.id}>
            <Relic id={e.id} color={ACCENT_HEX[e.accent]} position={p} radius={0.28} label={e.label} />
            {np && <Beam from={p} to={np} color="#e4c36b" radius={0.02} dim={Boolean(selected && !related.has(e.id))} />}
          </group>
        );
      })}
      {signals && <Relic id={signals.id} color="#e94560" position={pos.get(signals.id) ?? [4.2, 0, 0]} kind="octa" radius={0.38} label={signals.label} />}
      {path.length > 1 && <FlowPacket points={path} />}
      <Label3 position={[-3.8, 2.15, 0]} size={0.18}>
        INDEPENDENT PATHS
      </Label3>
      <Label3 position={[4.2, 1.35, 0]} size={0.18}>
        CONVERGENCE
      </Label3>
    </group>
  );
}

const CANON_POS: Record<string, [number, number, number]> = {
  "canon:wisdom-system": [0, 0.35, 0],
  "canon:knowledge-as-loot": [-2.7, 1.55, 0.4],
  "canon:tokenweave": [-2.85, -1.15, 0.6],
  "canon:command-ascension": [2.75, 1.55, 0.4],
  "canon:world-referee": [2.9, -1.05, 0.5],
  "canon:auris": [0, 2.25, -0.3],
  "canon:bridge-across-the-void": [-1.55, -2.15, -0.2],
  "canon:time-poor-master": [1.55, -2.15, -0.2],
};

function canonKind(id: string): "orb" | "box" | "icosa" | "octa" {
  if (id.includes("wisdom")) return "octa";
  if (id.includes("referee")) return "icosa";
  if (id.includes("tokenweave")) return "box";
  return "orb";
}

export function Canon3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const ents = model.entities.filter((e) => e.group !== "stat");
  const related = relatedSet(model.edges, selected);
  return (
    <group>
      {model.edges.map((e) => {
        const a = CANON_POS[e.from];
        const b = CANON_POS[e.to];
        if (!a || !b) return null;
        const on = !selected || (related.has(e.from) && related.has(e.to));
        return <Beam key={`${e.from}-${e.to}`} from={a} to={b} color="#e4c36b" radius={0.028} dim={!on} />;
      })}
      {ents.map((ent) => {
        const p = CANON_POS[ent.id] ?? [0, 0, 0];
        const kind = canonKind(ent.id);
        return (
          <Relic
            key={ent.id}
            id={ent.id}
            color={ACCENT_HEX[ent.accent]}
            position={p}
            kind={kind}
            radius={ent.id.includes("wisdom") ? 0.62 : 0.4}
            size={kind === "box" ? [1.35, 0.85, 0.85] : undefined}
            label={ent.label}
          />
        );
      })}
      <OrbitMotes color="#4ecdc4" count={40} radius={2.4} speed={0.08} ySpread={0.8} />
    </group>
  );
}

export function Auris3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const pipe = model.entities.filter((e) => e.group !== "stat");
  const stats = model.entities.filter((e) => e.group === "stat");
  const points = pipe.map((_, i) => [0, -2.05 + i * 0.82, 0] as [number, number, number]);
  return (
    <group>
      <Waveform color="#f3efe6" position={[0, -2.55, 0]} />
      {pipe.map((e, i) => (
        <Relic
          key={e.id}
          id={e.id}
          color={ACCENT_HEX[e.accent]}
          position={points[i]!}
          kind={e.id.includes("affect") ? "octa" : e.id.includes("audio") ? "orb" : "box"}
          radius={0.32}
          size={[1.7, 0.62, 0.62]}
          label={e.label}
        />
      ))}
      {points.length > 1 && (
        <>
          <Beam from={points[0]!} to={points[points.length - 1]!} color="#4ecdc4" radius={0.02} />
          <FlowPacket points={points} />
        </>
      )}
      {stats.slice(0, 8).map((s, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <Relic
            key={s.id}
            id={s.id}
            color={ACCENT_HEX[s.accent]}
            position={[Math.cos(a) * 3.35, 0.15, Math.sin(a) * 3.35]}
            radius={0.2}
            label={s.label}
          />
        );
      })}
      <EnergyRing radius={3.35} tube={0.014} color="#9d4edd" opacity={0.28} />
    </group>
  );
}

function RefereeActor({
  finding,
  color,
  start,
  goal,
}: {
  finding: string | null;
  color: string;
  start: [number, number, number];
  goal: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.32) % 1;
    let u = 0.12;
    if (finding === "breach") u = 0.42;
    else if (finding === "unworthy") u = t < 0.48 ? t / 0.48 : Math.max(0, 1 - (t - 0.48) / 0.52);
    else if (finding === "worthy") u = t;
    else u = 0.18 + Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
    ref.current.position.set(start[0] + (goal[0] - start[0]) * u, start[1] + (goal[1] - start[1]) * u, start[2] + (goal[2] - start[2]) * u);
  });
  return (
    <group ref={ref}>
      <GlowOrb color={color} radius={0.26} intensity={1.1} pulse={finding === "breach" ? 0.01 : 2.2} />
    </group>
  );
}

export function Referee3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const finding = selected?.includes("worthy") ? "worthy" : selected?.includes("unworthy") ? "unworthy" : selected?.includes("integrity") ? "breach" : null;
  const findings = model.entities.filter((e) => !e.group || e.group === undefined);
  const start: [number, number, number] = [-1.85, 0.15, 0.7];
  const goal: [number, number, number] = [1.85, 0.2, -0.75];
  const ringColor = finding === "breach" ? "#e94560" : finding === "worthy" ? "#3dcc6d" : "#e4c36b";
  return (
    <group>
      <GlowOrb color={ringColor} radius={0.55} intensity={1.2} pulse={finding === "breach" ? 0.2 : 1.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <circleGeometry args={[3.4, 48]} />
        <meshBasicMaterial color="#16161c" />
      </mesh>
      <EnergyRing radius={3.05} tube={0.04} color={ringColor} opacity={0.85} />
      <EnergyRing radius={1.55} tube={0.03} color="#e4c36b" opacity={0.45} />
      <mesh position={[0, -0.55, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={finding === "breach" ? "#e94560" : "#e4c36b"}
          emissive={finding === "breach" ? "#e94560" : "#e4c36b"}
          emissiveIntensity={finding === "breach" ? 1.2 : 0.7}
        />
      </mesh>
      <Label3 position={[0, 0.95, 0]}>{finding === "breach" ? "FREEZE" : finding === "unworthy" ? "STRIP" : finding === "worthy" ? "PERMIT" : "ZONE"}</Label3>
      <RefereeActor finding={finding} color="#e94560" start={start} goal={goal} />
      <GlowOrb color="#4ecdc4" radius={0.36} position={goal} intensity={1.25} />
      <Label3 position={[goal[0], goal[1] - 0.55, goal[2]]}>OBJECTIVE</Label3>
      <Label3 position={[start[0], -0.55, start[2]]}>ACTOR</Label3>
      <Beam from={start} to={goal} color="#3dcc6d" radius={finding === "worthy" ? 0.07 : 0.024} dim={finding === "unworthy" || finding === "breach"} />
      {finding === "breach" && <VolumetricCloud color="#e94560" radius={1.6} count={90} opacity={0.5} />}
      {findings.map((f, i) => (
        <Relic key={f.id} id={f.id} color={ACCENT_HEX[f.accent]} position={[(i - 1) * 2.4, 1.95, 0]} kind="box" size={[2.1, 0.8, 0.2]} label={f.label} />
      ))}
    </group>
  );
}

export function Cascade3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const layers = model.entities.filter((e) => e.group !== "stat");
  const pts = layers.map((_, i) => [0, 1.7 - i * 1.25, 0] as [number, number, number]);
  return (
    <group>
      {layers.map((e, i) => (
        <Relic key={e.id} id={e.id} color={ACCENT_HEX[e.accent]} position={pts[i]!} kind="box" size={[3.4 - i * 0.35, 0.9, 1.2]} label={e.label} />
      ))}
      {pts[0] && pts[pts.length - 1] && <Beam from={pts[0]} to={pts[pts.length - 1]!} color="#e4c36b" />}
      {pts.length > 1 && <FlowPacket points={pts} />}
    </group>
  );
}

export function Gate3D() {
  const portal = useRef<THREE.Group>(null);
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  useFrame((state) => {
    if (portal.current) portal.current.rotation.z = state.clock.elapsedTime * 0.4;
  });
  const cards = model.entities.filter((e) => e.group !== "stat");
  return (
    <group>
      <group ref={portal}>
        <EnergyRing radius={1.7} tube={0.06} color="#e94560" opacity={0.9} rotation={[0, 0, 0]} />
        <EnergyRing radius={1.4} tube={0.035} color="#00d4ff" opacity={0.65} rotation={[Math.PI / 2, 0.4, 0]} />
      </group>
      <GlowOrb color="#00d4ff" radius={0.7} intensity={0.9} pulse={1.8} />
      <VolumetricCloud color="#00d4ff" radius={1.1} count={90} opacity={0.45} />
      {cards.map((c, i) => (
        <Relic key={c.id} id={c.id} color={ACCENT_HEX[c.accent]} position={[(i - 1) * 2.4, -2.15, 0]} kind="box" size={[2.1, 0.8, 0.14]} label={c.label} />
      ))}
    </group>
  );
}

export function Governor3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const cards = model.entities.filter((e) => e.group !== "stat");
  const colors = ["#3dcc6d", "#e4c36b", "#e94560"];
  return (
    <group>
      {cards.map((c, i) => (
        <Relic key={c.id} id={c.id} color={colors[i] ?? ACCENT_HEX[c.accent]} position={[i * 2.1 - 2.1, 1.15 - i * 0.55, 0]} kind="box" size={[1.85, 0.7, 1.4]} label={c.label} />
      ))}
      <Beam from={[-2.1, 1.15, 0]} to={[2.1, 0.05, 0]} color="#e4c36b" radius={0.02} />
    </group>
  );
}

export function Ear3D() {
  const g = useRef<THREE.Group>(null);
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  useFrame((state) => {
    if (g.current) g.current.rotation.y = state.clock.elapsedTime * 0.18;
  });
  const cards = model.entities.filter((e) => e.group !== "stat");
  const pts: [number, number, number][] = [
    [0, 1.4, 0],
    [1.35, -0.4, 0.4],
    [-1.35, -0.4, -0.4],
  ];
  return (
    <group ref={g}>
      {cards.map((c, i) => (
        <Relic key={c.id} id={c.id} color={ACCENT_HEX[c.accent]} position={pts[i] ?? [0, 0, 0]} radius={0.5} label={c.label} />
      ))}
      {pts[0] && pts[1] && <Beam from={pts[0]} to={pts[1]} color="#4ecdc4" />}
      {pts[1] && pts[2] && <Beam from={pts[1]} to={pts[2]} color="#e4c36b" />}
      {pts[2] && pts[0] && <Beam from={pts[2]} to={pts[0]} color="#9d4edd" />}
      {pts.length > 1 && <FlowPacket points={[...pts, pts[0]!]} />}
      <EnergyRing radius={1.8} tube={0.02} color="#9d4edd" opacity={0.35} rotation={[0.7, 0.2, 0]} />
    </group>
  );
}
