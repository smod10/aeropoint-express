import React, { useState } from 'react';
import { Map, Calendar, ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PackagesForm: React.FC = () => {
  const navigate = useNavigate();
  const [pkgDate, setPkgDate] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Packages');
  const [destination, setDestination] = useState('');
  const today = new Date().toISOString().split('T')[0];

  // Christian Pilgrimage removed from the quick-select tabs
  const categories = ['All Packages', 'Umrah & Hajj', 'Vacations'];

  // Destinations still include Christian Pilgrimages under 'All Packages'
  const allDestinations = [
    // Umrah & Hajj
    { name: 'Mecca & Medina (Umrah)', type: 'Umrah & Hajj' },
    { name: 'Ramadan in Mecca (Last 10 Days)', type: 'Umrah & Hajj' },
    { name: 'Hajj Premium Package 2026', type: 'Umrah & Hajj' },
    { name: 'Jerusalem Islamic Tour (Al-Aqsa)', type: 'Umrah & Hajj' },
    { name: 'Family Umrah Plus Dubai', type: 'Umrah & Hajj' },
    { name: 'VIP Umrah Retreat', type: 'Umrah & Hajj' },
    
    // Christian Pilgrimage (Maintains its category metadata)
    { name: 'Footsteps of Christ (Jerusalem)', type: 'Christian Pilgrimage' },
    { name: 'Holy City Discovery (Nazareth)', type: 'Christian Pilgrimage' },
    { name: 'Easter in the Holy Land', type: 'Christian Pilgrimage' },

    // Vacations
    { name: 'Zanzibar Escape', type: 'Vacations' },
    { name: 'Maldives Overwater Retreat', type: 'Vacations' },
    { name: 'Dubai Luxury & Shopping', type: 'Vacations' },
    { name: 'Paris Romantic Getaway', type: 'Vacations' },
    { name: 'Bali Tropics & Culture', type: 'Vacations' },
    { name: 'Santorini Beach Villa', type: 'Vacations' },
    { name: 'Swiss Alps Ski Adventure', type: 'Vacations' },
    { name: 'Seychelles Island Hopping', type: 'Vacations' },
    { name: 'Phuket Wellness Retreat', type: 'Vacations' },
    { name: 'Cape Town Coastal Tour', type: 'Vacations' },
    { name: 'Tokyo City Break', type: 'Vacations' },
    { name: 'Bora Bora Luxury', type: 'Vacations' },
  ];

  // Filter destinations based on the active category
  const filteredDestinations = activeCategory === 'All Packages' 
    ? allDestinations 
    : allDestinations.filter(d => d.type === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setDestination(''); // Reset the dropdown to default when the category changes
  };

  const handleSearch = () => {
    navigate('/packages');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4 mb-2 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg shrink-0">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-1.5 rounded-md text-sm transition-all whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-white font-bold shadow-sm text-slate-800' 
                  : 'font-semibold text-slate-500 hover:text-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-[2] relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Map className="h-5 w-5 text-slate-400" />
          </div>
          <select 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-full pl-12 pr-10 pt-5 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
          >
            <option value="" disabled>Where do you want to go?</option>
            {filteredDestinations.map((dest, idx) => (
              <option key={idx} value={dest.name}>{dest.name}</option>
            ))}
          </select>
          <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Destination</span>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/20 group/date">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="w-full h-full pl-12 pr-4 pt-5 pb-1 font-bold flex items-center text-slate-800 relative z-10 pointer-events-none">
            {pkgDate ? pkgDate : <span className="text-slate-400 font-semibold">Select a date</span>}
          </div>
          <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Date</span>
          <input 
            type="date" min={today} value={pkgDate} onChange={(e) => setPkgDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
          />
        </div>

        <button 
          onClick={handleSearch}
          className="bg-[#FFA500] hover:bg-amber-500 text-slate-900 font-bold text-lg h-[60px] px-8 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0 w-full lg:w-auto"
        >
          <Search className="w-5 h-5 mr-2" /> Explore
        </button>
      </div>
    </div>
  );
};

export default PackagesForm;