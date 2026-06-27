import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Lock, User as UserIcon } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 px-4">
      <div className="w-full max-w-4xl bg-white md:rounded-3xl shadow-2xl flex overflow-hidden min-h-[600px] border border-slate-100">
        
        {/* Left Image Panel */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('[https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80](https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80)')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent" />
          <div className="absolute bottom-12 left-10 right-10 text-white">
            <div className="bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-4">Aeropoint Club</div>
            <h2 className="text-3xl lg:text-4xl font-black mb-3 leading-tight tracking-tight">Unlock the World.</h2>
            <p className="text-blue-100 text-sm leading-relaxed font-medium">Join Aeropoint Express to access exclusive member deals, manage your bookings effortlessly, and earn miles on every journey.</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Form Header */}
          <div className="flex justify-center mb-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-900 p-2.5 rounded-xl group-hover:bg-amber-500 transition-colors duration-300">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight text-blue-950">
                AERO<span className="text-amber-500">POINT</span>
              </span>
            </Link>
          </div>

          <div className="flex space-x-4 border-b border-slate-100 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`pb-4 flex-1 text-sm font-black text-center transition-colors uppercase tracking-wider ${isLogin ? 'text-blue-900 border-b-2 border-blue-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`pb-4 flex-1 text-sm font-black text-center transition-colors uppercase tracking-wider ${!isLogin ? 'text-blue-900 border-b-2 border-blue-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Create Account
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative">
                <UserIcon className="w-5 h-5 absolute top-3.5 left-4 text-slate-400" />
                <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 transition-shadow" />
              </div>
            )}
            
            <div className="relative">
              <Mail className="w-5 h-5 absolute top-3.5 left-4 text-slate-400" />
              <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 transition-shadow" />
            </div>

            <div className="relative">
              <Lock className="w-5 h-5 absolute top-3.5 left-4 text-slate-400" />
              <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-bold text-slate-800 transition-shadow" />
            </div>

            {isLogin && (
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-amber-500 transition-colors">Forgot Password?</a>
              </div>
            )}

            <button className="w-full bg-blue-900 hover:bg-blue-950 text-white font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 mt-6">
              {isLogin ? 'Sign In Securely' : 'Join Aeropoint'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500 font-medium">
            By continuing, you agree to Aeropoint's <br/><a href="#" className="font-bold text-blue-900 hover:text-amber-500 transition-colors">Terms of Service</a> and <a href="#" className="font-bold text-blue-900 hover:text-amber-500 transition-colors">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
