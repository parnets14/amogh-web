import { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  // State management
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    status: 'Active'
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImagePath, setExistingImagePath] = useState('');

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [success]);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open modal for new category
  const openNewCategoryModal = () => {
    setCurrentCategory(null);
    setFormData({
      name: '',
      description: '',
      image: null,
      status: 'Active'
    });
    setPreviewImage(null);
    setExistingImagePath('');
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditCategoryModal = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: null, // We'll handle image separately
      status: category.isActive ? 'Active' : 'Inactive'
    });
    setExistingImagePath(category.image || '');
    setPreviewImage(category.image ? `${import.meta.env.VITE_API_URL}${category.image}` : null);
    setIsModalOpen(true);
  };

  // Submit category form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('isActive', formData.status === 'Active');
      
      // Handle image cases:
      if (formData.image) {
        // New image uploaded
        formDataToSend.append('image', formData.image);
      } else if (!previewImage && existingImagePath) {
        // Image was removed
        formDataToSend.append('removeImage', 'true');
      }
      // If neither, existing image remains unchanged

      let response;
      if (currentCategory) {
        // Update existing category
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/categories/${currentCategory._id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        // Create new category
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      setSuccess(currentCategory ? 'Category updated successfully' : 'Category created successfully');
      setIsModalOpen(false);
      
      // Reset form data
      setFormData({
        name: '',
        description: '',
        image: null,
        status: 'Active'
      });
      setPreviewImage(null);
      setExistingImagePath('');
      
    } catch (err) {
      setError(err.response?.data?.message ||
        (currentCategory ? 'Failed to update category' : 'Failed to create category'));
      console.error('Error saving category:', err);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/categories/${id}`);
        setSuccess('Category deleted successfully');
        setCategories(categories.filter(category => category._id !== id));
      } catch (err) {
        setError('Failed to delete category');
        console.error('Error deleting category:', err);
      }
    }
  };

  // Close notifications
  const closeNotification = () => {
    setError(null);
    setSuccess(null);
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setExistingImagePath('');
    setFormData(prev => ({ ...prev, image: null }));
  };

  return (
    <div className="p-4 md:p-6">
      {/* Notifications */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={closeNotification}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex justify-between items-center">
          <span>{success}</span>
          <button
            onClick={closeNotification}
            className="text-green-700 hover:text-green-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
          onClick={openNewCategoryModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
        >
          Add New Category
        </button>
      </div>

      {/* Search and Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Categories table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? 'No matching categories found' : 'No categories available'}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          {category.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${category.image}`}
                              alt={category.name}
                              onError={(e) => { e.target.src = '/fallback-image.png'; }}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {category.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {category.description || 'No description'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditCategoryModal(category)}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {currentCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </div>
                      {(previewImage || existingImagePath) && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <label className="flex-1">
                      <div className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-center">
                        {previewImage || existingImagePath ? 'Change Image' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter category name"
                  />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter category description"
                  />
                </div>

                {/* Status Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {currentCategory ? 'Update Category' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;