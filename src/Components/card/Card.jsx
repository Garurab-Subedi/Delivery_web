import React, { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

// Images
import Burger from "../../Photos/chickenburger.jpg";
import Pizza from "../../Photos/specialpizza.png";
import Fries from "../../Photos/Fries.jpg";
import FruitSalad from "../../Photos/FruitSalad.jpg";
import GrillChicken from "../../Photos/grillChicken.jpg";
import Thuppa from "../../Photos/thuppa.jpg";

const Card = () => {
  const images1 = [Burger, FruitSalad, Fries];
  const images2 = [Pizza, Fries, FruitSalad];
  const images3 = [Fries, Pizza, Burger];
  const images4 = [FruitSalad, Thuppa, GrillChicken];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images1.length);
        setFade(true); // fade in
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-container">
      <div className="card-text">
        <h1>
          Make Your Mood <br /> with Delicious Food!
        </h1>
        <div className="explore-more">
          <Link to="/menu">Explore More</Link>
        </div>
      </div>

      <div className="card-images">
        <img
          src={images1[index]}
          alt="Food 1"
          className={fade ? "fade-in" : "fade-out"}
        />
        <img
          src={images2[index]}
          alt="Food 2"
          className={fade ? "fade-in" : "fade-out"}
        />
        <img
          src={images3[index]}
          alt="Food 3"
          className={fade ? "fade-in" : "fade-out"}
        />
        <img
          src={images4[index]}
          alt="Food 4"
          className={fade ? "fade-in" : "fade-out"}
        />
      </div>
    </div>
  );
};

export default Card;
