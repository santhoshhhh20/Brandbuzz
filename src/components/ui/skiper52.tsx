"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Skiper52 = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      alt: "Commercial Camera Rig",
      code: "# 01 • PRODUCTION",
    },
    {
      src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
      alt: "Editorial Fashion Shoot",
      code: "# 02 • CAMPAIGN",
    },
    {
      src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      alt: "Product Still Life",
      code: "# 03 • PRODUCT",
    },
    {
      src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1000&auto=format&fit=crop",
      alt: "Creative Direction Suite",
      code: "# 04 • STRATEGY",
    },
    {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
      alt: "Cinematic Event Lighting",
      code: "# 05 • CINEMA",
    },
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      alt: "Executive Portraits",
      code: "# 06 • PORTRAITS",
    },
    {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
      alt: "Reels & Short-Form Production",
      code: "# 07 • REELS",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      alt: "Studio Architecture",
      code: "# 08 • SPATIAL",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      alt: "Brand Promotion Identity",
      code: "# 09 • IDENTITY",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <HoverExpand_001 className="" images={images} />
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-6xl px-2 sm:px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full overflow-x-auto scrollbar-none py-4"
      >
        <div className="flex w-max sm:w-full items-center justify-center gap-1.5 sm:gap-2 mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl shadow-sm border border-black/5"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "22rem" : "4.5rem",
                height: activeImage === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute flex h-full w-full flex-col items-start justify-end p-5 z-20 text-white"
                  >
                    <span className="font-mono text-[10px] tracking-widest uppercase opacity-80 mb-1">
                      {image.code}
                    </span>
                    <h4 className="font-display text-base sm:text-lg font-bold uppercase leading-tight">
                      {image.alt}
                    </h4>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover select-none"
                alt={image.alt}
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
