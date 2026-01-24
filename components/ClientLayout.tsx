'use client';

import { LoadingProvider } from '../context/LoadingContext';
import Preloader from './Preloader';
import SplineBackground from './SplineBackground';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <Preloader />
            <SplineBackground />
            <div className="relative z-10 pointer-events-none">
                {children}
            </div>
        </LoadingProvider>
    );
}
