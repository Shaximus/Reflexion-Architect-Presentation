import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useDeck } from "@/presentation/engine/store";

const _desired = new THREE.Vector3();
const _look = new THREE.Vector3();
const _focus = new THREE.Vector3();

export function CameraRig({
  target,
  look = [0, 0.35, 0],
  reduced,
}: {
  target: [number, number, number];
  look?: [number, number, number];
  reduced: boolean;
}) {
  const explore = useDeck((s) => s.mode === "explore");
  const lookAt = useDeck((s) => s.lookAt);
  const lookCur = useRef(new THREE.Vector3(look[0], look[1], look[2]));
  const controls = useRef<any>(null);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    const k = 1 - Math.exp(-2.6 * d);
    if (lookAt) _focus.set(lookAt[0], lookAt[1], lookAt[2]);

    if (explore) {
      if (lookAt && controls.current) {
        controls.current.target.lerp(_focus, k);
      }
      return;
    }

    const px = reduced ? 0 : state.pointer.x * 0.85;
    const py = reduced ? 0 : state.pointer.y * 0.4;
    if (lookAt) {
      _desired.set(_focus.x + px * 0.55, _focus.y + 1.05 + py * 0.4, _focus.z + 7.2);
      _look.copy(_focus);
    } else {
      _desired.set(target[0] + look[0] + px, target[1] + py, target[2]);
      _look.set(look[0], look[1], look[2]);
    }
    state.camera.position.lerp(_desired, k);
    lookCur.current.lerp(_look, k);
    state.camera.lookAt(lookCur.current);
  });

  if (!explore) return null;
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={26}
      target={[look[0], look[1], look[2]]}
      enablePan={false}
    />
  );
}
