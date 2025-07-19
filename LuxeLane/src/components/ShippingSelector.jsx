import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { useShipping } from '../context/ShippingContext';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const ShippingSelector = ({ subtotal = 0, weight = 1, onSelect }) => {
  const { 
    shippingZones, 
    couriers, 
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
  } = useShipping();
  
  const { isDarkMode } = useTheme();
  const [addressErrors, setAddressErrors] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);

  const availableZones = getAvailableZones(shippingAddress);
  const availableCouriers = selectedZone ? getAvailableCouriers(selectedZone) : [];

  useEffect(() => {
    // Auto-select first available zone if none selected
    if (availableZones.length > 0 && !selectedZone) {
      setSelectedZone(availableZones[0].key);
    }
  }, [availableZones, selectedZone, setSelectedZone]);

  useEffect(() => {
    // Auto-select first available courier if none selected
    if (availableCouriers.length > 0 && !selectedCourier) {
      setSelectedCourier(availableCouriers[0].key);
    }
  }, [availableCouriers, selectedCourier, setSelectedCourier]);

  const handleZoneSelect = (zoneKey) => {
    setSelectedZone(zoneKey);
    setSelectedCourier(null); // Reset courier selection
    if (onSelect) {
      onSelect({ zone: zoneKey, courier: null });
    }
  };

  const handleCourierSelect = (courierKey) => {
    setSelectedCourier(courierKey);
    if (onSelect) {
      onSelect({ zone: selectedZone, courier: courierKey });
    }
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (addressErrors[field]) {
      setAddressErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateAndUpdateAddress = () => {
    const validation = validateAddress(shippingAddress);
    setAddressErrors(validation.errors);
    
    if (validation.isValid) {
      setShowAddressForm(false);
    }
  };

  const getShippingCost = (zoneKey, courierKey) => {
    return calculateShippingCost(zoneKey, courierKey, weight, subtotal);
  };

  const getDeliveryDate = (zoneKey, courierKey) => {
    return estimateDeliveryDate(zoneKey, courierKey);
  };

  const formatDeliveryDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' }
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Shipping Options
        </h3>
        <Truck className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>

      {/* Address Form */}
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Shipping Address
            </span>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            {showAddressForm ? 'Hide' : 'Edit'}
          </Button>
        </div>

        {showAddressForm ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Country
                </label>
                <select
                  value={shippingAddress.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    addressErrors.country ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {addressErrors.country && (
                  <p className="text-red-500 text-xs mt-1">{addressErrors.country}</p>
                )}
              </div>

              {shippingAddress.country === 'US' && (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    State
                  </label>
                  <select
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      addressErrors.state ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {usStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {addressErrors.state && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.state}</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  City
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    addressErrors.city ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                />
                {addressErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{addressErrors.city}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  value={shippingAddress.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    addressErrors.zipCode ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Enter ZIP code"
                />
                {addressErrors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">{addressErrors.zipCode}</p>
                )}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Street Address
              </label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => handleAddressChange('address', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  addressErrors.address ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
                placeholder="Enter street address"
              />
              {addressErrors.address && (
                <p className="text-red-500 text-xs mt-1">{addressErrors.address}</p>
              )}
            </div>

            <Button onClick={validateAndUpdateAddress} className="w-full">
              Update Address
            </Button>
          </div>
        ) : (
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {shippingAddress.city && shippingAddress.state ? (
              <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            ) : (
              <p>Please enter your shipping address to see available options.</p>
            )}
          </div>
        )}
      </div>

      {/* Shipping Zones */}
      {availableZones.length > 0 ? (
        <div className="space-y-4">
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Available Shipping Zones
          </h4>
          
          <div className="grid gap-3">
            {availableZones.map((zone) => {
              const isSelected = selectedZone === zone.key;
              const zoneCouriers = getAvailableCouriers(zone.key);
              
              return (
                <div
                  key={zone.key}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ease-in-out ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Package className={`h-5 w-5 ${isSelected ? 'text-primary-600' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <h5 className={`font-medium ${isSelected ? 'text-primary-700 dark:text-primary-300' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {zone.name}
                        </h5>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {zone.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isSelected ? "primary" : "outline"}
                      size="small"
                      onClick={() => handleZoneSelect(zone.key)}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </Button>
                  </div>

                  {isSelected && zoneCouriers.length > 0 && (
                    <div className="space-y-3">
                      <h6 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Available Couriers
                      </h6>
                      
                      <div className="grid gap-2">
                        {zoneCouriers.map((courier) => {
                          const isCourierSelected = selectedCourier === courier.key;
                          const shippingCost = getShippingCost(zone.key, courier.key);
                          const deliveryDate = getDeliveryDate(zone.key, courier.key);
                          const isFreeShipping = shippingCost === 0;
                          
                          return (
                            <div
                              key={courier.key}
                              onClick={() => handleCourierSelect(courier.key)}
                              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${
                                isCourierSelected
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                  : isDarkMode
                                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-xl">{courier.icon}</span>
                                  <div>
                                    <div className={`font-medium ${isCourierSelected ? 'text-primary-700 dark:text-primary-300' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {courier.name}
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {courier.deliveryTime}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className={`font-medium ${isFreeShipping ? 'text-green-600 dark:text-green-400' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                                  </div>
                                  {deliveryDate && (
                                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {formatDeliveryDate(deliveryDate)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {isFreeShipping && (
                                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-sm text-green-800 dark:text-green-200">
                                  🎉 Free shipping on orders over ${zone.freeShippingThreshold}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No shipping options available for this location.</p>
          <p className="text-sm mt-2">Please update your shipping address.</p>
        </div>
      )}

      {/* Shipping Info */}
      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>• Delivery times are estimates and may vary</p>
        <p>• Free shipping applies to eligible orders</p>
        <p>• International orders may incur additional customs fees</p>
      </div>
    </div>
  );
};

export default ShippingSelector; 