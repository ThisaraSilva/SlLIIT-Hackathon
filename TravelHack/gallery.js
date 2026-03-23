/* ================================================================
   gallery.js — TravelHack SL
   3D auto-scrolling carousel · Custom cursor · Scroll reveal · 3D tilt
   ================================================================ */

// ============================================================
// SRI LANKA TOP PLACES DATA
// ============================================================
const SL_PLACES = [
  {
    name: "Sigiriya Rock Fortress",
    region: "CENTRAL PROVINCE",
    desc: "Climb the ancient 5th-century rock fortress rising 200m above the jungle floor — a UNESCO World Heritage Site.",
    price: "Rs. 4,500",
    img: "https://www.muchbetteradventures.com/magazine/content/images/2023/06/sigiriya.jpg",
    color: "#00c9a7",
  },
  {
    name: "Nine Arch Bridge",
    region: "UVA PROVINCE · ELLA",
    desc: "Sri Lanka's most photographed colonial bridge, nestled among misty tea plantations in Ella.",
    price: "Free Entry",
    img: "https://www.orienthotelsl.com/wp-content/uploads/2023/01/Nine-Arch-Bridge-Ella-1920x800-1.webp",
    color: "#ffbe3f",
  },
  {
    name: "Mirissa Beach",
    region: "SOUTHERN COAST",
    desc: "Pristine crescent bay with whale watching, crystal waters, and the finest sunset views on the island.",
    price: "Free Entry",
    img: "https://srilankaexplorers.com/wp-content/uploads/2024/05/Mirissa-Beach.jpeg",
    color: "#4a9eff",
  },
  {
    name: "Yala National Park",
    region: "SOUTHERN SAFARI",
    desc: "World's highest density of leopards. Spot giants, sloth bears, and rare birds in their natural habitat.",
    price: "Rs. 4,500",
    img: "https://www.andbeyond.com/wp-content/uploads/sites/5/sri-lanka-leopard-asian.jpg",
    color: "#ff9c00",
  },
  {
    name: "Galle Dutch Fort",
    region: "SOUTHERN COAST",
    desc: "A 16th-century fort with cobblestone streets, boutique cafés, and sweeping Indian Ocean vistas.",
    price: "Free Entry",
    img: "https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg",
    color: "#ff6b9d",
  },
  {
    name: "Temple of the Tooth",
    region: "KANDY",
    desc: "Sacred Buddhist shrine holding a relic of the Buddha's tooth, central to Sri Lankan culture since 4th century.",
    price: "Rs. 1,500",
    img: "https://travellustsrilanka.com/wp-content/uploads/2023/09/Kandy-tooth-relic-temple-scaled.jpg",
    color: "#bc7eff",
  },
  {
    name: "World's End",
    region: "HORTON PLAINS",
    desc: "A sheer 870-metre cliff plunging into valley mist — the most dramatic viewpoint in Sri Lanka.",
    price: "Rs. 3,500",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/SL_Horton_Plains_NP_asv2020-01_img15.jpg",
    color: "#3fb950",
  },
  {
    name: "Pinnawala Elephants",
    region: "SABARAGAMUWA",
    desc: "Watch a rescued herd of 90+ elephants bathing in the Maha Oya river at the world-famous orphanage.",
    price: "Rs. 3,000",
    img: "https://cdn.lakpura.com/images/LK94009737-03-E.JPG",
    color: "#ffbe3f",
  },
  {
    name: "Dambulla Cave Temple",
    region: "NORTH CENTRAL",
    desc: "Five spectacular caves adorned with 153 golden Buddha statues and 2,100 sqm of ancient murals.",
    price: "Rs. 1,500",
    img: "https://www.historyhit.com/app/uploads/bis-images/5163366/shutterstock_Dambulla-Cave-Temple-1-788x537.jpg?x15201",
    color: "#ff6060",
  },
];

// ============================================================
// 3D CAROUSEL
// ============================================================
let activeIdx   = 0;
let autoTimer   = null;
let isAnimating = false;

