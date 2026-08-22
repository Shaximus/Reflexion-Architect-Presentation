import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ARC_CURTIS_ID, ARC_LANES, ARC_THRESHOLD_ID, laneOf } from "@/presentation/engine/arc-lanes";
import { ACCENT_HEX } from "@/presentation/engine/types";
import { useDeck } from "@/presentation/engine/store";
import { Beam, EnergyRing, FlowPacket, GlowOrb, Label3 } from "../primitives";

const ADD = THREE.AdditiveBlending;

function Pick({
  id,
  position,
  children,
}: {
  id: string;
  position: [number, number, number];
  children: React.ReactNode;
}) {
  const selected = useDeck((s) => s.selectedEntityId);
  const select = useDeck((s) => s.selectEntity);
  const setLookAt = useDeck((s) => s.setLookAt);
  const active = selected === id;
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        const next = active ? null : id;
        select(next);
        setLookAt(next ? position : null);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <group scale={active ? 1.08 : 1}>{children}</group>
    </group>
  );
}

function dimOf(selected: string | null, owner: string) {
  const lane = laneOf(selected);
  if (!selected || lane === "core" || lane === "axis") return false;
  if (lane && typeof lane === "object") {
    return !(owner === lane.heroId || owner === lane.key);
  }
  return false;
}

function stagePos(laneIndex: number, stageIndex: number, count: number): [number, number, number] {
  const xs = [-2.75, -0.92, 0.92, 2.75];
  const x = xs[laneIndex] ?? 0;
  const t = count <= 1 ? 0 : stageIndex / (count - 1);
  const z = 2.85 - t * 2.55;
  const y = 1.15 - t * 1.35;
  return [x, y, z];
}

function CurtisForm({ active, dim }: { active: boolean; dim: boolean }) {
  const inner = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (inner.current) inner.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });
  const opacity = dim ? 0.18 : active ? 1 : 0.85;
  return (
    <group>
      <group ref={inner}>
        <mesh position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#e4c36b"
            emissive="#e4c36b"
            emissiveIntensity={active ? 0.9 : 0.4}
            wireframe
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <capsuleGeometry args={[0.16, 0.55, 6, 12]} />
          <meshStandardMaterial
            color="#f3efe6"
            emissive="#e94560"
            emissiveIntensity={active ? 0.45 : 0.18}
            wireframe
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[-0.28, 0.48, 0]} rotation={[0, 0, 0.55]}>
          <capsuleGeometry args={[0.05, 0.42, 4, 8]} />
          <meshBasicMaterial color="#e4c36b" transparent opacity={opacity * 0.8} wireframe />
        </mesh>
        <mesh position={[0.28, 0.48, 0]} rotation={[0, 0, -0.55]}>
          <capsuleGeometry args={[0.05, 0.42, 4, 8]} />
          <meshBasicMaterial color="#e4c36b" transparent opacity={opacity * 0.8} wireframe />
        </mesh>
        <mesh position={[-0.12, -0.18, 0]} rotation={[0, 0, 0.12]}>
          <capsuleGeometry args={[0.055, 0.48, 4, 8]} />
          <meshBasicMaterial color="#9a958c" transparent opacity={opacity * 0.7} wireframe />
        </mesh>
        <mesh position={[0.12, -0.18, 0]} rotation={[0, 0, -0.12]}>
          <capsuleGeometry args={[0.055, 0.48, 4, 8]} />
          <meshBasicMaterial color="#9a958c" transparent opacity={opacity * 0.7} wireframe />
        </mesh>
        {[
          [-0.16, 0.55, 0.12, "#00d4ff"],
          [0.16, 0.62, 0.1, "#9d4edd"],
          [-0.08, 0.28, -0.12, "#e94560"],
          [0.1, 0.34, -0.14, "#3dcc6d"],
        ].map(([x, y, z, c], i) => (
          <mesh key={i} position={[x as number, y as number, z as number]}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color={c as string} transparent opacity={dim ? 0.15 : 0.9} />
          </mesh>
        ))}
      </group>
      <EnergyRing radius={0.72} tube={0.012} color="#e4c36b" opacity={dim ? 0.12 : 0.45} />
    </group>
  );
}

