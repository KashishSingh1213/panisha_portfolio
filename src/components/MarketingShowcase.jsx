import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaPause } from 'react-icons/fa';

// Import Graphics Images
import GraphicsImg1 from '../assets/Images/width199.png';
import GraphicsImg2 from '../assets/Images/width200.png';
import GraphicsImg3 from '../assets/Images/width200 (1).png';

// Import Marketing Images

import MarketingImg2 from '../assets/Images/marketing 2.png';
import MarketingImg3 from '../assets/Images/marketing 3.png';
import MarketingImg4 from '../assets/Images/marketing4.png';

gsap.registerPlugin(ScrollTrigger);

// --- 1. VIDEO COMPONENT (PHONE MOCKUP) ---
const PhoneVideo = ({ src, poster, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="phone-mockup" onClick={togglePlay} style={{
            width: '280px',
            height: '560px',
            borderRadius: '40px',
            border: '8px solid #1F1F1F',
            backgroundColor: '#000',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 0 0 2px #333',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
            {/* Notch */}
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '120px', height: '24px', backgroundColor: '#1F1F1F',
                borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 10
            }}></div>

            <video
                ref={videoRef}
                src={src}
                poster={poster}
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Play Overlay */}
            {!isPlaying && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(2px)'
                }}>
                    <div style={{
                        width: '70px', height: '70px', borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#FFF', fontSize: '1.5rem', backdropFilter: 'blur(10px)'
                    }}>
                        <FaPlay style={{ marginLeft: '4px' }} />
                    </div>
                </div>
            )}

            {/* Title Badge similar to Instagram */}
            <div style={{
                position: 'absolute', bottom: '20px', left: '0', width: '100%',
                padding: '0 20px', pointerEvents: 'none'
            }}>
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                    padding: '8px 16px', borderRadius: '20px', display: 'inline-block',
                    color: '#FFF', fontSize: '0.8rem', fontFamily: 'Manrope, sans-serif'
                }}>
                    @{title}
                </div>
            </div>
        </div>
    );
};


// --- 2. GRID CARD COMPONENT ---
const GridCard = ({ children, className = "", style = {} }) => (
    <div className={`grid-card ${className}`} style={{
        backgroundColor: '#FFF',
        borderRadius: '0', // Sharp corners as per editorial grid ref
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.4s ease',
        ...style
    }}>
        {children}
    </div>
);


