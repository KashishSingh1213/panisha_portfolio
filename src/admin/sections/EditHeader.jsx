import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditHeader = () => {
    const [config, setConfig] = useState({
        logoText: 'Panisha Dhutti',
        logoImg: '',
        baseColor: 'rgba(255, 250, 246, 0.85)',
        pillColor: '#D87C5A',
        pillTextColor: '#ffffff',
        items: [
            { label: 'About', href: '#about' },
            { label: 'Portfolio', href: '#work' },
            { label: 'Services', href: '#services' },
            { label: 'Skills', href: '#skills' },
            { label: 'Contact', href: '#contact' }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docRef = doc(db, 'content', 'header');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setConfig(snap.data());
                }
            } catch (e) {
                console.error("Error fetching header config", e);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...config.items];
        newItems[index][field] = value;
        setConfig(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        setConfig(prev => ({ ...prev, items: [...prev.items, { label: 'New Link', href: '#' }] }));
    };

    const removeItem = (index) => {
        setConfig(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'header'), config);
            setMsg('Header updated successfully!');
        } catch (e) {
            setMsg('Error saving header.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#111827' }}>Edit Header / Navigation</h2>
                <p style={{ color: '#6B7280' }}>Customize your website's main navigation bar.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div className="admin-card">
                    <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Global Settings</h3>
                    <div className="admin-form-group">
                        <label className="admin-label">Logo Text</label>
                        <input className="admin-input" value={config.logoText} onChange={(e) => handleChange('logoText', e.target.value)} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="admin-form-group">
                            <label className="admin-label">Background Color (RGBA)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="color" value={config.baseColor.match(/#[0-9a-f]{6}/i) ? config.baseColor : '#ffffff'} onChange={(e) => handleChange('baseColor', e.target.value)} style={{ height: '40px' }} />
                                <input className="admin-input" value={config.baseColor} onChange={(e) => handleChange('baseColor', e.target.value)} placeholder="rgba(255,255,255,0.8)" />
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Active Pill Color</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="color" value={config.pillColor} onChange={(e) => handleChange('pillColor', e.target.value)} style={{ height: '40px' }} />
                                <input className="admin-input" value={config.pillColor} onChange={(e) => handleChange('pillColor', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#374151', margin: 0 }}>Navigation Items</h3>
                        <button type="button" onClick={addItem} className="admin-btn" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>+ Add Link</button>
                    </div>

                    {config.items.map((item, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <div>
                                <label className="admin-label" style={{ fontSize: '0.8rem' }}>Label</label>
                                <input className="admin-input" value={item.label} onChange={(e) => handleItemChange(index, 'label', e.target.value)} />
                            </div>
                            <div>
                                <label className="admin-label" style={{ fontSize: '0.8rem' }}>Link (ID or URL)</label>
                                <input className="admin-input" value={item.href} onChange={(e) => handleItemChange(index, 'href', e.target.value)} />
                            </div>
                            <button type="button" onClick={() => removeItem(index)} style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <button type="submit" disabled={saving} className="admin-btn">Save Header Config</button>
            </form>
        </div>
    );
};

export default EditHeader;
