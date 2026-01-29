'use client';

import Navbar from '../../components/Navbar';
import HeaderTop from '../../components/HeaderTop';
import Footer from '../../components/Footer';
import ProjectGallery from '../../components/ProjectGallery';

export default function GalleryPage() {
    return (
        <div className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden selection:bg-primary/20">
            <HeaderTop />
            <Navbar />

            <main>
                <ProjectGallery />
            </main>

            <Footer />
        </div>
    );
}
