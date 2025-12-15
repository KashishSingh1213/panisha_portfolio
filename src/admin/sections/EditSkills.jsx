import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Toast from '../components/Toast';

const EditSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const defaultSkills = [
        { id: '01', name: 'Campaign Planning', desc: 'Strategic execution for growth.', icon: '📅', color: '#FFF3E0' },
        { id: '02', name: 'Brand Positioning', desc: 'Defining unique market value.', icon: '🎯', color: '#E3F2FD' },
        { id: '03', name: 'Audience Research', desc: 'Understanding user needs.', icon: '🔍', color: '#F3E5F5' },
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
        setSkills([...skills, { id: '0' + (skills.length + 1), name: 'New Skill', desc: '', icon: '⚡', color: '#FFF' }]);
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
                <h2 style={{ color: '#333' }}>Edit Skills</h2>
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
                                <label className="admin-label">Icon (Emoji or char)</label>
                                <input className="admin-input" value={skill.icon} onChange={(e) => handleChange(index, 'icon', e.target.value)} />
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
