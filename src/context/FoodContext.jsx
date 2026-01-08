import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const FoodContext = createContext(null);

export default function FoodProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [randomFoods, setRandomFoods] = useState([]);
  const [foodsByCategory, setFoodsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/getCategory.php");
      if (res.data.success) setCategories(res.data.categories);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

const getRandomFoods = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/getRandomFood.php");
    if (res.data.success) setRandomFoods(res.data.data);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};


  const getFoodsByCategory = async (category) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/getFoodsByCategory.php?category=${category}`
      );
      if (res.data.success) setFoodsByCategory(res.data.foods);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
}
