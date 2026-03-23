// ============================================================
// locations.js — Sri Lanka Trip Planner Location Dataset
// All coordinates are real GPS positions in Sri Lanka
// All prices are in LKR
// ============================================================

const SRI_LANKA_CITIES = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612, province: "Western" },
  { name: "Kandy", lat: 7.2906, lng: 80.6337, province: "Central" },
  { name: "Galle", lat: 6.0535, lng: 80.2210, province: "Southern" },
  { name: "Matara", lat: 5.9485, lng: 80.5353, province: "Southern" },
  { name: "Ella", lat: 6.8721, lng: 81.0465, province: "Uva" },
  { name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, province: "Central" },
  { name: "Trincomalee", lat: 8.5874, lng: 81.2152, province: "Eastern" },
  { name: "Negombo", lat: 7.2089, lng: 79.8357, province: "Western" },
  { name: "Anuradhapura", lat: 8.3114, lng: 80.4037, province: "North Central" },
  { name: "Polonnaruwa", lat: 7.9403, lng: 81.0188, province: "North Central" },
  { name: "Sigiriya", lat: 7.9570, lng: 80.7603, province: "Central" },
  { name: "Hikkaduwa", lat: 6.1395, lng: 80.1002, province: "Southern" },
  { name: "Mirissa", lat: 5.9483, lng: 80.4718, province: "Southern" },
  { name: "Arugam Bay", lat: 6.8400, lng: 81.8376, province: "Eastern" },
  { name: "Unawatuna", lat: 6.0153, lng: 80.2496, province: "Southern" },
  { name: "Bentota", lat: 6.4261, lng: 79.9953, province: "Western" },
  { name: "Dambulla", lat: 7.8742, lng: 80.6511, province: "Central" },
  { name: "Haputale", lat: 6.7661, lng: 80.9597, province: "Uva" },
  { name: "Badulla", lat: 6.9934, lng: 81.0550, province: "Uva" },
  { name: "Ratnapura", lat: 6.6828, lng: 80.3992, province: "Sabaragamuwa" },
  { name: "Kalutara", lat: 6.5854, lng: 79.9607, province: "Western" },
  { name: "Ambalangoda", lat: 6.2360, lng: 80.0537, province: "Southern" },
  { name: "Tangalle", lat: 6.0248, lng: 80.7970, province: "Southern" },
  { name: "Hambantota", lat: 6.1429, lng: 81.1212, province: "Southern" },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255, province: "Northern" },
  { name: "Vavuniya", lat: 8.7514, lng: 80.4971, province: "Northern" },
  { name: "Batticaloa", lat: 7.7310, lng: 81.6747, province: "Eastern" },
  { name: "Ampara", lat: 7.2956, lng: 81.6722, province: "Eastern" },
  { name: "Chilaw", lat: 7.5758, lng: 79.7956, province: "North Western" },
  { name: "Kurunegala", lat: 7.4863, lng: 80.3647, province: "North Western" },
  { name: "Gampaha", lat: 7.0913, lng: 80.0137, province: "Western" },
  { name: "Matale", lat: 7.4697, lng: 80.6235, province: "Central" },
];

