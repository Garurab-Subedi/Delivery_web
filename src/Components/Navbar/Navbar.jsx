import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../../Photos/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo section */}
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Nav Links + Icons in SAME line */}
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {/* Icons as part of nav-links */}
        <li>
          <NavLink to="/cart">
            <FaShoppingCart className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <FaUser className="icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
