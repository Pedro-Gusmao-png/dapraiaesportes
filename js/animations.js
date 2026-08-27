/* ============================================================
   Animations — scroll reveal + stat counters
   ============================================================ */

'use strict';

/* Elements with .reveal fade/slide in when they appear on screen */
function setupRevealAnimations() {
  const elements = $$('.reveal');
  if (elements.length === 0) return;

  // Without IntersectionObserver everything is shown at once
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* Stat numbers count up when visible (200+, 50+, ...) */
function setupCounters() {
  const numbers = $$('[data-count]');
  if (numbers.length === 0 || !('IntersectionObserver' in window)) return;

  function animate(element) {
    const target = Number(element.getAttribute('data-count')) || 0;
    const suffix = element.getAttribute('data-suffix') ?? '';
    const duration = 1300;
    const start = performance.now();

    function fmt(n) {
      return n.toLocaleString('pt-BR');
    }

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // slows down at the end
      element.textContent = fmt(Math.round(target * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  numbers.forEach((el) => observer.observe(el));
}
