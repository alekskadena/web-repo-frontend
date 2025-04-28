import './UpdatePassword.css'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdatePassword(){

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Ketu perdoret tokeni nga URL query string
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

        try {
            const response = await fetch('/api/update-password', {  // Ketu eshte Backend Endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, token }),  // KEtu dergohen passwordi dhe tokeni ne backend
            });

            if (response.ok) {
                setMessage('Password successfully updated!');
                navigate('/login');  // Meqenese passwordi u ndryshua successfully, e bejme faqen redirect ne LoginForm.jsx
            } else {
                setMessage('Failed to update password. Please try again.');
            }
        } catch (error) {
            setMessage('Error updating password. Please try again.');
        }
    };

    return(
        <div className='update-password-container'>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='email@domain.com' required/>

                <label htmlFor="password">New Password:</label>
                <input type="password" id="password" name="Password" placeholder='Enter New Password:' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <label htmlFor="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="ConfirmPassword" placeholder='Confirm New Password:' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

                <button type="submit" name="updatepassword">Update Password</button>
            </form>
            {message && <p>{message}</p>}

        </div>
    )
}

export default UpdatePassword