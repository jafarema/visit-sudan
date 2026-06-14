<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Visit Sudan — The Living Archive</title>
<meta name="description" content="A living archive of Sudan — its kingdoms, coasts, mountains and hands. An independent African civilisation, on its own terms." />
<meta name="theme-color" content="#0B0A09" />
<link rel="preload" as="image" href="images/meroe-hero.png" />
<style>[data-lang-block]{display:none}[data-lang-block="en"]{display:inline}div[data-lang-block="en"]{display:block}</style>
<link rel="stylesheet" href="assets/app.css" />
<style>
  /* ---- Home hero ---- */
  .hero { position: relative; min-height: 100svh; display: flex; align-items: flex-end; overflow: hidden; background: var(--night); }
  .hero-media { position: absolute; inset: 0; }
  .hero-media img { width: 100%; height: 100%; object-fit: cover; animation: kb 26s ease-in-out infinite alternate; }
  @keyframes kb { from { transform: scale(1.06); } to { transform: scale(1.16) translateY(-1.5%); } }
  @media (prefers-reduced-motion: reduce){ .hero-media img { animation: none; transform: scale(1.06); } }
  .hero-veil { position: absolute; inset: 0; background:
    linear-gradient(180deg, rgba(11,10,9,.5) 0%, rgba(11,10,9,0) 26%, rgba(11,10,9,.5) 62%, rgba(11,10,9,.95) 100%),
    radial-gradient(90% 70% at 76% 6%, rgba(212,175,55,.16), transparent 56%); }
  .hero-watermark { position: absolute; right: -2%; top: 16%; font-family: var(--font-display-ar);
    font-size: 32vw; line-height: 1; color: rgba(212,175,55,.14); pointer-events: none; user-select: none; }
  html[dir="rtl"] .hero-watermark { right: auto; left: -2%; }
  .hero-inner { position: relative; z-index: 3; width: min(var(--maxw), calc(100% - 48px)); margin-inline: auto; padding-bottom: clamp(64px, 9vw, 132px); color: var(--on-dark); }
  .hero-eyebrow { display:inline-flex; align-items:center; gap:14px; font-family: var(--font-mono); font-size:12px; font-weight:600; letter-spacing:.34em; text-transform:uppercase; color: var(--gold-lit); margin-bottom: 26px; }
  html[dir="rtl"] .hero-eyebrow { letter-spacing: 0; text-transform:none; }
  .hero-eyebrow::before { content:""; width:42px; height:1px; background: linear-gradient(90deg,transparent,var(--gold-lit)); }
  .hero h1 { font-size: clamp(52px, 9vw, 148px); line-height: .94; letter-spacing: -0.045em; max-width: 14ch; text-shadow: 0 4px 60px rgba(0,0,0,.4); }
  html[dir="rtl"] .hero h1 { line-height: 1.12; }
  .hero p.sub { margin-top: 26px; max-width: 50ch; font-size: 20px; font-weight: 300; color: var(--on-dark-dim); }
  .hero-actions { margin-top: 38px; display: flex; gap: 14px; flex-wrap: wrap; }
  .hero-scrollcue { margin-top: 52px; display:inline-flex; align-items:center; gap:12px; font-family: var(--font-mono); font-size:11px; letter-spacing:.3em; text-transform:uppercase; color: var(--on-dark-mute); }
  html[dir="rtl"] .hero-scrollcue { letter-spacing:0; text-transform:none; }
  .hero-scrollcue .d { width:6px; height:6px; border-radius:50%; background: var(--gold); animation: blip 2.4s var(--ease) infinite; }
  @keyframes blip { 0%,100%{ transform: scale(1); opacity:.9; } 50%{ transform: scale(1.7); opacity:.3; } }

  /* ---- Intro statement ---- */
  .statement { background: var(--cream); }
  .statement .big { font-family: var(--font-display); font-size: clamp(30px, 4.4vw, 62px); line-height: 1.12; letter-spacing: -0.025em; max-width: 18ch; }
  .statement .big em { color: var(--terracotta); }

  /* ---- Numbers ---- */
  .figs { display: grid; grid-template-columns: repeat(4,1fr); gap: 28px; border-top: 1px solid var(--line); padding-top: 56px; margin-top: 64px; }
  @media (max-width:760px){ .figs { grid-template-columns: 1fr 1fr; gap: 40px 24px; } }
  .fig .n { font-family: var(--font-display); font-size: clamp(40px, 5vw, 66px); line-height: 1; letter-spacing: -0.03em; }
  .fig .n sup { font-size: .42em; color: var(--gold-deep); vertical-align: super; }
  .fig .l { margin-top: 12px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: var(--ink-mute); }
  html[dir="rtl"] .fig .l { letter-spacing:0; text-transform:none; }

  /* ---- Explore (3 gateway tiles) ---- */
  .gateways { background: var(--bone); }
  .gw-tile { aspect-ratio: 4/5; }

  /* ---- Feature band ---- */
  .feat { position: relative; min-height: 86vh; display: flex; align-items: center; overflow: hidden; background: var(--nile); color: var(--on-dark); }
  .feat img { position: absolute; inset: 0; width:100%; height:100%; object-fit: cover; opacity: .5; }
  .feat .veil { position:absolute; inset:0; background: linear-gradient(90deg, rgba(31,36,71,.92), rgba(31,36,71,.2) 70%); }
  html[dir="rtl"] .feat .veil { background: linear-gradient(270deg, rgba(31,36,71,.92), rgba(31,36,71,.2) 70%); }
  .feat .inner { position: relative; z-index: 2; max-width: 540px; }
  .feat h2 { font-size: clamp(36px, 5vw, 72px); }
  .feat h2 em { color: var(--gold-lit); }
  .feat p { margin-top: 18px; font-size: 18px; font-weight: 300; color: var(--on-dark-dim); }

  /* ---- Closing CTA ---- */
  .closing { background: var(--night); color: var(--on-dark); text-align: center; }
  .closing h2 { font-size: clamp(40px, 6vw, 92px); max-width: 16ch; margin-inline: auto; }
  .closing h2 em { color: var(--gold-lit); }
  .closing p { margin: 22px auto 0; max-width: 46ch; color: var(--on-dark-dim); font-weight: 300; font-size: 19px; }
  .closing .hero-actions { justify-content: center; }
</style>
</head>
<body>

<!-- ================= HERO ================= -->
<header class="hero">
  <div class="hero-media"><img src="images/meroe-hero.png" alt="The royal pyramids of Meroë at golden hour" /></div>
  <div class="hero-veil"></div>
  <div class="hero-watermark" aria-hidden="true">السودان</div>
  <div class="hero-inner">
    <span class="hero-eyebrow" data-lang-group>
      <span data-lang-block="en">The Living Archive</span>
      <span data-lang-block="ar">الأرشيف الحيّ</span>
      <span data-lang-block="fr">L'Archive Vivante</span>
      <span data-lang-block="es">El Archivo Vivo</span>
      <span data-lang-block="de">Das lebendige Archiv</span>
    </span>
    <h1 data-lang-group>
      <span data-lang-block="en">A country older than <em>memory.</em></span>
      <span data-lang-block="ar">بلدٌ أقدمُ من <em>الذاكرة.</em></span>
      <span data-lang-block="fr">Un pays plus ancien que la <em>mémoire.</em></span>
      <span data-lang-block="es">Un país más antiguo que la <em>memoria.</em></span>
      <span data-lang-block="de">Ein Land älter als die <em>Erinnerung.</em></span>
    </h1>
    <p class="sub" data-lang-group>
      <span data-lang-block="en">More royal pyramids than anywhere on earth. Two Niles meeting at one heart. A coast of coral, a green mountain in the west. Sudan, on its own terms.</span>
      <span data-lang-block="ar">أهراماتٌ ملكيّةٌ أكثرُ من أيِّ أرضٍ على وجهِ الأرض. نيلانِ يلتقيانِ في قلبٍ واحد. ساحلٌ من المرجان، وجبلٌ أخضرُ في الغرب. السودانُ، على شروطهِ هو.</span>
      <span data-lang-block="fr">Plus de pyramides royales que partout au monde. Deux Nils qui se rejoignent en un seul cœur. Une côte de corail, une montagne verte à l'ouest. Le Soudan, selon ses propres termes.</span>
      <span data-lang-block="es">Más pirámides reales que en cualquier lugar del mundo. Dos Nilos que se encuentran en un solo corazón. Una costa de coral, una montaña verde en el oeste. Sudán, en sus propios términos.</span>
      <span data-lang-block="de">Mehr königliche Pyramiden als irgendwo auf der Erde. Zwei Nile, die sich in einem Herzen treffen. Eine Korallenküste, ein grüner Berg im Westen. Der Sudan, zu seinen eigenen Bedingungen.</span>
    </p>
    <div class="hero-actions">
      <a class="btn btn-light" href="chronicles.html" data-lang-group>
        <span data-lang-block="en">Enter the Chronicles</span>
        <span data-lang-block="ar">ادخل الفصول</span>
        <span data-lang-block="fr">Entrer dans les Chroniques</span>
        <span data-lang-block="es">Entrar en las Crónicas</span>
        <span data-lang-block="de">Die Chroniken betreten</span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
      <a class="btn btn-outline-light" href="destinations.html" data-lang-group>
        <span data-lang-block="en">See the destinations</span>
        <span data-lang-block="ar">شاهد الوجهات</span>
        <span data-lang-block="fr">Voir les destinations</span>
        <span data-lang-block="es">Ver los destinos</span>
        <span data-lang-block="de">Reiseziele ansehen</span>
      </a>
    </div>
    <span class="hero-scrollcue" data-lang-group>
      <span class="d"></span>
      <span data-lang-block="en">Scroll to begin</span>
      <span data-lang-block="ar">انزل للبداية</span>
      <span data-lang-block="fr">Défiler pour commencer</span>
      <span data-lang-block="es">Desplázate para empezar</span>
      <span data-lang-block="de">Scrollen zum Beginnen</span>
    </span>
  </div>
</header>

<!-- ================= STATEMENT + FIGURES ================= -->
<section class="section statement">
  <div class="wrap">
    <p class="eyebrow reveal" data-lang-group>
      <span data-lang-block="en">An invitation</span><span data-lang-block="ar">دعوة</span><span data-lang-block="fr">Une invitation</span><span data-lang-block="es">Una invitación</span><span data-lang-block="de">Eine Einladung</span>
    </p>
    <h2 class="big reveal" data-d="1" style="margin-top:18px" data-lang-group>
      <span data-lang-block="en">For four thousand years this land built kingdoms, and kept them <em>quiet.</em></span>
      <span data-lang-block="ar">طوالَ أربعةِ آلافِ عام، بنى هذا البلدُ ممالكَ، وأبقاها <em>هادئة.</em></span>
      <span data-lang-block="fr">Pendant quatre mille ans, cette terre a bâti des royaumes, et les a gardés <em>silencieux.</em></span>
      <span data-lang-block="es">Durante cuatro mil años esta tierra construyó reinos, y los mantuvo <em>en silencio.</em></span>
      <span data-lang-block="de">Viertausend Jahre lang baute dieses Land Königreiche — und hielt sie <em>still.</em></span>
    </h2>

    <div class="figs reveal" data-d="2">
      <div class="fig"><div class="n">200<sup>+</sup></div><div class="l" data-lang-group><span data-lang-block="en">Royal pyramids</span><span data-lang-block="ar">هرمٌ ملكيّ</span><span data-lang-block="fr">Pyramides royales</span><span data-lang-block="es">Pirámides reales</span><span data-lang-block="de">Königliche Pyramiden</span></div></div>
      <div class="fig"><div class="n">4,000<sup>yr</sup></div><div class="l" data-lang-group><span data-lang-block="en">Of Nile civilisation</span><span data-lang-block="ar">من حضارة النيل</span><span data-lang-block="fr">De civilisation du Nil</span><span data-lang-block="es">De civilización del Nilo</span><span data-lang-block="de">Nil-Zivilisation</span></div></div>
      <div class="fig"><div class="n">750<sup>km</sup></div><div class="l" data-lang-group><span data-lang-block="en">Of Red Sea coast</span><span data-lang-block="ar">من ساحل البحر الأحمر</span><span data-lang-block="fr">De côte de la mer Rouge</span><span data-lang-block="es">De costa del mar Rojo</span><span data-lang-block="de">Rotmeerküste</span></div></div>
      <div class="fig"><div class="n">3,042<sup>m</sup></div><div class="l" data-lang-group><span data-lang-block="en">Jebel Marra summit</span><span data-lang-block="ar">قمّة جبل مرّة</span><span data-lang-block="fr">Sommet du Jebel Marra</span><span data-lang-block="es">Cumbre de Jebel Marra</span><span data-lang-block="de">Gipfel des Jebel Marra</span></div></div>
    </div>
  </div>
</section>

<!-- ================= GATEWAYS ================= -->
<section class="section gateways">
  <div class="wrap">
    <div class="shead reveal">
      <p class="eyebrow" data-lang-group><span data-lang-block="en">Three ways in</span><span data-lang-block="ar">ثلاثةُ مداخل</span><span data-lang-block="fr">Trois entrées</span><span data-lang-block="es">Tres entradas</span><span data-lang-block="de">Drei Zugänge</span></p>
      <h2 style="margin-top:14px" data-lang-group>
        <span data-lang-block="en">Where will you <em>begin?</em></span>
        <span data-lang-block="ar">من أين <em>تبدأ؟</em></span>
        <span data-lang-block="fr">Où allez-vous <em>commencer ?</em></span>
        <span data-lang-block="es">¿Por dónde vas a <em>empezar?</em></span>
        <span data-lang-block="de">Wo wirst du <em>beginnen?</em></span>
      </h2>
    </div>

    <div class="grid g3" style="margin-top:56px">
      <a class="tile gw-tile reveal" href="destinations.html">
        <img src="images/jebel-barkal.png" alt="Jebel Barkal" />
        <div class="tile-veil"></div>
        <div class="tile-body" data-lang-group>
          <p class="eyebrow">01</p>
          <h3 data-lang-group2><span data-lang-block="en">Destinations</span><span data-lang-block="ar">الوجهات</span><span data-lang-block="fr">Destinations</span><span data-lang-block="es">Destinos</span><span data-lang-block="de">Reiseziele</span></h3>
          <p data-lang-group2><span data-lang-block="en">Six places worth the longer flight — pyramids, two rivers, a coral sea.</span><span data-lang-block="ar">ستُّ وجهاتٍ تستحقُّ الرحلةَ الأطول — أهرامٌ، ونهرانِ، وبحرٌ مرجانيّ.</span><span data-lang-block="fr">Six lieux qui valent le détour — pyramides, deux fleuves, une mer de corail.</span><span data-lang-block="es">Seis lugares que valen el viaje — pirámides, dos ríos, un mar de coral.</span><span data-lang-block="de">Sechs Orte, die den Weg lohnen — Pyramiden, zwei Flüsse, ein Korallenmeer.</span></p>
        </div>
      </a>
      <a class="tile gw-tile reveal" data-d="1" href="heritage.html">
        <img src="images/coffee-ritual.png" alt="Jebena coffee" />
        <div class="tile-veil"></div>
        <div class="tile-body">
          <p class="eyebrow">02</p>
          <h3 data-lang-group2><span data-lang-block="en">Heritage</span><span data-lang-block="ar">التراث</span><span data-lang-block="fr">Patrimoine</span><span data-lang-block="es">Patrimonio</span><span data-lang-block="de">Erbe</span></h3>
          <p data-lang-group2><span data-lang-block="en">Hands of Sudan — woven baskets, painted doors, the slowest coffee on earth.</span><span data-lang-block="ar">أيادي السودان — سلالٌ منسوجة، وأبوابٌ مرسومة، وأبطأُ قهوةٍ على الأرض.</span><span data-lang-block="fr">Les mains du Soudan — paniers tressés, portes peintes, le café le plus lent du monde.</span><span data-lang-block="es">Manos de Sudán — cestos trenzados, puertas pintadas, el café más lento del mundo.</span><span data-lang-block="de">Hände Sudans — geflochtene Körbe, bemalte Türen, der langsamste Kaffee der Welt.</span></p>
        </div>
      </a>
      <a class="tile gw-tile reveal" data-d="2" href="chronicles.html">
        <img src="images/desert-camp.png" alt="The Chronicles" />
        <div class="tile-veil"></div>
        <div class="tile-body">
          <p class="eyebrow">03</p>
          <h3 data-lang-group2><span data-lang-block="en">Chronicles</span><span data-lang-block="ar">الفصول</span><span data-lang-block="fr">Chroniques</span><span data-lang-block="es">Crónicas</span><span data-lang-block="de">Chroniken</span></h3>
          <p data-lang-group2><span data-lang-block="en">Six bilingual essays — Kerma, Barkal, Marra, Kassala, Suakin, and the hands.</span><span data-lang-block="ar">ستُّ مقالاتٍ بلغتين — كرمة، البركل، مرّة، كسلا، سواكن، والأيادي.</span><span data-lang-block="fr">Six essais bilingues — Kerma, Barkal, Marra, Kassala, Suakin, et les mains.</span><span data-lang-block="es">Seis ensayos bilingües — Kerma, Barkal, Marra, Kassala, Suakin, y las manos.</span><span data-lang-block="de">Sechs zweisprachige Essays — Kerma, Barkal, Marra, Kassala, Suakin und die Hände.</span></p>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ================= PEOPLE & HOSPITALITY ================= -->
