'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Code, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const projectsData = [
  {
    id: 'student-nest',
    name: 'Student-nest',
    description: 'Students can rent rooms or PG accommodations, and property owners can list their properties online. Features dedicated dashboards for students, owners, and admins.',
    fullDescription: 'Student-nest is a comprehensive platform designed to bridge the gap between students seeking accommodation and property owners looking to rent out their spaces. The platform features three distinct dashboard interfaces tailored for students, property owners, and administrators, ensuring a seamless experience for all user types.',
    image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png',
    videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=i6pgetbth9c3zitzgv5s&profile=cld-default',
    techStack: ['Next.js', 'Shadcn UI', 'Reactbit', 'Tailwind CSS', 'MongoDB'],
    features: [
      'Student Dashboard for browsing and booking accommodations',
      'Owner Dashboard for listing and managing properties',
      'Admin Dashboard for platform oversight and management',
      'Property Listings with detailed information and photos',
      'Booking Management system with real-time updates',
      'Search and filter functionality',
      'User authentication and authorization',
      'Responsive design for mobile and desktop'
    ],
    gradient: 'from-blue-500 to-cyan-400',
    year: '2024',
    category: 'Web Application'
  },
  {
    id: 'arpufrl-ngo',
    name: 'Arpufrl NGO',
    description: 'A custom-built NGO website with integrated payment processing through Razorpay. Enables the organization to manage donations, showcase their work, and connect with supporters.',
    fullDescription: 'Arpufrl NGO is a modern, user-friendly website designed to help the organization connect with supporters, showcase their impactful work, and facilitate donations. Built from scratch with custom features tailored to the NGO\'s specific needs, including seamless payment integration through Razorpay.',
    image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/bs1rm0cmvxetgs89oaki.png',
    videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=tbrny4vonlmk5fc6v9it&profile=cld-default',
    techStack: ['Next.js', 'Shadcn UI', 'Tailwind CSS', 'MongoDB', 'Razorpay'],
    features: [
      'Donation Management with Razorpay integration',
      'Event Showcase to highlight NGO activities',
      'Contact Forms for supporter engagement',
      'Payment Integration for secure transactions',
      'Gallery for showcasing impact stories',
      'Newsletter subscription',
      'SEO optimization',
      'Mobile-responsive design'
    ],
    gradient: 'from-purple-500 to-pink-400',
    year: '2024',
    category: 'NGO Website'
  },
  {
    id: 'ngo-admin',
    name: 'Arpufrl NGO Admin',
    description: 'Comprehensive admin dashboard for the NGO to manage donations, track campaigns, handle volunteer registrations, and generate reports. Full-featured content management system.',
    fullDescription: 'The Arpufrl NGO Admin Dashboard is a powerful backend system that provides the NGO team with complete control over their operations. It includes advanced features for managing donations, tracking campaign performance, handling volunteer registrations, and generating detailed reports for stakeholders.',
    image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765032906/wy3ghlwp3rcclv63nahq.png',
    videoEmbed: 'https://player.cloudinary.com/embed/?cloud_name=dyvv2furt&public_id=qoec8nwycauaqpcoua6v&profile=cld-default',
    techStack: ['Next.js', 'Shadcn UI', 'Tailwind CSS', 'MongoDB', 'Razorpay'],
    features: [
      'Campaign Management for tracking initiatives',
      'Donation Tracking with detailed analytics',
      'Volunteer Management system',
      'Analytics Dashboard with key metrics',
      'Report Generation for stakeholders',
      'User role management',
      'Content management system',
      'Email notification system',
      'Export data functionality'
    ],
    gradient: 'from-emerald-500 to-teal-400',
    year: '2024',
    category: 'Admin Dashboard'
  }
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/#portfolio" className="text-[#4C8EFF] hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/#portfolio')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#4C8EFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Media Section */}
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="relative bg-gray-200" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={project.videoEmbed}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">About the Project</h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4C8EFF] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screenshots/Additional Images would go here */}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-[#4C8EFF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Project Info</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Category</dt>
                    <dd className="text-gray-900 font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Year</dt>
                    <dd className="text-gray-900 font-medium">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Technologies</dt>
                    <dd className="text-gray-900 font-medium">{project.techStack.length} Technologies</dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#4C8EFF] to-[#3A7AE8] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3">Interested in Similar Work?</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Let's discuss how we can bring your project to life with cutting-edge technology.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-white text-[#4C8EFF] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Get in Touch
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Projects */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">
            More Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData
              .filter(p => p.id !== projectId)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.id}`}
                  className="group"
                >
                  <article className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#4C8EFF] transition-colors">
                        {relatedProject.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
