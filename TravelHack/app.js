// ============================================================
// app.js — TravelHack Sri Lanka
// Primary map: Google Maps JavaScript API (with Directions)
// Fallback map: Leaflet.js + OpenStreetMap (when no API key)
// Persistence: localStorage for trip data across page refreshes
// ============================================================

// ===== STATE =====
const state = {
  stops: [],
  dragSrcIdx: null,
  lastResult: null,
  allAttractions: [],
  activeFilter: 'all',
  gmap: null,
  gmDirectionsService: null,
  gmDirectionsRenderer: null,
  gmMarkers: [],
  lmap: null,
  lRouteControl: null,
  lMarkers: [],
};

// Storage keys
const SK_RESULT = 'th_result';
const SK_FORM   = 'th_form';
const SK_STOPS  = 'th_stops';



// ===== CONSTANTS =====
const SPEED_KMH        = { car: 55, bike: 50, bus: 40 };
const FUEL_COST_PER_KM = { car: 18, bike: 9, bus: 5 };
const SL_CENTER        = { lat: 7.87, lng: 80.77 };

function trafficMult(date) {
  if (!date) return 1.15;
  const h = new Date(date).getHours();
  if (h >= 7 && h <= 9)   return 1.45;
  if (h >= 17 && h <= 20) return 1.40;
  return 1.10;
}

const $ = id => document.getElementById(id);

// ============================================================
// GOOGLE MAPS INIT (called by API callback onGoogleMapsReady)
// ============================================================
window.initGoogleMap = function () {
  if (state.gmap) return;
  state.gmap = new google.maps.Map($('map'), {
    center: SL_CENTER,
    zoom: 8,
    mapTypeId: 'roadmap',
    styles: gmapDarkStyle(),
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  });
  state.gmDirectionsService  = new google.maps.DirectionsService();
  state.gmDirectionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true, // we create our own styled markers
    polylineOptions: {
      strokeColor: '#00c9a7',
      strokeWeight: 5,
      strokeOpacity: 0.9,
    },
  });
  state.gmDirectionsRenderer.setMap(state.gmap);
};

// Draw route on Google Maps using Directions API
function showGoogleMapsRoute(stops) {
  $('mapOverlay').classList.add('hidden');

  // Clear old markers
  state.gmMarkers.forEach(m => m.setMap(null));
  state.gmMarkers = [];

  if (stops.length < 2) return;

  const origin      = { lat: stops[0].lat, lng: stops[0].lng };
  const destination = { lat: stops[stops.length - 1].lat, lng: stops[stops.length - 1].lng };
  const waypoints   = stops.slice(1, -1).map(s => ({
    location: { lat: s.lat, lng: s.lng },
    stopover: true,
  }));

  // Request directions
  state.gmDirectionsService.route({
    origin,
    destination,
    waypoints,
    travelMode: google.maps.TravelMode.DRIVING,
    optimizeWaypoints: false,
  }, (result, status) => {
    if (status === 'OK') {
      state.gmDirectionsRenderer.setDirections(result);
      // Update info bar with real road distance / time from Google
      let totalDist = 0, totalDurSec = 0;
      result.routes[0].legs.forEach(leg => {
        totalDist   += leg.distance.value;  // metres
        totalDurSec += leg.duration.value;  // seconds
      });
      $('totalDistance').textContent = `${Math.round(totalDist / 1000)} km`;
      $('totalTime').textContent     = formatDuration(totalDurSec / 60);
    } else {
      console.warn('Google Directions failed:', status, '— drawing fallback polyline');
      drawGmapsFallbackPolyline(stops);
    }
  });

  // Add custom styled markers for each stop
  stops.forEach((stop, i) => {
    const isStart = i === 0;
    const isEnd   = i === stops.length - 1;
    const color   = isStart ? '#00c9a7' : isEnd ? '#ffbe3f' : '#4a9eff';
    const label   = isStart ? 'S' : isEnd ? 'E' : String(i);

    const marker = new google.maps.Marker({
      position: { lat: stop.lat, lng: stop.lng },
      map: state.gmap,
      title: stop.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 14,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2.5,
      },
      label: { text: label, color: '#0d1117', fontSize: '11px', fontWeight: '800' },
    });

    const iw = new google.maps.InfoWindow({
      content: `<div style="font-family:Inter,sans-serif;padding:4px 8px">
        <strong style="font-size:13px;color:#111">${stop.name}</strong><br/>
        <span style="color:#666;font-size:11px">${stop.province} Province</span>
        ${isStart ? '<br/><span style="color:#009c80;font-weight:700;font-size:11px">📍 Start</span>' : ''}
        ${isEnd   ? '<br/><span style="color:#d4972a;font-weight:700;font-size:11px">🏁 Destination</span>' : ''}
      </div>`,
    });
    marker.addListener('click', () => iw.open(state.gmap, marker));
    state.gmMarkers.push(marker);
  });

  // Fit to bounds
  const bounds = new google.maps.LatLngBounds();
  stops.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
  state.gmap.fitBounds(bounds, { padding: 60 });
}

