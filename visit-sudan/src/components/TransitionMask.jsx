import { useEffect, useState } from "react";

/**
 * A subtle radial vignette whose centre tracks scroll progress, painted with
 * `mix-blend-multiply` so it gently darkens the page edges on the side away
 * from your scroll position. Adds a "wipe" feeling between sections without
 * actually obscuring content.
 */
export default function TransitionMask() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const v = max > 0 ? window.scrollY / max : 0;
      setP(Math.min(1, Math.max(0, v)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const x = (p * 100).toFixed(1) + "%";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] opacity-40 mix-blend-multiply"
      style={{
        background: `radial-gradient(120% 90% at ${x} 50%, transparent 0%, transparent 35%, #08070A 90%)`,
      }}
    />
  );
}
