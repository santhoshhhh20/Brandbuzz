import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-[#050505] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-16 text-xs font-mono tracking-widest text-[#737373]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="text-white font-medium">06 — CLIENT LOVE</span>
          </div>
          <span>PRAISE & REPUTATION</span>
        </div>

        {/* Minimal High-End Empty State Container */}
        <div className="relative border border-white/15 bg-white/[0.015] p-10 md:p-20 overflow-hidden">
          {/* Subtle Background Watermark Typography */}
          <div className="absolute right-0 bottom-0 select-none pointer-events-none translate-x-12 translate-y-12 opacity-5 font-display text-[14vw] font-black uppercase text-white">
            BUZZ
          </div>

          <div className="max-w-3xl relative z-10">
            {/* Editorial Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono tracking-[0.25em] text-[#a3a3a3] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              <span>TESTIMONIAL ARCHIVE IN DEVELOPMENT</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95] text-white mb-6">
              GOOD WORK<br />
              <span className="font-serif italic font-normal text-white/90">
                DESERVES GOOD WORDS
              </span>
              <span className="text-white/40">.</span>
            </h2>

            {/* Subtext from prompt */}
            <p className="font-serif italic text-xl sm:text-2xl text-[#a3a3a3] mb-8 border-l border-white/30 pl-6 py-1">
              “Client stories and testimonials coming soon.”
            </p>

            <p className="text-sm font-mono text-[#737373] uppercase tracking-wider mb-10 max-w-lg">
              WE ARE CURRENTLY COLLABORATING WITH OUR PARTNERS ON THEIR INITIAL LAUNCH RESULTS AND CASE-STUDY REVIEWS.
            </p>

            {/* CTA to partner */}
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-[#e5e5e5] transition-colors"
            >
              <span>BECOME OUR NEXT SUCCESS STORY</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Wireframe Placeholder Preview Cards below to make section visually rich */}
          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="border border-dashed border-white/15 p-6 flex flex-col justify-between h-40">
                <span className="font-mono text-[10px] text-[#525252] tracking-widest uppercase">
                  SLOT 0{slot} • CASE ARCHIVE
                </span>
                <p className="font-serif italic text-sm text-[#737373]">
                  Reserved for upcoming verified campaign metric & review.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/10" />
                  <span className="font-mono text-[9px] text-[#525252] uppercase tracking-wider">
                    PARTNER CASE PENDING
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
