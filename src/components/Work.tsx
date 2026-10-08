import React, { useState } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { PROJECTS } from '../data/content';
import { ProjectItem } from '../types';

interface WorkProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Brand Campaign', 'Social Media Campaign', 'Product Shoot', 'Event Coverage', 'Reel Campaign', 'Corporate Content'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="work" className="relative py-28 md:py-36 bg-[#050505] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-16 text-xs font-mono tracking-widest text-[#737373]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="text-white font-medium">03 — SELECTED WORK</span>
          </div>
          <span>EDITORIAL & COMMERCIAL ARCHIVE</span>
        </div>

        {/* Section Headline & Editorial Note */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-white">
              BUILT TO BE<br />
              <span className="font-serif italic font-normal text-white/90">SEEN</span>
              <span className="text-white/40">.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-mono text-xs text-[#a3a3a3] uppercase tracking-wider mb-2">
              PORTFOLIO FRAMEWORK • 2026
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Curated creative structures engineered for brand campaigns, product launches, event cinematography, and viral short-form media.
            </p>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/10">
          <Filter size={14} className="text-[#737373] mr-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                filter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#737373] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial / Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((project, index) => {
            const isTall = project.aspectRatio === 'tall';
            const isWide = project.aspectRatio === 'wide';

            return (
              <div
                key={project.id}
                data-cursor="view"
                onClick={() => onSelectProject && onSelectProject(project)}
                className={`group cursor-pointer flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Container with high contrast B&W styling */}
                <div
                  className={`relative w-full overflow-hidden bg-[#111111] border border-white/15 mb-4 group-hover:border-white/40 transition-colors duration-300 ${
                    isTall ? 'aspect-[3/4]' : isWide ? 'aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover editorial-img transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Badges */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-black/80 px-2 py-1 text-white border border-white/10 backdrop-blur-sm">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest uppercase text-white/70 bg-black/60 px-2 py-1 backdrop-blur-sm">
                    {project.year}
                  </div>

                  {/* View Details Hint on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold shadow-2xl">
                      EXPAND BRIEF →
                    </span>
                  </div>
                </div>

                {/* Project Metadata & Animated Arrow */}
                <div className="flex items-start justify-between pt-2 border-t border-white/10 group-hover:border-white/30 transition-colors">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-[#737373] uppercase tracking-wider mt-1">
                      {project.category} • {project.year}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0 ml-4">
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Portfolio Customization Callout */}
        <div className="mt-20 p-8 border border-white/15 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#737373] block mb-1">
              PRODUCTION PIPELINE NOTE
            </span>
            <p className="font-display text-lg font-bold uppercase text-white">
              HAVE A SPECIFIC VISION OR CAMPAIGN IN MIND?
            </p>
            <p className="text-xs text-[#a3a3a3] mt-1 max-w-xl">
              We tailor visual moodboards, treatment decks, shoot schedules, and social rollouts for every brand.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-[#e5e5e5] transition-colors whitespace-nowrap"
          >
            DISCUSS YOUR PROJECT →
          </a>
        </div>
      </div>
    </section>
  );
};
