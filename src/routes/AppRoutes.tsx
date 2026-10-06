import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Flights from '../pages/Flights';
import Hotels from '../pages/Hotels';
import Packages from '../pages/Packages';
import Visas from '../pages/Visas';
import VisaApplication from '../pages/VisaApplication';
import Umrah from '../pages/Umrah';
import Contact from '../pages/Contact';
import Study from '../pages/Study';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import CancellationPolicy from '../pages/CancellationPolicy';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';

// Search Results & Checkouts
import FlightSearchResults from '../pages/FlightSearchResults';
import FlightCheckout from '../pages/FlightCheckout';
import HotelSearchResults from '../pages/HotelSearchResults';
import HotelDetails from '../pages/HotelDetails';
import HotelCheckout from '../pages/HotelCheckout';
import PackageDetails from '../pages/PackageDetails';
import PackageCheckout from '../pages/PackageCheckout';
import Auth from '../pages/Auth';
import CustomerDashboard from '../pages/CustomerDashboard.tsx';
import BookingDetails from '../pages/BookingDetails';
import EditProfile from '../pages/EditProfile';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/flights" element={<Flights />} />
          <Route path="/flights/search" element={<FlightSearchResults />} />
          <Route path="/flights/checkout" element={<FlightCheckout />} />

          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/search" element={<HotelSearchResults />} />
          <Route path="/hotels/details" element={<HotelDetails />} />
          <Route path="/hotels/checkout" element={<HotelCheckout />} />

          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/details" element={<PackageDetails />} />
          <Route path="/packages/details/:slug" element={<PackageDetails />} />
          <Route path="/packages/checkout" element={<PackageCheckout />} />

          <Route path="/visas" element={<Visas />} />
          <Route path="/visas/apply" element={<VisaApplication />} />
          <Route path="/umrah" element={<Umrah />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/study" element={<Study />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cancellations" element={<CancellationPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/dashboard/profile" element={<EditProfile />} />
          <Route path="/dashboard/bookings/:reference" element={<BookingDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;