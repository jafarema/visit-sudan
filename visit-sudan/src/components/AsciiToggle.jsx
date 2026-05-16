import { useEffect, useState } from "react";

/**
 * Toggle that flips the document into a grayscale + scanline "ASCII" mode.
 * Driven by classes defined in index.css under `.ascii`.
 */
export default function AsciiToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("ascii", on);
    return () => document.documentElement.classList.remove("ascii");
  }, [on]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-bone/20 bg-void/60 px-4 py-2 text-[10px] uppercase tracking-ultra font-mono text-bone/80 backdrop-blur-md transition hover:border-gold/50 hover:text-gold"
    >
      {on ? "Exit ASCII Mode" : "ASCII Mode"}
    </button>
  );
}
