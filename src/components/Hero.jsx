import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Hero = () => {
    const heroRef = useRef(null);
    const headingLine1Ref = useRef(null);
    const headingLine2Ref = useRef(null);
    const headingLine3Ref = useRef(null); // Added distinct subtitle reference
    const contentRef = useRef(null);
    const btnRef = useRef(null);

    const [content, setContent] = useState({
        titleLine1: 'Creating meaningful connections',
        titleLine2: 'through strategy & storytelling.',
        subtitle: 'Where data meets creativity to drive real results.',
        description: 'I help brands grow through thoughtful marketing, compelling content, and creative storytelling. From building brand visibility to driving meaningful engagement, I combine creativity with strategy to turn ideas into impact.'
    });

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "content", "hero"), (doc) => {
            if (doc.exists()) {
                setContent(doc.data());
            }
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(headingLine1Ref.current, { x: -250, opacity: 0 });
            gsap.set(headingLine2Ref.current, { x: 250, opacity: 0 });
            gsap.set(headingLine3Ref.current, { y: 20, opacity: 0 });
            gsap.set(contentRef.current, { y: 30, opacity: 0 });
            gsap.set(btnRef.current, { scale: 0.8, opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(headingLine1Ref.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
            })
                .to(headingLine2Ref.current, {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                }, "-=1.0")
                .to(headingLine3Ref.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                }, "-=0.8")
                .to(contentRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                }, "-=0.6")
                .to(btnRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.6");

            // Float animation for background elements
            gsap.to(".decoration-orb", {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFAF6', // Very warm, soft cream/blush
            color: '#5D4037', // Deep warm coffee brown
            fontFamily: '"Manrope", sans-serif',
            padding: '140px 5% 40px', // Added top padding for fixed navbar
            position: 'relative',
            overflow: 'hidden',
        },
        container: {
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
            gap: '2rem',
        },
        brand: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(216, 124, 90, 0.1)',
            borderRadius: '30px',
            marginBottom: '0.5rem',
            fontWeight: '700',
            color: '#D87C5A', // Terracotta
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontSize: '0.8rem',
            boxShadow: '0 2px 10px rgba(216, 124, 90, 0.05)',
        },
        h1Wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem',
            perspective: '1000px',
        },
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#3E2723', // Very dark brown
            margin: 0,
            letterSpacing: '-1px',
        },
        h1Italic: {
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#D87C5A', // Terracotta Accent
        },
        subtitle: {
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            color: '#8D6E63',
            marginTop: '1rem',
            marginBottom: '1rem'
        },
        introText: {
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#5D4037', // Medium brown
            maxWidth: '800px',
            margin: '0 auto',
            fontWeight: 400,
        },
        actions: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1.5rem',
        },
        primaryBtn: {
            background: 'linear-gradient(135deg, #E07A5F 0%, #D87C5A 100%)', // Warm terracotta gradient
            color: '#FFF',
            padding: '16px 42px',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(216, 124, 90, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        decorationOrbs: {
            position: 'absolute',
            borderRadius: '50%',
            zIndex: 1,
            filter: 'blur(80px)', // Softer blur
            pointerEvents: 'none',
        }
    };

    return (
        <section style={styles.section} ref={heroRef} id="hero">
            {/* Warm, Soft Background Glows */}
            <div className="decoration-orb" style={{ ...styles.decorationOrbs, top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'rgba(255, 224, 178, 0.3)' }}></div>
            <div className="decoration-orb" style={{ ...styles.decorationOrbs, bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'rgba(242, 199, 184, 0.3)' }}></div>

            {/* Subtle Grain Overlay for Texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                zIndex: 2,
                pointerEvents: 'none',
            }}></div>

            <div style={styles.container}>
                <div style={styles.brand}>
                    <span>✦ Panisha Dhutti</span>
                </div>

                <div style={styles.h1Wrapper}>
                    {/* H1 Line 1 */}
                    <div ref={headingLine1Ref} style={{ willChange: 'transform, opacity' }}>
                        <h1 style={styles.h1}>{content.titleLine1}</h1>
                    </div>
                    {/* H1 Line 2 */}
                    <div ref={headingLine2Ref} style={{ willChange: 'transform, opacity' }}>
                        <h1 style={styles.h1}>
                            <span style={styles.h1Italic}>{content.titleLine2}</span>
                        </h1>
                    </div>
                    {/* Subtitle */}
                    <div ref={headingLine3Ref} style={{ willChange: 'transform, opacity' }}>
                        <p style={styles.subtitle}>{content.subtitle}</p>
                    </div>
                </div>

                <div ref={contentRef}>
                    <p style={styles.introText}>
                        {content.description}
                    </p>
                </div>

                <div style={styles.actions} ref={btnRef}>
                    <button style={styles.primaryBtn} className="btn-hover" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span>View My Work</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
                .btn-hover:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 15px 35px rgba(216, 124, 90, 0.4) !important;
                    background: linear-gradient(135deg, #D87C5A 0%, #BF6A50 100%) !important;
                }
                .btn-hover:active {
                    transform: translateY(-1px);
                }
            `}</style>
        </section>
    );
};

export default Hero;
