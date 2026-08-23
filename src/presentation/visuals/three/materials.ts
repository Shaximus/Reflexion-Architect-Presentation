import { createElement } from "react";
import * as THREE from "three";
import { ACCENT_HEX } from "@/presentation/engine/types";

/**
 * Material language for the 3D art-direction overhaul.
 *
 * A small, curated set of *roles* (structural / information / active / memory /
 * jurisdiction) rather than a bag of geometry. Every factory returns a plain,
 * memoization-friendly props object that a scene can spread onto a
 * `<meshStandardMaterial>` / `<meshPhysicalMaterial>`. Emissive is only ever
 * used where it means something (active / live state); idle is kept nearly still
 * so that light reads as STATE, not decoration.
 *
 * These files are purely additive — nothing here is wired into a scene yet.
 */

const Additive = THREE.AdditiveBlending;
export { Additive };

/**
 * The palette. Mirrors the real `ACCENT_HEX` from types.ts (do not invent
 * hexes) plus the void + ivory editorial tones the north-star asks for.
 */
export const PALETTE = {
  void: "#07070a",
  ivory: "#f3efe6",
  gold: ACCENT_HEX.gold,
  crimson: ACCENT_HEX.crimson,
  teal: ACCENT_HEX.teal,
  purple: ACCENT_HEX.purple,
  green: ACCENT_HEX.green,
  cyan: ACCENT_HEX.cyan,
} as const;

export type ColorInput = string;

interface StandardProps {
  color: ColorInput;
  roughness: number;
  metalness: number;
  emissive: ColorInput;
  emissiveIntensity: number;
  transparent: boolean;
  opacity: number;
  side: THREE.Side;
  depthWrite: boolean;
}

