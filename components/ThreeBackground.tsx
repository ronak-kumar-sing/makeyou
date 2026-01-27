'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 100 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 60;
            ref.current.rotation.y -= delta / 70;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[points, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    color="#666"
                    transparent
                    opacity={0.4}
                    sizeAttenuation={true}
                />
            </points>
        </group>
    );
}

// Interactive floating orb that follows mouse
function InteractiveOrb() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetPos.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 4,
                y: -(e.clientY / window.innerHeight - 0.5) * 4
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Smooth follow mouse
            meshRef.current.position.x += (targetPos.current.x - meshRef.current.position.x) * 0.02;
            meshRef.current.position.y += (targetPos.current.y - meshRef.current.position.y) * 0.02;
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color="#e0e0e0"
                    wireframe
                    distort={0.3}
                    speed={2}
                    roughness={0}
                />
            </mesh>
        </Float>
    );
}

// Floating geometric shapes
function FloatingShapes() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={group}>
            {/* Torus */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[-4, 2, -3]} scale={0.5}>
                    <torusGeometry args={[1, 0.3, 16, 32]} />
                    <meshStandardMaterial color="#d0d0d0" wireframe />
                </mesh>
            </Float>

            {/* Octahedron */}
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
                <mesh position={[4, -2, -2]} scale={0.6}>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#c0c0c0" wireframe />
                </mesh>
            </Float>

            {/* Dodecahedron */}
            <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
                <mesh position={[-3, -3, -4]} scale={0.4}>
                    <dodecahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#b0b0b0" wireframe />
                </mesh>
            </Float>
        </group>
    );
}


export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 -z-10 bg-transparent pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.3} />
                <Particles count={80} />
                <InteractiveOrb />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
