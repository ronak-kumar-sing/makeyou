'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import RotatingText from './RotatingText.jsx';
import { useLoading } from '../context/LoadingContext';

export default function HeaderTop() {
  const { isPreloaderComplete } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    if (!isPreloaderComplete) return;

    const ctx = gsap.context(() => {
      gsap.from('.header-top-content', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isPreloaderComplete]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        // Store in localStorage to remember user preference
        localStorage.setItem('headerTopDismissed', 'true');
      }
    });
  };

  // Check if user previously dismissed the banner
  useLayoutEffect(() => {
    const dismissed = localStorage.getItem('headerTopDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-foreground/95 to-primary/95 backdrop-blur-md border-b border-white/10">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="header-top-content py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-primary-foreground relative">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-medium text-background">
              We build
            </span>
            <RotatingText
              texts={[
                'stunning websites',
                'digital solutions', 
                'e-commerce stores',
                'mobile apps',
                'brand identities',
                'marketing campaigns',
                'SEO strategies',
                'business growth'
              ]}
              mainClassName="font-bold text-white min-w-[120px] sm:min-w-[140px] text-center"
              rotationInterval={2500}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              splitBy="words"
              staggerDuration={0.03}
            />
          </div>
          <span className="font-medium text-background text-center">
            for Indian businesses • Starting ₹4,999 • 
            <button 
              onClick={handleClose}
              className="underline hover:no-underline transition-all"
            >
              Skip
            </button>
          </span>
          
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-background/70 hover:text-background transition-colors pointer-events-auto"
            aria-label="Close banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}