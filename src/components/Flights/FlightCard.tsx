import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Luggage, ChevronDown, Clock, ShieldAlert } from 'lucide-react';

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
}

const FlightCard: React.FC<FlightCardProps> = ({ 
  airline, flightNumber, departureTime, arrivalTime, 
  departureAirport, arrivalAirport, duration, stops, price, isCheapest 
}) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

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
          <div className="w-full md:w-1/4 flex flex-col items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center text-xs text-slate-500 font-semibold mb-2 bg-slate-50 px-2 py-1 rounded">
              <Luggage className="w-3.5 h-3.5 mr-1.5 text-blue-900" /> 2PC (23kg) Included
            </div>
            <div className="text-3xl font-black text-blue-950 mb-3">{price}</div>
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
          <div className="flex flex-col border-l-2 border-blue-900 ml-3 pl-4 space-y-4 relative">
            <div className="absolute w-3 h-3 rounded-full bg-blue-900 -left-[7px] top-0 border-[3px] border-white"></div>
            <div>
              <div className="font-bold text-slate-800">{departureTime} - {departureAirport}</div>
              <div className="text-slate-500 text-xs mt-1">Murtala Muhammed International Airport (Terminal 2)</div>
            </div>
            
            <div className="py-2 flex items-center text-xs font-bold text-slate-400">
              <Plane className="w-4 h-4 mr-2" /> {airline} {flightNumber} | Boeing 777-300ER | Economy
            </div>

            <div className="absolute w-3 h-3 rounded-full bg-blue-900 -left-[7px] bottom-0 border-[3px] border-white"></div>
            <div>
              <div className="font-bold text-slate-800">{arrivalTime} - {arrivalAirport}</div>
              <div className="text-slate-500 text-xs mt-1">London Heathrow (Terminal 3)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;