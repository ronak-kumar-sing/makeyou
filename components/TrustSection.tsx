'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        num: '01',
        title: 'Discovery & Strategy',
        description: 'We dig deep into your business goals, audience, and market position to build a roadmap for success.',
    },
    {
        num: '02',
        title: 'Design & Prototype',
        description: 'Translating strategy into visual languages. We iterate on high-fidelity designs that align with your brand.',
    },
    {
        num: '03',
        title: 'Development',
        description: 'Clean, pixel-perfect code using modern frameworks. Performance and SEO are baked in from line one.',
    },
    {
        num: '04',
        title: 'Launch & Scale',
        description: 'A smooth deployment effectively followed by post-launch support to help you grow without friction.',
    },
];

const stats = [
    { label: 'Projects Completed', value: '120+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Revenue Generated', value: '$2M+' },
];

export default function TrustSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger stats entrance
            gsap.from('.stat-item', {
                scrollTrigger: {
                    trigger: '.stats-container',
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            });

            // Timeline visualization
            const steps = gsap.utils.toArray('.process-step');
            steps.forEach((step: any, i) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="section-spacing bg-transparent relative overflow-hidden">
            <div className="container-padding max-w-7xl mx-auto pointer-events-none">

                {/* Stats Grid */}
                <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-border/50 py-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-item text-center">
                            <div className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-primary">{stat.value}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* How I Work */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Designed for clarity and speed.</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I don’t just deliver a website; I deliver a system connected to your business objectives. My process eliminates guesswork and ensures pixel-perfect results every time.
                        </p>
                        <div className="mt-8">
                            <a href="#contact" className="text-primary font-semibold hover:underline pointer-events-auto">Start a Project &rarr;</a>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {processSteps.map((step, i) => (
                            <div key={i} className="process-step flex gap-6">
                                <div className="flex-shrink-0 mt-1">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-xs font-mono font-medium text-muted-foreground">
                                        {step.num}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
