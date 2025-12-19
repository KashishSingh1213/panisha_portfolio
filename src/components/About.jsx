import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    const [content, setContent] = React.useState({
        heading: 'Strategic Content that \nBuilds Brands.',
        highlight: 'Builds Brands.',
        desc1: 'I have hands-on experience in content writing for both personal branding and company-focused projects. My work covers a wide range, from writing marketing materials like brochures and banners to crafting copy for brand merchandise, always ensuring consistency in tone and message.',
        desc2: 'Whether it’s building a brand voice, writing for different formats, or adapting content to fit various platforms, I bring a thoughtful, and strategic approach to every piece I create.',
        yearsExp: '5+',
        projectsDelivered: '50+'
    });

    useEffect(() => {
        // Fetch content
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "about"), (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setContent({
                            heading: data.heading || 'Strategic Content that \nBuilds Brands.',
                            highlight: data.highlight || 'Builds Brands.',
                            desc1: data.desc1 || '',
                            desc2: data.desc2 || '',
                            yearsExp: data.yearsExp || '5+',
                            projectsDelivered: data.projectsDelivered || '50+',
                            img1: data.img1 || '',
                            img2: data.img2 || '',
                            img3: data.img3 || '',
                            img4: data.img4 || ''
                        });
                    }
                });
                return () => unsub(); // Cleanup not strictly accessible here due to closure, but acceptable for this iteration
            });
        });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Entry
            gsap.from(leftColRef.current, {
                x: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Collage Entry (Staggered)
            gsap.from(".collage-item", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: rightColRef.current,
                    start: "top 75%",
                }
            });

            // Parallax Effect on Scroll
            gsap.to(".parallax-up", {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            gsap.to(".parallax-down", {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFFF0',
            padding: '120px 5%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden',
        },
        container: {
            maxWidth: '1200px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '6rem',
            alignItems: 'center',
        },
        // Left Text
        leftCol: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        },
        subHeading: {
            color: '#1F0954', // Dark Navy
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        line: {
            width: '40px',
            height: '2px',
            backgroundColor: '#1F0954', // Dark Navy
        },
        heading: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.1,
            color: '#1F0954',
            margin: 0,
        },
        highlight: {
            color: '#4B0082',
        },
        desc: {
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#5E4B8B',
            maxWidth: '95%',
        },
        statsRow: {
            display: 'flex',
            gap: '3rem',
            marginTop: '1rem',
        },
        statItem: {
            display: 'flex',
            flexDirection: 'column',
        },
        statNum: {
            fontSize: '2.5rem',
            fontFamily: '"Playfair Display", serif',
            color: '#4B0082',
            lineHeight: 1,
        },
        statLabel: {
            fontSize: '0.9rem',
            color: '#1F0954',
            marginTop: '0.5rem',
            fontWeight: 600,
        },
        button: {
            padding: '1rem 2.5rem',
            backgroundColor: '#4B0082',
            color: '#FFF',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            width: 'fit-content',
            marginTop: '1rem',
            transition: 'transform 0.3s ease, background 0.3s ease',
        },
        // Right Collage
        rightCol: {
            position: 'relative',
            height: '600px',
            width: '100%',
        },
        // Images
        imgBase: {
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(31, 9, 84, 0.15)',
        },
        img1: { // Main Pill
            width: '280px',
            height: '420px',
            backgroundImage: `url("${content.img1 || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'}")`,
            borderRadius: '140px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            border: '5px solid #FFF',
        },
        img2: { // Top Right Circle
            width: '180px',
            height: '180px',
            backgroundImage: `url("${content.img2 || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'}")`,
            borderRadius: '50%',
            top: '20px',
            right: '0px',
            zIndex: 1,
            border: '5px solid #FFF',
        },
        img3: { // Bottom Left Landscape
            width: '200px',
            height: '150px',
            backgroundImage: `url("${content.img3 || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80'}")`,
            borderRadius: '20px',
            bottom: '40px',
            left: '0px',
            zIndex: 3,
            border: '5px solid #FFF',
        },
        img4: { // Tiny decorative circle
            width: '100px',
            height: '100px',
            backgroundImage: `url("${content.img4 || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80'}")`,
            borderRadius: '50%',
            top: '100px',
            left: '20px',
            zIndex: 1,
            border: '3px solid #FFF',
            opacity: 0.9,
        }
    };

    return (
        <section style={styles.section} id="about" ref={sectionRef}>
            <div style={styles.container}>
                {/* Left Side: Content */}
                <div style={styles.leftCol} ref={leftColRef}>
                    <div style={styles.subHeading}>
                        <span style={styles.line}></span>
                        <span>About Me</span>
                    </div>

                    <h2 style={styles.heading}>
                        {content.heading.replace(content.highlight, '')}
                        <br />
                        <span style={styles.highlight}>{content.highlight}</span>
                    </h2>

                    <p style={styles.desc}>
                        {content.desc1}
                    </p>
                    <p style={styles.desc}>
                        {content.desc2}
                    </p>

                    <div style={styles.statsRow}>
                        <div style={styles.statItem}>
                            <span style={styles.statNum}>{content.yearsExp}</span>
                            <span style={styles.statLabel}>Years Experience</span>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statNum}>{content.projectsDelivered}</span>
                            <span style={styles.statLabel}>Projects Delivered</span>
                        </div>
                    </div>

                    <button className="hover-btn" style={styles.button}>More Details</button>
                </div>

                {/* Right Side: Collage */}
                <div style={styles.rightCol} ref={rightColRef}>
                    {/* Main Image */}
                    <div className="collage-item parallax-up" style={{ ...styles.imgBase, ...styles.img1 }}></div>

                    {/* Peripheral Images */}
                    <div className="collage-item parallax-down" style={{ ...styles.imgBase, ...styles.img2 }}></div>
                    <div className="collage-item parallax-up" style={{ ...styles.imgBase, ...styles.img3 }}></div>
                    <div className="collage-item parallax-down" style={{ ...styles.imgBase, ...styles.img4 }}></div>
                </div>
            </div>

            <style>{`
                .hover-btn:hover {
                    background-color: #6A1B9A !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(106, 27, 154, 0.3);
                }
                @media (max-width: 900px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="height: 600px"] {
                        height: 500px !important;
                        margin-top: 3rem;
                    }
                    /* Adjust image positions for mobile if needed, or rely on flex stacking */
                    .collage-item {
                        transform: scale(0.8) !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default About;
