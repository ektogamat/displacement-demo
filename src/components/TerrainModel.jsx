import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { AdditiveBlending, DoubleSide } from "three";
import { easing } from "maath";
import { useTexture } from "@react-three/drei";

export default function TerrainModel() {
  const snap = useSnapshot(state);
  const dispMap = useTexture("/hightmap.png");
  const ref = useRef();
  const groupRef = useRef();

  const camera = useThree((state) => state.camera);

  useFrame((state, delta) => {
    easing.damp(camera, "fov", snap.hover ? 65 : 25, 0.9, delta);

    if (ref.current) {
      easing.damp(
        ref.current.material,
        "displacementScale",
        snap.hover ? 6 : 0,
        1,
        delta
      );
    }
    if (ref.current) {
      easing.damp(ref.current.position, "y", snap.hover ? -3 : 0, 1.2, delta);
    }

    camera.updateProjectionMatrix();
  });

  return (
    <>
      <group ref={groupRef} dispose={null}>
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 20, 200, 100]} />
          <meshPhysicalMaterial
            color={"#42E8FF"}
            side={DoubleSide}
            transparent
            displacementMap={dispMap}
            blending={AdditiveBlending}
            wireframe
          />
        </mesh>
      </group>
    </>
  );
}
