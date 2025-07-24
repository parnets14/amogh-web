

import { useLocation, Link } from "react-router-dom"
import { CheckCircle, Truck, Home, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/cartSlice"

export default function OrderConfirmation() {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const [categoryNames, setCategoryNames] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)

    // Clear cart after successful order
    if (state?.orderNumber) {
      dispatch(clearCart())
    }
  }, [dispatch, state])

  // Fetch category names for all items
  useEffect(() => {
    const fetchCategoryNames = async () => {
      if (!state?.items) return

      const categoryIds = new Set()
      
      state.items.forEach((item) => {
        if (item.category && typeof item.category === "string") {
          categoryIds.add(item.category)
        }
      })

      const names = {}
      for (const categoryId of categoryIds) {
        try {
          const response = await fetch(`http://localhost:5010/api/categories/${categoryId}`)
          if (response.ok) {
            const data = await response.json()
            names[categoryId] = data.name || "Unknown Category"
          }
        } catch (error) {
          console.error("Error fetching category:", error)
          names[categoryId] = "Unknown Category"
        }
      }
      setCategoryNames(names)
    }

    fetchCategoryNames()
  }, [state])

  if (!state?.orderNumber) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-gray-600 mb-4">No order information found.</p>
        <Link to="/allproduct" className="text-[#01A4D5] hover:text-[#0188b3] font-medium inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const {
    orderNumber,
    items = [],
    product, // For backward compatibility with single product checkout
    subtotal,
    shipping,
    tax,
    total,
    shippingInfo,
  } = state
  console.log(state)

  // Handle both single product and multiple items
  const orderItems = items.length > 0 ? items : product ? [product] : []

  const getImageUrl = (path) => {
    if (!path) return "/placeholder-product.png"
    if (path.startsWith("http")) return path
    return `http://localhost:5010${path}`
  }

  const getCategoryName = (item) => {
    if (typeof item.category === "object" && item.category?.name) {
      return item.category.name
    }
    if (typeof item.category === "string") {
      return categoryNames[item.category] || "Loading..."
    }
    return "Unknown Category"
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">Your order #{orderNumber} has been placed successfully.</p>
        <p className="text-sm text-gray-500 mt-2">You will receive a confirmation email shortly.</p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Details</h2>

        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-b-0">
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mr-4 flex-shrink-0">
                <img
                  src={getImageUrl(item.images?.[0]?.url || item.image)}
                  alt={item.name || "Product"}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png"
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                {/* <p className="text-sm text-gray-600 mt-1">{getCategoryName(item)}</p> */}
                <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity || 1}</p>
                {item.technology && <p className="text-xs text-gray-500 mt-1">Technology: {item.technology}</p>}
              </div>
              <div className="font-medium text-gray-900 text-right">
                <p>${((item.finalPrice || item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                {item.quantity > 1 && (
                  <p className="text-sm text-gray-500">${(item.finalPrice || item.price || 0).toFixed(2)} each</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({orderItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)</span>
              <span>${(subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 text-gray-900">
              <span>Total</span>
              <span>${(total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      {shippingInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Shipping Address</h3>
          <div className="text-gray-600">
            <p className="font-medium text-gray-900">{shippingInfo.fullName}</p>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city}, {shippingInfo.postalCode}
            </p>
            <p>{shippingInfo.country}</p>
            <p className="mt-2">
              <span className="font-medium">Email:</span> {shippingInfo.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {shippingInfo.phone}
            </p>
          </div>
        </div>
      )}

      {/* Shipping Status */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
        <div className="flex items-start">
          <Truck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Shipping Information</h3>
            <p className="text-sm text-blue-800 mb-2">
              Your order will be processed and shipped within 1-2 business days.
            </p>
            <p className="text-sm text-blue-700">You'll receive a tracking number via email once your order ships.</p>
            <p className="text-xs text-blue-600 mt-2">Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/allproduct"
          className="flex items-center justify-center px-6 py-3 bg-[#01A4D5] hover:bg-[#0188b3] text-white rounded-lg font-medium transition-colors duration-200"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 text-gray-700 transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <Link
          to="/profile"
          className="flex items-center justify-center px-6 py-3 border border-[#01A4D5] text-[#01A4D5] rounded-lg font-medium hover:bg-[#01A4D5]/5 transition-colors duration-200"
        >
          View Orders
        </Link>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Need help with your order? Contact our support team.</p>
        <p className="mt-1">
          <Link to="/contact" className="text-[#01A4D5] hover:text-[#0188b3] font-medium">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
