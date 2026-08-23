import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import { getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { Starfield, GroundGlow } from "@/components/presentation/world/Starfield";
import { CameraRig } from "./CameraRig";
import { Label3 } from "./primitives";
import { Scene3D } from "./Scene3D";

function Lights({ accent }: { accent: string }) {
  return (
    <>
      <color attach="background" args={["#07070a"]} />
      <ambientLight intensity={0.34} />
      <pointLight position={[6, 8, 6]} intensity={20} color="#e4c36b" distance={42} />
      <pointLight position={[-8, 4, 4]} intensity={14} color={accent} distance={36} />
      <pointLight position={[0, -4, 8]} intensity={9} color="#4ecdc4" distance={28} />
      <directionalLight position={[4, 10, 2]} intensity={0.45} color="#f3efe6" />
    </>
  );
}

function Inner({ mobile }: { mobile: boolean }) {
  const index = useDeck((s) => s.index);
  const model = getModel(index);
  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const accent = model.cards?.[0]?.accent === "teal" ? "#4ecdc4" : "#e94560";
  return (
    <>
      {/* Font warm-up: drei <Text> suspends ONCE per [font, characters] pair.
          Mounting one hidden label here forces that suspension to happen at
          canvas mount — covered by the stage fallback — instead of blanking
          the whole canvas the first time a scene with labels appears. */}
      <group visible={false} position={[0, -999, 0]}>
        <Label3 position={[0, 0, 0]}>·</Label3>
      </group>
      <Lights accent={accent} />
      <Starfield count={mobile ? 700 : 1500} />
      <GroundGlow />
      {!reduced && !mobile && <Sparkles count={36} scale={[12, 6, 8]} size={2.2} speed={0.35} color="#e4c36b" opacity={0.5} />}
      <group position={[0, 0.2, 0]}>
        <Scene3D key={model.id} />
      </group>
      <CameraRig target={model.camera} look={[0, 0.35, 0]} reduced={reduced || mobile} />
      {!mobile && !reduced && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.72} luminanceThreshold={0.18} luminanceSmoothing={0.42} mipmapBlur />
          <Vignette darkness={0.62} offset={0.24} />
        </EffectComposer>
      )}
    </>
  );
}

export function WorldCanvas({ mobile }: { mobile?: boolean }) {
  // Where the pointer went down, in client coords. onPointerMissed fires on
  // the click at the END of an OrbitControls drag too; without this guard,
  // orbiting the camera in EXPLORE mode silently cleared the selection.
  const down = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      className="h-full min-h-[14rem] w-full overflow-hidden rounded-2xl border border-border/50 bg-void"
      onPointerDownCapture={(e) => {
        down.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <Canvas
        camera={{ position: [0, 0.8, 12], fov: 42, near: 0.1, far: 220 }}
        dpr={mobile ? [1, 1.2] : [1, 1.55]}
        gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "#07070a" }}
        onPointerMissed={(e) => {
          const d = down.current;
          if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) return; // drag, not a click
          useDeck.getState().selectEntity(null);
        }}
      >
        <Suspense fallback={null}>
          <Inner mobile={Boolean(mobile)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
