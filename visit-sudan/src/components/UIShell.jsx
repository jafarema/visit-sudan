import { useEffect, useState } from "react";

const SECTIONS = ["origin", "land", "water", "saga", "culture", "journeys", "map", "pricing", "contact"];

/**
 * Persistent cinematic frame around the page:
 *  - top-left: serif logo
 *  - top-right: Ask AI + Menu
 *  - bottom-left: active section indicator
 *  - bottom-right: scroll cue
 *  - left-edge vertical: section index that highlights on scroll
 */
export default function UIShell({ onOpenMenu, onOpenAsk }) {
  const [active, setActive] = useState(SECTIONS[0]);

  useEffect(() => {
    const onScroll = () => {
      const els = SECTIONS.map((s) => document.getElementById(s)).filter(Boolean);
      const y = window.innerHeight * 0.4;
      let current = active;
      for (const el of els) {
        if (el.getBoundingClientRect().top < y) current = el.id;
      }
      if (current !== active) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* top bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5 md:p-8">
        <a
          href="#origin"
          className="pointer-events-auto font-display text-lg tracking-tight text-bone hover:text-goldSoft transition"
        >
          Visit Sudan
        </a>
        <div className="pointer-events-auto flex items-center gap-5 text-[10px] uppercase tracking-ultra text-bone/65 font-mono">
          <button onClick={onOpenAsk} className="hover:text-gold transition">
            Ask AI
          </button>
          <span className="h-3 w-px bg-bone/20" aria-hidden />
          <button onClick={onOpenMenu} className="hover:text-gold transition">
            Menu
          </button>
        </div>
      </div>

      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-8">
        <div className="text-[10px] uppercase tracking-ultra text-bone/55 font-mono">
          <span className="text-gold">{active}</span>
          <span className="mx-2 opacity-40">/</span>
          <span>sudan, untold</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-ultra text-bone/55 font-mono">
          <span className="block h-px w-10 bg-bone/40" />
          Scroll to discover
        </div>
      </div>

      {/* left vertical index (desktop only) */}
      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-[10px] uppercase tracking-ultra text-bone/40 font-mono md:flex">
        {SECTIONS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className={
              "pointer-events-auto transition " +
              (active === s ? "text-gold" : "hover:text-bone")
            }
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  );
}
