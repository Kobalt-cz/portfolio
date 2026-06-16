/* ══════════════════════════════════════════
   TOMÁŠ KOVAL — PORTFOLIO
   script.js
   ══════════════════════════════════════════ */

/* ── LIGHTBOX ── */

let galleryImages = [];
let currentIndex  = 0;

/**
 * Sestaví pole všech klikatelných obrázků na stránce
 * (thumbnaily projektů + obrázky v galerii).
 */
function buildGalleryIndex() {
  galleryImages = Array.from(
    document.querySelectorAll('.gallery-item img, .project-thumb')
  );
}

/**
 * Otevře lightbox pro daný <img> element.
 * @param {HTMLImageElement} imgEl
 */
function openLightbox(imgEl) {
  buildGalleryIndex();
  const idx = galleryImages.indexOf(imgEl);
  currentIndex = idx >= 0 ? idx : 0;
  showLightboxImage(currentIndex);
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Zobrazí obrázek na zadaném indexu v lightboxu.
 * @param {number} idx
 */
function showLightboxImage(idx) {
  const img = galleryImages[idx];
  if (!img) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-img').alt = img.alt;
  document.getElementById('lightbox-caption').textContent =
    img.dataset.caption || img.alt || '';
}

/**
 * Přejde na předchozí (-1) nebo následující (+1) obrázek.
 * @param {number} dir  -1 nebo +1
 */
function lightboxStep(dir) {
  if (galleryImages.length === 0) return;
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  showLightboxImage(currentIndex);
}

/** Zavře lightbox. */
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Zavře lightbox při kliknutí na tmavé pozadí (mimo obrázek).
 * @param {MouseEvent} e
 */
function closeLightboxOnBg(e) {
  if (e.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

/* Klávesová navigace */
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lightboxStep(1);
  if (e.key === 'ArrowLeft')  lightboxStep(-1);
});

/* ── PLYNULÉ ZVÝRAZNĚNÍ AKTIVNÍHO ODKAZU V NAVIGACI ── */

const sections  = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.style.color = '';                        /* reset */
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((sec) => observer.observe(sec));
