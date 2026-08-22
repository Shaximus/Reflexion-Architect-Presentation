import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const _desired = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

export function CameraRig({
  target,
  look,
  reduced,
}: {
  target: [number, number, number];
  look: [number, number, number];
  reduced: boolean;
}) {
  const lookCur = useRef(new THREE.Vector3(look[0], look[1], look[2]));

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    const k = 1 - Math.exp(-2.4 * d);
    const px = reduced ? 0 : state.pointer.x * 1.15;
    const py = reduced ? 0 : state.pointer.y * 0.55;
    _desired.set(target[0] + look[0] + px, target[1] + py, target[2]);
    state.camera.position.lerp(_desired, k);
    _targetLook.set(look[0], look[1], look[2]);
    lookCur.current.lerp(_targetLook, k);
    state.camera.lookAt(lookCur.current);
  });

  return null;
}
