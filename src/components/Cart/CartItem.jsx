import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get cart data from Redux store
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = (productId) => {
    return {
      price: 0,
    };
  };

  const handleRemoveFromCart = (instrumentId) => {
    dispatch(removeFromCart(instrumentId));
  };

  const handleUpdateQuantity = (instrumentId, quantity) => {
    dispatch(updateQuantity({ instrumentId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

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

      {items.length === 0 ? (
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
              {items.map((item) => {
                const product = getProduct(item.instrumentId);
                const isMaxQuantity = false;
                
                return (
                  <motion.div
                    key={item.instrumentId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50/50"
                  >
                    <div className="col-span-5 flex items-center">
                      <Link 
                        to={`/products/${item.instrumentId}`}
                        className="flex items-center w-full"
                        aria-label={`View details of ${item.name}`}
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={`http://localhost:5010${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                            {item.name}
                          </h3>
                          {isMaxQuantity && (
                            <p className="text-xs text-amber-600 mt-1">
                              Only {item.stock} available in stock
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-span-2 text-center text-gray-700">
                      ${item.finalPrice?.toFixed(2) || "0.00"}
                    </div>
                    
                    <div className="col-span-2 flex justify-center">
                      <div className="inline-flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleUpdateQuantity(item.instrumentId, item.quantity - 1)}
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
                          onClick={() => handleUpdateQuantity(item.instrumentId, item.quantity + 1)}
                          disabled={isMaxQuantity}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right font-medium text-gray-900">
                      ${item.totalPrice?.toFixed(2) || "0.00"}
                    </div>
                    
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => handleRemoveFromCart(item.instrumentId)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1"
                        aria-label={`Remove ${item.name} from cart`}
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
              {items.map((item) => {
                const product = getProduct(item.instrumentId);
                const isMaxQuantity = false;
                
                return (
                  <motion.div
                    key={item.instrumentId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex">
                      <Link 
                        to={`/products/${item.instrumentId}`}
                        className="flex items-center"
                        aria-label={`View details of ${item.name}`}
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          <img
                            src={`http://localhost:5010${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <Link 
                            to={`/products/${item.instrumentId}`}
                            aria-label={`View details of ${item.name}`}
                          >
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => handleRemoveFromCart(item.instrumentId)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {isMaxQuantity && (
                          <p className="text-xs text-amber-600 mt-1">
                            Only {item.stock} available in stock
                          </p>
                        )}
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            ${item.finalPrice?.toFixed(2) || "0.00"}
                          </span>
                          
                          <div className="inline-flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleUpdateQuantity(item.instrumentId, item.quantity - 1)}
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
                              onClick={() => handleUpdateQuantity(item.instrumentId, item.quantity + 1)}
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
                        ${item.totalPrice?.toFixed(2) || "0.00"}
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
                <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-bold text-lg">
                  ${totalAmount.toFixed(2)}
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
                disabled={items.length === 0}
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