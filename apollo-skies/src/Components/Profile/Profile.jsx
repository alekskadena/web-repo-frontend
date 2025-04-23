import React, { useEffect, useState } from 'react';
import './Profile.css';
import userImg from '../assets/user.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'; 

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("http://localhost/web-repo-backend/profile.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser(data);
        }
      })
      .catch(err => console.error("Error:", err));
  }, []);

  const handleLogout = () => {
    fetch("http://localhost/web-repo-backend/logout.php", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json()) 
      .then(data => {
        if (data.status === "success") {
          navigate("/login"); 
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout request failed:", err);
      });
  };


  return (
    <div className='profile-container'>
      <nav id="navbar">
        <div id="navname">
          <img src={logo} alt="Logo" />
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
          <img src={userImg} alt="User" />
          <ul>
            <li><a href="#">Profile Settings</a></li>
            <li><a href="#">My Bookings</a></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li> {}
          </ul>
        </aside>
        <section>
          <h1>About</h1>
          <ul>
            <li>Full Name: {user?.fullname}</li>
            <li>Username: {user?.username}</li>
            <li>Email Address: {user?.email}</li>
            <li>Member Since: {user?.created_at?.slice(0, 10)}</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Profile;
