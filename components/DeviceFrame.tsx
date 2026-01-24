'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface DeviceFrameProps {
    type: 'mobile' | 'desktop';
    src: string;
    videoSrc?: string;
    alt: string;
    className?: string;
}

export default function DeviceFrame({ type, src, videoSrc, alt, className }: DeviceFrameProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    const handleMouseEnter = () => {
        if (videoSrc && videoRef.current) {
            setIsVideoVisible(true);
            videoRef.current.play().catch(e => console.error("Video play failed", e));
        }
    };

    const handleMouseLeave = () => {
        if (videoSrc) {
            setIsVideoVisible(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    };

    if (type === 'mobile') {
        return (
            <div
                className={clsx("relative mx-auto w-full max-w-[300px] shadow-xl rounded-[2.5rem] bg-gray-800 transition-transform duration-500 hover:scale-[1.02]", className)}
                style={{ aspectRatio: '9/19' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="absolute inset-0 border-[8px] md:border-[14px] border-gray-800 rounded-[2.5rem] pointer-events-none z-20"></div>
                {/* Visual Notch/sensor details */}
                <div className="w-[40%] h-[18px] bg-gray-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] z-20"></div>

                {/* Screen Content */}
                <div className="absolute inset-[8px] md:inset-[14px] rounded-[1.8rem] overflow-hidden bg-white dark:bg-gray-800">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={clsx("object-cover object-top transition-opacity duration-500", isVideoVisible ? "opacity-0" : "opacity-100")}
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                    {videoSrc && (
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            loop
                            muted
                            playsInline
                            className={clsx("absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500", isVideoVisible ? "opacity-100" : "opacity-0")}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Desktop Frame
    return (
        <div
            className={clsx("relative mx-auto w-full max-w-[800px] group", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Laptop Top (Screen) */}
            <div className="relative mx-auto bg-gray-800 rounded-t-xl shadow-lg" style={{ aspectRatio: '16/10' }}>
                <div className="absolute inset-0 border-[8px] md:border-[12px] border-gray-800 rounded-t-xl z-20 pointer-events-none"></div>
                <div className="absolute inset-[8px] md:inset-[12px] bg-white dark:bg-gray-800 overflow-hidden rounded-t-lg">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={clsx("object-cover object-top transition-opacity duration-500 ease-in-out", isVideoVisible ? "opacity-0" : "opacity-100")}
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                    {videoSrc && (
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            loop
                            muted
                            playsInline
                            className={clsx("absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500", isVideoVisible ? "opacity-100" : "opacity-0")}
                        />
                    )}
                </div>
            </div>
            {/* Laptop Bottom (Base) */}
            <div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[12px] md:h-[20px] w-full mt-[-1px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[15%] h-[4px] bg-gray-700 rounded-b-md"></div>
            </div>
        </div>
    );
}
