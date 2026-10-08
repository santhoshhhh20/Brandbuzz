import React from 'react';

interface BeeIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const BeeIcon: React.FC<BeeIconProps> = ({ className = '', size = 24, glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''} ${className}`}
    >
      {/* Central slender body */}
      <ellipse cx="20" cy="20" rx="3.5" ry="8.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Abdomen segments / stripes */}
      <line x1="17" y1="18" x2="23" y2="18" stroke="currentColor" strokeWidth="1.2" />
      <line x1="17.2" y1="21" x2="22.8" y2="21" stroke="currentColor" strokeWidth="1.2" />
      <line x1="18" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1.2" />
      
      {/* Head */}
      <circle cx="20" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Minimalist antennae */}
      <path d="M19 8C17.5 5.5 15.5 5 14 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M21 8C22.5 5.5 24.5 5 26 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Editorial geometric wings - Left */}
      <path
        d="M17 17C10 13 4 16 6 22C7.5 26.5 14 23 17 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M16.5 19C11 18 8 23 12 26C15 28 17 23 17.5 21"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1.5 1.5"
      />

      {/* Editorial geometric wings - Right */}
      <path
        d="M23 17C30 13 36 16 34 22C32.5 26.5 26 23 23 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M23.5 19C29 18 32 23 28 26C25 28 23 23 22.5 21"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1.5 1.5"
      />
      
      {/* Subtle stinger */}
      <path d="M20 28.5L20 31" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};
