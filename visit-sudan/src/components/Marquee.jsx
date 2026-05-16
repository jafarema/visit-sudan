/**
 * Slow infinite marquee strip used between sections.
 * The animation is declared in index.css under @keyframes scrollX.
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
    <div className="relative overflow-hidden border-y border-bone/10 bg-void py-8">
      <div className="flex gap-12 whitespace-nowrap [animation:scrollX_42s_linear_infinite]">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="font-display text-5xl font-light tracking-tight text-bone/15 md:text-7xl"
          >
            {t} <span className="text-gold ml-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
