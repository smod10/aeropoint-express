import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import brandLogo from '../assets/aeropoint-express-logo.svg';
import { contactInfo } from '../data/contactInfo';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
  <footer className="bg-[#2B184E] text-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
      <div className="flex flex-col space-y-4">
        <Link to="/" className="mb-2 inline-flex w-fit rounded-md bg-white px-2 py-1" aria-label="Aeropoint Express home">
          <img src={brandLogo} alt="Aeropoint Express Travel Ltd" className="h-auto w-[220px]" />
        </Link>
        <p className="text-sm leading-relaxed text-slate-300">
          Your trusted partner for global travel, specializing in premium flights, luxury stays, and seamless Umrah packages.
        </p>
        <div className="space-y-2 text-xs leading-relaxed text-[#D7C4F0]">
          <a href={contactInfo.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone className="h-3.5 w-3.5 shrink-0" />{contactInfo.phone}</a>
          <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-3.5 w-3.5 shrink-0" />WhatsApp us</a>
          <a href={contactInfo.emailHref} className="flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5 shrink-0" />{contactInfo.email}</a>
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{contactInfo.address}</p>
        </div>
        <div className="flex items-center gap-3 pt-2" aria-label="Aeropoint social media">
          {[
            { label: 'Facebook', href: 'https://www.facebook.com/aeropointexpress', Icon: FaFacebookF },
            { label: 'Instagram', href: 'https://www.instagram.com/aeropointexpress', Icon: FaInstagram },
            { label: 'TikTok', href: 'https://www.tiktok.com/@aeropointexpress', Icon: FaTiktok },
            { label: 'X / Twitter', href: 'https://x.com/aeropointexpress', Icon: FaXTwitter },
            { label: 'YouTube', href: 'https://www.youtube.com/@aeropointexpress', Icon: FaYoutube },
          ].map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-amber-500 hover:text-amber-400">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Services</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/flights" className="hover:text-amber-500 transition-colors">Flight Booking</Link></li>
          <li><Link to="/hotels" className="hover:text-amber-500 transition-colors">Hotel Reservations</Link></li>
          <li><Link to="/umrah" className="hover:text-amber-500 transition-colors">Hajj & Umrah Packages</Link></li>
          <li><Link to="/visas" className="hover:text-amber-500 transition-colors">Visa Applications</Link></li>
          <li><Link to="/study" className="hover:text-amber-500 transition-colors">Study Abroad</Link></li>
          <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Travel Blog</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Support</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/faq" className="hover:text-amber-500 transition-colors">FAQs</Link></li>
          <li><Link to="/flights/search" className="hover:text-amber-500 transition-colors">Manage Booking</Link></li>
          <li><Link to="/cancellations" className="hover:text-amber-500 transition-colors">Cancellations & Refunds</Link></li>
          <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
          <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Newsletter</h4>
        <p className="text-sm text-slate-300 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <div className="flex">
          <input type="email" placeholder="Enter your email" className="bg-[#21143B] text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-full" />
          <button onClick={() => navigate('/contact')} className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-r-lg font-bold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-[#D7C4F0]">
      <p>&copy; {new Date().getFullYear()} Aeropoint Express. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;