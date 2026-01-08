import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, grandTotal, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If cart is empty, redirect to menu
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/menu");
    }
  }, [cartItems, navigate]);

  const handleCheckout = async () => {
    if (!token) {
      alert("You need to login first!");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("payment_method", paymentMethod);
      formData.append("token", token);

      const res = await axiosInstance.post("/checkout.php", formData);

      if (!res.data.success) {
        alert(res.data.message || "Checkout failed!");
        setLoading(false);
        return;
      }

      alert(`Order placed successfully! Order ID: ${res.data.order_id}, Total: ₹${res.data.total}`);
      
      // Clear local cart
      clearCart();

      // Redirect to order history page or menu
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Checkout</h2>

      <div style={{ marginTop: 20 }}>
        <h3>Delivery & Payment</h3>

        <div style={{ marginTop: 10 }}>
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
        </div>

        {/* Future payment methods */}
        <div style={{ marginTop: 10 }}>
          <label>
            <input
              type="radio"
              name="payment"
              value="KHALTI"
              disabled
            />
            Khalti (Coming Soon)
          </label>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div
            key={item.cart_id}
            style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}
          >
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.total_price}</span>
          </div>
        ))}
        <hr />
        <h3 style={{ textAlign: "right" }}>Grand Total: ₹{grandTotal}</h3>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          marginTop: 30,
          width: "100%",
          padding: 15,
          backgroundColor: "green",
          color: "#fff",
          fontSize: 16,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
