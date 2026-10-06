export interface Package {
  slug: string;
  title: string;
  location: string;
  image: string;
  images?: string[];
  days: string;
  price: string;
  rating: number;
  badge: string;
  description: string;
  accommodation: string;
  highlights: string[];
  flightIncluded?: boolean;
  itinerary?: { title: string; detail: string }[];
  conditions?: string;
  category?: string;
}

const tourStorageKey = 'aeropointTours';

export const getTourPackages = (): Package[] => {
  try {
    const storedTours = localStorage.getItem(tourStorageKey);
    if (!storedTours) return defaultTourPackages;
    const parsedTours: unknown = JSON.parse(storedTours);
    return Array.isArray(parsedTours) ? parsedTours as Package[] : defaultTourPackages;
  } catch {
    return defaultTourPackages;
  }
};

export const saveTourPackages = (tours: Package[]) => {
  localStorage.setItem(tourStorageKey, JSON.stringify(tours));
};

export const trendingPackages: Package[] = [
  { slug: "premium-umrah", title: "Premium Umrah Tour", location: "Mecca & Medina, KSA", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80", days: "10 Days", price: "₦2,850,000", rating: 4.9, badge: "Best Seller", description: "A pilgrimage itinerary designed around time in Mecca and Medina, with travel arrangements coordinated for a more manageable journey.", accommodation: "Accommodation arrangements in Mecca and Medina; property and room details are confirmed with the selected departure.", highlights: ["Mecca and Medina itinerary", "Accommodation details confirmed before booking", "Travel support for the pilgrimage"], flightIncluded: true, category: 'Hajj & Umrah' },
  { slug: "zanzibar-white-sands", title: "Zanzibar White Sands", location: "Zanzibar, Tanzania", image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80", days: "7 Days", price: "₦1,850,000", rating: 4.8, badge: "Honeymoon", description: "A relaxed island escape combining Zanzibar's coastline with time to discover the character and history of Stone Town.", accommodation: "Beachfront accommodation in Zanzibar; property and room details are confirmed with the selected departure.", highlights: ["Time on Zanzibar's beaches", "Optional Stone Town and spice experiences", "Accommodation and transfer details confirmed before booking"], flightIncluded: true },
  { slug: "maldives-overwater-retreat", title: "Maldives Overwater Retreat", location: "Male, Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", days: "5 Days", price: "₦3,600,000", rating: 5.0, badge: "Luxury", description: "A short Maldives island retreat focused on ocean views, quiet resort time, and a slower pace between arrival and departure.", accommodation: "Island resort accommodation in the Maldives; specific resort, room, and transfer arrangements are confirmed before booking.", highlights: ["Maldives island stay", "Time for resort and water activities", "Transfer details confirmed with the selected property"], flightIncluded: false },
  { slug: "dubai-luxury-escape", title: "Dubai Luxury Escape", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", days: "6 Days", price: "₦1,450,000", rating: 4.7, badge: "City Break", description: "A city break with room to explore Dubai's modern landmarks, markets, dining, and desert experiences at your own pace.", accommodation: "Dubai stay; the selected property, board basis, and room conditions are confirmed before booking.", highlights: ["Time to explore Dubai", "Optional city and desert activities", "Stay and transfer details confirmed before booking"], flightIncluded: true },
  { slug: "paris-romantic-getaway", title: "Paris Romantic Getaway", location: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", days: "5 Days", price: "₦2,100,000", rating: 4.9, badge: "Couples", description: "A Paris city stay for exploring celebrated neighborhoods, museums, cafés, and riverside views over a few unhurried days.", accommodation: "Paris stay; property, room, and meal details are confirmed with the selected departure.", highlights: ["Time to explore central Paris", "Flexible sightseeing plans", "Stay details confirmed before booking"], flightIncluded: false },
  { slug: "bali-tropics", title: "Bali Tropics", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", days: "8 Days", price: "₦1,950,000", rating: 4.8, badge: "Adventure", description: "A tropical Bali itinerary with space to balance cultural visits, coastal scenery, and downtime between excursions.", accommodation: "Bali accommodation; property, room, and transfer details are confirmed before booking.", highlights: ["Time to discover Bali", "Optional cultural and outdoor activities", "Accommodation details confirmed with the selected departure"], flightIncluded: true },
];

type TourSeed = Omit<Package, 'images' | 'itinerary' | 'conditions'> & Partial<Pick<Package, 'images' | 'itinerary' | 'conditions'>>;

const itineraryFor = (tour: TourSeed): Package['itinerary'] => [
  { title: `Arrival in ${tour.location}`, detail: `Arrive and follow the confirmed transfer and accommodation information for ${tour.title}.` },
  { title: 'Explore the destination', detail: tour.description },
  { title: 'Tour highlights', detail: tour.highlights.join('. ') + '.' },
  { title: 'Departure', detail: `Check out and travel home according to the confirmed ${tour.days.toLowerCase()} itinerary.` },
];

const additionalTours: TourSeed[] = [
  { slug: 'footsteps-of-christ', title: 'Footsteps of Christ', location: 'Jerusalem, Israel', image: 'https://images.unsplash.com/photo-1549880181-59a4413fad88?w=800&q=80', days: '10 Days', price: '₦3,100,000', rating: 4.9, badge: 'Christian Pilgrimage', description: 'A guided pilgrimage through significant sites in Jerusalem and the surrounding region, with time for reflection and local history.', accommodation: 'Accommodation and local transfers are confirmed with the selected departure.', highlights: ['Guided Jerusalem visits', 'Regional heritage stops', 'Pilgrimage support throughout the tour'], flightIncluded: false, category: 'Christian Pilgrimage', conditions: 'International airfare is not included. Site access and itinerary may change due to local conditions.' },
  { slug: 'holy-city-discovery', title: 'Holy City Discovery', location: 'Nazareth & Jerusalem', image: 'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=800&q=80', days: '7 Days', price: '₦2,200,000', rating: 4.7, badge: 'Christian Pilgrimage', description: 'A compact faith and heritage tour connecting Nazareth and Jerusalem with guided visits and arranged regional transport.', accommodation: 'Selected accommodation in Nazareth and Jerusalem; property details are confirmed before payment.', highlights: ['Nazareth and Jerusalem visits', 'Guided cultural stops', 'Regional transfer arrangements'], flightIncluded: true, category: 'Christian Pilgrimage', conditions: 'Site access, flights, and travel advisories are confirmed before departure.' },
  { slug: 'al-firdaus-royal', title: 'Al-Firdaus Royal Experience', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80', days: '14 Days', price: '₦4,850,000', rating: 5, badge: 'Royal VIP', description: 'A premium Umrah journey with private transfers, dedicated pilgrimage support, and time in both holy cities.', accommodation: 'Haram-view suite arrangements in Mecca and Medina, subject to supplier confirmation.', highlights: ['Haram-view suite arrangements', 'Private SUV transfers', 'Dedicated VIP Mutawwif'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Flight schedule, room category, visa requirements, and supplier conditions are confirmed before payment.' },
  { slug: 'ramadan-laylatul-qadr', title: 'Ramadan Laylatul Qadr Retreat', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80', days: '15 Days', price: '₦5,200,000', rating: 5, badge: 'Seasonal VIP', description: 'A Ramadan pilgrimage planned around worship in Mecca and Medina, with guided support and seasonal arrangements.', accommodation: 'Luxury suite arrangements with the final properties confirmed for the selected dates.', highlights: ['Haram-view iftar and suhoor arrangements', 'Tahajjud guidance', 'Airport fast-track assistance'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Ramadan dates, visa rules, flight inventory, and room availability are subject to confirmation.' },
  { slug: 'maqam-elite', title: 'Maqam Elite Selection', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80', days: '10 Days', price: '₦3,200,000', rating: 4.9, badge: 'Elite 5-Star', description: 'A focused Umrah tour combining time in both holy cities with organized transfers and guided Ziyarat.', accommodation: 'Five-star accommodation options; specific properties and room terms are confirmed before payment.', highlights: ['Guided Ziyarat tours', 'Haramain train tickets', 'Premium transfers'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Train seats, hotel inventory, visa requirements, and airline terms are subject to availability.' },
  { slug: 'al-aqsa-umrah', title: 'Al-Aqsa & Umrah Dual Journey', location: 'Jerusalem, Mecca & Medina', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80', days: '12 Days', price: '₦3,650,000', rating: 4.9, badge: 'Heritage Plus', description: 'A multi-city spiritual journey pairing guided time in Jerusalem with pilgrimage arrangements in Mecca and Medina.', accommodation: 'Selected stays in Jerusalem, Mecca, and Medina, confirmed with the final itinerary.', highlights: ['Three nights in Jerusalem', 'Guided Al-Aqsa tour', 'Multi-city ground transfers'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Regional entry requirements and site access can change. All routes and suppliers are confirmed before payment.' },
  { slug: 'zamzam-family-harmony', title: 'Zamzam Family Harmony', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1565552643952-b4b600ce36ce?w=800&q=80', days: '12 Days', price: '₦2,950,000', rating: 4.8, badge: 'Family Premium', description: 'A family-oriented Umrah tour with coordinated room arrangements, group visits, and support throughout the journey.', accommodation: 'Family connecting room requests are subject to property availability.', highlights: ['Family room arrangements', 'Kid-friendly Ziyarat', 'Dedicated travel support'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Room configurations, child fares, and group activities are confirmed for each booking.' },
  { slug: 'al-safa-premium', title: 'Al-Safa Premium Journey', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80', days: '10 Days', price: '₦2,450,000', rating: 4.8, badge: 'Premium 4-Star', description: 'A balanced Umrah tour with arranged stays, scheduled shuttle access, and group Ziyarat in both holy cities.', accommodation: 'Four-star accommodation options, with property details confirmed before payment.', highlights: ['Haram shuttle arrangements', 'Group Ziyarat tours', 'Return economy travel'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Shuttle schedules, flight inventory, and room arrangements are subject to supplier availability.' },
  { slug: 'noor-essential-path', title: 'Noor Essential Path', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1552084117-56a98a9463c6?w=800&q=80', days: '7 Days', price: '₦1,850,000', rating: 4.7, badge: 'Essential Value', description: 'An essential Umrah itinerary with group transfers, practical accommodation arrangements, and visa support.', accommodation: 'Three-star accommodation options; final properties and walking distances are confirmed before payment.', highlights: ['Group coach transfers', 'Umrah visa processing support', 'Essential accommodation'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Visa decisions are made by relevant authorities; flights and hotel terms are confirmed before payment.' },
  { slug: 'mina-spiritual-explorer', title: 'Mina Spiritual Explorer', location: 'Mecca & Medina', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80', days: '8 Days', price: '₦1,650,000', rating: 4.6, badge: 'Economy Plus', description: 'A value-focused pilgrimage with shared coach transfers, group visits, and practical support for the Umrah journey.', accommodation: 'Standard accommodation; property and room conditions are confirmed with the selected dates.', highlights: ['Group coach transfers', 'Economy travel arrangements', 'Umrah visa processing support'], flightIncluded: true, category: 'Hajj & Umrah', conditions: 'Shared transport, room type, and airline rules are subject to supplier confirmation.' },
];

export const defaultTourPackages: Package[] = [...trendingPackages, ...additionalTours].map((tour) => ({
  ...tour,
  images: tour.images?.length ? tour.images : [tour.image],
  itinerary: tour.itinerary?.length ? tour.itinerary : itineraryFor(tour),
  conditions: tour.conditions || 'Availability, exact inclusions, and supplier conditions are confirmed before booking.',
  flightIncluded: tour.flightIncluded ?? false,
  category: tour.category || 'Vacations',
}));
