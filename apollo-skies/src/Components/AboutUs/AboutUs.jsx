import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <header>
        <nav className="navbar">
          <div className="navname">
            <img src={logo} alt="Logo" />
            <h3 className="headers">Apollo Skies</h3>
          </div>
          <ul>
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/mainpage">SEARCH</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
            <li><Link to="/login">PROFILE</Link></li>
          </ul>
        </nav>
      </header>

      <div className="about-container">
          <div className="about-content">
        <h1>About Apollo-Skies</h1>
        <p>
          Apollo-Skies is a modern airline focused on making air travel safe, comfortable, and affordable.
          We connect cities across Europe and beyond with a growing network of reliable flights.
        </p>
        <p>
          Our mission is to provide an exceptional flying experience with modern aircraft, professional crew, and a customer-first approach.
        </p>

        <h2>Contact Us</h2>
        <p>Email: support@apollo-skies.com</p>
        <p>Phone: +355 3333333</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