// Fallback polyline when Directions API fails
function drawGmapsFallbackPolyline(stops) {
  new google.maps.Polyline({
    path: stops.map(s => ({ lat: s.lat, lng: s.lng })),
    geodesic: true,
    strokeColor: '#00c9a7',
    strokeOpacity: 0.9,
    strokeWeight: 5,
    map: state.gmap,
  });
  const bounds = new google.maps.LatLngBounds();
  stops.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
  state.gmap.fitBounds(bounds, { padding: 60 });
}

// ============================================================
// LEAFLET FALLBACK INIT (when no Google Maps API key)
// ============================================================
window.initLeafletMap = function () {
  if (state.lmap) return;
  if (typeof L === 'undefined') return;

  state.lmap = L.map('map', { center: [7.87, 80.77], zoom: 8 });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.lmap);

  setTimeout(() => state.lmap.invalidateSize(), 400);
};

function showLeafletRoute(stops) {
  if (!state.lmap) window.initLeafletMap();
  if (!state.lmap) return;

  $('mapOverlay').classList.add('hidden');

  // Clear old
  state.lMarkers.forEach(m => state.lmap.removeLayer(m));
  state.lMarkers = [];
  if (state.lRouteControl) { state.lmap.removeControl(state.lRouteControl); state.lRouteControl = null; }

  // Custom markers
  stops.forEach((stop, i) => {
    const isStart = i === 0, isEnd = i === stops.length - 1;
    const color   = isStart ? '#00c9a7' : isEnd ? '#ffbe3f' : '#4a9eff';
    const label   = isStart ? 'S' : isEnd ? 'E' : String(i);
    const icon    = L.divIcon({
      className: '',
      html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};
        border:3px solid rgba(255,255,255,0.9);display:flex;align-items:center;
        justify-content:center;color:#0d1117;font-weight:800;font-size:11px;
        font-family:Outfit,sans-serif;box-shadow:0 3px 12px rgba(0,0,0,0.5),0 0 16px ${color}88">${label}</div>`,
      iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -20],
    });
    const m = L.marker([stop.lat, stop.lng], { icon })
      .addTo(state.lmap)
      .bindPopup(`<strong>${stop.name}</strong><br/><small>${stop.province} Province</small>`);
    state.lMarkers.push(m);
  });

  // OSRM road routing via Leaflet Routing Machine
  if (typeof L.Routing !== 'undefined' && stops.length >= 2) {
    state.lRouteControl = L.Routing.control({
      waypoints: stops.map(s => L.latLng(s.lat, s.lng)),
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving',
      }),
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: '#00c9a7', weight: 6, opacity: 0.9 }, { color: '#fff', weight: 2, opacity: 0.3 }],
      },
    }).addTo(state.lmap);

    state.lRouteControl.on('routesfound', e => {
      const r = e.routes[0];
      if (r) {
        $('totalDistance').textContent = `${Math.round(r.summary.totalDistance / 1000)} km`;
        $('totalTime').textContent     = formatDuration(r.summary.totalTime / 60);
      }
      // Hide turn-by-turn panel
      document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
    });
    state.lRouteControl.on('routingerror', () => {
      const latlngs = stops.map(s => [s.lat, s.lng]);
      L.polyline(latlngs, { color: '#00c9a7', weight: 5, dashArray: '10 6' }).addTo(state.lmap);
      state.lmap.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
    });
  } else {
    const latlngs = stops.map(s => [s.lat, s.lng]);
    L.polyline(latlngs, { color: '#00c9a7', weight: 5 }).addTo(state.lmap);
    state.lmap.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
  }

  setTimeout(() => state.lmap.invalidateSize(), 200);
}

