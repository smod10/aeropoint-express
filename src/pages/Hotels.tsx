import React, { useState, useRef } from 'react';
import { ChevronDown, MapPin, Star, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Hotel } from 'lucide-react';
import HotelsForm from '../components/BookingWidget/HotelsForm';
import { imageFallbacks } from '../utils/imageFallbacks';
import { useNavigate } from 'react-router-dom';

const HotelFAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    { q: "What is the cancellation policy for a stay?", a: "Cancellation policies vary by property and room type. Most of our partners offer free cancellation up to 24 or 48 hours before check-in. You can view the specific policy on the checkout page before confirming." },
    { q: "Are taxes and fees included in the price?", a: "Yes, the total price shown on our checkout page includes all standard taxes and booking fees. Please note that some cities may charge a local 'city tax' directly at the property." },
    { q: "Can I request an early check-in or late check-out?", a: "Absolutely. You can add special requests during the checkout process. While we forward all requests to the property, they are subject to availability upon your arrival." },
    { q: "Do you offer 'Book Now, Pay Later' options?", a: "Many property partners offer 'Pay at Property' options. Look for that badge when selecting your room." }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
              <span className="font-bold text-slate-800">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 bg-slate-50">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Hotels: React.FC = () => {
  const navigate = useNavigate();
  const trendingHotels = [
    { name: 'The Ritz London', location: 'Mayfair, London', price: '₦850,000', rating: 5.0, reviews: 1240, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
    { name: 'Burj Al Arab', location: 'Dubai, UAE', price: '₦1,250,000', rating: 5.0, reviews: 3420, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
    { name: 'Four Seasons Paris', location: 'Paris, France', price: '₦950,000', rating: 4.9, reviews: 890, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
    { name: 'Waldorf Astoria Maldives', location: 'Male, Maldives', price: '₦1,450,000', rating: 5.0, reviews: 560, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
    { name: 'Marina Bay Sands', location: 'Singapore', price: '₦750,000', rating: 4.8, reviews: 4500, img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' },
    { name: 'The Plaza New York', location: 'Manhattan, New York', price: '₦1,100,000', rating: 4.7, reviews: 2100, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Page Header */}
      <div className="bg-blue-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d142104d?w=2000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Find Your Perfect Stay</h1>
          <p className="text-blue-200 text-lg">Compare stays at over 2 million properties, resorts, and villas worldwide.</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100">
           <HotelsForm />
        </div>
      </div>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-start space-x-4 shadow-sm">
            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-xl text-blue-900"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Price Match Guarantee</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Find a lower price online? We'll match it and refund the difference.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-start space-x-4 shadow-sm">
            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-xl text-blue-900"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Free Cancellation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Plans change. Look for rooms with free cancellation for ultimate flexibility.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-start space-x-4 shadow-sm">
            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-xl text-blue-900"><Hotel className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Over 2M+ Properties</h3>
              <p className="text-sm text-slate-500 leading-relaxed">From luxury 5-star resorts to budget-friendly city apartments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Hotels Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 overflow-hidden">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">Trending Luxury Stays</h2>
            <p className="text-slate-500">Highly-rated properties our travelers are loving right now.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {trendingHotels.map((hotel, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group overflow-hidden flex flex-col snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-1rem)]">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.hotel;
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm flex items-center">
                  <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" /> {hotel.rating}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-900 transition-colors truncate">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" /> {hotel.location}
                  </div>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-0.5">Per Night</span>
                    <span className="text-xl font-black text-blue-900">{hotel.price}</span>
                  </div>
                  <button
                    onClick={() => navigate('/hotels/search')}
                    className="bg-slate-50 text-blue-900 px-4 py-2 rounded-lg font-semibold text-sm group-hover:bg-blue-900 group-hover:text-white transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <HotelFAQs />
    </div>
  );
};

export default Hotels;