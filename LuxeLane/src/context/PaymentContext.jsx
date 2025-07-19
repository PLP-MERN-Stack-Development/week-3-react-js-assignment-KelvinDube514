import { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState({
    paypal: {
      enabled: true,
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: '💳',
      processingFee: 2.9,
      fixedFee: 0.30,
      supportedCountries: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      minAmount: 1,
      maxAmount: 10000
    },
    stripe: {
      enabled: true,
      name: 'Stripe',
      description: 'Secure payment with Stripe',
      icon: '💳',
      processingFee: 2.9,
      fixedFee: 0.30,
      supportedCountries: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      minAmount: 0.50,
      maxAmount: 999999
    },
    creditCard: {
      enabled: true,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
      processingFee: 2.9,
      fixedFee: 0.30,
      supportedCountries: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      minAmount: 1,
      maxAmount: 50000
    },
    applePay: {
      enabled: true,
      name: 'Apple Pay',
      description: 'Quick and secure with Apple Pay',
      icon: '🍎',
      processingFee: 2.9,
      fixedFee: 0.30,
      supportedCountries: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      minAmount: 1,
      maxAmount: 10000,
      requiresHTTPS: true
    },
    googlePay: {
      enabled: true,
      name: 'Google Pay',
      description: 'Fast checkout with Google Pay',
      icon: '🤖',
      processingFee: 2.9,
      fixedFee: 0.30,
      supportedCountries: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      minAmount: 1,
      maxAmount: 10000,
      requiresHTTPS: true
    }
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const calculateProcessingFee = (amount, method) => {
    const methodConfig = paymentMethods[method];
    if (!methodConfig) return 0;
    
    const percentageFee = (amount * methodConfig.processingFee) / 100;
    return percentageFee + methodConfig.fixedFee;
  };

  const getAvailablePaymentMethods = (amount, country) => {
    return Object.entries(paymentMethods)
      .filter(([key, method]) => {
        if (!method.enabled) return false;
        if (amount < method.minAmount || amount > method.maxAmount) return false;
        if (!method.supportedCountries.includes(country)) return false;
        if (method.requiresHTTPS && window.location.protocol !== 'https:') return false;
        return true;
      })
      .map(([key, method]) => ({ key, ...method }));
  };

  const processPayment = async (paymentData) => {
    setPaymentProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with actual payment gateways
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (!success) {
        throw new Error('Payment failed. Please try again.');
      }
      
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: paymentData.amount,
        method: paymentData.method
      };
    } catch (error) {
      throw error;
    } finally {
      setPaymentProcessing(false);
    }
  };

  const value = {
    paymentMethods,
    setPaymentMethods,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentProcessing,
    calculateProcessingFee,
    getAvailablePaymentMethods,
    processPayment
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 