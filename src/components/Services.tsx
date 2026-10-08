import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Palette,
  Camera,
  Video,
  Flame,
  Megaphone,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import InkFlowCarousel, { type InkFlowItem } from '@/components/ui/ink-flow-carousel';
import HowItWorks, { type Step } from '@/components/ui/how-it-works';

export const ALL_SERVICES = [
  {
    number: '01',
    title: 'Social Media Marketing',
    description: 'Targeted growth campaigns and community building across modern channels.',
    icon: Share2,
  },
  {
    number: '02',
    title: 'Content Creation',
    description: 'High-impact visual assets, editorial carousels, and scroll-stopping copy.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Product & Corporate Shoots',
    description: 'Studio lighting and magazine-grade photography for products and executives.',
    icon: Camera,
  },
  {
    number: '04',
    title: 'Event Photography & Videography',
    description: 'Cinematic coverage and fast-turnaround recaps for brand activations.',
    icon: Video,
  },
  {
    number: '05',
    title: 'Reels & Short-Form Video',
    description: 'Hook-driven vertical videos engineered for viral reach and retention.',
    icon: Flame,
  },
  {
    number: '06',
    title: 'Brand Promotion',
    description: 'Strategic campaigns and creator collaborations to spark authentic buzz.',
    icon: Megaphone,
  },
  {
    number: '07',
    title: 'Digital Marketing Strategies',
    description: 'Full-funnel growth architectures, competitor audits, and conversion funnels.',
    icon: TrendingUp,
  },
  {
    number: '08',
    title: 'Social Media Managing',
    description: 'End-to-end publishing, daily community engagement, and ROI reporting.',
    icon: BarChart3,
  }
];

const createServicePigments = (): InkFlowItem[] => {
  if (typeof document === 'undefined') return [];
  const W = 1200;
  const H = 800;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const posters = [
    {
      title: 'Midnight Motion',
      paint: () => {
        ctx.fillStyle = '#0a0a0c';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 14;
        for (let r = 80; r <= 420; r += 60) {
          ctx.beginPath();
          ctx.arc(800, 400, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#e5e5e5';
        ctx.font = '900 120px sans-serif';
        ctx.fillText('BRANDBUZZ', 80, 700);
      }
    },
    {
      title: 'Obsidian Crimson',
      paint: () => {
        ctx.fillStyle = '#100508';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#b3261e';
        ctx.beginPath();
        ctx.arc(750, 380, 260, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 5; i++) {
          ctx.fillRect(600, 580 + i * 28, 500, 14);
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 120px sans-serif';
        ctx.fillText('CREATIVE', 80, 700);
      }
    },
    {
      title: 'Deep Indigo',
      paint: () => {
        ctx.fillStyle = '#080d22';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#2f7f79';
        ctx.beginPath();
        ctx.arc(400, 350, 180, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(500, 200, 600, 300);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 120px sans-serif';
        ctx.fillText('PRODUCTION', 80, 700);
      }
    },
    {
      title: 'Noir Gold',
      paint: () => {
        ctx.fillStyle = '#080808';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#e8b516';
        ctx.beginPath();
        ctx.arc(800, 420, 240, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 120px sans-serif';
        ctx.fillText('MOMENTUM', 80, 700);
      }
    }
  ];

  return posters.map(p => {
    p.paint();
    return {
      src: canvas.toDataURL('image/png'),
      title: p.title
    };
  });
};

export const Services: React.FC = () => {
  const [inkItems, setInkItems] = useState<InkFlowItem[]>([]);

  useEffect(() => {
    setInkItems(createServicePigments());
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const serviceThemes: Array<Step['colorTheme']> = [
    'cyan',
    'purple',
    'amber',
    'rose',
    'orange',
    'emerald',
    'blue',
    'violet',
  ];

  const serviceSteps: Step[] = ALL_SERVICES.map((service, index) => ({
    title: service.title,
    description: service.description,
    icon: service.icon,
    colorTheme: serviceThemes[index % serviceThemes.length],
    onClick: scrollToContact,
  }));

  return (
    <section id="services" className="relative pt-20 md:pt-28 pb-8 md:pb-12 bg-black text-white select-none overflow-hidden">
      {/* Interactive WebGL Ink Flow Background Simulation */}
      {inkItems.length > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-45">
          <InkFlowCarousel
            items={inkItems}
            height="100%"
            rail={false}
            autoplay={4500}
            stir={1.3}
            loop={true}
            className="w-full h-full pointer-events-auto"
          />
          {/* Subtle gradient vignette to preserve razor-sharp readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90 pointer-events-none" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 pointer-events-auto">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-12 text-xs font-mono tracking-widest text-neutral-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="text-white font-semibold">01 — OUR SERVICES</span>
          </div>
          <span>EIGHT DISCIPLINARY STACKS</span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-3 leading-none">
              FROM IDEA<br />
              <span className="font-serif italic font-normal text-neutral-300">TO IMPACT</span>
              <span className="text-neutral-600">.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Eight focused creative marketing capabilities engineered to elevate perception and drive digital momentum.
            </p>
          </div>
        </div>

        {/* Animated Pinned Cards Flow with Continuous Trajectory */}
        <div className="dark relative mt-6 mb-0">
          <HowItWorks features={serviceSteps} onCardClick={scrollToContact} />
        </div>
      </div>
    </section>
  );
};

export default Services;
