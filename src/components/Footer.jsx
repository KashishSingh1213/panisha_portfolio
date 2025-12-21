import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const [config, setConfig] = useState({
        backgroundColor: '#F2F0EF', // Light Warm Gray
        textColor: '#1F0954', // Dark Navy
        accentColor: '#4B0082', // Indigo
        logoText: 'Panisha Dhutti.',
        description: 'Creating meaningful connections through strategy, design, and storytelling.',
        menuTitle: 'Menu',
        menuLinks: [
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Contact', href: '#contact' }
        ],
        socialTitle: 'Socials',
        socialLinks: [
            { label: 'LinkedIn', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'Twitter', href: '#' },
            { label: 'Email', href: 'mailto:hello@panisha.design' }
        ]
    });

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "content", "footer"), (doc) => {
            if (doc.exists()) {
                setConfig(prev => ({ ...prev, ...doc.data() }));
            }
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".footer-item",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        footer: {
            backgroundColor: config.backgroundColor,
            color: config.textColor,
            padding: '100px 5% 40px',
            fontFamily: '"Manrope", sans-serif',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.5s ease, color 0.5s ease'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 2,
        },
        brandCol: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        logo: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            color: config.accentColor,
            margin: 0,
        },
        desc: {
            color: config.textColor,
            opacity: 0.8,
            lineHeight: 1.8,
            maxWidth: '350px',
            fontSize: '1.05rem',
        },
        navCol: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        colTitle: {
            fontSize: '1.2rem',
            fontWeight: 700,
            color: config.textColor,
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        link: {
            color: config.textColor,
            opacity: 0.7,
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            width: 'fit-content',
        },
        bottom: {
            borderTop: `1px solid ${config.textColor}`,
            opacity: 0.2, // border opacity hack
            paddingTop: '2rem',
            textAlign: 'center',
            color: config.textColor,
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 2,
        },
        bottomText: {
            color: config.textColor,
            opacity: 0.5,
            textAlign: 'center',
            marginTop: '2rem'
        },
        decoCircle: {
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${config.accentColor}22 0%, ${config.backgroundColor}00 70%)`, // Hex transparency manually or rely on CSS vars if handled
            // Simpler: use opacity on the div
            opacity: 0.4,
            top: '-200px',
            right: '-100px',
            zIndex: 1,
            pointerEvents: 'none',
        }
    };

    return (
        <footer style={styles.footer} ref={footerRef}>
            {/* Decorative Warm Glow */}
            <div style={styles.decoCircle}></div>

            <div style={styles.container}>
                {/* Brand Column */}
                <div style={styles.brandCol} className="footer-item">
                    <h2 style={styles.logo}>{config.logoText}</h2>
                    <p style={styles.desc}>{config.description}</p>
                </div>

                {/* Quick Links */}
                <div style={styles.navCol} className="footer-item">
                    <h3 style={styles.colTitle}>{config.menuTitle}</h3>
                    {config.menuLinks && config.menuLinks.map((link, i) => {
                        let href = link.href;
                        const labelLower = link.label ? link.label.toLowerCase() : '';

                        // Force redirect to Content Strategy (#portfolio) if label mentions Portfolio or Work
                        if (labelLower.includes('portfolio') || labelLower.includes('work')) {
                            href = '#portfolio';
                        }

                        return (
                            <a key={i} href={href} className="footer-link" style={styles.link}>{link.label}</a>
                        );
                    })}
                </div>

                {/* Socials */}
                <div style={styles.navCol} className="footer-item">
                    <h3 style={styles.colTitle}>{config.socialTitle}</h3>
                    {config.socialLinks && config.socialLinks.map((link, i) => (
                        <a key={i} href={link.href} className="footer-link" style={styles.link}>{link.label}</a>
                    ))}
                </div>
            </div>

            <div className="footer-item" style={{ borderTop: `1px solid ${config.textColor}33`, paddingTop: '2rem' }}>
                <p style={{ textAlign: 'center', color: config.textColor, opacity: 0.6 }}>
                    &copy; {new Date().getFullYear()} {config.logoText.replace('.', '')}. All rights reserved.
                </p>
            </div>

            <style>{`
                .footer-link:hover {
                    color: ${config.accentColor} !important;
                    opacity: 1 !important;
                    transform: translateX(5px);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
