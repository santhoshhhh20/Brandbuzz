import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { BeeIcon } from './BeeIcon';

export const CTASection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] py-32 md:py-44 bg-black border-b border-white/10 flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background Subtle Ambient Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50 z-0" />

      {/* Decorative Crosshair Marks */}
      <div className="absolute top-12 left-12 font-mono text-[10px] text-white/30 hidden md:block">
        + 12.9716° N , 77.5946° E
      </div>
      <div className="absolute top-12 right-12 font-mono text-[10px] text-white/30 hidden md:block">
        EDITION • 2026
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/20 mb-8 text-[11px] font-mono tracking-[0.3em] uppercase text-[#a3a3a3]">
          <BeeIcon size={14} className="text-white" />
          <span>FINAL CINEMATIC DIRECTIVE</span>
        </div>

        {/* Dramatic Large White Headline */}
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.88] text-white mb-8">
          READY TO MAKE<br />
          <span className="font-serif italic font-normal text-white/90 underline decoration-white/20 underline-offset-8">
            SOME NOISE
          </span>
          <span className="text-white/40">?</span>
        </h2>

        {/* Supporting text from prompt */}
        <p className="text-lg sm:text-2xl font-light text-[#a3a3a3] max-w-2xl leading-relaxed mb-12">
          “Tell us about your brand, your idea, or your next campaign.”
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#e5e5e5] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-95"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>

          <a
            href={`tel:${BRAND_INFO.phoneRaw}`}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-white/25 text-white font-display font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/5"
          >
            <Phone size={16} className="text-white/70" />
            <span>CALL US: {BRAND_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
