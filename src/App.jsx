import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Admin from "./Pages/Admin/admin";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="content">{children}</div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
