import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy medical products data
const medicalProducts = [
  {
    id: 1,
    name: "Premium Blood Pressure Monitor",
    slug: "premium-blood-pressure-monitor",
    category: "Diagnostic Equipment",
    price: 89.99,
    stock: 15,
    image: "https://via.placeholder.com/300?text=BP+Monitor",
    description: "Clinically validated automatic blood pressure monitor with advanced accuracy."
  },
  {
    id: 2,
    name: "Digital Thermometer Pro",
    slug: "digital-thermometer-pro",
    category: "Diagnostic Equipment",
    price: 24.95,
    stock: 42,
    image: "https://via.placeholder.com/300?text=Thermometer",
    description: "Fast and accurate digital thermometer with fever indicator."
  },
  {
    id: 3,
    name: "First Aid Kit Deluxe",
    slug: "first-aid-kit-deluxe",
    category: "First Aid",
    price: 49.99,
    stock: 8,
    image: "https://via.placeholder.com/300?text=First+Aid",
    description: "Comprehensive first aid kit for home or workplace with 150 pieces."
  },
  {
    id: 4,
    name: "Nebulizer Machine",
    slug: "nebulizer-machine",
    category: "Respiratory Care",
    price: 59.99,
    stock: 12,
    image: "https://via.placeholder.com/300?text=Nebulizer",
    description: "Quiet and efficient nebulizer for quick relief from respiratory conditions."
  },
  {
    id: 5,
    name: "Orthopedic Knee Brace",
    slug: "orthopedic-knee-brace",
    category: "Support Braces",
    price: 34.99,
    stock: 25,
    image: "https://via.placeholder.com/300?text=Knee+Brace",
    description: "Adjustable knee support with stabilizers for pain relief and injury recovery."
  }
];

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // If no cart exists, initialize with some dummy items for demonstration
    if (storedCart.length === 0) {
      const demoCart = [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 }
      ];
      setCart(demoCart);
      localStorage.setItem("cart", JSON.stringify(demoCart));
    } else {
      setCart(storedCart);
    }
    setIsLoading(false);
  }, []);

  // Update local storage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(item.quantity + delta, getProductStock(productId))
              )
            }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getProduct = (productId) => {
    return medicalProducts.find((p) => p.id === productId) || {};
  };

  const getProductStock = (productId) => {
    const product = getProduct(productId);
    return product.stock || 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.id);
      return total + (product.price || 0) * item.quantity;
    }, 0);
  };

  const calculateItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="animate-pulse text-gray-400">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        <nav aria-label="Breadcrumb" className="flex mt-2">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-indigo-600 hover:text-indigo-800" aria-label="Home">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>
      </div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Continue shopping"
          >
            Continue Shopping <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b border-gray-200">
              <div className="col-span-5">
                <span className="text-sm font-medium text-gray-600">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-600">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-medium text-gray-600">Subtotal</span>
              </div>
              <div className="col-span-1"></div>
            </div>
            
            <AnimatePresence>
              {cart.map((item) => {
                const product = getProduct(item.id);
                const stock = getProductStock(item.id);
                const isMaxQuantity = item.quantity >= stock;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50/50"
                  >
                    <div className="col-span-5 flex items-center">
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={product.image || "https://via.placeholder.com/80?text=Product"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-4">
                        <Link
                          to={`/products/${product.slug}`}
                          className="text-base font-medium text-gray-900 hover:text-indigo-600 line-clamp-2"
                          aria-label={`View details for ${product.name}`}
                        >
                          {product.name || "Unknown Product"}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{product.category || "N/A"}</p>
                        {isMaxQuantity && (
                          <p className="text-xs text-amber-600 mt-1">
                            Only {stock} available in stock
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center text-gray-700">
                      ${product.price?.toFixed(2) || "0.00"}
                    </div>
                    
                    <div className="col-span-2 flex justify-center">
                      <div className="inline-flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={isMaxQuantity}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right font-medium text-gray-900">
                      ${((product.price || 0) * item.quantity).toFixed(2)}
                    </div>
                    
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            <AnimatePresence>
              {cart.map((item) => {
                const product = getProduct(item.id);
                const stock = getProductStock(item.id);
                const isMaxQuantity = item.quantity >= stock;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex">
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={product.image || "https://via.placeholder.com/80?text=Product"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <Link
                            to={`/products/${product.slug}`}
                            className="text-base font-medium text-gray-900 hover:text-indigo-600 line-clamp-2"
                            aria-label={`View details for ${product.name}`}
                          >
                            {product.name || "Unknown Product"}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{product.category || "N/A"}</p>
                        {isMaxQuantity && (
                          <p className="text-xs text-amber-600 mt-1">
                            Only {stock} available in stock
                          </p>
                        )}
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            ${product.price?.toFixed(2) || "0.00"}
                          </span>
                          
                          <div className="inline-flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={isMaxQuantity}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-base font-medium text-gray-900">
                        ${((product.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({calculateItemsCount()} items)</span>
                <span className="font-medium">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-bold text-lg">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="flex-1 text-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                aria-label="Continue shopping"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => navigate("/checkout")}
                disabled={cart.length === 0}
                className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Taxes calculated at checkout
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}