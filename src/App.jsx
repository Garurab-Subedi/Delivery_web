import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginUser from "./Pages/Login/Login";
import Services from "./Pages/Services/Services";
import Contact from "./Pages/Contact/Contact";
import "./App.css";
import Cart from "./Pages/Cart/cart";
import Checkout from "./Pages/Checkout/checkout";
import MyOrders from "./Pages/Orders/MyOrders";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
