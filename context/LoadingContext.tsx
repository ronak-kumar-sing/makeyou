'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LoadingContextType = {
    isPreloaderComplete: boolean;
    setIsPreloaderComplete: (complete: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

    return (
        <LoadingContext.Provider value={{ isPreloaderComplete, setIsPreloaderComplete }}>
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
