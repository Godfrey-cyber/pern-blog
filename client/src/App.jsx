import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
// files
import viteLogo from '/vite.svg'
import './App.css'

// packages
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import LandingPage from "./pages/LandingPage.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import EditBlog from "./pages/EditBlog.jsx"
import PostBlog from "./pages/PostBlog.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className="min-h-screen font-['Montserrat'] scroll-smooth w-full overflow-x-hidden">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/blog/edit-blog/:slug" element={<EditBlog />} />
          <Route path="/blog/:username/write" element={<PostBlog />} />
          <Route path="/blogs/:username/dashboard" element={<Dashboard />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
