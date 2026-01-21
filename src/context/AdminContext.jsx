import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/getCategories.php");
      if (res.data.success) setCategories(res.data.categories);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const addCategory = async (categoryName) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("category_name", categoryName);

    const res = await axiosInstance.post("/addCategory.php", formData);
    return res.data;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        categories,
        fetchCategories,
        addCategory,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
