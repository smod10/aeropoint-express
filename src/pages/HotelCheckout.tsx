import React, { useState } from 'react';
import { User, Mail, ShieldCheck, LockKeyhole, AlertCircle, CreditCard, Landmark, ArrowRight, BedDouble, MapPin, Calendar, Users } from 'lucide-react';
import { countryNames, dialingCodes } from '../data/countries';

const HotelCheckout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Form Area */}
        <main className="w-full lg:w-2/3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">Secure Your Room</h1>
          <p className="text-slate-500 mb-8 font-medium">Please enter your details to complete the hotel reservation.</p>

          {/* Guest Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-900 mr-2" />
                <h2 className="font-bold text-slate-800 text-lg">Primary Guest Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" placeholder="e.g. John" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" placeholder="e.g. Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nationality</label>
                  <>
                    <input
                      type="text"
                      list="hotel-country-list"
                      defaultValue="Nigeria"
                      placeholder="Search nationality"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800"
                    />
                    <datalist id="hotel-country-list">
                      {countryNames.map((countryName) => (
                        <option key={countryName} value={countryName} />
                      ))}
                    </datalist>
                  </>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 mb-3 text-sm">Special Requests (Optional)</h4>
                <div className="flex flex-wrap gap-3">
                  {['Large Bed', 'Twin Beds', 'High Floor', 'Quiet Room'].map((req) => (
                    <label key={req} className="flex items-center space-x-2 border border-slate-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900" />
                      <span className="text-sm font-semibold text-slate-600">{req}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Requests are subject to property availability at the time of check-in.</p>
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
                <p className="text-sm text-blue-900 font-medium">We'll send your booking confirmation and hotel instructions to these details.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                  <div className="flex">
                    <>
                      <input
                        type="text"
                        list="hotel-dial-code-list"
                        defaultValue="+234"
                        placeholder="Code"
                        className="w-28 bg-slate-50 border border-slate-200 rounded-l-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 border-r-0"
                      />
                      <datalist id="hotel-dial-code-list">
                        {dialingCodes.map((dialCode) => (
                          <option key={dialCode} value={dialCode} />
                        ))}
                      </datalist>
                    </>
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
            
            {/* Hotel Overview */}
            <div className="h-32 relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent opacity-90"></div>
               <div className="absolute bottom-4 left-4 right-4 text-white">
                 <h3 className="font-bold text-xl leading-tight">The Ritz London</h3>
                 <div className="flex items-center text-xs text-blue-200 mt-1">
                   <MapPin className="w-3 h-3 mr-1" /> Mayfair, London
                 </div>
               </div>
            </div>
            
            {/* Stay Details */}
            <div className="p-6 border-b border-slate-100 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Check-in</span>
                  <span className="font-bold text-slate-800">28 Jun 2026</span>
                  <span className="text-xs text-slate-500">From 14:00</span>
                </div>
                <div className="bg-slate-100 p-2 rounded-full"><Calendar className="w-4 h-4 text-slate-400" /></div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase">Check-out</span>
                  <span className="font-bold text-slate-800">03 Jul 2026</span>
                  <span className="text-xs text-slate-500">Until 11:00</span>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm mt-4">
                <div className="flex items-center font-bold text-slate-800 mb-2">
                  <BedDouble className="w-4 h-4 text-blue-900 mr-2" /> Deluxe King Room
                </div>
                <div className="flex items-center text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400 mr-2" /> 2 Adults • 1 Room
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 bg-slate-50">
              <h4 className="font-black text-slate-800 mb-4 uppercase tracking-wider text-sm">Price Breakdown</h4>
              <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Room (5 Nights)</span><span className="text-slate-800 font-bold">₦4,250,000</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-medium">
                  <span>Breakfast Included</span><span>FREE</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Taxes & Fees</span><span className="text-slate-800 font-bold">Included</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="font-black text-slate-800 text-lg block">Total Price</span>
                  <span className="text-xs font-bold text-slate-400">Final price to pay</span>
                </div>
                <span className="text-3xl font-black text-blue-900">₦4,250,000</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-emerald-700 font-bold mb-6 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" /> <span>100% Safe & Secure Payment</span>
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg">
                Pay ₦4,250,000 <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default HotelCheckout;