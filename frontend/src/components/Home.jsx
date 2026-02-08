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

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="home-page">
      <div className="carousel-custom">

        {/* Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${currentSlide === index ? "active" : ""}`}
            >
              <img src={image.src} alt={image.alt} className="carousel-img" />

              {/* TEXT CENTERED ON IMAGE */}
              <div className="carousel-text-center">
                <h2>{image.title}</h2>
                <p>{image.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
            <div className='card'>
              <CardComponent />
            </div>



      <div className="New Arrivals">
        <h2>New Arrivals</h2>

        <div className='category-links'>
         <Link to ="/fish" className='category-link'>Fish</Link>
         <Link to ="/shrimp" className='category-link'>Shimp</Link>
         <Link to ="/plants" className='category-link'>Plants</Link>
         <Link to="/tools" className='category-link'>Tools</Link>
          
        </div>
        
      </div>


      <div className='user-friendly'>
      
        
      </div>

    </div>
  );
};

export default Home;
