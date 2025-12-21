import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinaryHelper';
import Toast from '../components/Toast';

// Reusable Image Upload Component (Same as others)
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
                    <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                        <img src={currentImage} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                    </div>
                )}
                {uploading && <span style={{ color: '#D87C5A', fontWeight: 'bold' }}>Uploading...</span>}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" className="admin-input" disabled={uploading} />
        </div>
    );
};

const EditTools = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultTools = [
        { name: "Google Ads", icon: "https://api.iconify.design/logos:google-ads.svg" },
        { name: "Meta Ads", icon: "https://api.iconify.design/logos:meta-icon.svg" },
        { name: "Canva", icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" }, // Fallback URL
        { name: "CapCut", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Capcut_logo.svg" }, // Fallback URL
        { name: "Adobe", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" }, // Fallback URL
        { name: "Grammarly", icon: "https://api.iconify.design/logos:grammarly-icon.svg" },
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'tools');
                const snap = await getDoc(docRef);
                if (snap.exists() && snap.data().items) {
                    setTools(snap.data().items);
                } else {
                    setTools(defaultTools);
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
        const newItems = [...tools];
        newItems[index][field] = value;
        setTools(newItems);
    };

    const handleAdd = () => {
        setTools([...tools, { name: 'New Tool', icon: '' }]);
    };

    const handleRemove = (index) => {
        const newItems = tools.filter((_, i) => i !== index);
        setTools(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'tools'), { items: tools });
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
                <h2 style={{ color: '#333' }}>Edit Tools & Proficiency</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {tools.map((t, index) => (
                        <div key={index} className="admin-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h4 style={{ color: '#555', margin: 0 }}>Tool #{index + 1}</h4>
                                <button type="button" onClick={() => handleRemove(index)} className="admin-btn" style={{ backgroundColor: '#e74c3c', padding: '5px 12px', fontSize: '0.8rem' }}>Delete</button>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-label">Tool Name</label>
                                <input className="admin-input" value={t.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                            </div>

                            <div className="admin-form-group">
                                <ImageUpload
                                    label="Tool Logo"
                                    currentImage={t.icon}
                                    onUploadSuccess={(url) => handleChange(index, 'icon', url)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ backgroundColor: '#95a5a6' }}>+ Add Tool</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Tools</button>
                </div>
            </form>
        </div>
    );
};

export default EditTools;
