import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BookingWidget from '../components/BookingWidget/BookingWidget';
import ServicesSection from '../components/home/ServicesSection';
import TrendingPackages from '../components/home/TrendingPackages';
import WhyChooseUs from '../components/home/WhyChooseUs';
import BlogSection from '../components/home/BlogSection';
import CustomerReviews from '../components/home/CustomerReviews';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BookingWidget />
      <ServicesSection />
      <TrendingPackages />
      <WhyChooseUs />
      <CustomerReviews />
      <BlogSection />
    </>
  );
};

export default Home;
