import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSearch, FaEdit, FaTrash, FaUpload, FaImage, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    formState: { errors } 
  } = useForm();

  const statusOptions = ["Active", "Inactive", "Discontinued"];

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage
        }
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      toast.success("Products loaded successfully");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
    reset();
    setUploadedImages([]);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
    
    // Set form values
    setValue("name", product.name);
    setValue("brand", product.brand);
    setValue("category", product.category?._id || "");
    setValue("model", product.model);
    setValue("sku", product.sku);
    setValue("price", product.price);
    setValue("discount", product.discount || 0);
    setValue("stock", product.stock);
    setValue("warranty", product.warranty);
    setValue("features", product.features?.join("\n") || "");
    setValue("specifications", product.specifications?.join("\n") || "");
    setValue("usage", product.usage);
    setValue("status", product.status || "Active");
    
    // Set existing images
    if (product.images && product.images.length > 0) {
      setUploadedImages(product.images.map(img => ({
        url: img.url,
        preview: `${import.meta.env.VITE_API_URL}${img.url}`,
        altText: product.name,
        isPrimary: img.isPrimary || false
      })));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setUploadedImages([]);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      altText: file.name,
      isPrimary: uploadedImages.length === 0
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    if (newImages[index].preview.startsWith('blob:')) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages.splice(index, 1);
    if (newImages.length > 0 && !newImages.some(img => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }
    setUploadedImages(newImages);
  };

  const setPrimaryImage = (index) => {
    const newImages = uploadedImages.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    setUploadedImages(newImages);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading(currentProduct ? "Updating product..." : "Creating product...");
    
    try {
      const formData = new FormData();

      // Append all basic fields
      formData.append('name', data.name);
      formData.append('brand', data.brand);
      formData.append('category', data.category);
      formData.append('model', data.model);
      formData.append('sku', data.sku);
      formData.append('price', data.price);
      formData.append('discount', data.discount || 0);
      formData.append('stock', data.stock);
      formData.append('warranty', data.warranty);
      formData.append('features', JSON.stringify(data.features?.split('\n').filter(Boolean) || []));
      formData.append('specifications', JSON.stringify(data.specifications?.split('\n').filter(Boolean) || []));
      formData.append('usage', data.usage);
      formData.append('status', data.status || "Active");

      // Append new image files
      uploadedImages.forEach((image) => {
        if (image.file) {
          formData.append('images', image.file);
          formData.append('isPrimary', image.isPrimary);
        }
      });

      // Append existing image URLs
      const existingImages = uploadedImages
        .filter(img => img.url)
        .map(img => ({
          url: img.url,
          isPrimary: img.isPrimary
        }));
      formData.append('existingImages', JSON.stringify(existingImages));

      let response;
      if (currentProduct) {
        // Update existing product
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${currentProduct._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        toast.update(toastId, {
          render: "Product updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
      } else {
        // Create new product
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products/create`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        toast.update(toastId, {
          render: "Product created successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to save product",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter products based on search and filters (client-side if needed)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || product.category?._id === categoryFilter;

    let matchesStatus = true;
    if (statusFilter === "in stock") {
      matchesStatus = product.stock > 0;
    } else if (statusFilter === "out of stock") {
      matchesStatus = product.stock <= 0;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", class: "bg-red-100 text-red-800" };
    return { text: "In Stock", class: "bg-green-100 text-green-800" };
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className={`p-4 md:p-6 ${isModalOpen ? "filter bg:blur-sm" : ""}`}>
      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-gray-700 border-b pb-2">Basic Information</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                      <input
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                      <input
                        type="text"
                        {...register("brand", { required: "Brand is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                      <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                      </select>
                      {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                      <input
                        type="text"
                        {...register("model")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU*</label>
                      <input
                        type="text"
                        {...register("sku", { required: "SKU is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>}
                    </div>
                  </div>

                  {/* Pricing & Inventory */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-gray-700 border-b pb-2">Pricing & Inventory</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                          required: "Price is required",
                          min: { value: 0, message: "Price must be positive" }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        {...register("discount")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity*</label>
                      <input
                        type="number"
                        {...register("stock", {
                          required: "Stock quantity is required",
                          min: { value: 0, message: "Stock cannot be negative" }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                      <input
                        type="text"
                        {...register("warranty")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="e.g., 1 year"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        {...register("status")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Features & Specifications */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-gray-700 border-b pb-2">Features</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Key Features (one per line)</label>
                      <textarea
                        {...register("features")}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Feature 1\nFeature 2\nFeature 3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (one per line)</label>
                      <textarea
                        {...register("specifications")}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Weight: 2.5kg\nDimensions: 10x20x30cm\nColor: White"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Usage Instructions</label>
                      <textarea
                        {...register("usage")}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-gray-700 border-b pb-2">Product Images</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                            <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <div className="flex">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                              >
                                <span>Upload images</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview || image.url}
                              alt={image.altText}
                              className="h-32 w-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg">
                              <button
                                type="button"
                                onClick={() => setPrimaryImage(index)}
                                className={`p-2 rounded-full ${image.isPrimary ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                                title={image.isPrimary ? 'Primary image' : 'Set as primary'}
                              >
                                {image.isPrimary ? '✓' : '★'}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 rounded-full bg-white text-red-600"
                                title="Remove image"
                              >
                                <FaTrash className="h-4 w-4" />
                              </button>
                            </div>
                            {image.isPrimary && (
                              <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">Primary</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaSave className="mr-2" />
                        {currentProduct ? 'Update Product' : 'Save Product'}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product Management UI */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const status = getStatus(product.stock);
                  const discountedPrice = product.price * (1 - product.discount / 100);

                  return (
                    <tr key={product._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL}${product.images[0].url}`}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/150";
                                }}
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <FaImage className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[150px]">
                              <span className="sm:hidden">{product.category?.name || 'Uncategorized'}</span>
                              <span className="hidden sm:inline">{product.brand} | {product.model}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 capitalize hidden sm:table-cell">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 font-mono hidden md:table-cell">
                        {product.sku}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span className={product.discount > 0 ? "line-through text-gray-400 text-xs" : "text-sm"}>
                            ₹{product.price.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-green-600 text-sm">
                              ₹{discountedPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalProducts > itemsPerPage && (
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalProducts)}
              </span> of <span className="font-medium">{totalProducts}</span> results
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 border rounded-md text-sm ${currentPage === number
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}