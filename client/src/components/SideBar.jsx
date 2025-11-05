simport React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/authThunk.js"
import { LayoutDashboard, FileText, PenSquare, Image, Users, MessageSquare, Settings, BarChart3, Tag, Bell, ChevronLeft, ChevronRight, Search, LogOut, Moon, Sun, HelpCircle, Folder } from 'lucide-react';

// Sidebar Component
const SideBar = ({ collapsed, setCollapsed, activeMenu, setActiveMenu, darkMode, setDarkMode }) => {
	const { user, accessToken, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
     dispatch(logoutUser());
     navigate("/")
 };
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'posts', label: 'All Posts', icon: FileText, badge: '24' },
    { id: 'create', label: 'Create Post', icon: PenSquare, badge: null },
    { id: 'media', label: 'Media Library', icon: Image, badge: null },
    { id: 'categories', label: 'Categories', icon: Folder, badge: '8' },
    { id: 'tags', label: 'Tags', icon: Tag, badge: null },
    { id: 'comments', label: 'Comments', icon: MessageSquare, badge: '12' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'users', label: 'Users', icon: Users, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '8' },
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r transition-all duration-300 ease-in-out flex flex-col fixed h-screen z-50`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DB</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                DevBlog
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Admin Panel
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          } transition`}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Bar */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2 transition`}
            />
          </div>
        </div>
      )}

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'justify-between'
                } px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>
                {!collapsed && item.badge && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-gray-700'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-1">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center ${
                collapsed ? 'justify-center' : 'space-x-3'
              } px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : darkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );  
        })}

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center' : 'space-x-3'
          } px-3 py-3 rounded-lg transition-all duration-200 ${
            darkMode
              ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && (
            <span className="font-medium text-sm">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{user?.username.split(" ").length === 2 ? user?.username?.split(" ")[0].charAt(0) : user?.username?.charAt(0)}{user?.username.split(" ").length === 2 ? user?.username?.split(" ")[1].charAt(0) : ""}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.username}
              </p>
              <p className={`text-xs truncate ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {user?.email}
              </p>
            </div>
          )}
          {!collapsed && (
            <button className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            } transition`}>
              <LogOut className="cursor-pointer w-4 h-4" onClick={handleLogout} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar