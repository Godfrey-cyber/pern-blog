import React, { useState } from 'react';
import Sidebar from "../components/SideBar.jsx"
import DashHeader from "../components/DashHeader.jsx"
import RecentDashBlogs from "../components/RecentDashBlogs.jsx"
import StatsCards from "../components/StatsCards.jsx"
import RecentActivities from "../components/RecentActivities.jsx"
import AllPostsPage from "../components/dashboard/AllPostsPage.jsx"
import AnalyticsPage from "../components/dashboard/AnalyticsPage.jsx"
import CategoriesPage from "../components/dashboard/CategoriesPage.jsx"
import CreatePostPage from "../components/dashboard/CreatePostPage.jsx"
import DashboardPage from "../components/dashboard/DashboardPage.jsx"
import MediaLibraryPage from "../components/dashboard/MediaLibraryPage.jsx"
import SettingsPage from "../components/dashboard/SettingsPage.jsx"
import { LayoutDashboard, FileText, PenSquare, Image, Users, MessageSquare, Settings, BarChart3, Tag, Bell,ChevronLeft,ChevronRight, Search, LogOut, User, Moon, Sun, HelpCircle, Folder, ThumbsUp } from 'lucide-react'; 

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'All Posts', icon: FileText },
    { id: 'create', label: 'Create Post', icon: PenSquare },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'tags', label: 'Tags', icon: Tag },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <DashboardPage darkMode={darkMode} />;
      case 'posts':
        return <AllPostsPage darkMode={darkMode} />;
      case 'create':
        return <CreatePostPage darkMode={darkMode} />;
      case 'media':
        return <MediaLibraryPage darkMode={darkMode} />;
      case 'categories':
        return <CategoriesPage darkMode={darkMode} />;
      case 'analytics':
        return <AnalyticsPage darkMode={darkMode} />;
      case 'settings':
        return <SettingsPage darkMode={darkMode} />;
      default:
        return <DashboardPage darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex`}>
      <Sidebar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <div className={`flex-1 ${collapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <DashHeader 
          activeMenu={activeMenu}
          darkMode={darkMode}
          menuItems={menuItems}
        />
        {/*<StatsCards darkMode={darkMode} />
      	<RecentDashBlogs darkMode={darkMode} />
      	<RecentActivities darkMode={darkMode} />*/}
        <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

