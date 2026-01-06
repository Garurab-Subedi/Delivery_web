import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Card from "../../Components/card/Card";

import ChickenMomoSteamImg from "../../Photos/steammomo.png";
import ChickenMomoFriedImg from "../../Photos/friedmomo.png";
import ChickenMomoChillyImg from "../../Photos/chillymomo.png";
import ChickenMomoJholImg from "../../Photos/jholmomo.png";
import ChickenChowmeinImg from "../../Photos/chickenchowmin.png";
import BuffChowmeinImg from "../../Photos/buffchowmin.png";
import PorkChowmeinImg from "../../Photos/porkchowmin.png";
import VegChowmeinImg from "../../Photos/vegchowmin.png";
import ChickenpizzaImg from "../../Photos/chickenpizza.png";
import MushroompizzaImg from "../../Photos/mushroompizza.png";
import PanirpizzaImg from "../../Photos/panirpizza.png";
import SpecialpizzaImg from "../../Photos/specialpizza.png";
import ChickenburgerImg from "../../Photos/chickenburger.jpg";
import BuffburgerImg from "../../Photos/hamburger.jpg";
import VegburgerImg from "../../Photos/vegburger.jpg";
import ThichyaKoAlu from "../../Photos/thichyakoalu.png";
import GrillChickenImg from "../../Photos/GrillChicken.jpg";
import ChickenComboImg from "../../Photos/chickencombo.png";
import BuffComboImg from "../../Photos/buffcombo.png";
import PorkComboImg from "../../Photos/porkcombo.png";
import FruitSaladImg from "../../Photos/fruitsalad.jpg";
import ThuppaImg from "../../Photos/Thuppa.jpg";
import FrenchFriesImg from "../../Photos/frenchfries.png";
import VegSaladImg from "../../Photos/vegsalad.png";
import ChickenChoilaImg from "../../Photos/chickenchoila.png";
import BuffChoilaImg from "../../Photos/buffchoila.png";
import PorkChoilaImg from "../../Photos/porkchoila.png";
import ChickenSekuwaImg from "../../Photos/chickensekuwa.png";
import BuffSekuwaImg from "../../Photos/buffsekuwa.png";
import PorkSekuwaImg from "../../Photos/porksekuwa.png";
import VegBiryaniImg from "../../Photos/vegbiryani.png";
import ChickenBiryaniImg from "../../Photos/chickenbiryani.png";
import EggBiryaniImg from "../../Photos/eggbiryani.png";
import VegFriedRice from "../../Photos/vegfriedrice.png";
import EggFriedRice from "../../Photos/eggfriedrice.png";
import ChickenFriedRice from "../../Photos/chickenfriedrice.png";
// ==== MENU DATA ====
const menuData = {
  Momo: {
    Chicken: [
      {
        name: "Chicken Steam Momo",
        ingredients: "Steamed chicken momo with onion and garlic.",
        price: 160,
        img: ChickenMomoSteamImg,
      },
      {
        name: "Chicken Fried Momo",
        ingredients: "Crispy fried chicken momo with spicy sauce.",
        price: 180,
        img: ChickenMomoFriedImg,
      },
      {
        name: "Chicken Chilly Momo",
        ingredients: "Fried momo tossed in chilly sauce.",
        price: 200,
        img: ChickenMomoChillyImg,
      },
      {
        name: "Chicken Jhol Momo",
        ingredients: "Steamed momo served with spicy jhol soup.",
        price: 190,
        img: ChickenMomoJholImg,
      },
    ],
    Buff: [
      {
        name: "Buff Steam Momo",
        ingredients: "Steamed buff momo with Nepali spices.",
        price: 160,
        img: ChickenMomoSteamImg,
      },
      {
        name: "Buff Fried Momo",
        ingredients: "Crispy fried buff momo with sauce.",
        price: 180,
        img: ChickenMomoFriedImg,
      },
      {
        name: "Buff Chilly Momo",
        ingredients: "Fried momo in hot garlic sauce.",
        price: 200,
        img: ChickenMomoChillyImg,
      },
      {
        name: "Buff Jhol Momo",
        ingredients: "Steamed momo in hot soup base.",
        price: 190,
        img: ChickenMomoJholImg,
      },
    ],
    Pork: [
      {
        name: "Pork Steam Momo",
        ingredients: "Steamed pork momo with spices.",
        price: 170,
        img: ChickenMomoSteamImg,
      },
      {
        name: "Pork Fried Momo",
        ingredients: "Fried pork momo with sauce.",
        price: 180,
        img: ChickenMomoFriedImg,
      },
      {
        name: "Pork Chilly Momo",
        ingredients: "Pork momo tossed in chilly sauce.",
        price: 200,
        img: ChickenMomoChillyImg,
      },
      {
        name: "Pork Jhol Momo",
        ingredients: "Steamed pork momo in spicy soup.",
        price: 190,
        img: ChickenMomoJholImg,
      },
    ],
    Veg: [
      {
        name: "Veg Steam Momo",
        ingredients: "Steamed veg momo with carrot and cabbage.",
        price: 140,
        img: ChickenMomoSteamImg,
      },
      {
        name: "Veg Fried Momo",
        ingredients: "Crispy fried veg momo with sauce.",
        price: 160,
        img: ChickenMomoFriedImg,
      },
      {
        name: "Veg Chilly Momo",
        ingredients: "Veg momo in spicy sauce.",
        price: 170,
        img: ChickenMomoChillyImg,
      },
      {
        name: "Veg Jhol Momo",
        ingredients: "Steamed veg momo in hot soup.",
        price: 160,
        img: ChickenMomoJholImg,
      },
    ],
  },
  Chowmein: {
    Chicken: [
      {
        name: "Chicken Chowmein",
        ingredients: "Noodles, chicken, vegetables, soy sauce.",
        price: 180,
        img: ChickenChowmeinImg,
      },
    ],
    Buff: [
      {
        name: "Buff Chowmein",
        ingredients: "Noodles with buff meat and spices.",
        price: 180,
        img: BuffChowmeinImg,
      },
    ],
    Pork: [
      {
        name: "Pork Chowmein",
        ingredients: "Pork noodles with garlic and soy.",
        price: 190,
        img: PorkChowmeinImg,
      },
    ],
    Veg: [
      {
        name: "Veg Chowmein",
        ingredients: "Veg noodles with cabbage and carrot.",
        price: 160,
        img: VegChowmeinImg,
      },
    ],
  },
  Pizza: {
    Chicken: [
      {
        name: "Chicken Pizza",
        ingredients: "Chicken, cheese, tomato sauce, spices.",
        price: 300,
        img: ChickenpizzaImg,
      },
    ],
    Mushroom: [
      {
        name: "Mushroom Pizza",
        ingredients: "Mushroom, cheese, tomato base.",
        price: 280,
        img: MushroompizzaImg,
      },
    ],
    Paneer: [
      {
        name: "Paneer Pizza",
        ingredients: "Paneer cubes, cheese, tomato base.",
        price: 290,
        img: PanirpizzaImg,
      },
    ],
    Special: [
      {
        name: "Special Mix Pizza",
        ingredients: "Chicken, paneer, and vegetables.",
        price: 320,
        img: SpecialpizzaImg,
      },
    ],
  },
  Burger: {
    Chicken: [
      {
        name: "Chicken Burger",
        ingredients: "Chicken patty, lettuce, tomato, mayo.",
        price: 180,
        img: ChickenburgerImg,
      },
    ],
    Buff: [
      {
        name: "Buff Burger",
        ingredients: "Buff patty with cheese and sauce.",
        price: 190,
        img: BuffburgerImg,
      },
    ],
    Veg: [
      {
        name: "Veg Burger",
        ingredients: "Veg patty, tomato, onion, lettuce.",
        price: 160,
        img: VegburgerImg,
      },
    ],
  },
  Thuppa: {
    Veg: [
      {
        name: "Veg Thuppa",
        ingredients: "Noodles soup with vegetables and spices.",
        price: 150,
        img: ThuppaImg,
      },
    ],
    Chicken: [
      {
        name: "Chicken Thuppa",
        ingredients: "Chicken, lentils, noodles soup.",
        price: 170,
        img: ThuppaImg,
      },
    ],
    Buff: [
      {
        name: "Buff Thuppa",
        ingredients: "Buff meat soup with noodles.",
        price: 170,
        img: ThuppaImg,
      },
    ],
  },
  "Fried Rice": {
    Chicken: [
      {
        name: "Chicken Fried Rice",
        ingredients: "Rice, chicken, egg, soy sauce.",
        price: 180,
        img: ChickenFriedRice,
      },
    ],
    Veg: [
      {
        name: "Veg Fried Rice",
        ingredients: "Rice, vegetables, and soy sauce.",
        price: 160,
        img: VegFriedRice,
      },
    ],
    Egg: [
      {
        name: "Egg Fried Rice",
        ingredients: "Rice, egg, vegetables, soy sauce.",
        price: 170,
        img: EggFriedRice,
      },
    ],
  },
  Biryani: {
    Chicken: [
      {
        name: "Chicken Biryani",
        ingredients: "Rice, chicken, saffron, spices.",
        price: 250,
        img: ChickenBiryaniImg,
      },
    ],
    Veg: [
      {
        name: "Veg Biryani",
        ingredients: "Rice, mixed vegetables, herbs.",
        price: 220,
        img: VegBiryaniImg,
      },
    ],
    Egg: [
      {
        name: "Egg Biryani",
        ingredients: "Rice, egg, saffron, herbs.",
        price: 230,
        img: EggBiryaniImg,
      },
    ],
  },
  Salad: {
    Fruit: [
      {
        name: "Fruit Salad",
        ingredients: "Apple, banana, orange, honey.",
        price: 120,
        img: FruitSaladImg,
      },
    ],
    Veg: [
      {
        name: "Vegetable Salad",
        ingredients: "Cucumber, lettuce, tomato, dressing.",
        price: 100,
        img: VegSaladImg,
      },
    ],
  },
  Others: {
    Choila: [
      {
        name: "Chicken Choila",
        ingredients: "Grilled chicken with mustard oil.",
        price: 200,
        img: ChickenChoilaImg,
      },
      {
        name: "Buff Choila",
        ingredients: "Spicy grilled buff with herbs.",
        price: 210,
        img: BuffChoilaImg,
      },
      {
        name: "Pork Choila",
        ingredients: "Grilled pork with Nepali spices.",
        price: 220,
        img: PorkChoilaImg,
      },
    ],
    Sekuwa: [
      {
        name: "Chicken Sekuwa",
        ingredients: "Grilled chicken skewers.",
        price: 220,
        img: ChickenSekuwaImg,
      },
      {
        name: "Buff Sekuwa",
        ingredients: "Grilled buff meat with spices.",
        price: 230,
        img: BuffSekuwaImg,
      },
      {
        name: "Pork Sekuwa",
        ingredients: "Grilled pork with chili.",
        price: 230,
        img: PorkSekuwaImg,
      },
    ],
    Combo: [
      {
        name: "Combo Chicken",
        ingredients: "Chicken momo + chowmein combo.",
        price: 260,
        img: ChickenComboImg,
      },
      {
        name: "Combo Buff",
        ingredients: "Buff momo + chowmein combo.",
        price: 270,
        img: BuffComboImg,
      },
      {
        name: "Combo Pork",
        ingredients: "Pork momo + chowmein combo.",
        price: 280,
        img: PorkComboImg,
      },
    ],
    Grill: [
      {
        name: "Grill Chicken",
        ingredients: "Whole grilled chicken with herbs.",
        price: 350,
        img: GrillChickenImg,
      },
    ],
    Fries: [
      {
        name: "French Fries",
        ingredients: "Crispy potatoes with seasoning.",
        price: 100,
        img: FrenchFriesImg,
      },
    ],
    Alu: [
      {
        name: "Thichya ko Alu",
        ingredients: "Thick-cut potatoes with spices.",
        price: 120,
        img: ThichyaKoAlu,
      },
    ],
  },
};