// ============================================================
// UNIFIED: Show route on whichever map is active
// ============================================================
function showMapRoute(stops) {
  if (window.googleMapsLoaded && state.gmap) {
    showGoogleMapsRoute(stops);
  } else {
    showLeafletRoute(stops);
  }
}

// ============================================================
// BUDGET SLIDER SYNC
// ============================================================
const budgetSlider = $('budgetSlider');
const budgetInput  = $('totalBudget');

budgetSlider.addEventListener('input', () => { budgetInput.value = budgetSlider.value; updateSliderFill(); });
budgetInput.addEventListener('input', () => { budgetSlider.value = Math.min(Math.max(parseInt(budgetInput.value) || 5000, 5000), 500000); updateSliderFill(); });
function updateSliderFill() {
  const pct = ((budgetSlider.value - 5000) / (500000 - 5000)) * 100;
  budgetSlider.style.background = `linear-gradient(to right,var(--teal) ${pct}%,var(--bg-card2) ${pct}%)`;
}
updateSliderFill();

// ============================================================
// STOPS MANAGEMENT
// ============================================================
function renderStops() {
  const stopsContainer = $('stopsContainer');
  stopsContainer.innerHTML = '';
  state.stops.forEach((stop, idx) => {
    const item = document.createElement('div');
    item.className = 'stop-item';
    item.draggable = true;
    item.innerHTML = `
      <span class="stop-drag-handle">⠿</span>
      <input class="stop-input" type="text" placeholder="e.g. Kandy, Sigiriya…" list="citySuggestions" value="${stop.value}" />
      <button class="stop-remove" title="Remove">✕</button>
    `;
    item.addEventListener('dragstart', () => { state.dragSrcIdx = idx; item.classList.add('dragging'); });
    item.addEventListener('dragend',   () => { item.classList.remove('dragging'); document.querySelectorAll('.stop-item').forEach(e => e.classList.remove('drag-over')); });
    item.addEventListener('dragover',  e => { e.preventDefault(); item.classList.add('drag-over'); });
    item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
    item.addEventListener('drop', e => {
      e.preventDefault(); item.classList.remove('drag-over');
      if (state.dragSrcIdx === null || state.dragSrcIdx === idx) return;
      const moved = state.stops.splice(state.dragSrcIdx, 1)[0];
      state.stops.splice(idx, 0, moved);
      state.dragSrcIdx = null;
      renderStops();
    });
    item.querySelector('.stop-input').addEventListener('input', e => { state.stops[idx].value = e.target.value; });
    item.querySelector('.stop-remove').addEventListener('click', () => { state.stops.splice(idx, 1); renderStops(); showToast('Stop removed', 'success'); });
    stopsContainer.appendChild(item);
  });
}

$('addStopBtn').addEventListener('click', () => {
  state.stops.push({ id: Date.now(), value: '' });
  renderStops();
  $('stopsContainer').lastElementChild?.querySelector('.stop-input')?.focus();
});

