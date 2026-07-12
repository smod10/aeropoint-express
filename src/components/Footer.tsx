import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
      <div className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <div className="bg-blue-800 p-1.5 rounded-md">
            <Plane className="w-5 h-5 text-white transform -rotate-45" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            AERO<span className="text-amber-500">POINT</span>
          </span>
        </Link>
        <p className="text-sm leading-relaxed text-slate-400">
          Your trusted partner for global travel, specializing in premium flights, luxury stays, and seamless Umrah packages.
        </p>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Services</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/flights" className="hover:text-amber-500 transition-colors">Flight Booking</Link></li>
          <li><Link to="/hotels" className="hover:text-amber-500 transition-colors">Hotel Reservations</Link></li>
          <li><Link to="/umrah" className="hover:text-amber-500 transition-colors">Hajj & Umrah Packages</Link></li>
          <li><Link to="/visas" className="hover:text-amber-500 transition-colors">Visa Applications</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Support</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Help Center</Link></li>
          <li><Link to="/flights/search" className="hover:text-amber-500 transition-colors">Manage Booking</Link></li>
          <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Cancellation Policy</Link></li>
          <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Newsletter</h4>
        <p className="text-sm text-slate-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <div className="flex">
          <input type="email" placeholder="Enter your email" className="bg-slate-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-full" />
          <button onClick={() => navigate('/contact')} className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-r-lg font-bold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
      <p>&copy; {new Date().getFullYear()} Aeropoint Express. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;