import React, { useState, useEffect } from 'react';
import banner1 from '../assets/Banner.jpg';
import banner2 from '../assets/Banner 2.jpg';
import banner3 from '../assets/Banner 3.jpg';
import banner4 from '../assets/Banner 4.jpg';
import banner5 from '../assets/Banner 5.jpg';

const BannerSlideshow = ({ isDarkMode, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bannerImages = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`LuxeLane Banner ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            {!isDarkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-editorial-gold/10 via-transparent to-editorial-navy/10"></div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 text-editorial-gold hover:bg-editorial-gold hover:text-editorial-white transition-all duration-300 rounded-none opacity-0 hover:opacity-100 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 text-editorial-gold hover:bg-editorial-gold hover:text-editorial-white transition-all duration-300 rounded-none opacity-0 hover:opacity-100 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-editorial-gold scale-125'
                : 'bg-editorial-white/50 hover:bg-editorial-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 px-4 py-2 text-editorial-gold text-sm font-medium">
        {currentSlide + 1} / {bannerImages.length}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default BannerSlideshow; 