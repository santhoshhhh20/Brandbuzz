import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isNavigating = useRef(false);

  useEffect(() => {
    // Calculates the bottom boundary of the home section
    const getHomeThreshold = () => {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        return homeEl.offsetTop + homeEl.offsetHeight - 80;
      }
      return window.innerHeight * 0.9;
    };

    const updateNavbarVisibility = (currentScrollY: number) => {
      // If user clicked any link in nav, keep visible during & immediately after programmatic scroll
      if (isNavigating.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const homeThreshold = getHomeThreshold();

      // Standard & visible until user completely scrolls past the home page
      if (currentScrollY <= homeThreshold) {
        setIsVisible(true);
      } else {
        // Once scrolled past home: hide on down-scroll, reveal on up-scroll
        const delta = currentScrollY - lastScrollY.current;
        if (delta > 6) {
          // Downward scroll: smoothly hide
          setIsVisible(false);
        } else if (delta < -6) {
          // Upward scroll: smoothly show
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleWindowScroll = () => {
      updateNavbarVisibility(window.scrollY);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // Synchronize with Lenis smooth-scroll provider
    const lenis = (window as any).__lenis;
    const handleLenisScroll = (e: any) => {
      const scroll = typeof e?.scroll === 'number' ? e.scroll : window.scrollY;
      updateNavbarVisibility(scroll);
    };

    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleLenisScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleLenisScroll);
      }
    };
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Abt', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setIsVisible(true); // Always keep navbar visible when any link is clicked
    isNavigating.current = true; // Lock visibility while navigating to target section

    const element = document.querySelector(href);
    if (element) {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(element as HTMLElement, {
          offset: -90,
          duration: 1.2,
          onComplete: () => {
            // Once user arrives at destination, unlock scroll tracking after brief pause
            setTimeout(() => {
              isNavigating.current = false;
              lastScrollY.current = window.scrollY;
            }, 350);
          },
        });
      } else {
        const navOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isNavigating.current = false;
          lastScrollY.current = window.scrollY;
        }, 1200);
      }
    } else {
      isNavigating.current = false;
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -130,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:py-6 px-3 xs:px-4 sm:px-6 pointer-events-none"
      >
        {/* Floating Rounded Pill with High-Contrast Multi-Layer Shadow & Border */}
        <div className="flex items-center justify-between px-4 xs:px-6 sm:px-8 py-2.5 sm:py-3.5 bg-white/95 backdrop-blur-md rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05)] border border-neutral-200/90 w-full max-w-4xl relative z-10 pointer-events-auto transition-all duration-300">
          {/* Brand Name with Same Font in Left Corner */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="group flex items-center gap-1.5 text-black select-none"
            >
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight uppercase flex items-center gap-1.5 text-black">
                BRANDBUZZ
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block group-hover:scale-125 transition-transform" />
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-700 hover:text-black transition-colors font-semibold select-none"
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
            >
              LET'S TALK
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center p-1.5 text-black focus:outline-none"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-6 w-6 text-black" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3rem))] px-6 xs:px-8 pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col justify-between md:hidden overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <motion.button
              className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-[max(1.25rem,env(safe-area-inset-right))] p-2.5 rounded-full text-black hover:bg-neutral-100 transition-colors"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6 text-black" />
            </motion.button>

            <div className="flex flex-col space-y-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                NAVIGATION
              </span>
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href={item.href}
                    className="font-display text-3xl font-light tracking-tight text-neutral-800 hover:text-black flex items-center justify-between border-b border-neutral-100 pb-3"
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-neutral-400">0{i + 1}</span>
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full px-5 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold text-white bg-black rounded-full hover:bg-neutral-800 transition-colors shadow-md"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                >
                  <span className="flex items-center gap-2">
                    <span>START A PROJECT</span>
                    <ArrowRight size={14} />
                  </span>
                </a>
              </motion.div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>BRANDBUZZ STUDIO</span>
              <span>© 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
