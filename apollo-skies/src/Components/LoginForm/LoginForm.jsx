import React, { useState } from 'react';
import './LoginForm.css';
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/web-repo-backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (result.status === 'success') {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", credentials.identifier);
        
        if (result.redirect === "admin.jsx") {
          navigate("/admin"); // i bendirect në admin
        } else if (result.redirect === "Profile.jsx") {
          navigate("/profile");  //i ben direct ne users profile 
        }
      } else {
        alert(result.message); 
      }

    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h2>LOGIN</h2>
        <div className='input-box'>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            onChange={handleChange}
            required
          />
          <FaRegUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <MdLockOutline className='icon' />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className='forgot-password'>
        <p>Forgot your password? </p>
        <Link to="/forgotpassword">Click here</Link>
      </div>
      <div className='register-link'>
        <p>Don't have an account? </p>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}

export default LoginForm;
