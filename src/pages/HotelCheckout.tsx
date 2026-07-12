import React, { useState } from 'react';
import { Check, User, CreditCard, Clock, ShieldCheck, Coffee, ArrowRight, ArrowLeft, BedDouble } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dialingCodes = ['+1', '+44', '+234', '+971', '+254', '+27'];

const HotelCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

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
          <h1 className="text-3xl font-extrabold text-blue-950 mb-6">Complete Your Hotel Booking</h1>
          <div className="flex justify-center items-center max-w-2xl mx-auto">
            {[1, 2, 3].map((num, i) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-colors duration-300 ${step >= num ? 'bg-amber-500 text-slate-900' : 'bg-white text-slate-400 border border-slate-200'}`}>
                    {step > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  <span className={`text-xs font-bold mt-2 absolute -bottom-6 w-32 text-center ${step >= num ? 'text-blue-950' : 'text-slate-400'}`}>
                    {num === 1 ? 'Guest Info' : num === 2 ? 'Add-ons' : 'Payment'}
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
            
            {/* STEP 1: GUEST INFO */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                    <User className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="font-bold text-slate-800 text-lg">Primary Guest Details</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" placeholder="Booking confirmation will be sent here" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                        <div className="flex">
                          <select className="bg-slate-50 border border-slate-200 rounded-l-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 border-r-0 w-24">
                            {dialingCodes?.map((code) => <option key={code} value={code}>{code}</option>)}
                          </select>
                          <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                   <h2 className="font-bold text-slate-800 text-lg mb-4">Special Requests</h2>
                   <p className="text-sm text-slate-500 mb-3">Requests cannot be guaranteed, but the property will do its best to meet your needs.</p>
                   <textarea 
                     rows={3}
                     placeholder="e.g. Early check-in, late check-out, high floor..."
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900/20 text-slate-800 font-medium"
                   ></textarea>
                </div>
              </div>
            )}

            {/* STEP 2: EXTRAS & REVIEW */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                   <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center"><Coffee className="w-5 h-5 mr-2 text-amber-500" /> Add-ons & Upgrades</h2>
                   
                   <label className="flex items-start cursor-pointer group p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors mb-4">
                     <input type="checkbox" className="w-5 h-5 text-blue-900 rounded border-slate-300 mt-1 focus:ring-blue-900" />
                     <div className="ml-4 flex-1">
                       <span className="font-bold text-slate-800 block group-hover:text-blue-900 flex justify-between">
                         <span>Airport Transfer (Round Trip)</span>
                         <span>+₦25,000</span>
                       </span>
                       <span className="text-sm text-slate-500 mt-1 block">Private car pickup from Dubai International Airport.</span>
                     </div>
                   </label>

                   <label className="flex items-start cursor-pointer group p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                     <input type="checkbox" className="w-5 h-5 text-blue-900 rounded border-slate-300 mt-1 focus:ring-blue-900" />
                     <div className="ml-4 flex-1">
                       <span className="font-bold text-slate-800 block group-hover:text-blue-900 flex justify-between">
                         <span>Premium Dining Package</span>
                         <span>+₦50,000</span>
                       </span>
                       <span className="text-sm text-slate-500 mt-1 block">Includes daily buffet dinner at the hotel's main restaurant.</span>
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
                  {couponApplied && <p className="text-emerald-600 font-bold text-sm mt-3 flex items-center"><Check className="w-4 h-4 mr-1" /> Coupon APPLIED (-10% OFF)</p>}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="font-bold text-slate-800 text-lg">Secure Your Room</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      
                      <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-xl border-2 flex items-center transition-all text-left ${paymentMethod === 'card' ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'border-blue-900' : 'border-slate-300'}`}>
                          {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>}
                        </div>
                        <div>
                          <div className={`font-bold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-800'}`}>Pay Full Amount Now</div>
                          <div className="text-sm text-slate-500 mt-0.5">Secure confirmation instantly</div>
                        </div>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('hold')}
                        className={`w-full p-4 rounded-xl border-2 flex items-center transition-all text-left ${paymentMethod === 'hold' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                      >
                         <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${paymentMethod === 'hold' ? 'border-amber-500' : 'border-slate-300'}`}>
                          {paymentMethod === 'hold' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold flex items-center ${paymentMethod === 'hold' ? 'text-amber-700' : 'text-slate-800'}`}>
                            Reserve Room (Pay Later) <Clock className="w-4 h-4 ml-2" />
                          </div>
                          <div className="text-sm text-slate-500 mt-0.5">Hold this room without payment today. Card details required to guarantee reservation.</div>
                        </div>
                      </button>

                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in space-y-4">
                      {paymentMethod === 'hold' && (
                        <div className="bg-blue-50 text-blue-900 text-sm p-3 rounded-lg mb-4 font-medium">
                          Your card will not be charged today. It is only required to secure the booking.
                        </div>
                      )}
                      <input type="text" placeholder="Cardholder Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 tracking-widest" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                        <input type="text" placeholder="CVV" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>
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
              ) : (
                <button onClick={() => navigate('/contact')} className="px-8 py-3.5 font-bold text-white bg-blue-900 rounded-xl hover:bg-blue-800 shadow-lg flex items-center transition-all">
                  {paymentMethod === 'hold' ? 'Confirm Reservation' : 'Complete Booking'} <ShieldCheck className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
            
          </main>

          {/* Sidebar Summary */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <div className="h-32 relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80')" }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white">
                 <h3 className="font-bold text-xl leading-tight">The Ritz-Carlton</h3>
                 <p className="text-xs text-blue-200 mt-1">Dubai, UAE</p>
               </div>
              </div>
              
              <div className="p-6 bg-slate-50">
                <div className="flex items-center font-bold text-slate-800 text-sm mb-4">
                  <BedDouble className="w-4 h-4 text-amber-500 mr-2" /> Deluxe Ocean View Room
                </div>
                
                <div className="space-y-3 mb-4 border-b border-slate-200 pb-4">
                  <div className="flex justify-between text-sm text-slate-600 font-medium">
                    <span>5 Nights</span><span className="text-slate-800 font-bold">₦625,000</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 font-medium">
                    <span>Taxes & Fees</span><span className="text-slate-800 font-bold">₦75,000</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm text-emerald-600 font-medium">
                      <span>Promo Code Applied</span><span>-₦70,000</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end mb-4">
                  <span className="font-black text-slate-800 text-lg">Total</span>
                  <span className="text-3xl font-black text-blue-900">₦{couponApplied ? '630,000' : '700,000'}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4" /> <span>Secure Booking</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default HotelCheckout;