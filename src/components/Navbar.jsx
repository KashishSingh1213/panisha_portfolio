import React, { useState, useEffect } from 'react';
import PillNav from './PillNav.jsx';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Navbar = () => {
    const [config, setConfig] = useState({
        logoText: 'Panisha Dhutti',
        logoImg: '',
        baseColor: 'rgba(255, 250, 246, 0.85)',
        pillColor: '#D87C5A', // fallback
        pillTextColor: '#ffffff',
        items: [
            { label: 'About', href: '#about' },
            { label: 'Experience', href: '#experience' },
            { label: 'Services', href: '#services' },
            { label: 'Work', href: '#projects' },
            { label: 'Skills', href: '#skills' },
            { label: 'Contact', href: '#contact' }
        ]
    });

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "content", "header"), (doc) => {
            if (doc.exists()) {
                setConfig(prev => ({ ...prev, ...doc.data() }));
            }
        });
        return () => unsub();
    }, []);

    // We need to pass CSS variables or props down to PillNav to handle colors dynamically.
    // Assuming PillNav can accept style overrides or we pass them as props.
    // Looking at PillNav usage, it takes props like `baseColor`, `pillColor`.

    // The previous mocked props were:
    // logo="https://api.iconify.design/ph:sparkle-fill.svg?color=%23D87C5A"
    // logoAlt="Panisha Dhutti"
    // baseColor="rgba(255, 250, 246, 0.85)"
    // pillColor="var(--color-accent)"
    // pillTextColor="#ffffff"

    return (
        <PillNav
            items={config.items}
            logo={config.logoImg || "https://api.iconify.design/ph:sparkle-fill.svg?color=%23D87C5A"}
            logoAlt={config.logoText}
            baseColor={config.baseColor}
            pillColor={config.pillColor}
            hoveredPillTextColor={config.pillColor} // Usually text becomes color of pill when hovered on transparent background, but PillNav logic differs.
            pillTextColor={config.pillTextColor}
        />
    );
};

export default Navbar;
