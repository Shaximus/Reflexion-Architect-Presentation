import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useDeck } from "@/presentation/engine/store";
import { LABEL_FONT_URL } from "./font";

const ADD = THREE.AdditiveBlending;
const UP = new THREE.Vector3(0, 1, 0);
const _dummy = new THREE.Object3D();
function noRaycast() {}

export function Label3({
  children,
  position,
  size = 0.22,
}: {
  children: string;
  position: [number, number, number];
  size?: number;
}) {
  return (
    <Text
      font={LABEL_FONT_URL}
      position={position}
      fontSize={size}
      color="#f3efe6"
      anchorX="center"
      anchorY="middle"
      maxWidth={4.8}
      textAlign="center"
      outlineWidth={0.01}
      outlineColor="#07070a"
      raycast={noRaycast}
    >
      {children}
    </Text>
  );
}

export function GlowOrb({
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
      mat.current.emissiveIntensity = intensity * (0.82 + Math.sin(state.clock.elapsedTime * pulse) * 0.18);
    }
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 28, 28]} />
        <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={intensity} roughness={0.22} metalness={0.28} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} depthWrite={false} blending={ADD} />
      </mesh>
    </group>
  );
}

export function EnergyRing({
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
      <torusGeometry args={[radius, tube, 10, 72]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} blending={ADD} depthWrite={false} />
    </mesh>
  );
}

export function OrbitMotes({
  color,
  count = 80,
  radius = 3.2,
  speed = 0.12,
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
      <pointsMaterial size={0.07} color={color} transparent opacity={0.8} depthWrite={false} blending={ADD} sizeAttenuation />
    </points>
  );
}

export function VolumetricCloud({
  color,
  count = 220,
  radius = 1.4,
  position = [0, 0, 0],
  opacity = 0.7,
  speed = 0.06,
  dim = false,
}: {
  color: string;
  count?: number;
  radius?: number;
  position?: [number, number, number];
  opacity?: number;
  speed?: number;
  dim?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.62;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count, radius]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.1) * speed;
  });
  return (
    <points ref={ref} position={position} geometry={geom} visible={!dim || opacity > 0.04}>
      <pointsMaterial
        size={0.085}
        color={color}
        transparent
        opacity={dim ? opacity * 0.18 : opacity}
        depthWrite={false}
        blending={ADD}
        sizeAttenuation
      />
    </points>
  );
}

export function Waveform({
  color = "#f3efe6",
  position = [0, 0, 0],
  bars = 28,
}: {
  color?: string;
  position?: [number, number, number];
  bars?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < bars; i++) {
      const h = 0.18 + Math.abs(Math.sin(state.clock.elapsedTime * 3.2 + i * 0.38)) * 0.95;
      _dummy.position.set((i - (bars - 1) / 2) * 0.13, h / 2, 0);
      _dummy.scale.set(0.08, h, 0.08);
      _dummy.rotation.set(0, 0, 0);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, bars]} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} blending={ADD} depthWrite={false} />
    </instancedMesh>
  );
}

export function Beam({
  from,
  to,
  color,
  radius = 0.03,
  dim = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  radius?: number;
  dim?: boolean;
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
      <meshBasicMaterial color={color} transparent opacity={dim ? 0.12 : 0.55} blending={ADD} depthWrite={false} />
    </mesh>
  );
}

export function Relic({
  id,
  color,
  position,
  label,
  kind = "orb",
  radius = 0.55,
  size = [1.8, 1.15, 0.16],
}: {
  id: string;
  color: string;
  position: [number, number, number];
  label?: string;
  kind?: "orb" | "box" | "icosa" | "octa";
  radius?: number;
  size?: [number, number, number];
}) {
  const selected = useDeck((s) => s.selectedEntityId);
  const select = useDeck((s) => s.selectEntity);
  const setLookAt = useDeck((s) => s.setLookAt);
  const active = selected === id;
  const dim = Boolean(selected && !active);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (mat.current) mat.current.emissiveIntensity = active ? 0.95 : 0.32;
  });
  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (active) {
      select(null);
      setLookAt(null);
    } else {
      select(id);
      setLookAt(position);
    }
  };
  return (
    <group position={position} onClick={onClick} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "auto")}>
      <group scale={active ? 1.08 : 1} visible>
        {kind === "box" ? (
          <mesh>
            <boxGeometry args={size} />
            <meshStandardMaterial
              ref={mat}
              color="#14141a"
              emissive={color}
              emissiveIntensity={active ? 0.9 : 0.32}
              metalness={0.3}
              roughness={0.4}
              transparent
              opacity={dim ? 0.28 : 1}
            />
          </mesh>
        ) : kind === "icosa" ? (
          <mesh>
            <icosahedronGeometry args={[radius, 0]} />
            <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={active ? 0.9 : 0.4} transparent opacity={dim ? 0.25 : 0.95} />
          </mesh>
        ) : kind === "octa" ? (
          <mesh>
            <octahedronGeometry args={[radius, 0]} />
            <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={active ? 1.1 : 0.5} transparent opacity={dim ? 0.28 : 1} />
          </mesh>
        ) : (
          <mesh>
            <sphereGeometry args={[radius, 28, 28]} />
            <meshStandardMaterial
              ref={mat}
              color={color}
              emissive={color}
              emissiveIntensity={active ? 1 : 0.4}
              roughness={0.22}
              metalness={0.28}
              transparent
              opacity={dim ? 0.22 : 1}
            />
          </mesh>
        )}
      </group>
      {label && <Label3 position={[0, kind === "box" ? size[1] / 2 + 0.28 : -radius - 0.38, 0]}>{label}</Label3>}
    </group>
  );
}

export function FlowPacket({ points }: { points: [number, number, number][] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || points.length < 2) return;
    const t = (state.clock.elapsedTime * 0.22) % 1;
    const seg = t * (points.length - 1);
    const i = Math.min(points.length - 2, Math.floor(seg));
    const f = seg - i;
    const a = points[i]!;
    const b = points[i + 1]!;
    ref.current.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.11, 12, 12]} />
      <meshBasicMaterial color="#e4c36b" />
    </mesh>
  );
}

export function layoutTo3(n: { x: number; y: number }, spread = 0.1): [number, number, number] {
  return [(n.x - 50) * spread, (50 - n.y) * (spread * 0.9), 0];
}

export function Rotator({ speed = 0.08, children }: { speed?: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.1) * speed;
  });
  return <group ref={ref}>{children}</group>;
}
