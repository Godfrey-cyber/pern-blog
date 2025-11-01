import React, { useState } from 'react';
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
  Moon,
  Sun,
  HelpCircle,
  Folder,
  TrendingUp,
  Eye
} from 'lucide-react';
// Stats Cards Component
const StatsCards = ({ darkMode }) => {
  const dashboardStats = [
      { label: "Total Views", value: "45,231", icon: Eye, change: "+12.5%", trend: "up" },
      { label: "Total Posts", value: "127", icon: FileText, change: "+8", trend: "up" },
      { label: "Followers", value: "8,492", icon: Users, change: "+23.1%", trend: "up" },
      { label: "Engagement", value: "4.8%", icon: BarChart3, change: "+0.3%", trend: "up" }
  ];


  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-5 mt-5 ">
    {/*{stats.map((stat, idx) => (
         <div key={idx} className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-sm p-6 border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } mb-2`}>
            {stat.label}
          </p>
          <div className="flex items-end justify-between">
            <h3 className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {stat.value}
            </h3>
            <span className={`text-sm font-semibold ${
              stat.color === 'purple' ? 'text-purple-600' :
              stat.color === 'blue' ? 'text-blue-600' :
              stat.color === 'green' ? 'text-green-600' :
              'text-orange-600'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>*/}
    {dashboardStats.map((stat, idx) => (
      <div key={idx} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <stat.icon className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-green-500 text-sm font-semibold flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {stat.change}
          </span>
        </div>
        <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
      </div>
    ))}
  </div>
  );
};

export default StatsCards