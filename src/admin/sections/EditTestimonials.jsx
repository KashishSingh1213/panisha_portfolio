import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinaryHelper';
import Toast from '../components/Toast';

// Reusable Image Upload Component
const ImageUpload = ({ label, currentImage, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            onUploadSuccess(url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-form-group">
            <label className="admin-label">{label}</label>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                {currentImage && (
                    <img src={currentImage} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                )}
                {uploading && <span style={{ color: '#D87C5A', fontWeight: 'bold' }}>Uploading...</span>}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" className="admin-input" style={{ padding: '8px' }} disabled={uploading} />
        </div>
    );
};

const EditTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultTestimonials = [
        {
            id: 1,
            name: "Michael Johnson",
            role: "Senior Software Engineer",
            text: "I was looking for my next big career move, and within weeks, I landed a role that perfectly matched my skills and aspirations. The process was seamless!",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Sarah Meyers",
            role: "Marketing Director",
            text: "Panisha brings a rare balance of creativity and strategy. Her ability to understand brand goals and translate them into engaging content made a visible difference.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "David Kim",
            role: "Startup Founder",
            text: "Professional, reliable, and detail-oriented. From social media to content and campaign execution, her contribution consistently delivered strong results.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            name: "Anita Patel",
            role: "Brand Architect",
            text: "Her work added clarity and consistency to our brand communication. The new visual identity helped us connect better with our audience.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
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
        newItems[index][field] = value;
        setTestimonials(newItems);
    };

    const handleAdd = () => {
        const id = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
        setTestimonials([...testimonials, {
            id: id,
            name: 'Client Name',
            role: 'Role',
            text: 'Testimonial text...',
            image: ''
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
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333' }}>Edit Testimonials</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                {testimonials.map((t, index) => (
                    <div key={index} className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ color: '#1abc9c', margin: 0 }}>Testimonial #{index + 1}</h4>
                            <button type="button" onClick={() => handleRemove(index)} className="admin-btn" style={{ backgroundColor: '#e74c3c', padding: '5px 12px', fontSize: '0.8rem' }}>Delete</button>
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
                            <ImageUpload
                                label="Client Image"
                                currentImage={t.image}
                                onUploadSuccess={(url) => handleChange(index, 'image', url)}
                            />
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ backgroundColor: '#95a5a6' }}>+ Add Review</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Reviews</button>
                </div>
            </form>
        </div>
    );
};

export default EditTestimonials;
