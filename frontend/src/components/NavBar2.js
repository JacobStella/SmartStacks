import React from 'react';
import { Link } from 'react-router-dom';
import '../Web.css'; 
// Import your logo image if it's stored locally
import logo from '../images/browse.png'; // Update this path to where your actual logo is stored

const NavBar2 = () => {
    return (
        <nav className="navbar">
            {/* Insert the img tag for the logo with the className "navbar-logo" */}
            <img src={logo} alt="Company Logo" className="navbar-logo" />
            
            <Link to="/landing" className="nav-button">Home</Link>
            <Link to="/library" className="nav-button">Library</Link>
            <Link to="/create" className="nav-button">Create</Link>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>

            <Link to="/login" className="nav-button">Login</Link>
        </nav>
    );
};

export default NavBar2;
