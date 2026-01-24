'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 150 }) {
    // Create particles with random positions
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread particles in a wider area
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Slow rotation for subtle effect
            ref.current.rotation.x -= delta / 50;
            ref.current.rotation.y -= delta / 60;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length / 3}
                        array={points}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color="#333" // Dark grey for light mode defaults, can change via props or CSS logic if needed
                    transparent
                    opacity={0.6}
                    sizeAttenuation={true}
                />
            </points>
        </group>
    );
}

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[2, 0, 0]} scale={2}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#e5e5e5" wireframe />
            </mesh>
        </Float>
    )
}


export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 -z-10 bg-transparent pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <Particles />
                <AnimatedShape />
            </Canvas>
        </div>
    );
}
