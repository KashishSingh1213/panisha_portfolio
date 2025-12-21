import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const StepCard = ({ index, data, isLast }) => {
    const isLeft = index % 2 === 0;
    const [isExpanded, setIsExpanded] = useState(false);

    // Brand Palette mapping
    const theme = [
        { main: '#1F0954', shadow: '#0c0221', title: 'LinkedIn Strategy', iconColor: '#0077B5' }, // Navy (Brand)
        { main: '#4B0082', shadow: '#2a0049', title: 'Instagram Growth', iconColor: '#E1306C' },  // Purple (Brand)
        { main: '#C7B58D', shadow: '#8f7e57', title: 'YouTube Content', iconColor: '#FF0000' }    // Gold (Brand)
    ][index];

    return (
        <div className="step-row" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            marginBottom: isLast ? '0' : '3rem',
            zIndex: 1,
            marginLeft: isLeft ? '0' : 'auto',
            marginRight: isLeft ? 'auto' : '0',
            transform: isLeft ? 'translateX(10%)' : 'translateX(-10%)'
        }}>
            {/* White Content Card */}
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '2.5rem 2rem',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.02)',
                marginBottom: '1rem'
            }}>
                {/* Ribbon Tag */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: isLeft ? '-15px' : 'auto',
                    right: isLeft ? 'auto' : '-15px',
                    width: '60px',
                    height: '50px',
                    backgroundColor: theme.main,
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    zIndex: 2,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    clipPath: isLeft
                        ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 50%)'
                        : 'polygon(0% 0%, 100% 0%, 80% 50%, 100% 100%, 0% 100%)'
                }}>
                    0{index + 1}
                </div>

                {/* Ribbon Fold shadow */}
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: isLeft ? '-15px' : 'auto',
                    right: isLeft ? 'auto' : '-15px',
                    width: '15px',
                    height: '15px',
                    backgroundColor: theme.shadow,
                    zIndex: 1,
                    clipPath: isLeft
                        ? 'polygon(100% 0, 0 0, 100% 100%)'
                        : 'polygon(0 0, 100% 0, 0 100%)'
                }}></div>

                {/* Content Header */}
                <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    color: theme.main,
                    marginBottom: '1.5rem',
                    marginTop: '0.5rem',
                    textAlign: 'center'
                }}>
                    {theme.title}
                </h3>

                {/* Main Content Body (Full Text) */}
                <div style={{
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '0.95rem',
                    color: '#444',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-line',
                    padding: '0 0.5rem',
                    transition: 'all 0.5s ease',
                    overflow: 'hidden',
                    maxHeight: isExpanded ? '2000px' : '150px', // Animate collapsed/expanded height
                    position: 'relative'
                }}>
                    {data.content}
                    {/* Gradient fade for truncated text */}
                    {!isExpanded && (
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '80px',
                            background: 'linear-gradient(transparent, #ffffff)',
                            pointerEvents: 'none'
                        }}></div>
                    )}
                </div>

                {/* Toggle Button */}
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: theme.main,
                            fontWeight: 700,
                            borderBottom: `2px solid ${theme.main}`,
                            paddingBottom: '2px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px',
                            fontFamily: '"Manrope", sans-serif',
                            transition: 'all 0.3s ease'
                        }}>
                        {isExpanded ? 'READ LESS' : 'READ FULL CASE STUDY'}
                    </button>
                </div>
            </div>

            {/* Floating Large Icon */}
            <div style={{
                position: 'absolute',
                top: '60px',
                right: isLeft ? '-50px' : 'auto',
                left: isLeft ? 'auto' : '-50px',
                width: '100px',
                height: '100px',
                zIndex: 3,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
                color: theme.iconColor,
                backgroundColor: '#FFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `4px solid ${'#FFF5EA'}`
            }}>
                {data.icon}
            </div>
        </div>
    );
};

