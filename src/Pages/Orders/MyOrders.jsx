import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If user is not logged in, redirect to login
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const formData = new FormData();
        formData.append("token", token);

        const res = await axiosInstance.post("/getMyOrders.php", formData);

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          alert(res.data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching orders. Try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading orders...</p>;

  if (!orders || orders.length === 0)
    return <p style={{ textAlign: "center", marginTop: 50 }}>No orders found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 15,
            marginBottom: 15,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Order ID: #{order.id}</h3>
          <p>
            <strong>Total Amount:</strong> ₹{order.total_amount}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span
              style={{
                color: order.payment_status === "pending" ? "orange" : "green",
              }}
            >
              {order.payment_status}
            </span>
          </p>
          <p>
            <strong>Order Status:</strong>{" "}
            <span
              style={{
                color:
                  order.order_status === "pending"
                    ? "orange"
                    : order.order_status === "confirmed"
                    ? "blue"
                    : "green",
              }}
            >
              {order.order_status}
            </span>
          </p>
          <p>
            <strong>Placed At:</strong> {order.created_at}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
