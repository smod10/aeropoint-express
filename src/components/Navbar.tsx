import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Headset, Phone, MessageCircle, Mail, User, UserRound, LogOut } from 'lucide-react';
import brandLogo from '../assets/aeropoint-express-logo.png';
import brandLogoWhite from '../assets/aeropoint-express-logo-white.png';
import { contactInfo } from '../data/contactInfo';

interface NavbarProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignedIn = Boolean(sessionStorage.getItem('aeropointCustomerEmail'));
  
  // Apply transparent navbar logic to all relevant landing and search pages
  const transparentRoutes = ['/', '/flights', '/flights/search', '/hotels', '/hotels/search', '/packages', '/umrah'];
  const isTransparentTop = transparentRoutes.includes(location.pathname);
  const solidNav = isScrolled || mobileMenuOpen || !isTransparentTop;

  const links = [
    { name: 'Flights', path: '/flights' },
    { name: 'Stays', path: '/hotels' },
    { name: 'Visas', path: '/visas' },
    { name: 'Study', path: '/study' },
    { name: 'Hajj & Umrah', path: '/umrah' },
    { name: 'Tours', path: '/packages' }
  ];

  const signOut = () => {
    sessionStorage.removeItem('aeropointCustomerEmail');
    sessionStorage.removeItem('aeropointCustomerName');
    sessionStorage.removeItem('aeropointCustomerPhone');
    sessionStorage.removeItem('aeropointCustomerCity');
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${solidNav ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className={`z-50 inline-flex items-center ${solidNav ? 'rounded-md bg-white px-2 py-1 shadow-sm' : ''}`} aria-label="Aeropoint Express home">
          <img src={solidNav ? brandLogo : brandLogoWhite} alt="Aeropoint Express Travel Ltd" className="h-auto w-[150px] sm:w-[190px]" />
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
            to="/dashboard" 
            className={`flex items-center font-bold py-2.5 px-6 rounded-full transition-all shadow-sm ${solidNav ? 'bg-amber-500 text-blue-950 hover:bg-amber-600' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30'}`}
          >
            <User className="w-4 h-4 mr-2" /> My Account
          </Link>
        </div>

        <div className="z-50 flex items-center gap-1 lg:hidden">
          {isSignedIn && <Link to="/dashboard/profile" aria-label="Profile" title="Profile" className={`rounded-md p-2 ${solidNav ? 'text-slate-800' : 'text-white'}`}><UserRound className="h-5 w-5" /></Link>}
          <button
            className="rounded-md p-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ?
              <X className={`w-6 h-6 ${solidNav ? 'text-slate-800' : 'text-white'}`} /> :
              <Menu className={`w-6 h-6 ${solidNav ? 'text-slate-800' : 'text-white'}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white px-5 pb-4 pt-20 shadow-2xl lg:hidden flex flex-col overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {[{name: 'Home', path: '/'}, ...links].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold text-left border-b pb-1 ${location.pathname === item.path ? 'text-amber-500 border-amber-500' : 'text-slate-800 border-slate-100'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex shrink-0 items-center gap-3">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 font-bold text-blue-950 transition-colors hover:bg-amber-600">
              <User className="h-5 w-5" /> My Account
            </Link>
            {isSignedIn && <button type="button" onClick={signOut} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-900 hover:text-blue-900"><LogOut className="h-4 w-4" /> Sign Out</button>}
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mt-5 border border-slate-100 shrink-0">
            <h4 className="font-black text-blue-950 mb-3 flex items-center">
              <Headset className="w-5 h-5 mr-2 text-amber-500" /> Need Help?
            </h4>
            <div className="space-y-2.5 text-xs font-semibold text-slate-600">
              {contactInfo.phones.map((phone) => <a key={phone.number} href={phone.href} className="flex items-center hover:text-blue-900 transition-colors"><Phone className="w-4 h-4 mr-2 text-slate-400" /> {phone.number}</a>)}
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-900 transition-colors">
                <MessageCircle className="w-4 h-4 mr-2 text-slate-400" /> WhatsApp Us
              </a>
              <a href={contactInfo.emailHref} className="flex items-center hover:text-blue-900 transition-colors">
                <Mail className="w-4 h-4 mr-2 text-slate-400" /> {contactInfo.email}
              </a>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;