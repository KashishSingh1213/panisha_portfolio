import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditFooter = () => {
    const [config, setConfig] = useState({
        backgroundColor: '#F2F0EF',
        textColor: '#1F0954',
        accentColor: '#4B0082',
        logoText: 'Panisha Dhutti.',
        description: 'Creating meaningful connections through strategy, design, and storytelling.',

        // Menu Column
        menuTitle: 'Menu',
        menuLinks: [
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Contact', href: '#contact' }
        ],

        // Social Column
        socialTitle: 'Socials',
        socialLinks: [
            { label: 'LinkedIn', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'Twitter', href: '#' },
            { label: 'Email', href: 'mailto:hello@panisha.design' }
        ]
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docRef = doc(db, 'content', 'footer');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setConfig(snap.data());
                }
            } catch (e) {
                console.error("Error fetching footer", e);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleLinkChange = (arrayName, index, field, value) => {
        const newArr = [...config[arrayName]];
        newArr[index][field] = value;
        setConfig(prev => ({ ...prev, [arrayName]: newArr }));
    };

    const addLink = (arrayName) => {
        setConfig(prev => ({ ...prev, [arrayName]: [...prev[arrayName], { label: 'New Link', href: '#' }] }));
    };

    const removeLink = (arrayName, index) => {
        setConfig(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'footer'), config);
            setMsg('Footer updated successfully!');
        } catch (e) {
            setMsg('Error saving footer.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#111827' }}>Edit Footer</h2>
                <p style={{ color: '#6B7280' }}>Customize the footer content, colors, and links.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                {/* Visual Settings */}
                <div className="admin-card">
                    <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Visual Style</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div className="admin-form-group">
                            <label className="admin-label">Background Color</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="color" value={config.backgroundColor} onChange={(e) => handleChange('backgroundColor', e.target.value)} style={{ height: '40px' }} />
                                <input className="admin-input" value={config.backgroundColor} onChange={(e) => handleChange('backgroundColor', e.target.value)} />
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Text Color</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="color" value={config.textColor} onChange={(e) => handleChange('textColor', e.target.value)} style={{ height: '40px' }} />
                                <input className="admin-input" value={config.textColor} onChange={(e) => handleChange('textColor', e.target.value)} />
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Accent Color</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="color" value={config.accentColor} onChange={(e) => handleChange('accentColor', e.target.value)} style={{ height: '40px' }} />
                                <input className="admin-input" value={config.accentColor} onChange={(e) => handleChange('accentColor', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Settings */}
                <div className="admin-card">
                    <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Brand Content</h3>
                    <div className="admin-form-group">
                        <label className="admin-label">Logo Text</label>
                        <input className="admin-input" value={config.logoText} onChange={(e) => handleChange('logoText', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Description / Bio</label>
                        <textarea className="admin-textarea" value={config.description} onChange={(e) => handleChange('description', e.target.value)} />
                    </div>
                </div>

                {/* Link Columns */}
                <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#374151' }}>Menu Links</h3>
                        <button type="button" onClick={() => addLink('menuLinks')} className="admin-btn" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>+ Add</button>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Column Title</label>
                        <input className="admin-input" value={config.menuTitle} onChange={(e) => handleChange('menuTitle', e.target.value)} />
                    </div>
                    {config.menuLinks.map((link, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '1rem', marginBottom: '10px' }}>
                            <input className="admin-input" placeholder="Label" value={link.label} onChange={(e) => handleLinkChange('menuLinks', i, 'label', e.target.value)} />
                            <input className="admin-input" placeholder="URL (#id)" value={link.href} onChange={(e) => handleLinkChange('menuLinks', i, 'href', e.target.value)} />
                            <button type="button" onClick={() => removeLink('menuLinks', i)} style={{ background: '#FEE2E2', border: 'none', borderRadius: '5px', cursor: 'pointer', color: 'red' }}>×</button>
                        </div>
                    ))}
                </div>

                <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#374151' }}>Social Links</h3>
                        <button type="button" onClick={() => addLink('socialLinks')} className="admin-btn" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>+ Add</button>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Column Title</label>
                        <input className="admin-input" value={config.socialTitle} onChange={(e) => handleChange('socialTitle', e.target.value)} />
                    </div>
                    {config.socialLinks.map((link, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '1rem', marginBottom: '10px' }}>
                            <input className="admin-input" placeholder="Label" value={link.label} onChange={(e) => handleLinkChange('socialLinks', i, 'label', e.target.value)} />
                            <input className="admin-input" placeholder="URL (https://...)" value={link.href} onChange={(e) => handleLinkChange('socialLinks', i, 'href', e.target.value)} />
                            <button type="button" onClick={() => removeLink('socialLinks', i)} style={{ background: '#FEE2E2', border: 'none', borderRadius: '5px', cursor: 'pointer', color: 'red' }}>×</button>
                        </div>
                    ))}
                </div>

                <button type="submit" disabled={saving} className="admin-btn">Save Footer Config</button>
            </form>
        </div>
    );
};

export default EditFooter;