// ============================================================
// FORM SUBMISSION
// ============================================================
$('tripForm').addEventListener('submit', async e => {
  e.preventDefault();
  const startVal = $('startLocation').value.trim();
  const destVal  = $('mainDestination').value.trim();
  if (!startVal || !destVal) { showToast('Please enter start and destination', 'error'); return; }

  setLoading(true);

  // Lazy-init Leaflet if Google Maps not loaded
  if (!window.googleMapsLoaded && !state.lmap) window.initLeafletMap();

  await delay(700);

  try {
    const result = planTrip(startVal, destVal);
    state.lastResult = result;
    renderResults(result);
    
    // Delay map rendering so browser paints the display:block dimensions first
    setTimeout(() => {
      showMapRoute(result.stops);
      $('mapInfoBar').style.display = 'grid';
      $('altRoutesBtn').style.display = 'block';
    }, 150);
    
    showToast('✅ Route ready! Scroll down for AI recommendations ↓', 'success');
  } catch (err) {
    showToast('Location not found. Try a known Sri Lankan city (e.g. Colombo, Ella, Kandy).', 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
});

// ============================================================
// CORE PLANNING ENGINE
// ============================================================
function planTrip(startVal, destVal) {
  const travelers  = parseInt($('numTravelers').value) || 2;
  const mode       = $('travelMode').value;
  const budget     = parseInt($('totalBudget').value) || 15000;
  const travelDate = $('travelDate').value;

  const allNames = [startVal, ...state.stops.map(s => s.value).filter(Boolean), destVal];
  const resolved = allNames.map(name => {
    const c = getCityCoords(name);
    if (!c) throw new Error(`Cannot find: ${name}`);
    return c;
  });

  const optimized = optimizeRoute(resolved);

  let totalDistKm = 0, totalMinutes = 0;
  const legs = [];
  for (let i = 0; i < optimized.length - 1; i++) {
    const a = optimized[i], b = optimized[i + 1];
    const distKm = haversineDistance(a.lat, a.lng, b.lat, b.lng) * 1.38;
    const mult   = trafficMult(travelDate);
    const mins   = (distKm / SPEED_KMH[mode]) * 60 * mult;
    totalDistKm += distKm; totalMinutes += mins;
    legs.push({ from: a, to: b, distKm, mins, trafficMult: mult });
  }

  const nights = Math.max(1, Math.ceil(totalDistKm / 180));
  const transportCost = Math.round(totalDistKm * FUEL_COST_PER_KM[mode]);
  const mealBudgetPP  = Math.min(budget / travelers / (nights + 1), 2500);
  const hotelBudgetPN = Math.min((budget - transportCost) / nights / travelers, 25000);
  const bd = {
    transport: transportCost,
    meals:     Math.round(mealBudgetPP * travelers * (nights + 1)),
    hotels:    Math.round(Math.min(hotelBudgetPN, budget / 2) * nights * travelers),
    nights,
  };
  bd.total = bd.transport + bd.meals + bd.hotels;
  bd.perPerson = Math.round(bd.total / travelers);

  const restaurants = [], hotels = [], attractions = [];
  optimized.forEach(c => {
    restaurants.push(...getNearbyRestaurants(c.lat, c.lng, mealBudgetPP));
    hotels.push(...getNearbyHotels(c.lat, c.lng, hotelBudgetPN * travelers));
    attractions.push(...getNearbyAttractions(c.lat, c.lng, 55));
  });

  $('totalDistance').textContent = `${Math.round(totalDistKm)} km`;
  $('totalTime').textContent     = formatDuration(totalMinutes);
  $('totalStops').textContent    = `${optimized.length}`;
  $('totalCost').textContent     = `Rs. ${formatNum(bd.total)}`;

  // "Open in Google Maps" button
  const gmLink = buildGoogleMapsLink(optimized);
  const btn = $('openGmapsBtn');
  if (btn) { btn.href = gmLink; btn.style.display = 'flex'; }

  return {
    stops: optimized, legs, totalDistKm, totalMinutes, travelers, mode, budget, nights,
    budgetBreakdown: bd,
    restaurants: dedupeById(restaurants).slice(0, 9),
    hotels:      dedupeById(hotels).slice(0, 6),
    attractions: dedupeById(attractions).slice(0, 12),
    mealBudgetPP, hotelBudgetPN,
  };
}

function buildGoogleMapsLink(stops) {
  return 'https://www.google.com/maps/dir/' +
    stops.map(s => encodeURIComponent(s.name + ', Sri Lanka')).join('/') + '/';
}

// ============================================================
// NEAREST-NEIGHBOR ROUTE OPTIMIZER
// ============================================================
function optimizeRoute(cities) {
  if (cities.length <= 2) return cities;
  const start = cities[0], end = cities[cities.length - 1];
  const mid = [...cities.slice(1, -1)];
  const out = [start];
  let cur = start;
  while (mid.length) {
    let bi = 0, bd2 = Infinity;
    mid.forEach((c, i) => { const d = haversineDistance(cur.lat, cur.lng, c.lat, c.lng); if (d < bd2) { bd2 = d; bi = i; } });
    cur = mid.splice(bi, 1)[0];
    out.push(cur);
  }
  out.push(end);
  return out;
}

// ============================================================
// ALT ROUTES
// ============================================================
$('altRoutesBtn')?.addEventListener('click', () => {
  if (!state.lastResult) return;
  window.open(buildGoogleMapsLink([...state.lastResult.stops].reverse()), '_blank');
  showToast('🔀 Alternative route opened in Google Maps', 'success');
});

// ============================================================
// RENDER RESULTS
// ============================================================
function renderResults(result) {
  $('results').style.display = 'block';
  $('resultsSub').textContent = `${result.stops.length} stops · ${Math.round(result.totalDistKm)} km · ${formatDuration(result.totalMinutes)} · ${result.travelers} traveler${result.travelers > 1 ? 's' : ''}`;

  // Timeline
  const tl = $('routeTimeline');
  tl.innerHTML = '';
  result.stops.forEach((stop, i) => {
    const leg = result.legs[i];
    const el  = document.createElement('div');
    el.className = 'timeline-item';
    el.style.animationDelay = `${i * 0.06}s`;
    const dot = document.createElement('div');
    dot.className = `timeline-dot${i === result.stops.length - 1 ? ' end' : ''}`;
    el.appendChild(dot);
    let tags = `<span class="tl-tag">${stop.province} Province</span>`;
    if (i === 0)                        tags += `<span class="tl-tag teal">🟢 Start</span>`;
    if (i === result.stops.length - 1)  tags += `<span class="tl-tag amber">🏁 Destination</span>`;
    if (leg) {
      tags += `<span class="tl-tag teal">📏 ${Math.round(leg.distKm)} km</span>`;
      tags += `<span class="tl-tag">⏱ ${formatDuration(leg.mins)}</span>`;
      if (leg.trafficMult > 1.2) tags += `<span class="tl-tag amber">🚦 Traffic ×${leg.trafficMult.toFixed(1)}</span>`;
    }
    el.innerHTML += `<div class="tl-name">📍 ${stop.name}</div><div class="tl-tags">${tags}</div>`;
    tl.appendChild(el);
  });

  // Budget
  const bd = result.budgetBreakdown;
  const over = bd.total > result.budget;
  $('budgetGrid').innerHTML = '';
  [
    { icon: '🚗', label: 'Transport',   amount: bd.transport, sub: `${modeName(result.mode)} · ${Math.round(result.totalDistKm)} km` },
    { icon: '🍽️', label: 'Meals',       amount: bd.meals,     sub: `Rs. ${formatNum(Math.round(result.mealBudgetPP))}/person/meal` },
    { icon: '🏨', label: 'Hotels',      amount: bd.hotels,    sub: `${bd.nights} night${bd.nights > 1 ? 's' : ''}` },
    { icon: '👤', label: 'Per Person',  amount: bd.perPerson, sub: 'estimated total' },
    { icon: '💰', label: 'Grand Total', amount: bd.total,     sub: `Budget: Rs. ${formatNum(result.budget)}`, cls: over ? 'over' : 'total' },
  ].forEach(({ icon, label, amount, sub, cls }, i) => {
    const c = document.createElement('div');
    c.className = `budget-card${cls ? ' ' + cls : ''}`;
    c.style.animationDelay = `${i * 0.07}s`;
    c.innerHTML = `<div class="bc-icon">${icon}</div><div class="bc-label">${label}</div><div class="bc-amount">Rs. ${formatNum(amount)}</div><div class="bc-sub">${sub}</div>`;
    $('budgetGrid').appendChild(c);
  });

  renderRecoCards($('restaurantGrid'), result.restaurants, 'restaurant');
  renderRecoCards($('hotelGrid'), result.hotels, 'hotel');

  state.allAttractions = result.attractions;
  renderAttractionCards('all');
  document.querySelectorAll('.af-pill').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.af-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAttractionCards(btn.dataset.cat);
    };
  });

  const tips = [
    `Traveling by ${result.mode === 'bus' ? 'bus' : 'bike'} saves up to Rs. ${formatNum(Math.round(result.totalDistKm * 9))} on fuel.`,
    `Budget guesthouses (Rs. 3,000–6,000/night) can save Rs. ${formatNum((bd.hotels * 0.4) | 0)} on this route.`,
    `Eating at local wayside spots (Rs. 400–700/meal) keeps meals under Rs. ${formatNum(result.travelers * 700 * (bd.nights + 1))}.`,
    `Nine Arch Bridge (Ella) and Ravana Falls are both FREE — great budget stops!`,
    `Start before 7am to beat rush-hour traffic and save ~45 minutes on this route.`,
  ];
  $('savingsText').textContent = tips[Math.floor(Math.random() * tips.length)];
  $('savingsBanner').style.display = 'flex';

  setTimeout(() => $('results').scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
}

