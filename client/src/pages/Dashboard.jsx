// import React from 'react'
// import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
// import { RxHamburgerMenu } from "react-icons/rx";
// import { IoMdSearch } from "react-icons/io"
// import { CiSearch } from "react-icons/ci";
// import { useNavigate, Link } from 'react-router-dom';
// // files
// import DashSalutations from "../components/DashSalutations.jsx"
// import RecentDashBlogs from "../components/RecentDashBlogs.jsx"
// import DashSideBar from "../components/DashSideBar.jsx"
// import DashHeader from "../components/DashHeader.jsx"
// import { useSelector } from "react-redux"

// const Dashboard = () => {
// 	const navigate = useNavigate();
// 	const { user, loading, error, accessToken } = useSelector(state => state.auth);
// 	return (
// 		<div className="grid grid-cols-12 w-screen relative max-h-screen">
// 			<DashSideBar />
// 			<div className="flex flex-col col-span-12 lg:col-span-10 h-screen w-full overflow-y-scroll">
// 			{/*header*/}
// 				{/*<DashHeader />*/}
// 				{/*<DashSalutations />*/}
// 				{/*<RecentDashBlogs />*/}
// 			</div>
// 		</div>
// 	)
// }

// export default Dashboard

import React, { useState } from 'react';
import Sidebar from "../components/SideBar.jsx"
import DashHeader from "../components/DashHeader.jsx"
import RecentDashBlogs from "../components/RecentDashBlogs.jsx"
import StatsCards from "../components/StatsCards.jsx"
import { 
  LayoutDashboard, 
  FileText, 
  PenSquare, 
  Image, 
  Users, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Tag, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Search,
  LogOut,
  User,
  Moon,
  Sun,
  HelpCircle,
  Folder
} from 'lucide-react';

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
        <StatsCards darkMode={darkMode} />
      	<RecentDashBlogs darkMode={darkMode} />
      </div>
    </div>
  );
};

export default DashBoard;