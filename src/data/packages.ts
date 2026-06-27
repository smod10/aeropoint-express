export interface Package {
  title: string;
  location: string;
  image: string;
  days: string;
  price: string;
  rating: number;
  badge: string;
}

export const trendingPackages: Package[] = [
  { title: "Premium Umrah Package", location: "Mecca & Medina, KSA", image: "[https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80)", days: "10 Days", price: "₦2,850,000", rating: 4.9, badge: "Best Seller" },
  { title: "Zanzibar White Sands", location: "Zanzibar, Tanzania", image: "[https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80](https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80)", days: "7 Days", price: "₦1,850,000", rating: 4.8, badge: "Honeymoon" },
  { title: "Maldives Overwater Retreat", location: "Male, Maldives", image: "[https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80](https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80)", days: "5 Days", price: "₦3,600,000", rating: 5.0, badge: "Luxury" },
  { title: "Dubai Luxury Escape", location: "Dubai, UAE", image: "[https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80](https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80)", days: "6 Days", price: "₦1,450,000", rating: 4.7, badge: "City Break" },
  { title: "Paris Romantic Getaway", location: "Paris, France", image: "[https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80](https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80)", days: "5 Days", price: "₦2,100,000", rating: 4.9, badge: "Couples" },
  { title: "Bali Tropics", location: "Bali, Indonesia", image: "[https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80](https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80)", days: "8 Days", price: "₦1,950,000", rating: 4.8, badge: "Adventure" },
];
