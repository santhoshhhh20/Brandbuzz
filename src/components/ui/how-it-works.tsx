"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "violet";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
  icon?: React.ComponentType<{ size?: number | string; className?: string }> | React.ElementType;
  onClick?: () => void;
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
  onCardClick?: (step: Step, index: number) => void;
}

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "violet";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
  icon?: React.ComponentType<{ size?: number | string; className?: string }> | React.ElementType;
  onClick?: () => void;
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className = "",
  rotate = "",
  colors: customColors,
  icon: Icon,
  onClick,
}: CardProps) => {
  const defaultBgColors: Record<string, string> = {
    orange: "bg-orange-50 dark:bg-orange-500/10",
    blue: "bg-blue-50 dark:bg-blue-500/10",
    purple: "bg-purple-50 dark:bg-purple-500/10",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10",
    amber: "bg-amber-50 dark:bg-amber-500/10",
    rose: "bg-rose-50 dark:bg-rose-500/10",
    cyan: "bg-cyan-50 dark:bg-cyan-500/10",
    violet: "bg-violet-50 dark:bg-violet-500/10",
  };
  const defaultTextColors: Record<string, string> = {
    orange: "text-orange-500 dark:text-orange-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    emerald: "text-emerald-500 dark:text-emerald-400",
    amber: "text-amber-500 dark:text-amber-400",
    rose: "text-rose-500 dark:text-rose-400",
    cyan: "text-cyan-500 dark:text-cyan-400",
    violet: "text-violet-500 dark:text-violet-400",
  };
  const defaultBorderColors: Record<string, string> = {
    orange: "border-orange-200 dark:border-orange-500/30",
    blue: "border-blue-200 dark:border-blue-500/30",
    purple: "border-purple-200 dark:border-purple-500/30",
    emerald: "border-emerald-200 dark:border-emerald-500/30",
    amber: "border-amber-200 dark:border-amber-500/30",
    rose: "border-rose-200 dark:border-rose-500/30",
    cyan: "border-cyan-200 dark:border-cyan-500/30",
    violet: "border-violet-200 dark:border-violet-500/30",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme] || defaultBgColors.blue;
  const textColor = customColors?.text || defaultTextColors[colorTheme] || defaultTextColors.blue;
  const borderColor = customColors?.border || defaultBorderColors[colorTheme] || defaultBorderColors.blue;

  return (
    <div
      onClick={onClick}
      className={`relative w-full md:w-[300px] transition-all duration-300 hover:z-30 hover:scale-105 cursor-pointer [transform:translateZ(0)] ${rotate} ${className}`}
    >
      <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-[26px] shadow-[0px_10px_25px_0px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7)] border border-neutral-200/80 dark:border-neutral-800">
        <Pin className={`w-8 h-8 ${textColor} z-20 mb-4 mx-auto drop-shadow-sm`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[16px] p-[18px] h-full flex flex-col justify-between relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`${textColor} text-4xl font-handwriting`}
                style={{
                  fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
                }}
              >
                {number}
              </span>
              {Icon && (
                <div className={`p-2 rounded-xl bg-white/80 dark:bg-neutral-950/80 ${textColor} shadow-sm border border-neutral-200/50 dark:border-neutral-800`}>
                  <Icon size={18} />
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight leading-snug mb-2">
              {title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            <span>BRANDBUZZ DISCIPLINES</span>
            <span>LEARN MORE →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[10%]", rotate: "md:rotate-6" },
  { className: "md:absolute md:top-[160px] md:right-[10%]", rotate: "md:-rotate-6" },
  { className: "md:absolute md:top-[440px] md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[600px] md:right-[10%]", rotate: "md:-rotate-4" },
  { className: "md:absolute md:top-[880px] md:left-[10%]", rotate: "md:rotate-6" },
  { className: "md:absolute md:top-[1040px] md:right-[10%]", rotate: "md:-rotate-6" },
  { className: "md:absolute md:top-[1320px] md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[1480px] md:right-[10%]", rotate: "md:-rotate-4" },
];

export function HowItWorks({
  features,
  className = "",
  stepPositions,
  onCardClick,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Create Account",
      description:
        "Sign up in minutes. Enter your details and verify your email to get started.",
      colorTheme: "orange",
    },
    {
      title: "Verify Identity",
      description:
        "Complete your profile verification to ensure secure transactions and compliance.",
      colorTheme: "blue",
    },
    {
      title: "Select Plan",
      description:
        "Choose from a variety of investment plans tailored to your financial goals.",
      colorTheme: "purple",
    },
    {
      title: "Analyze & Invest",
      description:
        "Review returns and make your first investment with confidence.",
      colorTheme: "orange",
    },
    {
      title: "Track Growth",
      description:
        "Monitor your portfolio in real-time and watch your wealth grow over time.",
      colorTheme: "blue",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions: StepPosition[] =
    stepPositions ||
    DEFAULT_CARD_POSITIONS.slice(0, data.length);

  // Height scaling based on number of items
  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 500;
  else if (data.length === 3) height = 750;
  else if (data.length === 4) height = 950;
  else if (data.length === 5) height = 1180;
  else if (data.length === 6) height = 1420;
  else if (data.length === 7) height = 1660;
  else height = 1880;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-transparent max-md:pt-6 max-md:pb-10 md:pt-10 md:pb-8 px-4 sm:px-8 relative ${className}`}
      >
        {/* Subtle notebook ruled line background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.12]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    const isCurrentLeft = index % 2 === 0;
                    const startX = isCurrentLeft ? 250 : 750;
                    const startY = Math.floor(index / 2) * 440 + (isCurrentLeft ? 40 : 200);
                    const nextIsLeft = (index + 1) % 2 === 0;
                    const endX = nextIsLeft ? 250 : 750;
                    const endY = Math.floor((index + 1) / 2) * 440 + (nextIsLeft ? 40 : 200);
                    const ctrlX = 500;

                    if (index === 0) {
                      return `M ${startX} ${startY} C ${ctrlX} ${startY}, ${ctrlX} ${endY}, ${endX} ${endY}`;
                    }
                    return acc + ` C ${ctrlX} ${startY}, ${ctrlX} ${endY}, ${endX} ${endY}`;
                  }, "");

                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-neutral-400/40 dark:text-neutral-600/60"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140, // Multiple of 14 (8+6) for seamless loop
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || "blue"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                  icon={step.icon}
                  onClick={() => {
                    if (step.onClick) step.onClick();
                    if (onCardClick) onCardClick(step, index);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default HowItWorks;
