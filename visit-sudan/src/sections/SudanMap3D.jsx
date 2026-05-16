import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sudan map — used to be a Three.js OrbitControls scene, which was the
 * second-heaviest canvas on the page and felt slow on lower-end GPUs.
 *
 * This is the same idea (abstract relief shape, glowing hotspots, click
 * to read) drawn in pure SVG. It loads instantly, runs at 60fps without
 * touching the GPU, and reads as a calm, editorial diagram instead of a
 * janky 3D toy.
 */

const HOTSPOTS = [
  { id: "meroe", name: "Meroë", x: 58, y: 38, copy: "Pyramids in the desert." },
  { id: "khartoum", name: "Khartoum", x: 50, y: 56, copy: "Two Niles, one heart." },
  { id: "portsudan", name: "Port Sudan", x: 78, y: 30, copy: "Red Sea light." },
  { id: "jebel", name: "Jebel Barkal", x: 42, y: 40, copy: "Sacred mountain." },
  { id: "nubia", name: "Nubian Villages", x: 46, y: 22, copy: "Colour and home." },
  { id: "dinder", name: "Dinder", x: 60, y: 72, copy: "Wild parkland." },
];

// Soft, abstract Sudan-shaped polygon. Not a real border — a sculpture.
const COUNTRY_PATH =
  "M40,18 L60,16 L72,22 L84,32 L80,46 L78,62 L70,76 L58,84 L46,82 L36,76 L30,62 L26,46 L28,32 L34,22 Z";

export default function SudanMap3D() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="map"
      className="relative min-h-screen overflow-hidden bg-void px-6 py-24 md:px-10"
    >
      {/* warm ambient breath */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(217,164,65,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_minmax(420px,1.2fr)]">
        <div>
          <p className="eyebrow">Map · 07 / 09</p>
          <h2 className="font-display mt-4 text-5xl tracking-mega md:text-7xl">
            A country,{" "}
            <span className="italic text-gold-gradient">in light.</span>
          </h2>
          <p className="mt-5 max-w-md text-bone/70">
            Six destinations, one journey. Hover or tap a beacon to see what
            that part of Sudan feels like.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-bone/70">
            {HOTSPOTS.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => setSelected(h)}
                  className={
                    "text-left transition " +
                    (selected?.id === h.id
                      ? "text-gold"
                      : "hover:text-gold")
                  }
                >
                  <span className="mr-2 text-bone/40 font-mono text-xs">
                    {String(HOTSPOTS.indexOf(h) + 1).padStart(2, "0")}
                  </span>
                  {h.name}
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-8 rounded-2xl border border-bone/10 bg-ink/70 p-5"
              >
                <p className="eyebrow">Destination</p>
                <h3 className="font-display mt-1 text-2xl tracking-tight">
                  {selected.name}
                </h3>
                <p className="mt-2 text-bone/70">{selected.copy}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative aspect-square w-full max-w-xl">
          <svg
            viewBox="0 0 110 110"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Map of Sudan with destination beacons"
          >
            <defs>
              <radialGradient id="land" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#3a2410" />
                <stop offset="100%" stopColor="#0e0905" />
              </radialGradient>
              <radialGradient id="beacon" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F4D58D" stopOpacity="1" />
                <stop offset="100%" stopColor="#F4D58D" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* land mass */}
            <path
              d={COUNTRY_PATH}
              fill="url(#land)"
              stroke="#D9A441"
              strokeOpacity="0.45"
              strokeWidth="0.4"
            />

            {/* faint grid for depth */}
            <g
              stroke="#D9A441"
              strokeOpacity="0.07"
              strokeWidth="0.15"
              fill="none"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 12 + 5} x2="110" y2={i * 12 + 5} />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 12 + 5} y1="0" x2={i * 12 + 5} y2="110" />
              ))}
            </g>

            {/* Nile schematic */}
            <path
              d="M50,90 C 48,75 52,65 50,55 C 48,45 52,35 50,20"
              fill="none"
              stroke="#0E5A7A"
              strokeOpacity="0.7"
              strokeWidth="0.7"
            />

            {/* hotspots */}
            {HOTSPOTS.map((h) => {
              const active = selected?.id === h.id;
              return (
                <g
                  key={h.id}
                  onClick={() => setSelected(h)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={active ? 5 : 3.6}
                    fill="url(#beacon)"
                  />
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r="1.1"
                    fill="#F4D58D"
                  >
                    <animate
                      attributeName="r"
                      values="1.1;1.5;1.1"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={h.x + 2.4}
                    y={h.y + 0.5}
                    fontSize="2"
                    fontFamily="JetBrains Mono, monospace"
                    fill="#F4D58D"
                    fillOpacity={active ? 1 : 0.75}
                    style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    {h.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
