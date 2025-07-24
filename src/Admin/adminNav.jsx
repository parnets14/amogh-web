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
  { name: "All Admin", path: "/admin/allAdmin", icon: FiUsers },
  // { name: "Inventory", path: "/admin/inventory", icon: FiPackage },
  { name: "Banner", path: "/admin/banner", icon: FiPackage },
  { name: "Features", path: "/admin/features", icon: FiPackage },
  { name: "Offer Banner", path: "/admin/offerBanner", icon: FiPackage },
  { name: "Testimonials", path: "/admin/testimonials", icon: FiPackage },
  { name: "Contact Information", path: "/admin/contactInformation", icon: FiPackage },
  { name: "Send a Message", path: "/admin/sendMessage", icon: FiPackage },
  { name: "Our Location", path: "/admin/location", icon: FiPackage },
  { name: "Mission", path: "/admin/mission", icon: FiPackage },
  { name: "Core Values", path: "/admin/coreValues", icon: FiPackage },
  { name: "Leaders", path: "/admin/leaders", icon: FiPackage },
  { name: "About", path: "/admin/about", icon: FiPackage },
 


  
  // { name: "Support Tickets", path: "/admin/support", icon: FiMessageSquare },
  // { name: "Settings", path: "/admin/settings", icon: FiSettings }
];

export default adminNav;