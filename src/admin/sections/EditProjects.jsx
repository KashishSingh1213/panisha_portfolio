import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const EditProjects = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultWorks = [
        { id: 1, title: "Marketing Campaigns", desc: "High-performing marketing campaigns...", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600", type: "arch", col: 1 },
        { id: 4, title: "Graphic Creatives", desc: "Graphic creatives for corporate...", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600", type: "inverted", col: 1 },
        { id: 6, title: "Strategy & Vision", desc: "Where data meets creativity.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", type: "inverted-small", col: 2 },
        { id: 3, title: "Video Content", desc: "Video content for events...", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600", type: "circle", col: 2 },
        { id: 2, title: "Social Media", desc: "Social media projects...", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600", type: "arch", col: 3 },
        { id: 5, title: "Written Content", desc: "Written content across platforms...", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600", type: "inverted", col: 3 }
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'projects');
                const snap = await getDoc(docRef);
                if (snap.exists() && snap.data().items) {
                    setWorks(snap.data().items);
                } else {
                    setWorks(defaultWorks);
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
        // Parse int for ID and Col if necessary, though mostly controlled by input type or just string is fine for now
        const newWorks = [...works];
        newWorks[index][field] = (field === 'col' || field === 'id') ? Number(value) : value;
        setWorks(newWorks);
    };

    const handleAdd = () => {
        // Auto-increment ID
        const maxId = works.reduce((max, w) => Math.max(max, w.id), 0);
        setWorks([...works, { id: maxId + 1, title: 'New Project', desc: '', image: '', type: 'arch', col: 1 }]);
    };

    const handleRemove = (index) => {
        const newWorks = works.filter((_, i) => i !== index);
        setWorks(newWorks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'projects'), { items: works });
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333' }}>Edit Projects</h2>
                <span style={{ color: msg.includes('Error') ? 'red' : 'lightgreen' }}>{msg}</span>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
                {works.map((work, index) => (
                    <div key={index} style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ color: '#D87C5A', margin: '0 0 1rem 0' }}>Project #{work.id}</h4>
                            <button type="button" onClick={() => handleRemove(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="admin-form-group">
                                <label className="admin-label">Title</label>
                                <input className="admin-input" value={work.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Column (1, 2, or 3)</label>
                                <input className="admin-input" type="number" min="1" max="3" value={work.col} onChange={(e) => handleChange(index, 'col', e.target.value)} />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Description</label>
                            <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={work.desc} onChange={(e) => handleChange(index, 'desc', e.target.value)} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="admin-form-group">
                                <label className="admin-label">Image URL</label>
                                <input className="admin-input" value={work.image} onChange={(e) => handleChange(index, 'image', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Type (arch, inverted, circle, inverted-small)</label>
                                <select className="admin-input" value={work.type} onChange={(e) => handleChange(index, 'type', e.target.value)}>
                                    <option value="arch">Arch</option>
                                    <option value="inverted">Inverted</option>
                                    <option value="circle">Circle</option>
                                    <option value="inverted-small">Inverted Small</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ background: '#444' }}>+ Add Project</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Projects</button>
                </div>
            </form>
        </div>
    );
};

export default EditProjects;
