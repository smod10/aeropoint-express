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
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'packages', label: 'Packages', icon: Map },
    { id: 'visas', label: 'Visas', icon: FileText },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-[-180px] lg:mt-[-150px]">
      <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-4 border border-slate-100">
        
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 md:space-x-4 mb-4 p-2 border-b border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : ''}`} />
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