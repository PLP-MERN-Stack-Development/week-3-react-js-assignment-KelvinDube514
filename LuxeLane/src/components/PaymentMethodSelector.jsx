import React from 'react';
import { CreditCard, Shield, Zap, CheckCircle } from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import { useTheme } from '../context/ThemeContext';

const PaymentMethodSelector = ({ amount, country = 'US', onSelect }) => {
  const { paymentMethods, selectedPaymentMethod, setSelectedPaymentMethod, getAvailablePaymentMethods } = usePayment();
  const { isDarkMode } = useTheme();

  const availableMethods = getAvailablePaymentMethods(amount, country);

  const handleMethodSelect = (methodKey) => {
    setSelectedPaymentMethod(methodKey);
    if (onSelect) {
      onSelect(methodKey);
    }
  };

  const getMethodIcon = (method) => {
    switch (method.key) {
      case 'paypal':
        return '💳';
      case 'stripe':
        return '💳';
      case 'creditCard':
        return <CreditCard className="h-5 w-5" />;
      case 'applePay':
        return '🍎';
      case 'googlePay':
        return '🤖';
      default:
        return '💳';
    }
  };

  const getMethodFeatures = (method) => {
    const features = [];
    
    if (method.processingFee < 3) {
      features.push('Low fees');
    }
    
    if (method.maxAmount > 10000) {
      features.push('High limits');
    }
    
    if (method.requiresHTTPS) {
      features.push('Secure');
    }
    
    return features;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment Method
        </h3>
        <Shield className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>

      {availableMethods.length === 0 ? (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No payment methods available for this amount or location.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {availableMethods.map((method) => {
            const isSelected = selectedPaymentMethod === method.key;
            const features = getMethodFeatures(method);
            
            return (
              <div
                key={method.key}
                onClick={() => handleMethodSelect(method.key)}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${isSelected ? 'scale-110' : ''} transition-transform duration-200`}>
                      {getMethodIcon(method)}
                    </div>
                    <div>
                      <h4 className={`font-medium ${isSelected ? 'text-primary-700 dark:text-primary-300' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {method.name}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                    <div className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="text-xs">
                        {method.processingFee}% + ${method.fixedFee}
                      </div>
                      <div className="text-xs">
                        Fee: ${((amount * method.processingFee) / 100 + method.fixedFee).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {features.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isSelected
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-200'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {method.requiresHTTPS && window.location.protocol !== 'https:' && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Requires HTTPS connection
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>• All payments are processed securely</p>
        <p>• Your payment information is encrypted</p>
        <p>• We never store your payment details</p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 