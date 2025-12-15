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

const EditProjects = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultWorks = [
        {
            id: 1,
            title: "Marketing Campaigns",
            desc: "High-performing marketing campaigns that increased enquiries and conversions.",
            details: "Detailed marketing strategy execution focusing on ROI and audience engagement.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
            type: "arch",
            col: 1
        },
        {
            id: 2,
            title: "Brand Identity",
            desc: "Visuals that matter and define your corporate presence.",
            details: "Creating cohesive brand identities from logo design to brand guidelines.",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
            type: "inverted",
            col: 1
        },
        {
            id: 3,
            title: "Strategy & Vision",
            desc: "Where data meets creativity to drive growth.",
            details: "Long-term strategic planning to position brands for success in competitive markets.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
            type: "inverted-small",
            col: 2
        },
        {
            id: 4,
            title: "Video Content",
            desc: "Video content for events, branding, and collaborations.",
            details: "I have expertise in video editing and creation, including projects for company, personal branding, collaborations/partnerships, and trending content.",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
            type: "circle",
            col: 2
        },
        {
            id: 5,
            title: "Social Media",
            desc: "Social media projects that achieved significant reach.",
            details: "Managing and growing social media communities across platforms.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
            type: "arch",
            col: 3
        },
        {
            id: 6,
            title: "Copywriting",
            desc: "Written content that aligns with brand voice.",
            details: `I have hands-on experience in content writing for both personal branding and company-focused projects. My work covers a wide range, from writing marketing materials like brochures, leaflets, and banners to crafting copy for brand merchandise such as T-shirts, notebooks, and tote bags. Always ensuring consistency in tone and message.

A key part of my content writing includes developing platform-specific social media content. I create tailored captions and copy that align with the tone and audience of each platform, including professional and value-driven posts for LinkedIn, engaging visual storytelling for Instagram, community-focused updates for Facebook, and concise descriptions for YouTube.

In addition to creative content, I’ve also worked closely on writing and reviewing formal documents such as funding projects, contracts and NDAs, ensuring they are clear, professional, and aligned with brand standards.

Whether it’s building a brand voice, writing for different formats, or adapting content to fit various platforms, I bring a thoughtful, and strategic approach to every piece I create.`,
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
            type: "inverted",
            col: 3
        }
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
        setWorks([...works, { id: maxId + 1, title: 'New Project', desc: '', details: '', image: '', type: 'arch', col: 1 }]);
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
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333' }}>Edit Projects</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
                {works.map((work, index) => (
                    <div key={index} className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ color: '#1abc9c', margin: 0 }}>Project #{work.id}</h4>
                            <button type="button" onClick={() => handleRemove(index)} className="admin-btn" style={{ backgroundColor: '#e74c3c', padding: '5px 12px', fontSize: '0.8rem' }}>Delete</button>
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
                            <label className="admin-label">Short Description (Card)</label>
                            <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={work.desc} onChange={(e) => handleChange(index, 'desc', e.target.value)} />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Full Details (Detail View)</label>
                            <textarea className="admin-textarea" style={{ minHeight: '120px' }} value={work.details || ''} onChange={(e) => handleChange(index, 'details', e.target.value)} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="admin-form-group">
                                {/* Replaced Image URL Input with ImageUpload */}
                                <ImageUpload
                                    label="Project Image"
                                    currentImage={work.image}
                                    onUploadSuccess={(url) => handleChange(index, 'image', url)}
                                />
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
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ backgroundColor: '#95a5a6' }}>+ Add Project</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Projects</button>
                </div>
            </form>
        </div>
    );
};

export default EditProjects;
