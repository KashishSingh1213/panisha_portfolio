import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const [activeService, setActiveService] = useState(0);
    const [servicesData, setServicesData] = useState([]);
    const containerRef = useRef(null);
    const listRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        // Fetch content
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "services"), (doc) => {
                    if (doc.exists() && doc.data().items) {
                        setServicesData(doc.data().items);
                    } else {
                        // Default data if DB empty
                        setServicesData([
                            {
                                id: '01',
                                title: 'Digital Marketing & Strategy',
                                description: 'Campaign planning, lead generation, audience growth strategies, and performance analysis to drive measurable results. We focus on ROI-driven campaigns that scale.',
                                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
                            },
                            {
                                id: '02',
                                title: 'Social Media Management',
                                description: 'Platform-specific content planning, storytelling, community engagement, and trend analysis to build brand presence. We turn followers into loyal advocates.',
                                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
                            },
                            {
                                id: '03',
                                title: 'Content Writing',
                                description: 'Website copy, social media captions, brand storytelling, and professional communications aligned with your voice. Words that resonate and persuade.',
                                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
                            },
                            {
                                id: '04',
                                title: 'Video & Creative Content',
                                description: 'Video editing for brands/personal profiles, short-form content (Reels/TikToks), and creative direction for high-impact campaigns.',
                                image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
                            },
                            {
                                id: '05',
                                title: 'Graphic Content',
                                description: 'Engaging social media creatives, brand visuals, and promotional designs that capture attention. Visuals that speak louder than words.',
                                image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
                            }
                        ]);
                    }
                });
                return () => unsub();
            });
        });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial List Animation
            const items = document.querySelectorAll('.service-item');
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );

            // Image Container Animation
            gsap.fromTo(imageContainerRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
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
            padding: '120px 5%',
            minHeight: '100vh', // Ensure sticky has room
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#5D4037',
            fontFamily: '"Manrope", sans-serif',
        },
        header: {
            maxWidth: '1200px',
            margin: '0 auto 5rem auto',
            width: '100%',
        },
        sub: {
            color: '#E07A5F',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            display: 'block'
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            color: '#3E2723',
            margin: 0,
            maxWidth: '600px',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
            position: 'relative',
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2,
        },
        item: (index) => ({
            padding: '2.5rem 0',
            borderTop: '1px solid rgba(93, 64, 55, 0.2)',
            borderBottom: index === servicesData.length - 1 ? '1px solid rgba(93, 64, 55, 0.2)' : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: activeService === index ? 1 : 0.5,
        }),
        itemContent: {
            flex: 1,
            paddingRight: '2rem',
        },
        id: {
            fontSize: '1.2rem',
            color: '#D87C5A',
            fontFamily: '"Playfair Display", serif',
            marginBottom: '0.5rem',
            display: 'block',
        },
        title: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.8rem',
            margin: '0 0 0.5rem 0',
            color: '#3E2723',
            transition: 'color 0.3s ease',
        },
        description: (index) => ({
            fontSize: '1.05rem',
            color: '#795548',
            maxWidth: '95%',
            height: activeService === index ? 'auto' : '0',
            overflow: 'hidden',
            opacity: activeService === index ? 1 : 0,
            transform: activeService === index ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            marginTop: activeService === index ? '1rem' : '0',
            lineHeight: 1.7,
        }),
        arrow: (index) => ({
            fontSize: '1.5rem',
            transform: activeService === index ? 'rotate(-45deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s ease',
            color: activeService === index ? '#E07A5F' : '#D87C5A',
        }),
        imageContainer: {
            height: '600px',
            position: 'sticky',
            top: '100px', // Stick below header or nav
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(62, 39, 35, 0.25)',
        },
        image: (isActive) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.7s ease, transform 1.2s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1.15)',
            zIndex: isActive ? 1 : 0,
        })
    };

    return (
        <section style={styles.section} ref={containerRef} id="services">
            <div style={styles.header}>
                <span style={styles.sub}>My Expertise</span>
                <h2 style={styles.h2}>Tailored Solutions for<br />Your Brand Growth</h2>
            </div>

            <div style={styles.container}>
                {/* List Side */}
                <div style={styles.list} ref={listRef} className="services-list">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            style={styles.item(index)}
                            className="service-item"
                            onMouseEnter={() => setActiveService(index)}
                            // Also support click for mobile or ease
                            onClick={() => setActiveService(index)}
                        >
                            <div style={styles.itemContent}>
                                <span style={styles.id}>{service.id}</span>
                                <h3 style={styles.title} className={activeService === index ? 'active-title' : ''}>
                                    {service.title}
                                </h3>
                                <div style={styles.description(index)}>
                                    {service.description}
                                </div>
                            </div>
                            <div style={styles.arrow(index)}>
                                ➜
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Side */}
                <div style={styles.imageContainer} ref={imageContainerRef} className="service-image-container">
                    {servicesData.map((service, index) => (
                        <img
                            key={service.id}
                            src={service.image}
                            alt={service.title}
                            style={styles.image(activeService === index)}
                            loading="lazy"
                        />
                    ))}
                    {/* Dark Overlay gradient for text readability if we ever put text over it, but mostly for aesthetics */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '30%',
                        background: 'linear-gradient(to top, rgba(62,39,35,0.4), transparent)',
                        pointerEvents: 'none',
                        zIndex: 2
                    }}></div>
                </div>
            </div>

            <style>{`
                .active-title {
                    color: #E07A5F !important;
                }
                @media (max-width: 968px) {
                    .services-list {
                        order: 2;
                    }
                    .service-image-container {
                        height: 350px !important;
                        position: relative !important;
                        top: 0 !important;
                        margin-bottom: 2rem;
                        order: 1;
                        width: 100%;
                    }
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Services;
