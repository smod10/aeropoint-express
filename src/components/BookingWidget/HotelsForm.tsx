import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelsForm: React.FC = () => {
  const navigate = useNavigate();
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const updateGuest = (type: 'rooms' | 'adults' | 'children', increment: boolean) => {
    setGuests(prev => {
      const newVal = prev[type] + (increment ? 1 : -1);
      if (newVal < 0) return prev;
      if (type === 'rooms' && newVal < 1) return prev; 
      if (type === 'adults' && newVal < 1) return prev; 
      return { ...prev, [type]: newVal };
    });
  };

  const handleSearch = () => {
    navigate('/hotels/search', { state: { checkInDate, checkOutDate } });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 mt-2">
        <div className="flex-[1.5] relative border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <input type="text" className="w-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold focus:outline-none rounded-xl placeholder-slate-400" placeholder="City, stay, or destination" />
          <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Destination</span>
        </div>

        <div className="flex flex-col md:flex-row flex-[1.35] border border-slate-200 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <div className="w-full pl-12 pr-3 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
              {checkInDate ? checkInDate : <span className="text-slate-400">Check-in</span>}
            </div>
            {checkInDate && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Check-in</span>}
            <input 
              type="date" min={today} value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
            />
          </div>
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <div className="w-full pl-12 pr-3 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
              {checkOutDate ? checkOutDate : <span className="text-slate-400">Check-out</span>}
            </div>
            {checkOutDate && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Check-out</span>}
            <input 
              type="date" min={checkInDate || today} value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
            />
          </div>
        </div>
        
        <div className={`flex-[0.9] min-w-0 relative border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20 ${showGuests ? 'z-40' : ''}`}>
          <div 
            onClick={() => setShowGuests(!showGuests)}
            className="w-full h-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold rounded-xl flex items-center cursor-pointer min-w-0"
            title={`${guests.adults + guests.children} Guest${guests.adults + guests.children > 1 ? 's' : ''}, ${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <span className="block min-w-0 truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm md:text-base">
              {guests.adults + guests.children} Guest{guests.adults + guests.children > 1 ? 's' : ''}, {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}
            </span>
            <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Guests & Rooms</span>
          </div>

          {showGuests && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowGuests(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-20 flex flex-col space-y-4">
                {[
                  { id: 'rooms', label: 'Rooms', desc: '' },
                  { id: 'adults', label: 'Adults', desc: '18+ years' },
                  { id: 'children', label: 'Children', desc: '0-17 years' },
                ].map((group) => (
                  <div key={group.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800">{group.label}</div>
                      {group.desc && <div className="text-xs text-slate-400">{group.desc}</div>}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateGuest(group.id as any, false)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-colors">-</button>
                      <span className="w-4 text-center font-semibold">{guests[group.id as keyof typeof guests]}</span>
                      <button onClick={() => updateGuest(group.id as any, true)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-colors">+</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setShowGuests(false)} className="w-full mt-2 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-sm hover:bg-amber-600">Done</button>
              </div>
            </>
          )}
        </div>

        <button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg py-4 md:py-5 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20">
          <Search className="w-5 h-5 mr-2" /> Search
        </button>
      </div>
    </div>
  );
};

export default HotelsForm;
