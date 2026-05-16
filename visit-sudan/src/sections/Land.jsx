import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "../components/SmartImage";
import { VISIT_SUDAN_IMAGES } from "../data/images";

/**
 * Pinned scroll scene. Cleaner, lighter than before:
 *  - Reduced section height (180vh down from 280vh) — feels less endless.
 *  - No `filter: blur()` ramp; was a major repaint cost on big text.
 *  - Image scales gently and fades the title in/out via opacity only.
 */
export default function Land() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0],
  );
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="land" className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale, y: yImg }} className="absolute inset-0">
          <SmartImage
            src={VISIT_SUDAN_IMAGES.jebelBarkal}
            alt="Jebel Barkal at sunset"
            className="h-full w-full"
            loading="eager"
          />
        </motion.div>

        {/* color grade + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/45 via-transparent to-void" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 60%, transparent 0%, rgba(8,7,10,0.55) 80%)",
          }}
        />

        <motion.div
          style={{ opacity, y: yText }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10"
        >
          <p className="eyebrow">Land · 02 / 09</p>
          <h2 className="font-display mt-5 text-6xl leading-[0.9] tracking-mega md:text-[10rem]">
            golden,
            <br />
            <span className="italic">silent,</span>
            <br />
            sacred.
          </h2>
          <p className="mt-6 max-w-xl text-base text-bone/75 md:text-lg">
            Jebel Barkal still glows at sunset. The desert holds its breath. A
            country that feels older than time itself, kept warm by the people
            who live in it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
