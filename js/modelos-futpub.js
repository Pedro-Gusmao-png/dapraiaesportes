'use strict';

const WHATSAPP_NUMBER = '5581985755827';

const FUTPUB_MODELS = [
  {
    id: 'fixa',
    name: 'FUTPUB FIXA',
    price: 'R$ 1.250,00',
    priceValue: 1250,
    tagline: 'Para sempre pronta pra jogo.',
    description: 'A clássica futpub fixa: estrutura robusta, tampo liso e acabamento profissional. Ideal para bares, clubes, casas de eventos e espaços que querem entreter e fidelizar clientes.',
    features: [
      'Estrutura em aço reforçado',
      'Tampo liso de alta durabilidade',
      'Personalização completa (cores, logo, escudo)',
      'Medidas profissionais de jogo',
    ],
    images: [
      'produtos/futpub/fixa/fixa1.jpg',
      'produtos/futpub/fixa/fixa2.jpg',
      'produtos/futpub/fixa/fixa3.jpg',
    ],
    video: null,
  },
  {
    id: 'compacta',
    name: 'FUTPUB COMPACTA',
    price: 'R$ 1.250,00',
    priceValue: 1250,
    tagline: 'Espaço menor, diversão igual.',
    description: 'A versão compacta mantém toda a qualidade da fixa em um tamanho que cabe em qualquer ambiente. Perfeita para lojas, escritórios, áreas de lazer residenciais e espaços menores.',
    features: [
      'Menor tamanho, mesma qualidade',
      'Fácil de transportar e instalar',
      'Personalização completa (cores, logo, escudo)',
      'Ideal para ambientes compactos',
    ],
    images: [
      'produtos/futpub/compacta/compacta1.jpg',
      'produtos/futpub/compacta/compacta2.jpg',
      'produtos/futpub/compacta/compacta3.jpg',
    ],
    video: null,
  },
  {
    id: 'maleta',
    name: 'FUTPUB MALETA',
    price: 'R$ 1.550,00',
    priceValue: 1550,
    tagline: 'Dobrável, transportável, profissional.',
    description: 'A futpub maleta é a escolha ideal para quem precisa de mobilidade. Dobra-se como uma maleta, facilita o transporte e abre em segundos para o jogo começar.',
    features: [
      'Dobra-se para transporte fácil',
      'Abertura e fechamento rápidos',
      'Estrutura leve e resistente',
      'Personalização completa (cores, logo, escudo)',
    ],
    images: [
      'produtos/futpub/maleta/maleta1.jpg',
      'produtos/futpub/maleta/maleta2.jpg',
      'produtos/futpub/maleta/maleta3.jpg',
    ],
    video: null,
  },
  {
    id: 'semi-oficial',
    name: 'FUTPUB SEMI-OFICIAL',
    price: 'R$ 2.500,00',
    priceValue: 2500,
    tagline: 'Qualidade de torneio, preço acessível.',
    description: 'A semi-oficial entrega um jogo com qualidade superior: acabamento refinado, estrutura profissional e design que impressiona. Perfeita para competições internas e eventos especiais.',
    features: [
      'Acabamento premium refinado',
      'Estrutura para uso intenso',
      'Jogo com qualidade de torneio',
      'Personalização completa (cores, logo, escudo)',
    ],
    images: [
      'produtos/futpub/semi-oficial/futpub semi-oficial 1.jpg',
      'produtos/futpub/semi-oficial/futpub semi-oficial 2.jpg',
      'produtos/futpub/semi-oficial/futpub semi-oficial 3.jpg',
    ],
    video: null,
  },
  {
    id: 'oficial',
    name: 'FUTPUB OFICIAL PREMIUM',
    price: 'R$ 3.500,00',
    priceValue: 3500,
    tagline: 'A definitiva para campeonatos.',
    description: 'A oficial é a mesa para quem não aceita menos que o topo. Acabamento impecável, estrutura scholl-level e design sob medida para torneios, campeonatos e eventos de alto nível.',
    features: [
      'Acabamento de nível scholl',
      'Estrutura para campeonatos oficiais',
      'Design personalizado de alto impacto',
      'Garantia de qualidade profissional',
    ],
    images: [
      'produtos/futpub/oficial/premium oficial 1.jpg',
      'produtos/futpub/oficial/premium oficial 2.jpg',
      'produtos/futpub/oficial/premium oficial 3.jpg',
    ],
    video: null,
  },
  {
    id: 'smart',
    name: 'FUTPUB SMART',
    price: 'A partir de R$ 3.500,00',
    priceValue: 3500,
    tagline: 'Tecnologia e jogo na mesma mesa.',
    description: 'A Smart é a evolução da futpub: integra tecnologia ao jogo, com placar eletrônico, contagem automática de gols e design futurista. Disponível em duas versões.',
    features: [
      'Placar eletrônico integrado',
      'Contagem automática de gols',
      'Design futurista e premium',
      'Duas versões disponíveis',
    ],
    images: [
      'produtos/futpub/smart/futpub semi oficial 1.jpg',
      'produtos/futpub/smart/futpub semi oficial 2.jpg',
      'produtos/futpub/smart/futpub semi oficial 3.jpg',
    ],
    video: 'produtos/futpub/smart/futpub semi oficial 4.mp4',
    versions: [
      { name: 'SEMI-OFICIAL', price: 'R$ 3.500,00', priceValue: 3500, message: 'Olá! Tenho interesse na FUTPUB SMART SEMI-OFICIAL. Gostaria de saber mais informações.' },
      { name: 'OFICIAL', price: 'R$ 4.500,00', priceValue: 4500, message: 'Olá! Tenho interesse na FUTPUB SMART OFICIAL. Gostaria de saber mais informações.' },
    ],
  },
  {
    id: 'ping-pong',
    name: 'MESA PING PONG PERSONALIZADA',
    price: 'Consulte o valor',
    priceValue: null,
    tagline: 'Seu jogo, sua identidade.',
    description: 'A mesa de ping pong personalizada da Da Praia Esportes é feita sob medida: você escolhe as cores, coloca sua logo e recebe uma mesa única, com acabamento profissional e alta durabilidade.',
    features: [
      'Medidas profissionais de jogo',
      'Tampo de alta performance',
      'Personalização completa (cores, logo, escudo)',
      'Feita sob medida para você',
    ],
    images: [
      'produtos/futpub/ping-pong/ping pong 1.jpg',
    ],
    video: 'produtos/futpub/ping-pong/ping pong video.mp4',
  },
];

