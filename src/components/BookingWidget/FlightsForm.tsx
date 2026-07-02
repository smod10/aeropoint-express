import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, ChevronDown, Search, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AirportInput from './AirportInput.tsx';

const FlightsForm: React.FC = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('Return');
  const [multiFlights, setMultiFlights] = useState([{ id: 1, from: '', to: '', date: '' }, { id: 2, from: '', to: '', date: '' }]);
  
  const [showPassengers, setShowPassengers] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState('Economy');
  
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const getAirportCode = (location: string) => {
    const match = location.match(/\(([A-Z]{3})\)/);
    return match?.[1] ?? '';
  };

  const localAirportCodes = ['LOS', 'ABV', 'KAN', 'PHC', 'ENU', 'IBA', 'QRW', 'ILR', 'SKO', 'MIU'];

  const isDomesticRoute = (from: string, to: string) => {
    const fromCode = getAirportCode(from);
    const toCode = getAirportCode(to);
    return Boolean(fromCode && toCode && localAirportCodes.includes(fromCode) && localAirportCodes.includes(toCode));
  };

  const handleSearch = () => {
    if (tripType === 'Multi-city') {
      navigate('/flights/search', {
        state: {
          tripType,
          multiFlights,
          travelClass,
          passengers,
        },
      });
      return;
    }

    navigate('/flights/search', {
      state: {
        tripType,
        fromLocation,
        toLocation,
        departDate,
        returnDate: tripType === 'Return' ? returnDate : '',
        travelClass,
        passengers,
        isDomestic: isDomesticRoute(fromLocation, toLocation),
      },
    });
  };

  const addFlight = () => setMultiFlights([...multiFlights, { id: Date.now(), from: '', to: '', date: '' }]);
  const removeFlight = (id: number) => setMultiFlights(multiFlights.filter(f => f.id !== id));

  const updatePassenger = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    setPassengers(prev => {
      const newVal = prev[type] + (increment ? 1 : -1);
      if (newVal < 0) return prev;
      if (type === 'adults' && newVal < 1) return prev; 
      if (type === 'infants' && newVal > prev.adults) return prev; 
      return { ...prev, [type]: newVal };
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg w-max">
          {['Return', 'One-way', 'Multi-city'].map((type) => (
            <button 
              key={type}
              onClick={() => setTripType(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                tripType === type 
                  ? 'bg-white shadow-sm text-slate-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        {/* Passenger Dropdown Toggle */}
        <div className="relative z-40">
          <div 
            onClick={() => setShowPassengers(!showPassengers)}
            className="flex items-center space-x-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
          >
            <Users className="w-4 h-4" /> 
            <span>{totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}, {travelClass}</span> 
            <ChevronDown className="w-4 h-4" />
          </div>

          {showPassengers && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowPassengers(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-20 flex flex-col space-y-4">
                {[
                  { id: 'adults', label: 'Adults', desc: '12+ years' },
                  { id: 'children', label: 'Children', desc: '2-11 years' },
                  { id: 'infants', label: 'Infants', desc: 'Under 2 years' },
                ].map((group) => (
                  <div key={group.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800">{group.label}</div>
                      <div className="text-xs text-slate-400">{group.desc}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updatePassenger(group.id as any, false)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-colors">-</button>
                      <span className="w-4 text-center font-semibold">{passengers[group.id as keyof typeof passengers]}</span>
                      <button onClick={() => updatePassenger(group.id as any, true)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-colors">+</button>
                    </div>
                  </div>
                ))}
                <hr className="border-slate-100" />
                <div>
                  <div className="font-semibold text-slate-800 mb-2">Travel Class</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Economy', 'Premium', 'Business', 'First'].map((c) => (
                      <button 
                        key={c}
                        onClick={() => setTravelClass(c)}
                        className={`py-1.5 text-sm rounded-md font-medium transition-colors ${
                          travelClass === c ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowPassengers(false)} className="w-full mt-2 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-sm hover:bg-amber-600">Done</button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {tripType !== 'Multi-city' ? (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className={`flex flex-col md:flex-row ${tripType === 'One-way' ? 'flex-[2]' : 'flex-1'} bg-white border border-slate-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-slate-200 focus-within:ring-2 focus-within:ring-blue-900/20`}>
            <AirportInput icon={Plane} placeholder="Leaving from..." label="From" value={fromLocation} onChange={setFromLocation} />
            <AirportInput icon={MapPin} placeholder="Going to..." label="To" value={toLocation} onChange={setToLocation} />
          </div>

          <div className="flex flex-col md:flex-row flex-1 border border-slate-200 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 focus-within:ring-2 focus-within:ring-blue-900/20">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
              <div className="w-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full">
                {departDate ? departDate : <span className="text-slate-400">Departure</span>}
              </div>
              {departDate && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Depart</span>}
              <input 
                type="date" min={today} value={departDate} onChange={(e) => setDepartDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
              />
            </div>
            {tripType === 'Return' && (
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <div className="w-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full">
                  {returnDate ? returnDate : <span className="text-slate-400">Return</span>}
                </div>
                {returnDate && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Return</span>}
                <input 
                  type="date" min={departDate || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                />
              </div>
            )}
          </div>
          <button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg py-4 md:py-5 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 lg:w-auto w-full">
            <Search className="w-5 h-5 mr-2" /> Search
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {multiFlights.map((flight, index) => (
            <div key={flight.id} className="flex flex-col lg:flex-row gap-4 relative group">
              <div className="flex flex-col md:flex-row flex-[3] bg-white border border-slate-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-slate-200 focus-within:ring-2 focus-within:ring-blue-900/20">
                <AirportInput 
                  icon={Plane} placeholder="Leaving from..." label={`Flight ${index + 1} From`} value={flight.from || ''} 
                  onChange={(val: string) => { const updated = [...multiFlights]; updated[index].from = val; setMultiFlights(updated); }} 
                />
                <AirportInput 
                  icon={MapPin} placeholder="Going to..." label="To" value={flight.to || ''} 
                  onChange={(val: string) => { const updated = [...multiFlights]; updated[index].to = val; setMultiFlights(updated); }} 
                />
              </div>
              <div className="flex flex-col md:flex-row flex-[1.5] gap-4">
                <div className="flex-1 relative border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/20 group/date">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="w-full pl-12 pr-4 py-4 md:py-5 bg-white text-slate-800 font-semibold flex items-center h-full">
                    {flight.date ? flight.date : <span className="text-slate-400">Departure</span>}
                  </div>
                  {flight.date && <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Depart</span>}
                  <input 
                    type="date" min={index === 0 ? today : multiFlights[index-1]?.date || today} value={flight.date || ''} 
                    onChange={(e) => { const updated = [...multiFlights]; updated[index].date = e.target.value; setMultiFlights(updated); }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                  />
                </div>
                {multiFlights.length > 2 && (
                  <button onClick={() => removeFlight(flight.id)} className="p-4 md:py-5 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-xl transition-colors flex items-center justify-center border border-red-100" title="Remove flight">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <button onClick={addFlight} className="flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-5 py-3 rounded-xl w-full sm:w-auto justify-center">
              <Plus className="w-5 h-5 mr-2" /> Add another flight
            </button>
            <button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg py-3 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 w-full sm:w-auto">
              <Search className="w-5 h-5 mr-2" /> Search Flights
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsForm;