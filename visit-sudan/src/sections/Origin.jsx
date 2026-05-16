import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";

import { createSandMaterial } from "../shaders/SandMaterial";
import GoldDustField from "../components/GoldDustField";
import { useHeartbeat } from "../lib/Heartbeat";
import useMotionSafe from "../lib/useMotionSafe";

/* ---------- 3D pieces ---------- */

function Pyramid({ position, scale = 1, color = "#D9A441", speed = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.18 * speed;
    ref.current.position.y =
      position[1] + Math.sin(s.clock.elapsedTime * 0.7 * speed) * 0.18;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <coneGeometry args={[1, 1.6, 4]} />
      <meshStandardMaterial
        color={color}
        metalness={0.85}
        roughness={0.22}
        emissive={color}
        emissiveIntensity={0.22}
      />
    </mesh>
  );
}

function SandTerrain() {
  const meshRef = useRef();
  const material = useMemo(() => createSandMaterial(), []);
  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.4, 0]}
      material={material}
    >
      <planeGeometry args={[80, 80, 160, 160]} />
    </mesh>
  );
}

function NileLightTrail() {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.material.opacity =
      0.35 + Math.sin(s.clock.elapsedTime * 0.7) * 0.12;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 1.5]}>
      <planeGeometry args={[14, 1.6]} />
      <meshBasicMaterial
        color="#0E5A7A"
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Mouse parallax + slow scroll-driven camera dolly across the Origin scene.
 *
 * Scroll progress is read from window.scrollY relative to the section's own
 * rect, so the camera move only happens while the hero is visible.
 */
function CameraRig({ targetRef }) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(() => {
    const m = (window.__mouseN ||= { x: 0, y: 0 });
    mouse.current.x += (m.x - mouse.current.x) * 0.04;
    mouse.current.y += (m.y - mouse.current.y) * 0.04;

    let progress = 0;
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const total = rect.height - size.height;
      if (total > 0) {
        progress = Math.min(
          1,
          Math.max(0, (-rect.top) / total),
        );
      }
    }

    // 5 keyframes: high overhead -> through dunes -> close on pyramids.
    const path = [
      [0, 4.5, 12],
      [-1.5, 2.6, 9],
      [1, 1.4, 7],
      [2.5, 0.9, 5.5],
      [-0.8, 0.5, 4.2],
    ];
    const f = progress * (path.length - 1);
    const i = Math.floor(f);
    const t = f - i;
    const a = path[i];
    const b = path[Math.min(path.length - 1, i + 1)];
    const cx = a[0] + (b[0] - a[0]) * t + mouse.current.x * 0.6;
    const cy = a[1] + (b[1] - a[1]) * t - mouse.current.y * 0.4;
    const cz = a[2] + (b[2] - a[2]) * t;
    camera.position.set(cx, cy, cz);
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

/* ---------- DOM section ---------- */

export default function Origin() {
  const sectionRef = useRef(null);
  const safe = useMotionSafe();
  const pulse = useHeartbeat((s) => s.pulse);

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative h-[180vh] w-full"
      onMouseMove={(e) => {
        // exposes a normalized [-1,1] mouse to the Three.js loop without
        // creating extra React state.
        window.__mouseN = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Canvas
            shadows
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 4.5, 12], fov: 52 }}
          >
            <color attach="background" args={["#08070A"]} />
            <fog attach="fog" args={["#08070A", 7, 26]} />

            <ambientLight intensity={0.32} />
            <directionalLight
              position={[6, 9, 4]}
              intensity={1.4}
              color="#F4D58D"
              castShadow
            />
            <pointLight
              position={[-7, 3, -4]}
              intensity={2.2}
              color="#0E5A7A"
            />
            <pointLight
              position={[6, 1.5, 4]}
              intensity={1.2}
              color="#B3261E"
            />

            <Suspense fallback={null}>
              <Stars
                radius={60}
                depth={28}
                count={safe ? 2400 : 800}
                factor={3}
                fade
                speed={0.6}
              />
              <SandTerrain />
              <NileLightTrail />

              <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
                <Pyramid position={[-3, 0, -1]} scale={1.5} />
                <Pyramid
                  position={[2.5, -0.4, 0]}
                  scale={1.1}
                  color="#F4D58D"
                  speed={0.8}
                />
                <Pyramid position={[0, -0.8, 2]} scale={0.85} speed={1.3} />
                <Pyramid position={[5, 0.4, -3]} scale={1.7} />
                <Pyramid
                  position={[-5.5, -0.2, -4]}
                  scale={1.3}
                  color="#F4D58D"
                />
                <Pyramid
                  position={[-2.4, -0.6, 3.5]}
                  scale={0.7}
                  speed={1.5}
                />
              </Float>

              {safe && <GoldDustField count={1500} />}

              <Environment preset="sunset" />
            </Suspense>

            <CameraRig targetRef={sectionRef} />

            {safe && (
              <EffectComposer>
                <Bloom
                  intensity={1.15}
                  luminanceThreshold={0.22}
                  luminanceSmoothing={0.9}
                  mipmapBlur
                />
                <Vignette eskil={false} offset={0.15} darkness={1.05} />
              </EffectComposer>
            )}
          </Canvas>
        </div>

        {/* atmospheric overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/20 via-void/30 to-void" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-void" />

        {/* hero copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 md:px-10 md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="eyebrow"
          >
            Origin · 01 / 09
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display mt-3 text-[14vw] leading-[0.82] tracking-mega md:text-[10rem]"
          >
            Sudan,
            <br />
            <span
              className="italic text-gold-gradient"
              style={{
                display: "inline-block",
                transform: `scale(${1 + pulse * 0.03})`,
                transition: "transform 0.15s ease-out",
              }}
            >
              untold.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.95 }}
            className="mt-7 max-w-xl text-lg leading-7 text-bone/72 md:text-xl"
          >
            Before empires had names, Sudan was already ancient. A land of gold
            deserts, sacred mountains, river kingdoms, and a hospitality that
            arrives before the doors open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#journeys" className="btn-gold text-center">
              Explore destinations
            </a>
            <a href="#contact" className="btn-ghost text-center">
              Plan your journey
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
