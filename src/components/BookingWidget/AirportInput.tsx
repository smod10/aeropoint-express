import React, { useState, useEffect, useRef } from 'react';

const AIRPORTS = [
  { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'United Kingdom' },
  { code: 'LGW', city: 'London', name: 'Gatwick Airport', country: 'United Kingdom' },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy Intl', country: 'United States' },
  { code: 'EWR', city: 'Newark', name: 'Newark Liberty Intl', country: 'United States' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles Intl', country: 'United States' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE' },
  { code: 'AUH', city: 'Abu Dhabi', name: 'Zayed Intl', country: 'UAE' },
  { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz Intl', country: 'Saudi Arabia' },
  { code: 'MED', city: 'Medina', name: 'Prince Mohammad Bin Abdulaziz', country: 'Saudi Arabia' },
  { code: 'ZNZ', city: 'Zanzibar', name: 'Abeid Amani Karume Intl', country: 'Tanzania' },
  { code: 'MLE', city: 'Male', name: 'Velana International Airport', country: 'Maldives' },
  { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed Intl', country: 'Nigeria' },
  { code: 'ABV', city: 'Abuja', name: 'Nnamdi Azikiwe Intl', country: 'Nigeria' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport', country: 'France' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany' },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore' },
  { code: 'HND', city: 'Tokyo', name: 'Haneda Airport', country: 'Japan' },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Airport', country: 'Australia' },
  { code: 'YYZ', city: 'Toronto', name: 'Pearson Intl', country: 'Canada' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey' },
];

interface AirportInputProps {
  icon: React.ElementType;
  placeholder: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const AirportInput: React.FC<AirportInputProps> = ({ icon: Icon, placeholder, label, value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [results, setResults] = useState<typeof AIRPORTS>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2) {
      setResults([]);
      return;
    }
    if (searchTerm === value) return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = AIRPORTS.filter(a =>
        a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, value]);

  const handleSelect = (airport: any) => {
    const displayValue = `${airport.city} (${airport.code})`;
    setSearchTerm(displayValue); 
    onChange(displayValue);      
    setShowDropdown(false);      
  };

  return (
    <div className="flex-1 relative" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Icon className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-4 py-4 md:py-5 bg-transparent text-slate-800 font-semibold focus:outline-none placeholder-slate-400 relative z-20"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
          onChange(''); 
        }}
        onFocus={() => {
          if (searchTerm.length >= 2) setShowDropdown(true);
        }}
      />
      <span className="absolute top-1 left-12 text-[10px] text-slate-400 font-medium uppercase tracking-wider z-10">{label}</span>

      {showDropdown && searchTerm.length >= 2 && (
        <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-100 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500 font-medium flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-amber-500 rounded-full animate-spin"></div>
              <span>Searching airports...</span>
            </div>
          ) : results.length > 0 ? (
            results.map(airport => (
              <div
                key={airport.code}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-slate-100 last:border-0 transition-colors"
                onClick={() => handleSelect(airport)}
              >
                <div>
                  <div className="font-semibold text-slate-800">{airport.city}</div>
                  <div className="text-xs text-slate-500">{airport.name}, {airport.country}</div>
                </div>
                <div className="text-blue-900 font-bold bg-blue-100 px-2 py-1 rounded text-xs tracking-wider">
                  {airport.code}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-sm text-slate-500">
              No airports found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportInput;