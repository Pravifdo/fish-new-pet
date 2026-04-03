import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null); // 'customer' or 'business'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
    imageName: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageName: file.name
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.image) {
      alert(`Please upload a ${userType === 'customer' ? 'face' : 'business place'} image`);
      return;
    }
    
    // Save image URL to localStorage
    const imageUrl = URL.createObjectURL(formData.image);
    localStorage.setItem('userImage', imageUrl);

    // Show success message
    setSuccessMessage('✅ Registration successful! Redirecting to login...');
    console.log(`${userType.toUpperCase()} Signup data:`, formData);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: null,
      imageName: ''
    });
    
    setUserType(null);
    
    // Redirect to login page after 2.5 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  if (!userType) {
    return (
      <div className="login-container">
        <div className="type-selection-box">
          <h2>Create Account</h2>
          <p className="type-subtitle">Choose your account type</p>
          
          <div className="button-group">
            <button 
              className="type-btn customer-btn"
              onClick={() => setUserType('customer')}
            >
              <span className="btn-icon">👤</span>
              <span className="btn-text">Customer</span>
              <span className="btn-desc">Buy aquatic products</span>
            </button>
            
            <button 
              className="type-btn business-btn"
              onClick={() => setUserType('business')}
            >
              <span className="btn-icon">🏪</span>
              <span className="btn-text">Business</span>
              <span className="btn-desc">Sell aquatic products</span>
            </button>
          </div>

          <p className="login-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-btn" onClick={() => setUserType(null)}>← Back</button>
        <h2>Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="input-group">
            <label>
              {userType === 'customer' ? 'Upload Face Image 📸' : 'Upload Business Place Image 🏪'}
            </label>
            <div 
              className="image-upload-wrapper"
              onClick={() => document.getElementById('imageInput').click()}
            >
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
                required
              />
              <span className="upload-text">
                {formData.imageName || `Click to choose ${userType === 'customer' ? 'face' : 'business'} image`}
              </span>
            </div>
            {formData.image && (
              <div className="image-preview">
                <img src={URL.createObjectURL(formData.image)} alt="preview" />
              </div>
            )}
          </div>

          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
