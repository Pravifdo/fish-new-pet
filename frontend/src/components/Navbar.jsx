// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // if you're using React Router
// import { Link } from 'next/link';  ← use this if you're using Next.js

import './Navbar.css'; // we'll put styles in a separate file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when user clicks a link
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