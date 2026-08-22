import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";
import { SCENES } from "@/lib/presentation/scenes";
import { hasBriefingBody, isBottomHeavy } from "@/lib/presentation/types";
import { useDeck } from "@/lib/presentation/store";
import { CameraRig } from "./CameraRig";
import { GroundGlow, Starfield } from "./Starfield";
import { SceneVisual } from "./Visuals";

function Lights({ accent }: { accent: string }) {
  return (
    <>
      <color attach="background" args={["#07070a"]} />
      <ambientLight intensity={0.32} />
      <pointLight position={[6, 8, 6]} intensity={22} color="#e4c36b" distance={42} />
      <pointLight position={[-8, 4, 4]} intensity={16} color={accent} distance={36} />
      <pointLight position={[0, -4, 8]} intensity={10} color="#4ecdc4" distance={28} />
      <directionalLight position={[4, 10, 2]} intensity={0.5} color="#f3efe6" />
    </>
  );
}

function SceneInner({ mobile }: { mobile: boolean }) {
  const index = useDeck((s) => s.index);
  const scene = SCENES[index] ?? SCENES[0];
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const bottomHeavy = isBottomHeavy(scene);
  const body = hasBriefingBody(scene);
  const shiftX = mobile || bottomHeavy || !body ? 0 : -1.45;

  const accent =
    scene.cards?.[0]?.accent === "teal"
      ? "#4ecdc4"
      : scene.visual === "genesis"
        ? "#e4c36b"
        : "#e94560";

  return (
    <>
      <Lights accent={accent} />
      <Starfield count={mobile ? 800 : 1800} />
      <GroundGlow />
      {!reduced && (
        <Sparkles
          count={mobile ? 22 : 64}
          scale={[14, 7, 9]}
          size={2.6}
          speed={0.4}
          color="#e4c36b"
          opacity={0.62}
        />
      )}
      <group position={[shiftX, 0.35, 0]}>
        <SceneVisual key={scene.id} scene={scene} />
      </group>
      <CameraRig target={scene.camera} look={[shiftX, 0.35, 0]} reduced={reduced || mobile} />
      {!mobile && !reduced && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.82} luminanceThreshold={0.16} luminanceSmoothing={0.4} mipmapBlur />
          <Vignette darkness={0.68} offset={0.26} />
        </EffectComposer>
      )}
    </>
  );
}

export function CanvasScene({ mobile }: { mobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 12], fov: 40, near: 0.1, far: 220 }}
      dpr={mobile ? [1, 1.25] : [1, 1.7]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "#07070a" }}
      onPointerMissed={() => useDeck.getState().setFocus(null)}
    >
      <Suspense fallback={null}>
        <SceneInner mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
