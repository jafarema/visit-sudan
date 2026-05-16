import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
  "I have 7 days, I love history and stars.",
  "Plan a Nile + Red Sea route.",
  "What's the best time to visit Meroë?",
  "I want a slow, quiet, photographic trip.",
];

/**
 * Right-side trip-planning panel. Local-only state — sending submits the
 * message into a fake conversation thread so the panel feels alive without
 * requiring a real backend.
 */
export default function AskAI({ open, onClose }) {
  const [msg, setMsg] = useState("");
  const [thread, setThread] = useState([
    {
      role: "guide",
      text: "Hi. Tell me what kind of Sudan story you want — desert, river, history, color, silence — and I'll shape a journey.",
    },
  ]);

  const send = () => {
    const text = msg.trim();
    if (!text) return;
    setThread((t) => [
      ...t,
      { role: "you", text },
      {
        role: "guide",
        text:
          "Wonderful. I'll outline a route within 48 hours — meanwhile, " +
          "fill in the contact form below with your travel window and we'll start planning.",
      },
    ]);
    setMsg("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[115] bg-void/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[120] flex w-full max-w-xl flex-col border-l border-bone/10 bg-ink"
          >
            <div className="flex items-center justify-between border-b border-bone/10 p-5">
              <span className="text-[10px] uppercase tracking-ultra font-mono text-bone/60">
                Plan with AI
              </span>
              <button
                onClick={onClose}
                className="text-[10px] uppercase tracking-ultra font-mono hover:text-gold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-auto p-5 md:p-7">
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={
                    "max-w-[85%] rounded-3xl border p-4 " +
                    (m.role === "guide"
                      ? "border-bone/10 bg-smoke/40"
                      : "ml-auto border-gold/30 bg-gold/10 text-bone")
                  }
                >
                  <p className="mb-1 text-[10px] uppercase tracking-ultra font-mono text-bone/45">
                    {m.role === "guide" ? "Sudan guide" : "You"}
                  </p>
                  <p
                    className={
                      m.role === "guide"
                        ? "font-display text-xl leading-snug text-bone"
                        : "text-sm leading-6 text-bone"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setMsg(s)}
                    className="rounded-full border border-bone/15 bg-smoke/30 px-3 py-1.5 text-xs text-bone/70 hover:border-gold/40 hover:text-gold transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-bone/10 p-5">
              <div className="flex items-end gap-3 rounded-2xl border border-bone/15 bg-smoke/40 p-3">
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask anything about Sudan…"
                  rows={2}
                  className="flex-1 resize-none bg-transparent text-bone outline-none placeholder:text-bone/30"
                />
                <button
                  onClick={send}
                  className="rounded-full bg-gradient-to-br from-goldSoft to-gold px-4 py-2 text-xs font-bold text-void hover:brightness-110"
                >
                  Send
                </button>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-ultra font-mono text-bone/40">
                Concept demo · responses are placeholders
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
