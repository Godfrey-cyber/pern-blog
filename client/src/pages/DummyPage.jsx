import React, { useState } from 'react';
import { 
  Home, DollarSign, Users, FileText, BarChart3, Settings, 
  Bell, Search, Menu, X, ChevronDown, Receipt, Building2,
  TrendingUp, Calendar, Filter, Download, Plus, Eye,
  CheckCircle, XCircle, Clock, AlertTriangle, MapPin
} from 'lucide-react';

const CountyRevenueSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data
  const revenueStats = [
    { 
      title: 'Today\'s Collection', 
      amount: 'KES 234,500', 
      change: '+12.5%', 
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      title: 'Monthly Revenue', 
      amount: 'KES 4.2M', 
      change: '+8.2%', 
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    { 
      title: 'Pending Payments', 
      amount: 'KES 856K', 
      change: '-3.1%', 
      icon: Clock,
      color: 'bg-yellow-500'
    },
    { 
      title: 'Total Taxpayers', 
      amount: '12,847', 
      change: '+156', 
      icon: Users,
      color: 'bg-purple-500'
    },
  ];

  const recentTransactions = [
    { id: 'TXN001', taxpayer: 'John Kamau', type: 'Business Permit', amount: 5000, status: 'completed', date: '2024-11-15' },
    { id: 'TXN002', taxpayer: 'Jane Wanjiku', type: 'Land Rates', amount: 12000, status: 'pending', date: '2024-11-15' },
    { id: 'TXN003', taxpayer: 'Peter Omondi', type: 'Market Fee', amount: 500, status: 'completed', date: '2024-11-14' },
    { id: 'TXN004', taxpayer: 'Mary Akinyi', type: 'Parking Fee', amount: 200, status: 'failed', date: '2024-11-14' },
    { id: 'TXN005', taxpayer: 'David Mwangi', type: 'Building Permit', amount: 25000, status: 'completed', date: '2024-11-14' },
  ];

  const revenueStreams = [
    { name: 'Business Permits', collected: 1200000, target: 1500000, percentage: 80 },
    { name: 'Land Rates', collected: 850000, target: 1000000, percentage: 85 },
    { name: 'Market Fees', collected: 450000, target: 500000, percentage: 90 },
    { name: 'Parking Fees', collected: 320000, target: 400000, percentage: 80 },
    { name: 'Building Permits', collected: 680000, target: 800000, percentage: 85 },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'collections', label: 'Collections', icon: DollarSign },
    { id: 'taxpayers', label: 'Taxpayers', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4" />;
    if (status === 'pending') return <Clock className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.amount}</p>
          </div>
        ))}
      </div>

      {/* Revenue Streams */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Revenue Streams Performance</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">This Month</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {revenueStreams.map((stream, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stream.name}</span>
                <span className="text-sm text-gray-500">
                  KES {stream.collected.toLocaleString()} / {stream.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${stream.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Taxpayer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{txn.taxpayer}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{txn.type}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">KES {txn.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(txn.status)}`}>
                      {getStatusIcon(txn.status)}
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{txn.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCollections = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">New Collection</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxpayer ID / Phone
            </label>
            <input
              type="text"
              placeholder="Enter taxpayer ID or phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Revenue Stream
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Select revenue stream</option>
              <option>Business Permit</option>
              <option>Land Rates</option>
              <option>Market Fee</option>
              <option>Parking Fee</option>
              <option>Building Permit</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (KES)
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Select payment method</option>
              <option>M-Pesa</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Add any additional notes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            ></textarea>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            <Receipt className="w-5 h-5" />
            Process Payment
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            Cancel
          </button>
        </div>
      </div>

      {/* Collection History */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Collections</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          No collections recorded yet today
        </div>
      </div>
    </div>
  );

  const renderTaxpayers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Taxpayer Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-5 h-5" />
            Add Taxpayer
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, ID, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Categories</option>
            <option>Business</option>
            <option>Individual</option>
            <option>Property Owner</option>
          </select>
        </div>

        <div className="text-center py-12 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No taxpayers found. Add your first taxpayer to get started.</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'collections':
        return renderCollections();
      case 'taxpayers':
        return renderTaxpayers();
      case 'reports':
        return <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">Reports module coming soon...</div>;
      case 'analytics':
        return <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">Analytics module coming soon...</div>;
      case 'settings':
        return <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">Settings module coming soon...</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-gray-900">County</h1>
                <p className="text-xs text-gray-500">Revenue System</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">JK</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Kamau</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage county revenue collections and track performance
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="p-4 text-sm text-gray-500 text-center">
                      No new notifications
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default CountyRevenueSystem