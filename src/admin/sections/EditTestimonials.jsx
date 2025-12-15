import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const EditTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultTestimonials = [
        { id: 1, name: "Sarah M.", role: "Marketing Director", text: "Panisha brings a rare balance of creativity...", rating: 5, align: 'flex-start', direction: -1, zIndex: 1 },
        { id: 2, name: "David K.", role: "Business Owner", text: "Professional, reliable, and detail-oriented...", rating: 5, align: 'flex-end', direction: 1, zIndex: 2 }
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'testimonials');
                const snap = await getDoc(docRef);
                if (snap.exists() && snap.data().items) {
                    setTestimonials(snap.data().items);
                } else {
                    setTestimonials(defaultTestimonials);
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
        const newItems = [...testimonials];
        if (field === 'rating') value = parseInt(value, 10);
        newItems[index][field] = value;
        setTestimonials(newItems);
    };

    const handleAdd = () => {
        // Logic to alternate alignment for visual variety
        const last = testimonials[testimonials.length - 1];
        const align = last && last.align === 'flex-start' ? 'flex-end' : 'flex-start';
        const direction = align === 'flex-start' ? -1 : 1;

        setTestimonials([...testimonials, {
            id: Date.now(),
            name: 'Client Name',
            role: 'Role',
            text: 'Testimonial text...',
            rating: 5,
            align: align,
            direction: direction,
            zIndex: testimonials.length + 1
        }]);
    };

    const handleRemove = (index) => {
        const newItems = testimonials.filter((_, i) => i !== index);
        setTestimonials(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'testimonials'), { items: testimonials });
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
                <h2 style={{ color: '#333' }}>Edit Testimonials</h2>
                <span style={{ color: msg.includes('Error') ? 'red' : 'lightgreen' }}>{msg}</span>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                {testimonials.map((t, index) => (
                    <div key={index} style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ color: '#D87C5A', margin: '0 0 1rem 0' }}>Testimonial #{index + 1}</h4>
                            <button type="button" onClick={() => handleRemove(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Name</label>
                            <input className="admin-input" value={t.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Role</label>
                            <input className="admin-input" value={t.role} onChange={(e) => handleChange(index, 'role', e.target.value)} />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Text</label>
                            <textarea className="admin-textarea" style={{ minHeight: '80px' }} value={t.text} onChange={(e) => handleChange(index, 'text', e.target.value)} />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Rating (1-5)</label>
                            <input className="admin-input" type="number" min="1" max="5" value={t.rating} onChange={(e) => handleChange(index, 'rating', e.target.value)} />
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ background: '#444' }}>+ Add Review</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Reviews</button>
                </div>
            </form>
        </div>
    );
};

export default EditTestimonials;
