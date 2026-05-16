import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has NOT opted into prefers-reduced-motion.
 * Use this to gate heavy effects (GoldDust, InkTrail, blur transitions, etc).
 */
export default function useMotionSafe() {
  const [safe, setSafe] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSafe(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return safe;
}
