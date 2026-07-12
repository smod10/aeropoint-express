import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Headset, Phone, MessageCircle, Mail, User } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  
  // Apply transparent navbar logic to all relevant landing and search pages
  const transparentRoutes = ['/', '/flights', '/flights/search', '/hotels', '/hotels/search', '/packages', '/umrah'];
  const isTransparentTop = transparentRoutes.includes(location.pathname);
  const solidNav = isScrolled || mobileMenuOpen || !isTransparentTop;

  const links = [
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Packages', path: '/packages' },
    { name: 'Visas', path: '/visas' },
    { name: 'Hajj & Umrah', path: '/umrah' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${solidNav ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="bg-blue-900 p-2 rounded-lg">
            <Plane className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <span className={`text-2xl font-black tracking-tight ${solidNav ? 'text-blue-950' : 'text-white'}`}>
            AERO<span className="text-amber-500">POINT</span>
          </span>
        </Link>

        <div className="hidden lg:flex space-x-8 items-center">
          {links.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`font-medium text-sm transition-colors hover:text-amber-500 ${solidNav ? (location.pathname === item.path ? 'text-amber-500 font-bold' : 'text-slate-700') : 'text-white/90'} ${!solidNav && location.pathname === item.path ? 'text-amber-400' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link 
            to="/auth" 
            className={`flex items-center font-bold py-2.5 px-6 rounded-full transition-all shadow-sm ${solidNav ? 'bg-amber-500 text-blue-950 hover:bg-amber-600' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30'}`}
          >
            <User className="w-4 h-4 mr-2" /> My Account
          </Link>
        </div>

        <button 
          className="lg:hidden z-50 p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className={`w-6 h-6 ${solidNav ? 'text-slate-800' : 'text-white'}`} /> : 
            <Menu className={`w-6 h-6 ${solidNav ? 'text-slate-800' : 'text-white'}`} />
          }
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 shadow-2xl lg:hidden flex flex-col overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {[{name: 'Home', path: '/'}, ...links].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-semibold text-left border-b pb-2 ${location.pathname === item.path ? 'text-amber-500 border-amber-500' : 'text-slate-800 border-slate-100'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Need Help Flyer (Mobile Menu) */}
          <div className="bg-slate-50 rounded-2xl p-5 mt-8 border border-slate-100 shrink-0">
            <h4 className="font-black text-blue-950 mb-4 flex items-center">
              <Headset className="w-5 h-5 mr-2 text-amber-500" /> Need Help?
            </h4>
            <div className="space-y-4 text-sm font-semibold text-slate-600">
              <a href="tel:+2348000000000" className="flex items-center hover:text-blue-900 transition-colors">
                <Phone className="w-4 h-4 mr-3 text-slate-400" /> +234 800 000 0000
              </a>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center hover:text-blue-900 transition-colors">
                <MessageCircle className="w-4 h-4 mr-3 text-slate-400" /> WhatsApp Us
              </Link>
              <a href="mailto:support@aeropoint.com" className="flex items-center hover:text-blue-900 transition-colors">
                <Mail className="w-4 h-4 mr-3 text-slate-400" /> support@aeropoint.com
              </a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 mt-8 mb-4">
            <Link 
              to="/auth" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-amber-500 text-blue-950 font-bold rounded-xl shadow-lg flex items-center justify-center transition-colors hover:bg-amber-600"
            >
              <User className="w-5 h-5 mr-2" /> My Account
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;