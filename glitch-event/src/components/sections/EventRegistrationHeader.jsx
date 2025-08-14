import React from 'react';

import logo from '../../assets/ctrlcreate@3x.png'
const EventRegistrationHeader = () => {
  return (
    <section className="bg-[#0D0E20] py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-10 flex justify-center">
          <div className="relative group">
            <img
              src={logo}
              alt="Glitch Logo"
              width={238}
              height={62}
              className="object-contain cursor-pointer"
            />
          
            <div className="absolute -bottom-0 right-0 bg-gray-800/80 text-gray-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
              Made by Leon Tom Vechoor
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-6">
          <p className="text-gray-300 text-lg md:text-2xl leading-relaxed" style={{fontFamily:'neopixel'}}>
        A 30-day game development challenge to bring your ideas to life. Take on the competition and rise through the leaderboard, with mentors available to guide you and clear your doubts. Exciting prizes await at the top!
          </p>
        </div>

        
      </div>
    </section>
  );
};

export default EventRegistrationHeader;
