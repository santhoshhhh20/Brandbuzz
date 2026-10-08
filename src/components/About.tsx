import React from 'react';
import { BRAND_INFO } from '../data/content';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-14 text-xs font-mono tracking-widest text-gray-500">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-black rounded-none" />
            <span className="text-black font-semibold">02 — ABOUT BRANDBUZZ</span>
          </div>
          <span>VISION & LEADERSHIP</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-black mb-6 leading-[0.95]">
            WE DON'T JUST CREATE CONTENT.<br />
            <span className="font-serif italic font-normal text-gray-800">
              WE CREATE ATTENTION
            </span>
            <span className="text-gray-300">.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
            {BRAND_INFO.aboutParagraph1}
          </p>
        </div>

        {/* Split Grid: Clean Story + Founder Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {BRAND_INFO.aboutParagraph2}
            </p>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500 block">
                    FOUNDER & CREATIVE LEAD
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-black mt-0.5">
                    {BRAND_INFO.founder.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-mono text-gray-600">
                  EST. 2026
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                “{BRAND_INFO.founder.bio1}”
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {BRAND_INFO.founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white border border-gray-200 font-mono text-[10px] tracking-wider text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"
                alt="Brandbuzz Creative Leadership"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-80 block">DIRECTOR'S ARCHIVE</span>
                <p className="font-display text-xl font-bold uppercase">{BRAND_INFO.founder.name}</p>
                <p className="font-mono text-xs opacity-80">{BRAND_INFO.founder.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