/* ---------- Card builder ---------- */

function buildModelCard(model, index) {
  const hasVersions = model.versions && model.versions.length > 0;
  const priceDisplay = model.priceValue === null
    ? '<span class="price--consult">Consulte o valor</span>'
    : `<strong class="price">${model.price}</strong>`;

  const versionsHtml = hasVersions
    ? `<div class="card-versions">${model.versions.map(v =>
        `<span class="card-version"><span class="card-version__name">${v.name}</span> <span class="card-version__price">${v.price}</span></span>`
      ).join('')}</div>`
    : '';

  const imagesHtml = model.images.map((img, i) =>
    `<img src="${img}" alt="${model.name} — foto ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" width="960" height="1280" onerror="this.classList.add('broken');const p=document.createElement('span');p.className='img-placeholder';p.textContent='${model.name}';this.parentElement.appendChild(p);this.remove();">`
  ).join('');

  const videoHtml = model.video
    ? `<div class="card-video-wrap">
        <video src="${model.video}" muted loop playsinline preload="metadata" poster="${model.images[0]}"></video>
        <button type="button" class="card-video-play" aria-label="Assistir vídeo">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>`
    : '';

  const featuresHtml = model.features.map(f =>
    `<li><svg aria-hidden="true" width="16" height="16"><use href="#i-check"></use></svg>${f}</li>`
  ).join('');

  const whatsappLink = buildWhatsAppLink(model.message || `Olá! Tenho interesse na ${model.name}. Gostaria de saber mais informações.`);

  return `
    <article class="fp-card fp-reveal" data-model="${model.id}" style="transition-delay:${index * .08}s">
      <div class="fp-card__gallery">
        ${imagesHtml}
        ${videoHtml}
      </div>
      <div class="fp-card__body">
        <h3 class="fp-card__name">${model.name}</h3>
        <p class="fp-card__tagline">${model.tagline}</p>
        ${versionsHtml}
        <div class="fp-card__price">${priceDisplay}</div>
        <div class="fp-card__actions">
          <button type="button" class="btn btn-outline fp-card__detail-btn" data-detail="${model.id}">Ver modelo</button>
          <a href="${whatsappLink}" class="btn btn-whatsapp fp-card__wa-btn" target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true"><use href="#i-whatsapp"></use></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </article>`;
}

/* ---------- Detail panel builder ---------- */

function buildDetailPanel(model) {
  const hasVersions = model.versions && model.versions.length > 0;

  const imagesHtml = model.images.map((img, i) =>
    `<img src="${img}" alt="${model.name} — foto ${i + 1}" loading="lazy" decoding="async" width="960" height="1280" onerror="this.classList.add('broken');const p=document.createElement('span');p.className='img-placeholder';p.textContent='${model.name}';this.parentElement.appendChild(p);this.remove();">`
  ).join('');

  const thumbsHtml = model.images.length > 1 ? model.images.map((img, i) =>
    `<button type="button" class="fp-detail__thumb ${i === 0 ? 'active' : ''}" data-thumb="${img}" aria-label="Foto ${i + 1}">
      <img src="${img}" alt="" width="120" height="160" loading="lazy" onerror="this.closest('.fp-detail__thumb').style.display='none'">
    </button>`
  ).join('') : '';

  const videoHtml = model.video
    ? `<div class="detail-video">
        <video src="${model.video}" controls playsinline preload="metadata" poster="${model.images[0]}"></video>
      </div>`
    : '';

  const versionsHtml = hasVersions
    ? `<div class="detail-versions">${model.versions.map(v => {
        const link = buildWhatsAppLink(v.message);
        return `
          <div class="detail-version">
            <div class="detail-version__info">
              <strong>${v.name}</strong>
              <span>${v.price}</span>
            </div>
            <a href="${link}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="#i-whatsapp"></use></svg>
              Falar no WhatsApp
            </a>
          </div>`;
      }).join('')}</div>`
    : '';

  const priceDisplay = model.priceValue === null
    ? '<span class="price--consult">Consulte o valor</span>'
    : `<strong class="price">${model.price}</strong>`;

  const whatsappLink = buildWhatsAppLink(model.message || `Olá! Tenho interesse na ${model.name}. Gostaria de saber mais informações.`);

  const featuresHtml = model.features.map(f =>
    `<li><svg aria-hidden="true" width="18" height="18"><use href="#i-check"></use></svg>${f}</li>`
  ).join('');

  return `
    <div class="fp-detail" data-detail-panel="${model.id}">
      <div class="fp-detail__header">
        <h2 class="fp-detail__name">${model.name}</h2>
      </div>

      <div class="fp-detail__content">
        <div class="fp-detail__media">
          <div class="fp-detail__main-image" data-lightbox-trigger>
            <img src="${model.images[0]}" alt="${model.name}" width="960" height="1280">
          </div>
          <div class="fp-detail__thumbs">
            ${thumbsHtml}
          </div>
          ${videoHtml}
        </div>

        <div class="fp-detail__info">
          <div class="fp-detail__price">${priceDisplay}</div>
          <p class="fp-detail__desc">${model.description}</p>
          <ul class="fp-detail__features">${featuresHtml}</ul>
          ${versionsHtml}
          ${!hasVersions ? `
          <a href="${whatsappLink}" class="btn btn-whatsapp btn-lg fp-detail__wa" target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true"><use href="#i-whatsapp"></use></svg>
            Falar no WhatsApp
          </a>` : ''}
        </div>
      </div>
    </div>`;
}

/* ---------- Rendering ---------- */

function renderModels() {
  const grid = document.querySelector('[data-models-grid]');
  if (!grid) return;

  grid.innerHTML = FUTPUB_MODELS.map(buildModelCard).join('');

  grid.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', () => showDetail(btn.getAttribute('data-detail')));
  });
}

