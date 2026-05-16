import { useEffect, useState } from "react";

import SmoothScroll from "./lib/SmoothScroll";
import Easter from "./lib/Easter";
import { startSyntheticHeartbeat } from "./lib/Heartbeat";

import Loader from "./components/Loader";
import UIShell from "./components/UIShell";
import MegaMenu from "./components/MegaMenu";
import AskAI from "./components/AskAI";
import AsciiToggle from "./components/AsciiToggle";
import InkTrail from "./components/InkTrail";
import TransitionMask from "./components/TransitionMask";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

import Origin from "./sections/Origin";
import Land from "./sections/Land";
import Water from "./sections/Water";
import Saga from "./sections/Saga";
import Culture from "./sections/Culture";
import Journeys from "./sections/Journeys";
import SudanMap3D from "./sections/SudanMap3D";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  useEffect(() => {
    startSyntheticHeartbeat();
  }, []);

  return (
    <SmoothScroll>
      <Loader />
      <UIShell
        onOpenMenu={() => setMenuOpen(true)}
        onOpenAsk={() => setAskOpen(true)}
      />
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <AskAI open={askOpen} onClose={() => setAskOpen(false)} />
      <AsciiToggle />
      <InkTrail />
      <TransitionMask />
      <Easter />

      <main className="noise relative bg-void text-bone">
        <Origin />
        <Marquee />
        <Land />
        <Water />
        <Saga />
        <Culture />
        <Journeys />
        <SudanMap3D />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
