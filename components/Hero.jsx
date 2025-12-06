'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextType from './TextType';
import Magnet from './Magnet';
import StarBorder from './StarBorder';
import ClickSpark from './ClickSpark';

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const typeTexts = [
    'Full-Stack Web & App Development online',
    'Full-Stack Web & App Development digital',
    'Full-Stack Web & App Development scalable',
    'Full-Stack Web & App Development modern',
    'Full-Stack Web & App Development premium'
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
        .from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, '-=0.5')
        .from(buttonsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ClickSpark sparkColor="#4C8EFF" sparkCount={12} sparkRadius={25}>
      <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 mt-40">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline with TextType */}
          <div ref={headlineRef} className="mb-8">
            <TextType
              text={typeTexts}
              as="h1"
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={2500}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-tight w-[100%] max-w-4xl mx-auto"
              cursorClassName="text-[#4C8EFF]"
              textColors={['#1A1A1A', '#1A1A1A', '#1A1A1A', '#1A1A1A', '#1A1A1A']}
            />
          </div>

          {/* Subheadline */}
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We build scalable, high-performance digital products for brands, startups, and enterprises.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* View Portfolio - StarBorder */}
            <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
              <StarBorder
                as="button"
                color="#4C8EFF"
                speed="1s"
                className="min-w-[180px]"
                onClick={() => scrollToSection('portfolio')}
              >
                View Portfolio
              </StarBorder>
            </ClickSpark>

            {/* Get Started With Us - Link to AI Todo */}
            <ClickSpark sparkColor="#8B5CF6" sparkCount={10} sparkRadius={20}>
              <Magnet padding={100} magnetStrength={3}>
                <a
                  href="/ai-todo"
                  className="inline-block px-8 py-4 bg-white text-[#1A1A1A] text-base font-semibold rounded-full border-2 border-gray-300 hover:border-[#4C8EFF] hover:text-[#4C8EFF] transition-all shadow-lg hover:shadow-xl min-w-[180px] text-center"
                >
                  Get Started With Us
                </a>
              </Magnet>
            </ClickSpark>
          </div>

          {/* Abstract Illustration Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200 shadow-2xl">
              {/* Abstract tech illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated circles */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#4C8EFF]/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>

                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </div>

                  {/* Center tech icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-gray-200">
                      <svg
                        className="w-12 h-12 text-[#4C8EFF]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default Hero;
