import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../NavBar.css';
import logo from '../images/browse.png';

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInitial, setUserInitial] = useState('');

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData && userData.username) {
                setUserInitial(userData.username.charAt(0).toUpperCase());
            } else {
                console.log('User data is present but not valid.');
            }
        }
    }, []);

    const userLoggedIn = !!userInitial; // Boolean conversion: if userInitial is a non-empty string, userLoggedIn is true

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

            {userLoggedIn ? (
                <div className="profile-circle">{userInitial}</div>
            ) : (
                <button onClick={handleLoginClick} className="nav-button">Login</button>
            )}
        </nav>
    );
};

export default NavBar2;
