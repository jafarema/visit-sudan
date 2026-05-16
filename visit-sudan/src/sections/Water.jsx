import { motion } from "framer-motion";
import { VISIT_SUDAN_IMAGES } from "../data/images";

const PLACES = ["Khartoum", "Port Sudan", "Suakin"];

export default function Water() {
  return (
    <section id="water" className="relative grid min-h-[100vh] grid-cols-1 md:grid-cols-2">
      <div className="relative flex items-center bg-ink p-8 md:p-16">
        <div className="max-w-md">
          <p className="eyebrow">Water · 03 / 09</p>
          <h2 className="font-display mt-4 text-5xl leading-tight tracking-tight md:text-8xl">
            The Nile <span className="italic text-gold-gradient">remembers.</span>
          </h2>
          <p className="mt-6 text-bone/70 leading-7">
            The Blue Nile and the White Nile meet in Khartoum and become a
            single river that carries an entire civilisation toward the sea.
            Further east, the Red Sea opens into coral light.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-ultra font-mono text-bone/55">
            {PLACES.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {p}
                {i < PLACES.length - 1 && (
                  <span className="text-gold">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-[60vh] overflow-hidden md:min-h-0">
        <motion.img
          src={VISIT_SUDAN_IMAGES.nileSunset}
          alt="Sunset on the Nile"
          className="h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/40" />
        {/* shimmering Nile-blue light line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-2/3 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(14,90,122,0.85), transparent)",
            filter: "blur(1px)",
          }}
        />
      </div>
    </section>
  );
}
