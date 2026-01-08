import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const BASE_URL = "http://localhost/fooddelivery";

  // Load cart from backend
  const loadCart = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/getCart.php`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setCartItems(json.items);
        setCartCount(json.items.reduce((acc, item) => acc + parseInt(item.quantity), 0));
        setGrandTotal(json.grand_total);
      } else {
        setCartItems([]);
        setCartCount(0);
        setGrandTotal(0);
      }
    } catch (err) {
      console.log("Cart load error:", err);
    }
  };

  // Add to cart API
  const addToCart = async (food_id, quantity = 1) => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("food_id", food_id);
      formData.append("quantity", quantity);

      const res = await fetch(`${BASE_URL}/addToCart.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const json = await res.json();
      if (json.success) loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete item from cart
  const deleteItem = async (cart_id) => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("cart_id", cart_id);

      const res = await fetch(`${BASE_URL}/deleteCartItem.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const json = await res.json();
      if (json.success) loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Update quantity
  const updateQuantity = async (food_id, quantity) => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("food_id", food_id);
      formData.append("quantity", quantity);

      const res = await fetch(`${BASE_URL}/updateCartItem.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const json = await res.json();
      if (json.success) loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        grandTotal,
        loadCart,
        addToCart,
        deleteItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
