import { BarChart3, Eye } from 'lucide-react'; 
import React, { useState } from 'react';


const AnalyticsPage = ({ darkMode }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Page Views', value: '125,432', change: '+18.2%', icon: Eye },
          { label: 'Unique Visitors', value: '32,451', change: '+12.5%', icon: Users },
          { label: 'Avg. Session', value: '4m 32s', change: '+5.3%', icon: Clock },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-xl p-6 mb-6`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Traffic Overview
        </h3>
        <div className="h-64 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Chart visualization would go here</p>
          </div>
        </div>
      </div>

      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Top Performing Posts
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Getting Started with React', views: '12.3K', engagement: '85%' },
            { title: 'Future of Web Design', views: '9.8K', engagement: '78%' },
            { title: 'Building Scalable APIs', views: '8.5K', engagement: '72%' },
          ].map((post, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {post.views} views
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold">{post.engagement}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Engagement
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage