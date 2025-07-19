import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderTracking from './pages/OrderTracking';
import TaskManager from './components/TaskManager';
import APIIntegration from './pages/APIIntegration';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PaymentProvider } from './context/PaymentContext';
import { ShippingProvider } from './context/ShippingContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <PaymentProvider>
            <ShippingProvider>
              <Router>
                <div className="min-h-screen flex flex-col editorial-fade-in">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/orders/:orderId" element={<OrderTracking />} />
                      <Route path="/tasks" element={<TaskManager />} />
                      <Route path="/api-demo" element={<APIIntegration />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </ShippingProvider>
          </PaymentProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;