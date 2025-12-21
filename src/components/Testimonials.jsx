import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const mainContentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonialsData, setTestimonialsData] = useState([]);
    const [headerData, setHeaderData] = useState({
        title: "Don't take our word for it!",
        subtitle: "Hear it from our clients!"
    });


    // Mock Data Loading -> Real Data Loading
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const docRef = doc(db, 'content', 'testimonials');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.items && data.items.length > 0) {
                        setTestimonialsData(data.items);
                    }
                    if (data.title) setHeaderData(prev => ({ ...prev, title: data.title }));
                    if (data.subtitle) setHeaderData(prev => ({ ...prev, subtitle: data.subtitle }));
                } else {
                    // Fallback to hardcoded if no data in DB
                    setTestimonialsData([
                        {
                            id: 1,
                            name: "Michael Johnson",
                            role: "Senior Software Engineer",
                            text: "I was looking for my next big career move, and within weeks, I landed a role that perfectly matched my skills and aspirations. The process was seamless!",
                            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        },
                        {
                            id: 2,
                            name: "Sarah Meyers",
                            role: "Marketing Director",
                            text: "Panisha brings a rare balance of creativity and strategy. Her ability to understand brand goals and translate them into engaging content made a visible difference.",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        },
                        {
                            id: 3,
                            name: "David Kim",
                            role: "Startup Founder",
                            text: "Professional, reliable, and detail-oriented. From social media to content and campaign execution, her contribution consistently delivered strong results.",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        },
                        {
                            id: 4,
                            name: "Anita Patel",
                            role: "Brand Architect",
                            text: "Her work added clarity and consistency to our brand communication. The new visual identity helped us connect better with our audience.",
                            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                // Keep hardcoded fallback in case of error, setting it here explicitly if needed, but the else block above handles the 'no data' case.
                // It's safer to ensure state is set if it wasn't already.
                setTestimonialsData([
                    {
                        id: 1,
                        name: "Michael Johnson",
                        role: "Senior Software Engineer",
                        text: "I was looking for my next big career move, and within weeks, I landed a role that perfectly matched my skills and aspirations. The process was seamless!",
                        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    },
                    {
                        id: 2,
                        name: "Sarah Meyers",
                        role: "Marketing Director",
                        text: "Panisha brings a rare balance of creativity and strategy. Her ability to understand brand goals and translate them into engaging content made a visible difference.",
                        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    },
                    {
                        id: 3,
                        name: "David Kim",
                        role: "Startup Founder",
                        text: "Professional, reliable, and detail-oriented. From social media to content and campaign execution, her contribution consistently delivered strong results.",
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    },
                    {
                        id: 4,
                        name: "Anita Patel",
                        role: "Brand Architect",
                        text: "Her work added clarity and consistency to our brand communication. The new visual identity helped us connect better with our audience.",
                        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    }
                ]);
            }
        };

        fetchTestimonials();
    }, []);

    // Animate content when activeIndex changes
    useEffect(() => {
        if (!mainContentRef.current) return;

        // Fade out slightly then back in
        gsap.fromTo(mainContentRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [activeIndex]);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const currentTestimonial = testimonialsData[activeIndex];

    if (!testimonialsData.length) return null;

    return (
        <section ref={sectionRef} style={{
            backgroundColor: '#FFFAF6', // Ivory Light Background
            padding: 'var(--section-spacing) 5%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#1F0954', // Dark Navy Text for contrast
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: '1100px', width: '100%' }}>

                {/* Heading Left Aligned */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        border: '1px solid #1F0954', // Dark border
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                        color: '#1F0954', // Dark text
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Customer Review
                    </div>
                    <h2 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        lineHeight: '1.1',
                        margin: 0,
                        maxWidth: '600px',
                        color: '#1F0954'
                    }}>
                        {headerData.title}<br />
                        <span style={{ color: '#C7B58D' }}>{headerData.subtitle}</span> {/* Gold Accent */}
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 340px) 1fr',
                    gap: '4rem',
                    alignItems: 'stretch'
                }} className="testimonial-grid">

                    {/* Large Featured Image (Left Column) */}
                    <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        height: '100%',
                        minHeight: '400px',
                        boxShadow: '0 25px 50px rgba(31, 9, 84, 0.15)', // Purple shadow
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Right Column: Quote -> Author -> Thumbnails */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                        {/* Quote & Author */}
                        <div ref={mainContentRef}>
                            <FaQuoteLeft size={32} color="#C7B58D" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
                            <p style={{
                                fontSize: '1.25rem',
                                lineHeight: '1.6',
                                fontWeight: 500,
                                color: '#1F0954', // Dark text
                                marginBottom: '2rem',
                                opacity: 0.9
                            }}>
                                "{currentTestimonial.text}"
                            </p>

                            <div style={{ marginBottom: '3rem' }}>
                                <h4 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    marginBottom: '0.3rem',
                                    color: '#4B0082' // Purple Name
                                }}>
                                    {currentTestimonial.name}
                                </h4>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#C7B58D',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: 600
                                }}>
                                    {currentTestimonial.role}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails Row (Bottom of Right Column) */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap'
                        }}>
                            {testimonialsData.map((t, i) => (
                                <div
                                    key={t.id}
                                    onClick={() => handleThumbnailClick(i)}
                                    style={{
                                        width: '65px',
                                        height: '65px',
                                        borderRadius: '14px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        opacity: activeIndex === i ? 1 : 0.6,
                                        transform: activeIndex === i ? 'scale(1.05)' : 'scale(1)',
                                        border: activeIndex === i ? '3px solid #C7B58D' : '1px solid #DDD',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .testimonial-grid {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                    .testimonial-grid > div:first-child {
                        margin: 0 auto;
                        max-width: 300px;
                    }
                    .testimonial-grid > div:last-child {
                        align-items: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
