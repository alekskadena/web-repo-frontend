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
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost/web-repo-backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      //role_id=2 eshte me adminat dhe role_id=1 eshte per normal users
      const result = await response.json();
      if (result.status === "success") {
        if (result.role === 2) {
          navigate("/admin"); 
        } else {
          navigate("/Profile"); 
        }
      } else {
        alert(result.message); 
      }
    } catch (error) {
      console.error("Full Error Object: ", error);
      alert("An unexpected error occurred. Please try again later.");
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
