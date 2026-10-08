import React from 'react';
import { PROCESS_STAGES } from '../data/content';
import { ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#050505] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-16 text-xs font-mono tracking-widest text-[#737373]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="text-white font-medium">04 — OUR APPROACH</span>
          </div>
          <span>EXECUTION METHODOLOGY</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-20">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.95] text-white">
            IDEA <span className="font-serif italic font-normal text-white/50">→</span> CREATE <span className="font-serif italic font-normal text-white/50">→</span><br />
            CONNECT <span className="font-serif italic font-normal text-white/50">→</span> <span className="font-serif italic font-normal text-white underline decoration-white/30 underline-offset-8">GROW</span>
            <span className="text-white/40">.</span>
          </h2>
        </div>

        {/* Four Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="group relative flex flex-col justify-between p-8 border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40 transition-all duration-300 min-h-[320px]"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-2xl font-bold text-white/40 group-hover:text-white transition-colors">
                  {stage.step}
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#737373]">
                  PHASE 0{idx + 1}
                </span>
              </div>

              {/* Middle Title & Subtitle */}
              <div className="my-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2 group-hover:translate-x-1 transition-transform">
                  {stage.title}
                </h3>
                <p className="font-mono text-xs text-[#a3a3a3] uppercase tracking-wider mb-4">
                  {stage.subtitle}
                </p>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Bottom Step Arrow */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#737373] group-hover:text-white transition-colors">
                <span>STAGE 0{idx + 1}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
