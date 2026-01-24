'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LoadingContextType = {
    isSplineLoaded: boolean;
    setIsSplineLoaded: (loaded: boolean) => void;
    isPreloaderComplete: boolean;
    setIsPreloaderComplete: (complete: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

    return (
        <LoadingContext.Provider value={{ isSplineLoaded, setIsSplineLoaded, isPreloaderComplete, setIsPreloaderComplete }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
