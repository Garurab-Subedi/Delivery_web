import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/fooddelivery", // change to your API base
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
