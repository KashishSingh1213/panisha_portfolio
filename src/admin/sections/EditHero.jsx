import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditHero = () => {
    const [formData, setFormData] = useState({
        titleLine1: 'Creating meaningful connections',
        titleLine2: 'through strategy & storytelling.',
        subtitle: 'Where data meets creativity to drive real results.',
        description: 'I help brands grow through thoughtful marketing, compelling content, and creative storytelling. From building brand visibility to driving meaningful engagement, I combine creativity with strategy to turn ideas into impact.',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'content', 'hero');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMsg('');
        try {
            await setDoc(doc(db, 'content', 'hero'), formData);
            setMsg('Changes saved successfully!');
        } catch (err) {
            console.error("Error saving data:", err);
            setMsg('Error saving data.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ color: '#333' }}>Loading...</div>;

    return (
        <div>
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333', border: 'none' }}>Edit Hero Section</h2>
            </div>
            {/* ... rest of form ... */}
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div className="admin-form-group">
                    <label className="admin-label">Heading Line 1</label>
                    <input
                        type="text"
                        name="titleLine1"
                        value={formData.titleLine1}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>

                <div className="admin-form-group">
                    <label className="admin-label">Heading Line 2 (Italic)</label>
                    <input
                        type="text"
                        name="titleLine2"
                        value={formData.titleLine2}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>

                <div className="admin-form-group">
                    <label className="admin-label">Subtitle</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>

                <div className="admin-form-group">
                    <label className="admin-label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="admin-textarea"
                    />
                </div>

                <button type="submit" disabled={saving} className="admin-btn">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditHero;
