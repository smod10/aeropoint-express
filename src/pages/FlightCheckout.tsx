import React, { useState } from 'react';
import { User, Mail, Luggage, ShieldCheck, LockKeyhole, Plane, AlertCircle, CreditCard, Landmark, ArrowRight } from 'lucide-react';

const FlightCheckout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Form Area */}
        <main className="w-full lg:w-2/3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">Secure Your Booking</h1>
          <p className="text-slate-500 mb-8 font-medium">Please enter your details exactly as they appear on your passport.</p>

          {/* Passenger Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-900 mr-2" />
                <h2 className="font-bold text-slate-800 text-lg">Passenger 1 (Adult)</h2>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">Primary Contact</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800">
                    <option>Mr</option><option>Mrs</option><option>Ms</option><option>Miss</option>
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
                    <option>Nigeria</option><option>United Kingdom</option><option>United States</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passport Number</label>
                  <input type="text" placeholder="A00000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
              </div>
            </div>
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
                <p className="text-sm text-blue-900 font-medium">We'll send your e-ticket, booking updates, and gate changes to these details. Please ensure they are accurate.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                  <div className="flex">
                    <select className="bg-slate-50 border border-slate-200 rounded-l-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 border-r-0">
                      <option>+234</option><option>+44</option><option>+1</option>
                    </select>
                    <input type="tel" placeholder="800 000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
              <LockKeyhole className="w-5 h-5 text-blue-900 mr-2" />
              <h2 className="font-bold text-slate-800 text-lg">Payment Method</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 flex items-center transition-all ${paymentMethod === 'card' ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <CreditCard className={`w-6 h-6 mr-3 ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className={`font-bold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-700'}`}>Debit/Credit Card</div>
                    <div className="text-xs text-slate-500 mt-0.5">Instant confirmation</div>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-xl border-2 flex items-center transition-all ${paymentMethod === 'transfer' ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <Landmark className={`w-6 h-6 mr-3 ${paymentMethod === 'transfer' ? 'text-blue-900' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className={`font-bold ${paymentMethod === 'transfer' ? 'text-blue-900' : 'text-slate-700'}`}>Bank Transfer</div>
                    <div className="text-xs text-slate-500 mt-0.5">Pay via local bank</div>
                  </div>
                </button>
              </div>

              {/* Card Details Mock */}
              {paymentMethod === 'card' && (
                <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in">
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cardholder Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </main>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
            
            {/* Flight Overview */}
            <div className="bg-blue-950 p-6 text-white relative overflow-hidden">
              <Plane className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 transform -rotate-12" />
              <h3 className="font-bold text-lg mb-6 relative z-10 flex items-center"><Plane className="w-5 h-5 mr-2 text-amber-500" /> Outbound Flight</h3>
              
              <div className="flex justify-between items-center mb-2 relative z-10">
                <div>
                  <div className="font-black text-3xl tracking-tight">LOS</div>
                  <div className="text-xs text-blue-300 font-medium">10:30</div>
                </div>
                <div className="flex-1 flex flex-col items-center mx-4">
                  <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest mb-1">6h 45m</span>
                  <div className="w-full border-t border-dashed border-blue-700 relative flex justify-center items-center">
                    <div className="absolute bg-blue-950 px-1"><Plane className="w-3 h-3 text-amber-500" /></div>
                  </div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest mt-1">Direct</span>
                </div>
                <div className="text-right">
                  <div className="font-black text-3xl tracking-tight">LHR</div>
                  <div className="text-xs text-blue-300 font-medium">17:15</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-900/50 flex justify-between items-center relative z-10">
                <span className="text-sm font-bold">Virgin Atlantic (VS 412)</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded font-semibold">Economy</span>
              </div>
            </div>
            
            {/* Add-ons & Details */}
            <div className="p-6 border-b border-slate-100 space-y-4">
              <div className="flex items-center text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Luggage className="w-5 h-5 mr-3 text-blue-900" /> 
                <div>
                  <div className="font-bold">2 Checked Bags Included</div>
                  <div className="text-xs text-slate-500 font-medium">Up to 23kg each per passenger</div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 bg-slate-50">
              <h4 className="font-black text-slate-800 mb-4 uppercase tracking-wider text-sm">Price Breakdown</h4>
              <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Adult x 1</span><span className="text-slate-800 font-bold">₦1,050,000</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Taxes & Airline Fees</span><span className="text-slate-800 font-bold">₦200,000</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="font-black text-slate-800 text-lg block">Total Price</span>
                  <span className="text-xs font-bold text-slate-400">Includes all taxes & fees</span>
                </div>
                <span className="text-3xl font-black text-blue-900">₦1,250,000</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-emerald-700 font-bold mb-6 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" /> <span>100% Safe & Secure Payment</span>
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg">
                Pay ₦1,250,000 <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default FlightCheckout;
