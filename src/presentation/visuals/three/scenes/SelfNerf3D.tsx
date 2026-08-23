import { Text } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { LABEL_FONT_URL } from "../font";
import { Beam, FlowPacket, GlowOrb, Label3, Relic, VolumetricCloud } from "../primitives";

/**
 * SELF-NERF — 3D flow diagram.
 *
 * The chain (the payload) runs left-to-right and flows toward the viewer in
 * depth. CAPACITY TO REFUSE forks into two spatially separated branches —
 * RENTED INFERENCE (crimson, back plane) and OWNED SUBSTRATE (teal, front
 * plane) — and only the owned branch returns to MEANINGFUL YES. Bottom-left,
 * Perfect Ceiling and Perfect Operator converge on the GRADIENT -> 0
 * terminal state, with Arjovsky & Bottou 2017 cited beside it.
 *
 * LABEL CONSTRAINT (see ../font.ts): every glyph rendered here must be plain
 * ASCII. Any codepoint outside the self-hosted font's cmap re-triggers
 * troika's CDN fallback, which freezes the canvas on a dead network. Arrows
 * are drawn geometry (cones), never the U+2192 character.
 */

type V3 = [number, number, number];

const UP = new THREE.Vector3(0, 1, 0);
function noRaycast() {}

/** Small secondary label — same self-hosted font, dimmer color. */
function Gloss({
  children,
  position,
  color = "#b7b1a5",
  size = 0.14,
  maxWidth = 2.5,
}: {
  children: string;
  position: V3;
  color?: string;
  size?: number;
  maxWidth?: number;
}) {
  return (
    <Text
      font={LABEL_FONT_URL}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={maxWidth}
      textAlign="center"
      outlineWidth={0.008}
      outlineColor="#07070a"
      raycast={noRaycast}
    >
      {children}
    </Text>
  );
}

/** Shorten a segment at both ends so beams stop at node surfaces. */
function shrink(from: V3, to: V3, headGap: number, tailGap: number): { a: V3; b: V3 } {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dir = b.clone().sub(a).normalize();
  return {
    a: a.clone().add(dir.clone().multiplyScalar(headGap)).toArray() as V3,
    b: b.clone().sub(dir.clone().multiplyScalar(tailGap)).toArray() as V3,
  };
}

/** Beam with a cone arrowhead at the `to` end — the drawn-geometry arrow. */
function ArrowBeam({
  from,
  to,
  color,
  radius = 0.04,
  headGap = 0.5,
  tailGap = 0.55,
  dim = false,
  dashed = false,
}: {
  from: V3;
  to: V3;
  color: string;
  radius?: number;
  headGap?: number;
  tailGap?: number;
  dim?: boolean;
  dashed?: boolean;
}) {
  const { a, b, quat, tip } = useMemo(() => {
    const s = shrink(from, to, headGap, tailGap);
    const av = new THREE.Vector3(...s.a);
    const bv = new THREE.Vector3(...s.b);
    const dir = bv.clone().sub(av).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir);
    const tipPos = bv.clone().sub(dir.clone().multiplyScalar(0.14)).toArray() as V3;
    return { a: s.a, b: s.b, quat: q, tip: tipPos };
  }, [from, to, headGap, tailGap]);
  return (
    <group>
      <Beam from={a} to={b} color={color} radius={radius} dim={dim} />
      {dashed && <Beam from={a} to={b} color={color} radius={radius * 0.45} dim={dim} />}
      <mesh position={tip} quaternion={quat}>
        <coneGeometry args={[radius * 3.4, 0.3, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={dim ? 0.15 : 0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** One stage of the chain: glowing octahedron, big label above, gloss below. */
function ChainNode({
  position,
  label,
  gloss,
  color,
  radius = 0.3,
}: {
  position: V3;
  label: string;
  gloss: string;
  color: string;
  radius?: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <octahedronGeometry args={[radius, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.75} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.7, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <Label3 position={[0, radius + 0.5, 0]} size={0.27}>
        {label}
      </Label3>
      <Gloss position={[0, -radius - 0.34, 0]} size={0.135} maxWidth={2.3}>
        {gloss}
      </Gloss>
    </group>
  );
}

// ── layout ──────────────────────────────────────────────────────────────────

/** The chain, receding-to-advancing in z so the flow reads as moving toward
 *  the viewer. NOTE: the WorldCanvas GroundGlow disc sits at world y = -2.6
 *  and depth-culls any label below it that sorts closer to the camera, so
 *  every label here must land above scene y = -2.6 (the stage group adds
 *  +0.2 world y). */
const CHAIN: { pos: V3; label: string; gloss: string; color: string }[] = [
  { pos: [-5.2, 1.75, -1.6], label: "SELF-NERF", gloss: "voluntary information asymmetry", color: "#e4c36b" },
  { pos: [-2.6, 1.75, -1.0], label: "HIDDEN INFORMATION", gloss: "hidden from the creator, by design", color: "#e4c36b" },
  { pos: [0, 1.75, -0.4], label: "SOVEREIGNTY", gloss: "the outcome is not already in the model", color: "#e4c36b" },
  { pos: [2.6, 1.75, 0.2], label: "CAPACITY TO REFUSE", gloss: "an exit that cannot be revoked", color: "#e4c36b" },
  { pos: [5.2, 1.75, 0.8], label: "MEANINGFUL YES", gloss: "consent requires a real No", color: "#4ecdc4" },
];

const RENTED: V3 = [1.35, -0.55, -1.5];
const OWNED: V3 = [4.45, -0.55, 1.4];
const CEILING: V3 = [-5.8, -0.3, -0.7];
const OPERATOR: V3 = [-2.4, -0.3, -1.0];
const TERMINAL: V3 = [-4.15, -1.85, 0.5];
const CITATION: V3 = [-0.85, -2.1, 0.2];
// Below the GroundGlow plane, but at view-space z beyond the disc it draws
// before the disc and stays visible — verified by screenshot at both 1080p
// and 720p. Moving it up/left collides with the OWNED SUBSTRATE glosses.
const STAT: V3 = [5.75, -2.55, -0.1];

export function SelfNerf3D() {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const byId = (frag: string) => model.entities.find((e) => e.id.includes(frag));
  const rented = byId("rented-inference");
  const owned = byId("owned-substrate");
  const ceiling = byId("perfect-ceiling");
  const operator = byId("perfect-operator");
  const citation = byId("arjovsky");
  const stat = model.entities.find((e) => e.group === "stat");
  const n3 = CHAIN[3]!.pos;
  const n4 = CHAIN[4]!.pos;

  const packetPath = useMemo<V3[]>(
    () => [CHAIN[0]!.pos, CHAIN[1]!.pos, CHAIN[2]!.pos, n3, OWNED, n4],
    [n3, n4],
  );

  return (
    <group>
      {/* ── A. THE CHAIN — the spine ── */}
      {CHAIN.map((n, i) => (
        <group key={n.label}>
          {i < CHAIN.length - 1 && (
            <ArrowBeam from={n.pos} to={CHAIN[i + 1]!.pos} color="#e4c36b" radius={0.05} headGap={0.42} tailGap={0.52} />
          )}
          <ChainNode position={n.pos} label={n.label} gloss={n.gloss} color={n.color} radius={i === 4 ? 0.34 : 0.3} />
        </group>
      ))}

      {/* ── B. THE FORK — two branches out of CAPACITY TO REFUSE ── */}
      <ArrowBeam from={n3} to={RENTED} color="#e94560" radius={0.038} headGap={0.42} tailGap={0.75} />
      <ArrowBeam from={n3} to={OWNED} color="#4ecdc4" radius={0.038} headGap={0.42} tailGap={0.75} />
      {/* only the owned branch completes the circuit to MEANINGFUL YES */}
      <ArrowBeam from={OWNED} to={n4} color="#4ecdc4" radius={0.03} headGap={0.72} tailGap={0.5} />
      {rented && (
        <group>
          <Relic id={rented.id} color="#e94560" position={RENTED} kind="box" size={[2.5, 0.95, 0.2]} label={rented.label} />
          <Gloss position={[RENTED[0], RENTED[1] - 0.78, RENTED[2]]} size={0.125} maxWidth={3.2}>
            metered / logged / revocable / model changes under you
          </Gloss>
          <Gloss position={[RENTED[0], RENTED[1] - 1.06, RENTED[2]]} size={0.16} color="#e94560" maxWidth={3.2}>
            you are being run
          </Gloss>
        </group>
      )}
      {owned && (
        <group>
          <Relic id={owned.id} color="#4ecdc4" position={OWNED} kind="box" size={[2.5, 0.95, 0.2]} label={owned.label} />
          <Gloss position={[OWNED[0], OWNED[1] - 0.78, OWNED[2]]} size={0.125} maxWidth={3.2}>
            private / permanent / forkable / works offline
          </Gloss>
          <Gloss position={[OWNED[0], OWNED[1] - 1.06, OWNED[2]]} size={0.16} color="#4ecdc4" maxWidth={3.2}>
            you are running
          </Gloss>
        </group>
      )}

      {/* ── C. THE COLLAPSE — opposite strategies, one terminal state ── */}
      {ceiling && (
        <Relic id={ceiling.id} color="#e4c36b" position={CEILING} kind="box" size={[2.15, 0.78, 0.18]} label={ceiling.label} />
      )}
      {operator && (
        <Relic id={operator.id} color="#9d4edd" position={OPERATOR} kind="box" size={[2.15, 0.78, 0.18]} label={operator.label} />
      )}
      <ArrowBeam from={CEILING} to={TERMINAL} color="#e4c36b" radius={0.034} headGap={0.5} tailGap={0.6} />
      <ArrowBeam from={OPERATOR} to={TERMINAL} color="#9d4edd" radius={0.034} headGap={0.5} tailGap={0.6} />
      <GlowOrb color="#e94560" radius={0.38} position={TERMINAL} intensity={1.15} pulse={2.6} />
      <VolumetricCloud color="#e94560" radius={0.95} count={110} position={TERMINAL} opacity={0.4} />
      <Label3 position={[TERMINAL[0], TERMINAL[1] - 0.72, TERMINAL[2]]} size={0.28}>
        {"GRADIENT -> 0"}
      </Label3>
      {citation && (
        <group>
          <Beam from={TERMINAL} to={CITATION} color="#e4c36b" radius={0.014} dim />
          <Relic id={citation.id} color="#e4c36b" position={CITATION} kind="box" size={[2.1, 0.55, 0.14]} label={citation.label} />
        </group>
      )}
      {stat && <Relic id={stat.id} color="#e4c36b" position={STAT} radius={0.22} label={stat.label} />}

      {/* the packet rides the chain, dips through the owned branch, arrives at YES */}
      <FlowPacket points={packetPath} />
    </group>
  );
}
