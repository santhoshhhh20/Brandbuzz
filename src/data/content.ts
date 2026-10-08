import { ServiceItem, ProjectItem, ProcessStage, SocialLink } from '../types';

export const BRAND_INFO = {
  name: 'Brandbuzz',
  tagline: 'Buzz your brand everywhere',
  agencyType: 'Creative Digital Marketing Agency',
  phone: '+91 99941 69609',
  phoneRaw: '+919994169609',
  email: 'brandbuzzudt@gmail.com',
  year: '2026',
  statement: "YOUR BRAND HAS A STORY. LET'S MAKE PEOPLE STOP AND WATCH.",
  heroHeadlineTop: 'BUZZ YOUR BRAND',
  heroHeadlineBottom: 'EVERYWHERE.',
  heroSubheadline: 'MAKE YOUR BRAND IMPOSSIBLE TO IGNORE.',
  heroDescription: 'Creative content, social media, photography, videography and digital strategies designed to make brands stand out.',
  aboutHeadline: "WE DON'T JUST CREATE CONTENT. WE CREATE ATTENTION.",
  aboutParagraph1: 'Brandbuzz is a creative digital marketing agency focused on helping businesses build a strong presence in the digital world. We combine social media marketing, content creation, photography, videography, and creative strategy to help brands connect with the right audience and grow online.',
  aboutParagraph2: 'From a local business looking to make its mark on Instagram to an established brand looking for better digital visibility, we create content and strategies designed around your brand, your audience, and your goals.',
  founder: {
    name: 'Tariq Anwar A',
    title: 'Founder & Creative Lead',
    tags: ['CREATIVE ENTREPRENEUR', 'DIGITAL MARKETING', 'CONTENT & VISUALS'],
    bio1: 'Brandbuzz was founded by Tariq Anwar A, a young creative entrepreneur with a passion for digital marketing, content creation, videography, and brand building.',
    bio2: 'With a strong interest in how brands communicate and connect with people online, Tariq started Brandbuzz with a simple vision — to help businesses turn their ideas into impactful digital content and build a stronger presence online.'
  }
};

export const MARQUEE_ITEMS = [
  'SOCIAL MEDIA',
  'CONTENT CREATION',
  'PHOTOGRAPHY',
  'VIDEOGRAPHY',
  'BRANDING',
  'DIGITAL STRATEGY',
  'REELS & SHORT-FORM',
  'BRAND PROMOTION',
  'PRODUCTION',
  'CREATIVE DIRECTION'
];

