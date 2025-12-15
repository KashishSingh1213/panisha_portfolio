import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ViewMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
                const querySnapshot = await getDocs(q);
                const msgs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgs);
            } catch (error) {
                console.error("Error fetching messages: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteDoc(doc(db, "messages", id));
                setMessages(messages.filter(msg => msg.id !== id));
            } catch (error) {
                console.error("Error deleting message: ", error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#333' }}>Contact Messages</h2>
                <p style={{ color: '#666' }}>View inquiries from your website contact form.</p>
            </div>

            {messages.length === 0 ? (
                <div className="admin-card" style={{ textAlign: 'center', color: '#888' }}>
                    No messages yet.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className="admin-card" style={{ padding: '1.5rem', marginBottom: '0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: '#1abc9c', fontSize: '1.1rem' }}>{msg.name}</h4>
                                    <span style={{ fontSize: '0.9rem', color: '#888' }}>{msg.email}</span>
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#aaa' }}>
                                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleString() : new Date().toLocaleString()}
                                </span>
                            </div>
                            <p style={{ color: '#555', lineHeight: '1.6', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                {msg.message}
                            </p>
                            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    style={{
                                        background: '#ffefef',
                                        color: '#e74c3c',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 600
                                    }}>
                                    Delete Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewMessages;
