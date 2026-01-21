import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { FoodContext } from "../../context/FoodContext";
import "./adminCategory.css"; // We'll style it here

const AdminCategory = () => {
  const { token } = useContext(AuthContext);
  const { categories = [], getCategories } = useContext(FoodContext);

  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categories.length) getCategories();
  }, []);

  /* ---------- ADD ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim()) return alert("Enter category name");

    const fd = new FormData();
    fd.append("token", token);
    fd.append("category_name", category);

    setLoading(true);
    try {
      const res = await axiosInstance.post("/addCategory.php", fd);
      setLoading(false);

      if (!res.data.success) return alert(res.data.message);

      alert("Category added 🎉");
      setCategory("");
      getCategories();
    } catch {
      setLoading(false);
      alert("Add failed");
    }
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async (id) => {
    if (!editValue.trim()) return alert("Enter category name");

    const fd = new FormData();
    fd.append("token", token);
    fd.append("category_id", id);
    fd.append("category_name", editValue);

    try {
      const res = await axiosInstance.post("/updateCategory.php", fd);
      if (!res.data.success) return alert(res.data.message);

      alert("Category updated ✅");
      setEditingId(null);
      setEditValue("");
      getCategories();
    } catch {
      alert("Update failed");
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    const fd = new FormData();
    fd.append("token", token);
    fd.append("category_id", id);

    try {
      const res = await axiosInstance.post("/deleteCategory.php", fd);
      if (!res.data.success) return alert(res.data.message);

      alert("Category deleted 🗑️");
      getCategories();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-card category-card">
      <h2 className="card-title">Manage Categories</h2>

      {/* ---------- ADD FORM ---------- */}
      <form onSubmit={handleSubmit} className="admin-form category-form">
        <input
          type="text"
          placeholder="Enter new category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input-field"
        />
        <button className="btn" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* ---------- CATEGORY LIST ---------- */}
      <h3 className="list-title">All Categories</h3>
      {categories.length === 0 ? (
        <p className="no-data">No categories found</p>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              {editingId === cat.id ? (
                <div className="edit-container">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="input-field edit-input"
                  />
                  <button
                    className="btn save-btn"
                    onClick={() => handleUpdate(cat.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="category-display">
                  <span className="category-name">{cat.category}</span>
                  <div className="category-actions">
                    <button
                      className="btn edit-btn"
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditValue(cat.category);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCategory;
