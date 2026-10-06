import React from 'react';

const HeroSection: React.FC = () => (
  <div className="relative h-[460px] sm:h-[560px] lg:h-[640px] w-full flex items-center justify-center overflow-hidden bg-blue-900">
    <div className="relative z-10 text-center px-4 mt-[-60px] lg:mt-[-150px]">
      <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-4 border border-white/30 shadow-sm">
        Premium Travel Experience
      </span>
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3 sm:mb-6">
        Your Journey <br className="hidden md:block"/> Starts <span className="text-amber-500">Here</span>.
      </h1>
      <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mx-auto font-light">
        Book flights, comfortable stays, curated tours, and streamlined visa services worldwide.
      </p>
    </div>
  </div>
);

export default HeroSection;
