import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, ChevronDown, Info, Coffee, Wifi, Car, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HotelDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel?: any;
}

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ isOpen, onClose, hotel: _hotel }) => {
  const navigate = useNavigate();
  const [fareAccordionOpen, setFareAccordionOpen] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    navigate('/hotels/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 relative overflow-hidden animate-fade-in">
        
        {/* Header with Background Image */}
        <div className="relative h-48 md:h-56">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent"></div>
          
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20 backdrop-blur-md">
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">5 Stars</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold shadow-sm">The Ritz-Carlton, Dubai</h2>
            <p className="text-blue-100 text-sm mt-1 flex items-center font-medium">
              <MapPin className="w-4 h-4 mr-1" /> Jumeirah Beach Residence, Dubai
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Room & Dates Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selected Room</h3>
              <p className="text-lg font-bold text-slate-800">Deluxe Ocean View Room</p>
              <p className="text-sm text-slate-500 mt-1">1 King Bed • Non-smoking • 45 sq.m</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stay Duration</h3>
              <p className="text-lg font-bold text-slate-800">14 Oct - 19 Oct 2026</p>
              <p className="text-sm text-slate-500 mt-1">5 Nights • 2 Adults</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Room Amenities included</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <Wifi className="w-5 h-5 text-blue-900 mb-2" />
                <span className="text-xs font-bold text-slate-600">Free WiFi</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <Coffee className="w-5 h-5 text-blue-900 mb-2" />
                <span className="text-xs font-bold text-slate-600">Breakfast</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <Waves className="w-5 h-5 text-blue-900 mb-2" />
                <span className="text-xs font-bold text-slate-600">Pool Access</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                <Car className="w-5 h-5 text-blue-900 mb-2" />
                <span className="text-xs font-bold text-slate-600">Free Parking</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-800 text-sm">Free Cancellation</h4>
              <p className="text-xs text-emerald-600 mt-1">You can cancel or change this booking for free up to 48 hours before check-in (by 12 Oct 2026, 14:00 Local Time).</p>
            </div>
          </div>

          {/* Fare Breakdown Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => setFareAccordionOpen(!fareAccordionOpen)}
              className="w-full bg-slate-50 p-4 flex justify-between items-center transition-colors hover:bg-slate-100"
            >
              <span className="font-bold text-slate-800 flex items-center">
                <Info className="w-4 h-4 mr-2 text-slate-400" /> Price Breakdown
              </span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${fareAccordionOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {fareAccordionOpen && (
              <div className="p-4 bg-white space-y-3 border-t border-slate-200 animate-fade-in">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Room Rate (₦125,000 x 5 nights)</span>
                  <span className="font-semibold text-slate-800">₦625,000</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Taxes & Fees (VAT & City Tax)</span>
                  <span className="font-semibold text-slate-800">₦75,000</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total Price</span>
                  <span className="font-black text-blue-900 text-lg">₦700,000</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 sticky bottom-0">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Stay</p>
            <p className="text-3xl font-black text-blue-950 leading-none">₦700,000</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={onClose} className="flex-1 md:flex-none px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button onClick={handleContinue} className="flex-1 md:flex-none px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all">
              Reserve Room
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetailsModal;