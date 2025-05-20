import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "./Particles";
import LightsAndEffects from "./components/LightsAndEffects";
import TerrainModel from "./components/TerrainModel";
import canvasProps from "./constants";

export function App() {
  return (
    <Canvas {...canvasProps}>
      <color attach="background" args={["#003133"]} />
      <fog attach="fog" args={["#269bdd", 3, 20]} />
      <TerrainModel />
      <LightsAndEffects />
      <Particles particlesCount={300} />
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={1.565}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.05}
      />
    </Canvas>
  );
}
