import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaCalendarAlt, FaChessKnight, FaSearch, FaChartLine, FaPenNib,
    FaBookOpen, FaCommentDots, FaMicrophoneAlt, FaVideo, FaImage,
    FaPalette, FaChartBar, FaMobileAlt, FaTasks, FaWrench
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [skillsData, setSkillsData] = React.useState([]);

    // Map skill names to React Icons
    const iconMap = {
        'Campaign Planning': <FaCalendarAlt />,
        'Brand Positioning': <FaChessKnight />,
        'Audience Research': <FaSearch />,
        'Performance Analysis': <FaChartLine />,
        'Content Writing': <FaPenNib />,
        'Storytelling': <FaBookOpen />,
        'Social Media Copy': <FaCommentDots />,
        'Brand Voice': <FaMicrophoneAlt />,
        'Video Editing': <FaVideo />,
        'Visual Storytelling': <FaImage />,
        'Graphic Content': <FaPalette />,
        'Analytics Tools': <FaChartBar />,
        'Social Platforms': <FaMobileAlt />,
        'Planning Tools': <FaTasks />
    };

    useEffect(() => {
        // Fetch content
        import('../firebase').then(({ db }) => {
            import('firebase/firestore').then(({ doc, onSnapshot }) => {
                const unsub = onSnapshot(doc(db, "content", "skills"), (doc) => {
                    if (doc.exists() && doc.data().items) {
                        setSkillsData(doc.data().items);
                    } else {
                        // Default data
                        setSkillsData([
                            { id: '01', name: 'Campaign Planning', desc: 'Strategic execution for growth.', color: '#FFF3E0' },
                            { id: '02', name: 'Brand Positioning', desc: 'Defining unique market value.', color: '#E3F2FD' },
                            { id: '03', name: 'Audience Research', desc: 'Understanding user needs.', color: '#F3E5F5' },
                            { id: '04', name: 'Performance Analysis', desc: 'Data-driven optimization.', color: '#E8F5E9' },
                            { id: '05', name: 'Content Writing', desc: 'Compelling copy across platforms.', color: '#FFF8E1' },
                            { id: '06', name: 'Storytelling', desc: 'Connecting brands with people.', color: '#ECEFF1' },
                            { id: '07', name: 'Social Media Copy', desc: 'Engaging captions & scripts.', color: '#FFEBEE' },
                            { id: '08', name: 'Brand Voice', desc: 'Consistent communication style.', color: '#E0F7FA' },
                            { id: '09', name: 'Video Editing', desc: 'High-impact video content.', color: '#FFF3E0' },
                            { id: '10', name: 'Visual Storytelling', desc: 'Communicating through imagery.', color: '#F3E5F5' },
                            { id: '11', name: 'Graphic Content', desc: 'Social creatives & branding.', color: '#E8F5E9' },
                            { id: '12', name: 'Analytics Tools', desc: 'Measuring success & ROI.', color: '#FFF8E1' },
                            { id: '13', name: 'Social Platforms', desc: 'Instagram, LinkedIn, YouTube.', color: '#E3F2FD' },
                            { id: '14', name: 'Planning Tools', desc: 'Organizing content workflows.', color: '#FFEBEE' }
                        ]);
                    }
                });
                return () => unsub();
            });
        });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cardsRef.current.length > 0) {
                gsap.fromTo(cardsRef.current,
                    { y: 100, opacity: 0, rotate: "random(-5, 5)" },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [skillsData]);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '120px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            overflow: 'hidden',
        },
        header: {
            textAlign: 'center',
            marginBottom: '6rem',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#3E2723',
            marginBottom: '1rem',
        },
        grid: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            maxWidth: '1400px',
            margin: '0 auto',
            perspective: '1000px',
        },
        card: {
            width: '260px',
            minHeight: '300px',
            backgroundColor: '#FFF',
            padding: '2rem',
            borderRadius: '20px',
            position: 'relative',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
            transformOrigin: 'top center',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'default',
            border: '1px solid rgba(0,0,0,0.02)'
        },
        pin: {
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#D87C5A',
            position: 'absolute',
            top: '20px',
            right: '20px',
            boxShadow: '0 0 0 4px rgba(216, 124, 90, 0.2)',
        },
        number: {
            fontSize: '1rem',
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 'bold',
            color: '#D87C5A',
            opacity: 0.6,
            marginBottom: '1.5rem',
            display: 'block'
        },
        iconContainer: {
            fontSize: '2.5rem',
            marginBottom: '1.5rem',
            color: '#3E2723',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60px'
        },
        cardTitle: {
            fontSize: '1.3rem',
            color: '#3E2723',
            marginBottom: '0.8rem',
            fontWeight: 700,
            fontFamily: '"Playfair Display", serif',
            lineHeight: 1.2
        },
        cardDesc: {
            fontSize: '0.95rem',
            color: '#6D4C41',
            lineHeight: 1.6,
            opacity: 0.9
        }
    };

    return (
        <section style={styles.section} id="skills" ref={containerRef}>
            <div style={styles.header}>
                <h2 style={styles.h2}>Technical Arsenal</h2>
                <p style={{ color: '#8D6E63', fontSize: '1.2rem' }}>My toolkit for crafting digital experiences</p>
            </div>

            <div style={styles.grid}>
                {skillsData.map((skill, index) => {
                    // Fallback to generic icon if mapped one isn't found
                    const IconComponent = iconMap[skill.name] || <FaWrench />;

                    return (
                        <div
                            key={skill.id}
                            ref={el => cardsRef.current[index] = el}
                            style={{
                                ...styles.card,
                                background: `linear-gradient(170deg, #FFFFFF 60%, ${skill.color || '#FFF3E0'} 100%)`
                            }}
                            className="skill-card"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, { y: -10, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', duration: 0.3 });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: '0 15px 35px rgba(0,0,0,0.05)', duration: 0.3 });
                            }}
                        >
                            <div style={styles.pin}></div>
                            <span style={styles.number}>0{index + 1}</span>

                            <div style={styles.iconContainer}>
                                {IconComponent}
                            </div>

                            <h3 style={styles.cardTitle}>{skill.name}</h3>
                            <p style={styles.cardDesc}>{skill.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;
