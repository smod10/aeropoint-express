import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight, ShieldCheck, CheckCircle2, HeartHandshake, BookOpen } from 'lucide-react';
import { imageFallbacks } from '../utils/imageFallbacks';
import { getTourPackages } from '../data/packages';

const Umrah: React.FC = () => {
  const navigate = useNavigate();

  const spiritualPackages = getTourPackages().filter((tour) => tour.category === 'Hajj & Umrah');

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
            Experience absolute peace of mind with our exclusive, meticulously planned pilgrimage tours.
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
              <p className="text-sm text-slate-500 leading-relaxed">From your doorstep to the Holy Lands and back, our team handles flights, stays, and all ground logistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Tours Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Exclusive Tier Tours</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Select the spiritual path that best suits your needs. Every tour includes our standard of care and dedicated support.</p>
        </div>

        {/* explicitly 3 columns per row on large screens using lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spiritualPackages.map((pkg) => (
            <div 
              key={pkg.slug} 
              onClick={() => navigate(`/packages/details/${pkg.slug}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer flex flex-col h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.package;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/30 to-transparent" />
                
                {/* Tier Badge */}
                <div className="absolute top-4 left-4 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-900 shadow-md">{pkg.badge}</div>

                <div className="absolute bottom-6 left-6 text-white pr-6">
                  <h3 className="text-2xl font-black leading-tight shadow-sm mb-2">{pkg.title}</h3>
                  <div className="flex items-center space-x-4 text-sm font-medium text-blue-100">
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-amber-400" /> {pkg.location}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-amber-400" /> {pkg.days}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg text-sm font-bold text-slate-700">
                    <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" /> {pkg.rating}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Per Traveller From</span>
                    <span className="text-xl font-black text-blue-900">{pkg.price}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.highlights.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button onClick={(event) => { event.stopPropagation(); navigate(`/packages/details/${pkg.slug}`); }} className="w-full bg-blue-50 text-blue-900 py-3.5 rounded-xl font-bold text-sm group-hover:bg-blue-900 group-hover:text-white transition-colors flex justify-center items-center">
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
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Custom Spiritual Tours Available</h2>
          <p className="text-blue-200 mb-8 text-lg">Traveling with a large family, group, or need specific dates? Our consultants can tailor a bespoke tour to your requirements.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/contact')} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
              Request Custom Quote
            </button>
            <button onClick={() => navigate('/contact')} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl border border-blue-700 transition-colors">
              Speak to a Consultant
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Umrah;