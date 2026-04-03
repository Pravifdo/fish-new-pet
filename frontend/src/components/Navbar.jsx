// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Aqua<span>World</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={closeMenu}>
            Shop
          </Link>
          <Link to="/happy-fishes" onClick={closeMenu}>
            Happy Fishes & Aquatic Plants
          </Link>
          <Link to="/supplies" onClick={closeMenu}>
            Aquarium Supplies
          </Link>
          <Link to="/services" onClick={closeMenu}>
            Aquarium Services
          </Link>
          <Link to="/exports" onClick={closeMenu}>
            Exports
          </Link>
          <Link to="/blog" onClick={closeMenu}>
            Blog
          </Link>
        </div>

        {/* User icon */}
        <div className="user-icon" onClick={closeMenu}>
          <Link to="/login">
            <img
              src="/images/user-avatar.png" // Replace with your avatar image path
              alt="User"
              className="avatar"
            />
          </Link>
        </div>

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
  );
};

export default Navbar;