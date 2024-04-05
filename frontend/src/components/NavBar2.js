import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Ensure Link is imported
import '../NavBar.css';
import logo from '../images/browse.png'; // Make sure the path is correct

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            //if user in NOT logged in
        } else {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id) {
                //is user is logged in and we can access their date
            } else {
                //if user is logged in but we cant access their date (we should throw a console.log error)
            }
        }
    }, []);

    const handleLoginClick = () => {
        // Store the current location before redirecting to login
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

            {/* Replaced Link with button and added navigation logic */}
            <button onClick={handleLoginClick} className="nav-button">Login</button>
        </nav>
    );
};

export default NavBar2;
