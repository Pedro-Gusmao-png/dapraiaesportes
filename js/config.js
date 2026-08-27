/* ============================================================
   Config — site settings. Edit contact info and products here.
   ============================================================ */

'use strict';

const CONFIG = {
  // Country code + area code + number (digits only)
  whatsapp: '5581985755827',

  // Instagram username (without @)
  instagram: 'dapraiaesportes',

  // Contact e-mail
  email: 'dpraiaesportes@gmail.com',

  // Default message when none is set
  defaultMessage: 'Olá! Vim pelo site da Da Praia Esportes.',
};

/* ---------- Helpers ---------- */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || CONFIG.defaultMessage);
  return `https://wa.me/${CONFIG.whatsapp}?text=${text}`;
}
