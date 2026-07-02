import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { trendingPackages } from '../../data/packages';
import { imageFallbacks } from '../../utils/imageFallbacks';

const TrendingPackages: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-blue-950 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Curated Experiences</h2>
            <p className="text-blue-200 max-w-xl text-lg">Discover our handpicked holiday and pilgrimage packages designed for ultimate comfort and memorable moments.</p>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="hidden md:flex gap-2 mr-4">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-blue-800 flex items-center justify-center text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-blue-800 flex items-center justify-center text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link to="/packages" className="text-amber-500 font-semibold flex items-center hover:text-amber-400 transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* 4-Column Slider */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {trendingPackages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl overflow-hidden shadow-2xl group cursor-pointer flex flex-col snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(25%-1.125rem)] transform transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.package;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{pkg.badge}</div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center text-sm font-medium mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-amber-500" /> {pkg.location}
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">{pkg.title}</h3>
                </div>
                <div className="flex items-center bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700 w-max mb-4">
                  <Star className="w-3 h-3 text-amber-500 mr-1 fill-amber-500" /> {pkg.rating}
                </div>
                <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-2">{pkg.days} of unparalleled experience, including flights, accommodation, and transfers.</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-lg font-extrabold text-blue-900">{pkg.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPackages;