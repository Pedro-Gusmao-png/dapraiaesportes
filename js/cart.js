/* ============================================================
   Quote cart — "Quero essa!" adds items and the list is
   sent as an order through WhatsApp.

   - Items are saved in localStorage.
   - The drawer shows the list; checkout opens the chat ready.
   ============================================================ */

'use strict';

const cart = {
  items: [], // e.g. [{ id: 'pro', name: 'Futmesa Pro', qty: 1 }]
  storageKey: 'dpe_orcamento_v1',
};

/* ---------- Load / save (browser storage) ---------- */

function loadCart() {
  try {
    const saved = localStorage.getItem(cart.storageKey);
    cart.items = saved ? JSON.parse(saved) : [];
  } catch {
    cart.items = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(cart.storageKey, JSON.stringify(cart.items));
  } catch {
    /* private mode may block storage — ignore */
  }
}

/* ---------- Operations ---------- */

function addToCart(productId) {
  if (typeof PRODUCTS === 'undefined') return;
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.items.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({ id: product.id, name: product.name, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} adicionada ao orçamento!`);
}

function changeQty(productId, delta) {
  const item = cart.items.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart.items = cart.items.filter((i) => i.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart.items = cart.items.filter((i) => i.id !== productId);
  saveCart();
  renderCart();
}

function clearCart() {
  cart.items = [];
  saveCart();
  renderCart();
}

/* ---------- Drawer rendering ---------- */

function renderCart() {
  const list = $('[data-cart-items]');
  const badge = $('[data-cart-badge]');
  if (!list || !badge) return;

  // Badge shows the total number of tables
  const totalItems = cart.items.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = String(totalItems);
  badge.hidden = totalItems === 0;

  // Empty state
  if (cart.items.length === 0) {
    list.innerHTML =
      '<p class="cart-empty">Seu orçamento está vazio.<br>Explore nossos modelos e clique em <strong>"Quero essa!"</strong>.</p>';
    return;
  }

  // Rebuild each item with safe DOM methods
  list.innerHTML = '';

  cart.items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-item';

    const info = document.createElement('div');
    info.className = 'cart-item__info';
    const name = document.createElement('strong');
    name.textContent = item.name;
    const price = document.createElement('span');
    price.textContent = 'Valor sob consulta';
    info.append(name, price);

    const qtyControls = document.createElement('div');
    qtyControls.className = 'cart-item__qty';

    const minusButton = document.createElement('button');
    minusButton.type = 'button';
    minusButton.textContent = '−';
    minusButton.setAttribute('aria-label', `Diminuir quantidade de ${item.name}`);
    minusButton.addEventListener('click', () => changeQty(item.id, -1));

    const count = document.createElement('span');
    count.className = 'cart-item__count';
    count.textContent = String(item.qty);

    const plusButton = document.createElement('button');
    plusButton.type = 'button';
    plusButton.textContent = '+';
    plusButton.setAttribute('aria-label', `Aumentar quantidade de ${item.name}`);
    plusButton.addEventListener('click', () => changeQty(item.id, 1));

    qtyControls.append(minusButton, count, plusButton);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'cart-item__remove';
    removeButton.setAttribute('aria-label', `Remover ${item.name}`);
    removeButton.innerHTML = '<svg aria-hidden="true"><use href="#i-close"></use></svg>';
    removeButton.addEventListener('click', () => removeFromCart(item.id));

    row.append(info, qtyControls, removeButton);
    list.appendChild(row);
  });
}

/* ---------- Drawer open/close ---------- */

function setupCartDrawer() {
  const drawer = $('#cart-drawer');
  const overlay = $('.overlay');
  if (!drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('open')); // enables opacity transition
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { overlay.hidden = true; }, 400); // wait for animation to end
  }

  $('[data-cart-open]')?.addEventListener('click', openDrawer);

  $$('[data-cart-close]').forEach((element) => {
    element.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });

  $('[data-cart-clear]')?.addEventListener('click', () => {
    clearCart();
    showToast('Orçamento limpo.');
  });

  $('[data-checkout]')?.addEventListener('click', checkoutWhatsApp);
}

/* Sends the full list through WhatsApp */
function checkoutWhatsApp() {
  if (cart.items.length === 0) {
    showToast('Adicione pelo menos um modelo primeiro!');
    return;
  }

  let message;

  if (cart.items.length === 1) {
    const item = cart.items[0];
    message =
      `Olá, Da Praia Esportes! Tenho interesse na ${item.name}. Podem me passar valores e prazo de produção?`;
  } else {
    const lines = cart.items
      .map((item) => `- ${item.qty}x ${item.name}`)
      .join('\n');
    message =
      `Olá, Da Praia Esportes! As mesas que me interessaram foram:\n\n${lines}\n\nPodem me passar valores e prazo de produção?`;
  }

  window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
}

/* ---------- "Quero essa!" buttons on product cards ---------- */

function setupBuyButtons() {
  $$('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.getAttribute('data-add'));
    });
  });
}
