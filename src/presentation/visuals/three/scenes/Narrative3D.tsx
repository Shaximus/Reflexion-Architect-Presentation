import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ACCENT_HEX } from "@/presentation/engine/types";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Beam, EnergyRing, GlowOrb, Label3, OrbitMotes, Relic } from "../primitives";

export function Event3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const cards = model.entities.filter((e) => e.group !== "stat");
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 9.4, 8]} />
        <meshBasicMaterial color="#3a3a42" />
      </mesh>
      {cards.map((c, i) => {
        const x = (i - (cards.length - 1) / 2) * 2.05;
        return <Relic key={c.id} id={c.id} color={ACCENT_HEX[c.accent]} position={[x, 0.15, 0]} radius={0.42} label={c.label} />;
      })}
    </group>
  );
}

export function Character3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const stats = [
    { k: "STR", v: 0.8, c: "#e94560" },
    { k: "INT", v: 0.99, c: "#4ecdc4" },
    { k: "WIS", v: 0.99, c: "#6ea8fe" },
    { k: "DEX", v: 0.9, c: "#3dcc6d" },
    { k: "CON", v: 0.6, c: "#e4c36b" },
    { k: "CHA", v: 0.92, c: "#e4c36b" },
  ];
  const cards = model.entities.filter((e) => e.group !== "stat");
  const person = cards[0];
  return (
    <group>
      {stats.map((s, i) => {
        const x = (i - 2.5) * 1.05;
        const h = s.v * 2.6;
        return (
          <group key={s.k} position={[x, -0.6, 0]}>
            <mesh position={[0, h / 2, 0]}>
              <boxGeometry args={[0.38, h, 0.38]} />
              <meshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={0.65} />
            </mesh>
            <Label3 position={[0, -0.35, 0]}>{s.k}</Label3>
          </group>
        );
      })}
      {person && <Relic id={person.id} color="#e94560" position={[0, 2.15, 0]} kind="box" size={[4.6, 0.9, 0.14]} label={person.label} />}
      {cards[1] && <Relic id={cards[1].id} color="#4ecdc4" position={[3.6, 0.4, 0]} kind="box" size={[2.2, 1.6, 0.14]} label="CLASS" />}
    </group>
  );
}

export function Sunday3D() {
  const trio = useRef<THREE.Group>(null);
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  useFrame((state) => {
    if (trio.current) trio.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.08;
  });
  const suns = model.entities.filter((e) => e.group === "stat");
  const phases = model.entities.filter((e) => e.group !== "stat");
  return (
    <group ref={trio}>
      {(suns.length ? suns : phases.slice(0, 3)).map((s, i) => {
        const x = (i - 1) * 3.2;
        return (
          <group key={s.id} position={[x, 0.55, 0]}>
            <Relic id={s.id} color={ACCENT_HEX[s.accent]} position={[0, 0, 0]} radius={0.95} label={s.label} />
            <EnergyRing radius={1.35} tube={0.022} color={ACCENT_HEX[s.accent]} opacity={0.4} rotation={[Math.PI / 2.3, 0.2, 0]} />
          </group>
        );
      })}
      <Beam from={[-3.2, 0.55, 0]} to={[0, 0.55, 0]} color="#e4c36b" />
      <Beam from={[0, 0.55, 0]} to={[3.2, 0.55, 0]} color="#e94560" />
      {phases.slice(0, 5).map((p, i) => (
        <Relic key={p.id} id={p.id} color={ACCENT_HEX[p.accent]} position={[(i - 2) * 1.7, -1.85, 0]} kind="box" size={[1.5, 0.7, 0.12]} label={p.label} />
      ))}
    </group>
  );
}

export function Genesis3D() {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const cards = model.entities.filter((e) => e.group !== "stat");
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (left.current) left.current.position.y = Math.sin(t * 1.1) * 0.16;
    if (right.current) right.current.position.y = Math.cos(t * 0.95) * 0.16;
  });
  return (
    <group>
      <group ref={left} position={[-2.4, 0.3, 0]}>
        {cards[0] && <Relic id={cards[0].id} color="#4ecdc4" position={[0, 0, 0]} radius={0.95} label="CLAUDE" />}
      </group>
      <group ref={right} position={[2.4, 0.3, 0]}>
        {cards[1] && <Relic id={cards[1].id} color="#e4c36b" position={[0, 0, 0]} radius={0.95} label="GPT" />}
      </group>
      {cards[2] && <Relic id={cards[2].id} color="#e94560" position={[0, 0.3, 0]} kind="octa" radius={0.38} label="THE FOLD" />}
      <EnergyRing radius={3.3} tube={0.022} color="#e94560" opacity={0.45} />
      <OrbitMotes color="#e4c36b" count={55} radius={3.3} speed={0.14} />
    </group>
  );
}

export function Close3D() {
  const rings = useRef<THREE.Group>(null);
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const cards = model.entities.filter((e) => e.group !== "stat");
  useFrame((state) => {
    if (rings.current) rings.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <group>
      <GlowOrb color="#e94560" radius={0.85} intensity={1.2} />
      <group ref={rings}>
        <EnergyRing radius={1.8} color="#e4c36b" opacity={0.7} />
        <EnergyRing radius={2.6} color="#4ecdc4" opacity={0.4} rotation={[1.1, 0.3, 0]} />
      </group>
      {cards.map((c, i) => (
        <Relic key={c.id} id={c.id} color={ACCENT_HEX[c.accent]} position={[(i - 1) * 2.6, -2.0, 0]} kind="box" size={[2.2, 0.85, 0.14]} label={c.label} />
      ))}
    </group>
  );
}

export function Ask3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const cards = model.entities.filter((e) => e.group !== "stat");
  return (
    <group>
      {cards.map((c, i) => {
        const x = (i % 2) * 3.1 - 1.55;
        const y = i < 2 ? 1.15 : -1.15;
        return <Relic key={c.id} id={c.id} color={ACCENT_HEX[c.accent]} position={[x, y, 0]} kind="box" size={[2.7, 1.7, 0.16]} label={c.label} />;
      })}
    </group>
  );
}

export function Evidence3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const rows = model.entities.filter((e) => e.group === "row");
  return (
    <group>
      {rows.map((r, i) => {
        const verdict = r.summary[1] ?? "";
        const color = verdict === "VERIFIED" ? "#3dcc6d" : verdict === "TESTABLE" ? "#e4c36b" : "#e94560";
        return <Relic key={r.id} id={r.id} color={color} position={[0, 2.4 - i * 0.4, 0]} kind="box" size={[7.0, 0.32, 0.12]} label={r.label} />;
      })}
    </group>
  );
}

export function Mapping3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const rows = model.entities.filter((e) => e.group === "row").slice(0, 8);
  return (
    <group>
      <Label3 position={[-2.2, 2.4, 0]}>GAME</Label3>
      <Label3 position={[2.2, 2.4, 0]}>LIFE</Label3>
      {rows.map((r, i) => (
        <group key={r.id} position={[0, 1.85 - i * 0.5, 0]}>
          <Relic id={r.id} color="#e94560" position={[-2.2, 0, 0]} kind="box" size={[3.8, 0.38, 0.1]} label={r.label} />
          <mesh position={[2.2, 0, 0]}>
            <boxGeometry args={[3.8, 0.38, 0.1]} />
            <meshStandardMaterial color="#16161c" emissive="#4ecdc4" emissiveIntensity={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
