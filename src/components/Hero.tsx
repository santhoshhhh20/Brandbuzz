import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { BRAND_INFO, MARQUEE_ITEMS } from '../data/content';
import { Button } from '@/components/ui/button';
import { HoldToConfirm } from '@/components/ui/hold-to-confirm';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-28 xs:pt-32 sm:pt-36 pb-6 sm:pb-8 bg-white overflow-hidden border-b border-gray-100 flex flex-col justify-between"
    >
      {/* Subtle Top Ambient Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-gradient-to-b from-gray-100/60 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Single-View Content Container */}
      <div className="max-w-6xl mx-auto px-4 xs:px-6 sm:px-8 w-full relative z-10 my-auto py-2 sm:py-4">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200/80 mb-5 text-[11px] font-mono tracking-[0.2em] text-gray-600 uppercase mt-2 sm:mt-0">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          <span>{BRAND_INFO.agencyType}</span>
        </div>

        {/* Headline: Clean, Punchy & Balanced */}
        <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-black uppercase max-w-5xl mb-6 break-words">
          BUZZ YOUR <span className="font-serif italic font-normal text-gray-800">BRAND</span><br />
          EVERYWHERE<span className="text-gray-300">.</span>
        </h1>

        {/* Supporting Description */}
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8">
          {BRAND_INFO.heroDescription}
        </p>

        {/* CTA Buttons in Immediate Single View */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
          <HoldToConfirm
            onConfirm={() => scrollTo('#contact')}
            confirmLabel="STARTING..."
            duration={1000}
            variant="dark"
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest px-8 py-3.5 h-13 sm:h-12 rounded-full shadow-sm hover:shadow-md transition-all justify-center flex items-center"
          >
            <span className="flex items-center justify-center gap-2">
              <span>START A PROJECT</span>
              <ArrowRight size={14} />
            </span>
          </HoldToConfirm>

          <Button
            variant="outline"
            onClick={() => scrollTo('#services')}
            className="w-full sm:w-auto border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 font-mono text-xs uppercase tracking-widest px-8 py-3.5 h-13 sm:h-12 rounded-full transition-all justify-center flex items-center"
          >
            <span>OUR SERVICES</span>
            <ArrowDown size={14} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Clean Bottom Ticker Banner Pinned to Viewport Bottom */}
      <div className="w-full pt-4 pb-2 border-t border-gray-100 overflow-hidden relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <div className="flex w-max animate-marquee whitespace-nowrap items-center select-none text-[11px] font-mono uppercase tracking-[0.25em] text-gray-400">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={idx} className="flex items-center mx-5">
                <span className="hover:text-black transition-colors">{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-5" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
