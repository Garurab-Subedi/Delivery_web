import React, { useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axios";
import { FoodContext } from "../../context/FoodContext";
import { AuthContext } from "../../context/AuthContext";
import "./addProduct.css";

const PAGE_SIZE = 6;

const AddProduct = () => {
  const { token } = useContext(AuthContext);
  const { categories = [], getCategories } = useContext(FoodContext);

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    food_name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    food_name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [editImage, setEditImage] = useState(null);

  // Fetch all foods
  const getFoods = async () => {
    try {
      const res = await axiosInstance.get("/getAllFoods.php", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setFoods(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  // Form handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!image) return alert("Upload image");

    const fd = new FormData();
    fd.append("token", token);
    fd.append("food_name", form.food_name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category_id", form.category_id);
    fd.append("image", image);

    setLoading(true);
    try {
      const res = await axiosInstance.post("/addFood.php", fd);
      setLoading(false);
      if (!res.data.success) return alert(res.data.message);

      alert("Food added 🎉");
      setForm({ food_name: "", description: "", price: "", category_id: "" });
      setImage(null);
      getFoods();
    } catch {
      setLoading(false);
      alert("Add failed");
    }
  };

  const startEdit = (food) => {
    setEditingId(food.id);
    setEditForm({
      food_name: food.name,
      description: food.description,
      price: food.price,
      category_id: food.category_id || "",
    });
    setEditImage(null);
  };

  const handleUpdateFood = async (id) => {
    const fd = new FormData();
    fd.append("token", token);
    fd.append("food_id", id);
    fd.append("food_name", editForm.food_name);
    fd.append("description", editForm.description);
    fd.append("price", editForm.price);
    fd.append("category_id", editForm.category_id);
    if (editImage) fd.append("image", editImage);

    try {
      const res = await axiosInstance.post("/updateFood.php", fd);
      if (!res.data.success) return alert(res.data.message);

      alert("Food updated ✅");
      setEditingId(null);
      getFoods();
    } catch {
      alert("Update failed");
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Delete this food item?")) return;

    const fd = new FormData();
    fd.append("token", token);
    fd.append("food_id", id);

    try {
      const res = await axiosInstance.post("/deleteFood.php", fd);
      if (!res.data.success) return alert(res.data.message);

      alert("Food deleted 🗑️");
      getFoods();
    } catch {
      alert("Delete failed");
    }
  };

  // Search & pagination
  const filteredFoods = useMemo(
    () =>
      foods.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [foods, search],
  );

  const totalPages = Math.ceil(filteredFoods.length / PAGE_SIZE);
  const paginatedFoods = filteredFoods.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="admin-product-page">
      {/* ================= ADD FOOD FORM ================= */}
      <div className="admin-form-card">
        <h2>Add New Food</h2>
        <form onSubmit={handleAddFood}>
          <input
            type="text"
            name="food_name"
            placeholder="Food name"
            value={form.food_name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button disabled={loading}>
            {loading ? "Uploading..." : "Add Food"}
          </button>
        </form>
      </div>

      {/* ================= FOOD SEARCH ================= */}
      <div className="admin-food-toolbar">
        <h3>All Foods</h3>
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* ================= FOOD GRID ================= */}
      <div className="admin-food-grid">
        {paginatedFoods.length === 0 && <p>No foods found</p>}
        {paginatedFoods.map((food) => (
          <div key={food.id} className="admin-food-card">
            {editingId === food.id ? (
              <>
                <input
                  name="food_name"
                  value={editForm.food_name}
                  onChange={handleEditChange}
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
                <select
                  name="category_id"
                  value={editForm.category_id}
                  onChange={handleEditChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
                <div className="admin-food-actions">
                  <button onClick={() => handleUpdateFood(food.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={`http://localhost/fooddelivery${food.image}`}
                  alt={food.name}
                />
                <h4>{food.name}</h4>
                <p>{food.description}</p>
                <p className="price">${parseFloat(food.price).toFixed(2)}</p>
                <span className="badge">{food.category_name}</span>
                <div className="admin-food-actions">
                  <button onClick={() => startEdit(food)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => handleDeleteFood(food.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={p === page ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
