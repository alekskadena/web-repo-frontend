import React from 'react';
import './LoginForm.css';
import { FaRegUser} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";



const LoginForm = () => {
    return(
        <div className='wrapper'>
            <form action="login.php" method="POST">
                <h2>LOGIN</h2>
                <div className='input-box'>
                    <input type="text" name="identifier" placeholder='Email or Username' required/>
                   <FaRegUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type="password" name="password" placeholder='Password' required/>
                    <MdLockOutline className='icon'/>
                </div>
                <button type="submit">Login</button>
            </form>
            <div className='forgot-password'>
                <p>Forgot your password? </p>
                <a href="#">Click here</a>
            </div>
            <div className='register-link'>
                <p>Don't have an account? </p>
                <a href="#">Register now</a>
            </div>
        </div>
    )
}

export default LoginForm