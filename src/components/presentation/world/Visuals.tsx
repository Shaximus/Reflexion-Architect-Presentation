import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useDeck } from "@/lib/presentation/store";
import type { Scene } from "@/lib/presentation/types";
import { ACCENT_HEX } from "@/lib/presentation/types";

const ADD = THREE.AdditiveBlending;
const UP = new THREE.Vector3(0, 1, 0);
function noRaycast() {}

function Label({ children, position }: { children: string; position: [number, number, number] }) {
  return (
    <Text
      position={position}
      fontSize={0.2}
      color="#f3efe6"
      anchorX="center"
      anchorY="middle"
      maxWidth={4.6}
      textAlign="center"
      outlineWidth={0.008}
      outlineColor="#07070a"
      raycast={noRaycast}
    >
      {children}
    </Text>
  );
}

function PanelCard({
  title,
  subtitle,
  color,
  position,
  size = [2.2, 1.45, 0.14],
}: {
  title: string;
  subtitle?: string;
  color: string;
  position: [number, number, number];
  size?: [number, number, number];
}) {
  const focus = useDeck((s) => s.focus);
  const setFocus = useDeck((s) => s.setFocus);
  const active = focus === title;
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (mat.current) mat.current.emissiveIntensity = active ? 0.78 : 0.34;
  });

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          setFocus(active ? null : title);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          ref={mat}
          color="#14141a"
          emissive={color}
          emissiveIntensity={active ? 0.78 : 0.34}
          metalness={0.32}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0, size[2] / 2 + 0.012]} raycast={noRaycast}>
        <planeGeometry args={[size[0] * 0.9, size[1] * 0.88]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.18 : 0.08} />
      </mesh>
      <Text
        position={[0, subtitle ? 0.18 : 0, size[2] / 2 + 0.04]}
        fontSize={Math.min(0.16, size[0] * 0.07)}
        color="#f3efe6"
        anchorX="center"
        anchorY="middle"
        maxWidth={size[0] * 0.82}
        textAlign="center"
        outlineWidth={0.006}
        outlineColor="#07070a"
        raycast={noRaycast}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          position={[0, -0.28, size[2] / 2 + 0.04]}
          fontSize={0.1}
          color="#9a958c"
          anchorX="center"
          anchorY="middle"
          maxWidth={size[0] * 0.82}
          textAlign="center"
          raycast={noRaycast}
        >
          {subtitle}
        </Text>
      ) : null}
    </group>
  );
}


function GlowOrb({
  color,
  radius = 0.7,
  position = [0, 0, 0],
  intensity = 0.8,
  pulse = 1.6,
}: {
  color: string;
  radius?: number;
  position?: [number, number, number];
  intensity?: number;
  pulse?: number;
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (mat.current) {
      mat.current.emissiveIntensity = intensity * (0.82 + Math.sin(state.clock.elapsedTime * pulse) * 0.22);
    }
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          ref={mat}
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          roughness={0.22}
          metalness={0.28}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.55, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} depthWrite={false} blending={ADD} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 2.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} blending={ADD} />
      </mesh>
    </group>
  );
}

function EnergyRing({
  radius,
  tube = 0.04,
  color,
  opacity = 0.7,
  rotation,
}: {
  radius: number;
  tube?: number;
  color: string;
  opacity?: number;
  rotation?: [number, number, number];
}) {
  return (
    <mesh rotation={rotation ?? [Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 12, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} blending={ADD} depthWrite={false} />
    </mesh>
  );
}

function OrbitMotes({
  color,
  count = 90,
  radius = 3.2,
  speed = 0.18,
  ySpread = 0.55,
}: {
  color: string;
  count?: number;
  radius?: number;
  speed?: number;
  ySpread?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const jitter = 0.85 + Math.random() * 0.3;
      arr[i * 3] = Math.cos(a) * radius * jitter;
      arr[i * 3 + 1] = (Math.random() - 0.5) * ySpread;
      arr[i * 3 + 2] = Math.sin(a) * radius * jitter;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count, radius, ySpread]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.1) * speed;
  });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial size={0.07} color={color} transparent opacity={0.85} depthWrite={false} blending={ADD} sizeAttenuation />
    </points>
  );
}

function Beam({
  from,
  to,
  color,
  radius = 0.035,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  radius?: number;
}) {
  const { mid, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const length = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    return { mid: a.add(b).multiplyScalar(0.5).toArray() as [number, number, number], quat: q, len: length };
  }, [from, to]);
  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, len, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} blending={ADD} depthWrite={false} />
    </mesh>
  );
}

