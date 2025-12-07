'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TiltedCard from './TiltedCard';
import GlareHover from './GlareHover';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const projects = [
    {
      id: 'student-nest',
      name: 'Student-nest',
      description: 'Students can rent rooms or PG accommodations, and property owners can list their properties online. Features dedicated dashboards for students, owners, and admins.',
      shortDescription: 'Room and PG rental platform for students',
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/f_auto,q_auto:good,w_800,c_limit/v1765032892/gprlsd0qvqbnvn7fzgfy.png',
      videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=i6pgetbth9c3zitzgv5s&profile=cld-default',
      tags: ['Next.js', 'Shadcn UI', 'Tailwind CSS', 'MongoDB'],
      techStack: ['Next.js', 'Shadcn UI', 'Reactbit', 'Tailwind CSS', 'MongoDB'],
      features: ['Student Dashboard', 'Owner Dashboard', 'Admin Dashboard', 'Property Listings', 'Booking Management'],
      fullDescription: 'Student-nest is a comprehensive platform designed to bridge the gap between students seeking accommodation and property owners looking to rent out their spaces. The platform features three distinct dashboard interfaces tailored for students, property owners, and administrators, ensuring a seamless experience for all user types.',
      gradient: 'from-blue-500 to-cyan-400',
      year: '2024',
      category: 'Web Application'
    },
    {
      id: 'arpufrl-ngo',
      name: 'Arpufrl NGO',
      description: 'A custom-built NGO website with integrated payment processing through Razorpay. Enables the organization to manage donations, showcase their work, and connect with supporters.',
      shortDescription: 'NGO website with donation management',
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/f_auto,q_auto:good,w_800,c_limit/v1765032906/bs1rm0cmvxetgs89oaki.png',
      videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=tbrny4vonlmk5fc6v9it&profile=cld-default',
      tags: ['Next.js', 'Razorpay', 'MongoDB'],
      techStack: ['Next.js', 'Shadcn UI', 'Tailwind CSS', 'MongoDB', 'Razorpay'],
      features: ['Donation Management', 'Event Showcase', 'Contact Forms', 'Payment Integration'],
      fullDescription: 'Arpufrl NGO is a modern, user-friendly website designed to help the organization connect with supporters, showcase their impactful work, and facilitate donations. Built from scratch with custom features tailored to the NGO\'s specific needs, including seamless payment integration through Razorpay.',
      gradient: 'from-purple-500 to-pink-400',
      year: '2024',
      category: 'NGO Website'
    },
    {
      id: 'ngo-admin',
      name: 'Arpufrl NGO Admin',
      description: 'Comprehensive admin dashboard for the NGO to manage donations, track campaigns, handle volunteer registrations, and generate reports. Full-featured content management system.',
      shortDescription: 'Admin dashboard for NGO management',
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/f_auto,q_auto:good,w_800,c_limit/v1765032906/wy3ghlwp3rcclv63nahq.png',
      videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=qoec8nwycauaqpcoua6v&profile=cld-default',
      tags: ['Next.js', 'Admin Panel', 'Analytics'],
      techStack: ['Next.js', 'Shadcn UI', 'Tailwind CSS', 'MongoDB', 'Razorpay'],
      features: ['Campaign Management', 'Donation Tracking', 'Volunteer Management', 'Analytics Dashboard', 'Report Generation'],
      fullDescription: 'The Arpufrl NGO Admin Dashboard is a powerful backend system that provides the NGO team with complete control over their operations. It includes advanced features for managing donations, tracking campaign performance, handling volunteer registrations, and generating detailed reports for stakeholders.',
      gradient: 'from-emerald-500 to-teal-400',
      year: '2024',
      category: 'Admin Dashboard'
    }
  ];

  return (
    <>
      <section id="portfolio" className="py-24 bg-white relative z-10 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider mb-3">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Some of Our Featured Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of successful projects delivered for clients worldwide
            </p>
          </div>

          {/* Projects Grid with TiltedCard on Desktop, Regular on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="group">
                {/* Desktop: TiltedCard with 3D effect */}
                <div className="hidden lg:block">
                  <button
                    onClick={() => handleOpen(project)}
                    className="w-full text-left cursor-pointer"
                    aria-label={`View details for ${project.name}`}
                  >
                    <TiltedCard
                      imageSrc={project.image}
                      altText={`Screenshot of ${project.name} project showing ${project.shortDescription}`}
                      captionText={`Click to view ${project.name}`}
                      containerHeight="400px"
                      containerWidth="100%"
                      imageHeight="320px"
                      imageWidth="100%"
                      scaleOnHover={1.05}
                      rotateAmplitude={12}
                      showMobileWarning={false}
                      showTooltip={true}
                      overlayContent={
                        <div className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl w-full">
                          <span className="inline-block px-3 py-1 bg-[#4C8EFF] text-white text-xs font-semibold rounded-full mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {project.shortDescription}
                          </p>
                        </div>
                      }
                      displayOverlayContent={false}
                    />
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#4C8EFF] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{project.shortDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Mobile/Tablet: Regular card with GlareHover */}
                <div className="lg:hidden">
                  <GlareHover
                    width="100%"
                    height="auto"
                    background="white"
                    borderRadius="16px"
                    borderColor="#e5e7eb"
                    glareColor="#4C8EFF"
                    glareOpacity={0.2}
                    glareSize={250}
                    transitionDuration={600}
                  >
                    <button
                      onClick={() => handleOpen(project)}
                      className="w-full text-left cursor-pointer"
                      aria-label={`View details for ${project.name}`}
                    >
                      <article className="overflow-hidden">
                        {/* Project Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <Image
                            src={project.image}
                            alt={`Screenshot of ${project.name} project`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#4C8EFF] text-xs font-semibold rounded-full">
                            {project.category}
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.shortDescription}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs font-medium text-gray-500">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </button>
                  </GlareHover>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <GlareHover
              width="auto"
              height="auto"
              background="white"
              borderRadius="9999px"
              borderColor="#e5e7eb"
              glareColor="#4C8EFF"
              glareOpacity={0.3}
              glareSize={200}
              transitionDuration={500}
              className="inline-block"
            >
              <button className="px-8 py-4 text-[#1A1A1A] text-base font-semibold hover:text-[#4C8EFF] transition-colors">
                View All Projects
              </button>
            </GlareHover>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center ${isClosing ? 'animate-modal-fade-out' : 'animate-modal-fade-in'
            }`}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className={`relative w-full sm:max-w-4xl sm:mx-4 max-h-[90vh] sm:max-h-[85vh] bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden ${isClosing ? 'animate-modal-slide-down' : 'animate-modal-slide-up'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Handle (Mobile) and Close Button */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between px-6 py-4">
                {/* Mobile drag handle */}
                <div className="flex-1 flex justify-center sm:hidden">
                  <button
                    onClick={handleClose}
                    className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                    aria-label="Close modal"
                  />
                </div>

                {/* Desktop close button */}
                <button
                  onClick={handleClose}
                  className="hidden sm:flex ml-auto items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-4rem)] sm:max-h-[calc(85vh-4rem)] pb-8">
              {/* Video Section - Lazy loaded */}
              {selectedProject.videoEmbed && (
                <div className="px-6 lg:px-8 pt-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl mb-6 bg-gray-200">
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={selectedProject.videoEmbed}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={`${selectedProject.name} video demo`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="px-6 lg:px-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-[#4C8EFF]/10 text-[#4C8EFF] text-sm font-semibold rounded-full mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
                    {selectedProject.name}
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg mb-6">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-[#4C8EFF] flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    onClick={() => {
                      handleClose();
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 350);
                    }}
                    className="flex-1 px-6 py-3 bg-[#4C8EFF] text-white font-semibold rounded-full hover:bg-[#3d7de6] transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4C8EFF] focus:ring-offset-2"
                  >
                    Start Similar Project
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Portfolio;
