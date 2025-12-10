import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, TrendingUp, Plus } from "lucide-react";
import logo from "./logo.png";
import "./nav.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 🔥 this forces rerender on page change

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            <Home size={18} />
            Home
          </Link>
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
            <BarChart3 size={18} />
            Dashboard
          </Link>
          <Link to="/analytics" className="nav-link" onClick={closeMenu}>
            <TrendingUp size={18} />
            Analytics
          </Link>
          <Link to="/addStartup" className="nav-button" onClick={closeMenu}>
            <Plus size={18} />
            Add Startup
          </Link>

          {!isLoggedIn && (
            <Link to="/login" className="nav-button">
              Login
            </Link>
          )}

          {isLoggedIn && (
            <button
              className="nav-button"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? "line1 line1-active" : "line1"}></span>
          <span className={isOpen ? "line2 line2-active" : "line2"}></span>
          <span className={isOpen ? "line3 line3-active" : "line3"}></span>
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
