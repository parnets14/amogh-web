import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronLeft, Star, Check, Truck, Shield, CreditCard } from 'lucide-react';
import { medicalProducts } from './productData';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    window.scrollTo(0,0)
    const foundProduct = medicalProducts.find(p => p.slug === slug);
    if (!foundProduct) {
      navigate('/not-found');
      return;
    }
    setProduct(foundProduct);
  }, [slug, navigate]);

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

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&auto=format&fit=crop"
  ];

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
            <img
              src={galleryImages[selectedImage]}
              alt={product.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-50 rounded-lg p-2 h-24 flex items-center justify-center border-2 ${
                  selectedImage === index ? 'border-[#01A4D5]' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category & Title */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              product.category === "Clinical Chemistry" ? "bg-[#01A4D5]/10 text-[#01A4D5]" : 
              product.category === "Hematology" ? "bg-red-100 text-red-800" : 
              "bg-green-100 text-green-800"
            }`}>
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
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
                <p className="text-sm text-gray-500">Starting at</p>
                <p className="text-3xl font-bold text-[#01A4D5]">
                  ${product.price.toLocaleString()}
                </p>
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                <span>{product.technology} technology</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                <span>Throughput: {product.throughput}</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                <span>Sample type: {product.sampleType}</span>
              </li>
              {product.warranty && (
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                  <span>{product.warranty} warranty</span>
                </li>
              )}
            </ul>
          </div>

          {/* Quantity & CTA */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <label className="mr-3 font-medium">Quantity:</label>
              <div className="flex border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
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

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
              <p className="text-xs text-gray-600">Free shipping</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 mx-auto text-[#01A4D5] mb-1" />
              <p className="text-xs text-gray-600">2-year warranty</p>
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
              onClick={() => setActiveTab('desc')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'desc'
                  ? 'border-[#01A4D5] text-[#01A4D5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
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
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specifications.map((spec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800">{spec.key}</h4>
                  <p className="text-gray-600">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4 text-[#01A4D5]">Product Overview</h3>
              <p className="mb-4">
                {product.description}
              </p>
              
              <h3 className="text-lg font-semibold mb-4 mt-6 text-[#01A4D5]">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                  <span>High throughput of {product.throughput} for efficient workflow</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                  <span>Compatible with {product.sampleType} samples</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                  <span>User-friendly interface with intuitive software</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                  <span>Compact design ideal for any lab environment</span>
                </li>
                {product.warranty && (
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#01A4D5] mt-0.5 mr-2 flex-shrink-0" />
                    <span>{product.warranty} manufacturer warranty</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-[#01A4D5]/10 p-4 rounded-lg border border-[#01A4D5]/20">
                <h3 className="font-semibold text-[#01A4D5] mb-2">Installation & Training</h3>
                <p className="text-[#01A4D5]/90">
                  Includes onsite installation and operator training by certified technicians.
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