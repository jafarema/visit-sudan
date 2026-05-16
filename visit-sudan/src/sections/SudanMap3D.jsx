import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

const HOTSPOTS = [
  { id: "meroe", name: "Meroë", pos: [0.4, 0.9, 0.05], copy: "Pyramids in the desert." },
  { id: "khartoum", name: "Khartoum", pos: [0.05, 0.0, 0.05], copy: "Two Niles, one heart." },
  { id: "portsudan", name: "Port Sudan", pos: [1.55, 1.05, 0.05], copy: "Red Sea light." },
  { id: "jebel", name: "Jebel Barkal", pos: [-0.55, 0.7, 0.05], copy: "Sacred mountain." },
  { id: "nubia", name: "Nubian Villages", pos: [-0.3, 1.4, 0.05], copy: "Colour and home." },
  { id: "dinder", name: "Dinder", pos: [0.65, -0.65, 0.05], copy: "Wild parkland." },
];

/** Abstract low-poly land shape. Not a real geography — a sculpture. */
function LandShape() {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.2) * 0.05;
  });
  // Build an irregular blob via TorusKnotGeometry, flattened — feels like a relief map.
  return (
    <group ref={ref}>
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshStandardMaterial
          color="#1a120a"
          flatShading
          metalness={0.2}
          roughness={0.85}
          wireframe={false}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[2.42, 1]} />
        <meshBasicMaterial color="#D9A441" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Hotspot({ h, onSelect, active }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    const k = 1 + Math.sin(s.clock.elapsedTime * 2 + h.pos[0]) * 0.18;
    ref.current.scale.setScalar(active ? 1.6 : k);
  });
  return (
    <Float speed={1.2} floatIntensity={0.4}>
      <group position={h.pos}>
        <mesh ref={ref} onClick={(e) => (e.stopPropagation(), onSelect(h))}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#F4D58D" toneMapped={false} />
        </mesh>
        <Html
          distanceFactor={6}
          position={[0.13, 0, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-ultra text-goldSoft"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            {h.name}
          </span>
        </Html>
      </group>
    </Float>
  );
}

export default function SudanMap3D() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="map"
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      <Canvas camera={{ position: [0, 1.4, 5.6], fov: 48 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#08070A"]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 3]} intensity={2.2} color="#F4D58D" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#0E5A7A" />
        <Suspense fallback={null}>
          <LandShape />
          {HOTSPOTS.map((h) => (
            <Hotspot
              key={h.id}
              h={h}
              active={selected?.id === h.id}
              onSelect={setSelected}
            />
          ))}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>

      {/* corner labels */}
      <div className="pointer-events-none absolute left-6 top-6 eyebrow md:left-10 md:top-10">
        Map · 07 / 09
      </div>
      <div className="pointer-events-none absolute right-6 top-6 max-w-xs text-right text-[10px] uppercase tracking-ultra font-mono text-bone/45 md:right-10 md:top-10">
        Click a beacon to read its story
      </div>

      {/* center title */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
        <h2 className="font-display text-5xl tracking-mega md:text-8xl">
          A country, <span className="italic text-gold-gradient">in light.</span>
        </h2>
      </div>

      {/* selected destination card */}
      {selected && (
        <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2">
          <div className="rounded-3xl border border-bone/10 bg-ink/75 p-6 backdrop-blur-xl md:min-w-[22rem]">
            <p className="eyebrow">Destination</p>
            <h3 className="font-display mt-2 text-3xl tracking-tight">
              {selected.name}
            </h3>
            <p className="mt-2 text-bone/72">{selected.copy}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 text-[10px] uppercase tracking-ultra font-mono text-bone/55 hover:text-gold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
