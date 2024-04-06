import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/browse.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInitial, setUserInitial] = useState('');

    // Determine if the user is logged in by checking 'user_data'
    const checkLoggedIn = () => {
        const userDataString = localStorage.getItem('user_data');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData && userData.username) {
                setUserInitial(userData.username.charAt(0).toUpperCase());
                return true;
            } else {
                console.log('User data is present but not valid.');
            }
        }
        return false;
    };

    // Call checkLoggedIn directly in the render method to determine logged in state.
    const userLoggedIn = checkLoggedIn();

    useEffect(() => {
        // The state is already set in checkLoggedIn so no need to set it again here.
        // This useEffect is now just for logging purposes or other side effects.
    }, [userInitial]); // Run the effect when userInitial changes

    const handleLoginClick = () => {
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
            
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/library" className="nav-button">Library</Link>
            <Link to="/create" className="nav-button">Create</Link>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>

            {/* Render profile circle or login button based on loggedIn status */}
            {userLoggedIn ? (
                <div className="profile-circle">{userInitial}</div>
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;
