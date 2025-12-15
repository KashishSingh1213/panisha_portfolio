import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTrophy, FaScroll, FaMapMarkerAlt, FaStar, FaCrown, FaBriefcase, FaGraduationCap, FaMedal } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const EducationWork = () => {
    const sectionRef = useRef(null);
    const workColRef = useRef(null);
    const eduColRef = useRef(null);

    const [content, setContent] = useState({
        work: [
            {
                id: 'w1',
                level: 'Current Quest',
                title: 'Digital Marketing Executive',
                org: 'CT Group of Institutions',
                location: 'Jalandhar',
                period: 'May 2025 – Present',
                xp: '+5000 XP',
                loot: [
                    'Manage paid lead-generation campaigns to increase student enquiries.',
                    'Run brand-awareness campaigns to strengthen CT Group’s digital presence.',
                    'Revamped course pages with the web team to improve UX and conversions.',
                    'Added a Placement section to showcase outcomes and support admissions.'
                ]
            },
            {
                id: 'w2',
                level: 'Quest Completed',
                title: 'Marketing & Sales Manager',
                org: 'Indigo Sails',
                location: 'London',
                period: 'Jan 2024 – Mar 2025',
                xp: '+3500 XP',
                loot: [
                    'Executed marketing campaigns, boosting lead conversions by 25%.',
                    'Managed social media and email content, increasing inquiries by 10%.',
                    'Analysed performance metrics and optimised campaigns for higher engagement.',
                    'Assisted in organising events and brand collaborations to enhance brand visibility.'
                ]
            },
            {
                id: 'w3',
                level: 'Quest Completed',
                title: 'Social Media Manager',
                org: '1 Club',
                location: 'London',
                period: 'Mar 2023 – Dec 2023',
                xp: '+2800 XP',
                loot: [
                    'Increased social media reach by 60% in one week through strategic marketing.',
                    'Managed The Redefined Podcast’s social content, boosting listenership and engagement by 20%.',
                    'Analysed social data regularly to guide marketing decisions and future strategy.',
                    'Tracked industry trends and competitor activities.'
                ]
            }
        ],
        education: [
            {
                id: 'e1',
                type: 'Mastery',
                title: 'MA. Strategic Marketing',
                org: 'University of Greenwich',
                location: 'London, UK',
                period: '2021 – 2022',
                unlock: 'Skill Tree: Strategy',
                desc: 'Specialized in data-driven marketing strategies, consumer behavior, and brand management.'
            },
            {
                id: 'e2',
                type: 'Bachelor',
                title: 'BSc. Airlines & Tourism',
                org: 'CT Group of Institutions',
                location: 'Jalandhar, India',
                period: '2017 – 2020',
                unlock: 'Skill Tree: Operations',
                desc: 'Focused on service operations, customer experience management, and global tourism trends.'
            }
        ]
    });

    useEffect(() => {
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "experience"), (doc) => {
                    if (doc.exists()) {
                        setContent(doc.data());
                    }
                });
                return () => unsub();
            });
        });
    }, []);

    const workData = content.work || [];
    const eduData = content.education || [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Columns Staggered
            gsap.from(workColRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: workColRef.current,
                    start: "top 80%"
                }
            });

            gsap.from(eduColRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: eduColRef.current,
                    start: "top 80%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '100px 5%',
            minHeight: 'auto',
            fontFamily: '"Manrope", sans-serif',
            position: 'relative',
            overflow: 'hidden',
        },
        // Decorative Background Elements
        bgOrb1: {
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 124, 90, 0.08) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
        },
        bgOrb2: {
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 124, 90, 0.05) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
        },
        header: {
            textAlign: 'center',
            marginBottom: '5rem',
            position: 'relative',
            zIndex: 1,
        },
        title: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#3E2723',
            marginBottom: '0.5rem',
            position: 'relative',
            display: 'inline-block',
        },
        titleUnderline: {
            content: '""',
            display: 'block',
            width: '60%',
            height: '3px',
            backgroundColor: '#D87C5A',
            margin: '0.5rem auto 0',
            borderRadius: '2px',
            opacity: 0.6,
        },
        subtitle: {
            color: '#D87C5A',
            fontSize: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginTop: '1rem',
            display: 'block',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '4rem',
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'start',
            position: 'relative',
            zIndex: 1,
        },
        colHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            marginBottom: '2.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(62, 39, 35, 0.1)',
        },
        colIcon: {
            fontSize: '1.8rem',
            color: '#D87C5A',
        },
        colTitle: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            color: '#3E2723',
            margin: 0,
        },

        // Work Card ("Quest Log")
        questCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 1)',
            boxShadow: '0 10px 40px rgba(93, 64, 55, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        },
        questRibbon: {
            position: 'absolute',
            top: '20px',
            right: '-30px',
            background: '#D87C5A',
            color: '#FFF',
            padding: '0.3rem 3rem',
            fontSize: '0.7rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            transform: 'rotate(45deg)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 2,
        },
        cardHeader: {
            marginBottom: '1rem',
        },
        role: {
            fontSize: '1.4rem',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#3E2723',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            display: 'block',
            paddingRight: '2rem', // Space for ribbon
        },
        org: {
            fontSize: '1rem',
            fontWeight: 700,
            color: '#D87C5A',
            marginBottom: '0.2rem',
            display: 'block',
        },
        meta: {
            fontSize: '0.85rem',
            color: '#8D6E63',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
        },
        // Divider
        divider: {
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, rgba(216, 124, 90, 0.1), rgba(216, 124, 90, 0.5), rgba(216, 124, 90, 0.1))',
            margin: '1.5rem 0',
        },
        lootList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        lootItem: {
            fontSize: '0.95rem',
            color: '#5D4037',
            marginBottom: '0.8rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.8rem',
            lineHeight: 1.6,
        },
        xpTag: {
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.3rem 1rem',
            backgroundColor: 'rgba(216, 124, 90, 0.1)',
            color: '#D87C5A',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 800,
        },

        // Education Card ("Certificate")
        eduCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            position: 'relative',
            border: '1px solid #FFF',
            borderLeft: '5px solid #D87C5A',
            boxShadow: '0 10px 40px rgba(93, 64, 55, 0.08)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        },
        watermark: {
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            fontSize: '8rem',
            color: 'rgba(62, 39, 35, 0.03)',
            transform: 'rotate(-15deg)',
            pointerEvents: 'none',
        },
        unlockBox: {
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px dashed rgba(62, 39, 35, 0.15)',
            color: '#D87C5A',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        }
    };

    return (
        <section style={styles.section} id="experience" ref={sectionRef}>
            <div style={styles.bgOrb1}></div>
            <div style={styles.bgOrb2}></div>

            <div style={styles.header}>
                <span style={styles.subtitle}>My Journey</span>
                <h2 style={styles.title}>
                    Career & Academy
                    <span style={styles.titleUnderline}></span>
                </h2>
            </div>

            <div style={styles.grid}>
                {/* Work Column */}
                <div>
                    <div style={styles.colHeader}>
                        <FaCrown style={styles.colIcon} />
                        <h3 style={styles.colTitle}>Main Quests</h3>
                    </div>
                    <div ref={workColRef}>
                        {workData.map((item) => (
                            <div
                                key={item.id}
                                style={styles.questCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(216, 124, 90, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = styles.questCard.boxShadow;
                                }}
                            >
                                {/* Ribbon for status */}
                                {item.level === 'Current Quest' && (
                                    <div style={styles.questRibbon}>Active</div>
                                )}

                                <div style={styles.cardHeader}>
                                    <span style={styles.role}>{item.title}</span>
                                    <span style={styles.org}>{item.org}</span>
                                    <div style={styles.meta}>
                                        <FaMapMarkerAlt /> {item.location} • {item.period}
                                    </div>
                                </div>

                                <div style={styles.divider}></div>

                                <ul style={styles.lootList}>
                                    {item.loot.map((loot, i) => (
                                        <li key={i} style={styles.lootItem}>
                                            <FaStar size={12} color="#D87C5A" style={{ marginTop: '5px', flexShrink: 0 }} />
                                            <span>{loot}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={styles.xpTag}>
                                    <FaTrophy style={{ marginRight: '5px' }} /> {item.xp}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Column */}
                <div>
                    <div style={styles.colHeader}>
                        <FaScroll style={styles.colIcon} />
                        <h3 style={styles.colTitle}>Academy</h3>
                    </div>
                    <div ref={eduColRef}>
                        {eduData.map((item) => (
                            <div
                                key={item.id}
                                style={styles.eduCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(216, 124, 90, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = styles.eduCard.boxShadow;
                                }}
                            >
                                <div style={styles.watermark}>
                                    <FaGraduationCap />
                                </div>
                                <div style={styles.cardHeader}>
                                    <span style={styles.role}>{item.title}</span>
                                    <span style={styles.org}>{item.org}</span>
                                    <div style={styles.meta}>
                                        <FaGraduationCap /> {item.location} • {item.period}
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.95rem', color: '#6D4C41', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                                    {item.desc}
                                </p>

                                <div style={styles.unlockBox}>
                                    <FaMedal size={16} />
                                    <span>{item.unlock}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                    /* Center header on mobile */
                    div[style*="justify-content: flex-start"] {
                        justify-content: center !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default EducationWork;
