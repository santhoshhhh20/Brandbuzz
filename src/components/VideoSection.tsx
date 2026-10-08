import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, ArrowUpRight } from 'lucide-react';
import { HoldToConfirm } from '@/components/ui/hold-to-confirm';
import InkFlowCarousel, { type InkFlowItem } from '@/components/ui/ink-flow-carousel';
import { createInkPigments } from '@/lib/ink-pigments';

export interface VideoItem {
  id: number;
  title: string;
  client: string;
  category: 'Commercial' | 'Reels' | 'Brand Stories';
  src: string;
  duration: string;
  aspect: string;
  views: string;
  description: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: 'Aura Sahasra: Luxury Event Film',
    client: 'Zenith Celebrations',
    category: 'Brand Stories',
    src: 'https://www.image2url.com/r2/default/videos/1791473253869-64a12ad9-b743-453d-8875-6c6e75cd7e58.mp4',
    duration: '0:33',
    aspect: '16:9',
    views: '240K Views',
    description: 'Cinematic celebration coverage capturing joyful memories, stage illumination, and candid attendee emotion with luxury magazine-grade color grading.',
  },
  {
    id: 2,
    title: 'Update: Menswear Brand Reel',
    client: 'Update Cotton Collection',
    category: 'Reels',
    src: 'https://www.image2url.com/r2/default/videos/1791473351752-f97ddb58-27ac-4dfe-9ea2-9251e9993fab.mp4',
    duration: '0:20',
    aspect: '9:16',
    views: '380K Views',
    description: 'High-retention commercial reel engineered for social reach, showcasing storefront branding, retail footfall, and modern streetwear aesthetic.',
  },
  {
    id: 3,
    title: 'Artisan Pour: Gourmet Brand Story',
    client: 'DS Roast & Juices',
    category: 'Commercial',
    src: 'https://www.image2url.com/r2/default/videos/1791473402386-c8d56e8b-6d25-4f70-96c4-da1d849e9ce1.mp4',
    duration: '0:21',
    aspect: '16:9',
    views: '195K Views',
    description: 'Sensory close-ups, artisanal craftsmanship, and rich warm tones that turn everyday gourmet beverage preparation into a luxurious brand narrative.',
  },
  {
    id: 4,
    title: 'Kinetic Studio: Commercial Motion',
    client: 'Vanguard Creative',
    category: 'Brand Stories',
    src: 'https://www.image2url.com/r2/default/videos/1791474623358-59355808-14b7-42e5-b97b-a6e471d8a2a9.mp4',
    duration: '0:25',
    aspect: '16:9',
    views: '320K Views',
    description: 'High-energy commercial direction with dynamic framing, precision sound design, and razor-sharp color grading engineered to accelerate brand prestige.',
  },
];

const CATEGORIES = ['All', 'Commercial', 'Reels', 'Brand Stories'] as const;

interface VideoCardProps {
  video: VideoItem;
  isSectionVisible: boolean;
  isModalOpen: boolean;
  onOpenModal: (v: VideoItem) => void;
}

