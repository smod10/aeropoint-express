import React, { useState } from 'react';
import { Map, Calendar, ChevronDown, Search } from 'lucide-react';

const PackagesForm: React.FC = () => {
  const [pkgDate, setPkgDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
          <button className="bg-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-sm text-slate-800">All Packages</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-800">Umrah & Hajj</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-800">Honeymoon</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-[2] relative border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Map className="h-5 w-5 text-slate-400" />
          </div>
          <select className="w-full pl-12 pr-10 py-4 md:py-5 bg-white text-slate-800 font-semibold focus:outline-none rounded-xl appearance-none cursor-pointer">
            <option value="" disabled>Where do you want to go?</option>
            <option>Mecca & Medina (Umrah)</option>
            <option>Zanzibar Escape</option>
            <option>Maldives Retreat</option>
            <option>Dubai Luxury</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="flex-1 relative border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="w-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full rounded-xl">
            {pkgDate ? pkgDate : <span className="text-slate-400">Departure Date</span>}
          </div>
          {pkgDate && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Date</span>}
          <input 
            type="date" min={today} value={pkgDate} onChange={(e) => setPkgDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
          />
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg py-4 md:py-5 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20">
          <Search className="w-5 h-5 mr-2" /> Explore
        </button>
      </div>
    </div>
  );
};

export default PackagesForm;