import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    // Marketing & Strategy
    { id: '01', name: 'Campaign Planning', desc: 'Strategic execution for growth.', icon: '📅', color: '#FFF3E0' },
    { id: '02', name: 'Brand Positioning', desc: 'Defining unique market value.', icon: '🎯', color: '#E3F2FD' },
    { id: '03', name: 'Audience Research', desc: 'Understanding user needs.', icon: '🔍', color: '#F3E5F5' },
    { id: '04', name: 'Performance Analysis', desc: 'Data-driven optimization.', icon: '📊', color: '#E8F5E9' },

    // Content & Communication
    { id: '05', name: 'Content Writing', desc: 'Compelling copy across platforms.', icon: '✍️', color: '#FFF8E1' },
    { id: '06', name: 'Storytelling', desc: 'Connecting brands with people.', icon: '📖', color: '#ECEFF1' },
    { id: '07', name: 'Social Media Copy', desc: 'Engaging captions & scripts.', icon: '💬', color: '#FFEBEE' },
    { id: '08', name: 'Brand Voice', desc: 'Consistent communication style.', icon: '🗣️', color: '#E0F7FA' },

    // Creative Skills
    { id: '09', name: 'Video Editing', desc: 'High-impact video content.', icon: '🎬', color: '#FFF3E0' },
    { id: '10', name: 'Visual Storytelling', desc: 'Communicating through imagery.', icon: '🖼️', color: '#F3E5F5' },
    { id: '11', name: 'Graphic Content', desc: 'Social creatives & branding.', icon: '🎨', color: '#E8F5E9' },

    // Tools
    { id: '12', name: 'Analytics Tools', desc: 'Measuring success & ROI.', icon: '📈', color: '#FFF8E1' },
    { id: '13', name: 'Social Platforms', desc: 'Instagram, LinkedIn, YouTube.', icon: '📱', color: '#E3F2FD' },
    { id: '14', name: 'Planning Tools', desc: 'Organizing content workflows.', icon: '🗓️', color: '#FFEBEE' }
];

const Skills = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { y: -200, opacity: 0, rotate: "random(-15, 15)" }, // Start from top, random rotation
                {
                    y: 0,
                    opacity: 1,
                    rotate: "random(-3, 3)", // Settle with slight rotation
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'elastic.out(1, 0.5)', // Bouncy drop effect
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '100px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden', // Hide incoming animations
        },
        header: {
            textAlign: 'center',
            marginBottom: '6rem',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '3.5rem',
            color: '#3E2723',
            marginBottom: '1rem',
        },
        grid: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
            perspective: '1000px',
        },
        card: {
            width: '280px',
            minHeight: '320px',
            backgroundColor: '#FFF',
            padding: '2rem 1.5rem',
            borderRadius: '10px', // Paper-like rounded corners
            position: 'relative',
            boxShadow: '0 10px 30px rgba(93, 64, 55, 0.1), 0 1px 3px rgba(93, 64, 55, 0.05)',
            transformOrigin: 'top center',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
        },
        pin: {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #FF8A65, #D84315)', // 3D Pin look
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
            zIndex: 10,
        },
        number: {
            fontSize: '1.5rem',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            color: '#D87C5A', // Terracotta
            opacity: 0.8,
            marginBottom: '1rem',
        },
        iconContainer: {
            fontSize: '3rem',
            marginBottom: '1rem',
            alignSelf: 'flex-start',
        },
        cardTitle: {
            fontSize: '1.5rem',
            color: '#3E2723',
            marginBottom: '0.5rem',
            fontWeight: 700,
        },
        cardDesc: {
            fontSize: '0.95rem',
            color: '#795548',
            lineHeight: 1.6,
        }
    };

    return (
        <section style={styles.section} id="skills" ref={containerRef}>
            <div style={styles.header}>
                <h2 style={styles.h2}>Technical Arsenal</h2>
                <p style={{ color: '#8D6E63', fontSize: '1.1rem' }}>My toolkit for crafting digital experiences</p>
            </div>

            <div style={styles.grid}>
                {skillsData.map((skill, index) => (
                    <div
                        key={skill.id}
                        ref={el => cardsRef.current[index] = el}
                        style={{
                            ...styles.card,
                            background: `linear-gradient(135deg, #FFFFFF 0%, ${skill.color} 100%)` // Subtle colored tint at bottom right
                        }}
                        className="skill-card"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { scale: 1.05, rotate: 0, zIndex: 10, duration: 0.3 });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { scale: 1, rotate: "random(-3, 3)", zIndex: 1, duration: 0.3 });
                        }}
                    >
                        <div style={styles.pin}></div>
                        <span style={styles.number}>{skill.id}</span>
                        <div style={styles.iconContainer}>{skill.icon}</div>
                        <h3 style={styles.cardTitle}>{skill.name}</h3>
                        <p style={styles.cardDesc}>{skill.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
