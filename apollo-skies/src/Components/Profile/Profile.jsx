import React from 'react';
import './Profile.css';
import userImg from '../assets/user.png';
import logo from '../assets/logo.png'



function Profile () {
    return(
        <div className='profile-container'>
          <nav id="navbar">
            <div id="navname">
            <img src={logo} alt="Logo"/>
              <h3 className="headers">Apollo Skies</h3>
            </div>
            <ul>
              <li><a href="#">HOME</a></li>
              <li><a href="#">SEARCH</a></li>
              <li><a href="#">ABOUT US</a></li>
              <li><a href="#">PROFILE</a></li>
            </ul>
          </nav>
          <main>
              <aside>
              <img src={userImg} alt="User"/>
              <ul>
                  <li><a href="#">Profile Settings</a></li>
                  <li><a href="#">My Bookings</a></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              </aside>
              <section>
                <h1>About</h1>
                <ul>
                  <li>Full Name: </li>
                  <li>Username: </li>
                  <li>Email Address: </li>
                  <li>Member Since: </li>
                </ul>
              </section>
          </main>
      </div>
    )
}

export default Profile