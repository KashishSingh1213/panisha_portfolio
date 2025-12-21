import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const iconOptions = [
        'Campaign Planning', 'Brand Positioning', 'Audience Research', 'Performance Analysis',
        'Content Writing', 'Storytelling', 'Social Media Copy', 'Brand Voice',
        'Video Editing', 'Visual Storytelling', 'Graphic Content',
        'Analytics Tools', 'Social Platforms', 'Planning Tools'
    ];

    const defaultSkills = [
        { id: '01', name: 'Campaign Planning', iconKey: 'Campaign Planning', desc: 'Strategic execution for growth.', color: '#F3E5F5' },
        { id: '02', name: 'Brand Positioning', iconKey: 'Brand Positioning', desc: 'Defining unique market value.', color: '#E8EAF6' },
        { id: '03', name: 'Audience Research', iconKey: 'Audience Research', desc: 'Understanding user needs.', color: '#FFF8E1' },
        { id: '04', name: 'Performance Analysis', iconKey: 'Performance Analysis', desc: 'Data-driven optimization.', color: '#F3E5F5' },
        { id: '05', name: 'Content Writing', iconKey: 'Content Writing', desc: 'Compelling copy across platforms.', color: '#FFFFF0' },
        { id: '06', name: 'Storytelling', iconKey: 'Storytelling', desc: 'Connecting brands with people.', color: '#E0F2F1' },
        { id: '07', name: 'Social Media Copy', iconKey: 'Social Media Copy', desc: 'Engaging captions & scripts.', color: '#EDE7F6' },
        { id: '08', name: 'Brand Voice', iconKey: 'Brand Voice', desc: 'Consistent communication style.', color: '#FFF3E0' },
        { id: '09', name: 'Video Editing', iconKey: 'Video Editing', desc: 'High-impact video content.', color: '#F3E5F5' },
        { id: '10', name: 'Visual Storytelling', iconKey: 'Visual Storytelling', desc: 'Communicating through imagery.', color: '#E8EAF6' },
        { id: '11', name: 'Graphic Content', iconKey: 'Graphic Content', desc: 'Social creatives & branding.', color: '#FFF8E1' },
        { id: '12', name: 'Analytics Tools', iconKey: 'Analytics Tools', desc: 'Measuring success & ROI.', color: '#EDE7F6' },
        { id: '13', name: 'Social Platforms', iconKey: 'Social Platforms', desc: 'Instagram, LinkedIn, YouTube.', color: '#F3E5F5' },
        { id: '14', name: 'Planning Tools', iconKey: 'Planning Tools', desc: 'Organizing content workflows.', color: '#E8EAF6' }
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const docRef = doc(db, 'content', 'skills');
                const snap = await getDoc(docRef);
                if (snap.exists() && snap.data().items) {
                    setSkills(snap.data().items);
                } else {
                    setSkills(defaultSkills);
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
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const handleAdd = () => {
        const id = String(skills.length + 1).padStart(2, '0');
        setSkills([...skills, {
            id,
            name: 'New Skill',
            iconKey: 'Planning Tools', // Default icon
            desc: 'Skill description...',
            color: '#FFFFFF'
        }]);
    };

    const handleRemove = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'content', 'skills'), { items: skills });
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
                <h2 style={{ color: '#333' }}>Edit Skills (Technical Arsenal)</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
                {skills.map((skill, index) => (
                    <div key={index} className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ color: '#1abc9c', margin: 0 }}>Skill #{skill.id}</h4>
                            <button type="button" onClick={() => handleRemove(index)} className="admin-btn" style={{ backgroundColor: '#e74c3c', padding: '5px 12px', fontSize: '0.8rem' }}>Delete</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="admin-form-group">
                                <label className="admin-label">Name</label>
                                <input className="admin-input" value={skill.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Icon Representation</label>
                                <select
                                    className="admin-input"
                                    value={skill.iconKey || skill.name} // Fallback to name if iconKey missing
                                    onChange={(e) => handleChange(index, 'iconKey', e.target.value)}
                                >
                                    {iconOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Description</label>
                            <input className="admin-input" value={skill.desc} onChange={(e) => handleChange(index, 'desc', e.target.value)} />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Color (Hex/RGB)</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <input className="admin-input" value={skill.color} onChange={(e) => handleChange(index, 'color', e.target.value)} />
                                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: skill.color, border: '1px solid #ddd' }}></div>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={handleAdd} className="admin-btn" style={{ backgroundColor: '#95a5a6' }}>+ Add Skill</button>
                    <button type="submit" disabled={saving} className="admin-btn">Save Skills</button>
                </div>
            </form>
        </div>
    );
};

export default EditSkills;
