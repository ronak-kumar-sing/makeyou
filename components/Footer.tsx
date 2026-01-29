'use client';

import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import ContactForm from './ContactForm';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer id="contact" className="bg-background/10 backdrop-blur-md border-t border-white/10 pt-24 pb-12 pointer-events-none">
            <div className="container-padding max-w-7xl mx-auto">

                <div className="flex flex-col lg:flex-row gap-16 mb-24 items-start">
                    <div className="space-y-6 lg:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <Logo size={48} variant="icon" />
                            <span className="text-2xl font-bold">MAKEYOU<span className="text-primary">.</span></span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                            Let's build something <span className="text-muted-foreground">visionary.</span>
                        </h2>
                    </div>

                    <div className="w-full lg:w-1/2 pointer-events-auto">
                        <ContactForm />
                    </div>

                    <div className="flex flex-col justify-between pointer-events-auto">
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 className="font-semibold mb-4">Socials</h4>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li><a href="https://x.com/RonakKumar25401" className="hover:text-foreground transition-colors">Twitter / X</a></li>
                                    <li><a href="https://www.linkedin.com/in/ronak-km/" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                                    <li><a href="https://www.instagram.com/_ronak.kumar3/" className="hover:text-foreground transition-colors">Instagram</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Sitemap</h4>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li><a href="#" className="hover:text-foreground transition-colors">Home</a></li>
                                    <li><a href="#work" className="hover:text-foreground transition-colors">Work</a></li>
                                    <li><a href="#process" className="hover:text-foreground transition-colors">Process</a></li>
                                    <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-auto">

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 text-sm text-muted-foreground">
                        <div>
                            &copy; {new Date().getFullYear()} MakeYou Digital. All rights reserved.
                        </div>
                        <div className="flex gap-6 mt-4 md:mt-0 pointer-events-auto">
                            <a href="#" className="hover:text-foreground">Privacy Policy</a>
                            <a href="#" className="hover:text-foreground">Terms of Service</a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
