import React, { useState } from 'react';
import './UpdatePassword.css'

function UpdatePassword(){
    return(
        <div className='update-password-container'>
            <h2>Update Password</h2>
            <form method="POST" action="updatepassword.php">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='email@domain.com' required/>

                <label for="password">New Password:</label>
                <input type="password" id="password" name="Password" placeholder='Enter New Password:'required/>

                <label for="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="ConfirmPassword" placeholder='Confirm New Password:'required/>

                <button type="submit" name="updatepassword">Update Password</button>
            </form>
        </div>
    )
}

export default UpdatePassword