export const CORE_PILLARS = [
  { label: 'CONTENT', subtitle: 'VISUALS ENGINEERED FOR ATTENTION' },
  { label: 'CREATIVITY', subtitle: 'EDITORIAL PERSPECTIVE & CRAFT' },
  { label: 'STRATEGY', subtitle: 'GOAL-DRIVEN DIGITAL TRAJECTORY' },
  { label: 'IMPACT', subtitle: 'MEASURABLE REACH & ENGAGEMENT' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'social-media-marketing',
    number: '01',
    title: 'Social Media Marketing',
    description: 'Data-informed campaigns and curated aesthetics tailored to drive audience growth, engagement, and conversion on modern platforms.',
    deliverables: ['Platform Growth Strategy', 'Target Audience Mapping', 'Paid Social Campaigns', 'Community Engagement'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'content-creation',
    number: '02',
    title: 'Content Creation',
    description: 'High-impact editorial graphics, carousel storytelling, and bespoke copywriting built to turn passive scrollers into loyal advocates.',
    deliverables: ['Visual Assets & Art Direction', 'Copywriting & Scripting', 'Story & Feed Graphics', 'Brand Consistency Guidelines'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'product-corporate-shoots',
    number: '03',
    title: 'Product & Corporate Shoots',
    description: 'Studio-grade lighting, crisp monochromatic styling, and magazine-quality imagery for products, leadership teams, and executive spaces.',
    deliverables: ['Commercial Product Photography', 'Executive Portraits', 'Workspace & Architecture', 'Color Grading & Retouching'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'event-photography-videography',
    number: '04',
    title: 'Event Photography & Videography',
    description: 'Cinematic coverage capturing the energy, candid prestige, and pivotal moments of brand activations, launches, and summits.',
    deliverables: ['Multi-cam Video Production', 'High-speed Turnaround Recaps', 'Atmospheric Event Stills', 'On-site Social Snippets'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'reels-short-form',
    number: '05',
    title: 'Reels & Short-Form Content',
    description: 'Fast-paced, hook-driven vertical video crafted for Instagram Reels and YouTube Shorts that leverage algorithm momentum.',
    deliverables: ['Trending Audio Strategy', 'Hook & Retention Scripting', 'Dynamic Cuts & Typography', 'Color Grade & Audio Mix'],
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'brand-promotion',
    number: '06',
    title: 'Brand Promotion',
    description: 'Targeted positioning campaigns, influencer tie-ups, and PR storytelling designed to spark conversation around your brand.',
    deliverables: ['Launch Campaign Playbooks', 'Creator Collaboration', 'Omnichannel Buzz Campaigns', 'Audience Retargeting'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'digital-marketing-strategy',
    number: '07',
    title: 'Digital Marketing Strategy',
    description: 'Full-funnel digital architecture identifying high-leverage opportunities, positioning, audience psychology, and execution roadmap.',
    deliverables: ['Competitor Intelligence', 'Funnel Architecture', 'Quarterly Growth Roadmap', 'KPI & Analytics Dashboard'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'social-media-management',
    number: '08',
    title: 'Social Media Management',
    description: 'End-to-end management of your channels: calendar scheduling, daily monitoring, response handling, and strategic iteration.',
    deliverables: ['Monthly Editorial Calendars', 'Post Publishing & Scheduling', 'Comment & DM Management', 'Performance Analytics Reporting'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'brand-campaign-01',
    title: 'Monolith Brand Campaign',
    category: 'Brand Campaign',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'tall',
    brief: 'A cohesive visual identity and campaign rollout focused on monochromatic elegance and high-fashion editorial styling.',
    deliverables: ['Art Direction', 'Campaign Film', 'Print & Digital Assets', 'Social Teasers']
  },
  {
    id: 'social-campaign-02',
    title: 'Apex Social Media Campaign',
    category: 'Social Media Campaign',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'square',
    brief: 'Multi-week viral content calendar engineered to spike profile engagement, reach, and follower conversion.',
    deliverables: ['30-Day Content Matrix', 'Interactive Stories', 'Visual Moodboard', 'Community Push']
  },
  {
    id: 'product-shoot-03',
    title: 'Obscura Product Shoot',
    category: 'Product Shoot',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'wide',
    brief: 'High-contrast studio still life photography with sculpted lighting emphasizing tactile materials and form.',
    deliverables: ['Studio Lighting Design', 'Macro Product Details', 'E-Commerce Hero Assets', 'Motion Renders']
  },
  {
    id: 'event-coverage-04',
    title: 'Nocturne Event Coverage',
    category: 'Event Coverage',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'square',
    brief: 'Full-spectrum photo and cinema recap capturing the energy and distinction of an exclusive creative gathering.',
    deliverables: ['Same-Night Stills Delivery', '4K Cinematic Aftermovie', 'VIP Portraits', 'Highlight Snippets']
  },
  {
    id: 'reel-campaign-05',
    title: 'Velocity Reel Campaign',
    category: 'Reel Campaign',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'tall',
    brief: 'High-tempo vertical short-form video series designed for maximum watch time, shares, and algorithm resonance.',
    deliverables: ['9:16 Video Direction', 'Sound Design & Transitions', 'Hook Testing', 'Micro-Interactions']
  },
  {
    id: 'corporate-content-06',
    title: 'Vanguard Corporate Content',
    category: 'Corporate Content',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'wide',
    brief: 'Executive storytelling suite showcasing visionary leadership, studio culture, and architectural presence.',
    deliverables: ['Leadership Profiles', 'Studio Tour Film', 'Brand Narrative Book', 'Investor Stills']
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Brand, Audience & Intent',
    description: 'We audit your present digital footprint, define clear objectives, dissect audience behavior, and map where attention is currently being missed.'
  },
  {
    step: '02',
    title: 'CREATE',
    subtitle: 'Visuals & Conceptual Angles',
    description: 'We craft high-contrast visual concepts, write sharp copy, script cinematic reels, and produce imagery that commands immediate respect.'
  },
  {
    step: '03',
    title: 'PUBLISH',
    subtitle: 'Algorithm & Platform Deployment',
    description: 'We time, calibrate, and release content across digital channels with optimized hooks, sound trends, and precision-targeted distribution.'
  },
  {
    step: '04',
    title: 'GROW',
    subtitle: 'Measure, Refine & Scale',
    description: 'We evaluate engagement signals, double down on high-performing content formats, and systematically scale your brand authority.'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', label: '@___.tariq.___', href: 'https://www.instagram.com/___.tariq.___?srtk=dmkyNGdoYm41ZTY0' },
  { name: 'LinkedIn', label: 'Brandbuzz', href: 'https://linkedin.com' },
  { name: 'YouTube', label: 'Brandbuzz Studio', href: 'https://youtube.com' },
  { name: 'Facebook', label: 'Brandbuzz Agency', href: 'https://facebook.com' }
];

export const FAQ_ITEMS = [
  {
    q: 'How does Brandbuzz collaborate with new clients?',
    a: 'We kick off with an introductory consultation where we learn your brand story, targets, and creative vision. From there, we deliver a bespoke strategic proposal and production plan.'
  },
  {
    q: 'Can Brandbuzz handle both content production and account management?',
    a: 'Yes. We offer fully integrated solutions spanning creative shoots, reels editing, copy, scheduling, and strategic analytics, or modular service packages.'
  },
  {
    q: 'What makes your approach different from typical digital agencies?',
    a: 'We treat digital presence like high-end editorial storytelling. Rather than churning out generic templates, we create distinct, bold, high-contrast assets that stop the scroll and build lasting brand prestige.'
  }
];
