import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Car, Waves, CheckCircle2, ArrowRight, Share2, Heart, Info, ChevronDown, ShieldCheck } from 'lucide-react';
import { imageFallbacks } from '../utils/imageFallbacks';

const HotelDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateHotel = location.state?.hotel;

  // Use passed state or fallback to default mock data.
  const hotel = stateHotel || {
    name: 'The Ritz-Carlton',
    location: 'Jumeirah Beach Residence, Dubai',
    pricePerNight: '₦125,000',
    totalPrice: '₦700,000',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
    ],
  };

  const [fareAccordionOpen, setFareAccordionOpen] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-blue-900 font-bold mb-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">5 Stars</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {hotel.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">{hotel.name}</h1>
          </div>
          <div className="hidden md:flex space-x-3">
            <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shadow-sm bg-white"><Share2 className="w-5 h-5" /></button>
            <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-colors shadow-sm bg-white"><Heart className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden">
          <div className="md:col-span-3 bg-slate-200 relative group cursor-pointer">
            <img
              src={hotel.image}
              alt={hotel.name}
              onError={(event) => {
                event.currentTarget.src = imageFallbacks.hotel;
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {hotel.images?.slice(0, 2).map((img: string, i: number) => (
              <div key={i} className="flex-1 bg-slate-200 relative group cursor-pointer overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`${hotel.name} gallery ${i + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.hotel;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
            <div className="flex-1 bg-blue-900 relative group cursor-pointer overflow-hidden rounded-xl flex items-center justify-center border border-blue-800">
              <span className="font-bold text-white tracking-wider flex items-center">View Gallery <ArrowRight className="w-4 h-4 ml-2" /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Content Area */}
        <main className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-8">
            {/* Room & Dates Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-8">
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
            <div className="border-b border-slate-100 pb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Room Amenities included</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100">
                  <Wifi className="w-6 h-6 text-blue-900 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Free WiFi</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100">
                  <Coffee className="w-6 h-6 text-blue-900 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Breakfast</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100">
                  <Waves className="w-6 h-6 text-blue-900 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Pool Access</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100">
                  <Car className="w-6 h-6 text-blue-900 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Free Parking</span>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Hotel Policies</h3>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-4 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-base">Free Cancellation</h4>
                  <p className="text-sm text-emerald-700 mt-1 leading-relaxed">You can cancel or change this booking for free up to 48 hours before check-in (by 12 Oct 2026, 14:00 Local Time). No charges will be applied.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Booking Card) */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Total Stay</span>
                  <span className="text-3xl font-black text-blue-950">{hotel.totalPrice}</span>
                </div>
                <div className="flex items-center bg-slate-100 px-2.5 py-1.5 rounded-lg text-sm font-bold text-slate-700">
                  <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" /> {hotel.rating}
                </div>
              </div>

              {/* Fare Breakdown Accordion */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <button
                  onClick={() => setFareAccordionOpen(!fareAccordionOpen)}
                  className="w-full bg-slate-50 p-4 flex justify-between items-center transition-colors hover:bg-slate-100"
                >
                  <span className="font-bold text-slate-800 flex items-center text-sm">
                    <Info className="w-4 h-4 mr-2 text-slate-400" /> Price Breakdown
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${fareAccordionOpen ? 'rotate-180' : ''}`} />
                </button>

                {fareAccordionOpen && (
                  <div className="p-4 bg-white space-y-4 border-t border-slate-100 animate-fade-in">
                    <div className="flex justify-between text-sm text-slate-600 font-medium">
                      <span>Room Rate (5 nights)</span>
                      <span className="font-bold text-slate-800">₦625,000</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 font-medium">
                      <span>Taxes & Fees (VAT & City Tax)</span>
                      <span className="font-bold text-slate-800">₦75,000</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-xs">Total Price</span>
                      <span className="font-black text-blue-900 text-lg">{hotel.totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/hotels/checkout')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center group mb-4"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 mr-2" /> Secure Booking
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;