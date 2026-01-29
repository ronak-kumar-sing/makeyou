'use client';

import { useRef } from 'react';
import { Project } from '../data/projectsData';
import gsap from 'gsap';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
    index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
            scale: 1.05,
            duration: 0.4,
            ease: 'power2.out'
        });

        gsap.to(imageRef.current, {
            scale: 1.1,
            duration: 0.6,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });

        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
        });
    };

    // Gradient colors based on index
    const gradients = [
        'from-blue-500/20 via-purple-500/20 to-pink-500/20',
        'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
        'from-orange-500/20 via-red-500/20 to-pink-500/20',
        'from-violet-500/20 via-purple-500/20 to-indigo-500/20',
        'from-yellow-500/20 via-orange-500/20 to-red-500/20'
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <div
            ref={cardRef}
            className="project-card-item group relative cursor-pointer"
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card Container */}
            <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">

                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <div
                        ref={imageRef}
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url(${project.imageDesktop})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View Details Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold tracking-wide border border-white/20">
                            View Details
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                    {/* Category Badge */}
                    <div className="inline-block">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Impact */}
                    <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-primary">Impact:</span> {project.impact}
                        </p>
                    </div>
                </div>

                {/* Glowing Border Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient.replace(/\/20/g, '/50')} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
            </div>
        </div>
    );
}
