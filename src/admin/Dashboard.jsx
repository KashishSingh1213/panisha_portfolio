import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>Welcome back, Admin 👋</h1>
                <p style={{ color: '#666' }}>Here's what's happening with your portfolio website today.</p>
            </div>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-title">Total Views</div>
                    <div className="stat-value">1,234</div>
                    <div className="stat-icon">👁️</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Projects</div>
                    <div className="stat-value">12</div>
                    <div className="stat-icon">🚀</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Messages</div>
                    <div className="stat-value">5</div>
                    <div className="stat-icon">📩</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Services</div>
                    <div className="stat-value">4</div>
                    <div className="stat-icon">⚡</div>
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    <Link to="/admin/hero" className="admin-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                        Edit Hero Section
                    </Link>
                    <Link to="/admin/projects" className="admin-btn" style={{ textAlign: 'center', textDecoration: 'none', background: '#16A085' }}>
                        Manage Projects
                    </Link>
                    <Link to="/admin/messages" className="admin-btn" style={{ textAlign: 'center', textDecoration: 'none', background: '#34495e' }}>
                        View Messages
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
