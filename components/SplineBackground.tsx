'use client';

import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

import { useLoading } from '../context/LoadingContext';

export default function SplineBackground() {
    const { setIsSplineLoaded } = useLoading();

    return (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-auto">
            <Spline
                scene="https://prod.spline.design/xJqb3kDbKBAGaM2K/scene.splinecode"
                className="w-full h-full object-cover"
                style={{ clipPath: 'inset(0 0 0 0)' }}
                onLoad={() => {
                    console.log('Spline Loaded');
                    setIsSplineLoaded(true);
                }}
            />
            {/* Hiding Watermark via overlay or masking */}
            <div className="absolute bottom-4 right-4 w-32 h-10 bg-background/0 backdrop-blur-xl z-50 opacity-0" />
            <style jsx global>{`
                #spline-watermark, 
                a[href*="spline.design"], 
                a[href*="splinetool"],
                .spline-watermark { 
                    display: none !important; 
                    opacity: 0 !important; 
                    visibility: hidden !important;
                    pointer-events: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }
            `}</style>
        </div>
    );
}
