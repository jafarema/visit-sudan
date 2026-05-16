import { useEffect, useRef } from "react";
import useMotionSafe from "../lib/useMotionSafe";

/**
 * Site-wide canvas that paints a warm gold-ink trail behind the cursor.
 * Skipped on touch devices and on prefers-reduced-motion.
 */
export default function InkTrail() {
  const canvasRef = useRef(null);
  const safe = useMotionSafe();

  useEffect(() => {
    if (!safe) return;
    if (!matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.75);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const points = [];
    const onMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > 80) points.shift();
    };

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("resize", resize);
    document.documentElement.classList.add("cursor-ink");

    let raf;
    const loop = () => {
      const w = innerWidth;
      const h = innerHeight;
      ctx.clearRect(0, 0, w, h);
      const now = performance.now();
      for (let i = points.length - 1; i >= 0; i--) {
        const age = now - points[i].t;
        if (age > 900) {
          points.splice(i, 1);
          continue;
        }
        const r = 26 * (1 - age / 900);
        const g = ctx.createRadialGradient(
          points[i].x,
          points[i].y,
          0,
          points[i].x,
          points[i].y,
          r,
        );
        g.addColorStop(0, "rgba(244,213,141,0.55)");
        g.addColorStop(1, "rgba(244,213,141,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // primary cursor dot at the head of the trail
      if (points.length) {
        const head = points[points.length - 1];
        ctx.fillStyle = "rgba(244,213,141,0.95)";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", resize);
      document.documentElement.classList.remove("cursor-ink");
    };
  }, [safe]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] mix-blend-screen"
    />
  );
}
