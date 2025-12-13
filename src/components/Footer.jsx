import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

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
            backgroundColor: '#3E2723', // Warm Dark Brown
            color: '#FFFAF6', // Cream
            padding: '100px 5% 40px',
            fontFamily: '"Manrope", sans-serif',
            position: 'relative',
            overflow: 'hidden',
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
            color: '#D87C5A', // Terracotta Accent
            margin: 0,
        },
        desc: {
            color: 'rgba(255, 250, 246, 0.8)',
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
            color: '#FFF',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        link: {
            color: 'rgba(255, 250, 246, 0.7)',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            width: 'fit-content',
        },
        bottom: {
            borderTop: '1px solid rgba(255, 250, 246, 0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            color: 'rgba(255, 250, 246, 0.5)',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 2,
        },
        decoCircle: {
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 124, 90, 0.1) 0%, rgba(62, 39, 35, 0) 70%)',
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
                    <h2 style={styles.logo}>Panisha Dhutti.</h2>
                    <p style={styles.desc}>
                        Creating meaningful connections through strategy, design, and storytelling. Let's build something remarkable together.
                    </p>
                </div>

                {/* Quick Links */}
                <div style={styles.navCol} className="footer-item">
                    <h3 style={styles.colTitle}>Menu</h3>
                    <a href="#about" className="footer-link" style={styles.link}>About</a>
                    <a href="#services" className="footer-link" style={styles.link}>Services</a>
                    <a href="#projects" className="footer-link" style={styles.link}>Work</a>
                    <a href="#contact" className="footer-link" style={styles.link}>Contact</a>
                </div>

                {/* Socials */}
                <div style={styles.navCol} className="footer-item">
                    <h3 style={styles.colTitle}>Socials</h3>
                    <a href="#" className="footer-link" style={styles.link}>LinkedIn</a>
                    <a href="#" className="footer-link" style={styles.link}>Instagram</a>
                    <a href="#" className="footer-link" style={styles.link}>Twitter</a>
                    <a href="mailto:hello@panisha.design" className="footer-link" style={styles.link}>Email Me</a>
                </div>
            </div>

            <div style={styles.bottom} className="footer-item">
                <p>&copy; {new Date().getFullYear()} Panisha Dhutti. All rights reserved.</p>
            </div>

            <style>{`
                .footer-link:hover {
                    color: #D87C5A !important;
                    transform: translateX(5px);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
