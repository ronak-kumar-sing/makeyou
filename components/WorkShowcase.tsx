'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import DeviceFrame from './DeviceFrame';
import { projects } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function WorkShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const projects = gsap.utils.toArray('.project-card');

            projects.forEach((project: any) => {
                gsap.from(project, {
                    scrollTrigger: {
                        trigger: project,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse'
                    },
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={containerRef} className="section-spacing relative bg-transparent">
            <div className="container-padding max-w-7xl mx-auto pointer-events-none">
                <div className="mb-20 space-y-4 max-w-2xl">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Selected Work</h2>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Engineered for Impact</h3>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`project-card flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center pointer-events-auto`}>

                            {/* Visuals */}
                            <div className="flex-1 w-full relative group perspective-1000">
                                {/* We show alternating device types for visual interest */}
                                <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.01] cursor-pointer" onClick={() => window.open(project.link, '_blank')}>
                                    {project.type === 'desktop' ? (
                                        <DeviceFrame
                                            type="desktop"
                                            src={project.imageDesktop}
                                            videoSrc={project.video}
                                            alt={project.title}
                                        />
                                    ) : (
                                        <div className="flex justify-center">
                                            <DeviceFrame
                                                type="mobile"
                                                src={project.imageMobile}
                                                videoSrc={project.video}
                                                alt={project.title}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Decorative Elements */}
                                <div className={`absolute -inset-4 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-500/10 to-purple-500/10' : 'from-emerald-500/10 to-blue-500/10'} blur-2xl -z-10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <span className="text-primary font-medium">{project.category}</span>
                                    <h4 className="text-3xl md:text-4xl font-bold">{project.title}</h4>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="pl-4 border-l-2 border-primary/20">
                                    <p className="text-sm font-medium text-foreground">{project.impact}</p>
                                </div>

                                <div className="pt-4">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold tracking-wide uppercase group/link">
                                        View Case Study
                                        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Projects Button */}
                <div className="mt-24 flex justify-center pointer-events-auto">
                    <Link
                        href="/gallery"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 hover:from-primary/20 hover:via-primary/10 hover:to-primary/20 border border-primary/20 rounded-full font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 overflow-hidden"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <span className="relative z-10">See More Projects</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />

                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
