
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Check, Heart, Zap, Info, Search, Filter, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AllProducts() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [medicalProducts, setMedicalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5010/api/products");
      console.log("API response:", res.data);
      setMedicalProducts(res.data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  };

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5010/api/categories");
      console.log("Categories response:", res.data);
      setCategories(res.data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      // Fallback: extract categories from products if API fails
      const uniqueCategories = [...new Set(medicalProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAllProducts(), fetchAllCategories()]);
      setLoading(false);
    };
    
    loadData();
    window.scrollTo(0, 0);
  }, []);

  // Update categories when products change (fallback method)
  useEffect(() => {
    if (medicalProducts.length > 0 && categories.length === 0) {
      const uniqueCategories = [...new Set(medicalProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [medicalProducts, categories.length]);

  const addToCart = (productId) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      setAddedItems({ ...addedItems, [productId]: true });
      setTimeout(() => {
        setAddedItems({ ...addedItems, [productId]: false });
      }, 2000);
    }
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

   const getImageUrl = (path) => {
    if (!path) return '/placeholder-product.png'; // Add a placeholder image
    if (path.startsWith('http')) return path;
    return `http://localhost:5010${path}`;
  }; 

  // Filter products based on search term, category, and price range
  const filteredProducts = medicalProducts.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.technology?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle category filtering - check if product.category matches selected category ID or name
    const matchesCategory = selectedCategory === "all" || 
                           product.category === selectedCategory ||
                           product.categoryId === selectedCategory;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading products and categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#01A4D5] hover:text-[#01A4D5] cursor-pointer mb-6 transition-colors duration-200"
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option 
                    key={category._id || category.id || category} 
                    value={category._id || category.id || category}
                  >
                    {category.name || category}
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
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredProducts.length} of {medicalProducts.length} products
          {selectedCategory !== "all" && (
            <span className="ml-2 text-indigo-600">
              in "{categories.find(cat => 
                (cat._id || cat.id || cat) === selectedCategory
              )?.name || selectedCategory}"
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id || product.id}
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
                onClick={() => toggleWishlist(product._id || product.id)}
                className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200 ${
                  wishlist.includes(product._id || product.id)
                    ? "text-red-500 bg-white shadow-md animate-pulse"
                    : "text-gray-400 bg-white/80 hover:bg-white hover:text-red-500"
                }`}
              >
                <Heart
                  size={18}
                  fill={wishlist.includes(product._id || product.id) ? "currentColor" : "none"}
                />
              </button>

              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 p-3 flex items-center justify-center">
                  <img
                      src={getImageUrl(product.images?.[0]?.url)}
                      alt={product.name}
                 
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product Body */}
              <div className="p-4 flex-grow flex flex-col">
                <span
                  className={`text-xs font-semibold mb-1.5 tracking-wide ${
                    product.category === "Clinical Chemistry"
                      ? "text-indigo-500"
                      : product.category === "Hematology"
                        ? "text-purple-500"
                        : "text-green-500"
                  }`}
                >
                  {(typeof product.category === 'object' ? product.category.name : product.category)?.toUpperCase()}
                </span>

                <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                  <Link
                    to={`/products/${product.slug || product._id}`}
                    className="hover:text-indigo-500 transition-colors duration-200"
                  >
                    {product.name}
                  </Link>
                </h3>

                <div className="mb-3 space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-start">
                    <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-700">Technology: </strong>
                      <span>{product.technology}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-700">Throughput: </strong>
                      <span>{product.throughput}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Starting at</p>
                      <p className="text-base font-semibold text-indigo-600">
                        ${product.price?.toLocaleString()}
                      </p>
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
                      {product.stock > 3
                        ? "In Stock"
                        : product.stock > 0
                          ? `${product.stock} Left`
                          : "Out of Stock"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product._id || product.id)}
                      disabled={product.stock === 0 || cart.includes(product._id || product.id)}
                      className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                        addedItems[product._id || product.id]
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : cart.includes(product._id || product.id)
                            ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                            : product.stock === 0
                              ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                              : "bg-[#01A4D5] hover:bg-[#01A4e9] cursor-pointer text-white hover:shadow-sm"
                      }`}
                    >
                      {addedItems[product._id || product.id] ? (
                        <>
                          <Check size={16} className="mr-1" /> Added
                        </>
                      ) : cart.includes(product._id || product.id) ? (
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
                      to={`/products/${product._id || product.id}`}
                      className="flex items-center justify-center py-2 px-3 border border-[#01A4D5] text-[#01A4D5] rounded-md text-xs font-medium transition-all duration-200 hover:shadow-sm"
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
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}