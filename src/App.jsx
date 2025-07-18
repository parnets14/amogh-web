import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/Layout/mainLayout";

// User Pages
import Home from "./pages/Home";
import Products from "./components/Products.jsx/product";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageProducts from "./Admin/ManageProducts";
import ManageCategories from "./Admin/ManageCategories";
import AdminOrders from "./Admin/Orders";
import AdminLogin from "./Admin/adminLogin";
import ProductDetail from "./components/Products.jsx/productDetail";
import OrderConfirmation from "./components/orders/orderConfirmation";
import CheckoutPage from "./components/orders/checkout";
import Cart from "./components/Cart/CartItem";
import About from "./pages/about";
import AllMedicalProduct from "./pages/allProduct";
import ProductCategorySection from "./components/Products.jsx/Category";
import ContactPage from "./pages/contact";
import AddProducts from "./Admin/ManageProducts";
import Orders from "./Admin/Orders";
import Inventory from "./Admin/Inventory";
import Settings from "./Admin/setting";

// Admin Pages

function App() {
  return (
    <Routes>
      {/* Main User Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="allproduct" element={<AllMedicalProduct />} />
        <Route path="categories" element={<ProductCategorySection />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="settings" element={<Settings />} />

     
      </Route>
    </Routes>
  );
}

export default App;