const ContentSamples = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".step-row", {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Full Long-form content
    const samples = [
        {
            content: "Back in my early days as an aspiring entrepreneur, I had this weird habit of putting off communication. No matter if it was replying to emails, returning calls, or following up with potential business partners, I always found some excuse to procrastinate. I mean, I convinced myself that I was too busy with my startup to focus on immediate communication. But what I didn't realise was that this delay was actually costing me valuable chances to grow my business.\n\nIt wasn't until a game-changing moment that I realised my mistake. A potential investor had contacted me, and instead of my usual stalling, I responded right away. That decision led to a successful meeting and, ultimately, secured the funding my startup so desperately needed. That was the wake-up call I needed.\n\nFrom then on, I ditched my procrastination habit and embraced the power of timely communication. And let me tell you, it transformed my entrepreneurial journey. Quick responses built trust with my partners, investors, and customers. And being able to seize opportunities as they arose. Well, that propelled my business forward like nothing else. Looking back, I can honestly say that this fundamental shift in my approach to communication played a big part in my career as an entrepreneur.",
            link: "#",
            icon: <FaLinkedin size={45} />
        },
        {
            content: "Growing up in an immigrant family, I always felt grateful for the incredible lessons. My family had to leave their homeland and try a new country, which was pretty scary. But it also made them refined and determined.\n\nMy grandparents and parents showed me how to adapt to new situations, and how to work for a better life. These qualities have become a part of who I want to carry on these valuable lessons to my children and their children.\n\nBeing part of an immigrant family has shown me these virtues, and I'm proud of my roots. They taught me that resilience isn't just about surviving hard times, but about thriving in them and finding joy in the journey of adaptation.",
            link: "#",
            icon: <FaInstagram size={45} />
        },
        {
            content: "A Conversation with Professor Roger Delves (Professor of Authentic Leadership) on how to stay true to yourself and discover what is authenticity.\n\nAuthenticity isn't just a buzzword—it's a powerful way to live and lead. In this video, Roger Delves, an esteemed Indigo Sails professional facilitator, explores how to align personal lives or professional journeys, understanding and applying a stronger sense of purpose.\n\nThey go beyond theory, offering practical guidance on how to align personal lives or professional journeys, understanding and applying stronger sense of purpose.\n\nIn this video, you'll discover:\n✅ What authenticity really means\n✅ How to navigate challenges when staying true to yourself\n✅ Practical steps to make authenticity a part of your everyday life\n✅ The impact of authenticity on personal and professional success\n\nJoin us on this journey of self-discovery and transformation.\n\nFor more information, please email:\ninfo@indigosails.co.uk\nbookings@indigosails.co.uk",
            link: "#",
            icon: <FaYoutube size={45} />
        }
    ];

    return (
        <section id="portfolio" ref={containerRef} style={{
            backgroundColor: '#FFFAF6', // Ivory
            padding: 'var(--section-spacing) 5% 0 5%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem' }}>
                <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                    color: '#1F0954',
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-1px'
                }}>
                    PORTFOLIO
                </h2>
                <h3 style={{
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '1.5rem',
                    color: '#5E4B8B',
                    marginTop: '0.5rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    Content Strategy
                </h3>
                <p style={{
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '1.1rem',
                    color: '#888',
                    marginTop: '1rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    Compelling narratives tailored for every platform.
                </p>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {samples.map((s, i) => (
                    <StepCard key={i} index={i} data={s} isLast={i === samples.length - 1} />
                ))}
            </div>

            {/* Mobile CSS adjustments */}
            <style>{`
                @media (max-width: 900px) {
                    .step-row {
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        transform: none !important;
                        margin-bottom: 5rem !important;
                        max-width: 100% !important;
                    }
                    /* Center everything on mobile */
                    .step-row > div:nth-child(1) {  /* Content Bar */
                        padding: 3rem 1.5rem !important;
                        align-items: center !important;
                        text-align: center !important;
                    } 
                    .step-row h3 { text-align: center !important; }
                    .step-row p, .step-row div { text-align: center !important; }
                    
                    /* Icon Adjustment */
                    .step-row > div:nth-child(2) { /* Floating Icon */
                        position: absolute !important;
                        top: 0 !important;
                        right: 20px !important;
                        left: auto !important;
                        transform: translateY(-50%) !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContentSamples;