function renderRecoCards(container, items, type) {
  container.innerHTML = '';
  if (!items.length) { container.innerHTML = `<div class="no-reco">No ${type === 'restaurant' ? 'restaurants' : 'hotels'} found within your budget on this route.</div>`; return; }
  items.forEach((item, i) => {
    const c = document.createElement('div');
    c.className = 'reco-card'; c.style.animationDelay = `${i * 0.05}s`;
    c.innerHTML = type === 'restaurant' ? `
      <div class="rc-head"><div class="rc-name">${item.name}</div><div class="rc-stars">${starStr(item.rating)} ${item.rating}</div></div>
      <div class="rc-location">📍 ${item.city} · ${item.cuisine}</div>
      <div class="rc-desc">${item.description}</div>
      <div class="rc-foot"><div class="rc-price">Rs. ${formatNum(item.pricePerPerson)}<span class="rc-unit">/person</span></div><span class="rc-badge">🍽️ Restaurant</span></div>
      <div class="rc-dist">📏 ${Math.round(item.distKm)} km from route</div>
    ` : `
      <div class="rc-head"><div class="rc-name">${item.name}</div><div class="rc-stars">${starStr(item.rating)} ${item.rating}</div></div>
      <div class="rc-location">📍 ${item.city} · ${'⭐'.repeat(item.stars)}</div>
      <div class="rc-desc">${item.description}</div>
      <div class="rc-foot"><div class="rc-price">Rs. ${formatNum(item.pricePerNight)}<span class="rc-unit">/night</span></div><span class="rc-badge hotel">🏨 Hotel</span></div>
      <div class="rc-dist">📏 ${Math.round(item.distKm)} km from route</div>
    `;
    container.appendChild(c);
  });
}

