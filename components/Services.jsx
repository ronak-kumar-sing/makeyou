'use client';

import { Section } from '@/components/Section';
import AnimatedList from './AnimatedList';
import GlareHover from './GlareHover';
import { useState } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

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
          role="img"
          aria-label="Web Development icon"
        >
          <title>Web Development</title>
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
      ),
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks like React, Next.js, and Node.js for optimal performance and scalability.',
      features: ['React & Next.js', 'Performance Optimized', 'SEO Friendly', 'Responsive Design']
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
          role="img"
          aria-label="Mobile App Development icon"
        >
          <title>Mobile App Development</title>
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift for seamless user experiences.',
      features: ['React Native', 'Flutter', 'iOS & Android', 'Native Performance']
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
          role="img"
          aria-label="Full-Stack Product Development icon"
        >
          <title>Full-Stack Product Development</title>
          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
        </svg>
      ),
      title: 'Full-Stack Product Development',
      description: 'End-to-end product development from concept to deployment, including backend APIs, databases, cloud infrastructure, and DevOps.',
      features: ['API Development', 'Database Design', 'Cloud Infrastructure', 'CI/CD Pipeline']
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
          role="img"
          aria-label="UI/UX Design icon"
        >
          <title>UI/UX Design</title>
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      ),
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience in mind, from wireframes and prototypes to final pixel-perfect designs.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    }
  ];

  const serviceItems = services.map(service => service.title);

  return (
    <Section
      id="services"
      animateOnScroll={true}
      animationType="fade-in"
      threshold={0.1}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider mb-2 sm:mb-3">
            What We Do
          </p>
          <h2 className="text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight px-4">
            End-to-End Development Services
          </h2>
          <p className="text-[clamp(0.875rem,2vw+0.25rem,1.125rem)] text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            From ideation to deployment, we handle every aspect of your digital product development
          </p>
        </div>

        {/* Desktop View - Grid with GlareHover */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <GlareHover
              key={index}
              width="100%"
              height="auto"
              background="white"
              borderRadius="16px"
              borderColor="#e5e7eb"
              glareColor="#4C8EFF"
              glareOpacity={0.15}
              glareSize={300}
              transitionDuration={650}
              className="hover:shadow-2xl transition-shadow duration-300"
            >
              <article
                className="p-5 sm:p-6 lg:p-8 h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center text-[#4C8EFF] mb-4 sm:mb-5 flex-shrink-0">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-[clamp(1.125rem,2vw+0.5rem,1.5rem)] font-bold text-[#1A1A1A] mb-2 sm:mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-[clamp(0.875rem,1.5vw+0.25rem,1rem)] mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-[#4C8EFF] text-xs font-medium rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="mt-4 sm:mt-5">
                  <button
                    className="text-[#4C8EFF] font-semibold hover:underline inline-flex items-center gap-2 group transition-colors text-sm sm:text-base min-h-[44px] py-2"
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
                </div>
              </article>
            </GlareHover>
          ))}
        </div>

        {/* Mobile/Tablet View - AnimatedList */}
        <div className="lg:hidden flex justify-center">
          <AnimatedList
            items={serviceItems}
            onItemSelect={(item, index) => setSelectedService(services[index])}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
            className="w-full max-w-2xl"
            itemClassName="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
          />
        </div>

        {/* Selected Service Detail for Mobile */}
        {selectedService && (
          <div className="lg:hidden mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{selectedService.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{selectedService.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedService.features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-[#4C8EFF] text-xs font-medium rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Services;
