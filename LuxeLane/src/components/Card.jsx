import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-4 sm:p-6',
  shadow = 'shadow-md',
  hover = false,
  animate = false,
  glass = false,
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  
  const baseClasses = `rounded-lg border transition-all duration-300 ease-in-out ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-100' 
      : 'bg-white border-gray-200 text-gray-900'
  }`;
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105 hover:-translate-y-1' : '';
  const animateClasses = animate ? 'animate-fade-in' : '';
  const glassClasses = glass ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-700/20' : '';
  
  const classes = `${baseClasses} ${shadow} ${padding} ${hoverClasses} ${animateClasses} ${glassClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 