import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useDeck } from "@/presentation/engine/store";
import { LABEL_FONT_URL } from "./font";
import {
  active,
  activePulse,
  information,
  jurisdiction,
  PALETTE,
  structural,
} from "./materials";

/** Decorative (non-interactive) layers never enter the raycaster. */
function noRaycast() {}

function facingCamera(group: THREE.Object3D | null, camera: THREE.Camera) {
  if (group) group.quaternion.copy(camera.quaternion);
}

/**
 * Selection contract shared by every selectable primitive, taken verbatim from
 * Relic: onClick toggles selection + lookAt; active = selectedEntityId === id;
 * dim = something else owns the selection.
 */
function useSelection(id: string, position: [number, number, number]) {
  const selected = useDeck((s) => s.selectedEntityId);
  const select = useDeck((s) => s.selectEntity);
  const setLookAt = useDeck((s) => s.setLookAt);
  const isActive = selected === id;
  const dim = Boolean(selected && !isActive);
  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isActive) {
      select(null);
      setLookAt(null);
    } else {
      select(id);
      setLookAt(position);
    }
  };
  return { active: isActive, dim, onClick };
}

/**
 * KnowledgeNode — replaces GlowOrb / the Relic orb vocabulary.
 *
 * A real "information node": a STRUCTURAL shell (metallic, never glows), a
 * tightly-controlled ACTIVE core (the only part that breathes), and an optional
 * INFORMATION aura (spectral/refractive). Honors the selection contract.
 */
export function KnowledgeNode({
  id,
  color,
  position = [0, 0, 0],
  radius = 0.5,
  accent,
  label,
  aura = true,
}: {
  id: string;
  color: string;
  position?: [number, number, number];
  radius?: number;
  accent?: string;
  label?: string;
  aura?: boolean;
}) {
  const { active: isActive, dim, onClick } = useSelection(id, position);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  const auraMat = useRef<THREE.MeshPhysicalMaterial>(null);
  useFrame((state) => {
    const e = activePulse(state.clock.elapsedTime, { active: isActive, dim });
    if (core.current) core.current.emissiveIntensity = e;
    if (auraMat.current) auraMat.current.emissiveIntensity = isActive ? 0.32 : 0.05;
  });
  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <group scale={isActive ? 1.08 : 1}>
        {/* STRUCTURAL shell — metallic, architectural, never emits. */}
        <mesh>
          <icosahedronGeometry args={[radius, 1]} />
          <meshStandardMaterial {...structural(color, { dim })} wireframe />
        </mesh>
        {/* ACTIVE core — the only part that is allowed to glow / breathe. */}
        <mesh>
          <sphereGeometry args={[radius * 0.5, 24, 24]} />
          <meshStandardMaterial ref={core} {...active(color, { dim })} />
        </mesh>
        {/* INFORMATION aura — spectral / refractive, optional. */}
        {aura && (
          <mesh raycast={noRaycast}>
            <sphereGeometry args={[radius * 1.55, 24, 24]} />
            <meshPhysicalMaterial ref={auraMat} {...information(color, { dim })} />
          </mesh>
        )}
      </group>
      <SelectionHalo active={isActive} radius={radius * 1.75} color={accent ?? PALETTE.gold} />
      {label && <SemanticLabel text={label} priority="major" position={[0, -radius - 0.32, 0]} />}
    </group>
  );
}

/**
 * CausalLink — replaces Beam. A curved (quadratic) relationship path with a
 * directional, animated data-flow pulse travelling from `from` toward `to`.
 * Not a straight cylinder; the curve bows outward so causality reads as a
 * trajectory, not a wire. Dim-aware.
 */
export function CausalLink({
  from,
  to,
  color,
  accent,
  dim = false,
  flow = true,
  bow = 0.4,
  radius = 0.02,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  accent?: string;
  dim?: boolean;
  flow?: boolean;
  bow?: number;
  radius?: number;
}) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const d = a.distanceTo(b);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    // bow the curve outward + upward so the link reads as a causal arc.
    mid.add(new THREE.Vector3(0, bow * d * 0.4 + 0.25, 0));
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [from, to, bow]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 40, radius, 8, false), [curve, radius]);
  const pulse = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (flow && pulse.current) {
      const t = (state.clock.elapsedTime * 0.32) % 1;
      pulse.current.position.copy(curve.getPoint(t));
      // fade in at the origin, out at the destination: directionality.
      const fade = Math.sin(t * Math.PI);
      pulse.current.scale.setScalar(0.5 + fade * 0.7);
      (pulse.current.material as THREE.MeshStandardMaterial).opacity = dim ? 0.12 : 0.35 + fade * 0.65;
    }
  });
  return (
    <group>
      <mesh geometry={tube} raycast={noRaycast}>
        <meshStandardMaterial {...information(color, { dim, opacity: dim ? 0.05 : 0.16 })} />
      </mesh>
      {flow && (
        <mesh ref={pulse} raycast={noRaycast}>
          <sphereGeometry args={[radius * 2.4, 12, 12]} />
          <meshStandardMaterial {...active(accent ?? color, { dim })} />
        </mesh>
      )}
    </group>
  );
}

/**
 * TemporalBoundary — replaces the "brown plane". A luminous temporal membrane /
 * chronology horizon: a thin, translucent, subtly-animated field, NOT a solid
 * wall. Light breathes through it; it never occludes.
 */
export function TemporalBoundary({
  position = [0, 0, 0],
  rotation = [Math.PI / 2, 0, 0],
  size = [9, 0.34],
  color = PALETTE.gold,
  active: isActive = false,
  dim = false,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  color?: string;
  active?: boolean;
  dim?: boolean;
}) {
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  useFrame((state) => {
    if (!mat.current) return;
    const base = isActive ? 0.3 : dim ? 0.05 : 0.14;
    // a slow, restrained shimmer — the field is alive, not a solid wall.
    mat.current.opacity = base * (0.85 + Math.sin(state.clock.elapsedTime * 0.7) * 0.15);
    mat.current.emissiveIntensity = (isActive ? 0.42 : 0.12) * (0.9 + Math.sin(state.clock.elapsedTime * 0.7) * 0.1);
  });
  return (
    <mesh position={position} rotation={rotation} raycast={noRaycast}>
      <planeGeometry args={size} />
      <meshPhysicalMaterial ref={mat} {...jurisdiction(color, { dim, active: isActive })} />
    </mesh>
  );
}

/**
 * InformationFlow — a controlled, animated data-flow along a curve. Replaces
 * raw Particles / OrbitMotes for "signal transmission". Bounded count, instanced
 * style, directionality via a phase-graded brightness.
 */
export function InformationFlow({
  points,
  color = PALETTE.teal,
  count = 12,
  speed = 0.25,
  dim = false,
  radius = 0.06,
}: {
  points: [number, number, number][];
  color?: string;
  count?: number;
  speed?: number;
  dim?: boolean;
  radius?: number;
}) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, "centripetal"),
    [points],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    if (points.length < 2) return;
    const start = (state.clock.elapsedTime * speed) % 1;
    for (let i = 0; i < count; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const t = (start + i / count) % 1;
      m.position.copy(curve.getPoint(t));
      // a leading packet is brightest; the trail fades — this is direction.
      const bright = 0.35 + 0.65 * Math.sin(t * Math.PI);
      m.scale.setScalar(0.5 + bright * 0.6);
      (m.material as THREE.MeshStandardMaterial).opacity = dim ? 0.08 : bright;
    }
  });
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          raycast={noRaycast}
          ref={(m) => {
            if (m) refs.current[i] = m;
          }}
        >
          <sphereGeometry args={[radius, 10, 10]} />
          <meshStandardMaterial {...active(color, { dim })} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * SemanticLabel — the §9 label doctrine. Depth-aware, camera-facing,
 * leader-line capable, selection-priority aware. In PRESENT mode only "major"
 * labels show; in EXPLORE mode more labels appear (optionally with leader
 * lines). Never glues a name onto every node.
 */
export function SemanticLabel({
  text,
  position = [0, 0, 0],
  color = PALETTE.ivory,
  size = 0.22,
  priority = "major",
  leader = false,
  leaderLength = 0.28,
  leaderColor = PALETTE.gold,
}: {
  text: string;
  position?: [number, number, number];
  color?: string;
  size?: number;
  priority?: "major" | "minor";
  leader?: boolean;
  leaderLength?: number;
  leaderColor?: string;
}) {
  const mode = useDeck((s) => s.mode);
  const explore = mode === "explore";
  // PRESENT shows only major labels; EXPLORE shows the rest too.
  const visible = explore || priority === "major";
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useFrame(() => facingCamera(group.current, camera));
  if (!visible) return null;
  const showLeader = leader && explore;
  return (
    <group position={position}>
      {showLeader && (
        <mesh position={[0, -leaderLength / 2, 0]} raycast={noRaycast}>
          <cylinderGeometry args={[0.004, 0.004, leaderLength, 6]} />
          <meshBasicMaterial color={leaderColor} transparent opacity={0.5} depthWrite={false} />
        </mesh>
      )}
      <group ref={group}>
        <Text
          font={LABEL_FONT_URL}
          fontSize={size}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.8}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor={PALETTE.void}
          raycast={noRaycast}
        >
          {text}
        </Text>
      </group>
    </group>
  );
}

/**
 * SelectionHalo — a controlled ring that appears only on the selected node.
 * ACTIVE family, tightly controlled: it is invisible until active, then breathes
 * a little. Never on by default.
 */
export function SelectionHalo({
  active: isActive,
  radius = 0.7,
  color = PALETTE.gold,
  opacity = 0.5,
}: {
  active: boolean;
  radius?: number;
  color?: string;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || !isActive) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.06;
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      opacity * (0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 2.4));
  });
  return (
    <mesh ref={ref} visible={isActive} rotation={[Math.PI / 2, 0, 0]} raycast={noRaycast}>
      <torusGeometry args={[radius, 0.02, 10, 64]} />
      <meshBasicMaterial color={color} transparent opacity={isActive ? opacity : 0} depthWrite={false} />
    </mesh>
  );
}

/**
 * A thin, decorative, camera-facing glow ring (noRaycast). Kept as a helper so
 * scenes can add a restrained accent without spraying bloom everywhere.
 */
export function DecorRing({
  radius,
  tube = 0.02,
  color = PALETTE.gold,
  opacity = 0.4,
  rotation,
}: {
  radius: number;
  tube?: number;
  color?: string;
  opacity?: number;
  rotation?: [number, number, number];
}) {
  return (
    <mesh rotation={rotation ?? [Math.PI / 2, 0, 0]} raycast={noRaycast}>
      <torusGeometry args={[radius, tube, 10, 72]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/**
 * A small composable wrapper that applies the selection contract to arbitrary
 * children — the analog of Arcs3D's `Pick`. Lets a scene make any semantic
 * cluster selectable without re-deriving the contract.
 */
export function Selectable({
  id,
  position = [0, 0, 0],
  children,
}: {
  id: string;
  position?: [number, number, number];
  children: ReactNode;
}) {
  const { active, dim, onClick } = useSelection(id, position);
  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      userData={{ active, dim }}
    >
      <group scale={active ? 1.08 : 1}>{children}</group>
    </group>
  );
}
