import React from 'react';
import { User, Mail, ShieldCheck, AlertCircle, ArrowRight, MapPin, Calendar, Users, Plane, Hotel } from 'lucide-react';
import PaystackPayment from '../components/PaystackPayment';

// Temporarily mock country names and dialing codes to resolve imports
const countryNames = ['Nigeria', 'United Kingdom', 'United States', 'Canada', 'Saudi Arabia', 'Tanzania'];
const dialingCodes = ['+234', '+44', '+1', '+966', '+255'];

const PackageCheckout: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Form Area */}
        <main className="w-full lg:w-2/3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">Complete Your Booking</h1>
          <p className="text-slate-500 mb-8 font-medium">Please enter passenger details exactly as they appear on passports.</p>

          {/* Lead Traveler Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-900 mr-2" />
                <h2 className="font-bold text-slate-800 text-lg">Lead Traveler (Adult 1)</h2>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">Primary Contact</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800">
                    <option>Mr</option><option>Mrs</option><option>Ms</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First & Middle Name</label>
                  <input type="text" placeholder="e.g. John Edward" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name (Surname)</label>
                  <input type="text" placeholder="e.g. Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nationality</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800">
                    {countryNames.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passport Number</label>
                  <input type="text" placeholder="A00000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Second Traveler Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-4 md:p-6 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-blue-50 text-blue-900 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">2</div>
              <div>
                <h3 className="font-bold text-slate-800">Traveler 2 (Adult)</h3>
                <p className="text-xs text-slate-500 font-medium">Click to add details</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
              <Mail className="w-5 h-5 text-blue-900 mr-2" />
              <h2 className="font-bold text-slate-800 text-lg">Contact Information</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start bg-blue-50 p-4 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-blue-900 mr-3 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-900 font-medium">We'll send your itinerary, flight tickets, and visa documents to these details.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                  <div className="flex">
                    <select className="bg-slate-50 border border-slate-200 rounded-l-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 border-r-0 max-w-[120px]">
                      {dialingCodes.map((code) => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                    <input type="tel" placeholder="800 000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <PaystackPayment amount={3700000} description="Tour booking" />

        </main>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
            
            {/* Package Overview */}
            <div className="h-32 relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent opacity-90"></div>
               <div className="absolute bottom-4 left-4 right-4 text-white">
                 <h3 className="font-bold text-xl leading-tight">Zanzibar White Sands</h3>
                 <div className="flex items-center text-xs text-blue-200 mt-1">
                   <MapPin className="w-3 h-3 mr-1" /> Zanzibar, Tanzania
                 </div>
               </div>
            </div>
            
            <div className="p-6 border-b border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <div className="flex items-center"><Calendar className="w-4 h-4 text-amber-500 mr-2" /> 10 Aug - 16 Aug</div>
                <div className="text-slate-500">7 Days</div>
              </div>
              <div className="flex items-center font-bold text-slate-800 text-sm">
                <Users className="w-4 h-4 text-amber-500 mr-2" /> 2 Adults (Ocean Suite)
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 mt-4">
                <div className="flex items-start text-sm">
                  <Plane className="w-4 h-4 text-blue-900 mr-2 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Return Flights Included</span>
                    <span className="text-xs text-slate-500">LOS ↔ ZNZ via Kenya Airways</span>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Hotel className="w-4 h-4 text-blue-900 mr-2 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">5-Star Accommodations</span>
                    <span className="text-slate-500 text-xs">White Sand Luxury Villas & Spa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 bg-slate-50">
              <h4 className="font-black text-slate-800 mb-4 uppercase tracking-wider text-sm">Price Summary</h4>
              <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Adult x 2</span><span className="text-slate-800 font-bold">₦3,700,000</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-medium">
                  <span>All-Inclusive Meals</span><span>Included</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Taxes & Fees</span><span className="text-slate-800 font-bold">Included</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="font-black text-slate-800 text-lg block">Total Price</span>
                </div>
                <span className="text-3xl font-black text-blue-900">₦3,700,000</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-emerald-700 font-bold mb-6 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" /> <span>100% Safe & Secure Payment</span>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PackageCheckout;