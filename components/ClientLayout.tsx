'use client';

import { LoadingProvider } from '../context/LoadingContext';
import Preloader from './Preloader';
import dynamic from 'next/dynamic';
import ClickSpark from './ClickSpark';

// Only load ThreeBackground on desktop to keep mobile lightweight
const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
    ssr: false,
    loading: () => null,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <ClickSpark
                sparkColor="#000"
                sparkSize={12}
                sparkRadius={20}
                sparkCount={10}
                duration={500}
                extraScale={1.2}
            >
                <Preloader />
                {/* Lightweight CSS gradient background for all devices */}
                <div className="fixed inset-0 -z-20 bg-gradient-to-br from-background via-background to-secondary/20" />
                {/* Subtle animated gradient orbs for mobile */}
                <div className="fixed inset-0 -z-15 overflow-hidden pointer-events-none md:hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                {/* ThreeBackground only on larger screens */}
                <div className="hidden md:block">
                    <ThreeBackground />
                </div>
                <div className="relative z-10 pointer-events-none">
                    {children}
                </div>
            </ClickSpark>
        </LoadingProvider>
    );
}
