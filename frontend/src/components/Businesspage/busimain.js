import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./busimain.css";

const BusiMain = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    const userEmail = localStorage.getItem("userEmail");
    
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      setUser(userData);
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="busi-main">
      <div className="busi-main-left">
        <h1>
          Welcome, {user.name} {user.shopName ? `to your ${user.shopName} Dashboard` : ""}
        </h1>

        {(user.image) && (
          <div className="shop-image-container">
            <img 
              src={user.image} 
              alt="Shop" 
              className="shop-image"
              onError={(e) => {
                e.target.src = "https://picsum.photos/id/130/200/150";
              }}
            />
          </div>
        )}

        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate('/new-pates')} style={{marginTop: "20px"}}>
          Add New Pates
        </button>
      </div>
      
    </div>
  );
};

export default BusiMain;