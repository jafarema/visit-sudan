import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Cinematic smooth scroll wrapper. Uses Lenis with a long, slow easing curve
 * to give the whole site a "movie unfolding" feel. Disables itself for users
 * who prefer reduced motion.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Tight, snappy easing. The original 1.4s "cinematic" feel made the page
    // feel laggy on real input — 0.9s with a sharp cubic is much better.
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.05,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
