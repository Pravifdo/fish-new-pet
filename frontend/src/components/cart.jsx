import React from "react";
import imge1 from "../components/images/Shrimp.webp";
import imge2 from "../components/images/Fish.jpeg";
import imge3 from "../components/images/Tools.jpg";
import imge4 from "../components/images/plan.jpeg";
import "./cart.css";

const CardComponent = () => {
  const cards = [
    { img: imge1, title: "Shrimp Aquarium", text: "Explore amazing shrimp species." },
    { img: imge2, title: "Fish Aquarium", text: "Colorful tropical fish for your tank." },
    { img: imge4, title: "Plants & Decorations", text: "Beautify your tank with plants." },
    { img: imge3, title: "Tools & Maintenance", text: "Keep your aquarium healthy." },
  ];

  return (
    <section className="categories-section">
      {/* Section Title */}
      <h2 className="section-title">Our Categories</h2>

      {/* Cards Row */}
      <div className="card-row">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img className="card-img-top" src={card.img} alt={card.title} />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardComponent;
