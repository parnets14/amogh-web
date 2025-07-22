
// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, Heart, ChevronLeft, Star, Check, Truck, Shield, CreditCard } from 'lucide-react';
// import axios from 'axios';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [inCart, setInCart] = useState(false);
//   const [inWishlist, setInWishlist] = useState(false);
//   const [activeTab, setActiveTab] = useState('specs');
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5010/api/products/${id}`);
//       setProduct({
//         ...res.data.product,
//         specifications: Array.isArray(res.data.product.specifications)
//           ? res.data.product.specifications
//           : []
//       });
//     } catch (error) {
//       console.log("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//     window.scrollTo(0, 0);
//   }, [id]);

//   const handleAddToCart = () => {
//     setInCart(true);
//     // Add actual cart logic here
//   };

//   const toggleWishlist = () => {
//     setInWishlist(!inWishlist);
//     // Add actual wishlist logic here
//   };

//   const handleBuyNow = () => {
//     navigate('/checkout', { 
//       state: { 
//         product: { ...product, quantity },
//         subtotal: product.price * quantity
//       } 
//     });
//   };

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto py-12 px-4 text-center">
//         <p>Loading product details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//       {/* Breadcrumb Navigation */}
//       <nav className="flex mb-6" aria-label="Breadcrumb">
//         <ol className="inline-flex items-center space-x-1 md:space-x-3">
//           <li>
//             <div className="flex items-center">
//               <ChevronLeft className="w-4 h-4 mr-1" />
//               <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-[#01A4D5]">
//                 All Products
//               </Link>
//             </div>
//           </li>
//           <li aria-current="page">
//             <div className="flex items-center">
//               <span className="mx-1 text-gray-400">/</span>
//               <span className="ml-1 text-sm font-medium text-gray-500">
//                 {product?.name}
//               </span>
//             </div>
//           </li>
//         </ol>
//       </nav>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-96">
//             <img
//               src={`http://localhost:5010${product?.images[selectedImageIndex]?.url}`}
//               alt={product.name}
//               className="h-full w-full object-contain"
//               loading="lazy"
//             />
//           </div>

//           {/* Thumbnail Gallery */}
//           <div className="grid grid-cols-4 gap-3">
//             {product?.images?.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedImageIndex(index)}
//                 className={`bg-gray-50 rounded-lg p-2 h-24 flex items-center justify-center border-2 ${
//                   selectedImageIndex === index ? 'border-[#01A4D5]' : 'border-transparent'
//                 }`}
//               >
//                 <img
//                   src={`http://localhost:5010${img.url}`}
//                   alt={`${product.name} view ${index + 1}`}
//                   className="h-full w-full object-contain"
//                   loading="lazy"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           {/* Category & Title */}
//           <div className="mb-4">
//             <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//               product.category === "Clinical Chemistry" ? "bg-[#01A4D5]/10 text-[#01A4D5]" : 
//               product.category === "Hematology" ? "bg-red-100 text-red-800" : 
//               "bg-green-100 text-green-800"
//             }`}>
//               {product.category}
//             </span>
//             <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
//             <div className="flex items-center mt-2">
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-500 ml-2">(12 reviews)</span>
//             </div>
//           </div>

//           {/* Price & Stock */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-500">Starting at</p>
//                 <p className="text-3xl font-bold text-[#01A4D5]">
//                   ${product.price.toLocaleString()}
//                 </p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 product.stock > 3 ? 'bg-green-100 text-green-800' : 
//                 product.stock > 0 ? 'bg-amber-100 text-amber-800' : 
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {product.stock > 3 ? 'In Stock' : 
//                  product.stock > 0 ? `${product.stock} Left` : 'Out of Stock'}
//               </span>
//             </div>
//           </div>

//           {/* Key Features */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Key Features</h3>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                 <span>{product.technology} technology</span>
//               </li>
//               <li className="flex items-start">
//                 <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                 <span>Throughput: {product.throughput}</span>
//               </li>
//               <li className="flex items-start">
//                 <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                 <span>Sample type: {product.sampleType}</span>
//               </li>
//               {product.warranty && (
//                 <li className="flex items-start">
//                   <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                   <span>{product.warranty} warranty</span>
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Quantity & CTA */}
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <label className="mr-3 font-medium">Quantity:</label>
//               <div className="flex border border-gray-300 rounded-lg">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-3 py-1 text-lg hover:bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-3 py-1 text-lg hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={product.stock === 0 || inCart}
//                 className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
//                   inCart
//                     ? "bg-green-100 text-green-800 border border-green-200"
//                     : product.stock === 0
//                       ? "bg-gray-200 text-gray-600 cursor-not-allowed"
//                       : "bg-[#01A4D5] hover:bg-[#0188b0] text-white"
//                 }`}
//               >
//                 {inCart ? (
//                   <>
//                     <Check className="w-5 h-5 mr-2" /> Added to Cart
//                   </>
//                 ) : product.stock === 0 ? (
//                   "Out of Stock"
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={handleBuyNow}
//                 disabled={product.stock === 0}
//                 className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
//                   product.stock === 0
//                     ? "bg-gray-200 text-gray-600 cursor-not-allowed"
//                     : "bg-red-600 hover:bg-red-700 text-white"
//                 }`}
//               >
//                 Buy Now
//               </button>
//             </div>

