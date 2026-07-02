import React, { useMemo, useState } from 'react';
import { Users, MapPin, FileText, ChevronDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { countryNames } from '../../data/countries';
import { getVisaCountryByCode, visaCountryOptions } from '../../data/visaData';

const VisasForm: React.FC = () => {
  const navigate = useNavigate();
  const [nationality, setNationality] = useState('Nigeria');
  const [destinationCode, setDestinationCode] = useState(visaCountryOptions[0].code);

  const visaTypes = useMemo(() => {
    const destination = getVisaCountryByCode(destinationCode);
    return destination?.visaTypes ?? ['Tourist Visa'];
  }, [destinationCode]);

  const [visaType, setVisaType] = useState(visaTypes[0]);

  const handleDestinationChange = (newCode: string) => {
    setDestinationCode(newCode);
    const destination = getVisaCountryByCode(newCode);
    setVisaType(destination?.visaTypes[0] ?? 'Tourist Visa');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    navigate('/visas/apply', {
      state: {
        nationality,
        destinationCode,
        visaType,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Users className="h-5 w-5 text-slate-400" />
          </div>
          <select
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
            className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
          >
            {countryNames.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Nationality</span>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <select
            value={destinationCode}
            onChange={(event) => handleDestinationChange(event.target.value)}
            className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
          >
            {visaCountryOptions.map((destination) => (
              <option key={destination.code} value={destination.code}>
                {destination.country}
              </option>
            ))}
          </select>
          <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Destination</span>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          <select
            value={visaType}
            onChange={(event) => setVisaType(event.target.value)}
            className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
          >
            {visaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Visa Type</span>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-lg h-[60px] px-8 rounded-xl flex items-center justify-center transition-all shadow-md shrink-0 w-full lg:w-auto">
          Start <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  );
};

export default VisasForm;
