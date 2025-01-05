import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
//img
import GoogleLogo from '../../Image/Oauth/google.png';
import NaverLogo from '../../Image/Oauth/naver.png';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Simulated OAuth login handler
    const handleOAuthLogin = (provider) => {
        alert(`OAuth login with ${provider} clicked!`);
        // Redirect to OAuth endpoint or handle logic here
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple login validation
        if (email === '123@edhqhdgkr.com' && password === 'pass123') {
            alert('Login successful!');
            setError('');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p>
                    Don't have an account?{' '}
                    <Link to="/signup" className="register-link">Sign up</Link>
                </p>
            </form>
            <div className="oauth-section">
                <p>Or Login Using</p>
                <img
                    src={GoogleLogo}
                    alt="Google OAuth"
                    className="oauth-logo"
                    onClick={() => handleOAuthLogin('Google')}
                />
                <img
                    src={NaverLogo}
                    alt="Naver OAuth"
                    classsName="oath=logo"
                    onclick={() => handleOAuthLogin('naver')}
                />
            </div>
        </div>
    );
};

export default Login;