<section class="section people">
  <style>
    .people { background: var(--cream); position: relative; overflow: hidden; }
    .people .karam-wm { position:absolute; top: -4%; inset-inline-start: -3%; font-family: var(--font-display-ar); font-size: 26vw; line-height:1; color: rgba(158,71,51,.05); pointer-events:none; user-select:none; }
    .people .lead-row { display:grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px,5vw,72px); align-items:end; position:relative; z-index:1; }
    @media (max-width:880px){ .people .lead-row { grid-template-columns:1fr; gap:24px; } }
    .people h2 { font-size: clamp(36px,5.4vw,82px); line-height:1.0; }
    .people h2 em { color: var(--terracotta); }
    .people .lead { max-width: 46ch; }
    .people .pgrid { display:grid; grid-template-columns: repeat(3,1fr); gap:24px; margin-top: clamp(48px,6vw,80px); position:relative; z-index:1; }
    @media (max-width:760px){ .people .pgrid { grid-template-columns:1fr; gap:18px; } }
    .pcell { padding: 32px 30px; background: var(--bone); border:1px solid var(--line); border-radius: 22px; transition: transform .4s var(--ease), box-shadow .4s var(--ease); }
    .pcell:hover { transform: translateY(-5px); box-shadow: 0 30px 64px -40px rgba(26,26,26,.4); }
    .pcell .ar-word { font-family: var(--font-display-ar); font-size: 40px; line-height:1; color: var(--terracotta); }
    .pcell h3 { font-size: 23px; margin-top: 14px; }
    .pcell p { margin-top: 10px; color: var(--ink-soft); font-size: 15px; line-height:1.6; }
    /* flag thread */
    .flag-thread { display:flex; height:4px; width:74px; border-radius:4px; overflow:hidden; margin-top: 30px; position:relative; z-index:1; box-shadow: 0 2px 10px -4px rgba(26,26,26,.4); }
    .flag-thread i { flex:1; } .flag-thread .r{background:#C1272D;} .flag-thread .w{background:#fff;} .flag-thread .k{background:#1A1A1A;} .flag-thread .g{flex:0 0 16px;background:#007229;}
  </style>
  <div class="karam-wm" aria-hidden="true">كرم</div>
  <div class="wrap">
    <div class="lead-row">
      <div class="reveal">
        <p class="eyebrow" data-lang-group><span data-lang-block="en">The people</span><span data-lang-block="ar">أهل السودان</span><span data-lang-block="fr">Le peuple</span><span data-lang-block="es">La gente</span><span data-lang-block="de">Die Menschen</span></p>
        <h2 style="margin-top:14px" data-lang-group>
          <span data-lang-block="en">The kindest welcome <em>on earth.</em></span>
          <span data-lang-block="ar">أكرمُ ترحيبٍ <em>على الأرض.</em></span>
          <span data-lang-block="fr">L'accueil le plus chaleureux <em>du monde.</em></span>
          <span data-lang-block="es">La bienvenida más cálida <em>del mundo.</em></span>
          <span data-lang-block="de">Der herzlichste Empfang <em>der Welt.</em></span>
        </h2>
        <div class="flag-thread" aria-hidden="true"><i class="r"></i><i class="w"></i><i class="k"></i><i class="g"></i></div>
      </div>
      <p class="lede reveal" data-d="1" data-lang-group>
        <span data-lang-block="en">Travellers come for the pyramids and leave talking about the people. Knock on any door, a stranger, and you will be given tea, then food, then a place to sleep — and they will thank <em>you</em> for coming.</span>
        <span data-lang-block="ar">يأتي المسافرونَ للأهرام، ويغادرونَ وهم يتحدّثونَ عن الناس. اطرُق أيَّ بابٍ، غريباً، فيُقدَّمُ لك الشايُ، ثمّ الطعام، ثمّ مكانٌ للنوم — ثمّ يشكرونك <em>أنت</em> على المجيء.</span>
        <span data-lang-block="fr">Les voyageurs viennent pour les pyramides et repartent en parlant des gens. Frappez à n'importe quelle porte, étranger, et on vous offrira le thé, puis le repas, puis un lit — et l'on vous remerciera d'être venu.</span>
        <span data-lang-block="es">Los viajeros vienen por las pirámides y se van hablando de la gente. Llama a cualquier puerta, extraño, y te darán té, luego comida, luego un lugar para dormir — y te darán las gracias por venir.</span>
        <span data-lang-block="de">Reisende kommen für die Pyramiden und gehen, indem sie von den Menschen sprechen. Klopfe an jede Tür, als Fremder, und man gibt dir Tee, dann Essen, dann einen Schlafplatz — und dankt dir, dass du gekommen bist.</span>
      </p>
    </div>

    <div class="pgrid">
      <div class="pcell reveal">
        <div class="ar-word">كَرَم</div>
        <h3 data-lang-group><span data-lang-block="en">Karam — generosity</span><span data-lang-block="ar">الكَرَم</span><span data-lang-block="fr">Karam — la générosité</span><span data-lang-block="es">Karam — generosidad</span><span data-lang-block="de">Karam — Großzügigkeit</span></h3>
        <p data-lang-group><span data-lang-block="en">To give what you have to a guest is not politeness here — it is who you are. The poorest household will share its last bread without a thought.</span><span data-lang-block="ar">أن تُعطيَ الضيفَ ما تملك ليس مجاملةً هنا — بل هو هُويّتُك. أفقرُ بيتٍ يقاسمُك آخرَ رغيفٍ دونَ تردّد.</span><span data-lang-block="fr">Donner ce que l'on a à un hôte n'est pas une politesse ici — c'est une identité. Le foyer le plus pauvre partagera son dernier pain.</span><span data-lang-block="es">Dar lo que tienes a un huésped no es cortesía aquí — es quién eres. El hogar más pobre comparte su último pan.</span><span data-lang-block="de">Einem Gast zu geben, was man hat, ist hier keine Höflichkeit — es ist Identität. Das ärmste Haus teilt sein letztes Brot.</span></p>
      </div>
      <div class="pcell reveal" data-d="1">
        <div class="ar-word">شاي</div>
        <h3 data-lang-group><span data-lang-block="en">Tea on the street</span><span data-lang-block="ar">شاي الستّات</span><span data-lang-block="fr">Le thé de la rue</span><span data-lang-block="es">El té de la calle</span><span data-lang-block="de">Tee auf der Straße</span></h3>
        <p data-lang-group><span data-lang-block="en">On every corner a tea lady sits with her charcoal stove, spiced tea and a low stool. Sit, and the conversation is free.</span><span data-lang-block="ar">في كلِّ ركنٍ تجلسُ ستُّ الشايِ بكانونها، وشايها المُبهَّر، وكرسيها الواطئ. اجلس، والحديثُ مجّاني.</span><span data-lang-block="fr">À chaque coin, une marchande de thé, son réchaud, son thé épicé et un tabouret bas. Asseyez-vous, la conversation est offerte.</span><span data-lang-block="es">En cada esquina, una vendedora de té con su brasero, té especiado y un taburete bajo. Siéntate, la conversación es gratis.</span><span data-lang-block="de">An jeder Ecke sitzt eine Teefrau mit Kohleofen, gewürztem Tee und einem niedrigen Hocker. Setz dich — das Gespräch ist umsonst.</span></p>
      </div>
      <div class="pcell reveal" data-d="2">
        <div class="ar-word">٥٠٠+</div>
        <h3 data-lang-group><span data-lang-block="en">500+ peoples, one table</span><span data-lang-block="ar">٥٠٠+ قبيلة، مائدةٌ واحدة</span><span data-lang-block="fr">500+ peuples, une table</span><span data-lang-block="es">500+ pueblos, una mesa</span><span data-lang-block="de">500+ Völker, ein Tisch</span></h3>
        <p data-lang-group><span data-lang-block="en">Nubian, Beja, Fur, Nuba, and hundreds more — over a hundred languages, sharing one long history along one long river.</span><span data-lang-block="ar">نوبةٌ وبجا وفورٌ ونوبا، ومئاتٌ غيرُهم — أكثرُ من مئةِ لغةٍ، يتقاسمونَ تاريخاً واحداً طويلاً على نهرٍ واحدٍ طويل.</span><span data-lang-block="fr">Nubiens, Bedjas, Four, Nouba et des centaines d'autres — plus de cent langues, une longue histoire le long d'un long fleuve.</span><span data-lang-block="es">Nubios, beja, fur, nuba y cientos más — más de cien lenguas, una larga historia junto a un largo río.</span><span data-lang-block="de">Nubier, Bedscha, Fur, Nuba und Hunderte mehr — über hundert Sprachen, eine lange Geschichte an einem langen Fluss.</span></p>
      </div>
    </div>
  </div>
</section>

<!-- ================= FEATURE: WEST ================= -->
<section class="feat">
  <img src="images/nubian-village.png" alt="The green west" />
  <div class="veil"></div>
  <div class="wrap"><div class="inner reveal">
    <p class="eyebrow" style="color:var(--gold-lit)" data-lang-group><span data-lang-block="en">The west · Jebel Marra</span><span data-lang-block="ar">الغرب · جبل مرّة</span><span data-lang-block="fr">L'ouest · Jebel Marra</span><span data-lang-block="es">El oeste · Jebel Marra</span><span data-lang-block="de">Der Westen · Jebel Marra</span></p>
    <h2 style="margin-top:14px" data-lang-group>
      <span data-lang-block="en">A green crown above the <em>desert.</em></span>
      <span data-lang-block="ar">تاجٌ أخضرُ فوقَ <em>الصحراء.</em></span>
      <span data-lang-block="fr">Une couronne verte au-dessus du <em>désert.</em></span>
      <span data-lang-block="es">Una corona verde sobre el <em>desierto.</em></span>
      <span data-lang-block="de">Eine grüne Krone über der <em>Wüste.</em></span>
    </h2>
    <p data-lang-group>
      <span data-lang-block="en">In the heart of Darfur, the volcanic massif of Jebel Marra rises green and cool, terraced with orchards and crowned by the twin crater lakes of Deriba.</span>
      <span data-lang-block="ar">في قلبِ دارفور، يرتفعُ جبلُ مرّةَ البركانيُّ أخضرَ بارداً، مدرَّجاً بالبساتين، متوَّجاً ببحيرتي فوهةِ دريبة التوأمين.</span>
      <span data-lang-block="fr">Au cœur du Darfour, le massif volcanique du Jebel Marra s'élève, vert et frais, en terrasses de vergers, couronné par les lacs jumeaux du cratère de Deriba.</span>
      <span data-lang-block="es">En el corazón de Darfur, el macizo volcánico de Jebel Marra se alza verde y fresco, en terrazas de huertos, coronado por los lagos gemelos del cráter de Deriba.</span>
      <span data-lang-block="de">Im Herzen Darfurs erhebt sich das vulkanische Massiv des Jebel Marra grün und kühl, terrassiert mit Obstgärten, gekrönt von den Zwillingskraterseen von Deriba.</span>
    </p>
    <a class="btn btn-light" style="margin-top:30px" href="chronicles.html#marra" data-lang-group>
      <span data-lang-block="en">Read the chapter</span><span data-lang-block="ar">اقرأ الفصل</span><span data-lang-block="fr">Lire le chapitre</span><span data-lang-block="es">Leer el capítulo</span><span data-lang-block="de">Kapitel lesen</span>
      <span class="arrow" aria-hidden="true">→</span>
    </a>
  </div></div>
</section>

<!-- ================= CLOSING ================= -->
<section class="section closing">
  <div class="wrap">
    <h2 class="reveal" data-lang-group>
      <span data-lang-block="en">You will be the only one <em>there.</em></span>
      <span data-lang-block="ar">ستكونُ الوحيدَ <em>هناك.</em></span>
      <span data-lang-block="fr">Vous serez le seul <em>là-bas.</em></span>
      <span data-lang-block="es">Serás el único <em>allí.</em></span>
      <span data-lang-block="de">Du wirst der Einzige <em>dort sein.</em></span>
    </h2>
    <p class="reveal" data-d="1" data-lang-group>
      <span data-lang-block="en">The archive grows. Begin with the Chronicles, then walk the destinations.</span>
      <span data-lang-block="ar">الأرشيفُ ينمو. ابدأ بالفصول، ثمّ طُف بالوجهات.</span>
      <span data-lang-block="fr">L'archive grandit. Commencez par les Chroniques, puis parcourez les destinations.</span>
      <span data-lang-block="es">El archivo crece. Empieza por las Crónicas, luego recorre los destinos.</span>
      <span data-lang-block="de">Das Archiv wächst. Beginne mit den Chroniken, dann erkunde die Reiseziele.</span>
    </p>
    <div class="hero-actions reveal" data-d="2" style="margin-top:34px">
      <a class="btn btn-accent" href="chronicles.html" data-lang-group>
        <span data-lang-block="en">Enter the Chronicles</span><span data-lang-block="ar">ادخل الفصول</span><span data-lang-block="fr">Entrer dans les Chroniques</span><span data-lang-block="es">Entrar en las Crónicas</span><span data-lang-block="de">Die Chroniken betreten</span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>

<script>window.PAGE="home";</script>
<script src="assets/app.js"></script>
<script>
  // lang-group2 helper: same fallback behaviour as data-lang-group for nested groups
  document.querySelectorAll('[data-lang-group2]').forEach(function(g){ g.setAttribute('data-lang-group',''); });
</script>
</body>
</html>
