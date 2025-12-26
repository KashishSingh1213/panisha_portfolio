import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditContentStrategy = () => {
    const [formData, setFormData] = useState({
        sectionTitle: 'PORTFOLIO',
        sectionSubtitle: 'Content Strategy',
        sectionDesc: 'Compelling narratives tailored for every platform.',
        card1Title: 'LinkedIn Strategy',
        card1Content: '',
        card1Link: '',
        card2Title: 'Instagram Growth',
        card2Content: '',
        card2Link: '',
        card3Title: 'YouTube Content',
        card3Content: '',
        card3Link: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'content', 'contentStrategy');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                } else {
                    // Initialize with defaults if not exists
                    setFormData({
                        sectionTitle: 'PORTFOLIO',
                        sectionSubtitle: 'Content Strategy',
                        sectionDesc: 'Compelling narratives tailored for every platform.',
                        card1Title: 'LinkedIn Strategy',
                        card1Content: "Back in my early days as an aspiring entrepreneur, I had this weird habit of putting off communication. No matter if it was replying to emails, returning calls, or following up with potential business partners, I always found some excuse to procrastinate. I mean, I convinced myself that I was too busy with my startup to focus on immediate communication. But what I didn't realise was that this delay was actually costing me valuable chances to grow my business.\n\nIt wasn't until a game-changing moment that I realised my mistake. A potential investor had contacted me, and instead of my usual stalling, I responded right away. That decision led to a successful meeting and, ultimately, secured the funding my startup so desperately needed. That was the wake-up call I needed.\n\nFrom then on, I ditched my procrastination habit and embraced the power of timely communication. And let me tell you, it transformed my entrepreneurial journey. Quick responses built trust with my partners, investors, and customers. And being able to seize opportunities as they arose. Well, that propelled my business forward like nothing else. Looking back, I can honestly say that this fundamental shift in my approach to communication played a big part in my career as an entrepreneur.",
                        card1Link: "https://www.linkedin.com/posts/akshay-ruparelia_back-in-my-early-days-as-an-aspiring-entrepreneur-activity-7116002581071437824-C2m3/?utm_source=share&utm_medium=member_desktop",
                        card2Title: 'Instagram Growth',
                        card2Content: "Growing up in an immigrant family, I always felt grateful for the incredible lessons. My family had to leave their homeland and try a new country, which was pretty scary. But it also made them refined and determined.\n\nMy grandparents and parents showed me how to adapt to new situations, and how to work for a better life. These qualities have become a part of who I want to carry on these valuable lessons to my children and their children.\n\nBeing part of an immigrant family has shown me these virtues, and I'm proud of my roots. They taught me that resilience isn't just about surviving hard times, but about thriving in them and finding joy in the journey of adaptation.",
                        card2Link: "https://www.instagram.com/p/CzqUjuSoJNz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
                        card3Title: 'YouTube Content',
                        card3Content: "A Conversation with Professor Roger Delves (Professor of Authentic Leadership) on how to stay true to yourself and discover what is authenticity.\n\nAuthenticity isn't just a buzzword—it's a powerful way to live and lead. In this video, Roger Delves, an esteemed Indigo Sails professional facilitator, explores how to align personal lives or professional journeys, understanding and applying a stronger sense of purpose.\n\nThey go beyond theory, offering practical guidance on how to align personal lives or professional journeys, understanding and applying stronger sense of purpose.\n\nIn this video, you'll discover:\n✅ What authenticity really means\n✅ How to navigate challenges when staying true to yourself\n✅ Practical steps to make authenticity a part of your everyday life\n✅ The impact of authenticity on personal and professional success\n\nJoin us on this journey of self-discovery and transformation.\n\nFor more information, please email:\ninfo@indigosails.co.uk\nbookings@indigosails.co.uk",
                        card3Link: "https://www.youtube.com/watch?v=_s0yksoJTEs"
                    });
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
            await setDoc(doc(db, 'content', 'contentStrategy'), formData);
            setMsg('Changes saved successfully!');
        } catch (err) {
            console.error("Error saving data:", err);
            setMsg('Error saving data.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {msg && <Toast msg={msg} onClose={() => setMsg('')} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#333', border: 'none' }}>Edit Content Strategy</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Section Header</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Section Title</label>
                    <input
                        type="text"
                        name="sectionTitle"
                        value={formData.sectionTitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Section Subtitle</label>
                    <input
                        type="text"
                        name="sectionSubtitle"
                        value={formData.sectionSubtitle}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Description</label>
                    <textarea
                        name="sectionDesc"
                        value={formData.sectionDesc}
                        onChange={handleChange}
                        className="admin-textarea"
                    />
                </div>

                {/* Card 1 */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Card 1 (LinkedIn)</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                        type="text"
                        name="card1Title"
                        value={formData.card1Title}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Link</label>
                    <input
                        type="text"
                        name="card1Link"
                        value={formData.card1Link}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Content</label>
                    <textarea
                        name="card1Content"
                        value={formData.card1Content}
                        onChange={handleChange}
                        className="admin-textarea"
                        style={{ minHeight: '150px' }}
                    />
                </div>

                {/* Card 2 */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Card 2 (Instagram)</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                        type="text"
                        name="card2Title"
                        value={formData.card2Title}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Link</label>
                    <input
                        type="text"
                        name="card2Link"
                        value={formData.card2Link}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Content</label>
                    <textarea
                        name="card2Content"
                        value={formData.card2Content}
                        onChange={handleChange}
                        className="admin-textarea"
                        style={{ minHeight: '150px' }}
                    />
                </div>

                {/* Card 3 */}
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#555' }}>Card 3 (YouTube)</h3>
                <div className="admin-form-group">
                    <label className="admin-label">Title</label>
                    <input
                        type="text"
                        name="card3Title"
                        value={formData.card3Title}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Link</label>
                    <input
                        type="text"
                        name="card3Link"
                        value={formData.card3Link}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label className="admin-label">Content</label>
                    <textarea
                        name="card3Content"
                        value={formData.card3Content}
                        onChange={handleChange}
                        className="admin-textarea"
                        style={{ minHeight: '150px' }}
                    />
                </div>

                <button type="submit" disabled={saving} className="admin-btn" style={{ marginTop: '2rem' }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditContentStrategy;
