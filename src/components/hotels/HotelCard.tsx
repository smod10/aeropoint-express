import React from 'react';
import { MapPin, Star, Wifi, Coffee, ChevronRight, Check, CheckCircle2 } from 'lucide-react';

interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  stars: number;
  pricePerNight: string;
  totalPrice: string;
  image: string;
  amenities: string[];
  isTopPick?: boolean;
  onBookNow?: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  name, location, distance, rating, reviews, stars, 
  pricePerNight, totalPrice, image, amenities, isTopPick, onBookNow 
}) => {
  return (
    <div className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow mb-5 overflow-hidden flex flex-col md:flex-row ${isTopPick ? 'border-amber-400' : 'border-slate-200'}`}>
      
      {/* Image Section */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-56 md:h-auto relative shrink-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
        {isTopPick && (
          <div className="absolute top-4 left-0 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-r-lg shadow-sm">
            Our Top Pick
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{name}</h3>
            </div>
            
            <div className="flex items-center bg-blue-900 text-white px-2 py-1 rounded-lg shadow-sm shrink-0">
              <span className="font-bold text-sm mr-1">{rating.toFixed(1)}</span>
              <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">({reviews})</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
            <MapPin className="w-4 h-4 mr-1 text-slate-400" /> 
            <span className="underline decoration-dashed decoration-blue-200 underline-offset-4 cursor-pointer hover:text-amber-500">{location}</span>
            <span className="text-slate-400 ml-2 text-xs border-l border-slate-300 pl-2">{distance}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.map((amenity, idx) => (
              <span key={idx} className="flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                {amenity === 'Free Wi-Fi' && <Wifi className="w-3 h-3 mr-1.5" />}
                {amenity === 'Breakfast Included' && <Coffee className="w-3 h-3 mr-1.5" />}
                {amenity !== 'Free Wi-Fi' && amenity !== 'Breakfast Included' && <Check className="w-3 h-3 mr-1.5 text-emerald-500" />}
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-4 border-t border-slate-100 gap-4 md:gap-0 mt-auto">
          <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Free Cancellation
          </div>
          
          <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto">
            <div className="text-left md:text-right">
              <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider block mb-0.5">Price for 5 nights</span>
              <span className="text-2xl font-black text-blue-950 block leading-none mb-1">{totalPrice}</span>
              <span className="text-xs text-slate-500 font-medium">{pricePerNight} / night</span>
            </div>
            <button 
              onClick={onBookNow}
              className="md:mt-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm flex items-center shrink-0"
            >
              Book Now <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;