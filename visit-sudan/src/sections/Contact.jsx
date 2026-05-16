import { useState } from "react";

const INTERESTS = [
  "Ancient history",
  "Desert camping",
  "Nile experience",
  "Red Sea diving",
  "Culture & food",
  "Custom journey",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Contact · 09 / 09</p>
        <h2 className="font-display mt-4 max-w-5xl text-5xl leading-[0.92] tracking-mega md:text-[10rem]">
          Your Sudan story{" "}
          <span className="italic text-gold-gradient">starts here.</span>
        </h2>

        <div className="mt-16 grid gap-14 md:grid-cols-2">
          <div className="space-y-5 text-bone/72">
            <p className="text-lg">
              Tell us how you want to experience Sudan — ancient history, desert
              silence, Nile culture, Red Sea adventure, food, or a fully custom
              journey.
            </p>
            <p>
              We respond within 48 hours with a tailored route, costs, and what
              to pack.
            </p>

            <div className="hairline mt-10 pt-6 text-[10px] uppercase tracking-ultra font-mono text-bone/45">
              Visit Sudan · Sudan, untold · Est. 5000 BC
            </div>

            <div className="mt-2 grid gap-1 text-[10px] uppercase tracking-ultra font-mono text-bone/55">
              <span>hello@visit-sudan.example</span>
              <span>+ slow replies on purpose</span>
            </div>
          </div>

          {submitted ? (
            <div
              role="status"
              className="flex items-start rounded-3xl border border-gold/30 bg-gold/5 p-10"
            >
              <div>
                <p className="eyebrow text-gold">Sent</p>
                <p className="font-display mt-3 text-4xl tracking-tight">
                  Thank you. We'll write you back soon.
                </p>
                <p className="mt-4 text-bone/65">
                  In the meantime, scroll back up and stay a little longer in
                  the desert.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="eyebrow">Your name</label>
                <input
                  required
                  className="input-hair mt-2"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="eyebrow">Email</label>
                <input
                  required
                  type="email"
                  className="input-hair mt-2"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="eyebrow">Travel window</label>
                <input
                  className="input-hair mt-2"
                  placeholder="e.g. November 2026, two weeks"
                />
              </div>
              <div>
                <label className="eyebrow">Interest</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <label
                      key={i}
                      className="cursor-pointer rounded-full border border-bone/20 px-4 py-2 text-xs text-bone/70 transition hover:border-gold/40 hover:text-gold"
                    >
                      <input
                        type="checkbox"
                        name="interest"
                        value={i}
                        className="sr-only peer"
                      />
                      <span className="peer-checked:text-gold">{i}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="eyebrow">Tell us your dream Sudan trip</label>
                <textarea
                  rows={4}
                  className="input-hair mt-2 resize-y"
                  placeholder="What you want to see, feel, eat, photograph…"
                />
              </div>

              <button type="submit" className="btn-gold w-full md:w-auto">
                Send request →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
