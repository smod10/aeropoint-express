import React from 'react';
import { ShieldCheck, CreditCard, Headset } from 'lucide-react';

const WhyChooseUs: React.FC = () => (
  <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Why Book With Aeropoint?</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-900">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Secure & Reliable</h3>
          <p className="text-slate-500">Your payments and data are protected by bank-level security protocols. Book with 100% confidence.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-900">
            <CreditCard className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Best Price Guarantee</h3>
          <p className="text-slate-500">We aggregate fares globally to ensure you receive the most competitive prices for flights and tours.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-900">
            <Headset className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">24/7 Expert Support</h3>
          <p className="text-slate-500">Our travel consultants are available around the clock to assist you with booking changes or emergencies.</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;