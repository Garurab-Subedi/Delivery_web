import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, grandTotal, deleteItem, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Your cart is empty</p>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.cart_id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <img
            src={`http://localhost/fooddelivery${item.image}`}
            alt={item.name}
            style={{ width: 100, borderRadius: 8 }}
          />
          <div style={{ marginLeft: 20, flex: 1 }}>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Total: ₹{item.total_price}</p>

            <div>
              <button
                onClick={() => updateQuantity(item.food_id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.food_id, item.quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => deleteItem(item.cart_id)}
            style={{
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <h3>Grand Total: ₹{grandTotal}</h3>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: 20,
          padding: "12px 25px",
          backgroundColor: "green",
          color: "#fff",
          fontSize: 16,
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
