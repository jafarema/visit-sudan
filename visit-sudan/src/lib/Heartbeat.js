import { create } from "zustand";

/**
 * Audio-reactive heartbeat store. The current normalized pulse value (0..1)
 * is shared site-wide so any component can subscribe and gently react.
 *
 * Default behaviour, when sound is muted, is to emit a slow synthetic
 * heartbeat so the site still feels alive without permission to play audio.
 */
export const useHeartbeat = create((set) => ({
  pulse: 0,
  setPulse: (v) => set({ pulse: v }),
}));

let started = false;
let stopFn = null;

/** Start the synthetic heartbeat (no audio permission required). */
export function startSyntheticHeartbeat() {
  if (started) return;
  started = true;
  let frame;
  const t0 = performance.now();
  const loop = () => {
    const t = (performance.now() - t0) / 1000;
    // ~60bpm gentle cosine wave, centred at 0.35 with 0.25 amplitude
    const v = 0.35 + Math.cos(t * Math.PI) * 0.25;
    useHeartbeat.getState().setPulse(Math.max(0, v));
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  stopFn = () => cancelAnimationFrame(frame);
}

export function stopHeartbeat() {
  if (stopFn) stopFn();
  started = false;
  stopFn = null;
  useHeartbeat.getState().setPulse(0);
}
