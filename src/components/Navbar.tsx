import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  // Ensure transparent nav on Home, Flights, and Search Results pages
  const isTransparentTop = location.pathname === '/' || location.pathname === '/flights' || location.pathname === '/flights/search';
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
          <button className={`font-medium text-sm transition-colors hover:text-amber-500 ${solidNav ? 'text-slate-700' : 'text-white'}`}>
            Log in
          </button>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 px-6 rounded-full shadow-lg shadow-amber-500/30 transition-transform hover:-translate-y-0.5">
            Sign Up
          </button>
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
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 shadow-2xl lg:hidden flex flex-col space-y-6">
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
          <div className="flex flex-col space-y-3 mt-auto">
            <button className="w-full py-3 text-blue-900 font-semibold border border-blue-900 rounded-lg">Log in</button>
            <button className="w-full py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-lg">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

