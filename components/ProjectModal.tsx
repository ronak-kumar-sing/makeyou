'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../data/projectsData';
import gsap from 'gsap';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';

            // Entrance animation
            gsap.fromTo(
                modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );

            gsap.fromTo(
                contentRef.current,
                { scale: 0.9, y: 50, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 }
            );

            // Play video
            if (videoRef.current) {
                videoRef.current.play();
            }
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleClose = () => {
        // Exit animation
        gsap.to(contentRef.current, {
            scale: 0.9,
            y: 50,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });

        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: onClose
        });
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isOpen || !project) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={handleBackdropClick}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-5xl bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 hover:scale-110 group"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6 text-foreground group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Video Section */}
                    <div className="relative bg-black aspect-video md:aspect-auto">
                        <video
                            ref={videoRef}
                            src={project.video}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Category Badge */}
                            <div className="inline-block">
                                <span className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {project.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {project.title}
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>

                            {/* Impact */}
                            <div className="pl-4 border-l-2 border-primary/30">
                                <p className="text-sm font-medium text-foreground/90">
                                    <span className="text-primary font-semibold">Impact:</span> {project.impact}
                                </p>
                            </div>

                            {/* Tech Stack or Additional Info */}
                            <div className="pt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Type:</span> {project.type === 'desktop' ? 'Desktop Application' : 'Mobile Application'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Theme:</span> {project.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        {project.link !== '#' && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 group"
                            >
                                Visit Live Site
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
