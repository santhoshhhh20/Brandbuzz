import React from 'react';
import MarqueeAlongSvgPath from '@/components/ui/marquee-along-svg-path';
import { MoveHorizontal, Sparkles } from 'lucide-react';

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

// The exact 13 typographic & artistic artworks from the user's screenshot
const MARQUEE_CARDS = [
  { id: 1, src: '/marquee/img-1.jpg', alt: 'Wavy Typography', fallbackBg: '#f0f0f0' },
  { id: 2, src: '/marquee/img-2.jpg', alt: 'Teal Modern G', fallbackBg: '#46b3b8' },
  { id: 3, src: '/marquee/img-3.jpg', alt: 'Pink Alphabet Specimen', fallbackBg: '#f5c3d4' },
  { id: 4, src: '/marquee/img-4.jpg', alt: 'Red Serif A', fallbackBg: '#e63926' },
  { id: 5, src: '/marquee/img-5.jpg', alt: 'Olive Green Ampersand', fallbackBg: '#a8c09d' },
  { id: 6, src: '/marquee/img-6.jpg', alt: 'Purple Block Digits', fallbackBg: '#8b6cb0' },
  { id: 7, src: '/marquee/img-7.jpg', alt: 'Optical Striped Ampersand', fallbackBg: '#e5e5e5' },
  { id: 8, src: '/marquee/img-8.jpg', alt: 'Glossy Metallic Type', fallbackBg: '#222222' },
  { id: 9, src: '/marquee/img-9.jpg', alt: 'Editorial Layout Graphic', fallbackBg: '#fdfbf7' },
  { id: 10, src: '/marquee/img-10.jpg', alt: 'Blue Dual Tone Specimen', fallbackBg: '#0f3694' },
  { id: 11, src: '/marquee/img-11.jpg', alt: 'Warm Peach Numerals', fallbackBg: '#d99775' },
  { id: 12, src: '/marquee/img-12.jpg', alt: 'Four-Block Typographic Grid', fallbackBg: '#fbe8d3' },
  { id: 13, src: '/marquee/img-13.jpg', alt: 'Bold Display Ligature', fallbackBg: '#1c1b1a' },
];

export const VisualPathGallery: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-20 bg-white border-b border-gray-100 overflow-hidden select-none">
      {/* Subtle Section Indicator */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/80">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gray-700 font-semibold">
              BRANDBUZZ • CURVILINEAR KINETIC MOTION
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
            <MoveHorizontal size={13} className="text-black animate-pulse" />
            <span>DRAG TO SCRUB • HOVER TO SLOW DOWN</span>
          </div>
        </div>
      </div>

      {/* Roller-Coaster Loop-de-Loop SVG Track */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <MarqueeAlongSvgPath
          path={path}
          viewBox="0 0 996 330"
          baseVelocity={8}
          slowdownOnHover={true}
          draggable={true}
          repeat={2}
          dragSensitivity={0.12}
          className="w-full h-full scale-105 sm:scale-110"
          responsive
          grabCursor
        >
          {MARQUEE_CARDS.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 aspect-square overflow-hidden shadow-md hover:shadow-2xl border border-black/10 bg-white hover:scale-135 transition-transform duration-300 ease-out cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>

      {/* Clean Bottom Caption Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-gray-600" />
          <span>BRANDBUZZ CREATIVE LAB</span>
        </div>
        <span>ACCELERATED FLIGHT • 26 INTERACTIVE NODES</span>
      </div>
    </section>
  );
};

export default VisualPathGallery;
