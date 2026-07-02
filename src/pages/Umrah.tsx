import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight, ShieldCheck, CheckCircle2, HeartHandshake, BookOpen } from 'lucide-react';
import { imageFallbacks } from '../utils/imageFallbacks';

const Umrah: React.FC = () => {
  const navigate = useNavigate();

  // Tier-based packages with exclusive names
  const spiritualPackages = [
    // --- UMRAH & HAJJ PACKAGES (8) ---
    { 
      id: 'al-firdaus',
      category: 'Hajj & Umrah',
      tier: 'Royal VIP',
      name: 'Al-Firdaus Royal Experience', 
      location: 'Mecca & Medina', 
      duration: '14 Days / 13 Nights', 
      price: '₦4,850,000', 
      rating: 5.0, 
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      features: ['5-Star Haram-View Suites', 'Business Class Flights', 'Private SUV Transfers', 'Dedicated VIP Mutawwif']
    },
    { 
      id: 'ramadan-kareem',
      category: 'Hajj & Umrah',
      tier: 'Seasonal VIP',
      name: 'Ramadan Laylatul Qadr Retreat', 
      location: 'Mecca & Medina', 
      duration: '15 Days / 14 Nights', 
      price: '₦5,200,000', 
      rating: 5.0, 
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
      features: ['Haram-View Iftar & Suhoor', 'Tahajjud Guidance', 'Luxury Suite Accommodations', 'VIP Airport Fast-Track']
    },
    { 
      id: 'maqam',
      category: 'Hajj & Umrah',
      tier: 'Elite 5-Star',
      name: 'Maqam Elite Selection', 
      location: 'Mecca & Medina', 
      duration: '10 Days / 9 Nights', 
      price: '₦3,200,000', 
      rating: 4.9, 
      reviews: 328,
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      features: ['5-Star Clock Tower Hotels', 'Direct Premium Flights', 'Haramain Train Tickets', 'Guided Ziyarat Tours']
    },
    { 
      id: 'al-quds',
      category: 'Hajj & Umrah',
      tier: 'Heritage Plus',
      name: 'Al-Aqsa & Umrah Dual Journey', 
      location: 'Jerusalem, Mecca & Medina', 
      duration: '12 Days / 11 Nights', 
      price: '₦3,650,000', 
      rating: 4.9, 
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
      features: ['3 Nights in Jerusalem', 'Guided Al-Aqsa Tour', 'Multi-City Flights Included', 'Premium 5-Star Stays']
    },
    { 
      id: 'zamzam-family',
      category: 'Hajj & Umrah',
      tier: 'Family Premium',
      name: 'Zamzam Family Harmony', 
      location: 'Mecca & Medina', 
      duration: '12 Days / 11 Nights', 
      price: '₦2,950,000', 
      rating: 4.8, 
      reviews: 275,
      image: 'https://images.unsplash.com/photo-1565552643952-b4b600ce36ce?w=800&q=80',
      features: ['Family Connecting Rooms', 'Kid-Friendly Ziyarat', 'Direct Flights', '24/7 Dedicated Support']
    },
    { 
      id: 'al-safa',
      category: 'Hajj & Umrah',
      tier: 'Premium 4-Star',
      name: 'Al-Safa Premium Journey', 
      location: 'Mecca & Medina', 
      duration: '10 Days / 9 Nights', 
      price: '₦2,450,000', 
      rating: 4.8, 
      reviews: 512,
      image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
      features: ['Premium 4-Star Hotels', '24/7 Haram Shuttle', 'Return Economy Flights', 'Group Ziyarat Tours']
    },
    { 
      id: 'noor',
      category: 'Hajj & Umrah',
      tier: 'Essential Value',
      name: 'Noor Essential Path', 
      location: 'Mecca & Medina', 
      duration: '7 Days / 6 Nights', 
      price: '₦1,850,000', 
      rating: 4.7, 
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1552084117-56a98a9463c6?w=800&q=80',
      features: ['Comfortable 3-Star Hotels', 'Economy Flights included', 'Group Coach Transfers', 'Umrah Visa Processing']
    },
    { 
      id: 'mina-explorer',
      category: 'Hajj & Umrah',
      tier: 'Economy Plus',
      name: 'Mina Spiritual Explorer', 
      location: 'Mecca & Medina', 
      duration: '8 Days / 7 Nights', 
      price: '₦1,650,000', 
      rating: 4.6, 
      reviews: 640,
      image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80',
      features: ['Standard Accommodations', 'Group Coach Transfers', 'Economy Flights', 'Umrah Visa Processing']
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/60 to-slate-50/90" />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block py-1 px-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-bold mb-4 tracking-wider uppercase">
            Spiritual Journeys
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Answer the Call. <br className="hidden md:block"/> Embark on Your <span className="text-amber-500">Sacred Journey</span>.
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium drop-shadow-md">
            Experience absolute peace of mind with our exclusive, meticulously planned pilgrimage packages.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 relative z-20 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Expert Guidance</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Guided by knowledgeable scholars and theologians to ensure your rituals are performed perfectly.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Fully Authorized</h3>
              <p className="text-sm text-slate-500 leading-relaxed">We are fully licensed and approved for secure visa processing for Saudi Arabia.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">End-to-End Care</h3>
              <p className="text-sm text-slate-500 leading-relaxed">From your doorstep to the Holy Lands and back, our team handles flights, hotels, and all ground logistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Exclusive Tier Packages</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Select the spiritual path that best suits your needs. Every package guarantees our standard of excellence and dedicated support.</p>
        </div>

        {/* explicitly 3 columns per row on large screens using lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spiritualPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              onClick={() => navigate('/packages/details')}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer flex flex-col h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.package;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/30 to-transparent" />
                
                {/* Tier Badge */}
                <div className={`absolute top-4 left-4 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md ${
                  ['al-firdaus', 'ramadan-kareem', 'easter'].includes(pkg.id) ? 'bg-slate-900 text-amber-400 border border-amber-500/50' : 
                  ['maqam', 'al-quds', 'footsteps', 'zamzam-family'].includes(pkg.id) ? 'bg-amber-500 text-slate-900' : 
                  'bg-white text-blue-900'
                }`}>
                  {pkg.tier}
                </div>

                <div className="absolute bottom-6 left-6 text-white pr-6">
                  <h3 className="text-2xl font-black leading-tight shadow-sm mb-2">{pkg.name}</h3>
                  <div className="flex items-center space-x-4 text-sm font-medium text-blue-100">
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-amber-400" /> {pkg.location}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-amber-400" /> {pkg.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg text-sm font-bold text-slate-700">
                    <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" /> {pkg.rating} <span className="text-slate-400 font-medium text-xs ml-1">({pkg.reviews})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Per Pilgrim From</span>
                    <span className="text-xl font-black text-blue-900">{pkg.price}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-blue-50 text-blue-900 py-3.5 rounded-xl font-bold text-sm group-hover:bg-blue-900 group-hover:text-white transition-colors flex justify-center items-center">
                  View Full Itinerary <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Booking Info / CTA */}
      <section className="bg-blue-900 py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Custom Spiritual Packages Available</h2>
          <p className="text-blue-200 mb-8 text-lg">Traveling with a large family, group, or need specific dates? Our consultants can tailor a bespoke package perfectly suited to your requirements.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
              Request Custom Quote
            </button>
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl border border-blue-700 transition-colors">
              Speak to a Consultant
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Umrah;