// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, Check, Heart, Zap, Info, ChevronLeft, ChevronRight } from "lucide-react";
// // import { medicalProducts } from "./productData";
// import axios from "axios";

// export default function MedicalProductCarousel() {
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [addedItems, setAddedItems] = useState({});
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [slidesToShow, setSlidesToShow] = useState(2); // Default to 2 for all responsive sizes
//   const [medicalProducts,setMedicalProducts]=useState([]);


// const fachAllProducts = async () => {
//   try {
//     const res = await axios.get("http://localhost:5010/api/products");

//     // Make sure you're setting the correct array
//     // Adjust according to actual API structure
//     const productsArray = Array.isArray(res.data)
//       ? res.data
//       : res.data.products || [];

//     setMedicalProducts(productsArray);
//   } catch (error) {
//     console.log("Error fetching products:", error);
//   }
  
// };
//   useEffect(()=>{
//     fachAllProducts();

//   },[])
  

//   // Responsive slides calculation
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1280) {
//         setSlidesToShow(4); // xl screens show 4
//       } else if (window.innerWidth >= 1024) {
//         setSlidesToShow(3); // lg screens show 3
//       } else {
//         setSlidesToShow(2); // sm and smaller screens show 2
//       }
//       setCurrentSlide(0);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const addToCart = (productId) => {
//     if (!cart.includes(productId)) {
//       setCart([...cart, productId]);
//       setAddedItems({ ...addedItems, [productId]: true });
//       setTimeout(() => {
//         setAddedItems({ ...addedItems, [productId]: false });
//       }, 2000);
//     }
//   };

//   const toggleWishlist = (productId) => {
//     if (wishlist.includes(productId)) {
//       setWishlist(wishlist.filter((id) => id !== productId));
//     } else {
//       setWishlist([...wishlist, productId]);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => 
//       prev >= medicalProducts.length - slidesToShow ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => 
//       prev <= 0 ? medicalProducts.length - slidesToShow : prev - 1
//     );
//   };

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 100) {
//       nextSlide();
//     }
//     if (touchStart - touchEnd < -100) {
//       prevSlide();
//     }
//   };

//   // Auto-rotate slides
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slidesToShow]);

//   return (
//     <div className="w-full py-8  px-4 sm:px-6 lg:px-8 relative bg-gray-50 ">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-center sm:text-left">
//             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Latest Products</h2>
//             <p className="text-gray-600 text-sm sm:text-base mt-1 hidden sm:block">
//               Explore our newest medical equipment solutions
//             </p>
//           </div>
//           <Link
//             to="/allproduct"
//             className=" sm:flex items-center justify-center py-2 px-4 border border-[#01A4D5] text-[#01A4D5] hover:bg-indigo-50 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-sm"
//             aria-label="View all products"
//           >
//             View All
//           </Link>
//         </div>
        
//         <div className="relative overflow-hidden">
//           {/* Navigation Arrows */}
//           <button 
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 sm:ml-2"
//             aria-label="Previous products"
//           >
//             <ChevronLeft size={20} className="text-indigo-600" />
//           </button>
          
//           <button 
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 sm:mr-2"
//             aria-label="Next products"
//           >
//             <ChevronRight size={20} className="text-indigo-600" />
//           </button>

