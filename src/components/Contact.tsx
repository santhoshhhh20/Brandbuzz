import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Mail, Instagram, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { Button } from '@/components/ui/button';
import InkFlowCarousel, { type InkFlowItem } from '@/components/ui/ink-flow-carousel';
import { createInkPigments } from '@/lib/ink-pigments';

export const Contact: React.FC = () => {
  const [inkItems, setInkItems] = useState<InkFlowItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Social Media Marketing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setInkItems(
      createInkPigments([
        {
          title: 'Connect & Ignite',
          background: '#09090b',
          accent: '#38bdf8',
          heading: 'CONNECT',
          subheading: 'START A PROJECT',
          shapeType: 'rings',
        },
        {
          title: 'Bold Strategy',
          background: '#0a0508',
          accent: '#f43f5e',
          heading: 'COLLABORATE',
          subheading: 'HIGH CONVERSION',
          shapeType: 'blobs',
        },
        {
          title: 'Direct Reach',
          background: '#050a0a',
          accent: '#10b981',
          heading: 'INNOVATE',
          subheading: 'GLOBAL REACH',
          shapeType: 'stripes',
        },
        {
          title: 'Legacy Momentum',
          background: '#080808',
          accent: '#eab308',
          heading: 'BRANDBUZZ',
          subheading: '24HR RESPONSE',
          shapeType: 'circles',
        },
      ])
    );
  }, []);

  const handleFormSubmit = () => {
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    setLoading(true);

    const whatsappNumber = '919994169609';
    const text = `Hi Brandbuzz,

*Name:* ${formData.name || 'Not provided'}
*Email:* ${formData.email || 'Not provided'}
*Service:* ${formData.service}

*Message:*
${formData.message || ''}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    // Automatically drive into WhatsApp
    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-black text-white border-b border-neutral-800 overflow-hidden"
    >
      {/* Interactive WebGL Ink Flow Background Simulation - only active when contact section in view */}
      {isSectionVisible && inkItems.length > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-40">
          <InkFlowCarousel
            items={inkItems}
            height="100%"
            rail={false}
            autoplay={0}
            stir={1.0}
            loop={true}
            className="w-full h-full pointer-events-auto"
          />
          {/* Subtle gradient vignette to preserve razor-sharp readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90 pointer-events-none" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 pointer-events-auto">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-14 text-xs font-mono tracking-widest text-neutral-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-white rounded-none" />
            <span className="text-white font-semibold">03 — CONTACT</span>
          </div>
          <span>START A PROJECT</span>
        </div>

        {/* Brand Badge with Circular Logo */}
        <div className="inline-flex items-center gap-3.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700/80 mb-8 shadow-xl">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-neutral-400/50 bg-white shrink-0 shadow-md">
            <img src="/logo.jpg" alt="Brandbuzz Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-mono tracking-widest text-white uppercase font-semibold">
            BRANDBUZZ OFFICIAL
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4 leading-none">
            LET'S CREATE<br />
            <span className="font-serif italic font-normal text-neutral-300">
              SOMETHING PEOPLE
            </span><br />
            REMEMBER<span className="text-neutral-600">.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Tell us about your brand, your goals, or your upcoming campaign. We'll get back to you within 24 hours.
          </p>
        </div>

        {/* Split Form & Coordinates Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates (Email & Instagram Only) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white text-black border border-neutral-200 hover:border-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.22)] group">
              <div className="flex items-center gap-2.5 mb-3 text-neutral-500 text-xs font-mono uppercase tracking-widest">
                <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <Mail size={15} />
                </div>
                <span className="font-semibold text-neutral-800">DIRECT EMAIL</span>
              </div>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-black group-hover:text-neutral-700 transition-colors block break-all leading-tight"
              >
                {BRAND_INFO.email}
              </a>
              <span className="text-xs text-neutral-500 font-mono mt-3 inline-flex items-center gap-1 group-hover:text-black transition-colors">
                <span>Send email inquiry</span>
                <ArrowUpRight size={13} />
              </span>
            </div>

            {/* Direct Instagram Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white text-black border border-neutral-200 hover:border-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.22)] group">
              <div className="flex items-center gap-2.5 mb-3 text-neutral-500 text-xs font-mono uppercase tracking-widest">
                <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <Instagram size={15} />
                </div>
                <span className="font-semibold text-neutral-800">OFFICIAL INSTAGRAM</span>
              </div>
              <a
                href="https://www.instagram.com/_brandbuzz_in?cplk=NHYzNWQ0dWFheGx0"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-black group-hover:text-neutral-700 transition-colors flex items-center justify-between"
              >
                <span>@_brandbuzz_in</span>
                <ArrowUpRight size={22} className="text-neutral-400 group-hover:text-black transition-colors" />
              </a>
              <span className="text-xs text-neutral-500 font-mono mt-3 inline-flex items-center gap-1 group-hover:text-black transition-colors">
                <span>Visit Instagram profile</span>
                <ArrowUpRight size={13} />
              </span>
            </div>

            {/* Response Pledge Box */}
            <div className="p-6 rounded-2xl bg-white text-black border border-neutral-200 text-xs font-mono shadow-[0_10px_30px_rgba(0,0,0,0.1)] leading-relaxed flex items-start gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 bg-white shrink-0 shadow-sm">
                <img src="/logo.jpg" alt="Brandbuzz" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-black font-bold block mb-1 uppercase tracking-wider">24-HOUR RESPONSE GUARANTEE</span>
                <span className="text-neutral-600">Every inquiry is reviewed directly by Tariq Anwar and our core creative team.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white text-black rounded-2xl p-5 xs:p-7 sm:p-10 border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-black text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-black">
                    ENQUIRY TRANSMITTED
                  </h3>
                  <p className="text-neutral-600 max-w-sm mx-auto text-sm leading-relaxed">
                    Opening WhatsApp (+91 99941 69609) to chat with our team directly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919994169609?text=${encodeURIComponent(`Hi Brandbuzz, Name: ${formData.name}, Service: ${formData.service}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-wider rounded-full px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ArrowRight size={13} />
                    </a>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', service: 'Social Media Marketing', message: '' });
                      }}
                      className="font-mono text-xs uppercase tracking-wider rounded-full border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black text-sm focus:outline-none focus:border-black focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold block">
                      SERVICE REQUIRED
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black text-sm focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer shadow-sm"
                    >
                      <option value="Social Media Marketing" className="bg-white text-black">Social Media Marketing</option>
                      <option value="Content Creation" className="bg-white text-black">Content Creation</option>
                      <option value="Product & Corporate Shoots" className="bg-white text-black">Product & Corporate Shoots</option>
                      <option value="Event Photography & Videography" className="bg-white text-black">Event Photography & Videography</option>
                      <option value="Reels & Short-Form Video Content" className="bg-white text-black">Reels & Short-Form Video Content</option>
                      <option value="Brand Promotion" className="bg-white text-black">Brand Promotion</option>
                      <option value="Digital Marketing Strategies" className="bg-white text-black">Digital Marketing Strategies</option>
                      <option value="Social Media Managing" className="bg-white text-black">Social Media Managing</option>
                      <option value="Full Retainer & All Services" className="bg-white text-black">Full Retainer & All Services</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black font-semibold block">
                      MESSAGE & BRIEF *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand goals, target timeline, or creative requirements..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 h-14 bg-black text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-widest font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
                  >
                    <span>{loading ? 'OPENING WHATSAPP...' : 'SEND MESSAGE'}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
