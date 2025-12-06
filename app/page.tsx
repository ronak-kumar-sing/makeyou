'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Main Content */}
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
