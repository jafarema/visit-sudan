import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic preloader. Sidewave-style:
 *  - Top + bottom mono labels.
 *  - Giant counting % in serif.
 *  - Gold progress bar.
 *  - Slides up to reveal the site.
 */
export default function Loader() {
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 9 + 2;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 700);
      }
      setP(Math.floor(v));
    }, 95);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[200] origin-top bg-void"
        >
          <div className="flex h-full flex-col justify-between p-6 md:p-10">
            <div className="flex justify-between text-[10px] uppercase tracking-ultra text-bone/60 font-mono">
              <span>Sudan, Untold</span>
              <span>Loading content</span>
            </div>

            <div>
              <p className="font-display text-[18vw] leading-[0.8] tracking-mega text-bone">
                {String(p).padStart(3, "0")}
              </p>
              <div className="mt-6 h-px w-full bg-bone/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-goldSoft via-gold to-gold"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: p / 100 }}
                  transition={{ duration: 0.25, ease: "linear" }}
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] uppercase tracking-ultra text-bone/60 font-mono">
              <span>Scroll to discover</span>
              <span>v01</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
