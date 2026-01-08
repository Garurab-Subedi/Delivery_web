import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../../Photos/Logo.png";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/myorder">My Orders</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>

        {/* Cart icon with badge */}
        <li style={{ position: "relative" }}>
          <NavLink to="/cart">
            <FaShoppingCart className="icon" />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -10,
                  background: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: 12,
                }}
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>

        {/* User login/logout */}
        <li>
          {token ? (
            <span
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              Logout
            </span>
          ) : (
            <NavLink to="/login">
              <FaUser className="icon" />
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
