import React from 'react';
import { Map } from 'lucide-react';

const Packages: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 pt-20">
    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8 text-blue-900">
      <Map className="w-12 h-12" />
    </div>
    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 text-center">Holidays & Packages</h1>
    <p className="text-lg text-slate-500 max-w-xl text-center mb-8">
      We are actively working on bringing you the best experience for our portal. Check back soon!
    </p>
    <button className="bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-amber-600 transition-colors">
      Notify Me
    </button>
  </div>
);

export default Packages;