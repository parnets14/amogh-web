import {
  FiGrid,
  FiPackage,
  FiLayers,
  FiShoppingCart,
  FiUsers,
  FiTruck,
  FiPieChart,
  FiSettings,
  FiFileText,
  FiAlertCircle,
  FiDollarSign,
  FiMessageSquare
} from 'react-icons/fi';

const adminNav = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
  { name: "Products", path: "/admin/products", icon: FiPackage },
  { name: "Categories", path: "/admin/categories", icon: FiLayers },
  { name: "Orders", path: "/admin/orders", icon: FiShoppingCart },
  { name: "Customers", path: "/admin/customers", icon: FiUsers },
  { name: "Inventory", path: "/admin/inventory", icon: FiPackage },


  
  { name: "Support Tickets", path: "/admin/support", icon: FiMessageSquare },
  { name: "Settings", path: "/admin/settings", icon: FiSettings }
];

export default adminNav;