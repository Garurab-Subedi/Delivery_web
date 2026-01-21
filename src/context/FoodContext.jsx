import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const FoodContext = createContext({
  categories: [],
  randomFoods: [],
  foodsByCategory: [],
  loading: false,
  getCategories: () => {},
});

export const FoodProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [randomFoods, setRandomFoods] = useState([]);
  const [foodsByCategory, setFoodsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/getCategory.php");
      console.log("Category API:", res.data);
      if (res.data.success) {
        setCategories(res.data.data); // ✅ FIX HERE
      }
    } catch (e) {
      console.log("Category fetch error:", e);
    }
  };

  const getRandomFoods = async () => {
    try {
      const res = await axiosInstance.get("/getRandomFood.php");
      if (res.data.success) setRandomFoods(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFoodsByCategory = async (category) => {
    try {
      const res = await axiosInstance.get(
        `/getFoodsByCategory.php?category=${category}`,
      );
      if (res.data.success) setFoodsByCategory(res.data.foods);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
    getRandomFoods();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        categories,
        randomFoods,
        foodsByCategory,
        loading,
        getCategories,
        getRandomFoods,
        getFoodsByCategory,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
