import { createContext, useContext, useState, useEffect } from 'react';

const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingZones, setShippingZones] = useState({
    local: {
      name: 'Local Delivery',
      countries: ['US'],
      states: ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'],
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
      couriers: ['local', 'fedex', 'ups', 'usps'],
      baseRate: 5.99,
      freeShippingThreshold: 50,
      deliveryTime: '1-2 business days',
      description: 'Fast local delivery within major cities'
    },
    domestic: {
      name: 'Domestic Shipping',
      countries: ['US'],
      couriers: ['fedex', 'ups', 'usps'],
      baseRate: 8.99,
      freeShippingThreshold: 75,
      deliveryTime: '3-5 business days',
      description: 'Standard shipping across the United States'
    },
    canada: {
      name: 'Canada',
      countries: ['CA'],
      couriers: ['fedex', 'ups', 'dhl'],
      baseRate: 15.99,
      freeShippingThreshold: 100,
      deliveryTime: '5-7 business days',
      description: 'Shipping to Canada'
    },
    europe: {
      name: 'Europe',
      countries: ['UK', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IE', 'PT', 'GR'],
      couriers: ['dhl', 'fedex', 'ups'],
      baseRate: 25.99,
      freeShippingThreshold: 150,
      deliveryTime: '7-10 business days',
      description: 'Shipping to European countries'
    },
    international: {
      name: 'International',
      countries: ['AU', 'JP', 'KR', 'SG', 'NZ', 'BR', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'IN', 'CN', 'HK', 'TW', 'TH', 'MY', 'ID', 'PH', 'VN', 'AE', 'SA', 'IL', 'ZA', 'EG', 'MA', 'TN', 'DZ', 'LY'],
      couriers: ['dhl', 'fedex', 'ups'],
      baseRate: 35.99,
      freeShippingThreshold: 200,
      deliveryTime: '10-15 business days',
      description: 'International shipping worldwide'
    }
  });

  const [couriers, setCouriers] = useState({
    local: {
      name: 'Local Courier',
      description: 'Same-day or next-day delivery within city limits',
      icon: '🚚',
      baseRate: 5.99,
      deliveryTime: '1-2 business days',
      tracking: true,
      insurance: 100,
      weightLimit: 50, // lbs
      dimensions: '24x18x12 inches'
    },
    usps: {
      name: 'USPS',
      description: 'United States Postal Service',
      icon: '📮',
      baseRate: 7.99,
      deliveryTime: '3-5 business days',
      tracking: true,
      insurance: 50,
      weightLimit: 70,
      dimensions: '108 inches (length + girth)'
    },
    fedex: {
      name: 'FedEx',
      description: 'Federal Express',
      icon: '📦',
      baseRate: 12.99,
      deliveryTime: '2-3 business days',
      tracking: true,
      insurance: 100,
      weightLimit: 150,
      dimensions: '165 inches (length + girth)'
    },
    ups: {
      name: 'UPS',
      description: 'United Parcel Service',
      icon: '🚛',
      baseRate: 11.99,
      deliveryTime: '2-3 business days',
      tracking: true,
      insurance: 100,
      weightLimit: 150,
      dimensions: '165 inches (length + girth)'
    },
    dhl: {
      name: 'DHL',
      description: 'DHL Express',
      icon: '✈️',
      baseRate: 25.99,
      deliveryTime: '3-5 business days',
      tracking: true,
      insurance: 100,
      weightLimit: 70,
      dimensions: '118 inches (length + girth)'
    }
  });

  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    country: 'US',
    state: '',
    city: '',
    zipCode: '',
    address: ''
  });

  const calculateShippingCost = (zone, courier, weight = 1, subtotal = 0) => {
    if (!zone || !courier) return 0;

    const zoneConfig = shippingZones[zone];
    const courierConfig = couriers[courier];

    if (!zoneConfig || !courierConfig) return 0;

    // Check if free shipping applies
    if (subtotal >= zoneConfig.freeShippingThreshold) {
      return 0;
    }

    // Base rate calculation
    let cost = courierConfig.baseRate;

    // Weight-based adjustments
    if (weight > 5) {
      cost += (weight - 5) * 2; // $2 per additional pound
    }

    // Zone-specific adjustments
    if (zone === 'international') {
      cost += 10; // Additional international fee
    } else if (zone === 'europe') {
      cost += 5; // Additional Europe fee
    }

    return Math.round(cost * 100) / 100; // Round to 2 decimal places
  };

  const getAvailableZones = (address) => {
    return Object.entries(shippingZones)
      .filter(([key, zone]) => {
        if (zone.countries && !zone.countries.includes(address.country)) {
          return false;
        }
        if (zone.states && address.state && !zone.states.includes(address.state)) {
          return false;
        }
        if (zone.cities && address.city && !zone.cities.includes(address.city)) {
          return false;
        }
        return true;
      })
      .map(([key, zone]) => ({ key, ...zone }));
  };

  const getAvailableCouriers = (zone) => {
    if (!zone) return [];
    
    const zoneConfig = shippingZones[zone];
    if (!zoneConfig) return [];

    return zoneConfig.couriers
      .map(courierKey => ({ key: courierKey, ...couriers[courierKey] }))
      .filter(courier => courier); // Filter out undefined couriers
  };

  const validateAddress = (address) => {
    const errors = {};

    if (!address.country) {
      errors.country = 'Country is required';
    }

    if (!address.state && address.country === 'US') {
      errors.state = 'State is required for US addresses';
    }

    if (!address.city) {
      errors.city = 'City is required';
    }

    if (!address.zipCode) {
      errors.zipCode = 'ZIP/Postal code is required';
    }

    if (!address.address) {
      errors.address = 'Street address is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const estimateDeliveryDate = (zone, courier) => {
    if (!zone || !courier) return null;

    const zoneConfig = shippingZones[zone];
    const courierConfig = couriers[courier];

    if (!zoneConfig || !courierConfig) return null;

    const today = new Date();
    const deliveryDays = parseInt(courierConfig.deliveryTime.split('-')[1]);
    
    // Add business days (excluding weekends)
    let businessDays = 0;
    let currentDate = new Date(today);
    
    while (businessDays < deliveryDays) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        businessDays++;
      }
    }

    return currentDate;
  };

  const value = {
    shippingZones,
    setShippingZones,
    couriers,
    setCouriers,
    selectedZone,
    setSelectedZone,
    selectedCourier,
    setSelectedCourier,
    shippingAddress,
    setShippingAddress,
    calculateShippingCost,
    getAvailableZones,
    getAvailableCouriers,
    validateAddress,
    estimateDeliveryDate
  };

  return (
    <ShippingContext.Provider value={value}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error('useShipping must be used within a ShippingProvider');
  }
  return context;
}; 