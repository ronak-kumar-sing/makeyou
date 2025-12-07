'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import RotatingText from './RotatingText';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileMenuRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Navigation sections
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  // Handle scroll for navbar background and progress indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Focus first element when menu opens
      firstFocusableRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }

        // Tab key navigation
        if (e.key === 'Tab') {
          const focusableElements = mobileMenuRef.current?.querySelectorAll(
            'button, a, [tabindex]:not([tabindex="-1"])'
          );

          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          // Shift + Tab on first element -> go to last
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
          // Tab on last element -> go to first
          else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scroll Progress Indicator */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#4C8EFF] to-[#3d7de6] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] focus-visible:ring-offset-2 rounded-lg"
            onClick={() => scrollToSection('hero')}
            aria-label="Go to home section"
          >
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
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-link text-sm font-medium transition-colors relative group ${activeSection === id
                    ? 'text-[#4C8EFF]'
                    : 'text-gray-700 hover:text-[#4C8EFF]'
                  }`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
                {/* Animated underline */}
                <span
                  className={`absolute left-0 bottom-[-4px] h-0.5 bg-[#4C8EFF] transition-all duration-300 ${activeSection === id
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                    }`}
                />
              </button>
            ))}
            <a
              href="/ai-todo"
              className="nav-link text-sm font-medium text-gray-700 hover:text-[#4C8EFF] transition-colors flex items-center gap-1 relative group"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Todo
              {/* Animated underline */}
              <span className="absolute left-0 bottom-[-4px] h-0.5 bg-[#4C8EFF] w-0 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-[#4C8EFF] text-white text-sm font-semibold rounded-full hover:bg-[#3d7de6] transition-all hover-scale-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] focus-visible:ring-offset-2"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="hamburger-icon">
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col py-4 px-6 space-y-1">
            {sections.map((item, index) => (
              <button
                key={item.id}
                ref={index === 0 ? firstFocusableRef : null}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-3 px-4 text-base font-medium rounded-lg transition-colors w-full min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] focus-visible:ring-inset ${activeSection === item.id
                    ? 'text-[#4C8EFF] bg-blue-50'
                    : 'text-gray-700 hover:text-[#4C8EFF] hover:bg-gray-50'
                  }`}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/ai-todo"
              className="text-left py-3 px-4 text-base font-medium text-gray-700 hover:text-[#4C8EFF] hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] focus-visible:ring-inset"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Todo
            </a>
            <div className="pt-4 border-t border-gray-200 mt-2">
              <button
                ref={lastFocusableRef}
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 min-h-[44px] bg-[#4C8EFF] text-white text-base font-semibold rounded-full hover:bg-[#3d7de6] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8EFF] focus-visible:ring-offset-2"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
