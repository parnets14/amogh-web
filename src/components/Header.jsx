

import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart, FiLogOut } from "react-icons/fi"
import { useSelector } from "react-redux"
import { selectCartTotalQuantity } from "../redux/cartSlice"
import axios from "axios"

export default function Header({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [wishlistItems] = useState(2) // Replace with dynamic count

  // Get cart items count from Redux store
  const cartItemsCount = useSelector(selectCartTotalQuantity)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: "Guest",
    avatar: "/Amg logo.jpeg",
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setIsLoggedIn(false)
        setLoading(false)
        return
      }

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const response = await axios.get("http://localhost:5010/api/auth/me")
      const userData = response.data?.data || response.data?.user || response.data

      if (userData) {
        const profileImageUrl =
          userData.profileImage && userData.profileImage !== "default.jpg"
            ? `http://localhost:5010/uploads/profileImages/${userData.profileImage}`
            : "/placeholder.svg"

        setUser({
          name: userData.name,
          avatar: profileImageUrl,
          email: userData.email,
          role: userData.role,
        })
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      // If token is invalid, remove it
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
      }
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
    setUser({ name: "Guest", avatar: "/Amg logo.jpeg" })
    navigate("/")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Pass search term to parent component or navigate to products page with search
      if (onSearch) {
        onSearch(searchTerm)
      }
      // Navigate to products page with search parameter
      navigate(`/allproduct?search=${encodeURIComponent(searchTerm)}`)
      setSearchOpen(false)
      setSearchTerm("")
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/Amg logo.jpeg" alt="Logo" className="h-10 mr-2" />
            <span className="text-2xl font-bold text-[#01A4D5] hidden sm:inline">Amogh</span>
          </Link>

          {/* Search input (desktop only) */}
          {searchOpen && (
            <div className="hidden md:block flex-grow mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5]"
                  autoFocus
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <button type="submit" className="p-1 text-[#01A4D5] hover:text-[#01A4e9] transition-colors">
                    <FiSearch size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchTerm("")
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Nav links (desktop only) */}
          {!searchOpen && (
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-[#01A4D5] border-b-2 border-[#01A4D5]" : "text-gray-700 hover:text-[#01A4D5]"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-[#01A4D5] border-b-2 border-[#01A4D5]" : "text-gray-700 hover:text-[#01A4D5]"}`
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/allproduct"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-[#01A4D5] border-b-2 border-[#01A4D5]" : "text-gray-700 hover:text-[#01A4D5]"}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-[#01A4D5] border-b-2 border-[#01A4D5]" : "text-gray-700 hover:text-[#01A4D5]"}`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-[#01A4D5] border-b-2 border-[#01A4D5]" : "text-gray-700 hover:text-[#01A4D5]"}`
                }
              >
                Contact
              </NavLink>
            </nav>
          )}

          {/* Right side icons */}
          <div className="flex items-center space-x-5">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-[#01A4D5] transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {/* <Link to="/wishlist" className="relative text-gray-700 hover:text-[#01A4D5] transition-colors">
              <FiHeart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#01A4D5] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link> */}

            {/* User Profile / Login */}
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : isLoggedIn ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none transition-transform hover:scale-105"
                >
                  <img
                    src={user.avatar || "/Amg logo.jpeg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 hover:border-[#01A4D5] transition-colors"
                    onError={(e) => {
                      e.currentTarget.src = "/Amg logo.jpeg"
                    }}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Hi, {user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUser className="mr-3 w-4 h-4" />
                      My Account
                    </Link>

                    {/* <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiShoppingCart className="mr-3 w-4 h-4" />
                      My Orders
                    </Link> */}

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="mr-3 w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-[#01A4D5] transition-colors">
                <FiUser className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline text-sm">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-[#01A4D5] transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-[#01A4D5] transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5]"
                autoFocus
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button type="submit" className="p-1 text-[#01A4D5] hover:text-[#01A4e9] transition-colors">
                  <FiSearch size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchTerm("")
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-b-lg border-t border-gray-100 mt-4">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                Categories
              </NavLink>
              <NavLink
                to="/allproduct"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                Contact
              </NavLink>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Signed in as <span className="font-medium text-gray-700">{user.name}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <FiUser className="mr-2 w-4 h-4" />
                    My Account
                  </Link>
                  {/* <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <FiShoppingCart className="mr-2 w-4 h-4" />
                    My Orders
                  </Link> */}
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <FiShoppingCart className="mr-2 w-4 h-4" />
                    Cart ({cartItemsCount})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center transition-colors w-full text-left"
                  >
                    <FiLogOut className="mr-2 w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <FiUser className="mr-2 w-4 h-4" />
                  Login/Sign Up
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
