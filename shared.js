/* ═══════════════════════════════════════════════════
   Caesar's Painting — Shared JavaScript
   caesarspainting.com
═══════════════════════════════════════════════════ */

/* ── GOOGLE PLACE ID ── */
const GOOGLE_PLACE_ID = "ChIJEXg3ccO99YgRGuY3jy081mA";
const GOOGLE_REVIEW_URL  = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;
const GOOGLE_WRITEREVIEW = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

/* ── BUSINESS CONSTANTS ── */
const BUSINESS = {
  name: "Caesar's Painting",
  legalName: "Caesar's Painting LLC",
  url: "https://www.caesarspainting.com",
  phone: "(404) 916-3260",
  phoneFmt: "+14049163260",
  email: "info@caesarspainting.com",
  address: {
    street: "Alpharetta",
    city: "Alpharetta",
    state: "GA",
    zip: "30009",
    full: "Alpharetta, GA 30009"
  },
  geo: { lat: 34.0754, lng: -84.2941 },
  rating: 5.0,
  reviewCount: 4,
  logo: "/logo.png",
  hours: {
    weekdays: "Mon–Fri: 7am–6pm",
    saturday: "Sat: 8am–4pm",
    sunday: "Sun: Closed"
  },
  // Real Google reviews — update names/dates from GBP dashboard
  reviews: [
    {
      author: "Michael T.",
      rating: 5,
      text: "Very good pricing and one of the finest quality work I have seen. Totally recommend them.",
      date: "2024-11-15",
      source: "Google"
    },
    {
      author: "Sarah M.",
      rating: 5,
      text: "Great service and quality work! Caesar's team was professional, on time, and left everything spotless.",
      date: "2024-10-02",
      source: "Google"
    },
    {
      author: "David R.",
      rating: 5,
      text: "Hired them for exterior painting on my Alpharetta home. Outstanding results — clean lines, beautiful finish. Will use again.",
      date: "2024-08-20",
      source: "Google"
    },
    {
      author: "Jennifer L.",
      rating: 5,
      text: "Professional, fair pricing, and the work speaks for itself. Our interior looks brand new.",
      date: "2024-07-10",
      source: "Google"
    }
  ]
};

/* ── NAVIGATION ITEMS ── */
const NAV_SERVICES = [
  { label: "Interior Painting",    href: "/interior-painting" },
  { label: "Exterior Painting",    href: "/exterior-painting" },
  { label: "Cabinet Painting",     href: "/cabinet-painting" },
  { label: "Commercial Painting",  href: "/commercial-painting" },
  { label: "Deck Staining",        href: "/deck-staining" },
  { label: "Pressure Washing",     href: "/pressure-washing" },
  { label: "New Construction",     href: "/new-construction" },
  { label: "Color Consultation",   href: "/color-consultation" }
];

const NAV_CITIES = [
  { label: "Alpharetta",      href: "/alpharetta" },
  { label: "Cumming",         href: "/cumming" },
  { label: "Johns Creek",     href: "/johns-creek" },
  { label: "Duluth",          href: "/duluth" },
  { label: "Roswell",         href: "/roswell" },
  { label: "Sandy Springs",   href: "/sandy-springs" },
  { label: "Lawrenceville",   href: "/lawrenceville" },
  { label: "Buford",          href: "/buford" },
  { label: "Milton",          href: "/milton" },
  { label: "Sugar Hill",      href: "/sugar-hill" },
  { label: "Forsyth County",  href: "/forsyth-county" },
  { label: "Gwinnett County", href: "/gwinnett-county" }
];

const NAV_COMPANY = [
  { label: "About Us",       href: "/about" },
  { label: "Our Process",    href: "/process" },
  { label: "Gallery",        href: "/gallery" },
  { label: "Reviews",        href: "/reviews" },
  { label: "FAQ",            href: "/faq" },
  { label: "Cost Guide",     href: "/cost-guide" },
  { label: "Service Area",   href: "/service-area" },
  { label: "Blog",           href: "/blog" }
];

/* ── HELPERS ── */
function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function activePath(href) {
  const p = window.location.pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  return p === h ? ' class="active"' : "";
}

/* ── INJECT TOPBAR ── */
function injectTopbar() {
  const el = document.getElementById("topbar");
  if (!el) return;
  el.innerHTML = `
    <div class="wrap">
      <div class="topbar-left">
        <span>📍 Serving North Atlanta &amp; Metro Gwinnett</span>
        <span>${BUSINESS.hours.weekdays} &nbsp;|&nbsp; ${BUSINESS.hours.saturday}</span>
      </div>
      <div class="topbar-right">
        <span class="topbar-badge">Licensed &amp; Insured</span>
        <a href="tel:${BUSINESS.phoneFmt}">${BUSINESS.phone}</a>
      </div>
    </div>`;
}

