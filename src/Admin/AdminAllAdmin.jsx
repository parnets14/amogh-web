import { useEffect, useState } from "react"
import axios from "axios"
import { Trash2, User, Mail, Shield } from "lucide-react"
import { toast } from "react-toastify"

const AdminAllAdmin = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAdmins: 0,
  })

  const token = localStorage.getItem("adminToken")

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:5010/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        const allUsers = res.data.data || []
        // Filter only admin users
        const adminUsers = allUsers.filter(user => user.role === "admin")
        setAdmins(adminUsers)

        // Calculate stats
        const totalAdmins = adminUsers.length

        setStats({
          totalAdmins,
        })
      } else {
        toast.error("Failed to load admins")
        setAdmins([])
      }
    } catch (error) {
      console.error("Error fetching admins:", error)
      toast.error(error.response?.data?.message || "Failed to load admins")
      setAdmins([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchAdmins()
    } else {
      toast.error("No admin token found")
      setLoading(false)
    }
  }, [token])

  const deleteAdmin = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return

    try {
      const res = await axios.delete(`http://localhost:5010/api/auth/users/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        toast.success("Admin deleted successfully")
        setAdmins(admins.filter((admin) => admin._id !== adminId))

        // Update stats
        setStats((prev) => ({
          totalAdmins: prev.totalAdmins - 1,
        }))
      }
    } catch (error) {
      console.error("Error deleting admin:", error)
      toast.error(error.response?.data?.message || "Failed to delete admin")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading admins...</span>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Card */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAdmins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Admin Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th> */}
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
              {Array.isArray(admins) && admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={
                          admin.profileImage
                            ? `http://localhost:5010/uploads/profileImages/${admin.profileImage}`
                            : "https://via.placeholder.com/40x40/4F46E5/ffffff?text=" + (admin.name?.charAt(0) || "A")
                        }
                        alt={admin.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteAdmin(admin._id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                        title="Delete Admin"
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
                      <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium">No admin users found</p>
                      <p className="text-sm">Admin users will appear here once they're created</p>
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

export default AdminAllAdmin