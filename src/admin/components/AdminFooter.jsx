import React from 'react';

const AdminFooter = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '0.9rem',
            borderTop: '1px solid #E5E7EB'
        }}>
            <p style={{ margin: 0 }}>
                © {new Date().getFullYear()} Panisha Portfolio Admin. All rights reserved.
                <span style={{ margin: '0 10px' }}>|</span>
                <span style={{ color: '#4F46E5', fontWeight: '500' }}>v1.0.0</span>
            </p>
        </footer>
    );
};

export default AdminFooter;
