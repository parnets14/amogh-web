import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Bell,
  Settings,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const salesData = [
    { name: 'Mon', sales: 2400, orders: 12 },
    { name: 'Tue', sales: 1398, orders: 8 },
    { name: 'Wed', sales: 9800, orders: 25 },
    { name: 'Thu', sales: 3908, orders: 18 },
    { name: 'Fri', sales: 4800, orders: 22 },
    { name: 'Sat', sales: 3800, orders: 16 },
    { name: 'Sun', sales: 4300, orders: 19 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#6366f1' },
    { name: 'Clothing', value: 28, color: '#ec4899' },
    { name: 'Books', value: 20, color: '#10b981' },
    { name: 'Home & Garden', value: 17, color: '#f59e0b' }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-15', avatar: 'JD' },
    { id: '#12346', customer: 'Jane Smith', amount: 199.50, status: 'pending', date: '2024-01-15', avatar: 'JS' },
    { id: '#12347', customer: 'Bob Johnson', amount: 399.99, status: 'shipped', date: '2024-01-14', avatar: 'BJ' },
    { id: '#12348', customer: 'Alice Brown', amount: 149.99, status: 'processing', date: '2024-01-14', avatar: 'AB' },
    { id: '#12349', customer: 'Charlie Wilson', amount: 599.99, status: 'completed', date: '2024-01-13', avatar: 'CW' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      shipped: 'bg-blue-100 text-blue-700 border-blue-200',
      processing: 'bg-purple-100 text-purple-700 border-purple-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const StatCard = ({ title, value, change, icon: Icon, color, gradient }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-3">
            {change > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last week</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl ${gradient}`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Analytics Overview</h2>
            <p className="mt-2 text-gray-600">Track your business performance and key metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value="$45,231" 
            change={12.5} 
            icon={DollarSign}
            gradient="bg-gradient-to-r from-emerald-500 to-teal-600"
          />
          <StatCard 
            title="Total Orders" 
            value="1,234" 
            change={8.2} 
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-600"
          />
          <StatCard 
            title="Total Products" 
            value="567" 
            change={-2.1} 
            icon={Package}
            gradient="bg-gradient-to-r from-purple-500 to-indigo-600"
          />
          <StatCard 
            title="Total Customers" 
            value="890" 
            change={15.3} 
            icon={Users}
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <p className="text-sm text-gray-600">Revenue trends over time</p>
              </div>
              <select 
                value={selectedDateRange} 
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="text-sm border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="url(#colorSales)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
              <p className="text-sm text-gray-600">Distribution of sales across categories</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order Trends</h3>
              <p className="text-sm text-gray-600">Daily order volume analysis</p>
            </div>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <p className="text-sm text-gray-600">Latest customer orders and their status</p>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">{order.avatar}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900 p-1 rounded hover:bg-emerald-50">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
            <p className="text-sm text-gray-600">Key performance indicators at a glance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">$287</div>
              <div className="text-sm text-gray-600 mt-1">Average Order Value</div>
              <div className="text-xs text-blue-600 mt-1">+12% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
              <div className="text-3xl font-bold text-emerald-600">24.5%</div>
              <div className="text-sm text-gray-600 mt-1">Conversion Rate</div>
              <div className="text-xs text-emerald-600 mt-1">+3.2% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">3.2x</div>
              <div className="text-sm text-gray-600 mt-1">Return Customer Rate</div>
              <div className="text-xs text-purple-600 mt-1">+0.8x vs last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}