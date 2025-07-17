import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems] = useState(3); // Replace with actual cart state
  const [wishlistItems] = useState(2); // Replace with actual wishlist state

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        

        {/* Main Header */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
           < img 
              src="/Amg logo.jpeg" 
              alt="AMG Logo" 
              className="h-10 mr-2" // Adjust height as needed
            />
            <span className="text-2xl font-bold text-[#01A4D5] hidden sm:inline">Amogh</span>
          </Link>

          {/* Desktop Search - Only visible when searchOpen is true on desktop */}
          {searchOpen && (
            <div className="hidden md:block flex-grow mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Navigation - Hidden when search is open */}
          {!searchOpen && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink 
                to="/" 
                end
                className={({isActive}) => 
                  `py-2 px-1 font-medium transition-colors ${isActive ? 'text-[#01A4D5] border-b-2 border-[#01A4D5]' : 'text-gray-700 hover:text-blue-600'}`
                }
              >
                Home
              </NavLink>
            
             

              <NavLink 
                to="/categories" 
                className={({isActive}) => 
                  `py-2 px-1 font-medium transition-colors ${isActive ? 'text-[#01A4D5] border-b-2 border-[#01A4D5]' : 'text-gray-700 hover:text-[#01A4D5]'}`
                }
              >
                Categories
              </NavLink>
              <NavLink 
                to="/allproduct" 
                className={({isActive}) => 
                  `py-2 px-1 font-medium transition-colors ${isActive ? 'text-[#01A4D5] border-b-2 border-[#01A4D5]' : 'text-gray-700 hover:text-[#01A4D5]'}`
                }
              >
                products
              </NavLink>
             
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  `py-2 px-1 font-medium transition-colors ${isActive ? 'text-[#01A4D5] border-b-2 border-[#01A4D5]' : 'text-gray-700 hover:text-[#01A4D5]'}`
                }
              >
                about Us
              </NavLink>
              <NavLink 
                to="/contect" 
                className={({isActive}) => 
                  `py-2 px-1 font-medium transition-colors ${isActive ? 'text-[#01A4D5] border-b-2 border-[#01A4D5]' : 'text-gray-700 hover:text-[#01A4D5]'}`
                }
              >
                contect
              </NavLink>
            </nav>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Icon - Toggle search bar */}
            <button 
              className={`text-gray-700 hover:text-[#01A4D5] transition-colors ${searchOpen ? 'md:hidden' : ''}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <FiHeart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link to="/login" className="hidden sm:block text-gray-700 hover:text-blue-600 transition-colors">
              <FiUser className="w-5 h-5" />
            </Link>

            {/* Cart with badge */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Appears when searchOpen is true on mobile */}
        {searchOpen && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-b-lg">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/" 
                end
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/categories" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                Categories
              </NavLink>
              <NavLink 
                to="/allproduct" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                product
              </NavLink>
              <NavLink 
                to="/contect" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                contect
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                about
              </NavLink>
              <NavLink 
                to="/account" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                My Account
              </NavLink>
              <NavLink 
                to="/wishlist" 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `py-2 px-3 rounded-lg font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                Wishlist
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}