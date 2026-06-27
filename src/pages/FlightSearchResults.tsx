import React, { useState } from 'react';
import { Filter, ArrowRightLeft, Search, CheckCircle2, ChevronDown, X } from 'lucide-react';
import FlightCard from '../components/flights/FlightCard';
import FlightsForm from '../components/BookingWidget/FlightsForm';

const FlightSearchResults: React.FC = () => {
  const [priceRange, setPriceRange] = useState(2500000);
  const [activeTab, setActiveTab] = useState('cheapest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showModifyForm, setShowModifyForm] = useState(false);

  const mockFlights = [
    { id: 1, airline: "Virgin Atlantic", flightNumber: "VS 412", departureTime: "10:30", arrivalTime: "17:15", departureAirport: "LOS", arrivalAirport: "LHR", duration: "6h 45m", stops: 0, price: "₦1,250,000", isCheapest: true },
    { id: 2, airline: "British Airways", flightNumber: "BA 075", departureTime: "22:55", arrivalTime: "05:30", departureAirport: "LOS", arrivalAirport: "LHR", duration: "6h 35m", stops: 0, price: "₦1,380,000" },
    { id: 3, airline: "Air France", flightNumber: "AF 114", departureTime: "08:15", arrivalTime: "18:40", departureAirport: "LOS", arrivalAirport: "LHR", duration: "10h 25m", stops: 1, price: "₦1,150,000" },
    { id: 4, airline: "Lufthansa", flightNumber: "LH 567", departureTime: "23:05", arrivalTime: "10:15", departureAirport: "LOS", arrivalAirport: "LHR", duration: "11h 10m", stops: 1, price: "₦1,100,000" },
  ];

  const dateCarousel = [
    { date: "Thu, 25 Jun", price: "₦1.4M" },
    { date: "Fri, 26 Jun", price: "₦1.3M" },
    { date: "Sat, 27 Jun", price: "₦1.2M", active: true },
    { date: "Sun, 28 Jun", price: "₦1.5M" },
    { date: "Mon, 29 Jun", price: "₦1.2M" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Modification Header - Sits Under Navbar */}
      <div className="bg-blue-950 text-white pt-28 pb-6 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-left">
              <div className="text-2xl font-black tracking-tight">Lagos (LOS)</div>
              <div className="text-xs text-blue-200">Murtala Muhammed</div>
            </div>
            <div className="bg-white/10 p-2 rounded-full"><ArrowRightLeft className="w-5 h-5 text-amber-500" /></div>
            <div className="text-left">
              <div className="text-2xl font-black tracking-tight">London (LHR)</div>
              <div className="text-xs text-blue-200">Heathrow Airport</div>
            </div>
          </div>

          {/* Search Overview & Triggers */}
          <div className="flex flex-row items-center w-full md:w-auto overflow-x-auto space-x-2 md:space-x-4 text-blue-100 text-xs md:text-sm font-medium hide-scrollbar">
            <div className="md:hidden flex items-center shrink-0 font-bold mr-2 text-white">
              LOS <ArrowRightLeft className="w-3 h-3 mx-1 text-amber-500" /> LHR
            </div>
            
            <button onClick={() => setShowModifyForm(true)} className="flex shrink-0 items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-white font-bold mr-1.5">Dates:</span> 28 Jun - 15 Jul
            </button>
            <button onClick={() => setShowModifyForm(true)} className="flex shrink-0 items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-white font-bold mr-1.5">Pax:</span> 1 Adult, Eco
            </button>
            <button onClick={() => setShowModifyForm(true)} className="shrink-0 bg-amber-500 hover:bg-amber-400 text-blue-950 px-4 py-2 rounded-lg font-bold transition-colors shadow-lg flex items-center">
              <Search className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Modify Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modify Search Modal */}
      {showModifyForm && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center pt-20 md:pt-0 bg-blue-950/80 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative animate-fade-in max-h-[80vh] overflow-y-auto">
            <button onClick={() => setShowModifyForm(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-blue-950 mb-6">Modify Search</h2>
            <FlightsForm />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters (30% Width) */}
        <aside className="w-full lg:w-[30%] shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
            
            {/* Filter Header & Mobile Toggle */}
            <div 
              className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4 cursor-pointer lg:cursor-default"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <h3 className="text-base md:text-lg font-black text-blue-950 flex items-center">
                <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-500" /> Filters
              </h3>
              <div className="flex items-center">
                <button 
                  className="text-xs md:text-sm text-blue-600 font-bold hover:underline mr-4"
                  onClick={(e) => { e.stopPropagation(); /* Logic to reset filters */ }}
                >
                  Reset All
                </button>
                <ChevronDown className={`w-5 h-5 text-slate-500 lg:hidden transform transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Filter Contents */}
            <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block pt-2`}>
              {/* Stops */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Stops</h4>
                <div className="space-y-3">
                  {['Direct (2)', '1 Stop (14)', '2+ Stops (5)'].map((stop, i) => (
                    <label key={i} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" defaultChecked={i===0} />
                        <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900">{stop}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-blue-900">From ₦1.2M</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Price (Max)</h4>
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

              {/* Departure Time */}
              <div className="mb-6 border-b border-slate-100 pb-6">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Departure Time (LOS)</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button className="border border-slate-200 rounded-lg p-2 text-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                    <div className="text-xs font-bold text-slate-600">Morning</div>
                  </button>
                  <button className="border border-blue-900 bg-blue-50 rounded-lg p-2 text-center transition-colors">
                    <div className="text-xs font-bold text-blue-900">Afternoon</div>
                  </button>
                  <button className="border border-slate-200 rounded-lg p-2 text-center hover:border-blue-900 hover:bg-blue-50 transition-colors">
                    <div className="text-xs font-bold text-slate-600">Evening</div>
                  </button>
                </div>
              </div>

              {/* Airlines */}
              <div className="mb-2">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Airlines</h4>
                <div className="space-y-3">
                  {['Virgin Atlantic', 'British Airways', 'Air France', 'Lufthansa'].map((airline, i) => (
                    <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" defaultChecked />
                      <span className="text-slate-600 text-sm font-semibold group-hover:text-blue-900 flex-1">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Main Area (70% Width) */}
        <main className="w-full lg:flex-1">
          
          {/* Date Matrix Carousel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden mb-6">
            {dateCarousel.map((item, idx) => (
              <button 
                key={idx} 
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 border-r border-slate-100 last:border-r-0 transition-colors ${item.active ? 'bg-blue-900 text-white shadow-inner' : 'hover:bg-slate-50'}`}
              >
                <span className={`text-xs font-medium mb-1 ${item.active ? 'text-blue-100' : 'text-slate-500'}`}>{item.date}</span>
                <span className={`font-black ${item.active ? 'text-white' : 'text-blue-900'}`}>{item.price}</span>
              </button>
            ))}
          </div>

          {/* Sorting Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex mb-6 p-1 relative">
            <div className="flex-1">
              <button 
                onClick={() => setActiveTab('cheapest')}
                className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'cheapest' ? 'bg-amber-50 shadow-sm border border-amber-200' : 'hover:bg-slate-50 border border-transparent'}`}
              >
                <div className={`text-sm font-black flex items-center ${activeTab === 'cheapest' ? 'text-amber-700' : 'text-slate-700'}`}>
                  {activeTab === 'cheapest' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Cheapest
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,100,000 • 11h 10m</div>
              </button>
            </div>
            <div className="flex-1">
              <button 
                onClick={() => setActiveTab('fastest')}
                className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'fastest' ? 'bg-emerald-50 shadow-sm border border-emerald-200' : 'hover:bg-slate-50 border border-transparent'}`}
              >
                <div className={`text-sm font-black flex items-center ${activeTab === 'fastest' ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {activeTab === 'fastest' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Fastest
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,380,000 • 6h 35m</div>
              </button>
            </div>
            <div className="flex-1">
              <button 
                onClick={() => setActiveTab('best')}
                className={`w-full py-3 px-4 rounded-lg flex flex-col items-center justify-center transition-all ${activeTab === 'best' ? 'bg-blue-50 shadow-sm border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}
              >
                <div className={`text-sm font-black flex items-center ${activeTab === 'best' ? 'text-blue-900' : 'text-slate-700'}`}>
                  {activeTab === 'best' && <CheckCircle2 className="w-4 h-4 mr-1.5" />} Best Value
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">₦1,250,000 • 6h 45m</div>
              </button>
            </div>
          </div>

          {/* Headline with 16px bottom padding (pb-4) */}
          <div className="flex justify-between items-center mb-4 pb-4 px-2">
            <h2 className="text-lg font-bold text-slate-700">Showing 14 results</h2>
          </div>

          {/* Render Flight Cards */}
          <div className="space-y-5">
            {mockFlights.map(flight => (
              <FlightCard key={flight.id} {...flight} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-3 px-8 rounded-xl transition-colors border border-blue-100">
              Load More Flights
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FlightSearchResults;

