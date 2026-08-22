import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Starfield } from "@/components/presentation/world/Starfield";

export function VoidCanvas({ mobile }: { mobile: boolean }) {
  if (mobile) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.4, 14], fov: 42, near: 0.1, far: 220 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%", background: "#07070a", pointerEvents: "none" }}
      >
        <color attach="background" args={["#07070a"]} />
        <ambientLight intensity={0.2} />
        <Starfield count={1100} />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.22} luminanceThreshold={0.28} luminanceSmoothing={0.5} mipmapBlur />
          <Vignette darkness={0.72} offset={0.22} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
