import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check, Heart, Zap, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { medicalProducts } from "./productData";

export default function MedicalProductCarousel() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2); // Default to 2 for mobile
  const [isHovering, setIsHovering] = useState(false);

  // Responsive slides calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(4); // xl screens show 4
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // lg screens show 3
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2); // sm screens show 2
      } else {
        setSlidesToShow(2); // xs screens show 1
      }
      // Reset to first slide when screen size changes to prevent empty space
      setCurrentSlide(0);
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= medicalProducts.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? medicalProducts.length - slidesToShow : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      nextSlide();
    }

    if (touchStart - touchEnd < -100) {
      prevSlide();
    }
  };

  // Auto-rotate slides when not hovering
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [slidesToShow, isHovering]);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Latest Projects</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Explore our newest medical equipment solutions
        </p>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 ml-2 hover:bg-indigo-50"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} className="text-indigo-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 mr-2 hover:bg-indigo-50"
            aria-label="Next products"
          >
            <ChevronRight size={24} className="text-indigo-600" />
          </button>

          {/* Carousel Container */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              width: `${(medicalProducts.length * 100) / slidesToShow}%`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {medicalProducts.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden">
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
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200 ${
                      wishlist.includes(product.id)
                        ? "text-red-500 bg-white shadow-md"
                        : "text-gray-400 bg-white/80 hover:bg-white hover:text-red-500"
                    }`}
                    aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-50 p-3 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Body */}
                  <div className="p-4 flex-grow flex flex-col">
                    {/* Category */}
                    <span
                      className={`text-xs font-semibold mb-1.5 tracking-wide ${
                        product.category === "Clinical Chemistry"
                          ? "text-indigo-500"
                          : product.category === "Hematology"
                            ? "text-purple-500"
                            : "text-green-500"
                      }`}
                    >
                      {product.category.toUpperCase()}
                    </span>

                    {/* Product Name */}
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                      <Link
                        to={`/products/${product.slug}`}
                        className="hover:text-indigo-500 transition-colors duration-200"
                        title={product.name}
                      >
                        {product.name}
                      </Link>
                    </h3>

                    {/* Key Specs */}
                    <div className="mb-3 space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-start">
                        <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                        <div className="truncate" title={product.technology}>
                          <strong className="text-gray-700">Technology: </strong>
                          <span>{product.technology}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Zap className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                        <div className="truncate" title={product.throughput}>
                          <strong className="text-gray-700">Throughput: </strong>
                          <span>{product.throughput}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Info className="w-3.5 h-3.5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                        <div className="truncate" title={product.sampleType}>
                          <strong className="text-gray-700">Sample: </strong>
                          <span>{product.sampleType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Starting at</p>
                          <p className="text-base font-semibold text-indigo-600">
                            ${product.price.toLocaleString()}
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
                          onClick={() => addToCart(product.id)}
                          disabled={product.stock === 0 || cart.includes(product.id)}
                          className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                            addedItems[product.id]
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : cart.includes(product.id)
                                ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                                : product.stock === 0
                                  ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                                  : "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-sm"
                          }`}
                          aria-label={
                            addedItems[product.id]
                              ? "Added to cart"
                              : cart.includes(product.id)
                                ? "Already in cart"
                                : product.stock === 0
                                  ? "Out of stock"
                                  : "Add to cart"
                          }
                        >
                          {addedItems[product.id] ? (
                            <>
                              <Check size={16} className="mr-1" /> Added
                            </>
                          ) : cart.includes(product.id) ? (
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
                          to={`/products/${product.slug}`}
                          className="flex items-center justify-center py-2 px-3 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 rounded-md text-xs font-medium transition-all duration-200 hover:shadow-sm"
                          aria-label={`View details for ${product.name}`}
                        >
                          <Info size={16} className="mr-1" /> Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(medicalProducts.length / slidesToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * slidesToShow)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide >= index * slidesToShow && currentSlide < (index + 1) * slidesToShow
                  ? "bg-indigo-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}