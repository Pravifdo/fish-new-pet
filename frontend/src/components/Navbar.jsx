// src/components/Navbar.jsx - Enhanced Version
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Fetch logged-in user data from localStorage
    const loggedInUserImage = localStorage.getItem('loggedInUserImage');
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    
    if (loggedInUserImage) {
      setUserImage(loggedInUserImage);
    }
    if (loggedInUserName) {
      setUserName(loggedInUserName);
    }

    // Get cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserImage');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedInUserEmail');
    setUserImage(null);
    setUserName('');
    closeMenu();
    window.location.href = '/';
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo with animation */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">🐠</span>
            Aqua<span>World</span>
            <span className="logo-dot">.</span>
          </Link>

          {/* Navigation Links */}
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            
            <Link 
              to="/shop" 
              className={location.pathname === '/shop' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">🛒</span>
              Shop
            </Link>
            
            <Link 
              to="/happy-fishes" 
              className={location.pathname === '/happy-fishes' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">🐟</span>
              Happy Fishes
            </Link>
            
            <Link 
              to="/supplies" 
              className={location.pathname === '/supplies' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">🔧</span>
              Supplies
            </Link>
            
            <Link 
              to="/services" 
              className={location.pathname === '/services' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">⭐</span>
              Services
            </Link>
            
            <Link 
              to="/exports" 
              className={location.pathname === '/exports' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">🌍</span>
              Exports
            </Link>
            
            <Link 
              to="/blog" 
              className={location.pathname === '/blog' ? 'active-link' : ''}
              onClick={closeMenu}
            >
              <span className="nav-icon">📝</span>
              Blog
            </Link>

            {/* Mobile-only user info */}
            <div className="mobile-user-info">
              {userImage ? (
                <>
                  <img src={userImage} alt={userName} className="mobile-avatar" />
                  <span className="mobile-user-name">{userName || 'User'}</span>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu} className="mobile-login-link">
                  <span className="nav-icon">👤</span>
                  Login / Register
                </Link>
              )}
            </div>
          </div>

          {/* Right side icons */}
          <div className="nav-icons">
            {/* Search Icon */}
            <div className="search-icon-wrapper">
              <button className="icon-btn search-btn">
                <span>🔍</span>
              </button>
            </div>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="icon-btn cart-btn" onClick={closeMenu}>
              <span>🛍️</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* User Icon with Dropdown */}
            <div className="user-dropdown">
              <div className="user-icon">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName || 'User'}
                    className="avatar"
                  />
                ) : (
                  <Link to="/login">
                    <img
                      src="/images/default-avatar.png"
                      alt="Default User"
                      className="avatar"
                    />
                  </Link>
                )}
              </div>
              
              {userImage && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img src={userImage} alt={userName} className="dropdown-avatar" />
                    <div className="dropdown-user-info">
                      <strong>{userName || 'User'}</strong>
                      <span>View Profile</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={closeMenu}>
                    <span>👤</span> My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={closeMenu}>
                    <span>📦</span> My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={closeMenu}>
                    <span>❤️</span> Wishlist
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div 
            className={`hamburger ${isOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;