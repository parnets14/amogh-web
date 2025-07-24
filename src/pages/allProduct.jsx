

import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ShoppingCart, Check, Heart, Zap, Info, Search, Filter, ArrowLeft, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, selectCartItems } from "../redux/cartSlice"
import axios from "axios"

export default function AllProducts() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const [searchParams, setSearchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [addedItems, setAddedItems] = useState({})
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [medicalProducts, setMedicalProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5010/api/products")
      setMedicalProducts(res.data.products || [])
      console.log(res.data.products,"k.k.k.k.k")
    } catch (error) {
      console.error("Fetch products error:", error)
    }
  }

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5010/api/categories")
      setCategories(res.data || [])
    } catch (error) {
      console.error("Fetch categories error:", error)
      // Fallback: extract categories from products
      const uniqueCategories = [
        ...new Set(
          medicalProducts.map((product) => {
            if (typeof product.category === "object") {
              return { _id: product.category._id, name: product.category.name }
            }
            return { _id: product.category, name: product.category }
          }),
        ),
      ]
      setCategories(uniqueCategories.filter((cat) => cat._id))
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchAllProducts(), fetchAllCategories()])
      setLoading(false)
    }

    loadData()
    window.scrollTo(0, 0)
  }, [])

  // Update search term from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get("search")
    const categoryFromUrl = searchParams.get("category")

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Update categories when products change (fallback method)
  useEffect(() => {
    if (medicalProducts.length > 0 && categories.length === 0) {
      const uniqueCategories = [
        ...new Set(
          medicalProducts.map((product) => {
            if (typeof product.category === "object") {
              return { _id: product.category._id, name: product.category.name }
            }
            return { _id: product.category, name: product.category }
          }),
        ),
      ]
      setCategories(uniqueCategories.filter((cat) => cat._id))
    }
  }, [medicalProducts, categories.length])

  const handleAddToCart = (product) => {
    const cartItem = {
      productId: product._id,
      instrumentId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.url || "",
      discount: 0,
      tax: 0,
      deliveryFee: 0,
      finalPrice: product.price,
      totalPrice: product.price,
      stock: product.stock || 999,
    }

    dispatch(addToCart(cartItem))

    // Show "Added" feedback
    setAddedItems({ ...addedItems, [product._id]: true })
    setTimeout(() => {
      setAddedItems({ ...addedItems, [product._id]: false })
    }, 2000)
  }

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const getImageUrl = (path) => {
    if (!path) return "/placeholder-product.png"
    if (path.startsWith("http")) return path
    return `http://localhost:5010${path}`
  }

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.instrumentId === productId)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete("search")
    setSearchParams(newSearchParams)
  }

  // Clear category filter
  const clearCategory = () => {
    setSelectedCategory("all")
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete("category")
    setSearchParams(newSearchParams)
  }

  // Filter products based on search term, category, and price range
  const filteredProducts = medicalProducts.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())

    // Handle category filtering
    const matchesCategory =
      selectedCategory === "all" ||
      (typeof product.category === "object"
        ? product.category._id === selectedCategory
        : product.category === selectedCategory)

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  if (loading) {
    return (
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01A4D5]"></div>
          <span className="ml-3 text-gray-600">Loading products and categories...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#01A4D5] hover:text-[#01A4e9] cursor-pointer mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-[#01A4D5] sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-[#01A4D5] sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="w-full accent-[#01A4D5]"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full accent-[#01A4D5]"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#01A4D5] text-white">
                  Search: "{searchTerm}"
                  <button onClick={clearSearch} className="ml-2 hover:text-gray-200">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Category: {categories.find((cat) => cat._id === selectedCategory)?.name}
                  <button onClick={clearCategory} className="ml-2 hover:text-green-600">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredProducts.length} of {medicalProducts.length} products
          {searchTerm && <span className="ml-2 text-[#01A4D5]">for "{searchTerm}"</span>}
          {selectedCategory !== "all" && (
            <span className="ml-2 text-green-600">
              in "{categories.find((cat) => cat._id === selectedCategory)?.name}"
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group"
            >
              {/* Product Badges */}
              <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1.5">
                {product.isNew && (
                  <span className="bg-indigo-500 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
                    NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-amber-400 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200 ${
                  wishlist.includes(product._id)
                    ? "text-red-500 bg-white shadow-md animate-pulse"
                    : "text-gray-400 bg-white/80 hover:bg-white hover:text-red-500"
                }`}
              >
                <Heart size={18} fill={wishlist.includes(product._id) ? "currentColor" : "none"} />
              </button>

              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 p-3 flex items-center justify-center">
                <img
                  src={getImageUrl(product.images?.[0]?.url) || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product Body */}
              <div className="p-4 flex-grow flex flex-col">
                {/* <span
                  className={`text-xs font-semibold mb-1.5 tracking-wide ${
                    product.category === "Clinical Chemistry"
                      ? "text-indigo-500"
                      : product.category === "Hematology"
                        ? "text-purple-500"
                        : "text-green-500"
                  }`}
                >
                  {(typeof product.category === "object" ? product.category.name : product.category)?.toUpperCase()}
                </span> */}

                <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                  <Link
                    to={`/products/${product.slug || product._id}`}
                    className="hover:text-[#01A4D5] transition-colors duration-200"
                  >
                    {product.name}
                  </Link>
                </h3>

                <div className="mb-3 space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-start">
                    <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-700">Brand: </strong>
                      <span>{product.brand}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-700">Warranty: </strong>
                      <span>{product.warranty}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Starting at</p>
                      <p className="text-base font-semibold text-[#01A4D5]">${product.price?.toLocaleString()}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        product.stock > 3
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 3 ? "In Stock" : product.stock > 0 ? `${product.stock} Left` : "Out of Stock"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0 || isInCart(product._id)}
                      className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                        addedItems[product._id]
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : isInCart(product._id)
                            ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                            : product.stock === 0
                              ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                              : "bg-[#01A4D5] hover:bg-[#01A4e9] cursor-pointer text-white hover:shadow-sm"
                      }`}
                    >
                      {addedItems[product._id] ? (
                        <>
                          <Check size={16} className="mr-1" /> Added
                        </>
                      ) : isInCart(product._id) ? (
                        "In Cart"
                      ) : product.stock === 0 ? (
                        "Sold Out"
                      ) : (
                        <>
                          <ShoppingCart size={16} className="mr-1" /> Add to Cart
                        </>
                      )}
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="flex items-center justify-center py-2 px-3 border border-[#01A4D5] text-[#01A4D5] rounded-md text-xs font-medium transition-all duration-200 hover:shadow-sm hover:bg-[#01A4D5] hover:text-white"
                    >
                      <Info size={16} className="mr-1" /> Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? `No products match "${searchTerm}"` : "Try adjusting your search or filter criteria"}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSearchParams({})
                }}
                className="px-4 py-2 bg-[#01A4D5] text-white rounded-lg hover:bg-[#01A4e9] transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
