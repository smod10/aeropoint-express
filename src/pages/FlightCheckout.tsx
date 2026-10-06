import React, { useState } from 'react';
import { Check, User, Mail, ShieldCheck, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PhoneCountrySelect from '../components/PhoneCountrySelect';
import PaystackPayment from '../components/PaystackPayment';

const FlightCheckout: React.FC = () => {
  const location = useLocation();
  const booking = (location.state as any) ?? {};

  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const tripType = booking.tripType ?? 'Return';
  const isDomestic = Boolean(booking.isDomestic);
  const showPassportFields = !isDomestic;
  const fare = booking.fare ?? 450000;
  const taxesAndFees = booking.taxesAndFees ?? 85000;
  const total = fare + taxesAndFees - (couponApplied ? 15000 : 0);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleApplyCoupon = () => {
    if (couponCode.length > 3) setCouponApplied(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header & Stepper */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-blue-950 mb-6">Complete Your Flight Booking</h1>
          <div className="flex justify-center items-center max-w-2xl mx-auto">
            {[1, 2, 3].map((num, i) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-colors duration-300 ${step >= num ? 'bg-amber-500 text-slate-900' : 'bg-white text-slate-400 border border-slate-200'}`}>
                    {step > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  <span className={`text-xs font-bold mt-2 absolute -bottom-6 w-32 text-center ${step >= num ? 'text-blue-950' : 'text-slate-400'}`}>
                    {num === 1 ? 'Traveler Info' : num === 2 ? 'Extras & Review' : 'Payment'}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${step > i + 1 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          
          {/* Main Form Area */}
          <main className="w-full lg:w-2/3">
            
            {/* STEP 1: TRAVELER INFO */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-900 mr-3 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 font-medium">
                    {showPassportFields
                      ? 'Please ensure names match exactly as they appear on your passport. Passport details are required for international ticketing.'
                      : 'Please ensure names match exactly as they appear on the government-issued ID you will use to travel. Passport details are not required for domestic flights.'}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                    <User className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="font-bold text-slate-800 text-lg">Traveler Details (Adult 1)</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name (Surname)</label>
                        <input type="text" placeholder="e.g. Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                        <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                    </div>

                    {showPassportFields && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passport Number</label>
                          <input type="text" placeholder="e.g. A12345678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passport Expiry Date</label>
                          <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                    <Mail className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="font-bold text-slate-800 text-lg">Contact Information</h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input type="email" placeholder="Tickets will be sent here" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                      <div className="flex">
                        <PhoneCountrySelect aria-label="Phone country code" className="bg-slate-50 border border-slate-200 rounded-l-xl px-2 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 border-r-0 w-[44%] min-w-0 text-sm" />
                        <input type="tel" placeholder="800 000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EXTRAS & REVIEW */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-900 mr-3 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 font-medium">
                    Seat selection is managed directly by the airline after ticket issuance or during online check-in.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                   <h2 className="font-bold text-slate-800 text-lg mb-4">Travel Insurance</h2>
                   <label className="flex items-start cursor-pointer group">
                     <input type="checkbox" className="w-5 h-5 text-blue-900 rounded border-slate-300 mt-1 focus:ring-blue-900" />
                     <div className="ml-4">
                       <span className="font-bold text-slate-800 block group-hover:text-blue-900">Add Comprehensive Travel Insurance (+₦15,000)</span>
                       <span className="text-sm text-slate-500 mt-1 block">Covers trip cancellation, medical emergencies, and lost baggage. Highly recommended.</span>
                     </div>
                   </label>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Coupon Code Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h2 className="font-bold text-slate-800 text-lg mb-4">Have a Promo Code?</h2>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code here" 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 uppercase" 
                      disabled={couponApplied}
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                      className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                    >
                      {couponApplied ? 'Applied!' : 'Apply'}
                    </button>
                  </div>
                  {couponApplied && <p className="text-emerald-600 font-bold text-sm mt-3 flex items-center"><Check className="w-4 h-4 mr-1" /> Coupon APPLIED (-₦15,000)</p>}
                </div>

                <PaystackPayment amount={total} description="Flight booking" />
              </div>
            )}

            {/* Stepper Navigation Controls */}
            <div className="flex justify-between mt-8 border-t border-slate-200 pt-6">
              {step > 1 ? (
                <button onClick={prevStep} className="px-6 py-3.5 font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
              ) : <div></div>}
              
              {step < 3 ? (
                <button onClick={nextStep} className="px-8 py-3.5 font-bold text-slate-900 bg-amber-500 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-500/20 flex items-center transition-all">
                  Continue to Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : <div />}
            </div>
            
          </main>

          {/* Sidebar Summary */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-extrabold text-blue-950 mb-4 uppercase tracking-wider text-sm">Booking Summary</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Flight</p>
                  <p className="font-bold text-slate-800">{booking.from ?? 'Lagos (LOS)'} to {booking.to ?? 'London (LHR)'}</p>
                  <p className="text-sm text-slate-500 mt-1">{booking.airline ?? 'Virgin Atlantic'} • {booking.travelClass ?? 'Economy'} Class</p>
                  <p className="text-sm font-semibold text-slate-600 mt-2">
                    {booking.departDate ?? '2026-11-24'}
                    {tripType === 'Return' && (booking.returnDate ? ` - ${booking.returnDate}` : ' - Return')}
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50">
                <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
                  <div className="flex justify-between text-sm text-slate-600 font-medium">
                    <span>Adult x 1</span><span className="text-slate-800 font-bold">₦{fare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 font-medium">
                    <span>Taxes & Fees</span><span className="text-slate-800 font-bold">₦{taxesAndFees.toLocaleString()}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm text-emerald-600 font-medium">
                      <span>Promo Code Applied</span><span>-₦15,000</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end mb-4">
                  <span className="font-black text-slate-800 text-lg">Total</span>
                  <span className="text-3xl font-black text-blue-900">₦{total.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4" /> <span>Bank-Grade Encryption</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default FlightCheckout;