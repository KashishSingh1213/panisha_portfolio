import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    SiCanva, SiGrammarly, SiAdobe, SiGoogleads, SiMeta, SiAdobephotoshop,
} from 'react-icons/si';
import { FaCut } from 'react-icons/fa';

import canvaLogo from '../assets/logos/canva.png';
import capcutLogo from '../assets/logos/capcut.png';
import adobeLogo from '../assets/logos/Adobe-Logo.png';

gsap.registerPlugin(ScrollTrigger);

const Tool = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);



    const proficiencyTools = [
        { icon: "https://api.iconify.design/logos:google-ads.svg", name: "Google Ads", percent: 99, color: "#4285F4" },
        { icon: "https://api.iconify.design/logos:meta-icon.svg", name: "Meta Ads", percent: 95, color: "#0668E1" },
        { icon: canvaLogo, name: "Canva", percent: 98, color: "#00C4CC" },
        { icon: capcutLogo, name: "CapCut", percent: 95, color: "#000000" },
        { icon: adobeLogo, name: "Adobe", percent: 80, color: "#FF0000" },
        { icon: "https://api.iconify.design/logos:grammarly-icon.svg", name: "Grammarly", percent: 95, color: "#15C39A" },
    ];



    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );



            // Grid Cards Animation
            gsap.fromTo(cardsRef.current,
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6', // Slightly warmer Ivory
            padding: '0 5% var(--section-spacing) 5%',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden',
            position: 'relative',
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem',
        },

        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#1F0954',
            marginBottom: '1rem',
        },
        subText: {
            color: '#C7B58D',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto'
        },

        // Grid of cards
        gridContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 0',
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '24px',
            padding: '2.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px -5px rgba(31, 9, 84, 0.08)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
        },
        cardTitle: {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#1F0954',
            marginBottom: '0',
            marginTop: '1rem',
            fontFamily: '"Playfair Display", serif',
            letterSpacing: '0.5px'
        },
    };

    return (
        <section style={styles.section} ref={containerRef} id="tools">



            {/* Expertise & Proficiency Header */}
            <div style={styles.header} ref={titleRef}>
                <h2 style={styles.h2}>Expertise & Proficiency</h2>
                <p style={styles.subText}>Leveraging the best technologies to deliver exceptional results</p>
            </div>

            <div className="tool-grid" style={styles.gridContainer} ref={gridRef}>
                {proficiencyTools.map((tool, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        ref={el => cardsRef.current[index] = el}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                y: -12,
                                boxShadow: '0 25px 50px rgba(31, 9, 84, 0.15)',
                                scale: 1.03,
                                borderColor: '#C7B58D',
                                duration: 0.4
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                y: 0,
                                boxShadow: '0 10px 30px -5px rgba(31, 9, 84, 0.08)',
                                scale: 1,
                                borderColor: 'rgba(255,255,255,0.8)',
                                duration: 0.4
                            });
                        }}
                    >
                        <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                className="tool-icon"
                                style={{
                                    width: tool.name === 'Adobe' ? '100px' : '80px',
                                    height: tool.name === 'Adobe' ? '100px' : '80px',
                                    objectFit: 'contain',
                                    filter: 'none'
                                }}
                            />
                        </div>
                        <h4 style={styles.cardTitle}>{tool.name}</h4>
                    </div>
                ))}
            </div>

            <style>{`
                .tool-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                @media (min-width: 768px) {
                    .tool-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .tool-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
        </section >
    );
};

export default Tool;
