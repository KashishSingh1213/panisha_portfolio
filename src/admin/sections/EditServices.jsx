import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditServices = () => {
    // We will store the services array as a JSON string for simplicity in editing individual fields, 
    // or better, provided a UI to edit list items.
    // Given the complexity, valid approach is to have a list of items and edit them.
    // For this step, I'll make a dynamic list editor.

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultServices = [
        { id: '01', title: 'Digital Marketing & Strategy', description: 'Campaign planning, lead generation, audience growth strategies, and performance analysis to drive measurable results.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80' },
        { id: '02', title: 'Social Media Management', description: 'Platform-specific content planning, storytelling, community engagement, and trend analysis to build brand presence.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80' },
        { id: '03', title: 'Content Writing', description: 'Website copy, social media captions, brand storytelling, and professional communications aligned with your voice.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80' },
        { id: '04', title: 'Video & Creative Content', description: 'Video editing for brands/personal profiles, short-form content (Reels/TikToks), and creative direction.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
        { id: '05', title: 'Graphic Content', description: 'Engaging social media creatives, brand visuals, and promotional designs that capture attention.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80' }
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'services');
                const snap = await getDoc(docRef);
                if (snap.exists() && snap.data().items) {
                    setServices(snap.data().items);
                } else {
                    // Fallback to initial if empty
                    // In a real app we might not want to overwrite if empty, but for dev it helps
                    setServices(defaultServices);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const handleAdd = () => {
        setServices([...services, { id: '0' + (services.length + 1), title: 'New Service', description: '', image: '' }]);
    };

    const handleRemove = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'services'), { items: services });
            setMsg('Saved successfully!');
        } catch (e) {
            setMsg('Error saving.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333' }}>Edit Services</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
                {services.map((service, index) => (
                    <div key={index} style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ color: '#D87C5A', margin: '0 0 1rem 0' }}>Service #{index + 1}</h4>
                            <button type="button" onClick={() => handleRemove(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">ID (e.g., 01)</label>
                            <input className="admin-input" value={service.id} onChange={(e) => handleChange(index, 'id', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Title</label>
                            <input className="admin-input" value={service.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Description</label>
                            <textarea className="admin-textarea" style={{ minHeight: '80px' }} value={service.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Image URL</label>
                            <input className="admin-input" value={service.image} onChange={(e) => handleChange(index, 'image', e.target.value)} />
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ background: '#444' }}>+ Add Service</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Content</button>
                </div>
            </form>
        </div>
    );
};

export default EditServices;
