// assets/js/main.js
// Minimal interaction logic: hamburger toggle, smooth scrolling, lazy-loading images
// 注释（中/英）已包含，便于后续扩展

// Hamburger menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scrolling for intra-page anchors
// Use behavior: 'smooth' where supported
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({behavior:'smooth'});
  }
});

// Lazy loading images using IntersectionObserver
const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
if ('IntersectionObserver' in window && lazyImages.length > 0) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// Language switch is implemented via directory links in this static scaffold - no JS required for SEO-friendly approach

// Export nothing; file runs in browser
