'use client';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Plan',
      description: 'We start by understanding your goals, target audience, and project requirements to create a comprehensive roadmap.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our design team creates beautiful, intuitive interfaces with wireframes, prototypes, and pixel-perfect mockups.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Develop',
      description: 'Our developers bring designs to life with clean, scalable code using cutting-edge technologies and best practices.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Deploy',
      description: 'We launch your product with thorough testing, optimization, and ongoing support to ensure long-term success.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wide mb-3">
            Our Methodology
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            How We Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A proven process that transforms your ideas into successful digital products
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-[#4C8EFF] to-gray-200"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-[#4C8EFF] transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6">
                  <span className="text-3xl font-bold text-[#4C8EFF]">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-[#4C8EFF] rounded-xl text-white mb-4">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to start your project with us?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#4C8EFF] text-white text-base font-semibold rounded-full hover:bg-[#3d7de6] transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover-scale-sm"
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
