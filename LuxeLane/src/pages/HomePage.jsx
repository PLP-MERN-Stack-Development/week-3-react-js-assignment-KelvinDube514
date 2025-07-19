import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Truck, Shield, Headphones, Heart, MessageCircle, Share, Instagram, Play, Music, Pause } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import BannerSlideshow from '../components/BannerSlideshow';
import ReelsSlideshow from '../components/ReelsSlideshow';
import silkDressVideo from '../assets/Elegant Silk Dress.mp4';
import whiteShirtVideo from '../assets/Classic White Shirt.mp4';
import blackPantsVideo from '../assets/Tailored Black Pants.mp4';
import goldHeelsVideo from '../assets/Gold Accent Heels.mp4';
import pearlEarringsVideo from '../assets/Pearl Drop Earrings.mp4';
import cashmereSweaterVideo from '../assets/Cashmere Sweater.mp4';
import bikiniVideo from '../assets/High-Waisted Bikini Set.mp4';
import monokiniVideo from '../assets/One-Piece Monokini.mp4';

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const featuredProducts = products.filter(product => product.featured);
  const [playingVideos, setPlayingVideos] = useState({});
  const videoRefs = useRef({});

  // Video control functions
  const toggleVideo = (reelId) => {
    const video = videoRefs.current[reelId];
    if (video) {
      if (playingVideos[reelId]) {
        video.pause();
        setPlayingVideos(prev => ({ ...prev, [reelId]: false }));
      } else {
        // Pause all other videos first
        Object.keys(playingVideos).forEach(id => {
          if (id !== reelId.toString() && playingVideos[id]) {
            const otherVideo = videoRefs.current[id];
            if (otherVideo) {
              otherVideo.pause();
            }
          }
        });
        video.play();
        setPlayingVideos(prev => ({ ...prev, [reelId]: true }));
      }
    }
  };

  const handleVideoEnded = (reelId) => {
    setPlayingVideos(prev => ({ ...prev, [reelId]: false }));
  };

  // Social media reels data
  const socialReels = [
    {
      id: 1,
      username: "@sophia_style",
      modelName: "Sophia Chen",
      video: goldHeelsVideo, // Changed from silkDressVideo
      caption: "Living my best life in these stunning gold heels from @luxelane ✨ The quality is absolutely incredible! #LuxeLane #GoldHeels #Fashion",
      likes: 1247,
      comments: 89,
      productTag: "Gold Accent Heels",
      verified: true,
      duration: "0:15",
      music: "Original Sound - Sophia Chen",
      views: "12.4K"
    },
    {
      id: 2,
      username: "@emma_fashion",
      modelName: "Emma Wilson",
      video: silkDressVideo, // Changed from whiteShirtVideo
      caption: "Elegant silk dress goals! This @luxelane piece is a wardrobe essential. Perfect for any special occasion 👗 #ElegantStyle #SilkDress",
      likes: 892,
      comments: 56,
      productTag: "Elegant Silk Dress",
      verified: true,
      duration: "0:12",
      music: "Fashion Vibes - Emma Wilson",
      views: "8.9K"
    },
    {
      id: 3,
      username: "@jessica_elegance",
      modelName: "Jessica Lee",
      video: pearlEarringsVideo, // Changed from blackPantsVideo
      caption: "These pearl earrings from @luxelane are everything! So elegant and sophisticated. Perfect for any occasion 💎 #PearlEarrings #ElegantAccessories",
      likes: 1567,
      comments: 123,
      productTag: "Pearl Drop Earrings",
      verified: false,
      duration: "0:18",
      music: "Elegant Beats - Jessica Lee",
      views: "15.6K"
    },
    {
      id: 4,
      username: "@olivia_glam",
      modelName: "Olivia Styles",
      video: blackPantsVideo, // Changed from goldHeelsVideo
      caption: "Tailored black pants that make every step feel confident! @luxelane never disappoints 👖✨ #TailoredFit #BlackPants #FashionForward",
      likes: 2034,
      comments: 167,
      productTag: "Tailored Black Pants",
      verified: true,
      duration: "0:14",
      music: "Luxury Groove - Olivia Styles",
      views: "20.3K"
    },
    {
      id: 5,
      username: "@grace_accessories",
      modelName: "Grace Williams",
      video: whiteShirtVideo, // Changed from pearlEarringsVideo
      caption: "Classic white shirt that adds the perfect touch of elegance to any outfit! @luxelane basics are simply divine 👔 #ClassicStyle #WhiteShirt #WardrobeEssential",
      likes: 1456,
      comments: 98,
      productTag: "Classic White Shirt",
      verified: false,
      duration: "0:11",
      music: "Pearl Melody - Grace Williams",
      views: "14.5K"
    },
    {
      id: 6,
      username: "@sarah_luxury",
      modelName: "Sarah Johnson",
      video: bikiniVideo, // Changed from cashmereSweaterVideo
      caption: "Beach luxury in this stunning bikini from @luxelane. The perfect fit for summer! 🏖️ #BeachStyle #Swimwear #SummerVibes",
      likes: 1789,
      comments: 134,
      productTag: "High-Waisted Bikini Set",
      verified: true,
      duration: "0:16",
      music: "Cozy Vibes - Sarah Johnson",
      views: "17.8K"
    },
    {
      id: 7,
      username: "@isabella_beach",
      modelName: "Isabella Martinez",
      video: cashmereSweaterVideo, // Changed from bikiniVideo
      caption: "Cozy vibes with this luxurious cashmere sweater from @luxelane! So soft and elegant 🧶 #CashmereLuxury #CozyStyle #WinterFashion",
      likes: 2341,
      comments: 187,
      productTag: "Cashmere Sweater",
      verified: true,
      duration: "0:13",
      music: "Beach Waves - Isabella Martinez",
      views: "23.4K"
    },
    {
      id: 8,
      username: "@alexandra_summer",
      modelName: "Alexandra Rodriguez",
      video: monokiniVideo, // Kept the same
      caption: "This one-piece monokini from @luxelane is everything! The cut-outs are so chic and the fit is perfect 👙✨ #Monokini #Swimwear #BeachReady",
      likes: 1987,
      comments: 156,
      productTag: "One-Piece Monokini",
      verified: false,
      duration: "0:17",
      music: "Summer Heat - Alexandra Rodriguez",
      views: "19.8K"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-editorial-white via-editorial-cream to-editorial-white dark:from-editorial-black dark:via-editorial-navy dark:to-editorial-black">
            {/* Elegant Hero Section with Background Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
        <BannerSlideshow isDarkMode={isDarkMode}>
          {/* Light Mode Specific Background Elements */}
          {!isDarkMode && (
            <>
              {/* Elegant Geometric Patterns */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 z-10">
                <div className="absolute top-20 left-20 w-64 h-64 border border-editorial-navy/20 rounded-full"></div>
                <div className="absolute top-40 right-32 w-48 h-48 border border-editorial-gold/20 rounded-full"></div>
                <div className="absolute bottom-32 left-1/3 w-32 h-32 border border-editorial-navy/20 rotate-45"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 border border-editorial-gold/20 rounded-full"></div>
              </div>
              
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-30 z-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A253' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              {/* Floating Elements */}
              <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-br from-editorial-gold/10 to-editorial-navy/10 rounded-full animate-float z-10"></div>
              <div className="absolute top-48 right-24 w-16 h-16 bg-gradient-to-br from-editorial-navy/10 to-editorial-gold/10 rounded-full animate-bounce-gentle z-10"></div>
              <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-editorial-gold/10 to-editorial-navy/10 rounded-full animate-pulse-slow z-10"></div>
            </>
          )}
          
          {/* Dark Mode Elements */}
          {isDarkMode && (
            <>
              <div className="absolute top-20 left-20 w-32 h-32 border-2 border-editorial-gold/30 rounded-full animate-spin-slow z-10"></div>
              <div className="absolute top-40 right-32 w-24 h-24 bg-editorial-gold/20 rounded-full animate-bounce-gentle z-10"></div>
              <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-editorial-navy/40 rotate-45 animate-pulse-slow z-10"></div>
              <div className="absolute bottom-20 right-20 w-20 h-20 bg-editorial-navy/20 rounded-full animate-float z-10"></div>
            </>
          )}
          
          {/* Modern Elegant Content Layout */}
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              
              {/* Centered Main Content */}
              <div className="text-center max-w-5xl mx-auto">
                
                {/* Top Badge - Floating Style */}
                <div className="inline-flex items-center space-x-4 mb-16 animate-fade-in-up">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-editorial-gold"></div>
                  <div className="px-8 py-3 bg-editorial-white/10 backdrop-blur-sm border border-editorial-gold/30 rounded-full">
                    <span className="text-sm font-semibold text-editorial-gold uppercase tracking-widest">Est. 2024</span>
                  </div>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-editorial-gold"></div>
                </div>
                
                {/* Main Heading - Single Focus */}
                <div className="mb-16 animate-fade-in-up">
                  <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none">
                    <span className="block bg-gradient-to-r from-editorial-gold via-editorial-white to-editorial-gold bg-clip-text text-transparent drop-shadow-2xl">
                      LANE
                    </span>
                  </h1>
                </div>
                
                {/* Elegant Divider - Enhanced */}
                <div className="flex items-center justify-center mb-16 animate-expand">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-editorial-gold"></div>
                  <div className="w-4 h-4 bg-editorial-gold mx-6 rotate-45"></div>
                  <div className="w-20 h-px bg-gradient-to-l from-transparent to-editorial-gold"></div>
                </div>
                
                {/* Subtitle - Modern Typography */}
                <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <p className="text-2xl sm:text-3xl md:text-4xl text-editorial-cream drop-shadow-lg font-light leading-relaxed mb-6">
                    Where <span className="text-editorial-gold font-medium">Elegance</span> Meets <span className="text-editorial-gold font-medium">Innovation</span>
                  </p>
                  <p className="text-lg sm:text-xl text-editorial-cream/80 drop-shadow-lg font-light">
                    Curated luxury for the modern connoisseur
                  </p>
                </div>
                
                {/* CTA Buttons - Modern Stack */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <Link to="/products" className="group">
                    <button className="relative overflow-hidden bg-gradient-to-r from-editorial-gold to-editorial-navy text-editorial-white px-12 py-6 text-lg font-semibold rounded-none transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-editorial-gold/25">
                      <span className="relative z-10 flex items-center">
                        Discover Collection
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-editorial-navy to-editorial-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                  </Link>
                  
                  <Link to="/about" className="group">
                    <button className="relative overflow-hidden border-2 border-editorial-white text-editorial-white px-12 py-6 text-lg font-semibold rounded-none transform hover:scale-105 transition-all duration-500 hover:bg-editorial-white hover:text-editorial-navy">
                      <span className="relative z-10">Our Legacy</span>
                      <div className="absolute inset-0 bg-editorial-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </button>
                  </Link>
                </div>
                
                {/* Stats - Modern Grid */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-editorial-gold drop-shadow-lg group-hover:scale-110 transition-transform duration-300">50K+</div>
                    <div className="text-sm text-editorial-cream/80 drop-shadow-lg font-light uppercase tracking-wider">Happy Customers</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-editorial-gold drop-shadow-lg group-hover:scale-110 transition-transform duration-300">1K+</div>
                    <div className="text-sm text-editorial-cream/80 drop-shadow-lg font-light uppercase tracking-wider">Luxury Items</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-editorial-gold drop-shadow-lg group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <div className="text-sm text-editorial-cream/80 drop-shadow-lg font-light uppercase tracking-wider">Support</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-editorial-gold/10 to-editorial-navy/10 rounded-full animate-float"></div>
              <div className="absolute top-1/3 right-12 w-24 h-24 bg-gradient-to-br from-editorial-navy/10 to-editorial-gold/10 rounded-full animate-bounce-gentle"></div>
              <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-editorial-gold/10 to-editorial-navy/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-editorial-navy/10 to-editorial-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Decorative Lines - Corner Elements */}
              <div className="absolute top-16 left-16 w-32 h-px bg-gradient-to-r from-transparent to-editorial-gold/50"></div>
              <div className="absolute top-16 left-16 w-px h-32 bg-gradient-to-b from-transparent to-editorial-gold/50"></div>
              <div className="absolute top-16 right-16 w-32 h-px bg-gradient-to-l from-transparent to-editorial-gold/50"></div>
              <div className="absolute top-16 right-16 w-px h-32 bg-gradient-to-b from-transparent to-editorial-gold/50"></div>
              <div className="absolute bottom-16 left-16 w-32 h-px bg-gradient-to-r from-transparent to-editorial-gold/50"></div>
              <div className="absolute bottom-16 left-16 w-px h-32 bg-gradient-to-t from-transparent to-editorial-gold/50"></div>
              <div className="absolute bottom-16 right-16 w-32 h-px bg-gradient-to-l from-transparent to-editorial-gold/50"></div>
              <div className="absolute bottom-16 right-16 w-px h-32 bg-gradient-to-t from-transparent to-editorial-gold/50"></div>
            </div>
          </div>
        </BannerSlideshow>
      </section>

      {/* Featured Products Section with Enhanced Design */}
      <section className="relative py-20 bg-gradient-to-b from-editorial-white to-editorial-cream dark:from-editorial-black dark:to-editorial-navy">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header with Enhanced Typography */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-editorial-gold uppercase tracking-wider">Curated Selection</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-editorial-navy dark:text-editorial-white mb-6">
              Featured
              <span className="block bg-gradient-to-r from-editorial-gold to-editorial-navy bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="text-lg sm:text-xl text-editorial-silver dark:text-editorial-cream max-w-3xl mx-auto leading-relaxed">
              Discover our most coveted pieces, meticulously crafted for those who appreciate the finer things in life
            </p>
          </div>
          
          {/* Products Grid with Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group relative bg-editorial-white dark:bg-editorial-black rounded-none overflow-hidden transform hover:scale-105 transition-all duration-700 shadow-xl hover:shadow-2xl hover:shadow-editorial-gold/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Sale Badge */}
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-editorial-gold to-editorial-navy text-editorial-white px-4 py-2 text-sm font-bold transform -rotate-12 shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  
                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link to={`/products/${product.id}`}>
                      <button className="bg-editorial-gold text-editorial-white px-6 py-3 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Quick View
                      </button>
                    </Link>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-editorial-navy dark:text-editorial-white mb-3 group-hover:text-editorial-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-editorial-silver dark:text-editorial-cream text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-editorial-gold fill-current'
                              : 'text-editorial-silver'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-editorial-silver ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-editorial-navy dark:text-editorial-white">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg line-through text-editorial-silver">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Link to={`/products/${product.id}`}>
                    <button className="w-full bg-gradient-to-r from-editorial-gold to-editorial-navy text-editorial-white py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        View Details
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <Link to="/products">
              <button className="group relative overflow-hidden border-2 border-editorial-navy dark:border-editorial-gold text-editorial-navy dark:text-editorial-gold px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-500">
                <span className="relative z-10 flex items-center">
                  Explore All Collections
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-editorial-navy dark:bg-editorial-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Reels Post Section with Enhanced Design */}
      <section className="relative py-20 bg-gradient-to-b from-editorial-cream to-editorial-white dark:from-editorial-navy dark:to-editorial-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header with Enhanced Typography */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-editorial-gold to-editorial-navy rounded-full flex items-center justify-center mr-4">
                <Instagram className="w-6 h-6 text-editorial-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-editorial-navy dark:text-editorial-white">
                #LuxeLane
                <span className="block bg-gradient-to-r from-editorial-gold to-editorial-navy bg-clip-text text-transparent">Reels Post</span>
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-editorial-silver dark:text-editorial-cream max-w-3xl mx-auto leading-relaxed">
              Watch our community bring LuxeLane pieces to life in stunning reels post that inspire and captivate
            </p>
          </div>
          
          {/* Reels Slideshow */}
          <div className="mb-16">
            <ReelsSlideshow 
              reels={socialReels}
              videoRefs={videoRefs}
              playingVideos={playingVideos}
              toggleVideo={toggleVideo}
              handleVideoEnded={handleVideoEnded}
              setPlayingVideos={setPlayingVideos}
            />
          </div>
          
          <div className="editorial-text-center editorial-mt-12 editorial-slide-up">
            <Link to="/products">
              <button className="editorial-btn group">
                Follow @LuxeLane
                <Instagram className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform duration-600" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="relative py-20 bg-gradient-to-b from-editorial-white to-editorial-cream dark:from-editorial-black dark:to-editorial-navy">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-editorial-navy dark:text-editorial-white mb-6">
              Why Choose
              <span className="block bg-gradient-to-r from-editorial-gold to-editorial-navy bg-clip-text text-transparent">LuxeLane</span>
            </h2>
            <p className="text-lg sm:text-xl text-editorial-silver dark:text-editorial-cream max-w-3xl mx-auto leading-relaxed">
              Experience luxury shopping with our premium services and exceptional customer care
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center transform hover:scale-105 transition-all duration-500">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-editorial-gold to-editorial-navy rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Truck className="w-12 h-12 text-editorial-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-editorial-gold rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-editorial-white">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-editorial-navy dark:text-editorial-white mb-4 group-hover:text-editorial-gold transition-colors duration-300">
                Free Shipping
              </h3>
              <p className="text-editorial-silver dark:text-editorial-cream leading-relaxed">
                Complimentary shipping on all orders over $50. Fast and secure delivery to your doorstep.
              </p>
            </div>
            
            <div className="group text-center transform hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-editorial-gold to-editorial-navy rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Shield className="w-12 h-12 text-editorial-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-editorial-gold rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-editorial-white">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-editorial-navy dark:text-editorial-white mb-4 group-hover:text-editorial-gold transition-colors duration-300">
                Quality Guarantee
              </h3>
              <p className="text-editorial-silver dark:text-editorial-cream leading-relaxed">
                30-day money-back guarantee on all purchases. We stand behind the quality of every piece.
              </p>
            </div>
            
            <div className="group text-center transform hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.4s' }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-editorial-gold to-editorial-navy rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl">
                  <Headphones className="w-12 h-12 text-editorial-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-editorial-gold rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-editorial-white">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-editorial-navy dark:text-editorial-white mb-4 group-hover:text-editorial-gold transition-colors duration-300">
                24/7 Support
              </h3>
              <p className="text-editorial-silver dark:text-editorial-cream leading-relaxed">
                Round-the-clock customer service. Our dedicated team is always here to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Enhanced Design */}
      <section className="relative py-20 bg-gradient-to-br from-editorial-navy via-editorial-black to-editorial-navy overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-editorial-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-editorial-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-editorial-white mb-6">
              Stay in
              <span className="block bg-gradient-to-r from-editorial-gold to-editorial-white bg-clip-text text-transparent">Style</span>
            </h2>
            <p className="text-xl sm:text-2xl text-editorial-cream max-w-3xl mx-auto leading-relaxed">
              Subscribe to our exclusive newsletter for VIP access to new collections, 
              <br className="hidden sm:block" />
              limited-time offers, and insider style tips
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-editorial-white/10 backdrop-blur-sm border-2 border-editorial-gold/30 text-editorial-white placeholder-editorial-cream/70 rounded-none focus:border-editorial-gold focus:outline-none transition-all duration-500 text-lg"
                />
                <div className="absolute inset-0 border-2 border-editorial-gold/20 rounded-none pointer-events-none"></div>
              </div>
              <button className="group relative overflow-hidden bg-gradient-to-r from-editorial-gold to-editorial-navy text-editorial-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-editorial-gold/25">
                <span className="relative z-10 flex items-center justify-center">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-editorial-navy to-editorial-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </div>
            <p className="text-sm text-editorial-cream/70 mt-4">
              Join 50,000+ fashion enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 