import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import adminNav from "./adminNav";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-40 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="/Amg logo.jpeg"
              alt="Amogh Logo"
              className="h-12 w-12  object-cover  border-gray-200"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Amogh</h2>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              {item.icon && (
                <item.icon 
                  className={`w-5 h-5 mr-3 ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-500"
                  }`} 
                />
              )}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200 shadow-sm"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}