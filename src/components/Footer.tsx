import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO, SOCIAL_LINKS, SERVICES } from '../data/content';
import { RuixenGradientFooter } from '@/components/ui/ruixen-gradient-footer';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Motion & Cinema', href: '#videos' },
    { label: 'About Founder', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <RuixenGradientFooter
      gradientHeight="48vh"
      minReveal={0}
      className="bg-[#050505] text-white border-t border-white/10 selection:bg-white selection:text-black"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-8">
        {/* Massive Typography Signature & Back to Top */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {BRAND_INFO.agencyType}
              </span>
            </div>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none break-words">
              BRANDBUZZ
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 max-w-md md:text-right leading-snug">
              “{BRAND_INFO.tagline}”
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-white/20 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>BACK TO TOP</span>
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp size={12} className="stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* 4 Multi-Column Information Grid */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Quick Inquiry / Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                <Sparkles size={14} className="text-amber-400" />
                <span>START A COLLABORATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3">
                Ready to make your brand impossible to ignore?
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-md">
                Drop your email to receive our creative direction deck, case studies, and tailored production roadmap.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900/90 border border-white/20 focus-within:border-white transition-all shadow-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-transparent px-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer shadow"
                >
                  {subscribed ? 'Sent!' : 'Join'}
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-2.5">
                  <CheckCircle2 size={13} />
                  <span>Thank you! We will reach out shortly.</span>
                </div>
              )}
            </form>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1 hover:translate-x-1 duration-200"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-neutral-300">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors block truncate"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Studio Contact & Socials */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Studio & Connect
              </h4>
              <div className="space-y-3 text-xs font-mono text-neutral-300">
                <a
                  href={`tel:${BRAND_INFO.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-neutral-400" />
                  <span>{BRAND_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors truncate"
                >
                  <Mail size={13} className="text-neutral-400" />
                  <span>{BRAND_INFO.email}</span>
                </a>
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin size={13} className="text-neutral-400 shrink-0" />
                  <span>Udumalpet, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">
                Social Channels
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight size={11} className="text-neutral-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <span>© {BRAND_INFO.year} Brandbuzz. All rights reserved.</span>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>All creative systems active · Accepting 2026 bookings</span>
          </div>
          <span className="uppercase tracking-widest text-[11px] text-neutral-500">
            Buzz Your Brand Everywhere
          </span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
};

export default Footer;