function renderAttractionCards(filter) {
  const grid = $('attractionsGrid');
  grid.innerHTML = '';
  const list = filter === 'all' ? state.allAttractions : state.allAttractions.filter(a => a.category === filter);
  if (!list.length) { grid.innerHTML = `<div class="no-reco">No ${filter === 'all' ? '' : filter + ' '}attractions found along this route.</div>`; return; }
  list.forEach((att, i) => {
    const c = document.createElement('div');
    c.className = 'reco-card attraction-card'; c.style.animationDelay = `${i * 0.05}s`;
    const free = att.entryFee === 0;
    c.innerHTML = `
      ${att.mustSee ? '<div class="must-see-banner">⭐ Must-See</div>' : ''}
      <div class="rc-head"><div class="rc-name">${att.categoryIcon} ${att.name}</div><div class="rc-stars">${starStr(att.rating)} ${att.rating}</div></div>
      <div class="rc-location">📍 ${att.city} · <span class="cat-pill cat-${att.category}">${att.category}</span></div>
      <div class="rc-desc">${att.description}</div>
      <div class="rc-foot">
        <div class="rc-price ${free ? 'free' : ''}">${free ? '🆓 Free Entry' : `Rs. ${formatNum(att.entryFee)} entry`}</div>
        <a href="https://www.google.com/maps/search/${encodeURIComponent(att.name + ' Sri Lanka')}" target="_blank" class="rc-badge attraction-link" rel="noopener">🗺️ View on Map</a>
      </div>
      <div class="rc-dist">📏 ${Math.round(att.distKm)} km from route</div>
    `;
    grid.appendChild(c);
  });
}

