'use client';

import ClickSpark from './ClickSpark';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={36} />
              <span className="text-xl font-bold">
                makeyou.<span className="text-[#4C8EFF]">online</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              We build scalable, high-performance digital products for brands, startups, and enterprises.
              Your vision, our expertise.
            </p>
            <div className="flex gap-3">
              {['linkedin', 'twitter', 'github', 'dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#4C8EFF] hover:text-white transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'linkedin' && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    )}
                    {social === 'github' && (
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    )}
                    {social === 'dribbble' && (
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.753 5.522a10.476 10.476 0 012.135 6.095 23.373 23.373 0 00-5.047-.608c-.212-.483-.43-.96-.664-1.427 1.868-.77 3.377-1.787 4.576-3.06zM12 2.112c2.374 0 4.543.787 6.286 2.112-1.04 1.1-2.39 2-3.98 2.667a28.104 28.104 0 00-3.334-4.658A10.421 10.421 0 0112 2.112zm-1.728.178c1.152 1.522 2.287 3.13 3.38 4.778-2.142.792-4.538 1.238-7.125 1.335.658-2.793 2.122-5.188 3.745-6.113zM2.112 12v-.283c2.736-.03 5.482-.53 8.102-1.5.23.447.448.902.65 1.362-2.898.87-5.332 2.455-7.166 4.617A10.476 10.476 0 012.112 12zm8.613 9.888a10.476 10.476 0 01-6.095-2.135c1.647-2.017 3.87-3.48 6.602-4.32a28.104 28.104 0 001.152 5.787c-.544.224-1.103.42-1.659.668zm3.163-.112a26.452 26.452 0 00-1.09-5.55c1.65-.262 3.37-.39 5.15-.39.604 0 1.19.02 1.762.063a10.476 10.476 0 01-5.822 5.877z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-[#4C8EFF] transition-colors"
                    >
                      {link.name}
                    </button>
                  </ClickSpark>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                  <a href="mailto:hello@makeyou.online" className="hover:text-[#4C8EFF] transition-colors">
                    hello@makeyou.online
                  </a>
                </ClickSpark>
              </li>
              <li>
                <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                  <a href="tel:+1234567890" className="hover:text-[#4C8EFF] transition-colors">
                    +1 (234) 567-890
                  </a>
                </ClickSpark>
              </li>
              <li className="pt-2">
                San Francisco, CA
                <br />
                Remote-First
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} makeyou.online. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <ClickSpark sparkColor="#4C8EFF" sparkCount={4} sparkRadius={10}>
                <a href="#" className="text-gray-400 hover:text-[#4C8EFF] transition-colors">
                  Privacy Policy
                </a>
              </ClickSpark>
              <ClickSpark sparkColor="#4C8EFF" sparkCount={4} sparkRadius={10}>
                <a href="#" className="text-gray-400 hover:text-[#4C8EFF] transition-colors">
                  Terms of Service
                </a>
              </ClickSpark>
              <ClickSpark sparkColor="#4C8EFF" sparkCount={4} sparkRadius={10}>
                <a href="#" className="text-gray-400 hover:text-[#4C8EFF] transition-colors">
                  Cookie Policy
                </a>
              </ClickSpark>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
