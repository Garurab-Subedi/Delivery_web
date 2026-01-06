import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodMenu.css";

import BurgerImg from "../../Photos/chickenburger.jpg";
import PizzaImg from "../../Photos/specialpizza.png";
import FriesImg from "../../Photos/Fries.jpg";
import GrillChickenImg from "../../Photos/GrillChicken.jpg";
import ThuppaImg from "../../Photos/Thuppa.jpg";
import FruitSaladImg from "../../Photos/FruitSalad.jpg";
import FrenchFriesImg from "../../Photos/frenchfries.png";
import ChickenComboImg from "../../Photos/chickencombo.png";

// === FOOD DATA ===
const foods = [
  {
    name: "French Fries",
    ingredients: "Crispy potatoes with seasoning.",
    price: 100,
    img: FrenchFriesImg,
  },

  {
    name: "Burger",
    ingredients: "Chicken patty, lettuce, tomato, mayo.",
    price: 180,
    img: BurgerImg,
  },
  {
    name: "Pizza",
    ingredients: "Cheese, tomato sauce, vegetables, spices.",
    price: 300,
    img: PizzaImg,
  },
  {
    name: "Fried Rice",
    ingredients: "Rice, vegetables, egg, soy sauce.",
    price: 160,
    img: FriesImg,
  },
  {
    name: "Grill Chicken",
    ingredients: "Whole grilled chicken with herbs.",
    price: 350,
    img: GrillChickenImg,
  },
  {
    name: "Combo Chicken",
    ingredients: "Chicken momo + chowmein combo.",
    price: 260,
    img: ChickenComboImg,
  },
  {
    name: "Thuppa",
    ingredients: "Noodles soup with vegetables and spices.",
    price: 150,
    img: ThuppaImg,
  },
  {
    name: "Fruit Salad",
    ingredients: "Apple, banana, orange, honey.",
    price: 120,
    img: FruitSaladImg,
  },
];

const FoodMenu = () => {
  const [showIngredients, setShowIngredients] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (foodName, delta) => {
    setQuantities((prev) => {
      const current = prev[foodName] || 1;
      return { ...prev, [foodName]: Math.max(current + delta, 1) };
    });
  };

  const handleAddToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem("app_cart_v1")) || [];
    const qty = quantities[food.name] || 1;
    const existingIndex = cart.findIndex((i) => i.name === food.name);
    if (existingIndex > -1) cart[existingIndex].quantity += qty;
    else cart.push({ ...food, quantity: qty });
    localStorage.setItem("app_cart_v1", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleOrderNow = (food) => {
    const user = JSON.parse(localStorage.getItem("user_login"));
    const qty = quantities[food.name] || 1;
    if (!user) {
      navigate("/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("app_cart_v1")) || [];
    const existingIndex = cart.findIndex((i) => i.name === food.name);
    if (existingIndex > -1) cart[existingIndex].quantity += qty;
    else cart.push({ ...food, quantity: qty });
    localStorage.setItem("app_cart_v1", JSON.stringify(cart));
    navigate("/cart");
  };

  const toggleIngredients = (foodName) => {
    setShowIngredients((prev) => ({ ...prev, [foodName]: !prev[foodName] }));
  };

  return (
    <div className="food-menu-page">
      <h2 className="food-menu-title">Food Items</h2>
      <div className="food-list">
        {foods.map((food) => (
          <div className="food-card" key={food.name}>
            <img src={food.img} alt={food.name} className="food-img" />
            <h4>{food.name}</h4>
            {showIngredients[food.name] && (
              <p className="ingredients">{food.ingredients}</p>
            )}
            <p className="price">
              Price: ₹{food.price * (quantities[food.name] || 1)}
            </p>
            <span
              className="view-ingredients"
              onClick={() => toggleIngredients(food.name)}
            >
              {showIngredients[food.name]
                ? "Hide Ingredients"
                : "View Ingredients"}
            </span>
            <div className="quantity-control">
              <button
                onClick={() => handleQuantityChange(food.name, -1)}
                className="qty-btn"
              >
                −
              </button>
              <span className="qty-value">{quantities[food.name] || 1}</span>
              <button
                onClick={() => handleQuantityChange(food.name, +1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
            <div className="button-row">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(food)}
              >
                Add to Cart
              </button>
              <button
                className="order-now-btn"
                onClick={() => handleOrderNow(food)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