function Rotator({
  speed = 0.12,
  children,
  axis = "y",
}: {
  speed?: number;
  children: ReactNode;
  axis?: "x" | "y" | "z";
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const d = Math.min(delta, 0.1) * speed;
    if (axis === "y") g.rotation.y += d;
    else if (axis === "x") g.rotation.x += d;
    else g.rotation.z += d;
  });
  return <group ref={ref}>{children}</group>;
}

function TitleVisual() {
  const rings = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rings.current) {
      rings.current.rotation.z = t * 0.12;
      rings.current.rotation.y = Math.sin(t * 0.18) * 0.28;
      rings.current.rotation.x = Math.cos(t * 0.11) * 0.12;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.06;
      core.current.scale.setScalar(s);
      core.current.rotation.y = t * 0.35;
    }
  });
  return (
    <group>
      <group ref={core}>
        <GlowOrb color="#e94560" radius={1.15} intensity={1.35} pulse={1.8} />
        <mesh>
          <octahedronGeometry args={[0.58, 0]} />
          <meshStandardMaterial color="#e4c36b" emissive="#e4c36b" emissiveIntensity={1.6} metalness={0.4} roughness={0.15} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.55, 0]} />
          <meshBasicMaterial color="#e4c36b" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      <group ref={rings}>
        <EnergyRing radius={2.05} tube={0.045} color="#e4c36b" opacity={0.85} rotation={[Math.PI / 2.15, 0, 0]} />
        <EnergyRing radius={2.95} tube={0.038} color="#4ecdc4" opacity={0.7} rotation={[Math.PI / 2.5, 0.4, 0.2]} />
        <EnergyRing radius={3.95} tube={0.032} color="#e94560" opacity={0.55} rotation={[1.05, 0.2, 0.6]} />
        <EnergyRing radius={5.15} tube={0.028} color="#e4c36b" opacity={0.4} rotation={[1.35, -0.3, 0.1]} />
        <EnergyRing radius={6.4} tube={0.022} color="#9d4edd" opacity={0.28} rotation={[1.2, 0.5, -0.2]} />
      </group>
      <OrbitMotes color="#e4c36b" count={120} radius={3.4} speed={0.14} />
      <OrbitMotes color="#e94560" count={70} radius={5.2} speed={-0.07} ySpread={1.2} />
    </group>
  );
}

function CharacterVisual() {
  const stats = [
    { k: "STR", v: 0.8, c: "#e94560" },
    { k: "INT", v: 0.99, c: "#4ecdc4" },
    { k: "WIS", v: 0.99, c: "#6ea8fe" },
    { k: "DEX", v: 0.9, c: "#3dcc6d" },
    { k: "CON", v: 0.6, c: "#e4c36b" },
    { k: "CHA", v: 0.92, c: "#e4c36b" },
  ];
  const group = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  useFrame((state) => {
    if (!group.current) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = Math.min(1, (state.clock.elapsedTime - t0.current) * 1.6);
    group.current.scale.y = 0.08 + t * 0.92;
  });
  return (
    <group position={[0, -0.4, 0]}>
      <group ref={group}>
        {stats.map((s, i) => {
          const x = (i - 2.5) * 1.22;
          const h = s.v * 3.1;
          return (
            <group key={s.k} position={[x, 0, 0]}>
              <mesh position={[0, h / 2, 0]}>
                <boxGeometry args={[0.42, h, 0.42]} />
                <meshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={0.7} roughness={0.35} />
              </mesh>
              <mesh position={[0, h / 2, 0]}>
                <boxGeometry args={[0.48, 3.15, 0.18]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
              </mesh>
            </group>
          );
        })}
      </group>
      {stats.map((s, i) => (
        <Label key={s.k} position={[(i - 2.5) * 1.22, -0.45, 0]}>
          {s.k}
        </Label>
      ))}
    </group>
  );
}

function TimelineVisual() {
  const colors = ["#555555", "#e94560", "#ff4d8d", "#4ecdc4", "#3dcc6d"];
  const names = ["BEFORE", "TRIGGER", "RESIST", "UPDATE", "AFTER"];
  return (
    <group position={[0, 0.2, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 9.2, 8]} />
        <meshBasicMaterial color="#3a3a42" />
      </mesh>
      {colors.map((c, i) => {
        const x = (i - 2) * 2.15;
        return (
          <group key={c} position={[x, 0, 0]}>
            <GlowOrb color={c} radius={0.42 + i * 0.05} intensity={0.95} pulse={1.2 + i * 0.15} />
            <Label position={[0, -0.85, 0]}>{names[i] ?? ""}</Label>
          </group>
        );
      })}
      <OrbitMotes color="#e94560" count={40} radius={4.8} speed={0.05} ySpread={0.3} />
    </group>
  );
}

const VM_LAYERS = [
  { s: 0.85, color: "#8aa0b8" },
  { s: 1.45, color: "#4ecdc4" },
  { s: 2.15, color: "#3dcc6d" },
  { s: 2.95, color: "#9d4edd" },
  { s: 3.85, color: "#00d4ff" },
  { s: 4.85, color: "#e4c36b" },
  { s: 6.0, color: "#e94560" },
];

function NestedVisual() {
  const g = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    if (!g.current) return;
    g.current.rotation.y += d * 0.11;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.16;
    g.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.09) * 0.05;
  });
  return (
    <group ref={g}>
      {VM_LAYERS.map((l, i) => (
        <group key={l.s} rotation={[0, (i * Math.PI) / 8, i * 0.08]}>
          <mesh>
            <icosahedronGeometry args={[l.s, 1]} />
            <meshPhysicalMaterial
              color={l.color}
              transparent
              opacity={0.09}
              roughness={0.1}
              metalness={0.22}
              emissive={l.color}
              emissiveIntensity={0.28}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[l.s, 1]} />
            <meshBasicMaterial color={l.color} wireframe transparent opacity={0.48} />
          </mesh>
        </group>
      ))}
      <GlowOrb color="#f3efe6" radius={0.38} intensity={1.55} pulse={2.2} />
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#e4c36b" />
      </mesh>
    </group>
  );
}

