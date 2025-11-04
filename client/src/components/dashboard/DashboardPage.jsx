import React, { useState } from 'react';
import { TrendingUp, Icon, FileText, MessageSquare, Users, BarChart3 } from 'lucide-react';
import StatsCards from "../StatsCards.jsx"
import RecentDashBlogs from "../RecentDashBlogs.jsx"
import RecentActivities from "../RecentActivities.jsx"

const DashboardPage = ({ darkMode }) => {
  const stats = [
    { label: 'Total Posts', value: '248', change: '+12%', color: 'purple' },
    { label: 'Total Views', value: '45.2K', change: '+23%', color: 'blue' },
    { label: 'Comments', value: '1,234', change: '+8%', color: 'green' },
    { label: 'Engagement', value: '4.8%', change: '+2.1%', color: 'orange' },
  ];

  return (
    <div>
      <StatsCards />
      <RecentDashBlogs />
      <RecentActivities />
    </div>
  );
};

export default DashboardPage