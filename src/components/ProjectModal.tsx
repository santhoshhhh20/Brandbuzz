import React, { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-white/20 overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 bg-[#0c0c0c]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#a3a3a3]">
              PROJECT ARCHIVE BRIEF • {project.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] w-full bg-black border border-white/15 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover editorial-img"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-black/80 px-2 py-1 text-white border border-white/10">
              FRAME • {project.year}
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#737373]">
                PROJECT TITLE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white mt-1">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-[#737373] block uppercase">CATEGORY</span>
                <span className="text-white font-medium">{project.category}</span>
              </div>
              <div className="border-l border-white/20 pl-4">
                <span className="text-[#737373] block uppercase">TIMELINE</span>
                <span className="text-white font-medium">{project.year} RELEASE</span>
              </div>
            </div>
          </div>

          {/* Strategic Brief */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              CREATIVE DIRECTION & OBJECTIVE
            </h4>
            <p className="text-base sm:text-lg text-[#e5e5e5] font-light leading-relaxed">
              {project.brief}
            </p>
          </div>

          {/* Deliverables */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              SCOPE & ASSETS DELIVERED
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2.5 p-3 border border-white/10 bg-white/[0.02]">
                  <Check size={14} className="text-white" />
                  <span className="font-mono text-xs uppercase text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#737373]">
              Ready to execute this aesthetic for your brand?
            </p>
            <button
              type="button"
              onClick={() => {
                onInquire(project);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-[#e5e5e5] transition-colors"
            >
              <span>INQUIRE ABOUT THIS FORMAT</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
