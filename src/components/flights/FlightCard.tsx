import React, { useState } from 'react';
import { Plane, Luggage, Clock, ShieldAlert, ChevronDown } from 'lucide-react';

interface Layover {
  airport: string;
  country?: string;
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
  onBookNow?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ 
  airline, flightNumber, departureTime, arrivalTime, 
  departureAirport, arrivalAirport, duration, stops, price, isCheapest, layovers, onBookNow
}) => {
  const [showCompactDetails, setShowCompactDetails] = useState(false);
  const stopCount = layovers?.length ?? stops;
  const stopSummary = layovers && layovers.length > 0
    ? layovers.map((layover) => `${layover.airport}${layover.country ? `, ${layover.country}` : ''}`).join(' • ')
    : `${stops} stop${stops > 1 ? 's' : ''}`;

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
              <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center justify-center flex-wrap gap-x-1 text-center">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
                {stops > 0 && (
                  <span className="text-amber-700">• Via {stopSummary}</span>
                )}
              </div>
              <div className="w-full flex items-center justify-center relative my-2">
                <div className="w-full h-0.5 bg-slate-200"></div>
                <Plane className="w-5 h-5 text-blue-900 absolute bg-white px-0.5 transform rotate-90" />
                {stops > 0 && Array.from({ length: stopCount }).map((_, idx) => (
                  <div
                    key={`stop-marker-${idx}`}
                    className="absolute w-2.5 h-2.5 rounded-full bg-amber-500 border border-white -translate-x-1/2"
                    style={{ left: `${((idx + 1) / (stopCount + 1)) * 100}%` }}
                  ></div>
                ))}
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
            
            <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full mb-4 md:mb-3">
              <div className="text-2xl md:text-3xl font-black text-blue-950 order-1 md:order-2">
                {price}
              </div>
              <div className="flex items-center text-[10px] md:text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-1 rounded w-max order-2 md:order-1 md:mb-2">
                <Luggage className="w-3.5 h-3.5 mr-1.5 text-blue-900" /> 2PC (23kg) Included
              </div>
            </div>

            <button 
              onClick={onBookNow}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center text-emerald-600"><ShieldAlert className="w-3.5 h-3.5 mr-1" /> Partially Refundable</span>
        </div>
        <button
          onClick={() => setShowCompactDetails((prev) => !prev)}
          className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center transition-colors"
        >
          Flight Details
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showCompactDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showCompactDetails && (
        <div className="border-t border-slate-100 px-4 md:px-6 py-4 bg-white animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Route Summary</p>
              <p className="font-semibold text-slate-700">{departureAirport} to {arrivalAirport} • {duration}</p>
              {stops > 0 && layovers && layovers.length > 0 && (
                <p className="font-semibold text-amber-700 mt-1">
                  Via {layovers.map((layover) => `${layover.airport}${layover.country ? `, ${layover.country}` : ''} (${layover.duration})`).join(' • ')}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Ticket Rules</p>
              <p className="font-semibold text-slate-700">Partially refundable • Date change allowed with fare difference</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;