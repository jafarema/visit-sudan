import * as THREE from "three";

/**
 * Custom GLSL desert sand material.
 *
 * - Vertex shader: layered fbm noise + slow sine wind to deform the plane
 *   into living dunes.
 * - Fragment shader: height-based color ramp (deep ink -> sand -> gold-soft)
 *   plus a sharp specular "sun glint" on crests for that warm cinematic feel.
 *
 * Usage:
 *   const mat = createSandMaterial();
 *   useFrame((s) => { mat.uniforms.uTime.value = s.clock.elapsedTime; });
 *   <mesh material={mat} ...>
 */
export function createSandMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color("#0a0805") },
      uColorMid: { value: new THREE.Color("#3a2a14") },
      uColorHigh: { value: new THREE.Color("#D9A441") },
      uColorGlint: { value: new THREE.Color("#F4D58D") },
      uFogColor: { value: new THREE.Color("#08070A") },
      uFogNear: { value: 8.0 },
      uFogFar: { value: 28.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying float vHeight;
      varying float vFog;
      uniform float uTime;

      // hash + value noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      // 4-octave fbm for layered dune detail
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * vnoise(p);
          p *= 2.07;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vUv = uv;
        vec3 p = position;

        // Slow drifting wind ripples in two directions.
        float wind1 = sin(p.x * 0.55 + uTime * 0.18) * 0.18;
        float wind2 = cos(p.y * 0.38 - uTime * 0.12) * 0.14;

        // Big dune shapes from fbm; small ripple detail.
        float dune = fbm(p.xy * 0.18 + vec2(uTime * 0.015, 0.0)) * 1.6;
        float ripple = vnoise(p.xy * 1.4 + uTime * 0.08) * 0.08;

        p.z += dune + wind1 + wind2 + ripple - 0.6;

        vHeight = p.z;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        // pass camera-space depth for fragment fog
        vFog = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      varying float vHeight;
      varying float vFog;
      uniform vec3 uColorDeep;
      uniform vec3 uColorMid;
      uniform vec3 uColorHigh;
      uniform vec3 uColorGlint;
      uniform vec3 uFogColor;
      uniform float uFogNear;
      uniform float uFogFar;

      void main() {
        float h = smoothstep(-0.6, 0.9, vHeight);

        // Layered color ramp: ink -> sand-mid -> gold.
        vec3 col = mix(uColorDeep, uColorMid, smoothstep(0.0, 0.45, h));
        col = mix(col, uColorHigh, smoothstep(0.4, 0.9, h));

        // Crest glint: a tight specular highlight on dune tops.
        float glint = pow(smoothstep(0.7, 1.0, h), 4.0);
        col += uColorGlint * glint * 0.45;

        // Subtle vignette darkening towards edges (uv-driven).
        float vig = smoothstep(0.95, 0.3, distance(vUv, vec2(0.5)));
        col *= mix(0.55, 1.0, vig);

        // Distance fog so dunes blend into the void background.
        float fogFactor = clamp((vFog - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
        col = mix(col, uFogColor, fogFactor);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}
