'use client';

import { Check } from 'lucide-react';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
    {
        name: 'Starter',
        id: 'starter',
        price: 'From $2,500',
        description: 'Perfect for startups and personal brands needing a strong foundation.',
        features: ['Custom Design System', '5 Core Pages', 'Mobile Responsive', 'SEO Basic Setup', '1 Week Support'],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Professional',
        id: 'pro',
        price: 'From $5,000',
        description: 'A complete digital presence for growing businesses.',
        features: ['Advanced Animations (GSAP)', 'CMS Integration', '10+ Pages', 'Interactive 3D Elements', 'Speed Optimization', '1 Month Support'],
        cta: 'Go Professional',
        popular: true,
    },
    {
        name: 'Enterprise',
        id: 'enterprise',
        price: 'Custom',
        description: 'Full-scale platforms and complex web applications.',
        features: ['Full Stack Development', 'Custom Backend / API', 'User Authentication', 'Advanced Analytics', 'Priority 24/7 Support'],
        cta: 'Contact Sales',
        popular: false,
    },
];

export default function Pricing() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pricing-card', {
                scrollTrigger: {
                    trigger: '#pricing',
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" ref={containerRef} className="section-spacing bg-transparent relative">
            <div className="container-padding max-w-7xl mx-auto pointer-events-none">
                <div className="text-center max-w-2xl mx-auto mb-20 pointer-events-none">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Investment</h2>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Transparent Pricing</h3>
                    <p className="text-lg text-muted-foreground">No hidden fees. Just clear deliverables and exceptional results.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`pricing-card relative flex flex-col p-8 rounded-3xl border ${tier.popular ? 'border-primary bg-background shadow-2xl md:scale-105 z-10' : 'border-border bg-background/50 hover:border-primary/50 transition-colors'} pointer-events-auto`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                                <div className="text-3xl font-bold mb-2">{tier.price}</div>
                                <p className="text-sm text-muted-foreground">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm">
                                        <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className={`w-full py-4 rounded-xl font-semibold text-center transition-all ${tier.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">Not sure which plan is right for you? <a href="#contact" className="text-primary font-semibold hover:underline">Let's schedule a call</a> to discuss your needs.</p>
                </div>

            </div>
        </section>
    );
}
