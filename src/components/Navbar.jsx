import React, { useState, useEffect } from 'react';
import PillNav from './PillNav.jsx';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Navbar = () => {
    const [config, setConfig] = useState({
        logoText: 'Portfolio',
        logoImg: '',
        baseColor: 'rgba(255, 255, 240, 0.9)', // Ivory
        pillColor: '#4B0082', // Indigo
        pillTextColor: '#ffffff',
        items: [
            { label: 'About', href: '#about' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Services', href: '#services' },
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
    // logo="https://api.iconify.design/ph:sparkle-fill.svg?color=%234B0082"
    // logoAlt="Panisha Dhutti"
    // baseColor="rgba(255, 255, 240, 0.9)"
    // pillColor="var(--color-accent)"
    // pillTextColor="#ffffff"

    // Force override for Portfolio link to ensure it matches the new ID
    const navItems = config.items.map(item => {
        if (item.label === 'Portfolio' || item.label === 'Work') {
            return { ...item, label: 'Portfolio', href: '#portfolio' };
        }
        return item;
    });

    return (
        <PillNav
            items={navItems}
            logo={config.logoImg || "https://api.iconify.design/ph:sparkle-fill.svg?color=%234B0082"}
            logoAlt={config.logoText}
            baseColor={config.baseColor}
            pillColor={config.pillColor}
            hoveredPillTextColor={config.hoveredPillTextColor || config.pillColor}
            pillTextColor={config.pillTextColor}
        />
    );
};

export default Navbar;
