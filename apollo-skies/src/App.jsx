import logo from './Components/assets/logo.png'
import { useState } from 'react'
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import RegisterForm from './Components/RegisterForm/RegisterForm'
import Profile from './Components/Profile/Profile'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<Profile />} />
      {}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  )
}
export default App
