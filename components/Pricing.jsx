'use client';

import { Section } from './Section';
import { Button } from './Button';

const Pricing = () => {
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="pricing" animationType="slide-up" threshold={0.15} className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            🔥 40% OFF Limited Time Offer
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#4C8EFF] uppercase tracking-wide mb-2 sm:mb-3">
            Pricing Plans
          </p>
          <h2 className="text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight px-4">
            Flexible Pricing to Fit Every Project
          </h2>
          <p className="text-[clamp(0.9375rem,2vw+0.25rem,1.125rem)] text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Choose the package that best suits your needs. All plans include quality code and modern design.
          </p>
        </div>

        {/* Pricing Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {plans.slice(0, 3).map((plan, index) => (
            <article
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-6 lg:p-8 transition-all duration-300 ${plan.highlighted
                ? 'border-[#4C8EFF] shadow-2xl shadow-blue-500/20 md:-mt-4 md:mb-4'
                : 'border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300'
                }`}
              aria-label={`${plan.name} pricing plan`}
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
              <div className="mb-6" aria-label={`Price: ${plan.price} ${plan.period}`}>
                <div className="flex items-baseline gap-3">
                  {plan.originalPrice && (
                    <span
                      className="text-2xl font-bold text-gray-400 line-through"
                      aria-label={`Original price: ${plan.originalPrice}`}
                    >
                      {plan.originalPrice}
                    </span>
                  )}
                  <span
                    className="text-4xl lg:text-5xl font-bold text-[#4C8EFF]"
                    aria-label={`Current price: ${plan.price}`}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.priceRange && (
                  <p className="text-sm text-gray-600 mt-1">{plan.priceRange}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8" aria-label="Plan features">
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
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={scrollToContact}
                variant={plan.highlighted ? 'primary' : 'secondary'}
                size="lg"
                fullWidth
                className={plan.highlighted ? 'shadow-blue-500/30' : ''}
              >
                Start Project
              </Button>
            </article>
          ))}
        </div>

        {/* Second Row - Remaining Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto mt-6">
          {plans.slice(3).map((plan, index) => (
            <article
              key={index + 3}
              className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300 p-6 lg:p-8 transition-all duration-300"
              aria-label={`${plan.name} pricing plan`}
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
              <div className="mb-6" aria-label={`Price: ${plan.price} ${plan.period}`}>
                <div className="flex items-baseline gap-3">
                  {plan.originalPrice && (
                    <span
                      className="text-2xl font-bold text-gray-400 line-through"
                      aria-label={`Original price: ${plan.originalPrice}`}
                    >
                      {plan.originalPrice}
                    </span>
                  )}
                  <span
                    className="text-4xl lg:text-5xl font-bold text-[#4C8EFF]"
                    aria-label={`Current price: ${plan.price}`}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.priceRange && (
                  <p className="text-sm text-gray-600 mt-1">{plan.priceRange}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8" aria-label="Plan features">
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
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={scrollToContact}
                variant="secondary"
                size="lg"
                fullWidth
              >
                Start Project
              </Button>
            </article>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom solution?{' '}
            <button
              onClick={scrollToContact}
              className="text-[#4C8EFF] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#4C8EFF] focus:ring-offset-2 rounded"
              aria-label="Contact us for a personalized quote"
            >
              Contact us
            </button>{' '}
            for a personalized quote.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