function renderDetails() {
  const container = document.querySelector('[data-models-detail]');
  if (!container) return;

  container.innerHTML = FUTPUB_MODELS.map(buildDetailPanel).join('');

  container.querySelectorAll('.fp-detail__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-thumb');
      const mainImg = thumb.closest('.fp-detail').querySelector('.fp-detail__main-image img');
      if (mainImg) mainImg.src = src;
      thumb.closest('.fp-detail__thumbs').querySelectorAll('.fp-detail__thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* Lightbox triggers */
  container.querySelectorAll('[data-lightbox-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const detail = trigger.closest('.fp-detail');
      const imgs = Array.from(detail.querySelectorAll('.fp-detail__thumbs img')).map(i => i.src);
      const alts = Array.from(detail.querySelectorAll('.fp-detail__thumbs img')).map(i => i.alt);
      const active = detail.querySelector('.fp-detail__thumb.active');
      const idx = active ? Array.from(detail.querySelectorAll('.fp-detail__thumb')).indexOf(active) : 0;
      openLightbox(imgs, alts, idx);
    });
  });
}

/* ---------- Detail show/hide ---------- */

function showDetail(id) {
  const grid = document.querySelector('[data-models-grid]');
  const detail = document.querySelector(`[data-detail-panel="${id}"]`);
  const header = document.querySelector('.fp-section-header');

  if (grid) grid.style.display = 'none';
  if (header) header.style.display = 'none';
  if (detail) {
    detail.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function hideDetail() {
  const grid = document.querySelector('[data-models-grid]');
  const detail = document.querySelector('.fp-detail.active');
  const header = document.querySelector('.fp-section-header');

  if (detail) detail.classList.remove('active');
  if (grid) grid.style.display = '';
  if (header) header.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Lightbox ---------- */

let lbImages = [];
let lbAlts = [];
let lbIndex = 0;

function openLightbox(images, alts, startIndex) {
  lbImages = images;
  lbAlts = alts;
  lbIndex = startIndex || 0;
  const box = document.getElementById('fp-lightbox');
  if (!box) return;
  updateLightbox();
  box.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  const box = document.getElementById('fp-lightbox');
  if (!box) return;
  box.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function updateLightbox() {
  const img = document.querySelector('[data-lb-img]');
  const counter = document.querySelector('[data-lb-counter]');
  if (img) { img.src = lbImages[lbIndex]; img.alt = lbAlts[lbIndex] || ''; }
  if (counter) counter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
}

function lightboxPrev() { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); }
function lightboxNext() { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); }

/* ---------- Video cards ---------- */

function setupVideoCards() {
  document.querySelectorAll('.fp-card__gallery video').forEach(video => {
    const playBtn = video.closest('.card-video-wrap')?.querySelector('.card-video-play');
    if (!playBtn) return;
    playBtn.addEventListener('click', () => { video.play(); playBtn.classList.add('hidden'); });
    video.addEventListener('pause', () => playBtn.classList.remove('hidden'));
    video.addEventListener('ended', () => playBtn.classList.remove('hidden'));
  });
}

/* ---------- Init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  renderModels();
  renderDetails();
  setupVideoCards();

  /* Header back button: detail → catalog, catalog → index.html */
  document.getElementById('fp-header-back')?.addEventListener('click', () => {
    const active = document.querySelector('.fp-detail.active');
    if (active) {
      hideDetail();
    } else {
      window.location.href = 'index.html';
    }
  });

  /* Lightbox controls */
  document.querySelector('[data-lb-close]')?.addEventListener('click', closeLightbox);
  document.querySelector('[data-lb-prev]')?.addEventListener('click', lightboxPrev);
  document.querySelector('[data-lb-next]')?.addEventListener('click', lightboxNext);
  document.getElementById('fp-lightbox')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    const box = document.getElementById('fp-lightbox');
    if (!box || !box.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });

  /* Observe new fp-reveal elements (cards) */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('.fp-reveal').forEach(el => io.observe(el));
});
