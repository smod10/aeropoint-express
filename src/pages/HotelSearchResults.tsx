import React, { useState } from 'react';
import { Filter, Search, ChevronDown, X, MapPin, Star } from 'lucide-react';
import HotelCard from '../components/hotels/HotelCard';
import HotelsForm from '../components/BookingWidget/HotelsForm';

const HotelSearchResults: React.FC = () => {
  const [priceRange, setPriceRange] = useState(2500000);
  const [activeTab, setActiveTab] = useState('recommended');
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);
  const [showDesktopModifyForm, setShowDesktopModifyForm] = useState(false);

  // Filter States
  const [openFilters, setOpenFilters] = useState({
    price: true,
    starRating: true,
    propertyType: false,
    amenities: false
  });

  const toggleFilter = (filterKey: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  const mockHotels = [
    { id: 1, name: "The Ritz London", location: "Mayfair, London", distance: "0.5 miles to center", rating: 4.8, reviews: 1240, stars: 5, pricePerNight: "₦850,000", totalPrice: "₦4,250,000", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", amenities: ['Free Wi-Fi', 'Breakfast Included', 'Spa', 'Gym'], isTopPick: true },
    { id: 2, name: "Hilton London Metropole", location: "Paddington, London", distance: "1.2 miles to center", rating: 4.2, reviews: 856, stars: 4, pricePerNight: "₦350,000", totalPrice: "₦1,750,000", image: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?w=800&q=80", amenities: ['Free Wi-Fi', 'Pool', 'Restaurant'] },
    { id: 3, name: "The Savoy", location: "Strand, London", distance: "0.2 miles to center", rating: 4.9, reviews: 2100, stars: 5, pricePerNight: "₦1,100,000", totalPrice: "₦5,500,000", image: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?w=800&q=80", amenities: ['Free Wi-Fi', 'River View', 'Spa', 'Bar'] },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Modification Header */}
      <div className="bg-blue-950 text-white pt-28 pb-6 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Desktop Header */}
          <div className="hidden md:flex items-center space-x-4 cursor-pointer hover:text-amber-500 transition-colors" onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)}>
            <div className="p-3 bg-white/10 rounded-xl"><MapPin className="w-6 h-6 text-amber-500" /></div>
            <div>
              <div className="text-2xl font-black tracking-tight">London, United Kingdom</div>
              <div className="text-xs text-blue-200">28 Jun - 03 Jul 2026 • 2 Guests, 1 Room</div>
            </div>
          </div>
          
          <button onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)} className="hidden md:flex bg-[#FFA500] hover:bg-amber-400 text-blue-950 px-6 py-2.5 rounded-lg font-bold transition-colors shadow-lg items-center">
            <Search className="w-4 h-4 mr-2" /> Modify Search
          </button>

          {/* Mobile Search Header */}
          <div className="flex flex-col md:hidden gap-3 w-full items-center">
            <button onClick={() => setShowMobileSearchModal(true)} className="font-bold text-xl tracking-wide hover:text-amber-500 transition-colors truncate w-full text-center">
              London, UK
            </button>
            
            <div className="flex flex-row items-center justify-center gap-2 w-full max-w-sm">
              <button onClick={() => setShowMobileSearchModal(true)} className="flex-1 bg-white/10 px-3 py-2.5 rounded-lg border border-white/20 text-xs text-white text-center font-bold truncate transition-colors hover:bg-white/20">
                28 Jun - 03 Jul
              </button>
              <button onClick={() => setShowMobileSearchModal(true)} className="flex-1 bg-white/10 px-3 py-2.5 rounded-lg border border-white/20 text-xs text-white text-center font-bold truncate transition-colors hover:bg-white/20">
                2 Guests, 1 Rm
              </button>
              <button onClick={() => setShowMobileSearchModal(true)} className="bg-[#FFA500] hover:bg-amber-400 text-blue-950 p-2.5 rounded-lg shrink-0 flex items-center justify-center shadow-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Modify Form Expansion */}
      {showDesktopModifyForm && (
        <div className="hidden md:block bg-blue-900/5 border-b border-slate-200 w-full relative z-0 pb-6 shadow-inner animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <HotelsForm />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modify Form Modal */}
      {showMobileSearchModal && (
        <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center pt-20 bg-blue-950/80 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in max-h-[85vh] overflow-y-auto">
            <button onClick={() => setShowMobileSearchModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 z-10">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-blue-950 mb-6">Modify Search</h2>
            <HotelsForm />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[30%] shrink-0">
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
                  <button className="text-xs md:text-sm text-blue-600 font-bold hover:underline" onClick={(e) => e.stopPropagation()}>Reset</button>
                  <ChevronDown className={`w-5 h-5 text-slate-500 lg:hidden transform transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block pt-5 mt-5 border-t border-slate-100`}>
                
                {/* Price Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('price')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Price (Per Night)</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.price ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.price && (
                    <div className="mt-4 animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">₦50k</span>
                        <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-1 rounded">₦{(priceRange / 1000000).toFixed(2)}M</span>
                      </div>
                      <input 
                        type="range" min="50000" max="3000000" step="10000"
                        value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Star Rating */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('starRating')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Star Rating</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.starRating ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.starRating && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {[5, 4, 3].map((stars) => (
                        <label key={stars} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                            <span className="text-slate-600 text-sm font-semibold flex items-center">
                              {stars} <Star className="w-3.5 h-3.5 ml-1 text-amber-500 fill-amber-500" />
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('propertyType')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Property Type</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.propertyType ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.propertyType && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Hotel', 'Resort', 'Apartment', 'Villa'].map((type, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="mb-2">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleFilter('amenities')}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Amenities</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.amenities ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.amenities && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Breakfast Included', 'Gym'].map((item, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </aside>

        {/* Results Main Area */}
        <main className="w-full lg:flex-1">
          {/* Sorting Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex mb-4 lg:mb-6 p-1 relative">
            <div className="flex-1">
              <button onClick={() => setActiveTab('recommended')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'recommended' ? 'bg-amber-50 shadow-sm border border-amber-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'recommended' ? 'text-amber-700' : 'text-slate-700'}`}>Our Top Picks</div>
              </button>
            </div>
            <div className="flex-1">
              <button onClick={() => setActiveTab('lowest')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'lowest' ? 'bg-blue-50 shadow-sm border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'lowest' ? 'text-blue-900' : 'text-slate-700'}`}>Lowest Price</div>
              </button>
            </div>
            <div className="flex-1">
              <button onClick={() => setActiveTab('rating')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'rating' ? 'bg-emerald-50 shadow-sm border border-emerald-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'rating' ? 'text-emerald-700' : 'text-slate-700'}`}>Top Rated</div>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 pb-4 px-2">
            <h2 className="text-lg font-bold text-slate-700">London: 320 properties found</h2>
          </div>

          {/* Render Hotel Cards */}
          <div>
            {mockHotels.map(hotel => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-3 px-8 rounded-xl transition-colors border border-blue-100">
              Load More Hotels
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HotelSearchResults;