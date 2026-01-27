'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import RotatingText from './RotatingText';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' }, // We can keep existing ID or map to new TrustSection
    { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // Check if it's just a hash or a full path
        const element = document.querySelector(id);
        if (element) {
            gsap.to(window, { duration: 1, scrollTo: element, ease: 'power3.inOut' });
        }
    };

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
                isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-border/40" : "bg-transparent py-6"
            )}
        >
            <div className="container-padding max-w-7xl mx-auto flex items-center justify-between pointer-events-none">

                {/* Brand */}
                <a href="#" className="flex items-center gap-1 text-xl font-bold tracking-tight z-50 relative group pointer-events-auto" onClick={(e) => handleScrollTo('body', e)}>
                    <span>MAKEYOU<span className="text-primary">.</span></span>
                    <RotatingText
                        texts={['online', 'grow', 'pro', 'lead', 'studio', 'digital', 'agency']}
                        mainClassName="text-primary overflow-hidden uppercase"
                        staggerDuration={0.02}
                        rotationInterval={2500}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleScrollTo(item.href, e)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleScrollTo('#contact', e)}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        Book a Call
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 pointer-events-auto"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className={clsx(
                        "fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden pointer-events-auto",
                        isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                    )}>
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleScrollTo(item.href, e)}
                                className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => handleScrollTo('#contact', e)}
                            className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-medium"
                        >
                            Book a Call <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>
                )}

            </div>
        </header>
    );
}