const RESTAURANTS = [
  // Colombo
  { id: "r1", name: "Ministry of Crab", city: "Colombo", lat: 6.9218, lng: 79.8477, cuisine: "Seafood", pricePerPerson: 3500, rating: 4.8, description: "World-famous crab restaurant in a historic Dutch Hospital" },
  { id: "r2", name: "Nuga Gama", city: "Colombo", lat: 6.9140, lng: 79.8470, cuisine: "Sri Lankan", pricePerPerson: 2200, rating: 4.6, description: "Authentic village-style Sri Lankan cuisine in a garden setting" },
  { id: "r3", name: "Commons Coffee House", city: "Colombo", lat: 6.9008, lng: 79.8605, cuisine: "Café / Western", pricePerPerson: 1200, rating: 4.4, description: "Trendy café with all-day brunch and great coffee" },
  { id: "r4", name: "Upali's by Nawaloka", city: "Colombo", lat: 6.9271, lng: 79.8630, cuisine: "Sri Lankan", pricePerPerson: 900, rating: 4.3, description: "Popular local chain known for rice and curry" },
  { id: "r5", name: "Cinnamon Grand Buffet", city: "Colombo", lat: 6.9145, lng: 79.8502, cuisine: "International Buffet", pricePerPerson: 4500, rating: 4.5, description: "Lavish international buffet at a 5-star hotel" },
  // Kandy
  { id: "r6", name: "The Kandy Club", city: "Kandy", lat: 7.2954, lng: 80.6401, cuisine: "Continental", pricePerPerson: 2000, rating: 4.5, description: "Colonial charm with stunning views over Kandy lake" },
  { id: "r7", name: "Slightly Chilled", city: "Kandy", lat: 7.2987, lng: 80.6341, cuisine: "Western / Sri Lankan", pricePerPerson: 1400, rating: 4.3, description: "Rooftop restaurant with lake view and varied menu" },
  { id: "r8", name: "Paiva's Restaurant", city: "Kandy", lat: 7.2934, lng: 80.6359, cuisine: "Sri Lankan", pricePerPerson: 750, rating: 4.1, description: "Budget-friendly authentic rice and curry" },
  { id: "r9", name: "Empire Café", city: "Kandy", lat: 7.2941, lng: 80.6351, cuisine: "Café", pricePerPerson: 950, rating: 4.2, description: "Historic building repurposed into a lovely café" },
  // Galle
  { id: "r10", name: "Fortaleza Restaurant", city: "Galle", lat: 6.0279, lng: 80.2169, cuisine: "International", pricePerPerson: 2800, rating: 4.6, description: "Inside Galle Fort with sea views and fusion menu" },
  { id: "r11", name: "Lucky Fort Restaurant", city: "Galle", lat: 6.0285, lng: 80.2173, cuisine: "Sri Lankan / Seafood", pricePerPerson: 1100, rating: 4.2, description: "Local favourite known for fresh seafood" },
  { id: "r12", name: "Old Dutch Hospital Café", city: "Galle", lat: 6.0347, lng: 80.2178, cuisine: "Café / Western", pricePerPerson: 1300, rating: 4.3, description: "Charming café in a heritage building" },
  // Ella
  { id: "r13", name: "Ella Gap Tourist Rest", city: "Ella", lat: 6.8755, lng: 81.0479, cuisine: "Sri Lankan", pricePerPerson: 850, rating: 4.1, description: "Panoramic valley views with simple Sri Lankan meals" },
  { id: "r14", name: "AK Ristorante", city: "Ella", lat: 6.8741, lng: 81.0455, cuisine: "Italian / Sri Lankan fusion", pricePerPerson: 1600, rating: 4.4, description: "Creative fusion dishes in a cozy setting" },
  { id: "r15", name: "Chill Space Ella", city: "Ella", lat: 6.8760, lng: 81.0448, cuisine: "Café / International", pricePerPerson: 1100, rating: 4.3, description: "Relaxed rooftop café with mountain views" },
  // Nuwara Eliya
  { id: "r16", name: "Grand Indian Restaurant", city: "Nuwara Eliya", lat: 6.9677, lng: 80.7778, cuisine: "Indian", pricePerPerson: 1200, rating: 4.2, description: "Popular Indian restaurant in the hill station town" },
  { id: "r17", name: "Grand Hotel Dining", city: "Nuwara Eliya", lat: 6.9697, lng: 80.7772, cuisine: "Continental", pricePerPerson: 3500, rating: 4.6, description: "Colonial grandeur with high tea and fine dining" },
  { id: "r18", name: "De Silva Food Centre", city: "Nuwara Eliya", lat: 6.9687, lng: 80.7791, cuisine: "Sri Lankan", pricePerPerson: 600, rating: 4.0, description: "No-frills local rice and curry, great value" },
  // Hikkaduwa
  { id: "r19", name: "Spaghetti & Co", city: "Hikkaduwa", lat: 6.1403, lng: 80.0995, cuisine: "Italian", pricePerPerson: 1800, rating: 4.3, description: "Beachfront Italian restaurant with fresh pasta" },
  { id: "r20", name: "Refresh Restaurant", city: "Hikkaduwa", lat: 6.1380, lng: 80.1011, cuisine: "Seafood", pricePerPerson: 1300, rating: 4.1, description: "Fresh catch of the day by the beach" },
  // Mirissa
  { id: "r21", name: "Dewmini Roti Shop", city: "Mirissa", lat: 5.9460, lng: 80.4730, cuisine: "Sri Lankan / Roti", pricePerPerson: 500, rating: 4.5, description: "Famous roti shop, legendary among backpackers" },
  { id: "r22", name: "The Shady Lady", city: "Mirissa", lat: 5.9488, lng: 80.4709, cuisine: "Seafood / International", pricePerPerson: 2000, rating: 4.4, description: "Beachfront dining with ocean sunsets" },
  // Trincomalee
  { id: "r23", name: "Welcome Restaurant", city: "Trincomalee", lat: 8.5868, lng: 81.2198, cuisine: "Seafood / Sri Lankan", pricePerPerson: 1000, rating: 4.0, description: "Fresh seafood at harbour-side prices" },
  { id: "r24", name: "Chinese Dragon", city: "Trincomalee", lat: 8.5833, lng: 81.2151, cuisine: "Chinese", pricePerPerson: 1400, rating: 3.9, description: "Chinese and Filipino food popular with locals" },
  // Negombo
  { id: "r25", name: "Rodeo Pub & Restaurant", city: "Negombo", lat: 7.2093, lng: 79.8362, cuisine: "Western / Grill", pricePerPerson: 2200, rating: 4.2, description: "Lively grill restaurant near the beach" },
  { id: "r26", name: "Fish Market Restaurant", city: "Negombo", lat: 7.2100, lng: 79.8370, cuisine: "Seafood", pricePerPerson: 1500, rating: 4.3, description: "Pick your fish from the market, they cook it fresh" },
  // Dambulla
  { id: "r27", name: "Gimhana Restaurant", city: "Dambulla", lat: 7.8745, lng: 80.6498, cuisine: "Sri Lankan", pricePerPerson: 700, rating: 4.0, description: "Local rice and curry near the cave temples" },
  // Anuradhapura
  { id: "r28", name: "Shalini Restaurant", city: "Anuradhapura", lat: 8.3110, lng: 80.4045, cuisine: "Sri Lankan", pricePerPerson: 650, rating: 3.9, description: "Simple local meals near the ancient ruins" },
  // Tangalle
  { id: "r29", name: "Buckingham Place Restaurant", city: "Tangalle", lat: 6.0212, lng: 80.7993, cuisine: "Seafood / Sri Lankan", pricePerPerson: 2500, rating: 4.5, description: "Elegant beachfront dining with fresh seafood" },
  // Haputale
  { id: "r30", name: "Amarasinghe Guest House Restaurant", city: "Haputale", lat: 6.7658, lng: 80.9601, cuisine: "Sri Lankan", pricePerPerson: 550, rating: 4.0, description: "Home-cooked Sri Lankan food with misty hill views" },
];

