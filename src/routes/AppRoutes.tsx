import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Flights from '../pages/Flights';
import Hotels from '../pages/Hotels';
import Packages from '../pages/Packages';
import Visas from '../pages/Visas';
import Umrah from '../pages/Umrah';
import Contact from '../pages/Contact';

// New Pages
import FlightSearchResults from '../pages/FlightSearchResults';
import FlightCheckout from '../pages/FlightCheckout';
import HotelSearchResults from '../pages/HotelSearchResults';
import HotelCheckout from '../pages/HotelCheckout';
import Auth from '../pages/Auth';

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
          <Route path="/hotels/checkout" element={<HotelCheckout />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/visas" element={<Visas />} />
          <Route path="/umrah" element={<Umrah />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
