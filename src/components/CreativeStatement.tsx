import React from 'react';
import { BeeIcon } from './BeeIcon';
import { BRAND_INFO } from '../data/content';

export const CreativeStatement: React.FC = () => {
  return (
    <section className="relative py-32 md:py-44 bg-black border-b border-white/10 overflow-hidden select-none">
      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* Subtle Animated Minimal Sophisticated Bee traversing gracefully */}
      <div className="absolute inset-x-0 top-1/4 pointer-events-none overflow-hidden h-32">
        <div
          className="relative inline-flex items-center gap-3 text-white/70 animate-marquee"
          style={{ animationDuration: '28s' }}
        >
          {/* Subtle trajectory line */}
          <div className="w-48 h-[1px] border-b border-dashed border-white/20" />
          <div className="animate-subtle-float flex items-center gap-2">
            <BeeIcon size={26} glow className="text-white/80" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">BRANDBUZZ KINETIC</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Editorial Marker */}
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/15 mb-10 text-[10px] font-mono tracking-[0.3em] uppercase text-[#a3a3a3]">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          <span>EDITORIAL PHILOSOPHY • 00</span>
        </div>

        {/* Large White Typography */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.95] text-white max-w-5xl">
          YOUR BRAND HAS A STORY.<br />
          <span className="font-serif italic font-normal text-white/90">
            LET'S MAKE PEOPLE
          </span><br />
          STOP AND WATCH<span className="text-white/40">.</span>
        </h2>

        {/* Supporting statement */}
        <p className="mt-10 font-mono text-xs sm:text-sm text-[#737373] uppercase tracking-[0.25em] max-w-xl">
          IN AN ERA OF SCROLL FATIGUE, ONLY UNCOMPROMISING AESTHETICS COMMAND RESPECT.
        </p>

        {/* Subtle bee badge bottom */}
        <div className="mt-12 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-8 h-[1px] bg-white/20" />
          <BeeIcon size={18} className="text-white" />
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
      </div>
    </section>
  );
};
