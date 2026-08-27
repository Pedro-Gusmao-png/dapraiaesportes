/* ============================================================
   Main — entry point. Runs every module after the DOM loads.

   File order matters (config → ui/cart/animations/carousel → main)
   and is defined by the <script> tags in index.html.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // UI
  setupMenu();
  setupHeaderShadow();
  setupContacts();

  // Quote cart
  loadCart();
  renderCart();
  setupCartDrawer();
  setupBuyButtons();

  // Story carousel
  setupStoryCarousel();

  // Testimonials carousel
  setupTestimonialsCarousel();

  // Animations + extras
  setupRevealAnimations();
  setupCounters();
  setYear();
});
