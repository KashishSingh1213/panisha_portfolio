import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
    {
        id: 1,
        name: "Sarah M.",
        role: "Marketing Director",
        text: "Panisha brings a rare balance of creativity and strategy. Her ability to understand brand goals and translate them into engaging content made a visible difference to our campaigns.",
        rating: 5,
        align: 'flex-start',
        direction: -1, // Comes from left
        zIndex: 1
    },
    {
        id: 2,
        name: "David K.",
        role: "Business Owner",
        text: "Professional, reliable, and detail-oriented. From social media to content and campaign execution, her contribution consistently delivered strong results.",
        rating: 5,
        align: 'flex-end',
        direction: 1, // Comes from right
        zIndex: 2
    },
    {
        id: 3,
        name: "Anita P.",
        role: "Brand Manager",
        text: "Her work added clarity and consistency to our brand communication, helping us connect better with our audience.",
        rating: 5,
        align: 'flex-start',
        direction: -1, // Comes from left
        zIndex: 3
    }
];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const bubblesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation: Slide in from sides
            bubblesRef.current.forEach((bubble, index) => {
                const direction = testimonialsData[index].direction;

                // Slide In
                gsap.fromTo(bubble,
                    {
                        x: direction * 150,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 75%',
                        }
                    }
                );

                // Continuous Floating Motion
                // Delays are staggered to prevent synchronized bobbing
                gsap.to(bubble, {
                    y: 10,
                    duration: 2.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: Math.random() * 1
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '100px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden'
        },
        headerContainer: {
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
        },
        mainHeading: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: '#3E2723', // Dark Brown
            margin: 0,
            lineHeight: 0.9,
            fontWeight: 800,
        },
        scriptText: {
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            color: '#D87C5A', // Terracotta
            fontWeight: 400,
        },
        bubblesContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1000px',
            position: 'relative',
            // Negative margin on container not needed if we handle overlaps in wrappers
        },
        bubbleWrapper: (align, zIndex) => ({
            display: 'flex',
            justifyContent: align,
            width: '100%',
            padding: '0 2rem',
            marginBottom: '-3rem', // Creates the overlap effect
            zIndex: zIndex,
            position: 'relative',
            pointerEvents: 'none' // Let clicks pass through gaps
        }),
        bubble: {
            backgroundColor: '#FFF',
            padding: '3rem',
            borderRadius: '40px', // Extra rounded
            boxShadow: '0 30px 60px rgba(93, 64, 55, 0.15)', // Deep shadow
            position: 'relative',
            maxWidth: '650px',
            width: '90%',
            color: '#5D4037',
            pointerEvents: 'auto'
        },
        stars: {
            color: '#E07A5F',
            fontSize: '1.2rem',
            marginBottom: '1rem',
            letterSpacing: '4px',
        },
        text: {
            fontSize: '1.1rem',
            lineHeight: 1.5,
            marginBottom: '1rem',
            fontWeight: 500,
            color: '#5D4037',
        },
        clientName: {
            textAlign: 'right',
            fontSize: '1rem',
            fontWeight: 800,
            color: '#3E2723',
            display: 'block',
            marginTop: '0.5rem'
        }
    };

    return (
        <section style={styles.section} id="testimonials" ref={sectionRef}>
            <div style={styles.headerContainer}>
                <h2 style={styles.mainHeading}>What our</h2>
                <h2 style={{ ...styles.mainHeading, ...styles.scriptText }}>Clients say</h2>
            </div>

            <div style={styles.bubblesContainer} ref={containerRef}>
                {testimonialsData.map((t, index) => (
                    <div key={index} style={styles.bubbleWrapper(t.align, t.zIndex)}>
                        <div
                            ref={el => bubblesRef.current[index] = el}
                            className={`chat-bubble bubble-${index % 2 === 0 ? 'left' : 'right'}`}
                            style={styles.bubble}
                        >
                            <div style={styles.stars}>
                                {[...Array(t.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p style={styles.text}>{t.text}</p>
                            <span style={styles.clientName}>- {t.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .chat-bubble {
                    /* Tail Base Logic */
                }

                /* Left Bubble Tail - Smooth Curve */
                .bubble-left {
                    border-bottom-left-radius: 0; 
                }
                
                /* Better Tail using Border Hack matching the image */
                .bubble-left::after {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    border-right: 40px solid transparent;
                    border-top: 40px solid #FFF;
                    border-bottom: 0;
                    border-left: 0;
                    border-radius: 0 0 40px 0; /* Curve the outside */
                }

                /* Right Bubble Tail */
                .bubble-right {
                    border-bottom-right-radius: 0;
                }
                .bubble-right::after {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    right: 0;
                    border-left: 40px solid transparent;
                    border-top: 40px solid #FFF;
                    border-bottom: 0;
                    border-right: 0;
                    border-radius: 0 0 0 40px; /* Curve the outside */
                }

            `}</style>
        </section>
    );
};

export default Testimonials;
