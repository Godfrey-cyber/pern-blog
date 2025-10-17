import reactLogo from './assets/react.svg'
// files
import viteLogo from '/vite.svg'
import './App.css'

// packages
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import LandingPage from "./pages/LandingPage.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import EditBlog from "./pages/EditBlog.jsx"
import PostBlog from "./pages/PostBlog.jsx"
import BlogPost from "./pages/BlogPost.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import MyBlogs from "./pages/MyBlogs.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"

import { useDispatch, useSelector } from 'react-redux';
// import { currentUser, refreshToken } from './redux/userSlice.js';
import { loginSuccess, getCurrentUserSuccess, loginFailure, logout } from './redux/userSlice.js';
import { axiosInstance } from './utilities/utiles.js';
import { refreshUser } from "./redux/authThunk.js"
import { fetchBlogs } from "./redux/blogThunk.js"

function App() {
  const dispatch = useDispatch();
  const { user, loading, error, accessToken, isAuthenticated } = useSelector(state => state.auth);
  const { blog } = useSelector(state => state.blog);

  useEffect(() => {
    // On initial load, check if the user is authenticated
    dispatch(refreshUser());
  }, [dispatch, isAuthenticated]);

  // fetch All blogs on page load
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [])

  return (
    <section className="min-h-screen font-['Montserrat'] scroll-smooth w-full overflow-x-hidden">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={accessToken ? <LandingPage /> : <Login /> } />
          <Route path="/auth/register" element={accessToken ? <LandingPage /> : <SignUp /> } />
          <Route path="/blog/edit-blog/:slug" element={accessToken ? <EditBlog /> : <Login />} />
          <Route path="/blog/:username/write" element={accessToken ? <PostBlog /> : <Login />} />
          <Route path="/blog/:slug/:id" element={<BlogPost />} />
          <Route path="/blogs/:username/dashboard" element={accessToken ? <Dashboard /> : <Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/blogs/blog-list" element={<MyBlogs />} />
          {/*// special pages*/}
          {/*<Route path="/market" element={<ForgotPassword />} />*/}
          {/*<Route path="/leaders" element={<ForgotPassword />} />*/}
          {/*<Route path="/career" element={<ForgotPassword />} />*/}
          {/*<Route path="/lifestyle" element={<ForgotPassword />} />*/}
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App