//             <div className="mt-3">
//               <button
//                 onClick={toggleWishlist}
//                 className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium border ${
//                   inWishlist
//                     ? "text-red-600 border-red-300 bg-red-50"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 <Heart
//                   className={`w-5 h-5 mr-2 ${
//                     inWishlist ? "fill-red-600 text-red-600" : "text-gray-500"
//                   }`}
//                 />
//                 {inWishlist ? "Saved" : "Save for Later"}
//               </button>
//             </div>
//           </div>

//           {/* Shipping & Payment Info */}
//           <div className="grid grid-cols-3 gap-4 text-center mb-8">
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <Truck className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
//               <p className="text-xs text-gray-600">Free shipping</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <Shield className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
//               <p className="text-xs text-gray-600">2-year warranty</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <CreditCard className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
//               <p className="text-xs text-gray-600">Secure payment</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Tabs */}
//       <div className="mt-12">
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               onClick={() => setActiveTab('specs')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'specs'
//                   ? 'border-[#01A4D5] text-[#01A4D5]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Specifications
//             </button>
//             <button
//               onClick={() => setActiveTab('desc')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'desc'
//                   ? 'border-[#01A4D5] text-[#01A4D5]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Description
//             </button>
//             <button
//               onClick={() => setActiveTab('support')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'support'
//                   ? 'border-[#01A4D5] text-[#01A4D5]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Support
//             </button>
//           </nav>
//         </div>

//         <div className="py-6">
//           {activeTab === 'specs' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Array.isArray(product.specifications) && product.specifications.length > 0 ? (
//                 product.specifications.map((spec, index) => (
//                   <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-800">{spec.key}</h4>
//                     <p className="text-gray-600">{spec.value}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No specifications available.</p>
//               )}
//             </div>
//           )}

//           {activeTab === 'desc' && (
//             <div className="prose max-w-none">
//               <h3 className="text-lg font-semibold mb-4 text-[#01A4D5]">Product Overview</h3>
//               <p className="mb-4">
//                 {product.description}
//               </p>
              
//               <h3 className="text-lg font-semibold mb-4 mt-6 text-[#01A4D5]">Key Benefits</h3>
//               <ul className="space-y-2">
//                 <li className="flex items-start">
//                   <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                   <span>High throughput of {product.throughput} for efficient workflow</span>
//                 </li>
//                 <li className="flex items-start">
//                   <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                   <span>Compatible with {product.sampleType} samples</span>
//                 </li>
//                 <li className="flex items-start">
//                   <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                   <span>User-friendly interface with intuitive software</span>
//                 </li>
//                 <li className="flex items-start">
//                   <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                   <span>Compact design ideal for any lab environment</span>
//                 </li>
//                 {product.warranty && (
//                   <li className="flex items-start">
//                     <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
//                     <span>{product.warranty} manufacturer warranty</span>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           )}

//           {activeTab === 'support' && (
//             <div className="space-y-6">
//               <div className="bg-[#01A4D5]/10 p-4 rounded-lg border border-[#01A4D5]/20">
//                 <h3 className="font-semibold text-[#01A4D5] mb-2">Installation & Training</h3>
//                 <p className="text-[#01A4D5]/90">
//                   Includes onsite installation and operator training by certified technicians.
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="border p-4 rounded-lg border-[#01A4D5]/20">
//                   <h4 className="font-medium mb-2 text-[#01A4D5]">Technical Support</h4>
//                   <p className="text-sm text-gray-600">
//                     24/7 phone and email support with average response time of 2 hours.
//                   </p>
//                 </div>
//                 <div className="border p-4 rounded-lg border-[#01A4D5]/20">
//                   <h4 className="font-medium mb-2 text-[#01A4D5]">Maintenance</h4>
//                   <p className="text-sm text-gray-600">
//                     Preventive maintenance plans available. Recommended service interval: 6 months.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronLeft, Star, Check, Truck, Shield, CreditCard } from 'lucide-react';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: 0,
    discount: 0,
    stock: 0,
    images: [],
    features: [],
    specifications: {},
    warranty: 'No warranty',
    usage: '',
    status: 'Active',
    model: '',
    sku: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5010/api/products/${id}`);
      
      if (data) {
        setProduct(prev => ({
          ...prev,
          ...(data.product || data) // Handle both nested and direct responses
        }));
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    setInCart(true);
    // Add actual cart logic here
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
    // Add actual wishlist logic here
  };

  const handleBuyNow = () => {
    navigate('/checkout', { 
      state: { 
        product: { ...product, quantity },
        subtotal: product.price * quantity
      } 
    });
  };

  const renderSpecifications = () => {
    if (!product.specifications || Object.keys(product.specifications).length === 0) {
      return <p className="text-gray-500">No specifications available.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(product.specifications).map(([key, value], index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800">{key}</h4>
            <p className="text-gray-600">{String(value)}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 bg-[#01A4D5] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-[#01A4D5]">
                All Products
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-1 text-gray-400">/</span>
              <span className="ml-1 text-sm font-medium text-gray-500">
                {product.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-96">
            {product.images?.length > 0 ? (
              <img
                src={`http://localhost:5010${product.images[selectedImageIndex]?.url}`}
                alt={product.name}
                className="h-full w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-product.png';
                }}
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`bg-gray-50 rounded-lg p-2 h-24 flex items-center justify-center border-2 ${
                    selectedImageIndex === index ? 'border-[#01A4D5]' : 'border-transparent'
                  }`}
                >
                  <img
                    src={`http://localhost:5010${img.url}`}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-thumbnail.png';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Brand & Title */}
          <div className="mb-4">
            {product.brand && (
              <span className="text-sm text-gray-500">Brand: {product.brand}</span>
            )}
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            {product.model && (
              <span className="text-sm text-gray-500">Model: {product.model}</span>
            )}
            {product.sku && (
              <span className="text-sm text-gray-500 block">SKU: {product.sku}</span>
            )}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(12 reviews)</span>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-[#01A4D5]">
                    ${product.price?.toLocaleString() ?? '0'}
                  </p>
                  {product.discount > 0 && (
                    <>
                      <span className="ml-2 text-sm line-through text-gray-500">
                        ${(product.price / (1 - product.discount / 100)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 3 ? 'bg-green-100 text-green-800' : 
                product.stock > 0 ? 'bg-amber-100 text-amber-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {product.stock > 3 ? 'In Stock' : 
                 product.stock > 0 ? `${product.stock} Left` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Key Features */}
          {product.features?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <label className="mr-3 font-medium">Quantity:</label>
              <div className="flex border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  disabled={product.stock === 0}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(quantity + 1, product.stock || 1))}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  disabled={product.stock === 0}
                >
                  +
                </button>
              </div>
              {product.stock > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {product.stock} available
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || inCart}
                className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
                  inCart
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : product.stock === 0
                      ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                      : "bg-[#01A4D5] hover:bg-[#0188b0] text-white"
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" /> Added to Cart
                  </>
                ) : product.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
                  product.stock === 0
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                Buy Now
              </button>
            </div>

            <div className="mt-3">
              <button
                onClick={toggleWishlist}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium border ${
                  inWishlist
                    ? "text-red-600 border-red-300 bg-red-50"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    inWishlist ? "fill-red-600 text-red-600" : "text-gray-500"
                  }`}
                />
                {inWishlist ? "Saved" : "Save for Later"}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
              <p className="text-xs text-gray-600">Free shipping</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
              <p className="text-xs text-gray-600">
                {product.warranty || 'No warranty'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
              <p className="text-xs text-gray-600">Secure payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specs'
                  ? 'border-[#01A4D5] text-[#01A4D5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'usage'
                  ? 'border-[#01A4D5] text-[#01A4D5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Usage
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'support'
                  ? 'border-[#01A4D5] text-[#01A4D5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Support
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'specs' && renderSpecifications()}

          {activeTab === 'usage' && (
            <div className="prose max-w-none">
              {product.usage ? (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-[#01A4D5]">Product Usage</h3>
                  <p className="mb-4 whitespace-pre-line">{product.usage}</p>
                </>
              ) : (
                <p className="text-gray-500">No usage information available.</p>
              )}
              
              {product.features?.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-4 mt-6 text-[#01A4D5]">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-[#01A4D5]/10 p-4 rounded-lg border border-[#01A4D5]/20">
                <h3 className="font-semibold text-[#01A4D5] mb-2">Installation & Training</h3>
                <p className="text-[#01A4D5]/90">
                  {product.warranty ? 
                    `Includes onsite installation and operator training (${product.warranty} warranty coverage)` : 
                    'Contact us for installation and training options'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg border-[#01A4D5]/20">
                  <h4 className="font-medium mb-2 text-[#01A4D5]">Technical Support</h4>
                  <p className="text-sm text-gray-600">
                    24/7 phone and email support with average response time of 2 hours.
                  </p>
                </div>
                <div className="border p-4 rounded-lg border-[#01A4D5]/20">
                  <h4 className="font-medium mb-2 text-[#01A4D5]">Maintenance</h4>
                  <p className="text-sm text-gray-600">
                    Preventive maintenance plans available. Recommended service interval: 6 months.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}