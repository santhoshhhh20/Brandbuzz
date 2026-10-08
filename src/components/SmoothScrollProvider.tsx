import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize ultra-responsive, lag-free global Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.0, // Responsive momentum without sluggish float
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false, // Driven exclusively by GSAP ticker for 100% synchronized frame pacing
    });

    (window as any).__lenis = lenis;

    // Update ScrollTrigger on every Lenis scroll step
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // CRITICAL: Disable GSAP lag smoothing to eliminate stuttering and frame clamping during smooth scroll
    gsap.ticker.lagSmoothing(0);

    // Debounced resize handler to keep ScrollTrigger and Lenis in sync
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
