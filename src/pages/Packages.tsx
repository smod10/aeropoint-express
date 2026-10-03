import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Filter, ChevronDown, Headset, Phone, MessageCircle, Mail } from 'lucide-react';
import PackagesForm from '../components/BookingWidget/PackagesForm';
import { imageFallbacks } from '../utils/imageFallbacks';
import { contactInfo } from '../data/contactInfo';

const Packages: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000000);

  // Filter States
  const [openFilters, setOpenFilters] = useState({
    categories: true,
    duration: true,
    price: false
  });

  const toggleFilter = (filterKey: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  // Comprehensive mock data for the packages page
  const holidayPackages = [
    { title: "Zanzibar White Sands", location: "Zanzibar, Tanzania", image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80", days: "7 Days", price: "₦1,850,000", rating: 4.8, badge: "Vacations" },
    { title: "Premium Umrah Package", location: "Mecca & Medina, KSA", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80", days: "10 Days", price: "₦2,850,000", rating: 4.9, badge: "Umrah & Hajj" },
    { title: "Footsteps of Christ", location: "Jerusalem, Israel", image: "https://images.unsplash.com/photo-1549880181-59a4413fad88?w=800&q=80", days: "10 Days", price: "₦3,100,000", rating: 4.9, badge: "Christian Pilgrimage" },
    { title: "Holy City Discovery", location: "Nazareth & Jerusalem", image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=800&q=80", days: "7 Days", price: "₦2,200,000", rating: 4.7, badge: "Christian Pilgrimage" },
    { title: "Maldives Overwater Retreat", location: "Male, Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", days: "5 Days", price: "₦3,600,000", rating: 5.0, badge: "Vacations" },
    { title: "Dubai Luxury Escape", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", days: "6 Days", price: "₦1,450,000", rating: 4.7, badge: "Vacations" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Page Header */}
      <div className="bg-blue-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Extraordinary Holidays</h1>
          <p className="text-blue-200 text-lg">Curated travel experiences combining flights, luxury stays, and unforgettable tours.</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100">
           <PackagesForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:mt-12 flex flex-col lg:flex-row gap-4 lg:gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[25%] shrink-0">
          <div className="sticky top-24 space-y-4 lg:space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-6 shadow-sm">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <h3 className="text-base md:text-lg font-black text-blue-950 flex items-center m-0 leading-none">
                  <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-500" /> Filters
                </h3>
                <div className="flex items-center gap-4">
                  <button className="text-xs md:text-sm text-blue-600 font-bold hover:underline" onClick={(e) => { e.stopPropagation(); }}>Reset</button>
                  <ChevronDown className={`w-5 h-5 text-slate-500 lg:hidden transform transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block pt-5 mt-5 border-t border-slate-100`}>
                
                {/* Destination Type */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('categories')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Categories</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.categories ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.categories && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Vacations', 'Hajj & Umrah', 'Christian Pilgrimage', 'Beach & Tropics', 'City Breaks'].map((type, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('duration')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Duration</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.duration ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.duration && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['1-3 Days', '4-7 Days', '8-14 Days', '15+ Days'].map((duration, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{duration}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('price')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Price (Max)</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.price ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.price && (
                    <div className="mt-4 animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">₦200k</span>
                        <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-1 rounded">₦{(priceRange / 1000000).toFixed(2)}M</span>
                      </div>
                      <input 
                        type="range" min="200000" max="10000000" step="100000"
                        value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Need Help Flyer (Mobile) */}
                <div className="lg:hidden mt-8 bg-blue-900 rounded-2xl p-5 text-white shadow-sm border border-blue-800 animate-fade-in">
                  <h4 className="font-black text-lg mb-3 flex items-center">
                    <Headset className="w-5 h-5 mr-2 text-amber-500" /> Need Help?
                  </h4>
                  <p className="text-xs text-blue-200 mb-5 leading-relaxed">Our travel experts are available 24/7 to assist you with your booking.</p>
                  <div className="space-y-3 text-sm font-medium">
                    <a href={contactInfo.phoneHref} className="flex items-center hover:text-amber-500 transition-colors">
                      <Phone className="w-4 h-4 mr-3 text-amber-500" /> {contactInfo.phone}
                    </a>
                    <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center hover:text-amber-500 transition-colors">
                      <MessageCircle className="w-4 h-4 mr-3 text-amber-500" /> WhatsApp Us
                    </a>
                    <a href={contactInfo.emailHref} className="flex items-center hover:text-amber-500 transition-colors">
                      <Mail className="w-4 h-4 mr-3 text-amber-500" /> {contactInfo.email}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Need Help Flyer (Desktop/Sidebar) */}
            <div className="hidden lg:block mt-6 bg-blue-900 rounded-2xl p-6 text-white shadow-sm border border-blue-800">
              <h4 className="font-black text-lg mb-4 flex items-center">
                <Headset className="w-5 h-5 mr-2 text-amber-500" /> Need Help?
              </h4>
              <p className="text-sm text-blue-200 mb-6">Our travel experts are available 24/7 to assist you with your booking.</p>
              <div className="space-y-4 text-sm font-medium">
                <a href={contactInfo.phoneHref} className="flex items-center hover:text-amber-500 transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-amber-500" /> {contactInfo.phone}
                </a>
                <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center hover:text-amber-500 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-3 text-amber-500" /> WhatsApp Us
                </a>
                <a href={contactInfo.emailHref} className="flex items-center hover:text-amber-500 transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-amber-500" /> {contactInfo.email}
                </a>
              </div>
              <button onClick={() => navigate('/contact')} className="mt-6 w-full py-3 bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold rounded-xl transition-colors text-sm shadow-sm flex items-center justify-center">
                Contact Us
              </button>
            </div>

          </div>
        </aside>

        {/* Results Main Area */}
        <main className="w-full lg:flex-1">
          <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-1">Featured Packages</h2>
              <p className="text-sm md:text-base text-slate-500">Discover all-inclusive deals for your next adventure.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {holidayPackages.map((pkg, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/packages/details')}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer flex flex-col h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    onError={(event) => {
                      event.currentTarget.src = imageFallbacks.package;
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">{pkg.badge}</div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold leading-tight shadow-sm">{pkg.title}</h3>
                    <div className="flex items-center text-sm font-medium mt-1 text-blue-100">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> {pkg.location}
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-900" /> {pkg.days}
                    </div>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs font-bold text-blue-900">
                      <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" /> {pkg.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">Includes round-trip flights, luxury accommodation, daily breakfast, and guided tours.</p>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Per Person from</span>
                      <span className="text-xl font-black text-blue-900">{pkg.price}</span>
                    </div>
                    <button onClick={() => navigate('/packages/details')} className="bg-amber-500 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-amber-600 transition-colors shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Packages;