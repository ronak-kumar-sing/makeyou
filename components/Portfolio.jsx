'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TiltedCard from './TiltedCard';
import ClickSpark from './ClickSpark';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
      }
    });
    
    tl.to(contentRef.current, {
      y: '100%',
      duration: 0.4,
      ease: 'power2.in'
    }, 0)
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0);
  };

  useEffect(() => {
    if (selectedProject && modalRef.current && backdropRef.current && contentRef.current) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate in
      gsap.set(contentRef.current, { y: '100%' });
      gsap.set(backdropRef.current, { opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(contentRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.1');
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 'student-nest',
      name: 'Student-nest',
      description: 'Students can rent rooms or PG accommodations, and property owners can list their properties online. Features dedicated dashboards for students, owners, and admins.',
      shortDescription: 'Room and PG rental platform for students',
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png',
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
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/bs1rm0cmvxetgs89oaki.png',
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
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/wy3ghlwp3rcclv63nahq.png',
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
      <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
        <section id="portfolio" className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

            {/* Projects  </Grid> */}
            <div className=" flex gap-8 justify-center">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="block w-full group cursor-pointer"
                >
                  <div className="relative">
                    <TiltedCard
                      imageSrc={project.image}
                      altText={project.name}
                      captionText={project.name}
                      containerHeight="10%"
                      containerWidth="100%"
                      imageHeight="280px"
                      imageWidth="100%"
                      scaleOnHover={1.02}
                      rotateAmplitude={5}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={false}
                    />
                    {/* Project Info Overlay */}
                    {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 rounded-b-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/90 text-base mb-4">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div> */}
                  </div>
                </button>
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="text-center mt-12">
              <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
                <button className="px-8 py-4 bg-gray-100 text-[#1A1A1A] text-base font-semibold rounded-full border border-gray-200 hover:border-[#4C8EFF] hover:bg-white transition-all shadow-md hover:shadow-lg">
                  View All Projects
                </button>
              </ClickSpark>
            </div>
          </div>
        </section>
      </ClickSpark>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div ref={backdropRef} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content - Slides up from bottom */}
          <div
            ref={contentRef}
            className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Handle */}
            <ClickSpark sparkColor="#ff4444" sparkCount={8} sparkRadius={15}>
              <div className="flex justify-center pt-4 pb-2 cursor-pointer" onClick={handleClose}>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors" />
              </div>
            </ClickSpark>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-3rem)] pb-8">
              {/* Video Section */}
              <div className="px-6 lg:px-8 pt-4">
                <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
                  <div className="relative bg-gray-200" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={selectedProject.videoEmbed}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="px-6 lg:px-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#4C8EFF]/10 text-[#4C8EFF] text-sm font-semibold rounded-full mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
                    {selectedProject.name}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
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
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#4C8EFF] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      handleClose();
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 350);
                    }}
                    className="flex-1 px-6 py-3 bg-[#4C8EFF] text-white font-semibold rounded-full hover:bg-[#3d7de6] transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Similar Project
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-down {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes backdrop-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slide-down {
          animation: slide-down 0.3s cubic-bezier(0.7, 0, 0.84, 0);
        }
        .animate-backdrop-in {
          animation: backdrop-in 0.3s ease-out;
        }
        .animate-backdrop-out {
          animation: backdrop-out 0.3s ease-in;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up,
          .animate-slide-down,
          .animate-backdrop-in,
          .animate-backdrop-out {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default Portfolio;
