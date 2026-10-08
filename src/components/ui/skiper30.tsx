"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/lummi/img15.png",
  "/images/lummi/img21.png",
  "/images/lummi/img3.png",
  "/images/lummi/img4.png",
  "/images/lummi/img5.png",
  "/images/lummi/img6.png",
  "/images/lummi/img7.png",
  "/images/lummi/img8.png",
  "/images/lummi/img24.png",
  "/images/lummi/img10.png",
  "/images/lummi/img11.png",
  "/images/lummi/img12.png",
  "/images/lummi/img13.png",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top seamless blend from Video Section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />

      {/* Multi-Column Differential Velocity Parallax Stage */}
      <div
        ref={gallery}
        className="relative box-border flex h-[130vh] sm:h-[150vh] md:h-[175vh] min-h-[500px] sm:min-h-[700px] md:min-h-[900px] gap-2 sm:gap-[1.5vw] md:gap-[2vw] overflow-hidden bg-[#0a0a0a] p-2 sm:p-[1.5vw] md:p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      {/* Bottom seamless blend into Founder Section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full flex-1 min-w-0 flex-col gap-2 sm:gap-[1.5vw] md:gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-2xl group transition-all duration-500 hover:border-white/30"
        >
          <img
            src={`${src}`}
            alt="gallery visual"
            className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
export default Skiper30;