interface PhysicalProps extends StandardProps {
  transmission: number;
  thickness: number;
  ior: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

interface FamilyOpts {
  /** selected / live state — the only thing allowed to emit light. */
  active?: boolean;
  /** dimmed because another entity owns the selection. */
  dim?: boolean;
  /** override the resting opacity. */
  opacity?: number;
  /** override the active emissive intensity ceiling. */
  intensity?: number;
  roughness?: number;
  metalness?: number;
  transmission?: number;
  thickness?: number;
}

/**
 * STRUCTURAL — metallic / stone / architectural. Low-mid roughness, real
 * metalness, a whisper of emissive. For boundaries, infrastructure, rules,
 * world architecture. Never glows on its own.
 */
export function structural(
  color: ColorInput,
  opts: FamilyOpts = {},
): StandardProps {
  const { dim } = opts;
  return {
    color,
    roughness: opts.roughness ?? 0.62,
    metalness: opts.metalness ?? 0.38,
    emissive: color,
    // Structural only ever carries a faint, static self-light; never a pulse.
    emissiveIntensity: dim ? 0.03 : 0.07,
    transparent: Boolean(dim),
    opacity: dim ? 0.26 : 1,
    side: THREE.FrontSide,
    depthWrite: !dim,
  };
}

/**
 * INFORMATION — translucent / spectral / refractive. Transmission + spectral
 * tint read as "signal / cognition / knowledge / probability". A ghost of
 * emissive is allowed because this family *is* about living information, but it
 * is held low and only brightens on an active state.
 */
export function information(
  color: ColorInput,
  opts: FamilyOpts = {},
): PhysicalProps {
  const { dim, active } = opts;
  const base = opts.opacity ?? 0.22;
  return {
    color,
    roughness: opts.roughness ?? 0.12,
    metalness: 0.02,
    emissive: color,
    emissiveIntensity: active ? 0.45 : dim ? 0.04 : 0.12,
    transparent: true,
    opacity: dim ? 0.1 : base,
    side: THREE.DoubleSide,
    depthWrite: false,
    transmission: opts.transmission ?? 0.9,
    thickness: opts.thickness ?? 0.5,
    ior: 1.25,
    clearcoat: 0.25,
    clearcoatRoughness: 0.2,
  };
}

/**
 * ACTIVE — emissive but tightly controlled. The only family permitted to pulse.
 * `base` is the ceiling; the pulse helper drives the actual value over time so
 * idle stays still and a selected / propagating node breathes.
 */
export function active(
  color: ColorInput,
  opts: FamilyOpts = {},
): StandardProps {
  const { dim } = opts;
  const ceiling = opts.intensity ?? 0.95;
  return {
    color,
    roughness: 0.22,
    metalness: 0.28,
    emissive: color,
    emissiveIntensity: dim ? 0.1 : activeRest(ceiling),
    transparent: true,
    opacity: dim ? 0.3 : 1,
    side: THREE.FrontSide,
    depthWrite: !dim,
  };
}

/**
 * MEMORY / HISTORY — layered transparent / ghost geometry. Low opacity, ghostly
 * emissive. For past states, provenance, previous branches, stored experience.
 */
export function memory(
  color: ColorInput,
  opts: FamilyOpts = {},
): StandardProps {
  const { dim } = opts;
  return {
    color,
    roughness: 0.35,
    metalness: 0.1,
    emissive: color,
    emissiveIntensity: dim ? 0.05 : 0.14,
    transparent: true,
    opacity: dim ? 0.08 : opts.opacity ?? 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  };
}

/**
 * JURISDICTION / LAW — hard planes / spatial fields / boundary look. Slightly
 * metallic, low roughness, a controlled emissive field. For gates,
 * permissions, containment, the World Referee.
 */
export function jurisdiction(
  color: ColorInput,
  opts: FamilyOpts = {},
): PhysicalProps {
  const { dim, active } = opts;
  return {
    color,
    roughness: opts.roughness ?? 0.4,
    metalness: opts.metalness ?? 0.5,
    emissive: color,
    emissiveIntensity: active ? 0.5 : dim ? 0.05 : 0.14,
    transparent: true,
    opacity: dim ? 0.1 : opts.opacity ?? 0.32,
    side: THREE.DoubleSide,
    depthWrite: false,
    transmission: opts.transmission ?? 0.4,
    thickness: 0.3,
    ior: 1.3,
    clearcoat: 0.15,
    clearcoatRoughness: 0.3,
  };
}

/** Resting emissive for the ACTIVE family — deliberately low so idle is still. */
export function activeRest(ceiling: number): number {
  return ceiling * 0.32;
}

/**
 * `selectionPulse` / `activeGlow` — the controlled emissive intensity over time
 * for the ACTIVE family. Idle returns a constant (nearly still); a selected /
 * propagating state breathes between a low and a high. Pure + side-effect free
 * so it is safe to call from `useFrame` or memoize.
 */
export function activePulse(
  elapsed: number,
  opts: { active: boolean; dim?: boolean; base?: number; rate?: number },
): number {
  const ceiling = opts.base ?? 0.95;
  if (opts.dim) return 0.1;
  const low = activeRest(ceiling);
  if (!opts.active) return low;
  const rate = opts.rate ?? 2.2;
  return low + (ceiling - low) * (0.5 + 0.5 * Math.sin(elapsed * rate));
}

/**
 * A single reusable active-glow driver: bind it to a material ref and it will
 * pulse that material's emissiveIntensity when `active` and hold it still
 * otherwise. Keeps every ACTIVE primitive visually consistent.
 */
export function useActiveGlow(opts: { active: boolean; dim?: boolean; base?: number }) {
  const base = opts.base ?? 0.95;
  return (elapsed: number) => activePulse(elapsed, { active: opts.active, dim: opts.dim, base });
}

/**
 * LIGHTING preset — replaces the flat 3-point setup with an ambient + key +
 * fill + rim rig that SCULPTS shape out of darkness (the north-star). Kept
 * restrained: the void does the heavy lifting, light only where it reveals a
 * silhouette or an active state.
 */
export const LIGHTING = {
  ambient: { intensity: 0.12, color: "#0d0d16" },
  key: {
    type: "directional" as const,
    position: [5, 9, 6] as [number, number, number],
    intensity: 1.25,
    color: PALETTE.gold,
  },
  fill: {
    type: "point" as const,
    position: [-7, 3, 5] as [number, number, number],
    intensity: 16,
    color: PALETTE.teal,
    distance: 34,
  },
  rim: {
    type: "directional" as const,
    position: [-3, -1.5, -9] as [number, number, number],
    intensity: 0.6,
    color: PALETTE.ivory,
  },
} as const;

/**
 * Drop-in sculpted lighting rig (additive). A later phase can swap this into
 * `WorldCanvas` in place of the flat lights; it is not wired in yet. Built with
 * `createElement` so the file stays a `.ts` material language with no JSX.
 */
export function SculptedLights({ accent = PALETTE.teal }: { accent?: string }) {
  return createElement(
    "group",
    null,
    createElement("ambientLight", { intensity: LIGHTING.ambient.intensity, color: LIGHTING.ambient.color }),
    createElement("directionalLight", {
      position: LIGHTING.key.position,
      intensity: LIGHTING.key.intensity,
      color: LIGHTING.key.color,
    }),
    createElement("pointLight", {
      position: LIGHTING.fill.position,
      intensity: LIGHTING.fill.intensity,
      color: accent,
      distance: LIGHTING.fill.distance,
    }),
    createElement("directionalLight", {
      position: LIGHTING.rim.position,
      intensity: LIGHTING.rim.intensity,
      color: LIGHTING.rim.color,
    }),
  );
}
