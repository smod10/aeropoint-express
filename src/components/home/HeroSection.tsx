import React from 'react';

const HeroSection: React.FC = () => (
  <div className="relative h-[560px] lg:h-[640px] w-full flex items-center justify-center overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
      style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/50 to-slate-50/90" />
    <div className="relative z-10 text-center px-4 mt-[-120px] lg:mt-[-150px]">
      <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-4 border border-white/30 shadow-sm">
        Premium Travel Experience
      </span>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
        Your Journey <br className="hidden md:block"/> Starts <span className="text-amber-500">Here</span>.
      </h1>
      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light drop-shadow-md">
        Book flights, luxury hotels, exclusive holiday packages, and streamlined visa services worldwide.
      </p>
    </div>
  </div>
);

export default HeroSection;
