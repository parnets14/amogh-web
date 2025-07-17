import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Admin/AdminSidebar";
import AdminHeader from "../../Admin/AdminHeader";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Header */}
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}