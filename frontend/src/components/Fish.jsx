import React from "react";
import { Link } from "react-router-dom";
import "./Fish.css";
import fishVideo from "./video/fish.mp4";
import rules1Image from "./images/rules1.webp";
import rules2Image from "./images/rules2.jpeg";

const Fish = () => {
  return (
    <div className="fish-container">
      {/* Video Section */}
      <div className="fish-video-page">
        <video autoPlay loop muted className="fish-video">
          <source src={fishVideo} type="video/mp4" />
          Your browser does not support video.
        </video>

        <div className="fish-content">
          <h2>Welcome to the Fish Page</h2>
          <p>Buy healthy fish directly from trusted sources.</p>

          <Link to="/shops" className="explore-btn">
            Explore Shops
          </Link>
        </div>
      </div>

      {/* Shop Rules Section */}
      <div className="fish-rules">
        <h3>Shop Rules & Guidelines</h3>

        {/* First Rule - Image Right, Text Left */}
        <div className="first-rule">
          <img
            src={rules1Image}
            alt="Business Rules"
            className="rules-image"
          />
          <div className="rule-text">
            <p>
              <strong>For Business Owners:</strong> Each business can create only one
              shop on this platform. Make sure to provide accurate information about
              your fish products, including clear images, species name, size, and
              price.
            </p>

            <p>
              Business owners can upload new fish, set discounts, and highlight
              special offers. Keep your listings up to date to attract customers.
              Only healthy and legally sold fish should be uploaded.
            </p>
          </div>
        </div>

        {/* Second Rule - Image Right, Text Left */}
        <div className="first-rule">
          <img
            src={rules2Image}
            alt="Customer Rules"
            className="rules-image"
          />
          <div className="rule-text">
            <p>
              All new fish or discounted fish will appear on the main page for one
              week to give them maximum visibility. After one week, they remain in
              your shop for customers to browse and purchase.
            </p>

            <p>
              <strong>For Customers:</strong> You can explore all shops, view fish
              listings, and add fish to your cart for purchase. Always check fish
              details, price, and discount before buying. If you have questions,
              contact the seller through the provided channels.
            </p>

            <p>
              Customers are encouraged to leave reviews and ratings for fish and
              sellers. Be respectful and honest in feedback. Avoid fake reviews or
              misleading information.
            </p>
          </div>
        </div>

        <p>
          <strong>General Guidelines:</strong> All shops and fish listings should
          comply with the platform rules. Fish must be ethically sourced,
          healthy, and legally allowed for sale. Avoid posting inappropriate
          content or irrelevant products.
        </p>

        <p>
          For safety and quality, all transactions are recorded and traceable.
          Customers and sellers are responsible for following shipping and
          handling instructions to ensure fish arrive safely.
        </p>

        <p>
          Our platform encourages fair business practices and a friendly
          community. Any violation of rules may result in suspension of your
          account.
        </p>
      </div>
    </div>
  );
};

export default Fish;
