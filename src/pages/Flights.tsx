import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowRight, ArrowRightLeft, CalendarCheck, CreditCard, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import FlightsForm from '../components/BookingWidget/FlightsForm';

const FlightFAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    { q: "How do I manage or cancel my flight booking?", a: "You can easily manage, modify, or cancel your booking through our 'Manage Booking' portal. Simply enter your booking reference and last name to view your options." },
    { q: "When will I receive my e-ticket?", a: "Your e-ticket is generated immediately after payment confirmation and sent to the email address provided during booking. You can also download it securely from your Aeropoint dashboard." },
    { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, as well as secure local bank transfers. All transactions are protected with bank-grade encryption for your peace of mind." },
    { q: "What is the baggage allowance for my flight?", a: "Baggage allowance varies depending on the airline and travel class you select. This information is clearly displayed during the booking process and listed on your final e-ticket." }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
              <span className="font-bold text-slate-800">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 bg-slate-50">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Flights: React.FC = () => {
  const flightDeals = [
    { from: 'Lagos (LOS)', to: 'London (LHR)', price: '₦1,250,000', type: 'Return', airline: 'Virgin Atlantic', img: '[https://images.unsplash.com/photo-1513635269975-5969336cd1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1513635269975-5969336cd1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
    { from: 'Abuja (ABV)', to: 'Dubai (DXB)', price: '₦850,000', type: 'Return', airline: 'Emirates', img: '[https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
    { from: 'Lagos (LOS)', to: 'New York (JFK)', price: '₦1,650,000', type: 'Return', airline: 'Delta', img: '[https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
    { from: 'Kano (KAN)', to: 'Jeddah (JED)', price: '₦750,000', type: 'Return', airline: 'Saudi Airlines', img: '[https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
    { from: 'Port Harcourt (PHC)', to: 'Paris (CDG)', price: '₦1,550,000', type: 'Return', airline: 'Air France', img: '[https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
    { from: 'Lagos (LOS)', to: 'Johannesburg (JNB)', price: '₦950,000', type: 'Return', airline: 'South African', img: '[https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' },
  ];

  const partners = ["Emirates", "QATAR", "BRITISH AIRWAYS", "DELTA", "ETHIOPIAN", "AIR PEACE", "KLM", "VIRGIN ATLANTIC", "LUFTHANSA", "KENYA AIRWAYS"];

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .mask-edges { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Page Header */}
      <div className="bg-blue-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('[https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80](https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Compare & Book Cheap Flights</h1>
          <p className="text-blue-200 text-lg">Find the best deals across 500+ global airlines with zero hidden fees.</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100">
           <FlightsForm />
        </div>
      </div>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0 text-blue-900"><CalendarCheck className="w-9 h-9" strokeWidth={1.5} /></div>
              <div>
                <h3 className="text-[15px] font-bold text-slate-800">Change or cancel your trip</h3>
                <p className="text-sm text-slate-500 mt-0.5 pr-2">Make updates or cancel a booking</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-500 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0 text-blue-900"><MessageSquare className="w-9 h-9" strokeWidth={1.5} /></div>
              <div>
                <h3 className="text-[15px] font-bold text-slate-800">Need help?</h3>
                <p className="text-sm text-slate-500 mt-0.5 pr-2">Our Travel Sharks are available 24/7</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-500 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0 text-blue-900"><CreditCard className="w-9 h-9" strokeWidth={1.5} /></div>
              <div>
                <h3 className="text-[15px] font-bold text-slate-800">Track your refund</h3>
                <p className="text-sm text-slate-500 mt-0.5 pr-2">Check the status of a refund that's in progress</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-500 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Top Flight Deals - Slider matching Curated Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">Trending Flight Deals</h2>
            <p className="text-slate-500">Discover low fares to top destinations around the world.</p>
          </div>
          <div className="hidden md:flex gap-2 mr-4">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {flightDeals.map((deal, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group overflow-hidden flex flex-col snap-start shrink-0 w-[45vw] sm:w-[45vw] lg:w-[calc(25%-1.125rem)]">
              <div className="h-36 md:h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('${deal.img}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold px-2 py-1 bg-amber-500 text-slate-900 rounded">{deal.type}</span>
                <span className="absolute bottom-4 left-4 text-xs md:text-sm font-bold text-white tracking-wide shadow-sm">{deal.airline}</span>
              </div>
              
              <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center space-x-2 mb-6">
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-amber-500 transition-colors truncate" title={deal.from}>{deal.from.split(' ')[0]}</div>
                    <div className="text-[10px] md:text-xs text-slate-400 truncate">{deal.from.match(/\(([^)]+)\)/)?.[1]}</div>
                  </div>
                  <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4 text-slate-300 flex-shrink-0" />
                  <div className="flex-1 text-right overflow-hidden">
                    <div className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-amber-500 transition-colors truncate" title={deal.to}>{deal.to.split(' ')[0]}</div>
                    <div className="text-[10px] md:text-xs text-slate-400 truncate">{deal.to.match(/\(([^)]+)\)/)?.[1]}</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] md:text-xs text-slate-400 mb-0.5 md:mb-1">From</div>
                    <div className="text-sm md:text-lg font-black text-blue-900">{deal.price}</div>
                  </div>
                  <button className="bg-slate-50 text-blue-900 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm group-hover:bg-blue-900 group-hover:text-white transition-colors">Select</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Airline Partners Marquee */}
      <section className="mt-16 text-center overflow-hidden py-12 bg-white border-y border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted by Global Airlines</h3>
        <div className="flex overflow-hidden opacity-50 grayscale hover:grayscale-0 transition-all duration-500 group mask-edges">
          <div className="animate-marquee flex shrink-0 items-center gap-12 md:gap-20 px-6 md:px-10 group-hover:[animation-play-state:paused]">
            {partners.map((partner, idx) => <span key={`p1-${idx}`} className="text-xl md:text-2xl font-black text-slate-800 tracking-tight whitespace-nowrap">{partner}</span>)}
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-12 md:gap-20 px-6 md:px-10 group-hover:[animation-play-state:paused]" aria-hidden="true">
            {partners.map((partner, idx) => <span key={`p2-${idx}`} className="text-xl md:text-2xl font-black text-slate-800 tracking-tight whitespace-nowrap">{partner}</span>)}
          </div>
        </div>
      </section>

      <FlightFAQs />
    </div>
  );
};

export default Flights;

