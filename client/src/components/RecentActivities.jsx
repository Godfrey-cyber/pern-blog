import React from 'react'
import { FileText } from 'lucide-react';
const RecentActivities = ({ darkMode }) => {
  return (
    <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl shadow-sm border flex flex-col gap-6 mb-8 px-5 mt-5 `}>
            <h3 className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`flex items-center space-x-4 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      New post published
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      2 hours ago
                    </p>
                </div>
              </div>
          ))}
      </div>
  </div>
  )
}

export default RecentActivities