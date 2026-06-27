import React from 'react';
import { Users, MapPin, FileText, ChevronDown, ArrowRight } from 'lucide-react';

const VisasForm: React.FC = () => (
  <div className="flex flex-col space-y-4 mt-4">
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Users className="h-5 w-5 text-slate-400" />
        </div>
        <input type="text" className="w-full h-full pl-12 pr-4 pt-5 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl placeholder-slate-400 relative z-20" placeholder="I am a citizen of..." />
        <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Nationality</span>
      </div>

      <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <MapPin className="h-5 w-5 text-slate-400" />
        </div>
        <input type="text" className="w-full h-full pl-12 pr-4 pt-5 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl placeholder-slate-400 relative z-20" placeholder="Going to..." />
        <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Destination</span>
      </div>

      <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <FileText className="h-5 w-5 text-slate-400" />
        </div>
        <select className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20">
          <option>Tourist Visa</option>
          <option>Business Visa</option>
          <option>Umrah Visa</option>
          <option>Transit Visa</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </div>
      </div>

      <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-lg h-[60px] px-8 rounded-xl flex items-center justify-center transition-all shadow-md shrink-0 w-full lg:w-auto">
        Check Req. <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  </div>
);

export default VisasForm;
