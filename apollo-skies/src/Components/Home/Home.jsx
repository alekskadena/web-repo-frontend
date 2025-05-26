import './Home.css';
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import Rome from '../assets/Rome.jpg';
import Paris from '../assets/Paris.jpg';
import Athens from '../assets/Athens.jpg';
import Istanbul from '../assets/Istanbul.jpg';
import Abu_Dhabi from '../assets/Abu_Dhabi.jpg';
import Glasgow from '../assets/Glasgow.jpg';
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";





const Home = () => {
    return(
        <div className='home-wrapper'>

            <header>
            <nav className="navbar">
                <div className="navname">
                    <img src={logo} alt="Logo" />
                    <h3 className="headers">Apollo Skies</h3>
                </div>
                <ul>
                    <li><Link to="/home">HOME</Link></li>
                    <li><Link to ="/mainpage">SEARCH</Link></li>
                    <li><Link to ="/aboutus">ABOUT US</Link></li>
                    <li><Link to ="/login">PROFILE</Link></li>
                </ul>
            </nav>
            </header>

            <main>
            <div className='slogan-section'>
                <h1>FLY WITH THE GODS</h1>
                <p>Apollo-Skies is a dynamic and customer-focused airline that offers affordable and reliable air travel services to a wide range of destinations. With a commitment to comfort, safety, and on-time performance, Apollo-Skies aims to make flying accessible and enjoyable for all passengers. Whether you're traveling for business or leisure, our fleet of modern aircraft and exceptional service ensure a seamless and pleasant journey from start to finish. Fly with Apollo-Skies and experience the sky like never before.</p>
 <button className='home-button'>
  <Link to="/mainpage">SEARCH FLIGHTS</Link>
</button>
            </div>
            <div className='cards-section'>
                <div className='cards-section2'>
                    <h2>Most Popular Flights:</h2>

                    <div className='cards-row'>
                    <div className='card'>
                        <img src ={Rome} alt="Destination Photo" />
                      <Link to="/mainpage">  <h3>Rome</h3> </Link>
                        <p>Prices starting from: €25.99</p>
                        
                    </div>
                    <div className='card'>
                        <img src ={Paris} alt="Destination Photo" />
                        <Link to="/mainpage">  <h3>Paris</h3> </Link>
                        <p>Prices starting from: €29.99</p>
                    </div>
                    <div className='card'>
                        <img src ={Athens} alt="Destination Photo" />
                        <Link to="/mainpage">  <h3>Athens</h3> </Link>
                        <p>Prices starting from: €14.99</p>
                    </div>
                    </div>
                </div>

                <div className='cards-section2'>
                    <h2>Recently Added Flights:</h2>

                    <div className='cards-row'>
                    <div className='card'>
                        <img src ={Istanbul} alt="Destination Photo" />
                   <Link to="/mainpage">  <h3>Istanbul</h3> </Link>
                        <p>Prices starting from: €54.99</p>
                    </div>
                    <div className='card'>
                        <img src ={Abu_Dhabi} alt="Destination Photo" />
                       <Link to="/mainpage">  <h3>Abu Dhabi</h3> </Link> 
                        <p>Prices starting from: €119.99</p>
                    </div>
                    <div className='card'>
                        <img src ={Glasgow} alt="Destination Photo" />
                      <Link to="/mainpage">  <h3>Glasgow</h3> </Link> 
                        <p>Prices starting from: €39.99</p>
                    </div>
                    </div>
                </div>
            </div>
            </main>

            <footer>
                <div className='footer-sections'>
                    <h4>Apollo Support</h4>
                    <ul>
                        <li><a href='#'>Call Support</a></li>
                        <li><a href='#'>Chat with Agent</a></li>
                        <li><a href='#'>Helpful Articles</a></li>
                    </ul>
                </div>
                <div className='footer-sections'>
                    <h4>Social Media</h4>
                    <ul>
                        <li><FaInstagram className='icon'/><a href='#'>Instagram</a></li>
                        <li><FaTwitter className='icon '/><a href='#'>Twitter</a></li>
                        <li><FaYoutube className='icon'/><a href='#'>YouTube</a></li>
                    </ul>
                </div>
                <div className='footer-sections'>
                    <h4>Flights & Destinations</h4>
                    <ul>
                        <li><a href='#'>Current Flight Status</a></li>
                        <li><a href='#'>Destinations & Timetables</a></li>
                        <li><a href='#'>Cancellation Information</a></li>
                    </ul>
                </div>
                <div className='footer-sections'>
                    <h4>About Apollo Skies</h4>
                    <ul>
                        <li><a href='#'>Company Information</a></li>
                        <li><a href='#'>Work With Us</a></li>
                        <li><a href='#'>Press Office & Partners</a></li>
                    </ul>
                </div>
            </footer>

            <div className='copyright'>&copy; Copyright 2025</div>  
        </div>
    )
}

export default Home;