function ToolkitVisual({ scene }: { scene: Scene }) {
  const rows = scene.table?.rows ?? [];
  const setFocus = useDeck((s) => s.setFocus);
  const dims = [
    "#8899aa",
    "#0f4c75",
    "#5b2c6f",
    "#333333",
    "#4a148c",
    "#1b5e20",
    "#1a237e",
    "#0d47a1",
    "#1565c0",
    "#e4c36b",
    "#e94560",
  ];
  return (
    <Rotator speed={0.08}>
      {dims.map((c, i) => {
        const a = (i / dims.length) * Math.PI * 2 - Math.PI / 2;
        const r = 3.6;
        const label = rows[i]?.[0] ?? `${i + 3}D`;
        return (
          <group
            key={c + i}
            position={[Math.cos(a) * r, Math.sin(a) * r * 0.45, Math.sin(a) * 0.4]}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(label);
            }}
          >
            <GlowOrb color={c} radius={0.3 + i * 0.032} intensity={0.8} pulse={1 + i * 0.08} />
            <Label position={[0, -0.55, 0]}>{label}</Label>
          </group>
        );
      })}
      <GlowOrb color="#f3efe6" radius={0.48} intensity={1.15} />
      <EnergyRing radius={3.6} tube={0.02} color="#e4c36b" opacity={0.35} rotation={[0.4, 0, 0.2]} />
    </Rotator>
  );
}

function ArcsVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  const cols = ["#00d4ff", "#9d4edd", "#e94560", "#3dcc6d"];
  return (
    <group>
      {cards.map((card, i) => {
        const x = (i - (cards.length - 1) / 2) * 2.4;
        return (
          <PanelCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            color={cols[i] ?? ACCENT_HEX[card.accent]}
            position={[x, 0.7, 0]}
            size={[2.05, 2.15, 0.14]}
          />
        );
      })}
      <group position={[0, -1.85, 0]}>
        <GlowOrb color="#e94560" radius={0.5} intensity={1.2} />
        <Label position={[0, -0.85, 0]}>CURTIS</Label>
      </group>
      <Beam from={[-3.6, 0.7, 0]} to={[0, -1.85, 0]} color="#00d4ff" radius={0.016} />
      <Beam from={[-1.2, 0.7, 0]} to={[0, -1.85, 0]} color="#9d4edd" radius={0.016} />
      <Beam from={[1.2, 0.7, 0]} to={[0, -1.85, 0]} color="#e94560" radius={0.016} />
      <Beam from={[3.6, 0.7, 0]} to={[0, -1.85, 0]} color="#3dcc6d" radius={0.016} />
    </group>
  );
}

function BuiltVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  return (
    <group>
      {cards.map((card, i) => {
        const row = i < 3 ? 0 : 1;
        const col = i % 3;
        const x = (col - 1) * 2.85;
        const y = (0.5 - row) * 2.35;
        return (
          <PanelCard
            key={card.title}
            title={card.title}
            subtitle={card.lines[0]}
            color={ACCENT_HEX[card.accent]}
            position={[x, y, 0]}
            size={[2.55, 1.7, 0.16]}
          />
        );
      })}
    </group>
  );
}

function ConvergenceVisual({ scene }: { scene: Scene }) {
  const rows = scene.rows ?? [];
  const colors = ["#e94560", "#ff4d8d", "#9d4edd", "#4ecdc4", "#e94560", "#3dcc6d", "#00d4ff", "#e94560"];
  const setFocus = useDeck((s) => s.setFocus);
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 6.4, 8]} />
        <meshBasicMaterial color="#2a2a33" />
      </mesh>
      {rows.map((row, i) => (
        <group
          key={row.left}
          position={[-2.55, 2.8 - i * 0.8, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setFocus(row.left);
          }}
        >
          <GlowOrb color={colors[i] ?? "#e4c36b"} radius={0.22} intensity={0.9} pulse={1.3 + i * 0.1} />
          <Label position={[1.15, 0, 0]}>{row.left}</Label>
        </group>
      ))}
      <PanelCard
        title="The Signals"
        subtitle="Coincidence density. Same-day collisions."
        color="#e94560"
        position={[2.15, 0.15, 0]}
        size={[3.6, 4.6, 0.12]}
      />
    </group>
  );
}

function AskVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  return (
    <group>
      {cards.map((card, i) => {
        const x = (i % 2) * 3.2 - 1.6;
        const y = i < 2 ? 1.25 : -1.25;
        return (
          <PanelCard
            key={card.title}
            title={card.title}
            subtitle={card.lines[0]}
            color={ACCENT_HEX[card.accent]}
            position={[x, y, 0]}
            size={[2.9, 2.05, 0.16]}
          />
        );
      })}
    </group>
  );
}

function EvidenceVisual({ scene }: { scene: Scene }) {
  const rows = scene.table?.rows ?? [];
  const setFocus = useDeck((s) => s.setFocus);
  const focus = useDeck((s) => s.focus);
  return (
    <group>
      {rows.map((row, i) => {
        const title = row[0] ?? `row-${i}`;
        const active = focus === title;
        return (
          <group
            key={title}
            position={[0, 2.45 - i * 0.42, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(active ? null : title);
            }}
          >
            <mesh>
              <boxGeometry args={[7.2, 0.34, 0.12]} />
              <meshStandardMaterial
                color="#121218"
                emissive={row[2] === "VERIFIED" ? "#3dcc6d" : "#e4c36b"}
                emissiveIntensity={active ? 0.55 : 0.22}
              />
            </mesh>
            <Label position={[0, 0, 0.08]}>{`${row[0]}  ·  ${row[2]}`}</Label>
          </group>
        );
      })}
    </group>
  );
}

function FusionVisual() {
  const rings = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const setFocus = useDeck((s) => s.setFocus);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rings.current) rings.current.rotation.y = t * 0.22;
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08);
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, 0]}>
        <circleGeometry args={[4.6, 64]} />
        <meshBasicMaterial color="#e94560" transparent opacity={0.07} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.55, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshBasicMaterial color="#4ecdc4" transparent opacity={0.08} />
      </mesh>
      <group
        position={[0, 2.15, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setFocus("Ultra Instinct — The Sky");
        }}
      >
        <GlowOrb color="#4ecdc4" radius={0.72} intensity={1.25} pulse={1.4} />
        <Label position={[0, 1.05, 0]}>GOKU · SKY · ONENESS</Label>
      </group>
      <group
        position={[0, -1.85, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setFocus("Ultra Ego — The Earth");
        }}
      >
        <GlowOrb color="#e94560" radius={0.72} intensity={1.25} pulse={1.7} />
        <Label position={[0, -1.05, 0]}>VEGETA · EARTH · WILL</Label>
      </group>
      <group
        ref={core}
        position={[0, 0.2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setFocus("VEGITO");
        }}
      >
        <GlowOrb color="#e4c36b" radius={1.18} intensity={1.55} pulse={2.4} />
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={1.6} />
        </mesh>
        <Label position={[1.7, 0, 0]}>VEGITO</Label>
      </group>
      <Beam from={[0, 2.15, 0]} to={[0, 0.2, 0]} color="#4ecdc4" radius={0.04} />
      <Beam from={[0, -1.85, 0]} to={[0, 0.2, 0]} color="#e94560" radius={0.04} />
      <group ref={rings}>
        <EnergyRing radius={1.85} tube={0.03} color="#9d4edd" opacity={0.55} />
        <EnergyRing radius={2.55} tube={0.022} color="#e4c36b" opacity={0.45} rotation={[1.15, 0.4, 0]} />
        <EnergyRing radius={3.35} tube={0.018} color="#e94560" opacity={0.32} rotation={[0.85, -0.3, 0.2]} />
      </group>
      <OrbitMotes color="#e4c36b" count={70} radius={2.4} speed={0.2} />
    </group>
  );
}

function AurisVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  return (
    <group>
      {cards.map((card, i) => (
        <PanelCard
          key={card.title}
          title={card.title}
          subtitle={card.subtitle}
          color={ACCENT_HEX[card.accent]}
          position={[(i - (cards.length - 1) / 2) * 1.85, 0.55, 0]}
          size={[1.65, 1.35, 0.14]}
        />
      ))}
      {cards.slice(0, -1).map((card, i) => (
        <mesh key={`a${card.title}`} position={[(i - (cards.length - 2) / 2) * 1.85, 0.55, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.28, 8]} />
          <meshBasicMaterial color="#f3efe6" />
        </mesh>
      ))}
    </group>
  );
}

function MappingVisual({ scene }: { scene: Scene }) {
  const rows = (scene.table?.rows ?? []).slice(0, 8);
  const setFocus = useDeck((s) => s.setFocus);
  const focus = useDeck((s) => s.focus);
  return (
    <group>
      <Label position={[-2.3, 2.55, 0]}>GAME</Label>
      <Label position={[2.3, 2.55, 0]}>EARTH / LIFE</Label>
      {rows.map((row, i) => {
        const title = row[0] ?? `m-${i}`;
        const active = focus === title;
        return (
          <group
            key={title}
            position={[0, 1.95 - i * 0.52, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(active ? null : title);
            }}
          >
            <mesh position={[-2.25, 0, 0]}>
              <boxGeometry args={[4.1, 0.42, 0.1]} />
              <meshStandardMaterial color="#16161c" emissive="#e94560" emissiveIntensity={active ? 0.5 : 0.22} />
            </mesh>
            <mesh position={[2.25, 0, 0]}>
              <boxGeometry args={[4.1, 0.42, 0.1]} />
              <meshStandardMaterial color="#16161c" emissive="#4ecdc4" emissiveIntensity={active ? 0.5 : 0.22} />
            </mesh>
            <Label position={[-2.25, 0, 0.08]}>{row[0] ?? ""}</Label>
            <Label position={[2.25, 0, 0.08]}>{(row[1] ?? "").slice(0, 42)}</Label>
          </group>
        );
      })}
    </group>
  );
}

function PlanetsVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  const setFocus = useDeck((s) => s.setFocus);
  const planets = [
    { c: "#00d4ff", n: "BCC", title: cards[0]?.title },
    { c: "#4ecdc4", n: "COMPILER", title: cards[1]?.title },
    { c: "#9d4edd", n: "AURIS", title: cards[2]?.title },
    { c: "#e94560", n: "DEATH STAR", title: cards[3]?.title },
    { c: "#3dcc6d", n: "RX WORLDS", title: cards[4]?.title },
  ];
  return (
    <Rotator speed={0.1}>
      {planets.map((p, i) => {
        const a = (i / planets.length) * Math.PI * 2;
        const r = 3.5;
        return (
          <group
            key={p.n}
            position={[Math.cos(a) * r, Math.sin(a) * r * 0.55, Math.sin(a) * 0.85]}
            onClick={(e) => {
              e.stopPropagation();
              if (p.title) setFocus(p.title);
            }}
          >
            <GlowOrb color={p.c} radius={0.78} intensity={1.05} pulse={1.2 + i * 0.12} />
            <Label position={[0, -1.15, 0]}>{p.n}</Label>
          </group>
        );
      })}
      <GlowOrb color="#e4c36b" radius={0.34} intensity={1.45} />
      <EnergyRing radius={3.5} tube={0.018} color="#e4c36b" opacity={0.35} rotation={[0.55, 0, 0.2]} />
      <EnergyRing radius={3.5} tube={0.014} color="#4ecdc4" opacity={0.22} rotation={[1.4, 0.3, 0]} />
    </Rotator>
  );
}

