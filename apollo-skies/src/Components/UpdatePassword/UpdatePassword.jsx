import './UpdatePassword.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Ketu përdoret token-i nga URL query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resetToken = params.get('token');
        if (resetToken) {
            setToken(resetToken);
        } else {
            setMessage('Invalid or expired token');
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        if (!email || !password || !confirmPassword || !token) {
            setMessage('All fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:80/web-repo-backend/updatepassword.php', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword, token }),  
            });

            const result = await response.json();


            if (result.success) {
                setMessage('Password successfully updated!');
                navigate('/login'); 
            } else {
                setMessage(result.message || 'Failed to update password. Please try again.');
            }
        } catch (error) {
            setMessage('Error updating password. Please try again.');
        }
    };

    return (
        <div className='update-password-container'>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='email@domain.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                    type="password"
                    id="confirm_password"
                    name="confirmPassword"
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Update Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdatePassword;
