import React from 'react';
import { Link } from 'react-router-dom';
import './web.css'; // Make sure this import points to where your web.css file is located

const NavBar = ({ isLoggedIn, userProfilePic }) => {
  return (
    <nav className="navbar">
      <Link to="/landing" className="nav-button">Home</Link>
      <Link to="/library" className="nav-button">Library</Link>
      <Link to="/create" className="nav-button">Create</Link>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>

      {isLoggedIn ? (
        <Link to="/settings">
          <img src={userProfilePic} alt="Profile" className="profile-pic" />
        </Link>
      ) : (
        <Link to="/login" className="nav-button">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