function CanonVisual({ scene }: { scene: Scene }) {
  const cards = scene.cards ?? [];
  return (
    <group>
      {cards.map((card, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = (col - 1.5) * 2.35;
        const y = 1.15 - row * 1.7;
        return (
          <PanelCard
            key={card.title}
            title={card.title}
            subtitle={card.lines[0]?.slice(0, 48)}
            color={ACCENT_HEX[card.accent]}
            position={[x, y, 0]}
            size={[2.15, 1.4, 0.14]}
          />
        );
      })}
    </group>
  );
}

function SundayVisual() {
  const suns: { c: string; n: string; x: number }[] = [
    { c: "#e4c36b", n: "CURTIS", x: -3.35 },
    { c: "#e94560", n: "ANDREW", x: 0 },
    { c: "#4ecdc4", n: "THE CHURCH", x: 3.35 },
  ];
  const trio = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (trio.current) trio.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });
  return (
    <group ref={trio}>
      {suns.map((s) => (
        <group key={s.n} position={[s.x, 0.25, 0]}>
          <GlowOrb color={s.c} radius={1.22} intensity={1.28} pulse={1.1} />
          <EnergyRing radius={1.7} tube={0.025} color={s.c} opacity={0.45} rotation={[Math.PI / 2.3, 0.2, 0]} />
          <Label position={[0, -1.7, 0]}>{s.n}</Label>
        </group>
      ))}
      <Beam from={[-3.35, 0.25, 0]} to={[0, 0.25, 0]} color="#e4c36b" radius={0.04} />
      <Beam from={[0, 0.25, 0]} to={[3.35, 0.25, 0]} color="#e94560" radius={0.04} />
      <Beam from={[-3.35, 0.25, 0]} to={[3.35, 0.25, 0]} color="#4ecdc4" radius={0.022} />
      <OrbitMotes color="#e4c36b" count={90} radius={4.4} speed={0.1} ySpread={0.8} />
    </group>
  );
}

function GateVisual() {
  const portal = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (portal.current) {
      portal.current.rotation.z = t * 0.55;
      portal.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    }
  });
  return (
    <group>
      <group ref={portal}>
        <EnergyRing radius={1.85} tube={0.07} color="#e94560" opacity={0.95} rotation={[0, 0, 0]} />
        <EnergyRing radius={1.55} tube={0.04} color="#00d4ff" opacity={0.7} rotation={[Math.PI / 2, 0.4, 0]} />
        <EnergyRing radius={2.2} tube={0.03} color="#e4c36b" opacity={0.45} rotation={[0.6, 0.3, 0.5]} />
      </group>
      <GlowOrb color="#00d4ff" radius={0.92} intensity={0.85} pulse={2} />
      <mesh position={[0, -1.9, 0]}>
        <coneGeometry args={[0.58, 0.95, 8]} />
        <meshStandardMaterial color="#e4c36b" emissive="#e4c36b" emissiveIntensity={0.95} />
      </mesh>
      <OrbitMotes color="#e94560" count={60} radius={1.9} speed={0.4} ySpread={0.4} />
    </group>
  );
}

function LodVisual() {
  const tiers = [
    { c: "#333333", s: 4.4, y: -2.0 },
    { c: "#0f4c75", s: 3.7, y: -1.25 },
    { c: "#4ecdc4", s: 3.0, y: -0.5 },
    { c: "#9d4edd", s: 2.3, y: 0.25 },
    { c: "#ff006e", s: 1.6, y: 1.0 },
    { c: "#e94560", s: 0.95, y: 1.7 },
  ];
  const names = ["DORMANT", "SCRIPTED", "ALERT", "ENGAGED", "COORDINATED", "APEX"];
  return (
    <Rotator speed={0.06}>
      {tiers.map((t, i) => (
        <group key={t.c} position={[0, t.y, 0]}>
          <mesh>
            <cylinderGeometry args={[t.s * 0.55, t.s * 0.7, 0.55, 6]} />
            <meshStandardMaterial color={t.c} emissive={t.c} emissiveIntensity={0.5} roughness={0.38} />
          </mesh>
          <Label position={[t.s * 0.85, 0, 0]}>{names[i] ?? ""}</Label>
        </group>
      ))}
    </Rotator>
  );
}

