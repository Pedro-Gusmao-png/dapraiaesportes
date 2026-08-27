/* ============================================================
   UI — mobile menu, header shadow, contact links, toast, year
   ============================================================ */

'use strict';

/* ---------- Mobile menu (hamburger) ---------- */

function setupMenu() {
  const header = $('#site-header');
  const toggle = $('[data-menu-toggle]');
  if (!header || !toggle) return;

  function toggleMenu() {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('no-scroll', open);
  }

  function closeMenu() {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  toggle.addEventListener('click', toggleMenu);

  // Close when any nav link is clicked
  $$('#nav a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

/* ---------- Header shadow on scroll ---------- */

function setupHeaderShadow() {
  const header = $('#site-header');
  if (!header) return;

  function update() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Automatic contact links ----------

   Any element with data-contact="whatsapp|instagram|email"
   gets the right address from CONFIG. */

function setupContacts() {
  $$('[data-contact]').forEach((element) => {
    const type = element.getAttribute('data-contact');

    if (type === 'whatsapp') {
      const message = element.getAttribute('data-message');
      element.href = buildWhatsAppLink(message);
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }

    if (type === 'instagram') {
      element.href = `https://instagram.com/${CONFIG.instagram}`;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }

    if (type === 'email') {
      element.href = `mailto:${CONFIG.email}`;
    }
  });

  const emailText = $('[data-email-text]');
  if (emailText) emailText.textContent = CONFIG.email;
}

/* ---------- Toast (quick feedback message) ---------- */

let toastTimer = null;

function showToast(message) {
  const toast = $('[data-toast]');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Current year in the footer ---------- */

function setYear() {
  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}
