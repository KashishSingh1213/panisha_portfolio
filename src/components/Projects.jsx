import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
    {
        id: 1,
        title: "Marketing Campaigns",
        desc: "High-performing marketing campaigns that increased enquiries and conversions.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
        type: "arch", // Top Left
        col: 1
    },
    {
        id: 4,
        title: "Graphic Creatives",
        desc: "Graphic creatives for corporate communication and campaigns.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
        type: "inverted", // Bottom Left
        col: 1
    },
    {
        id: 6,
        title: "Strategy & Vision",
        desc: "Where data meets creativity.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", // Strategy Image
        type: "inverted-small", // Top Mid
        col: 2
    },
    {
        id: 3,
        title: "Video Content",
        desc: "Video content for events, personal branding, and collaborations.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
        type: "circle", // Bottom Mid
        col: 2
    },
    {
        id: 2,
        title: "Social Media",
        desc: "Social media projects that achieved significant reach and engagement growth.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
        type: "arch", // Top Right
        col: 3
    },
    {
        id: 5,
        title: "Written Content",
        desc: "Written content across platforms that aligns with brand voice and audience intent.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
        type: "inverted", // Bottom Right
        col: 3
    }
];

const SelectedWork = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".work-col", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            color: '#5D4037',
            padding: '120px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
        },
        header: {
            textAlign: 'center',
            marginBottom: '5rem',
        },
        title: {
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontFamily: '"Playfair Display", serif',
            margin: 0,
            color: '#3E2723',
        },
        subtitle: {
            color: '#D87C5A',
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            maxWidth: '600px',
            marginInline: 'auto',
            lineHeight: 1.6,
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        },
        // Shape Specifics
        arch: {
            height: '400px',
            borderRadius: '200px 200px 20px 20px',
        },
        inverted: {
            height: '300px',
            borderRadius: '20px 20px 200px 200px',
        },
        circle: {
            height: '360px',
            width: '360px',
            borderRadius: '50%',
            margin: '0 auto',
        },
        invertedSmall: {
            height: '250px',
            borderRadius: '0 0 125px 125px',
            borderTop: 'none',
        }
    };

    // Columns Data
    const col1 = works.filter(w => w.col === 1);
    const col2 = works.filter(w => w.col === 2);
    const col3 = works.filter(w => w.col === 3);

    const renderCard = (work) => {
        let shapeStyle = {};
        if (work.type === 'arch') shapeStyle = styles.arch;
        if (work.type === 'inverted') shapeStyle = styles.inverted;
        if (work.type === 'circle') shapeStyle = styles.circle;
        if (work.type === 'inverted-small') shapeStyle = styles.invertedSmall;

        return (
            <div
                key={work.id}
                className="work-card-container"
                style={{ ...shapeStyle }}
            >
                <div className="work-card-inner">
                    {/* Front Face: Image */}
                    <div className="work-card-front" style={{ borderRadius: shapeStyle.borderRadius }}>
                        <img
                            src={work.image}
                            alt={work.title}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                        />
                        <div className="front-shine"></div>
                    </div>

                    {/* Back Face: Content */}
                    <div className="work-card-back" style={{ borderRadius: shapeStyle.borderRadius }}>
                        <h3 className="card-title">{work.title}</h3>
                        <p className="card-desc">{work.desc}</p>
                        <span className="card-arrow">View Details ⟶</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section style={styles.section} ref={sectionRef} id="projects">
            <div className="work-header" style={styles.header}>
                <h2 style={styles.title}>Selected Work</h2>
                <p style={styles.subtitle}>
                    Creating impact through strategy, design, and storytelling.
                </p>
            </div>

            <div style={styles.grid} ref={gridRef}>
                {/* Column 1 */}
                <div className="work-col" style={styles.column}>
                    {col1.map(renderCard)}
                </div>

                {/* Column 2 */}
                <div className="work-col" style={styles.column}>
                    {col2.map(renderCard)}
                </div>

                {/* Column 3 */}
                <div className="work-col" style={styles.column}>
                    {col3.map(renderCard)}
                </div>
            </div>

            <style>{`
                .work-card-container {
                    position: relative;
                    width: 100%;
                    perspective: 1500px;
                    background-color: transparent;
                    cursor: pointer;
                }

                .work-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform-style: preserve-3d;
                }

                .work-card-container:hover .work-card-inner {
                    transform: rotateY(180deg);
                }

                .work-card-front, .work-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }

                .work-card-front {
                    background-color: #FFF5F0;
                    transform: rotateY(0deg);
                    z-index: 2;
                }
                
                .front-shine {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
                    pointer-events: none;
                }

                .work-card-back {
                    background-color: #3E2723;
                    color: white;
                    transform: rotateY(180deg);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2.5rem;
                    box-sizing: border-box;
                    z-index: 1;
                }

                .card-title {
                    font-family: "Playfair Display", serif;
                    font-size: 2rem;
                    margin: 0 0 1rem 0;
                    color: #fff;
                    transform: translateZ(30px);
                }

                .card-desc {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.85);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    text-align: center;
                    transform: translateZ(20px);
                }

                .card-arrow {
                    color: #D87C5A;
                    font-weight: 600;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    border: 1px solid #D87C5A;
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    transform: translateZ(20px);
                }
                
                .work-card-inner:hover .card-arrow {
                    background-color: #D87C5A;
                    color: white;
                    box-shadow: 0 5px 15px rgba(216, 124, 90, 0.4);
                }

                @media (max-width: 900px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="column"] {
                        flex-direction: column !important;
                    }
                    .work-card-container {
                        width: 100% !important;
                        height: 350px !important;
                    }
                    .work-card-front img {
                       height: 350px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default SelectedWork;
