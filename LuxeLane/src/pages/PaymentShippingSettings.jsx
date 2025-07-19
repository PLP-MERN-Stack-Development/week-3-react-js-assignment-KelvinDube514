import React, { useState } from 'react';
import { Settings, CreditCard, Truck, Save, Plus, Trash2, Edit } from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import { useShipping } from '../context/ShippingContext';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';

const PaymentShippingSettings = () => {
  const { paymentMethods, setPaymentMethods } = usePayment();
  const { shippingZones, setShippingZones, couriers, setCouriers } = useShipping();
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState('payments');
  const [editingMethod, setEditingMethod] = useState(null);
  const [editingZone, setEditingZone] = useState(null);
  const [editingCourier, setEditingCourier] = useState(null);

  const handlePaymentMethodToggle = (methodKey) => {
    setPaymentMethods(prev => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        enabled: !prev[methodKey].enabled
      }
    }));
  };

  const handlePaymentMethodEdit = (methodKey) => {
    setEditingMethod(methodKey);
  };

  const handlePaymentMethodSave = (methodKey, updatedData) => {
    setPaymentMethods(prev => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        ...updatedData
      }
    }));
    setEditingMethod(null);
  };

  const handleShippingZoneEdit = (zoneKey) => {
    setEditingZone(zoneKey);
  };

  const handleShippingZoneSave = (zoneKey, updatedData) => {
    setShippingZones(prev => ({
      ...prev,
      [zoneKey]: {
        ...prev[zoneKey],
        ...updatedData
      }
    }));
    setEditingZone(null);
  };

  const handleCourierEdit = (courierKey) => {
    setEditingCourier(courierKey);
  };

  const handleCourierSave = (courierKey, updatedData) => {
    setCouriers(prev => ({
      ...prev,
      [courierKey]: {
        ...prev[courierKey],
        ...updatedData
      }
    }));
    setEditingCourier(null);
  };

  const tabs = [
    { id: 'payments', name: 'Payment Methods', icon: CreditCard },
    { id: 'shipping', name: 'Shipping Zones', icon: Truck },
    { id: 'couriers', name: 'Couriers', icon: Truck }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Payment & Shipping Settings</h1>
          </div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Configure payment methods, shipping zones, and courier options
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Payment Methods */}
          {activeTab === 'payments' && (
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <Button variant="outline" size="small">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Method
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.entries(paymentMethods).map(([key, method]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{method.icon}</div>
                          <div>
                            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {method.name}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {method.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={method.enabled}
                              onChange={() => handlePaymentMethodToggle(key)}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                              method.enabled
                                ? 'bg-primary-600'
                                : isDarkMode
                                  ? 'bg-gray-600'
                                  : 'bg-gray-200'
                            }`}></div>
                          </label>

                          <Button
                            variant="ghost"
                            size="small"
                            onClick={() => handlePaymentMethodEdit(key)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {editingMethod === key && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Processing Fee (%)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={method.processingFee}
                                onChange={(e) => handlePaymentMethodSave(key, { processingFee: parseFloat(e.target.value) })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Fixed Fee ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={method.fixedFee}
                                onChange={(e) => handlePaymentMethodSave(key, { fixedFee: parseFloat(e.target.value) })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="small"
                              onClick={() => setEditingMethod(null)}
                            >
                              Cancel
                            </Button>
                            <Button size="small">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Shipping Zones */}
          {activeTab === 'shipping' && (
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Shipping Zones</h2>
                  <Button variant="outline" size="small">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Zone
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.entries(shippingZones).map(([key, zone]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {zone.name}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {zone.description}
                          </p>
                          <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Base Rate: ${zone.baseRate} | Free Shipping: ${zone.freeShippingThreshold}+
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => handleShippingZoneEdit(key)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      {editingZone === key && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Base Rate ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={zone.baseRate}
                                onChange={(e) => handleShippingZoneSave(key, { baseRate: parseFloat(e.target.value) })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Free Shipping Threshold ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={zone.freeShippingThreshold}
                                onChange={(e) => handleShippingZoneSave(key, { freeShippingThreshold: parseFloat(e.target.value) })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="small"
                              onClick={() => setEditingZone(null)}
                            >
                              Cancel
                            </Button>
                            <Button size="small">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Couriers */}
          {activeTab === 'couriers' && (
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Courier Services</h2>
                  <Button variant="outline" size="small">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Courier
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.entries(couriers).map(([key, courier]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{courier.icon}</div>
                          <div>
                            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {courier.name}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {courier.description}
                            </p>
                            <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              Base Rate: ${courier.baseRate} | Delivery: {courier.deliveryTime}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => handleCourierEdit(key)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      {editingCourier === key && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Base Rate ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={courier.baseRate}
                                onChange={(e) => handleCourierSave(key, { baseRate: parseFloat(e.target.value) })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Delivery Time
                              </label>
                              <input
                                type="text"
                                value={courier.deliveryTime}
                                onChange={(e) => handleCourierSave(key, { deliveryTime: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                  isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                                }`}
                                placeholder="e.g., 3-5 business days"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="small"
                              onClick={() => setEditingCourier(null)}
                            >
                              Cancel
                            </Button>
                            <Button size="small">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentShippingSettings; 