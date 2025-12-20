import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './admin.css';
import AdminHeader from './components/AdminHeader';
import AdminFooter from './components/AdminFooter';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (pathname === '/admin') return 'Dashboard';
        return `Edit ${path.charAt(0).toUpperCase() + path.slice(1)}`;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="admin-container">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span style={{ fontSize: '1.8rem', marginRight: '5px' }}>⚡</span>
                        <span className="text">Admin</span>
                    </div>
                    {/* Close button for mobile */}
                    <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin" className={`admin-nav-link ${isActive('/admin')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>📊</span> <span className="text">Dashboard</span>
                    </Link>
                    <Link to="/admin/hero" className={`admin-nav-link ${isActive('/admin/hero')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>🏠</span> <span className="text">Edit Hero</span>
                    </Link>
                    <Link to="/admin/about" className={`admin-nav-link ${isActive('/admin/about')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>👤</span> <span className="text">Edit About</span>
                    </Link>
                    <Link to="/admin/services" className={`admin-nav-link ${isActive('/admin/services')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>🛠️</span> <span className="text">Edit Services</span>
                    </Link>
                    <Link to="/admin/projects" className={`admin-nav-link ${isActive('/admin/projects')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>🚀</span> <span className="text">Edit Projects</span>
                    </Link>
                    <Link to="/admin/experience" className={`admin-nav-link ${isActive('/admin/experience')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>⚔️</span> <span className="text">Edit Experience</span>
                    </Link>
                    <Link to="/admin/marketing-showcase" className={`admin-nav-link ${isActive('/admin/marketing-showcase')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>📢</span> <span className="text">Edit Marketing</span>
                    </Link>
                    <Link to="/admin/header" className={`admin-nav-link ${isActive('/admin/header')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>🔝</span> <span className="text">Edit Header</span>
                    </Link>
                    <Link to="/admin/footer" className={`admin-nav-link ${isActive('/admin/footer')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>⏬</span> <span className="text">Edit Footer</span>
                    </Link>
                    <Link to="/admin/skills" className={`admin-nav-link ${isActive('/admin/skills')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>💡</span> <span className="text">Edit Skills</span>
                    </Link>
                    <Link to="/admin/testimonials" className={`admin-nav-link ${isActive('/admin/testimonials')}`} onClick={() => setIsSidebarOpen(false)}>
                        <span style={{ width: '24px', fontSize: '1.2rem' }}>💬</span> <span className="text">Edit Testimonials</span>
                    </Link>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Link to="/" className="admin-nav-link" onClick={() => setIsSidebarOpen(false)}>
                            <span style={{ width: '24px', fontSize: '1.2rem' }}>⬅️</span> <span className="text">Back to Site</span>
                        </Link>
                        <button onClick={handleLogout} className="admin-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                            <span style={{ width: '24px', fontSize: '1.2rem' }}>🚪</span> <span className="text">Logout</span>
                        </button>
                    </div>
                </nav>
            </div>
            <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Mobile Hamburger Button */}
                    <button className="mobile-menu-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <AdminHeader title={getPageTitle(location.pathname)} />
                </div>

                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminLayout;