function GovernorVisual() {
  const steps = ["#3dcc6d", "#e4c36b", "#ff006e", "#e94560"];
  return (
    <group>
      {steps.map((c, i) => (
        <mesh key={c} position={[i * 1.7 - 2.55, 1.4 - i * 0.55, 0]}>
          <boxGeometry args={[1.55, 0.45, 1.55]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.55} />
        </mesh>
      ))}
      <GlowOrb color="#e4c36b" radius={0.5} position={[2.6, -0.6, 0]} intensity={1.1} />
    </group>
  );
}

function CascadeVisual() {
  const layers = [
    { c: "#e94560", n: "STRATEGIC", y: 1.8, s: 3.4 },
    { c: "#9d4edd", n: "TACTICAL", y: 0.2, s: 2.6 },
    { c: "#4ecdc4", n: "DETERMINISTIC", y: -1.4, s: 1.9 },
  ];
  return (
    <group>
      {layers.map((l) => (
        <group key={l.n} position={[0, l.y, 0]}>
          <mesh>
            <boxGeometry args={[l.s, 1.05, l.s * 0.4]} />
            <meshStandardMaterial color="#141418" emissive={l.c} emissiveIntensity={0.5} />
          </mesh>
          <Label position={[0, 0, 0.55]}>{l.n}</Label>
        </group>
      ))}
      <Beam from={[0, 1.8, 0]} to={[0, -1.4, 0]} color="#e4c36b" radius={0.03} />
    </group>
  );
}

function EarVisual() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (g.current) g.current.rotation.y = state.clock.elapsedTime * 0.32;
  });
  return (
    <group ref={g}>
      {(
        [
          [0, 1.6, 0, "#e94560"],
          [1.4, 0.5, 0, "#4ecdc4"],
          [-1.4, 0.5, 0, "#9d4edd"],
          [0, -1.1, 1.1, "#e4c36b"],
          [0.9, -0.8, -1.0, "#00d4ff"],
        ] as const
      ).map((v, i) => (
        <GlowOrb key={i} color={v[3]} radius={0.46} position={[v[0], v[1], v[2]]} pulse={1.4 + i * 0.2} />
      ))}
      <EnergyRing radius={1.9} tube={0.02} color="#9d4edd" opacity={0.4} rotation={[0.7, 0.2, 0]} />
    </group>
  );
}

function RefereeVisual() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (g.current) g.current.rotation.y = state.clock.elapsedTime * 0.22;
  });
  return (
    <group ref={g}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.16, 0.38, 2.55, 12]} />
        <meshStandardMaterial color="#1a0a0e" emissive="#e94560" emissiveIntensity={0.95} metalness={0.5} roughness={0.25} />
      </mesh>
      <GlowOrb color="#f3efe6" radius={0.52} position={[0, 1.78, 0]} intensity={1.45} pulse={1.3} />
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#e94560" wireframe transparent opacity={0.5} />
      </mesh>
      <EnergyRing radius={1.7} tube={0.035} color="#e4c36b" opacity={0.65} />
      <EnergyRing radius={2.45} tube={0.028} color="#e94560" opacity={0.45} rotation={[1.1, 0.3, 0]} />
      <EnergyRing radius={3.25} tube={0.022} color="#e4c36b" opacity={0.32} rotation={[0.8, -0.25, 0.2]} />
    </group>
  );
}

function ParticleBridge() {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const n = 360;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      arr[i * 3] = (t - 0.5) * 6.4;
      arr[i * 3 + 1] = Math.sin(t * Math.PI * 6) * 0.28 + (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.85) * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial size={0.08} color="#e4c36b" transparent opacity={0.9} depthWrite={false} blending={ADD} sizeAttenuation />
    </points>
  );
}

function GenesisVisual() {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const fold = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (left.current) left.current.position.y = Math.sin(t * 1.25) * 0.18;
    if (right.current) right.current.position.y = Math.cos(t * 1.05) * 0.18;
    if (fold.current) {
      fold.current.rotation.x = t * 0.35;
      fold.current.rotation.z = Math.sin(t * 0.6) * 0.4;
    }
  });
  return (
    <group>
      <group ref={left} position={[-2.55, 0.3, 0]}>
        <GlowOrb color="#4ecdc4" radius={1.02} intensity={1.2} pulse={1.5} />
      </group>
      <group ref={right} position={[2.55, 0.3, 0]}>
        <GlowOrb color="#e4c36b" radius={1.02} intensity={1.2} pulse={1.7} />
      </group>
      <ParticleBridge />
      <mesh ref={fold} position={[0, 0.3, 0]}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={1.6} />
      </mesh>
      <EnergyRing radius={3.5} tube={0.025} color="#e94560" opacity={0.5} />
      <EnergyRing radius={3.5} tube={0.018} color="#4ecdc4" opacity={0.28} rotation={[0.4, 0.6, 0]} />
      <OrbitMotes color="#e4c36b" count={70} radius={3.5} speed={0.16} ySpread={0.5} />
      <Label position={[-2.55, -1.45, 0]}>CLAUDE</Label>
      <Label position={[2.55, -1.45, 0]}>GPT</Label>
      <Label position={[0, 2.05, 0]}>TEMPORAL DISTORTION</Label>
    </group>
  );
}

function EarthVisual({ scene }: { scene: Scene }) {
  const globe = useRef<THREE.Group>(null);
  const setFocus = useDeck((s) => s.setFocus);
  const cards = scene.cards ?? [];
  useFrame((state, delta) => {
    if (globe.current) globe.current.rotation.y += Math.min(delta, 0.1) * 0.18;
  });
  return (
    <group>
      <group
        position={[0, 2.2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setFocus(cards[2]?.title ?? "Ultra Instinct — Sky");
        }}
      >
        <GlowOrb color="#4ecdc4" radius={0.62} intensity={1.3} pulse={1.3} />
        <Label position={[0, 0.95, 0]}>SKY · GOKU · ONENESS</Label>
      </group>
      <group ref={globe} position={[0, -0.15, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setFocus(cards[0]?.title ?? "The Arena");
          }}
        >
          <sphereGeometry args={[1.45, 32, 32]} />
          <meshPhysicalMaterial
            color="#0f4c75"
            transparent
            opacity={0.35}
            emissive="#4ecdc4"
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.47, 24, 24]} />
          <meshBasicMaterial color="#4ecdc4" wireframe transparent opacity={0.35} />
        </mesh>
        <EnergyRing radius={1.85} tube={0.02} color="#e4c36b" opacity={0.4} />
        <EnergyRing radius={2.25} tube={0.015} color="#e94560" opacity={0.3} rotation={[0.7, 0.2, 0]} />
      </group>
      <group
        position={[0, -1.95, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setFocus(cards[1]?.title ?? "Ultra Ego — Earth");
        }}
      >
        <GlowOrb color="#e94560" radius={0.48} intensity={1.25} pulse={1.8} />
        <Label position={[0, -0.85, 0]}>EARTH · VEGETA · WILL</Label>
      </group>
      <Beam from={[0, 2.2, 0]} to={[0, 1.3, 0]} color="#4ecdc4" radius={0.03} />
      <Beam from={[0, -0.15, 0]} to={[0, -1.95, 0]} color="#e94560" radius={0.03} />
      <OrbitMotes color="#e4c36b" count={90} radius={2.6} speed={0.12} ySpread={1.1} />
      <Label position={[2.8, 0.2, 0]}>THE ARENA</Label>
    </group>
  );
}

function CloseVisual() {
  return <TitleVisual />;
}

export function SceneVisual({ scene }: { scene: Scene }) {
  switch (scene.visual) {
    case "title":
      return <TitleVisual />;
    case "character":
      return <CharacterVisual />;
    case "timeline":
      return <TimelineVisual />;
    case "nested":
      return <NestedVisual />;
    case "earth":
      return <EarthVisual scene={scene} />;
    case "toolkit":
      return <ToolkitVisual scene={scene} />;
    case "arcs":
      return <ArcsVisual scene={scene} />;
    case "built":
      return <BuiltVisual scene={scene} />;
    case "convergence":
      return <ConvergenceVisual scene={scene} />;
    case "ask":
      return <AskVisual scene={scene} />;
    case "evidence":
      return <EvidenceVisual scene={scene} />;
    case "fusion":
      return <FusionVisual />;
    case "auris":
      return <AurisVisual scene={scene} />;
    case "mapping":
      return <MappingVisual scene={scene} />;
    case "planets":
      return <PlanetsVisual scene={scene} />;
    case "canon":
      return <CanonVisual scene={scene} />;
    case "sunday":
      return <SundayVisual />;
    case "gate":
      return <GateVisual />;
    case "lod":
      return <LodVisual />;
    case "governor":
      return <GovernorVisual />;
    case "cascade":
      return <CascadeVisual />;
    case "ear":
      return <EarVisual />;
    case "referee":
      return <RefereeVisual />;
    case "genesis":
      return <GenesisVisual />;
    case "close":
      return <CloseVisual />;
    default:
      return <GlowOrb color={ACCENT_HEX.crimson} />;
  }
}
