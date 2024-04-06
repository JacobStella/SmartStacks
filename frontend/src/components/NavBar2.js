import React, { useEffect, useState } from 'react'; // Add useState
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/browse.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userInitial, setUserInitial] = useState('');

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        const token = localStorage.getItem('token'); // You can adjust the key if your token is stored under a different name
        const isLoggedIn = token != null;

        if (isLoggedIn && userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id) {
                setUserLoggedIn(true);
                // Assume the username is a property on userData. Adjust if necessary.
                setUserInitial(userData.username ? userData.username.charAt(0).toUpperCase() : '');
            } else {
                console.log('User is logged in but user data cannot be accessed.');
            }
        }
    }, []);

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

            {/* Conditional rendering based on login status */}
            {userLoggedIn ? (
                <div className="profile-circle">{userInitial}</div> // Style this div as needed
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;
