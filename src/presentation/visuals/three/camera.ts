import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useDeck } from "@/presentation/engine/store";
import type { Mode } from "@/presentation/engine/types";

/**
 * Scene-specific camera grammar (§10). Additive + optional: a scene that only
 * has the legacy `camera: [number, number, number]` tuple still works, because
 * the tuple is treated as a fallback. This module does NOT touch WorldCanvas /
 * CameraRig — it exposes a new capability a later phase can adopt.
 */

type Vec3 = [number, number, number];

/** A hard camera shot: an explicit position + a look target. */
export interface CameraShot {
  position: Vec3;
  target: Vec3;
  fov?: number;
}

/** A focus shot: frame an entity by placing the camera at `target + offset`. */
export interface FocusShot {
  target: Vec3;
  offset: Vec3;
  fov?: number;
}

type Shot = CameraShot | FocusShot;

/** Where the camera should orbit around in EXPLORE mode (if any). */
export interface ExploreTarget {
  target: Vec3;
  radius?: number;
  height?: number;
}

/** Hard constraints a later phase can enforce on the adopting rig. */
export interface CameraBounds {
  minDistance?: number;
  maxDistance?: number;
  fov?: number;
}

/** How the camera should ease between shots. */
export interface CameraTransition {
  /** seconds for a full settle (0 = instant). */
  duration?: number;
  ease?: (t: number) => number;
}

/**
 * The richer camera contract. Everything except `presentShot` is optional, and
 * the whole object is optional — so a legacy scene with only a `camera` tuple
 * is unaffected.
 */
export interface SceneCameraSpec {
  /** The authored "hero" shot for the scene (a position, not just a lerp target). */
  presentShot: CameraShot | FocusShot;
  /** Per-entity focus overrides (e.g. frame this node from this angle). */
  focusShots?: Record<string, Shot>;
  /** Orbit center + distance in EXPLORE mode. */
  exploreTarget?: ExploreTarget;
  /** Distance / fov constraints. */
  bounds?: CameraBounds;
  /** Easing for transitions. */
  transition?: CameraTransition;
  /** Legacy fallback when no authored shot is present. */
  legacy?: Vec3;
}

/** A fully-resolved camera intent for one frame. */
export interface ResolvedShot {
  position: THREE.Vector3;
  look: THREE.Vector3;
  fov?: number;
}

interface ResolveContext {
  mode: Mode;
  lookAt: Vec3 | null;
  selected: string | null;
  pointerX: number;
  pointerY: number;
  reduced: boolean;
}

function isFocus(shot: Shot): shot is FocusShot {
  return "offset" in shot;
}

/**
 * Build a shot that frames two systems (before / during / after interaction).
 * Targets the midpoint and pushes the camera back far enough to see both.
 */
export function frameTwoSystems(
  a: Vec3,
  b: Vec3,
  opts: { distance?: number; offset?: Vec3; fov?: number } = {},
): CameraShot {
  const pa = new THREE.Vector3(...a);
  const pb = new THREE.Vector3(...b);
  const target = pa.clone().add(pb).multiplyScalar(0.5);
  const gap = pa.distanceTo(pb);
  const distance = opts.distance ?? gap * 1.6 + 4;
  const off = new THREE.Vector3(...(opts.offset ?? [0, 1.4, 1]));
  if (off.lengthSq() === 0) off.set(0, 1.4, 1);
  off.normalize().multiplyScalar(distance);
  return {
    position: target.clone().add(off).toArray() as Vec3,
    target: target.toArray() as Vec3,
    fov: opts.fov,
  };
}

/**
 * Resolve a scene's camera intent for a given mode + store state. Pure so it can
 * be tested / reused without a canvas. Returns `null` in EXPLORE (an OrbitControls
 * or the adopting rig owns the camera) or when there is nothing to frame.
 *
 * Priority (PRESENT): authored focus shot > tracked selected node > authored
 * present shot > legacy camera tuple. This mirrors CameraRig's present behavior
 * (frame a selected node at distance 7.2) so the fallback is identical.
 */
