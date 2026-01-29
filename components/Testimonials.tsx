'use client';

import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        quote: "MakeYou transformed our digital presence completely. Our website traffic increased by 300% within the first month!",
        name: "Priya Sharma",
        role: "CEO, TechStart India",
        rating: 5,
    },
    {
        quote: "Incredible attention to detail and fast delivery. They understood our vision perfectly and exceeded expectations.",
        name: "Rahul Patel",
        role: "Founder, GrowthBox",
        rating: 5,
    },
    {
        quote: "Professional, creative, and reliable. Our sales doubled after launching the new site. Highly recommended!",
        name: "Anita Desai",
        role: "Director, LocalBiz Solutions",
        rating: 5,
    },
    {
        quote: "The team created a stunning website for our NGO that perfectly communicates our mission. The attention to detail and clean design has helped us reach more people than ever before.",
        name: "Prajjwal Shukla",
        role: "Founder, ARPU Future Rise Life Foundation",
        website: "https://arpufrl.org/",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container-padding max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our clients have to say about working with us.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative bg-background rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 left-8">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                    <Quote className="w-5 h-5 text-primary-foreground" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6 mt-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                            </div>

                            {/* Quote Text */}
                            <p className="text-foreground/90 text-lg leading-relaxed mb-8">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    {testimonial.website && (
                                        <a
                                            href={testimonial.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline mt-0.5 block"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