const HOTELS = [
  // Colombo
  { id: "h1", name: "Cinnamon Grand Colombo", city: "Colombo", lat: 6.9145, lng: 79.8502, pricePerNight: 28000, rating: 4.7, stars: 5, description: "Iconic 5-star hotel in the heart of Colombo" },
  { id: "h2", name: "Galle Face Hotel", city: "Colombo", lat: 6.8950, lng: 79.8442, pricePerNight: 22000, rating: 4.5, stars: 5, description: "Historic oceanfront hotel since 1864" },
  { id: "h3", name: "Colombo City Hotel", city: "Colombo", lat: 6.9216, lng: 79.8620, pricePerNight: 8500, rating: 4.1, stars: 3, description: "Comfortable mid-range hotel with city views" },
  { id: "h4", name: "Hotel Sapphire", city: "Colombo", lat: 6.9089, lng: 79.8545, pricePerNight: 5500, rating: 3.8, stars: 3, description: "Budget-friendly stay in central Colombo" },
  // Kandy
  { id: "h5", name: "Earl's Regency Hotel", city: "Kandy", lat: 7.3092, lng: 80.6226, pricePerNight: 18500, rating: 4.6, stars: 5, description: "Luxury hillside resort overlooking Kandy" },
  { id: "h6", name: "The Kandy House", city: "Kandy", lat: 7.3047, lng: 80.5836, pricePerNight: 24000, rating: 4.8, stars: 5, description: "Boutique heritage mansion in lush gardens" },
  { id: "h7", name: "Hotel Casamara", city: "Kandy", lat: 7.2944, lng: 80.6375, pricePerNight: 7000, rating: 4.0, stars: 3, description: "Well-located mid-range hotel near the temple" },
  { id: "h8", name: "McLeod Inn", city: "Kandy", lat: 7.2962, lng: 80.6359, pricePerNight: 3500, rating: 3.7, stars: 2, description: "Budget guesthouse with great views" },
  // Galle
  { id: "h9", name: "Amangalla", city: "Galle", lat: 6.0273, lng: 80.2168, pricePerNight: 95000, rating: 4.9, stars: 5, description: "Ultra-luxury Aman resort inside Galle Fort" },
  { id: "h10", name: "Fort Dew Galle", city: "Galle", lat: 6.0282, lng: 80.2175, pricePerNight: 9500, rating: 4.3, stars: 3, description: "Cozy boutique hotel within the fort walls" },
  { id: "h11", name: "Sun House Galle", city: "Galle", lat: 6.0260, lng: 80.2190, pricePerNight: 18000, rating: 4.6, stars: 4, description: "Elegant colonial villa with pool" },
  // Ella
  { id: "h12", name: "98 Acres Resort", city: "Ella", lat: 6.8700, lng: 81.0500, pricePerNight: 22000, rating: 4.7, stars: 5, description: "Stunning mountain resort with panoramic views" },
  { id: "h13", name: "Ella Flower Garden Resort", city: "Ella", lat: 6.8731, lng: 81.0472, pricePerNight: 8000, rating: 4.3, stars: 3, description: "Lovely garden resort with mountain backdrop" },
  { id: "h14", name: "Zion View", city: "Ella", lat: 6.8748, lng: 81.0459, pricePerNight: 4500, rating: 4.2, stars: 2, description: "Budget guesthouse with spectacular valley views" },
  // Nuwara Eliya
  { id: "h15", name: "The Grand Hotel", city: "Nuwara Eliya", lat: 6.9697, lng: 80.7772, pricePerNight: 18000, rating: 4.5, stars: 4, description: "Colonial grandeur in the little England of Sri Lanka" },
  { id: "h16", name: "Single Tree Hotel", city: "Nuwara Eliya", lat: 6.9733, lng: 80.7800, pricePerNight: 6500, rating: 4.1, stars: 3, description: "Comfortable hotel on the outskirts of town" },
  // Hikkaduwa
  { id: "h17", name: "Coral Sands Hotel", city: "Hikkaduwa", lat: 6.1388, lng: 80.1005, pricePerNight: 11000, rating: 4.3, stars: 3, description: "Beachfront hotel with direct reef access" },
  { id: "h18", name: "Hikka Tranz by Cinnamon", city: "Hikkaduwa", lat: 6.1350, lng: 80.1050, pricePerNight: 16000, rating: 4.5, stars: 4, description: "Modern beach resort with pools and water sports" },
  // Mirissa
  { id: "h19", name: "Mandara Resort", city: "Mirissa", lat: 5.9477, lng: 80.4721, pricePerNight: 12000, rating: 4.4, stars: 3, description: "Boutique beachfront resort with whale watching tours" },
  { id: "h20", name: "Paradise Beach Club", city: "Mirissa", lat: 5.9492, lng: 80.4706, pricePerNight: 6000, rating: 4.0, stars: 2, description: "Relaxed beach club with simple bungalows" },
  // Trincomalee
  { id: "h21", name: "Trinco Blu by Cinnamon", city: "Trincomalee", lat: 8.5890, lng: 81.2140, pricePerNight: 18500, rating: 4.5, stars: 4, description: "Beachfront resort on Trincomalee Bay" },
  { id: "h22", name: "Welcome Hotel Trinco", city: "Trincomalee", lat: 8.5869, lng: 81.2200, pricePerNight: 5500, rating: 3.8, stars: 2, description: "Budget hotel near the harbour" },
  // Negombo
  { id: "h23", name: "Jetwing Beach Hotel", city: "Negombo", lat: 7.2152, lng: 79.8282, pricePerNight: 21000, rating: 4.6, stars: 5, description: "Luxury beach resort north of Negombo" },
  { id: "h24", name: "Browns Beach Hotel", city: "Negombo", lat: 7.2132, lng: 79.8290, pricePerNight: 9000, rating: 4.1, stars: 3, description: "Comfortable beach hotel with pool" },
  // Sigiriya
  { id: "h25", name: "Aliya Resort & Spa", city: "Sigiriya", lat: 7.9555, lng: 80.7625, pricePerNight: 20000, rating: 4.6, stars: 4, description: "Elephant-themed luxury resort near Sigiriya Rock" },
  { id: "h26", name: "Sigiriya Village Hotel", city: "Sigiriya", lat: 7.9598, lng: 80.7589, pricePerNight: 12000, rating: 4.3, stars: 3, description: "Eco-friendly hotel blending into the jungle" },
  // Bentota
  { id: "h27", name: "Taj Bentota Resort", city: "Bentota", lat: 6.4301, lng: 79.9945, pricePerNight: 35000, rating: 4.7, stars: 5, description: "Iconic Taj property on a pristine beach" },
  { id: "h28", name: "Centara Ceysands Resort", city: "Bentota", lat: 6.4245, lng: 79.9960, pricePerNight: 16000, rating: 4.4, stars: 4, description: "Island resort between the river and ocean" },
  // Haputale
  { id: "h29", name: "Olympus Hotel Haputale", city: "Haputale", lat: 6.7665, lng: 80.9596, pricePerNight: 4000, rating: 3.9, stars: 2, description: "Budget stay with incredible cloud forest views" },
  // Anuradhapura
  { id: "h30", name: "Ulagalla Resort", city: "Anuradhapura", lat: 8.3650, lng: 80.3760, pricePerNight: 32000, rating: 4.8, stars: 5, description: "Luxurious eco-resort in a ancient village setting" },
  // Tangalle
  { id: "h31", name: "Amanwella", city: "Tangalle", lat: 6.0075, lng: 80.8011, pricePerNight: 110000, rating: 4.9, stars: 5, description: "Ultra-exclusive Aman resort on a private cove" },
  { id: "h32", name: "Buckingham Place", city: "Tangalle", lat: 6.0203, lng: 80.7985, pricePerNight: 9500, rating: 4.4, stars: 3, description: "Charming boutique hotel steps from the beach" },
];

