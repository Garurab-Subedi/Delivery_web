import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("app_cart_v1")) || [];
    setCartItems(cart);
  }, []);

  const handleQuantity = (name, action) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          const newQty =
            action === "inc"
              ? item.quantity + 1
              : item.quantity - 1 > 0
              ? item.quantity - 1
              : 1;
          return { ...item, quantity: newQty, totalPrice: newQty * item.price };
        }
        return item;
      })
    );
  };

  const handleRemove = (name) => {
    const newCart = cartItems.filter((item) => item.name !== name);
    setCartItems(newCart);
    localStorage.setItem("app_cart_v1", JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("app_cart_v1");
    setCartItems([]);
    navigate("/");
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  if (cartItems.length === 0)
    return <p className="empty-cart">Your cart is empty!</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-card" key={item.name}>
            <img src={item.img} alt={item.name} className="cart-img" />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>
                Rs. {item.price} x {item.quantity} = Rs. {item.totalPrice}
              </p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantity(item.name, "dec")}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantity(item.name, "inc")}>
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.name)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="total-amount">Total: Rs. {totalAmount}</h3>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
