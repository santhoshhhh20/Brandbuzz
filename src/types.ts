export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  brief: string;
  deliverables: string[];
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface SocialLink {
  name: string;
  label: string;
  href: string;
}
