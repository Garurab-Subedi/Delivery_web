import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import "./dashboard.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  // ================= STATE =================
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, usersRes, foodsRes, categoriesRes] = await Promise.all([
        axiosInstance.get("/adminGetOrders.php", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/getAllUsers.php", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/getAllFoods.php", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/getCategory.php"),
      ]);

      if (ordersRes.data.success) {
        setOrders(
          ordersRes.data.data.map((o) => ({
            ...o,
            total_amount: parseFloat(o.total_amount) || 0,
          })),
        );
      }
      if (usersRes.data.success) setUsers(usersRes.data.data);
      if (foodsRes.data.success) setFoods(foodsRes.data.data);
      if (categoriesRes.data.success)
        setCategories(categoriesRes.data.categories || categoriesRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= ACTIONS =================
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("user_id", userId);
      const res = await axiosInstance.post("/deleteUser.php", formData);
      if (res.data.success) setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("order_id", orderId);
      formData.append("status", status);
      const res = await axiosInstance.post("/updateOrderStatus.php", formData);
      if (res.data.success)
        setOrders(
          orders.map((o) =>
            o.id === orderId ? { ...o, order_status: status } : o,
          ),
        );
    } catch (err) {
      console.error(err);
    }
  };

  // ================= RENDER =================
  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="admin-dashboard">
      {/* TOP STAT CARDS */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h3>Total Foods</h3>
          <p>{foods.length}</p>
        </div>
        <div className="card">
          <h3>Total Categories</h3>
          <p>{categories.length}</p>
        </div>
      </div>

      {/* BOTTOM SECTION TABLES */}
      <div className="dashboard-tables">
        {/* ORDERS */}
        <div className="table-card">
          <h3>Orders</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Placed At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id}>
                  <td>{i + 1}</td>
                  <td>{o.full_name}</td>
                  <td>${o.total_amount.toFixed(2)}</td>
                  <td>{o.payment_status}</td>
                  <td>
                    <select
                      value={o.order_status}
                      onChange={(e) =>
                        handleOrderStatusChange(o.id, e.target.value)
                      }
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USERS */}
        <div className="table-card">
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.full_name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOODS */}
        <div className="table-card">
          <h3>Foods</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((f, i) => (
                <tr key={f.id}>
                  <td>{i + 1}</td>
                  <td>{f.name}</td>
                  <td>{f.category_name}</td>
                  <td>${parseFloat(f.price).toFixed(2)}</td>
                  <td>
                    <img src={f.image} alt={f.name} width="50" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CATEGORIES */}
        <div className="table-card">
          <h3>Categories</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
