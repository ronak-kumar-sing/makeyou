'use client';

import { Check } from 'lucide-react';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
    {
        name: 'Basic Presence',
        id: 'basic',
        price: '₹19,999 – ₹29,999',
        description: 'Simple online presence for local shops.',
        features: ['1–3 page website', 'Mobile responsive design', 'Google Maps integration', 'WhatsApp click-to-chat', 'Basic local SEO', '7 days post-launch support'],
        cta: 'Get Online Today',
        popular: false,
    },
    {
        name: 'Growth',
        id: 'growth',
        price: '₹39,999 – ₹59,999',
        description: 'Lead-focused website for growing local businesses.',
        features: ['Up to 5 pages', 'Clean custom UI', 'Contact & enquiry forms', 'Google Business Profile setup', 'Local SEO optimization', 'Basic speed optimization', '15 days support'],
        cta: 'Grow My Business',
        popular: true,
    },
    {
        name: 'Advanced Local',
        id: 'advanced',
        price: '₹69,999 – ₹89,999',
        description: 'Advanced website for clinics, institutes, and franchises.',
        features: ['8–10 pages', 'Appointment booking / enquiry system', 'Testimonials and gallery', 'CMS for easy updates', 'Advanced local SEO', 'Performance optimization', '1 month support'],
        cta: 'Get More Customers',
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
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Affordable Plans for Local Businesses</h2>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get More Calls & Customers</h3>
                    <p className="text-lg text-muted-foreground">Perfect for kirana stores, salons, clinics, gyms, cafes, and coaching centers.</p>
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

                <div className="mt-16 text-center space-y-3">
                    <p className="text-sm text-muted-foreground italic">* Pricing may vary based on business needs. All prices are negotiable.</p>
                    <p className="text-muted-foreground">Not sure which plan is right for you? <a href="#contact" className="text-primary font-semibold hover:underline">Let's schedule a call</a> to discuss your needs.</p>
                </div>

            </div>
        </section>
    );
}
