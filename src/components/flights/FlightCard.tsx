import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Luggage, ChevronDown, Clock, ShieldAlert } from 'lucide-react';

interface Layover {
  airport: string;
  duration: string;
}

interface FlightCardProps {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  price: string;
  isCheapest?: boolean;
  layovers?: Layover[];
}

const FlightCard: React.FC<FlightCardProps> = ({ 
  airline, flightNumber, departureTime, arrivalTime, 
  departureAirport, arrivalAirport, duration, stops, price, isCheapest, layovers 
}) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  // Generate fallback layovers if stops exist but layovers array is not provided
  const displayLayovers = layovers || Array.from({ length: stops }).map((_, i) => ({
    airport: ['Paris (CDG)', 'Frankfurt (FRA)', 'Amsterdam (AMS)'][i % 3],
    duration: ['2h 15m', '1h 45m', '3h 30m'][i % 3]
  }));

  return (
    <div className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow mb-4 overflow-hidden ${isCheapest ? 'border-amber-400' : 'border-slate-200'}`}>
      
      {isCheapest && (
        <div className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 uppercase tracking-wide">
          Cheapest Flight
        </div>
      )}

      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Airline Info */}
          <div className="flex items-center w-full md:w-1/4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 font-black mr-4 shrink-0 shadow-sm border border-blue-100">
              {airline.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{airline}</h4>
              <p className="text-xs text-slate-500 font-medium">{flightNumber}</p>
            </div>
          </div>

          {/* Timeline & Segments */}
          <div className="flex items-center justify-between w-full md:w-2/4 px-2 md:px-6">
            <div className="text-right">
              <div className="text-2xl font-black text-slate-800">{departureTime}</div>
              <div className="text-sm font-bold text-slate-500">{departureAirport}</div>
            </div>

            <div className="flex-1 px-4 flex flex-col items-center relative">
              <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {duration}
              </div>
              <div className="w-full flex items-center justify-center relative my-2">
                <div className="w-full h-0.5 bg-slate-200"></div>
                <Plane className="w-5 h-5 text-blue-900 absolute bg-white px-0.5 transform rotate-90" />
                {stops > 0 && (
                  <div className="absolute w-2 h-2 rounded-full bg-amber-500 ml-12 border border-white"></div>
                )}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${stops === 0 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                {stops === 0 ? 'Direct' : `${stops} Stop${stops > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="text-left">
              <div className="text-2xl font-black text-slate-800">{arrivalTime}</div>
              <div className="text-sm font-bold text-slate-500">{arrivalAirport}</div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="w-full md:w-1/4 flex flex-col border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
            
            {/* Wrapper forces Row on Mobile, Column on Desktop */}
            <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full mb-4 md:mb-3">
              
              {/* Price (Left on mobile, Bottom Right on desktop) */}
              <div className="text-2xl md:text-3xl font-black text-blue-950 order-1 md:order-2">
                {price}
              </div>

              {/* Luggage (Right on mobile, Top Right on desktop) */}
              <div className="flex items-center text-[10px] md:text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-1 rounded w-max order-2 md:order-1 md:mb-2">
                <Luggage className="w-3.5 h-3.5 mr-1.5 text-blue-900" /> 2PC (23kg) Included
              </div>

            </div>

            <button 
              onClick={() => navigate('/flights/checkout')}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>

      {/* Accordion Footer */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center text-emerald-600"><ShieldAlert className="w-3.5 h-3.5 mr-1" /> Partially Refundable</span>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm font-bold text-blue-900 hover:text-amber-500 flex items-center transition-colors"
        >
          Flight Details <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-slate-200 p-4 md:p-6 bg-white animate-fade-in text-sm">
          <div className="flex flex-col ml-3 relative">
            {/* Continuous vertical line for timeline */}
            <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-blue-900/20"></div>

            {/* Departure Segment */}
            <div className="relative pl-6 pb-6">
              <div className="absolute w-3 h-3 rounded-full bg-blue-900 left-0 top-1.5 border-[3px] border-white box-content -translate-x-[4px]"></div>
              <div>
                <div className="font-bold text-slate-800">{departureTime} - {departureAirport}</div>
                <div className="text-slate-500 text-xs mt-1">Departure Terminal</div>
              </div>
              
              <div className="py-4 flex items-center text-xs font-bold text-slate-400">
                <Plane className="w-4 h-4 mr-2" /> {airline} {flightNumber} | Boeing 777-300ER | Economy
              </div>
            </div>

            {/* Layover Segments (if any) */}
            {displayLayovers.map((layover, index) => (
              <div key={index} className="relative pl-6 pb-6">
                <div className="absolute w-3 h-3 rounded-full bg-amber-500 left-0 top-1.5 border-[3px] border-white box-content -translate-x-[4px]"></div>
                <div>
                  <div className="font-bold text-slate-800">Layover: {layover.airport}</div>
                  <div className="text-amber-600 text-xs mt-1 font-semibold">Wait time: {layover.duration}</div>
                </div>
                
                <div className="py-4 flex items-center text-xs font-bold text-slate-400">
                  <Plane className="w-4 h-4 mr-2" /> {airline} (Connecting) | Boeing 777-300ER | Economy
                </div>
              </div>
            ))}

            {/* Arrival Segment */}
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 rounded-full bg-blue-900 left-0 top-1.5 border-[3px] border-white box-content -translate-x-[4px]"></div>
              <div>
                <div className="font-bold text-slate-800">{arrivalTime} - {arrivalAirport}</div>
                <div className="text-slate-500 text-xs mt-1">Arrival Terminal</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;