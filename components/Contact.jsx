'use client';

import { useState } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import GlareHover from './GlareHover';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Spam prevention field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      console.log('Spam detected');
      return;
    }

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'honeypot') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" animationType="fade-in" threshold={0.15} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Info */}
          <div>
            <div className="mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-semibold text-[#4C8EFF] uppercase tracking-wide mb-2 sm:mb-3">
                Get In Touch
              </p>
              <h2 className="text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
                Let's Build Something
                <br />
                <span className="text-[#4C8EFF]">Amazing Together</span>
              </h2>
              <p className="text-[clamp(0.9375rem,2vw+0.25rem,1.125rem)] text-gray-600 leading-relaxed">
                Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                <GlareHover
                  width="100%"
                  height="auto"
                  background="transparent"
                  borderRadius="0px"
                  borderColor="transparent"
                  glareColor="#4C8EFF"
                  glareOpacity={0.1}
                  glareSize={200}
                  transitionDuration={500}
                >
                  <div className="flex items-start gap-3 sm:gap-4">\n                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm sm:text-base">Email</h3>
                      <a
                        href="mailto:hello@makeyou.online"
                        className="text-gray-600 hover:text-[#4C8EFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4C8EFF] focus:ring-offset-2 rounded text-sm sm:text-base min-h-[44px] inline-block py-1"
                      >
                        hello@makeyou.online
                      </a>
                    </div>
                  </div>
                </GlareHover>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                <GlareHover
                  width="100%"
                  height="auto"
                  background="transparent"
                  borderRadius="0px"
                  borderColor="transparent"
                  glareColor="#4C8EFF"
                  glareOpacity={0.1}
                  glareSize={200}
                  transitionDuration={500}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm sm:text-base">Phone</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 hover:text-[#4C8EFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4C8EFF] focus:ring-offset-2 rounded text-sm sm:text-base min-h-[44px] inline-block py-1"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                </GlareHover>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                <GlareHover
                  width="100%"
                  height="auto"
                  background="transparent"
                  borderRadius="0px"
                  borderColor="transparent"
                  glareColor="#4C8EFF"
                  glareOpacity={0.1}
                  glareSize={200}
                  transitionDuration={500}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-[#4C8EFF] flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm sm:text-base">Location</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        San Francisco, CA
                        <br />
                        Remote-First Company
                      </p>
                    </div>
                  </div>
                </GlareHover>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h3>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { name: 'linkedin', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { name: 'twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                  { name: 'github', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                  { name: 'dribbble', path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.753 5.522a10.476 10.476 0 012.135 6.095 23.373 23.373 0 00-5.047-.608c-.212-.483-.43-.96-.664-1.427 1.868-.77 3.377-1.787 4.576-3.06zM12 2.112c2.374 0 4.543.787 6.286 2.112-1.04 1.1-2.39 2-3.98 2.667a28.104 28.104 0 00-3.334-4.658A10.421 10.421 0 0112 2.112zm-1.728.178c1.152 1.522 2.287 3.13 3.38 4.778-2.142.792-4.538 1.238-7.125 1.335.658-2.793 2.122-5.188 3.745-6.113zM2.112 12v-.283c2.736-.03 5.482-.53 8.102-1.5.23.447.448.902.65 1.362-2.898.87-5.332 2.455-7.166 4.617A10.476 10.476 0 012.112 12zm8.613 9.888a10.476 10.476 0 01-6.095-2.135c1.647-2.017 3.87-3.48 6.602-4.32a28.104 28.104 0 001.152 5.787c-.544.224-1.103.42-1.659.668zm3.163-.112a26.452 26.452 0 00-1.09-5.55c1.65-.262 3.37-.39 5.15-.39.604 0 1.19.02 1.762.063a10.476 10.476 0 01-5.822 5.877z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#4C8EFF] hover:text-white transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4C8EFF] focus:ring-offset-2"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-200 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Your Name <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all ${errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-[#4C8EFF] focus:ring-blue-100'
                    }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Email Address <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all ${errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-[#4C8EFF] focus:ring-blue-100'
                    }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Your Message <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={6}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none ${errors.message
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-[#4C8EFF] focus:ring-blue-100'
                    }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div
                  className="p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <div>
                      <h4 className="text-sm font-semibold text-green-900 mb-1">Message sent successfully!</h4>
                      <p className="text-sm text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div
                  className="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <div>
                      <h4 className="text-sm font-semibold text-red-900 mb-1">Something went wrong</h4>
                      <p className="text-sm text-red-700">Please try again or email us directly at hello@makeyou.online</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                className="shadow-blue-500/30"
              >
                {isSubmitting ? 'Sending...' : 'Request Proposal'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
