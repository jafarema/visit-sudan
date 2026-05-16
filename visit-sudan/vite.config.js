import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for Visit Sudan.
// `base: "./"` makes the build deployable from any subpath (GitHub Pages, etc.).
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    sourcemap: false,
    target: "es2020",
  },
});
