import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinaryHelper';

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
        <div className="admin-form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>{label}</label>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                {currentImage && (
                    <div style={{ background: '#f0f0f0', padding: '5px', borderRadius: '8px' }}>
                        <img src={currentImage} alt="Icon Preview" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    </div>
                )}
                {uploading && <span style={{ color: '#D87C5A', fontWeight: 'bold' }}>Uploading...</span>}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} disabled={uploading} />
        </div>
    );
};

const EditExperience = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('work'); // 'work' or 'education'

    const [data, setData] = useState({
        work: [],
        education: []
    });

    // Default seed data
    const defaultData = {
        work: [
            {
                id: 'w1',
                level: 'Current Quest',
                title: 'Digital Marketing Executive',
                org: 'CT Group of Institutions',
                location: 'Jalandhar',
                period: 'May 2025 – Present',
                xp: '+5000 XP',
                loot: [
                    'Manage paid lead-generation campaigns to increase student enquiries.',
                    'Run brand-awareness campaigns to strengthen CT Group’s digital presence.',
                    'Revamped course pages with the web team to improve UX and conversions.',
                    'Added a Placement section to showcase outcomes and support admissions.'
                ]
            },
            {
                id: 'w2',
                level: 'Quest Completed',
                title: 'Marketing & Sales Manager',
                org: 'Indigo Sails',
                location: 'London',
                period: 'Jan 2024 – Mar 2025',
                xp: '+3500 XP',
                loot: [
                    'Executed marketing campaigns, boosting lead conversions by 25%.',
                    'Managed social media and email content, increasing inquiries by 10%.',
                    'Analysed performance metrics and optimised campaigns for higher engagement.',
                    'Assisted in organising events and brand collaborations to enhance brand visibility.'
                ]
            },
            {
                id: 'w3',
                level: 'Quest Completed',
                title: 'Social Media Manager',
                org: '1 Club',
                location: 'London',
                period: 'Mar 2023 – Dec 2023',
                xp: '+2800 XP',
                loot: [
                    'Increased social media reach by 60% in one week through strategic marketing.',
                    'Managed The Redefined Podcast’s social content, boosting listenership and engagement by 20%.',
                    'Analysed social data regularly to guide marketing decisions and future strategy.',
                    'Tracked industry trends and competitor activities.'
                ]
            }
        ],
        education: [
            {
                id: 'e1',
                type: 'Mastery',
                title: 'MA. Strategic Marketing',
                org: 'University of Greenwich',
                location: 'London, UK',
                period: '2021 – 2022',
                unlock: 'Skill Tree: Strategy',
                desc: 'Specialized in data-driven marketing strategies, consumer behavior, and brand management.'
            },
            {
                id: 'e2',
                type: 'Bachelor',
                title: 'BSc. Airlines & Tourism',
                org: 'CT Group of Institutions',
                location: 'Jalandhar, India',
                period: '2017 – 2020',
                unlock: 'Skill Tree: Operations',
                desc: 'Focused on service operations, customer experience management, and global tourism trends.'
            }
        ]
    };

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "content", "experience"), (docSnap) => {
            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                // Initialize with rich defaults if empty
                setData(defaultData);
            }
        });
        return () => unsub();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await setDoc(doc(db, "content", "experience"), data);
            alert('Saved successfully!');
        } catch (error) {
            console.error("Error saving:", error);
            alert('Error saving data');
        }
        setLoading(false);
    };

    // Generic list handlers
    const addMsg = (type) => {
        const newItem = type === 'work'
            ? {
                id: Date.now(),
                title: 'New Role',
                org: 'Company Name',
                location: 'Location',
                period: '2025 - Present',
                level: 'New Quest',
                xp: '+1000 XP',
                loot: ['Achievement 1', 'Achievement 2']
            }
            : {
                id: Date.now(),
                title: 'Degree Name',
                org: 'University',
                location: 'Location',
                period: '2020 - 2024',
                type: 'Bachelor',
                unlock: 'Skill Tree: Knowledge',
                desc: 'Description of the degree...'
            };

        setData(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), newItem]
        }));
    };

    const removeMsg = (type, index) => {
        const list = [...data[type]];
        list.splice(index, 1);
        setData(prev => ({
            ...prev,
            [type]: list
        }));
    };

    const updateItem = (type, index, field, value) => {
        const list = [...data[type]];
        list[index] = { ...list[index], [field]: value };
        setData(prev => ({
            ...prev,
            [type]: list
        }));
    };

    const updateLoot = (type, itemIndex, lootIndex, value) => {
        const list = [...data[type]];
        const lootList = [...list[itemIndex].loot];
        lootList[lootIndex] = value;
        list[itemIndex].loot = lootList;
        setData(prev => ({ ...prev, [type]: list }));
    };

    const addLootItem = (type, itemIndex) => {
        const list = [...data[type]];
        list[itemIndex].loot = [...(list[itemIndex].loot || []), "New Achievement"];
        setData(prev => ({ ...prev, [type]: list }));
    };

    const removeLootItem = (type, itemIndex, lootIndex) => {
        const list = [...data[type]];
        const lootList = [...list[itemIndex].loot];
        lootList.splice(lootIndex, 1);
        list[itemIndex].loot = lootList;
        setData(prev => ({ ...prev, [type]: list }));
    };

    return (
        <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Edit Experience & Education</h2>
                <button onClick={handleSave} disabled={loading} className="save-btn">
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('work')}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'work' ? '#D87C5A' : '#ddd',
                        color: activeTab === 'work' ? '#fff' : '#333',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Work Experience (Quests)
                </button>
                <button
                    onClick={() => setActiveTab('education')}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'education' ? '#D87C5A' : '#ddd',
                        color: activeTab === 'education' ? '#fff' : '#333',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Education (Academy)
                </button>
            </div>

            <div className="content-area">
                {activeTab === 'work' && (
                    <div>
                        {data.work && data.work.map((item, i) => (
                            <div key={i} className="card-editor" style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4>Work Item #{i + 1}</h4>
                                    <button onClick={() => removeMsg('work', i)} style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                                </div>
                                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div>
                                        <label>Role / Title</label>
                                        <input type="text" value={item.title} onChange={(e) => updateItem('work', i, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Organization</label>
                                        <input type="text" value={item.org} onChange={(e) => updateItem('work', i, 'org', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Location</label>
                                        <input type="text" value={item.location} onChange={(e) => updateItem('work', i, 'location', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Period</label>
                                        <input type="text" value={item.period} onChange={(e) => updateItem('work', i, 'period', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Level Badge (e.g. Current Quest)</label>
                                        <input type="text" value={item.level} onChange={(e) => updateItem('work', i, 'level', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>XP (e.g. +5000 XP)</label>
                                        <input type="text" value={item.xp} onChange={(e) => updateItem('work', i, 'xp', e.target.value)} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <ImageUpload
                                            label="Custom Icon (Optional)"
                                            currentImage={item.icon}
                                            onUploadSuccess={(url) => updateItem('work', i, 'icon', url)}
                                        />
                                    </div>
                                    <div>
                                        <label>Icon Size (px)</label>
                                        <input
                                            type="number"
                                            value={item.iconSize || 40}
                                            onChange={(e) => updateItem('work', i, 'iconSize', parseInt(e.target.value))}
                                            placeholder="40"
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label>Loot / Achievements</label>
                                    {item.loot && item.loot.map((loot, lIndex) => (
                                        <div key={lIndex} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                                            <input
                                                type="text"
                                                value={loot}
                                                onChange={(e) => updateLoot('work', i, lIndex, e.target.value)}
                                                style={{ flex: 1 }}
                                            />
                                            <button onClick={() => removeLootItem('work', i, lIndex)} style={{ background: '#eee', border: 'none', cursor: 'pointer', padding: '0 10px' }}>×</button>
                                        </div>
                                    ))}
                                    <button onClick={() => addLootItem('work', i)} style={{ marginTop: '5px', fontSize: '0.8rem', cursor: 'pointer', background: 'none', border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px' }}>+ Add Bullet Point</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addMsg('work')} className="add-btn" style={{ width: '100%', padding: '15px', background: '#f5f5f5', border: '2px dashed #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#666' }}>+ Add Work Experience</button>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div>
                        {data.education && data.education.map((item, i) => (
                            <div key={i} className="card-editor" style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4>Education Item #{i + 1}</h4>
                                    <button onClick={() => removeMsg('education', i)} style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                                </div>
                                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div>
                                        <label>Degree / Title</label>
                                        <input type="text" value={item.title} onChange={(e) => updateItem('education', i, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>School / Org</label>
                                        <input type="text" value={item.org} onChange={(e) => updateItem('education', i, 'org', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Location</label>
                                        <input type="text" value={item.location} onChange={(e) => updateItem('education', i, 'location', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Period</label>
                                        <input type="text" value={item.period} onChange={(e) => updateItem('education', i, 'period', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Type (Bachelor/Mastery)</label>
                                        <input type="text" value={item.type} onChange={(e) => updateItem('education', i, 'type', e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Unlock Text (e.g. Skill Tree: Strategy)</label>
                                        <input type="text" value={item.unlock} onChange={(e) => updateItem('education', i, 'unlock', e.target.value)} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label>Description</label>
                                        <textarea
                                            value={item.desc}
                                            onChange={(e) => updateItem('education', i, 'desc', e.target.value)}
                                            style={{ width: '100%', padding: '8px', minHeight: '80px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addMsg('education')} className="add-btn" style={{ width: '100%', padding: '15px', background: '#f5f5f5', border: '2px dashed #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#666' }}>+ Add Education</button>
                    </div>
                )}
            </div>

            <style>{`
                input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; borderRadius: 4px; font-family: inherit; }
                label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 0.9rem; color: #555; }
                .save-btn { background: #4CAF50; color: white; padding: 10px 20px; border: none; borderRadius: 4px; cursor: pointer; font-weight: bold; }
                .save-btn:hover { background: #45a049; }
                .save-btn:disabled { background: #ccc; cursor: not-allowed; }
            `}</style>
        </div>
    );
};

export default EditExperience;
