import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, Truck, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePayment } from '../context/PaymentContext';
import { useShipping } from '../context/ShippingContext';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import ShippingSelector from '../components/ShippingSelector';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  const { selectedPaymentMethod, paymentProcessing, processPayment } = usePayment();
  const { selectedZone, selectedCourier, calculateShippingCost, shippingAddress } = useShipping();
  const { isDarkMode } = useTheme();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (getCartCount() === 0) {
      navigate('/cart');
      return;
    }

    const subtotal = getCartTotal();
    const shipping = selectedZone && selectedCourier 
      ? calculateShippingCost(selectedZone, selectedCourier, getCartWeight(), subtotal)
      : 0;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      total
    });
  }, [cart, selectedZone, selectedCourier, getCartTotal, getCartCount, calculateShippingCost, navigate]);

  const getCartWeight = () => {
    return cart.reduce((total, item) => total + (item.weight || 1), 0);
  };

  const validateCustomerInfo = () => {
    const newErrors = {};

    if (!customerInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!customerInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateCustomerInfo()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (selectedZone && selectedCourier) {
        setCurrentStep(3);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      const paymentResult = await processPayment({
        amount: orderSummary.total,
        method: selectedPaymentMethod,
        customerInfo,
        shippingAddress
      });

      if (paymentResult.success) {
        // Create order
        const order = {
          id: `ORD-${Date.now()}`,
          customerInfo,
          shippingAddress,
          items: cart,
          payment: {
            method: selectedPaymentMethod,
            transactionId: paymentResult.transactionId,
            amount: paymentResult.amount
          },
          shipping: {
            zone: selectedZone,
            courier: selectedCourier,
            cost: orderSummary.shipping
          },
          summary: orderSummary,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };

        // Save order to localStorage (in real app, this would go to backend)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart and redirect to order confirmation
        clearCart();
        navigate(`/orders/${order.id}`);
      }
    } catch (error) {
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 1, title: 'Customer Info', icon: ShoppingCart },
    { id: 2, title: 'Shipping', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className={`flex items-center space-x-2 mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                            ? 'border-primary-500 text-primary-500'
                            : isDarkMode
                              ? 'border-gray-600 text-gray-400'
                              : 'border-gray-300 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div className="text-sm font-medium">{step.title}</div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          isCompleted ? 'bg-green-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Step Content */}
            {currentStep === 1 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.firstName ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.lastName}
                      onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.lastName ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.phone ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleNextStep} disabled={!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone}>
                    Continue to Shipping
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-6">
                <ShippingSelector
                  subtotal={orderSummary.subtotal}
                  weight={getCartWeight()}
                  onSelect={({ zone, courier }) => {
                    // Selection is handled by the ShippingSelector component
                  }}
                />
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleNextStep} 
                    disabled={!selectedZone || !selectedCourier}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-6">
                <PaymentMethodSelector
                  amount={orderSummary.total}
                  country={shippingAddress.country}
                  onSelect={(method) => {
                    // Selection is handled by the PaymentMethodSelector component
                  }}
                />
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={!selectedPaymentMethod || isProcessing}
                    loading={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order - $${orderSummary.total.toFixed(2)}`}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    ${orderSummary.subtotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Shipping</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {orderSummary.shipping === 0 ? 'FREE' : `$${orderSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Tax</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    ${orderSummary.tax.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Total
                  </span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${orderSummary.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              {selectedZone && selectedCourier && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Shipping Method
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {selectedCourier} - {selectedZone}
                  </p>
                </div>
              )}

              {/* Payment Info */}
              {selectedPaymentMethod && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Payment Method
                    </span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {selectedPaymentMethod}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 