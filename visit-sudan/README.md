# Visit Sudan — _Sudan, untold._

A cinematic Sidewave-inspired tourism website for Sudan, built with **Vite + React + React Three Fiber + Drei + Postprocessing + Lenis + Framer Motion + GSAP + Tailwind**.

> Dark, gold, slow, and emotional. Every section is a scene.

---

## Run it

```bash
cd visit-sudan
npm install
npm run dev
```

Open http://localhost:5173.

To build for production:

```bash
npm run build
npm run preview
```

The build is pure static (Vite `base: "./"`) so the `dist/` folder can be dropped onto GitHub Pages, Netlify, Vercel, S3, etc.

---

## What's inside

```
visit-sudan/
├── index.html                       # OG tags, fonts, theme-color
├── tailwind.config.js               # brand tokens (void, gold, nile, rust…)
├── postcss.config.js
├── vite.config.js
├── public/
│   ├── images/visit-sudan/          # drop real Sudan photos here
│   └── audio/                       # optional ambient tracks
└── src/
    ├── main.jsx
    ├── App.jsx                      # final assembly
    ├── index.css                    # tokens, .ascii, .noise, .cursor-ink, btn-*, input-hair
    ├── data/images.js               # image manifest (Unsplash by default)
    ├── lib/
    │   ├── SmoothScroll.jsx         # Lenis (respects prefers-reduced-motion)
    │   ├── Heartbeat.js             # zustand store with synthetic 60bpm pulse
    │   ├── Easter.jsx               # type "sudan" → gold rain
    │   └── useMotionSafe.js
    ├── shaders/
    │   └── SandMaterial.js          # custom GLSL fbm dunes + wind + crest glint
    ├── components/
    │   ├── Loader.jsx               # Sidewave-style cinematic preloader
    │   ├── UIShell.jsx              # persistent corner labels + section index
    │   ├── MegaMenu.jsx             # full-screen overlay menu + marquee
    │   ├── AskAI.jsx                # right-side trip-planning panel
    │   ├── AsciiToggle.jsx          # grayscale + scanline mode
    │   ├── InkTrail.jsx             # gold ink cursor trail (canvas)
    │   ├── TransitionMask.jsx       # scroll-progress radial vignette
    │   ├── GoldDustField.jsx        # 1500 falling gold particles
    │   ├── Marquee.jsx
    │   └── Footer.jsx
    └── sections/
        ├── Origin.jsx               # 3D hero — pyramids, sand shader, gold dust, scroll camera
        ├── Land.jsx                 # pinned image scale + parallax
        ├── Water.jsx                # split-screen Nile sunset
        ├── Saga.jsx                 # 500vh chapter scrollytelling (Kerma → Kush → Meroë → today)
        ├── Culture.jsx              # 3 portrait image cards with gold hover glow
        ├── Journeys.jsx             # horizontal-scroll destination gallery
        ├── SudanMap3D.jsx           # 3D land sculpture with click-to-reveal hotspots
        ├── Pricing.jsx              # interactive trip configurator
        └── Contact.jsx              # editorial form with thank-you state
```

---

## Brand tokens (Tailwind)

| Token       | Hex       | Use                                |
| ----------- | --------- | ---------------------------------- |
| `void`      | `#08070A` | page background                    |
| `ink`       | `#0F0D10` | secondary surfaces                 |
| `bone`      | `#EDE6D8` | body text                          |
| `gold`      | `#D9A441` | primary accent                     |
| `goldSoft`  | `#F4D58D` | highlights / hover glow            |
| `nile`      | `#0E5A7A` | water accents                      |
| `rust`      | `#B3261E` | rare warning / drama accent        |

Fonts: **Fraunces** (display), **Inter** (sans), **JetBrains Mono** (eyebrows / labels).

Custom utility classes (in `index.css`):

- `.eyebrow` — uppercase mono label
- `.font-display` — Fraunces
- `.text-gold-gradient` / `.gold-gradient`
- `.btn-gold` / `.btn-ghost` / `.input-hair`
- `.noise` — SVG film grain overlay (apply on a wrapper)
- `.ascii` — toggled on `<html>` to flip into grayscale + scanlines

---

## Replacing placeholder images

The image manifest lives in `src/data/images.js`. By default it points at Unsplash CDN URLs (warm desert / Nile / market mood) so the site is alive immediately.

When you have real Sudan photography:

1. Drop files into `public/images/visit-sudan/` with these exact names:

```
meroe-hero.jpg
nile-sunset.jpg
red-sea-port-sudan.jpg
nubian-village.jpg
coffee-ritual.jpg
desert-camp.jpg
khartoum-nile.jpg
jebel-barkal.jpg
sudanese-market.jpg
```

2. Open `src/data/images.js` and flip `USE_LOCAL` to `true`. Done.

---

## Easter eggs and toggles

- **Type `sudan`** anywhere on the page → gold confetti rain.
- **ASCII Mode** button (bottom-centre) → grayscale + scanline view.
- **Ask AI** (top-right) → right-side trip-planning panel with placeholder responses.
- **Menu** (top-right) → full-screen overlay with numbered serif links.

---

## Notes / known limits

- **Audio** is intentionally not wired up (no asset). The `Heartbeat` store emits a synthetic 60 bpm pulse so the hero word `untold` still gently "breathes". To wire real ambient audio, drop tracks into `public/audio/` and start them on a user gesture.
- **3D extruded SUDAN word** (the `TextSculpt` idea) requires a Fraunces JSON font asset (`/public/fonts/fraunces.json`) which isn't included. The 3D map sculpture in `SudanMap3D.jsx` plays a similar role and ships out of the box.
- Heavy effects (bloom, gold-dust field, ink trail, blur transitions) are gated by `prefers-reduced-motion` for accessibility.
- DPR is capped at 1.75 on the 3D canvases.

---

Made with feeling, not formulas.
