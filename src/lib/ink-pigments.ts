import { type InkFlowItem } from '@/components/ui/ink-flow-carousel';

export interface PigmentPosterConfig {
  title: string;
  background: string;
  accent: string;
  heading: string;
  subheading?: string;
  shapeType?: 'circles' | 'blobs' | 'stripes' | 'rings';
}

export function createInkPigments(postersConfig?: PigmentPosterConfig[]): InkFlowItem[] {
  if (typeof document === 'undefined') return [];

  const W = 1200;
  const H = 800;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const defaultPosters: PigmentPosterConfig[] = postersConfig || [
    {
      title: 'Midnight Motion',
      background: '#0a0a0d',
      accent: '#38bdf8',
      heading: 'BRANDBUZZ',
      subheading: 'CREATIVE STUDIO',
      shapeType: 'rings'
    },
    {
      title: 'Crimson Surge',
      background: '#0f0507',
      accent: '#e11d48',
      heading: 'CINEMA',
      subheading: 'VISUAL IMPACT',
      shapeType: 'blobs'
    },
    {
      title: 'Deep Obsidian',
      background: '#060913',
      accent: '#2dd4bf',
      heading: 'PRODUCTION',
      subheading: 'HIGH DEFINITION',
      shapeType: 'stripes'
    },
    {
      title: 'Noir Amber',
      background: '#0a0805',
      accent: '#f59e0b',
      heading: 'MOMENTUM',
      subheading: 'NEXT HORIZON',
      shapeType: 'circles'
    }
  ];

  return defaultPosters.map((poster) => {
    // 1. Solid Dark Canvas Base
    ctx.fillStyle = poster.background;
    ctx.fillRect(0, 0, W, H);

    // 2. Artistic Geometric Vectors (for fluid distortion to grab onto)
    ctx.save();
    if (poster.shapeType === 'rings') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 12;
      for (let r = 80; r <= 420; r += 60) {
        ctx.beginPath();
        ctx.arc(800, 400, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = poster.accent;
      ctx.beginPath();
      ctx.arc(800, 400, 90, 0, Math.PI * 2);
      ctx.fill();
    } else if (poster.shapeType === 'blobs') {
      ctx.fillStyle = poster.accent;
      ctx.beginPath();
      ctx.arc(750, 380, 260, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(550, 560 + i * 28, 550, 14);
      }
    } else if (poster.shapeType === 'stripes') {
      ctx.fillStyle = poster.accent;
      ctx.beginPath();
      ctx.arc(420, 360, 190, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(520, 220, 580, 280);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(500, 200, 620, 320);
    } else {
      ctx.fillStyle = poster.accent;
      ctx.beginPath();
      ctx.arc(800, 420, 240, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(800, 420, 300, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Bold Contrast Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 120px sans-serif';
    ctx.fillText(poster.heading, 80, 680);

    if (poster.subheading) {
      ctx.fillStyle = poster.accent;
      ctx.font = '700 36px monospace';
      ctx.fillText(poster.subheading, 85, 735);
    }

    return {
      src: canvas.toDataURL('image/png'),
      title: poster.title
    };
  });
}
