import React from 'react';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';
import { VideoSection } from './components/VideoSection';
import { Skiper30 } from './components/ui/skiper30';
import { Founder } from './components/Founder';
import { VisualPathGallery } from './components/VisualPathGallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-white text-[#111111] overflow-x-hidden selection:bg-black selection:text-white">
        {/* 4-Item Sticky Navbar: Home, Services, Abt, Contact */}
        <Navbar />

      {/* Main Sections */}
      <main>
        {/* Page 1: Home */}
        <Hero />

        {/* Page 2: Services */}
        <Services />

        {/* Parallax Scrolling Section (Replacing Projects section before the Video section) */}
        <div id="projects">
          <ParallaxComponent title="BRANDBUZZ" showContent={false} />
        </div>

        {/* Video Section: 6 High-Impact Commercial & Creative Videos */}
        <VideoSection />

        {/* Skiper30 Parallax Effect (Immediately after the Video Section) */}
        <Skiper30 />

        {/* Page 3: Abt (Founder & Vision with 21st.dev ASCII Wave Canvas) */}
        <Founder />

        {/* Dynamic Curvilinear Asset Motion (Under the Founder Page) */}
        <VisualPathGallery />

        {/* Page 4: Contact */}
        <Contact />
      </main>

      {/* Clean White Minimal Footer */}
      <Footer />
    </div>
  </SmoothScrollProvider>
  );
}

export default App;
