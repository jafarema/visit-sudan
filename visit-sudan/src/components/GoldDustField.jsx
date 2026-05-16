import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Falling gold dust particle field.
 *
 * - Each particle has its own fall speed and a horizontal sway phase.
 * - When a particle falls below the floor, it respawns at the top.
 * - Uses additive blending so the dust glows against the dark void.
 */
export default function GoldDustField({
  count = 1500,
  spread = 24,
  height = 14,
  size = 0.04,
}) {
  const ref = useRef();

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = Math.random() * height - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      speeds[i] = 0.006 + Math.random() * 0.018;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count, spread, height]);

  useFrame((state) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      p[i3 + 1] -= speeds[i];
      p[i3 + 0] += Math.sin(t * 0.6 + phases[i]) * 0.0015;
      if (p[i3 + 1] < -2.5) {
        p[i3 + 0] = (Math.random() - 0.5) * spread;
        p[i3 + 1] = height;
        p[i3 + 2] = (Math.random() - 0.5) * spread;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    // Subtle whole-field rotation for parallax depth.
    ref.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F4D58D"
        size={size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
