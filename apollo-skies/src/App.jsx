import logo from './Components/assets/logo.png'
import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginForm from './Components/LoginForm/LoginForm'
import RegisterForm from './Components/RegisterForm/RegisterForm'
import Profile from './Components/Profile/Profile'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import PasswordMessage from './Components/PasswordMessage/PasswordMessage'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import Admin from './Components/Profile/admin'
import Dashboard from './Components/Profile/Dashboard'
import MainPageForm from './Components/Main Page/MainPageForm'
import Booking from './Components/Booking/Booking'
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs'
import Payment from './Components/Payment/Payment'
import PaymentFail from './Components/Payment/PaymentFail'
import PaymentSuccess from './Components/Payment/PaymentSuccess'
import ProfileSettings from './Components/ProfileSettings/ProfileSettings';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  const isLogIn = localStorage.getItem("isLoggedIn");
  console.log("-loginini-", isLogIn);
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={ isLogIn ?  <Profile />: <Navigate to ="/login" replace />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/updatepassword" element={<UpdatePassword />} />
      <Route path="/passwordmessage" element={<PasswordMessage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/mainpage" element={<MainPageForm />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/paymentfail" element={<PaymentFail />} />
       <Route path="/paymentsuccess" element={<PaymentSuccess />} />
       <Route path="/profile-settings" element={<ProfileSettings />} /> 

      {}
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/booking/:flightId" element={<Booking />} />

     </Routes>
  </Router>
  
  )
}
export default App
