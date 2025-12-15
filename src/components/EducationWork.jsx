import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaChevronRight } from 'react-icons/fa';
import careerImg from '../assets/career_illustration.png';

gsap.registerPlugin(ScrollTrigger);

const EducationWork = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null); // No default selection, let user hover
    const [isMobile, setIsMobile] = useState(false);

    const [content, setContent] = useState({
        work: [
            {
                id: 'w1',
                type: 'work',
                title: 'Digital Marketing Executive',
                org: 'CT Group of Institutions',
                location: 'Jalandhar',
                period: 'May 2025 – Present',
                loot: [
                    'Manage paid lead-generation campaigns.',
                    'Run brand-awareness campaigns.',
                    'Revamped course pages for better UX.',
                    'Showcase placement outcomes.'
                ]
            },
            {
                id: 'w2',
                type: 'work',
                title: 'Marketing & Sales Manager',
                org: 'Indigo Sails',
                location: 'London',
                period: 'Jan 2024 – Mar 2025',
                loot: [
                    'Boosted lead conversions by 25%.',
                    'Increased email inquiries by 10%.',
                    'Optimised campaigns for engagement.',
                    'Organised brand visibility events.'
                ]
            },
            {
                id: 'w3',
                type: 'work',
                title: 'Social Media Manager',
                org: '1 Club',
                location: 'London',
                period: 'Mar 2023 – Dec 2023',
                loot: [
                    'Increased social reach by 60%.',
                    'Boosted podcast engagement by 20%.',
                    'Analysed data for strategy.'
                ]
            }
        ],
        education: [
            {
                id: 'e1',
                type: 'education',
                title: 'MA. Strategic Marketing',
                org: 'Uni of Greenwich',
                location: 'London, UK',
                period: '2021 – 2022',
                desc: 'Specialized in data-driven marketing strategies.'
            },
            {
                id: 'e2',
                type: 'education',
                title: 'BSc. Airlines & Tourism',
                org: 'CT Group',
                location: 'Jalandhar, India',
                period: '2017 – 2020',
                desc: 'Service operations & customer experience.'
            }
        ]
    });

    useEffect(() => {
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "experience"), (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        // Optional: simplify loot if needed for this compact view
                        setContent(data);
                    }
                });
                return () => unsub();
            });
        });

        const handleResize = () => setIsMobile(window.innerWidth < 900);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Combine data for the orbit
    // Order: e2 (left bottom), e1 (left top), w3 (top), w2 (right top), w1 (right bottom)
    // Or just spread them evenly.
    const nodes = [
        ...(content.education || []).filter(e => e.id === 'e2'),
        ...(content.education || []).filter(e => e.id === 'e1'),
        ...(content.work || []).filter(w => w.id === 'w3'),
        ...(content.work || []).filter(w => w.id === 'w2'),
        ...(content.work || []).filter(w => w.id === 'w1'),
    ];

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '100px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 10,
        },
        title: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#3E2723',
            marginBottom: '0.5rem',
        },
        subtitle: {
            color: '#D87C5A',
            fontSize: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '1rem',
            display: 'block',
        },

        // ORBIT / RADIAL CONTAINER
        orbitContainer: {
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: isMobile ? 'auto' : '650px', // Fixed height for desktop orbit
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '4rem',
        },

        // Central Image
        centerHub: {
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '0' : '50%',
            left: isMobile ? 'auto' : '50%',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
        },
        centerImg: {
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 40px rgba(216, 124, 90, 0.2))',
            transform: isMobile ? 'scale(0.9)' : 'scale(1.2)', // Make it pop
        },

        // Node
        nodeContainer: {
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '0' : '50%',
            left: isMobile ? 'auto' : '50%',
            // Transform handles positioning in JS
            width: isMobile ? '100%' : '320px',
            padding: '1.5rem',
            backgroundColor: '#FFF',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(93, 64, 55, 0.08)',
            border: '1px solid rgba(216, 124, 90, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 10,
            cursor: 'default',
            marginBottom: isMobile ? '1.5rem' : '0',
            opacity: 1, // Controlled by GSAP usually, but hardcode visible here
        },

        nodeHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.8rem',
        },
        iconBox: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: 'rgba(216, 124, 90, 0.1)',
            color: '#D87C5A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
        },
        nodeTitle: {
            fontSize: '1.1rem',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#3E2723',
            lineHeight: 1.2,
        },
        nodeOrg: {
            fontSize: '0.85rem',
            color: '#D87C5A',
            fontWeight: 700,
            textTransform: 'uppercase',
            display: 'block',
        },
        nodeDesc: {
            fontSize: '0.9rem',
            color: '#8D6E63',
            lineHeight: 1.5,
        }
    };

    // calculate positions for 5 nodes in an arc
    // Spread them from roughly 190 degrees (left) to -10 degrees (right) 
    // to arc OVER the image.
    const getDesktopStyle = (index) => {
        if (isMobile) return {};

        const total = nodes.length;
        const startRad = Math.PI; // 180 degrees (Left)
        const endRad = 0; // 0 degrees (Right)

        // We want them to span nicely around the top/sides
        // Let's place 1 at Left (-x, 0), 1 at Right (x, 0), others in between top
        // Actually, let's use a mapping for 5 items specifically to look good
        // 0: Left Bottom, 1: Left Top, 2: Top Center, 3: Right Top, 4: Right Middle

        const radiusString = isMobile ? '0' : '380px'; // Distance from center
        const positions = [
            { deg: 180, label: 'bottom-left' }, // Left
            { deg: 140, label: 'mid-left' },    // Top-Left
            { deg: 90, label: 'top' },         // Top
            { deg: 40, label: 'mid-right' },   // Top-Right
            { deg: 0, label: 'right' },       // Right
        ];

        // Map 5 nodes to these positions
        // We have 5 nodes exactly in 'nodes' array
        const pos = positions[index] || { deg: 0 };
        const rad = (pos.deg * Math.PI) / 180;
        const radius = 350; // px

        // In web layout (x right, y down), but math (x right, y up).
        // x = r * cos(theta)
        // y = -r * sin(theta) (negative to go UP)

        const x = radius * Math.cos(rad);
        const y = -radius * Math.sin(rad) * 0.8; // Flatten ellipse slightly if needed

        return {
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        };
    };

    return (
        <section style={styles.section} id="experience" ref={sectionRef}>
            <div style={styles.header}>
                <span style={styles.subtitle}>My Journey</span>
                <h2 style={styles.title}>Career & Academy</h2>
            </div>

            <div style={styles.orbitContainer}>
                {/* Central Illustration */}
                <div style={styles.centerHub}>
                    <img src={careerImg} alt="Career Center" style={styles.centerImg} />
                </div>

                {/* Nodes */}
                {nodes.map((item, index) => {
                    const isHovered = activeIndex === index;
                    const desktopStyle = getDesktopStyle(index);

                    return (
                        <div
                            key={item.id}
                            style={{
                                ...styles.nodeContainer,
                                ...desktopStyle,
                                transform: isMobile
                                    ? 'none'
                                    : desktopStyle.transform + (isHovered ? ' scale(1.1) translateY(-5px)' : ' scale(1)'),
                                zIndex: isHovered ? 20 : 10,
                                boxShadow: isHovered ? '0 20px 50px rgba(216, 124, 90, 0.15)' : styles.nodeContainer.boxShadow
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div style={styles.nodeHeader}>
                                <div style={styles.iconBox}>
                                    {item.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                                </div>
                                <div>
                                    <span style={styles.nodeOrg}>{item.org}</span>
                                    <h3 style={styles.nodeTitle}>{item.title}</h3>
                                </div>
                            </div>

                            <div style={{ ...styles.nodeDesc, maxHeight: isHovered || isMobile ? '200px' : '60px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                                {item.loot ? (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {item.loot.slice(0, 3).map((l, i) => ( // limit items for design
                                            <li key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: '4px', height: '4px', background: '#D87C5A', borderRadius: '50%' }}></div>
                                                {l}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ margin: 0 }}>{item.desc}</p>
                                )}
                            </div>

                            <div style={{
                                marginTop: '1rem',
                                fontSize: '0.8rem',
                                color: '#8D6E63',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <FaCalendarAlt /> {item.period}
                            </div>
                        </div>
                    );
                })}


                {/* Mobile: Just list them normally (flex column handled by container styles on mobile if needed) */}
                {isMobile && (
                    <style>{`
                        .orbitContainer {
                            flex-direction: column !important;
                            height: auto !important;
                             margin-top: 2rem !important;
                        }
                    `}</style>
                )}
            </div>
        </section>
    );
};

export default EducationWork;
