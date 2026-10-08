"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RandomLetterSwapProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  staggerDuration?: number;
  transition?: Transition;
  className?: string;
}

export function RandomLetterSwap({
  label,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring", bounce: 0.25 },
  className,
  ...props
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn("inline-flex overflow-hidden relative cursor-pointer select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="flex">
        {label.split("").map((letter, i) => (
          <span key={`${letter}-${i}`} className="relative inline-block overflow-hidden">
            {/* Primary letter */}
            <motion.span
              className="inline-block"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={{
                ...transition,
                delay: i * staggerDuration,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>

            {/* Secondary duplicate letter that swaps into place */}
            <motion.span
              className="absolute inset-0 inline-block"
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? "0%" : "100%" }}
              transition={{
                ...transition,
                delay: i * staggerDuration,
              }}
              aria-hidden="true"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

export default RandomLetterSwap;