// ============================================================
// GOOGLE MAPS DARK STYLE
// ============================================================
function gmapDarkStyle() {
  return [
    { elementType: 'geometry',            stylers: [{ color: '#0d1117' }] },
    { elementType: 'labels.text.stroke',  stylers: [{ color: '#0d1117' }] },
    { elementType: 'labels.text.fill',    stylers: [{ color: '#8b949e' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#e6edf3' }] },
    { featureType: 'road',             elementType: 'geometry',           stylers: [{ color: '#1c2330' }] },
    { featureType: 'road',             elementType: 'geometry.stroke',    stylers: [{ color: '#212a37' }] },
    { featureType: 'road',             elementType: 'labels.text.fill',   stylers: [{ color: '#8b949e' }] },
    { featureType: 'road.highway',     elementType: 'geometry',           stylers: [{ color: '#2a3545' }] },
    { featureType: 'road.highway',     elementType: 'labels.text.fill',   stylers: [{ color: '#e6edf3' }] },
    { featureType: 'water',            elementType: 'geometry',           stylers: [{ color: '#0a2a3a' }] },
    { featureType: 'water',            elementType: 'labels.text.fill',   stylers: [{ color: '#00c9a7' }] },
    { featureType: 'landscape',        elementType: 'geometry',           stylers: [{ color: '#0f1a10' }] },
    { featureType: 'poi',              elementType: 'geometry',           stylers: [{ color: '#0d2810' }] },
    { featureType: 'poi.park',         elementType: 'geometry',           stylers: [{ color: '#0d2a10' }] },
    { featureType: 'transit',          elementType: 'geometry',           stylers: [{ color: '#2a3545' }] },
  ];
}

// ============================================================
// HELPERS
// ============================================================
function setLoading(on) {
  $('btnText').classList.toggle('hidden', on);
  $('btnLoader').classList.toggle('hidden', !on);
  $('planBtn').disabled = on;
}
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = msg;
  $('toastContainer').appendChild(t);
  setTimeout(() => { t.style.cssText += 'opacity:0;transform:translateX(20px);transition:0.3s'; setTimeout(() => t.remove(), 300); }, 3500);
}
function formatDuration(mins) { const h = Math.floor(mins / 60), m = Math.round(mins % 60); return h === 0 ? `${m}m` : `${h}h ${m}m`; }
function formatNum(n)  { return Math.round(n).toLocaleString('en-IN'); }
function starStr(r)    { return '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : ''); }
function modeName(m)   { return { car: 'Car', bike: 'Motorbike', bus: 'Bus' }[m] || m; }
function dedupeById(a) { const s = new Set(); return a.filter(i => { if (s.has(i.id)) return false; s.add(i.id); return true; }); }
function delay(ms)     { return new Promise(r => setTimeout(r, ms)); }

// Mobile nav — proper drawer toggle
const navHamburger = $('navHamburger');
const mobileDrawer = $('mobileDrawer');
const mobileOverlay = $('mobileOverlay');

function openMobileMenu() {
  navHamburger?.classList.add('open');
  mobileDrawer?.classList.add('open');
  mobileOverlay?.classList.add('open');
  navHamburger?.setAttribute('aria-expanded', 'true');
  mobileDrawer?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  navHamburger?.classList.remove('open');
  mobileDrawer?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  navHamburger?.setAttribute('aria-expanded', 'false');
  mobileDrawer?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

navHamburger?.addEventListener('click', () => {
  navHamburger.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

// Close when any drawer link is tapped
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeMobileMenu);
});

// Close on overlay tap
mobileOverlay?.addEventListener('click', closeMobileMenu);

// Close on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });


// ============================================================
// LOCALSTORAGE — SAVE / LOAD / RESET
// ============================================================

/** Save current trip to localStorage so it survives page refresh */
function saveTrip(result) {
  try {
    localStorage.setItem(SK_RESULT, JSON.stringify(result));
    localStorage.setItem(SK_STOPS,  JSON.stringify(state.stops));
    localStorage.setItem(SK_FORM, JSON.stringify({
      start:     $('startLocation').value,
      dest:      $('mainDestination').value,
      travelers: $('numTravelers').value,
      mode:      $('travelMode').value,
      budget:    $('totalBudget').value,
      date:      $('travelDate').value,
    }));
  } catch (e) { /* localStorage disabled */ }
}

/** Restore trip from localStorage on page load */
function loadSavedTrip() {
  try {
    const raw    = localStorage.getItem(SK_RESULT);
    const rawF   = localStorage.getItem(SK_FORM);
    const rawS   = localStorage.getItem(SK_STOPS);
    if (!raw || !rawF) return;

    const result = JSON.parse(raw);
    const form   = JSON.parse(rawF);
    const stops  = JSON.parse(rawS) || [];

    // Restore form fields
    $('startLocation').value   = form.start    || '';
    $('mainDestination').value = form.dest     || '';
    $('numTravelers').value    = form.travelers || 2;
    $('travelMode').value      = form.mode     || 'car';
    $('totalBudget').value     = form.budget   || 15000;
    $('budgetSlider').value    = form.budget   || 15000;
    $('travelDate').value      = form.date     || '';
    updateSliderFill();

    // Restore stops
    state.stops = stops;
    renderStops();

    // Re-render results
    state.lastResult     = result;
    state.allAttractions = result.attractions || [];
    renderResults(result);
    $('mapInfoBar').style.display = 'grid';
    $('altRoutesBtn').style.display = 'block';

    // Re-show map after a small delay (so maps API has time to init)
    setTimeout(() => showMapRoute(result.stops), 800);

    showToast('✦ Previous trip restored — scroll down to view', 'success');
  } catch (e) { /* corrupted data — ignore */ }
}

/** Clear everything and reset to fresh state */
function resetTrip() {
  // Clear localStorage
  localStorage.removeItem(SK_RESULT);
  localStorage.removeItem(SK_FORM);
  localStorage.removeItem(SK_STOPS);

  // Reset form
  $('startLocation').value   = '';
  $('mainDestination').value = '';
  $('numTravelers').value    = 2;
  $('travelMode').value      = 'car';
  $('totalBudget').value     = 15000;
  $('budgetSlider').value    = 15000;
  $('travelDate').value      = '';
  updateSliderFill();

  // Reset state
  state.stops          = [];
  state.lastResult     = null;
  state.allAttractions = [];
  renderStops();

  // Hide results & info
  $('results').style.display       = 'none';
  $('altRoutesBtn').style.display  = 'none';
  $('mapInfoBar').style.display    = 'none';
  const gb = $('openGmapsBtn');
  if (gb) gb.style.display = 'none';
  $('savingsBanner').style.display = 'none';

  // Reset map overlay
  $('mapOverlay').classList.remove('hidden');

  // Clear Google Maps
  if (state.gmap) {
    state.gmMarkers.forEach(m => m.setMap(null));
    state.gmMarkers = [];
    if (state.gmDirectionsRenderer) {
      try { state.gmDirectionsRenderer.setDirections({ routes: [] }); } catch (_) {}
    }
    state.gmap.setCenter(SL_CENTER);
    state.gmap.setZoom(8);
  }

  // Clear Leaflet
  if (state.lmap) {
    state.lMarkers.forEach(m => state.lmap.removeLayer(m));
    state.lMarkers = [];
    if (state.lRouteControl) {
      state.lmap.removeControl(state.lRouteControl);
      state.lRouteControl = null;
    }
    state.lmap.setView([7.87, 80.77], 8);
  }

  showToast('✦ Trip reset — plan a new journey!', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Wire Reset button
$('resetBtn')?.addEventListener('click', () => {
  if (confirm('Reset your trip and start fresh?')) resetTrip();
});

// ============================================================
// SAVE trip after successful plan
// ============================================================
// Patch: after planTrip, save to localStorage
const _origSubmit = $('tripForm').onsubmit;
$('tripForm').addEventListener('submit', async function saveHook(e) {
  // Wait one tick so the main handler runs first
  await delay(1200);
  if (state.lastResult) saveTrip(state.lastResult);
}, { capture: false });

// ============================================================
// DOMContentLoaded — init map + restore saved trip
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init map after layout settles
  setTimeout(() => {
    if (window.googleMapsLoaded && window.initGoogleMap) window.initGoogleMap();
    else if (window.initLeafletMap) window.initLeafletMap();
  }, 600);

  // Wipe saved trip state on refresh cleanly
  setTimeout(() => {
    localStorage.removeItem('th_result');
    localStorage.removeItem('th_form');
    localStorage.removeItem('th_stops');
    const form = document.getElementById('tripForm');
    if (form) form.reset();
  }, 100);
});

// ============================================================
// SCROLL REVEAL — IntersectionObserver (delayed for gallery)
// ============================================================
(function initReveal() {
  const generalObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); generalObs.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  const galleryObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); galleryObs.unobserve(e.target); } });
  }, { threshold: 0.6 });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    if (el.closest('#gallery')) galleryObs.observe(el);
    else generalObs.observe(el);
  });
})();

// ============================================================
// STAR RATING
// ============================================================
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('mouseover', function() {
    const val = this.dataset.val;
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('hovered', s.dataset.val <= val);
    });
  });
  star.addEventListener('mouseout', function() {
    document.querySelectorAll('.star').forEach(s => s.classList.remove('hovered'));
  });
  star.addEventListener('click', function() {
    const val = this.dataset.val;
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('selected', s.dataset.val <= val);
    });
    showToast(`Thank you for rating us ${val} stars! ⭐`, 'success');
  });
});



