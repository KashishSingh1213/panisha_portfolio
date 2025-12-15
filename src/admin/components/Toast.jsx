import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ msg, type = 'success', onClose, title }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!msg) return null;

    const isError = type === 'error' || msg.toLowerCase().includes('error');
    const finalType = isError ? 'error' : 'success';
    const defaultTitle = isError ? 'Error' : 'Success';

    return (
        <div className="admin-toast-container">
            <div className={`admin-toast ${finalType}`}>
                <div className="toast-icon-box">
                    {finalType === 'success' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    )}
                </div>
                <div className="toast-content">
                    <span className="toast-title">{title || defaultTitle}</span>
                    <span className="toast-message">{msg}</span>
                </div>
                <button className="toast-close" onClick={onClose}>&times;</button>
                <div className="toast-progress"></div>
            </div>
        </div>
    );
};

export default Toast;
