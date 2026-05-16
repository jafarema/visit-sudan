import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VISIT_SUDAN_IMAGES } from "../data/images";

/**
 * Pinned scroll scene.
 * Image scales + drifts upward as you scroll the section, while the title
 * fades in from blur and back out into blur on the way out.
 */
export default function Land() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.4]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const blurFx = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [16, 0, 0, 16],
  );
  const filter = useTransform(blurFx, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} id="land" className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img
            src={VISIT_SUDAN_IMAGES.jebelBarkal}
            alt="Jebel Barkal at sunset"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* color grade + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 60%, transparent 0%, rgba(8,7,10,0.55) 75%)",
          }}
        />

        <motion.div
          style={{ opacity, filter }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10"
        >
          <p className="eyebrow">Land · 02 / 09</p>
          <h2 className="font-display mt-5 text-7xl leading-[0.88] tracking-mega md:text-[12rem]">
            golden,
            <br />
            <span className="italic">silent,</span>
            <br />
            sacred.
          </h2>
          <p className="mt-7 max-w-xl text-lg text-bone/70 md:text-xl">
            Jebel Barkal still glows at sunset. The desert holds its breath. A
            country that feels older than time itself, kept warm by the people
            who live in it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
