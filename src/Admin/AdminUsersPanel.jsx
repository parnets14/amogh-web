

// import { useEffect, useState } from "react"
// import axios from "axios"
// import { Trash2, User, Mail, Shield } from "lucide-react"
// import { toast } from "react-toastify"

// const AdminUsersPanel = () => {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     adminUsers: 0,
//     regularUsers: 0,
//   })

//   const token = localStorage.getItem("adminToken")||
//   console.log(token,"k.k.k.kc.k")

//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       const res = await axios.get("http://localhost:5010/api/auth/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       console.log("Users response:fddf", res.data)

//       if (res.data.success) {
//         const usersList = res.data.data || []
//         setUsers(usersList)

//         // Calculate stats
//         const totalUsers = usersList.length
//         const adminUsers = usersList.filter((user) => user.role === "admin").length
//         const regularUsers = usersList.filter((user) => user.role === "user").length

//         setStats({
//           totalUsers,
//           adminUsers,
//           regularUsers,
//         })
//       } else {
//         toast.error("Failed to load users")
//         setUsers([])
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error)
//       toast.error(error.response?.data?.message || "Failed to load users")
//       setUsers([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       fetchUsers()
//     } else {
//       toast.error("No admin token found")
//       setLoading(false)
//     }
//   }, [token])

//   const deleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return

//     try {
//       const res = await axios.delete(`http://localhost:5010/api/auth/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (res.data.success) {
//         toast.success("User deleted successfully")
//         setUsers(users.filter((user) => user._id !== userId))

//         // Update stats
//         const deletedUser = users.find((user) => user._id === userId)
//         if (deletedUser) {
//           setStats((prev) => ({
//             totalUsers: prev.totalUsers - 1,
//             adminUsers: deletedUser.role === "admin" ? prev.adminUsers - 1 : prev.adminUsers,
//             regularUsers: deletedUser.role === "user" ? prev.regularUsers - 1 : prev.regularUsers,
//           }))
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error)
//       toast.error(error.response?.data?.message || "Failed to delete user")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-lg text-gray-600">Loading users...</span>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-blue-100">
//               <User className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Users</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-green-100">
//               <Shield className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Admin Users</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.adminUsers}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-purple-100">
//               <Mail className="h-6 w-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Regular Users</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.regularUsers}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Profile
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Joined
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Array.isArray(users) && users.length > 0 ? (
//                 users.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <img
//                         src={
//                           user.profileImage
//                             ? `http://localhost:5010/uploads/profileImages/${user.profileImage}`
//                             : "https://via.placeholder.com/40x40/4F46E5/ffffff?text=" + (user.name?.charAt(0) || "U")
//                         }
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{user.email}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           user.role === "admin" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       {user.role !== "admin" && (
//                         <button
//                           onClick={() => deleteUser(user._id)}
//                           className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
//                           title="Delete User"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center">
//                     <div className="text-gray-500">
//                       <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                       <p className="text-lg font-medium">No users found</p>
//                       <p className="text-sm">Users will appear here once they register</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminUsersPanel
import { useEffect, useState } from "react"
import axios from "axios"
import { Trash2, User, Mail, Shield } from "lucide-react"
import { toast } from "react-toastify"

const AdminUsersPanel = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  })

  const token = localStorage.getItem("adminToken")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:5010/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        const allUsers = res.data.data || []
        // Filter out admin users
        const regularUsers = allUsers.filter(user => user.role === "user")
        setUsers(regularUsers)

        // Calculate stats
        const totalUsers = regularUsers.length
        const adminUsers = 0 // Since we're filtering out admins
        const regularUsersCount = regularUsers.length

        setStats({
          totalUsers,
          adminUsers,
          regularUsers: regularUsersCount,
        })
      } else {
        toast.error("Failed to load users")
        setUsers([])
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error(error.response?.data?.message || "Failed to load users")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUsers()
    } else {
      toast.error("No admin token found")
      setLoading(false)
    }
  }, [token])

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      const res = await axios.delete(`http://localhost:5010/api/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        toast.success("User deleted successfully")
        setUsers(users.filter((user) => user._id !== userId))

        // Update stats
        setStats((prev) => ({
          totalUsers: prev.totalUsers - 1,
          adminUsers: prev.adminUsers,
          regularUsers: prev.regularUsers - 1,
        }))
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error(error.response?.data?.message || "Failed to delete user")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading users...</span>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards - Removed Admin Users card since we're not showing them */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Regular Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.regularUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Regular Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={
                          user.profileImage
                            ? `http://localhost:5010/uploads/profileImages/${user.profileImage}`
                            : "https://via.placeholder.com/40x40/4F46E5/ffffff?text=" + (user.name?.charAt(0) || "U")
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium">No regular users found</p>
                      <p className="text-sm">Regular users will appear here once they register</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPanel