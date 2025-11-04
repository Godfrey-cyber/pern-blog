import React from 'react'
import { TrendingUp, Icon, FileText, MessageSquare, Users, BarChart3 } from 'lucide-react';
const RecentActivities = ({ darkMode }) => {
  return (
    <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl shadow-sm py-6 px-6 w-full border my-4`}>
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
  )
}

export default RecentActivities