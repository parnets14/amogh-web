import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Truck, Home, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';


export default function OrderConfirmation() {
  const { state } = useLocation();
   useEffect(()=>{
window.scrollTo(0,0)
   },[])
  if (!state?.orderNumber) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>No order information found.</p>
        <Link to="/products" className="text-blue-600 mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const { orderNumber, product, subtotal, shipping, tax, total } = state;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Your order #{orderNumber} has been placed successfully.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        <div className="flex items-start mb-6 pb-6 border-b">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-20 h-20 object-contain mr-4"
          />
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-sm mt-1">Qty: {product.quantity}</p>
          </div>
          <div className="ml-auto font-medium">
            ${(product.price * product.quantity).toFixed(2)}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <Truck className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <h3 className="font-medium">Shipping Information</h3>
            <p className="text-sm text-gray-600">
              Your order will be shipped within 1-2 business days. You'll receive a tracking number via email.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/products"
          className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}