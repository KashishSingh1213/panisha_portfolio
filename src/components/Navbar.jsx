import React from 'react';
import PillNav from './PillNav.jsx';

const Navbar = () => {
    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Work', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <>
            <PillNav
                items={navItems}
                logo="https://api.iconify.design/ph:sparkle-fill.svg?color=%23D87C5A"
                logoAlt="Panisha Dhutti"
                baseColor="rgba(255, 250, 246, 0.85)"
                pillColor="var(--color-accent)"
                hoveredPillTextColor="var(--color-accent)"
                pillTextColor="#ffffff"
            />
        </>
    );
};

export default Navbar;
