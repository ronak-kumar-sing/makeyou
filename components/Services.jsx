'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClickSpark from './ClickSpark';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const services = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
      ),
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks like React, Next.js, and Node.js for optimal performance and scalability.'
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift for seamless user experiences.'
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
        </svg>
      ),
      title: 'Full-Stack Product Development',
      description: 'End-to-end product development from concept to deployment, including backend APIs, databases, cloud infrastructure, and DevOps.'
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      ),
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience in mind, from wireframes and prototypes to final pixel-perfect designs.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on load
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Hover effect for cards
      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.inOut' });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
      <section ref={sectionRef} id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              End-to-End Development Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              From ideation to deployment, we handle every aspect of your digital product development
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-[#4C8EFF] mb-5">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-5">
                  <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                    <button
                      className="text-[#4C8EFF] font-semibold hover:underline inline-flex items-center gap-2 group"
                      aria-label={`Learn more about ${service.title}`}
                    >
                    Learn More
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </ClickSpark>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default Services;