function VideoCard({ video, isSectionVisible, isModalOpen, onOpenModal }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '60px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Performance crucial: only run video decoder when section & card are actively in the viewport and modal is closed
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isSectionVisible && inView && !isModalOpen) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isSectionVisible, inView, isModalOpen]);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onOpenModal(video)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[24px] overflow-hidden bg-black border-2 border-white aspect-[9/16] cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.95),0_0_32px_rgba(255,255,255,0.35)] transition-all duration-500 select-none [transform:translateZ(0)]"
    >
      <video
        ref={videoRef}
        src={video.src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
      />
    </motion.div>
  );
}

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [inkItems, setInkItems] = useState<InkFlowItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (modalVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVideo]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
      }
    };
    if (modalVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setInkItems(
      createInkPigments([
        {
          title: 'Cinema Noir',
          background: '#09090b',
          accent: '#e11d48',
          heading: 'CINEMA',
          subheading: 'MOTION PICTURES',
          shapeType: 'rings',
        },
        {
          title: 'Neon Horizon',
          background: '#070a14',
          accent: '#06b6d4',
          heading: 'STORIES',
          subheading: 'VIRAL REELS',
          shapeType: 'blobs',
        },
        {
          title: 'Amber Lens',
          background: '#0c0804',
          accent: '#f59e0b',
          heading: 'DIRECTOR',
          subheading: 'COMMERCIALS',
          shapeType: 'stripes',
        },
        {
          title: 'Obsidian Pulse',
          background: '#080808',
          accent: '#a855f7',
          heading: 'BRANDBUZZ',
          subheading: 'IMMERSIVE FRAMES',
          shapeType: 'circles',
        },
      ])
    );
  }, []);

  const filteredVideos = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === activeCategory);

  const openModal = (video: VideoItem) => {
    setModalVideo(video);
  };

  const closeModal = () => {
    setModalVideo(null);
  };

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="relative py-24 md:py-32 bg-[#0a0a0a] text-white overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Interactive WebGL Ink Flow Background Simulation - only runs when section in viewport */}
      {isSectionVisible && inkItems.length > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-40">
          <InkFlowCarousel
            items={inkItems}
            height="100%"
            rail={false}
            autoplay={0}
            stir={1.0}
            loop={true}
            className="w-full h-full pointer-events-auto"
          />
          {/* Subtle gradient vignette to preserve razor-sharp readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/90 pointer-events-none" />
        </div>
      )}

      {/* Background ambient glow highlights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neutral-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-5">
              <Film className="w-3.5 h-3.5 text-white" />
              <span>03 — Motion & Cinema</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
              Stories In <span className="text-neutral-400 font-light italic">Motion.</span>
            </h2>
          </div>

          <div className="md:max-w-md">
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-normal">
              From commercial brand films and viral social reels to grand event visuals, our cinema-grade production turns audience attention into emotional conviction.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-semibold scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4 Videos in the Same Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isSectionVisible={isSectionVisible}
              isModalOpen={modalVideo !== null}
              onOpenModal={openModal}
            />
          ))}
        </div>

        {/* Bottom Call to Action banner */}
        <div className="mt-14 md:mt-20 p-8 md:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Need a bespoke video production for your brand?
            </h4>
            <p className="text-sm text-neutral-400 mt-1">
              We handle end-to-end scripting, shooting, directing, lighting, and premium color grading.
            </p>
          </div>
          <HoldToConfirm
            onConfirm={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            confirmLabel="READY TO PRODUCE"
            duration={1000}
            variant="light"
            className="px-6 py-3.5 h-12 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase shadow-xl transition-all"
          >
            <span className="flex items-center gap-2">
              <span>DISCUSS VIDEO PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </HoldToConfirm>
        </div>
      </div>

      {/* Cinematic Modal Player with Smooth Pop-Up Animation */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-neutral-950 border-2 border-white/90 rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(255,255,255,0.15)] flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-5 md:p-6 border-b border-white/15 flex items-center justify-between bg-neutral-950">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black">
                    {modalVideo.category}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                      {modalVideo.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Client: {modalVideo.client} • {modalVideo.views}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Video Element with native controls & autoPlay */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden w-full max-h-[65vh] p-2">
                <video
                  src={modalVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="p-6 md:p-8 bg-neutral-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/15">
                <div className="max-w-xl">
                  <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Creative Direction & Deliverables
                  </h5>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {modalVideo.description}
                  </p>
                </div>

                <HoldToConfirm
                  onConfirm={() => {
                    closeModal();
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  confirmLabel="CONNECTING..."
                  duration={1000}
                  variant="light"
                  className="px-6 py-3 h-11 rounded-full font-semibold text-xs uppercase tracking-wider shadow-lg whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    <span>HIRE US FOR THIS STYLE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </HoldToConfirm>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoSection;
