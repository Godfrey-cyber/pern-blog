import React, { useState } from 'react';
import { Settings } from 'lucide-react'; 

const SettingsPage = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
      <div className="space-y-8">
        <div>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Profile Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <input
                type="text"
                defaultValue="Sarah Johnson"
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                defaultValue="sarah@devblog.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              'Email notifications for new comments',
              'Weekly analytics report',
              'Monthly newsletter',
            ].map((item, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" defaultChecked />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage