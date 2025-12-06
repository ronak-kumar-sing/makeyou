'use client';

import { useState } from 'react';
import Magnet from './Magnet';
import ClickSpark from './ClickSpark';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you! We will get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ClickSpark sparkColor="#4C8EFF" sparkCount={12} sparkRadius={25}>
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Contact Info */}
            <div>
              {/* Section Header */}
              <div className="mb-12">
                <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wide mb-3">
                  Get In Touch
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                  Let's Build Something
                  <br />
                  <span className="text-[#4C8EFF]">Amazing Together</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">Email</h3>
                    <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                      <a href="mailto:hello@makeyou.online" className="text-gray-600 hover:text-[#4C8EFF] transition-colors">
                        hello@makeyou.online
                      </a>
                    </ClickSpark>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">Phone</h3>
                    <ClickSpark sparkColor="#4C8EFF" sparkCount={6} sparkRadius={12}>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-[#4C8EFF] transition-colors">
                        +1 (234) 567-890
                      </a>
                    </ClickSpark>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">Location</h3>
                    <p className="text-gray-600">
                      San Francisco, CA
                      <br />
                      Remote-First Company
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {['linkedin', 'twitter', 'github', 'dribbble'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#4C8EFF] hover:text-white transition-all shadow-md hover:shadow-lg"
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
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#4C8EFF] focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#4C8EFF] focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#4C8EFF] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <ClickSpark>
                  <Magnet padding={80} magnetStrength={3}>
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#4C8EFF] text-white text-base font-semibold rounded-full hover:bg-[#3d7de6] transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40"
                    >
                      Request Proposal
                    </button>
                  </Magnet>
                </ClickSpark>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default Contact;
