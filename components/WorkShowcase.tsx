'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import DeviceFrame from './DeviceFrame';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Student Nest",
        category: "Real Estate Tech",
        description: "A comprehensive platform for students to book PGs and rooms. Built with Next.js, TailwindCSS, Shadcn UI, and integrated Google Maps.",
        impact: "Simplified housing search for thousands of students.",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png", // Fallback if needed, though we use desktop mostly
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1765032892/gprlsd0qvqbnvn7fzgfy.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1765032509/i6pgetbth9c3zitzgv5s.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 2,
        title: "Cricket Hub",
        category: "Live Sports Analytics",
        description: "Real-time cricket and football scores powered by Node.js and Socket.io. Features live updates and detailed match statistics.",
        impact: "Delivers updates with sub-second latency.",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180305/tr5notfn5j8boietkbzq.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180305/tr5notfn5j8boietkbzq.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769179954/rbjf9hifdqq0xuynsxmd.mov",
        theme: "dark",
        type: "desktop"
    },
    {
        id: 3,
        title: "Cafe Coffee Roan",
        category: "Brand Presence",
        description: "A high-impact website designed to stand out in the competitive cafe market. Built with Next.js for speed and SEO.",
        impact: "Elevated brand perception and digital footfall.",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179375/csbbjh1ja0mmcpsqipdb.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179375/csbbjh1ja0mmcpsqipdb.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769179771/i5jfccfyiheamebzeowh.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 4,
        title: "Coaching Center",
        category: "Education Tech",
        description: "A modern educational platform for coaching centers, streamlining course info and student engagement.",
        impact: "Modernized the traditional coaching center experience.",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179378/k6nlivfqmlgeti7l3bpx.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769179378/k6nlivfqmlgeti7l3bpx.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769180067/qhpr4su6bzr12sb1bwcy.mov",
        theme: "light",
        type: "desktop"
    },
    {
        id: 5,
        title: "MakeYou Online",
        category: "Agency Portfolio",
        description: "A stunning mobile-first portfolio website designed to convert visitors into high-value clients.",
        impact: "Optimized for mobile conversion and visual storytelling.",
        imageMobile: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180262/rb2autumdafpvw2wa6rl.png",
        imageDesktop: "https://res.cloudinary.com/dyvv2furt/image/upload/v1769180262/rb2autumdafpvw2wa6rl.png",
        video: "https://res.cloudinary.com/dyvv2furt/video/upload/v1769180255/djqh0bnuaqigqskvm2vq.mov",
        theme: "dark",
        type: "mobile"
    }
];

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
                                <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.01]">
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
                                    <a href="#" className="inline-flex items-center text-sm font-semibold tracking-wide uppercase group/link">
                                        View Case Study
                                        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
