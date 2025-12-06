'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from './Magnet';
import ClickSpark from './ClickSpark';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const plans = [
    {
      name: 'Very Basic / Starter Site',
      price: '₹4,200',
      originalPrice: '₹7,000',
      priceRange: '₹4,200 - ₹9,000',
      period: 'per project',
      discount: '40% OFF',
      description: 'Perfect for small personal or starter websites',
      features: [
        '3–5 pages',
        'Template-based design',
        'Contact form',
        'Mobile responsive',
        'Basic hosting & domain guidance'
      ],
      highlighted: false
    },
    {
      name: 'Simple / Small Website',
      price: '₹7,200',
      originalPrice: '₹12,000',
      priceRange: '₹7,200 - ₹15,000',
      period: 'per project',
      discount: '40% OFF',
      description: 'Ideal for small businesses and portfolios',
      features: [
        '5–10 pages',
        'Professional layout',
        'Contact forms',
        'Blog support',
        'Basic SEO setup',
        'CMS access'
      ],
      highlighted: false
    },
    {
      name: 'Standard Business Website',
      price: '₹12,000',
      originalPrice: '₹20,000',
      priceRange: '₹12,000 - ₹24,000',
      period: 'per project',
      discount: '40% OFF',
      description: 'Complete solution for established businesses',
      features: [
        '10–20 pages',
        'Premium theme/custom design',
        'Service pages & gallery',
        'Basic speed optimization',
        'Business-focused SEO',
        'Professional branding'
      ],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Medium / Advance Website',
      price: '₹24,000',
      originalPrice: '₹40,000',
      priceRange: '₹24,000 - ₹45,000',
      period: 'per project',
      discount: '40% OFF',
      description: 'Advanced features for growing businesses',
      features: [
        'Custom CMS',
        'Multiple modules',
        'Appointment/lead system',
        'Analytics integration',
        'Performance boost',
        'Premium hosting guidance'
      ],
      highlighted: false
    },
    {
      name: 'E-commerce / Custom Website',
      price: '₹45,000',
      originalPrice: '₹75,000',
      priceRange: '₹45,000 - ₹90,000+',
      period: 'per project',
      discount: '40% OFF',
      description: 'Full-featured online store with custom solutions',
      features: [
        'Full online store',
        'Product management',
        'Payment gateway integration',
        'Shopping cart & checkout',
        'Admin dashboard',
        'Security features',
        'Inventory management',
        'Coupons & analytics'
      ],
      highlighted: false
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate pricing cards on scroll
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
      <section ref={sectionRef} id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-4">
              🔥 40% OFF Limited Time Offer
            </div>
            <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wide mb-3">
              Pricing Plans
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Flexible Pricing to Fit Every Project
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the package that best suits your needs. All plans include quality code and modern design.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
            {plans.slice(0, 3).map((plan, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative bg-white rounded-2xl border-2 p-6 lg:p-8 transition-all duration-300 ${plan.highlighted
                  ? 'border-[#4C8EFF] shadow-2xl shadow-blue-500/20 md:-mt-4 md:mb-4'
                  : 'border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300'
                  }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-[#4C8EFF] text-white text-xs font-bold rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">
                  {plan.description}
                </p>

                {/* Discount Badge */}
                {plan.discount && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {plan.discount}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    {plan.originalPrice && (
                      <span className="text-2xl font-bold text-gray-400 line-through">{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl lg:text-5xl font-bold text-[#4C8EFF]">{plan.price}</span>
                  </div>
                  {plan.priceRange && (
                    <p className="text-sm text-gray-600 mt-1">{plan.priceRange}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#4C8EFF] flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <ClickSpark sparkColor={plan.highlighted ? "#4C8EFF" : "#8B5CF6"} sparkCount={10} sparkRadius={20}>
                  <Magnet padding={60} magnetStrength={2}>
                    <button
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full py-3.5 text-base font-semibold rounded-full transition-all shadow-lg hover:shadow-xl ${plan.highlighted
                        ? 'bg-[#4C8EFF] text-white hover:bg-[#3d7de6] shadow-blue-500/30'
                        : 'bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border border-gray-300'
                        }`}
                    >
                      Start Project
                    </button>
                  </Magnet>
                </ClickSpark>
              </div>
            ))}
          </div>

          {/* Second Row - Remaining Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto mt-6">
            {plans.slice(3).map((plan, index) => (
              <div
                key={index + 3}
                ref={(el) => (cardsRef.current[index + 3] = el)}
                className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300 p-6 lg:p-8 transition-all duration-300"
              >
                {/* Discount Badge */}
                {plan.discount && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {plan.discount}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    {plan.originalPrice && (
                      <span className="text-2xl font-bold text-gray-400 line-through">{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl lg:text-5xl font-bold text-[#4C8EFF]">{plan.price}</span>
                  </div>
                  {plan.priceRange && (
                    <p className="text-sm text-gray-600 mt-1">{plan.priceRange}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#4C8EFF] flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <ClickSpark sparkColor="#8B5CF6" sparkCount={10} sparkRadius={20}>
                  <Magnet padding={60} magnetStrength={2}>
                    <button
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 text-base font-semibold rounded-full transition-all shadow-lg hover:shadow-xl bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border border-gray-300"
                    >
                      Start Project
                    </button>
                  </Magnet>
                </ClickSpark>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Need a custom solution?{' '}
              <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[#4C8EFF] font-semibold hover:underline"
                >
                  Contact us
                </button>
              </ClickSpark>{' '}
              for a personalized quote.
            </p>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default Pricing;
