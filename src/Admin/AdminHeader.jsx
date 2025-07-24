import { Menu, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminHeader({ toggleSidebar }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch admin name from localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const name = localStorage.getItem("adminName");
    if (token && name) {
      setAdminName(name);
    }
  }, []);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-30">
      {/* Left - Logo and menu */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center space-x-3">
          <img
            src="/Amg logo.jpeg"
            alt="Amogh Logo"
            className="h-8 w-8 object-cover border-gray-200 md:hidden"
          />
          <h1 className="text-xl font-bold text-gray-800 md:hidden">Amogh</h1>
        </div>
      </div>

      {/* Right - Admin info */}
      <div className="relative">
        <div className="flex items-center space-x-3">
          {/* <span className="hidden sm:inline text-sm text-gray-600 font-medium">
            Welcome, {adminName?.split(" ")[0] || "Admin"}
          </span> */}

          <div
            className="relative cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(adminName)}
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <div className="font-medium">{adminName}</div>
              <div className="text-gray-500">admin@amogh.com</div>
            </div> */}

            {/* <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/admin/profile");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <User size={16} />
              <span>Profile</span>
            </button> */}

            <button
              onClick={() => {
                setShowDropdown(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}
