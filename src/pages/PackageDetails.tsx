import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, CheckCircle2, Plane, Hotel, Car, ArrowRight, Share2, Heart, ChevronDown } from 'lucide-react';
import { imageFallbacks } from '../utils/imageFallbacks';
import { getTourPackages } from '../data/packages';

const PackageDetails: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const pkg = slug ? getTourPackages().find((item) => item.slug === slug) : undefined;

  if (!pkg) return <Navigate to="/packages" replace />;

  const nights = Math.max(Number.parseInt(pkg.days, 10) - 1, 0);
  const totalForTwo = (Number(pkg.price.replace(/[^\d]/g, '')) * 2).toLocaleString('en-NG');
  const galleryImages = pkg.images.length > 1 ? pkg.images.slice(1, 3) : [pkg.image, pkg.image];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      
      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-blue-900 font-bold mb-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">{pkg.badge}</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {pkg.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">{pkg.title}</h1>
          </div>
          <div className="hidden md:flex space-x-3">
            <button onClick={() => navigate('/contact')} className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shadow-sm bg-white"><Share2 className="w-5 h-5" /></button>
            <button onClick={() => navigate('/auth')} className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm bg-white"><Heart className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden">
          <div className="md:col-span-3 bg-slate-200 relative group cursor-pointer">
            <img
              src={pkg.image}
              alt={pkg.title}
              onError={(event) => {
                event.currentTarget.src = imageFallbacks.package;
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {galleryImages.map((img, i) => (
              <div key={i} className="flex-1 bg-slate-200 relative group cursor-pointer overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`${pkg.title} gallery ${i + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = imageFallbacks.package;
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
          
          {/* Quick Highlights */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-wrap gap-6 justify-between items-center">
            <div className="flex items-center text-slate-700 font-semibold"><Calendar className="w-5 h-5 mr-3 text-amber-500" /> {pkg.days}, {nights} Nights</div>
            <div className="flex items-center text-slate-700 font-semibold"><Plane className="w-5 h-5 mr-3 text-amber-500" /> {pkg.flightIncluded ? 'Flights included' : 'Flights not included'}</div>
            <div className="flex items-center text-slate-700 font-semibold"><Hotel className="w-5 h-5 mr-3 text-amber-500" /> Accommodation</div>
            <div className="flex items-center text-slate-700 font-semibold"><Car className="w-5 h-5 mr-3 text-amber-500" /> Travel arrangements</div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar space-x-6 border-b border-slate-200 mb-8">
            {['overview', 'itinerary', 'inclusions'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'text-slate-400 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in">
            {activeTab === 'overview' && (
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <h3 className="text-xl font-extrabold text-blue-950">Tour Overview</h3>
                <p>{pkg.description}</p>
                <p className="text-sm">{pkg.conditions}</p>
                
                <h4 className="font-bold text-slate-800 pt-4">Accommodations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-100 p-4 rounded-xl flex items-start">
                    <Hotel className="w-5 h-5 text-blue-900 mr-3 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800">{pkg.location}</div>
                      <div className="text-xs text-slate-500 mt-1">{pkg.accommodation}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold text-blue-950 mb-6">Day-by-Day Itinerary</h3>
                <div className="border-l-2 border-amber-200 ml-3 space-y-8 pb-4">
                  
                  {pkg.itinerary.map((item, index) => (
                    <div key={item.title} className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full ${index < 2 ? 'bg-amber-500' : 'bg-blue-900'} -left-[9px] top-1 border-4 border-white box-content`} />
                      <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  ))}

                </div>
                <p className="mt-4 text-xs text-slate-500">This is an indicative itinerary outline. Confirm exact days, services, and timings with the final booking documents.</p>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div>
                <h3 className="text-xl font-extrabold text-blue-950 mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((item, i) => (
                    <div key={i} className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar (Booking Card) */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Price Per Person</span>
                  <span className="text-3xl font-black text-blue-950">{pkg.price}</span>
                </div>
                <div className="flex items-center bg-slate-100 px-2 py-1 rounded text-sm font-bold text-slate-700">
                  <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" /> {pkg.rating}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/20">
                  <div className="relative group p-3 flex items-center cursor-pointer hover:bg-slate-50">
                    <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Select Date</div>
                      <div className="text-slate-800 font-bold text-sm">Available dates confirmed on request</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/20">
                  <div className="relative group p-3 flex items-center cursor-pointer hover:bg-slate-50">
                    <Users className="h-5 w-5 text-slate-400 mr-3" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Travelers</div>
                      <div className="text-slate-800 font-bold text-sm">2 Adults · {pkg.days}, {nights} Nights</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-6 py-4 border-y border-slate-100">
                <span>Indicative total for 2 travelers</span>
                <span className="text-lg">₦{totalForTwo}</span>
              </div>

              <button 
                onClick={() => navigate('/packages/checkout')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center group"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="text-center mt-4">
                <span className="text-xs text-slate-400 font-medium">Cancellation terms depend on the selected suppliers and fare.</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PackageDetails;