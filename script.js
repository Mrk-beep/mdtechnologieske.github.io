// PRODUCT DATABASE (Laptops, Phones, Accessories)
const techProducts = [
  // LAPTOPS
  { id: 1, name: "MacBook Air M3", category: "laptop", price: "$1199", icon: "fab fa-apple", desc: "13.6″ Liquid Retina, 8GB RAM, 256GB SSD, 18h battery", tag: "Laptop" },
  { id: 2, name: "Dell XPS 16 Plus", category: "laptop", price: "$1499", icon: "fas fa-laptop-code", desc: "Intel Ultra 7, 16GB RAM, 1TB SSD, OLED touch", tag: "Laptop" },
  { id: 3, name: "ASUS ROG Zephyrus", category: "laptop", price: "$1699", icon: "fas fa-gamepad", desc: "RTX 4060, 240Hz display, liquid metal cooling", tag: "Laptop" },
  { id: 4, name: "HP Spectre x360", category: "laptop", price: "$1299", icon: "fas fa-tachometer-alt", desc: "2-in-1 touch, Intel Evo, stylus included", tag: "Laptop" },
  { id: 5, name: "Lenovo ThinkPad X1", category: "laptop", price: "$1599", icon: "fas fa-briefcase", desc: "Business ultrabook, 32GB RAM, 1TB SSD", tag: "Laptop" },
  
  // PHONES
  { id: 6, name: "iPhone 15 Pro Max", category: "phone", price: "$1199", icon: "fab fa-apple", desc: "A17 Pro, 256GB, Titanium, 5x optical zoom", tag: "Phone" },
  { id: 7, name: "Samsung Galaxy S24 Ultra", category: "phone", price: "$1299", icon: "fab fa-android", desc: "AI zoom, S Pen, 200MP camera, titanium frame", tag: "Phone" },
  { id: 8, name: "Google Pixel 8 Pro", category: "phone", price: "$999", icon: "fab fa-google", desc: "Pure Android, AI magic, 5 years updates", tag: "Phone" },
  { id: 9, name: "OnePlus 12", category: "phone", price: "$799", icon: "fas fa-charging-station", desc: "Snapdragon 8 Gen 3, 100W charging", tag: "Phone" },
  { id: 10, name: "Nothing Phone (2)", category: "phone", price: "$649", icon: "fas fa-lightbulb", desc: "Glyph interface, unique design, 50MP dual", tag: "Phone" },
  
  // ACCESSORIES
  { id: 11, name: "Sony WH-1000XM6", category: "accessory", price: "$399", icon: "fas fa-headphones", desc: "Noise canceling, 40h battery, hi-res audio", tag: "Headphones" },
  { id: 12, name: "Apple AirPods Pro 2", category: "accessory", price: "$249", icon: "fab fa-apple", desc: "ANC, Adaptive transparency, USB-C, H2 chip", tag: "Earbuds" },
  { id: 13, name: "Logitech MX Keys S", category: "accessory", price: "$119", icon: "fas fa-keyboard", desc: "Wireless ergonomic, backlit, multi-device", tag: "Keyboard" },
  { id: 14, name: "Anker 100W GaN Charger", category: "accessory", price: "$79", icon: "fas fa-bolt", desc: "3 ports, ultra compact, fast charge", tag: "Charger" },
  { id: 15, name: "Samsung Galaxy Watch6", category: "accessory", price: "$299", icon: "fas fa-clock", desc: "Fitness tracking, sleep coach, BT calling", tag: "Smartwatch" },
  { id: 16, name: "Razer Basilisk V3", category: "accessory", price: "$69", icon: "fas fa-mouse", desc: "RGB gaming mouse, 11 programmable buttons", tag: "Mouse" },
  { id: 17, name: "JBL Flip 6 Speaker", category: "accessory", price: "$129", icon: "fas fa-music", desc: "Waterproof, partyboost, 12h playtime", tag: "Speaker" },
  { id: 18, name: "iPad Pro Magic Keyboard", category: "accessory", price: "$349", icon: "fas fa-tablet-alt", desc: "For iPad Pro 12.9, floating design", tag: "Keyboard Case" },
  { id: 19, name: "Belkin 3-in-1 Charger", category: "accessory", price: "$149", icon: "fas fa-charging-station", desc: "MagSafe, fast charge for Apple ecosystem", tag: "Charger" },
  { id: 20, name: "SteelSeries Arctis 7", category: "accessory", price: "$159", icon: "fas fa-headphones", desc: "Wireless gaming headset, 24h battery", tag: "Headphones" }
];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const categoryIcons = document.querySelectorAll('.cat-icon');
const toastEl = document.getElementById('toastMessage');

