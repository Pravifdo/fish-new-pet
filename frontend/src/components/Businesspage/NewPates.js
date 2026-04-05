import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPates.css";

const NewPates = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: ""
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  /* =============================
     LOAD SHOP DATA
  ============================== */
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(loggedUser));
  }, [navigate]);

  /* =============================
     FORM HANDLERS
  ============================== */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingFish =
      JSON.parse(localStorage.getItem("fishPates")) || [];

    existingFish.push(formData);
    localStorage.setItem("fishPates", JSON.stringify(existingFish));

    navigate("/");
  };

  /* =============================
     NAVIGATION
  ============================== */

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="new-pates-container">
      {/* ================= SIDEBAR ================= */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
        <div className="sidebar-header">

          {/* SHOP IMAGE */}
          <img
            src={user.image || "https://picsum.photos/200"}
            alt="Shop"
            className="sidebar-shop-image"
            onError={(e) => {
              e.target.src = "https://picsum.photos/200";
            }}
          />

          {/* SHOP NAME */}
          <h3>{user.shopName || "My Fish Shop"}</h3>

          {/* OWNER NAME */}
          <p>Owner: {user.name}</p>
        </div>

        {/* NAVIGATION */}
        <div className="sidebar-nav">
          <div className="nav-item" onClick={() => handleNavigation("/")}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </div>

          <div
            className="nav-item active"
            onClick={() => handleNavigation("/new-pates")}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add New Pate</span>
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavigation("/products")}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">All Products</span>
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavigation("/orders")}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Orders</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">
        <div className="form-card">
          <h2 className="form-title">✨ Add New Fish Pate ✨</h2>
          <p className="form-subtitle">
            Create your delicious fish pate
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Fish Name</label>
              <input
                className="form-input"
                name="name"
                placeholder="e.g., Salmon Pate"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                className="form-input"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                className="form-input"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-upload"
                hidden
              />

              <label htmlFor="file-upload" className="file-input-label">
                📸 Choose an image
              </label>
            </div>

            {formData.image && (
              <div className="image-preview">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="preview-image"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="remove-image"
                >
                  ×
                </button>
              </div>
            )}

            <button type="submit" className="submit-btn">
              🚀 Create Fish Pate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPates;