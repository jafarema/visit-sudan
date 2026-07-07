// ===== LANGUAGE SYSTEM =====
(function() {
  const supportedLangs = ['en', 'ar', 'fr', 'es', 'de'];
  
  // Get stored language or detect from browser
  let lang = localStorage.getItem('visit-sudan-lang');
  if (!lang) {
    const userLang = navigator.language || navigator.userLanguage;
    lang = 'en';
    if (userLang.startsWith('ar')) lang = 'ar';
    else if (userLang.startsWith('fr')) lang = 'fr';
    else if (userLang.startsWith('es')) lang = 'es';
    else if (userLang.startsWith('de')) lang = 'de';
  }
  
  // Apply language
  setLanguage(lang);
  
  function setLanguage(selectedLang) {
    if (!supportedLangs.includes(selectedLang)) selectedLang = 'en';
    
    localStorage.setItem('visit-sudan-lang', selectedLang);
    document.documentElement.setAttribute('data-lang', selectedLang);
    document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
    
    // Show/hide language blocks
    document.querySelectorAll('[data-lang-block]').forEach(el => {
      el.style.display = el.getAttribute('data-lang-block') === selectedLang ? 'inline' : 'none';
    });
    document.querySelectorAll('div[data-lang-block]').forEach(el => {
      el.style.display = el.getAttribute('data-lang-block') === selectedLang ? 'block' : 'none';
    });
    
    // Update language toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === selectedLang);
    });
  }
  
  // Expose language switching globally
  window.setLanguage = setLanguage;
})();

// ===== NAVIGATION & FOOTER INJECTION =====
(function() {
  const pages = {
    'home': 'index.html',
    'destinations': 'destinations.html',
    'heritage': 'heritage.html',
    'chronicles': 'chronicles.html',
    'gallery': 'gallery.html',
    'visit': 'visit.html',
    'news': 'news.html',
    'about': 'about.html'
  };
  
  const currentPage = window.PAGE || 'home';
  
  // Navigation HTML (5 languages)
  const navHTML = `
    <nav>
      <div class="wrap">
        <a href="index.html" class="logo" data-lang-group>
          <span data-lang-block="en">Visit Sudan</span>
          <span data-lang-block="ar">زيارة السودان</span>
          <span data-lang-block="fr">Visite Soudan</span>
          <span data-lang-block="es">Visita Sudán</span>
          <span data-lang-block="de">Besuch Sudan</span>
        </a>
        <ul class="menu">
          <li><a href="index.html" class="${currentPage === 'home' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">Home</span>
            <span data-lang-block="ar">الرئيسية</span>
            <span data-lang-block="fr">Accueil</span>
            <span data-lang-block="es">Inicio</span>
            <span data-lang-block="de">Startseite</span>
          </a></li>
          <li><a href="destinations.html" class="${currentPage === 'destinations' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">Destinations</span>
            <span data-lang-block="ar">الوجهات</span>
            <span data-lang-block="fr">Destinations</span>
            <span data-lang-block="es">Destinos</span>
            <span data-lang-block="de">Reiseziele</span>
          </a></li>
          <li><a href="chronicles.html" class="${currentPage === 'chronicles' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">Chronicles</span>
            <span data-lang-block="ar">الفصول</span>
            <span data-lang-block="fr">Chroniques</span>
            <span data-lang-block="es">Crónicas</span>
            <span data-lang-block="de">Chroniken</span>
          </a></li>
          <li><a href="gallery.html" class="${currentPage === 'gallery' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">Gallery</span>
            <span data-lang-block="ar">المعرض</span>
            <span data-lang-block="fr">Galerie</span>
            <span data-lang-block="es">Galería</span>
            <span data-lang-block="de">Galerie</span>
          </a></li>
          <li><a href="visit.html" class="${currentPage === 'visit' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">Visit</span>
            <span data-lang-block="ar">زيارة</span>
            <span data-lang-block="fr">Visiter</span>
            <span data-lang-block="es">Visita</span>
            <span data-lang-block="de">Besuch</span>
          </a></li>
          <li><a href="about.html" class="${currentPage === 'about' ? 'active' : ''}" data-lang-group>
            <span data-lang-block="en">About</span>
            <span data-lang-block="ar">عن المشروع</span>
            <span data-lang-block="fr">À propos</span>
            <span data-lang-block="es">Acerca de</span>
            <span data-lang-block="de">Über</span>
          </a></li>
          <li class="lang-toggle">
            <button data-lang-btn="en" class="lang-btn">EN</button>
            <button data-lang-btn="ar" class="lang-btn">ع</button>
            <button data-lang-btn="fr" class="lang-btn">FR</button>
            <button data-lang-btn="es" class="lang-btn">ES</button>
            <button data-lang-btn="de" class="lang-btn">DE</button>
          </li>
        </ul>
      </div>
    </nav>
  `;
  
  // Footer HTML (5 languages)
  const footerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-col">
            <h4 data-lang-group>
              <span data-lang-block="en">Navigate</span>
              <span data-lang-block="ar">استكشف</span>
              <span data-lang-block="fr">Naviguer</span>
              <span data-lang-block="es">Navegar</span>
              <span data-lang-block="de">Navigieren</span>
            </h4>
            <ul>
              <li><a href="destinations.html" data-lang-group>
                <span data-lang-block="en">Six Destinations</span>
                <span data-lang-block="ar">ستُّ وجهات</span>
                <span data-lang-block="fr">Six Destinations</span>
                <span data-lang-block="es">Seis Destinos</span>
                <span data-lang-block="de">Sechs Reiseziele</span>
              </a></li>
              <li><a href="heritage.html" data-lang-group>
                <span data-lang-block="en">Heritage & Hands</span>
                <span data-lang-block="ar">التراث والأيادي</span>
                <span data-lang-block="fr">Patrimoine & Mains</span>
                <span data-lang-block="es">Patrimonio & Manos</span>
                <span data-lang-block="de">Erbe & Hände</span>
              </a></li>
              <li><a href="chronicles.html" data-lang-group>
                <span data-lang-block="en">Chronicles</span>
                <span data-lang-block="ar">الفصول</span>
                <span data-lang-block="fr">Chroniques</span>
                <span data-lang-block="es">Crónicas</span>
                <span data-lang-block="de">Chroniken</span>
              </a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-lang-group>
              <span data-lang-block="en">Explore</span>
              <span data-lang-block="ar">استعرض</span>
              <span data-lang-block="fr">Explorer</span>
              <span data-lang-block="es">Explorar</span>
              <span data-lang-block="de">Erkunden</span>
            </h4>
            <ul>
              <li><a href="gallery.html" data-lang-group>
                <span data-lang-block="en">Photo Mosaic</span>
                <span data-lang-block="ar">فسيفساء الصور</span>
                <span data-lang-block="fr">Mosaïque Photographique</span>
                <span data-lang-block="es">Mosaico Fotográfico</span>
                <span data-lang-block="de">Fotomosaik</span>
              </a></li>
              <li><a href="news.html" data-lang-group>
                <span data-lang-block="en">News & Dispatches</span>
                <span data-lang-block="ar">الأخبار والتقارير</span>
                <span data-lang-block="fr">Actualités & Dépêches</span>
                <span data-lang-block="es">Noticias & Despachos</span>
                <span data-lang-block="de">Nachrichten & Berichte</span>
              </a></li>
              <li><a href="visit.html" data-lang-group>
                <span data-lang-block="en">Plan Your Visit</span>
                <span data-lang-block="ar">خطّط زيارتك</span>
                <span data-lang-block="fr">Planifiez Votre Visite</span>
                <span data-lang-block="es">Planifica Tu Visita</span>
                <span data-lang-block="de">Planen Sie Ihren Besuch</span>
              </a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-lang-group>
              <span data-lang-block="en">About</span>
              <span data-lang-block="ar">عن</span>
              <span data-lang-block="fr">À propos</span>
              <span data-lang-block="es">Acerca de</span>
              <span data-lang-block="de">Über</span>
            </h4>
            <ul>
              <li><a href="about.html" data-lang-group>
                <span data-lang-block="en">This Project</span>
                <span data-lang-block="ar">هذا المشروع</span>
                <span data-lang-block="fr">Ce Projet</span>
                <span data-lang-block="es">Este Proyecto</span>
                <span data-lang-block="de">Dieses Projekt</span>
              </a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-credit" data-lang-group>
            <span data-lang-block="en">© 2025 The Living Archive. Sudan, on its own terms.</span>
            <span data-lang-block="ar">© 2025 الأرشيف الحيّ. السودان، بشروطه الخاصة.</span>
            <span data-lang-block="fr">© 2025 L'Archive Vivante. Le Soudan, à ses conditions.</span>
            <span data-lang-block="es">© 2025 El Archivo Vivo. Sudán, en sus propios términos.</span>
            <span data-lang-block="de">© 2025 Das lebendige Archiv. Der Sudan nach seinen eigenen Bedingungen.</span>
          </p>
        </div>
      </div>
    </footer>
  `;
  
  // Inject nav at start of body
  if (!document.querySelector('nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  
  // Inject footer at end of body
  if (!document.querySelector('footer')) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  
  // Add language button listeners
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.setLanguage(btn.getAttribute('data-lang-btn'));
    });
  });
})();

// ===== LAZY LOADING FOR IMAGES =====
(function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
})();

// ===== SCROLL REVEAL ANIMATIONS =====
(function() {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }
})();

// ===== PERFORMANCE: Preload key images =====
(function() {
  const criticalImages = ['images/meroe-hero.png', 'images/nubian-village.png'];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
})();

console.log('✓ App loaded:', window.PAGE || 'unknown');
