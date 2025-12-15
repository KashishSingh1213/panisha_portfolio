import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-circle circle-1"></div>
                <div className="login-circle circle-2"></div>
                <div className="login-circle circle-3"></div>
            </div>

            <div className="login-card">
                <h2 className="login-title">Only Admin</h2>
                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            className="login-input"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button disabled={loading} className="login-btn" type="submit">
                        {loading ? 'Logging In...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
