// src/components/ui/parallax-scrolling.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface ParallaxComponentProps {
  title?: string;
  className?: string;
  layer1?: string;
  layer2?: string;
  layer4?: string;
  showContent?: boolean;
}

export function ParallaxComponent({
  title = "BRANDBUZZ",
  className = "",
  layer1 = "https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp",
  layer2 = "https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp",
  layer4 = "https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp",
  showContent = false,
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    let tl: gsap.core.Timeline | null = null;
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (triggerElement && parallaxRef.current) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl?.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    // Connect to global Lenis or create fallback if stand-alone
    const globalLenis = (window as any).__lenis;
    if (!globalLenis) {
      try {
        lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        tickerCallback = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
      } catch (e) {
        console.warn("Lenis initialization warning:", e);
      }
    }

    // Refresh ScrollTrigger to ensure accurate trigger points
    ScrollTrigger.refresh();

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className={`parallax ${className}`} ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img
              src={layer1}
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt="Parallax background sky layer"
              className="parallax__layer-img"
            />
            <img
              src={layer2}
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt="Parallax middle mountain layer"
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">{title}</h2>
            </div>
            <img
              src={layer4}
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Parallax foreground terrain layer"
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      {showContent && (
        <section className="parallax__content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 160 160"
            fill="none"
            className="osmo-icon-svg"
          >
            <path
              d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
              fill="currentColor"
            />
          </svg>
        </section>
      )}
    </div>
  );
}

export default ParallaxComponent;
