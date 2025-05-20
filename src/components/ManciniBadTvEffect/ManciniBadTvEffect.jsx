// Created by Anderson Mancini 2025
// React Three Fiber Mancini Bad Tv Effect
// To be used Effect together with react-three/postprocessing
import { useThree } from "@react-three/fiber";
import { BlendFunction, Effect } from "postprocessing";
import { useRef, useMemo, useLayoutEffect } from "react";
import * as THREE from "three";
import { wrapEffect } from "./util";

const BadTvShader = {
  fragmentShader: /* glsl */ `
  uniform float time;
  uniform vec2 resolution;

  // Ashima Arts noise functions
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                      -0.577350269189626,
                      0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float rand(vec2 co) {
    return fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453);
  }

  vec2 mainUV(vec2 uv) {
    float t = time * 2.0;
    float noise = max(0.0, snoise(vec2(t, uv.y * 0.3)) - 0.3) * (1.0 / 0.7);
    noise = noise + (snoise(vec2(t*10.0, uv.y * 2.4)) - 0.5) * 0.15;
    float xpos = uv.x - noise * noise * 0.05;
    return vec2(xpos, uv.y);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 distortedUV = mainUV(uv);
    vec4 color = texture2D(inputBuffer, distortedUV);
    float t = time * .2;
    float noise = max(0.0, snoise(vec2(t, distortedUV.y * 0.3)) - 0.3) * (1.0 / 0.7);
    if (floor(mod(gl_FragCoord.y * 0.4, 2.0)) == 0.0) {
      color.rgb *= 1.0 - (2.0 * noise);
    }
    float rChannel = color.r;
    float gChannel = texture2D(inputBuffer, distortedUV + vec2(noise * 0.08, 0.0)).g;
    float bChannel = texture2D(inputBuffer, distortedUV - vec2(noise * 0.01, 0.0)).b;
    color.g = mix(color.g, gChannel, 2.05);
    color.b = mix(color.b, bChannel, 3.05);
    outputColor = color;
  }
`,
};

export class BadTvEffect extends Effect {
  constructor({ blendFunction = BlendFunction.NORMAL, enabled = true } = {}) {
    super("BadTvEffect", BadTvShader.fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ["time", new THREE.Uniform(0.0)],
        [
          "resolution",
          new THREE.Uniform(
            new THREE.Vector2(window.innerWidth, window.innerHeight)
          ),
        ],
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get("time").value += deltaTime;
  }
}

function ManciniBadTvEffect({ enabled = true }) {
  const effectRef = useRef();
  const { size } = useThree();
  const BadTv = wrapEffect(BadTvEffect);

  useLayoutEffect(() => {
    if (effectRef.current) {
      effectRef.current.uniforms
        .get("resolution")
        .value.set(size.width, size.height);
    }
  }, [size.width, size.height]);

  return useMemo(
    () => (
      <BadTv
        ref={effectRef}
        blendFunction={BlendFunction.SCREEN}
        enabled={enabled}
      />
    ),
    [enabled]
  );
}

export default ManciniBadTvEffect;
