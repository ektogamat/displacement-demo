import { useRef } from "react";
import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import ManciniBadTvEffect from "./ManciniBadTvEffect/ManciniBadTvEffect";
export default function LightsAndEffects() {
  const ref = useRef();
  const bloomRef = useRef();

  return (
    <>
      <directionalLight
        intensity={1.6}
        color={"#269bdd"}
        position={[1, 3, 0]}
      />
      <pointLight
        distance={3}
        ref={ref}
        position={[0, 1.5, 0]}
        color={"#42E8FF"}
        intensity={20.5}
      />
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom
          ref={bloomRef}
          mipmapBlur
          radius={1}
          intensity={0.5}
          luminanceThreshold={0.1}
          levels={5}
        />
        <Bloom
          mipmapBlur
          radius={1}
          intensity={0.8}
          opacity={0.5}
          luminanceThreshold={0.1}
          levels={7}
        />

        <BrightnessContrast brightness={-0.1} contrast={-0.25} />
        <HueSaturation saturation={0.2} />
        <Vignette darkness={0.5} />
        <ManciniBadTvEffect />
      </EffectComposer>
    </>
  );
}
