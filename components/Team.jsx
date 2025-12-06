'use client';

import ClickSpark from './ClickSpark';

import ChromaGrid from './ChromaGrid';

const Team = () => {
  const teamMembers = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'John Doe',
      subtitle: 'Founder & CEO',
      handle: '@johndoe',
      borderColor: '#4C8EFF',
      gradient: 'linear-gradient(145deg, #4C8EFF, #1a1a2e)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jane Smith',
      subtitle: 'Lead Developer',
      handle: '@janesmith',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(210deg, #8B5CF6, #1a1a2e)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Mike Johnson',
      subtitle: 'UI/UX Designer',
      handle: '@mikejohnson',
      borderColor: '#10B981',
      gradient: 'linear-gradient(165deg, #10B981, #1a1a2e)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Sarah Williams',
      subtitle: 'Project Manager',
      handle: '@sarahwilliams',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(195deg, #F59E0B, #1a1a2e)',
      url: 'https://linkedin.com/in/'
    }
  ];

  return (
    <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
      <section id="team" className="py-24 bg-[#0a0a0a] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#4C8EFF] uppercase tracking-wider mb-3">
              Our Team
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Meet the People Behind makeyou.online
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              A passionate team of designers, developers, and strategists dedicated to bringing your vision to life
            </p>
          </div>

          {/* Team ChromaGrid */}
          <div className="min-h-[500px]">
            <ChromaGrid
              items={teamMembers}
              radius={350}
              damping={0.45}
              fadeOut={0.6}
              className="justify-center gap-6"
            />
          </div>

          {/* Join Team CTA */}
          <div className="text-center mt-16 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-3">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              We're always looking for talented individuals who are passionate about creating amazing digital experiences.
            </p>
            <ClickSpark sparkColor="#4C8EFF" sparkCount={10} sparkRadius={20}>
              <button className="px-8 py-3.5 bg-[#4C8EFF] text-white text-base font-semibold rounded-full hover:bg-[#3d7de6] transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl">
                View Open Positions
              </button>
            </ClickSpark>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
};

export default Team;