// ============================================================
// ATTRACTIONS — Places to Visit Along the Route
// category: waterfall | forest | wildlife | heritage | beach |
//           viewpoint | temple | activity | cave
// entryFee: LKR (0 = free)
// ============================================================
const ATTRACTIONS = [
  // === WATERFALLS ===
  { id: "a1",  name: "Ravana Falls", city: "Ella", lat: 6.8530, lng: 81.0467, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.4, description: "One of Sri Lanka's widest waterfalls, just 6 km from Ella town. Legend says Ravana hid Sita here. Stunning 25m cascading drop.", mustSee: true },
  { id: "a2",  name: "Diyaluma Falls", city: "Haputale", lat: 6.7247, lng: 81.0013, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.6, description: "Sri Lanka's second-tallest waterfall at 220m. Natural infinity pools at the top offer breathtaking views over the valleys.", mustSee: true },
  { id: "a3",  name: "Bambarakanda Falls", city: "Haputale", lat: 6.7956, lng: 80.9004, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.5, description: "Sri Lanka's tallest waterfall at 263m, surrounded by pine forests and tea estates. Best visited after the rains.", mustSee: true },
  { id: "a4",  name: "Ramboda Falls", city: "Nuwara Eliya", lat: 7.1121, lng: 80.7113, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.2, description: "Triple-tiered 109m waterfall visible from the famous Ramboda Pass on the Kandy–Nuwara Eliya road.", mustSee: false },
  { id: "a5",  name: "St Clair's Falls", city: "Nuwara Eliya", lat: 6.9997, lng: 80.6667, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.3, description: "Known as 'Little Niagara of Sri Lanka'. Twin waterfalls rushing through a tea estate. Free roadside viewing.", mustSee: false },
  { id: "a6",  name: "Huluganga Falls", city: "Kandy", lat: 7.2430, lng: 80.5510, category: "waterfall", categoryIcon: "💧", entryFee: 0, rating: 4.0, description: "Hidden gem waterfall near Kandy, surrounded by lush rainforest. A short trek through spice gardens.", mustSee: false },
  { id: "a7",  name: "Aberdeen Falls", city: "Ratnapura", lat: 6.8375, lng: 80.5069, category: "waterfall", categoryIcon: "💧", entryFee: 250, rating: 4.4, description: "A majestic 98m waterfall near Nuwara Eliya. The trek through jungle is part of the experience.", mustSee: false },

  // === FORESTS & NATURE RESERVES ===
  { id: "a8",  name: "Sinharaja Rainforest", city: "Ratnapura", lat: 6.4011, lng: 80.4900, category: "forest", categoryIcon: "🌿", entryFee: 700, rating: 4.7, description: "UNESCO World Heritage Sri Lanka's last viable rainforest. Home to endemic birds, purple-faced langurs, and rare serpents. A wildlife paradise.", mustSee: true },
  { id: "a9",  name: "Knuckles Mountain Range", city: "Matale", lat: 7.4264, lng: 80.7830, category: "forest", categoryIcon: "🌿", entryFee: 500, rating: 4.6, description: "UNESCO-listed cloud forest with mist-covered peaks, waterfalls, and villages. Perfect for multi-day trekking.", mustSee: true },
  { id: "a10", name: "Horton Plains National Park", city: "Nuwara Eliya", lat: 6.8000, lng: 80.8047, category: "forest", categoryIcon: "🌿", entryFee: 3500, rating: 4.8, description: "Sri Lanka's most dramatic highland plateau with 'World's End' — a sheer 870m cliff with sweeping views. Sambar deer roam freely.", mustSee: true },
  { id: "a11", name: "Peak Wilderness Sanctuary", city: "Ratnapura", lat: 6.8009, lng: 80.4993, category: "forest", categoryIcon: "🌿", entryFee: 500, rating: 4.4, description: "Dense cloud forest surrounding Adam's Peak. Remarkable biodiversity with rare orchids and leopard sightings.", mustSee: false },
  { id: "a12", name: "Kanneliya Forest Reserve", city: "Galle", lat: 6.1500, lng: 80.3500, category: "forest", categoryIcon: "🌿", entryFee: 300, rating: 4.2, description: "Lowland rainforest near Galle with hanging bridges, guided jungle walks, and endemic bird species.", mustSee: false },

  // === WILDLIFE & NATIONAL PARKS ===
  { id: "a13", name: "Yala National Park", city: "Hambantota", lat: 6.3750, lng: 81.5040, category: "wildlife", categoryIcon: "🐘", entryFee: 4500, rating: 4.8, description: "Sri Lanka's most famous wildlife reserve — world's highest density of leopards, plus elephants, sloth bears, and crocodiles. Essential safari.", mustSee: true },
  { id: "a14", name: "Udawalawe National Park", city: "Hambantota", lat: 6.4733, lng: 80.8963, category: "wildlife", categoryIcon: "🐘", entryFee: 3800, rating: 4.7, description: "Best place to see hundreds of wild elephants up close. A spectacular open-grassland safari experience.", mustSee: true },
  { id: "a15", name: "Minneriya National Park", city: "Polonnaruwa", lat: 8.0454, lng: 80.8986, category: "wildlife", categoryIcon: "🐘", entryFee: 3500, rating: 4.6, description: "Famous for 'The Gathering' — hundreds of elephants converge at the tank during dry season (July–Oct). Stunning spectacle.", mustSee: true },
  { id: "a16", name: "Wilpattu National Park", city: "Anuradhapura", lat: 8.3967, lng: 80.0167, category: "wildlife", categoryIcon: "🐘", entryFee: 4000, rating: 4.6, description: "Sri Lanka's largest national park. Known for leopards, sloth bears, and natural lakes called villus. Less crowded than Yala.", mustSee: false },
  { id: "a17", name: "Pinnawala Elephant Orphanage", city: "Kurunegala", lat: 7.2985, lng: 80.3515, category: "wildlife", categoryIcon: "🐘", entryFee: 3000, rating: 4.3, description: "Home to over 80 elephants rescued from the wild. Watch the bathing ritual in the Maha Oya river — unforgettable.", mustSee: false },
  { id: "a18", name: "Bundala National Park", city: "Hambantota", lat: 6.1517, lng: 81.1583, category: "wildlife", categoryIcon: "🦩", entryFee: 3000, rating: 4.3, description: "UNESCO Biosphere Reserve. Home to thousands of flamingos, migratory birds, and sea turtles. Ideal for birdwatching.", mustSee: false },

  // === HERITAGE & TEMPLES ===
  { id: "a19", name: "Sigiriya Lion Rock", city: "Sigiriya", lat: 7.9570, lng: 80.7603, category: "heritage", categoryIcon: "🏛️", entryFee: 4500, rating: 4.9, description: "Sri Lanka's 8th Wonder — a 200m volcanic rock fortress with ancient frescoes, mirror walls, and breathtaking 360° views. UNESCO World Heritage.", mustSee: true },
  { id: "a20", name: "Temple of the Tooth Relic", city: "Kandy", lat: 7.2935, lng: 80.6413, category: "temple", categoryIcon: "⛩️", entryFee: 1500, rating: 4.7, description: "Sri Lanka's holiest Buddhist temple housing a tooth relic of the Buddha. Evening puja ceremony draws thousands.", mustSee: true },
  { id: "a21", name: "Dambulla Cave Temple", city: "Dambulla", lat: 7.8568, lng: 80.6491, category: "cave", categoryIcon: "🕌", entryFee: 1500, rating: 4.6, description: "Five magnificent cave temples carved into a 160m rock with 153 Buddha statues and stunning ancient murals. UNESCO World Heritage.", mustSee: true },
  { id: "a22", name: "Anuradhapura Sacred City", city: "Anuradhapura", lat: 8.3114, lng: 80.4037, category: "heritage", categoryIcon: "🏛️", entryFee: 4500, rating: 4.6, description: "Ancient capital with giant dagobas, sacred Bo tree (2,300 years old), and vast ruins spreading over 40km². UNESCO World Heritage.", mustSee: true },
  { id: "a23", name: "Polonnaruwa Ancient City", city: "Polonnaruwa", lat: 7.9403, lng: 81.0188, category: "heritage", categoryIcon: "🏛️", entryFee: 4000, rating: 4.5, description: "Medieval capital with the Gal Vihara rock temples, royal palaces, and a bathing pool. Best explored by bicycle.", mustSee: false },
  { id: "a24", name: "Galle Dutch Fort", city: "Galle", lat: 6.0268, lng: 80.2170, category: "heritage", categoryIcon: "🏰", entryFee: 0, rating: 4.7, description: "A perfectly preserved 17th-century Dutch colonial fort. Walk the ramparts at sunset — the Indian Ocean views are spectacular.", mustSee: true },
  { id: "a25", name: "Adam's Peak (Sri Pada)", city: "Ratnapura", lat: 6.8096, lng: 80.4994, category: "temple", categoryIcon: "⛩️", entryFee: 0, rating: 4.8, description: "Sacred mountain pilgrimage. 5,500 steps to the top where a 'Sacred Footprint' is enshrined. The shadow triangle at sunrise is magic.", mustSee: true },
  { id: "a26", name: "Kelaniya Raja Maha Vihara", city: "Colombo", lat: 7.0011, lng: 79.9192, category: "temple", categoryIcon: "⛩️", entryFee: 0, rating: 4.5, description: "One of Sri Lanka's most sacred Buddhist temples, said to be personally visited by the Buddha. Stunning murals inside.", mustSee: false },
  { id: "a27", name: "Jaffna Fort", city: "Jaffna", lat: 9.6624, lng: 80.0014, category: "heritage", categoryIcon: "🏰", entryFee: 0, rating: 4.2, description: "Dutch colonial fort in Sri Lanka's vibrant north. Offers views over the Jaffna Lagoon.", mustSee: false },

  // === BEACHES ===
  { id: "a28", name: "Mirissa Beach", city: "Mirissa", lat: 5.9483, lng: 80.4718, category: "beach", categoryIcon: "🏖️", entryFee: 0, rating: 4.6, description: "Sri Lanka's finest crescent beach. Famous for whale watching (blue whales!), surfing, and spectacular sunsets.", mustSee: true },
  { id: "a29", name: "Unawatuna Beach", city: "Unawatuna", lat: 6.0128, lng: 80.2482, category: "beach", categoryIcon: "🏖️", entryFee: 0, rating: 4.5, description: "Sheltered horseshoe bay with calm turquoise waters, coral reefs for snorkeling, and lively beach bars.", mustSee: false },
  { id: "a30", name: "Nilaveli Beach", city: "Trincomalee", lat: 8.6800, lng: 81.1900, category: "beach", categoryIcon: "🏖️", entryFee: 0, rating: 4.7, description: "Sri Lanka's most pristine east-coast beach — powder-white sand and crystal-clear water. Near Pigeon Island for snorkeling.", mustSee: true },
  { id: "a31", name: "Hikkaduwa Coral Reef", city: "Hikkaduwa", lat: 6.1395, lng: 80.1002, category: "beach", categoryIcon: "🐠", entryFee: 0, rating: 4.4, description: "Glass-bottomed boats reveal a thriving coral reef just metres from shore. Turtles feed right on the beach!", mustSee: false },
  { id: "a32", name: "Arugam Bay", city: "Arugam Bay", lat: 6.8400, lng: 81.8376, category: "beach", categoryIcon: "🏄", entryFee: 0, rating: 4.6, description: "Asia's top surf destination and laid-back paradise on the east coast. Best waves June–September.", mustSee: true },

  // === VIEWPOINTS & ACTIVITIES ===
  { id: "a33", name: "Nine Arch Bridge, Ella", city: "Ella", lat: 6.8793, lng: 81.0540, category: "viewpoint", categoryIcon: "🌉", entryFee: 0, rating: 4.8, description: "Sri Lanka's most iconic railway bridge. Arrive early to watch the blue train cross against a backdrop of misty mountains.", mustSee: true },
  { id: "a34", name: "Little Adam's Peak, Ella", city: "Ella", lat: 6.8630, lng: 81.0430, category: "viewpoint", categoryIcon: "🗻", entryFee: 0, rating: 4.6, description: "An easy 2km hike with panoramic views of Ella Gap, tea estates, and Ella town. Best at sunrise.", mustSee: true },
  { id: "a35", name: "Lipton's Seat", city: "Haputale", lat: 6.7383, lng: 80.9450, category: "viewpoint", categoryIcon: "🗻", entryFee: 0, rating: 4.7, description: "Sir Thomas Lipton's favourite viewpoint over miles of tea estates. On a clear day, you can see both coasts of Sri Lanka!", mustSee: true },
  { id: "a36", name: "Whale Watching, Mirissa", city: "Mirissa", lat: 5.9483, lng: 80.4718, category: "activity", categoryIcon: "🐋", entryFee: 5000, rating: 4.7, description: "Best blue whale watching in the world (Nov–April). Thrilling encounters with sperm whales and spinner dolphins.", mustSee: true },
  { id: "a37", name: "Ella Train Ride", city: "Ella", lat: 6.8721, lng: 81.0465, category: "activity", categoryIcon: "🚂", entryFee: 110, rating: 4.9, description: "The Kandy–Ella train journey is rated the most scenic train ride in the world. Through tea estates, tunnels and misty valleys.", mustSee: true },
  { id: "a38", name: "Pigeon Island Marine Sanctuary", city: "Trincomalee", lat: 8.7200, lng: 81.2000, category: "activity", categoryIcon: "🐠", entryFee: 2500, rating: 4.6, description: "Pristine snorkeling and diving. Blacktip reef sharks, hawksbill turtles, and vibrant coral gardens.", mustSee: false },
  { id: "a39", name: "Colombo Galle Face Green", city: "Colombo", lat: 6.8951, lng: 79.8491, category: "viewpoint", categoryIcon: "🌅", entryFee: 0, rating: 4.2, description: "Iconic oceanfront esplanade. Watch the sunset over the Indian Ocean while eating local street food — isso vadai and kottu.", mustSee: false },
  { id: "a40", name: "Demodara Loop & Bridge", city: "Ella", lat: 6.9191, lng: 81.0413, category: "heritage", categoryIcon: "🌉", entryFee: 0, rating: 4.5, description: "A unique railway loop where the train passes through a tunnel directly under itself — an engineering marvel.", mustSee: false },
  { id: "a41", name: "Batadomba lena Cave", city: "Ratnapura", lat: 6.6900, lng: 80.3800, category: "cave", categoryIcon: "🦇", entryFee: 500, rating: 4.3, description: "Prehistoric cave with excavated human remains dating 35,000 years. Guided tours with torches into the stalactite chambers.", mustSee: false },
  { id: "a42", name: "Negombo Lagoon", city: "Negombo", lat: 7.2080, lng: 79.8350, category: "activity", categoryIcon: "🚣", entryFee: 1500, rating: 4.3, description: "Boat tours through mangroves and past Dutch canals. Famous for its vibrant fishing community and fresh seafood culture.", mustSee: false },
];

// ============================================================
// Get nearby attractions within radiusKm
// ============================================================
function getNearbyAttractions(lat, lng, radiusKm = 50) {
  return ATTRACTIONS
    .map(a => ({ ...a, distKm: haversineDistance(lat, lng, a.lat, a.lng) }))
    .filter(a => a.distKm <= radiusKm)
    .sort((a, b) => {
      // Must-see first, then by rating score (penalize distance)
      const scoreA = (a.mustSee ? 5 : 0) + a.rating * 2 - a.distKm * 0.04;
      const scoreB = (b.mustSee ? 5 : 0) + b.rating * 2 - b.distKm * 0.04;
      return scoreB - scoreA;
    })
    .slice(0, 6);
}

// ============================================================
// Helper: Haversine distance in km
// ============================================================
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ============================================================
// Find nearest city to a lat/lng
// ============================================================
function findNearestCity(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  for (const c of SRI_LANKA_CITIES) {
    const d = haversineDistance(lat, lng, c.lat, c.lng);
    if (d < minDist) { minDist = d; nearest = c; }
  }
  return nearest;
}

// ============================================================
// Get city coordinates by name (fuzzy)
// ============================================================
function getCityCoords(name) {
  const n = name.trim().toLowerCase();
  return SRI_LANKA_CITIES.find(c => c.name.toLowerCase().includes(n) || n.includes(c.name.toLowerCase())) || null;
}

// ============================================================
// Get nearby restaurants within radiusKm, budget filtered
// ============================================================
function getNearbyRestaurants(lat, lng, budgetPerPerson, radiusKm = 30) {
  return RESTAURANTS
    .map(r => ({ ...r, distKm: haversineDistance(lat, lng, r.lat, r.lng) }))
    .filter(r => r.distKm <= radiusKm && r.pricePerPerson <= budgetPerPerson)
    .sort((a, b) => (b.rating * 10 - a.distKm) - (a.rating * 10 - b.distKm))
    .slice(0, 5);
}

// ============================================================
// Get nearby hotels within radiusKm, budget filtered
// ============================================================
function getNearbyHotels(lat, lng, budgetPerNight, radiusKm = 40) {
  return HOTELS
    .map(h => ({ ...h, distKm: haversineDistance(lat, lng, h.lat, h.lng) }))
    .filter(h => h.distKm <= radiusKm && h.pricePerNight <= budgetPerNight)
    .sort((a, b) => (b.rating * 8 - a.distKm * 0.5 - b.pricePerNight / 5000) - (a.rating * 8 - b.distKm * 0.5 - a.pricePerNight / 5000))
    .slice(0, 4);
}

// ============================================================
// Populate city suggestions datalist
// ============================================================
function populateCitySuggestions() {
  const dl = document.getElementById("citySuggestions");
  if (!dl) return;
  SRI_LANKA_CITIES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.name;
    dl.appendChild(opt);
  });
}
document.addEventListener("DOMContentLoaded", populateCitySuggestions);