// --- MAIN SHOWCASE COMPONENT ---
const MarketingShowcase = () => {
    const containerRef = useRef(null);

    // Palette
    const c = {
        bg: '#FFFFF0',
        navy: '#1F0954',
        gold: '#C7B58D',
        purple: '#4B0082',
        border: '#E5E5E5'
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Sections on scroll
            gsap.utils.toArray('.anim-section').forEach(section => {
                gsap.from(section, {
                    y: 50, opacity: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: section, start: 'top 80%' }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Unsplash Images mapped to content
    const items = [
        // Marketing Materials (Tall/Portrait) - USING LOCAL IMAGES
        { id: 2, type: 'marketing', img: MarketingImg2, title: 'Marketing 2' },
        { id: 3, type: 'marketing', img: MarketingImg3, title: 'Marketing 3' },
        { id: 7, type: 'marketing', img: MarketingImg4, title: 'Marketing 4' },

        // Graphics (Square/Wide) - USING LOCAL IMAGES
        { id: 4, type: 'graphics', img: GraphicsImg1, title: 'Social Media' },
        { id: 5, type: 'graphics', img: GraphicsImg2, title: 'Typography' },
        { id: 6, type: 'graphics', img: GraphicsImg3, title: 'Identity' },
    ];

    return (
        <section ref={containerRef} style={{ backgroundColor: c.bg, overflow: 'hidden' }}>

            {/* === PART 1: VIDEOS === */}
            <div className="anim-section" style={{ padding: 'var(--section-spacing) 5%', borderBottom: `1px solid ${c.border}` }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', color: c.navy, marginBottom: '1.5rem' }}>Videos</h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                        I have expertise in video editing and creation, including projects for company, personal branding, collaborations/partnerships, and trending content.
                    </p>
                </div>

                <div className="phones-grid" style={{
                    display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap'
                }}>
                    <PhoneVideo
                        title="Company"
                        src="https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4"
                        poster="https://images.unsplash.com/photo-1531297461136-82lw9b61d696?auto=format&fit=crop&w=600&q=80"
                    />
                    <PhoneVideo
                        title="Branding"
                        src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4"
                        poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                    />
                    <PhoneVideo
                        title="Trending"
                        src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-on-smartphone-40291-large.mp4"
                        poster="https://images.unsplash.com/photo-1542202229-7d9377a3a712?auto=format&fit=crop&w=600&q=80"
                    />
                </div>
            </div>


            {/* === PART 2: MARKETING PORTFOLIO (GRID) === */}
            <div className="anim-section" style={{ padding: 'var(--section-spacing) 5%' }}>

                {/* Header Block with Reference Style */}
                <div style={{
                    borderLeft: `10px solid ${c.gold}`, paddingLeft: '3rem', margin: '0 0 5rem 0',
                    maxWidth: '1000px'
                }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', color: c.navy, lineHeight: 1, marginBottom: '1rem', textTransform: 'uppercase' }}>
                        Marketing<br /><span style={{ color: c.purple }}>Portfolio</span>
                    </h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', color: '#666', maxWidth: '600px' }}>
                        Graphics & Strategy
                    </p>
                </div>

                {/* THE GRID */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',
                    autoRows: 'auto'
                }}>

                    {/* --- Text Block: Graphics --- */}
                    <div style={{ gridColumn: 'span 1', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: c.navy, marginBottom: '1.5rem' }}>Graphics</h3>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#444' }}>
                            Experience in graphic design, including corporate projects, collaborations, travel and more. These are some examples of my work.
                        </p>
                    </div>

                    {/* --- Graphics Items (Square/Landscape) --- */}
                    {items.filter(i => i.type === 'graphics').map(item => (
                        <GridCard key={item.id} style={{ height: '350px' }}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                                <span style={{ color: '#FFF', fontFamily: 'Manrope, sans-serif', fontWeight: 600, letterSpacing: '1px' }}>{item.title}</span>
                            </div>
                        </GridCard>
                    ))}

                    {/* --- Marketing Items (Portrait/Tall) --- */}
                    {items.filter(i => i.type === 'marketing').map(item => (
                        <GridCard key={item.id} style={{ height: '420px', gridRow: 'span 2' }}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '20px', right: '20px', background: c.gold, color: '#FFF', padding: '5px 15px', fontSize: '0.8rem', fontWeight: 700 }}>MARKETING</div>
                        </GridCard>
                    ))}

                    {/* --- Text Block: Marketing --- */}
                    <div style={{
                        gridColumn: 'span 2', backgroundColor: c.navy, color: '#FFFFF0',
                        padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                    }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: c.gold, marginBottom: '1.5rem' }}>Marketing Material</h3>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
                            Created a range of marketing materials like banners, brochures, leaflets, and business cards to boost brand visibility. Also worked on fun branded merchandise such as T-shirts, candles, and tote bags to keep the brand consistent and memorable.
                        </p>
                    </div>

                </div>
            </div>

            <style>{`
                .grid-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important; }
                .phone-mockup:hover { transform: translateY(-10px); }
                
                @media (max-width: 900px) {
                    .phones-grid { flex-direction: column; align-items: center; }
                    .marketing-grid { grid-template-columns: 1fr !important; }
                    
                    /* Reset Grid for Mobile */
                    div[style*="display: grid"] { grid-template-columns: 1fr !important; }
                    div[style*="gridColumn: 'span 2'"] { grid-column: auto !important; }
                    div[style*="gridRow: 'span 2'"] { grid-row: auto !important; height: 350px !important; }
                }
            `}</style>
        </section>
    );
};

export default MarketingShowcase;
