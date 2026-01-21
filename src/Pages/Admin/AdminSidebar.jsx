import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/add-food">Add Food</NavLink>
      <NavLink to="/admin/add-category">Add Category</NavLink>
      <NavLink to="/admin/users">Users</NavLink>
      <NavLink to="/admin/orders">Orders</NavLink>
    </div>
  );
};

export default AdminSidebar;