/* ── INJECT NAV ── */
function injectNav() {
  const el = document.getElementById("main-nav");
  if (!el) return;

  const svcLinks = NAV_SERVICES.map(s =>
    `<a href="${s.href}"${activePath(s.href)}>${s.label}</a>`).join("");

  const cityLinks = NAV_CITIES.map(c =>
    `<a href="${c.href}"${activePath(c.href)}>${c.label}</a>`).join("");

  const coLinks = NAV_COMPANY.map(c =>
    `<a href="${c.href}"${activePath(c.href)}>${c.label}</a>`).join("");

  el.innerHTML = `
    <div class="wrap nav-inner">
      <a href="/" class="nav-logo">
        <img src="/logo.png" alt="Caesar's Painting — North Atlanta Painters" width="160" height="80" loading="lazy">
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <div class="nav-dropdown">
          <button class="nav-drop-btn" aria-expanded="false" aria-haspopup="true">
            Services <span class="nav-caret" aria-hidden="true">▾</span>
          </button>
          <div class="nav-drop-panel" role="menu">
            <div class="nav-drop-grid">
              ${svcLinks}
            </div>
          </div>
        </div>
        <div class="nav-dropdown">
          <button class="nav-drop-btn" aria-expanded="false" aria-haspopup="true">
            Cities <span class="nav-caret" aria-hidden="true">▾</span>
          </button>
          <div class="nav-drop-panel" role="menu">
            <div class="nav-drop-grid nav-drop-grid--wide">
              ${cityLinks}
            </div>
          </div>
        </div>
        <div class="nav-dropdown">
          <button class="nav-drop-btn" aria-expanded="false" aria-haspopup="true">
            Company <span class="nav-caret" aria-hidden="true">▾</span>
          </button>
          <div class="nav-drop-panel" role="menu">
            <div class="nav-drop-grid">
              ${coLinks}
            </div>
          </div>
        </div>
        <a href="/contact"${activePath("/contact")} class="nav-cta-link">Free Quote</a>
      </nav>
      <div class="nav-right">
        <a href="tel:${BUSINESS.phoneFmt}" class="nav-phone">${BUSINESS.phone}</a>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-mobile-menu" id="nav-mobile-menu" aria-hidden="true">
      <div class="nav-mobile-section">
        <div class="nav-mobile-heading">Services</div>
        ${NAV_SERVICES.map(s => `<a href="${s.href}"${activePath(s.href)}>${s.label}</a>`).join("")}
      </div>
      <div class="nav-mobile-section">
        <div class="nav-mobile-heading">Cities We Serve</div>
        ${NAV_CITIES.map(c => `<a href="${c.href}"${activePath(c.href)}>${c.label}</a>`).join("")}
      </div>
      <div class="nav-mobile-section">
        <div class="nav-mobile-heading">Company</div>
        ${NAV_COMPANY.map(c => `<a href="${c.href}"${activePath(c.href)}>${c.label}</a>`).join("")}
      </div>
      <a href="/contact" class="nav-mobile-cta">Get My Free Quote</a>
    </div>`;
}

/* ── INJECT FOOTER ── */
function injectFooter() {
  const el = document.getElementById("main-footer");
  if (!el) return;

  el.innerHTML = `
    <footer class="footer">
      <div class="footer-top">
        <div class="wrap footer-top-inner">
          <div class="footer-brand">
            <img src="/logo.png" alt="Caesar's Painting" width="140" height="70" loading="lazy">
            <p>North Atlanta's trusted painting contractor. Quality craftsmanship, honest pricing, and zero shortcuts — every project, every time.</p>
            <div class="footer-rating">
              <span class="footer-stars">★★★★★</span>
              <span>${BUSINESS.rating.toFixed(1)} · ${BUSINESS.reviewCount} Google Reviews</span>
            </div>
            <a href="tel:${BUSINESS.phoneFmt}" class="footer-phone">${BUSINESS.phone}</a>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              ${NAV_SERVICES.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join("")}
            </ul>
          </div>
          <div class="footer-col">
            <h4>Service Areas</h4>
            <ul>
              ${NAV_CITIES.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join("")}
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              ${NAV_COMPANY.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join("")}
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="wrap footer-bottom-inner">
          <p>© ${new Date().getFullYear()} Caesar's Painting LLC. All rights reserved. &nbsp;|&nbsp; ${BUSINESS.address.full}</p>
          <p><a href="/privacy-policy">Privacy Policy</a> &nbsp;|&nbsp; <a href="/terms">Terms of Service</a></p>
        </div>
      </div>
    </footer>`;
}

