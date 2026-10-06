import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { trendingPackages } from '../../data/packages';
import { imageFallbacks } from '../../utils/imageFallbacks';

type OfferCategory = 'packages' | 'flights' | 'hotels';

interface OfferCard {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  badge: string;
  detail: string;
  href: string;
  rating?: number;
}

const flightOffers: OfferCard[] = [
  { id: 'lagos-london', title: 'Lagos to London', location: 'Lagos (LOS) to London (LHR)', image: 'https://images.unsplash.com/photo-1513635269975-5969336cd1f7?w=800&q=80', price: '₦1,250,000', badge: 'Return flight', detail: 'Virgin Atlantic', href: '/flights' },
  { id: 'abuja-dubai', title: 'Abuja to Dubai', location: 'Abuja (ABV) to Dubai (DXB)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', price: '₦850,000', badge: 'Return flight', detail: 'Emirates', href: '/flights' },
  { id: 'lagos-new-york', title: 'Lagos to New York', location: 'Lagos (LOS) to New York (JFK)', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80', price: '₦1,650,000', badge: 'Return flight', detail: 'Delta', href: '/flights' },
  { id: 'kano-jeddah', title: 'Kano to Jeddah', location: 'Kano (KAN) to Jeddah (JED)', image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80', price: '₦750,000', badge: 'Return flight', detail: 'Saudi Airlines', href: '/flights' },
];

const hotelOffers: OfferCard[] = [
  { id: 'ritz-london', title: 'The Ritz London', location: 'Mayfair, London', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', price: '₦850,000', badge: 'London stay', detail: 'Indicative 5-night rate', href: '/hotels', rating: 5.0 },
  { id: 'burj-al-arab', title: 'Burj Al Arab', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', price: '₦1,250,000', badge: 'Dubai stay', detail: 'Indicative 5-night rate', href: '/hotels', rating: 5.0 },
  { id: 'four-seasons-paris', title: 'Four Seasons Paris', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', price: '₦950,000', badge: 'Paris stay', detail: 'Indicative 5-night rate', href: '/hotels', rating: 4.9 },
  { id: 'waldorf-maldives', title: 'Waldorf Astoria Maldives', location: 'Malé, Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', price: '₦1,450,000', badge: 'Island stay', detail: 'Indicative 5-night rate', href: '/hotels', rating: 5.0 },
];

const TrendingPackages: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<OfferCategory>('flights');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cards: OfferCard[] = activeCategory === 'packages'
    ? trendingPackages.map((pkg) => ({
      id: pkg.slug,
      title: pkg.title,
      location: pkg.location,
      image: pkg.image,
      price: pkg.price,
      badge: pkg.badge,
      detail: pkg.days,
      href: `/packages/details/${pkg.slug}`,
      rating: pkg.rating,
    }))
    : activeCategory === 'flights' ? flightOffers : hotelOffers;

  const sectionTitle = activeCategory === 'packages' ? 'Tours' : activeCategory === 'flights' ? 'Flight Offers' : 'Stay Offers';
  const sectionDescription = activeCategory === 'packages'
    ? 'Discover our handpicked holiday and pilgrimage tours designed for comfort and memorable moments.'
    : activeCategory === 'flights'
      ? 'Explore featured routes and fares from destinations across the region and around the world.'
      : 'Browse featured stays in popular destinations and find the right base for your trip.';

  return (
    <section className="py-20 bg-blue-950 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{sectionTitle}</h2>
            <p className="text-blue-200 max-w-xl text-base sm:text-lg">{sectionDescription}</p>
            {activeCategory !== 'packages' && <p className="mt-2 text-xs text-blue-200/75">Displayed prices are indicative. Confirm dates, availability, and final supplier pricing before booking.</p>}
          </div>
          <div className="mt-5 flex w-full flex-wrap gap-2" role="group" aria-label="Choose featured offers">
            {[
              { id: 'packages', label: 'Tours' },
              { id: 'flights', label: 'Flight offers' },
              { id: 'hotels', label: 'Stays' },
            ].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id as OfferCategory);
                  if (scrollRef.current) scrollRef.current.scrollTo({ left: 0 });
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category.id ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-white/20 text-blue-100 hover:border-white/50 hover:text-white'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
            <Link to={activeCategory === 'packages' ? '/packages' : activeCategory === 'flights' ? '/flights' : '/hotels'} className="text-amber-500 font-semibold flex items-center hover:text-amber-400 transition-colors">
              View All {activeCategory === 'packages' ? 'tours' : activeCategory === 'flights' ? 'flights' : 'stays'} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <div className="flex gap-2">
              <button type="button" aria-label="Scroll curated experiences left" onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-blue-800 flex items-center justify-center text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" aria-label="Scroll curated experiences right" onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-blue-800 flex items-center justify-center text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Slider */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-5 pb-6 pt-3 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {cards.map((offer) => (
            <Link
              key={offer.id}
              to={offer.href}
              aria-label={`View ${offer.title} ${activeCategory === 'packages' ? 'tour details' : 'offer'}`}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl group flex flex-col snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(25%-0.9375rem)] transform transition duration-300 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.package;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{offer.badge}</div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center text-sm font-medium mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-amber-500" /> {offer.location}
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">{offer.title}</h3>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700 w-max mb-3">
                  {offer.rating !== undefined
                    ? <><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {offer.rating}</>
                    : activeCategory === 'flights' ? 'Featured flight offer' : 'Featured stay'}
                </div>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{offer.detail}</p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-lg font-extrabold text-blue-900">{offer.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPackages;