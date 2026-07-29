const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.add("loaded");
  }, 500);
});

const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(7,11,23,0.92)";
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
  } else {
    navbar.style.background = "rgba(10,12,22,.45)";
    navbar.style.boxShadow = "none";
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll("section").forEach(section => {
  section.classList.add("hidden");
  revealObserver.observe(section);
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".primary, .secondary, .buy-btn, .category");
  if (!btn) return;
  btn.animate([
    { transform: "scale(1)" },
    { transform: "scale(0.95)" },
    { transform: "scale(1)" }
  ], { duration: 180 });
});

if (!isTouch) {
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  let ringX = 0, ringY = 0;
  document.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    ringX = e.clientX; ringY = e.clientY;
  });
  function animateRing() {
    const currentLeft = parseFloat(ring.style.left) || ringX;
    const currentTop = parseFloat(ring.style.top) || ringY;
    ring.style.left = currentLeft + (ringX - currentLeft) * 0.18 + "px";
    ring.style.top = currentTop + (ringY - currentTop) * 0.18 + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .product-card, .faq-question")) ring.classList.add("active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .product-card, .faq-question")) ring.classList.remove("active");
  });
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
function makeParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    });
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(141,107,255,0.55)";
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
if (!reduceMotion) { makeParticles(70); drawParticles(); }

const products = [
  { id: "welcome", name: "Welcome & Goodbye", category: "welcome", price: 1, badge: "new", image: "assets/welcome.png", tagline: "Custom greetings and leave notifications for your server." },
  { id: "anti-links", name: "Anti Links", category: "moderation", price: 1, badge: null, image: "assets/logo.png", tagline: "Automatically detect and block unauthorized server/website links." },
  { id: "swear-block", name: "Insult / Swear Block", category: "moderation", price: 1, badge: null, image: "assets/logo.png", tagline: "Filter out profanity and offensive language in chat." },
  { id: "logging", name: "Logs", category: "logging", price: 2, badge: null, image: "assets/logo.png", tagline: "Track message edits, deletions, joins, and server changes." },
  { id: "reaction-roles", name: "Reaction Roles", category: "autorole", price: 2, badge: null, image: "assets/logo.png", tagline: "Let users claim roles with reaction emojis or buttons." },
  { id: "warn-system", name: "Warn System", category: "moderation", price: 2, badge: null, image: "assets/logo.png", tagline: "Issue warnings to rule breakers with history tracking." },
  { id: "strike-system", name: "Strike System (for staff)", category: "moderation", price: 2, badge: null, image: "assets/logo.png", tagline: "Manage staff activity and issue formal strikes." },
  { id: "suggestions", name: "Suggestions", category: "utility", price: 3, badge: null, image: "assets/logo.png", tagline: "Allow members to submit ideas with upvote/downvote buttons." },
  { id: "giveaways", name: "Giveaways", category: "utility", price: 3, badge: null, image: "assets/logo.png", tagline: "Host automated server giveaways with winner selection." },
  { id: "anti-spam", name: "Anti Spam", category: "moderation", price: 3, badge: null, image: "assets/logo.png", tagline: "Protect your server from rapid messaging and spam bots." },
  { id: "vouch-system", name: "Vouch System", category: "utility", price: 3, badge: null, image: "assets/logo.png", tagline: "Build trust with member reviews and rep points." },
  { id: "invite-tracker", name: "Invite Tracker", category: "utility", price: 3, badge: null, image: "assets/logo.png", tagline: "Track who invited whom and total member invites." },
  { id: "verification", name: "Verification System", category: "utility", price: 4, badge: null, image: "assets/logo.png", tagline: "Secure button or CAPTCHA verification to prevent raid bots." },
  { id: "tickets", name: "Tickets", category: "tickets", price: 5, badge: "bestseller", image: "assets/tickets.png", tagline: "Modern support tickets with buttons, transcripts, and logs." },
  { id: "leveling", name: "Leveling System", category: "leveling", price: 5, badge: null, image: "assets/logo.png", tagline: "Earn XP by talking, customize rank cards & leaderboards." },
  { id: "moderation", name: "Moderation Commands", category: "moderation", price: 8, badge: "popular", image: "assets/moderation.png", tagline: "Full moderation suite: ban, kick, mute, timeout, clear, etc." },
  { id: "economy", name: "Economy System", category: "economy", price: 10, badge: null, image: "assets/logo.png", tagline: "Full currency system with daily claims, shop, work, and games." },
  { id: "economy", name: "24/7 Bot Hosting", category: "hosting", price: 5, badge: null, image: "assets/logo.png", tagline: "We host your Discord bot 24/7 for just €5/month." }
];

const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");

function badgeLabel(badge) {
  if (badge === "popular") return "POPULAR";
  if (badge === "bestseller") return "BEST SELLER";
  if (badge === "new") return "NEW";
  return "";
}

function renderProducts(list) {
  productGrid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.category = p.category;
    card.innerHTML = `
      ${p.badge ? `<div class="badge ${p.badge}">${badgeLabel(p.badge)}</div>` : ""}
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.tagline}</p>
      <h4>&euro;${p.price.toFixed(2)}</h4>
      <div class="card-buttons">
        <button class="buy-btn" data-id="${p.id}">Add To Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
  noResults.style.display = list.length === 0 ? "block" : "none";
  attachTilt();
}

function attachTilt(selector = ".product-card") {
  if (reduceMotion) return;
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

renderProducts(products);

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
let activeCategory = "all";

function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(term) || p.tagline.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
  renderProducts(filtered);
}

searchInput.addEventListener("keyup", applyFilters);
categoryButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".category");
  if (!btn) return;
  categoryButtons.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  applyFilters();
});

let cart = [];
const cartToggle = document.getElementById("cartToggle");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function cartTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = count;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty">Your cart is empty.</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="price">&euro;${item.price.toFixed(2)} x ${item.qty}</div>
        </div>
        <div class="qty-controls">
          <button data-action="dec" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${item.id}">+</button>
        </div>
        <button class="remove" data-action="remove" data-id="${item.id}">&times;</button>
      </div>
    `).join("");
  }
  cartTotalEl.textContent = "€" + cartTotal().toFixed(2);
}

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "inc") changeQty(id, 1);
  if (btn.dataset.action === "dec") changeQty(id, -1);
  if (btn.dataset.action === "remove") removeFromCart(id);
});

function openCart() { cartDrawer.classList.add("active"); cartOverlay.classList.add("active"); }
function closeCart() { cartDrawer.classList.remove("active"); cartOverlay.classList.remove("active"); }
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
renderCart();

productGrid.addEventListener("click", (e) => {
  const buyBtn = e.target.closest(".buy-btn");
  if (buyBtn) {
    const p = products.find(item => item.id === buyBtn.dataset.id);
    if (p) {
      addToCart({ id: p.id, name: p.name, price: p.price, image: p.image });
      openCart();
    }
  }
});

const checkoutModal = document.getElementById("checkoutModal");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotalEl = document.getElementById("checkoutTotal");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  checkoutList.innerHTML = cart.map(item => `<li><span>${item.name} x ${item.qty}</span><span>&euro;${(item.price * item.qty).toFixed(2)}</span></li>`).join("");
  checkoutTotalEl.textContent = "€" + cartTotal().toFixed(2);
  renderPayPalButtons();
  checkoutModal.classList.add("active");
});

checkoutClose.addEventListener("click", () => checkoutModal.classList.remove("active"));
checkoutModal.addEventListener("click", (e) => { if (e.target === checkoutModal) checkoutModal.classList.remove("active"); });

function renderPayPalButtons() {
  const container = document.getElementById("paypal-buttons");
  container.innerHTML = "";
  if (typeof paypal === "undefined") {
    container.innerHTML = `<p style="opacity:.6;text-align:center">PayPal couldn't load.</p>`;
    return;
  }
  paypal.Buttons({
    style: { layout: "vertical", color: "blue", shape: "rect", label: "paypal" },
    createOrder: function (data, actions) {
      return actions.order.create({ purchase_units: [{ amount: { value: cartTotal().toFixed(2), currency_code: "EUR" } }] });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function () {
        showCheckoutSuccess();
      });
    },
    onError: function (err) {
      container.insertAdjacentHTML("beforeend", `<p style="color:#ff6b6b;text-align:center;margin-top:10px">Something went wrong.</p>`);
    }
  }).render("#paypal-buttons");
}

