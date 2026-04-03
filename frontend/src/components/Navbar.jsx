// src/components/Navbar.jsx - Clean Version Without Icons
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
    const loggedInUserImage = localStorage.getItem('loggedInUserImage');
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    
    if (loggedInUserImage) setUserImage(loggedInUserImage);
    if (loggedInUserName) setUserName(loggedInUserName);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            Aqua<span>World</span>
          </Link>

          {/* Navigation Links - No Icons */}
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'active-link' : ''} onClick={closeMenu}>
              Home
            </Link>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active-link' : ''} onClick={closeMenu}>
              Shop
            </Link>
            <Link to="/happy-fishes" className={location.pathname === '/happy-fishes' ? 'active-link' : ''} onClick={closeMenu}>
              Happy Fishes
            </Link>
            <Link to="/supplies" className={location.pathname === '/supplies' ? 'active-link' : ''} onClick={closeMenu}>
              Supplies
            </Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active-link' : ''} onClick={closeMenu}>
              Services
            </Link>
            <Link to="/exports" className={location.pathname === '/exports' ? 'active-link' : ''} onClick={closeMenu}>
              Exports
            </Link>
            <Link to="/blog" className={location.pathname === '/blog' ? 'active-link' : ''} onClick={closeMenu}>
              Blog
            </Link>

            {/* Mobile user info */}
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
                  Login / Register
                </Link>
              )}
            </div>
          </div>

          {/* Right side icons - kept minimal */}
          <div className="nav-icons">
            <Link to="/cart" className="icon-btn cart-btn" onClick={closeMenu}>
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <div className="user-dropdown">
              <div className="user-icon">
                {userImage ? (
                  <img src={userImage} alt={userName || 'User'} className="avatar" />
                ) : (
                  <Link to="/login">
                    <img src="/images/default-avatar.png" alt="Default User" className="avatar" />
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
                    My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={closeMenu}>
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={closeMenu}>
                    Wishlist
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;