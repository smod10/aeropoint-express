import React, { useState } from 'react';
import { Plane, Hotel, Map, FileText } from 'lucide-react';
import FlightsForm from './FlightsForm.tsx';
import HotelsForm from './HotelsForm.tsx';
import PackagesForm from './PackagesForm.tsx';
import VisasForm from './VisasForm.tsx';

const BookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Stays', icon: Hotel },
    { id: 'packages', label: 'Tours', icon: Map },
    { id: 'visas', label: 'Visas', icon: FileText },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-[40px] sm:px-6 lg:px-8 relative z-20 mt-[-208px] lg:mt-[-260px]">
      <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-4 border border-slate-100">
        
        <div className="grid grid-cols-4 gap-0.5 mb-3 p-1 border-b border-slate-100 sm:flex sm:gap-2 sm:overflow-visible sm:mb-4 sm:p-2 md:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-w-0 items-center justify-center gap-0.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap sm:justify-start sm:gap-2 sm:py-3 sm:px-5 sm:rounded-xl sm:text-sm ${
                  isActive 
                    ? 'bg-blue-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-900'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${isActive ? 'text-amber-500' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-2 md:p-4">
          {activeTab === 'flights' && <FlightsForm />}
          {activeTab === 'hotels' && <HotelsForm />}
          {activeTab === 'packages' && <PackagesForm />}
          {activeTab === 'visas' && <VisasForm />}
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;