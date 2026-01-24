'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.team-content', {
                scrollTrigger: {
                    trigger: '#team',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.team-image', {
                scrollTrigger: {
                    trigger: '#team',
                    start: 'top 80%',
                },
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: 'power3.out'
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={containerRef} className="section-spacing bg-transparent relative">
            <div className="container-padding max-w-7xl mx-auto pointer-events-none">

                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Image */}
                    <div className="team-image relative w-full md:w-1/2 max-w-md aspect-[4/5] rounded-2xl overflow-hidden pointer-events-auto">
                        <Image
                            src="https://res.cloudinary.com/dyvv2furt/image/upload/v1765101382/j8f04t7bqwhptiipzr3z.png"
                            alt="Ronak Kumar Singh"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl font-bold">Ronak Kumar Singh</h3>
                            <p className="text-white/80">Founder & Lead Architect</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="team-content flex-1 text-center md:text-left pointer-events-auto">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">The Architect</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Building the Future, <br /> One Pixel at a Time.</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            With a background in Computer Science Engineering from Lovely Professional University, I blend technical precision with artistic vision. My goal is to craft digital experiences that are not just functional, but memorable.
                        </p>

                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                                <div className="px-6 py-4 rounded-xl bg-secondary/30 backdrop-blur-sm border border-border">
                                    <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Education</span>
                                    <span className="font-semibold">B.Tech (CSE), LPU</span>
                                </div>
                                <div className="px-6 py-4 rounded-xl bg-secondary/30 backdrop-blur-sm border border-border">
                                    <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Focus</span>
                                    <span className="font-semibold">High-Performance Web Apps</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <a
                                    href="https://ronak.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary font-semibold hover:underline group"
                                >
                                    View Personal Portfolio
                                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
