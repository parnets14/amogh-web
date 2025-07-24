

import { useState, useEffect } from "react"
import {
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
  AreaChart,
} from "recharts"
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  RefreshCw,
  Filter,
  Download,
  MoreHorizontal,
  Calendar,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react"
import axios from "axios"

export default function AdminDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState("7d")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      revenueChange: 0,
      ordersChange: 0,
      productsChange: 0,
      customersChange: 0,
    },
    recentOrders: [],
    salesData: [],
    categoryData: [],
    orderStatusData: [],
  })

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token")

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }

      // Try to use the admin stats endpoint first, fallback to individual calls
      try {
        const statsResponse = await axios.get("http://localhost:5010/api/admin/dashboard/stats", { headers })

        if (statsResponse.data.success) {
          const { stats, recentOrders, ordersByStatus, dailySales } = statsResponse.data.data

          // Also fetch products and categories for additional charts
          const [productsRes, categoriesRes] = await Promise.all([
            axios.get("http://localhost:5010/api/products", { headers }),
            axios.get("http://localhost:5010/api/categories", { headers }),
          ])

          const products = productsRes.data.products || productsRes.data
          const categories = categoriesRes.data || []

          // Process the data
          const processedData = {
            stats: {
              totalRevenue: stats.totalRevenue,
              totalOrders: stats.totalOrders,
              totalProducts: stats.totalProducts,
              totalCustomers: stats.totalUsers,
              revenueChange: stats.revenueChange,
              ordersChange: stats.ordersChange,
              productsChange: -2.1, // Mock data
              customersChange: 15.3, // Mock data
            },
            recentOrders: recentOrders.map((order) => ({
              id: order.orderNumber || order._id,
              customer: order.user?.name || order.shippingInfo?.fullName || "Guest",
              amount: order.total || 0,
              status: order.status || "pending",
              date: new Date(order.createdAt).toLocaleDateString(),
              avatar: (order.user?.name || order.shippingInfo?.fullName || "G").substring(0, 2).toUpperCase(),
            })),
            salesData: dailySales.map((day) => ({
              name: new Date(day._id).toLocaleDateString("en-US", { weekday: "short" }),
              sales: day.sales,
              orders: day.orders,
            })),
            categoryData: generateCategoryData(products, categories),
            orderStatusData: ordersByStatus.map((status) => ({
              status: status._id,
              count: status.count,
              percentage: stats.totalOrders > 0 ? ((status.count / stats.totalOrders) * 100).toFixed(1) : 0,
            })),
          }

          setDashboardData(processedData)
          return
        }
      } catch (adminError) {
        console.log("Admin endpoint not available, falling back to individual calls")
      }

      // Fallback to individual API calls
      const [ordersRes, productsRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:5010/api/orders", { headers }),
        axios.get("http://localhost:5010/api/products", { headers }),
        axios.get("http://localhost:5010/api/categories", { headers }),
      ])

      const orders = ordersRes.data.success ? ordersRes.data.data : ordersRes.data
      const products = productsRes.data.products || productsRes.data
      const categories = categoriesRes.data || []

      // For users count, we'll extract unique users from orders
      const uniqueUsers = new Set()
      if (Array.isArray(orders)) {
        orders.forEach((order) => {
          if (order.user?._id) {
            uniqueUsers.add(order.user._id)
          }
        })
      }

      // Process the data
      const processedData = processData(orders, products, Array.from(uniqueUsers), categories)
      setDashboardData(processedData)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError(err.response?.data?.message || "Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  // Process raw data into dashboard format
  const processData = (orders, products, users, categories) => {
    // Ensure orders is an array
    const ordersArray = Array.isArray(orders) ? orders : []

    // Calculate total revenue
    const totalRevenue = ordersArray.reduce((sum, order) => sum + (order.total || 0), 0)

    // Get recent orders (last 10)
    const recentOrders = ordersArray
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map((order) => ({
        id: order.orderNumber || order._id,
        customer: order.user?.name || order.shippingInfo?.fullName || "Guest",
        amount: order.total || 0,
        status: order.status || "pending",
        date: new Date(order.createdAt).toLocaleDateString(),
        avatar: (order.user?.name || order.shippingInfo?.fullName || "G").substring(0, 2).toUpperCase(),
      }))

    // Generate sales data for the last 7 days
    const salesData = generateSalesData(ordersArray)

    // Generate category distribution
    const categoryData = generateCategoryData(products, categories)

    // Generate order status data
    const orderStatusData = generateOrderStatusData(ordersArray)

    // Calculate stats with mock changes (you can implement real change calculation)
    const stats = {
      totalRevenue,
      totalOrders: ordersArray.length,
      totalProducts: Array.isArray(products) ? products.length : 0,
      totalCustomers: users.length, // This will be the count of unique users from orders
      revenueChange: 12.5, // Mock data - implement real calculation
      ordersChange: 8.2,
      productsChange: -2.1,
      customersChange: 15.3,
    }

    return {
      stats,
      recentOrders,
      salesData,
      categoryData,
      orderStatusData,
    }
  }

  // Generate sales data for charts
  const generateSalesData = (orders) => {
    const last7Days = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate.toDateString() === date.toDateString()
      })

      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.total || 0), 0)

      last7Days.push({
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        sales: dayRevenue,
        orders: dayOrders.length,
      })
    }

    return last7Days
  }

  // Generate category distribution data
  const generateCategoryData = (products, categories) => {
    const categoryCount = {}
    const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

    products.forEach((product) => {
      const categoryId = typeof product.category === "object" ? product.category._id : product.category
      const categoryName =
        typeof product.category === "object"
          ? product.category.name
          : categories.find((cat) => cat._id === categoryId)?.name || "Unknown"

      categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1
    })

    return Object.entries(categoryCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))
  }

  // Generate order status data
  const generateOrderStatusData = (orders) => {
    const statusCount = {
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }

    orders.forEach((order) => {
      if (statusCount.hasOwnProperty(order.status)) {
        statusCount[order.status]++
      }
    })

    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
      percentage: orders.length > 0 ? ((count / orders.length) * 100).toFixed(1) : 0,
    }))
  }

  useEffect(() => {
    if (token) {
      fetchDashboardData()
    } else {
      setError("No authentication token found")
      setLoading(false)
    }
  }, [token])

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
      delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      shipped: "bg-blue-100 text-blue-700 border-blue-200",
      processing: "bg-purple-100 text-purple-700 border-purple-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    }
    return statusConfig[status] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const StatCard = ({ title, value, change, icon: Icon, color, gradient, loading }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {title.includes("Revenue") ? `$${value.toLocaleString()}` : value.toLocaleString()}
            </p>
          )}
          <div className="flex items-center mt-3">
            {change > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? "text-emerald-600" : "text-red-600"}`}>
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
  )

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === "sales" ? `$${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="mt-2 text-gray-600">Monitor your business performance and key metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </button> */}
            {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button> */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={dashboardData.stats.totalRevenue}
            change={dashboardData.stats.revenueChange}
            icon={DollarSign}
            gradient="bg-gradient-to-r from-emerald-500 to-teal-600"
            loading={loading}
          />
          <StatCard
            title="Total Orders"
            value={dashboardData.stats.totalOrders}
            change={dashboardData.stats.ordersChange}
            icon={ShoppingCart}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-600"
            loading={loading}
          />
          <StatCard
            title="Total Products"
            value={dashboardData.stats.totalProducts}
            change={dashboardData.stats.productsChange}
            icon={Package}
            gradient="bg-gradient-to-r from-purple-500 to-indigo-600"
            loading={loading}
          />
          <StatCard
            title="Total Customers"
            value={dashboardData.stats.totalCustomers}
            change={dashboardData.stats.customersChange}
            icon={Users}
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
            loading={loading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <p className="text-sm text-gray-600">Revenue trends over the last 7 days</p>
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
              <AreaChart data={dashboardData.salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
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
              <h3 className="text-lg font-semibold text-gray-900">Products by Category</h3>
              <p className="text-sm text-gray-600">Distribution of products across categories</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Status Overview</h3>
            <p className="text-sm text-gray-600">Current status distribution of all orders</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardData.orderStatusData.map((item) => (
              <div key={item.status} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">{getStatusIcon(item.status)}</div>
                <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                <div className="text-sm text-gray-600 capitalize">{item.status}</div>
                <div className="text-xs text-gray-500">{item.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order Trends</h3>
              <p className="text-sm text-gray-600">Daily order volume analysis</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 4 }} />
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
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
                      <div className="text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
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
              <div className="text-3xl font-bold text-blue-600">
                $
                {dashboardData.stats.totalOrders > 0
                  ? (dashboardData.stats.totalRevenue / dashboardData.stats.totalOrders).toFixed(0)
                  : "0"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Order Value</div>
              <div className="text-xs text-blue-600 mt-1">+12% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
              <div className="text-3xl font-bold text-emerald-600">
                {dashboardData.orderStatusData.find((item) => item.status === "delivered")?.percentage || "0"}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Delivery Rate</div>
              <div className="text-xs text-emerald-600 mt-1">+3.2% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">{dashboardData.stats.totalProducts}</div>
              <div className="text-sm text-gray-600 mt-1">Active Products</div>
              <div className="text-xs text-purple-600 mt-1">+{dashboardData.stats.productsChange}% vs last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
