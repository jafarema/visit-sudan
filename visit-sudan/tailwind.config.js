/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08070A",
        ink: "#0F0D10",
        smoke: "#1A1619",
        bone: "#EDE6D8",
        gold: "#D9A441",
        goldSoft: "#F4D58D",
        sand: "#C9A56A",
        nile: "#0E5A7A",
        rust: "#B3261E",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        mega: "-0.04em",
        tight: "-0.02em",
        wide: "0.2em",
        ultra: "0.5em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(8,7,10,0.4), 0 12px 32px rgba(8,7,10,0.5)",
      },
    },
  },
  plugins: [],
};
