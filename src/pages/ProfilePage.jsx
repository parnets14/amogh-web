


// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { toast } from "react-toastify"

// const ProfilePage = () => {
//   const [user, setUser] = useState(null)
//   const [editMode, setEditMode] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [orders, setOrders] = useState([])
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewImage, setPreviewImage] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [ordersLoading, setOrdersLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [updating, setUpdating] = useState(false)
//   const navigate = useNavigate()

//   // Check token and setup axios defaults
//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
//     } else {
//       navigate("/login")
//     }
//   }, [navigate])

//   // Fetch user data with better error handling
//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const response = await axios.get("http://localhost:5010/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // Handle different response structures
//       const userData = response.data?.data || response.data?.user || response.data

//       if (!userData) {
//         throw new Error("Invalid user data received")
//       }

//       setUser(userData)
//       setFormData({
//         name: userData.name || "",
//         email: userData.email || "",
//         password: "",
//         confirmPassword: "",
//       })

//       // Set profile image with fallback
//       const profileImageUrl =
//         userData.profileImage && userData.profileImage !== "default.jpg"
//           ? `http://localhost:5010/uploads/profileImages/${userData.profileImage}`
//           : "/placeholder.svg?height=160&width=160"

//       setPreviewImage(profileImageUrl)

//       setError(null)
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//       const errorMessage = error.response?.data?.message || error.message || "Failed to load profile data"
//       setError(errorMessage)
//       toast.error(errorMessage)

//       if (error.response?.status === 401) {
//         localStorage.removeItem("token")
//         delete axios.defaults.headers.common["Authorization"]
//         navigate("/login")
//       }
//     }
//   }

//   // Fetch orders data with improved error handling
//   const fetchOrdersData = async () => {
//     try {
//       setOrdersLoading(true)
//       setError(null)

//       const token = localStorage.getItem("token")
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const response = await axios.get("http://localhost:5010/api/orders/myorders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       console.log("Orders API Response:", response.data)
//       // Handle different response structures more robustly
//       let ordersData = []
//       if (response.data) {
//         ordersData = response.data.data || response.data.orders || response.data
//       }

//       // Ensure ordersData is an array
//       if (!Array.isArray(ordersData)) {
//         console.warn("Orders data is not an array:", ordersData)
//         ordersData = []
//       }

//       // Sort orders by creation date (newest first)
//       const sortedOrders = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

//       setOrders(sortedOrders)
//       console.log("Processed orders:", sortedOrders)
//     } catch (error) {
//       console.error("Error fetching orders:", error)
//       const errorMessage = error.response?.data?.message || error.message || "Failed to load order history"
//       toast.error(errorMessage)
//       setOrders([])

//       if (error.response?.status === 401) {
//         localStorage.removeItem("token")
//         delete axios.defaults.headers.common["Authorization"]
//         navigate("/login")
//       }
//     } finally {
//       setOrdersLoading(false)
//     }
//   }

//   // Initial data loading with better error handling
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true)
//       try {
//         // Load user data first, then orders
//         await fetchUserData()
//         await fetchOrdersData()
//       } catch (error) {
//         console.error("Initial data loading error:", error)
//         setError("Failed to load profile data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please select a valid image file")
//         return
//       }

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size should be less than 5MB")
//         return
//       }

//       setSelectedFile(file)
//       setPreviewImage(URL.createObjectURL(file))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (formData.password && formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match")
//       return
//     }

//     // Basic validation
//     if (!formData.name.trim()) {
//       toast.error("Name is required")
//       return
//     }
//     if (!formData.email.trim()) {
//       toast.error("Email is required")
//       return
//     }

//     setUpdating(true)

//     try {
//       const token = localStorage.getItem("token")
//       const formDataToSend = new FormData()

//       // Append form fields
//       formDataToSend.append("name", formData.name.trim())
//       formDataToSend.append("email", formData.email.trim())

//       // Only append password if it's provided
//       if (formData.password && formData.password.trim()) {
//         formDataToSend.append("password", formData.password)
//       }

//       // Append file if selected
//       if (selectedFile) {
//         formDataToSend.append("profileImage", selectedFile)
//       }

//       console.log("Sending form data...")

//       const response = await axios.put("http://localhost:5010/api/auth/update-profile", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       console.log("API Response:", response.data)

//       const updatedUser = response.data?.data || response.data?.user || response.data
//       setUser(updatedUser)
//       setEditMode(false)
//       setSelectedFile(null)

//       // Reset password fields
//       setFormData((prev) => ({
//         ...prev,
//         password: "",
//         confirmPassword: "",
//       }))

//       toast.success(response.data?.message || "Profile updated successfully")

//       // Refresh user data to ensure consistency
//       await fetchUserData()
//     } catch (error) {
//       console.error("Profile update error:", error)
//       const errorMessage = error.response?.data?.message || error.message || "Failed to update profile"
//       toast.error(errorMessage)
//     } finally {
//       setUpdating(false)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     delete axios.defaults.headers.common["Authorization"]
//     toast.success("Logged out successfully")
//     navigate("/login")
//   }

//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) {
//         return "Invalid Date"
//       }
//       const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
//       return date.toLocaleDateString(undefined, options)
//     } catch (error) {
//       return "Invalid Date"
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//       case "delivered":
//         return "bg-green-100 text-green-800"
//       case "processing":
//         return "bg-blue-100 text-blue-800"
//       case "shipped":
//         return "bg-purple-100 text-purple-800"
//       case "cancelled":
//         return "bg-red-100 text-red-800"
//       case "pending":
//       default:
//         return "bg-yellow-100 text-yellow-800"
//     }
//   }

//   const calculateOrderTotal = (order) => {
//     if (order.totalAmount) return order.totalAmount
//     if (order.total) return order.total

//     // Calculate from items if no total field
//     if (order.orderItems && Array.isArray(order.orderItems)) {
//       return order.orderItems.reduce((total, item) => {
//         const price = item.price || 0
//         const quantity = item.quantity || 0
//         return total + price * quantity
//       }, 0)
//     }

//     if (order.items && Array.isArray(order.items)) {
//       return order.items.reduce((total, item) => {
//         const price = item.price || 0
//         const quantity = item.quantity || 0
//         return total + price * quantity
//       }, 0)
//     }

//     return 0
//   }

//   const getOrderItemsCount = (order) => {
//     if (order.orderItems && Array.isArray(order.orderItems)) {
//       return order.orderItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
//     }
//     if (order.items && Array.isArray(order.items)) {
//       return order.items.reduce((acc, item) => acc + (item.quantity || 0), 0)
//     }
//     return 0
//   }

//   const renderOrdersTable = () => {
//     if (ordersLoading) {
//       return (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//           <span className="ml-2 text-gray-600">Loading orders...</span>
//         </div>
//       )
//     }

//     if (!orders || orders.length === 0) {
//       return (
//         <div className="text-center py-8">
//           <div className="bg-gray-50 rounded-lg p-6">
//             <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//               />
//             </svg>
//             <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
//             <p className="text-gray-400 text-sm mt-2">Start shopping to see your order history here.</p>
//             <button
//               onClick={() => navigate("/products")}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Browse Products
//             </button>
//           </div>
//         </div>
//       )
//     }

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Order ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th> */}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map((order, index) => {
//               const orderId = order._id || order.id || `order-${index}`
//               const orderNumber = order.orderNumber || orderId.substring(0, 8)
//               const itemsCount = getOrderItemsCount(order)
//               const totalAmount = calculateOrderTotal(order)

//               return (
//                 <tr key={orderId} className="hover:bg-gray-50 transition duration-150">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <span className="font-mono">#{orderNumber}...</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <span className="inline-flex items-center">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                         />
//                       </svg>
//                       {itemsCount} item{itemsCount !== 1 ? "s" : ""}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
//                     ${totalAmount.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
//                     >
//                       {(order.status || "pending").charAt(0).toUpperCase() + (order.status || "pending").slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                 
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error && !user) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//           <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//             />
//           </svg>
//           <p className="text-red-700 font-medium mb-2">Failed to load profile data</p>
//           <p className="text-red-600 text-sm mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Profile Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <div className="flex flex-col md:flex-row items-start gap-8">
//             <div className="w-full md:w-1/3 flex flex-col items-center">
//               <div className="relative mb-4">
//                 <img
//                   src={previewImage || "/placeholder.svg"}
//                   alt="Profile"
//                   className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-lg"
//                   onError={(e) => {
//                     e.target.src = "/placeholder.svg?height=160&width=160"
//                   }}
//                 />
//                 {editMode && (
//                   <label className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition duration-200 shadow-lg">
//                     <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path
//                         fillRule="evenodd"
//                         d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </label>
//                 )}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 w-full flex items-center justify-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                   />
//                 </svg>
//                 Logout
//               </button>
//             </div>

//             <div className="w-full md:w-2/3">
//               {editMode ? (
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">New Password (optional)</label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       placeholder="Leave blank to keep current password"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       placeholder="Confirm new password"
//                     />
//                   </div>
//                   <div className="flex gap-3 pt-2">
//                     <button
//                       type="submit"
//                       disabled={updating}
//                       className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {updating ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setEditMode(false)
//                         setSelectedFile(null)
//                         setFormData({
//                           name: user?.name || "",
//                           email: user?.email || "",
//                           password: "",
//                           confirmPassword: "",
//                         })
//                         const profileImageUrl =
//                           user?.profileImage && user.profileImage !== "default.jpg"
//                             ? `http://localhost:5010/uploads/profileImages/${user.profileImage}`
//                             : "/placeholder.svg?height=160&width=160"
//                         setPreviewImage(profileImageUrl)
//                       }}
//                       className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 flex items-center"
//                       disabled={updating}
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <>
//                   <h2 className="text-3xl font-bold mb-6 text-gray-800">{user?.name || "Unknown User"}</h2>
//                   <div className="space-y-4">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                         />
//                       </svg>
//                       <span className="font-semibold text-gray-700">Email:</span>
//                       <span className="ml-2 text-gray-600">{user?.email || "N/A"}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       <span className="font-semibold text-gray-700">Role:</span>
//                       <span className="ml-2 text-gray-600 capitalize">{user?.role || "User"}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2h-3v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8H4a2 2 0 01-2-2V9a2 2 0 012-2h3z"
//                         />
//                       </svg>
//                       <span className="font-semibold text-gray-700">Member Since:</span>
//                       <span className="ml-2 text-gray-600">{formatDate(user?.createdAt)}</span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setEditMode(true)}
//                     className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
//                   >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                       />
//                     </svg>
//                     Edit Profile
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Orders Section */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">Order History</h2>
//             <button
//               onClick={fetchOrdersData}
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Refresh
//             </button>
//           </div>
//           {renderOrdersTable()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  // State management
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [orders, setOrders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // API configuration
  const API_BASE_URL = "http://localhost:5010/api";

  // Check token and setup axios defaults
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data?.data || response.data?.user || response.data;
      if (!userData) {
        throw new Error("Invalid user data received");
      }

      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
      });

      // Set profile image with fallback
      const profileImageUrl =
        userData.profileImage && userData.profileImage !== "default.jpg"
          ? `${API_BASE_URL.replace('/api', '')}/uploads/profileImages/${userData.profileImage}`
          : "/default-profile.png";

      setPreviewImage(profileImageUrl);
      setError(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to load profile data";
      setError(errorMessage);
      toast.error(errorMessage);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
      }
    }
  };

  // Fetch orders data
  const fetchOrdersData = async () => {
    try {
      setOrdersLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_BASE_URL}/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let ordersData = [];
      if (response.data) {
        ordersData = response.data.data || response.data.orders || response.data;
      }

      if (!Array.isArray(ordersData)) {
        console.warn("Orders data is not an array:", ordersData);
        ordersData = [];
      }

      const sortedOrders = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to load order history";
      toast.error(errorMessage);
      setOrders([]);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
      }
    } finally {
      setOrdersLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchUserData();
        await fetchOrdersData();
      } catch (error) {
        console.error("Initial data loading error:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Event handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    setUpdating(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());

      if (formData.password && formData.password.trim()) {
        formDataToSend.append("password", formData.password);
      }

      if (selectedFile) {
        formDataToSend.append("profileImage", selectedFile);
      }

      const response = await axios.put(`${API_BASE_URL}/auth/update-profile`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data?.data || response.data?.user || response.data;
      setUser(updatedUser);
      setEditMode(false);
      setSelectedFile(null);

      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      toast.success(response.data?.message || "Profile updated successfully");
      await fetchUserData();
    } catch (error) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Helper functions
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const calculateOrderTotal = (order) => {
    if (order.totalAmount) return order.totalAmount;
    if (order.total) return order.total;

    if (order.orderItems && Array.isArray(order.orderItems)) {
      return order.orderItems.reduce((total, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }, 0);
    }

    if (order.items && Array.isArray(order.items)) {
      return order.items.reduce((total, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }, 0);
    }

    return 0;
  };

  const getOrderItemsCount = (order) => {
    if (order.orderItems && Array.isArray(order.orderItems)) {
      return order.orderItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    }
    if (order.items && Array.isArray(order.items)) {
      return order.items.reduce((acc, item) => acc + (item.quantity || 0), 0);
    }
    return 0;
  };

  // Component rendering
  const renderOrdersTable = () => {
    if (ordersLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading orders...</span>
        </div>
      );
    }

    if (!orders || orders.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-500">No orders found</h3>
            <p className="text-gray-400 mt-2">Your order history will appear here once you make purchases.</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Products
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => {
              const orderId = order._id || order.id || `order-${index}`;
              const orderNumber = order.orderNumber || orderId.substring(0, 8);
              const itemsCount = getOrderItemsCount(order);
              const totalAmount = calculateOrderTotal(order);

              return (
                <tr key={orderId} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="font-mono">#{orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {itemsCount} item{itemsCount !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {(order.status || "pending").charAt(0).toUpperCase() + (order.status || "pending").slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-red-700 mb-2">Failed to load profile</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Profile Image Column */}
            <div className="md:w-1/3 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="relative mb-6">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                {editMode && (
                  <label className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors duration-200 shadow-md">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="w-full max-w-xs px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>

            {/* Profile Info Column */}
            <div className="md:w-2/3 p-6">
              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={updating}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {updating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setSelectedFile(null);
                        setFormData({
                          name: user?.name || "",
                          email: user?.email || "",
                          password: "",
                          confirmPassword: "",
                        });
                        const profileImageUrl =
                          user?.profileImage && user.profileImage !== "default.jpg"
                            ? `${API_BASE_URL.replace('/api', '')}/uploads/profileImages/${user.profileImage}`
                            : "/default-profile.png";
                        setPreviewImage(profileImageUrl);
                      }}
                      className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
                      disabled={updating}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">{user?.email || "N/A"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">Role:</span>
                      <span className="ml-2 text-gray-600 capitalize">{user?.role || "user"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">Member Since:</span>
                      <span className="ml-2 text-gray-600">{formatDate(user?.createdAt)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Order History</h2>
              <button
                onClick={fetchOrdersData}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Refresh
              </button>
            </div>
            {renderOrdersTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;