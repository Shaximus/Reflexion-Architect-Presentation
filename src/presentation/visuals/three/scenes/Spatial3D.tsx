import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ACCENT_HEX } from "@/presentation/engine/types";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Beam, EnergyRing, GlowOrb, Label3, OrbitMotes, Relic, Rotator, VolumetricCloud } from "../primitives";

export function Title3D() {
  const rings = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rings.current) {
      rings.current.rotation.z = t * 0.1;
      rings.current.rotation.y = Math.sin(t * 0.16) * 0.24;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.3) * 0.05;
      core.current.scale.setScalar(s);
    }
  });
  return (
    <group>
      <group ref={core}>
        <GlowOrb color="#e94560" radius={1.05} intensity={1.25} pulse={1.6} />
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#e4c36b" emissive="#e4c36b" emissiveIntensity={1.4} metalness={0.4} roughness={0.15} />
        </mesh>
      </group>
      <group ref={rings}>
        <EnergyRing radius={2.0} tube={0.04} color="#e4c36b" opacity={0.85} rotation={[Math.PI / 2.15, 0, 0]} />
        <EnergyRing radius={2.9} tube={0.034} color="#4ecdc4" opacity={0.65} rotation={[Math.PI / 2.5, 0.4, 0.2]} />
        <EnergyRing radius={3.9} tube={0.028} color="#e94560" opacity={0.5} rotation={[1.05, 0.2, 0.6]} />
        <EnergyRing radius={5.1} tube={0.022} color="#e4c36b" opacity={0.32} rotation={[1.35, -0.3, 0.1]} />
      </group>
      <OrbitMotes color="#e4c36b" count={90} radius={3.3} speed={0.1} />
    </group>
  );
}

export function Nested3D() {
  const index = useDeck((s) => s.index);
  const exploded = useDeck((s) => s.exploded);
  const selected = useDeck((s) => s.selectedEntityId);
  const select = useDeck((s) => s.selectEntity);
  const setLookAt = useDeck((s) => s.setLookAt);
  const model = getModel(index);
  const shells = useMemo(() => {
    const find = (k: string) => model.entities.find((e) => e.id.includes(k));
    return [
      { ent: find("layer-11"), r: 4.55, color: "#e94560", label: "L11 SUBSTRATE" },
      { ent: find("layer-10"), r: 3.45, color: "#e4c36b", label: "L10 META" },
      { ent: find("l4"), r: 2.45, color: "#4ecdc4", label: "L4 TIME" },
      { ent: find("l3"), r: 1.55, color: "#00d4ff", label: "L3 SPACE" },
      { ent: find("you-are-here"), r: 0.62, color: "#f3efe6", label: "GUEST" },
    ].filter((s) => s.ent);
  }, [model]);

  const pick = (point: THREE.Vector3) => {
    const d = point.distanceTo(new THREE.Vector3(0, 0, 0));
    return [...shells].reverse().find((s) => d <= s.r + 0.12) ?? shells[0];
  };

  return (
    <group
      onClick={(e) => {
        if (exploded) return;
        e.stopPropagation();
        const inner = pick(e.point);
        if (!inner?.ent) return;
        const next = selected === inner.ent.id ? null : inner.ent.id;
        select(next);
        setLookAt(next ? [0, 0, 0] : null);
      }}
    >
      {shells.map((s, i) => {
        const id = s.ent!.id;
        const active = !selected || selected === id;
        const isolated = selected === id;
        const x = exploded ? (i - 2) * 2.45 : 0;
        const opacity = exploded ? (isolated || !selected ? 0.16 : 0.04) : isolated ? 0.22 : active ? 0.09 : 0.025;
        return (
          <group
            key={id}
            position={[x, 0, 0]}
            onClick={(e) => {
              if (!exploded) return;
              e.stopPropagation();
              const next = selected === id ? null : id;
              select(next);
              setLookAt(next ? [x, 0, 0] : null);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            <mesh>
              <sphereGeometry args={[s.r, 36, 28]} />
              <meshPhysicalMaterial
                color={s.color}
                transparent
                opacity={opacity}
                roughness={0.08}
                metalness={0.12}
                transmission={isolated ? 0.35 : 0.55}
                thickness={0.4}
                emissive={s.color}
                emissiveIntensity={isolated ? 0.55 : 0.14}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[s.r, 24, 16]} />
              <meshBasicMaterial color={s.color} wireframe transparent opacity={active ? 0.38 : 0.08} />
            </mesh>
            {(exploded || isolated) && <Label3 position={[0, s.r + 0.28, 0]}>{s.ent!.label}</Label3>}
          </group>
        );
      })}
      {!exploded && <GlowOrb color="#f3efe6" radius={0.26} intensity={1.45} pulse={2} />}
    </group>
  );
}

export function Fusion3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const compare = useDeck((s) => s.compareMode);
  const model = getModel(index);
  const sky = model.entities.find((e) => e.id.includes("instinct"));
  const earth = model.entities.find((e) => e.id.includes("ego"));
  const vegito = model.entities.find((e) => e.id.includes("vegito"));
  const game = model.entities.find((e) => e.id.includes("earth-as-the-game") || e.id.includes("arena"));
  const rings = useRef<THREE.Group>(null);
  const skyG = useRef<THREE.Group>(null);
  const earthG = useRef<THREE.Group>(null);

  const isolateSky = compare === "a" || selected?.includes("instinct");
  const isolateEgo = compare === "b" || selected?.includes("ego");
  const showDiff = compare === "diff";
  const joined = compare === "ab" && !isolateSky && !isolateEgo;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.1);
    if (rings.current) rings.current.rotation.y = t * 0.18;
    const approach = showDiff ? 0.72 : joined || selected?.includes("vegito") ? 1 : isolateSky || isolateEgo ? 0.15 : 0.55;
    const skyY = THREE.MathUtils.lerp(2.35, 0.95, approach);
    const earthY = THREE.MathUtils.lerp(-2.15, -0.75, approach);
    if (skyG.current) skyG.current.position.y = THREE.MathUtils.damp(skyG.current.position.y, skyY, 4, d);
    if (earthG.current) earthG.current.position.y = THREE.MathUtils.damp(earthG.current.position.y, earthY, 4, d);
  });

  const skyDim = isolateEgo || (showDiff && !selected?.includes("instinct"));
  const earthDim = isolateSky || (showDiff && !selected?.includes("ego"));

  return (
    <group>
      <group ref={skyG} position={[0, 2.2, 0]}>
        <VolumetricCloud color="#4ecdc4" radius={1.85} count={260} dim={skyDim} opacity={0.85} speed={0.07} />
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#4ecdc4"
            transparent
            opacity={skyDim ? 0.04 : 0.14}
            emissive="#4ecdc4"
            emissiveIntensity={skyDim ? 0.08 : 0.4}
            roughness={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {sky && <Relic id={sky.id} color="#4ecdc4" position={[0, 0, 0]} radius={0.42} label="SKY · INSTINCT" />}
      </group>
      <group ref={earthG} position={[0, -2.0, 0]}>
        <VolumetricCloud color="#e94560" radius={2.05} count={280} dim={earthDim} opacity={0.8} speed={-0.05} />
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshPhysicalMaterial
            color="#e94560"
            transparent
            opacity={earthDim ? 0.04 : 0.16}
            emissive="#e94560"
            emissiveIntensity={earthDim ? 0.08 : 0.45}
            roughness={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {earth && <Relic id={earth.id} color="#e94560" position={[0, 0, 0]} radius={0.42} label="EARTH · EGO" />}
      </group>
      {vegito && (compare === "ab" || compare === "diff" || selected?.includes("vegito")) && (
        <Relic id={vegito.id} color="#e4c36b" position={[0, 0.15, 0]} kind="octa" radius={showDiff ? 0.38 : 0.55} label={showDiff ? "DIFFERENCE" : "VEGITO"} />
      )}
      {game && <Relic id={game.id} color="#9d4edd" position={[2.85, -2.15, 0.4]} radius={0.3} label="THE GAME" />}
      <Beam from={[0, 1.4, 0]} to={[0, 0.15, 0]} color="#4ecdc4" dim={earthDim} />
      <Beam from={[0, -1.3, 0]} to={[0, 0.15, 0]} color="#e94560" dim={skyDim} />
      <group ref={rings}>
        <EnergyRing radius={1.55} tube={0.03} color={showDiff ? "#9d4edd" : "#e4c36b"} opacity={showDiff ? 0.85 : 0.5} />
        <EnergyRing radius={2.25} tube={0.02} color="#9d4edd" opacity={0.32} rotation={[1.1, 0.4, 0]} />
      </group>
      {!showDiff && <OrbitMotes color="#e4c36b" count={48} radius={2.05} speed={0.14} />}
    </group>
  );
}

export function Earth3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const globe = useRef<THREE.Group>(null);
  const arena = model.entities.find((e) => e.id.includes("arena"));
  const ego = model.entities.find((e) => e.id.includes("ego"));
  const instinct = model.entities.find((e) => e.id.includes("instinct"));
  const bridge = model.entities.find((e) => e.id.includes("bridge"));
  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += Math.min(delta, 0.1) * 0.12;
  });
  return (
    <group>
      {instinct && <Relic id={instinct.id} color="#4ecdc4" position={[0, 2.35, 0]} radius={0.5} label="SKY · ONENESS" />}
      <VolumetricCloud color="#4ecdc4" position={[0, 2.35, 0]} radius={0.95} count={90} opacity={0.55} />
      <group ref={globe} position={[0, 0, 0]}>
        {arena && <Relic id={arena.id} color="#4ecdc4" position={[0, 0, 0]} radius={1.28} label="THE ARENA" />}
        <mesh>
          <sphereGeometry args={[1.32, 28, 28]} />
          <meshBasicMaterial color="#4ecdc4" wireframe transparent opacity={0.28} />
        </mesh>
        <EnergyRing radius={1.72} tube={0.018} color="#e4c36b" opacity={0.4} />
        <EnergyRing radius={1.95} tube={0.012} color="#e94560" opacity={0.22} rotation={[0.4, 0.2, 0]} />
      </group>
      {ego && <Relic id={ego.id} color="#e94560" position={[0, -2.15, 0]} radius={0.4} label="WILL · GUEST" />}
      <VolumetricCloud color="#e94560" position={[0, -2.15, 0]} radius={0.7} count={70} opacity={0.5} />
      {bridge && <Relic id={bridge.id} color="#9d4edd" position={[2.55, 0.1, 0]} kind="octa" radius={0.32} label="BRIDGE" />}
      <Beam from={[0, 2.35, 0]} to={[0, 1.28, 0]} color="#4ecdc4" />
      <Beam from={[0, -1.28, 0]} to={[0, -2.15, 0]} color="#e94560" />
    </group>
  );
}

