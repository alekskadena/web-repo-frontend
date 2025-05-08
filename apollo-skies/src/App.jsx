import logo from './Components/assets/logo.png'
import { useState } from 'react'
import LoginForm from './Components/LoginForm/LoginForm'
import RegisterForm from './Components/RegisterForm/RegisterForm'
import Profile from './Components/Profile/Profile'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import PasswordMessage from './Components/PasswordMessage/PasswordMessage'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import Admin from './Components/Profile/admin'
import MainPageForm from './Components/Main Page/MainPageForm'
import Booking from './Components/Booking/Booking'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/updatepassword" element={<UpdatePassword />} />
      <Route path="/passwordmessage" element={<PasswordMessage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/mainpage" element={<MainPageForm />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/home" element={<Home />} />

      {}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  </Router>
  
  )
}
export default App
