import React, { useState } from 'react';
import './RegisterForm.css';
import { MdDriveFileRenameOutline, MdOutlineMail, MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost/web-repo-backend/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.message === "Registration successful!") {
      navigate("/profile");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleRegister}>
        <h2>SIGN UP</h2>
        <div className='input-box'>
          <input type="text" name="fullname" placeholder='Full Name' onChange={handleChange} required />
          <MdDriveFileRenameOutline className='icon' />
        </div>
        <div className='input-box'>
          <input type="email" name="email" placeholder='Email Address' onChange={handleChange} required />
          <MdOutlineMail className='icon' />
        </div>
        <div className='input-box'>
          <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
          <FaRegUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
          <MdLockOutline className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" name="confirm_password" placeholder='Confirm Password' onChange={handleChange} required />
          <MdLockOutline className='icon' />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className='login-link'>
        <p>Already have an account?</p>
        <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
