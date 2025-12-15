import React from 'react';

const AdminHeader = ({ title }) => {
    return (
        <header style={{
            background: '#FFFFFF',
            padding: '1rem 2rem',
            borderRadius: '15px',
            border: '1px solid #E5E7EB',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#1F2937',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
            <h2 style={{
                margin: 0,
                fontSize: '1.5rem',
                color: '#111827',
                fontWeight: '600'
            }}>
                {title || 'Dashboard'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    border: '1px solid #E0E7FF'
                }}>
                    ⚡
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
