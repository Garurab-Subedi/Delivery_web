import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./adminOrder.css";

const AdminOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/adminGetOrders.php", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // convert total_amount to number
        const data = res.data.data.map((o) => ({
          ...o,
          total_amount: parseFloat(o.total_amount) || 0,
        }));
        setOrders(data);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Status badge
  const renderBadge = (status, type) => {
    const base = "status-badge";
    let color = "";

    if (type === "payment") {
      color = status.toLowerCase() === "paid" ? "green" : "orange";
    } else if (type === "order") {
      switch (status.toLowerCase()) {
        case "confirmed":
        case "delivered":
          color = "green";
          break;
        case "processing":
          color = "blue";
          break;
        case "cancelled":
          color = "red";
          break;
        default:
          color = "gray";
      }
    }

    return <span className={`${base} ${color}`}>{status}</span>;
  };

  // Update order status
  const handleStatusChange = async (order_id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("order_id", order_id);
      formData.append("status", newStatus);

      const res = await axiosInstance.post("/updateOrderStatus.php", formData);

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order_id ? { ...o, order_status: newStatus } : o,
          ),
        );
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  return (
    <div className="admin-card">
      <h2>All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Placed At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, index) => (
              <tr key={o.id}>
                <td>{index + 1}</td>
                <td>{o.full_name}</td>
                <td>${o.total_amount.toFixed(2)}</td>
                <td>{renderBadge(o.payment_status, "payment")}</td>
                <td>
                  <select
                    value={o.order_status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {renderBadge(o.order_status, "order")}
                </td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
