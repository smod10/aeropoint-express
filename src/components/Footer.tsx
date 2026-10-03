import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import brandLogo from '../assets/aeropoint-express-logo-white.svg';
import { contactInfo } from '../data/contactInfo';

const Footer: React.FC = () => {
  return (
  <footer className="bg-[#2B184E] text-slate-200 pt-16 pb-28 px-4 sm:px-6 lg:px-8 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 items-start gap-10 border-b border-white/10 pb-12 mb-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <div className="flex min-w-0 flex-col items-start space-y-5">
        <Link to="/" className="inline-flex w-fit" aria-label="Aeropoint Express home">
          <img src={brandLogo} alt="Aeropoint Express Travel Ltd" className="h-auto w-[220px] max-w-full" />
        </Link>
        <p className="max-w-sm text-sm leading-relaxed text-slate-300">
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

      <div className="min-w-0">
        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact</h4>
        <div className="space-y-4 text-sm leading-relaxed text-[#D7C4F0]">
          <a href={contactInfo.phoneHref} className="flex items-start gap-3 break-words hover:text-white"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{contactInfo.phone}</a>
          <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />WhatsApp</a>
          <a href={contactInfo.emailHref} className="flex items-start gap-3 break-all hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{contactInfo.email}</a>
          <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{contactInfo.address}</p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-b border-white/10 pb-8 mb-8">
      <h4 className="text-center text-xs font-bold uppercase tracking-wider text-[#D7C4F0]">Accreditation, membership & booking platforms</h4>
      <div className="mt-5 grid grid-cols-2 items-center gap-3 sm:grid-cols-4 sm:gap-5">
        <a href="https://www.iata.org/en/services/travel-agency-program/accreditation-travel/" target="_blank" rel="noreferrer" className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-md bg-white px-3 py-3 text-center text-xs font-semibold text-[#2B184E]" aria-label="IATA Accredited Agent information">
          <img src="https://www.iata.org/contentassets/3e83770142a040d688e269bb2f709b7b/iata-logo-header.svg?height=127" alt="IATA" className="h-9 max-w-full object-contain" />
          <span>Accredited Agent</span>
        </a>
        <a href="https://www.nanta.org.ng/membership" target="_blank" rel="noreferrer" className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-md bg-white px-3 py-3 text-center text-xs font-semibold text-[#2B184E]" aria-label="NANTA member">
          <img src="https://www.nanta.org.ng/images/general/Logo_image.jpg" alt="NANTA" className="h-9 max-w-full object-contain" />
          <span>Member</span>
        </a>
        <a href="https://www.sabre.com/" target="_blank" rel="noreferrer" className="flex min-h-20 items-center justify-center rounded-md bg-white px-3 py-3" aria-label="Sabre booking platform">
          <img src="https://www.sabre.com/app/uploads/2025/10/sabre_logo_black.png" alt="Sabre" className="max-h-10 max-w-full object-contain" />
        </a>
        <a href="https://www.travelport.com/" target="_blank" rel="noreferrer" className="flex min-h-20 items-center justify-center rounded-md bg-white px-3 py-3" aria-label="Travelport booking platform">
          <img src="https://www.travelport.com/travelport-logo-footer.svg" alt="Travelport" className="max-h-10 max-w-full object-contain" />
        </a>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col gap-5 text-xs text-[#D7C4F0] md:flex-row md:items-center md:justify-between">
      <p>&copy; {new Date().getFullYear()} Aeropoint Express. All rights reserved.</p>
      <div className="flex flex-wrap items-center gap-3" aria-label="Aeropoint social media">
        {[
          { label: 'Facebook', href: 'https://www.facebook.com/aeropointexpress', Icon: FaFacebookF },
          { label: 'Instagram', href: 'https://www.instagram.com/aeropointexpress', Icon: FaInstagram },
          { label: 'TikTok', href: 'https://www.tiktok.com/@aeropointexpress', Icon: FaTiktok },
          { label: 'X / Twitter', href: 'https://x.com/aeropointexpress', Icon: FaXTwitter },
          { label: 'YouTube', href: 'https://www.youtube.com/@aeropointexpress', Icon: FaYoutube },
        ].map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-200 transition hover:border-amber-500 hover:text-amber-400">
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
  );
};

export default Footer;