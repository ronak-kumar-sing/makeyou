'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WorkShowcase from '../components/WorkShowcase';
import TrustSection from '../components/TrustSection';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import Team from '../components/Team';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden selection:bg-primary/20">

      <Navbar />

      <main>
        <Hero />
        <WorkShowcase />
        <TrustSection />
        <Team />
        <Pricing />
      </main>

      <Footer />

    </div>
  );
}
