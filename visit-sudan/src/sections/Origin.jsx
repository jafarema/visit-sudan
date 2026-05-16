import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
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
    <mesh ref={ref} position={position} scale={scale}>
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
  // Lower segment count: 80x80 (=6,400 verts) instead of 160x160 (=25,600).
  // The wind/fbm shader still reads beautifully and the GPU recovers a lot.
  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.4, 0]}
      material={material}
    >
      <planeGeometry args={[80, 80, 80, 80]} />
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
 * Reads the section's bounding rect each frame so the camera move is local
 * to the hero and doesn't fight scroll elsewhere.
 */
function CameraRig({ targetRef }) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(() => {
    const m = (window.__mouseN ||= { x: 0, y: 0 });
    mouse.current.x += (m.x - mouse.current.x) * 0.06;
    mouse.current.y += (m.y - mouse.current.y) * 0.06;

    let progress = 0;
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const total = rect.height - size.height;
      if (total > 0) {
        progress = Math.min(1, Math.max(0, -rect.top / total));
      }
    }

    // 3 keyframes (was 5): wide -> middle -> close. Smoother and snappier.
    const path = [
      [0, 4.0, 11],
      [0.6, 1.8, 7.5],
      [-0.4, 0.6, 4.6],
    ];
    const f = progress * (path.length - 1);
    const i = Math.floor(f);
    const t = f - i;
    const a = path[i];
    const b = path[Math.min(path.length - 1, i + 1)];
    const cx = a[0] + (b[0] - a[0]) * t + mouse.current.x * 0.5;
    const cy = a[1] + (b[1] - a[1]) * t - mouse.current.y * 0.3;
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
      // Was 180vh — 130vh is plenty of camera travel without dragging the
      // overall page into "infinite" territory.
      className="relative h-[130vh] w-full"
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
            // dpr capped lower (1.5 max) — the visual difference at 1.75 is
            // negligible, the perf difference is large on retina displays.
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 4.0, 11], fov: 52 }}
          >
            <color attach="background" args={["#08070A"]} />
            <fog attach="fog" args={["#08070A", 7, 26]} />

            {/* Three lights instead of four; the red rim was barely visible
                yet doubled the lighting cost on metallic pyramids. */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[6, 9, 4]}
              intensity={1.5}
              color="#F4D58D"
            />
            <pointLight
              position={[-7, 3, -4]}
              intensity={1.6}
              color="#0E5A7A"
            />

            <Suspense fallback={null}>
              <Stars
                radius={50}
                depth={20}
                count={safe ? 800 : 250}
                factor={3}
                fade
                speed={0.4}
              />
              <SandTerrain />
              <NileLightTrail />

              <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.4}>
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
              </Float>

              {safe && <GoldDustField count={500} />}
              {/* Removed Drei <Environment preset="sunset" /> — it pulls a ~1MB
                  HDR file from a CDN before the canvas renders. The directional
                  + Nile-blue fill light gives the same warm sunset feel without
                  the network cost. */}
            </Suspense>

            <CameraRig targetRef={sectionRef} />
            {/* Removed <EffectComposer><Bloom/><Vignette/></EffectComposer> —
                postprocessing is the single biggest perf cost in the scene.
                The pyramids are already emissive and the fog + page gradient
                provide a vignette. */}
          </Canvas>
        </div>

        {/* atmospheric overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/20 via-void/30 to-void" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-void" />
        {/* CSS-only vignette replacement */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 55%, transparent 0%, rgba(8,7,10,0.55) 100%)",
          }}
        />

        {/* hero copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow"
          >
            Origin · 01 / 09
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display mt-3 text-[15vw] leading-[0.85] tracking-mega md:text-[9rem]"
          >
            Sudan,
            <br />
            <span
              className="italic text-gold-gradient"
              style={{
                display: "inline-block",
                transform: `scale(${1 + pulse * 0.02})`,
                transition: "transform 0.15s ease-out",
              }}
            >
              untold.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-7 text-bone/75 md:text-lg"
          >
            Before empires had names, Sudan was already ancient. A land of gold
            deserts, sacred mountains, river kingdoms, and a hospitality that
            arrives before the doors open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
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
