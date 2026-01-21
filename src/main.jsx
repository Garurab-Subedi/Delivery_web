import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import { CartProvider } from "./context/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FoodProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FoodProvider>
  </AuthProvider>,
);
