import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VISIT_SUDAN_IMAGES } from "../data/images";

const JOURNEYS = [
  {
    n: "01",
    title: "Ancient Kingdoms",
    img: VISIT_SUDAN_IMAGES.meroeHero,
    line: "Meroë, Kerma, Jebel Barkal — five thousand years of memory in stone.",
  },
  {
    n: "02",
    title: "Desert Nights",
    img: VISIT_SUDAN_IMAGES.desertCamp,
    line: "Camp under a sky so heavy with stars you can almost hear it.",
  },
  {
    n: "03",
    title: "Two Niles",
    img: VISIT_SUDAN_IMAGES.khartoumNile,
    line: "Where the Blue and White Nile finally meet, and become one.",
  },
  {
    n: "04",
    title: "Red Sea Light",
    img: VISIT_SUDAN_IMAGES.redSeaPortSudan,
    line: "Coral, silence, and turquoise just beyond the dunes.",
  },
  {
    n: "05",
    title: "Colour & Home",
    img: VISIT_SUDAN_IMAGES.nubianVillage,
    line: "Walk through Nubian villages painted by hand, generation by generation.",
  },
  {
    n: "06",
    title: "Markets & Music",
    img: VISIT_SUDAN_IMAGES.sudaneseMarket,
    line: "Spice, textiles, oud, and the rhythm of Sudanese afternoons.",
  },
];

export default function Journeys() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Slide far enough left to reveal every card on desktop (~7 panels worth).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section
      id="journeys"
      ref={ref}
      className="relative h-[420vh]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-ink">
        <motion.div style={{ x }} className="flex gap-6 px-8 md:px-12">
          {/* intro panel */}
          <div className="flex w-screen flex-shrink-0 flex-col justify-center pr-8 md:pr-16">
            <p className="eyebrow">Journeys · 06 / 09</p>
            <h2 className="font-display mt-5 text-6xl leading-[0.88] tracking-mega md:text-[10rem]">
              Choose
              <br />
              <span className="italic text-gold-gradient">the path</span>
              <br />
              that moves you.
            </h2>
            <p className="mt-6 max-w-md text-bone/70">
              Scroll to drift through six different Sudans — desert, river,
              ruin, reef, village, and song.
            </p>
          </div>

          {JOURNEYS.map((j) => (
            <article
              key={j.n}
              className="relative h-[78vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-3xl border border-bone/10 md:w-[58vw]"
            >
              <img
                src={j.img}
                alt={j.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
              <span className="absolute right-6 top-6 eyebrow">
                {j.n} / {JOURNEYS.length.toString().padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-4xl tracking-tight md:text-6xl">
                  {j.title}
                </h3>
                <p className="mt-3 max-w-md text-bone/72">{j.line}</p>
              </div>
            </article>
          ))}

          {/* spacer so the last card doesn't slam into the edge */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