//           {/* Carousel Container */}
//           <div 
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {medicalProducts.map((product) => (
//               <div 
//                 key={product._id}
//                 className="flex-shrink-0 px-1 sm:px-2"
//                 style={{ width: `${100 / slidesToShow}%` }}
//               >
//                 <div className="bg-white rounded-lg  hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden">
//                   {/* Product Badges */}
//                   <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
//                     {product.isNew && (
//                       <span className="bg-indigo-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
//                         NEW
//                       </span>
//                     )}
//                     {product.isFeatured && (
//                       <span className="bg-amber-400 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
//                         FEATURED
//                       </span>
//                     )}
//                   </div>

//                   {/* Wishlist Button */}
//                   <button
//                     onClick={() => toggleWishlist(product._id)}
//                     className={`absolute top-2 right-2 z-10 p-1 rounded-full transition-all duration-200 ${
//                       wishlist.includes(product._id)
//                         ? "text-red-500 bg-white shadow-md animate-pulse"
//                         : "text-gray-400 bg-white/80 hover:bg-white hover:text-red-500"
//                     }`}
//                     aria-label={wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
//                   >
//                     <Heart
//                       size={16}
//                       fill={wishlist.includes(product._id) ? "currentColor" : "none"}
//                     />
//                   </button>

//                   {/* Product Image */}
//                   <div className="relative h-40 sm:h-48 bg-gray-50 p-2 sm:p-3 flex items-center justify-center">
//                     <img
//                       src={`http://localhost:5010${product.images?.[0]?.url}`}
//                       alt={product.name}
//                       className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </div>

//                   {/* Product Body */}
//                   <div className="p-3 sm:p-4 flex-grow flex flex-col">
//                     {/* Category */}
//                     <span
//                       className={`text-xs font-semibold mb-1 tracking-wide ${
//                         product.category === "Clinical Chemistry"
//                           ? "text-indigo-500"
//                           : product.category === "Hematology"
//                             ? "text-purple-500"
//                             : "text-green-500"
//                       }`}
//                     >
//                       {product.category.toUpperCase()}
//                     </span>

//                     {/* Product Name */}
//                     <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem]">
//                       <Link
//                         to={`/products/${product._id}`}
//                         className="hover:text-indigo-500 transition-colors duration-200"
//                       >
//                         {product.name}
//                       </Link>
//                     </h3>

//                     {/* Key Specs */}
//                     <div className="mb-2 sm:mb-3 space-y-1 text-xs sm:text-sm text-gray-600 hidden sm:block">
//                       <div className="flex items-start">
//                         <Zap className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
//                         <div>
//                           <strong className="text-gray-700">Technology: </strong>
//                           <span>
//                             {product.technology}
                            
//                             </span>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <Zap className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
//                         <div>
//                           <strong className="text-gray-700">Throughput: </strong>
//                           <span>{product.throughput}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <Info className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
//                         <div>
//                           <strong className="text-gray-700">Sample: </strong>
//                           <span>{product.sampleType}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price & CTA */}
//                     <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100">
//                       <div className="flex justify-between items-center mb-2 sm:mb-3">
//                         <div>
//                           <p className="text-xs text-gray-500 hidden sm:block">Starting at</p>
//                           <p className="text-sm sm:text-base font-semibold text-indigo-600">
//                             ${product.price.toLocaleString()}
//                           </p>
//                         </div>
//                         <span
//                           className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${
//                             product.stock > 3
//                               ? "bg-green-100 text-green-700"
//                               : product.stock > 0
//                                 ? "bg-amber-100 text-amber-700"
//                                 : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {product.stock > 3
//                             ? "In Stock"
//                             : product.stock > 0
//                               ? `${product.stock} Left`
//                               : "Out of Stock"}
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-2 gap-1 sm:gap-2">
//                         <button
//                           onClick={() => addToCart(product._id)}
//                           disabled={product.stock === 0 || cart.includes(product.id)}
//                           className={`flex items-center justify-center py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-md text-[0.65rem] sm:text-xs font-medium transition-all duration-200 ${
//                             addedItems[product._id]
//                               ? "bg-green-100 text-green-700 border border-green-200"
//                               : cart.includes(product._id)
//                                 ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
//                                 : product.stock === 0
//                                   ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
//                                   : "bg-[#01A4D5] hover:bg-[#01A4D5] text-white hover:shadow-sm"
//                           }`}
//                           aria-label={
//                             addedItems[product._id]
//                               ? "Added to cart"
//                               : cart.includes(product._id)
//                                 ? "Already in cart"
//                                 : product.stock === 0
//                                   ? "Out of stock"
//                                   : "Add to cart"
//                           }
//                         >
//                           {addedItems[product._id] ? (
//                             <>
//                               <Check size={14} className="mr-0.5 sm:mr-1" /> Added
//                             </>
//                           ) : cart.includes(product.id) ? (
//                             "In Cart"
//                           ) : product.stock === 0 ? (
//                             "Sold Out"
//                           ) : (
//                             <>
//                               <ShoppingCart size={14} className="mr-0.5 sm:mr-1" /> Add
//                             </>
//                           )}
//                         </button>
//                         <Link
                         
//                           to={`/products/${product._id}`}
//                           className="flex items-center justify-center py-1.5 sm:py-2 px-1.5 sm:px-3 border border-[#01A4D5] text-[#01A4D5]  rounded-md text-[0.65rem] sm:text-xs font-medium transition-all duration-200 hover:shadow-sm"
//                           aria-label={`View details for ${product._id}`}
//                         >
                          
//                           <Info size={14} className="mr-0.5 sm:mr-1" /> Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

       

//         {/* View All Button for Mobile */}
//         {/* <div className="sm:hidden mt-4 text-center">
//           <Link
//             to="/allproduct"
//             className="flex items-center justify-center py-1.5 px-3 border border-[#01A4D5] text-[#01A4D5] hover:bg-indigo-50 rounded-md text-[0.65rem] font-medium transition-all duration-200 hover:shadow-sm"
//             aria-label="View all products"
//           >
//             View All
//           </Link>
//         </div> */}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check, Heart, Zap, Info, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function MedicalProductCarousel() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [medicalProducts, setMedicalProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5010/api/products");
      const productsArray = Array.isArray(res.data) ? res.data : res.data?.products || [];
      setMedicalProducts(productsArray);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

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
        setSlidesToShow(1); // xs screens show 1
      }
      setCurrentSlide(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev >= medicalProducts.length - slidesToShow ? 0 : prev + 1
    );
  }, [medicalProducts.length, slidesToShow]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev <= 0 ? medicalProducts.length - slidesToShow : prev - 1
    );
  }, [medicalProducts.length, slidesToShow]);

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

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getImageUrl = (path) => {
    if (!path) return '/placeholder-product.png'; // Add a placeholder image
    if (path.startsWith('http')) return path;
    return `http://localhost:5010${path}`;
  };

  if (isLoading) {
    return (
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01A4D5]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchAllProducts}
              className="bg-[#01A4D5] text-white px-4 py-2 rounded-md hover:bg-[#0187b3] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (medicalProducts.length === 0) {
    return (
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500">No products available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Latest Products</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1 hidden sm:block">
              Explore our newest medical equipment solutions
            </p>
          </div>
          <Link
            to="/allproduct"
            className="flex items-center justify-center py-2 px-4 border border-[#01A4D5] text-[#01A4D5] hover:bg-indigo-50 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-sm"
            aria-label="View all products"
          >
            View All
          </Link>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 sm:ml-2"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} className="text-[#01A4D5]" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 sm:mr-2"
            aria-label="Next products"
          >
            <ChevronRight size={20} className="text-[#01A4D5]" />
          </button>

          {/* Carousel Container */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            {medicalProducts.map((product) => (
              <div 
                key={product._id}
                className="flex-shrink-0 px-1 sm:px-2"
                style={{ width: `${100 / slidesToShow}%` }}
                aria-roledescription="slide"
              >
                <div className="bg-white rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden">
                  {/* Product Badges */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
                    {product.isNew && (
                      <span className="bg-[#01A4D5] text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
                        NEW
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="bg-amber-400 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`absolute top-2 right-2 z-10 p-1 rounded-full transition-all duration-200 ${
                      wishlist.includes(product._id)
                        ? "text-red-500 bg-white shadow-md animate-pulse"
                        : "text-gray-400 bg-white/80 hover:bg-white hover:text-red-500"
                    }`}
                    aria-label={wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={16}
                      fill={wishlist.includes(product._id) ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="relative h-40 sm:h-48 bg-gray-50 p-2 sm:p-3 flex items-center justify-center">
                    <img
                      src={getImageUrl(product.images?.[0]?.url)}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Body */}
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    {/* Category */}
                    <span
                      className={`text-xs font-semibold mb-1 tracking-wide ${
                        product.category === "Clinical Chemistry"
                          ? "text-[#01A4D5]"
                          : product.category === "Hematology"
                            ? "text-purple-500"
                            : "text-green-500"
                      }`}
                    >
                      {product.category?.toUpperCase() || 'MEDICAL EQUIPMENT'}
                    </span>

                    {/* Product Name */}
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                      <Link
                        to={`/products/${product._id}`}
                        className="hover:text-[#01A4D5] transition-colors duration-200"
                      >
                        {product.name}
                      </Link>
                    </h3>

                    {/* Key Specs */}
                    <div className="mb-2 sm:mb-3 space-y-1 text-xs sm:text-sm text-gray-600 hidden sm:block">
                      <div className="flex items-start">
                        <Zap className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-700">Technology: </strong>
                          <span>{product.technology || 'Not specified'}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Zap className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-700">Throughput: </strong>
                          <span>{product.throughput || 'Not specified'}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Info className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-700">Sample: </strong>
                          <span>{product.sampleType || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <div>
                          <p className="text-xs text-gray-500 hidden sm:block">Starting at</p>
                          <p className="text-sm sm:text-base font-semibold text-[#01A4D5]">
                            ${product.price?.toLocaleString() || '0'}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${
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

                      <div className="grid grid-cols-2 gap-1 sm:gap-2">
                        <button
                          onClick={() => addToCart(product._id)}
                          disabled={product.stock === 0 || cart.includes(product._id)}
                          className={`flex items-center justify-center py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-md text-[0.65rem] sm:text-xs font-medium transition-all duration-200 ${
                            addedItems[product._id]
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : cart.includes(product._id)
                                ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                                : product.stock === 0
                                  ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                                  : "bg-[#01A4D5] hover:bg-[#0187b3] text-white hover:shadow-sm"
                          }`}
                          aria-label={
                            addedItems[product._id]
                              ? "Added to cart"
                              : cart.includes(product._id)
                                ? "Already in cart"
                                : product.stock === 0
                                  ? "Out of stock"
                                  : "Add to cart"
                          }
                        >
                          {addedItems[product._id] ? (
                            <>
                              <Check size={14} className="mr-0.5 sm:mr-1" /> Added
                            </>
                          ) : cart.includes(product._id) ? (
                            "In Cart"
                          ) : product.stock === 0 ? (
                            "Sold Out"
                          ) : (
                            <>
                              <ShoppingCart size={14} className="mr-0.5 sm:mr-1" /> Add
                            </>
                          )}
                        </button>
                        <Link
                          to={`/products/${product._id}`}
                          className="flex items-center justify-center py-1.5 sm:py-2 px-1.5 sm:px-3 border border-[#01A4D5] text-[#01A4D5] rounded-md text-[0.65rem] sm:text-xs font-medium transition-all duration-200 hover:shadow-sm hover:bg-[#01A4D5]/5"
                          aria-label={`View details for ${product.name}`}
                        >
                          <Info size={14} className="mr-0.5 sm:mr-1" /> Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}