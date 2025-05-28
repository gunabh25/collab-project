"use client"

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Bell } from 'lucide-react';

// Framer Motion alternative using CSS animations and React state
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Deals', href: '#' },
    { name: 'About', href: '#' }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0, -8px, 0); }
          70% { transform: translate3d(0, -4px, 0); }
          90% { transform: translate3d(0, -2px, 0); }
        }
        
        .navbar-enter {
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item:hover {
          transform: translateY(-2px);
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #06b6d4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-item:hover::after {
          width: 100%;
        }
        
        .search-bar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .search-focused {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1), 0 10px 25px -5px rgba(139, 92, 246, 0.2);
          transform: scale(1.02);
        }
        
        .cart-badge {
          animation: bounce 2s infinite;
          background: linear-gradient(45deg, #f59e0b, #ef4444);
        }
        
        .mobile-menu-enter {
          animation: fadeIn 0.3s ease-out;
        }
        
        .mobile-menu-item {
          animation: fadeIn 0.4s ease-out;
          animation-fill-mode: both;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .icon-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .icon-hover:hover {
          transform: scale(1.1) rotate(5deg);
          color: #8b5cf6;
        }
      `}</style>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 navbar-enter transition-all duration-500 ${
        isScrolled 
          ? 'glassmorphism shadow-2xl' 
          : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900'
      }`}>
        
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-2 text-sm font-medium">
          <span className="animate-pulse">🔥 Free shipping on orders over $50! Limited time offer</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold gradient-text cursor-pointer">
                ShopVibe
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-item text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className={`search-bar relative w-full ${searchFocused ? 'search-focused' : ''}`}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-white/10 text-white placeholder-white/60 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:bg-white/20 transition-all duration-300"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="icon-hover relative p-2 text-white/80 hover:text-white">
                <Heart className="w-6 h-6" />
              </button>
              
              <button className="icon-hover relative p-2 text-white/80 hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              
              <button className="icon-hover relative p-2 text-white/80 hover:text-white">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="cart-badge absolute -top-2 -right-2 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="icon-hover p-2 text-white/80 hover:text-white">
                <User className="w-6 h-6" />
              </button>
              
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Sign In
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button className="text-white/80 hover:text-white p-2">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="cart-badge absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/80 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu-enter glassmorphism border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-white/10 text-white placeholder-white/60 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:bg-white/20"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                </div>
              </div>
              
              {/* Mobile Nav Items */}
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button className="flex items-center space-x-3 w-full px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
                
                <button className="flex items-center space-x-3 w-full px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </button>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-24"></div>
      
      {/* Demo content to show scroll effect */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
            Scroll to see the navbar effect!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Product {i + 1}</h3>
                <p className="text-gray-600 mb-4">Amazing product description here...</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">$99</span>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;