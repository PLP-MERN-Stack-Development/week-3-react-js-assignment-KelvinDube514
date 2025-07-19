import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer">
      <div className="editorial-container editorial-p-8">
        <div className="editorial-grid-2">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 editorial-slide-up">
            <div className="flex items-center space-x-3 editorial-mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-editorial-navy to-editorial-gold rounded-none flex items-center justify-center transform group-hover:scale-110 transition-transform duration-600">
                <span className="text-white font-display font-bold text-xl">L</span>
              </div>
              <span className={`text-2xl font-display font-bold editorial-heading ${isDarkMode ? 'text-editorial-gold' : 'text-white font-semibold'}`}>LuxeLane</span>
            </div>
            <p className={`editorial-body editorial-mb-6 max-w-md leading-relaxed ${isDarkMode ? 'text-editorial-gold' : 'text-white font-medium'}`}>
              Your premier destination for luxury fashion and lifestyle products. 
              Discover curated collections that elevate your everyday style.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className={`p-3 transition-all duration-600 ease-in-out transform hover:scale-110 hover:rotate-12 ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold editorial-focus`}
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className={`p-3 transition-all duration-600 ease-in-out transform hover:scale-110 hover:rotate-12 ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold editorial-focus`}
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className={`p-3 transition-all duration-600 ease-in-out transform hover:scale-110 hover:rotate-12 ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold editorial-focus`}
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="editorial-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className={`editorial-subheading text-xl editorial-mb-4 ${isDarkMode ? 'text-editorial-gold' : 'text-white font-semibold'}`}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="editorial-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className={`editorial-subheading text-xl editorial-mb-4 ${isDarkMode ? 'text-editorial-gold' : 'text-white font-semibold'}`}>Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/help" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/size-guide" 
                  className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} hover:text-editorial-gold transition-all duration-600 ease-in-out transform hover:translate-x-2 block px-2 py-2`}
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-editorial-charcoal editorial-mt-8 editorial-pt-8 editorial-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="editorial-grid-3">
            <div className="flex items-center space-x-4 group">
              <div className="p-3 rounded-none transition-all duration-600 group-hover:scale-110 bg-editorial-charcoal text-white group-hover:text-editorial-gold">
                <Mail className="h-6 w-6" />
              </div>
              <span className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} group-hover:text-editorial-gold transition-colors duration-600`}>support@luxelane.com</span>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="p-3 rounded-none transition-all duration-600 group-hover:scale-110 bg-editorial-charcoal text-white group-hover:text-editorial-gold">
                <Phone className="h-6 w-6" />
              </div>
              <span className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} group-hover:text-editorial-gold transition-colors duration-600`}>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-4 group sm:col-span-2 lg:col-span-1">
              <div className="p-3 rounded-none transition-all duration-600 group-hover:scale-110 bg-editorial-charcoal text-white group-hover:text-editorial-gold">
                <MapPin className="h-6 w-6" />
              </div>
              <span className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} group-hover:text-editorial-gold transition-colors duration-600`}>123 Fashion Ave, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-editorial-charcoal editorial-mt-8 editorial-pt-8 editorial-text-center editorial-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className={`editorial-body ${isDarkMode ? 'text-editorial-gold' : 'text-white'} text-sm sm:text-base`}>
            © 2024 LuxeLane. All rights reserved. | 
            <Link to="/privacy" className="ml-2 hover:text-editorial-gold transition-colors duration-600">
              Privacy Policy
            </Link> | 
            <Link to="/terms" className="ml-2 hover:text-editorial-gold transition-colors duration-600">
              Terms of Service
            </Link>
          </p>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-none shadow-2xl transition-all duration-600 ease-in-out transform hover:scale-110 hover:-translate-y-2 bg-editorial-gold hover:bg-editorial-navy text-editorial-white z-50 editorial-focus"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer; 