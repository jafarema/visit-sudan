import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const STYLES = [
  { id: "essential", label: "essential", base: 180, blurb: "Honest, simple, real." },
  { id: "premium", label: "premium", base: 320, blurb: "Comfort with character." },
  { id: "luxury", label: "luxury", base: 480, blurb: "Slow, private, designed." },
];

const INCLUDES = [
  "Local guides and storytellers",
  "Transport between regions",
  "Stays in chosen style",
  "Meals and tea rituals",
  "Entries to ancient sites",
  "Sunset stops, written in",
];

export default function Pricing() {
  const [days, setDays] = useState(7);
  const [styleId, setStyleId] = useState("premium");

  const style = useMemo(
    () => STYLES.find((s) => s.id === styleId) ?? STYLES[1],
    [styleId],
  );
  const total = style.base * days;

  return (
    <section id="pricing" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Pricing · 08 / 09</p>
        <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-mega md:text-9xl">
          Shape your<br />
          <span className="italic text-gold-gradient">journey.</span>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="eyebrow">Days</p>
              <input
                type="range"
                min={3}
                max={21}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-4 w-full accent-gold"
                aria-label="Trip length in days"
              />
              <div className="mt-3 flex items-baseline gap-3">
                <p className="font-display text-5xl tracking-mega">{days}</p>
                <span className="eyebrow">days</span>
              </div>
            </div>

            <div>
              <p className="eyebrow">Style</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {STYLES.map((s) => {
                  const active = s.id === styleId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStyleId(s.id)}
                      className={
                        "rounded-full border px-5 py-2 text-xs uppercase tracking-ultra font-mono transition " +
                        (active
                          ? "border-gold text-gold"
                          : "border-bone/20 text-bone/60 hover:border-bone/40 hover:text-bone")
                      }
                      aria-pressed={active}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 max-w-md text-bone/55">{style.blurb}</p>
            </div>

            <div>
              <p className="eyebrow">Included</p>
              <ul className="mt-4 grid gap-2">
                {INCLUDES.map((it) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-3 text-bone/72"
                  >
                    <span className="text-gold">+</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-bone/10 bg-ink/60 p-10"
          >
            <p className="eyebrow">Estimate</p>
            <p className="font-display mt-3 text-7xl leading-none tracking-mega text-gold-gradient md:text-9xl">
              ${total.toLocaleString()}
            </p>
            <p className="mt-4 text-sm text-bone/55">
              Per person, all-in. Indicative — final routes are tailored after
              we talk.
            </p>

            <div className="mt-8 hairline pt-6 text-sm text-bone/65">
              <div className="flex justify-between py-1">
                <span>Days</span>
                <span className="text-bone">{days}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Style</span>
                <span className="text-bone capitalize">{style.label}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Daily rate</span>
                <span className="text-bone">${style.base}</span>
              </div>
            </div>

            <a href="#contact" className="btn-gold mt-9 inline-block">
              Request itinerary →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
