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

            {/* Preview */}
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                {currentImage && (
                    <img
                        src={currentImage}
                        alt="Preview"
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                )}
                {uploading && <span style={{ color: '#D87C5A', fontWeight: 'bold' }}>Uploading...</span>}
            </div>

            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="admin-input"
                style={{ padding: '8px' }}
                disabled={uploading}
            />
        </div>
    );
};

const EditAbout = () => {
    const [formData, setFormData] = useState({
        heading: 'Strategic Content that \nBuilds Brands.',
        highlight: 'Builds Brands.',
        desc1: 'I have hands-on experience in content writing for both personal branding and company-focused projects. My work covers a wide range, from writing marketing materials like brochures and banners to crafting copy for brand merchandise, always ensuring consistency in tone and message.',
        desc2: 'Whether it’s building a brand voice, writing for different formats, or adapting content to fit various platforms, I bring a thoughtful, and strategic approach to every piece I create.',
        yearsExp: '5+',
        projectsDelivered: '50+',
        img1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
        img2: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
        img3: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
        img4: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'about');
                const snap = await getDoc(docRef);
                if (snap.exists()) setFormData(snap.data());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'about'), formData);
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
                <h2 style={{ color: '#333' }}>Edit About Section</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div className="admin-form-group">
                    <label className="admin-label">Heading</label>
                    <input className="admin-input" name="heading" value={formData.heading} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Highlight Text (Part of Heading)</label>
                    <input className="admin-input" name="highlight" value={formData.highlight} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description Paragraph 1</label>
                    <textarea className="admin-textarea" name="desc1" value={formData.desc1} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description Paragraph 2</label>
                    <textarea className="admin-textarea" name="desc2" value={formData.desc2} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Years of Experience</label>
                    <input className="admin-input" name="yearsExp" value={formData.yearsExp} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Projects Delivered</label>
                    <input className="admin-input" name="projectsDelivered" value={formData.projectsDelivered} onChange={handleChange} />
                </div>

                <h3 style={{ color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>Collage Images</h3>

                <ImageUpload
                    label="Main Image (Large Pill)"
                    currentImage={formData.img1}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, img1: url }))}
                />

                <ImageUpload
                    label="Top Right Image (Circle)"
                    currentImage={formData.img2}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, img2: url }))}
                />

                <ImageUpload
                    label="Bottom Left Image (Landscape)"
                    currentImage={formData.img3}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, img3: url }))}
                />

                <ImageUpload
                    label="Decor Circle Image"
                    currentImage={formData.img4}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, img4: url }))}
                />

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Theme Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="admin-form-group">
                        <label className="admin-label">Background Color</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                name="backgroundColor"
                                value={formData.backgroundColor || '#ffffff'}
                                onChange={handleChange}
                                style={{ width: '50px', height: '50px', padding: '0', border: 'none', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                name="backgroundColor"
                                value={formData.backgroundColor || '#ffffff'}
                                onChange={handleChange}
                                className="admin-input"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Text Color</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                name="textColor"
                                value={formData.textColor || '#000000'}
                                onChange={handleChange}
                                style={{ width: '50px', height: '50px', padding: '0', border: 'none', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                name="textColor"
                                value={formData.textColor || '#000000'}
                                onChange={handleChange}
                                className="admin-input"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={saving} className="admin-btn" style={{ marginTop: '1rem' }}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditAbout;
