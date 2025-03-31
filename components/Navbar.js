import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🍔 Local Food Finder</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/vendors">Vendors</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
