import './ForgotPassword.css'

function ForgotPassword(){
    return(
        <div className='forgot-password-container'>
            <h2>Forgot Password</h2>
            <form action="forgotpassword.php" method="POST">
                <label for="email">Confirm email: </label>
                <input type="email" id="email" name="email" placeholder='email@domain.com'required/>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    )
}
export default ForgotPassword