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

const EditMarketingShowcase = () => {
    const [formData, setFormData] = useState({
        videoSectionTitle: 'Videos',
        videoSectionDesc: 'I have expertise in video editing and creation, including projects for company, personal branding, collaborations/partnerships, and trending content.',
        marketingSectionTitle: 'Marketing',
        marketingSectionSubtitle: 'Portfolio',
        marketingSectionDesc: 'Graphics & Strategy',
        marketingGraphicsTitle: 'Graphics',
        marketingGraphicsDesc: 'Experience in graphic design, including corporate projects, collaborations, travel and more. These are some examples of my work.',
        marketingMaterialTitle: 'Marketing Material',
        marketingMaterialDesc: 'Created a range of marketing materials like banners, brochures, leaflets, and business cards to boost brand visibility. Also worked on fun branded merchandise such as T-shirts, candles, and tote bags to keep the brand consistent and memorable.',
        graphicsImg1: '',
        graphicsImg2: '',
        graphicsImg3: '',
        marketingImg1: '',
        marketingImg2: '',
        marketingImg3: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'content', 'marketing');
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
            await setDoc(doc(db, 'content', 'marketing'), formData);
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
                <h2 style={{ color: '#333', border: 'none' }}>Edit Marketing Showcase</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>

                {/* Video Section */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Video Section</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Section Title</label>
                    <input
                        type="text"
                        name="videoSectionTitle"
                        value={formData.videoSectionTitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description</label>
                    <textarea
                        name="videoSectionDesc"
                        value={formData.videoSectionDesc}
                        onChange={handleChange}
                        className="admin-textarea"
                    />
                </div>

                {/* Marketing Section Header */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Marketing Header</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Main Title</label>
                    <input
                        type="text"
                        name="marketingSectionTitle"
                        value={formData.marketingSectionTitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Subtitle (Colored)</label>
                    <input
                        type="text"
                        name="marketingSectionSubtitle"
                        value={formData.marketingSectionSubtitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Small Description</label>
                    <input
                        type="text"
                        name="marketingSectionDesc"
                        value={formData.marketingSectionDesc}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>

                {/* Graphics Block */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Graphics Text Block</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                        type="text"
                        name="marketingGraphicsTitle"
                        value={formData.marketingGraphicsTitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description</label>
                    <textarea
                        name="marketingGraphicsDesc"
                        value={formData.marketingGraphicsDesc}
                        onChange={handleChange}
                        className="admin-textarea"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <ImageUpload
                        label="Graphics Image 1 (Social Media)"
                        currentImage={formData.graphicsImg1}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg1: url }))}
                    />
                    <ImageUpload
                        label="Graphics Image 2 (Typography)"
                        currentImage={formData.graphicsImg2}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg2: url }))}
                    />
                    <ImageUpload
                        label="Graphics Image 3 (Identity)"
                        currentImage={formData.graphicsImg3}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg3: url }))}
                    />
                </div>

                {/* Marketing Material Block */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Marketing Material Text Block</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                        type="text"
                        name="marketingMaterialTitle"
                        value={formData.marketingMaterialTitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description</label>
                    <textarea
                        name="marketingMaterialDesc"
                        value={formData.marketingMaterialDesc}
                        onChange={handleChange}
                        className="admin-textarea"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <ImageUpload
                        label="Marketing Image 1"
                        currentImage={formData.marketingImg1}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg1: url }))}
                    />
                    <ImageUpload
                        label="Marketing Image 2"
                        currentImage={formData.marketingImg2}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg2: url }))}
                    />
                    <ImageUpload
                        label="Marketing Image 3"
                        currentImage={formData.marketingImg3}
                        onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg3: url }))}
                    />
                </div>

                <button type="submit" disabled={saving} className="admin-btn" style={{ marginTop: '2rem' }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditMarketingShowcase;
