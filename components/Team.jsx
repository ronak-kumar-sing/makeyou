'use client';

import ChromaGrid from './ChromaGrid';
import { Section } from './Section';

const Team = () => {
  const teamMembers = [
    {
      image: 'https://res.cloudinary.com/dyvv2furt/image/upload/v1765101382/j8f04t7bqwhptiipzr3z.png',
      title: 'Ronak Kumar',
      subtitle: 'Founder & Lead Developer',
      handle: '@ronakkumar',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://linkedin.com/in/ronak-ku'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Demo Member 1',
      subtitle: 'Full Stack Developer',
      handle: '@demo1',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Demo Member 2',
      subtitle: 'UI/UX Designer',
      handle: '@demo2',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://linkedin.com/in/'
    }
  ];

  return (
    <Section id="team" animationType="fade-in" threshold={0.15} className="py-24 bg-gradient-to-b from-gray-50 to-white relative z-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider mb-3">
            Our Team
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Meet the People Behind makeyou.online
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            A passionate team of designers, developers, and strategists dedicated to bringing your vision to life
          </p>
        </div>

        {/* ChromaGrid Team Cards */}
        <div className="flex justify-center mb-16">
          <ChromaGrid
            items={teamMembers}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            className="w-full"
          />
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">15+</div>
            <div className="text-sm text-gray-600 font-medium">Years Combined Experience</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">200+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">50+</div>
            <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl md:text-5xl font-bold text-[#4C8EFF] mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Support Available</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Team;
