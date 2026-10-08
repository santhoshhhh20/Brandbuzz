import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';
import { BeeIcon } from './BeeIcon';

export const Marquee: React.FC = () => {
  // Duplicate array multiple times for seamless infinite loop
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full py-6 sm:py-8 bg-black border-y border-white/15 overflow-hidden select-none">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee whitespace-nowrap items-center hover:[animation-play-state:paused]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center mx-4 sm:mx-6 group cursor-default">
            <span className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-white/80">
              {item}
            </span>
            <span className="mx-6 text-white/30 text-xs flex items-center justify-center">
              {index % 2 === 0 ? (
                <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white inline-block" />
              ) : (
                <BeeIcon size={14} className="opacity-30 group-hover:opacity-80 transition-opacity" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
