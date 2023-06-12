import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { Button, Modal, Spinner } from 'react-bootstrap';
import '../../styles/Auth.css';
import { registerReferral } from '../../api';
import {
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
function ReferralRegister() {
    const { referralId } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [referral, setReferral] = useState(null);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    // Obtener la referencia desde la URL
    useEffect(() => {
        const referralFromURL = location.pathname.split('/').pop();
        setReferral(referralFromURL);
    }, [location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await registerReferral(username, email, password, phone, referral);
        if (response.success) {
        navigate('/auth');
        } else {
        console.error('Failed to register user');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h2>Sign up</h2>
            <hr></hr>

            <form className="auth-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className="stripe-card-element">
                <CardElement  />
            </div>

            <button className="button-shared  auth-submit" type="submit">
                Sign up
                {loading && (
                <Spinner
                    animation="border"
                    size="sm"
                    style={{ marginLeft: '8px' }}
                />
                )}
            </button>
            </form>

            <button
            className="button-shared  auth-toggle"
            onClick={() => navigate('/login')}
            >
            Already have an account? Log in
            </button>
        </div>
        </div>
    );
}

export default ReferralRegister;
