// Navbar.js
import React from "react";
import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <img src={require(".././images/logo.png")} alt="Logo" />
                <span className="navbar-text">Building</span>
            </div>
        </div>
    );
};

export default Navbar;
