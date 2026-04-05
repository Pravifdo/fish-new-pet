import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    image: null,
    imageName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file, imageName: file.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.image) {
      alert(`Please upload a ${userType === "customer" ? "face" : "shop"} image`);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("userType", userType);
      if (userType === "business") data.append("shopName", formData.shopName);
      data.append("image", formData.image);

      const res = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Save user info including image URL to localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userEmail", res.data.user.email);

      navigate("/business"); // Redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (!userType) {
    return (
      <div className="login-container">
        <div className="type-selection-box">
          <h2>Create Account</h2>
          <div className="button-group">
            <button onClick={() => setUserType("customer")}>Customer</button>
            <button onClick={() => setUserType("business")}>Business</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <button onClick={() => setUserType(null)}>← Back</button>
        <h2>Sign Up as {userType}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

          {userType === "business" && (
            <input name="shopName" placeholder="Shop Name" onChange={handleChange} required />
          )}

          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {formData.image && <p>Selected: {formData.imageName}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;