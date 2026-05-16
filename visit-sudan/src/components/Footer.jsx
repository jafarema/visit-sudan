export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-void px-6 pt-24 pb-10 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <p className="eyebrow">Brand</p>
          <p className="mt-4 text-bone/65 leading-7">
            A cinematic invitation to a country older than memory, warmer than
            any postcard.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-bone/72">
            <li><a href="#origin" className="hover:text-gold transition">Origin</a></li>
            <li><a href="#land" className="hover:text-gold transition">Land</a></li>
            <li><a href="#water" className="hover:text-gold transition">Water</a></li>
            <li><a href="#culture" className="hover:text-gold transition">Culture</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Plan</p>
          <ul className="mt-4 space-y-2 text-bone/72">
            <li><a href="#journeys" className="hover:text-gold transition">Journeys</a></li>
            <li><a href="#pricing" className="hover:text-gold transition">Pricing</a></li>
            <li><a href="#contact" className="hover:text-gold transition">Custom trip</a></li>
            <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Stay close</p>
          <p className="mt-4 text-bone/65">
            Cinematic dispatches from Sudan. No noise.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="input-hair flex-1"
            />
            <button className="btn-gold !px-4 !py-2 text-xs">Join</button>
          </form>
        </div>
      </div>

      <h2 className="mt-20 font-display text-[20vw] leading-[0.8] tracking-mega text-bone/90 md:text-[14vw]">
        Sudan, <span className="italic text-gold-gradient">untold.</span>
      </h2>

      <div className="hairline mx-auto mt-8 flex max-w-7xl flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-ultra font-mono text-bone/45 md:flex-row">
        <span>© Visit Sudan</span>
        <span>Made with feeling, not formulas</span>
      </div>
    </footer>
  );
}
