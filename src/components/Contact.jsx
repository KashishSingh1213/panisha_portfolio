import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Add a new document with a generated id.
            await addDoc(collection(db, "messages"), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                timestamp: new Date()
            });

            setStatus('success');
            setResponseMsg('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Reset form

        } catch (error) {
            console.error('Error adding document: ', error);
            setStatus('error');
            setResponseMsg('Failed to send message. Please try again.');
        }

        // Reset status after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setResponseMsg('');
        }, 5000);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Left Side (Info)
            gsap.from(infoRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            // Animate Right Side (Form)
            gsap.from(formRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            // Stagger Form inputs
            gsap.from(".form-item", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const styles = {
        section: {
            backgroundColor: '#FFFAF6',
            padding: '100px 5%',
            minHeight: '100vh',
            fontFamily: '"Manrope", sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5D4037',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '5rem',
            maxWidth: '1200px',
            width: '100%',
            alignItems: 'start',
        },
        // Left Side
        infoCol: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        },
        heading: {
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
            color: '#3E2723',
            margin: 0,
        },
        subtext: {
            fontSize: '1.2rem',
            lineHeight: 1.6,
            color: '#795548',
            maxWidth: '90%',
        },
        emailLink: {
            fontSize: '1.5rem',
            color: '#D87C5A',
            textDecoration: 'none',
            fontWeight: 700,
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s',
            alignSelf: 'flex-start',
        },
        socials: {
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1rem',
        },
        socialLink: {
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#3E2723',
            textDecoration: 'none',
            fontWeight: 700,
            position: 'relative',
        },
        // Right Side (Form)
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            backgroundColor: '#FFF',
            padding: '3rem',
            borderRadius: '30px',
            boxShadow: '0 20px 60px rgba(93, 64, 55, 0.1)',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#8D6E63',
            marginLeft: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        input: {
            padding: '1.2rem 1.5rem',
            borderRadius: '50px',
            border: '1px solid #E0E0E0',
            backgroundColor: '#FAFAFA',
            fontSize: '1rem',
            fontFamily: 'inherit',
            color: '#3E2723',
            outline: 'none',
            transition: 'all 0.3s',
        },
        textarea: {
            padding: '1.5rem',
            borderRadius: '20px',
            border: '1px solid #E0E0E0',
            backgroundColor: '#FAFAFA',
            fontSize: '1rem',
            fontFamily: 'inherit',
            color: '#3E2723',
            outline: 'none',
            minHeight: '150px',
            resize: 'vertical',
            transition: 'all 0.3s',
        },
        button: {
            padding: '1.2rem',
            borderRadius: '50px',
            border: 'none',
            backgroundColor: '#E07A5F',
            color: '#FFF',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'transform 0.3s, background 0.3s',
            marginTop: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            opacity: status === 'loading' ? 0.7 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
        },
        statusMsg: {
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 600,
            color: status === 'success' ? '#2E7D32' : '#C62828',
            opacity: status === 'idle' || status === 'loading' ? 0 : 1,
            transition: 'opacity 0.3s ease',
        }
    };

    return (
        <section id="contact" style={styles.section} ref={sectionRef}>
            <div style={styles.container}>
                {/* Left Side: Info */}
                <div style={styles.infoCol} ref={infoRef}>
                    <h2 style={styles.heading}>Let's create something meaningful.</h2>
                    <p style={styles.subtext}>
                        Got a project that needs a touch of warmth and precision? I'm currently available for freelance work and collaborations.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
                        <a href="mailto:panishadhutti@gmail.com" style={{ ...styles.socialLink, textTransform: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }} className="hover-link">
                            <FaEnvelope size={20} />
                            panishadhutti@gmail.com
                        </a>

                        <a href="https://linkedin.com/in/panisha-dhutti-611245206" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialLink, textTransform: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }} className="hover-link">
                            <FaLinkedin size={24} />
                            <span style={{ wordBreak: 'break-all' }}>linkedin.com/in/panisha-dhutti-611245206</span>
                        </a>
                    </div>
                </div>

                {/* Right Side: Form */}
                <form
                    style={styles.form}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <div style={styles.inputGroup} className="form-item">
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            style={styles.input}
                            className="contact-input"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup} className="form-item">
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            style={styles.input}
                            className="contact-input"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup} className="form-item">
                        <label style={styles.label}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your vision..."
                            style={styles.textarea}
                            className="contact-input"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" style={styles.button} className="form-item submit-btn" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>

                    {responseMsg && (
                        <div style={styles.statusMsg}>
                            {responseMsg}
                        </div>
                    )}
                </form>
            </div>

            <style>{`
                .contact-input:focus {
                    border-color: #D87C5A !important;
                    background-color: #FFF !important;
                    box-shadow: 0 0 0 4px rgba(216, 124, 90, 0.1);
                }
                .hover-link:hover {
                    color: #D87C5A !important;
                    border-color: #D87C5A !important;
                }
                .submit-btn:hover {
                    background-color: #BF6A50 !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(216, 124, 90, 0.3);
                }
                .submit-btn:disabled {
                    background-color: #E0E0E0 !important;
                    color: #9E9E9E !important;
                    transform: none !important;
                    box-shadow: none !important;
                    cursor: not-allowed !important;
                }
            `}</style>
        </section>
    );
};

export default Contact;
