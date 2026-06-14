// Initialize language system
(function() {
  const userLang = navigator.language || navigator.userLanguage;
  let lang = 'en';
  
  const supportedLangs = ['en', 'ar', 'fr', 'es', 'de'];
  
  if (userLang.startsWith('ar')) lang = 'ar';
  else if (userLang.startsWith('fr')) lang = 'fr';
  else if (userLang.startsWith('es')) lang = 'es';
  else if (userLang.startsWith('de')) lang = 'de';
  
  // Set language
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.style.display = el.getAttribute('data-lang-block') === lang ? 'inline' : 'none';
  });
  document.querySelectorAll('div[data-lang-block]').forEach(el => {
    el.style.display = el.getAttribute('data-lang-block') === lang ? 'block' : 'none';
  });
})();

// Intersection Observer for reveal animations
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
})();

console.log('App loaded:', window.PAGE);
