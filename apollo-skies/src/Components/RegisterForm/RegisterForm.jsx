import React from 'react';
import './RegisterForm.css';
import { MdDriveFileRenameOutline, MdOutlineMail, MdLockOutline } from "react-icons/md";
import { FaRegUser} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Grupi i backend te shtoje llogjiken ketu, si api, validation, etc.

    // Nese cdo gje eshte successful
    navigate("/profile");
  };

    return(
        <div className='wrapper'>
            <form action="register.php" method="POST">
                <h2>SIGN UP</h2>
                <div className='input-box'>
                    <input type="text" name="fullname" placeholder='Full Name'required/>
                    <MdDriveFileRenameOutline className='icon'/>
                </div>
                <div className='input-box'>
                    <input type="email" name="email" placeholder='Email Address'required/>
                    <MdOutlineMail className='icon'/>
                </div>
                <div className='input-box'>
                    <input type="text" name="username" placeholder='Username'required/>
                    <FaRegUser className='icon'/>
                    
                </div>
                <div className='input-box'>
                    <input type="password" name="password" placeholder='Password'required/>
                    <MdLockOutline className='icon'/>
                </div>
                <div className='input-box'>
                    <input type="pasword" name="confirm_password" placeholder='Confirm Password'required/>
                    <MdLockOutline className='icon'/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div className='login-link'>
            <p>Already have an account?</p>
            <Link to="/login">Login here</Link>
            </div>
        </div>
    )
}

export default RegisterForm