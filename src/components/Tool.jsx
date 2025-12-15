import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    SiCanva, SiGrammarly, SiAdobe, SiGoogleads, SiMeta, SiAdobephotoshop,
} from 'react-icons/si';
import { FaCut } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Tool = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const rowRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);

    const platformIcons = [
        { icon: <SiCanva />, name: "Canva", color: "#00C4CC" },
        { icon: <FaCut />, name: "CapCut", color: "#000000" },
        { icon: <SiGrammarly />, name: "Grammarly", color: "#15C39A" },
        { icon: <SiAdobe />, name: "Adobe", color: "#FF0000" },
        { icon: <SiGoogleads />, name: "Google Ads", color: "#4285F4" },
        { icon: <SiMeta />, name: "Meta Ads", color: "#0668E1" },
    ];

    const proficiencyTools = [
        { icon: <SiGoogleads />, name: "Google Ads", percent: 99, color: "#4285F4" },
        { icon: <SiMeta />, name: "Meta Ads", percent: 95, color: "#0668E1" },
        { icon: <SiCanva />, name: "Canva", percent: 98, color: "#00C4CC" },
        { icon: <FaCut />, name: "CapCut", percent: 95, color: "#000000" },
        { icon: <SiAdobephotoshop />, name: "Photoshop", percent: 80, color: "#31A8FF" },
        { icon: <SiGrammarly />, name: "Grammarly", percent: 95, color: "#15C39A" },
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
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Platform Row Animation
            gsap.fromTo(".platform-icon",
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: rowRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Grid Cards Animation
            gsap.fromTo(cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '120px 5%',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden',
            position: 'relative',
        },
        header: {
            textAlign: 'center',
            marginBottom: '4rem',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#3E2723',
            marginBottom: '1rem',
        },
        subText: {
            color: '#8D6E63',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto'
        },
        // Row of platforms
        rowContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3rem',
            marginBottom: '6rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '100px',
            backdropFilter: 'blur(10px)',
            maxWidth: '1200px',
            margin: '0 auto 6rem auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
        },
        platformIcon: {
            fontSize: '2.5rem',
            color: '#5D4037',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        // Grid of cards
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: '#FFF', // White card
            borderRadius: '24px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.02)'
        },
        cardIcon: {
            fontSize: '3rem',
            marginBottom: '1rem',
            transition: 'color 0.3s ease',
            color: '#3E2723' // Default dark brown
        },
        cardTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#3E2723',
            marginBottom: '0.5rem',
            fontFamily: '"Playfair Display", serif',
        },
        percent: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#D87C5A', // Accent color
            fontFamily: '"Manrope", sans-serif',
        },
        progressBar: {
            width: '100%',
            height: '4px',
            background: '#F0F0F0',
            borderRadius: '2px',
            marginTop: '1rem',
            overflow: 'hidden'
        },
        progressFill: (percent) => ({
            width: `${percent}%`,
            height: '100%',
            background: '#D87C5A',
            borderRadius: '2px'
        })
    };

    return (
        <section style={styles.section} ref={containerRef} id="tools">
            <div style={styles.header} ref={titleRef}>
                <h2 style={styles.h2}>Key Tools & Platforms</h2>
                <p style={styles.subText}>Leveraging the best technologies to deliver exceptional results</p>
            </div>

            {/* Top Row: Platforms (Image 1 Style) */}
            <div style={styles.rowContainer} ref={rowRef}>
                {platformIcons.map((item, i) => (
                    <div
                        key={i}
                        className="platform-icon"
                        title={item.name}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = item.color;
                            e.currentTarget.style.transform = 'scale(1.2) translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#5D4037';
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        }}
                        style={styles.platformIcon}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>

            {/* Bottom Grid: Proficiency (Image 2 Style) */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 style={{ ...styles.h2, fontSize: '2rem' }}>Expertise & Proficiency</h3>
            </div>

            <div style={styles.grid} ref={gridRef}>
                {proficiencyTools.map((tool, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        ref={el => cardsRef.current[index] = el}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.1)', scale: 1.02 });
                            // Find icon and change color
                            const icon = e.currentTarget.querySelector('.tool-icon');
                            if (icon) icon.style.color = tool.color;
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { y: 0, boxShadow: '0 15px 35px rgba(0,0,0,0.05)', scale: 1 });
                            const icon = e.currentTarget.querySelector('.tool-icon');
                            if (icon) icon.style.color = '#3E2723';
                        }}
                    >
                        <div className="tool-icon" style={styles.cardIcon}>
                            {tool.icon}
                        </div>
                        <h4 style={styles.cardTitle}>{tool.name}</h4>
                        <div style={styles.percent}>{tool.percent}%</div>

                        <div style={styles.progressBar}>
                            <div style={styles.progressFill(tool.percent)}></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tool;
