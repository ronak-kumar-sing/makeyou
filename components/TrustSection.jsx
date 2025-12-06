'use client';

import { LogoLoop } from './LogoLoop';
import { Code2, Database, Cloud, Box, Terminal, GitBranch, Package, Smartphone, Network, Container } from 'lucide-react';

const TrustSection = () => {
  const techLogos = [
    { node: <div className="flex items-center gap-2"><Code2 className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">React</span></div> },
    { node: <div className="flex items-center gap-2"><Package className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">Next.js</span></div> },
    { node: <div className="flex items-center gap-2"><Terminal className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">Node.js</span></div> },
    { node: <div className="flex items-center gap-2"><Code2 className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">TypeScript</span></div> },
    { node: <div className="flex items-center gap-2"><Database className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">PostgreSQL</span></div> },
    { node: <div className="flex items-center gap-2"><Database className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">MongoDB</span></div> },
    { node: <div className="flex items-center gap-2"><Cloud className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">AWS</span></div> },
    { node: <div className="flex items-center gap-2"><Smartphone className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">Flutter</span></div> },
    { node: <div className="flex items-center gap-2"><Network className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">GraphQL</span></div> },
    { node: <div className="flex items-center gap-2"><Container className="w-6 h-6 text-gray-600" /><span className="text-2xl font-bold text-gray-600">Docker</span></div> },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Our Tech Stack
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Technologies We Master
          </h2>
        </div>

        {/* Logo Loop */}
        <div className="mb-16">
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="white"
            logoHeight={32}
            gap={60}
            className="py-4"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">150+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">98%</div>
            <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">50+</div>
            <div className="text-sm text-gray-600 font-medium">Global Clients</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">5+</div>
            <div className="text-sm text-gray-600 font-medium">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
