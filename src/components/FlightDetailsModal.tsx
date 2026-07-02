import React, { useState } from 'react';
import { X, Plane, ChevronDown, ChevronRight, CheckCircle2, BaggageClaim, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FlightDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight?: {
    airline?: string;
    flightNumber?: string;
    departureTime?: string;
    arrivalTime?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    duration?: string;
    stops?: number;
    layovers?: { airport: string; country?: string; duration: string }[];
    tripType?: 'One-way' | 'Return';
    isDomestic?: boolean;
    from?: string;
    to?: string;
    departDate?: string;
    returnDate?: string;
    travelClass?: string;
    passengers?: { adults: number; children: number; infants: number };
  };
}

const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({ isOpen, onClose, flight }) => {
  const navigate = useNavigate();
  const [fareAccordionOpen, setFareAccordionOpen] = useState(false);
  const [flightClassIndex, setFlightClassIndex] = useState(0);
  
  if (!isOpen) return null;

  const flightClasses = [
    { name: 'Economy', multiplier: 1, baseFare: 450000 },
    { name: 'Premium Economy', multiplier: 1.5, baseFare: 675000 },
    { name: 'Business', multiplier: 2.8, baseFare: 1260000 },
    { name: 'First Class', multiplier: 4.5, baseFare: 2025000 }
  ];

  const selectedClass = flightClasses[flightClassIndex];
  const taxesAndFees = 85000;
  const totalFare = selectedClass.baseFare + taxesAndFees;
  const tripType = flight?.tripType ?? 'Return';
  const isReturn = tripType === 'Return';
  const layovers = flight?.layovers ?? [];

  const formatOutboundDate = flight?.departDate 
    ? new Date(flight.departDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) 
    : 'Thu, 16 Jul 2026';
  
  const formatReturnDate = flight?.returnDate 
    ? new Date(flight.returnDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) 
    : 'Tue, 01 Dec 2026';

  const handleContinue = () => {
    onClose();
    navigate('/flights/checkout', {
      state: {
        tripType,
        isDomestic: flight?.isDomestic ?? false,
        from: flight?.from,
        to: flight?.to,
        departDate: flight?.departDate,
        returnDate: isReturn ? flight?.returnDate : '',
        travelClass: selectedClass.name,
        passengers: flight?.passengers,
        airline: flight?.airline,
        flightNumber: flight?.flightNumber,
        fare: selectedClass.baseFare,
        taxesAndFees,
      },
    });
  };

  // Helper to render the timeline perfectly aligned to grid
  const renderTimeline = (title: string, date: string, type: 'Outbound' | 'Return') => {
    const isOutbound = type === 'Outbound';
    const airlineName = flight?.airline ?? 'KLM Royal Dutch Airlines';
    const flightCode = airlineName.substring(0, 2).toUpperCase();
    
    // Mock segment data based on layovers
    const segments = layovers.length > 0 ? [
      {
         airline: airlineName,
         flightNumber: `${flightCode} - 1042`,
         depTime: isOutbound ? (flight?.departureTime ?? '09:15') : '12:40',
         arrTime: isOutbound ? '11:25' : '15:10',
         depAirport: isOutbound ? (flight?.departureAirport ?? 'BHX Birmingham International Airport') : (flight?.arrivalAirport ?? 'LHR Heathrow'),
         arrAirport: layovers[0].airport,
         duration: '1h 10m',
         aircraft: 'Boeing 737-700 (winglets) pax',
         layoverNext: layovers[0]
      },
      {
         airline: airlineName,
         flightNumber: `${flightCode} - 587`,
         depTime: isOutbound ? '14:25' : '18:10',
         arrTime: isOutbound ? (flight?.arrivalTime ?? '20:05') : '01:30',
         depAirport: layovers[0].airport,
         arrAirport: isOutbound ? (flight?.arrivalAirport ?? 'LOS Murtala Muhammed') : (flight?.departureAirport ?? 'LOS Murtala Muhammed'),
         duration: '6h 40m',
         aircraft: 'Airbus A330-200'
      }
    ] : [
      {
         airline: airlineName,
         flightNumber: flight?.flightNumber ?? `${flightCode} - 1042`,
         depTime: isOutbound ? (flight?.departureTime ?? '09:15') : '12:40',
         arrTime: isOutbound ? (flight?.arrivalTime ?? '20:05') : '19:35',
         depAirport: isOutbound ? (flight?.departureAirport ?? 'BHX Birmingham') : (flight?.arrivalAirport ?? 'LHR Heathrow'),
         arrAirport: isOutbound ? (flight?.arrivalAirport ?? 'LOS Murtala Muhammed') : (flight?.departureAirport ?? 'LOS Murtala Muhammed'),
         duration: flight?.duration ?? '10h 50m',
         aircraft: 'Boeing 787-9'
      }
    ];

    return (
      <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide mb-6">
          {title}
        </h3>

        {segments.map((seg, idx) => (
          <React.Fragment key={idx}>
            {/* Airline Header */}
            <div className="flex items-center mb-4 mt-4 first:mt-0">
               <div className="w-[60px] flex justify-end mr-4">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Virgin_Atlantic_logo.svg" alt={seg.airline} className="h-4 object-contain opacity-80" />
               </div>
               <div className="text-slate-600 font-medium text-sm">{seg.airline} {seg.flightNumber}</div>
            </div>

            {/* Timeline Grid */}
            <div className="grid grid-cols-[60px_20px_1fr] gap-4 mb-2">
               
               {/* Duration Col */}
               <div className="flex flex-col justify-center items-end text-slate-500 font-bold text-sm pb-1">
                 {seg.duration}
               </div>
               
               {/* Line Col */}
               <div className="flex flex-col items-center mt-1.5 mb-1.5">
                 <div className="w-2 h-2 rounded-full border-2 border-blue-900 bg-white shrink-0" />
                 <div className="w-px bg-slate-300 flex-1 my-1" />
                 <div className="w-2 h-2 rounded-full bg-blue-900 shrink-0" />
               </div>
               
               {/* Details Col */}
               <div className="flex flex-col justify-between py-0 text-slate-600 text-sm">
                 <div className="flex items-center leading-none mt-0.5">
                   <span className="font-bold text-blue-950 w-12">{seg.depTime}</span>
                   <span className="ml-1 font-medium">{seg.depAirport}</span>
                 </div>
                 
                 <div className="my-3 ml-12">
                   <div className="inline-block border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 shadow-sm bg-slate-50">
                     {seg.aircraft}
                   </div>
                 </div>
                 
                 <div className="flex items-center leading-none mb-0.5">
                   <span className="font-bold text-blue-950 w-12">{seg.arrTime}</span>
                   <span className="ml-1 font-medium">{seg.arrAirport}</span>
                 </div>
               </div>
               
            </div>

            {/* Layover Box - Integrated perfectly into grid to align text */}
            {seg.layoverNext && (
              <div className="bg-amber-50/50 border border-amber-100/60 rounded-xl py-3 my-4 grid grid-cols-[60px_20px_1fr] gap-4 items-center">
                 <div className="text-amber-700 font-bold text-sm text-right">
                   {seg.layoverNext.duration}
                 </div>
                 <div className="flex justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                 </div>
                 <div className="text-amber-900 font-semibold text-sm">
                   Layover at {seg.layoverNext.airport}
                 </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Footer Timeline Info */}
        <div className="mt-6 pt-4 text-blue-900 font-bold text-sm flex gap-1 border-t border-slate-100">
          Arrives: {date} <span className="text-slate-300 mx-1">|</span> Journey duration: {flight?.duration ?? '10h 50m'}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 relative overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-blue-950 p-6 flex justify-between items-center text-white shrink-0 shadow-md relative z-20">
          <div>
            <h2 className="text-xl font-extrabold flex items-center tracking-tight">
              <Plane className="w-5 h-5 mr-2 text-amber-500" /> Flight Itinerary & Details
            </h2>
            <p className="text-blue-200 text-sm mt-1.5 font-medium">
              {flight?.from ?? 'Lagos (LOS)'} to {flight?.to ?? 'London (LHR)'} <span className="mx-1.5 text-blue-400">•</span> {isReturn ? 'Return Trip' : 'One-way'}
            </p>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-50 flex-grow">
          
          {/* Cabin Class Cards */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 flex items-center uppercase tracking-wider text-sm">
                Cabin Selection
              </h3>
              <span className="text-blue-900 font-black px-3 py-1 bg-blue-50 rounded-lg text-sm">{selectedClass.name}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {flightClasses.map((flightClass, index) => (
                <button
                  key={flightClass.name}
                  onClick={() => setFlightClassIndex(index)}
                  className={`text-left rounded-xl border p-4 transition-all relative overflow-hidden ${
                    flightClassIndex === index
                      ? 'border-blue-900 bg-blue-50 shadow-sm ring-1 ring-blue-900/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-bold ${flightClassIndex === index ? 'text-blue-950' : 'text-slate-700'}`}>
                      {flightClass.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Base fare</p>
                  <p className={`text-lg font-black ${flightClassIndex === index ? 'text-blue-900' : 'text-slate-800'}`}>
                    ₦{(flightClass.baseFare / 1000).toFixed(0)}k
                  </p>
                  {flightClassIndex === index && (
                    <div className="absolute top-0 right-0 border-t-[24px] border-l-[24px] border-t-blue-900 border-l-transparent">
                      <CheckCircle2 className="w-3 h-3 text-white absolute -top-[20px] -left-[14px]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Timelines */}
          {renderTimeline('OUTBOUND', formatOutboundDate, 'Outbound')}
          {isReturn && renderTimeline('RETURN', formatReturnDate, 'Return')}

          {/* Flight Rules & Baggage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Flexible Ticket</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Changes permitted up to 24h before departure (fare difference may apply). Cancellations partially refundable.</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start shadow-sm">
              <BaggageClaim className="w-5 h-5 text-blue-900 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Baggage Allowance</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">2x 23kg Checked bags included<br/>1x 7kg Cabin bag included</p>
              </div>
            </div>
          </div>

          {/* Fare Breakdown Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mt-6 shadow-sm">
            <button 
              onClick={() => setFareAccordionOpen(!fareAccordionOpen)}
              className="w-full bg-slate-50 p-5 flex justify-between items-center transition-colors hover:bg-slate-100"
            >
              <span className="font-bold text-slate-800 flex items-center text-sm uppercase tracking-wider">
                <Info className="w-4 h-4 mr-2 text-slate-400" /> Fare Breakdown
              </span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${fareAccordionOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {fareAccordionOpen && (
              <div className="p-5 space-y-4 border-t border-slate-100 animate-fade-in">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Adult Base Fare ({selectedClass.name}) x 1</span>
                  <span className="font-bold text-slate-800">₦{selectedClass.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Taxes, Fees & Airport Charges</span>
                  <span className="font-bold text-slate-800">₦{taxesAndFees.toLocaleString()}</span>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-black text-slate-800 uppercase tracking-wider text-xs">Total Price</span>
                  <span className="font-black text-blue-900 text-xl">₦{totalFare.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 rounded-b-3xl">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Total Amount</p>
            <p className="text-3xl md:text-4xl font-black text-blue-950 leading-none tracking-tight">₦{totalFare.toLocaleString()}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={onClose} className="flex-1 md:flex-none px-6 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
              Cancel
            </button>
            <button onClick={handleContinue} className="flex-1 md:flex-none px-8 py-4 rounded-xl font-black text-slate-900 bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all text-sm uppercase tracking-wide flex items-center justify-center">
              Continue to Book <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlightDetailsModal;