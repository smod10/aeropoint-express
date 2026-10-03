export interface Package {
  slug: string;
  title: string;
  location: string;
  image: string;
  days: string;
  price: string;
  rating: number;
  badge: string;
  description: string;
  accommodation: string;
  highlights: string[];
}

export const trendingPackages: Package[] = [
  { slug: "premium-umrah", title: "Premium Umrah Package", location: "Mecca & Medina, KSA", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80", days: "10 Days", price: "₦2,850,000", rating: 4.9, badge: "Best Seller", description: "A pilgrimage itinerary designed around time in Mecca and Medina, with travel arrangements coordinated for a more manageable journey.", accommodation: "Accommodation arrangements in Mecca and Medina; property and room details are confirmed with the selected departure.", highlights: ["Mecca and Medina itinerary", "Accommodation details confirmed before booking", "Travel support for the pilgrimage"] },
  { slug: "zanzibar-white-sands", title: "Zanzibar White Sands", location: "Zanzibar, Tanzania", image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80", days: "7 Days", price: "₦1,850,000", rating: 4.8, badge: "Honeymoon", description: "A relaxed island escape combining Zanzibar's coastline with time to discover the character and history of Stone Town.", accommodation: "Beachfront accommodation in Zanzibar; property and room details are confirmed with the selected departure.", highlights: ["Time on Zanzibar's beaches", "Optional Stone Town and spice experiences", "Accommodation and transfer details confirmed before booking"] },
  { slug: "maldives-overwater-retreat", title: "Maldives Overwater Retreat", location: "Male, Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", days: "5 Days", price: "₦3,600,000", rating: 5.0, badge: "Luxury", description: "A short Maldives island retreat focused on ocean views, quiet resort time, and a slower pace between arrival and departure.", accommodation: "Island resort accommodation in the Maldives; specific resort, room, and transfer arrangements are confirmed before booking.", highlights: ["Maldives island stay", "Time for resort and water activities", "Transfer details confirmed with the selected property"] },
  { slug: "dubai-luxury-escape", title: "Dubai Luxury Escape", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", days: "6 Days", price: "₦1,450,000", rating: 4.7, badge: "City Break", description: "A city break with room to explore Dubai's modern landmarks, markets, dining, and desert experiences at your own pace.", accommodation: "Dubai hotel accommodation; the selected property, board basis, and room conditions are confirmed before booking.", highlights: ["Time to explore Dubai", "Optional city and desert activities", "Hotel and transfer details confirmed before booking"] },
  { slug: "paris-romantic-getaway", title: "Paris Romantic Getaway", location: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", days: "5 Days", price: "₦2,100,000", rating: 4.9, badge: "Couples", description: "A Paris city stay for exploring celebrated neighborhoods, museums, cafés, and riverside views over a few unhurried days.", accommodation: "Paris hotel accommodation; property, room, and meal details are confirmed with the selected departure.", highlights: ["Time to explore central Paris", "Flexible sightseeing plans", "Hotel details confirmed before booking"] },
  { slug: "bali-tropics", title: "Bali Tropics", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", days: "8 Days", price: "₦1,950,000", rating: 4.8, badge: "Adventure", description: "A tropical Bali itinerary with space to balance cultural visits, coastal scenery, and downtime between excursions.", accommodation: "Bali accommodation; property, room, and transfer details are confirmed before booking.", highlights: ["Time to discover Bali", "Optional cultural and outdoor activities", "Accommodation details confirmed with the selected departure"] },
];
