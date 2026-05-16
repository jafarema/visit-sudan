/**
 * Slow infinite marquee strip used between sections.
 * The animation is declared in index.css under @keyframes scrollX.
 *
 * Brighter and tighter than the original — the previous opacity (15%) made
 * it nearly invisible against the void background.
 */
const TOKENS = [
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

export default function Marquee({ tokens = TOKENS }) {
  const repeated = [...tokens, ...tokens, ...tokens];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-void py-6">
      <div className="flex gap-10 whitespace-nowrap [animation:scrollX_50s_linear_infinite]">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl font-light italic tracking-tight text-bone/30 md:text-5xl"
          >
            {t} <span className="not-italic text-gold/70 ml-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
