import React from 'react';
import { Plane, Hotel, Map, FileText } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    { icon: Plane, title: "Global Flights", desc: "Best fares across 500+ airlines worldwide." },
    { icon: Hotel, title: "Luxury Stays", desc: "Curated stays from boutique to 5-star." },
    { icon: Map, title: "Hajj & Umrah", desc: "Premium, spiritually guided pilgrimage tours." },
    { icon: FileText, title: "Visa Assistance", desc: "Fast, stress-free visa processing." },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Complete Travel Solutions</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">From securing your visa to landing in your dream destination, Aeropoint Express handles every detail.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-amber-500 transition-colors">
              <service.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
            <p className="text-slate-500 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;