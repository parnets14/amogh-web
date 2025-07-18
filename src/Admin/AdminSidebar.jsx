import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import adminNav from "./adminNav";
import { FiLogOut, FiChevronDown, FiChevronRight } from 'react-icons/fi';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [activeParent, setActiveParent] = useState(null);

  // Group nav items by category if they have a category property
  const groupedNav = adminNav.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  // Auto-expand parent when child is active
  useEffect(() => {
    const activePath = adminNav.find(item => location.pathname.startsWith(item.path));
    if (activePath?.parent) {
      setExpandedItems(prev => ({ ...prev, [activePath.parent]: true }));
      setActiveParent(activePath.parent);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const toggleExpand = (category) => {
    setExpandedItems(prev => ({ ...prev, [category]: !prev[category] }));
    setActiveParent(activeParent === category ? null : category);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transform transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0 md:shadow-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <img
              src="/Amg logo.jpeg"
              alt="Amogh Logo"
              className="h-10 w-10 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">Amogh Medical</h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {Object.entries(groupedNav).map(([category, items]) => (
            <div key={category} className="mb-1">
              {category !== 'General' && (
                <button
                  onClick={() => toggleExpand(category)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    activeParent === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium text-sm uppercase tracking-wider">{category}</span>
                  {expandedItems[category] ? (
                    <FiChevronDown className="w-4 h-4" />
                  ) : (
                    <FiChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              
              <div className={`space-y-1 ml-2 ${category !== 'General' && !expandedItems[category] ? 'hidden' : 'block'}`}>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-100/80 text-blue-700 font-medium shadow-inner"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                  >
                    <item.icon 
                      className={`w-4 h-4 mr-3 ${
                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                      }`} 
                    />
                    <span>{item.name}</span>
                    {isActive(item.path) && (
                      <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              AM
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiLogOut className="mr-2 w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}