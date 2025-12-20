import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SelectedWork = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const detailRef = useRef(null);
    const [works, setWorks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Fetch content
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "projects"), (doc) => {
                    if (doc.exists() && doc.data().items) {
                        setWorks(doc.data().items);
                    } else {
                        // Default static data if none in DB
                        setWorks([
                            {
                                id: 1,
                                title: "Marketing Campaigns",
                                desc: "High-performing marketing campaigns that increased enquiries and conversions.",
                                details: "Detailed marketing strategy execution focusing on ROI and audience engagement.",
                                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
                            },
                            {
                                id: 2,
                                title: "Brand Identity",
                                desc: "Visuals that matter and define your corporate presence.",
                                details: "Creating cohesive brand identities from logo design to brand guidelines.",
                                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
                            },
                            {
                                id: 3,
                                title: "Strategy & Vision",
                                desc: "Where data meets creativity to drive growth.",
                                details: "Long-term strategic planning to position brands for success in competitive markets.",
                                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
                            },
                            {
                                id: 4,
                                title: "Video Content",
                                desc: "Video content for events, branding, and collaborations.",
                                details: "I have expertise in video editing and creation, including projects for company, personal branding, collaborations/partnerships, and trending content.",
                                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
                            },
                            {
                                id: 5,
                                title: "Social Media",
                                desc: "Social media projects that achieved significant reach.",
                                details: "Managing and growing social media communities across platforms.",
                                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
                            },
                            {
                                id: 6,
                                title: "Copywriting",
                                desc: "Written content that aligns with brand voice.",
                                details: `I have hands-on experience in content writing for both personal branding and company-focused projects. My work covers a wide range, from writing marketing materials like brochures, leaflets, and banners to crafting copy for brand merchandise such as T-shirts, notebooks, and tote bags. Always ensuring consistency in tone and message.

A key part of my content writing includes developing platform-specific social media content. I create tailored captions and copy that align with the tone and audience of each platform, including professional and value-driven posts for LinkedIn, engaging visual storytelling for Instagram, community-focused updates for Facebook, and concise descriptions for YouTube.

In addition to creative content, I’ve also worked closely on writing and reviewing formal documents such as funding projects, contracts and NDAs, ensuring they are clear, professional, and aligned with brand standards.

Whether it’s building a brand voice, writing for different formats, or adapting content to fit various platforms, I bring a thoughtful, and strategic approach to every piece I create.`,
                                image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
                            }
                        ]);
                    }
                });
                return () => unsub();
            });
        });
    }, []);

    // Warm colors -> New Palette
    const colors = ['#4B0082', '#C7B58D', '#1F0954', '#6A1B9A', '#9E8C6C', '#5E4B8B'];

    // ... (animations unchanged)

    // Render Detail View
    if (selectedProject) {
        const color = colors[(selectedProject.id - 1) % colors.length] || colors[0];
        return (
            <section ref={sectionRef} style={{ backgroundColor: '#FFFFF0', padding: 'var(--section-spacing) 5%', minHeight: '100vh', fontFamily: '"Manrope", sans-serif' }}>
                <div ref={detailRef} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="detail-title-anim"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#C7B58D',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '30px',
                            fontWeight: 'bold',
                            padding: 0
                        }}
                    >
                        <span>←</span> Back to Projects
                    </button>

                    <h1 className="detail-title-anim" style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        fontFamily: '"Playfair Display", serif',
                        color: '#1F0954',
                        lineHeight: 1.1,
                        marginBottom: '40px'
                    }}>
                        {selectedProject.title}
                    </h1>

                    <div className="detail-img-anim" style={{
                        width: '100%',
                        height: '500px',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        marginBottom: '60px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                    }}>
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div className="detail-grid">
                        <div className="detail-text detail-left-anim">
                            <h3 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: color, marginBottom: '20px' }}>Project Overview</h3>
                            <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#1F0954', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
                                {selectedProject.details || selectedProject.desc}
                            </div>
                            {!selectedProject.details && ( // Only show generic text if no specific details exist
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1F0954', opacity: 0.8 }}>
                                    We focused on creating a seamless experience that guides the user through the journey, ensuring every touchpoint transforms interest into action.
                                </p>
                            )}
                        </div>
                        <div className="detail-meta detail-right-anim">
                            <div className="meta-item">
                                <h6>Role</h6>
                                <p>Strategy & Design</p>
                            </div>
                            <div className="meta-item">
                                <h6>Client</h6>
                                <p>Global Tech Inc.</p>
                            </div>
                            <div className="meta-item">
                                <h6>Year</h6>
                                <p>2024</p>
                            </div>
                            <div className="meta-item">
                                <h6>Outcome</h6>
                                <p>+200% Growth</p>
                            </div>
                        </div>
                    </div>

                    {/* Dummy Gallery */}
                    {/* Dummy Gallery */}
                    <div className="detail-gallery detail-anim" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {[
                            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop"
                        ].map((img, i) => (
                            <div key={i} style={{ height: '300px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#e0e0e0' }}>
                                <img src={img} alt={`Project Detail ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                    .detail-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 60px;
                    }
                    .meta-item {
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                        margin-bottom: 20px;
                    }
                    .meta-item h6 {
                        margin: 0 0 10px;
                        text-transform: uppercase;
                        font-size: 0.8rem;
                        color: #999;
                        letter-spacing: 1px;
                    }
                    .meta-item p {
                        margin: 0;
                        font-size: 1.2rem;
                        color: #1F0954;
                        font-weight: 500;
                    }
                    @media(max-width: 900px) {
                        .detail-grid { grid-template-columns: 1fr; gap: 40px; }
                        .detail-text h3 { font-size: 1.5rem; }
                    }
                 `}</style>
            </section>
        )
    }

    return (
        <section style={{ backgroundColor: '#FFFFF0', padding: 'var(--section-spacing) 5%', minHeight: '100vh', fontFamily: '"Manrope", sans-serif', overflow: 'hidden' }} ref={sectionRef} id="projects">
            <div style={{ textAlign: 'center', marginBottom: '120px' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: '"Playfair Display", serif', color: '#1F0954', margin: 0 }}>Selected Work</h2>
                <p style={{ color: '#C7B58D', marginTop: '1rem', fontSize: '1.1rem' }}>Our portfolio and project model</p>
            </div>

            <div className="process-container" ref={containerRef}>
                {/* Connecting Line Background */}
                <div className="connect-line"></div>

                {/* Move colors definition up or use it inside the component scope where it is already defined */}
                {works.map((work, index) => {
                    const color = colors[index % colors.length]; // colors is defined in the component scope
                    return (
                        <div key={work.id || index} className="process-item">

                            {/* Top Circle Image */}
                            <div className="process-circle" style={{ borderColor: color }}>
                                <div className="circle-inner" style={{ backgroundImage: `url(${work.image})` }}></div>
                                <div className="circle-icon-overlay">
                                    <span style={{ color: color }}>0{index + 1}</span>
                                </div>
                            </div>

                            {/* Title Pill */}
                            <div className="process-pill" style={{ backgroundColor: color }}>
                                <h3>{work.title}</h3>
                            </div>

                            {/* Connection Down */}
                            <div className="process-stem" style={{ backgroundColor: color }}></div>

                            {/* Content Box */}
                            <div className="process-box">
                                {/* Decorative colored top border */}
                                <div className="box-top-border" style={{ backgroundColor: color }}></div>

                                <p>{work.desc}</p>
                                <ul className="box-list">
                                    <li>Strategy</li>
                                    <li>Execution</li>
                                    <li>Result</li>
                                </ul>
                                <button
                                    style={{
                                        color: color,
                                        borderColor: color,
                                        '--hover-bg': color
                                    }}
                                    className="box-btn"
                                    onClick={() => setSelectedProject(work)}
                                >
                                    View Case
                                </button>
                            </div>

                            {/* Right Arrow (Except last) */}
                            {index !== works.length - 1 && (
                                <div className="process-arrow">
                                    <svg viewBox="0 0 24 24" fill={color} width="24px" height="24px">
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                .process-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 1.5rem;
                    position: relative;
                    flex-wrap: wrap;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding-bottom: 50px;
                }

                .connect-line {
                    position: absolute;
                    top: 50px; /* 100/2 */
                    left: 5%;
                    right: 5%;
                    height: 3px;
                    background: #e0e0e0;
                    z-index: 0;
                    display: none;
                }
                @media(min-width: 1100px) {
                    .process-container { flex-wrap: nowrap; }
                    .connect-line { display: block; }
                }

                .process-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 200px; /* Reduced from 250px */
                    position: relative;
                    z-index: 1;
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }
                .process-item:hover {
                    transform: translateY(-10px);
                }

                /* Circle */
                .process-circle {
                    width: 100px; /* Reduced from 150px */
                    height: 100px;
                    border-radius: 50%;
                    border-width: 4px;
                    border-style: solid;
                    background: white;
                    padding: 4px;
                    position: relative;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                    transition: transform 0.3s ease;
                }
                .process-item:hover .process-circle {
                    transform: scale(1.05);
                }

                .circle-inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-size: cover;
                    background-position: center;
                }
                .circle-icon-overlay {
                    position: absolute;
                    bottom: -5px;
                    right: -5px;
                    background: white;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    font-weight: bold;
                    font-family: 'Playfair Display', serif;
                    font-size: 0.9rem;
                }

                /* Pill */
                .process-pill {
                    margin-top: -20px;
                    padding: 10px 20px;
                    border-radius: 50px;
                    color: white;
                    z-index: 3;
                    text-align: center;
                    min-width: 150px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
                    position: relative;
                }
                .process-pill h3 {
                    margin: 0;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 700;
                }

                /* Stem */
                .process-stem {
                    width: 3px;
                    height: 30px;
                    margin-top: -10px;
                    z-index: 1;
                }

                /* Box */
                .process-box {
                    background: white;
                    width: 100%;
                    border-radius: 15px;
                    border-bottom: 4px solid #eee;
                    padding: 20px 15px 30px 15px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.05);
                    text-align: center;
                    position: relative;
                    margin-top: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 220px;
                    transition: all 0.3s ease;
                }

                .box-top-border {
                    width: 100%;
                    height: 5px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 15px 15px 0 0;
                }
                .process-box p {
                    font-size: 0.85rem;
                    color: #666;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                }
                .box-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 1rem 0;
                    font-size: 0.75rem;
                    color: #999;
                    text-align: left;
                    width: 100%;
                    padding-left: 10px;
                }
                .box-list li::before {
                    content: "•";
                    color: #ccc;
                    margin-right: 5px;
                }

                /* BUTTON STYLES */
                .box-btn {
                    background: transparent;
                    border: 2px solid currentColor;
                    padding: 8px 20px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: bold;
                    letter-spacing: 1px;
                    color: inherit;
                    
                    /* Always Visible now */
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Show on Item Hover */
                /* Show on Item Hover */
                .box-btn:hover {
                    background: var(--hover-bg) !important; /* Use CSS variable set inline */
                    color: white !important;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                }

                /* Arrow Connector */
                .process-arrow {
                    position: absolute;
                    right: -25px;
                    top: 150px;
                    display: none;
                }
                @media(min-width: 1100px) {
                    .process-arrow { display: block; }
                }

                /* Mobile Response */
                @media(max-width: 1099px) {
                    .process-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 3rem;
                    }
                    .process-item {
                        width: 100%;
                        max-width: 400px;
                        flex-direction: row;
                        align-items: center;
                        background: white;
                        padding: 15px;
                        border-radius: 20px;
                        box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                        transform: none !important;
                    }

                    /* Circle adjust */
                    .process-circle {
                        width: 80px;
                        height: 80px;
                        margin-right: 20px;
                        flex-shrink: 0;
                    }
                    .circle-icon-overlay { width: 30px; height: 30px; font-size: 0.9rem; }

                    /* Pill adjust to look like Label */
                    .process-pill {
                        margin: 0;
                        padding: 6px 15px;
                        border-radius: 8px;
                        display: inline-block;
                        width: auto;
                        min-width: 0;
                        font-size: 0.8rem;
                        position: static;
                        box-shadow: none;
                        margin-bottom: 8px;
                    }

                    .process-stem, .connect-line, .box-top-border { display: none; }

                    .process-box {
                        box-shadow: none;
                        padding: 0;
                        border: none;
                        min-height: auto;
                        text-align: left;
                        align-items: flex-start;
                        clip-path: none;
                        border-radius: 0;
                        display: block;
                    }
                    .process-box p { margin: 5px 0; }
                    .box-list { display: none; }

                    /* Always show button on mobile? Or keep hover?
                       Hover is hard on mobile. Let's make it visible on mobile or just simple text link.
                       For consistency with "never show... show it", sticking to desktop logic, but on mobile
                       we usually just click the card.
                       I will make button visible always on mobile for usability.
                    */
                    .box-btn {
                        opacity: 1;
                        transform: translateY(0);
                        padding: 5px 15px;
                        font-size: 0.75rem;
                        margin-top: 10px;
                        display: inline-block;
                    }
                }
            `}</style>
        </section>
    );
};

export default SelectedWork;
