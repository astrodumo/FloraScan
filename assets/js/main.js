/* ─────────────────────────────────────────
   Botanica — main.js
   ───────────────────────────────────────── */

/* ── HAMBURGER MENU ── */
function initMobileNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Inject hamburger button into nav
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  // Detect which page we're on for active link
  const path = window.location.pathname;
  const isRoot    = path.endsWith('index.html') || path.endsWith('/');
  const isScan    = path.includes('scan');
  const isRem     = path.includes('remedies');
  const isRarity  = path.includes('rarity');
  const isGuide   = path.includes('field-guide');

  // Determine correct relative prefix
  const inPages = path.includes('/pages/');
  const prefix  = inPages ? '' : 'pages/';

  // Build mobile drawer and inject into body
  const drawer = document.createElement('div');
  drawer.className = 'nav-mobile-drawer';
  drawer.id = 'nav-mobile-drawer';
  drawer.innerHTML = `
    <a href="${inPages ? '../index.html' : 'index.html'}" class="nav-mobile-logo">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C16 2 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 2 16 2Z" fill="#6ba368" opacity="0.7"/>
        <path d="M16 8C16 8 10 14 10 20C10 23.3 12.7 26 16 26" stroke="#8fb08a" stroke-width="1" fill="none"/>
        <line x1="16" y1="26" x2="16" y2="30" stroke="#6ba368" stroke-width="1.5"/>
      </svg>
      FloraSense
    </a>
    <button class="nav-mobile-close" id="nav-mobile-close">&times;</button>
    <ul class="nav-mobile-links">
      <li><a href="${prefix}scan.html"        ${isScan    ? 'class="active"' : ''}>Identify</a></li>
      <li><a href="${prefix}remedies.html"    ${isRem     ? 'class="active"' : ''}>Remedies</a></li>
      <li><a href="${prefix}rarity.html"      ${isRarity  ? 'class="active"' : ''}>Rarity Index</a></li>
      <li><a href="${prefix}field-guide.html" ${isGuide   ? 'class="active"' : ''}>Field Guide</a></li>
    </ul>
    
  `;
  document.body.appendChild(drawer);

  //<button class="nav-mobile-cta" onclick="window.location.href='${prefix}scan.html'">Begin Scan</button>

  // Open
  hamburger.addEventListener('click', () => {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Close via X button
  document.getElementById('nav-mobile-close').addEventListener('click', closeDrawer);

  // Close on backdrop click
  drawer.addEventListener('click', e => {
    if (e.target === drawer) closeDrawer();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ── NAV SCROLL EFFECT ── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background     = 'rgba(13,26,14,0.95)';
      nav.style.backdropFilter = 'blur(12px)';
    } else {
      nav.style.background     = '';
      nav.style.backdropFilter = '';
    }
  });
}

/* ── FADE-IN ON SCROLL ── */
function initScrollFade() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.feat').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── CTA BUTTONS ── 
function initCTAButtons() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const inPages = window.location.pathname.includes('/pages/');
      window.location.href = inPages ? 'scan.html' : 'pages/scan.html';
    });
  });
}*/

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initNavScroll();
  initScrollFade();
  initCTAButtons();
});
