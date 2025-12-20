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

    const socialPlatforms = [
        { icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", name: "Instagram" },
        { icon: "https://api.iconify.design/logos:linkedin-icon.svg", name: "LinkedIn" },
        { icon: "https://api.iconify.design/logos:facebook.svg", name: "Facebook" },
        { icon: "https://api.iconify.design/logos:tiktok-icon.svg", name: "TikTok" },
        { icon: "https://api.iconify.design/logos:youtube-icon.svg", name: "YouTube" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo([titleRef.current, ".social-header"],
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

            // Socials Stagger + Float
            gsap.fromTo(".social-icon-wrapper",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".social-row",
                        start: "top 90%",
                    }
                }
            );

            // Continuous Floating for Socials
            gsap.to(".social-icon-wrapper", {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.2
            });

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
            padding: 'var(--section-spacing) 5%',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden',
            position: 'relative',
        },
        header: {
            textAlign: 'center',
            marginBottom: '4rem',
        },
        socialHeader: {
            textAlign: 'center',
            marginBottom: '2rem',
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            color: '#1F0954',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
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
        socialRow: {
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1.5rem, 4vw, 4rem)', // Responsive gap
            marginBottom: '6rem',
            padding: '0 1rem',
            flexWrap: 'wrap',
        },
        socialIconWrapper: {
            width: 'clamp(50px, 8vw, 70px)', // Responsive size
            height: 'clamp(50px, 8vw, 70px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
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

            {/* Socials Heading */}
            <div className="social-header" style={styles.socialHeader}>
                Connect & Follow
            </div>

            {/* Social Platforms Row */}
            <div style={styles.socialRow} className="social-row">
                {socialPlatforms.map((item, i) => (
                    <div
                        key={i}
                        className="social-icon-wrapper"
                        style={styles.socialIconWrapper}
                        title={item.name}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                        }}
                    >
                        <img
                            src={item.icon}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                ))}
            </div>

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
