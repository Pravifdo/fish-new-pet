// Home.js - Enhanced Version
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from './images/download.webp';
import img2 from './images/images.jpeg';
import img3 from './images/photo-1437482078695-73f5ca6c96e2.avif';
import './Home.css';
import CardComponent from './cart';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: img1,
      alt: "Welcome to Sri Lanka Online Aquarium",
      title: "Welcome to Sri Lanka Online Aquarium",
      subtitle: "Explore the beauty of aquatic life"
    },
    {
      src: img2,
      alt: "Fish Tank With Furniture",
      title: "Fish Tank With Furniture",
      subtitle: "Modern design with living nature"
    },
    {
      src: img3,
      alt: "Fish Pond and Tank Maintenance",
      title: "Fish Pond & Tank Maintenance",
      subtitle: "Professional care for healthy fish"
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers", icon: "😊" },
    { number: "200+", label: "Fish Species", icon: "🐠" },
    { number: "100%", label: "Live Delivery", icon: "🚚" },
    { number: "24/7", label: "Expert Support", icon: "🎧" }
  ];

  const testimonials = [
    { name: "Amal Perera", text: "Best online aquarium store in Sri Lanka! My fish arrived healthy and happy.", rating: 5, location: "Colombo" },
    { name: "Nimali Fernando", text: "Great quality plants and excellent customer service. Highly recommended!", rating: 5, location: "Kandy" },
    { name: "Ruwan Jayasinghe", text: "Fast delivery and beautiful fish tanks. Will buy again!", rating: 5, location: "Galle" }
  ];

  const blogPosts = [
    { title: "How to Set Up Your First Aquarium", date: "March 15, 2026", readTime: "5 min read", category: "Guide" },
    { title: "Top 10 Beginner Friendly Fish", date: "March 10, 2026", readTime: "4 min read", category: "Tips" },
    { title: "Maintaining Water Quality", date: "March 5, 2026", readTime: "6 min read", category: "Care" }
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <div className="carousel-custom">
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${currentSlide === index ? "active" : ""}`}
            >
              <img src={image.src} alt={image.alt} className="carousel-img" />
              <div className="carousel-overlay"></div>
              <div className="carousel-text-center">
                <h2>{image.title}</h2>
                <p>{image.subtitle}</p>
                <Link to="/shop" className="carousel-btn">Shop Now →</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}>
          ❮
        </button>
        <button className="carousel-arrow next" onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}>
          ❯
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/94771234567" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <div className="whatsapp-icon">💬</div>
        <span className="whatsapp-tooltip">Need Help? Chat with us!</span>
      </a>

      {/* Stats Counter Section */}
      <div className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card fade-in-up">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="card-section">
        <div className="section-header fade-in-up">
          <span className="section-badge">Premium Collection</span>
          <h2>Our Best Sellers</h2>
          <p>Discover our most popular aquarium products</p>
        </div>
        <CardComponent />
      </div>

      {/* New Arrivals & Categories Section */}
      <div className="new-arrivals">
        <div className="section-header fade-in-up">
          <span className="section-badge">Fresh Collection</span>
          <h2>New Arrivals</h2>
          <p>Check out our latest products</p>
        </div>
        <div className="category-links">
          <Link to="/fish" className="category-link">
            <span className="category-icon">🐟</span>
            Fish
            <span className="category-count">120+</span>
          </Link>
          <Link to="/shrimp" className="category-link">
            <span className="category-icon">🦐</span>
            Shrimp
            <span className="category-count">45+</span>
          </Link>
          <Link to="/plants" className="category-link">
            <span className="category-icon">🌿</span>
            Plants
            <span className="category-count">80+</span>
          </Link>
          <Link to="/tools" className="category-link">
            <span className="category-icon">🔧</span>
            Tools
            <span className="category-count">60+</span>
          </Link>
        </div>
      </div>

      {/* Featured Categories with Images */}
      <div className="featured-categories">
        <div className="section-header fade-in-up">
          <span className="section-badge">Shop by Category</span>
          <h2>Find What You Need</h2>
        </div>
        <div className="categories-grid">
          <div className="category-card category-card-1">
            <div className="category-card-content">
              <h3>Aquarium Tanks</h3>
              <p>From nano to large tanks</p>
              <Link to="/tanks" className="category-card-link">Explore →</Link>
            </div>
          </div>
          <div className="category-card category-card-2">
            <div className="category-card-content">
              <h3>Fish Food</h3>
              <p>Premium nutrition</p>
              <Link to="/food" className="category-card-link">Explore →</Link>
            </div>
          </div>
          <div className="category-card category-card-3">
            <div className="category-card-content">
              <h3>Decorations</h3>
              <p>Create beautiful aquascapes</p>
              <Link to="/decorations" className="category-card-link">Explore →</Link>
            </div>
          </div>
          <div className="category-card category-card-4">
            <div className="category-card-content">
              <h3>Filters & Pumps</h3>
              <p>Keep water crystal clear</p>
              <Link to="/filters" className="category-card-link">Explore →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="section-header fade-in-up">
          <span className="section-badge">Customer Love</span>
          <h2>What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card fade-in-up">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-rating">
                {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
              </div>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="section-header fade-in-up">
          <span className="section-badge">Aquarium Tips</span>
          <h2>Latest from Our Blog</h2>
          <p>Expert advice for your aquarium journey</p>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card fade-in-up">
              <div className="blog-category">{post.category}</div>
              <h3>{post.title}</h3>
              <div className="blog-meta">
                <span>📅 {post.date}</span>
                <span>⏱️ {post.readTime}</span>
              </div>
              <Link to="/blog" className="read-more">Read More →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get exclusive offers, care tips, and new arrival updates</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe →</button>
          </form>
          <p className="newsletter-note">No spam, unsubscribe anytime.</p>
        </div>
      </div>

      {/* User-Friendly Features Section */}
      <div className="user-friendly">
        <div className="feature-grid">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🐟</div>
            <h3>Live Arrival Guarantee</h3>
            <p>Healthy fish delivered safely</p>
          </div>
          <div className="feature-card fade-in-up">
            <div className="feature-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>100% secure transactions</p>
          </div>
          <div className="feature-card fade-in-up">
            <div className="feature-icon">⭐</div>
            <h3>Expert Support</h3>
            <p>24/7 aquarium advice</p>
          </div>
        </div>
      </div>

      {/* About Us / Call to Action Section */}
      <div className="about-cta">
        <div className="cta-content">
          <h2>Start Your Aquatic Journey Today</h2>
          <p>Join thousands of happy aquarium enthusiasts in Sri Lanka</p>
          <Link to="/shop" className="cta-button">Shop Now →</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;