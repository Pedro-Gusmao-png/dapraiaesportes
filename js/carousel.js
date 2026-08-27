/* ============================================================
   Carousel — photo slider for the "Our journey" section and
   testimonials slider for the social proof section.

   Generic by design: they read whatever slide elements exist
   inside their roots, so adding content later requires only
   new markup in the HTML — dots, arrows, swipe and limits
   adapt automatically.
   ============================================================ */

'use strict';

function setupStoryCarousel() {
  const root = $('#story-carousel');
  if (!root) return;

  const track = root.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const prevButton = root.querySelector('[data-carousel-prev]');
  const nextButton = root.querySelector('[data-carousel-next]');
  const dotsHost = root.querySelector('[data-carousel-dots]');

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsHost.appendChild(dot);
    return dot;
  });

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  function goTo(target) {
    index = Math.max(0, Math.min(slides.length - 1, target));
    update();
  }

  prevButton.addEventListener('click', () => goTo(index - 1));
  nextButton.addEventListener('click', () => goTo(index + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(index + 1); }
  });

  let touchStartX = null;

  root.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  root.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(deltaX) < 45) return;
    goTo(index + (deltaX < 0 ? 1 : -1));
  }, { passive: true });

  update();
}

function setupTestimonialsCarousel() {
  const root = $('.tcarousel');
  if (!root) return;

  const grid = root.querySelector('[data-tcarousel-grid]');
  const cards = Array.from(grid.children);
  const dotsHost = root.querySelector('[data-tcarousel-dots]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 3000;
  const FADE = 380;

  let page = 0;
  let pages = 1;
  let dots = [];
  let timer = null;
  let swapTimeout = null;
  let perViewCache = 3;

  const perView = () => {
    if (window.matchMedia('(max-width: 700px)').matches) return 1;
    if (window.matchMedia('(max-width: 1024px)').matches) return 2;
    return 3;
  };

  function buildDots() {
    dotsHost.replaceChildren();
    dots = Array.from({ length: pages }, (_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Ir para o grupo de depoimentos ${i + 1}`);
      dot.addEventListener('click', () => {
        goTo(i);
        start();
      });
      dotsHost.appendChild(dot);
      return dot;
    });
  }

  function paint() {
    const first = page * perViewCache;
    cards.forEach((card, i) => {
      card.hidden = i < first || i >= first + perViewCache;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === page);
      dot.setAttribute('aria-current', i === page ? 'true' : 'false');
    });
  }

  /* Measure every possible group and pin the grid to the tallest
     one so that swapping cards never causes a layout shift. */
  function lockHeight() {
    const savedPage = page;
    let maxH = 0;

    for (let p = 0; p < pages; p++) {
      const first = p * perViewCache;
      cards.forEach((card, i) => {
        card.hidden = i < first || i >= first + perViewCache;
      });
      grid.style.minHeight = '';          // let it breathe for measurement
      maxH = Math.max(maxH, grid.offsetHeight);
    }

    page = savedPage;
    paint();
    grid.style.minHeight = maxH + 'px';
  }

  function refresh() {
    perViewCache = perView();
    pages = Math.ceil(cards.length / perViewCache);
    page = Math.min(page, pages - 1);
    buildDots();
    paint();
    lockHeight();
    start();
  }

  function goTo(target, instant = false) {
    page = Math.max(0, Math.min(pages - 1, target));
    if (instant || reducedMotion) {
      paint();
      return;
    }

    // Fade the whole group out together, swap the cards, fade back in
    root.classList.add('is-fading');
    clearTimeout(swapTimeout);
    swapTimeout = setTimeout(() => {
      paint();
      root.classList.remove('is-fading');
    }, FADE);
  }

  function start() {
    stop();
    if (reducedMotion || pages <= 1) return;
    timer = window.setInterval(() => goTo((page + 1) % pages), INTERVAL);
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
    clearTimeout(swapTimeout);
  }

  // Pause while the reader is engaged, resume on leave
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  let touchStartX = null;

  grid.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    stop();
  }, { passive: true });

  grid.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(deltaX) >= 45) goTo(page + (deltaX < 0 ? 1 : -1));
    start();
  }, { passive: true });

  window.addEventListener('resize', refresh);

  refresh();
}
