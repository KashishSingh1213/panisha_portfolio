import React, { useEffect, useRef, useState } from 'react';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaBullhorn, FaChartLine, FaHashtag, FaPlane } from 'react-icons/fa';

const SocialMegaphoneIcon = ({ color, size, style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
    >
        {/* Megaphone Body */}
        <path d="M12 8l-6-3v6l6-3V8z" />
        <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11l4 4V1L16 3z" style={{ display: 'none' }} /> {/* Hidden msg bubble test */}
        <path d="M4 11.5L12 15l9-3.5V9l-9-3.5L4 9v2.5z" style={{ display: 'none' }} />

        {/* Actual Megaphone Line Art matches */}
        <path d="M3 11l8-4v10l-8-4v-2z" /> {/* Funnel */}
        <path d="M11 7h2a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6h-2" /> {/* Mouth wide */}
        <path d="M10 17l-1 4" /> {/* Handle */}

        {/* Social Bubbles */}
        <circle cx="19" cy="5" r="2.5" />
        <path d="M19 4v2m-1-1h2" /> {/* Plus/Social hint */}

        <circle cx="21" cy="10" r="1.5" />

        <circle cx="17" cy="3" r="1" />
    </svg>
);

const MarketingIcon = ({ color, size, style }) => (
    <svg
        stroke={color}
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <path d="M7 9.00003C7 9.00003 3.5 9 3 9C2.44772 9 2 9.44771 2 10V14C2 14.5523 2.44772 15 3 15C3.5 15 7 15 7 15Z" />
        <path d="M7 15V9.00003L15 5V19L7 15Z" />
        <path d="M19 9V15" />
        <path d="M21 7V17" />
        {/* Abstract social circles */}
        <circle cx="18" cy="6" r="1.5" fill={color} stroke="none" />
        <circle cx="21" cy="5" r="1.5" fill={color} stroke="none" />
        <circle cx="21" cy="19" r="1.5" fill={color} stroke="none" />
    </svg>
);

const EducationWork = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('education'); // Default: show study (Academy)

    const [content, setContent] = useState({
        work: [
            {
                id: 'w3',
                type: 'work',
                title: 'Digital Marketing Executive',
                org: 'CT Group of Institutions',
                location: 'Jalandhar',
                period: 'May 2025 (Projected)',
                desc: 'Managed paid lead-generation campaigns to increase student enquiries and run brand-awareness campaigns to strengthen digital presence. Revamped course pages with the web team to improve UX and added a Placement section to showcase outcomes.'
            },
            {
                id: 'w1',
                type: 'work',
                title: 'Marketing & Sales Manager',
                org: 'Indigo Sails',
                location: 'London',
                period: 'Jan 2024 – Mar 2025',
                desc: 'Executed marketing campaigns, boosting lead conversions by 25%, and managed social media and email content to increase inquiries by 10%. Analysed performance metrics to optimise campaigns for higher engagement and assisted in organising events and brand collaborations.'
            },
            {
                id: 'w2',
                type: 'work',
                title: 'Social Media Manager',
                org: '1 Club',
                location: 'London',
                period: 'Mar 2023 – Dec 2023',
                desc: 'Increased social media reach by 60% in one week through strategic marketing and managed The Redefined Podcast’s social content, boosting listenership. Analysed social data regularly to guide marketing decisions while tracking industry trends and competitor activities to stay ahead.'
            }
        ],
        education: [
            {
                id: 'e1',
                type: 'education',
                title: 'MA. Strategic Marketing',
                org: 'University of Greenwich',
                location: 'London, UK',
                period: '2021 – 2022',
                desc: 'Specialized in data-driven marketing strategies, consumer behavior, and brand management.'
            },
            {
                id: 'e2',
                type: 'education',
                title: 'BSc. Airlines & Tourism',
                org: 'CT Group of Institutions',
                location: 'Jalandhar, India',
                period: '2017 – 2020',
                desc: 'Focused on service operations, customer experience management, and global tourism trends.'
            }
        ]
    });

    useEffect(() => {
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "experience"), (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();

                        // Ensure we have arrays and update state
                        if (data.work || data.education) {
                            setContent(prev => ({
                                ...prev,
                                work: data.work || prev.work,
                                education: data.education || prev.education
                            }));
                        }
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

    // Filter nodes based on active tab
    const nodes = activeTab === 'education'
        ? [...(content.education || [])]
        : [...(content.work || [])];

    const colors = [
        '#4B0082', // Indigo
        '#C7B58D', // Gold
        '#1F0954', // Dark Navy
        '#6A1B9A', // Light Purple
        '#9E8C6C'  // Dark Gold
    ];

    const styles = {
        section: {
            backgroundColor: '#FFFFF0',
            padding: '20px 5% 60px',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem',
        },
        title: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#1F0954',
            marginBottom: '0.5rem',
        },
        subtitle: {
            color: '#1F0954',
            fontSize: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '1rem',
            display: 'block',
        },

        // Tab Container
        tabContainer: {
            display: 'flex',
            gap: '20px',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 10
        },
        tabBtn: (isActive) => ({
            padding: '0.8rem 2.5rem',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: isActive ? '#4B0082' : '#F2F0EF',
            color: isActive ? '#FFF' : '#888',
            boxShadow: isActive ? '0 10px 20px rgba(216, 124, 90, 0.3)' : 'none',
            outline: 'none'
        }),

        // Timeline
        timelineContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1200px',
            position: 'relative',
        },
        // Center Line
        centerLine: {
            position: 'absolute',
            left: isMobile ? '20px' : '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'rgba(75, 0, 130, 0.1)',
            transform: isMobile ? 'none' : 'translateX(-50%)',
        },

        // Row
        row: (index) => ({
            display: 'flex',
            width: '100%',
            flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
            alignItems: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
            position: 'relative',
            opacity: 0,
            animation: `fadeInUp 0.6s ease forwards ${index * 0.15}s`
        }),

        // Half Widths
        half: (index) => ({
            width: isMobile ? '100%' : '50%',
            padding: isMobile ? '0 0 0 80px' : '0 40px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-start' : 'flex-end'), // Align card near spine
        }),

        // The Center Circle
        centerCircle: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#fff',
            border: '2px dashed #C7B58D',
            color: '#1F0954',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            position: 'absolute',
            left: isMobile ? '20px' : '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            boxShadow: '0 0 0 8px #FFFFF0'
        },

        // Wrapper
        cardWrapper: {
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '550px',
            transition: 'transform 0.3s ease',
            position: 'relative',
            display: 'flex',
            textAlign: 'left' // FORCE LEFT ALIGNMENT ALWAYS
        },

        colorStrip: {
            width: '8px',
            flexShrink: 0
        },

        contentBox: {
            padding: '2rem',
            flex: 1,
            textAlign: 'left' // EXTRA INSURANCE
        },

        roleTitle: {
            fontSize: '1.4rem',
            fontFamily: '"Playfair Display", serif',
            fontWeight: '700',
            color: '#1F0954',
            marginBottom: '0.3rem',
            lineHeight: 1.2
        },
        orgName: {
            fontSize: '0.9rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#C7B58D',
            marginBottom: '1rem',
            display: 'block'
        },
        desc: {
            fontSize: '1rem',
            color: '#5D4037',
            lineHeight: 1.6
        },
        list: {
            paddingLeft: '1.2rem',
            margin: 0,
            color: '#5D4037',
            lineHeight: 1.6
        }
    };

    return (
        <section style={styles.section} id="experience" ref={sectionRef}>
            <div style={styles.header}>
                <span style={styles.subtitle}>My Journey</span>
                <h2 style={styles.title}>Career & Academy</h2>
            </div>

            {/* Pagination / Tabs */}
            <div style={styles.tabContainer}>
                <button
                    style={styles.tabBtn(activeTab === 'education')}
                    onClick={() => setActiveTab('education')}
                >
                    Academy
                </button>
                <button
                    style={styles.tabBtn(activeTab === 'work')}
                    onClick={() => setActiveTab('work')}
                >
                    Career
                </button>
            </div>

            <div style={styles.timelineContainer}>
                <div style={styles.centerLine}></div>

                {nodes.map((item, index) => {
                    const color = colors[index % colors.length];
                    const year = item.period.match(/\d{4}/)?.[0] || '2024';

                    // Row Direction: 
                    // Index 0 (Even) -> row -> Spacer | Circle | Card (Card on RIGHT)
                    // Index 1 (Odd) -> row-reverse -> Spacer | Circle | Card (Visually: Card | Circle | Spacer) (Card on LEFT)

                    return (
                        <div key={item.id} style={styles.row(index)}>

                            {/* Spacer (Desktop Only) */}
                            {!isMobile && (
                                <div style={{ width: '50%', opacity: 0 }}></div>
                            )}

                            {/* Center Marker */}
                            <div style={{ ...styles.centerCircle, borderColor: color, color: color }}>
                                {year}
                            </div>

                            {/* Content Card */}
                            <div style={styles.half(index)}>
                                <div
                                    style={styles.cardWrapper}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ ...styles.colorStrip, background: color }}></div>
                                    <div style={styles.contentBox}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={styles.roleTitle}>{item.title}</h3>
                                            {(() => {
                                                if (item.icon) {
                                                    return <img src={item.icon} alt="icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />;
                                                }
                                                return activeTab === 'education'
                                                    ? <FaGraduationCap color={color} size={24} style={{ opacity: 0.8 }} />
                                                    : <MarketingIcon color={color} size={24} style={{ opacity: 0.8 }} />;
                                            })()}
                                        </div>
                                        <span style={{ ...styles.orgName, color: color }}>{item.org}</span>
                                        <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1rem', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
                                            <FaCalendarAlt style={{ marginRight: 8 }} /> {item.period}
                                        </p>

                                        {item.loot ? (
                                            <ul style={styles.list}>
                                                {item.loot.map((l, i) => (
                                                    <li key={i} style={{ marginBottom: '5px' }}>{l}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p style={styles.desc}>{item.desc}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default EducationWork;
