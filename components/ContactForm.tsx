'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    callbackTime: z.string().min(1, "Please select a preferred time"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setIsSuccess(true);
            reset();

            // Reset success state after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full rounded-3xl bg-secondary/5 backdrop-blur-sm border border-white/5 p-8 md:p-10 pointer-events-auto shadow-2xl">
            <div className="mb-10 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3 tracking-tight">Let's create something extraordinary.</h3>
                <p className="text-lg text-muted-foreground/80">Fill out the form below and I'll get back to you within 24 hours.</p>
            </div>

            {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                        <p className="text-muted-foreground mb-4">You will receive a guaranteed callback within:</p>

                        <div className="inline-flex items-center gap-2 text-3xl font-mono font-bold text-primary bg-primary/10 px-6 py-2 rounded-xl border border-primary/20">
                            <span>23</span>:
                            <span>59</span>:
                            <span>59</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Maximum response time</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold ml-1 text-foreground/80">Name</label>
                                <input
                                    {...register('name')}
                                    placeholder="John Doe"
                                    className={clsx(
                                        "w-full px-4 py-3.5 rounded-xl bg-secondary/50 border outline-none transition-all placeholder:text-muted-foreground/40 text-foreground",
                                        errors.name
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            : "border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:bg-secondary/70"
                                    )}
                                />
                                {errors.name && <p className="text-xs text-red-400 ml-1 font-medium">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold ml-1 text-foreground/80">Email</label>
                                <input
                                    {...register('email')}
                                    placeholder="john@example.com"
                                    className={clsx(
                                        "w-full px-4 py-3.5 rounded-xl bg-secondary/50 border outline-none transition-all placeholder:text-muted-foreground/40 text-foreground",
                                        errors.email
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            : "border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:bg-secondary/70"
                                    )}
                                />
                                {errors.email && <p className="text-xs text-red-400 ml-1 font-medium">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-semibold ml-1 text-foreground/80">Phone (Optional)</label>
                            <input
                                {...register('phone')}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-transparent outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:bg-secondary/70 placeholder:text-muted-foreground/40 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="callbackTime" className="text-sm font-semibold ml-1 text-foreground/80">Preferred Callback Time</label>
                            <div className="relative">
                                <select
                                    {...register('callbackTime')}
                                    className={clsx(
                                        "w-full px-4 py-3.5 rounded-xl bg-secondary/50 border outline-none transition-all appearance-none text-foreground cursor-pointer",
                                        errors.callbackTime
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            : "border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:bg-secondary/70"
                                    )}
                                    defaultValue=""
                                >
                                    <option value="" disabled className="bg-background text-muted-foreground">Select a time...</option>
                                    <option value="Anytime" className="bg-background">Anytime</option>
                                    <option value="Morning (9am - 12pm)" className="bg-background">Morning (9am - 12pm)</option>
                                    <option value="Afternoon (12pm - 5pm)" className="bg-background">Afternoon (12pm - 5pm)</option>
                                    <option value="Evening (5pm - 8pm)" className="bg-background">Evening (5pm - 8pm)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                            {errors.callbackTime && <p className="text-xs text-red-400 ml-1 font-medium">{errors.callbackTime.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold ml-1 text-foreground/80">Project Details</label>
                            <textarea
                                {...register('message')}
                                rows={4}
                                placeholder="Tell me about your vision..."
                                className={clsx(
                                    "w-full px-4 py-3.5 rounded-xl bg-secondary/50 border outline-none transition-all resize-none placeholder:text-muted-foreground/40 text-foreground",
                                    errors.message
                                        ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                        : "border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 hover:bg-secondary/70"
                                )}
                            />
                            {errors.message && <p className="text-xs text-red-400 ml-1 font-medium">{errors.message.message}</p>}
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/10">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg tracking-wide shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
