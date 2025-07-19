import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="editorial-nav">
      <div className="editorial-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-editorial-navy to-editorial-gold rounded-none flex items-center justify-center transform group-hover:scale-110 transition-transform duration-600">
              <span className="text-white font-display font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-display font-bold editorial-heading">LuxeLane</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="editorial-nav-link">
              Home
            </Link>
            <Link to="/products" className="editorial-nav-link">
              Products
            </Link>
            <Link to="/tasks" className="editorial-nav-link">
              Tasks
            </Link>
            <Link to="/api-demo" className="editorial-nav-link">
              API Demo
            </Link>
            <Link to="/about" className="editorial-nav-link">
              About
            </Link>
            <Link to="/contact" className="editorial-nav-link">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-editorial-silver focus:border-editorial-gold bg-transparent editorial-body focus:outline-none transition-all duration-600"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-editorial-silver group-focus-within:text-editorial-gold transition-colors duration-600" />
              </div>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 transition-all duration-600 ease-in-out transform hover:scale-110 editorial-focus"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-editorial-gold animate-pulse-slow" />
              ) : (
                <Moon className="h-6 w-6 text-editorial-navy animate-pulse-slow" />
              )}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-3 transition-all duration-600 ease-in-out transform hover:scale-110 editorial-focus">
              <ShoppingCart className="h-7 w-7 text-editorial-navy dark:text-editorial-gold" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-editorial-gold text-editorial-white text-xs rounded-none h-6 w-6 flex items-center justify-center animate-bounce-gentle font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-3 transition-all duration-600 ease-in-out transform hover:scale-105 editorial-focus">
                  <User className="h-7 w-7 text-editorial-navy dark:text-editorial-gold" />
                  <span className="hidden sm:block editorial-body font-medium">{user?.name || 'User'}</span>
                </button>
                <div className="absolute right-0 mt-4 w-56 editorial-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-600 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                  <Link to="/profile" className="block px-6 py-4 editorial-body transition-colors duration-600 hover:bg-editorial-cream dark:hover:bg-editorial-charcoal">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-6 py-4 editorial-body transition-colors duration-600 hover:bg-editorial-cream dark:hover:bg-editorial-charcoal">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-6 py-4 editorial-body transition-colors duration-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="editorial-btn">
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 transition-all duration-600 ease-in-out transform hover:scale-110 editorial-focus"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-7 w-7 text-editorial-navy dark:text-editorial-gold animate-scale-in" />
              ) : (
                <Menu className="h-7 w-7 text-editorial-navy dark:text-editorial-gold animate-scale-in" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-600 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/tasks"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tasks
            </Link>
            <Link
              to="/api-demo"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              API Demo
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 editorial-nav-link transition-all duration-600 ease-in-out transform hover:scale-105 hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-editorial-silver focus:border-editorial-gold bg-transparent editorial-body focus:outline-none transition-all duration-600"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-editorial-silver" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 