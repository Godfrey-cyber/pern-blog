import React, { useState } from 'react';
import { TrendingUp, Icon, FileText, MessageSquare, Users, BarChart3 } from 'lucide-react';
import StatsCards from "./dashboard/StatsCards.jsx"

const DashboardPage = ({ darkMode }) => {
  const stats = [
    { label: 'Total Posts', value: '248', change: '+12%', color: 'purple' },
    { label: 'Total Views', value: '45.2K', change: '+23%', color: 'blue' },
    { label: 'Comments', value: '1,234', change: '+8%', color: 'green' },
    { label: 'Engagement', value: '4.8%', change: '+2.1%', color: 'orange' },
  ];

  return (
    <div>
      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
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
              <span className={`text-sm font-semibold flex items-center ${
                stat.color === 'purple' ? 'text-purple-600' :
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                'text-orange-600'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>*/}
      <StatsCards />

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl shadow-sm p-6 border`}>
        <h3 className={`text-lg font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { icon: FileText, title: 'New post published', time: '2 hours ago' },
            { icon: MessageSquare, title: 'New comment on "Getting Started"', time: '4 hours ago' },
            { icon: Users, title: 'New user registered', time: '6 hours ago' },
            { icon: BarChart3, title: 'Monthly analytics report ready', time: '1 day ago' },
          ].map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className={`flex items-center space-x-4 p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activity.title}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage