import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Truck, Shield, Headphones, Heart, MessageCircle, Share, Instagram, Play, Music, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const ReelsSlideshow = ({ reels, videoRefs, playingVideos, toggleVideo, handleVideoEnded, setPlayingVideos }) => {
  const [currentReel, setCurrentReel] = useState(0);

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const goToReel = (index) => {
    setCurrentReel(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Reel Display */}
      <div className="relative aspect-[9/16] max-h-[600px] overflow-hidden bg-editorial-black rounded-none shadow-2xl">
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentReel ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[reel.id] = el)}
              src={reel.video}
              className="w-full h-full object-cover object-center"
              loop
              muted
              playsInline
              onEnded={() => handleVideoEnded(reel.id)}
              onPlay={() => setPlayingVideos(prev => ({ ...prev, [reel.id]: true }))}
              onPause={() => setPlayingVideos(prev => ({ ...prev, [reel.id]: false }))}
            />
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Play/Pause Button */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => toggleVideo(reel.id)}
            >
              <div className={`w-20 h-20 bg-editorial-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${playingVideos[reel.id] ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                {playingVideos[reel.id] ? (
                  <Pause className="w-10 h-10 text-editorial-white" fill="currentColor" />
                ) : (
                  <Play className="w-10 h-10 text-editorial-white ml-1" fill="currentColor" />
                )}
              </div>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-6 right-6 bg-black/70 text-editorial-white px-3 py-2 rounded text-sm font-medium">
              {reel.duration}
            </div>
            
            {/* Product Tag */}
            <div className="absolute top-6 left-6 bg-editorial-gold text-editorial-white px-4 py-2 rounded-none text-sm font-bold">
              {reel.productTag}
            </div>
            
            {/* Music Info */}
            <div className="absolute bottom-6 left-6 max-w-[70%]">
              <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm text-editorial-white px-4 py-2 rounded">
                <Music className="w-5 h-5" />
                <span className="text-sm truncate">{reel.music}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevReel}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 text-editorial-gold hover:bg-editorial-gold hover:text-editorial-white transition-all duration-300 rounded-none"
        aria-label="Previous reel post"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextReel}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 text-editorial-gold hover:bg-editorial-gold hover:text-editorial-white transition-all duration-300 rounded-none"
        aria-label="Next reel post"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Reel Post Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReel(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentReel
                ? 'bg-editorial-gold scale-125'
                : 'bg-editorial-white/50 hover:bg-editorial-white/80'
            }`}
            aria-label={`Go to reel post ${index + 1}`}
          />
        ))}
      </div>

      {/* Reel Post Counter */}
      <div className="absolute top-6 right-6 z-20 bg-editorial-white/20 backdrop-blur-sm border border-editorial-gold/30 px-4 py-2 text-editorial-gold text-sm font-medium">
        {currentReel + 1} / {reels.length}
      </div>

      {/* Current Reel Post Info */}
      <div className="mt-8 bg-editorial-white dark:bg-editorial-black rounded-none p-6 shadow-xl">
        {/* Creator Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-editorial-gold to-editorial-navy rounded-full flex items-center justify-center">
              <span className="text-editorial-white font-bold text-sm">
                {reels[currentReel].modelName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="editorial-body font-medium text-lg">{reels[currentReel].modelName}</span>
                {reels[currentReel].verified && (
                  <div className="w-5 h-5 bg-editorial-gold rounded-full flex items-center justify-center">
                    <span className="text-editorial-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <span className="editorial-body text-sm text-editorial-silver">{reels[currentReel].username}</span>
            </div>
          </div>
          <Instagram className="w-6 h-6 text-editorial-silver" />
        </div>
        
        {/* Caption */}
        <p className="editorial-body text-base mb-6 leading-relaxed">
          <span className="font-medium">{reels[currentReel].username}</span> {reels[currentReel].caption}
        </p>
        
        {/* Reel Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-editorial-silver hover:text-editorial-gold transition-colors duration-300">
              <Heart className="w-6 h-6" />
              <span className="editorial-body text-base">{reels[currentReel].likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-editorial-silver hover:text-editorial-gold transition-colors duration-300">
              <MessageCircle className="w-6 h-6" />
              <span className="editorial-body text-base">{reels[currentReel].comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-editorial-silver hover:text-editorial-gold transition-colors duration-300">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <span className="editorial-body text-sm text-editorial-silver">{reels[currentReel].views} views</span>
        </div>
        
        {/* Shop Now Button */}
        <Link to="/products">
          <button className="editorial-btn-primary w-full group text-lg py-4">
            <ShoppingCart className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-600" />
            Shop This Look
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReelsSlideshow; 