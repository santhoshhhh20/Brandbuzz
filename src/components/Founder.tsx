import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export const Founder: React.FC = () => {
  const { founder } = BRAND_INFO;
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  // Scroll animations for smooth parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transformations on scroll
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [-24, 0, 24]);
  const photoScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.96, 1.02, 0.98]);
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const cornerSpread = useTransform(scrollYProgress, [0.1, 0.45], [10, 0]);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-20 sm:py-28 md:py-36 bg-[#F4EFEA] text-[#111111] overflow-hidden selection:bg-black selection:text-white"
    >
      {/* Anchor for Navbar 'Abt' link */}
      <span id="about" className="absolute -top-24 pointer-events-none" />

      {/* Subtle paper-like grain & ambient warmth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Subtle Section Pre-header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between pb-5 border-b border-black/15 mb-10 sm:mb-14 text-xs font-mono tracking-widest text-neutral-600"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-black rounded-none" />
            <span className="text-black font-semibold uppercase">03 — THE FOUNDER</span>
          </div>
          <span className="uppercase text-[11px] sm:text-xs">BRANDBUZZ CREATIVE LEAD</span>
        </motion.div>

        {/* =========================================================================
            ICONIC "MEET THE FOUNDER" EDITORIAL POSTER (Exact UI from Reference Image)
           ========================================================================= */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#F4EFEA] border border-black/10 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Giant Editorial Title: "MEET THE FOUNDER" */}
          <motion.div
            style={{ y: titleY }}
            className="text-center select-none mb-4 sm:mb-6"
          >
            <h2 className="font-display font-black text-3xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.88] text-black uppercase">
              MEET THE <br />
              FOUNDER
            </h2>
          </motion.div>

          {/* Central Portrait Container with Framing Elements */}
          <div className="relative max-w-lg mx-auto my-6 sm:my-10 flex justify-center items-center">
            
            {/* Corner Framing Bracket Accent (Left Side) */}
            <motion.div
              style={{ x: useTransform(cornerSpread, (v) => -v) }}
              className="absolute -left-1 xs:-left-3 sm:-left-6 md:-left-10 top-1/2 -translate-y-1/2 w-4 xs:w-5 sm:w-7 h-4 xs:h-5 sm:h-7 border-l-2 border-t-2 border-black/50 pointer-events-none"
            />

            {/* Corner Framing Bracket Accent (Right Side) */}
            <motion.div
              style={{ x: cornerSpread }}
              className="absolute -right-1 xs:-right-3 sm:-right-6 md:-right-10 top-1/2 -translate-y-1/2 w-4 xs:w-5 sm:w-7 h-4 xs:h-5 sm:h-7 border-r-2 border-t-2 border-black/50 pointer-events-none"
            />

            {/* Neutral Taupe Background Backdrop Box & Tariq's Photo */}
            <div className="relative w-[85%] sm:w-[75%] aspect-[4/5] bg-[#DDD7CE] rounded-sm overflow-hidden shadow-sm group">
              <motion.img
                src="/founder.jpg"
                alt="Tariq Anwar A - Founder of Brandbuzz"
                style={{ scale: photoScale, y: photoY }}
                className="w-full h-full object-cover object-top grayscale contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              {/* Subtle vignette layer for luxury editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Bottom 3-Column Metadata Bar (Exact 1:1 Reference Match) */}
          <div className="w-full border-t border-black/30 mt-8 sm:mt-12 pt-5 sm:pt-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/30 text-center gap-2 sm:gap-0">
              <div className="px-3 sm:px-4 py-1">
                <span className="font-display font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-black block">
                  TARIQ ANWAR A
                </span>
              </div>
              <div className="px-3 sm:px-4 py-1">
                <span className="font-display font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-black block">
                  FOUNDER & CREATIVE LEAD
                </span>
              </div>
              <div className="px-3 sm:px-4 py-1">
                <span className="font-display font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-black block">
                  BRAND BUZZ
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            FOUNDER STORY, NARRATIVE & LET'S CONNECT CTA
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-24 pt-12 border-t border-black/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Vision Headline & Mission Statement */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-3">
                  VISION & LEADERSHIP
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black leading-tight">
                  TURNING IDEAS INTO <br />
                  <span className="font-serif italic font-normal text-neutral-700">DIGITAL MOMENTUM</span>.
                </h3>
              </div>

              {/* Bold Editorial Quote */}
              <blockquote className="border-l-2 border-black pl-5 py-2 text-lg sm:text-xl font-serif italic text-neutral-900 leading-relaxed">
                “Every brand has a story. Our mission is to make people stop, watch, and remember.”
              </blockquote>
            </div>

            {/* Right Column: Founder Bio, Signature & Instagram CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-neutral-800 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  {founder.bio1}
                </p>
                <p className="text-neutral-600">
                  {founder.bio2}
                </p>
              </div>

              {/* Signature Line & Connect Button */}
              <div className="pt-6 border-t border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="font-serif italic text-3xl sm:text-4xl text-black tracking-wide">
                    Tariq Anwar A.
                  </p>
                  <p className="font-mono text-xs text-neutral-600 tracking-wider uppercase mt-1">
                    {founder.title} • Brandbuzz
                  </p>
                </div>

                {/* Exclusive Founder Connect CTA */}
                <a
                  href="https://www.instagram.com/___.tariq.___?srtk=dmkyNGdoYm41ZTY0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group w-full sm:w-auto"
                >
                  <Instagram size={15} className="transition-transform group-hover:rotate-12" />
                  <span>LET'S CONNECT</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Founder;
