import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import about1 from '../assets/Images/about 1.webp';
import about2 from '../assets/Images/about5.png';
import about3 from '../assets/Images/about 2.webp';
import about4 from '../assets/Images/about3.jpg';

gsap.registerPlugin(ScrollTrigger);

const fallbackImages = {
    img1: about1,
    img2: about2,
    img3: about3,
    img4: about4
};

const getValidUrl = (url, fallback) => {
    if (!url || typeof url !== 'string') return fallback;
    // Check for valid HTTP/HTTPS or Data URL
    if (url.match(/^(https?:\/\/|data:image\/)/i)) return url;
    return fallback;
};

const About = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    const [content, setContent] = React.useState({
        heading: 'Crafting stories \nthat connect & convert.',
        highlight: 'connect & convert.',
        desc1: 'I’m a results-oriented marketing professional with a strong foundation in strategic marketing. I enjoy translating brand goals into clear messages that connect with audiences, build trust, and drive measurable growth.',
        desc2: 'From managing campaigns to creating engaging content, I combine the creative side with the performance side of marketing to deliver real value.',
        yearsExp: '5+',
        projectsDelivered: '50+',
        ...fallbackImages
    });

    useEffect(() => {
        // Fetch content
        const fetchData = async () => {
            const { db } = await import('../firebase');
            const { doc, onSnapshot } = await import('firebase/firestore');

            const unsub = onSnapshot(doc(db, "content", "about"), (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setContent({
                        heading: data.heading || 'Crafting stories \nthat connect & convert.',
                        highlight: data.highlight || 'connect & convert.',
                        desc1: data.desc1 || 'I’m a results-oriented marketing professional with a strong foundation in strategic marketing. I enjoy translating brand goals into clear messages that connect with audiences, build trust, and drive measurable growth.',
                        desc2: data.desc2 || 'From managing campaigns to creating engaging content, I combine the creative side with the performance side of marketing to deliver real value.',
                        yearsExp: data.yearsExp || '5+',
                        projectsDelivered: data.projectsDelivered || '50+',
                        img1: getValidUrl(data.img1, fallbackImages.img1),
                        img2: getValidUrl(data.img2, fallbackImages.img2),
                        img3: getValidUrl(data.img3, fallbackImages.img3),
                        img4: getValidUrl(data.img4, fallbackImages.img4)
                    });
                }
            });
        };
        fetchData();
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
            padding: 'var(--section-spacing) 5%',
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
            gap: '4rem',
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
            width: '280px', // Fixed width
            height: '420px', // Fixed height
            backgroundImage: `url("${content.img1 || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'}")`,
            borderRadius: '140px',
            // Use calc to center to avoid GSAP overwrite of transform
            left: 'calc(50% - 140px)',
            top: 'calc(50% - 210px)',
            position: 'absolute',
            zIndex: 2,
            border: '5px solid #FFF',
        },
        img2: { // Top Right Circle
            width: '160px',
            height: '160px',
            backgroundImage: `url("${content.img2 || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'}")`,
            borderRadius: '50%',
            top: '10%',
            right: '5%',
            position: 'absolute',
            zIndex: 1,
            border: '5px solid #FFF',
        },
        img3: { // Bottom Left Landscape
            width: '220px',
            height: '160px',
            backgroundImage: `url("${content.img3 || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80'}")`,
            borderRadius: '20px',
            bottom: '10%',
            left: '0%',
            position: 'absolute',
            zIndex: 3,
            border: '5px solid #FFF',
        },
        img4: { // Tiny decorative circle
            width: '80px',
            height: '80px',
            backgroundImage: `url("${content.img4 || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80'}")`,
            borderRadius: '50%',
            top: '20%',
            left: '10%',
            position: 'absolute',
            zIndex: 1,
            border: '3px solid #FFF',
            opacity: 0.9,
        }
    };

    return (
        <section style={styles.section} id="about" ref={sectionRef} className="about-section">
            <div style={styles.container} className="about-container">
                {/* Left Side: Content */}
                <div style={styles.leftCol} ref={leftColRef} className="about-left-col">
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
                <div style={styles.rightCol} ref={rightColRef} className="about-right-col">
                    {/* Main Image */}
                    <div className="collage-item parallax-up img-main" style={{ ...styles.imgBase, ...styles.img1 }}></div>

                    {/* Peripheral Images */}
                    <div className="collage-item parallax-down img-top-right" style={{ ...styles.imgBase, ...styles.img2 }}></div>
                    <div className="collage-item parallax-up img-bottom-left" style={{ ...styles.imgBase, ...styles.img3 }}></div>
                    <div className="collage-item parallax-down img-tiny" style={{ ...styles.imgBase, ...styles.img4 }}></div>
                </div>
            </div>

            <style>{`
                .hover-btn:hover {
                    background-color: #6A1B9A !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(106, 27, 154, 0.3);
                }
                @media (max-width: 900px) {
                    .about-container {
                        grid-template-columns: 1fr !important;
                    }
                    .about-right-col {
                        height: 500px !important;
                        margin-top: 3rem;
                    }
                    
                    /* Mobile Collage Layout */
                    /* Removed transition to avoid GSAP conflict */
                    .collage-item {
                        /* transition: all 0.5s ease; */
                    }

                    .img-main {
                        width: 240px !important;
                        height: 340px !important;
                        position: absolute !important;
                        left: 0 !important;
                        right: 0 !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        margin: auto !important;
                        z-index: 2 !important;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
                    }

                    .img-top-right {
                        display: none !important;
                    }

                    .img-bottom-left {
                        width: 160px !important;
                        height: 120px !important;
                        top: auto !important;
                        bottom: 15% !important;
                        left: 5% !important;
                        /* Removed transform constraint */
                        z-index: 3 !important;
                        border-radius: 16px !important;
                    }

                    .img-tiny {
                        display: none !important;
                    }

                }
            `}</style>
        </section>
    );
};

export default About;
