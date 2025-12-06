'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import RotatingText from './RotatingText';
import ClickSpark from './ClickSpark';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Logo size={36} />
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[#1A1A1A]">makeyou.</span>
              <RotatingText
                texts={['online', 'digital', 'studio', 'agency', 'tech']}
                rotationInterval={3000}
                staggerDuration={0.02}
                splitBy="characters"
                mainClassName="text-xl font-bold text-[#4C8EFF] overflow-hidden h-7"
                elementLevelClassName="text-[#4C8EFF]"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('hero')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Home
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('services')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Services
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Portfolio
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('process')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Process
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Pricing
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#8B5CF6" sparkCount={6} sparkRadius={12}>
              <a
                href="/ai-todo"
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Todo
              </a>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('team')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Team
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors"
              >
                Contact
              </button>
            </ClickSpark>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-[#4C8EFF] text-white text-sm font-semibold rounded-full hover:bg-[#3d7de6] transition-all"
              >
                Get a Quote
              </button>
            </ClickSpark>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
            <div className="flex flex-col py-4 px-6 space-y-1">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'Services', id: 'services' },
                { name: 'Portfolio', id: 'portfolio' },
                { name: 'Process', id: 'process' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Team', id: 'team' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <ClickSpark key={item.id} sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-3 px-4 text-base font-medium text-gray-700 hover:text-[#4C8EFF] hover:bg-gray-50 rounded-lg transition-colors w-full"
                  >
                    {item.name}
                  </button>
                </ClickSpark>
              ))}
              <ClickSpark sparkColor="#8B5CF6" sparkCount={6} sparkRadius={12}>
                <a
                  href="/ai-todo"
                  className="text-left py-3 px-4 text-base font-medium text-gray-700 hover:text-[#4C8EFF] hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Todo
                </a>
              </ClickSpark>
              <div className="pt-4 border-t border-gray-200 mt-2">
                <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-3 bg-[#4C8EFF] text-white text-base font-semibold rounded-full hover:bg-[#3d7de6] transition-all"
                  >
                    Get a Quote
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