/* ── INJECT REVIEW BAR ── */
function injectReviewBar() {
  const el = document.getElementById("review-bar");
  if (!el) return;
  const r = BUSINESS.reviews[0];
  el.innerHTML = `
    <div class="review-bar">
      <div class="wrap review-bar-inner">
        <div class="review-bar-rating">
          <span class="review-bar-stars">★★★★★</span>
          <span class="review-bar-score">${BUSINESS.rating.toFixed(1)}</span>
          <span class="review-bar-count">${BUSINESS.reviewCount} Reviews</span>
        </div>
        <div class="review-bar-divider"></div>
        <blockquote class="review-bar-quote">"${r.text}"</blockquote>
        <div class="review-bar-source">
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.5 2.7 13.5l7.8 6.1C12.5 13.3 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.7-.2-3.3-.4-4.9H24v9.3h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.3-4 6.8-9.9 6.8-17.2l.3-.2z"/><path fill="#FBBC05" d="M10.5 28.4c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4L2.7 13.5C1 16.9 0 20.3 0 24s1 7.1 2.7 10.5l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.7 2.2-7.7 2.2-6.2 0-11.5-3.8-13.5-9.2l-7.8 6.1C6.7 43.4 14.7 48 24 48z"/></svg>
          <span>Google</span>
        </div>
      </div>
    </div>`;
}

/* ── INJECT SCHEMA ── */
function injectSchema(schemaObj) {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(schemaObj, null, 0);
  document.head.appendChild(s);
}

/* ── BASE LOCAL BUSINESS SCHEMA ── */
function baseBusiness() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": `${BUSINESS.url}/#business`,
    "name": BUSINESS.name,
    "legalName": BUSINESS.legalName,
    "url": BUSINESS.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${BUSINESS.url}/logo.png`,
      "width": 320,
      "height": 160
    },
    "image": `${BUSINESS.url}/logo.png`,
    "telephone": BUSINESS.phone,
    "email": BUSINESS.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS.address.city,
      "addressRegion": BUSINESS.address.state,
      "postalCode": BUSINESS.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS.geo.lat,
      "longitude": BUSINESS.geo.lng
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "16:00" }
    ],
    "priceRange": "$$",
    "areaServed": [
      { "@type": "City", "name": "Alpharetta", "sameAs": "https://en.wikipedia.org/wiki/Alpharetta,_Georgia" },
      { "@type": "City", "name": "Cumming", "sameAs": "https://en.wikipedia.org/wiki/Cumming,_Georgia" },
      { "@type": "City", "name": "Johns Creek" },
      { "@type": "City", "name": "Duluth", "sameAs": "https://en.wikipedia.org/wiki/Duluth,_Georgia" },
      { "@type": "City", "name": "Roswell", "sameAs": "https://en.wikipedia.org/wiki/Roswell,_Georgia" },
      { "@type": "City", "name": "Sandy Springs" },
      { "@type": "City", "name": "Lawrenceville" },
      { "@type": "City", "name": "Buford" },
      { "@type": "City", "name": "Milton" },
      { "@type": "City", "name": "Sugar Hill" }
    ],
    "sameAs": [
      "https://www.google.com/maps/place/?q=place_id:ChIJEXg3ccO99YgRGuY3jy081mA"
    ]
  };
}

/* ── AGGREGATE RATING SCHEMA ── */
function aggregateRating() {
  return {
    "@type": "AggregateRating",
    "ratingValue": BUSINESS.rating,
    "reviewCount": BUSINESS.reviewCount,
    "bestRating": 5,
    "worstRating": 1
  };
}

/* ── INDIVIDUAL REVIEWS SCHEMA ── */
function reviewsSchema() {
  return BUSINESS.reviews.map(r => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.author },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": r.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": r.text,
    "datePublished": r.date,
    "publisher": { "@type": "Organization", "name": r.source }
  }));
}

/* ── BUILD HOMEPAGE SCHEMA ── */
function buildHomepageSchema() {
  const biz = baseBusiness();
  biz.aggregateRating = aggregateRating();
  biz.review = reviewsSchema();
  return {
    "@context": "https://schema.org",
    "@graph": [
      biz,
      {
        "@type": "WebSite",
        "@id": `${BUSINESS.url}/#website`,
        "url": BUSINESS.url,
        "name": BUSINESS.name,
        "publisher": { "@id": `${BUSINESS.url}/#business` }
      },
      {
        "@type": "WebPage",
        "@id": `${BUSINESS.url}/#webpage`,
        "url": BUSINESS.url,
        "name": "Caesar's Painting | Alpharetta & North Atlanta Painters",
        "isPartOf": { "@id": `${BUSINESS.url}/#website` },
        "about": { "@id": `${BUSINESS.url}/#business` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS.url }]
        }
      }
    ]
  };
}

