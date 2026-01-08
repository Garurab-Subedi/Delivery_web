import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Card from "../../Components/card/Card";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/cartContext";

const BASE_URL = "http://localhost/fooddelivery"; // CHANGE THIS



const Menu = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [showIngredients, setShowIngredients] = useState({});

  // redirect if no login
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const res = await fetch(`${BASE_URL}/getCategory.php`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log("Category error", e);
      }

      setLoadingCategories(false);
    };

    fetchCategories();
  }, [token]);

  // ================= LOAD FOODS =================
  const loadFoods = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    setFoods([]);
    setLoadingFoods(true);

    try {
      const formData = new FormData();
      formData.append("category_id", categoryId); // IMPORTANT!!!

      const res = await fetch(`${BASE_URL}/getFoods.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();

      if (json.success) {
        setFoods(json.data);
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.log("Food error", e);
    }

    setLoadingFoods(false);
  };

  // quantity
  const handleQuantityChange = (foodId, delta) => {
    setQuantities((prev) => {
      const current = prev[foodId] || 1;
      return { ...prev, [foodId]: Math.max(current + delta, 1) };
    });
  };

  // add to cart
  const handleAddToCart = (food) => {
  const qty = quantities[food.id] || 1;
  addToCart(food.id, qty);
};
 
 const handleOrderNow = (food) => {
  const qty = quantities[food.id] || 1;
  addToCart(food.id, qty);
  navigate("/cart");
};

  return (
    <div className="menu-page">
      <Card />

      <div className="menu-container">
        {/* SIDEBAR */}
        <aside className="menu-sidebar">
          <h3>Food Categories</h3>

          {loadingCategories && <p>Loading...</p>}
          {!loadingCategories && categories.length === 0 && (
            <p>No categories found</p>
          )}

          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <div
                  className={`category ${
                    selectedCategoryId === cat.id ? "active" : ""
                  }`}
                  onClick={() => loadFoods(cat.id)}
                >
                  {cat.category}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* FOOD SECTION */}
        <section className="menu-items-section">
          {!selectedCategoryId && (
            <p>Select a category to view foods.</p>
          )}

          {loadingFoods && <p>Loading foods...</p>}

          {!loadingFoods && selectedCategoryId && foods.length === 0 && (
            <p>No food available</p>
          )}

          <div className="food-list">
            {foods.map((food) => (
              <div className="food-card" key={food.id}>
                <img src={`${BASE_URL}${food.image}`} alt={food.name} />

                <h4>{food.name}</h4>

               
                  <p className="ingredients">{food.description}</p>
              

                <p className="price">
                  Rs.
                  {(parseFloat(food.price) || 0) *
                    (quantities[food.id] || 1)}
                </p>

                <span
                  className="view-ingredients"
                  onClick={() =>
                    setShowIngredients((prev) => ({
                      ...prev,
                      [food.id]: !prev[food.id],
                    }))
                  }
                >
                </span>

                <div className="quantity-control">
                  <button
                    onClick={() => handleQuantityChange(food.id, -1)}
                  >
                    −
                  </button>

                  <span>{quantities[food.id] || 1}</span>

                  <button
                    onClick={() => handleQuantityChange(food.id, +1)}
                  >
                    +
                  </button>
                </div>

                <div className="button-row">
                  <button onClick={() => handleAddToCart(food)}>
                    Add to Cart
                  </button>

                  <button onClick={() => handleOrderNow(food)}>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
