import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "origin", label: "Origin", sub: "Where Sudan begins" },
  { id: "land", label: "Land", sub: "Desert, mountains, light" },
  { id: "water", label: "Water", sub: "The Nile and the Red Sea" },
  { id: "saga", label: "Saga", sub: "A history older than memory" },
  { id: "culture", label: "Culture", sub: "People, coffee, color" },
  { id: "journeys", label: "Journeys", sub: "Routes and experiences" },
  { id: "map", label: "Map", sub: "A country, in light" },
  { id: "pricing", label: "Pricing", sub: "Shape your trip" },
  { id: "contact", label: "Contact", sub: "Plan your trip" },
];

const MARQUEE = [
  "Sudan, Untold",
  "Meroë",
  "The Nile",
  "Red Sea",
  "Jebel Barkal",
  "Nubian Villages",
  "Desert Silence",
  "Khartoum",
  "Suakin",
  "Coffee Ritual",
];

export default function MegaMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "-3%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[110] bg-void/95 backdrop-blur-2xl"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 md:p-8">
              <span className="font-display text-lg">Visit Sudan</span>
              <button
                onClick={onClose}
                className="text-[10px] uppercase tracking-ultra font-mono hover:text-gold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-auto px-6 md:px-12">
              <div className="mx-auto flex max-w-6xl flex-col">
                {SECTIONS.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={onClose}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: "easeOut" }}
                    className="group flex items-baseline justify-between border-t border-bone/10 py-4 transition hover:text-gold md:py-5"
                  >
                    <span className="font-display text-4xl tracking-tight md:text-7xl">
                      {String(i + 1).padStart(2, "0")} <span className="ml-3 italic">{s.label}</span>
                    </span>
                    <span className="hidden text-[10px] uppercase tracking-ultra font-mono text-bone/40 group-hover:text-bone md:block">
                      {s.sub}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden border-t border-bone/10 py-5">
              <div className="flex gap-12 whitespace-nowrap font-mono text-[10px] uppercase tracking-ultra text-bone/40 [animation:scrollX_30s_linear_infinite]">
                {Array.from({ length: 6 }).flatMap(() => MARQUEE).map((t, i) => (
                  <span key={i}>
                    {t} <span className="text-gold ml-3">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
