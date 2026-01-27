'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const { isPreloaderComplete } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isPreloaderComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-text-reveal', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.2
      })
        .from(buttonsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, [isPreloaderComplete]);

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      gsap.to(window, { duration: 1.2, scrollTo: element, ease: 'power3.inOut' });
    }
  };

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      gsap.to(window, { duration: 1, scrollTo: workSection, ease: 'power3.inOut' });
    }
  };

  return (
    <section ref={containerRef} className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-32">


      <div className="container-padding w-full max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

        {/* Text Content */}
        <div ref={textRef} className="flex-1 text-center md:text-left pointer-events-none">
          <div className="overflow-hidden mb-4">
            <div className="hero-text-reveal inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-[#666] uppercase border border-[#e5e5e5] rounded-full bg-white/50 backdrop-blur-sm">
              Available for New Projects
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-text-reveal text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Digital <br />
              <span className="text-gray-400">Architect</span>
            </h1>
          </div>

          <div className="overflow-hidden mb-10 max-w-xl mx-auto md:mx-0">
            <p className="hero-text-reveal text-lg md:text-xl text-muted-foreground leading-relaxed">
              I design and build premium digital experiences that establish trust, elevate brands, and drive conversion.
            </p>
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pointer-events-auto">
            <a href="#contact" onClick={(e) => handleScrollTo('#contact', e)} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="mr-2">Book a Consultation</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button onClick={handleScrollToWork} className="inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              View Work
            </button>
          </div>
        </div>

        {/* Decorative / Image placeholder if needed (optional since we have 3D bg) */}
        {/* We can keep this empty for a minimal look or add a subtle grid/graphic later */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity pointer-events-auto" onClick={handleScrollToWork}>
        <ArrowDown className="w-6 h-6 text-foreground" />
      </div>

    </section>
  );
}
