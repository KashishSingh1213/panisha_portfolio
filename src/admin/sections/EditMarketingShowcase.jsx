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

// Reusable Video Upload Component
const VideoUpload = ({ label, currentVideo, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadToCloudinary(file, 'video');
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
                {currentVideo && !currentVideo.includes('youtube') && !currentVideo.includes('youtu.be') && (
                    <video
                        src={currentVideo}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                        muted
                    />
                )}
                {uploading && <span style={{ color: '#D87C5A', fontWeight: 'bold' }}>Uploading Video...</span>}
            </div>

            <input
                type="file"
                onChange={handleFileChange}
                accept="video/*"
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
        marketingImg3: '',
        video1Title: 'Company',
        video1Src: 'https://youtube.com/shorts/jtKnWm4hA98?si=mij503BPEBkqaxS5',
        video1Poster: 'https://images.unsplash.com/photo-1531297461136-82lw9b61d696?auto=format&fit=crop&w=600&q=80',
        video2Title: 'Branding',
        video2Src: 'https://youtube.com/shorts/eRfLS6ztWMA?si=MJ-SOIvnc0Vf1UXP',
        video2Poster: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
        video3Title: 'Trending',
        video3Src: 'https://youtube.com/shorts/WQADmHbYg-0?si=sw6VDKw0iLSDxjec',
        video3Poster: 'https://images.unsplash.com/photo-1542202229-7d9377a3a712?auto=format&fit=crop&w=600&q=80',
        graphicsTitle1: 'Social Media',
        graphicsTitle2: 'Typography',
        graphicsTitle3: 'Identity',
        marketingBadge1: 'MARKETING',
        marketingBadge2: 'MARKETING',
        marketingBadge3: 'MARKETING'
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

                {/* Video Items Editor */}
                <h4 style={{ marginTop: '1.5rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Video 1</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="admin-form-group">
                        <label className="admin-label">Title (e.g. 'Company')</label>
                        <input type="text" name="video1Title" value={formData.video1Title || ''} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Video URL (YouTube/Shorts)</label>
                        <input type="text" name="video1Src" value={formData.video1Src || ''} onChange={handleChange} className="admin-input" />
                    </div>
                </div>
                <VideoUpload
                    label="Or Upload Video 1"
                    currentVideo={formData.video1Src}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video1Src: url }))}
                />
                <ImageUpload
                    label="Video 1 Poster Image"
                    currentImage={formData.video1Poster}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video1Poster: url }))}
                />

                <h4 style={{ marginTop: '1.5rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Video 2</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="admin-form-group">
                        <label className="admin-label">Title</label>
                        <input type="text" name="video2Title" value={formData.video2Title || ''} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Video URL</label>
                        <input type="text" name="video2Src" value={formData.video2Src || ''} onChange={handleChange} className="admin-input" />
                    </div>
                </div>
                <VideoUpload
                    label="Or Upload Video 2"
                    currentVideo={formData.video2Src}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video2Src: url }))}
                />
                <ImageUpload
                    label="Video 2 Poster Image"
                    currentImage={formData.video2Poster}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video2Poster: url }))}
                />

                <h4 style={{ marginTop: '1.5rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Video 3</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="admin-form-group">
                        <label className="admin-label">Title</label>
                        <input type="text" name="video3Title" value={formData.video3Title || ''} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Video URL</label>
                        <input type="text" name="video3Src" value={formData.video3Src || ''} onChange={handleChange} className="admin-input" />
                    </div>
                </div>
                <VideoUpload
                    label="Or Upload Video 3"
                    currentVideo={formData.video3Src}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video3Src: url }))}
                />
                <ImageUpload
                    label="Video 3 Poster Image"
                    currentImage={formData.video3Poster}
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, video3Poster: url }))}
                />


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
                    <div>
                        <ImageUpload
                            label="Graphics Image 1 (Social Media)"
                            currentImage={formData.graphicsImg1}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg1: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 1 Title</label>
                            <input type="text" name="graphicsTitle1" value={formData.graphicsTitle1 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. Social Media" />
                        </div>
                    </div>

                    <div>
                        <ImageUpload
                            label="Graphics Image 2 (Typography)"
                            currentImage={formData.graphicsImg2}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg2: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 2 Title</label>
                            <input type="text" name="graphicsTitle2" value={formData.graphicsTitle2 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. Typography" />
                        </div>
                    </div>

                    <div>
                        <ImageUpload
                            label="Graphics Image 3 (Identity)"
                            currentImage={formData.graphicsImg3}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, graphicsImg3: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 3 Title</label>
                            <input type="text" name="graphicsTitle3" value={formData.graphicsTitle3 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. Identity" />
                        </div>
                    </div>
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
                    <div>
                        <ImageUpload
                            label="Marketing Image 1"
                            currentImage={formData.marketingImg1}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg1: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 1 Badge</label>
                            <input type="text" name="marketingBadge1" value={formData.marketingBadge1 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. MARKETING" />
                        </div>
                    </div>

                    <div>
                        <ImageUpload
                            label="Marketing Image 2"
                            currentImage={formData.marketingImg2}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg2: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 2 Badge</label>
                            <input type="text" name="marketingBadge2" value={formData.marketingBadge2 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. MARKETING" />
                        </div>
                    </div>

                    <div>
                        <ImageUpload
                            label="Marketing Image 3"
                            currentImage={formData.marketingImg3}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, marketingImg3: url }))}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Image 3 Badge</label>
                            <input type="text" name="marketingBadge3" value={formData.marketingBadge3 || ''} onChange={handleChange} className="admin-input" placeholder="e.g. MARKETING" />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={saving} className="admin-btn" style={{ marginTop: '2rem' }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditMarketingShowcase;
