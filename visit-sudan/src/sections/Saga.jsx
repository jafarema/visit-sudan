import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    era: "3000 BC",
    title: "Kerma",
    line: "Africa's first urban civilisation rose by the Nile, written in clay and gold.",
  },
  {
    era: "1500 BC",
    title: "Kush",
    line: "A kingdom that once ruled Egypt itself. Ancient, brilliant, half-forgotten.",
  },
  {
    era: "300 BC",
    title: "Meroë",
    line: "Pyramids climb the desert. Queens and ironworkers rule the sand.",
  },
  {
    era: "Today",
    title: "Sudan, Untold",
    line: "The story continues — in markets and music and wind and warmth.",
  },
];

/**
 * One Chapter component per slide so each can subscribe to its own
 * useTransform. Crossfade + slide only — no blur filters (those caused
 * jank on the big serif headings).
 */
function Chapter({ chapter, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, end - 0.06, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [start, end], [60, -60]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="eyebrow text-goldSoft">{chapter.era}</p>
      <h3 className="font-display mt-4 text-6xl leading-[0.9] tracking-mega md:text-[12rem]">
        <span className="italic text-gold-gradient">{chapter.title}</span>
      </h3>
      <p className="mt-6 max-w-2xl text-lg text-bone/72 md:text-2xl">
        {chapter.line}
      </p>
    </motion.div>
  );
}

export default function Saga() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="saga"
      ref={ref}
      // Was 500vh — way too long for 4 chapters. 280vh gives each slide ~70vh
      // of dwell time, which reads cleanly without feeling like a tunnel.
      className="relative h-[280vh] bg-void"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(217,164,65,0.16), transparent 65%)",
          }}
        />
        {CHAPTERS.map((c, i) => (
          <Chapter
            key={c.title}
            chapter={c}
            index={i}
            total={CHAPTERS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="absolute left-6 top-6 eyebrow md:left-10 md:top-10">
          Saga · 04 / 09
        </div>
        <div className="absolute right-6 bottom-6 eyebrow md:right-10 md:bottom-10">
          A history older than memory
        </div>
      </div>
    </section>
  );
}
