import React, { useEffect, useRef, useState } from 'react';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const EducationWork = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('education'); // Default: show study (Academy)

    const [content, setContent] = useState({
        work: [
            {
                id: 'w1',
                type: 'work',
                title: 'Marketing & Sales Manager',
                org: 'Indigo Sails',
                location: 'London',
                period: 'Jan 2024 – Mar 2025',
                loot: [
                    'Executed marketing campaigns, boosting lead conversions by 25%.',
                    'Managed social media and email content, increasing inquiries by 10%.',
                    'Analysed performance metrics and optimised campaigns for higher engagement.',
                    'Assisted in organising events and brand collaborations.'
                ]
            },
            {
                id: 'w2',
                type: 'work',
                title: 'Social Media Manager',
                org: '1 Club',
                location: 'London',
                period: 'Mar 2023 – Dec 2023',
                loot: [
                    'Increased social media reach by 60% in one week through strategic marketing.',
                    'Managed The Redefined Podcast’s social content, boosting listenership.',
                    'Analysed social data regularly to guide marketing decisions.',
                    'Tracked industry trends and competitor activities to stay ahead.'
                ]
            },
            {
                id: 'w3',
                type: 'work',
                title: 'Digital Marketing Executive',
                org: 'CT Group of Institutions',
                location: 'Jalandhar',
                period: 'May 2025 (Projected)',
                loot: [
                    'Managed paid lead-generation campaigns to increase student enquiries.',
                    'Run brand-awareness campaigns to strengthen digital presence.',
                    'Revamped course pages with the web team to improve UX.',
                    'Added a Placement section to showcase outcomes.'
                ]
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
            marginBottom: '2rem', // Reduced to fit tabs
        },
        title: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#1F0954',
            marginBottom: '0.5rem',
        },
        subtitle: {
            color: '#1F0954', // Dark Navy
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
            marginBottom: '4rem',
            position: 'relative',
            opacity: 0,
            animation: `fadeInUp 0.6s ease forwards ${index * 0.15}s`
        }),

        // Half Widths for standard items
        half: {
            width: isMobile ? '100%' : '50%',
            padding: isMobile ? '0 0 0 50px' : (isMobile ? '0' : '0 40px'), // Padding for spacing from center
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'center', // Align card properly per side
        },

        // Specific alignment helpers
        leftContent: {
            justifyContent: 'flex-end', // Push text to center
            textAlign: isMobile ? 'left' : 'right'
        },
        rightContent: {
            justifyContent: 'flex-start', // Push text to center
            textAlign: 'left'
        },

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
            boxShadow: '0 0 0 8px #FFFFF0' // Fake margin via border color mask
        },

        // Card Wrapper
        cardWrapper: {
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '500px', // Limit width
            transition: 'transform 0.3s ease',
            position: 'relative',
            display: 'flex'
        },

        colorStrip: {
            width: '8px',
            flexShrink: 0
        },

        contentBox: {
            padding: '2rem',
            flex: 1
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
                    const isLeft = index % 2 === 0;
                    const year = item.period.match(/\d{4}/)?.[0] || '2024';

                    return (
                        <div key={item.id} style={styles.row(index)}>

                            {/* Desktop: Empty space on one side to balance */}
                            {!isMobile && (
                                <div style={{ ...styles.half, ...(!isLeft ? styles.leftContent : styles.rightContent), opacity: 0 }}>
                                    {/* Empty placeholder for alignment */}
                                </div>
                            )}

                            {/* Center Circle with Date */}
                            <div style={{ ...styles.centerCircle, borderColor: color, color: color }}>
                                {year}
                            </div>

                            {/* The Actual Content Card */}
                            <div style={{ ...styles.half, ...(isLeft ? styles.leftContent : styles.rightContent) }}>
                                <div
                                    style={styles.cardWrapper}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ ...styles.colorStrip, background: color }}></div>
                                    <div style={styles.contentBox}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={styles.roleTitle}>{item.title}</h3>
                                            {item.type === 'work' ? <FaBriefcase color={color} /> : <FaGraduationCap color={color} />}
                                        </div>
                                        <span style={{ ...styles.orgName, color: color }}>{item.org}</span>
                                        <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1rem', fontStyle: 'italic' }}>
                                            <FaCalendarAlt style={{ marginRight: 5 }} /> {item.period}
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
