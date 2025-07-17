import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Truck,
  Shield,
  User,
  MapPin,
  Mail,
  Phone,
  Banknote,
  Lock
} from 'lucide-react';

// Reusable Text Input Component
const TextInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false, 
  icon: Icon, 
  type = 'text', 
  placeholder = '', 
  error = null,
  maxLength,
}) => (
  <div className="relative mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 ${
          Icon ? 'pl-10' : 'pl-3'
        } transition-colors`}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </div>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

// Reusable Select Input Component
const SelectInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false, 
  error = null 
}) => (
  <div className="relative mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-300'
      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 appearance-none bg-white`}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({
    shipping: {},
    payment: {}
  });

  useEffect(() => {
    window.scrollTo(0,0)
    if (!state?.product) {
      navigate('/products');
    }
  }, [state, navigate]);

  if (!state?.product) return null;

  const { product, subtotal } = state;
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors.shipping[name]) {
      setErrors(prev => ({
        ...prev,
        shipping: { ...prev.shipping, [name]: undefined }
      }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors.payment[name]) {
      setErrors(prev => ({
        ...prev,
        payment: { ...prev.payment, [name]: undefined }
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length > 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  const validateForm = () => {
    const newErrors = {
      shipping: {},
      payment: {}
    };

    let isValid = true;

    // Validate shipping info
    if (!shippingInfo.fullName.trim()) {
      newErrors.shipping.fullName = 'Full name is required';
      isValid = false;
    }
    if (!shippingInfo.address.trim()) {
      newErrors.shipping.address = 'Address is required';
      isValid = false;
    }
    if (!shippingInfo.email.trim()) {
      newErrors.shipping.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(shippingInfo.email)) {
      newErrors.shipping.email = 'Email is invalid';
      isValid = false;
    }

    // Validate payment info if credit card
    if (paymentMethod === 'credit-card') {
      if (!cardDetails.name.trim()) {
        newErrors.payment.name = 'Cardholder name is required';
        isValid = false;
      }
      if (!cardDetails.number.replace(/\s/g, '')) {
        newErrors.payment.number = 'Card number is required';
        isValid = false;
      } else if (cardDetails.number.replace(/\s/g, '').length < 16) {
        newErrors.payment.number = 'Card number is incomplete';
        isValid = false;
      }
      if (!cardDetails.expiry) {
        newErrors.payment.expiry = 'Expiry date is required';
        isValid = false;
      } else if (cardDetails.expiry.length < 5) {
        newErrors.payment.expiry = 'Expiry date is incomplete';
        isValid = false;
      }
      if (!cardDetails.cvv) {
        newErrors.payment.cvv = 'CVV is required';
        isValid = false;
      } else if (cardDetails.cvv.length < 3) {
        newErrors.payment.cvv = 'CVV is incomplete';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        navigate('/order-confirmation', {
          state: {
            orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
            product,
            subtotal,
            shipping,
            tax,
            total,
            shippingInfo,
            paymentMethod,
          },
        });
        setIsProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to product
        </button>

        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">1</div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="border-l-2 border-blue-600 pl-10 mb-10 ml-4">
          <p className="text-gray-600">Complete your purchase with secure checkout</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Left Column - Shipping and Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Full Name"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                required
                icon={User}
                error={errors.shipping.fullName}
              />
              
              <TextInput
                label="Email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                type="email"
                required
                icon={Mail}
                error={errors.shipping.email}
              />
            </div>

            <TextInput
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
              icon={MapPin}
              error={errors.shipping.address}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                icon={MapPin}
              />
              
              <TextInput
                label="Postal Code"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
              />
              
              <SelectInput
                label="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select Country' },
                  { value: 'US', label: 'United States' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'UK', label: 'United Kingdom' },
                  { value: 'AU', label: 'Australia' },
                  { value: 'DE', label: 'Germany' },
                ]}
              />
            </div>

            <TextInput
              label="Phone Number"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              type="tel"
              icon={Phone}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Payment Options */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
            </div>
            
            <div className="space-y-4">
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'credit-card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setPaymentMethod('credit-card')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                    <p className="text-sm text-gray-600">
                      Pay with Visa, Mastercard, American Express
                    </p>
                  </div>
                  {paymentMethod === 'credit-card' && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="mt-6 space-y-4">
                    <TextInput
                      label="Cardholder Name"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      placeholder="John Smith"
                      required
                      error={errors.payment.name}
                    />
                    
                    <TextInput
                      label="Card Number"
                      name="number"
                      value={formatCardNumber(cardDetails.number)}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      error={errors.payment.number}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput
                        label="Expiry Date"
                        name="expiry"
                        value={formatExpiry(cardDetails.expiry)}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        error={errors.payment.expiry}
                      />
                      
                      <TextInput
                        label="CVV"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength="4"
                        required
                        icon={Lock}
                        error={errors.payment.cvv}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'bank-transfer' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setPaymentMethod('bank-transfer')}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <Banknote className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Bank Transfer</h3>
                    <p className="text-sm text-gray-600">
                      Direct bank transfer
                    </p>
                  </div>
                  {paymentMethod === 'bank-transfer' && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm text-gray-500 mt-1">Qty: {product.quantity}</p>
              </div>
              <div className="font-medium text-gray-900">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-gray-200 pt-4 text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: 3-5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Secure Checkout</h3>
                  <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center ${
                isProcessing 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              } text-white transition-all duration-300`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Complete Secure Payment
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-6 text-center">
              By placing your order, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}