let activeCategory = 'all';
let toastTimer = null;

// Toast message helper
function showMessage(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg || "✨ Request noted! Our team will reach out.";
  toastEl.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2800);
}

// Attach inquiry events to product buttons
function attachInquiryEvents() {
  document.querySelectorAll('.btn-inquire').forEach(btn => {
    btn.removeEventListener('click', btn.inquiryHandler);
    const handler = (e) => {
      e.stopPropagation();
      const productName = btn.getAttribute('data-product-name');
      showMessage(`🔧 Inquiry sent for ${productName}. We'll reply within 2 hours!`);
      console.log(`[MD Tech] Inquiry: ${productName}`);
    };
    btn.addEventListener('click', handler);
    btn.inquiryHandler = handler;
  });
}

// Update heading text based on active filter
function updateHeadingText() {
  const filterHeadingH2 = document.querySelector('.filter-heading h2');
  if (!filterHeadingH2) return;
  if (activeCategory === 'all') filterHeadingH2.innerHTML = `<i class="fas fa-store"></i> All Tech Products`;
  else if (activeCategory === 'laptop') filterHeadingH2.innerHTML = `<i class="fas fa-laptop"></i> Laptops & Ultrabooks`;
  else if (activeCategory === 'phone') filterHeadingH2.innerHTML = `<i class="fas fa-mobile-alt"></i> Smartphones & Phones`;
  else if (activeCategory === 'accessory') filterHeadingH2.innerHTML = `<i class="fas fa-headphones"></i> Tech Accessories & Gear`;
}

// Render products according to active filter
function renderProducts() {
  if (!productsGrid) return;
  let filtered = activeCategory === 'all' ? [...techProducts] : techProducts.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<div class="empty-message"><i class="fas fa-box-open"></i> No products in this category. Try another tag! 🛍️</div>`;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-img">
        <i class="${product.icon}"></i>
      </div>
      <div class="product-info">
        <span class="product-category">${product.tag || product.category.toUpperCase()}</span>
        <h3>${product.name}</h3>
        <div class="product-desc">${product.desc}</div>
        <div class="price">${product.price}</div>
        <button class="btn-inquire" data-product-name="${product.name.replace(/'/g, "\\'")}">
          <i class="fas fa-envelope"></i> Quick inquiry
        </button>
      </div>
    </div>
  `).join('');

  attachInquiryEvents();
  updateHeadingText();
}

// Set active filter category
function setActiveFilter(catValue) {
  activeCategory = catValue;
  categoryIcons.forEach(icon => {
    const iconCat = icon.getAttribute('data-cat');
    if (iconCat === catValue) {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });
  renderProducts();
}

// Event listeners for filter icons
categoryIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const cat = icon.getAttribute('data-cat');
    if (cat === 'all') setActiveFilter('all');
    else if (cat === 'laptop') setActiveFilter('laptop');
    else if (cat === 'phone') setActiveFilter('phone');
    else if (cat === 'accessory') setActiveFilter('accessory');
    
    // Smooth scroll to products section
    document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Quick support button handler
const quickSupportBtn = document.getElementById('quickSupportBtn');
if (quickSupportBtn) {
  quickSupportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showMessage("📞 Thanks for reaching out! Call +254 700 123 456 or email care@mdtechnologies.com — we reply instantly.");
  });
}

// Navigation link smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Service card click handler - shows repair inquiry message
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceName = card.querySelector('h3')?.innerText || 'Repair service';
    showMessage(`🛠️ ${serviceName} - Free diagnostic quote available! Contact us today.`);
  });
});

// Hero buttons
const heroPrimaryBtn = document.querySelector('.hero-buttons .btn-primary');
const heroOutlineBtn = document.querySelector('.hero-buttons .btn-outline');

if (heroPrimaryBtn) {
  heroPrimaryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (heroOutlineBtn) {
  heroOutlineBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Initialize with all products
setActiveFilter('all');

console.log("MD Technologies loaded — Repair services & product filtering ready.");