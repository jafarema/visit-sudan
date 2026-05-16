import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * Type "sudan" anywhere on the site to trigger a 2 second gold rain.
 * A tiny easter egg, but the kind that gets screenshot.
 */
export default function Easter() {
  useEffect(() => {
    let buffer = "";
    const onKey = (e) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-5);
      if (buffer === "sudan") {
        const end = Date.now() + 2000;
        const tick = () => {
          confetti({
            particleCount: 6,
            startVelocity: 18,
            spread: 90,
            origin: { x: Math.random(), y: -0.1 },
            colors: ["#D9A441", "#F4D58D", "#B3261E", "#0E5A7A"],
            scalar: 1.2,
            ticks: 220,
            gravity: 0.6,
          });
          if (Date.now() < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