function showCheckoutSuccess() {
  const box = checkoutModal.querySelector(".modal-box");
  const itemsList = cart.map(item => `${item.name} (x${item.qty})`).join(", ");
  const totalPaid = cartTotal().toFixed(2);

  box.innerHTML = `
    <button class="modal-close" onclick="document.getElementById('checkoutModal').classList.remove('active')">&times;</button>
    <div class="checkout-success">
      <span class="icon">✅</span>
      <h3>Payment Successful!</h3>
      <p style="opacity:.8; margin: 10px 0 20px;">Please enter your contact details so we can deliver your order.</p>
      
      <form id="orderDetailsForm" style="display:flex; flex-direction:column; gap:12px; text-align:left;">
        <input type="hidden" name="order_summary" value="${itemsList}">
        <input type="hidden" name="total_paid" value="€${totalPaid}">
        
        <div>
          <label style="font-size:14px; opacity:.85;">Your Name</label>
          <input type="text" name="customer_name" required placeholder="John Doe" style="width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); color:white; outline:none; margin-top:5px;">
        </div>

        <div>
          <label style="font-size:14px; opacity:.85;">Contact Email</label>
          <input type="email" name="customer_email" required placeholder="you@example.com" style="width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); color:white; outline:none; margin-top:5px;">
        </div>

        <div>
          <label style="font-size:14px; opacity:.85;">Discord Username</label>
          <input type="text" name="discord_name" required placeholder="username" style="width:100%; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); color:white; outline:none; margin-top:5px;">
        </div>

        <button type="submit" class="primary" style="margin-top:15px; cursor:pointer; width:100%;">Submit Order Details</button>
      </form>
    </div>
  `;

  document.getElementById("orderDetailsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your EmailJS credentials
    emailjs.sendForm('service_8lqx9nw', 'template_o3ehw8g', this)
      .then(function() {
        box.innerHTML = `
          <div class="checkout-success">
            <span class="icon">🎉</span>
            <h3>Details Submitted!</h3>
            <p style="opacity:.75;margin-top:10px">Thanks for your order! Join our Discord server so we can get started on your bot.</p>
            <a href="https://discord.gg/7qafuMk7N" target="_blank" class="primary" style="display:inline-block;margin-top:20px">Join Our Discord</a>
          </div>
        `;
        cart = [];
        renderCart();
      }, function(error) {
        alert("Failed to send details. Please join our Discord server and let us know!");
        console.error("EmailJS Error:", error);
      });
  });
}

const whyData = [
  { icon: "⚡", title: "Fast Delivery", text: "Bots are delivered anywhere from 1 day up to 3 weeks depending on scope." },
  { icon: "🔒", title: "Secure & Safe", text: "Every bot is custom coded from scratch." },
  { icon: "💬", title: "24/7 Support", text: "Get help anytime through the NovaBots Discord server." },
  { icon: "🛠️", title: "Fully Custom", text: "Bots built around exactly what your server needs." },
  { icon: "🐞", title: "Free Bug Fixes", text: "If something breaks, it gets fixed at no extra cost." },
  { icon: "💳", title: "Secure Payments", text: "Checkout is handled through PayPal." }
];
document.getElementById("whyGrid").innerHTML = whyData.map(w => `
  <div class="why-card">
    <span class="icon">${w.icon}</span>
    <h3>${w.title}</h3>
    <p>${w.text}</p>
  </div>
`).join("");

const statsData = [
  { target: 50, suffix: "+", label: "Bots Delivered" },
  { target: 30, suffix: "+", label: "Happy Clients" },
  { target: 24, suffix: "/7", label: "Support Available" },
  { target: 100, suffix: "%", label: "Custom Coded" }
];
const statsGrid = document.getElementById("statsGrid");
statsGrid.innerHTML = statsData.map((s, i) => `
  <div class="stat">
    <div class="stat-number" id="stat-${i}">0${s.suffix}</div>
    <div class="stat-label">${s.label}</div>
  </div>
`).join("");

function animateCount(el, target, suffix) {
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statsData.forEach((s, i) => {
        const el = document.getElementById("stat-" + i);
        animateCount(el, s.target, s.suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
statsObserver.observe(statsGrid);

const faqData = [
  { q: "How long does delivery take?", a: "Delivery ranges from 1 day up to 3 weeks depending on complexity." },
  { q: "Do I need to give you my bot token?", a: "Yes, it's needed to set up and test your bot before handover." },
  { q: "What payment methods do you accept?", a: "PayPal and all major debit/credit cards." },
  { q: "Do you offer support after delivery?", a: "Yes, every order includes free bug fixes and support." }
];
const faqList = document.getElementById("faqList");
faqList.innerHTML = faqData.map((f, i) => `
  <div class="faq-item" id="faq-${i}">
    <div class="faq-question"><span>${f.q}</span><span class="plus">+</span></div>
    <div class="faq-answer"><p>${f.a}</p></div>
  </div>
`).join("");

faqList.addEventListener("click", (e) => {
  const question = e.target.closest(".faq-question");
  if (!question) return;
  const item = question.parentElement;
  const answer = item.querySelector(".faq-answer");
  const isOpen = item.classList.contains("open");
  faqList.querySelectorAll(".faq-item.open").forEach(open => {
    if (open !== item) {
      open.classList.remove("open");
      open.querySelector(".faq-answer").style.maxHeight = null;
    }
  });
  if (isOpen) {
    item.classList.remove("open");
    answer.style.maxHeight = null;
  } else {
    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
});