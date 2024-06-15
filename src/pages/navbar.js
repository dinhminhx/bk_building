// Navbar.js
import React from "react";
import "./navbar.css";
const Navbar = ({onFilterClick}) => {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <img src={require(".././images/logo.png")} alt="Logo" />
                <span className="navbar-text">Building</span>
            </div>
            <div className="filter">
                <img
                    src={require(".././images/filter.png")}
                    alt="filter-icon"
                    style={{ cursor: "pointer" }}
                    onClick={onFilterClick} 
                />
            </div>
        </div>
    );
};

export default Navbar;
