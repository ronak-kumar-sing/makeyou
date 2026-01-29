'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as projectsData, categories, Project } from '../data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGallery() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter(project => project.category === selectedCategory);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate filter buttons
            gsap.from('.filter-btn', {
                scrollTrigger: {
                    trigger: '.filter-container',
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });

            // Animate project cards
            gsap.from('.project-card-item', {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Re-animate cards when category changes
    useLayoutEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.project-card-item');
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );
        }
    }, [selectedCategory]);

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <section ref={containerRef} className="section-spacing relative bg-transparent">
            <div className="container-padding max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16 space-y-4 max-w-3xl">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                        Project Gallery
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Explore Our Work
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Discover our portfolio of cutting-edge digital solutions. Each project represents our commitment to excellence, innovation, and measurable impact.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="filter-container mb-12 flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`filter-btn px-6 py-2.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                    : 'bg-card text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/5'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => handleCardClick(project)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
}
