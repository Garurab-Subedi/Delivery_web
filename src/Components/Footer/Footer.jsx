import React from "react";
import { Link } from "react-router-dom"; // ✅ Use Link instead of <a>
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-brand">
        <h2>GoodFood 🍴</h2>
        <p>Make your mood with delicious food!</p>
      </div>

      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* ✅ goes to / */}
          </li>
          <li>
            <Link to="/menu">Menu</Link> {/* ✅ goes to /menu */}
          </li>
          <li>
            <Link to="/about">About Us</Link> {/* ✅ goes to /about */}
          </li>
          <li>
            <Link to="/Services">Services</Link>
          </li>
        </ul>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>
        <p>Email: support@goodfood.com</p>
        <p>Phone: +977 9866344775</p>
        <div className="socials">
          <a href="#" aria-label="facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" aria-label="instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">© 2025 GoodFood. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
