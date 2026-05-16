import { motion } from "framer-motion";
import SmartImage from "../components/SmartImage";
import { VISIT_SUDAN_IMAGES } from "../data/images";

const CARDS = [
  {
    title: "Hospitality",
    img: VISIT_SUDAN_IMAGES.coffeeRitual,
    caption: "Coffee is poured slowly here. So is conversation.",
  },
  {
    title: "Markets",
    img: VISIT_SUDAN_IMAGES.sudaneseMarket,
    caption: "The rhythm of everyday Sudan, in colour and spice.",
  },
  {
    title: "Nubian colour",
    img: VISIT_SUDAN_IMAGES.nubianVillage,
    caption: "Painted walls. Open doors. A way of life.",
  },
];

export default function Culture() {
  return (
    <section id="culture" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Culture · 05 / 09
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display mt-4 max-w-5xl text-5xl leading-[0.95] tracking-mega md:text-8xl"
        >
          Come for the places.{" "}
          <span className="italic text-gold-gradient">
            Remember the people.
          </span>
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-bone/10"
            >
              <SmartImage
                src={c.img}
                alt={c.title}
                className="aspect-[3/4] w-full transition-transform duration-[1400ms] group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 80%, rgba(244,213,141,0.28), transparent 60%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow">{c.title}</p>
                <p className="font-display mt-2 text-2xl leading-snug">
                  {c.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
