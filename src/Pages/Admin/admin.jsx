import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./dashboard";
import "./admin.css";
import AdminCategory from "../../Components/adminCategory/adminCategory";
import AddProduct from "../../Components/adminaddProduct/addProduct";
import Users from "../../Components/users/user";
import AdminOrder from "../../Components/adminOrder/adminOrder";

const Admin = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="add-food" element={<AddProduct />} />
          <Route path="add-category" element={<AdminCategory />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
