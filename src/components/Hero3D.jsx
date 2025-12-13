import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MarketingSymbol({ position, rotation, symbol, color = "#A68A64", scale = 1 }) {
    const mesh = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.2;
        mesh.current.rotation.y += delta * 0.3;
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1} speed={1.5}>
            <group position={position} rotation={rotation} scale={scale}>
                {/* Glass Container */}
                <mesh ref={mesh}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={5}
                        thickness={2}
                        roughness={0}
                        transmission={0.9}
                        ior={1.5}
                        chromaticAberration={0.1}
                        background={new THREE.Color('#EFECE5')}
                    />
                </mesh>
                {/* Floating Symbol Inside */}
                <Text
                    font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
                    fontSize={1}
                    color={color}
                    position={[0, 0, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {symbol}
                </Text>
            </group>
        </Float>
    );
}

function GlassCard({ position }) {
    return (
        <mesh position={position}>
            <boxGeometry args={[4, 6, 0.2]} />
            <MeshTransmissionMaterial
                thickness={2}
                roughness={0.1}
                transmission={0.8}
                ior={1.5}
                chromaticAberration={0.05}
                background={new THREE.Color('#EFECE5')}
                color="#f9f7f2"
            />
        </mesh>
    )
}

function Scene3D() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />

            {/* Main Floating Elements representing Marketing */}
            <MarketingSymbol position={[0, 0.5, 0]} symbol="%" color="#A68A64" scale={1.2} />
            <MarketingSymbol position={[-2, 2, -1]} symbol="@" color="#8B5E3C" scale={0.8} />
            <MarketingSymbol position={[2, -1.5, 1]} symbol="$" color="#D4C5A9" scale={0.9} />
            <MarketingSymbol position={[1.5, 2.5, -2]} symbol="#" color="#A68A64" scale={0.6} />
            <MarketingSymbol position={[-1.5, -2, -1]} symbol="<>" color="#8B5E3C" scale={0.7} />

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </>
    );
}

const Hero3D = () => {
    return (
        <section style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 60% 50%, rgba(249, 247, 242, 1) 0%, rgba(239, 236, 229, 1) 100%)'
        }}>

            {/* 3D Scene Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: '-10%',
                width: '60%',
                height: '100%',
                zIndex: 1
            }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Scene3D />
                </Canvas>
            </div>

            {/* Content Layer */}
            <div style={{
                width: '1400px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                zIndex: 2,
                pointerEvents: 'none' // Let clicks pass through to canvas if needed, mostly for text selection
            }}>
                <div style={{ pointerEvents: 'auto', paddingTop: '4rem' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'rgba(166, 138, 100, 0.1)',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(166, 138, 100, 0.2)'
                    }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                            DIGITAL MARKETING EXPERT
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
                        lineHeight: 1,
                        marginBottom: '1.5rem',
                        fontFamily: 'Space Grotesk, sans-serif',
                        color: 'var(--color-text-main)'
                    }}>
                        ELEVATE <br />
                        <span style={{
                            color: 'transparent',
                            WebkitTextStroke: '2px var(--color-accent)',
                            opacity: 0.8
                        }}>YOUR BRAND</span> <br />
                        PRESENCE
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--color-text-muted)',
                        maxWidth: '500px',
                        marginBottom: '3rem',
                        lineHeight: 1.7
                    }}>
                        Data-driven strategies meets creative storytelling.
                        I help brands navigate the digital landscape with precision and impact.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#contact" style={{
                            padding: '1rem 2.5rem',
                            background: 'var(--color-accent)',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px -5px rgba(166, 138, 100, 0.4)'
                        }} className="btn-hover-effect">
                            Start Project
                        </a>
                        <a href="#projects" style={{
                            padding: '1rem 2.5rem',
                            background: 'transparent',
                            color: 'var(--color-text-main)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            View Works
                        </a>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero3D;
