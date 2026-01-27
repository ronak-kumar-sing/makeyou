'use client';
import { useLoading } from '../context/LoadingContext';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';


export default function Preloader() {
    const { setIsPreloaderComplete } = useLoading();
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Quick loading simulation - completes in ~1.5 seconds
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Faster increments for snappy loading
                return Math.min(prev + Math.floor(Math.random() * 20) + 10, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress >= 100 && containerRef.current) {
            // Complete the loading animation
            gsap.to(barRef.current, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    playExitAnimation();
                }
            });

            if (counterRef.current) counterRef.current.innerText = '100';
        } else if (barRef.current) {
            gsap.to(barRef.current, {
                width: `${progress}%`,
                duration: 0.3,
                ease: 'power2.out'
            });
            if (counterRef.current) counterRef.current.innerText = progress.toString();
        }
    }, [progress]);

    const playExitAnimation = () => {
        const tl = gsap.timeline();

        tl.to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in'
        })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: 'power4.inOut',
                onStart: () => setIsPreloaderComplete(true)
            }, '-=0.2');
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
            <div ref={textRef} className="relative z-10 flex flex-col items-center gap-6">
                <div className="flex items-end gap-1 font-mono text-8xl md:text-9xl font-bold tracking-tighter leading-none">
                    <span ref={counterRef} className="tabular-nums w-[2ch] text-right inline-block">0</span>
                    <span className="text-4xl md:text-5xl text-muted-foreground mb-2">%</span>
                </div>

                <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Initializing Environment
                </div>
            </div>

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/20">
                <div ref={barRef} className="h-full bg-primary w-0" />
            </div>

            {/* Background Grid/Decor */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}
