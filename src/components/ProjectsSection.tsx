import React from 'react';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';
import { Sparkles, ArrowRight } from 'lucide-react';

const PROJECT_IMAGES = [
  {
    src: "/projects/brandbuzz-agency.jpg",
    alt: "Brandbuzz Creative Marketing Agency",
  },
  {
    src: "/projects/zenboyz-logo.png",
    alt: "Zenboyz Event & Decors Brand Identity",
  },
  {
    src: "/projects/sss-wirecut-brick.jpg",
    alt: "SSS Wirecut Bricks Brand Campaign",
  },
  {
    src: "/projects/stc-college-logo.png",
    alt: "STC College Visual Identity",
  },
  {
    src: "/projects/ds-juice.jpg",
    alt: "DS Juice Udumalpet Restaurant Content",
  },
  {
    src: "/projects/vekara-fashion-logo.png",
    alt: "Vekara Creator of Fashion Brand Identity",
  },
  {
    src: "/projects/vekara-menswear.jpg",
    alt: "Vekara Men's Branded Wear Showroom",
  },
  {
    src: "/projects/ds-juice-logo.png",
    alt: "DS Juice Quality Speaks Brand Identity",
  },
  {
    src: "/projects/zenboyz-decor.jpg",
    alt: "Zenboyz Event & Wedding Decorators",
  },
  {
    src: "/projects/sss-wirecut-bricks-logo.png",
    alt: "SSS Wirecut Bricks Official Brand Logo",
  },
];

export const ProjectsSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="hidden md:block py-24 md:py-32 bg-white border-b border-gray-100 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-12">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-14 text-xs font-mono tracking-widest text-gray-500">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-black rounded-none" />
            <span className="text-black font-semibold">02 — SELECTED WORK</span>
          </div>
          <span>STREAMING PERSPECTIVE ARCHIVE</span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-black mb-4">
              BUILT TO BE<br />
              <span className="font-serif italic font-normal text-gray-800">SEEN</span>
              <span className="text-gray-300">.</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Continuous 3D corridor streaming our creative commercial shoots, product stills, and high-tempo vertical reels.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <Sparkles size={13} className="text-black animate-pulse" />
            <span>CONTINUOUS 3D STREAM</span>
          </div>
        </div>
      </div>

      {/* 3D Image Stream Corridor Animation */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <ImageStreamHero
          images={PROJECT_IMAGES}
          cards={10}
          speed={18}
          axis={52}
          className="h-[520px] sm:h-[600px] w-full rounded-2xl border border-neutral-900 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden"
        >
          {/* Narrative Overlay: Moved to the Top with Compact Sizing */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between pt-6 sm:pt-8 pb-8 px-6 text-center pointer-events-none">
            {/* Top Header Group: Small Refined Headline and Badge */}
            <div className="flex flex-col items-center gap-2 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-[0.2em] text-white uppercase shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>BRANDBUZZ PERSPECTIVE CORRIDOR</span>
              </div>

              <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                WORK THAT <span className="font-serif italic font-normal text-white/90">COMMANDS</span> ATTENTION<span className="text-neutral-500">.</span>
              </h3>

              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                COMMERCIAL PRODUCTIONS • VIRAL REELS • BRAND EXPERIENCES
              </p>
            </div>

            {/* Clear Center allowing 3D corridor cards to stream unobstructed */}
            <div className="flex-1" />

            {/* Bottom Interactive Trigger */}
            <div className="pointer-events-auto">
              <button
                type="button"
                onClick={scrollToContact}
                className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest font-semibold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                DISCUSS YOUR CAMPAIGN →
              </button>
            </div>
          </div>
        </ImageStreamHero>
      </div>

      {/* Bottom CTA Row */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 text-xs font-mono text-gray-500">
        <span>BRANDBUZZ CREATIVE DIRECTION • 2026 ARCHIVE</span>
        <button
          type="button"
          onClick={scrollToContact}
          className="group inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors uppercase tracking-wider font-semibold"
        >
          <span>START A PROJECT WITH US</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