const categories = Object.keys(menuData);

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    <div className="menu-page">
      <Card />

      {/* ===== MENU BELOW CARD ===== */}
      <div className="menu-container">
        <aside className="menu-sidebar">
          <h3>Menu</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat}>
                <div
                  className={`category ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="menu-items-section">
          <div className="food-list-section">
            {selectedCategory ? (
              Object.keys(menuData[selectedCategory]).map((subcat) => (
                <div key={subcat}>
                  <h3 className="subcategory-title">{subcat}</h3>
                  <div className="food-list">
                    {menuData[selectedCategory][subcat].map((food, idx) => (
                      <div className="food-card" key={idx}>
                        <img src={food.img} alt={food.name} />
                        <h4>{food.name}</h4>
                        {showIngredients[food.name] && (
                          <p className="ingredients">{food.ingredients}</p>
                        )}

                        <p className="price">
                          Price: ₹{food.price * (quantities[food.name] || 1)}
                        </p>

                        <span
                          className="view-ingredients black"
                          onClick={() => toggleIngredients(food.name)}
                        >
                          {showIngredients[food.name]
                            ? "Hide Ingredients"
                            : "View Ingredients"}
                        </span>

                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(food.name, -1)}
                          >
                            −
                          </button>
                          <span className="qty-value">
                            {quantities[food.name] || 1}
                          </span>
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(food.name, +1)}
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
              ))
            ) : (
              <p className="select-msg">Select a category to see food items.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
