'use client';

import { Button } from './Button';
import Image from 'next/image';
import GlareHover from './GlareHover';
import FlowingMenu from './FlowingMenu';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 lg:mt-40 overflow-hidden">
        {/* Background LaserFlow effect - will add separately */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        </div>

        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          {/* Main Headline with Rotating Text */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <h1 className="text-[clamp(1.75rem,5vw+1rem,4.5rem)] font-bold leading-[1.1] max-w-4xl mx-auto px-4 text-[#1A1A1A]">
              Full-Stack Web & App Development
            </h1>
          </div>          {/* Subheadline */}
          <p className="text-[clamp(0.9375rem,2vw+0.5rem,1.25rem)] text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 animate-fade-in-up opacity-0 delay-400 [animation-fill-mode:forwards]">
            We build scalable, high-performance digital products for brands, startups, and enterprises.
          </p>

          {/* CTA Buttons with GlareHover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 animate-fade-in-up opacity-0 delay-600 [animation-fill-mode:forwards]">
            {/* View Portfolio */}
            <GlareHover
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="9999px"
              borderColor="transparent"
              glareColor="#4C8EFF"
              glareOpacity={0.3}
              glareSize={200}
              transitionDuration={500}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={() => scrollToSection('portfolio')}
                variant="primary"
                size="lg"
                animation="scale"
                className="w-full sm:w-auto min-w-[180px] rounded-full"
              >
                View Portfolio
              </Button>
            </GlareHover>

            {/* Get Started With Us - Link to AI Todo */}
            <GlareHover
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="9999px"
              borderColor="transparent"
              glareColor="#8B5CF6"
              glareOpacity={0.3}
              glareSize={200}
              transitionDuration={500}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={() => (window.location.href = '/ai-todo')}
                variant="outline"
                size="lg"
                animation="scale"
                className="w-full sm:w-auto min-w-[180px] rounded-full"
              >
                Get Started With Us
              </Button>
            </GlareHover>
          </div>

          {/* Hero Illustration */}
          <div className="relative w-full max-w-5xl mx-auto px-4 animate-fade-in-up opacity-0 delay-800 [animation-fill-mode:forwards]">
            <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200 shadow-2xl">
              {/* Abstract tech illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated circles */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#4C8EFF]/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>

                  {/* Background pattern with OptimizedImage */}
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=75&w=1200&auto=format&fit=crop&fm=webp"
                      alt="Abstract technology background"
                      className="w-full h-full object-cover"
                    />
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
                        aria-hidden="true"
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

      {/* Scrolling Text Below Hero */}
      <div className="mt-12 mb-20 h-[500px] md:h-[600px]">
        <FlowingMenu
          items={[
            {
              link: '#services',
              text: 'Web Development',
              image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
            },
            {
              link: '#services',
              text: 'Mobile Apps',
              image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
            },
            {
              link: '#services',
              text: 'E-commerce',
              image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop'
            },
            {
              link: '#services',
              text: 'SaaS Solutions',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
            },
            {
              link: '#services',
              text: 'UI/UX Design',
              image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
            },
            {
              link: '#services',
              text: 'API Integration',
              image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
            }
          ]}
        />
      </div>
    </>
  );
};

export default Hero;
