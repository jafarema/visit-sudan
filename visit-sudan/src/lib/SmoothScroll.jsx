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

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
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
