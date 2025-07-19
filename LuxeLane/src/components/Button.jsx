import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  animate = false,
  loading = false,
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: `bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-md hover:shadow-lg ${
      isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
    }`,
    secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 ${
      isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 focus:ring-offset-gray-900' : 'focus:ring-offset-white'
    }`,
    danger: `bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg ${
      isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
    }`,
    outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 ${
      isDarkMode ? 'border-primary-400 text-primary-400 hover:bg-primary-400 focus:ring-offset-gray-900' : 'focus:ring-offset-white'
    }`,
    ghost: `text-primary-600 hover:bg-primary-50 focus:ring-primary-500 ${
      isDarkMode ? 'text-primary-400 hover:bg-primary-900/20 focus:ring-offset-gray-900' : 'focus:ring-offset-white'
    }`
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg sm:px-8 sm:py-4'
  };
  
  const animateClasses = animate ? 'animate-bounce-gentle' : '';
  const loadingClasses = loading ? 'opacity-75 cursor-wait' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${animateClasses} ${loadingClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 