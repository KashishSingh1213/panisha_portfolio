import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const StatCard = ({ title, value, icon, color, bg }) => (
    <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{
            position: 'absolute',
            right: '-10px',
            top: '-10px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: bg,
            opacity: 0.1,
        }}></div>

        <span style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>{value}</span>
            <div style={{
                fontSize: '1.5rem',
                color: color,
                background: bg,
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [counts, setCounts] = useState({
        projects: 0,
        services: 0,
        messages: 0,
        skills: 0
    });
    const [loading, setLoading] = useState(true);

    // Dummy chart data for now as we don't have historical traffic data
    const chartData = [
        { name: 'Mon', views: 120 },
        { name: 'Tue', views: 240 },
        { name: 'Wed', views: 400 },
        { name: 'Thu', views: 320 },
        { name: 'Fri', views: 580 },
        { name: 'Sat', views: 450 },
        { name: 'Sun', views: 600 },
    ];

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // 1. Fetch Projects Count
                const projDoc = await getDoc(doc(db, "content", "projects"));
                const projCount = projDoc.exists() && projDoc.data().items ? projDoc.data().items.length : 0;

                // 2. Fetch Services Count
                const servDoc = await getDoc(doc(db, "content", "services"));
                const servCount = servDoc.exists() && servDoc.data().items ? servDoc.data().items.length : 0;

                // 3. Fetch Messages Count
                const msgsSnap = await getDocs(collection(db, "messages"));
                const msgsCount = msgsSnap.size;

                // 4. Fetch Skills Count
                const skillsDoc = await getDoc(doc(db, "content", "skills"));
                const skillsCount = skillsDoc.exists() && skillsDoc.data().categories ?
                    skillsDoc.data().categories.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0)
                    : 0;

                setCounts({
                    projects: projCount,
                    services: servCount,
                    messages: msgsCount,
                    skills: skillsCount
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Grid */}
            <div className="dashboard-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                <StatCard
                    title="Total Projects"
                    value={loading ? '-' : counts.projects}
                    icon="🚀"
                    color="#4F46E5"
                    bg="#EEF2FF"
                />
                <StatCard
                    title="Active Services"
                    value={loading ? '-' : counts.services}
                    icon="🛠️"
                    color="#10B981"
                    bg="#D1FAE5"
                />
                <StatCard
                    title="New Messages"
                    value={loading ? '-' : counts.messages}
                    icon="📩"
                    color="#F59E0B"
                    bg="#FEF3C7"
                />
                <StatCard
                    title="Total Skills"
                    value={loading ? '-' : counts.skills}
                    icon="💡"
                    color="#EC4899"
                    bg="#FCE7F3"
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Traffic Chart */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #E5E7EB',
                    height: '400px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                    <h3 style={{ color: '#1F2937', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Traffic Overview (Simulated)</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <RechartsTooltip
                                contentStyle={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#1F2937' }}
                            />
                            <Area type="monotone" dataKey="views" stroke="#4F46E5" fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Actions */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                    <h3 style={{ color: '#1F2937', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Link to="/admin/hero" className="action-card" style={{
                            background: '#F9FAFB',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#1F2937',
                            border: '1px solid #E5E7EB',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🏠</span>
                            <div>
                                <div style={{ fontWeight: '600' }}>Edit Hero</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Update homepage</div>
                            </div>
                        </Link>

                        <Link to="/admin/projects" className="action-card" style={{
                            background: '#EFF6FF',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#1F2937',
                            border: '1px solid #BFDBFE',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🚀</span>
                            <div>
                                <div style={{ fontWeight: '600' }}>Projects</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Manage work</div>
                            </div>
                        </Link>

                        <Link to="/admin/messages" className="action-card" style={{
                            background: '#FFFBEB',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#1F2937',
                            border: '1px solid #FDE68A',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>📩</span>
                            <div>
                                <div style={{ fontWeight: '600' }}>Messages</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Inbox ({counts.messages})</div>
                            </div>
                        </Link>

                        <Link to="/admin/services" className="action-card" style={{
                            background: '#ECFDF5',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#1F2937',
                            border: '1px solid #A7F3D0',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🛠️</span>
                            <div>
                                <div style={{ fontWeight: '600' }}>Services</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Offerings</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
