
import React, { useState } from 'react';
import { useSelector } from "react-redux"
import WriteBlogModal from "./WriteBlogModal.jsx"
import { LayoutDashboard, FileText, PenSquare, Image, Users, MessageSquare, Settings, BarChart3, Tag, Bell,ChevronLeft,ChevronRight, Search, LogOut, Moon, Sun, HelpCircle, Folder } from 'lucide-react';

// Top Bar Component
const DashSideBar = ({ activeMenu, darkMode, menuItems }) => {
  const { user, accessToken, loading } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-b px-8 py-4 sticky top-0 z-40 w-full right-0`}>
      <div className="flex items-center justify-between ">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            {/*Welcome back, {user?.username?.split(" ")[0]}! Here's what's happening today.*/}
            {activeMenu === 'dashboard' && `Welcome back, ${user?.username?.split(" ")[0]}! Here's what's happening today.`}
            {activeMenu === 'posts' && 'Manage all your blog posts here.'}
            {activeMenu === 'create' && 'Create a new blog post.'}
            {activeMenu === 'media' && 'Upload and manage your media files.'}
            {activeMenu === 'categories' && 'Organize your content with categories.'}
          </p>
        </div>
        <div className="flex items-center space-x-4 z-40">
          <button className={`relative p-2 rounded-lg ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          } transition`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className={`px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition flex items-center space-x-2`}>
            <PenSquare className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>
      <WriteBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    />
    </div>
  );
};

export default DashSideBar