function buildGallery() {
  const section = document.getElementById('gallery');
  if (!section) return;

  const track = document.getElementById('galleryTrack');
  const dots   = document.getElementById('galleryDots');
  if (!track || !dots) return;

  // Build cards
  SL_PLACES.forEach((place, i) => {
    const card = document.createElement('div');
    card.className = 'gl-card';
    card.dataset.idx = i;
    card.innerHTML = `
      <div class="gl-img-wrap">
        <img src="${place.img}" alt="${place.name}" class="gl-img" loading="lazy" />
        <div class="gl-img-overlay"></div>
      </div>
      <div class="gl-info-minimal">
        <div class="glm-region">${place.region}</div>
        <h3 class="glm-name">${place.name}</h3>
        <div class="glm-divider"></div>
        <div class="glm-price">${place.price}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      if (i !== activeIdx) goTo(i);
    });
    track.appendChild(card);
  });

  // Build dots
  SL_PLACES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gl-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.innerHTML = `<span class="gl-dot-num">${String(i + 1).padStart(2, '0')}</span><span class="gl-dot-line"></span><span class="gl-dot-circle"></span>`;
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  updateCarousel();
  startAuto();
}

function updateCarousel() {
  const cards = document.querySelectorAll('.gl-card');
  const dots  = document.querySelectorAll('.gl-dot');
  const total = SL_PLACES.length;

  cards.forEach((card, i) => {
    const offset = ((i - activeIdx + total) % total);
    const dist   = offset > total / 2 ? offset - total : offset; // signed distance -n..+n

    let scale   = 1;
    let tx      = 0;
    let ry      = 0;
    let tz      = 0;
    let opacity = 1;
    let zIndex  = 1;
    let visible = true;

    if (dist === 0) {
      scale = 1; tx = 0; ry = 0; tz = 0; opacity = 1; zIndex = 10;
    } else if (Math.abs(dist) === 1) {
      scale = 0.82; tx = dist * 340; ry = dist * -18; tz = -120; opacity = 0.78; zIndex = 7;
    } else if (Math.abs(dist) === 2) {
      scale = 0.66; tx = dist * 440; ry = dist * -28; tz = -240; opacity = 0.5; zIndex = 4;
    } else {
      visible = false; zIndex = 1;
    }

    card.style.transform  = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
    card.style.opacity    = opacity;
    card.style.zIndex     = zIndex;
    card.style.display    = visible ? 'flex' : 'none';
    card.style.pointerEvents = dist === 0 ? 'all' : 'all';
    card.classList.toggle('gl-card--active', dist === 0);
  });

  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
}

function goTo(idx) {
  if (isAnimating) return;
  isAnimating = true;
  activeIdx = ((idx % SL_PLACES.length) + SL_PLACES.length) % SL_PLACES.length;
  updateCarousel();
  setTimeout(() => { isAnimating = false; }, 500);
}

function next() { goTo(activeIdx + 1); }
function prev() { goTo(activeIdx - 1); }

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(next, 4000);
}

function pauseAuto() { clearInterval(autoTimer); }

document.getElementById('galleryNext')?.addEventListener('click', () => { next(); startAuto(); });
document.getElementById('galleryPrev')?.addEventListener('click', () => { prev(); startAuto(); });
document.getElementById('gallery')?.addEventListener('mouseenter', pauseAuto);
document.getElementById('gallery')?.addEventListener('mouseleave', startAuto);

// Touch / swipe support
let touchStartX = 0;
document.getElementById('galleryTrack')?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.getElementById('galleryTrack')?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startAuto(); }
});

// ============================================================
// CUSTOM MAGNETIC CURSOR
// ============================================================
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Smooth lag for ring
  (function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
    dot.style.transform  = `translate(${mx - 5}px, ${my - 5}px)`;
    requestAnimationFrame(animRing);
  })();

  // Cursor states
  const hoverEls = document.querySelectorAll('a, button, .gl-card, .dest-card, .why-card, .reco-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { ring.classList.add('hovered'); dot.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { ring.classList.remove('hovered'); dot.classList.remove('hovered'); });
  });

  document.addEventListener('mousedown', () => ring.classList.add('clicked'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicked'));

  // Hide native cursor
  document.documentElement.style.cursor = 'none';
}

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale')
    .forEach(el => observer.observe(el));
}

// ============================================================
// 3D CARD TILT (mouse move on card)
// ============================================================
function initTilt() {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = e.clientX - r.left;
      const y   = e.clientY - r.top;
      const cx  = r.width / 2, cy = r.height / 2;
      const tx  = ((y - cy) / cy) * -9;
      const ty  = ((x - cx) / cx) * 9;
      card.style.transform = `perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg) translateZ(6px)`;
      card.style.boxShadow = `${-ty * 1.5}px ${tx * 1.5}px 28px rgba(0,0,0,0.5), 0 0 24px ${card.dataset.glow || 'rgba(0,201,167,0.12)'}`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '';
    });
  });
}

// ============================================================
// PARALLAX on hero-bg
// ============================================================
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}

// ============================================================
// SMOOTH SECTION HIGHLIGHT (nav active state on scroll)
// ============================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => spy.observe(s));
}

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildGallery();
  initCursor();
  initScrollReveal();
  initTilt();
  initParallax();
  initScrollSpy();

  // Re-init tilt on dynamic content (reco cards added later)
  document.addEventListener('th:resultsRendered', initTilt);
});