export function Planets3D() {
  const index = useDeck((s) => s.index);
  const selected = useDeck((s) => s.selectedEntityId);
  const model = getModel(index);
  const worlds = model.entities.filter((e) => e.group !== "stat" && !e.id.includes("solar"));
  const sun = model.entities.find((e) => e.id.includes("solar"));
  const related = new Set<string>();
  if (selected) {
    related.add(selected);
    for (const e of model.edges) {
      if (e.from === selected) related.add(e.to);
      if (e.to === selected) related.add(e.from);
    }
  }
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += Math.min(delta, 0.1) * 0.04;
  });
  return (
    <group>
      <group ref={orbit}>
        {worlds.map((p, i) => {
          const a = (i / Math.max(worlds.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const r = 2.85;
          const pos: [number, number, number] = [Math.cos(a) * r, Math.sin(a) * 0.35, Math.sin(a) * r * 0.55];
          return (
            <group key={p.id}>
              <Relic
                id={p.id}
                color={ACCENT_HEX[p.accent]}
                position={pos}
                radius={0.72}
                label={p.label.replace(/^Earthlike \d+ — /, "")}
              />
              <Beam from={[0, 0, 0]} to={pos} color="#e4c36b" radius={0.022} dim={Boolean(selected && !related.has(p.id))} />
            </group>
          );
        })}
      </group>
      {sun ? (
        <Relic id={sun.id} color="#e4c36b" position={[0, 0, 0]} kind="octa" radius={0.58} label="NEXT ORBIT" />
      ) : (
        <GlowOrb color="#e4c36b" radius={0.5} intensity={1.4} />
      )}
      <GlowOrb color="#e4c36b" radius={0.22} intensity={1.6} />
      <EnergyRing radius={2.85} tube={0.03} color="#e4c36b" opacity={0.55} rotation={[0.55, 0, 0.2]} />
      <EnergyRing radius={1.65} tube={0.018} color="#4ecdc4" opacity={0.32} rotation={[1.2, 0.3, 0]} />
      <OrbitMotes color="#e4c36b" count={60} radius={2.9} speed={0.06} ySpread={0.4} />
    </group>
  );
}

export function Lod3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const order = ["dormant", "scripted", "alert", "engaged", "coordinated", "apex"];
  const tiers = order.map((k) => model.entities.find((e) => e.id.includes(`:${k}`) || e.id.endsWith(k))).filter(Boolean);
  return (
    <group>
      {tiers.map((t, i) => {
        const w = 4.35 - i * 0.58;
        const y = -2.05 + i * 0.74;
        return (
          <group key={t!.id} position={[0, y, 0]}>
            <Relic id={t!.id} color={ACCENT_HEX[t!.accent]} position={[0, 0, 0]} kind="box" size={[w, 0.5, w * 0.48]} label={t!.label} />
          </group>
        );
      })}
    </group>
  );
}

export function Toolkit3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const rows = model.entities.filter((e) => e.group === "row");
  return (
    <group>
      <Rotator speed={0.05}>
        {rows.map((r, i) => {
          const a = (i / Math.max(rows.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const rad = 3.55;
          const pos: [number, number, number] = [Math.cos(a) * rad, Math.sin(a) * rad * 0.38, Math.sin(a) * 0.4];
          return (
            <Relic
              key={r.id}
              id={r.id}
              color={ACCENT_HEX[r.accent]}
              position={pos}
              radius={0.26 + i * 0.018}
              label={r.label}
            />
          );
        })}
      </Rotator>
      <GlowOrb color="#f3efe6" radius={0.42} intensity={1.1} />
      <EnergyRing radius={3.55} tube={0.018} color="#e4c36b" opacity={0.3} rotation={[0.4, 0, 0.2]} />
    </group>
  );
}
