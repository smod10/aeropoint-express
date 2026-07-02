import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, CheckCircle2, Plane, Hotel, Car, ArrowRight, Share2, Heart, ChevronDown } from 'lucide-react';
import { imageFallbacks } from '../utils/imageFallbacks';

const PackageDetails: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const pkg = {
    title: "Zanzibar White Sands Retreat",
    location: "Zanzibar, Tanzania",
    price: "₦1,850,000",
    days: "7 Days, 6 Nights",
    rating: 4.8,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579723527299-803ee7c7bbdf?w=600&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&q=80"
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      
      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-blue-900 font-bold mb-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">Vacations</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {pkg.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">{pkg.title}</h1>
          </div>
          <div className="hidden md:flex space-x-3">
            <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shadow-sm bg-white"><Share2 className="w-5 h-5" /></button>
            <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm bg-white"><Heart className="w-5 h-5" /></button>
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
            {pkg.images.slice(0, 2).map((img, i) => (
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
            <div className="flex items-center text-slate-700 font-semibold"><Calendar className="w-5 h-5 mr-3 text-amber-500" /> {pkg.days}</div>
            <div className="flex items-center text-slate-700 font-semibold"><Plane className="w-5 h-5 mr-3 text-amber-500" /> Return Flights</div>
            <div className="flex items-center text-slate-700 font-semibold"><Hotel className="w-5 h-5 mr-3 text-amber-500" /> 5-Star Resort</div>
            <div className="flex items-center text-slate-700 font-semibold"><Car className="w-5 h-5 mr-3 text-amber-500" /> Airport Transfers</div>
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
                <h3 className="text-xl font-extrabold text-blue-950">Package Overview</h3>
                <p>Escape to the pristine white sand beaches and turquoise waters of Zanzibar. This luxurious 7-day retreat is the perfect balance of serene beach relaxation and captivating cultural exploration.</p>
                <p>Stay in a premium 5-star beachfront resort where you'll enjoy all-inclusive dining and world-class amenities. Discover the rich history of Stone Town, inhale the aromas of a local spice farm, and sail into the sunset on a traditional dhow cruise. Let us handle every detail for an unforgettable tropical getaway.</p>
                
                <h4 className="font-bold text-slate-800 pt-4">Accommodations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-100 p-4 rounded-xl flex items-start">
                    <Hotel className="w-5 h-5 text-blue-900 mr-3 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800">Zanzibar White Sand Luxury Villas</div>
                      <div className="text-xs text-slate-500 mt-1">6 Nights • Oceanfront Suite</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold text-blue-950 mb-6">Day-by-Day Itinerary</h3>
                <div className="border-l-2 border-amber-200 ml-3 space-y-8 pb-4">
                  
                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-amber-500 -left-[9px] top-1 border-4 border-white box-content"></div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center mb-2">Day 1: Karibu Zanzibar! <span className="ml-3 text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-semibold"><Plane className="w-3 h-3 inline mr-1" />Flight</span></h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Arrive at Abeid Amani Karume International Airport. Our private chauffeur will welcome you and provide a scenic transfer to your 5-star beachfront resort. Spend the evening relaxing by the ocean.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-amber-500 -left-[9px] top-1 border-4 border-white box-content"></div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center mb-2">Day 2: Stone Town & Spice Tour <span className="ml-3 text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-semibold">Culture</span></h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">Step back in time with a guided walking tour of historic Stone Town, a UNESCO World Heritage site. In the afternoon, visit a local spice farm to smell and taste the cloves, vanilla, and nutmeg that give the island its nickname.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-blue-900 -left-[9px] top-1 border-4 border-white box-content"></div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center mb-2">Day 3-5: Beach Relaxation & Watersports</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Enjoy full days at your leisure. Lounge by the infinity pool, book a spa treatment, or take advantage of the resort's complimentary watersports including snorkeling and kayaking.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-blue-900 -left-[9px] top-1 border-4 border-white box-content"></div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center mb-2">Day 6: Safari Blue & Sunset Cruise</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Embark on the famous 'Safari Blue' sea excursion to sail around mangroves and snorkel in pristine coral reefs. End your final night with a spectacular sunset dhow cruise along the coast.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-blue-900 -left-[9px] top-1 border-4 border-white box-content"></div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center mb-2">Day 7: Departure</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Enjoy your final tropical breakfast before checking out. Our chauffeur will transfer you to the airport for your return flight home.</p>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div>
                <h3 className="text-xl font-extrabold text-blue-950 mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Return Economy Flights",
                    "6 Nights at 5-Star Beach Resort",
                    "All-Inclusive (All Meals & Drinks)",
                    "Private Roundtrip Airport Transfers",
                    "Guided Stone Town Walking Tour",
                    "Zanzibar Spice Farm Experience",
                    "Safari Blue Snorkeling Trip",
                    "Sunset Dhow Cruise",
                    "All Local Taxes and Resort Fees"
                  ].map((item, i) => (
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
                      <div className="text-slate-800 font-bold text-sm">10 Aug 2026</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900/20">
                  <div className="relative group p-3 flex items-center cursor-pointer hover:bg-slate-50">
                    <Users className="h-5 w-5 text-slate-400 mr-3" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Travelers</div>
                      <div className="text-slate-800 font-bold text-sm">2 Adults, Ocean Suite</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-6 py-4 border-y border-slate-100">
                <span>Total for 2 Travelers</span>
                <span className="text-lg">₦3,700,000</span>
              </div>

              <button 
                onClick={() => navigate('/packages/checkout')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center group"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="text-center mt-4">
                <span className="text-xs text-slate-400 font-medium">Free cancellation up to 30 days before departure</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PackageDetails;