export function resolveShot(
  spec: SceneCameraSpec | undefined,
  legacy: Vec3 | undefined,
  ctx: ResolveContext,
): ResolvedShot | null {
  if (ctx.mode === "explore") return null;

  const px = ctx.reduced ? 0 : ctx.pointerX;
  const py = ctx.reduced ? 0 : ctx.pointerY;
  const base = legacy ?? spec?.legacy;

  // 1) An authored per-entity focus shot wins.
  const focus = ctx.selected ? spec?.focusShots?.[ctx.selected] : undefined;
  if (focus) {
    if (isFocus(focus)) {
      const look = new THREE.Vector3(...focus.target);
      const position = new THREE.Vector3(...focus.offset).add(look);
      return { position, look, fov: focus.fov };
    }
    return {
      position: new THREE.Vector3(...focus.position),
      look: new THREE.Vector3(...focus.target),
      fov: focus.fov,
    };
  }

  // 2) A selected node is framed like CameraRig (tracks a developmental trajectory).
  if (ctx.lookAt) {
    const f = new THREE.Vector3(...ctx.lookAt);
    const position = new THREE.Vector3(f.x + px * 0.55, f.y + 1.05 + py * 0.4, f.z + 7.2);
    return { position, look: f, fov: spec?.bounds?.fov };
  }

  // 3) The authored present shot (a position, not just a lerp target).
  if (spec?.presentShot) {
    const shot = spec.presentShot;
    if (isFocus(shot)) {
      const look = new THREE.Vector3(...shot.target);
      const position = new THREE.Vector3(...shot.offset).add(look);
      position.x += px * 0.55;
      position.y += py * 0.4;
      return { position, look, fov: shot.fov };
    }
    const position = new THREE.Vector3(...shot.position);
    position.x += px;
    position.y += py;
    return { position, look: new THREE.Vector3(...shot.target), fov: shot.fov };
  }

  // 4) Legacy fallback: lerp to the camera tuple + default look.
  if (base) {
    const position = new THREE.Vector3(base[0], base[1], base[2]);
    position.x += px;
    position.y += py;
    return { position, look: new THREE.Vector3(0, 0.35, 0) };
  }

  return null;
}

/**
 * The adoptable camera hook. Drop it inside the Canvas where CameraRig lives;
 * it drives the same camera using the richer grammar, falling back to the
 * legacy `camera` tuple when no authored shot exists. It stays compatible with
 * the store (lookAt / mode / visMode / selectedEntityId).
 *
 * In EXPLORE mode it returns early so an OrbitControls (or the adopting rig) can
 * own the camera — exactly like CameraRig's `if (!explore) return null`.
 */
export function useSceneCamera(opts: {
  spec?: SceneCameraSpec;
  legacy?: Vec3;
  reduced?: boolean;
  /** lerp rate (higher = snappier). Defaults to CameraRig's 2.6. */
  rate?: number;
}) {
  const mode = useDeck((s) => s.mode);
  const lookAt = useDeck((s) => s.lookAt);
  const selected = useDeck((s) => s.selectedEntityId);
  const reduced = opts.reduced ?? false;
  const rate = opts.rate ?? 2.6;
  const look = useRef(new THREE.Vector3(0, 0.35, 0));
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (mode === "explore") return;
    const shot = resolveShot(opts.spec, opts.legacy, {
      mode,
      lookAt,
      selected,
      pointerX: state.pointer.x,
      pointerY: state.pointer.y,
      reduced,
    });
    if (!shot) return;
    const k = 1 - Math.exp(-rate * Math.min(delta, 0.1));
    camera.position.lerp(shot.position, k);
    look.current.lerp(shot.look, k);
    camera.lookAt(look.current);
    if (shot.fov !== undefined) {
      const cam = camera as THREE.PerspectiveCamera;
      if (cam.isPerspectiveCamera) {
        cam.fov = THREE.MathUtils.lerp(cam.fov, shot.fov, k);
        cam.updateProjectionMatrix();
      }
    }
  });
}
