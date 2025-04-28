import './ForgotPassword.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ForgotPassword(){
    function ForgotPassword() {
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
        const navigate = useNavigate();
    
        const handleSubmit = async (e) => {
            e.preventDefault(); 
            
            try {
                const response = await fetch('/api/forgotpassword', {  // Ketu eshte endpointi i backendit
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),  // Ketu dergohet emaili si JSON
                });
    
                if (response.ok) {
                    setMessage('Reset link sent to your email!');
                    navigate('/passwordmessage');
                } else {
                    setMessage('Error sending reset link. Please try again.');
                }
            } catch (error) {
                setMessage('Network error. Please try again later.');
            };
        };
    };

    return(
        <div className='forgot-password-container'>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Confirm email: </label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@domain.com' required/>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
export default ForgotPassword