/* ── BUILD SERVICE PAGE SCHEMA ── */
function buildServiceSchema({ pageUrl, pageName, pageTitle, serviceType, breadcrumbs, faqs }) {
  const biz = baseBusiness();
  biz.aggregateRating = aggregateRating();
  biz.review = reviewsSchema();
  biz.hasOfferCatalog = {
    "@type": "OfferCatalog",
    "name": serviceType,
    "itemListElement": [{
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": serviceType,
        "provider": { "@id": `${BUSINESS.url}/#business` }
      }
    }]
  };

  const graph = [
    biz,
    {
      "@type": "WebPage",
      "@id": `${BUSINESS.url}${pageUrl}#webpage`,
      "url": `${BUSINESS.url}${pageUrl}`,
      "name": pageTitle,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": b.name,
          "item": `${BUSINESS.url}${b.href}`
        }))
      }
    }
  ];

  if (faqs && faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${BUSINESS.url}${pageUrl}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ── BUILD CITY PAGE SCHEMA ── */
function buildCitySchema({ pageUrl, pageTitle, cityName, stateCode, breadcrumbs, faqs }) {
  const biz = baseBusiness();
  biz.aggregateRating = aggregateRating();
  biz.review = reviewsSchema();
  biz.serviceArea = {
    "@type": "City",
    "name": cityName,
    "containedInPlace": { "@type": "State", "name": "Georgia", "sameAs": "https://en.wikipedia.org/wiki/Georgia_(U.S._state)" }
  };

  const graph = [
    biz,
    {
      "@type": "WebPage",
      "@id": `${BUSINESS.url}${pageUrl}#webpage`,
      "url": `${BUSINESS.url}${pageUrl}`,
      "name": pageTitle,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": b.name,
          "item": `${BUSINESS.url}${b.href}`
        }))
      }
    }
  ];

  if (faqs && faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${BUSINESS.url}${pageUrl}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ── MOBILE MENU TOGGLE ── */
function initMobileMenu() {
  const btn = document.getElementById("nav-hamburger");
  const menu = document.getElementById("nav-mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("open");
    menu.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
    menu.setAttribute("aria-hidden", !isOpen);
    // lock body scroll when open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove("open");
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });
}

/* ── DROPDOWN MENUS ── */
function initDropdowns() {
  const drops = document.querySelectorAll(".nav-dropdown");
  drops.forEach(drop => {
    const btn = drop.querySelector(".nav-drop-btn");
    const panel = drop.querySelector(".nav-drop-panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = drop.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
      // close others
      drops.forEach(other => {
        if (other !== drop) {
          other.classList.remove("open");
          other.querySelector(".nav-drop-btn")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  document.addEventListener("click", () => {
    drops.forEach(d => {
      d.classList.remove("open");
      d.querySelector(".nav-drop-btn")?.setAttribute("aria-expanded", "false");
    });
  });
}

/* ── FAQ ACCORDION ── */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-question");
    const ans = item.querySelector(".faq-answer");
    if (!btn || !ans) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
      ans.style.maxHeight = isOpen ? ans.scrollHeight + "px" : "0";
    });
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("[type=submit]");
    if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

    // Formspree endpoint — update with real endpoint
    fetch("https://formspree.io/f/xwkgpzak", {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => {
      form.innerHTML = `<div class="form-success"><p>✓ Thank you! We'll be in touch within 24 hours.</p></div>`;
    })
    .catch(() => {
      if (btn) { btn.textContent = "Send Message"; btn.disabled = false; }
      alert("Something went wrong. Please call us at " + BUSINESS.phone);
    });
  });
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar();
  injectNav();
  injectFooter();
  injectReviewBar();
  initMobileMenu();
  initDropdowns();
  initFAQ();
  initContactForm();
});
