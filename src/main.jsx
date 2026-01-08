import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import FoodContext  from "./context/FoodContext";
import { CartProvider } from "./context/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <FoodContext>
        <CartProvider>
        <App />
        </CartProvider>
      </FoodContext>
    </AuthProvider>   
);
