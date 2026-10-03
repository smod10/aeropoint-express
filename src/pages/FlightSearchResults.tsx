import React, { useState } from 'react';
import { Filter, ArrowRightLeft, Search, CheckCircle2, ChevronDown, X, Calendar, Phone, MessageCircle, Mail, Headset } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../components/flights/FlightCard';
import FlightsForm from '../components/BookingWidget/FlightsForm';
import FlightDetailsModal from '../components/FlightDetailsModal';
import { contactInfo } from '../data/contactInfo';

const FlightSearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchContext = (location.state as any) ?? {};

  const [priceRange, setPriceRange] = useState(2500000);
  const [activeTab, setActiveTab] = useState('cheapest');
  const tripType = searchContext.tripType ?? 'Return';
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);
  const [showDesktopModifyForm, setShowDesktopModifyForm] = useState(false);
  const [showFareCalendarModal, setShowFareCalendarModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  // Added state for swapping airports on the interactive header
  const [origin, setOrigin] = useState({ city: 'Lagos', code: 'LOS', name: 'Murtala Muhammed International' });
  const [destination, setDestination] = useState({ city: 'London', code: 'LHR', name: 'Heathrow Airport' });

  // State to manage open/closed status of each filter accordion
  // All closed by default except the first one (stops)
  const [openFilters, setOpenFilters] = useState({
    stops: true,
    price: false,
    departure: false,
    arrival: false,
    flexibility: false,
    airlines: false
  });

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const toggleFilter = (filterKey: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  const inferredDomestic =
    searchContext.isDomestic ?? (['LOS', 'ABV', 'KAN', 'PHC', 'ENU'].includes(origin.code) && ['LOS', 'ABV', 'KAN', 'PHC', 'ENU'].includes(destination.code));

  const bookingContext = {
    tripType,
    isDomestic: inferredDomestic,
    from: `${origin.city} (${origin.code})`,
    to: `${destination.city} (${destination.code})`,
    departDate: searchContext.departDate || '2026-11-24',
    returnDate: tripType === 'Return' ? (searchContext.returnDate || '2026-12-01') : '',
    travelClass: searchContext.travelClass || 'Economy',
    passengers: searchContext.passengers || { adults: 1, children: 0, infants: 0 },
  };

  const mockFlights = [
    { id: 1, airline: "Virgin Atlantic", flightNumber: "VS 412", departureTime: "10:30", arrivalTime: "17:15", departureAirport: "LOS", arrivalAirport: "LHR", duration: "6h 45m", stops: 0, price: "₦1,250,000", isCheapest: true },
    { id: 2, airline: "British Airways", flightNumber: "BA 075", departureTime: "22:55", arrivalTime: "05:30", departureAirport: "LOS", arrivalAirport: "LHR", duration: "6h 35m", stops: 0, price: "₦1,380,000" },
    { id: 3, airline: "Air France", flightNumber: "AF 114", departureTime: "08:15", arrivalTime: "18:40", departureAirport: "LOS", arrivalAirport: "LHR", duration: "10h 25m", stops: 1, price: "₦1,150,000", layovers: [{ airport: 'CDG', country: 'France', duration: '2h 10m' }] },
    { id: 4, airline: "Lufthansa", flightNumber: "LH 567", departureTime: "23:05", arrivalTime: "10:15", departureAirport: "LOS", arrivalAirport: "LHR", duration: "11h 10m", stops: 1, price: "₦1,100,000", layovers: [{ airport: 'FRA', country: 'Germany', duration: '2h 45m' }] },
  ];

  const dateCarousel = [
    { date: "Thu, 25 Jun", price: "₦1.4M", active: false },
    { date: "Fri, 26 Jun", price: "₦1.3M", active: false },
    { date: "Sat, 27 Jun", price: "₦1.2M", active: true },
    { date: "Sun, 28 Jun", price: "₦1.5M", active: false },
    { date: "Mon, 29 Jun", price: "₦1.2M", active: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Modification Header - Sits Under Navbar */}
      <div className="bg-blue-950 text-white pt-28 pb-6 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Desktop Header */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-left cursor-pointer hover:text-amber-500 transition-colors max-w-[220px]" onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)}>
              <div className="text-2xl font-black tracking-tight truncate" title={`${origin.city} (${origin.code})`}>{origin.city} ({origin.code})</div>
              <div className="text-xs text-blue-200 truncate" title={origin.name}>{origin.name}</div>
            </div>
            <button onClick={handleSwap} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-amber-500" />
            </button>
            <div className="text-left cursor-pointer hover:text-amber-500 transition-colors max-w-[220px]" onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)}>
              <div className="text-2xl font-black tracking-tight truncate" title={`${destination.city} (${destination.code})`}>{destination.city} ({destination.code})</div>
              <div className="text-xs text-blue-200 truncate" title={destination.name}>{destination.name}</div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-row items-center space-x-6 text-blue-100 text-sm font-medium">
            <button onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)} className="flex items-center bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-white font-bold mr-2">Dates:</span> 28 Jun - 15 Jul 2026
            </button>
            <button onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)} className="flex items-center bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-white font-bold mr-2">Pax:</span> 1 Adult, Economy
            </button>
          </div>
          
          <button onClick={() => setShowDesktopModifyForm(!showDesktopModifyForm)} className="hidden md:flex bg-amber-500 hover:bg-amber-400 text-blue-950 px-6 py-2.5 rounded-lg font-bold transition-colors shadow-lg items-center">
            <Search className="w-4 h-4 mr-2" /> Modify Search
          </button>

          {/* Mobile Search Header (Clean 2-Lines, Center Aligned) */}
          <div className="flex flex-col md:hidden gap-3 w-full items-center">
            {/* Line 1: Airports & Swap */}
            <div className="flex items-center justify-center text-white px-1 w-full gap-2">
              <button onClick={() => setShowMobileSearchModal(true)} className="font-bold text-lg tracking-wide hover:text-amber-500 transition-colors truncate flex-1 text-right" title={`${origin.city} (${origin.code})`}>
                {origin.city} ({origin.code})
              </button>
              <button onClick={handleSwap} className="p-2 shrink-0 bg-white/10 rounded-full hover:bg-white/20 transition-colors shadow-sm">
                <ArrowRightLeft className="w-4 h-4 text-amber-500" />
              </button>
              <button onClick={() => setShowMobileSearchModal(true)} className="font-bold text-lg tracking-wide hover:text-amber-500 transition-colors truncate flex-1 text-left" title={`${destination.city} (${destination.code})`}>
                {destination.city} ({destination.code})
              </button>
            </div>
            
            {/* Line 2: Dates, Pax, Button */}
            <div className="flex flex-row items-center justify-center gap-2 w-full max-w-sm">
              <button onClick={() => setShowMobileSearchModal(true)} className="flex-1 bg-white/10 px-3 py-2.5 rounded-lg border border-white/20 text-xs text-white text-center font-bold truncate transition-colors hover:bg-white/20">
                28 Jun - 15 Jul
              </button>
              <button onClick={() => setShowMobileSearchModal(true)} className="flex-1 bg-white/10 px-3 py-2.5 rounded-lg border border-white/20 text-xs text-white text-center font-bold truncate transition-colors hover:bg-white/20">
                1 Pax, Eco
              </button>
              <button onClick={() => setShowMobileSearchModal(true)} className="bg-amber-500 hover:bg-amber-400 text-blue-950 p-2.5 rounded-lg shrink-0 flex items-center justify-center shadow-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Inline Modify Search Expansion */}
      {showDesktopModifyForm && (
        <div className="hidden md:block bg-blue-900/5 border-b border-slate-200 w-full relative z-0 pb-6 shadow-inner animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <FlightsForm />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modify Search Modal */}
      {showMobileSearchModal && (
        <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center pt-20 bg-blue-950/80 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in max-h-[85vh] overflow-y-auto">
            <button onClick={() => setShowMobileSearchModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 z-10">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-blue-950 mb-6">Modify Search</h2>
            <FlightsForm />
          </div>
        </div>
      )}

      {/* Fare Calendar Modal */}
      {showFareCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pt-10 md:pt-0 bg-blue-950/80 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-4 md:p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowFareCalendarModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 z-10">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-blue-950 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-amber-500" /> Fare Calendar - June 2026
            </h2>
            
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
               {Array.from({length: 30}).map((_, i) => {
                  // Mock prices that loosely match the UI layout
                  const prices = [1.4, 1.3, 1.2, 1.5, 1.2, 1.1, 1.6, 1.4, 1.3, 1.2, 1.2, 1.1, 1.0, 1.4, 1.5, 1.3, 1.2, 1.1, 1.1, 1.3, 1.4, 1.5, 1.6, 1.2, 1.4, 1.3, 1.2, 1.5, 1.2, 1.1];
                  const price = prices[i];
                  const isCheapest = price <= 1.1;
                  return (
                    <div key={i} className={`p-1.5 md:p-3 rounded-lg border ${isCheapest ? 'bg-emerald-50 border-emerald-200' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'} flex flex-col items-center justify-center cursor-pointer transition-colors group`}>
                      <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-blue-900">{i + 1}</span>
                      <span className={`text-[8px] sm:text-[10px] font-semibold mt-0.5 md:mt-1 ${isCheapest ? 'text-emerald-600' : 'text-slate-500'}`}>
                        ₦{price}M
                      </span>
                    </div>
                  )
               })}
            </div>
          </div>
        </div>
      )}

      {/* Reduced vertical spacing globally on mobile using mt-4 and gap-4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
        
        {/* Sidebar Filters (30% Width) */}
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
                  <button 
                    className="text-xs md:text-sm text-blue-600 font-bold hover:underline"
                    onClick={(e) => { e.stopPropagation(); /* Logic to reset filters */ }}
                  >
                    Reset
                  </button>
                  <ChevronDown className={`w-5 h-5 text-slate-500 lg:hidden transform transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block pt-5 mt-5 border-t border-slate-100`}>
                
                {/* Stops Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('stops')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Stops</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.stops ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.stops && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Direct', '1 Stop', '2+ Stops'].map((stop, i) => (
                        <label key={i} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                            <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900">{stop}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('price')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Price (Max)</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.price ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.price && (
                    <div className="mt-4 animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">₦800k</span>
                        <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-1 rounded">₦{(priceRange / 1000000).toFixed(2)}M</span>
                      </div>
                      <input 
                        type="range" min="800000" max="3000000" step="50000"
                        value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Departure Time Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('departure')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Departure Time (LOS)</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.departure ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.departure && (
                    <div className="grid grid-cols-3 gap-2 mt-4 animate-fade-in">
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Morning</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">00:00 - 11:59</div>
                      </button>
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Afternoon</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">12:00 - 17:59</div>
                      </button>
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Evening</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">18:00 - 23:59</div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Arrival Time Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('arrival')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Arrival Time (LHR)</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.arrival ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.arrival && (
                    <div className="grid grid-cols-3 gap-2 mt-4 animate-fade-in">
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Morning</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">00:00 - 11:59</div>
                      </button>
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Afternoon</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">12:00 - 17:59</div>
                      </button>
                      <button className="border border-slate-200 rounded-lg py-2 px-1 flex flex-col items-center justify-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <div className="text-xs font-bold text-slate-600 truncate">Evening</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">18:00 - 23:59</div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Flexibility Accordion */}
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('flexibility')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Flexibility</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.flexibility ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.flexibility && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Refundable', 'Non-refundable'].map((flex, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{flex}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Airlines Accordion */}
                <div className="mb-2">
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => toggleFilter('airlines')}
                  >
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Airlines</h4>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFilters.airlines ? 'rotate-180' : ''}`} />
                  </div>
                  {openFilters.airlines && (
                    <div className="space-y-3 mt-4 animate-fade-in">
                      {['Virgin Atlantic', 'British Airways', 'Air France', 'Lufthansa'].map((airline, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                          <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{airline}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Need Help Flyer (Mobile) - Appears at the bottom of the filter content when expanded */}
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

            {/* Need Help Flyer (Desktop/Sidebar) - Stays permanently visible below filters on Desktop */}
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

        {/* Results Main Area (70% Width) */}
        <main className="w-full lg:flex-1">
          {/* Reduced margin bottom on mobile: mb-3 instead of mb-6 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden mb-3 lg:mb-6">
            <div className="flex-1 flex overflow-x-auto hide-scrollbar">
              {dateCarousel.map((item, idx) => (
                <button key={idx} className={`flex-1 min-w-[70px] md:min-w-[90px] flex flex-col items-center justify-center py-3 px-2 border-r border-slate-100 transition-colors ${item.active ? 'bg-blue-900 text-white shadow-inner' : 'hover:bg-slate-50'}`}>
                  <span className={`text-[10px] md:text-xs font-medium mb-1 ${item.active ? 'text-blue-100' : 'text-slate-500'}`}>{item.date}</span>
                  <span className={`text-xs md:text-sm font-black ${item.active ? 'text-white' : 'text-blue-900'}`}>{item.price}</span>
                </button>
              ))}
            </div>
            
            {/* Fare Calendar Button */}
            <button 
              onClick={() => setShowFareCalendarModal(true)}
              className="px-3 md:px-5 border-l border-slate-200 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center transition-colors shrink-0 group"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-900 mb-1 group-hover:text-amber-500 transition-colors" />
              <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-900 transition-colors leading-tight text-center">
                Fare Calendar
              </span>
            </button>
          </div>

          {/* Reduced margin bottom on mobile: mb-3 instead of mb-6 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex mb-3 lg:mb-6 p-1 relative">
            <div className="flex-1">
              <button onClick={() => setActiveTab('cheapest')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'cheapest' ? 'bg-amber-50 shadow-sm border border-amber-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'cheapest' ? 'text-amber-700' : 'text-slate-700'}`}>
                  {activeTab === 'cheapest' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Cheapest
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,100,000 • 11h 10m</div>
              </button>
            </div>
            <div className="flex-1">
              <button onClick={() => setActiveTab('fastest')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'fastest' ? 'bg-emerald-50 shadow-sm border border-emerald-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'fastest' ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {activeTab === 'fastest' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Fastest
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,380,000 • 6h 35m</div>
              </button>
            </div>
            <div className="flex-1">
              <button onClick={() => setActiveTab('best')} className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'best' ? 'bg-blue-50 shadow-sm border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`text-sm font-black flex items-center ${activeTab === 'best' ? 'text-blue-900' : 'text-slate-700'}`}>
                  {activeTab === 'best' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Best Value
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,250,000 • 6h 45m</div>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 pb-4 px-2">
            <h2 className="text-lg font-bold text-slate-700">Showing 14 results</h2>
          </div>

          <div className="space-y-5">
            {mockFlights.map(flight => (
              <FlightCard key={flight.id} {...flight} onBookNow={() => setSelectedFlight({ ...flight, ...bookingContext })} />
            ))}
          </div>
        </main>
      </div>

      <FlightDetailsModal 
        isOpen={!!selectedFlight} 
        onClose={() => setSelectedFlight(null)} 
        flight={selectedFlight} 
      />
    </div>
  );
};

export default FlightSearchResults;