function NeoStage({
  index,
  color,
  dim,
  active,
}: {
  index: number;
  color: string;
  dim: boolean;
  active: boolean;
}) {
  const op = dim ? 0.12 : active ? 0.95 : 0.65;
  if (index === 0) {
    return (
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={op} />
      </mesh>
    );
  }
  if (index === 1) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[0.58, 0.58, 0.58]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={op} />
        </mesh>
        <mesh position={[0.42, 0.05, 0.1]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={active ? 1 : 0.4} transparent opacity={op} />
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={op} />
      </mesh>
      <mesh>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={op * 0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function GojoStage({
  index,
  color,
  dim,
  active,
}: {
  index: number;
  color: string;
  dim: boolean;
  active: boolean;
}) {
  const op = dim ? 0.1 : 1;
  if (index === 0) {
    return <GlowOrb color={color} radius={0.16} intensity={active ? 1.4 : 0.8} pulse={2.4} />;
  }
  if (index === 1) {
    return (
      <group>
        <GlowOrb color={color} radius={0.14} intensity={1} pulse={1.6} />
        <EnergyRing radius={0.42} tube={0.018} color={color} opacity={dim ? 0.12 : 0.75} />
        <EnergyRing radius={0.62} tube={0.012} color={color} opacity={dim ? 0.08 : 0.4} rotation={[0.7, 0.2, 0]} />
      </group>
    );
  }
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={dim ? 0.05 : active ? 0.22 : 0.12}
          roughness={0.12}
          metalness={0.15}
          emissive={color}
          emissiveIntensity={active ? 0.55 : 0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={op * 0.55} />
      </mesh>
    </group>
  );
}

function VegetaStage({
  index,
  color,
  dim,
  active,
}: {
  index: number;
  color: string;
  dim: boolean;
  active: boolean;
}) {
  const pulse = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!pulse.current) return;
    if (index === 4 && active) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 5.2) * 0.07;
      pulse.current.scale.setScalar(s);
    } else {
      pulse.current.scale.setScalar(1);
    }
  });
  const op = dim ? 0.16 : 1;
  const core = (
    <mesh>
      <tetrahedronGeometry args={[0.26, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={index >= 5 ? "#e4c36b" : color}
        emissiveIntensity={active ? 1.05 : index >= 2 ? 0.55 : 0.32}
        roughness={0.22}
        metalness={0.42}
        transparent
        opacity={op}
      />
    </mesh>
  );
  const shards: [number, number, number][] = [
    [-0.24, 0.2, 0.1],
    [0.26, 0.06, -0.12],
    [0.04, -0.24, 0.14],
  ];
  const held: [number, number, number][] = [
    [-0.18, 0.14, 0.08],
    [0.18, -0.12, 0.08],
  ];
  const cover: [number, number, number][] = [
    [-0.42, -0.08, 0.12],
    [0.4, -0.06, -0.1],
    [0.02, 0.4, 0.06],
  ];
  return (
    <group ref={pulse}>
      {core}
      {index === 0 && (
        <mesh>
          <boxGeometry args={[0.64, 0.64, 0.64]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={op * 0.72} />
        </mesh>
      )}
      {index === 1 &&
        shards.map((p, i) => (
          <mesh key={i} position={p} rotation={[0.5 * i, 0.25, 0.35 * i]}>
            <tetrahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} transparent opacity={op * 0.85} />
          </mesh>
        ))}
      {index >= 2 && (
        <mesh>
          <tetrahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#e4c36b" emissive="#e4c36b" emissiveIntensity={active ? 1.35 : 0.75} transparent opacity={op} />
        </mesh>
      )}
      {index === 2 &&
        held.map((p, i) => (
          <mesh key={i} position={p} rotation={[0.2, 0.4 * i, 0]}>
            <tetrahedronGeometry args={[0.09, 0]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={op * 0.7} />
          </mesh>
        ))}
      {index >= 3 &&
        cover.map((p, i) => (
          <group key={i}>
            <mesh position={p}>
              <tetrahedronGeometry args={[0.09, 0]} />
              <meshStandardMaterial
                color={i === 2 ? "#f3efe6" : "#e4c36b"}
                emissive={i === 2 ? "#f3efe6" : "#e4c36b"}
                emissiveIntensity={0.7}
                transparent
                opacity={dim ? 0.12 : 0.9}
              />
            </mesh>
            <Beam from={[0, 0, 0]} to={p} color={color} radius={0.012} dim={dim} />
          </group>
        ))}
      {index === 4 &&
        [
          [0.55, 0.35, 0.1],
          [-0.5, 0.28, -0.12],
          [0.12, -0.52, 0.18],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <tetrahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial color={color} transparent opacity={dim ? 0.08 : 0.45} />
          </mesh>
        ))}
      {index >= 5 && (
        <mesh>
          <octahedronGeometry args={[0.48, 0]} />
          <meshBasicMaterial color="#e4c36b" wireframe transparent opacity={dim ? 0.1 : 0.45} />
        </mesh>
      )}
    </group>
  );
}

function JinwooStage({
  index,
  color,
  dim,
  active,
}: {
  index: number;
  color: string;
  dim: boolean;
  active: boolean;
}) {
  const army = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!army.current) return;
    const risen = index >= 2 ? 0 : -0.35;
    army.current.position.y = THREE.MathUtils.damp(army.current.position.y, risen, 5, Math.min(delta, 0.1));
    army.current.rotation.y += Math.min(delta, 0.1) * 0.35;
    army.current.visible = index >= 2;
  });
  return (
    <group>
      {index === 0 && <GlowOrb color={color} radius={0.2} intensity={active ? 1.2 : 0.7} />}
      {index >= 1 && (
        <>
          <GlowOrb color={color} radius={index >= 4 ? 0.28 : 0.18} intensity={active ? 1.25 : 0.75} />
          <EnergyRing radius={0.4} tube={0.014} color={color} opacity={dim ? 0.1 : 0.6} />
        </>
      )}
      <group ref={army} position={[0, -0.35, 0]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          const r = index >= 4 ? 0.72 : 0.55;
          return (
            <mesh key={i} position={[Math.cos(a) * r, -0.05, Math.sin(a) * r]}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshBasicMaterial color={color} transparent opacity={dim ? 0.08 : 0.75} blending={ADD} depthWrite={false} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function Arcs3D() {
  const selected = useDeck((s) => s.selectedEntityId);
  const present = useDeck((s) => s.mode === "present");
  const setLookAt = useDeck((s) => s.setLookAt);
  const laneSel = laneOf(selected);

  useEffect(() => {
    if (!selected) {
      setLookAt(null);
      return;
    }
    if (selected === ARC_CURTIS_ID) {
      setLookAt([0, 0.2, -1.05]);
      return;
    }
    if (selected === ARC_THRESHOLD_ID) {
      setLookAt([0, 0.35, 0.4]);
      return;
    }
    if (typeof laneSel === "object" && laneSel) {
      const li = ARC_LANES.findIndex((l) => l.key === laneSel.key);
      const mid = Math.floor((laneSel.stages.length - 1) / 2);
      setLookAt(stagePos(li, selected === laneSel.heroId ? mid : laneSel.stages.findIndex((s) => s.id === selected), laneSel.stages.length));
    }
  }, [selected, laneSel, setLookAt]);

  const packets = useMemo(() => {
    return ARC_LANES.map((lane, li) => {
      const pts = lane.stages.map((_, si) => stagePos(li, si, lane.stages.length));
      pts.push([0, 0.15, -1.15]);
      return { id: lane.heroId, color: ACCENT_HEX[lane.accent], pts, dim: dimOf(selected, lane.heroId) };
    });
  }, [selected]);

  return (
    <group>
      <Pick id={ARC_THRESHOLD_ID} position={[0, 0.15, 0.55]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9.4, 0.28]} />
          <meshBasicMaterial color="#e4c36b" transparent opacity={selected === ARC_THRESHOLD_ID ? 0.6 : 0.32} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <boxGeometry args={[9.4, 1.6, 0.035]} />
          <meshBasicMaterial color="#e4c36b" transparent opacity={selected === ARC_THRESHOLD_ID ? 0.16 : 0.07} side={THREE.DoubleSide} />
        </mesh>
        <Label3 position={[3.6, 0.85, 0]}>2022</Label3>
      </Pick>
      <Label3 position={[0, 2.05, 3.15]}>MEDIA EXISTS</Label3>
      <Label3 position={[0, -1.05, -1.45]}>LIVED EXPERIENCE</Label3>

      <Pick id={ARC_CURTIS_ID} position={[0, 0.05, -1.2]}>
        <CurtisForm active={selected === ARC_CURTIS_ID || laneSel === "core"} dim={false} />
        <Label3 position={[0, -0.85, 0]}>CURTIS</Label3>
      </Pick>

      {ARC_LANES.map((lane, li) => {
        const color = ACCENT_HEX[lane.accent];
        const dim = dimOf(selected, lane.heroId);
        const positions = lane.stages.map((_, si) => stagePos(li, si, lane.stages.length));
        const last = positions[positions.length - 1]!;
        return (
          <group key={lane.heroId}>
            {lane.stages.map((st, si) => {
              const p = positions[si]!;
              const active = selected === st.id || selected === lane.heroId;
              const showLabel = !present || active || selected === lane.heroId;
              return (
                <Pick key={st.id} id={st.id} position={p}>
                  {lane.key === "neo" && <NeoStage index={si} color={color} dim={dim} active={active} />}
                  {lane.key === "gojo" && <GojoStage index={si} color={color} dim={dim} active={active} />}
                  {lane.key === "vegeta" && <VegetaStage index={si} color={color} dim={dim} active={active} />}
                  {lane.key === "jinwoo" && <JinwooStage index={si} color={color} dim={dim} active={active} />}
                  {showLabel && <Label3 position={[0, -0.48, 0]}>{st.label}</Label3>}
                </Pick>
              );
            })}
            {positions.slice(0, -1).map((a, i) => (
              <Beam key={`${lane.heroId}-b${i}`} from={a} to={positions[i + 1]!} color={color} radius={0.018} dim={dim} />
            ))}
            <Beam from={last} to={[0, 0.15, -1.15]} color={color} radius={0.016} dim={dim} />
            {!dim && laneSel && typeof laneSel === "object" && laneSel.heroId === lane.heroId && (
              <FlowPacket points={packets[li]!.pts} />
            )}
            <Pick id={lane.heroId} position={[positions[0]![0], positions[0]![1] + 0.7, positions[0]![2]]}>
              <mesh>
                <sphereGeometry args={[0.16, 14, 14]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={selected === lane.heroId ? 1 : 0.4}
                  transparent
                  opacity={dim ? 0.15 : 0.95}
                />
              </mesh>
              <Label3 position={[0, 0.32, 0]}>{lane.tag}</Label3>
            </Pick>
          </group>
        );
      })}
    </group>
  );
}
